import {
  TextractClient,
  AnalyzeIDCommand,
  type IdentityDocumentField,
} from '@aws-sdk/client-textract';

// Pinned to eu-west-2 for UK data residency — Textract processes data
// in the region you call; keeping it in Europe avoids GDPR cross-border issues.
const textractClient = new TextractClient({ region: 'eu-west-2' });

export interface OCRResult {
  provider: 'AWS_TEXTRACT';
  mrzRaw: string;
  extractedData: Record<string, string>;
  /** 0–1 average confidence across all detected fields. */
  confidence: number;
}

export interface StoredWorkerData {
  legalNameComponents?: { firstName?: string; lastName?: string };
  nationality?: string | null;
  cosReference?: string | null;
  visaExpiry?: Date | null;
  passportNumber?: string | null;
}

export async function processIdentityDocument(
  fileBuffer: Buffer,
  _mimeType: string,
): Promise<OCRResult> {
  const command = new AnalyzeIDCommand({
    DocumentPages: [{ Bytes: fileBuffer }],
  });

  const response = await textractClient.send(command);
  const fields: IdentityDocumentField[] =
    response.IdentityDocuments?.[0]?.IdentityDocumentFields ?? [];

  const extractedData: Record<string, string> = {};
  let totalConfidence = 0;
  let fieldCount = 0;

  for (const field of fields) {
    const key = field.Type?.Text;
    const value = field.ValueDetection?.Text;
    const conf = field.ValueDetection?.Confidence ?? 0;
    if (key && value) {
      extractedData[key] = value;
      totalConfidence += conf;
      fieldCount++;
    }
  }

  const confidence = fieldCount > 0 ? totalConfidence / fieldCount / 100 : 0;

  return {
    provider: 'AWS_TEXTRACT',
    extractedData,
    mrzRaw: extractedData['MRZ_CODE'] ?? '',
    confidence,
  };
}

/**
 * Compare OCR-extracted fields against the worker record stored at enrollment.
 * Returns an array of mismatch codes — empty means all fields check out.
 */
export function detectMismatches(
  ocrData: Record<string, string>,
  stored: StoredWorkerData,
): string[] {
  const warnings: string[] = [];

  const cmp = (a?: string, b?: string) =>
    a && b && a.toUpperCase().trim() !== b.toUpperCase().trim();

  if (cmp(ocrData['FIRST_NAME'], stored.legalNameComponents?.firstName)) {
    warnings.push('FIRST_NAME_MISMATCH');
  }

  if (cmp(ocrData['LAST_NAME'], stored.legalNameComponents?.lastName)) {
    warnings.push('LAST_NAME_MISMATCH');
  }

  if (cmp(ocrData['NATIONALITY'], stored.nationality ?? undefined)) {
    warnings.push('NATIONALITY_MISMATCH');
  }

  if (cmp(ocrData['DOCUMENT_NUMBER'], stored.passportNumber ?? undefined)) {
    warnings.push('PASSPORT_NUMBER_MISMATCH');
  }

  // Expiry: allow ±24 h to account for timezone differences in raw MRZ dates
  const ocrExpiry = ocrData['EXPIRATION_DATE'];
  if (ocrExpiry && stored.visaExpiry) {
    const parsed = new Date(ocrExpiry);
    if (
      !isNaN(parsed.getTime()) &&
      Math.abs(parsed.getTime() - stored.visaExpiry.getTime()) > 86_400_000
    ) {
      warnings.push('EXPIRY_DATE_MISMATCH');
    }
  }

  return warnings;
}
