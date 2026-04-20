-- Raw Postgres SQL for establishing Row Level Security (RLS)
-- To be run inside a Drizzle custom migration or Neon SQL editor.

-- 1. Enable RLS on all sensitive tables
ALTER TABLE workers ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE visas ENABLE ROW LEVEL SECURITY;
ALTER TABLE compliance_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE sa_verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE consent_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE reminder_schedules ENABLE ROW LEVEL SECURITY;

-- 2. Define standard isolation policy
-- We assume the appliction middleware always sets the application_name or a custom GUC
-- e.g., SET LOCAL app.current_organization_id = 'org_abc123';
-- In standard NextJS contexts, we often pass it directly in the query, but true RLS requires setting it in the transaction.

-- Worker Policy
CREATE POLICY isolation_tenant_workers ON workers
  AS RESTRICTIVE FOR ALL
  TO authenticated
  USING (organization_id = current_setting('app.current_organization_id', true));

-- Documents Policy
CREATE POLICY isolation_tenant_documents ON documents
  AS RESTRICTIVE FOR ALL
  TO authenticated
  USING (organization_id = current_setting('app.current_organization_id', true));

-- Compliance Events (Restrictive Selects, Append-Only verified in trigger)
CREATE POLICY isolation_tenant_compliance_events ON compliance_events
  AS RESTRICTIVE FOR ALL
  TO authenticated
  USING (organization_id = current_setting('app.current_organization_id', true));

-- Continue for other tables...
CREATE POLICY isolation_tenant_visas ON visas
  AS RESTRICTIVE FOR ALL
  TO authenticated
  USING (organization_id = current_setting('app.current_organization_id', true));
