

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
