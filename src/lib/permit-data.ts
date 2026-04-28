

/**
 * State-level fence permit data.
 *
 * DATA PROVENANCE (April 2026):
 * -----------------------------------------------------------------
 * Almost every US state delegates fence regulation to local (city/county)
 * jurisdictions.  The numbers below represent **typical ranges across
 * municipalities** in each state, compiled from:
 *
 *   - State building codes (where a statewide code exists)
 *   - Major-city zoning ordinances (e.g. Phoenix, Houston, NYC, Chicago)
 *   - County building-department handouts & FAQ pages
 *   - FindLaw state property-line/fence-law summaries
 *   - PermitsGuide.com per-state fence-permit pages (2026)
 *   - BarrierBoss fence-code-by-state guide (2026)
 *
 * Heights and costs are the *most common* values encountered across a
 * state's municipalities.  Individual cities may be stricter or more
 * lenient.  Always advise users to verify with their local building
 * department.
 *
 * Fields marked "researched" have at least 2-3 municipal data points
 * from web sources.  Fields marked "estimated" are reasonable
 * interpolations from neighboring / similar states.
 * -----------------------------------------------------------------
 */

interface PermitData {
  permitCostLow: number;
  permitCostHigh: number;
  backyardHeight: number;
  frontyardHeight: number;
  setbackInches: number;
  permitRequiredHeight: number;
  fineLow: number;
  fineHigh: number;
  processingDays: string;
  /** Whether the state has a statewide building code that affects fences */
  hasStatewideCode: boolean;
  /** Notable state-specific rules (good-neighbor laws, pool fencing, etc.) */
  stateNotes: string;
  /** "researched" = data from 2+ specific municipal sources; "estimated" = inferred from similar states */
  dataConfidence: 'researched' | 'estimated';
}

