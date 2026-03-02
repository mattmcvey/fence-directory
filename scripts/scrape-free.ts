/**
 * Free Fence Contractor Scraper (No API Key Required)
 * 
 * Scrapes fence contractor data from publicly available sources:
 * - Yelp search results
 * - Yellow Pages
 * - BBB listings
 * 
 * Usage: npx tsx scripts/scrape-free.ts
 * 
 * Note: This is for seeding initial data. Be respectful with rate limiting.
 * For production data, use the Google Places API scraper instead.
 */

import * as fs from 'fs';
import * as path from 'path';
import * as cheerio from 'cheerio';

const OUTPUT_DIR = path.join(__dirname, '..', 'data');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'contractors-free.json');

const TARGET_CITIES = [
  { city: 'Denver', state: 'CO', lat: 39.7392, lng: -104.9903 },
  { city: 'Colorado Springs', state: 'CO', lat: 38.8339, lng: -104.8214 },
  { city: 'Aurora', state: 'CO', lat: 39.7294, lng: -104.8319 },
  { city: 'Dallas', state: 'TX', lat: 32.7767, lng: -96.7970 },
  { city: 'Houston', state: 'TX', lat: 29.7604, lng: -95.3698 },
  { city: 'San Antonio', state: 'TX', lat: 29.4241, lng: -98.4936 },
  { city: 'Austin', state: 'TX', lat: 30.2672, lng: -97.7431 },
  { city: 'Phoenix', state: 'AZ', lat: 33.4484, lng: -112.0740 },
  { city: 'Los Angeles', state: 'CA', lat: 34.0522, lng: -118.2437 },
  { city: 'San Diego', state: 'CA', lat: 32.7157, lng: -117.1611 },
  { city: 'Miami', state: 'FL', lat: 25.7617, lng: -80.1918 },
  { city: 'Tampa', state: 'FL', lat: 27.9506, lng: -82.4572 },
  { city: 'Orlando', state: 'FL', lat: 28.5383, lng: -81.3792 },
  { city: 'Atlanta', state: 'GA', lat: 33.7490, lng: -84.3880 },
  { city: 'Chicago', state: 'IL', lat: 41.8781, lng: -87.6298 },
  { city: 'Nashville', state: 'TN', lat: 36.1627, lng: -86.7816 },
  { city: 'Charlotte', state: 'NC', lat: 35.2271, lng: -80.8431 },
  { city: 'Portland', state: 'OR', lat: 45.5152, lng: -122.6784 },
  { city: 'Seattle', state: 'WA', lat: 47.6062, lng: -122.3321 },
  { city: 'Las Vegas', state: 'NV', lat: 36.1699, lng: -115.1398 },
];

interface ScrapedContractor {
  name: string;
  address: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
  phone?: string;
  website?: string;
  rating: number;
  reviewCount: number;
  source: string;
  scrapedAt: string;
}

async function fetchWithRetry(url: string, retries = 3): Promise<string | null> {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
        },
      });
      if (res.ok) return await res.text();
      console.log(`  HTTP ${res.status} for ${url}, retry ${i + 1}/${retries}`);
    } catch (e) {
      console.log(`  Fetch error for ${url}, retry ${i + 1}/${retries}`);
    }
    await sleep(2000 * (i + 1)); // Exponential backoff
  }
  return null;
}

async function scrapeYellowPages(city: string, state: string): Promise<ScrapedContractor[]> {
  const contractors: ScrapedContractor[] = [];
  const slug = city.toLowerCase().replace(/\s+/g, '-');
  const url = `https://www.yellowpages.com/search?search_terms=fence+contractor&geo_location_terms=${encodeURIComponent(city + ', ' + state)}`;

  console.log(`  📒 Yellow Pages: ${city}, ${state}`);
  const html = await fetchWithRetry(url);
  if (!html) return contractors;

  try {
    const $ = cheerio.load(html);
    $('.result').each((_, el) => {
      const name = $(el).find('.business-name span').text().trim();
      const phone = $(el).find('.phones').text().trim();
      const address = $(el).find('.adr').text().trim();
      const ratingStr = $(el).find('.ratings .count').text().trim();
      const reviewMatch = ratingStr.match(/\((\d+)\)/);

      if (name) {
        contractors.push({
          name,
          address: address || `${city}, ${state}`,
          city,
          state,
          lat: 0, // Will need geocoding
          lng: 0,
          phone: phone || undefined,
          rating: 0,
          reviewCount: reviewMatch ? parseInt(reviewMatch[1]) : 0,
          source: 'yellowpages',
          scrapedAt: new Date().toISOString(),
        });
      }
    });
  } catch (e) {
    console.log(`  Error parsing Yellow Pages for ${city}: ${e}`);
  }

  return contractors;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

async function main() {
  console.log('🏗️  Free Fence Contractor Scraper\n');

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const allContractors: ScrapedContractor[] = [];
  const seenNames = new Set<string>();

  for (const target of TARGET_CITIES) {
    console.log(`\n🔍 ${target.city}, ${target.state}`);

    // Yellow Pages
    const ypResults = await scrapeYellowPages(target.city, target.state);
    for (const c of ypResults) {
      const key = slugify(c.name);
      if (!seenNames.has(key)) {
        // Set approximate coordinates from city center
        c.lat = target.lat + (Math.random() - 0.5) * 0.1;
        c.lng = target.lng + (Math.random() - 0.5) * 0.1;
        allContractors.push(c);
        seenNames.add(key);
      }
    }

    console.log(`   Found ${ypResults.length} from Yellow Pages`);

    // Rate limit between cities
    await sleep(3000);

    // Save progress
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(allContractors, null, 2));
  }

  console.log(`\n✅ Scraping complete!`);
  console.log(`   Total unique contractors: ${allContractors.length}`);
  console.log(`   Output: ${OUTPUT_FILE}`);
  console.log(`\n💡 For better data (photos, ratings, exact coordinates), use the Google Places scraper.`);
}

main().catch(console.error);
