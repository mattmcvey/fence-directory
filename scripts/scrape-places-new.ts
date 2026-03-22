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
  // === ALABAMA (9) ===
  'Birmingham, AL', 'Huntsville, AL', 'Montgomery, AL', 'Mobile, AL', 'Tuscaloosa, AL', 'Hoover, AL', 'Auburn, AL', 'Dothan, AL', 'Decatur, AL',
  // === ALASKA (3) ===
  'Anchorage, AK', 'Fairbanks, AK', 'Juneau, AK',
  // === ARIZONA (12) ===
  'Phoenix, AZ', 'Tucson, AZ', 'Mesa, AZ', 'Chandler, AZ', 'Scottsdale, AZ', 'Gilbert, AZ', 'Glendale, AZ', 'Tempe, AZ', 'Peoria, AZ', 'Surprise, AZ', 'Goodyear, AZ', 'Flagstaff, AZ',
  // === ARKANSAS (5) ===
  'Little Rock, AR', 'Fort Smith, AR', 'Fayetteville, AR', 'Springdale, AR', 'Jonesboro, AR',
  // === CALIFORNIA (40) ===
  'Los Angeles, CA', 'San Diego, CA', 'San Jose, CA', 'San Francisco, CA', 'Fresno, CA', 'Sacramento, CA', 'Riverside, CA',
  'Long Beach, CA', 'Oakland, CA', 'Bakersfield, CA', 'Anaheim, CA', 'Santa Ana, CA', 'Irvine, CA', 'Stockton, CA',
  'Chula Vista, CA', 'Fremont, CA', 'Moreno Valley, CA', 'Fontana, CA', 'Modesto, CA', 'Santa Clarita, CA',
  'San Bernardino, CA', 'Oxnard, CA', 'Elk Grove, CA', 'Ontario, CA', 'Rancho Cucamonga, CA', 'Oceanside, CA',
  'Garden Grove, CA', 'Palmdale, CA', 'Lancaster, CA', 'Hayward, CA', 'Corona, CA', 'Sunnyvale, CA',
  'Roseville, CA', 'Escondido, CA', 'Visalia, CA', 'Concord, CA', 'Thousand Oaks, CA', 'Simi Valley, CA',
  'Santa Rosa, CA', 'Temecula, CA',
  // === COLORADO (10) ===
  'Denver, CO', 'Colorado Springs, CO', 'Aurora, CO', 'Arvada, CO', 'Fort Collins, CO', 'Boulder, CO', 'Lakewood, CO', 'Thornton, CO', 'Westminster, CO', 'Pueblo, CO',
  // === CONNECTICUT (6) ===
  'Hartford, CT', 'Bridgeport, CT', 'New Haven, CT', 'Stamford, CT', 'Waterbury, CT', 'Norwalk, CT',
  // === DELAWARE (3) ===
  'Wilmington, DE', 'Dover, DE', 'Newark, DE',
  // === FLORIDA (25) ===
  'Jacksonville, FL', 'Miami, FL', 'Tampa, FL', 'Orlando, FL', 'St. Petersburg, FL', 'Fort Lauderdale, FL',
  'Hialeah, FL', 'Port St. Lucie, FL', 'Cape Coral, FL', 'Tallahassee, FL', 'Pembroke Pines, FL', 'Hollywood, FL',
  'Gainesville, FL', 'Miramar, FL', 'Coral Springs, FL', 'Clearwater, FL', 'Palm Bay, FL', 'Lakeland, FL',
  'Pompano Beach, FL', 'Kissimmee, FL', 'West Palm Beach, FL', 'Davie, FL', 'Boca Raton, FL', 'Deltona, FL', 'Ocala, FL',
  // === GEORGIA (12) ===
  'Atlanta, GA', 'Augusta, GA', 'Savannah, GA', 'Columbus, GA', 'Macon, GA', 'Athens, GA', 'Sandy Springs, GA',
  'Roswell, GA', 'Johns Creek, GA', 'Warner Robins, GA', 'Alpharetta, GA', 'Marietta, GA',
  // === HAWAII (3) ===
  'Honolulu, HI', 'Pearl City, HI', 'Hilo, HI',
  // === IDAHO (5) ===
  'Boise, ID', 'Meridian, ID', 'Nampa, ID', 'Idaho Falls, ID', 'Caldwell, ID',
  // === ILLINOIS (15) ===
  'Chicago, IL', 'Aurora, IL', 'Naperville, IL', 'Rockford, IL', 'Joliet, IL', 'Springfield, IL', 'Elgin, IL',
  'Peoria, IL', 'Champaign, IL', 'Waukegan, IL', 'Cicero, IL', 'Bloomington, IL', 'Arlington Heights, IL', 'Schaumburg, IL', 'Bolingbrook, IL',
  // === INDIANA (10) ===
  'Indianapolis, IN', 'Fort Wayne, IN', 'Evansville, IN', 'South Bend, IN', 'Carmel, IN', 'Fishers, IN',
  'Bloomington, IN', 'Hammond, IN', 'Lafayette, IN', 'Muncie, IN',
  // === IOWA (6) ===
  'Des Moines, IA', 'Cedar Rapids, IA', 'Davenport, IA', 'Sioux City, IA', 'Iowa City, IA', 'Waterloo, IA',
  // === KANSAS (6) ===
  'Wichita, KS', 'Overland Park, KS', 'Kansas City, KS', 'Olathe, KS', 'Topeka, KS', 'Lawrence, KS',
  // === KENTUCKY (6) ===
  'Louisville, KY', 'Lexington, KY', 'Bowling Green, KY', 'Owensboro, KY', 'Covington, KY', 'Richmond, KY',
  // === LOUISIANA (7) ===
  'New Orleans, LA', 'Baton Rouge, LA', 'Shreveport, LA', 'Lafayette, LA', 'Lake Charles, LA', 'Kenner, LA', 'Monroe, LA',
  // === MAINE (3) ===
  'Portland, ME', 'Lewiston, ME', 'Bangor, ME',
  // === MARYLAND (8) ===
  'Baltimore, MD', 'Frederick, MD', 'Rockville, MD', 'Gaithersburg, MD', 'Bowie, MD', 'Annapolis, MD', 'College Park, MD', 'Germantown, MD',
  // === MASSACHUSETTS (10) ===
  'Boston, MA', 'Worcester, MA', 'Springfield, MA', 'Cambridge, MA', 'Lowell, MA', 'Brockton, MA',
  'New Bedford, MA', 'Quincy, MA', 'Lynn, MA', 'Fall River, MA',
  // === MICHIGAN (12) ===
  'Detroit, MI', 'Grand Rapids, MI', 'Warren, MI', 'Sterling Heights, MI', 'Ann Arbor, MI', 'Lansing, MI',
  'Flint, MI', 'Dearborn, MI', 'Kalamazoo, MI', 'Troy, MI', 'Farmington Hills, MI', 'Rochester Hills, MI',
  // === MINNESOTA (8) ===
  'Minneapolis, MN', 'St. Paul, MN', 'Rochester, MN', 'Bloomington, MN', 'Brooklyn Park, MN', 'Duluth, MN', 'Plymouth, MN', 'Maple Grove, MN',
  // === MISSISSIPPI (5) ===
  'Jackson, MS', 'Gulfport, MS', 'Southaven, MS', 'Hattiesburg, MS', 'Biloxi, MS',
  // === MISSOURI (8) ===
  'Kansas City, MO', 'St. Louis, MO', 'Springfield, MO', 'Columbia, MO', 'Independence, MO', 'Lee\'s Summit, MO', 'O\'Fallon, MO', 'St. Charles, MO',
  // === MONTANA (3) ===
  'Billings, MT', 'Missoula, MT', 'Great Falls, MT',
  // === NEBRASKA (4) ===
  'Omaha, NE', 'Lincoln, NE', 'Bellevue, NE', 'Grand Island, NE',
  // === NEVADA (5) ===
  'Las Vegas, NV', 'Henderson, NV', 'Reno, NV', 'North Las Vegas, NV', 'Sparks, NV',
  // === NEW HAMPSHIRE (3) ===
  'Manchester, NH', 'Nashua, NH', 'Concord, NH',
  // === NEW JERSEY (12) ===
  'Newark, NJ', 'Jersey City, NJ', 'Paterson, NJ', 'Elizabeth, NJ', 'Edison, NJ', 'Woodbridge, NJ',
  'Lakewood, NJ', 'Toms River, NJ', 'Hamilton, NJ', 'Trenton, NJ', 'Clifton, NJ', 'Cherry Hill, NJ',
  // === NEW MEXICO (4) ===
  'Albuquerque, NM', 'Las Cruces, NM', 'Rio Rancho, NM', 'Santa Fe, NM',
  // === NEW YORK (15) ===
  'New York, NY', 'Buffalo, NY', 'Rochester, NY', 'Yonkers, NY', 'Syracuse, NY', 'Albany, NY',
  'New Rochelle, NY', 'Mount Vernon, NY', 'White Plains, NY', 'Schenectady, NY', 'Utica, NY', 'Long Island, NY',
  'Binghamton, NY', 'Poughkeepsie, NY', 'Ithaca, NY',
  // === NORTH CAROLINA (12) ===
  'Charlotte, NC', 'Raleigh, NC', 'Durham, NC', 'Greensboro, NC', 'Winston-Salem, NC', 'Fayetteville, NC',
  'Cary, NC', 'Wilmington, NC', 'High Point, NC', 'Asheville, NC', 'Concord, NC', 'Gastonia, NC',
  // === NORTH DAKOTA (3) ===
  'Fargo, ND', 'Bismarck, ND', 'Grand Forks, ND',
  // === OHIO (15) ===
  'Columbus, OH', 'Cleveland, OH', 'Cincinnati, OH', 'Toledo, OH', 'Akron, OH', 'Dayton, OH',
  'Parma, OH', 'Canton, OH', 'Youngstown, OH', 'Lorain, OH', 'Dublin, OH', 'Mason, OH',
  'Westerville, OH', 'Lakewood, OH', 'Findlay, OH',
  // === OKLAHOMA (6) ===
  'Oklahoma City, OK', 'Tulsa, OK', 'Norman, OK', 'Broken Arrow, OK', 'Edmond, OK', 'Moore, OK',
  // === OREGON (6) ===
  'Portland, OR', 'Salem, OR', 'Eugene, OR', 'Gresham, OR', 'Hillsboro, OR', 'Bend, OR',
  // === PENNSYLVANIA (10) ===
  'Philadelphia, PA', 'Pittsburgh, PA', 'Allentown, PA', 'Reading, PA', 'Erie, PA', 'Scranton, PA',
  'Bethlehem, PA', 'Lancaster, PA', 'Harrisburg, PA', 'York, PA',
  // === RHODE ISLAND (3) ===
  'Providence, RI', 'Warwick, RI', 'Cranston, RI',
  // === SOUTH CAROLINA (7) ===
  'Charleston, SC', 'Columbia, SC', 'North Charleston, SC', 'Greenville, SC', 'Rock Hill, SC', 'Mount Pleasant, SC', 'Spartanburg, SC',
  // === SOUTH DAKOTA (3) ===
  'Sioux Falls, SD', 'Rapid City, SD', 'Aberdeen, SD',
  // === TENNESSEE (9) ===
  'Nashville, TN', 'Memphis, TN', 'Knoxville, TN', 'Chattanooga, TN', 'Clarksville, TN', 'Murfreesboro, TN',
  'Franklin, TN', 'Jackson, TN', 'Hendersonville, TN',
  // === TEXAS (38) ===
  'Houston, TX', 'San Antonio, TX', 'Dallas, TX', 'Austin, TX', 'Fort Worth, TX', 'El Paso, TX', 'Arlington, TX', 'Plano, TX',
  'Corpus Christi, TX', 'Laredo, TX', 'Lubbock, TX', 'Garland, TX', 'Irving, TX', 'Amarillo, TX', 'Grand Prairie, TX',
  'McKinney, TX', 'Frisco, TX', 'Brownsville, TX', 'Pasadena, TX', 'Killeen, TX', 'McAllen, TX', 'Mesquite, TX',
  'Midland, TX', 'Denton, TX', 'Waco, TX', 'Round Rock, TX', 'Lewisville, TX', 'Tyler, TX', 'College Station, TX', 'Beaumont, TX',
  'Carrollton, TX', 'Abilene, TX', 'Pearland, TX', 'Richardson, TX', 'Sugar Land, TX', 'Allen, TX', 'Odessa, TX', 'Cedar Park, TX',
  // === UTAH (7) ===
  'Salt Lake City, UT', 'Provo, UT', 'West Valley City, UT', 'West Jordan, UT', 'Orem, UT', 'Sandy, UT', 'Ogden, UT',
  // === VERMONT (3) ===
  'Burlington, VT', 'South Burlington, VT', 'Rutland, VT',
  // === VIRGINIA (12) ===
  'Virginia Beach, VA', 'Richmond, VA', 'Norfolk, VA', 'Chesapeake, VA', 'Arlington, VA', 'Newport News, VA',
  'Alexandria, VA', 'Hampton, VA', 'Roanoke, VA', 'Lynchburg, VA', 'Fredericksburg, VA', 'Suffolk, VA',
  // === WASHINGTON (10) ===
  'Seattle, WA', 'Spokane, WA', 'Tacoma, WA', 'Vancouver, WA', 'Bellevue, WA', 'Kent, WA', 'Everett, WA', 'Renton, WA', 'Federal Way, WA', 'Olympia, WA',
  // === WASHINGTON DC (1) ===
  'Washington, DC',
  // === WEST VIRGINIA (3) ===
  'Charleston, WV', 'Huntington, WV', 'Morgantown, WV',
  // === WISCONSIN (7) ===
  'Milwaukee, WI', 'Madison, WI', 'Green Bay, WI', 'Kenosha, WI', 'Racine, WI', 'Appleton, WI', 'Waukesha, WI',
  // === WYOMING (3) ===
  'Cheyenne, WY', 'Casper, WY', 'Laramie, WY',
  // === ADDITIONAL COVERAGE (65) ===
  // More TX suburbs
  'Flower Mound, TX', 'Mansfield, TX', 'North Richland Hills, TX', 'Pflugerville, TX', 'New Braunfels, TX', 'San Marcos, TX', 'Georgetown, TX', 'Temple, TX',
  // More CA cities
  'Murrieta, CA', 'Menifee, CA', 'Santa Maria, CA', 'Clovis, CA', 'Redding, CA', 'Victorville, CA', 'El Cajon, CA', 'San Mateo, CA',
  // More FL cities
  'Sarasota, FL', 'Daytona Beach, FL', 'Fort Myers, FL', 'Melbourne, FL', 'Pensacola, FL', 'Naples, FL', 'Bradenton, FL',
  // More suburbs nationwide
  'Naperville, IL', 'Overland Park, KS', 'Lehi, UT', 'Draper, UT',
  'Broken Arrow, OK', 'Edmond, OK',
  'Peachtree City, GA', 'Valdosta, GA', 'Duluth, GA',
  'Coppell, TX', 'Keller, TX', 'Southlake, TX',
  'Apex, NC', 'Wake Forest, NC', 'Huntersville, NC', 'Mooresville, NC',
  'Oviedo, FL', 'Winter Garden, FL', 'Wesley Chapel, FL',
  'Lees Summit, MO', 'Blue Springs, MO',
  'Fishers, IN', 'Noblesville, IN', 'Greenwood, IN',
  'Parker, CO', 'Castle Rock, CO', 'Brighton, CO', 'Loveland, CO',
  'Sammamish, WA', 'Redmond, WA', 'Bothell, WA',
  'Lake Oswego, OR', 'Tigard, OR', 'Beaverton, OR',
  'Folsom, CA', 'Davis, CA', 'Pleasanton, CA',
  'Leander, TX', 'Kyle, TX', 'Tomball, TX',
  'Peoria, AZ', 'Queen Creek, AZ', 'Maricopa, AZ',
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
