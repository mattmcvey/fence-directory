/**
 * Google Places API (New) Scraper for Fence Contractors
 * 
 * Uses the NEW Places API (searchText endpoint) instead of the legacy Text Search.
 * 
 * Usage: GOOGLE_PLACES_API_KEY=xxx npx tsx scripts/scrape-places-new.ts
 * 
 * Pricing (New API):
 * - Text Search: $0.032 per request (up to 20 results)
 * - Place Details: included in fieldmask-based pricing
 * - Free $200/mo credit
 */

import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const OUTPUT_DIR = path.join(__dirname, '..', 'data');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'contractors.json');

const TARGET_CITIES = [
  'Houston, TX', 'San Antonio, TX', 'Dallas, TX', 'Austin, TX', 'Fort Worth, TX', 'El Paso, TX', 'Arlington, TX', 'Plano, TX',
  'Los Angeles, CA', 'San Diego, CA', 'San Jose, CA', 'San Francisco, CA', 'Fresno, CA', 'Sacramento, CA', 'Riverside, CA',
  'Jacksonville, FL', 'Miami, FL', 'Tampa, FL', 'Orlando, FL', 'St. Petersburg, FL', 'Fort Lauderdale, FL',
  'New York, NY', 'Buffalo, NY', 'Rochester, NY',
  'Chicago, IL', 'Aurora, IL', 'Naperville, IL',
  'Philadelphia, PA', 'Pittsburgh, PA',
  'Phoenix, AZ', 'Tucson, AZ', 'Mesa, AZ', 'Chandler, AZ', 'Scottsdale, AZ',
  'Columbus, OH', 'Cleveland, OH', 'Cincinnati, OH',
  'Atlanta, GA', 'Augusta, GA', 'Savannah, GA',
  'Charlotte, NC', 'Raleigh, NC', 'Durham, NC',
  'Detroit, MI', 'Grand Rapids, MI',
  'Nashville, TN', 'Memphis, TN', 'Knoxville, TN',
  'Denver, CO', 'Colorado Springs, CO', 'Aurora, CO', 'Arvada, CO', 'Fort Collins, CO', 'Boulder, CO',
  'Seattle, WA', 'Spokane, WA', 'Tacoma, WA',
  'Portland, OR', 'Salem, OR', 'Eugene, OR',
  'Indianapolis, IN', 'Fort Wayne, IN',
  'Kansas City, MO', 'St. Louis, MO',
  'Baltimore, MD',
  'Milwaukee, WI', 'Madison, WI',
  'Minneapolis, MN', 'St. Paul, MN',
  'New Orleans, LA', 'Baton Rouge, LA',
  'Las Vegas, NV', 'Henderson, NV', 'Reno, NV',
  'Virginia Beach, VA', 'Richmond, VA',
  'Birmingham, AL', 'Huntsville, AL',
  'Charleston, SC', 'Columbia, SC',
  'Salt Lake City, UT', 'Provo, UT',
  'Oklahoma City, OK', 'Tulsa, OK',
  'Des Moines, IA',
  'Omaha, NE', 'Lincoln, NE',
  'Albuquerque, NM',
  'Boise, ID',
  'Boston, MA',
  'Hartford, CT',
];

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

async function searchTextNew(query: string): Promise<any[]> {
  const url = 'https://places.googleapis.com/v1/places:searchText';
  
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': API_KEY!,
      'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.location,places.rating,places.userRatingCount,places.nationalPhoneNumber,places.websiteUri,places.googleMapsUri',
    },
    body: JSON.stringify({
      textQuery: query,
      languageCode: 'en',
      maxResultCount: 20,
    }),
  });

  const data = await res.json();
  
  if (data.error) {
    console.error(`  API error: ${data.error.message}`);
    return [];
  }

  return data.places || [];
}

function parseAddress(address: string): { city: string; state: string } {
  const parts = address.split(',').map(p => p.trim());
  if (parts.length >= 3) {
    const city = parts[parts.length - 3] || '';
    const stateZip = parts[parts.length - 2] || '';
    const state = stateZip.split(' ')[0] || '';
    return { city, state };
  }
  return { city: '', state: '' };
}

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  if (!API_KEY) {
    console.error('❌ GOOGLE_PLACES_API_KEY required');
    process.exit(1);
  }

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  let existing: ScrapedContractor[] = [];
  if (fs.existsSync(OUTPUT_FILE)) {
    const raw = fs.readFileSync(OUTPUT_FILE, 'utf-8');
    if (raw.trim()) existing = JSON.parse(raw);
    console.log(`📂 Loaded ${existing.length} existing contractors`);
  }
  const existingIds = new Set(existing.map(c => c.googlePlaceId));

  const allContractors: ScrapedContractor[] = [...existing];
  let totalSearches = 0;
  let newContractors = 0;

  for (const city of TARGET_CITIES) {
    const query = `fence contractor in ${city}`;
    console.log(`\n🔍 ${query}`);

    const places = await searchTextNew(query);
    totalSearches++;

    console.log(`   Found ${places.length} results`);

    for (const place of places) {
      const placeId = place.id;
      if (existingIds.has(placeId)) continue;

      const { city: parsedCity, state: parsedState } = parseAddress(place.formattedAddress || '');

      const contractor: ScrapedContractor = {
        googlePlaceId: placeId,
        name: place.displayName?.text || '',
        address: place.formattedAddress || '',
        city: parsedCity,
        state: parsedState,
        lat: place.location?.latitude || 0,
        lng: place.location?.longitude || 0,
        rating: place.rating || 0,
        reviewCount: place.userRatingCount || 0,
        phone: place.nationalPhoneNumber,
        website: place.websiteUri,
        googleMapsUrl: place.googleMapsUri,
        scrapedFrom: city,
        scrapedAt: new Date().toISOString(),
      };

      allContractors.push(contractor);
      existingIds.add(placeId);
      newContractors++;
    }

    // Save progress after each city
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(allContractors, null, 2));

    // Rate limit
    await sleep(300);
  }

  console.log(`\n✅ Scraping complete!`);
  console.log(`   Total contractors: ${allContractors.length}`);
  console.log(`   New this run: ${newContractors}`);
  console.log(`   Text searches: ${totalSearches} (~$${(totalSearches * 0.032).toFixed(2)})`);
  console.log(`   Output: ${OUTPUT_FILE}`);
}

main().catch(console.error);
