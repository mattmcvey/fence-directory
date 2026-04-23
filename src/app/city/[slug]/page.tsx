import { getCityBySlug, getContractorsByCity, getCities } from '@/lib/data';
import { stateCodeToName } from '@/lib/utils';
import { breadcrumbSchema, faqSchema, getCostData, getRegionData, COST_MATERIAL_NAMES, ogMeta } from '@/lib/seo';
import { MATERIALS } from '@/lib/materials';
import ContractorCard from '@/components/ContractorCard';
import SearchBar from '@/components/SearchBar';
import CityQuoteForm from '@/components/CityQuoteForm';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import RelatedLinks from '@/components/RelatedLinks';

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
  const region = getRegionData(city.stateCode);

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
      q: `What's the best fence material for ${city.name}?`,
      a: `${city.name} has a ${region.label} climate. ${region.materialTip}`,
    },
    {
      q: `Do I need a permit to build a fence in ${city.name}?`,
      a: `Most municipalities in ${stateName} require a permit for new fence installations. Contact the ${city.name} building department for height limits, setback rules, and application requirements. Typical permit costs range from $20–$200.`,
    },
    {
      q: `What should I look for in a ${city.name} fence contractor?`,
      a: `Look for contractors who are licensed and insured in ${stateName}, have strong reviews, offer free written estimates, and have experience with your preferred fence material. Get at least 3 quotes and ask for references from recent projects in your area.`,
    },
    {
      q: `When is the best time to install a fence in ${city.name}?`,
      a: `The best time to install a fence in ${city.name} is ${region.bestSeason}. ${region.weatherConsideration}`,
    },
    {
      q: `Should I install a fence myself or hire a contractor?`,
      a: `DIY fence installation can save 40–50% on labor costs, but it requires proper tools, physical labor, and knowledge of local building codes. Mistakes in post depth or alignment can lead to leaning or failing fences. For most homeowners, hiring a licensed contractor ensures the job meets code requirements and comes with a workmanship warranty.`,
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

      {/* Multi-contractor quote form */}
      {contractors.length > 0 && (
        <div className="mb-8">
          <CityQuoteForm cityName={city.name} stateCode={city.stateCode} citySlug={slug} />
        </div>
      )}

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

      {/* Cost + Permit CTAs */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-2">
            Fence Cost in {city.name}
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            Average: ${costs.project.low.toLocaleString()}–${costs.project.high.toLocaleString()}. Full breakdown by material.
          </p>
          <Link
            href={`/fence-cost/${slug}`}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            See Prices <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-2">
            Fence Permits in {city.name}
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            Height limits, setback rules, permit costs, and how to apply.
          </p>
          <Link
            href={`/fence-permits/${slug}`}
            className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Permit Guide <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Fence costs summary */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Fence Installation Costs in {city.name}
        </h2>
        <p className="text-gray-600 mb-4">
          Average fence installation in {city.name} costs <strong>${costs.project.low.toLocaleString()}–${costs.project.high.toLocaleString()}</strong> for
          a typical 150-linear-foot project. Here&apos;s what each material costs per linear foot installed:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-4 py-3 font-semibold text-gray-900">Material</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-900">Cost per Foot</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-900">150 ft Project</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(costs.materials).map(([key, mat]) => (
                <tr key={key} className="border-t border-gray-100">
                  <td className="px-4 py-3 text-gray-900 font-medium">{COST_MATERIAL_NAMES[key] || key}</td>
                  <td className="px-4 py-3 text-gray-600">${mat.low}–${mat.high}/ft</td>
                  <td className="px-4 py-3 text-gray-600">${(150 * mat.low).toLocaleString()}–${(150 * mat.high).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Prices reflect {stateName} averages including materials and labor.{' '}
          <Link href={`/fence-cost/${slug}`} className="text-green-600 hover:text-green-700 font-medium">
            See full cost breakdown →
          </Link>
        </p>
      </section>

      {/* Climate-specific material recommendations */}
      <section className="mt-10 bg-green-50 rounded-xl p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Choosing a Fence Material in {city.name}
        </h2>
        <div className="text-gray-700 space-y-3">
          <p>
            {city.name} has a {region.label} climate, which is an important factor when choosing
            fence materials. The most popular options for {stateName} homeowners
            are {region.topMaterials.join(', ')}.
          </p>
          <p>
            {region.materialTip}
          </p>
          <p>
            {region.weatherConsideration}
          </p>
          <p className="text-sm">
            <Link href="/guides/choosing-material" className="text-green-600 hover:text-green-700 font-medium">
              Read our full material comparison guide →
            </Link>
          </p>
        </div>
      </section>

      {/* Browse by material */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Browse {city.name} Fence Installers by Material
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {MATERIALS.map((m) => {
            const mCost = costs.materials[m.costKey];
            return (
              <Link
                key={m.slug}
                href={`/fence-installers/${m.slug}/${slug}`}
                className="bg-white rounded-xl border p-4 hover:border-green-300 hover:shadow-sm transition-all"
              >
                <div className="font-semibold text-gray-900">{m.name} Fence</div>
                <div className="text-sm text-gray-500">${mCost.low}–${mCost.high}/ft installed</div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Hiring tips */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          How to Hire a Fence Contractor in {city.name}
        </h2>
        <div className="text-gray-700 space-y-3">
          <p>
            Finding the right fence contractor in {city.name} starts with comparing multiple quotes.
            We recommend getting at least 3 written estimates so you can compare pricing, timelines,
            and warranty terms.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li><strong>Verify licensing and insurance</strong> — Ask for proof of liability insurance and a valid contractor license in {stateName}. This protects you if something goes wrong during installation.</li>
            <li><strong>Check reviews and references</strong> — Look at Google reviews and ask for 2–3 references from recent fence projects in your area.</li>
            <li><strong>Get written estimates</strong> — A detailed quote should include materials, labor, permits, post depth, cleanup, and warranty terms. Avoid contractors who only give verbal estimates.</li>
            <li><strong>Ask about permits</strong> — A professional contractor should handle the permit process or clearly explain what&apos;s required in {city.name}.</li>
            <li><strong>Confirm the timeline</strong> — Most residential fence installations take 1–3 days, but scheduling can vary by season. The best time to install in {city.name} is {region.bestSeason}.</li>
          </ul>
          <p className="text-sm">
            <Link href="/guides/getting-quotes" className="text-green-600 hover:text-green-700 font-medium">
              Read our guide to getting fence quotes →
            </Link>
          </p>
        </div>
      </section>

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
      <RelatedLinks
        pageType="city"
        currentSlug={slug}
        cityName={city.name}
        stateCode={city.stateCode}
      />
    </div>
  );
}
