/**
 * Import scraped contractor data into Supabase
 * 
 * Usage: 
 *   NEXT_PUBLIC_SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... npx tsx scripts/import-to-supabase.ts
 */

import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const DATA_FILE = path.join(__dirname, '..', 'data', 'contractors.json');

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function inferServices(name: string): string[] {
  const services: string[] = ['installation', 'residential'];
  const lower = name.toLowerCase();
  if (lower.includes('repair')) services.push('repair');
  if (lower.includes('gate')) services.push('gates');
  if (lower.includes('commercial')) services.push('commercial');
  if (lower.includes('stain')) services.push('staining');
  return services;
}

function inferMaterials(name: string): string[] {
  const materials: string[] = [];
  const lower = name.toLowerCase();
  if (lower.includes('wood') || lower.includes('cedar')) materials.push('wood');
  if (lower.includes('vinyl') || lower.includes('pvc')) materials.push('vinyl');
  if (lower.includes('chain') || lower.includes('link')) materials.push('chain-link');
  if (lower.includes('iron') || lower.includes('ornamental')) materials.push('wrought-iron');
  if (lower.includes('aluminum')) materials.push('aluminum');
  if (lower.includes('steel')) materials.push('steel');
  // Default materials if none detected from name
  if (materials.length === 0) materials.push('wood', 'vinyl', 'chain-link');
  return materials;
}

function generateDescription(c: ScrapedContractor, materials: string[], services: string[]): string {
  const parts: string[] = [];

  // Opening with rating info if available
  if (c.rating >= 4.0 && c.reviewCount >= 5) {
    parts.push(`${c.name} is a ${c.rating}-star rated fence contractor in ${c.city}, ${c.state} with ${c.reviewCount} reviews.`);
  } else {
    parts.push(`${c.name} is a fence contractor serving ${c.city}, ${c.state} and surrounding areas.`);
  }

  // Second sentence: materials + services detail
  const materialLabels: Record<string, string> = {
    'wood': 'wood',
    'vinyl': 'vinyl',
    'chain-link': 'chain link',
    'wrought-iron': 'wrought iron',
    'aluminum': 'aluminum',
    'steel': 'steel',
    'composite': 'composite',
    'bamboo': 'bamboo',
  };

  const matNames = materials.map(m => materialLabels[m] || m);
  const hasGates = services.includes('gates');
  const hasRepair = services.includes('repair');
  const hasCommercial = services.includes('commercial');

  const extras: string[] = [];
  if (hasRepair) extras.push('repair');
  if (hasGates) extras.push('gate installation');
  if (hasCommercial) extras.push('commercial projects');

  let detail = `They specialize in ${matNames.join(', ')} fencing`;
  if (extras.length > 0) {
    detail += ` and offer ${extras.join(', ')}`;
  }
  detail += '. Free estimates available.';
  parts.push(detail);

  return parts.join(' ');
}

interface ScrapedContractor {
  googlePlaceId: string;
  name: string;
  address: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
  rating: number;
  reviewCount: number;
  phone?: string;
  website?: string;
  googleMapsUrl?: string;
}

async function main() {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error('❌ Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
  }

  if (!fs.existsSync(DATA_FILE)) {
    console.error(`❌ Data file not found: ${DATA_FILE}`);
    console.log('Run the scraper first: npx tsx scripts/scrape-google-places.ts');
    process.exit(1);
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  const contractors: ScrapedContractor[] = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));

  console.log(`📦 Importing ${contractors.length} contractors...`);

  let imported = 0;
  let skipped = 0;
  let errors = 0;

  // Process in batches of 50
  const batchSize = 50;
  for (let i = 0; i < contractors.length; i += batchSize) {
    const batch = contractors.slice(i, i + batchSize);

    const rows = batch.map((c) => {
      const baseSlug = slugify(`${c.name}-${c.city}`);
      const services = inferServices(c.name);
      const materials = inferMaterials(c.name);
      return {
        google_place_id: c.googlePlaceId,
        name: c.name,
        slug: `${baseSlug}-${c.googlePlaceId.slice(-6)}`,
        phone: c.phone || null,
        website: c.website || null,
        description: generateDescription(c, materials, services),
        address: c.address,
        city: c.city,
        state: c.state,
        // lat/lng stored in scraped JSON but not imported — PostGIS location column
        // can be populated later if geo search is needed
        rating: c.rating || 0,
        review_count: c.reviewCount || 0,
        services,
        materials,
        free_estimates: true,
        google_maps_url: c.googleMapsUrl || null,
      };
    });

    const { data, error } = await supabase
      .from('contractors')
      .upsert(rows, { onConflict: 'google_place_id' });

    if (error) {
      console.error(`❌ Batch error (${i}-${i + batchSize}):`, error.message);
      errors += batch.length;
    } else {
      imported += batch.length;
    }

    // Progress
    const pct = Math.round(((i + batch.length) / contractors.length) * 100);
    process.stdout.write(`\r   Progress: ${pct}% (${imported} imported, ${errors} errors)`);
  }

  console.log(`\n\n✅ Import complete!`);
  console.log(`   Imported: ${imported}`);
  console.log(`   Errors: ${errors}`);

  // Update city counts
  console.log('\n📊 Updating city contractor counts...');
  const { data: cities } = await supabase
    .from('contractors')
    .select('city, state')
    .then(({ data }) => {
      const counts: Record<string, { city: string; state: string; count: number }> = {};
      for (const c of data || []) {
        const key = `${c.city}-${c.state}`;
        if (!counts[key]) counts[key] = { city: c.city, state: c.state, count: 0 };
        counts[key].count++;
      }
      return { data: Object.values(counts) };
    });

  if (cities) {
    for (const { city, state, count } of cities) {
      await supabase
        .from('cities')
        .upsert({
          name: city,
          state_code: state,
          state: city, // Will need proper state name mapping
          slug: slugify(`${city}-${state}`),
          contractor_count: count,
        }, { onConflict: 'slug' });
    }
    console.log(`   Updated ${cities.length} cities`);
  }

  console.log('\n🎉 Done!');
}

main().catch(console.error);
