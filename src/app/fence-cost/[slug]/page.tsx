import { getCities, getCityBySlug, getContractorsByCity } from '@/lib/data';
import { stateCodeToName } from '@/lib/utils';
import { getCostData, COST_MATERIAL_NAMES, faqSchema, breadcrumbSchema, serviceSchema, ogMeta } from '@/lib/seo';
import ContractorCard from '@/components/ContractorCard';
import Link from 'next/link';
import { Metadata } from 'next';
import { DollarSign, TrendingUp, ArrowRight } from 'lucide-react';

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const city = await getCityBySlug(slug);
  if (!city) return { title: 'City Not Found — FenceFind' };
  const costs = getCostData(city.stateCode);
  const title = `Fence Cost in ${city.name}, ${city.stateCode} (2026) — Prices & Estimates | FenceFind`;
  const description = `How much does a fence cost in ${city.name}, ${city.stateCode}? Average fence installation costs $${costs.project.low.toLocaleString()}–$${costs.project.high.toLocaleString()}. Compare wood, vinyl, chain link prices per foot + get free estimates.`;
  return {
    title,
    description,
    ...ogMeta({ title, description, path: `/fence-cost/${slug}` }),
  };
}

export async function generateStaticParams() {
  const cities = await getCities();
  return cities.map((c) => ({ slug: c.slug }));
}

