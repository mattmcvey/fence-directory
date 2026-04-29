import { getStates, getStatesWithCounts, getContractorsByState, getCitiesByState } from '@/lib/data';
import { breadcrumbSchema, faqSchema, getCostData, getRegionData, COST_MATERIAL_NAMES, ogMeta } from '@/lib/seo';
import ContractorCard from '@/components/ContractorCard';
import SearchBar from '@/components/SearchBar';
import RelatedLinks from '@/components/RelatedLinks';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { MapPin, ArrowRight } from 'lucide-react';

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const states = await getStatesWithCounts();
  const state = states.find((s) => s.slug === slug);
  if (!state) return { title: 'State Not Found — FenceFind' };
  const costs = getCostData(state.code);
  const title = `Fence Contractors in ${state.name} (2026) — Compare ${state.contractorCount}+ Installers | FenceFind`;
  const description = `Find the best fence contractors in ${state.name}. Compare ${state.contractorCount}+ rated installers across ${state.name}. Average fence cost: $${costs.project.low.toLocaleString()}–$${costs.project.high.toLocaleString()}. Get free estimates.`;
  return {
    title,
    description,
    ...ogMeta({ title, description, path: `/state/${slug}` }),
  };
}

export async function generateStaticParams() {
  const states = getStates();
  return states.map((s) => ({ slug: s.slug }));
}

