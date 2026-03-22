# FenceFind

Fence contractor directory covering 500+ US cities. Live at [getfencefind.com](https://getfencefind.com).

## Tech Stack

- **Framework:** Next.js 16 (App Router, TypeScript)
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **Payments:** Stripe ($199/mo Pro subscriptions)
- **Email:** Google Workspace (matt@getfencefind.com) + Resend (transactional)
- **Hosting:** Vercel (auto-deploys on push to main)
- **SEO:** Google Search Console, structured data, programmatic pages
- **Analytics:** Self-hosted pageview tracking

## Getting Started

```bash
npm install
cp .env.example .env.local  # fill in your keys
npm run dev
```

Opens at http://localhost:3000

## Setup

### Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Run `scripts/supabase-schema.sql` in the SQL Editor
3. Add keys to `.env.local`

### Scraping Contractors

```bash
npx tsx scripts/scrape-places-new.ts
```

Scrapes fence contractors via Google Places API (new) across 500 target cities. Results save to `data/contractors.json` with deduplication. Costs ~$16 for 500 cities (covered by Google's $200/mo free tier).

### Importing to Supabase

```bash
npx tsx scripts/import-to-supabase.ts
```

Upserts scraped data into Supabase and updates city contractor counts.

### Description Enrichment

```bash
npx tsx scripts/update-descriptions.ts
```

Rewrites generic contractor descriptions with richer, location-specific copy.

### Google Search Console

```bash
npx tsx scripts/gsc.ts submit-sitemap
npx tsx scripts/gsc.ts request-indexing
npx tsx scripts/gsc.ts performance
npx tsx scripts/gsc.ts indexing-status
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage — search, featured contractors, top states/cities |
| `/search?q=...` | Search results |
| `/contractor/[slug]` | Contractor profile with LocalBusiness structured data |
| `/state/[slug]` | State landing page |
| `/city/[slug]` | City landing page |
| `/states` | Browse all 50 states with real contractor counts |
| `/claim` | Business listing claim form |
| `/pricing` | Pro tier pricing ($199/mo) |
| `/pro/signup` | Stripe checkout flow |
| `/guides/*` | 10 SEO guide pages (cost, materials, permits, etc.) |
| `/blog/*` | Blog posts |
| `/fence-cost/[slug]` | Programmatic fence cost pages (91 cities) |
| `/fence-permits/[slug]` | Programmatic permit pages (91 cities) |
| `/fence-cost-by-state` | State-by-state cost comparison |
| `/admin/analytics` | Self-hosted analytics dashboard |

## API Routes

| Route | Description |
|-------|-------------|
| `POST /api/claims` | Submit a business claim request |
| `POST /api/quotes` | Submit a quote request |
| `POST /api/stripe/checkout` | Create Stripe checkout session |
| `POST /api/stripe/webhook` | Handle Stripe subscription lifecycle |
| `GET /api/stripe/portal` | Redirect to Stripe customer portal |
| `POST /api/analytics/track` | Record pageview |
| `GET /api/analytics/data` | Query analytics data |

## Monetization

- **Free listings:** All scraped contractors get a profile page
- **Pro ($199/mo):** Featured placement, verified badge, priority in search
- **Stripe integration:** Checkout, webhooks for subscription lifecycle (upgrade, cancel, payment failure)

## Data

- **5,100+ contractors** across **490+ cities** in all 50 states
- Sourced from Google Places API
- `data/contractors.json` is a local scraper cache (gitignored)
- Supabase is the source of truth for the live site

## Deploy

Push to `main` — Vercel auto-deploys.

```bash
git push origin main
```
