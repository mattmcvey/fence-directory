import { Metadata } from 'next';
import Link from 'next/link';
import RelatedLinks from '@/components/RelatedLinks';
import { breadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'How Long Does Fence Installation Take? Timeline Guide | FenceFind',
  description: 'Fence installation takes 1-3 days for most residential projects. Learn timelines by fence type, what affects duration, and how to prepare for installation day.',
  keywords: 'how long does fence installation take, fence installation timeline, fence installation process, how long to install a fence',
};

export default function HowLongFenceInstallationPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">How Long Does Fence Installation Take?</h1>
      <p className="text-xl text-gray-600 mb-8">Realistic timelines, what to expect, and how to prepare.</p>

      <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-10">
        <p className="text-green-800 font-semibold text-lg mb-2">💡 Quick Answer</p>
        <p className="text-green-700">Most residential fence installations take <strong>1–3 days</strong> once work begins. The total timeline from initial contact to completion is typically <strong>2–6 weeks</strong> when you factor in quotes, permits, and scheduling.</p>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">Installation Time by Fence Type</h2>
      <div className="overflow-x-auto mb-10">
        <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
          <thead><tr className="bg-gray-50">
            <th className="text-left p-4 font-semibold">Fence Type</th>
            <th className="text-left p-4 font-semibold">150 ft Yard</th>
            <th className="text-left p-4 font-semibold">200 ft Yard</th>
          </tr></thead>
          <tbody className="divide-y divide-gray-100">
            <tr><td className="p-4">Chain link</td><td className="p-4">1 day</td><td className="p-4">1–2 days</td></tr>
            <tr><td className="p-4">Wood privacy</td><td className="p-4">1–2 days</td><td className="p-4">2–3 days</td></tr>
            <tr><td className="p-4">Vinyl</td><td className="p-4">1–2 days</td><td className="p-4">2–3 days</td></tr>
            <tr><td className="p-4">Aluminum/ornamental</td><td className="p-4">1–2 days</td><td className="p-4">2–3 days</td></tr>
            <tr><td className="p-4">Wrought iron</td><td className="p-4">2–3 days</td><td className="p-4">3–5 days</td></tr>
            <tr><td className="p-4">Composite</td><td className="p-4">2–3 days</td><td className="p-4">3–4 days</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">The Full Timeline</h2>
      <div className="space-y-4 mb-10">
        <div className="bg-white border-l-4 border-green-500 p-5">
          <h3 className="font-semibold text-gray-900">Week 1: Get Quotes</h3>
          <p className="text-gray-600">Contact 3+ contractors, schedule on-site estimates. Most can come within a few days. <Link href="/guides/getting-quotes" className="text-green-600 hover:underline">See our guide on getting quotes</Link>.</p>
        </div>
        <div className="bg-white border-l-4 border-green-500 p-5">
          <h3 className="font-semibold text-gray-900">Week 1-2: Compare & Choose</h3>
          <p className="text-gray-600">Review quotes, check references, sign contract. Your contractor should handle permits.</p>
        </div>
        <div className="bg-white border-l-4 border-green-500 p-5">
          <h3 className="font-semibold text-gray-900">Week 2-3: Permits & Scheduling</h3>
          <p className="text-gray-600">Permit approval takes 1-5 business days in most areas. 811 utility marking takes 2-3 business days. Contractor schedules your install date.</p>
        </div>
        <div className="bg-white border-l-4 border-green-500 p-5">
          <h3 className="font-semibold text-gray-900">Week 3-6: Installation</h3>
          <p className="text-gray-600">The actual work. Crew arrives, sets posts (Day 1), installs panels/boards (Day 1-2), finishes gates and trim (Day 2-3).</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">What Slows Things Down</h2>
      <div className="bg-yellow-50 rounded-xl p-6 mb-10">
        <ul className="space-y-2 text-yellow-700">
          <li>• <strong>Rocky or root-heavy soil:</strong> Post hole digging takes 2-3x longer. May need special equipment.</li>
          <li>• <strong>Slopes and uneven terrain:</strong> Each section needs custom measurement. Adds 50-100% more time.</li>
          <li>• <strong>Old fence removal:</strong> Add half a day to a full day depending on the old fence material.</li>
          <li>• <strong>Weather delays:</strong> Rain, frozen ground, and extreme heat all cause delays. Spring and fall are ideal.</li>
          <li>• <strong>Permit delays:</strong> Some jurisdictions take 2+ weeks for permits. Plan ahead.</li>
          <li>• <strong>Material backorders:</strong> Specialty materials or custom colors may need to be ordered. Add 1-3 weeks.</li>
          <li>• <strong>Peak season (spring/summer):</strong> Contractors are busiest March–August. Wait times for scheduling are longer.</li>
        </ul>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Prepare for Installation Day</h2>
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-10">
        <ol className="space-y-3 text-gray-700 list-decimal list-inside">
          <li><strong>Clear the fence line:</strong> Remove furniture, toys, planters, and decorations within 3 feet of where the fence will go.</li>
          <li><strong>Mark sprinkler heads and landscape lighting:</strong> The crew will avoid them, but only if they can see them.</li>
          <li><strong>Secure pets:</strong> Keep dogs inside or away from the work area all day.</li>
          <li><strong>Talk to neighbors:</strong> Let them know about the work schedule. Crews may need brief access to their side.</li>
          <li><strong>Confirm gate locations:</strong> Double-check gate placement with the crew lead before they start digging.</li>
          <li><strong>Plan for access:</strong> The crew needs to get materials in. Make sure a truck can get close to the work area.</li>
        </ol>
      </div>

      <div className="bg-green-50 rounded-xl p-8 text-center mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Ready to Get Started?</h2>
        <p className="text-gray-600 mb-6">The sooner you get quotes, the sooner your fence gets built. Most contractors offer free estimates.</p>
        <Link href="/search" className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">Find Contractors Near You</Link>
      </div>

      <div className="text-sm text-gray-500">
        <p>Related guides: <Link href="/guides/getting-quotes" className="text-green-600 hover:underline">Getting Quotes</Link> · <Link href="/guides/fence-permits" className="text-green-600 hover:underline">Permit Guide</Link> · <Link href="/guides/fence-cost" className="text-green-600 hover:underline">Cost Guide</Link></p>
      </div>

      <RelatedLinks pageType="guide" guideSlug="how-long-fence-installation" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'How Long Does Fence Installation Take?',
        description: 'Fence installation timelines by type, what causes delays, and how to prepare.',
        publisher: { '@type': 'Organization', name: 'FenceFind', url: 'https://getfencefind.com' },
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Guides', url: '/guides' },
        { name: 'Installation Timeline', url: '/guides/how-long-fence-installation' },
      ]))}} />
    </div>
  );
}
