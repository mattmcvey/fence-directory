import { Metadata } from 'next';
import Link from 'next/link';
import { faqSchema, breadcrumbSchema, ogMeta } from '@/lib/seo';
import { ArrowRight, Sun, Snowflake, Leaf, Flower2 } from 'lucide-react';
import RelatedLinks from '@/components/RelatedLinks';

const title = 'Best Time to Install a Fence (2026) — Season-by-Season Guide | FenceFind';
const description = 'When is the best time to install a fence? Compare spring, summer, fall, and winter installation. Learn how season affects cost, scheduling, and quality. Save 10-20% with off-season timing.';

export const metadata: Metadata = {
  title,
  description,
  ...ogMeta({ title, description, path: '/guides/best-time-to-install' }),
};

const seasons = [
  {
    name: 'Spring (March–May)',
    icon: <Flower2 className="w-6 h-6 text-pink-500" />,
    verdict: 'Most Popular',
    color: 'bg-pink-50 border-pink-200',
    badgeColor: 'bg-pink-100 text-pink-800',
    pros: [
      'Ground is thawed and workable',
      'Mild weather = comfortable working conditions',
      'Fence is ready for summer enjoyment',
      'Good availability before peak season rush',
    ],
    cons: [
      'Rain delays are common in many regions',
      'Prices start rising as demand increases',
      'Contractors begin booking up fast',
      'Muddy ground can complicate installation',
    ],
    tip: 'Book your contractor in February or early March to get spring scheduling before the rush.',
  },
  {
    name: 'Summer (June–August)',
    icon: <Sun className="w-6 h-6 text-yellow-500" />,
    verdict: 'Peak Season — Most Expensive',
    color: 'bg-yellow-50 border-yellow-200',
    badgeColor: 'bg-yellow-100 text-yellow-800',
    pros: [
      'Longest daylight hours = faster completion',
      'Dry conditions in most regions',
      'Concrete sets quickly in warm weather',
      'Ground is firm and easy to dig',
    ],
    cons: [
      'Highest prices of the year (10-20% premium)',
      'Longest wait times — 4-8 week backlogs',
      'Extreme heat can be hard on workers',
      'Drought restrictions may limit landscaping after',
    ],
    tip: 'If you must install in summer, book 2-3 months ahead. Expect to pay peak pricing.',
  },
  {
    name: 'Fall (September–November)',
    icon: <Leaf className="w-6 h-6 text-orange-500" />,
    verdict: '⭐ Best Value',
    color: 'bg-orange-50 border-orange-200',
    badgeColor: 'bg-orange-100 text-orange-800',
    pros: [
      'Prices drop 10-15% as demand decreases',
      'Contractors have more availability',
      'Mild weather and less rain than spring',
      'Ground is still workable before frost',
      'Fence settles over winter, ready for spring',
    ],
    cons: [
      'Shorter daylight hours',
      'Late fall risks early frost in northern states',
      'Some landscaping may need to wait until spring',
    ],
    tip: 'September and early October are the sweet spot — good weather, lower prices, and easy scheduling.',
  },
  {
    name: 'Winter (December–February)',
    icon: <Snowflake className="w-6 h-6 text-blue-500" />,
    verdict: 'Lowest Prices (If Possible)',
    color: 'bg-blue-50 border-blue-200',
    badgeColor: 'bg-blue-100 text-blue-800',
    pros: [
      'Lowest prices of the year (15-25% savings)',
      'Contractors are least busy — best availability',
      'Possible in southern and western states year-round',
      'Can negotiate better deals',
    ],
    cons: [
      'Frozen ground makes digging impossible in northern states',
      'Snow and ice cause delays',
      'Concrete doesn\'t cure well below 40°F',
      'Limited daylight hours',
      'Not feasible in many northern regions',
    ],
    tip: 'Winter installation works great in the South and Southwest. In the North, use winter to get quotes and book spring installation at winter prices.',
  },
];

