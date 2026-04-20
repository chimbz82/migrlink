import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@migralink/db';
import { complianceEvents } from '@migralink/db/schema';
import { createComplianceEvent } from '@migralink/compliance-engine';
import { eq, desc } from 'drizzle-orm';
import crypto from 'crypto';

export async function POST(req: Request) {
  const { userId, orgId } = auth();
  if (!userId || !orgId) return new NextResponse('Unauthorized', { status: 401 });

  const events = await db.query.complianceEvents.findMany({
    where: eq(complianceEvents.organizationId, orgId),
    orderBy: [desc(complianceEvents.occurredAt)]
  });

  let isValidChain = true;
  for (let i = 0; i < events.length - 1; i++) {
    if (events[i].hashPrev !== events[i+1].hashSelf) {
      isValidChain = false;
      break;
    }
  }

  const exportPayload = {
    exportedAt: new Date().toISOString(),
    organizationId: orgId,
    chainIntegrityValid: isValidChain,
    totalRecords: events.length,
    events
  };

  const auditReceiptHash = await createComplianceEvent(orgId, 'system', 'AUDIT_EXPORT_GENERATED', {
    triggeredBy: userId,
    totalRecords: events.length,
    verifiedClean: isValidChain,
  });

  return new NextResponse(JSON.stringify({ ...exportPayload, auditReceiptHash }, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'Content-Disposition': `attachment; filename="migralink_audit_chain_${orgId}.json"`
    }
  });
}
