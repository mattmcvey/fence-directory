/**
 * Seed Supabase with demo contractor data
 */
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const contractors = [
  {
    name: 'Rocky Mountain Fence Co',
    slug: 'rocky-mountain-fence-co-denver',
    phone: '(303) 555-1234',
    email: 'info@rockymountainfence.com',
    website: 'https://rockymountainfence.com',
    description: "Denver's premier fence installation company. Family-owned since 2005, we specialize in wood privacy fences, vinyl fencing, and custom gates. Free estimates and competitive pricing.",
    address: '1234 W Colfax Ave, Denver, CO 80204',
    city: 'Denver',
    state: 'CO',
    zip: '80204',
    location: 'POINT(-104.9903 39.7392)',
    rating: 4.8,
    review_count: 127,
    services: ['installation', 'repair', 'gates', 'residential', 'commercial'],
    materials: ['wood', 'vinyl', 'chain-link', 'aluminum'],
    service_radius: 30,
    years_in_business: 21,
    licensed: true,
    insured: true,
    free_estimates: true,
    featured: true,
    verified: true,
  },
  {
    name: 'Mile High Fencing',
    slug: 'mile-high-fencing-aurora',
    phone: '(303) 555-5678',
    description: 'Serving the Aurora and East Denver metro area with quality fence installation and repair. We handle everything from chain link to ornamental iron.',
    address: '5678 E Colfax Ave, Aurora, CO 80010',
    city: 'Aurora',
    state: 'CO',
    zip: '80010',
    location: 'POINT(-104.8319 39.7294)',
    rating: 4.5,
    review_count: 89,
    services: ['installation', 'repair', 'replacement', 'residential'],
    materials: ['wood', 'chain-link', 'wrought-iron'],
    service_radius: 25,
    years_in_business: 12,
    licensed: true,
    insured: true,
    free_estimates: true,
    featured: false,
    verified: true,
  },
  {
    name: 'Lone Star Fence Pros',
    slug: 'lone-star-fence-pros-dallas',
    phone: '(214) 555-1234',
    website: 'https://lonestarfencepros.com',
    description: "Dallas-Fort Worth's top-rated fence contractor. Specializing in cedar wood fences, iron fencing, and automatic gate systems. Licensed, bonded, and insured.",
    address: '789 Main St, Dallas, TX 75201',
    city: 'Dallas',
    state: 'TX',
    zip: '75201',
    location: 'POINT(-96.7970 32.7767)',
    rating: 4.9,
    review_count: 203,
    services: ['installation', 'repair', 'gates', 'residential', 'commercial'],
    materials: ['wood', 'wrought-iron', 'aluminum', 'chain-link'],
    service_radius: 40,
    years_in_business: 18,
    licensed: true,
    insured: true,
    free_estimates: true,
    featured: true,
    verified: true,
  },
  {
    name: 'Sunshine State Fencing',
    slug: 'sunshine-state-fencing-miami',
    phone: '(305) 555-9876',
    description: "South Florida's trusted fence company. Hurricane-rated fencing, aluminum pool enclosures, and PVC/vinyl privacy fences built to last in the Florida climate.",
    address: '456 Ocean Dr, Miami, FL 33139',
    city: 'Miami',
    state: 'FL',
    zip: '33139',
    location: 'POINT(-80.1918 25.7617)',
    rating: 4.6,
    review_count: 156,
    services: ['installation', 'repair', 'replacement', 'residential', 'commercial'],
    materials: ['aluminum', 'vinyl', 'chain-link', 'wrought-iron'],
    service_radius: 35,
    years_in_business: 15,
    licensed: true,
    insured: true,
    free_estimates: true,
    featured: false,
    verified: true,
  },
  {
    name: 'Pacific Fence & Wire',
    slug: 'pacific-fence-wire-portland',
    phone: '(503) 555-4321',
    website: 'https://pacificfencewire.com',
    description: "Portland's oldest fence company, est. 1998. Cedar, chain link, and ornamental iron fencing. We also offer deck and patio construction.",
    address: '321 NW 23rd Ave, Portland, OR 97210',
    city: 'Portland',
    state: 'OR',
    zip: '97210',
    location: 'POINT(-122.6784 45.5152)',
    rating: 4.7,
    review_count: 94,
    services: ['installation', 'repair', 'staining', 'gates', 'residential'],
    materials: ['wood', 'chain-link', 'wrought-iron', 'composite'],
    service_radius: 30,
    years_in_business: 28,
    licensed: true,
    insured: true,
    free_estimates: true,
    featured: true,
    verified: true,
  },
  {
    name: 'Arvada Fence Masters',
    slug: 'arvada-fence-masters-arvada',
    phone: '(303) 555-9999',
    description: 'Your local Arvada fence experts. We build beautiful wood and vinyl fences for homes throughout Jefferson County. Veteran-owned.',
    address: '100 Olde Wadsworth Blvd, Arvada, CO 80002',
    city: 'Arvada',
    state: 'CO',
    zip: '80002',
    location: 'POINT(-105.0875 39.8028)',
    rating: 4.9,
    review_count: 67,
    services: ['installation', 'repair', 'staining', 'residential'],
    materials: ['wood', 'vinyl', 'composite'],
    service_radius: 20,
    years_in_business: 8,
    licensed: true,
    insured: true,
    free_estimates: true,
    featured: false,
    verified: true,
  },
];

