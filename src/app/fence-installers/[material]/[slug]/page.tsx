import { getCities, getCityBySlug, getContractorsByCityAndMaterial } from '@/lib/data';
import { stateCodeToName } from '@/lib/utils';
import { getCostData, faqSchema, breadcrumbSchema, ogMeta } from '@/lib/seo';
import { MATERIALS, getMaterialBySlug, MATERIAL_SLUGS } from '@/lib/materials';
import ContractorCard from '@/components/ContractorCard';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { ArrowRight, DollarSign, Clock, Wrench, Shield } from 'lucide-react';

export const revalidate = 3600;
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ material: string; slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { material: materialSlug, slug } = await params;
  const material = getMaterialBySlug(materialSlug);
  const city = await getCityBySlug(slug);
  if (!material || !city) return { title: 'Not Found — FenceFind' };

  const costs = getCostData(city.stateCode);
  const costData = costs.materials[material.costKey];
  const title = `${material.name} Fence Installers in ${city.name}, ${city.stateCode} (2026) | FenceFind`;
  const description = `Find ${material.name.toLowerCase()} fence installers in ${city.name}, ${city.stateCode}. ${material.name} fencing costs $${costData.low}–$${costData.high}/ft installed. Compare rated contractors and get free estimates.`;

  return {
    title,
    description,
    ...ogMeta({ title, description, path: `/fence-installers/${materialSlug}/${slug}` }),
  };
}

export async function generateStaticParams() {
  const cities = await getCities();
  const topCities = cities.slice(0, 50);

  const params: { material: string; slug: string }[] = [];
  for (const material of MATERIAL_SLUGS) {
    for (const city of topCities) {
      params.push({ material, slug: city.slug });
    }
  }
  return params;
}

