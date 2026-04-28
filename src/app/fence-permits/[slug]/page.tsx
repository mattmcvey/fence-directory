import { getCities, getCityBySlug } from '@/lib/data';
import { stateCodeToName } from '@/lib/utils';
import { faqSchema, breadcrumbSchema, ogMeta } from '@/lib/seo';
import { getPermitData } from '@/lib/permit-data';
import Link from 'next/link';
import { Metadata } from 'next';
import { FileText, AlertTriangle, DollarSign, Ruler, ArrowRight, CheckCircle } from 'lucide-react';

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const city = await getCityBySlug(slug);
  if (!city) return { title: 'City Not Found — FenceFind' };
  const stateName = stateCodeToName(city.stateCode);
  const title = `Fence Permit Requirements in ${city.name}, ${city.stateCode} (2026) — Rules & Costs | FenceFind`;
  const description = `Do you need a fence permit in ${city.name}, ${city.stateCode}? Learn about ${city.name} fence height limits, setback rules, permit costs, HOA requirements, and how to apply. Updated for 2026.`;
  return {
    title,
    description,
    ...ogMeta({ title, description, path: `/fence-permits/${slug}` }),
  };
}

export async function generateStaticParams() {
  const cities = await getCities();
  return cities.map((c) => ({ slug: c.slug }));
}

