

const SITE_URL = 'https://getfencefind.com';
const SITE_NAME = 'FenceFind';


export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}


export function faqSchema(questions: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: a,
      },
    })),
  };
}


export function localBusinessSchema(contractor: {
  name: string;
  description: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  rating: number;
  reviewCount: number;
  website?: string;
  slug: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/contractor/${contractor.slug}`,
    name: contractor.name,
    description: contractor.description,
    telephone: contractor.phone,
    url: contractor.website || `${SITE_URL}/contractor/${contractor.slug}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: contractor.address,
      addressLocality: contractor.city,
      addressRegion: contractor.state,
      postalCode: contractor.zip,
      addressCountry: 'US',
    },
    aggregateRating: contractor.reviewCount > 0 ? {
      '@type': 'AggregateRating',
      ratingValue: contractor.rating,
      reviewCount: contractor.reviewCount,
      bestRating: 5,
      worstRating: 1,
    } : undefined,
    areaServed: {
      '@type': 'City',
      name: contractor.city,
    },
    priceRange: '$$',
  };
}


export function howToSchema(opts: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
  totalTime?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: opts.name,
    description: opts.description,
    ...(opts.totalTime ? { totalTime: opts.totalTime } : {}),
    step: opts.steps.map((step, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: step.name,
      text: step.text,
    })),
  };
}


