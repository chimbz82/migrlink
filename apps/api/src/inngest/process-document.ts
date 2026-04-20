import { inngest } from './client';
import { createComplianceEvent } from '@migralink/compliance-engine';

export const processDocumentOcr = inngest.createFunction(
  { id: 'document-ocr-processor' },
  { event: 'document.uploaded' },
  async ({ event, step }) => {
    const { orgId, workerId, documentId } = event.data;

    // Simulate OCR Processing via AWS Textract
    const ocrResult = await step.run('run-aws-textract', async () => {
      // Logic for AWS Textract would go here
      return {
        provider: 'AWS_TEXTRACT',
        mismatchesDetected: [],
        confidence: 0.95,
      };
    });

    // Hash-Chained Compliance Ledger Recording
    await step.run('record-compliance-event', async () => {
      await createComplianceEvent(
        orgId,
        workerId,
        'DOCUMENT_OCR_COMPLETED',
        {
          documentId,
          ...ocrResult
        }
      );
    });

    return { status: 'processed', documentId, confidence: ocrResult.confidence };
  }
);
