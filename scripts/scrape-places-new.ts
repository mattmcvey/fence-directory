

import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const OUTPUT_DIR = path.join(__dirname, '..', 'data');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'contractors.json');

const TARGET_CITIES = [

  'Birmingham, AL', 'Huntsville, AL', 'Montgomery, AL', 'Mobile, AL', 'Tuscaloosa, AL', 'Hoover, AL', 'Auburn, AL', 'Dothan, AL', 'Decatur, AL',

  'Anchorage, AK', 'Fairbanks, AK', 'Juneau, AK',

  'Phoenix, AZ', 'Tucson, AZ', 'Mesa, AZ', 'Chandler, AZ', 'Scottsdale, AZ', 'Gilbert, AZ', 'Glendale, AZ', 'Tempe, AZ', 'Peoria, AZ', 'Surprise, AZ', 'Goodyear, AZ', 'Flagstaff, AZ',

  'Little Rock, AR', 'Fort Smith, AR', 'Fayetteville, AR', 'Springdale, AR', 'Jonesboro, AR',

  'Los Angeles, CA', 'San Diego, CA', 'San Jose, CA', 'San Francisco, CA', 'Fresno, CA', 'Sacramento, CA', 'Riverside, CA',
  'Long Beach, CA', 'Oakland, CA', 'Bakersfield, CA', 'Anaheim, CA', 'Santa Ana, CA', 'Irvine, CA', 'Stockton, CA',
  'Chula Vista, CA', 'Fremont, CA', 'Moreno Valley, CA', 'Fontana, CA', 'Modesto, CA', 'Santa Clarita, CA',
  'San Bernardino, CA', 'Oxnard, CA', 'Elk Grove, CA', 'Ontario, CA', 'Rancho Cucamonga, CA', 'Oceanside, CA',
  'Garden Grove, CA', 'Palmdale, CA', 'Lancaster, CA', 'Hayward, CA', 'Corona, CA', 'Sunnyvale, CA',
  'Roseville, CA', 'Escondido, CA', 'Visalia, CA', 'Concord, CA', 'Thousand Oaks, CA', 'Simi Valley, CA',
  'Santa Rosa, CA', 'Temecula, CA',

  'Denver, CO', 'Colorado Springs, CO', 'Aurora, CO', 'Arvada, CO', 'Fort Collins, CO', 'Boulder, CO', 'Lakewood, CO', 'Thornton, CO', 'Westminster, CO', 'Pueblo, CO',

  'Hartford, CT', 'Bridgeport, CT', 'New Haven, CT', 'Stamford, CT', 'Waterbury, CT', 'Norwalk, CT',

  'Wilmington, DE', 'Dover, DE', 'Newark, DE',

  'Jacksonville, FL', 'Miami, FL', 'Tampa, FL', 'Orlando, FL', 'St. Petersburg, FL', 'Fort Lauderdale, FL',
  'Hialeah, FL', 'Port St. Lucie, FL', 'Cape Coral, FL', 'Tallahassee, FL', 'Pembroke Pines, FL', 'Hollywood, FL',
  'Gainesville, FL', 'Miramar, FL', 'Coral Springs, FL', 'Clearwater, FL', 'Palm Bay, FL', 'Lakeland, FL',
  'Pompano Beach, FL', 'Kissimmee, FL', 'West Palm Beach, FL', 'Davie, FL', 'Boca Raton, FL', 'Deltona, FL', 'Ocala, FL',

  'Atlanta, GA', 'Augusta, GA', 'Savannah, GA', 'Columbus, GA', 'Macon, GA', 'Athens, GA', 'Sandy Springs, GA',
  'Roswell, GA', 'Johns Creek, GA', 'Warner Robins, GA', 'Alpharetta, GA', 'Marietta, GA',

  'Honolulu, HI', 'Pearl City, HI', 'Hilo, HI',

  'Boise, ID', 'Meridian, ID', 'Nampa, ID', 'Idaho Falls, ID', 'Caldwell, ID',

  'Chicago, IL', 'Aurora, IL', 'Naperville, IL', 'Rockford, IL', 'Joliet, IL', 'Springfield, IL', 'Elgin, IL',
  'Peoria, IL', 'Champaign, IL', 'Waukegan, IL', 'Cicero, IL', 'Bloomington, IL', 'Arlington Heights, IL', 'Schaumburg, IL', 'Bolingbrook, IL',

  'Indianapolis, IN', 'Fort Wayne, IN', 'Evansville, IN', 'South Bend, IN', 'Carmel, IN', 'Fishers, IN',
  'Bloomington, IN', 'Hammond, IN', 'Lafayette, IN', 'Muncie, IN',

  'Des Moines, IA', 'Cedar Rapids, IA', 'Davenport, IA', 'Sioux City, IA', 'Iowa City, IA', 'Waterloo, IA',

  'Wichita, KS', 'Overland Park, KS', 'Kansas City, KS', 'Olathe, KS', 'Topeka, KS', 'Lawrence, KS',

  'Louisville, KY', 'Lexington, KY', 'Bowling Green, KY', 'Owensboro, KY', 'Covington, KY', 'Richmond, KY',

  'New Orleans, LA', 'Baton Rouge, LA', 'Shreveport, LA', 'Lafayette, LA', 'Lake Charles, LA', 'Kenner, LA', 'Monroe, LA',

  'Portland, ME', 'Lewiston, ME', 'Bangor, ME',

  'Baltimore, MD', 'Frederick, MD', 'Rockville, MD', 'Gaithersburg, MD', 'Bowie, MD', 'Annapolis, MD', 'College Park, MD', 'Germantown, MD',

  'Boston, MA', 'Worcester, MA', 'Springfield, MA', 'Cambridge, MA', 'Lowell, MA', 'Brockton, MA',
  'New Bedford, MA', 'Quincy, MA', 'Lynn, MA', 'Fall River, MA',

  'Detroit, MI', 'Grand Rapids, MI', 'Warren, MI', 'Sterling Heights, MI', 'Ann Arbor, MI', 'Lansing, MI',
  'Flint, MI', 'Dearborn, MI', 'Kalamazoo, MI', 'Troy, MI', 'Farmington Hills, MI', 'Rochester Hills, MI',

  'Minneapolis, MN', 'St. Paul, MN', 'Rochester, MN', 'Bloomington, MN', 'Brooklyn Park, MN', 'Duluth, MN', 'Plymouth, MN', 'Maple Grove, MN',

  'Jackson, MS', 'Gulfport, MS', 'Southaven, MS', 'Hattiesburg, MS', 'Biloxi, MS',

  'Kansas City, MO', 'St. Louis, MO', 'Springfield, MO', 'Columbia, MO', 'Independence, MO', 'Lee\'s Summit, MO', 'O\'Fallon, MO', 'St. Charles, MO',

  'Billings, MT', 'Missoula, MT', 'Great Falls, MT',

  'Omaha, NE', 'Lincoln, NE', 'Bellevue, NE', 'Grand Island, NE',

  'Las Vegas, NV', 'Henderson, NV', 'Reno, NV', 'North Las Vegas, NV', 'Sparks, NV',

  'Manchester, NH', 'Nashua, NH', 'Concord, NH',

  'Newark, NJ', 'Jersey City, NJ', 'Paterson, NJ', 'Elizabeth, NJ', 'Edison, NJ', 'Woodbridge, NJ',
  'Lakewood, NJ', 'Toms River, NJ', 'Hamilton, NJ', 'Trenton, NJ', 'Clifton, NJ', 'Cherry Hill, NJ',

  'Albuquerque, NM', 'Las Cruces, NM', 'Rio Rancho, NM', 'Santa Fe, NM',

  'New York, NY', 'Buffalo, NY', 'Rochester, NY', 'Yonkers, NY', 'Syracuse, NY', 'Albany, NY',
  'New Rochelle, NY', 'Mount Vernon, NY', 'White Plains, NY', 'Schenectady, NY', 'Utica, NY', 'Long Island, NY',
  'Binghamton, NY', 'Poughkeepsie, NY', 'Ithaca, NY',

  'Charlotte, NC', 'Raleigh, NC', 'Durham, NC', 'Greensboro, NC', 'Winston-Salem, NC', 'Fayetteville, NC',
  'Cary, NC', 'Wilmington, NC', 'High Point, NC', 'Asheville, NC', 'Concord, NC', 'Gastonia, NC',

  'Fargo, ND', 'Bismarck, ND', 'Grand Forks, ND',

  'Columbus, OH', 'Cleveland, OH', 'Cincinnati, OH', 'Toledo, OH', 'Akron, OH', 'Dayton, OH',
  'Parma, OH', 'Canton, OH', 'Youngstown, OH', 'Lorain, OH', 'Dublin, OH', 'Mason, OH',
  'Westerville, OH', 'Lakewood, OH', 'Findlay, OH',

  'Oklahoma City, OK', 'Tulsa, OK', 'Norman, OK', 'Broken Arrow, OK', 'Edmond, OK', 'Moore, OK',

  'Portland, OR', 'Salem, OR', 'Eugene, OR', 'Gresham, OR', 'Hillsboro, OR', 'Bend, OR',

  'Philadelphia, PA', 'Pittsburgh, PA', 'Allentown, PA', 'Reading, PA', 'Erie, PA', 'Scranton, PA',
  'Bethlehem, PA', 'Lancaster, PA', 'Harrisburg, PA', 'York, PA',

  'Providence, RI', 'Warwick, RI', 'Cranston, RI',

  'Charleston, SC', 'Columbia, SC', 'North Charleston, SC', 'Greenville, SC', 'Rock Hill, SC', 'Mount Pleasant, SC', 'Spartanburg, SC',

  'Sioux Falls, SD', 'Rapid City, SD', 'Aberdeen, SD',

  'Nashville, TN', 'Memphis, TN', 'Knoxville, TN', 'Chattanooga, TN', 'Clarksville, TN', 'Murfreesboro, TN',
  'Franklin, TN', 'Jackson, TN', 'Hendersonville, TN',

  'Houston, TX', 'San Antonio, TX', 'Dallas, TX', 'Austin, TX', 'Fort Worth, TX', 'El Paso, TX', 'Arlington, TX', 'Plano, TX',
  'Corpus Christi, TX', 'Laredo, TX', 'Lubbock, TX', 'Garland, TX', 'Irving, TX', 'Amarillo, TX', 'Grand Prairie, TX',
  'McKinney, TX', 'Frisco, TX', 'Brownsville, TX', 'Pasadena, TX', 'Killeen, TX', 'McAllen, TX', 'Mesquite, TX',
  'Midland, TX', 'Denton, TX', 'Waco, TX', 'Round Rock, TX', 'Lewisville, TX', 'Tyler, TX', 'College Station, TX', 'Beaumont, TX',
  'Carrollton, TX', 'Abilene, TX', 'Pearland, TX', 'Richardson, TX', 'Sugar Land, TX', 'Allen, TX', 'Odessa, TX', 'Cedar Park, TX',

  'Salt Lake City, UT', 'Provo, UT', 'West Valley City, UT', 'West Jordan, UT', 'Orem, UT', 'Sandy, UT', 'Ogden, UT',

  'Burlington, VT', 'South Burlington, VT', 'Rutland, VT',

  'Virginia Beach, VA', 'Richmond, VA', 'Norfolk, VA', 'Chesapeake, VA', 'Arlington, VA', 'Newport News, VA',
  'Alexandria, VA', 'Hampton, VA', 'Roanoke, VA', 'Lynchburg, VA', 'Fredericksburg, VA', 'Suffolk, VA',

  'Seattle, WA', 'Spokane, WA', 'Tacoma, WA', 'Vancouver, WA', 'Bellevue, WA', 'Kent, WA', 'Everett, WA', 'Renton, WA', 'Federal Way, WA', 'Olympia, WA',

  'Washington, DC',

  'Charleston, WV', 'Huntington, WV', 'Morgantown, WV',

  'Milwaukee, WI', 'Madison, WI', 'Green Bay, WI', 'Kenosha, WI', 'Racine, WI', 'Appleton, WI', 'Waukesha, WI',

  'Cheyenne, WY', 'Casper, WY', 'Laramie, WY',


  'Flower Mound, TX', 'Mansfield, TX', 'North Richland Hills, TX', 'Pflugerville, TX', 'New Braunfels, TX', 'San Marcos, TX', 'Georgetown, TX', 'Temple, TX',

  'Murrieta, CA', 'Menifee, CA', 'Santa Maria, CA', 'Clovis, CA', 'Redding, CA', 'Victorville, CA', 'El Cajon, CA', 'San Mateo, CA',

  'Sarasota, FL', 'Daytona Beach, FL', 'Fort Myers, FL', 'Melbourne, FL', 'Pensacola, FL', 'Naples, FL', 'Bradenton, FL',

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


    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(allContractors, null, 2));


    await sleep(300);
  }

  console.log(`\n✅ Scraping complete!`);
  console.log(`   Total contractors: ${allContractors.length}`);
  console.log(`   New this run: ${newContractors}`);
  console.log(`   Text searches: ${totalSearches} (~$${(totalSearches * 0.032).toFixed(2)})`);
  console.log(`   Output: ${OUTPUT_FILE}`);
}

main().catch(console.error);
