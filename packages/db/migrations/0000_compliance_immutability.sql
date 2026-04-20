CREATE OR REPLACE FUNCTION enforce_compliance_immutability()
RETURNS TRIGGER AS $$    
BEGIN
  RAISE EXCEPTION 'compliance_events is append-only';
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_compliance_immutable
  BEFORE UPDATE OR DELETE ON compliance_events
  FOR EACH ROW EXECUTE FUNCTION enforce_compliance_immutability();