export default function BestTimeToInstallPage() {
  const faqs = [
    {
      q: 'What is the best month to install a fence?',
      a: 'September and October are generally the best months to install a fence. You get mild weather, lower prices (10-15% off peak summer rates), better contractor availability, and the ground is still easy to work with before frost.',
    },
    {
      q: 'Is it cheaper to install a fence in winter?',
      a: 'Yes — winter is typically the cheapest time for fence installation, with savings of 15-25% compared to summer peak pricing. However, winter installation is only practical in southern and western states where the ground doesn\'t freeze.',
    },
    {
      q: 'How long does it take to install a fence?',
      a: 'Most residential fence installations take 1-3 days for the actual work. However, the total timeline from booking to completion can be 2-8 weeks depending on the season, with summer having the longest wait times.',
    },
    {
      q: 'Can you install a fence in the rain?',
      a: 'Light rain usually doesn\'t stop fence installation, but heavy rain or saturated ground can cause delays. Muddy conditions make it harder to dig post holes and can affect concrete curing. Most contractors will reschedule during heavy rain.',
    },
    {
      q: 'Should I install a fence before or after landscaping?',
      a: 'Install the fence first. It\'s much easier to landscape around an existing fence than to install a fence around established plants. The fence also defines your outdoor space, making landscape planning easier.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Guides', url: '/guides' },
            { name: 'Best Time to Install a Fence', url: '/guides/best-time-to-install' },
          ])),
        }}
      />

      <nav className="text-sm text-gray-500 mb-6 flex flex-wrap gap-1">
        <Link href="/" className="hover:text-green-600">Home</Link>
        <span>/</span>
        <Link href="/guides" className="hover:text-green-600">Guides</Link>
        <span>/</span>
        <span className="text-gray-900">Best Time to Install</span>
      </nav>

      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
        Best Time to Install a Fence (2026)
      </h1>
      <p className="text-gray-600 text-lg mb-4">
        Timing your fence installation right can save you 10–25% and get you faster service. Here&apos;s what each season looks like.
      </p>

      <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-10">
        <p className="text-green-800 font-semibold text-lg mb-2">💡 Quick Answer</p>
        <p className="text-green-700">
          <strong>Fall (September–October)</strong> is the best time for most homeowners — you get lower prices, good weather, and easy scheduling. 
          <strong> Winter</strong> is cheapest but only works in warmer states. 
          <strong> Summer</strong> is the most expensive and hardest to schedule.
        </p>
      </div>

      {/* Season cards */}
      <div className="space-y-8 mb-10">
        {seasons.map((season) => (
          <div key={season.name} className={`rounded-xl border p-6 sm:p-8 ${season.color}`}>
            <div className="flex items-center gap-3 mb-4">
              {season.icon}
              <div>
                <h2 className="text-xl font-bold text-gray-900">{season.name}</h2>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${season.badgeColor}`}>
                  {season.verdict}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
              <div>
                <h3 className="font-semibold text-green-700 mb-2">✅ Pros</h3>
                <ul className="space-y-1">
                  {season.pros.map((pro, i) => (
                    <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">•</span> {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-red-700 mb-2">❌ Cons</h3>
                <ul className="space-y-1">
                  {season.cons.map((con, i) => (
                    <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                      <span className="text-red-500 mt-0.5">•</span> {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-white bg-opacity-60 rounded-lg p-3">
              <p className="text-sm text-gray-800"><strong>💡 Pro tip:</strong> {season.tip}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Money saving tips */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Save Money on Fence Installation</h2>
        <div className="prose prose-green max-w-none text-gray-700">
          <ol className="space-y-3">
            <li><strong>Book off-season:</strong> Schedule installation for September–November or book in winter for spring installation. You can save 10–25% versus summer peak pricing.</li>
            <li><strong>Get multiple quotes:</strong> Always get at least 3 written estimates. Prices can vary 30-50% between contractors for the same job.</li>
            <li><strong>Be flexible on timing:</strong> Tell your contractor you&apos;re flexible on the exact start date. They may offer a discount to fill a gap in their schedule.</li>
            <li><strong>Buy materials yourself:</strong> Some homeowners save by purchasing fence materials directly from a lumber yard or home improvement store, then hiring a contractor for labor only.</li>
            <li><strong>Consider the whole cost:</strong> A cheap fence that needs replacing in 10 years costs more than a quality fence that lasts 25. Factor in maintenance costs too.</li>
          </ol>
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
            <ArrowRight className="w-4 h-4" /> Fence cost guide
          </Link>
          <Link href="/fence-cost-by-state" className="text-green-600 hover:text-green-700 flex items-center gap-2">
            <ArrowRight className="w-4 h-4" /> Fence cost by state
          </Link>
          <Link href="/guides/getting-quotes" className="text-green-600 hover:text-green-700 flex items-center gap-2">
            <ArrowRight className="w-4 h-4" /> How to get fence quotes
          </Link>
          <Link href="/guides/choosing-material" className="text-green-600 hover:text-green-700 flex items-center gap-2">
            <ArrowRight className="w-4 h-4" /> Choosing fence material
          </Link>
        </div>
      </section>

      <RelatedLinks pageType="guide" guideSlug="best-time-to-install" />
    </div>
  );
}
