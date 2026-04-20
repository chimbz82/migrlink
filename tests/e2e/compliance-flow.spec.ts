import { test, expect } from '@playwright/test';
import crypto from 'crypto';

test.describe('MigraLink Compliance & MVP MVP Core Flows', () => {

  test('Document Pipeline -> Emmits Hash-Chained ComplianceEvent', async ({ request }) => {
    // 1. Authenticate (Assume seeded test token for Organization Admin)
    const token = process.env.TEST_ADMIN_TOKEN!;

    // 2. Upload Document logic simulating R2
    const uploadRes = await request.post('/api/docs', {
      headers: { Authorization: `Bearer ${token}` },
      data: { workerId: 'test_worker_1', contentType: 'image/jpeg', documentType: 'PASSPORT' }
    });
    const { fileKey } = await uploadRes.json();
    expect(fileKey).toBeDefined();

    // 3. Trigger Inngest Processing
    await request.put('/api/docs', {
      headers: { Authorization: `Bearer ${token}` },
      data: { workerId: 'test_worker_1', fileKey, documentType: 'PASSPORT', mimeType: 'image/jpeg' }
    });

    // 4. Wait for async processing (Inngest durable execution)
    await new Promise(resolve => setTimeout(resolve, 5000));

    // 5. Verify Compliance Event Existence
    const auditRes = await request.post('/api/audit/export', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const auditData = await auditRes.json();
    
    const ocrEvent = auditData.events.find((e: any) => e.eventType === 'DOCUMENT_OCR_COMPLETED');
    expect(ocrEvent).toBeDefined();
    expect(ocrEvent.payload.provider).toBeDefined();
  });

  test('Audit Export Chain is Cryptographically Valid', async ({ request }) => {
    const token = process.env.TEST_ADMIN_TOKEN!;
    
    const auditRes = await request.post('/api/audit/export', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const { events, chainIntegrityValid } = await auditRes.json();

    expect(chainIntegrityValid).toBe(true);

    // Manually verify the hash of the latest event
    if (events.length > 0) {
      const latestEvent = events[0];
      const previousHash = events.length > 1 ? events[1].hashSelf : 'GENESIS';
      
      const canonicalPayload = JSON.stringify(latestEvent.payload); // Requires canonical stringify in prod
      const expectedHash = crypto.createHash('sha256')
        .update(`${latestEvent.id}|${latestEvent.organizationId}|${latestEvent.workerId}|${latestEvent.eventType}|${latestEvent.occurredAt}|${canonicalPayload}|${previousHash}`)
        .digest('hex');

      // Verify the tamper-evident moat
      expect(latestEvent.hashSelf).toBe(expectedHash);
    }
  });
});
