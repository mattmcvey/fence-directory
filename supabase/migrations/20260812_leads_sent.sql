-- Track leads sent to contractors
CREATE TABLE IF NOT EXISTS leads_sent (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  contractor_id UUID REFERENCES contractors(id) ON DELETE CASCADE,
  contractor_name TEXT NOT NULL,
  homeowner_name TEXT NOT NULL,
  homeowner_email TEXT NOT NULL,
  homeowner_phone TEXT,
  zip_code TEXT NOT NULL,
  fence_type TEXT,
  material TEXT,
  approximate_length TEXT,
  message TEXT,
  sent_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for quick contractor lookups
CREATE INDEX IF NOT EXISTS idx_leads_sent_contractor ON leads_sent (contractor_id);
CREATE INDEX IF NOT EXISTS idx_leads_sent_sent_at ON leads_sent (sent_at DESC);

-- Enable RLS
ALTER TABLE leads_sent ENABLE ROW LEVEL SECURITY;

-- Allow service role full access (for admin operations)
CREATE POLICY "Service role full access" ON leads_sent
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- View for lead counts by contractor
CREATE OR REPLACE VIEW contractor_lead_counts AS
SELECT
  c.id,
  c.name,
  c.city,
  c.state,
  COUNT(ls.id) as total_leads_sent,
  MAX(ls.sent_at) as last_lead_sent
FROM contractors c
LEFT JOIN leads_sent ls ON c.id = ls.contractor_id
GROUP BY c.id, c.name, c.city, c.state;
