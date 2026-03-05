import { Metadata } from 'next';
import Link from 'next/link';
import RelatedLinks from '@/components/RelatedLinks';

export const metadata: Metadata = {
  title: 'Chain Link Fence Cost, Installation & Buying Guide (2026) | FenceFind',
  description: 'Chain link fence costs $8-18 per foot installed. Learn about gauges, coatings, privacy options, residential vs commercial, and installation process.',
  keywords: 'chain link fence cost, chain link fence installation, chain link fence, chain link fence price, chain link fence per foot',
};

export default function ChainLinkFencePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Chain Link Fence Cost, Installation & Buying Guide</h1>
      <p className="text-xl text-gray-600 mb-8">The most affordable fencing option — what to know before you buy.</p>

      <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-10">
        <p className="text-green-800 font-semibold text-lg mb-2">💡 Quick Answer</p>
        <p className="text-green-700">Chain link fencing costs <strong>$8–$18 per linear foot</strong> installed, or <strong>$1,200–$2,700</strong> for 150 feet. It&apos;s the most affordable fence type, lasts 20-30 years, and requires virtually no maintenance.</p>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">Cost Breakdown</h2>
      <div className="overflow-x-auto mb-10">
        <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
          <thead><tr className="bg-gray-50">
            <th className="text-left p-4 font-semibold">Type</th>
            <th className="text-left p-4 font-semibold">Per Foot</th>
            <th className="text-left p-4 font-semibold">150 ft Total</th>
          </tr></thead>
          <tbody className="divide-y divide-gray-100">
            <tr><td className="p-4">Standard galvanized (4 ft)</td><td className="p-4">$8–$12</td><td className="p-4">$1,200–$1,800</td></tr>
            <tr><td className="p-4">Standard galvanized (6 ft)</td><td className="p-4">$12–$18</td><td className="p-4">$1,800–$2,700</td></tr>
            <tr><td className="p-4">Vinyl-coated (black/green)</td><td className="p-4">$12–$22</td><td className="p-4">$1,800–$3,300</td></tr>
            <tr><td className="p-4">With privacy slats</td><td className="p-4">$15–$25</td><td className="p-4">$2,250–$3,750</td></tr>
            <tr><td className="p-4">Commercial grade</td><td className="p-4">$15–$30</td><td className="p-4">$2,250–$4,500</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Wire Gauge</h2>
      <div className="bg-gray-50 rounded-xl p-6 mb-10">
        <p className="text-gray-700 mb-3">Wire gauge determines the thickness and strength of the mesh. <strong>Lower gauge = thicker wire = stronger fence.</strong></p>
        <ul className="space-y-2 text-gray-700">
          <li>• <strong>11 gauge:</strong> Standard residential. Good for yards, pet containment, property lines.</li>
          <li>• <strong>9 gauge:</strong> Heavy-duty residential or light commercial. Better for larger dogs or higher security.</li>
          <li>• <strong>6 gauge:</strong> Commercial/industrial. Schools, parks, construction sites, high-security areas.</li>
        </ul>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">Coatings & Finishes</h2>
      <div className="grid md:grid-cols-2 gap-4 mb-10">
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="font-semibold text-gray-900 mb-2">Galvanized (Silver)</h3>
          <p className="text-gray-600">Standard zinc coating. Most affordable. Can develop a dull gray patina over time. Perfectly functional for 20+ years.</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="font-semibold text-gray-900 mb-2">Vinyl-Coated (Black/Green)</h3>
          <p className="text-gray-600">PVC coating over galvanized wire. Looks better, blends with landscaping, and provides extra corrosion protection. Worth the 20-30% premium.</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">Adding Privacy to Chain Link</h2>
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-10">
        <p className="text-gray-700 mb-3">Chain link doesn&apos;t offer privacy by default, but you have options:</p>
        <ul className="space-y-2 text-gray-700">
          <li>• <strong>Privacy slats:</strong> Woven into the mesh. Available in multiple colors. Add $3-7/ft. Most popular option.</li>
          <li>• <strong>Privacy screen/mesh:</strong> Zip-tied to the fence. Cheaper ($1-3/ft) but less durable and can look cheap.</li>
          <li>• <strong>Hedge row:</strong> Plant shrubs along the fence line. Natural look but takes years to fill in.</li>
          <li>• <strong>Bamboo rolls:</strong> Zip-tied to the fence. Natural aesthetic for $2-4/ft. Lasts 3-5 years outdoors.</li>
        </ul>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">Pros & Cons</h2>
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="bg-green-50 rounded-lg p-6">
          <h3 className="font-semibold text-green-800 mb-3">✅ Pros</h3>
          <ul className="space-y-2 text-green-700">
            <li>• Most affordable fence type by far</li>
            <li>• Extremely durable — 20-30 year lifespan</li>
            <li>• Virtually no maintenance required</li>
            <li>• Quick installation (often 1 day)</li>
            <li>• Doesn&apos;t block light or airflow</li>
            <li>• Great for pet containment</li>
          </ul>
        </div>
        <div className="bg-red-50 rounded-lg p-6">
          <h3 className="font-semibold text-red-800 mb-3">❌ Cons</h3>
          <ul className="space-y-2 text-red-700">
            <li>• No privacy (without add-ons)</li>
            <li>• Industrial/utilitarian appearance</li>
            <li>• Doesn&apos;t add much to property value</li>
            <li>• HOAs often prohibit them</li>
            <li>• Can sag over time without proper tension</li>
            <li>• Sharp edges on top rail without caps</li>
          </ul>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">When Chain Link Makes Sense</h2>
      <div className="bg-gray-50 rounded-xl p-6 mb-10">
        <ul className="space-y-2 text-gray-700">
          <li>• <strong>Pet containment</strong> — affordable way to keep dogs in the yard</li>
          <li>• <strong>Large properties</strong> — when you need to fence a lot of linear footage on a budget</li>
          <li>• <strong>Temporary fencing</strong> — construction sites, events, short-term use</li>
          <li>• <strong>Backyard boundaries</strong> — when privacy isn&apos;t a concern</li>
          <li>• <strong>Commercial/industrial</strong> — parking lots, storage areas, sports fields</li>
        </ul>
      </div>

      <div className="bg-green-50 rounded-xl p-8 text-center mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Get Chain Link Fence Quotes</h2>
        <p className="text-gray-600 mb-6">Find contractors who install chain link fencing in your area.</p>
        <Link href="/search" className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">Find Contractors Near You</Link>
      </div>

      <div className="text-sm text-gray-500">
        <p>Related guides: <Link href="/guides/fence-cost" className="text-green-600 hover:underline">Cost Guide</Link> · <Link href="/guides/privacy-fence" className="text-green-600 hover:underline">Privacy Fence Guide</Link> · <Link href="/guides/choosing-material" className="text-green-600 hover:underline">Choosing Materials</Link></p>
      </div>

      <RelatedLinks pageType="guide" guideSlug="chain-link-fence" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'Chain Link Fence Cost, Installation & Buying Guide',
        description: 'Complete guide to chain link fencing — costs, gauges, coatings, privacy options, and installation.',
        publisher: { '@type': 'Organization', name: 'FenceFind', url: 'https://getfencefind.com' },
      })}} />
    </div>
  );
}
