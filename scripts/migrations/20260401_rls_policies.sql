-- P7: RLS policies for contractors, claim_requests, quote_requests
-- Run this in Supabase SQL Editor AFTER 20260401_auth_profiles.sql

-- ============================================================
-- CONTRACTORS
-- ============================================================
ALTER TABLE contractors ENABLE ROW LEVEL SECURITY;

-- Public can read all contractors (existing behavior for public pages)
CREATE POLICY "Public read contractors" ON contractors
  FOR SELECT TO anon, authenticated USING (true);

-- Owners can update their own contractor row
CREATE POLICY "Owners can update own contractor" ON contractors
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Service role full access (for admin API routes, webhooks, etc.)
CREATE POLICY "Service role full access on contractors" ON contractors
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- ============================================================
-- CLAIM REQUESTS
-- ============================================================
ALTER TABLE claim_requests ENABLE ROW LEVEL SECURITY;

-- Anyone can insert a claim request (public claim form)
CREATE POLICY "Public can submit claims" ON claim_requests
  FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Service role full access (admin reads/updates via service client)
CREATE POLICY "Service role full access on claims" ON claim_requests
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- ============================================================
-- QUOTE REQUESTS
-- ============================================================
ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;

-- Anyone can insert a quote request (public quote form)
CREATE POLICY "Public can submit quotes" ON quote_requests
  FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Contractors can read their own quotes
CREATE POLICY "Contractors can read own quotes" ON quote_requests
  FOR SELECT TO authenticated
  USING (
    contractor_id IN (
      SELECT c.id FROM contractors c WHERE c.user_id = auth.uid()
    )
  );

-- Service role full access (admin reads all via service client)
CREATE POLICY "Service role full access on quotes" ON quote_requests
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- ============================================================
-- PAGEVIEWS (analytics — admin only via service client)
-- ============================================================
ALTER TABLE pageviews ENABLE ROW LEVEL SECURITY;

-- Anyone can insert pageviews (tracker)
CREATE POLICY "Public can insert pageviews" ON pageviews
  FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Service role full access (admin analytics reads)
CREATE POLICY "Service role full access on pageviews" ON pageviews
  FOR ALL TO service_role USING (true) WITH CHECK (true);
