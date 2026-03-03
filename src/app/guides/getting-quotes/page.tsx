import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'How to Get Fence Quotes: What to Ask & Red Flags (2026) | FenceFind',
  description: 'How to get fence estimates, compare bids, and choose the right contractor. Questions to ask, red flags to watch for, and what a good quote should include.',
  keywords: 'fence estimate, fence quote, how much does a fence cost, questions to ask fence contractor, fence contractor tips',
};

export default function GettingQuotesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">How to Get Fence Quotes: What to Ask & Red Flags</h1>
      <p className="text-xl text-gray-600 mb-8">The smart way to compare contractors and avoid getting ripped off.</p>

      <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-10">
        <p className="text-green-800 font-semibold text-lg mb-2">💡 The Golden Rule</p>
        <p className="text-green-700">Always get <strong>at least 3 quotes</strong>. This lets you compare prices, gauge professionalism, and identify outliers. The cheapest bid isn&apos;t always the best — and the most expensive isn&apos;t always the most qualified.</p>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">What a Good Quote Should Include</h2>
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-10">
        <p className="text-gray-700 mb-3">A professional fence estimate should be detailed and in writing. Look for:</p>
        <ul className="space-y-2 text-gray-700">
          <li>✅ <strong>Total linear footage</strong> — measured on-site, not estimated from a photo</li>
          <li>✅ <strong>Material specifications</strong> — type, grade, brand (e.g., &quot;6ft pressure-treated pine, dog-ear style&quot;)</li>
          <li>✅ <strong>Post details</strong> — material, depth, spacing, concrete footings</li>
          <li>✅ <strong>Gate count and sizes</strong> — including hardware</li>
          <li>✅ <strong>Labor cost broken out</strong> — separate from materials</li>
          <li>✅ <strong>Old fence removal</strong> — included or extra? How much?</li>
          <li>✅ <strong>Permit costs</strong> — who pulls the permit and what does it cost?</li>
          <li>✅ <strong>Timeline</strong> — start date, expected completion</li>
          <li>✅ <strong>Warranty</strong> — on both materials and workmanship</li>
          <li>✅ <strong>Payment schedule</strong> — deposit, progress, final payment</li>
        </ul>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions to Ask Every Contractor</h2>
      <div className="space-y-3 mb-10">
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="font-medium text-gray-900">&quot;Are you licensed and insured?&quot;</p>
          <p className="text-gray-600 text-sm mt-1">Non-negotiable. Ask for proof. Verify the license number with your state&apos;s licensing board.</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="font-medium text-gray-900">&quot;Who does the actual work — your crew or subcontractors?&quot;</p>
          <p className="text-gray-600 text-sm mt-1">In-house crews are generally more consistent. Subcontracted work varies in quality.</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="font-medium text-gray-900">&quot;What happens if you hit rock, roots, or utilities?&quot;</p>
          <p className="text-gray-600 text-sm mt-1">This is where surprise costs come from. Get their policy in writing before signing.</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="font-medium text-gray-900">&quot;Do you handle the permit?&quot;</p>
          <p className="text-gray-600 text-sm mt-1">Most professional contractors handle this. If they say &quot;you don&apos;t need one,&quot; that&apos;s a red flag — they should know local codes.</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="font-medium text-gray-900">&quot;Can I see photos of recent projects and talk to references?&quot;</p>
          <p className="text-gray-600 text-sm mt-1">Good contractors are proud of their work and happy to share. Reluctance is a warning sign.</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="font-medium text-gray-900">&quot;What&apos;s your warranty?&quot;</p>
          <p className="text-gray-600 text-sm mt-1">Standard is 1-2 years on workmanship. Some offer 5+ years. Material warranties are separate (from the manufacturer).</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="font-medium text-gray-900">&quot;What&apos;s your payment schedule?&quot;</p>
          <p className="text-gray-600 text-sm mt-1">Standard: 30-50% deposit, balance on completion. Never pay 100% upfront. Ever.</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">🚩 Red Flags</h2>
      <div className="bg-red-50 rounded-xl p-6 mb-10">
        <ul className="space-y-2 text-red-700">
          <li>🚩 <strong>No written estimate</strong> — verbal quotes are worthless and lead to disputes</li>
          <li>🚩 <strong>Demands full payment upfront</strong> — legitimate contractors don&apos;t need all your money before starting</li>
          <li>🚩 <strong>No license or insurance proof</strong> — you&apos;re liable if a worker gets hurt on your property</li>
          <li>🚩 <strong>Significantly cheaper than everyone else</strong> — they&apos;re cutting corners somewhere (materials, footings, labor)</li>
          <li>🚩 <strong>Pressures you to decide immediately</strong> — &quot;this price is only good today&quot; is a sales tactic, not a real deadline</li>
          <li>🚩 <strong>Can&apos;t provide references</strong> — either they&apos;re new (risky) or their past clients aren&apos;t happy</li>
          <li>🚩 <strong>Wants to skip the permit</strong> — this creates legal and resale problems for you, not them</li>
          <li>🚩 <strong>Cash only, no contract</strong> — no paper trail means no recourse if things go wrong</li>
        </ul>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Compare Bids</h2>
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-10">
        <p className="text-gray-700 mb-3">When you have 3+ quotes, compare apples to apples:</p>
        <ol className="space-y-2 text-gray-700 list-decimal list-inside">
          <li><strong>Same materials:</strong> Make sure everyone is quoting the same fence type, height, and material grade.</li>
          <li><strong>Same scope:</strong> Does each quote include the same number of gates? Old fence removal? Permits?</li>
          <li><strong>Post depth and spacing:</strong> Cheaper bids sometimes use shallower posts or wider spacing (weaker fence).</li>
          <li><strong>Concrete footings:</strong> Every post should be set in concrete. If a bid skips this, reject it.</li>
          <li><strong>Warranty differences:</strong> A slightly more expensive bid with a 5-year warranty may beat a cheap bid with no warranty.</li>
        </ol>
      </div>

      <div className="bg-green-50 rounded-xl p-8 text-center mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Start Getting Quotes Today</h2>
        <p className="text-gray-600 mb-6">Browse our directory of licensed fence contractors and request free estimates.</p>
        <Link href="/search" className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">Find Contractors Near You</Link>
      </div>

      <div className="text-sm text-gray-500">
        <p>Related guides: <Link href="/guides/fence-cost" className="text-green-600 hover:underline">Cost Guide</Link> · <Link href="/guides/fence-permits" className="text-green-600 hover:underline">Permit Guide</Link> · <Link href="/guides/how-long-fence-installation" className="text-green-600 hover:underline">Installation Timeline</Link></p>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'How to Get Fence Quotes: What to Ask & Red Flags',
        description: 'Guide to getting fence estimates, comparing bids, and choosing the right contractor.',
        publisher: { '@type': 'Organization', name: 'FenceFind', url: 'https://getfencefind.com' },
      })}} />
    </div>
  );
}
