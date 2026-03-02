import { MAJOR_STATES, SEED_CONTRACTORS } from '@/lib/seed-data';
import ContractorCard from '@/components/ContractorCard';
import SearchBar from '@/components/SearchBar';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { MapPin } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const state = MAJOR_STATES.find((s) => s.slug === slug);
  if (!state) return { title: 'State Not Found — FenceFind' };
  return {
    title: `Fence Contractors in ${state.name} — Top Rated | FenceFind`,
    description: `Find the best fence contractors in ${state.name}. Compare ${state.contractorCount}+ licensed fence installers, read reviews, and get free estimates.`,
  };
}

export async function generateStaticParams() {
  return MAJOR_STATES.map((s) => ({ slug: s.slug }));
}

export default async function StatePage({ params }: PageProps) {
  const { slug } = await params;
  const state = MAJOR_STATES.find((s) => s.slug === slug);
  if (!state) notFound();

  const contractors = SEED_CONTRACTORS.filter((c) => c.state === state.code);
  contractors.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return b.rating - a.rating;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SearchBar className="mb-8" />

      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Fence Contractors in {state.name}
      </h1>
      <p className="text-gray-600 mb-8">
        Browse {state.contractorCount}+ licensed fence installers across {state.name}
      </p>

      {/* Cities in this state */}
      {state.cities.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Cities in {state.name}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {state.cities.map((city) => (
              <Link
                key={city.slug}
                href={`/city/${city.slug}`}
                className="flex items-center gap-2 p-3 bg-white border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-all"
              >
                <MapPin className="w-4 h-4 text-gray-400" />
                <div>
                  <span className="font-medium text-gray-900">{city.name}</span>
                  <span className="text-sm text-gray-500 ml-2">{city.contractorCount} contractors</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Contractors */}
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Top Fence Contractors in {state.name}
      </h2>
      {contractors.length > 0 ? (
        <div className="space-y-6">
          {contractors.map((contractor) => (
            <ContractorCard key={contractor.id} contractor={contractor} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 py-8 text-center">
          More contractors coming soon. <Link href="/claim" className="text-green-600 hover:underline">List your business</Link> to be the first!
        </p>
      )}

      {/* SEO content */}
      <div className="mt-12 prose prose-green max-w-none">
        <h2 className="text-2xl font-bold text-gray-900">About Fence Installation in {state.name}</h2>
        <p className="text-gray-700">
          {state.name} homeowners have access to {state.contractorCount}+ licensed fence contractors through FenceFind.
          Whether you need a new privacy fence, chain link fencing, or a custom gate, our directory helps you find
          the right contractor for your project. All listed contractors are licensed, insured, and offer free estimates.
        </p>
      </div>
    </div>
  );
}
