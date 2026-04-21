import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@migralink/db';
import { workers, complianceEvents } from '@migralink/db/schema';
import { createComplianceEvent } from '@migralink/compliance-engine';
import { eq } from 'drizzle-orm';

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return new NextResponse('Unauthorized', { status: 401 });

  const worker = await db.query.workers.findFirst({
    where: eq(workers.clerkUserId, userId)
  });

  if (!worker) return new NextResponse('Profile not found', { status: 404 });

  const history = await db.query.complianceEvents.findMany({
    where: eq(complianceEvents.workerId, worker.id)
  });

  const dsarPayload = {
    requestTimestamp: new Date().toISOString(),
    personalData: { names: worker.legalNameComponents, nationality: worker.nationality },
    auditTrail: history
  };

  await createComplianceEvent(worker.organizationId, worker.id, 'WORKER_DSAR_EXPORTED', {
    method: 'Self-Service Portal', recordsExported: history.length
  });

  return new NextResponse(JSON.stringify(dsarPayload, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'Content-Disposition': `attachment; filename="migralink_data_.json"`
    }
  });
}
