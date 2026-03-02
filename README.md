# FenceFind 🏗️

Find trusted fence contractors near you. Compare ratings, read reviews, and get free estimates from licensed professionals.

## Tech Stack

- **Framework:** Next.js 16 (App Router, TypeScript)
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL + PostGIS)
- **Hosting:** Vercel
- **Data:** Google Places API scraper

## Getting Started

```bash
npm install
npm run dev
```

Opens at http://localhost:3000

## Setup

### 1. Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Run `scripts/supabase-schema.sql` in the SQL Editor
3. Copy your keys to `.env.local` (see `.env.example`)

### 2. Seed Data (Google Places)

```bash
GOOGLE_PLACES_API_KEY=your_key npx tsx scripts/scrape-google-places.ts
```

This scrapes fence contractors across 100+ US cities. Costs ~$5-15 in API credits (covered by Google's $200/mo free tier).

### 3. Import to Supabase

```bash
NEXT_PUBLIC_SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... npx tsx scripts/import-to-supabase.ts
```

### 4. Deploy

```bash
npx vercel
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with search, featured contractors, browse by state/city |
| `/search?q=...` | Search results |
| `/contractor/[slug]` | Contractor profile with Schema.org structured data |
| `/state/[slug]` | State landing page (SEO) |
| `/city/[slug]` | City landing page (SEO) |
| `/states` | Browse all 50 states |
| `/claim` | Business listing claim form |

## Monetization

- **Free listings:** Basic profile for all contractors
- **Premium ($99/mo):** Featured placement, verified badge, lead notifications, analytics
- **Lead gen:** Charge per quote request ($10-50/lead)

## SEO Strategy

- Pre-rendered state/city pages targeting "[city] fence contractor" searches
- Schema.org LocalBusiness structured data on every contractor page
- Auto-generated sitemap.xml
- Content sections with fence cost guides and buying advice

