import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const organizations = sqliteTable('organizations', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  ukviLicenseNumber: text('ukvi_license_number'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  organizationId: text('organization_id').references(() => organizations.id),
  email: text('email').notNull(),
  role: text('role').notNull(), // 'admin', 'hr', 'viewer'
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});

export const workers = sqliteTable('workers', {
  id: text('id').primaryKey(),
  organizationId: text('organization_id').references(() => organizations.id),
  legalNameFirst: text('legal_name_first').notNull(),
  legalNameLast: text('legal_name_last').notNull(),
  saVerificationId: text('sa_verification_id'),
  visaExpiry: text('visa_expiry'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});

export const complianceEvents = sqliteTable('compliance_events', {
  id: text('id').primaryKey(),
  organizationId: text('organization_id').references(() => organizations.id),
  workerId: text('worker_id').references(() => workers.id),
  eventType: text('event_type').notNull(), // e.g., 'DOCUMENT_UPLOAD', 'VISA_EXPIRY_WARNING'
  payload: text('payload').notNull(), // JSON string
  hashPrev: text('hash_prev'),
  hashSelf: text('hash_self').notNull(),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});

export const documents = sqliteTable('documents', {
  id: text('id').primaryKey(),
  organizationId: text('organization_id').references(() => organizations.id),
  workerId: text('worker_id').references(() => workers.id),
  fileName: text('file_name').notNull(),
  documentType: text('document_type').notNull(), // 'passport', 'visa', 'contract'
  status: text('status').notNull(), // 'pending', 'verified', 'rejected'
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});
