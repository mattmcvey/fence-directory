-- Pageview tracking table
CREATE TABLE IF NOT EXISTS pageviews (
  id BIGSERIAL PRIMARY KEY,
  path TEXT NOT NULL,
  referrer TEXT,
  user_agent TEXT,
  country TEXT,
  city TEXT,
  region TEXT,
  device_type TEXT, -- mobile, tablet, desktop
  browser TEXT,
  os TEXT,
  session_id TEXT, -- anonymous hash, rotates daily like Vercel
  is_unique BOOLEAN DEFAULT true, -- first pageview of this session
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for common queries
CREATE INDEX idx_pageviews_created_at ON pageviews (created_at);
CREATE INDEX idx_pageviews_path ON pageviews (path);
CREATE INDEX idx_pageviews_session_id ON pageviews (session_id);

-- Enable RLS
ALTER TABLE pageviews ENABLE ROW LEVEL SECURITY;

-- Allow inserts from anon (for tracking) but no reads
CREATE POLICY "Allow anonymous inserts" ON pageviews
  FOR INSERT TO anon WITH CHECK (true);

-- Allow service role full access (for dashboard)
CREATE POLICY "Service role full access" ON pageviews
  FOR ALL TO service_role USING (true) WITH CHECK (true);
