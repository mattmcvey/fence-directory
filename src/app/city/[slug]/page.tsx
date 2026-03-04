import { getCityBySlug, getContractorsByCity, getCities } from '@/lib/data';
import { stateCodeToName } from '@/lib/utils';
import { breadcrumbSchema, faqSchema, getCostData, ogMeta } from '@/lib/seo';
import ContractorCard from '@/components/ContractorCard';
import SearchBar from '@/components/SearchBar';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const city = await getCityBySlug(slug);
  if (!city) return { title: 'City Not Found — FenceFind' };
  const title = `Best Fence Contractors in ${city.name}, ${city.stateCode} (2026) — Rated & Reviewed | FenceFind`;
  const description = `Find the best fence contractors in ${city.name}, ${city.stateCode}. Compare ${city.contractorCount}+ rated & reviewed local fence installers. Get free estimates for wood, vinyl, chain link & more.`;
  return {
    title,
    description,
    ...ogMeta({ title, description, path: `/city/${slug}` }),
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

  const stateName = stateCodeToName(city.stateCode);
  const contractors = await getContractorsByCity(city.name, city.stateCode);
  const costs = getCostData(city.stateCode);

  const faqs = [
    {
      q: `How many fence contractors are in ${city.name}, ${city.stateCode}?`,
      a: `FenceFind lists ${city.contractorCount}+ fence contractors serving ${city.name} and the surrounding area. All are rated and reviewed by local homeowners.`,
    },
    {
      q: `How much does fence installation cost in ${city.name}?`,
      a: `Fence installation in ${city.name} typically costs $${costs.project.low.toLocaleString()}–$${costs.project.high.toLocaleString()} depending on material and fence length. Wood privacy fences average $${costs.materials.wood.avg}/ft, vinyl $${costs.materials.vinyl.avg}/ft, and chain link $${costs.materials.chainLink.avg}/ft installed.`,
    },
    {
      q: `What should I look for in a ${city.name} fence contractor?`,
      a: `Look for contractors who are licensed and insured in ${stateName}, have strong reviews, offer free written estimates, and have experience with your preferred fence material. Get at least 3 quotes.`,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: stateName, url: `/state/${stateName.toLowerCase().replace(/\s+/g, '-')}` },
            { name: city.name, url: `/city/${slug}` },
          ])),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: `Fence Contractors in ${city.name}, ${city.stateCode}`,
            description: `Top-rated fence contractors serving ${city.name}, ${stateName}`,
            numberOfItems: contractors.length,
            itemListElement: contractors.slice(0, 10).map((contractor, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              item: {
                '@type': 'LocalBusiness',
                name: contractor.name,
                url: `https://getfencefind.com/contractor/${contractor.slug}`,
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

      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-500 mb-6 flex flex-wrap gap-1">
        <Link href="/" className="hover:text-green-600">Home</Link>
        <span>/</span>
        <Link href={`/state/${stateName.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-green-600">{stateName}</Link>
        <span>/</span>
        <span className="text-gray-900">{city.name}</span>
      </nav>

      <SearchBar defaultValue={`${city.name}, ${city.stateCode}`} className="mb-8" />

      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
        Best Fence Contractors in {city.name}, {city.stateCode}
      </h1>
      <p className="text-gray-600 mb-8">
        {city.contractorCount}+ rated fence installers serving the {city.name} area
      </p>

      {contractors.length > 0 ? (
        <div className="space-y-6">
          {contractors.map((contractor) => (
            <ContractorCard key={contractor.id} contractor={contractor} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg mb-4">
            We&apos;re still building our directory for {city.name}.
          </p>
          <p className="text-gray-400 mb-6">Know a great fence contractor here?</p>
          <Link href="/claim" className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            Add a Listing
          </Link>
        </div>
      )}

      {/* Cost CTA */}
      <div className="mt-10 bg-blue-50 border border-blue-200 rounded-xl p-6 sm:p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          How Much Does a Fence Cost in {city.name}?
        </h2>
        <p className="text-gray-600 mb-4">
          Average fence installation in {city.name} costs ${costs.project.low.toLocaleString()}–${costs.project.high.toLocaleString()}. See full pricing breakdown by material.
        </p>
        <Link
          href={`/fence-cost/${slug}`}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors"
        >
          See {city.name} Fence Prices <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* SEO content + FAQ */}
      <div className="mt-10 bg-green-50 rounded-xl p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Fence Installation in {city.name}, {city.stateCode}
        </h2>
        <div className="prose prose-green max-w-none text-gray-700">
          <p>
            Looking for a fence contractor in {city.name}, {stateName}? FenceFind connects
            homeowners with {city.contractorCount}+ licensed and insured fence professionals serving the
            {' '}{city.name} area.
          </p>
          <p>
            Popular fence types in {city.name} include wood privacy fences, vinyl fencing, chain link, and
            ornamental iron. Most contractors in the area offer free estimates and can complete residential
            fence installation within 1–3 days.
          </p>
          <p>
            To get started, search above or browse our listed contractors. We recommend getting at least
            3 quotes before making your decision.
          </p>
        </div>
      </div>

      {/* FAQ */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          FAQ: Fence Contractors in {city.name}
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details key={i} className="bg-white rounded-xl border p-4 sm:p-6 group">
              <summary className="font-semibold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                {faq.q}
                <span className="text-green-600 group-open:rotate-45 transition-transform text-xl ml-2">+</span>
              </summary>
              <p className="text-gray-600 mt-3 leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Related links */}
      <section className="mt-10 bg-gray-50 rounded-xl p-6">
        <h3 className="font-bold text-gray-900 mb-3">Related</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <Link href={`/fence-cost/${slug}`} className="text-green-600 hover:text-green-700 flex items-center gap-2 text-sm">
            <ArrowRight className="w-3 h-3" /> Fence cost in {city.name}
          </Link>
          <Link href="/guides/fence-cost" className="text-green-600 hover:text-green-700 flex items-center gap-2 text-sm">
            <ArrowRight className="w-3 h-3" /> National fence cost guide
          </Link>
          <Link href="/guides/getting-quotes" className="text-green-600 hover:text-green-700 flex items-center gap-2 text-sm">
            <ArrowRight className="w-3 h-3" /> How to get fence quotes
          </Link>
          <Link href="/guides/fence-permits" className="text-green-600 hover:text-green-700 flex items-center gap-2 text-sm">
            <ArrowRight className="w-3 h-3" /> Fence permit requirements
          </Link>
        </div>
      </section>
    </div>
  );
}
