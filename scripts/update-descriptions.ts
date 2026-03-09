/**
 * Update generic contractor descriptions to richer versions.
 * Only updates contractors whose description matches the old generic pattern.
 * Does NOT overwrite custom/manually-written descriptions.
 *
 * Usage:
 *   NEXT_PUBLIC_SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... npx tsx scripts/update-descriptions.ts
 */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

function generateDescription(c: {
  name: string;
  city: string;
  state: string;
  rating: number;
  review_count: number;
  materials: string[];
  services: string[];
}): string {
  const parts: string[] = [];

  if (c.rating >= 4.0 && c.review_count >= 5) {
    parts.push(`${c.name} is a ${c.rating}-star rated fence contractor in ${c.city}, ${c.state} with ${c.review_count} reviews.`);
  } else {
    parts.push(`${c.name} is a fence contractor serving ${c.city}, ${c.state} and surrounding areas.`);
  }

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

  const matNames = (c.materials || []).map(m => materialLabels[m] || m);
  const extras: string[] = [];
  if (c.services?.includes('repair')) extras.push('repair');
  if (c.services?.includes('gates')) extras.push('gate installation');
  if (c.services?.includes('commercial')) extras.push('commercial projects');

  let detail = `They specialize in ${matNames.join(', ')} fencing`;
  if (extras.length > 0) {
    detail += ` and offer ${extras.join(', ')}`;
  }
  detail += '. Free estimates available.';
  parts.push(detail);

  return parts.join(' ');
}

async function main() {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

  // Fetch contractors with the old generic description pattern
  const { data: contractors, error } = await supabase
    .from('contractors')
    .select('id, name, city, state, rating, review_count, materials, services, description')
    .like('description', '% is a fence contractor serving the %, % area.');

  if (error) {
    console.error('Error fetching contractors:', error.message);
    process.exit(1);
  }

  console.log(`Found ${contractors.length} contractors with generic descriptions to update.`);

  let updated = 0;
  let errors = 0;

  for (const c of contractors) {
    const newDesc = generateDescription(c);

    const { error: updateError } = await supabase
      .from('contractors')
      .update({ description: newDesc })
      .eq('id', c.id);

    if (updateError) {
      console.error(`Error updating ${c.name}:`, updateError.message);
      errors++;
    } else {
      updated++;
    }
  }

  console.log(`\nDone! Updated: ${updated}, Errors: ${errors}`);
}

main().catch(console.error);