export default async function MaterialCityPage({ params }: PageProps) {
  const { material: materialSlug, slug } = await params;
  const material = getMaterialBySlug(materialSlug);
  if (!material) notFound();

  const city = await getCityBySlug(slug);
  if (!city) notFound();

  const stateName = stateCodeToName(city.stateCode);
  const costs = getCostData(city.stateCode);
  const costData = costs.materials[material.costKey];
  const projectLow = Math.round(150 * costData.low);
  const projectHigh = Math.round(150 * costData.high);
  const projectAvg = Math.round(150 * costData.avg);

  const contractors = await getContractorsByCityAndMaterial(
    city.name,
    city.stateCode,
    material.dbValue,
  );

  const faqs = [
    {
      q: `How much does a ${material.name.toLowerCase()} fence cost in ${city.name}, ${city.stateCode}?`,
      a: `${material.name} fencing in ${city.name} costs $${costData.low}–$${costData.high} per linear foot installed. For a typical 150-foot project, expect to pay $${projectLow.toLocaleString()}–$${projectHigh.toLocaleString()}, with an average around $${projectAvg.toLocaleString()}.`,
    },
    {
      q: `How long does a ${material.name.toLowerCase()} fence last?`,
      a: `A ${material.name.toLowerCase()} fence typically lasts ${material.lifespan} with proper care. ${material.maintenance}.`,
    },
    {
      q: `Is ${material.name.toLowerCase()} fencing a good choice in ${city.name}?`,
      a: `${material.description} ${material.name} fencing is best for: ${material.bestFor.toLowerCase()}.`,
    },
    {
      q: `How many ${material.name.toLowerCase()} fence installers are in ${city.name}?`,
      a: contractors.length > 0
        ? `FenceFind lists ${contractors.length}+ ${material.name.toLowerCase()} fence contractors serving ${city.name}. All are rated and reviewed by local homeowners.`
        : `While we don't have ${material.name.toLowerCase()}-specific contractors listed in ${city.name} yet, many general fence contractors in the area install ${material.name.toLowerCase()} fences. Browse all ${city.name} contractors for options.`,
    },
    {
      q: `Do I need a permit for a ${material.name.toLowerCase()} fence in ${city.name}?`,
      a: `Most municipalities in ${stateName} require a fence permit regardless of material. Contact the ${city.name} Building Department for specific requirements. Typical permit costs range from $20–$200.`,
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
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: stateName, url: `/state/${stateName.toLowerCase().replace(/\s+/g, '-')}` },
            { name: city.name, url: `/city/${slug}` },
            { name: `${material.name} Fence`, url: `/fence-installers/${materialSlug}/${slug}` },
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
        <span className="text-gray-900">{material.name} Fence</span>
      </nav>

      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
        {material.name} Fence Installers in {city.name}, {city.stateCode}
      </h1>
      <p className="text-gray-600 text-lg mb-8">
        {material.name} fencing in {city.name} costs <strong>${costData.low}–${costData.high} per linear foot</strong> installed.
        {contractors.length > 0
          ? ` Compare ${contractors.length}+ rated ${material.name.toLowerCase()} fence contractors and get free estimates.`
          : ` Browse local fence contractors who install ${material.name.toLowerCase()} fencing.`}
      </p>

      {/* Cost summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center">
          <DollarSign className="w-6 h-6 text-green-600 mx-auto mb-2" />
          <div className="text-sm text-gray-600">Low End</div>
          <div className="text-2xl font-bold text-gray-900">${projectLow.toLocaleString()}</div>
          <div className="text-xs text-gray-500">150 ft, basic style</div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-center">
          <DollarSign className="w-6 h-6 text-blue-600 mx-auto mb-2" />
          <div className="text-sm text-gray-600">Average</div>
          <div className="text-2xl font-bold text-gray-900">${projectAvg.toLocaleString()}</div>
          <div className="text-xs text-gray-500">150 ft, standard</div>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-5 text-center">
          <DollarSign className="w-6 h-6 text-purple-600 mx-auto mb-2" />
          <div className="text-sm text-gray-600">High End</div>
          <div className="text-2xl font-bold text-gray-900">${projectHigh.toLocaleString()}</div>
          <div className="text-xs text-gray-500">150 ft, premium</div>
        </div>
      </div>

      {/* Material overview */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          About {material.name} Fencing
        </h2>
        <p className="text-gray-700 mb-6">{material.description}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-xl border p-5">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-gray-900">Lifespan</h3>
            </div>
            <p className="text-gray-600">{material.lifespan}</p>
          </div>
          <div className="bg-white rounded-xl border p-5">
            <div className="flex items-center gap-2 mb-3">
              <Wrench className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-gray-900">Maintenance</h3>
            </div>
            <p className="text-gray-600">{material.maintenance}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-green-50 rounded-xl p-5">
            <h3 className="font-semibold text-gray-900 mb-3">Pros</h3>
            <ul className="space-y-2">
              {material.pros.map((pro, i) => (
                <li key={i} className="text-gray-700 flex items-start gap-2">
                  <Shield className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  {pro}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-red-50 rounded-xl p-5">
            <h3 className="font-semibold text-gray-900 mb-3">Cons</h3>
            <ul className="space-y-2">
              {material.cons.map((con, i) => (
                <li key={i} className="text-gray-700 flex items-start gap-2">
                  <span className="text-red-400 mt-0.5 flex-shrink-0">-</span>
                  {con}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Cost breakdown */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {material.name} Fence Cost in {city.name}
        </h2>
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-sm font-semibold text-gray-900">Project Size</th>
                  <th className="px-4 sm:px-6 py-3 text-sm font-semibold text-gray-900">Low</th>
                  <th className="px-4 sm:px-6 py-3 text-sm font-semibold text-gray-900">Average</th>
                  <th className="px-4 sm:px-6 py-3 text-sm font-semibold text-gray-900">High</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-gray-50">
                  <td className="px-4 sm:px-6 py-4 font-medium text-gray-900">Per linear foot</td>
                  <td className="px-4 sm:px-6 py-4 text-gray-600">${costData.low}</td>
                  <td className="px-4 sm:px-6 py-4 text-gray-900 font-semibold">${costData.avg}</td>
                  <td className="px-4 sm:px-6 py-4 text-gray-600">${costData.high}</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 sm:px-6 py-4 font-medium text-gray-900">50 ft (small yard)</td>
                  <td className="px-4 sm:px-6 py-4 text-gray-600">${(50 * costData.low).toLocaleString()}</td>
                  <td className="px-4 sm:px-6 py-4 text-gray-900 font-semibold">${(50 * costData.avg).toLocaleString()}</td>
                  <td className="px-4 sm:px-6 py-4 text-gray-600">${(50 * costData.high).toLocaleString()}</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 sm:px-6 py-4 font-medium text-gray-900">150 ft (average yard)</td>
                  <td className="px-4 sm:px-6 py-4 text-gray-600">${projectLow.toLocaleString()}</td>
                  <td className="px-4 sm:px-6 py-4 text-gray-900 font-semibold">${projectAvg.toLocaleString()}</td>
                  <td className="px-4 sm:px-6 py-4 text-gray-600">${projectHigh.toLocaleString()}</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 sm:px-6 py-4 font-medium text-gray-900">300 ft (large yard)</td>
                  <td className="px-4 sm:px-6 py-4 text-gray-600">${(300 * costData.low).toLocaleString()}</td>
                  <td className="px-4 sm:px-6 py-4 text-gray-900 font-semibold">${(300 * costData.avg).toLocaleString()}</td>
                  <td className="px-4 sm:px-6 py-4 text-gray-600">${(300 * costData.high).toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          * Prices include materials and professional installation in {city.name}, {city.stateCode}. Actual costs vary by terrain, fence height, and contractor.
        </p>
      </section>

      {/* Local contractors */}
      {contractors.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {material.name} Fence Contractors in {city.name}
          </h2>
          <p className="text-gray-600 mb-6">
            These local contractors specialize in {material.name.toLowerCase()} fence installation. Get free estimates from rated professionals.
          </p>
          <div className="space-y-6">
            {contractors.slice(0, 5).map((c) => (
              <ContractorCard key={c.id} contractor={c} />
            ))}
          </div>
          {contractors.length > 5 && (
            <div className="mt-6 text-center">
              <Link
                href={`/city/${slug}`}
                className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
              >
                View all contractors in {city.name} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </section>
      )}

      {contractors.length === 0 && (
        <section className="mb-10">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Looking for {material.name} Fence Contractors?
            </h2>
            <p className="text-gray-600 mb-4">
              Browse all fence contractors in {city.name} — many install {material.name.toLowerCase()} fencing even if it&apos;s not listed as a specialty.
            </p>
            <Link
              href={`/city/${slug}`}
              className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              View All {city.name} Contractors <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      )}

      {/* FAQ section */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {material.name} Fence FAQ for {city.name}
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

      {/* Compare other materials */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Compare Other Fence Materials in {city.name}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {MATERIALS.filter((m) => m.slug !== materialSlug).map((m) => {
            const mCost = costs.materials[m.costKey];
            return (
              <Link
                key={m.slug}
                href={`/fence-installers/${m.slug}/${slug}`}
                className="bg-white rounded-xl border p-4 hover:border-green-300 hover:shadow-sm transition-all"
              >
                <div className="font-semibold text-gray-900">{m.name}</div>
                <div className="text-sm text-gray-500">${mCost.low}–${mCost.high}/ft</div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Related links */}
      <section className="bg-gray-50 rounded-xl p-6 sm:p-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Related Resources</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link href={`/city/${slug}`} className="text-green-600 hover:text-green-700 flex items-center gap-2">
            <ArrowRight className="w-4 h-4" /> All fence contractors in {city.name}
          </Link>
          <Link href={`/fence-cost/${slug}`} className="text-green-600 hover:text-green-700 flex items-center gap-2">
            <ArrowRight className="w-4 h-4" /> Full fence cost breakdown for {city.name}
          </Link>
          <Link href={`/fence-permits/${slug}`} className="text-green-600 hover:text-green-700 flex items-center gap-2">
            <ArrowRight className="w-4 h-4" /> Fence permits in {city.name}
          </Link>
          <Link href={material.guideLink} className="text-green-600 hover:text-green-700 flex items-center gap-2">
            <ArrowRight className="w-4 h-4" /> {material.guideName}
          </Link>
          <Link href="/guides/fence-cost" className="text-green-600 hover:text-green-700 flex items-center gap-2">
            <ArrowRight className="w-4 h-4" /> Complete fence cost guide
          </Link>
          <Link href="/guides/getting-quotes" className="text-green-600 hover:text-green-700 flex items-center gap-2">
            <ArrowRight className="w-4 h-4" /> How to get fence quotes
          </Link>
        </div>
      </section>
    </div>
  );
}
