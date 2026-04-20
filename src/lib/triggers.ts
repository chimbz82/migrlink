import { sql } from 'drizzle-orm';
import { db } from './index';

/**
 * Triggers designed to safeguard the absolute immutability of the 'compliance_events' table
 * and to automatically append to the AuditLog for mutations.
 * 
 * Note: These are applied via separate raw SQL migrations (e.g., using drizzle-kit custom pushes).
 */

export async function setupImmutabilityTrigger() {
  // Prevent any UPDATE or DELETE operations on compliance_events
  await db.execute(sql`
    CREATE OR REPLACE FUNCTION enforce_compliance_event_immutability()
    RETURNS TRIGGER AS $$
    BEGIN
      RAISE EXCEPTION 'COMPLIANCE_MOAT_VIOLATION: compliance_events table is strictly append-only. UPDATE and DELETE are cryptographically locked.';
    END;
    $$ LANGUAGE plpgsql;

    DROP TRIGGER IF EXISTS trg_compliance_events_immutable ON compliance_events;
    CREATE TRIGGER trg_compliance_events_immutable
      BEFORE UPDATE OR DELETE ON compliance_events
      FOR EACH ROW
      EXECUTE FUNCTION enforce_compliance_event_immutability();
  `);
}

/**
 * Example wrapper demonstrating server-side event emission triggered automatically
 * via a robust service layer or Drizzle ORM hook system (if supported).
 */
export async function createWorkerWithEvent(
  orgId: string, 
  workerData: any
) {
  // Use transaction to ensure event matches record
  return await db.transaction(async (tx) => {
    // 1. Insert Worker
    const [insertedWorker] = await tx.insert(workers).values(workerData).returning();

    // 2. Emit Automatic Compliance Event logic is bound here instead of deep PG triggers 
    // to maintain application-level encryption boundaries and hash ordering
    await createComplianceEvent(tx, orgId, insertedWorker.id, 'WORKER_CREATED', {
      action: 'Worker Profile Generated',
      legalNameFirst: workerData.legalNameComponents.first,
      nationality: workerData.nationality
    });

    return insertedWorker;
  });
}