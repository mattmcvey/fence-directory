import { getStates } from '@/lib/data';
import { getCostData, COST_MATERIAL_NAMES, faqSchema, breadcrumbSchema, ogMeta } from '@/lib/seo';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';

const title = 'Fence Cost by State (2026) — Compare Prices Across the US | FenceFind';
const description = 'Compare fence installation costs across all 50 states. See average prices for wood, vinyl, chain link, and aluminum fencing by state. Updated for 2026.';

export const metadata: Metadata = {
  title,
  description,
  ...ogMeta({ title, description, path: '/fence-cost-by-state' }),
};


const ALL_STATES: { name: string; code: string; slug: string }[] = [
  { name: 'Alabama', code: 'AL', slug: 'alabama' }, { name: 'Alaska', code: 'AK', slug: 'alaska' },
  { name: 'Arizona', code: 'AZ', slug: 'arizona' }, { name: 'Arkansas', code: 'AR', slug: 'arkansas' },
  { name: 'California', code: 'CA', slug: 'california' }, { name: 'Colorado', code: 'CO', slug: 'colorado' },
  { name: 'Connecticut', code: 'CT', slug: 'connecticut' }, { name: 'Delaware', code: 'DE', slug: 'delaware' },
  { name: 'Florida', code: 'FL', slug: 'florida' }, { name: 'Georgia', code: 'GA', slug: 'georgia' },
  { name: 'Hawaii', code: 'HI', slug: 'hawaii' }, { name: 'Idaho', code: 'ID', slug: 'idaho' },
  { name: 'Illinois', code: 'IL', slug: 'illinois' }, { name: 'Indiana', code: 'IN', slug: 'indiana' },
  { name: 'Iowa', code: 'IA', slug: 'iowa' }, { name: 'Kansas', code: 'KS', slug: 'kansas' },
  { name: 'Kentucky', code: 'KY', slug: 'kentucky' }, { name: 'Louisiana', code: 'LA', slug: 'louisiana' },
  { name: 'Maine', code: 'ME', slug: 'maine' }, { name: 'Maryland', code: 'MD', slug: 'maryland' },
  { name: 'Massachusetts', code: 'MA', slug: 'massachusetts' }, { name: 'Michigan', code: 'MI', slug: 'michigan' },
  { name: 'Minnesota', code: 'MN', slug: 'minnesota' }, { name: 'Mississippi', code: 'MS', slug: 'mississippi' },
  { name: 'Missouri', code: 'MO', slug: 'missouri' }, { name: 'Montana', code: 'MT', slug: 'montana' },
  { name: 'Nebraska', code: 'NE', slug: 'nebraska' }, { name: 'Nevada', code: 'NV', slug: 'nevada' },
  { name: 'New Hampshire', code: 'NH', slug: 'new-hampshire' }, { name: 'New Jersey', code: 'NJ', slug: 'new-jersey' },
  { name: 'New Mexico', code: 'NM', slug: 'new-mexico' }, { name: 'New York', code: 'NY', slug: 'new-york' },
  { name: 'North Carolina', code: 'NC', slug: 'north-carolina' }, { name: 'North Dakota', code: 'ND', slug: 'north-dakota' },
  { name: 'Ohio', code: 'OH', slug: 'ohio' }, { name: 'Oklahoma', code: 'OK', slug: 'oklahoma' },
  { name: 'Oregon', code: 'OR', slug: 'oregon' }, { name: 'Pennsylvania', code: 'PA', slug: 'pennsylvania' },
  { name: 'Rhode Island', code: 'RI', slug: 'rhode-island' }, { name: 'South Carolina', code: 'SC', slug: 'south-carolina' },
  { name: 'South Dakota', code: 'SD', slug: 'south-dakota' }, { name: 'Tennessee', code: 'TN', slug: 'tennessee' },
  { name: 'Texas', code: 'TX', slug: 'texas' }, { name: 'Utah', code: 'UT', slug: 'utah' },
  { name: 'Vermont', code: 'VT', slug: 'vermont' }, { name: 'Virginia', code: 'VA', slug: 'virginia' },
  { name: 'Washington', code: 'WA', slug: 'washington' }, { name: 'West Virginia', code: 'WV', slug: 'west-virginia' },
  { name: 'Wisconsin', code: 'WI', slug: 'wisconsin' }, { name: 'Wyoming', code: 'WY', slug: 'wyoming' },
];