const STATE_PERMIT_DATA: Record<string, Partial<PermitData>> = {

  // ─── TIER 1: Top 10 most-populous states ─────────────────────────

  CA: {
    permitCostLow: 50,
    permitCostHigh: 300,
    backyardHeight: 6,
    frontyardHeight: 3.5,
    setbackInches: 0,
    permitRequiredHeight: 6,
    fineLow: 250,
    fineHigh: 2500,
    processingDays: '5–15 business days',
    hasStatewideCode: true,
    stateNotes:
      'Good Neighbor Fence Law (Civil Code §841) requires equal cost-sharing for boundary fences with 30-day written notice. Pool fences must be 60" min with self-closing/self-latching gates — strictest in the US. New WUI Code (2026) requires non-combustible fencing near structures in fire zones.',
    dataConfidence: 'researched',
  },

  TX: {
    permitCostLow: 20,
    permitCostHigh: 100,
    backyardHeight: 8,
    frontyardHeight: 4,
    setbackInches: 0,
    permitRequiredHeight: 8,
    fineLow: 100,
    fineHigh: 1000,
    processingDays: '1–5 business days',
    hasStatewideCode: false,
    stateNotes:
      'No statewide fence-height law — all regulation is local. Most cities allow 6–8 ft rear/side, 4 ft front. Fences in floodplains or abutting city right-of-way typically require permits regardless of height. Very few restrictions in rural/unincorporated areas.',
    dataConfidence: 'researched',
  },

  FL: {
    permitCostLow: 25,
    permitCostHigh: 150,
    backyardHeight: 6,
    frontyardHeight: 4,
    setbackInches: 6,
    permitRequiredHeight: 6,
    fineLow: 150,
    fineHigh: 1000,
    processingDays: '3–10 business days',
    hasStatewideCode: true,
    stateNotes:
      'Florida Building Code applies statewide but cities add local amendments. Pool fence min 48" with self-closing gates strictly enforced. Highest HOA density in the US — many communities impose additional style/material/color restrictions beyond code.',
    dataConfidence: 'researched',
  },

  NY: {
    permitCostLow: 50,
    permitCostHigh: 250,
    backyardHeight: 6,
    frontyardHeight: 4,
    setbackInches: 6,
    permitRequiredHeight: 6,
    fineLow: 250,
    fineHigh: 2000,
    processingDays: '5–20 business days',
    hasStatewideCode: true,
    stateNotes:
      'NYC requires DOB permit (PW1 form) for fences over 6 ft. Historic/landmark districts require additional review regardless of height. NYS Residential Code exempts fences <=6 ft for 1-2 family homes from building permits. Spite fence statutes apply.',
    dataConfidence: 'researched',
  },

  PA: {
    permitCostLow: 25,
    permitCostHigh: 150,
    backyardHeight: 6,
    frontyardHeight: 4,
    setbackInches: 6,
    permitRequiredHeight: 6,
    fineLow: 150,
    fineHigh: 1000,
    processingDays: '3–10 business days',
    hasStatewideCode: true,
    stateNotes:
      'PA Uniform Construction Code (UCC) adopted statewide but enforcement is municipal. Most townships require administrative zoning review for fences 30"–6 ft. Philadelphia limits front-yard fences to 42" and has specific material restrictions.',
    dataConfidence: 'researched',
  },

  IL: {
    permitCostLow: 30,
    permitCostHigh: 175,
    backyardHeight: 6,
    frontyardHeight: 3,
    setbackInches: 6,
    permitRequiredHeight: 5,
    fineLow: 200,
    fineHigh: 1500,
    processingDays: '3–10 business days',
    hasStatewideCode: true,
    stateNotes:
      'Illinois adopts IRC statewide (Capital Development Board). Chicago allows 8 ft open-construction fences, 6 ft solid — no permit needed under 5 ft. Cook County limits front-yard fences to 3 ft. Municipalities vary widely.',
    dataConfidence: 'researched',
  },

  OH: {
    permitCostLow: 20,
    permitCostHigh: 100,
    backyardHeight: 6,
    frontyardHeight: 4,
    setbackInches: 6,
    permitRequiredHeight: 6,
    fineLow: 100,
    fineHigh: 800,
    processingDays: '1–7 business days',
    hasStatewideCode: true,
    stateNotes:
      'Residential Code of Ohio exempts fences <=6 ft from permits. Cities vary widely: Columbus suburbs range from 30" to 54" front-yard limits. Some cities (Hilliard) prohibit front-yard fences entirely. Spite fence statutes apply.',
    dataConfidence: 'researched',
  },

  GA: {
    permitCostLow: 20,
    permitCostHigh: 100,
    backyardHeight: 6,
    frontyardHeight: 4,
    setbackInches: 6,
    permitRequiredHeight: 6,
    fineLow: 100,
    fineHigh: 800,
    processingDays: '1–7 business days',
    hasStatewideCode: true,
    stateNotes:
      'Georgia DCA administers statewide minimum construction codes including IRC and International Swimming Pool Code. Pool fences always require a permit. Most cities allow 6 ft rear/side, 4 ft front without a permit.',
    dataConfidence: 'researched',
  },

  NC: {
    permitCostLow: 20,
    permitCostHigh: 100,
    backyardHeight: 6,
    frontyardHeight: 4,
    setbackInches: 6,
    permitRequiredHeight: 4,
    fineLow: 100,
    fineHigh: 1000,
    processingDays: '3–10 business days',
    hasStatewideCode: true,
    stateNotes:
      'NC Building Code applies statewide. Raleigh requires zoning permits for ALL fences (new, moved, or 50%+ replacement). Durham allows 8 ft rear/side but 4 ft front. Many cities require permits for any fence 4 ft or higher.',
    dataConfidence: 'researched',
  },

  MI: {
    permitCostLow: 20,
    permitCostHigh: 100,
    backyardHeight: 6,
    frontyardHeight: 4,
    setbackInches: 6,
    permitRequiredHeight: 6,
    fineLow: 100,
    fineHigh: 800,
    processingDays: '1–7 business days',
    hasStatewideCode: true,
    stateNotes:
      'Michigan Residential Code applies statewide. Front-yard fences often limited to 3 ft solid or 4 ft open (picket/chain link). Traverse City exempts fences under 7 ft from permits. Spite fence statutes apply.',
    dataConfidence: 'researched',
  },

  // ─── TIER 2: States 11-20 by population ──────────────────────────

  NJ: {
    permitCostLow: 40,
    permitCostHigh: 200,
    backyardHeight: 6,
    frontyardHeight: 4,
    setbackInches: 6,
    permitRequiredHeight: 4,
    fineLow: 200,
    fineHigh: 2000,
    processingDays: '3–10 business days',
    hasStatewideCode: true,
    stateNotes:
      'NJ UCC adopted statewide. Most towns require permits for new fences. Front-yard fences typically must be <50% solid. Corner lots restricted to 3 ft in visibility zones. Barbed/razor/electric wire prohibited in residential areas.',
    dataConfidence: 'researched',
  },

  VA: {
    permitCostLow: 25,
    permitCostHigh: 125,
    backyardHeight: 6,
    frontyardHeight: 4,
    setbackInches: 6,
    permitRequiredHeight: 6,
    fineLow: 150,
    fineHigh: 1000,
    processingDays: '3–10 business days',
    hasStatewideCode: true,
    stateNotes:
      'VA Uniform Statewide Building Code adopted. Most localities exempt fences <=6 ft from building permits but still require zoning approval. Spotsylvania allows up to 10 ft rear fences. Prince William County requires zoning approval for all fences.',
    dataConfidence: 'researched',
  },

  WA: {
    permitCostLow: 35,
    permitCostHigh: 200,
    backyardHeight: 6,
    frontyardHeight: 4,
    setbackInches: 6,
    permitRequiredHeight: 6,
    fineLow: 200,
    fineHigh: 2000,
    processingDays: '3–10 business days',
    hasStatewideCode: true,
    stateNotes:
      'WA State Building Code adopted statewide. Seattle allows 6 ft + 2 ft trellis in residential zones. King County (unincorporated) exempts fences <=6 ft. Good Neighbor fence law applies — boundary fence costs shared. Wildfire-prone areas may require non-combustible materials.',
    dataConfidence: 'researched',
  },

  AZ: {
    permitCostLow: 25,
    permitCostHigh: 125,
    backyardHeight: 6,
    frontyardHeight: 4,
    setbackInches: 6,
    permitRequiredHeight: 6,
    fineLow: 100,
    fineHigh: 1000,
    processingDays: '1–5 business days',
    hasStatewideCode: true,
    stateNotes:
      'AZ has statewide pool fence law (ARS 36-1681): 60" min pool fence required where children under 6 reside. Phoenix requires permits for most fences over 3 ft. Front-yard fences over 3.5 ft must be 80% transparent in Maricopa County.',
    dataConfidence: 'researched',
  },

  MA: {
    permitCostLow: 40,
    permitCostHigh: 200,
    backyardHeight: 6,
    frontyardHeight: 4,
    setbackInches: 6,
    permitRequiredHeight: 7,
    fineLow: 200,
    fineHigh: 1500,
    processingDays: '3–10 business days',
    hasStatewideCode: true,
    stateNotes:
      'MA State Building Code (780 CMR) requires permits for fences over 7 ft. Spite fences over 6 ft built maliciously are illegal. Historic districts require commission approval. Corner-lot visibility triangle limits fences to 2.5 ft within 25 ft of intersections.',
    dataConfidence: 'researched',
  },

  TN: {
    permitCostLow: 20,
    permitCostHigh: 100,
    backyardHeight: 8,
    frontyardHeight: 4,
    setbackInches: 6,
    permitRequiredHeight: 6,
    fineLow: 100,
    fineHigh: 750,
    processingDays: '1–5 business days',
    hasStatewideCode: false,
    stateNotes:
      'No statewide fence-specific code. Nashville does not require fence permits but enforces zoning setbacks (solid fences set back 10 ft from street, max 30" within that setback; 8 ft max side/rear). Clarksville requires permits over 6 ft.',
    dataConfidence: 'researched',
  },

  IN: {
    permitCostLow: 20,
    permitCostHigh: 100,
    backyardHeight: 6,
    frontyardHeight: 4,
    setbackInches: 6,
    permitRequiredHeight: 6,
    fineLow: 100,
    fineHigh: 750,
    processingDays: '1–7 business days',
    hasStatewideCode: false,
    stateNotes:
      'No statewide fence permit requirement — varies by municipality. Indianapolis limits front-yard fences to 4 ft, rear/side to 6 ft. Spite fences exceeding 6 ft are defined as a nuisance under state law. Some cities require permits for all fences within city limits.',
    dataConfidence: 'researched',
  },

  MO: {
    permitCostLow: 20,
    permitCostHigh: 100,
    backyardHeight: 6,
    frontyardHeight: 4,
    setbackInches: 6,
    permitRequiredHeight: 6,
    fineLow: 100,
    fineHigh: 750,
    processingDays: '1–7 business days',
    hasStatewideCode: false,
    stateNotes:
      'No statewide fence code — all regulation is local. Kansas City ordinance Ch. 27 governs fences/walls. St. Louis typically does not require permits for same-height/same-material replacement in rear/side yards. Variances available for heights over 6 ft.',
    dataConfidence: 'researched',
  },

  MD: {
    permitCostLow: 30,
    permitCostHigh: 175,
    backyardHeight: 6,
    frontyardHeight: 4,
    setbackInches: 6,
    permitRequiredHeight: 6,
    fineLow: 150,
    fineHigh: 1500,
    processingDays: '3–10 business days',
    hasStatewideCode: true,
    stateNotes:
      'Maryland Building Performance Standards apply statewide. Montgomery County requires permits for ALL fence installations. Baltimore County limits front yards to 42". Anne Arundel County exempts fences <=6 ft. Corner-lot visibility restrictions common.',
    dataConfidence: 'researched',
  },

  // ─── TIER 3: States 21-30 by population ──────────────────────────

  WI: {
    permitCostLow: 20,
    permitCostHigh: 100,
    backyardHeight: 6,
    frontyardHeight: 3,
    setbackInches: 6,
    permitRequiredHeight: 6,
    fineLow: 100,
    fineHigh: 750,
    processingDays: '1–7 business days',
    hasStatewideCode: true,
    stateNotes:
      'Wisconsin has statewide Uniform Dwelling Code. Madison does not require fence permits but enforces height/placement laws. Waukesha also does not require permits but has strict material/height regulations. Corner intersection fences max 30".',
    dataConfidence: 'researched',
  },

  CO: {
    permitCostLow: 30,
    permitCostHigh: 150,
    backyardHeight: 6,
    frontyardHeight: 4,
    setbackInches: 6,
    permitRequiredHeight: 6,
    fineLow: 150,
    fineHigh: 1000,
    processingDays: '3–10 business days',
    hasStatewideCode: false,
    stateNotes:
      'Good Neighbor Fence Law requires neighbor consent for boundary fences. Colorado Springs limits front yards to 3.5 ft. Wildfire-prone areas may require non-combustible fencing materials. HOAs frequently impose additional restrictions.',
    dataConfidence: 'researched',
  },

  MN: {
    permitCostLow: 25,
    permitCostHigh: 125,
    backyardHeight: 6,
    frontyardHeight: 4,
    setbackInches: 6,
    permitRequiredHeight: 7,
    fineLow: 100,
    fineHigh: 1000,
    processingDays: '3–10 business days',
    hasStatewideCode: true,
    stateNotes:
      'MN State Building Code applies. Fences over 7 ft require building permits statewide. Apple Valley allows 8 ft rear/side. Minneapolis limits front yard to 3 ft. Ramsey allows 8 ft side/rear, 48" front. Elk River exempts fences <=6 ft.',
    dataConfidence: 'researched',
  },

  SC: {
    permitCostLow: 20,
    permitCostHigh: 100,
    backyardHeight: 6,
    frontyardHeight: 4,
    setbackInches: 6,
    permitRequiredHeight: 6,
    fineLow: 100,
    fineHigh: 750,
    processingDays: '1–7 business days',
    hasStatewideCode: false,
    stateNotes:
      'No state law requiring fence permits — municipal regulation only. Charleston requires permits for fences over 6 ft. Bluffton requires zoning approval for all fences regardless of height. Most cities allow 6 ft rear/side, 4 ft front without a permit.',
    dataConfidence: 'researched',
  },

  AL: {
    permitCostLow: 15,
    permitCostHigh: 75,
    backyardHeight: 8,
    frontyardHeight: 4,
    setbackInches: 6,
    permitRequiredHeight: 6,
    fineLow: 50,
    fineHigh: 500,
    processingDays: '1–5 business days',
    hasStatewideCode: true,
    stateNotes:
      'Alabama adopted statewide IRC but enforcement is local. Birmingham requires zoning permits for ALL fences — rear/side max 8 ft, front max 4 ft. Montgomery allows up to 7 ft in most residential districts. Mobile County exempts fences <=7 ft.',
    dataConfidence: 'researched',
  },

  LA: {
    permitCostLow: 20,
    permitCostHigh: 100,
    backyardHeight: 6,
    frontyardHeight: 4,
    setbackInches: 6,
    permitRequiredHeight: 7,
    fineLow: 50,
    fineHigh: 500,
    processingDays: '1–7 business days',
    hasStatewideCode: false,
    stateNotes:
      'No statewide fence code — parish-level regulation. Lafayette exempts fences <=7 ft. Lake Charles exempts fences <=10 ft (unusually lenient). Jefferson Parish requires permits with 4 ft front / 6 ft rear-side limits. Louisiana 811 call-before-you-dig required.',
    dataConfidence: 'researched',
  },

  KY: {
    permitCostLow: 15,
    permitCostHigh: 75,
    backyardHeight: 6,
    frontyardHeight: 4,
    setbackInches: 6,
    permitRequiredHeight: 6,
    fineLow: 50,
    fineHigh: 500,
    processingDays: '1–7 business days',
    hasStatewideCode: false,
    stateNotes:
      'No statewide fence-specific code. Most jurisdictions allow 6 ft solid / 8 ft chain link rear-side, 4 ft front. Fences exceeding limits require variance from local board of adjustment. Some areas restrict barbed wire and electric fences in residential zones.',
    dataConfidence: 'researched',
  },

  OR: {
    permitCostLow: 30,
    permitCostHigh: 175,
    backyardHeight: 8,
    frontyardHeight: 3.5,
    setbackInches: 6,
    permitRequiredHeight: 7,
    fineLow: 150,
    fineHigh: 1000,
    processingDays: '3–10 business days',
    hasStatewideCode: true,
    stateNotes:
      'Oregon has a statewide Structural Specialty Code. Portland exempts wood fences <=7 ft and masonry fences <=4 ft from permits. Salem allows 8 ft on interior side/rear lines. Good Neighbor fence law applies — boundary fence costs shared.',
    dataConfidence: 'researched',
  },

  OK: {
    permitCostLow: 15,
    permitCostHigh: 75,
    backyardHeight: 8,
    frontyardHeight: 4,
    setbackInches: 6,
    permitRequiredHeight: 6,
    fineLow: 50,
    fineHigh: 500,
    processingDays: '1–5 business days',
    hasStatewideCode: false,
    stateNotes:
      'No statewide fence code — city/county regulation. Oklahoma City and Tulsa both allow 8 ft rear/side, 4 ft front. Most cities require permits for fence construction. Oklahoma agricultural fence statutes (Title 4) define lawful fence requirements for rural areas.',
    dataConfidence: 'researched',
  },

  CT: {
    permitCostLow: 35,
    permitCostHigh: 175,
    backyardHeight: 6,
    frontyardHeight: 4,
    setbackInches: 6,
    permitRequiredHeight: 7,
    fineLow: 200,
    fineHigh: 1500,
    processingDays: '3–10 business days',
    hasStatewideCode: true,
    stateNotes:
      'CT State Building Code exempts fences under 7 ft from building permits. However, most towns still require zoning permits with height/setback rules. Front-yard fences typically must be partially open. Corner-lot fences max 30" within 30 ft of intersection.',
    dataConfidence: 'researched',
  },

  UT: {
    permitCostLow: 25,
    permitCostHigh: 125,
    backyardHeight: 6,
    frontyardHeight: 4,
    setbackInches: 6,
    permitRequiredHeight: 7,
    fineLow: 100,
    fineHigh: 1000,
    processingDays: '1–7 business days',
    hasStatewideCode: true,
    stateNotes:
      'Utah adopts IRC statewide. Ogden allows 7 ft side/rear, 4 ft front. Salt Lake City limits front-yard fences to 4 ft. West Valley City allows 6 ft side/rear. Building permit required for fences over 7 ft in most municipalities.',
    dataConfidence: 'researched',
  },

  // ─── TIER 4: States 31-40 by population ──────────────────────────

  NV: {
    permitCostLow: 25,
    permitCostHigh: 150,
    backyardHeight: 6,
    frontyardHeight: 4,
    setbackInches: 6,
    permitRequiredHeight: 6,
    fineLow: 150,
    fineHigh: 1000,
    processingDays: '1–7 business days',
    hasStatewideCode: false,
    stateNotes:
      'No statewide residential fence height limit. Las Vegas allows 8 ft max, 48" front. Clark County allows 6 ft typical. Las Vegas currently requires permits for fences over 2 ft (may increase to 6 ft exemption with new admin code). Extreme heat considerations for material choice.',
    dataConfidence: 'researched',
  },

  IA: {
    permitCostLow: 20,
    permitCostHigh: 100,
    backyardHeight: 6,
    frontyardHeight: 4,
    setbackInches: 6,
    permitRequiredHeight: 6,
    fineLow: 75,
    fineHigh: 500,
    processingDays: '1–5 business days',
    hasStatewideCode: false,
    stateNotes:
      'No statewide fence-specific code — municipal regulation. Council Bluffs requires permits for all fences. Scott County requires permits for fences over 6 ft. Some jurisdictions allow non-view-obscuring front-yard fences up to 6 ft if <50% opacity.',
    dataConfidence: 'researched',
  },

  AR: {
    permitCostLow: 15,
    permitCostHigh: 75,
    backyardHeight: 6,
    frontyardHeight: 4,
    setbackInches: 6,
    permitRequiredHeight: 7,
    fineLow: 50,
    fineHigh: 500,
    processingDays: '1–5 business days',
    hasStatewideCode: false,
    stateNotes:
      'No statewide fence code — city/county regulation. Fayetteville exempts fences <=7 ft from permits. Jonesboro requires permits for all fences. Front-yard fences typically 3–4 ft, rear/side 6–8 ft depending on city and zoning district.',
    dataConfidence: 'researched',
  },

  MS: {
    permitCostLow: 15,
    permitCostHigh: 75,
    backyardHeight: 6,
    frontyardHeight: 4,
    setbackInches: 6,
    permitRequiredHeight: 6,
    fineLow: 50,
    fineHigh: 500,
    processingDays: '1–5 business days',
    hasStatewideCode: false,
    stateNotes:
      'No statewide fence code — home-rule system with city/county regulation. Permit fees generally low ($25–$75). Jurisdictions with minimal code enforcement may not require formal permits but setback/height rules still apply.',
    dataConfidence: 'researched',
  },

  KS: {
    permitCostLow: 20,
    permitCostHigh: 100,
    backyardHeight: 6,
    frontyardHeight: 4,
    setbackInches: 6,
    permitRequiredHeight: 7,
    fineLow: 75,
    fineHigh: 750,
    processingDays: '1–7 business days',
    hasStatewideCode: false,
    stateNotes:
      'No statewide building code for residential construction. Wichita and Olathe exempt fences <=7 ft. Overland Park requires permits for most fence installations. Many cities require front-yard fences to be >=50% open. Rural counties may have no fence codes at all.',
    dataConfidence: 'researched',
  },

  NM: {
    permitCostLow: 25,
    permitCostHigh: 125,
    backyardHeight: 6,
    frontyardHeight: 4,
    setbackInches: 6,
    permitRequiredHeight: 6,
    fineLow: 100,
    fineHigh: 750,
    processingDays: '3–10 business days',
    hasStatewideCode: true,
    stateNotes:
      'NM Construction Industries Division administers statewide code. Albuquerque requires $25 zoning permit for fences under 6 ft, full building permit for fences over 6 ft. Fences abutting arterial streets or non-residential property may go up to 8 ft.',
    dataConfidence: 'researched',
  },

  NE: {
    permitCostLow: 20,
    permitCostHigh: 100,
    backyardHeight: 6,
    frontyardHeight: 4,
    setbackInches: 6,
    permitRequiredHeight: 7,
    fineLow: 75,
    fineHigh: 750,
    processingDays: '1–7 business days',
    hasStatewideCode: false,
    stateNotes:
      'No statewide fence-specific code. Omaha permits cost $50–$150 with 1–2 week approval. Fences under 7 ft in side/rear yards generally exempt from permits. Front-yard fences must have >=50% open surface area. Corner lots and driveways require Public Works sight-distance review.',
    dataConfidence: 'researched',
  },

  ID: {
    permitCostLow: 20,
    permitCostHigh: 100,
    backyardHeight: 6,
    frontyardHeight: 4,
    setbackInches: 6,
    permitRequiredHeight: 7,
    fineLow: 75,
    fineHigh: 500,
    processingDays: '1–7 business days',
    hasStatewideCode: false,
    stateNotes:
      'No statewide fence permitting requirement. Boise exempts wood fences <=7 ft outside front setback from permits. Solid fences max 36", open fences max 48" in front-yard setback. Ada County requires permits for fences over 6 ft.',
    dataConfidence: 'researched',
  },

  // ─── TIER 5: States 41-50 by population ──────────────────────────

  WV: {
    permitCostLow: 15,
    permitCostHigh: 75,
    backyardHeight: 6,
    frontyardHeight: 4,
    setbackInches: 6,
    permitRequiredHeight: 6,
    fineLow: 50,
    fineHigh: 500,
    processingDays: '1–5 business days',
    hasStatewideCode: false,
    stateNotes:
      'Many rural areas lack building code enforcement and have no fence permit requirements. Cities/towns that adopted building codes typically follow standard 6 ft rear/side, 4 ft front pattern. Permits mainly required in incorporated municipalities.',
    dataConfidence: 'estimated',
  },

  HI: {
    permitCostLow: 30,
    permitCostHigh: 200,
    backyardHeight: 6,
    frontyardHeight: 4,
    setbackInches: 6,
    permitRequiredHeight: 6,
    fineLow: 200,
    fineHigh: 1500,
    processingDays: '5–15 business days',
    hasStatewideCode: false,
    stateNotes:
      'Regulation by county (4 counties). Honolulu typically limits front yards to 4 ft, rear/side to 6 ft. Fences over 7 ft may require engineered drawings for wind-load compliance. Special Management Areas near shoreline require additional review regardless of height.',
    dataConfidence: 'researched',
  },

  NH: {
    permitCostLow: 25,
    permitCostHigh: 125,
    backyardHeight: 6,
    frontyardHeight: 4,
    setbackInches: 36,
    permitRequiredHeight: 6,
    fineLow: 100,
    fineHigh: 750,
    processingDays: '1–7 business days',
    hasStatewideCode: false,
    stateNotes:
      'No statewide fence-specific code. Building Department recommends 3 ft setback from property line. Hudson allows up to 8 ft without permit. Portsmouth allows 8 ft rear/side, 4 ft front. Historic District properties require building department permits for any fence.',
    dataConfidence: 'researched',
  },

  ME: {
    permitCostLow: 25,
    permitCostHigh: 100,
    backyardHeight: 6,
    frontyardHeight: 4,
    setbackInches: 6,
    permitRequiredHeight: 7,
    fineLow: 75,
    fineHigh: 500,
    processingDays: '1–7 business days',
    hasStatewideCode: true,
    stateNotes:
      'Maine Uniform Building and Energy Code (MUBEC) applies in ~70 communities; IRC exempts fences <=7 ft from building permits. Front-yard fences typically open design only. Flood permit required if property is in 100-year floodplain or shoreland zone.',
    dataConfidence: 'researched',
  },

  MT: {
    permitCostLow: 20,
    permitCostHigh: 100,
    backyardHeight: 6,
    frontyardHeight: 4,
    setbackInches: 6,
    permitRequiredHeight: 7,
    fineLow: 75,
    fineHigh: 500,
    processingDays: '1–7 business days',
    hasStatewideCode: true,
    stateNotes:
      'Montana adopted 2018 IRC/IBC statewide. Bozeman exempts fences <=6 ft rear / <=4 ft front from permits. Billings requires Planning Division permit for fences 4–7 ft, building permit for 8 ft+. Missoula requires permits for new fences and replacements >=25 ft.',
    dataConfidence: 'researched',
  },

  RI: {
    permitCostLow: 25,
    permitCostHigh: 125,
    backyardHeight: 6,
    frontyardHeight: 4,
    setbackInches: 24,
    permitRequiredHeight: 6,
    fineLow: 100,
    fineHigh: 750,
    processingDays: '1–7 business days',
    hasStatewideCode: true,
    stateNotes:
      'RI State Building Code exempts fences <=6 ft from building permits statewide. Some towns (Woonsocket, Narragansett) require permits for any fence regardless of height. State law requires minimum 2 ft setback from property line. Lawful fence minimums defined in General Law 34-10-1.',
    dataConfidence: 'researched',
  },

  DE: {
    permitCostLow: 20,
    permitCostHigh: 100,
    backyardHeight: 6,
    frontyardHeight: 4,
    setbackInches: 6,
    permitRequiredHeight: 6,
    fineLow: 75,
    fineHigh: 500,
    processingDays: '1–7 business days',
    hasStatewideCode: false,
    stateNotes:
      'Regulation by county (3 counties). New Castle County exempts residential fences from permits (except pool barriers). Sussex County allows residential fences up to 7 ft. State statute defines "lawful fence" at 4.5 ft in New Castle/Kent, 4 ft in Sussex.',
    dataConfidence: 'researched',
  },

  SD: {
    permitCostLow: 15,
    permitCostHigh: 75,
    backyardHeight: 6,
    frontyardHeight: 4,
    setbackInches: 6,
    permitRequiredHeight: 6,
    fineLow: 50,
    fineHigh: 500,
    processingDays: '1–5 business days',
    hasStatewideCode: false,
    stateNotes:
      'No statewide fence height law — local building departments set codes. Sioux Falls requires permits for new fences, relocations, and replacements. Brookings exempts fences under 6 ft. Rural/unincorporated areas may have no fence regulations.',
    dataConfidence: 'researched',
  },

  ND: {
    permitCostLow: 15,
    permitCostHigh: 75,
    backyardHeight: 6,
    frontyardHeight: 3,
    setbackInches: 6,
    permitRequiredHeight: 6.5,
    fineLow: 50,
    fineHigh: 500,
    processingDays: '1–5 business days',
    hasStatewideCode: false,
    stateNotes:
      'No statewide fence-specific code. Fargo exempts fences <=6.5 ft from permits but limits front-yard fences to 3 ft. Bismarck exempts fences <=8.5 ft. Minot allows 8 ft residential fencing. Rural areas generally unregulated.',
    dataConfidence: 'researched',
  },

  AK: {
    permitCostLow: 25,
    permitCostHigh: 150,
    backyardHeight: 6,
    frontyardHeight: 4,
    setbackInches: 6,
    permitRequiredHeight: 6,
    fineLow: 100,
    fineHigh: 750,
    processingDays: '3–10 business days',
    hasStatewideCode: false,
    stateNotes:
      'No statewide fence code. Anchorage restricts front-yard fences to 4 ft (6 ft in R-6/R-8/R-9 zones). Non-sight-obscuring fences may reach 8 ft in some zones. Fence permit applications require site plan. Palmer requires permits for residential fences.',
    dataConfidence: 'researched',
  },

  VT: {
    permitCostLow: 20,
    permitCostHigh: 100,
    backyardHeight: 6,
    frontyardHeight: 4,
    setbackInches: 6,
    permitRequiredHeight: 4,
    fineLow: 75,
    fineHigh: 500,
    processingDays: '1–7 business days',
    hasStatewideCode: false,
    stateNotes:
      'No statewide fence-specific code — municipal regulation. South Burlington requires zoning permits for fences 4–8 ft, Development Review Board approval over 8 ft. Hartford allows fences on property line if maintained from own property. Front setback fences limited to 3.5 ft in residential zones.',
    dataConfidence: 'researched',
  },

  WY: {
    permitCostLow: 15,
    permitCostHigh: 75,
    backyardHeight: 7,
    frontyardHeight: 4,
    setbackInches: 6,
    permitRequiredHeight: 7,
    fineLow: 50,
    fineHigh: 500,
    processingDays: '1–5 business days',
    hasStatewideCode: false,
    stateNotes:
      'No statewide fence code — municipal regulation. Cody requires zoning certificates for all fences; building permits for fences over 6 ft. Max 7 ft outside front setback, 4 ft in front setback. Front-yard fences over 3 ft must be >=40% open. Open range state — agricultural fence statutes apply.',
    dataConfidence: 'researched',
  },
};

const DEFAULTS: PermitData = {
  permitCostLow: 20,
  permitCostHigh: 125,
  backyardHeight: 6,
  frontyardHeight: 4,
  setbackInches: 6,
  permitRequiredHeight: 6,
  fineLow: 100,
  fineHigh: 1000,
  processingDays: '5–15 business days',
  hasStatewideCode: false,
  stateNotes: '',
  dataConfidence: 'estimated',
};

export function getPermitData(stateCode: string): PermitData {
  const stateOverrides = STATE_PERMIT_DATA[stateCode] || {};
  return { ...DEFAULTS, ...stateOverrides };
}

export type { PermitData };