export default async function StatePage({ params }: PageProps) {
  const { slug } = await params;
  const states = await getStatesWithCounts();
  const state = states.find((s) => s.slug === slug);
  if (!state) notFound();

  const [contractors, cities] = await Promise.all([
    getContractorsByState(state.code),
    getCitiesByState(state.code),
  ]);

  const costs = getCostData(state.code);
  const region = getRegionData(state.code);

  const faqs = [
    {
      q: `How many fence contractors are in ${state.name}?`,
      a: `FenceFind lists ${state.contractorCount}+ fence contractors across ${cities.length} cities in ${state.name}. All are rated and reviewed by local homeowners.`,
    },
    {
      q: `How much does fence installation cost in ${state.name}?`,
      a: `Fence installation in ${state.name} typically costs $${costs.project.low.toLocaleString()}–$${costs.project.high.toLocaleString()} depending on material and fence length. Wood privacy fences average $${costs.materials.wood.avg}/ft, vinyl $${costs.materials.vinyl.avg}/ft, and chain link $${costs.materials.chainLink.avg}/ft installed.`,
    },
    {
      q: `What's the best fence material for ${state.name}?`,
      a: `${state.name} has a ${region.label} climate. The most popular materials are ${region.topMaterials.join(', ')}. ${region.materialTip}`,
    },
    {
      q: `Do I need a permit to build a fence in ${state.name}?`,
      a: `Most municipalities in ${state.name} require a permit for new fence installations. Requirements vary by city and county — contact your local building department for height limits, setback rules, and application fees. Typical permit costs range from $20–$200.`,
    },
    {
      q: `What should I look for in a ${state.name} fence contractor?`,
      a: `Look for contractors who are licensed and insured in ${state.name}, have strong reviews, offer free written estimates, and have experience with your preferred fence material. Get at least 3 quotes and ask for references from recent projects in your area.`,
    },
    {
      q: `When is the best time to install a fence in ${state.name}?`,
      a: `The best time to install a fence in ${state.name} is ${region.bestSeason}. ${region.weatherConsideration}`,
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
            { name: state.name, url: `/state/${slug}` },
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
            name: `Fence Contractors in ${state.name}`,
            description: `Top-rated fence contractors serving ${state.name}`,
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
        <span className="text-gray-900">{state.name}</span>
      </nav>

      <SearchBar className="mb-8" />

      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
        Fence Contractors in {state.name}
      </h1>
      <p className="text-gray-600 mb-8">
        Compare {state.contractorCount}+ licensed fence installers across {cities.length} cities
        in {state.name}. Average fence installation costs ${costs.project.low.toLocaleString()}–${costs.project.high.toLocaleString()} depending
        on material and project size. {state.name} has a {region.label} climate — the most popular
        fence materials are {region.topMaterials.join(', ')}.
      </p>

      {/* Cost summary table */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Fence Installation Costs in {state.name}
        </h2>
        <p className="text-gray-600 mb-4">
          Average fence installation in {state.name} costs <strong>${costs.project.low.toLocaleString()}–${costs.project.high.toLocaleString()}</strong> for
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
          Estimated {state.name} averages including materials and labor. Get quotes from local contractors for exact pricing.{' '}
          <Link href="/guides/fence-cost" className="text-green-600 hover:text-green-700 font-medium">
            See full cost breakdown by material →
          </Link>
        </p>
      </section>

      {/* Climate-specific material recommendations */}
      <section className="mb-10 bg-green-50 rounded-xl p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Choosing a Fence Material in {state.name}
        </h2>
        <div className="text-gray-700 space-y-3">
          <p>
            {state.name} has a {region.label} climate, which is an important factor when choosing
            fence materials. The most popular options for {state.name} homeowners
            are {region.topMaterials.join(', ')}.
          </p>
          <p>{region.materialTip}</p>
          <p>{region.weatherConsideration}</p>
          <p className="text-sm">
            <Link href="/guides/choosing-material" className="text-green-600 hover:text-green-700 font-medium">
              Read our full material comparison guide →
            </Link>
          </p>
        </div>
      </section>

      {/* Hiring tips */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          How to Hire a Fence Contractor in {state.name}
        </h2>
        <div className="text-gray-700 space-y-3">
          <p>
            Finding the right fence contractor in {state.name} starts with comparing multiple quotes.
            We recommend getting at least 3 written estimates so you can compare pricing, timelines,
            and warranty terms.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li><strong>Verify licensing and insurance</strong> — Ask for proof of liability insurance and a valid contractor license in {state.name}. This protects you if something goes wrong during installation.</li>
            <li><strong>Check reviews and references</strong> — Look at Google reviews and ask for 2–3 references from recent fence projects in your area.</li>
            <li><strong>Get written estimates</strong> — A detailed quote should include materials, labor, permits, post depth, cleanup, and warranty terms. Avoid contractors who only give verbal estimates.</li>
            <li><strong>Ask about permits</strong> — A professional contractor should handle the permit process or clearly explain what&apos;s required in your city.</li>
            <li><strong>Confirm the timeline</strong> — Most residential fence installations take 1–3 days, but scheduling can vary by season. The best time to install in {state.name} is {region.bestSeason}.</li>
          </ul>
          <p className="text-sm">
            <Link href="/guides/getting-quotes" className="text-green-600 hover:text-green-700 font-medium">
              Read our guide to getting fence quotes →
            </Link>
          </p>
        </div>
      </section>

      {/* Permit & cost resources */}
      <section className="mb-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            Fence Permits in {state.name}
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            Height limits, setback rules, permit costs, and application steps for {state.name} cities.
          </p>
          <Link
            href="/fence-permits"
            className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-800 font-medium text-sm"
          >
            View permit requirements <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            Fence Costs in {state.name}
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            Average: ${costs.project.low.toLocaleString()}–${costs.project.high.toLocaleString()}. Compare prices by material and city.
          </p>
          <Link
            href="/fence-cost-by-state"
            className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-800 font-medium text-sm"
          >
            Compare costs by state <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Cities in this state */}
      {cities.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Browse Fence Contractors by City in {state.name}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {cities.map((city) => (
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
        </section>
      )}

      {/* Contractors */}
      <section className="mb-10">
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
      </section>

      {/* FAQ */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          FAQ: Fence Installation in {state.name}
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
        pageType="state"
        stateName={state.name}
        stateCode={state.code}
        topCities={cities.slice(0, 3)}
      />

      {/* Contractor CTA */}
      <section className="mt-10 bg-gray-900 rounded-xl p-6 sm:p-8 text-center">
        <h2 className="text-xl font-bold text-white mb-2">
          Are You a Fence Contractor in {state.name}?
        </h2>
        <p className="text-gray-300 mb-4">
          Get listed on FenceFind and reach homeowners searching for fence installation in {state.name}.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/claim"
            className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            List Your Business Free <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/pro"
            className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Learn About Pro
          </Link>
        </div>
      </section>
    </div>
  );
}
