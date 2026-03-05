import { Metadata } from 'next';
import Link from 'next/link';
import RelatedLinks from '@/components/RelatedLinks';

export const metadata: Metadata = {
  title: 'Privacy Fence Ideas, Costs & Installation Guide (2026) | FenceFind',
  description: 'Complete privacy fence guide. Compare wood, vinyl, and composite privacy fences. Average costs $15-45/ft. Height regulations, material pros/cons, and installation timeline.',
  keywords: 'privacy fence, privacy fence cost, privacy fence ideas, privacy fence installation, best privacy fence, 6 foot privacy fence cost',
};

export default function PrivacyFencePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Fence Ideas, Costs & Installation Guide (2026)</h1>
      <p className="text-xl text-gray-600 mb-8">Everything you need to know about choosing, budgeting, and installing a privacy fence.</p>

      <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-10">
        <p className="text-green-800 font-semibold text-lg mb-2">💡 Quick Answer</p>
        <p className="text-green-700">A 6-foot privacy fence costs <strong>$15–$45 per linear foot</strong> installed, or <strong>$2,250–$6,750</strong> for a typical 150-foot backyard fence. Wood is the most popular and affordable option; vinyl costs more but requires no maintenance.</p>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">Privacy Fence Materials Compared</h2>
      <div className="space-y-4 mb-10">
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="font-semibold text-gray-900 mb-2">🪵 Wood Privacy Fence</h3>
          <p className="text-gray-600 mb-2">The most popular choice. Cedar and pressure-treated pine are the go-to options.</p>
          <ul className="text-gray-700 space-y-1">
            <li>• <strong>Cost:</strong> $15–$35/ft installed</li>
            <li>• <strong>Styles:</strong> Board-on-board, stockade, shadowbox, tongue-and-groove</li>
            <li>• <strong>Best for:</strong> Natural look, budget-conscious homeowners, customization</li>
            <li>• <strong>Maintenance:</strong> Stain or seal every 2-3 years</li>
          </ul>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="font-semibold text-gray-900 mb-2">🏗️ Vinyl Privacy Fence</h3>
          <p className="text-gray-600 mb-2">Premium look with zero maintenance. Available in white, tan, gray, and woodgrain textures.</p>
          <ul className="text-gray-700 space-y-1">
            <li>• <strong>Cost:</strong> $20–$40/ft installed</li>
            <li>• <strong>Styles:</strong> Solid panel, tongue-and-groove, privacy with lattice top</li>
            <li>• <strong>Best for:</strong> Low-maintenance preference, humid climates, clean aesthetic</li>
            <li>• <strong>Maintenance:</strong> Rinse with garden hose as needed</li>
          </ul>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="font-semibold text-gray-900 mb-2">♻️ Composite Privacy Fence</h3>
          <p className="text-gray-600 mb-2">Made from recycled wood and plastic. Looks like real wood without the upkeep.</p>
          <ul className="text-gray-700 space-y-1">
            <li>• <strong>Cost:</strong> $25–$45/ft installed</li>
            <li>• <strong>Styles:</strong> Horizontal slat, vertical board, modern designs</li>
            <li>• <strong>Best for:</strong> Modern aesthetics, eco-conscious homeowners, long-term value</li>
            <li>• <strong>Maintenance:</strong> Virtually none</li>
          </ul>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">Popular Privacy Fence Styles</h2>
      <div className="grid md:grid-cols-2 gap-4 mb-10">
        <div className="bg-gray-50 rounded-lg p-5">
          <h3 className="font-semibold text-gray-900 mb-2">Board-on-Board</h3>
          <p className="text-gray-600">Overlapping boards on alternating sides. Looks great from both sides — no &quot;bad side.&quot; Premium look at a moderate premium price.</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-5">
          <h3 className="font-semibold text-gray-900 mb-2">Stockade</h3>
          <p className="text-gray-600">Flat-topped or pointed pickets side-by-side. The classic privacy fence. Most affordable wood option.</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-5">
          <h3 className="font-semibold text-gray-900 mb-2">Shadowbox</h3>
          <p className="text-gray-600">Alternating boards with small gaps allow airflow while maintaining privacy. Good for windy areas.</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-5">
          <h3 className="font-semibold text-gray-900 mb-2">Horizontal Slat</h3>
          <p className="text-gray-600">Modern, contemporary look with horizontal boards. Increasingly popular. Works great with composite materials.</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">Height Regulations</h2>
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-10">
        <p className="text-yellow-700 mb-3">Most privacy fences are 6 feet tall. Here&apos;s what you need to know about height rules:</p>
        <ul className="space-y-2 text-yellow-700">
          <li>• <strong>Backyard:</strong> 6 feet is standard and usually allowed without a permit</li>
          <li>• <strong>Front yard:</strong> Usually limited to 3-4 feet (privacy fences rarely allowed)</li>
          <li>• <strong>8-foot fences:</strong> Sometimes allowed with a permit — check local codes</li>
          <li>• <strong>HOAs:</strong> May restrict height to less than city maximums</li>
        </ul>
        <p className="text-yellow-700 mt-3">See our <Link href="/guides/fence-permits" className="text-yellow-800 underline font-medium">complete permit guide</Link> for more details.</p>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">What Affects Privacy Fence Cost?</h2>
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-10">
        <ul className="space-y-3 text-gray-700">
          <li><strong>Material choice:</strong> The biggest factor. Vinyl and composite cost 30-50% more than wood.</li>
          <li><strong>Fence height:</strong> An 8-foot fence costs roughly 30% more than a 6-foot fence.</li>
          <li><strong>Terrain:</strong> Slopes, rocks, tree roots, and uneven ground increase labor costs significantly.</li>
          <li><strong>Gate count:</strong> Each gate adds $150-$500 depending on size and hardware.</li>
          <li><strong>Old fence removal:</strong> Removing an existing fence adds $3-5 per linear foot.</li>
          <li><strong>Your location:</strong> Labor costs vary significantly by region. Coastal and urban areas cost more.</li>
        </ul>
      </div>

      <div className="bg-green-50 rounded-xl p-8 text-center mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Get Privacy Fence Quotes</h2>
        <p className="text-gray-600 mb-6">Compare quotes from top-rated fence contractors in your area. Most offer free estimates.</p>
        <Link href="/search" className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
          Find Contractors Near You
        </Link>
      </div>

      <div className="text-sm text-gray-500">
        <p>Related guides: <Link href="/guides/wood-vs-vinyl" className="text-green-600 hover:underline">Wood vs Vinyl</Link> · <Link href="/guides/fence-cost" className="text-green-600 hover:underline">Cost Guide</Link> · <Link href="/guides/fence-permits" className="text-green-600 hover:underline">Permit Guide</Link></p>
      </div>

      <RelatedLinks pageType="guide" guideSlug="privacy-fence" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'Privacy Fence Ideas, Costs & Installation Guide (2026)',
        description: 'Complete guide to privacy fences including materials, costs, styles, and height regulations.',
        publisher: { '@type': 'Organization', name: 'FenceFind', url: 'https://getfencefind.com' },
      })}} />
    </div>
  );
}
