/**
 * Google Places Scraper for Fence Contractors
 * 
 * Uses the Google Places API (Text Search) to find fence contractors
 * across major US cities and saves results for seeding the database.
 * 
 * Requires: GOOGLE_PLACES_API_KEY env var
 * 
 * Usage: npx tsx scripts/scrape-google-places.ts
 * 
 * Google Places API pricing:
 * - Text Search: $0.032 per request (up to 20 results each)
 * - Place Details: $0.017 per request
 * - Free $200/mo credit = ~6,250 text searches or ~11,764 detail lookups
 * 
 * Strategy: 
 * - Text search "fence contractor" + city for each target city
 * - Get up to 60 results per city (3 pages × 20)
 * - Enrich top results with Place Details for phone, website, hours
 * - Output to JSON for Supabase import
 */

import * as fs from 'fs';
import * as path from 'path';

const API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const OUTPUT_DIR = path.join(__dirname, '..', 'data');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'contractors.json');

// Top 100 US cities by population — these are our target markets
const TARGET_CITIES = [
  // Texas
  'Houston, TX', 'San Antonio, TX', 'Dallas, TX', 'Austin, TX', 'Fort Worth, TX', 'El Paso, TX', 'Arlington, TX', 'Plano, TX', 'Frisco, TX', 'McKinney, TX',
  // California
  'Los Angeles, CA', 'San Diego, CA', 'San Jose, CA', 'San Francisco, CA', 'Fresno, CA', 'Sacramento, CA', 'Long Beach, CA', 'Oakland, CA', 'Bakersfield, CA', 'Riverside, CA',
  // Florida
  'Jacksonville, FL', 'Miami, FL', 'Tampa, FL', 'Orlando, FL', 'St. Petersburg, FL', 'Fort Lauderdale, FL', 'Tallahassee, FL', 'Cape Coral, FL',
  // New York
  'New York, NY', 'Buffalo, NY', 'Rochester, NY', 'Syracuse, NY',
  // Illinois
  'Chicago, IL', 'Aurora, IL', 'Naperville, IL', 'Joliet, IL',
  // Pennsylvania
  'Philadelphia, PA', 'Pittsburgh, PA', 'Allentown, PA',
  // Arizona
  'Phoenix, AZ', 'Tucson, AZ', 'Mesa, AZ', 'Chandler, AZ', 'Scottsdale, AZ', 'Gilbert, AZ',
  // Ohio
  'Columbus, OH', 'Cleveland, OH', 'Cincinnati, OH',
  // Georgia
  'Atlanta, GA', 'Augusta, GA', 'Savannah, GA',
  // North Carolina
  'Charlotte, NC', 'Raleigh, NC', 'Durham, NC', 'Greensboro, NC',
  // Michigan
  'Detroit, MI', 'Grand Rapids, MI',
  // Tennessee
  'Nashville, TN', 'Memphis, TN', 'Knoxville, TN',
  // Colorado
  'Denver, CO', 'Colorado Springs, CO', 'Aurora, CO', 'Arvada, CO', 'Lakewood, CO', 'Fort Collins, CO', 'Boulder, CO',
  // Washington
  'Seattle, WA', 'Spokane, WA', 'Tacoma, WA',
  // Oregon
  'Portland, OR', 'Salem, OR', 'Eugene, OR',
  // Indiana
  'Indianapolis, IN', 'Fort Wayne, IN',
  // Missouri
  'Kansas City, MO', 'St. Louis, MO',
  // Maryland
  'Baltimore, MD',
  // Wisconsin
  'Milwaukee, WI', 'Madison, WI',
  // Minnesota
  'Minneapolis, MN', 'St. Paul, MN',
  // Louisiana
  'New Orleans, LA', 'Baton Rouge, LA',
  // Nevada
  'Las Vegas, NV', 'Henderson, NV', 'Reno, NV',
  // Virginia
  'Virginia Beach, VA', 'Norfolk, VA', 'Richmond, VA',
  // Alabama
  'Birmingham, AL', 'Huntsville, AL',
  // South Carolina
  'Charleston, SC', 'Columbia, SC',
  // Utah
  'Salt Lake City, UT', 'Provo, UT',
  // Oklahoma
  'Oklahoma City, OK', 'Tulsa, OK',
  // Iowa
  'Des Moines, IA',
  // Arkansas
  'Little Rock, AR',
  // Kansas
  'Wichita, KS',
  // Nebraska
  'Omaha, NE', 'Lincoln, NE',
  // New Mexico
  'Albuquerque, NM',
  // Idaho
  'Boise, ID',
  // Massachusetts
  'Boston, MA', 'Worcester, MA',
  // Connecticut
  'Hartford, CT', 'New Haven, CT',
];

interface PlaceResult {
  name: string;
  formatted_address: string;
  geometry: { location: { lat: number; lng: number } };
  rating?: number;
  user_ratings_total?: number;
  place_id: string;
  business_status?: string;
  types?: string[];
}

interface PlaceDetails {
  formatted_phone_number?: string;
  international_phone_number?: string;
  website?: string;
  opening_hours?: { open_now?: boolean };
  url?: string; // Google Maps URL
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
  scrapedFrom: string;
  scrapedAt: string;
}

