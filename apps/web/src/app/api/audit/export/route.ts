import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { createComplianceEvent, verifyChainIntegrity } from '@migralink/compliance-engine';
import { db } from '@migralink/db';
import { complianceEvents } from '@migralink/db/schema';
import { eq, desc } from 'drizzle-orm';

export async function POST() {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const events = await db.query.complianceEvents.findMany({
    where: eq(complianceEvents.organizationId, orgId),
    orderBy: [desc(complianceEvents.occurredAt)],
  });

  const { valid } = await verifyChainIntegrity(orgId);

  const exportPayload = {
    exportedAt: new Date().toISOString(),
    organizationId: orgId,
    exportedBy: userId,
    chainIntegrityValid: valid,
    totalRecords: events.length,
    events,
  };

  // Log the export action itself (extends the chain)
  await createComplianceEvent(orgId, null, 'AUDIT_EXPORT_GENERATED', {
    triggeredBy: userId,
    totalRecords: events.length,
    verifiedClean: valid,
  });

  return new NextResponse(JSON.stringify(exportPayload, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'Content-Disposition': `attachment; filename="migralink_audit_${orgId}_${Date.now()}.json"`,
    },
  });
}
