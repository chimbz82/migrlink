-- packages/db/audit.sql

-- 1. Ensure the Audit Logs table is Strictly Append-Only (Tamper Protection)
CREATE OR REPLACE FUNCTION prevent_audit_modification()
RETURNS TRIGGER AS $$
BEGIN
    RAISE EXCEPTION 'Audit logs are immutable and cannot be updated or deleted.';
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER enforce_append_only_audit_logs
BEFORE UPDATE OR DELETE ON audit_logs
FOR EACH ROW EXECUTE FUNCTION prevent_audit_modification();

-- 2. pgAudit configuration for tracking PII reads at the database layer (if using Neon managed pgAudit plugin)
-- This logs all SELECT statements on the 'workers' and 'documents' tables to Postgres logs
-- CREATE EXTENSION IF NOT EXISTS pgaudit;
-- ALTER TABLE workers SET (pgaudit.log = 'read');
-- ALTER TABLE documents SET (pgaudit.log = 'read');
