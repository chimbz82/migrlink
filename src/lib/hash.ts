import { createHash } from 'crypto';
import canonicalize from 'canonicalize';
import { db } from './index'; // Assume standard drizzle instance exported here
import { complianceEvents } from '../../packages/db/schema';
import { desc, eq } from 'drizzle-orm';

/**
 * Creates an immutable, cryptographically chained compliance event.
 * Uses SHA-256 and pure JSON canonicalization to ensure strict hash integrity.
 */
export async function createComplianceEvent(
  orgId: string,
  workerId: string,
  eventType: string,
  payload: Record<string, any>
): Promise<string> {
  return await db.transaction(async (tx) => {
    // 1. Fetch the latest event for this organization to link the chain
    // Using FOR UPDATE ensures strictly serialized event appending per tenant to prevent fork/race conditions
    const result = await tx.execute(
      sql`SELECT hash_self FROM compliance_events 
          WHERE organization_id = ${orgId} 
          ORDER BY occurred_at DESC LIMIT 1 FOR UPDATE`
    );
    
    const lastEvent = result.rows[0] as { hash_self: string } | undefined;
    const prevHash = lastEvent ? lastEvent.hash_self : 'GENESIS_BLOCK';

    const occurredAt = new Date().toISOString();

    // 2. Canonicalize the payload to ensure identical keys always produce identical string structure
    // canonicalize() guarantees RFC 8785 JSON canonicalization (sorted keys, stripped whitespace)
    const canonicalPayload = canonicalize(payload) || '{}';

    // 3. Construct the exact structure to be hashed
    // We use a strictly delimited string or a canonicalized wrapper object. Delimited is safer against nesting overlap.
    const rawString = `${prevHash}|${orgId}|${workerId}|${eventType}|${occurredAt}|${canonicalPayload}`;

    // 4. Generate SHA-256 Hash
    const hash = createHash('sha256');
    hash.update(rawString);
    const selfHash = hash.digest('hex');

    // 5. Append to the chain
    await tx.insert(complianceEvents).values({
      organizationId: orgId,
      workerId: workerId,
      eventType: eventType,
      occurredAt: new Date(occurredAt),
      payload: JSON.parse(canonicalPayload), // Store back as JSONB
      hashPrev: prevHash === 'GENESIS_BLOCK' ? null : prevHash,
      hashSelf: selfHash,
    });

    return selfHash;
  });
}
