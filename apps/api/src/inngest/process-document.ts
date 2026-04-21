import { inngest } from './client';
import { createComplianceEvent } from '@migralink/compliance-engine';
import { getObjectBuffer } from '@migralink/document-parser/r2';
import { scanDocumentBuffer } from '@migralink/document-parser';
import { processIdentityDocument, detectMismatches, type StoredWorkerData } from '@migralink/document-parser';

// ─── Durable document processing workflow ────────────────────────────────────
// Triggered by 'document/process.uploaded' after the client has PUT the file
// directly to R2 via a signed URL.
//
// Steps (each is retried independently by Inngest on failure):
//   1. Emit DOCUMENT_UPLOAD_INITIATED  ← already emitted by API; confirm here
//   2. Download file bytes from R2
//   3. AV scan
//   4. Emit DOCUMENT_SCAN_COMPLETED
//   5. Run OCR (AWS Textract AnalyzeID)
//   6. Emit DOCUMENT_OCR_COMPLETED
//   7. Detect field mismatches vs stored worker data
//   8. Emit DOCUMENT_MISMATCH_DETECTED (if any)
//   9. Emit DOCUMENT_REVIEW_REQUIRED
// ─────────────────────────────────────────────────────────────────────────────

export const processDocumentOcr = inngest.createFunction(
  {
    id: 'document-ocr-processor',
    retries: 3,
    // Prevent concurrent runs for the same fileKey
    concurrency: { limit: 10, key: 'event.data.fileKey' },
  },
  { event: 'document/process.uploaded' },
  async ({ event, step }) => {
    const {
      orgId,
      workerId,
      fileKey,
      documentType,
      mimeType,
      uploadedBy,
      workerData,
    } = event.data as {
      orgId: string;
      workerId: string;
      fileKey: string;
      documentType: string;
      mimeType: string;
      uploadedBy: string;
      workerData: StoredWorkerData & Record<string, unknown>;
    };

    // ── Step 1: Download from R2 ──────────────────────────────────────────────
    const fileBuffer = await step.run('download-from-r2', () =>
      getObjectBuffer(fileKey),
    );

    // ── Step 2: AV Scan ───────────────────────────────────────────────────────
    const scanResult = await step.run('av-scan', () =>
      scanDocumentBuffer(orgId, workerId, fileBuffer, fileKey),
    );

    if (!scanResult.isSafe) {
      // Compliance event already emitted inside scanDocumentBuffer.
      // Halt processing — do not run OCR on potentially malicious content.
      return {
        status: 'quarantined',
        fileKey,
        threat: scanResult.threatDetails,
      };
    }

    // ── Step 3: Emit DOCUMENT_SCAN_COMPLETED ─────────────────────────────────
    await step.run('emit-scan-completed', () =>
      createComplianceEvent(orgId, workerId, 'DOCUMENT_SCAN_COMPLETED', {
        fileKey,
        documentType,
        scanProvider: scanResult.scanProvider,
        byteSize: scanResult.byteSize,
      }),
    );

    // ── Step 4: OCR ───────────────────────────────────────────────────────────
    let ocrResult: Awaited<ReturnType<typeof processIdentityDocument>>;
    try {
      ocrResult = await step.run('run-textract-ocr', () =>
        processIdentityDocument(fileBuffer, mimeType),
      );
    } catch {
      // OCR failure is non-fatal — flag for manual review and continue
      await step.run('emit-ocr-failed', () =>
        createComplianceEvent(orgId, workerId, 'DOCUMENT_OCR_FAILED', {
          fileKey,
          documentType,
          reason: 'OCR_PIPELINE_EXHAUSTED',
        }),
      );
      await step.run('emit-review-required-ocr-fail', () =>
        createComplianceEvent(orgId, workerId, 'DOCUMENT_REVIEW_REQUIRED', {
          fileKey,
          documentType,
          reason: 'OCR_FAILED',
          uploadedBy,
        }),
      );
      return { status: 'ocr_failed', fileKey };
    }

    // ── Step 5: Emit DOCUMENT_OCR_COMPLETED ──────────────────────────────────
    await step.run('emit-ocr-completed', () =>
      createComplianceEvent(orgId, workerId, 'DOCUMENT_OCR_COMPLETED', {
        fileKey,
        documentType,
        provider: ocrResult.provider,
        confidence: ocrResult.confidence,
        fieldCount: Object.keys(ocrResult.extractedData).length,
        hasMrz: ocrResult.mrzRaw.length > 0,
      }),
    );

    // ── Step 6: Mismatch detection ────────────────────────────────────────────
    const mismatches = detectMismatches(ocrResult.extractedData, workerData as StoredWorkerData);

    if (mismatches.length > 0) {
      await step.run('emit-mismatch-detected', () =>
        createComplianceEvent(orgId, workerId, 'DOCUMENT_MISMATCH_DETECTED', {
          fileKey,
          documentType,
          mismatches,
          ocrConfidence: ocrResult.confidence,
        }),
      );
    }

    // ── Step 7: Emit DOCUMENT_REVIEW_REQUIRED (always for human sign-off) ────
    await step.run('emit-review-required', () =>
      createComplianceEvent(orgId, workerId, 'DOCUMENT_REVIEW_REQUIRED', {
        fileKey,
        documentType,
        mismatches,
        confidence: ocrResult.confidence,
        uploadedBy,
        requiresAction: mismatches.length > 0,
      }),
    );

    return {
      status: 'processed',
      fileKey,
      documentType,
      confidence: ocrResult.confidence,
      mismatches,
    };
  },
);
