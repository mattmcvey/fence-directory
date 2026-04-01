import { getStatesWithCounts } from '@/lib/data';
import Link from 'next/link';
import { Metadata } from 'next';
import { ogMeta, breadcrumbSchema } from '@/lib/seo';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Browse Fence Contractors by State — FenceFind',
  description: 'Find fence contractors in all 50 states. Browse our directory of licensed, insured fence installers near you.',
  ...ogMeta({
    title: 'Browse Fence Contractors by State — FenceFind',
    description: 'Find fence contractors in all 50 states. Browse our directory of licensed, insured fence installers near you.',
    path: '/states',
  }),
};

export default async function StatesPage() {
  const states = await getStatesWithCounts();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'States', url: '/states' },
          ])),
        }}
      />
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Fence Contractors by State</h1>
      <p className="text-gray-600 mb-10">Find licensed fence installers in all 50 states</p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {states.map((state) => (
          <Link
            key={state.code}
            href={`/state/${state.slug}`}
            className="p-4 bg-white border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-all group"
          >
            <div className="font-semibold text-gray-900 group-hover:text-green-600">{state.name}</div>
            {state.contractorCount > 0 && (
              <div className="text-sm text-gray-500">{state.contractorCount} contractors</div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