export function serviceSchema(city: string, state: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Fence Installation in ${city}, ${state}`,
    description: `Professional fence installation services in ${city}, ${state}. Compare costs for wood, vinyl, chain link, and aluminum fencing.`,
    provider: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    areaServed: {
      '@type': 'City',
      name: city,
      containedInPlace: {
        '@type': 'State',
        name: state,
      },
    },
    serviceType: 'Fence Installation',
  };
}


export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    description: 'Find trusted fence contractors near you. Compare ratings, read reviews, and get free estimates from licensed professionals.',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      url: `${SITE_URL}/about`,
    },
  };
}


export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: 'Find trusted fence contractors near you. Compare ratings, read reviews, and get free estimates.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}


export function ogMeta(opts: {
  title: string;
  description: string;
  path: string;
  type?: string;
}) {
  return {
    openGraph: {
      title: opts.title,
      description: opts.description,
      url: `${SITE_URL}${opts.path}`,
      siteName: SITE_NAME,
      type: opts.type || 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary' as const,
      title: opts.title,
      description: opts.description,
    },
    alternates: {
      canonical: `${SITE_URL}${opts.path}`,
    },
  };
}


const REGION_COST_MULTIPLIER: Record<string, number> = {
  CA: 1.35, NY: 1.30, MA: 1.25, CT: 1.25, NJ: 1.25, WA: 1.20,
  CO: 1.15, OR: 1.15, MD: 1.15, VA: 1.10, IL: 1.10, MN: 1.10,
  HI: 1.40, AK: 1.35, DC: 1.30,
  FL: 1.05, TX: 1.0, AZ: 1.0, NC: 0.95, GA: 0.95, TN: 0.95,
  OH: 0.90, IN: 0.90, MO: 0.90, MI: 0.90, PA: 0.95,
  AL: 0.85, MS: 0.85, AR: 0.85, WV: 0.85, KY: 0.88,
  SC: 0.90, LA: 0.90, OK: 0.88, KS: 0.88, NE: 0.90, IA: 0.88,
};

export function getCostData(stateCode: string) {
  const mult = REGION_COST_MULTIPLIER[stateCode] || 1.0;


  const base = {
    wood: { low: 15, high: 35, avg: 25 },
    vinyl: { low: 20, high: 40, avg: 30 },
    chainLink: { low: 10, high: 25, avg: 17 },
    aluminum: { low: 25, high: 55, avg: 38 },
    wroughtIron: { low: 25, high: 60, avg: 40 },
    composite: { low: 25, high: 45, avg: 35 },
  };

  const adjusted: Record<string, { low: number; high: number; avg: number }> = {};
  for (const [material, costs] of Object.entries(base)) {
    adjusted[material] = {
      low: Math.round(costs.low * mult),
      high: Math.round(costs.high * mult),
      avg: Math.round(costs.avg * mult),
    };
  }


  const projectLow = Math.round(150 * base.chainLink.low * mult);
  const projectHigh = Math.round(150 * base.wroughtIron.high * mult);
  const projectAvg = Math.round(150 * base.wood.avg * mult);

  return { materials: adjusted, project: { low: projectLow, high: projectHigh, avg: projectAvg }, multiplier: mult };
}


export const COST_MATERIAL_NAMES: Record<string, string> = {
  wood: 'Wood',
  vinyl: 'Vinyl',
  chainLink: 'Chain Link',
  aluminum: 'Aluminum',
  wroughtIron: 'Wrought Iron',
  composite: 'Composite',
};


type ClimateZone = 'hot-humid' | 'hot-arid' | 'cold' | 'moderate' | 'coastal' | 'tropical';

interface RegionData {
  climate: ClimateZone;
  label: string;
  topMaterials: string[];
  materialTip: string;
  bestSeason: string;
  weatherConsideration: string;
}

const CLIMATE_BY_STATE: Record<string, ClimateZone> = {
  AL: 'hot-humid', AK: 'cold', AZ: 'hot-arid', AR: 'hot-humid',
  CA: 'moderate', CO: 'cold', CT: 'cold', DE: 'moderate',
  FL: 'tropical', GA: 'hot-humid', HI: 'tropical', ID: 'cold',
  IL: 'cold', IN: 'cold', IA: 'cold', KS: 'moderate',
  KY: 'moderate', LA: 'hot-humid', ME: 'cold', MD: 'moderate',
  MA: 'cold', MI: 'cold', MN: 'cold', MS: 'hot-humid',
  MO: 'moderate', MT: 'cold', NE: 'cold', NV: 'hot-arid',
  NH: 'cold', NJ: 'moderate', NM: 'hot-arid', NY: 'cold',
  NC: 'moderate', ND: 'cold', OH: 'cold', OK: 'hot-humid',
  OR: 'moderate', PA: 'cold', RI: 'cold', SC: 'hot-humid',
  SD: 'cold', TN: 'moderate', TX: 'hot-humid', UT: 'hot-arid',
  VT: 'cold', VA: 'moderate', WA: 'moderate', WV: 'moderate',
  WI: 'cold', WY: 'cold',
};

const CLIMATE_DATA: Record<ClimateZone, Omit<RegionData, 'climate'>> = {
  'hot-humid': {
    label: 'hot and humid',
    topMaterials: ['vinyl', 'aluminum', 'chain link'],
    materialTip: 'Vinyl and aluminum resist moisture, rot, and insects — major concerns in humid climates. Wood fences can work but require regular sealing and staining to prevent warping and decay.',
    bestSeason: 'fall or early spring',
    weatherConsideration: 'High humidity and heavy rain accelerate wood rot. Termites are also a concern — choose pressure-treated wood if going with a wood fence.',
  },
  'hot-arid': {
    label: 'hot and dry',
    topMaterials: ['vinyl', 'wrought iron', 'aluminum'],
    materialTip: 'Intense sun and UV exposure cause wood to crack, split, and fade quickly. Vinyl, wrought iron, and aluminum hold up best. If choosing wood, cedar is more UV-resistant than pine.',
    bestSeason: 'fall through early spring',
    weatherConsideration: 'Extreme heat can make soil hard-packed and difficult to dig, which may increase installation labor costs. Monsoon season (summer) can delay outdoor projects.',
  },
  'cold': {
    label: 'cold with harsh winters',
    topMaterials: ['vinyl', 'wood', 'aluminum'],
    materialTip: 'Freeze-thaw cycles can shift fence posts — proper post depth (below the frost line) is critical. Vinyl handles temperature swings well without cracking. Cedar and pressure-treated wood are also strong choices.',
    bestSeason: 'late spring through early fall',
    weatherConsideration: 'Ground freezes in winter, making installation difficult or impossible. Plan projects for warmer months. Snow load can stress fences, so heavier-gauge materials and proper bracing are important.',
  },
  'moderate': {
    label: 'moderate',
    topMaterials: ['wood', 'vinyl', 'composite'],
    materialTip: 'Most fence materials perform well in moderate climates. Wood privacy fences are the most popular choice. Composite offers a low-maintenance alternative with a wood-like appearance.',
    bestSeason: 'spring or fall',
    weatherConsideration: 'Moderate climates are forgiving for all fence types. Focus on the look and maintenance level you want rather than weather resistance.',
  },
  'coastal': {
    label: 'coastal',
    topMaterials: ['vinyl', 'aluminum', 'composite'],
    materialTip: 'Salt air corrodes metal and accelerates wood decay. Vinyl and aluminum are the best choices for coastal properties. Avoid wrought iron unless powder-coated, and expect more frequent maintenance on any metal fence.',
    bestSeason: 'spring or fall',
    weatherConsideration: 'Salt spray, high winds, and storms are the main concerns. Choose flexible materials that can handle wind load, and make sure posts are set deep enough to resist storm forces.',
  },
  'tropical': {
    label: 'tropical',
    topMaterials: ['vinyl', 'aluminum', 'chain link'],
    materialTip: 'Year-round humidity and heavy rainfall make vinyl and aluminum the best options. Wood fences deteriorate quickly without aggressive treatment. Chain link with vinyl coating is a budget-friendly option that holds up well.',
    bestSeason: 'dry season (winter months)',
    weatherConsideration: 'Hurricane and tropical storm risk means fences should be built to withstand high winds. Posts should be set in concrete at least 2–3 feet deep. Avoid solid panel fences in high-wind areas — semi-privacy designs reduce wind load.',
  },
};

export function getRegionData(stateCode: string): RegionData {
  const climate = CLIMATE_BY_STATE[stateCode] || 'moderate';
  return { climate, ...CLIMATE_DATA[climate] };
}
