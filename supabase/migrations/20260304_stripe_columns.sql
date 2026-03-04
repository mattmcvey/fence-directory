-- Add Stripe subscription columns to contractors table
ALTER TABLE contractors ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT;
ALTER TABLE contractors ADD COLUMN IF NOT EXISTS stripe_subscription_id TEXT;
ALTER TABLE contractors ADD COLUMN IF NOT EXISTS subscription_status TEXT DEFAULT 'free';
ALTER TABLE contractors ADD COLUMN IF NOT EXISTS pro_since TIMESTAMPTZ;

-- Index for quick lookup by stripe customer
CREATE INDEX IF NOT EXISTS idx_contractors_stripe_customer ON contractors (stripe_customer_id);
