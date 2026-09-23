-- Email blocklist to prevent spam submissions
CREATE TABLE IF NOT EXISTS email_blocklist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  reason TEXT,
  blocked_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for quick lookups
CREATE INDEX IF NOT EXISTS idx_email_blocklist_email ON email_blocklist (email);

-- Enable RLS
ALTER TABLE email_blocklist ENABLE ROW LEVEL SECURITY;

-- Allow service role full access
CREATE POLICY "Service role full access" ON email_blocklist
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Block known spam emails
INSERT INTO email_blocklist (email, reason) VALUES
  ('info@mdastra.com', 'Digital marketing spam - not a fence contractor'),
  ('mdastra02@gmail.com', 'Digital marketing spam - not a fence contractor')
ON CONFLICT (email) DO NOTHING;
