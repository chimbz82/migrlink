import {
  pgTable,
  text,
  timestamp,
  uuid,
  jsonb,
  boolean,
  integer,
  pgEnum,
  uniqueIndex,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

// Enums
export const roleEnum = pgEnum('role', ['admin', 'hr', 'viewer', 'worker']);
export const docStatusEnum = pgEnum('doc_status', ['pending', 'verified', 'rejected', 'expired']);
export const cosStatusEnum = pgEnum('cos_status', ['unassigned', 'assigned', 'used', 'withdrawn']);

// 1. Organization
export const organizations = pgTable('organizations', {
  id: text('id').primaryKey(), // Clerk Org ID
  name: text('name').notNull(),
  sponsorLicenceNumber: text('sponsor_licence_number').notNull(),
  licenceRating: text('licence_rating').default('A (Premium)').notNull(),
  ukviSyncState: jsonb('ukvi_sync_state'), // Last sync timestamp & status
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// 2. User & Membership (Multi-tenant via Clerk)
export const users = pgTable('users', {
  id: text('id').primaryKey(), // Clerk User ID
  email: text('email').notNull(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const memberships = pgTable('memberships', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: text('organization_id')
    .references(() => organizations.id, { onDelete: 'cascade' })
    .notNull(),
  userId: text('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  role: roleEnum('role').default('viewer').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (t) => ({
  unq_org_user: uniqueIndex('unq_org_user').on(t.organizationId, t.userId),
}));

// 3. Worker
export const workers = pgTable('workers', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: text('organization_id')
    .references(() => organizations.id, { onDelete: 'cascade' })
    .notNull(),
  clerkUserId: text('clerk_user_id').references(() => users.id),
  legalNameComponents: jsonb('legal_name_components').notNull(), // { first, middle, last, knownAs }
  dateOfBirth: timestamp('date_of_birth').notNull(),
  nationality: text('nationality').notNull(),
  // Encrypted fields via pg-crypto extension
  passportNumberEncrypted: text('passport_number_encrypted'),
  saIdNumberEncrypted: text('sa_id_number_encrypted'),
  currentVisaId: uuid('current_visa_id'), // Self-reference added during inserts
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// 4. Visa / CoS
export const visas = pgTable('visas', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: text('organization_id')
    .references(() => organizations.id, { onDelete: 'cascade' })
    .notNull(),
  workerId: uuid('worker_id')
    .references(() => workers.id, { onDelete: 'cascade' })
    .notNull(),
  cosReferenceNumber: text('cos_reference_number').unique().notNull(),
  socCode: text('soc_code').notNull(),
  salary: integer('salary').notNull(),
  status: cosStatusEnum('status').default('unassigned').notNull(),
  issueDate: timestamp('issue_date'),
  expiryDate: timestamp('expiry_date'),
  ukviSyncState: jsonb('ukvi_sync_state'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 5. Document
export const documents = pgTable('documents', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: text('organization_id')
    .references(() => organizations.id, { onDelete: 'cascade' })
    .notNull(),
  workerId: uuid('worker_id')
    .references(() => workers.id, { onDelete: 'cascade' })
    .notNull(),
  r2ObjectKey: text('r2_object_key').notNull(),
  documentType: text('document_type').notNull(), // 'passport', 'visa', 'contract'
  sha256Hash: text('sha256_hash').notNull(), // Integrity check of the physical file
  scanResult: text('scan_result').default('pending').notNull(), // AV scan status
  ocrExtractedJson: jsonb('ocr_extracted_json'),
  expiryDate: timestamp('expiry_date'),
  status: docStatusEnum('status').default('pending').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 6. Compliance Event (The Moat - Immutable)
export const complianceEvents = pgTable('compliance_events', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: text('organization_id')
    .references(() => organizations.id, { onDelete: 'cascade' })
    .notNull(),
  workerId: uuid('worker_id')
    .references(() => workers.id, { onDelete: 'cascade' })
    .notNull(),
  eventType: text('event_type').notNull(), // e.g., 'DOC_UPLOAD', 'COS_ASSIGNED'
  occurredAt: timestamp('occurred_at').defaultNow().notNull(),
  payload: jsonb('payload').notNull(),
  hashPrev: text('hash_prev'), // Hash of the prior event for THIS organization
  hashSelf: text('hash_self').notNull(), // SHA256(hashPrev + payload + occurredAt)
});

// 7. Audit Log (General system actions, distinct from compliance events)
export const auditLogs = pgTable('audit_logs', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: text('organization_id')
    .references(() => organizations.id, { onDelete: 'cascade' })
    .notNull(),
  actor: text('actor').notNull(), // User logic / System
  entity: text('entity').notNull(), // Table name
  action: text('action').notNull(), // INSERT, UPDATE, DELETE
  diff: jsonb('diff').notNull(), // { before: {}, after: {} }
  occurredAt: timestamp('occurred_at').defaultNow().notNull(),
});

// 8. SA Verification (South African ID / SAQA specific)
export const saVerifications = pgTable('sa_verifications', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: text('organization_id')
    .references(() => organizations.id, { onDelete: 'cascade' })
    .notNull(),
  workerId: uuid('worker_id')
    .references(() => workers.id, { onDelete: 'cascade' })
    .notNull(),
  verificationType: text('verification_type').notNull(), // 'DHA', 'SAQA'
  provider: text('provider').notNull(), // e.g., 'LexisNexis', 'SAQA_Portal'
  status: text('status').default('pending').notNull(),
  resultPayloadEncrypted: text('result_payload_encrypted'), // Encrypted PII payload
  createdAt: timestamp('created_at').defaultNow().notNull(),
  completedAt: timestamp('completed_at'),
});

// 9. Consent Record (GDPR / POPIA)
export const consentRecords = pgTable('consent_records', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: text('organization_id')
    .references(() => organizations.id, { onDelete: 'cascade' })
    .notNull(),
  workerId: uuid('worker_id')
    .references(() => workers.id, { onDelete: 'cascade' })
    .notNull(),
  lawfulBasis: text('lawful_basis').notNull(), // 'contract', 'legal_obligation', 'consent'
  jurisdiction: text('jurisdiction').notNull(), // 'UK_GDPR', 'ZA_POPIA'
  consentGiven: boolean('consent_given').notNull(),
  ipAddress: text('ip_address'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 10. Reminder Schedule (Inngest tracking)
export const reminderSchedules = pgTable('reminder_schedules', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: text('organization_id')
    .references(() => organizations.id, { onDelete: 'cascade' })
    .notNull(),
  workerId: uuid('worker_id') // Optional, could be an org-wide reminder
    .references(() => workers.id, { onDelete: 'cascade' }),
  relatedEntityId: uuid('related_entity_id'), // e.g. Document ID or Visa ID
  reminderType: text('reminder_type').notNull(), // 'VISA_EXPIRY', 'PASSPORT_EXPIRY'
  scheduledFor: timestamp('scheduled_for').notNull(),
  isSent: boolean('is_sent').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
