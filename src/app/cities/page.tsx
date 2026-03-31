import { getCities } from '@/lib/data';
import Link from 'next/link';
import { Metadata } from 'next';
import { ogMeta } from '@/lib/seo';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Browse Fence Contractors by City — 490+ Cities | FenceFind',
  description: 'Find fence contractors in 490+ cities across all 50 states. Browse by city to compare rated & reviewed local fence installers and get free estimates.',
  ...ogMeta({
    title: 'Browse Fence Contractors by City — 490+ Cities | FenceFind',
    description: 'Find fence contractors in 490+ cities across all 50 states. Browse by city to compare local fence installers.',
    path: '/cities',
  }),
};

export default async function CitiesPage() {
  const cities = await getCities();

  const byState: Record<string, typeof cities> = {};
  for (const city of cities) {
    const state = city.state || city.stateCode;
    if (!byState[state]) byState[state] = [];
    byState[state].push(city);
  }

  const sortedStates = Object.keys(byState).sort();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Fence Contractors by City</h1>
      <p className="text-gray-600 mb-4">
        Browse {cities.length}+ cities across all 50 states
      </p>

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
          return (
            <section key={state} id={state.toLowerCase().replace(/\s+/g, '-')}>
              <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                {state}
                <span className="text-sm font-normal text-gray-500 ml-2">
                  {stateCities.length} {stateCities.length === 1 ? 'city' : 'cities'}
                </span>
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {stateCities.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/city/${city.slug}`}
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
    </div>
  );
}
