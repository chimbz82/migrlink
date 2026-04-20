import { pgTable, uuid, text, timestamp, jsonb } from 'drizzle-orm/pg-core';

export const complianceEvents = pgTable('compliance_events', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: text('organization_id').notNull(),
  workerId: uuid('worker_id'), // can be null for system events

  eventType: text('event_type').notNull(),
  occurredAt: timestamp('occurred_at', { mode: 'date' }).defaultNow().notNull(),
  payload: jsonb('payload').notNull(),

  hashPrev: text('hash_prev'),        // null for the first event
  hashSelf: text('hash_self').notNull(), // SHA-256 of the entire row content
});
