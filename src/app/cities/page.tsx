import { getCities } from '@/lib/data';
import Link from 'next/link';
import { Metadata } from 'next';
import { ogMeta, breadcrumbSchema, faqSchema } from '@/lib/seo';
import CitySearch from '@/components/CitySearch';

export const revalidate = 3600;

export default async function CitiesPage() {
  const cities = await getCities();

  const byState: Record<string, typeof cities> = {};
  for (const city of cities) {
    const state = city.state || city.stateCode;
    if (!byState[state]) byState[state] = [];
    byState[state].push(city);
  }

  const sortedStates = Object.keys(byState).sort();
  const totalContractors = cities.reduce((sum, c) => sum + c.contractorCount, 0);

  const faqs = [
    { q: 'How do I find fence contractors in my city?', a: `Browse our directory of ${cities.length}+ cities to find licensed fence contractors near you. Each city page lists local contractors with ratings, reviews, and contact information so you can compare and request free estimates.` },
    { q: 'Is FenceFind free for homeowners?', a: 'Yes, FenceFind is completely free for homeowners. You can search for contractors, compare ratings, read reviews, and request quotes at no cost.' },
    { q: 'How many fence contractors are listed on FenceFind?', a: `FenceFind lists ${totalContractors.toLocaleString()}+ fence contractors across ${cities.length}+ cities in all 50 states. Our directory grows every week as more contractors claim and create listings.` },
    { q: 'Can I get free fence installation quotes through FenceFind?', a: 'Yes. Visit any city or contractor page and use the quote request form to get free estimates from local fence installers. We recommend getting at least three quotes to compare pricing.' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Cities', url: '/cities' },
          ])),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Fence Contractors by City',
            description: `Browse ${cities.length}+ cities across all 50 states to find local fence contractors.`,
            numberOfItems: cities.length,
            itemListElement: cities.slice(0, 50).map((city, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: `Fence Contractors in ${city.name}, ${city.stateCode}`,
              url: `https://getfencefind.com/city/${city.slug}`,
            })),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }}
      />

      <h1 className="text-3xl font-bold text-gray-900 mb-3">Fence Contractors by City</h1>
      <p className="text-lg text-gray-600 mb-8">
        Browse {cities.length}+ cities across all 50 states to find licensed fence contractors near you.
        Each city page includes local contractor ratings, reviews, cost estimates, and climate-specific material recommendations to help you make the right choice.
      </p>

      <CitySearch />

      {/* Jump links */}
      <div className="flex flex-wrap gap-2 mb-10">
        {sortedStates.map((state) => (
          <a
            key={state}
            href={`#${state.toLowerCase().replace(/\s+/g, '-')}`}
            className="text-sm text-green-600 hover:text-green-700 font-medium px-2 py-1 border border-gray-200 rounded hover:border-green-300 transition-colors"
          >
            {state}
          </a>
        ))}
      </div>

      {/* Cities grouped by state */}
      <div className="space-y-10">
        {sortedStates.map((state) => {
          const stateCities = byState[state];
          const stateSlug = state.toLowerCase().replace(/\s+/g, '-');
          return (
            <section key={state} id={stateSlug} data-city-section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                <Link href={`/state/${stateSlug}`} className="hover:text-green-600 transition-colors">
                  {state}
                </Link>
                <span className="text-sm font-normal text-gray-500 ml-2">
                  {stateCities.length} {stateCities.length === 1 ? 'city' : 'cities'}
                </span>
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {stateCities.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/city/${city.slug}`}
                    data-city={city.name}
                    className="p-3 bg-white border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-all group"
                  >
                    <div className="font-medium text-gray-900 group-hover:text-green-600">{city.name}</div>
                    {city.contractorCount > 0 && (
                      <div className="text-sm text-gray-500">{city.contractorCount} contractors</div>
                    )}
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* FAQ */}
      <div className="mt-16 max-w-3xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <details key={faq.q} className="bg-white rounded-xl border p-6 group">
              <summary className="font-semibold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                {faq.q}
                <span className="text-green-600 group-open:rotate-45 transition-transform text-xl ml-2">+</span>
              </summary>
              <p className="text-gray-600 mt-3">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>

      {/* Contractor CTA */}
      <div className="mt-16 bg-green-50 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Are You a Fence Contractor?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Get listed on FenceFind and connect with homeowners searching for fence installation and repair services in your area.
        </p>
        <Link
          href="/claim"
          className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
        >
          List Your Business — It&apos;s Free
        </Link>
      </div>
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const cities = await getCities();
  return {
    title: `Browse Fence Contractors by City — ${cities.length}+ Cities | FenceFind`,
    description: `Find fence contractors in ${cities.length}+ cities across all 50 states. Browse by city to compare rated & reviewed local fence installers and get free estimates.`,
    ...ogMeta({
      title: `Browse Fence Contractors by City — ${cities.length}+ Cities | FenceFind`,
      description: `Find fence contractors in ${cities.length}+ cities across all 50 states. Browse by city to compare local fence installers.`,
      path: '/cities',
    }),
  };
}
