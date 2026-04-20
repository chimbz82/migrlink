import { TextractClient, AnalyzeIDCommand } from '@aws-sdk/client-textract';

const textractClient = new TextractClient({ region: 'eu-west-2' });

export interface OCRResult {
  provider: string;
  mrzRaw: string;
  extractedData: Record<string, string>;
  confidence: number;
}

export async function processIdentityDocument(fileBuffer: Buffer, mimeType: string): Promise<OCRResult> {
  try {
    const command = new AnalyzeIDCommand({
      DocumentPages: [{ Bytes: fileBuffer }]
    });

    const response = await textractClient.send(command);
    const fields = response.IdentityDocuments?.[0]?.IdentityDocumentFields || [];
    
    const extractedData: Record<string, string> = {};
    for (const field of fields) {
      if (field.Type?.Text && field.ValueDetection?.Text) {
        extractedData[field.Type.Text] = field.ValueDetection.Text;
      }
    }

    return {
      provider: 'AWS_TEXTRACT',
      extractedData,
      mrzRaw: extractedData['MRZ_CODE'] || '',
      confidence: 0.95
    };
  } catch (error) {
    throw new Error("OCR_PIPELINE_EXHAUSTED");
  }
}

export function detectMismatches(ocrData: Record<string, string>, storedWorkerData: any): string[] {
  const warnings: string[] = [];
  if (ocrData['DOCUMENT_NUMBER'] && storedWorkerData.passportNumber && ocrData['DOCUMENT_NUMBER'] !== storedWorkerData.passportNumber) {
    warnings.push('PASSPORT_NUMBER_MISMATCH');
  }
  return warnings;
}