export default async function FencePermitPage({ params }: PageProps) {
  const { slug } = await params;
  const city = await getCityBySlug(slug);
  if (!city) return null;

  const stateName = stateCodeToName(city.stateCode);
  const permit = getPermitData(city.stateCode);

  const faqs = [
    {
      q: `Do I need a permit to build a fence in ${city.name}, ${city.stateCode}?`,
      a: `Most municipalities in ${stateName} require a building permit for new fence installations, especially for fences over 4 feet tall. ${city.name} likely requires a permit — contact your local building department to confirm requirements and fees before starting construction.`,
    },
    {
      q: `How much does a fence permit cost in ${city.name}?`,
      a: `Fence permits in ${stateName} typically cost $${permit.permitCostLow}–$${permit.permitCostHigh}. Some jurisdictions charge a flat fee while others base the cost on the linear footage of fencing. Contact the ${city.name} Building Department for exact pricing.`,
    },
    {
      q: `What is the maximum fence height allowed in ${city.name}?`,
      a: `Most ${stateName} municipalities allow fences up to ${permit.backyardHeight} feet in backyards and ${permit.frontyardHeight} feet in front yards. Corner lots may have additional visibility restrictions. Check with ${city.name}'s zoning department for specific rules.`,
    },
    {
      q: `How far from the property line does a fence need to be in ${city.name}?`,
      a: `Typical setback requirements in ${stateName} range from ${permit.setbackInches} inches to several feet from the property line, depending on the zone. Some areas allow fences directly on the property line with neighbor consent. Always get a survey before installing a fence near boundaries.`,
    },
    {
      q: `Do I need my neighbor's permission to build a fence in ${city.name}?`,
      a: `In most cases, you don't need your neighbor's permission to build a fence entirely on your property. However, if the fence will be on or near the property line, it's good practice to discuss plans with your neighbor. ${stateName} may have specific "good neighbor" fence laws requiring the finished side to face outward.`,
    },
    {
      q: `What happens if I build a fence without a permit in ${city.name}?`,
      a: `Building without a required permit in ${city.name} can result in fines ($${permit.fineLow}–$${permit.fineHigh}+), a stop-work order, or being required to remove the fence. You may also face issues when selling your home if unpermitted work is discovered during inspection.`,
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
            { name: 'Fence Permits', url: `/fence-permits/${slug}` },
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
        <span className="text-gray-900">Fence Permits</span>
      </nav>

      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
        Fence Permit Requirements in {city.name}, {city.stateCode} (2026)
      </h1>
      <p className="text-gray-600 text-lg mb-6">
        Everything you need to know about fence permits, height restrictions, setback rules, and HOA requirements in {city.name}, {stateName}.
      </p>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-amber-800">
          <strong>Important:</strong> The figures below are based on typical {stateName} state requirements. Permit rules, costs, and height limits vary by city and county. Always contact the <strong>{city.name} Building Department</strong> to confirm exact requirements before starting your fence project.
        </p>
      </div>

      {/* Quick facts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
          <FileText className="w-5 h-5 text-blue-600 mx-auto mb-2" />
          <div className="text-sm text-gray-600">Permit Cost</div>
          <div className="text-lg font-bold text-gray-900">${permit.permitCostLow}–${permit.permitCostHigh}</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
          <Ruler className="w-5 h-5 text-green-600 mx-auto mb-2" />
          <div className="text-sm text-gray-600">Backyard Max</div>
          <div className="text-lg font-bold text-gray-900">{permit.backyardHeight} feet</div>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center">
          <Ruler className="w-5 h-5 text-yellow-600 mx-auto mb-2" />
          <div className="text-sm text-gray-600">Front Yard Max</div>
          <div className="text-lg font-bold text-gray-900">{permit.frontyardHeight} feet</div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
          <AlertTriangle className="w-5 h-5 text-red-500 mx-auto mb-2" />
          <div className="text-sm text-gray-600">No-Permit Fine</div>
          <div className="text-lg font-bold text-gray-900">${permit.fineLow}–${permit.fineHigh}+</div>
        </div>
      </div>

      {/* Do you need a permit? */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Do You Need a Fence Permit in {city.name}?
        </h2>
        <div className="prose prose-green max-w-none text-gray-700">
          <p>
            <strong>Most likely, yes.</strong> The majority of municipalities in {stateName} require a building permit for new fence installations. In {city.name}, you&apos;ll generally need a permit if:
          </p>
          <ul className="space-y-2">
            <li>Your fence will be over <strong>{permit.permitRequiredHeight} feet tall</strong></li>
            <li>You&apos;re building in a <strong>front yard</strong> or on a <strong>corner lot</strong></li>
            <li>The fence is near a <strong>public sidewalk, road, or easement</strong></li>
            <li>You live in a <strong>historic district</strong> or area with design guidelines</li>
            <li>Your <strong>HOA</strong> has fence requirements (even if the city doesn&apos;t require a permit)</li>
          </ul>
          <p>
            Some exemptions may apply for minor repairs or replacing an existing fence in the same location with the same height and materials. Always verify with the {city.name} Building Department before starting work.
          </p>
        </div>
      </section>

      {/* Height restrictions */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Fence Height Limits in {city.name}
        </h2>
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-sm font-semibold text-gray-900">Location</th>
                <th className="px-4 sm:px-6 py-3 text-sm font-semibold text-gray-900">Max Height</th>
                <th className="px-4 sm:px-6 py-3 text-sm font-semibold text-gray-900">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="px-4 sm:px-6 py-4 font-medium text-gray-900">Front Yard</td>
                <td className="px-4 sm:px-6 py-4 text-gray-700">{permit.frontyardHeight} ft</td>
                <td className="px-4 sm:px-6 py-4 text-gray-500 text-sm">Often must be open-style (picket, wrought iron)</td>
              </tr>
              <tr>
                <td className="px-4 sm:px-6 py-4 font-medium text-gray-900">Backyard</td>
                <td className="px-4 sm:px-6 py-4 text-gray-700">{permit.backyardHeight} ft</td>
                <td className="px-4 sm:px-6 py-4 text-gray-500 text-sm">Privacy fences allowed in most zones</td>
              </tr>
              <tr>
                <td className="px-4 sm:px-6 py-4 font-medium text-gray-900">Side Yard</td>
                <td className="px-4 sm:px-6 py-4 text-gray-700">{permit.backyardHeight} ft</td>
                <td className="px-4 sm:px-6 py-4 text-gray-500 text-sm">May step down near front yard setback line</td>
              </tr>
              <tr>
                <td className="px-4 sm:px-6 py-4 font-medium text-gray-900">Corner Lot</td>
                <td className="px-4 sm:px-6 py-4 text-gray-700">{permit.frontyardHeight}–{permit.backyardHeight} ft</td>
                <td className="px-4 sm:px-6 py-4 text-gray-500 text-sm">Sight triangle restrictions may apply</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          * Heights are typical for {stateName} municipalities. Check {city.name}&apos;s specific zoning code for exact limits.
        </p>
      </section>

      {/* How to get a permit */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          How to Get a Fence Permit in {city.name}
        </h2>
        <div className="space-y-4">
          {[
            { step: 1, title: 'Check if you need one', desc: `Contact the ${city.name} Building Department or check their website for fence permit requirements in your zone.` },
            { step: 2, title: 'Get a property survey', desc: 'Know exactly where your property lines are. This prevents disputes and ensures your fence meets setback requirements.' },
            { step: 3, title: 'Check HOA rules', desc: 'If you have an HOA, review their covenants for fence material, color, height, and style restrictions before applying for a permit.' },
            { step: 4, title: 'Prepare your application', desc: 'Most applications require a site plan showing fence location, height, materials, and distances from property lines and structures.' },
            { step: 5, title: 'Submit and pay', desc: `Submit your application to ${city.name}'s building department with the required fee ($${permit.permitCostLow}–$${permit.permitCostHigh}). Processing typically takes ${permit.processingDays}.` },
            { step: 6, title: 'Call before you dig', desc: 'Call 811 at least 2 business days before digging to have underground utilities marked. This is required by law in all 50 states.' },
            { step: 7, title: 'Build and inspect', desc: 'Build your fence according to the approved plans. Some jurisdictions require a final inspection before closing the permit.' },
          ].map(({ step, title, desc }) => (
            <div key={step} className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                {step}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{title}</h3>
                <p className="text-gray-600 text-sm mt-1">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Common mistakes */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Common Fence Permit Mistakes in {city.name}
        </h2>
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <div className="space-y-3">
            {[
              'Building without checking if a permit is required — fines can be $' + permit.fineLow + '–$' + permit.fineHigh + '+',
              'Assuming your property line is where you think it is — always get a survey',
              'Ignoring HOA rules even after getting a city permit',
              'Building in a utility easement (the city can make you remove it)',
              'Not calling 811 before digging — hitting a gas line is dangerous and expensive',
              'Placing the "good side" facing your yard instead of outward (some codes require this)',
            ].map((mistake, i) => (
              <div key={i} className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                <span className="text-red-800 text-sm">{mistake}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pro tips */}
      <section className="mb-10">
        <div className="bg-green-50 border border-green-200 rounded-xl p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" /> Pro Tips for {city.name} Homeowners
          </h2>
          <div className="space-y-2 text-sm text-green-800">
            <p>• <strong>Hire a licensed contractor</strong> — most handle the permit process for you as part of the job.</p>
            <p>• <strong>Talk to your neighbors first</strong> — it avoids disputes and some jurisdictions require notification.</p>
            <p>• <strong>Keep a copy of your permit</strong> — you may need it when selling your home.</p>
            <p>• <strong>Consider both sides</strong> — {stateName} &quot;good neighbor&quot; laws may require the finished side to face your neighbor.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          FAQ: Fence Permits in {city.name}, {city.stateCode}
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
      <section className="bg-gray-50 rounded-xl p-6 sm:p-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Related Resources</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link href={`/city/${slug}`} className="text-green-600 hover:text-green-700 flex items-center gap-2">
            <ArrowRight className="w-4 h-4" /> Fence contractors in {city.name}
          </Link>
          <Link href={`/fence-cost/${slug}`} className="text-green-600 hover:text-green-700 flex items-center gap-2">
            <ArrowRight className="w-4 h-4" /> Fence cost in {city.name}
          </Link>
          <Link href="/guides/fence-permits" className="text-green-600 hover:text-green-700 flex items-center gap-2">
            <ArrowRight className="w-4 h-4" /> Complete permit guide
          </Link>
          <Link href="/guides/getting-quotes" className="text-green-600 hover:text-green-700 flex items-center gap-2">
            <ArrowRight className="w-4 h-4" /> How to get fence quotes
          </Link>
          <Link href="/guides/fence-cost" className="text-green-600 hover:text-green-700 flex items-center gap-2">
            <ArrowRight className="w-4 h-4" /> National fence cost guide
          </Link>
          <Link href="/guides/choosing-material" className="text-green-600 hover:text-green-700 flex items-center gap-2">
            <ArrowRight className="w-4 h-4" /> How to choose fence material
          </Link>
        </div>
      </section>
    </div>
  );
}
