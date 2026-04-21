import { pgTable, varchar, text, timestamp, jsonb, boolean } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

/**
 * Enhanced Consent Records (GDPR & POPIA compliant)
 * Tracks exactly who consented to what, why, and from where.
 */
export const consentRecords = pgTable('consent_records', {
  id: varchar('id', { length: 191 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  workerId: varchar('worker_id', { length: 191 }).notNull(),
  organizationId: varchar('organization_id', { length: 191 }).notNull(),
  
  // Legal Basis: Usually 'legal_obligation' for immigration, or 'contract'
  lawfulBasis: varchar('lawful_basis', { length: 50 }).notNull(), 
  
  // Targeted Jurisdictions: 'UK_GDPR', 'ZA_POPIA'
  jurisdictions: jsonb('jurisdictions').notNull().default(sql`'["UK_GDPR", "ZA_POPIA"]'::jsonb`),
  
  consentVersion: varchar('consent_version', { length: 50 }).notNull(), // e.g., 'v1.0.2'
  ipAddress: varchar('ip_address', { length: 45 }), // IPv4 or IPv6 tracking
  userAgent: text('user_agent'),
  
  consentGiven: boolean('consent_given').default(true).notNull(),
  withdrawnAt: timestamp('withdrawn_at', { mode: 'date' }),
  
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});
