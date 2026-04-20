import { inngest } from './client';
import { db } from '@migralink/db';
import { visas } from '@migralink/db/schema';
import { createComplianceEvent } from '@migralink/compliance-engine';
import { lte, and, isNotNull } from 'drizzle-orm';

export const checkComplianceDeadlines = inngest.createFunction(
  { id: "compliance-deadline-cron" },
  { cron: "0 8 * * 1" },
  async ({ step }) => {
    const ninetyDaysOut = new Date();
    ninetyDaysOut.setDate(ninetyDaysOut.getDate() + 90);

    const expiringVisas = await step.run("fetch-expiring-visas", async () => {
      return await db.select().from(visas).where(
        and(isNotNull(visas.expiryDate), lte(visas.expiryDate, ninetyDaysOut))
      );
    });

    await step.run("emit-warning-events", async () => {
      for (const visa of expiringVisas) {
        await createComplianceEvent(visa.organizationId, visa.workerId, 'VISA_EXPIRY_WARNING_ISSUED', {
          visaId: visa.id,
          expiryDate: visa.expiryDate,
          cosReference: visa.cosReferenceNumber,
        });
      }
    });

    return { processedCount: expiringVisas.length };
  }
);
