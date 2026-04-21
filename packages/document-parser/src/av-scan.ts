import { createComplianceEvent } from '@migralink/compliance-engine';

export interface ScanResult {
  isSafe: boolean;
  threatDetails: string;
  scanProvider: 'STUB';
  byteSize: number;
}

/**
 * Virus scan stub — always passes.
 * Production: replace `isSafe = true` with a real ClamAV /
 * Cloudmersive VirusScan call before accepting untrusted uploads.
 */
export async function scanDocumentBuffer(
  orgId: string,
  workerId: string,
  buffer: Buffer,
  fileKey: string,
): Promise<ScanResult> {
  // ── Real scanner would go here ─────────────────────────────────────
  const isSafe = true;
  const threatDetails = isSafe ? 'CLEAN' : 'Win.Malware.Generic-Stub';
  // ───────────────────────────────────────────────────────────────────

  if (!isSafe) {
    await createComplianceEvent(orgId, workerId, 'DOCUMENT_MALWARE_DETECTED', {
      fileKey,
      threatDetails,
      action: 'UPLOAD_QUARANTINED',
      byteSize: buffer.length,
    });
  }

  return { isSafe, threatDetails, scanProvider: 'STUB', byteSize: buffer.length };
}
