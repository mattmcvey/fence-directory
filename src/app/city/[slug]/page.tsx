import { getCityBySlug, getContractorsByCity, getCities } from '@/lib/data';
import { stateCodeToName } from '@/lib/utils';
import ContractorCard from '@/components/ContractorCard';
import SearchBar from '@/components/SearchBar';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const city = await getCityBySlug(slug);
  if (!city) return { title: 'City Not Found — FenceFind' };
  return {
    title: `Fence Contractors in ${city.name}, ${city.stateCode} — Top Rated | FenceFind`,
    description: `Find the best fence contractors in ${city.name}, ${city.state}. Compare ${city.contractorCount}+ local fence installers, read reviews, and get free estimates today.`,
  };
}

export async function generateStaticParams() {
  const cities = await getCities();
  return cities.map((c) => ({ slug: c.slug }));
}

export default async function CityPage({ params }: PageProps) {
  const { slug } = await params;
  const city = await getCityBySlug(slug);
  if (!city) notFound();

  const contractors = await getContractorsByCity(city.name, city.stateCode);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SearchBar defaultValue={`${city.name}, ${city.stateCode}`} className="mb-8" />

      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Fence Contractors in {city.name}, {city.stateCode}
      </h1>
      <p className="text-gray-600 mb-8">
        {city.contractorCount}+ fence installers serving the {city.name} area
      </p>

      {contractors.length > 0 ? (
        <div className="space-y-6">
          {contractors.map((contractor) => (
            <ContractorCard
              key={contractor.id}
              contractor={contractor}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg mb-4">
            We&apos;re still building our directory for {city.name}.
          </p>
          <p className="text-gray-400 mb-6">
            Know a great fence contractor here?
          </p>
          <Link
            href="/claim"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Add a Listing
          </Link>
        </div>
      )}

      {/* SEO content */}
      <div className="mt-12 bg-green-50 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Fence Installation in {city.name}, {city.stateCode}
        </h2>
        <div className="prose prose-green max-w-none text-gray-700">
          <p>
            Looking for a fence contractor in {city.name}, {stateCodeToName(city.stateCode)}? FenceFind connects
            homeowners with {city.contractorCount}+ licensed and insured fence professionals serving the
            {' '}{city.name} metropolitan area.
          </p>
          <p>
            Popular fence types in {city.name} include wood privacy fences, vinyl fencing, chain link, and
            ornamental iron. Most contractors in the area offer free estimates and can complete residential
            fence installation within 1-3 days.
          </p>
          <p>
            To get started, search above or browse our listed contractors. We recommend getting at least
            3 quotes before making your decision.
          </p>
        </div>
      </div>

      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: `Fence Contractors in ${city.name}, ${city.stateCode}`,
            description: `Top-rated fence contractors serving ${city.name}, ${stateCodeToName(city.stateCode)}`,
            numberOfItems: contractors.length,
            itemListElement: contractors.map((contractor, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              item: {
                '@type': 'LocalBusiness',
                name: contractor.name,
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: contractor.city,
                  addressRegion: contractor.state,
                },
                aggregateRating: contractor.reviewCount > 0 ? {
                  '@type': 'AggregateRating',
                  ratingValue: contractor.rating,
                  reviewCount: contractor.reviewCount,
                } : undefined,
              },
            })),
          }),
        }}
      />
    </div>
  );
}
