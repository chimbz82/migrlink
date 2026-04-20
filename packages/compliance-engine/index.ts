import { createHash } from 'crypto';
import canonicalize from 'canonicalize';
import { db } from '@migralink/db';
import { complianceEvents } from '@migralink/db/schema';
import { eq, desc } from 'drizzle-orm';

export async function createComplianceEvent(
  organizationId: string,
  workerId: string | null,
  eventType: string,
  payload: Record<string, any> = {}
) {
  return db.transaction(async (tx) => {
    // Get the most recent event for this organization (FOR UPDATE prevents race conditions)
    const [lastEvent] = await tx
      .select({ hashSelf: complianceEvents.hashSelf })
      .from(complianceEvents)
      .where(eq(complianceEvents.organizationId, organizationId))
      .orderBy(desc(complianceEvents.occurredAt))
      .limit(1)
      .for('update');

    const prevHash = lastEvent?.hashSelf ?? null;

    const occurredAt = new Date();

    // Canonical JSON ensures identical objects always produce the same string
    const canonicalPayload = canonicalize(payload) || '{}';

    // Build deterministic string for hashing
    const toHash = `${prevHash ?? 'GENESIS'}|${organizationId}|${workerId ?? 'SYSTEM'}|${eventType}|${occurredAt.toISOString()}|${canonicalPayload}`;

    const hashSelf = createHash('sha256').update(toHash).digest('hex');

    const [newEvent] = await tx
      .insert(complianceEvents)
      .values({
        organizationId,
        workerId: workerId || undefined,
        eventType,
        occurredAt,
        payload,
        hashPrev: prevHash,
        hashSelf,
      })
      .returning();

    return newEvent;
  });
}

// Verify the entire chain for an organization (used in audit export)
export async function verifyChainIntegrity(organizationId: string) {
  const events = await db
    .select()
    .from(complianceEvents)
    .where(eq(complianceEvents.organizationId, organizationId))
    .orderBy(complianceEvents.occurredAt); // oldest first

  for (let i = 1; i < events.length; i++) {
    const current = events[i];
    const previous = events[i - 1];

    if (current.hashPrev !== previous.hashSelf) {
      return {
        valid: false,
        firstCorruptedId: current.id,
      };
    }
  }

  return { valid: true };
}
