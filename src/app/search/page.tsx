import SearchBar from '@/components/SearchBar';
import ContractorCard from '@/components/ContractorCard';
import { searchContractors } from '@/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Search Fence Contractors — FenceFind',
  description: 'Search for fence contractors in your area. Compare ratings, read reviews, and get free estimates.',
  robots: { index: false, follow: true },
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const query = params.q || '';
  const results = await searchContractors(query);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SearchBar defaultValue={query} className="mb-8" />
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        {query ? `Fence Contractors Near ${query}` : 'Search Results'}
      </h1>
      <p className="text-gray-600 mb-6">
        {results.length} fence contractor{results.length !== 1 ? 's' : ''} found
        {query ? ` near "${query}"` : ''}
      </p>
      {results.length > 0 ? (
        <>
          <div className="space-y-6">
            {results.map((contractor) => (
              <ContractorCard key={contractor.id} contractor={contractor} />
            ))}
          </div>
          <div className="mt-10 bg-blue-50 border border-blue-200 rounded-xl p-5 text-center">
            <p className="font-semibold text-gray-900 mb-1">Are you a fence contractor?</p>
            <p className="text-gray-600 text-sm mb-3">
              Claim your free listing or add your business to start getting leads from homeowners in your area.
            </p>
            <a
              href="/claim"
              className="inline-block text-sm font-medium text-green-700 hover:text-green-800 underline underline-offset-2"
            >
              List your business on FenceFind →
            </a>
          </div>
        </>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg mb-2">No contractors found for that search.</p>
          <p className="text-gray-400 mb-8">Try searching for a nearby city, zip code, or company name.</p>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 max-w-md mx-auto">
            <p className="font-semibold text-gray-900 mb-1">Are you a fence contractor?</p>
            <p className="text-gray-600 text-sm mb-3">
              Can&apos;t find your business? Add it to FenceFind for free and start reaching local homeowners.
            </p>
            <a
              href="/claim"
              className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg font-medium text-sm transition-colors"
            >
              Add Your Business
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
