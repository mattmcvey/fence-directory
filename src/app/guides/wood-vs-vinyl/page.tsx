import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Wood vs Vinyl Fence: Pros, Cons & Cost Comparison (2026) | FenceFind',
  description: 'Wood vs vinyl fence comparison. Compare costs ($15-35 vs $20-40 per foot), durability, maintenance, appearance, and climate performance to pick the right fence.',
  keywords: 'wood vs vinyl fence, vinyl fence vs wood, fence material comparison, wood fence cost, vinyl fence cost',
};

export default function WoodVsVinylPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Wood vs Vinyl Fence: Pros, Cons & Cost Comparison (2026)
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        The two most popular residential fence materials go head-to-head. Here&apos;s how to decide.
      </p>

      <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-10">
        <p className="text-green-800 font-semibold text-lg mb-2">💡 Quick Answer</p>
        <p className="text-green-700">
          <strong>Choose wood</strong> if you want a natural look, lower upfront cost, and don&apos;t mind annual maintenance.
          <strong> Choose vinyl</strong> if you want zero maintenance, longer lifespan, and can afford the higher upfront cost.
        </p>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-6">Side-by-Side Comparison</h2>
      <div className="overflow-x-auto mb-10">
        <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left p-4 font-semibold text-gray-900">Factor</th>
              <th className="text-left p-4 font-semibold text-gray-900">🪵 Wood</th>
              <th className="text-left p-4 font-semibold text-gray-900">🏗️ Vinyl</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr><td className="p-4 font-medium">Cost per linear foot</td><td className="p-4">$15–$35</td><td className="p-4">$20–$40</td></tr>
            <tr><td className="p-4 font-medium">150 ft fence total</td><td className="p-4">$2,250–$5,250</td><td className="p-4">$3,000–$6,000</td></tr>
            <tr><td className="p-4 font-medium">Lifespan</td><td className="p-4">15–20 years</td><td className="p-4">20–30 years</td></tr>
            <tr><td className="p-4 font-medium">Maintenance</td><td className="p-4">Stain/seal every 2-3 years</td><td className="p-4">Occasional rinse with hose</td></tr>
            <tr><td className="p-4 font-medium">Durability</td><td className="p-4">Can rot, warp, attract insects</td><td className="p-4">Won&apos;t rot, warp, or attract pests</td></tr>
            <tr><td className="p-4 font-medium">Appearance</td><td className="p-4">Natural, warm, customizable</td><td className="p-4">Clean, uniform, limited styles</td></tr>
            <tr><td className="p-4 font-medium">Color options</td><td className="p-4">Any stain or paint color</td><td className="p-4">White, tan, gray (can&apos;t paint)</td></tr>
            <tr><td className="p-4 font-medium">Wind resistance</td><td className="p-4">Good (with proper posts)</td><td className="p-4">Moderate (can crack in extreme wind)</td></tr>
            <tr><td className="p-4 font-medium">Eco-friendly</td><td className="p-4">Biodegradable, renewable</td><td className="p-4">PVC is not biodegradable</td></tr>
            <tr><td className="p-4 font-medium">Resale value</td><td className="p-4">Good (if maintained)</td><td className="p-4">Good (buyers like low maintenance)</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">Wood Fence: Pros & Cons</h2>
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="bg-green-50 rounded-lg p-6">
          <h3 className="font-semibold text-green-800 mb-3">✅ Pros</h3>
          <ul className="space-y-2 text-green-700">
            <li>• Lower upfront cost — 20-30% cheaper than vinyl</li>
            <li>• Natural, warm aesthetic that many homeowners prefer</li>
            <li>• Fully customizable — any height, style, stain, or paint color</li>
            <li>• Easy to repair — replace individual boards instead of whole panels</li>
            <li>• Environmentally friendly — biodegradable and renewable</li>
            <li>• Stronger in high-wind areas when properly installed</li>
          </ul>
        </div>
        <div className="bg-red-50 rounded-lg p-6">
          <h3 className="font-semibold text-red-800 mb-3">❌ Cons</h3>
          <ul className="space-y-2 text-red-700">
            <li>• Requires staining or sealing every 2-3 years</li>
            <li>• Can rot, warp, or split over time</li>
            <li>• Vulnerable to termites and carpenter ants</li>
            <li>• Shorter lifespan (15-20 years vs 20-30 for vinyl)</li>
            <li>• Ongoing maintenance costs add up over time</li>
            <li>• Moisture damage in humid or wet climates</li>
          </ul>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">Vinyl Fence: Pros & Cons</h2>
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="bg-green-50 rounded-lg p-6">
          <h3 className="font-semibold text-green-800 mb-3">✅ Pros</h3>
          <ul className="space-y-2 text-green-700">
            <li>• Virtually maintenance-free — no painting, staining, or sealing</li>
            <li>• Won&apos;t rot, rust, or attract insects</li>
            <li>• Longer lifespan (20-30 years with warranties to match)</li>
            <li>• Consistent, clean appearance that doesn&apos;t fade</li>
            <li>• Lower total cost of ownership when you factor in maintenance</li>
            <li>• Easy to clean — just rinse with a garden hose</li>
          </ul>
        </div>
        <div className="bg-red-50 rounded-lg p-6">
          <h3 className="font-semibold text-red-800 mb-3">❌ Cons</h3>
          <ul className="space-y-2 text-red-700">
            <li>• Higher upfront cost — 20-30% more than wood</li>
            <li>• Limited color and style options</li>
            <li>• Can&apos;t be painted or stained to change appearance</li>
            <li>• Can crack or shatter in extreme cold</li>
            <li>• Looks &quot;plastic&quot; to some homeowners</li>
            <li>• Panel damage requires replacing entire sections</li>
          </ul>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">Climate Considerations</h2>
      <div className="bg-gray-50 rounded-xl p-6 mb-10">
        <ul className="space-y-3 text-gray-700">
          <li><strong>Hot, dry climates (Arizona, Texas):</strong> Vinyl holds up better — wood dries out and cracks. But vinyl can warp in extreme heat above 120°F.</li>
          <li><strong>Humid, wet climates (Florida, Southeast):</strong> Vinyl wins. Wood rots faster in constant moisture and humidity breeds mold and mildew.</li>
          <li><strong>Cold climates (Northeast, Midwest):</strong> Wood is generally better. Vinyl can become brittle and crack in freezing temperatures. Wood handles freeze-thaw cycles well.</li>
          <li><strong>High-wind areas (coastal, plains):</strong> Wood is stronger. Vinyl panels can crack under sustained high winds. Wood flexes more before breaking.</li>
        </ul>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">The Real Cost Comparison</h2>
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-10">
        <p className="text-gray-700 mb-4">
          Wood is cheaper upfront, but maintenance costs close the gap over time. Here&apos;s a 20-year cost comparison for a typical 150-foot privacy fence:
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">🪵 Wood (20-year cost)</h3>
            <ul className="space-y-1 text-gray-600">
              <li>Installation: ~$3,750</li>
              <li>Staining (every 3 years, 6x): ~$1,800</li>
              <li>Repairs (boards, posts): ~$600</li>
              <li><strong className="text-gray-900">Total: ~$6,150</strong></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">🏗️ Vinyl (20-year cost)</h3>
            <ul className="space-y-1 text-gray-600">
              <li>Installation: ~$4,500</li>
              <li>Maintenance: ~$0</li>
              <li>Repairs: ~$200</li>
              <li><strong className="text-gray-900">Total: ~$4,700</strong></li>
            </ul>
          </div>
        </div>
        <p className="text-gray-600 mt-4 text-sm">
          Over 20 years, vinyl actually costs <strong>less</strong> than wood when you factor in maintenance. The break-even point is typically around year 7-8.
        </p>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Recommendation</h2>
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-10">
        <p className="text-gray-700 mb-3">There&apos;s no universal winner — it depends on your priorities:</p>
        <ul className="space-y-2 text-gray-700">
          <li>• <strong>Best for budget:</strong> Wood (lower upfront cost)</li>
          <li>• <strong>Best for low maintenance:</strong> Vinyl (set it and forget it)</li>
          <li>• <strong>Best for appearance:</strong> Wood (natural, customizable look)</li>
          <li>• <strong>Best for longevity:</strong> Vinyl (20-30 year lifespan)</li>
          <li>• <strong>Best total value:</strong> Vinyl (cheaper over 20 years)</li>
          <li>• <strong>Best for cold climates:</strong> Wood (handles freeze-thaw better)</li>
        </ul>
      </div>

      <div className="bg-green-50 rounded-xl p-8 text-center mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Get Quotes for Both Materials</h2>
        <p className="text-gray-600 mb-6">The best way to decide? Get quotes from local contractors for both wood and vinyl. Most offer free estimates.</p>
        <Link href="/search" className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
          Find Fence Contractors Near You
        </Link>
      </div>

      <div className="text-sm text-gray-500">
        <p>Related guides: <Link href="/guides/fence-cost" className="text-green-600 hover:underline">Fence Cost Guide</Link> · <Link href="/guides/choosing-material" className="text-green-600 hover:underline">Choosing Materials</Link> · <Link href="/guides/privacy-fence" className="text-green-600 hover:underline">Privacy Fence Guide</Link></p>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'Wood vs Vinyl Fence: Pros, Cons & Cost Comparison (2026)',
        description: 'Comprehensive comparison of wood and vinyl fencing — costs, durability, maintenance, and climate performance.',
        publisher: { '@type': 'Organization', name: 'FenceFind', url: 'https://getfencefind.com' },
      })}} />
    </div>
  );
}