export default async function FenceCostPage({ params }: PageProps) {
  const { slug } = await params;
  const city = await getCityBySlug(slug);
  if (!city) return null;

  const stateName = stateCodeToName(city.stateCode);
  const costs = getCostData(city.stateCode);
  const contractors = await getContractorsByCity(city.name, city.stateCode);
  const topContractors = contractors.slice(0, 3);

  const faqs = [
    {
      q: `How much does a fence cost in ${city.name}, ${city.stateCode}?`,
      a: `The average fence installation in ${city.name} costs between $${costs.project.low.toLocaleString()} and $${costs.project.high.toLocaleString()}, depending on materials, fence height, and yard size. A typical 150-foot wood privacy fence costs around $${costs.project.avg.toLocaleString()} installed.`,
    },
    {
      q: `What is the cheapest fence material in ${city.name}?`,
      a: `Chain link is the most affordable fencing option in ${city.name}, averaging $${costs.materials.chainLink.low}–$${costs.materials.chainLink.high} per linear foot installed. Wood is the next most affordable at $${costs.materials.wood.low}–$${costs.materials.wood.high} per foot.`,
    },
    {
      q: `How much does vinyl fencing cost in ${city.name}?`,
      a: `Vinyl fencing in ${city.name} costs $${costs.materials.vinyl.low}–$${costs.materials.vinyl.high} per linear foot installed. For a standard 150-foot yard, that's approximately $${(150 * costs.materials.vinyl.low).toLocaleString()}–$${(150 * costs.materials.vinyl.high).toLocaleString()}.`,
    },
    {
      q: `Do I need a permit to install a fence in ${city.name}?`,
      a: `Most municipalities in ${stateName} require a fence permit for new installations. Contact the ${city.name} Building Department for specific requirements, setback rules, and height restrictions. Typical permit costs range from $20–$200.`,
    },
    {
      q: `How do I find a good fence contractor in ${city.name}?`,
      a: `Compare multiple contractors on FenceFind, check their ratings and reviews, verify they're licensed and insured, and get at least 3 written estimates. ${city.name} has ${city.contractorCount}+ listed fence contractors to choose from.`,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema(city.name, stateName)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: stateName, url: `/state/${stateName.toLowerCase().replace(/\s+/g, '-')}` },
            { name: city.name, url: `/city/${slug}` },
            { name: `Fence Cost`, url: `/fence-cost/${slug}` },
          ])),
        }}
      />

      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-500 mb-6 flex flex-wrap gap-1">
        <Link href="/" className="hover:text-green-600">Home</Link>
        <span>/</span>
        <Link href={`/state/${stateName.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-green-600">{stateName}</Link>
        <span>/</span>
        <Link href={`/city/${slug}`} className="hover:text-green-600">{city.name}</Link>
        <span>/</span>
        <span className="text-gray-900">Fence Cost</span>
      </nav>

      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
        Fence Cost in {city.name}, {city.stateCode} (2026)
      </h1>
      <p className="text-gray-600 text-lg mb-6">
        The average fence installation in {city.name} costs an estimated <strong>${costs.project.low.toLocaleString()}–${costs.project.high.toLocaleString()}</strong> depending on material, fence height, and total length. Here&apos;s a detailed breakdown.
      </p>
      <p className="text-sm text-gray-500 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 mb-8">
        Estimates are based on {stateName} regional averages for materials and professional installation. Actual costs vary by contractor, terrain, and project specifics. Get quotes from local contractors for accurate pricing.
      </p>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center">
          <DollarSign className="w-6 h-6 text-green-600 mx-auto mb-2" />
          <div className="text-sm text-gray-600">Low End</div>
          <div className="text-2xl font-bold text-gray-900">${costs.project.low.toLocaleString()}</div>
          <div className="text-xs text-gray-500">Chain link, 150 ft</div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-center">
          <TrendingUp className="w-6 h-6 text-blue-600 mx-auto mb-2" />
          <div className="text-sm text-gray-600">Average</div>
          <div className="text-2xl font-bold text-gray-900">${costs.project.avg.toLocaleString()}</div>
          <div className="text-xs text-gray-500">Wood privacy, 150 ft</div>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-5 text-center">
          <DollarSign className="w-6 h-6 text-purple-600 mx-auto mb-2" />
          <div className="text-sm text-gray-600">High End</div>
          <div className="text-2xl font-bold text-gray-900">${costs.project.high.toLocaleString()}</div>
          <div className="text-xs text-gray-500">Wrought iron, 150 ft</div>
        </div>
      </div>

      {/* Cost by material table */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Fence Cost Per Foot in {city.name} by Material
        </h2>
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-sm font-semibold text-gray-900">Material</th>
                  <th className="px-4 sm:px-6 py-3 text-sm font-semibold text-gray-900">Low (per ft)</th>
                  <th className="px-4 sm:px-6 py-3 text-sm font-semibold text-gray-900">Average</th>
                  <th className="px-4 sm:px-6 py-3 text-sm font-semibold text-gray-900">High (per ft)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {Object.entries(costs.materials).map(([key, cost]) => (
                  <tr key={key} className="hover:bg-gray-50">
                    <td className="px-4 sm:px-6 py-4 font-medium text-gray-900">{COST_MATERIAL_NAMES[key]}</td>
                    <td className="px-4 sm:px-6 py-4 text-gray-600">${cost.low}</td>
                    <td className="px-4 sm:px-6 py-4 text-gray-900 font-semibold">${cost.avg}</td>
                    <td className="px-4 sm:px-6 py-4 text-gray-600">${cost.high}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          * Estimated {stateName} averages including materials and installation. Get quotes from local contractors for exact pricing.
        </p>
      </section>

      {/* Cost factors */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          What Affects Fence Cost in {city.name}?
        </h2>
        <div className="prose prose-green max-w-none text-gray-700">
          <ul className="space-y-3">
            <li><strong>Fence Material:</strong> Chain link is the most affordable (${ costs.materials.chainLink.avg}/ft), while wrought iron is the most expensive (${costs.materials.wroughtIron.avg}/ft). Wood and vinyl fall in the middle and are the most popular choices in {city.name}.</li>
            <li><strong>Fence Height:</strong> Standard 4-foot fences cost 20–30% less than 6-foot privacy fences. Most {city.name} homeowners choose 6-foot for backyard privacy.</li>
            <li><strong>Yard Size & Terrain:</strong> Sloped or rocky terrain increases installation costs by 10–25%. Average {city.name} lots require 100–200 linear feet of fencing.</li>
            <li><strong>Permits & Regulations:</strong> {city.name} may require building permits for new fences. Contact your local building department for setback requirements and height restrictions.</li>
            <li><strong>Gates & Features:</strong> Each gate adds $200–$800 depending on size and style. Decorative post caps, lattice tops, and staining add to the total.</li>
            <li><strong>Labor Rates:</strong> {stateName} labor rates are {costs.multiplier > 1.1 ? 'above' : costs.multiplier < 0.95 ? 'below' : 'near'} the national average, which affects total installation cost.</li>
          </ul>
        </div>
      </section>

      {/* FAQ section */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Frequently Asked Questions About Fence Cost in {city.name}
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

      {/* Local contractors */}
      {topContractors.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Top Fence Contractors in {city.name}
          </h2>
          <p className="text-gray-600 mb-6">
            Get free estimates from these highly rated local professionals.
          </p>
          <div className="space-y-6">
            {topContractors.map((c) => (
              <ContractorCard key={c.id} contractor={c} />
            ))}
          </div>
          {contractors.length > 3 && (
            <div className="mt-6 text-center">
              <Link
                href={`/city/${slug}`}
                className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
              >
                View all {contractors.length} contractors in {city.name} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </section>
      )}

      {/* Internal links */}
      <section className="bg-gray-50 rounded-xl p-6 sm:p-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Related Resources</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link href={`/city/${slug}`} className="text-green-600 hover:text-green-700 flex items-center gap-2">
            <ArrowRight className="w-4 h-4" /> All fence contractors in {city.name}
          </Link>
          <Link href="/guides/fence-cost" className="text-green-600 hover:text-green-700 flex items-center gap-2">
            <ArrowRight className="w-4 h-4" /> Complete fence cost guide
          </Link>
          <Link href="/guides/getting-quotes" className="text-green-600 hover:text-green-700 flex items-center gap-2">
            <ArrowRight className="w-4 h-4" /> How to get fence quotes
          </Link>
          <Link href={`/fence-permits/${slug}`} className="text-green-600 hover:text-green-700 flex items-center gap-2">
            <ArrowRight className="w-4 h-4" /> Fence permits in {city.name}
          </Link>
          <Link href="/guides/wood-vs-vinyl" className="text-green-600 hover:text-green-700 flex items-center gap-2">
            <ArrowRight className="w-4 h-4" /> Wood vs vinyl comparison
          </Link>
          <Link href="/guides/choosing-material" className="text-green-600 hover:text-green-700 flex items-center gap-2">
            <ArrowRight className="w-4 h-4" /> How to choose fence material
          </Link>
        </div>
      </section>
    </div>
  );
}