async function searchPlaces(query: string, pageToken?: string): Promise<{ results: PlaceResult[]; nextPageToken?: string }> {
  const params = new URLSearchParams({
    query,
    key: API_KEY!,
    type: 'general_contractor',
  });
  if (pageToken) params.set('pagetoken', pageToken);

  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?${params}`;
  const res = await fetch(url);
  const data = await res.json();

  if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
    console.error(`API error for "${query}":`, data.status, data.error_message);
    return { results: [] };
  }

  return {
    results: data.results || [],
    nextPageToken: data.next_page_token,
  };
}

async function getPlaceDetails(placeId: string): Promise<PlaceDetails | null> {
  const params = new URLSearchParams({
    place_id: placeId,
    fields: 'formatted_phone_number,international_phone_number,website,opening_hours,url',
    key: API_KEY!,
  });

  const url = `https://maps.googleapis.com/maps/api/place/details/json?${params}`;
  const res = await fetch(url);
  const data = await res.json();

  if (data.status !== 'OK') {
    console.error(`Details error for ${placeId}:`, data.status);
    return null;
  }

  return data.result;
}

function parseAddress(address: string): { city: string; state: string } {
  // Parse "123 Main St, Denver, CO 80202, USA" → { city: "Denver", state: "CO" }
  const parts = address.split(',').map((p) => p.trim());
  if (parts.length >= 3) {
    const city = parts[parts.length - 3] || '';
    const stateZip = parts[parts.length - 2] || '';
    const state = stateZip.split(' ')[0] || '';
    return { city, state };
  }
  return { city: '', state: '' };
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  if (!API_KEY) {
    console.error('❌ GOOGLE_PLACES_API_KEY env var required');
    console.log('\nTo get an API key:');
    console.log('1. Go to https://console.cloud.google.com/apis/credentials');
    console.log('2. Create a project (or select existing)');
    console.log('3. Enable "Places API"');
    console.log('4. Create an API key');
    console.log('5. Run: GOOGLE_PLACES_API_KEY=your_key npx tsx scripts/scrape-google-places.ts');
    console.log('\nFree tier: $200/mo credit (~6,250 searches)');
    process.exit(1);
  }

  // Create output dir
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Load existing data to avoid duplicates
  let existing: ScrapedContractor[] = [];
  if (fs.existsSync(OUTPUT_FILE)) {
    existing = JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf-8'));
    console.log(`📂 Loaded ${existing.length} existing contractors`);
  }
  const existingIds = new Set(existing.map((c) => c.googlePlaceId));

  const allContractors: ScrapedContractor[] = [...existing];
  let totalSearches = 0;
  let totalDetailLookups = 0;
  let newContractors = 0;

  for (const city of TARGET_CITIES) {
    const query = `fence contractor in ${city}`;
    console.log(`\n🔍 Searching: ${query}`);

    // Get first page
    const { results, nextPageToken } = await searchPlaces(query);
    totalSearches++;

    let allResults = [...results];

    // Get page 2 if available
    if (nextPageToken) {
      await sleep(2000); // Required delay for pagetoken
      const page2 = await searchPlaces(query, nextPageToken);
      totalSearches++;
      allResults.push(...page2.results);

      // Get page 3 if available
      if (page2.nextPageToken) {
        await sleep(2000);
        const page3 = await searchPlaces(query, page2.nextPageToken);
        totalSearches++;
        allResults.push(...page3.results);
      }
    }

    console.log(`   Found ${allResults.length} results`);

    for (const place of allResults) {
      if (existingIds.has(place.place_id)) continue;
      if (place.business_status === 'CLOSED_PERMANENTLY') continue;

      const { city: parsedCity, state: parsedState } = parseAddress(place.formatted_address);

      // Get details (phone, website)
      const details = await getPlaceDetails(place.place_id);
      totalDetailLookups++;
      await sleep(100); // Rate limiting

      const contractor: ScrapedContractor = {
        googlePlaceId: place.place_id,
        name: place.name,
        address: place.formatted_address,
        city: parsedCity,
        state: parsedState,
        lat: place.geometry.location.lat,
        lng: place.geometry.location.lng,
        rating: place.rating || 0,
        reviewCount: place.user_ratings_total || 0,
        phone: details?.formatted_phone_number,
        website: details?.website,
        googleMapsUrl: details?.url,
        scrapedFrom: city,
        scrapedAt: new Date().toISOString(),
      };

      allContractors.push(contractor);
      existingIds.add(place.place_id);
      newContractors++;
    }

    // Save progress after each city
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(allContractors, null, 2));

    // Rate limiting between cities
    await sleep(500);
  }

  console.log(`\n✅ Scraping complete!`);
  console.log(`   Total contractors: ${allContractors.length}`);
  console.log(`   New this run: ${newContractors}`);
  console.log(`   Text searches: ${totalSearches} (~$${(totalSearches * 0.032).toFixed(2)})`);
  console.log(`   Detail lookups: ${totalDetailLookups} (~$${(totalDetailLookups * 0.017).toFixed(2)})`);
  console.log(`   Est. total cost: ~$${(totalSearches * 0.032 + totalDetailLookups * 0.017).toFixed(2)}`);
  console.log(`   Output: ${OUTPUT_FILE}`);
}

main().catch(console.error);
