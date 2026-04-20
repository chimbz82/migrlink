import { inngest } from './client';
import { db } from '@migralink/db';
import { workers, organizations } from '@migralink/db/schema';
import { stripe } from '@migralink/web/lib/stripe';
import { eq, sql } from 'drizzle-orm';

export const reportStripeMetering = inngest.createFunction(
  { id: "stripe-metered-billing" },
  { cron: "0 0 1 * *" },
  async ({ step }) => {
    const orgs = await step.run("fetch-active-subscriptions", async () => {
      return await db.select().from(organizations).where(sql`subscription_tier != 'free'`);
    });

    for (const org of orgs) {
      await step.run(`meter-org-${org.id}`, async () => {
        const workerCountResult = await db.select({ count: sql`count(*)` }).from(workers).where(eq(workers.organizationId, org.id));
        const totalWorkers = Number(workerCountResult[0].count);

        const stripeSubscriptionItemId = "si_placeholder"; 
        if (stripeSubscriptionItemId && totalWorkers > 0) {
          await stripe.subscriptionItems.createUsageRecord(stripeSubscriptionItemId, {
            quantity: totalWorkers,
            timestamp: Math.floor(Date.now() / 1000),
            action: 'set', 
          });
        }
      });
    }

    return { success: true };
  }
);