export default function FenceCostByStatePage() {
  const statesWithCosts = ALL_STATES.map(s => ({
    ...s,
    costs: getCostData(s.code),
  })).sort((a, b) => b.costs.project.avg - a.costs.project.avg);

  const cheapest = statesWithCosts[statesWithCosts.length - 1];
  const priciest = statesWithCosts[0];

  const faqs = [
    {
      q: 'Which state has the cheapest fence installation?',
      a: `${cheapest.name} has some of the lowest fence installation costs in the US, with an average wood fence costing around $${cheapest.costs.materials.wood.avg}/ft installed. Southern and Midwestern states generally have lower costs due to lower labor rates.`,
    },
    {
      q: 'Which state has the most expensive fence installation?',
      a: `${priciest.name} has the highest fence installation costs, averaging $${priciest.costs.materials.wood.avg}/ft for wood fencing. Coastal states and areas with high costs of living tend to have significantly higher fence installation prices.`,
    },
    {
      q: 'Why does fence cost vary so much by state?',
      a: 'Fence costs vary by state due to differences in labor rates, material availability, permit requirements, climate considerations, and cost of living. States like California and New York can cost 30-40% more than states like Mississippi or Alabama.',
    },
    {
      q: 'What is the average fence cost in the United States?',
      a: 'The national average fence installation costs $1,500–$9,000 for a typical residential yard (150 linear feet). Wood privacy fences average $25/ft, vinyl $30/ft, and chain link $17/ft installed nationally.',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Fence Cost by State', url: '/fence-cost-by-state' },
          ])),
        }}
      />

      <nav className="text-sm text-gray-500 mb-6 flex flex-wrap gap-1">
        <Link href="/" className="hover:text-green-600">Home</Link>
        <span>/</span>
        <span className="text-gray-900">Fence Cost by State</span>
      </nav>

      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
        Fence Cost by State (2026)
      </h1>
      <p className="text-gray-600 text-lg mb-8">
        Compare fence installation costs across all 50 states. Prices include materials and professional installation for a typical 150-foot residential fence.
      </p>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center">
          <div className="text-sm text-gray-600">Most Affordable</div>
          <div className="text-xl font-bold text-gray-900">{cheapest.name}</div>
          <div className="text-sm text-green-700">${cheapest.costs.project.avg.toLocaleString()} avg project</div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-center">
          <div className="text-sm text-gray-600">National Average</div>
          <div className="text-xl font-bold text-gray-900">$3,750</div>
          <div className="text-sm text-blue-700">Wood privacy, 150 ft</div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-center">
          <div className="text-sm text-gray-600">Most Expensive</div>
          <div className="text-xl font-bold text-gray-900">{priciest.name}</div>
          <div className="text-sm text-red-700">${priciest.costs.project.avg.toLocaleString()} avg project</div>
        </div>
      </div>

      {/* State comparison table */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Fence Installation Cost by State</h2>
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-3 sm:px-4 py-3 text-sm font-semibold text-gray-900">State</th>
                  <th className="px-3 sm:px-4 py-3 text-sm font-semibold text-gray-900">Wood/ft</th>
                  <th className="px-3 sm:px-4 py-3 text-sm font-semibold text-gray-900">Vinyl/ft</th>
                  <th className="px-3 sm:px-4 py-3 text-sm font-semibold text-gray-900">Chain Link/ft</th>
                  <th className="px-3 sm:px-4 py-3 text-sm font-semibold text-gray-900">Avg Project</th>
                  <th className="px-3 sm:px-4 py-3 text-sm font-semibold text-gray-900 hidden sm:table-cell">vs National</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {statesWithCosts.map((s) => {
                  const diff = Math.round((s.costs.multiplier - 1) * 100);
                  const diffLabel = diff > 0 ? `+${diff}%` : diff < 0 ? `${diff}%` : 'avg';
                  const diffColor = diff > 10 ? 'text-red-600' : diff < -5 ? 'text-green-600' : 'text-gray-500';

                  return (
                    <tr key={s.code} className="hover:bg-gray-50">
                      <td className="px-3 sm:px-4 py-3">
                        <Link href={`/state/${s.slug}`} className="font-medium text-gray-900 hover:text-green-600">
                          {s.name}
                        </Link>
                      </td>
                      <td className="px-3 sm:px-4 py-3 text-gray-700">${s.costs.materials.wood.avg}</td>
                      <td className="px-3 sm:px-4 py-3 text-gray-700">${s.costs.materials.vinyl.avg}</td>
                      <td className="px-3 sm:px-4 py-3 text-gray-700">${s.costs.materials.chainLink.avg}</td>
                      <td className="px-3 sm:px-4 py-3 font-semibold text-gray-900">${s.costs.project.avg.toLocaleString()}</td>
                      <td className={`px-3 sm:px-4 py-3 font-medium hidden sm:table-cell ${diffColor}`}>{diffLabel}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          * Average project based on 150 linear feet of wood privacy fence. Sorted by cost (highest to lowest).
        </p>
      </section>

      {/* What affects cost */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Fence Costs Vary by State</h2>
        <div className="prose prose-green max-w-none text-gray-700">
          <ul className="space-y-3">
            <li><strong>Labor rates:</strong> States with higher minimum wages and cost of living have higher installation labor costs. California contractors charge 30-40% more per hour than those in Mississippi.</li>
            <li><strong>Material availability:</strong> Wood fencing costs less in timber-producing states (Oregon, Washington) while aluminum is cheaper near manufacturing centers.</li>
            <li><strong>Climate:</strong> States with extreme weather need more durable materials and deeper post holes, increasing costs. Frost lines in northern states require deeper foundations.</li>
            <li><strong>Permit requirements:</strong> Some states and municipalities have stricter permitting requirements, adding $50-300 to the total project cost.</li>
            <li><strong>Demand:</strong> Fast-growing states (Texas, Florida, Arizona) have high demand for fencing, which can drive prices up during peak season.</li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
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

      {/* Related */}
      <section className="bg-gray-50 rounded-xl p-6 sm:p-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Related Resources</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link href="/guides/fence-cost" className="text-green-600 hover:text-green-700 flex items-center gap-2">
            <ArrowRight className="w-4 h-4" /> Complete fence cost guide
          </Link>
          <Link href="/guides/choosing-material" className="text-green-600 hover:text-green-700 flex items-center gap-2">
            <ArrowRight className="w-4 h-4" /> How to choose fence material
          </Link>
          <Link href="/guides/getting-quotes" className="text-green-600 hover:text-green-700 flex items-center gap-2">
            <ArrowRight className="w-4 h-4" /> How to get fence quotes
          </Link>
          <Link href="/states" className="text-green-600 hover:text-green-700 flex items-center gap-2">
            <ArrowRight className="w-4 h-4" /> Browse contractors by state
          </Link>
        </div>
      </section>
    </div>
  );
}
