import { getStates } from '@/lib/data';
import { getPermitData } from '@/lib/permit-data';
import { faqSchema, breadcrumbSchema, ogMeta } from '@/lib/seo';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';

const title = 'Fence Permit Requirements by State (2026) — Rules, Costs & Height Limits | FenceFind';
const description = 'Compare fence permit requirements across all 50 states. See permit costs, height limits, fines, and regulations. Find your city\'s specific rules.';

export const metadata: Metadata = {
  title,
  description,
  ...ogMeta({ title, description, path: '/fence-permits' }),
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

export default function FencePermitsPage() {
  const statesWithPermits = ALL_STATES.map(s => ({
    ...s,
    permit: getPermitData(s.code),
  })).sort((a, b) => a.name.localeCompare(b.name));

  const faqs = [
    {
      q: 'Do I need a permit to build a fence?',
      a: 'In most US cities and counties, yes — especially for fences over 4 feet tall. Requirements vary by location. Some rural areas and smaller towns don\'t require permits for standard residential fences, but it\'s always best to check with your local building department before starting.',
    },
    {
      q: 'How much does a fence permit cost?',
      a: 'Fence permits typically cost $15–$300 depending on your state and municipality. States like California and New York tend to charge $50–$300, while southern and midwestern states are often $15–$100. Some jurisdictions charge based on linear footage rather than a flat fee.',
    },
    {
      q: 'What happens if I build a fence without a permit?',
      a: 'Building without a required permit can result in fines ranging from $50 to $2,500+, a stop-work order, or being required to tear down the fence entirely. Unpermitted work can also cause problems when selling your home if discovered during inspection.',
    },
    {
      q: 'How tall can I build a fence?',
      a: 'Most jurisdictions allow up to 6 feet in backyards and 4 feet in front yards. Corner lots often have additional sight-triangle restrictions. Some areas allow taller fences with a variance or special permit. Always check your local zoning code for exact limits.',
    },
    {
      q: 'How long does it take to get a fence permit?',
      a: 'Processing times range from same-day approval to 2–3 weeks, depending on the jurisdiction. Most areas process fence permits within 5–15 business days. Some cities offer expedited processing for an additional fee.',
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
            { name: 'Fence Permits', url: '/fence-permits' },
          ])),
        }}
      />

      <nav className="text-sm text-gray-500 mb-6 flex flex-wrap gap-1">
        <Link href="/" className="hover:text-green-600">Home</Link>
        <span>/</span>
        <span className="text-gray-900">Fence Permits by State</span>
      </nav>

      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
        Fence Permit Requirements by State (2026)
      </h1>
      <p className="text-gray-600 text-lg mb-6">
        Compare fence permit costs, height limits, and fine amounts across all 50 states. Click any state to find city-specific permit details.
      </p>
      <p className="text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 mb-8">
        <strong>Note:</strong> Permit costs, height limits, and fines shown are typical state-level ranges. Requirements vary significantly by city and county. Always contact your local building department for exact rules before starting a fence project.
      </p>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center">
          <div className="text-sm text-gray-600">Typical Permit Cost</div>
          <div className="text-xl font-bold text-gray-900">$15–$300</div>
          <div className="text-sm text-green-700">Varies by state & city</div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-center">
          <div className="text-sm text-gray-600">Max Backyard Height</div>
          <div className="text-xl font-bold text-gray-900">6 feet</div>
          <div className="text-sm text-blue-700">Standard in most states</div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-center">
          <div className="text-sm text-gray-600">No-Permit Fines</div>
          <div className="text-xl font-bold text-gray-900">$50–$2,500+</div>
          <div className="text-sm text-red-700">Don&apos;t skip the permit</div>
        </div>
      </div>

      {/* State comparison table */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Fence Permit Costs & Rules by State</h2>
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-3 sm:px-4 py-3 text-sm font-semibold text-gray-900">State</th>
                  <th className="px-3 sm:px-4 py-3 text-sm font-semibold text-gray-900">Permit Cost</th>
                  <th className="px-3 sm:px-4 py-3 text-sm font-semibold text-gray-900">Backyard Max</th>
                  <th className="px-3 sm:px-4 py-3 text-sm font-semibold text-gray-900">Front Yard Max</th>
                  <th className="px-3 sm:px-4 py-3 text-sm font-semibold text-gray-900">No-Permit Fine</th>
                  <th className="px-3 sm:px-4 py-3 text-sm font-semibold text-gray-900 hidden sm:table-cell">Processing</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {statesWithPermits.map((s) => (
                  <tr key={s.code} className="hover:bg-gray-50">
                    <td className="px-3 sm:px-4 py-3">
                      <Link href={`/state/${s.slug}`} className="font-medium text-gray-900 hover:text-green-600">
                        {s.name}
                      </Link>
                    </td>
                    <td className="px-3 sm:px-4 py-3 text-gray-700">${s.permit.permitCostLow}–${s.permit.permitCostHigh}</td>
                    <td className="px-3 sm:px-4 py-3 text-gray-700">{s.permit.backyardHeight} ft</td>
                    <td className="px-3 sm:px-4 py-3 text-gray-700">{s.permit.frontyardHeight} ft</td>
                    <td className="px-3 sm:px-4 py-3 text-gray-700">${s.permit.fineLow}–${s.permit.fineHigh}</td>
                    <td className="px-3 sm:px-4 py-3 text-gray-500 text-sm hidden sm:table-cell">{s.permit.processingDays}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          * Estimated state-level ranges. Permit costs and regulations vary by city and county. Contact your local building department for exact requirements.
        </p>
      </section>

      {/* When do you need a permit */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">When Do You Need a Fence Permit?</h2>
        <div className="prose prose-green max-w-none text-gray-700">
          <p>Most US municipalities require a building permit for new fence installations. You&apos;ll almost certainly need one if:</p>
          <ul className="space-y-3">
            <li><strong>Your fence is over 4 feet tall</strong> — the threshold in most jurisdictions. Privacy fences (typically 6 feet) nearly always require a permit.</li>
            <li><strong>You&apos;re building in a front yard</strong> — front-yard fences face stricter rules on height, material, and style.</li>
            <li><strong>You live on a corner lot</strong> — sight-triangle restrictions often apply to keep intersections visible for drivers.</li>
            <li><strong>Your property is in a historic district</strong> — design review boards may need to approve materials and style.</li>
            <li><strong>You have an HOA</strong> — even if the city doesn&apos;t require a permit, your HOA likely has rules about fences.</li>
          </ul>
          <p>
            Even in areas where permits aren&apos;t strictly required, you should always <strong>call 811 before digging</strong> to have underground utilities marked. This is required by law in all 50 states.
          </p>
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
          <Link href="/guides/fence-permits" className="text-green-600 hover:text-green-700 flex items-center gap-2">
            <ArrowRight className="w-4 h-4" /> Complete fence permit guide
          </Link>
          <Link href="/fence-cost-by-state" className="text-green-600 hover:text-green-700 flex items-center gap-2">
            <ArrowRight className="w-4 h-4" /> Fence cost by state
          </Link>
          <Link href="/guides/fence-cost" className="text-green-600 hover:text-green-700 flex items-center gap-2">
            <ArrowRight className="w-4 h-4" /> Fence installation cost guide
          </Link>
          <Link href="/states" className="text-green-600 hover:text-green-700 flex items-center gap-2">
            <ArrowRight className="w-4 h-4" /> Browse contractors by state
          </Link>
        </div>
      </section>
    </div>
  );
}
