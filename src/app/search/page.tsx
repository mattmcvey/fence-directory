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
        <div className="space-y-6">
          {results.map((contractor) => (
            <ContractorCard key={contractor.id} contractor={contractor} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg mb-4">No contractors found for that location.</p>
          <p className="text-gray-400">Try searching for a nearby city or a different zip code.</p>
        </div>
      )}
    </div>
  );
}