const cities = [
  { name: 'Denver', state: 'Colorado', state_code: 'CO', slug: 'denver-co', location: 'POINT(-104.9903 39.7392)', population: 715522, contractor_count: 45 },
  { name: 'Aurora', state: 'Colorado', state_code: 'CO', slug: 'aurora-co', location: 'POINT(-104.8319 39.7294)', population: 386261, contractor_count: 22 },
  { name: 'Arvada', state: 'Colorado', state_code: 'CO', slug: 'arvada-co', location: 'POINT(-105.0875 39.8028)', population: 124402, contractor_count: 12 },
  { name: 'Dallas', state: 'Texas', state_code: 'TX', slug: 'dallas-tx', location: 'POINT(-96.7970 32.7767)', population: 1304379, contractor_count: 78 },
  { name: 'Houston', state: 'Texas', state_code: 'TX', slug: 'houston-tx', location: 'POINT(-95.3698 29.7604)', population: 2304580, contractor_count: 95 },
  { name: 'Miami', state: 'Florida', state_code: 'FL', slug: 'miami-fl', location: 'POINT(-80.1918 25.7617)', population: 442241, contractor_count: 38 },
  { name: 'Orlando', state: 'Florida', state_code: 'FL', slug: 'orlando-fl', location: 'POINT(-81.3792 28.5383)', population: 307573, contractor_count: 28 },
  { name: 'Portland', state: 'Oregon', state_code: 'OR', slug: 'portland-or', location: 'POINT(-122.6784 45.5152)', population: 652503, contractor_count: 32 },
  { name: 'Phoenix', state: 'Arizona', state_code: 'AZ', slug: 'phoenix-az', location: 'POINT(-112.0740 33.4484)', population: 1608139, contractor_count: 65 },
  { name: 'Atlanta', state: 'Georgia', state_code: 'GA', slug: 'atlanta-ga', location: 'POINT(-84.3880 33.7490)', population: 498715, contractor_count: 42 },
  { name: 'Chicago', state: 'Illinois', state_code: 'IL', slug: 'chicago-il', location: 'POINT(-87.6298 41.8781)', population: 2693976, contractor_count: 88 },
  { name: 'Los Angeles', state: 'California', state_code: 'CA', slug: 'los-angeles-ca', location: 'POINT(-118.2437 34.0522)', population: 3979576, contractor_count: 110 },
  { name: 'San Antonio', state: 'Texas', state_code: 'TX', slug: 'san-antonio-tx', location: 'POINT(-98.4936 29.4241)', population: 1547253, contractor_count: 55 },
  { name: 'Nashville', state: 'Tennessee', state_code: 'TN', slug: 'nashville-tn', location: 'POINT(-86.7816 36.1627)', population: 689447, contractor_count: 35 },
  { name: 'Charlotte', state: 'North Carolina', state_code: 'NC', slug: 'charlotte-nc', location: 'POINT(-80.8431 35.2271)', population: 874579, contractor_count: 40 },
];

async function main() {
  console.log('🌱 Seeding Supabase...\n');

  // Insert contractors
  const { data: cData, error: cErr } = await supabase
    .from('contractors')
    .upsert(contractors, { onConflict: 'slug' });
  
  if (cErr) {
    console.error('❌ Contractors error:', cErr.message);
  } else {
    console.log(`✅ Inserted ${contractors.length} contractors`);
  }

  // Insert cities
  const { data: cityData, error: cityErr } = await supabase
    .from('cities')
    .upsert(cities, { onConflict: 'slug' });
  
  if (cityErr) {
    console.error('❌ Cities error:', cityErr.message);
  } else {
    console.log(`✅ Inserted ${cities.length} cities`);
  }

  // Verify
  const { count: contractorCount } = await supabase
    .from('contractors')
    .select('*', { count: 'exact', head: true });
  
  const { count: cityCount } = await supabase
    .from('cities')
    .select('*', { count: 'exact', head: true });

  console.log(`\n📊 Database now has:`);
  console.log(`   ${contractorCount} contractors`);
  console.log(`   ${cityCount} cities`);
  console.log('\n🎉 Done!');
}

main().catch(console.error);
