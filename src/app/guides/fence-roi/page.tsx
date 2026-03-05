import { Metadata } from 'next';
import Link from 'next/link';
import RelatedLinks from '@/components/RelatedLinks';

export const metadata: Metadata = {
  title: 'Does a Fence Increase Home Value? ROI Guide (2026) | FenceFind',
  description: 'Fences return 50-70% of their cost at resale. Learn which fence types add the most home value, what appraisers look for, and how fences impact curb appeal.',
  keywords: 'does a fence increase home value, fence ROI, fence property value, fence resale value, fence investment',
};

export default function FenceRoiPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Does a Fence Increase Home Value? ROI Guide (2026)</h1>
      <p className="text-xl text-gray-600 mb-8">What the data says about fences and property values.</p>

      <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-10">
        <p className="text-green-800 font-semibold text-lg mb-2">💡 Quick Answer</p>
        <p className="text-green-700">Yes, a fence typically increases home value. Most fences return <strong>50–70% of their cost</strong> at resale. A $5,000 fence might add $2,500–$3,500 to your home&apos;s value. The real ROI often comes from making your home <strong>sell faster</strong>, not just for more.</p>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">ROI by Fence Type</h2>
      <div className="overflow-x-auto mb-10">
        <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
          <thead><tr className="bg-gray-50">
            <th className="text-left p-4 font-semibold">Fence Type</th>
            <th className="text-left p-4 font-semibold">Avg Cost</th>
            <th className="text-left p-4 font-semibold">Estimated ROI</th>
            <th className="text-left p-4 font-semibold">Value Added</th>
          </tr></thead>
          <tbody className="divide-y divide-gray-100">
            <tr><td className="p-4">Wood privacy</td><td className="p-4">$3,750</td><td className="p-4">50–65%</td><td className="p-4">$1,875–$2,438</td></tr>
            <tr><td className="p-4">Vinyl privacy</td><td className="p-4">$4,500</td><td className="p-4">55–70%</td><td className="p-4">$2,475–$3,150</td></tr>
            <tr><td className="p-4">Ornamental iron/aluminum</td><td className="p-4">$4,000</td><td className="p-4">60–70%</td><td className="p-4">$2,400–$2,800</td></tr>
            <tr><td className="p-4">Wrought iron</td><td className="p-4">$6,000</td><td className="p-4">55–65%</td><td className="p-4">$3,300–$3,900</td></tr>
            <tr><td className="p-4">Chain link</td><td className="p-4">$2,000</td><td className="p-4">30–50%</td><td className="p-4">$600–$1,000</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">What Appraisers Look For</h2>
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-10">
        <p className="text-gray-700 mb-3">Home appraisers consider fences as part of &quot;site improvements.&quot; Here&apos;s what they evaluate:</p>
        <ul className="space-y-2 text-gray-700">
          <li>• <strong>Condition:</strong> A well-maintained fence adds value. A rotting, leaning fence <em>hurts</em> value.</li>
          <li>• <strong>Material quality:</strong> Wood, vinyl, and ornamental metal score highest. Chain link adds minimal value.</li>
          <li>• <strong>Functionality:</strong> Does it provide real privacy, security, or pet containment? Functional fences are worth more.</li>
          <li>• <strong>Aesthetic fit:</strong> Does the fence match the neighborhood and home style? A wrought iron fence on a modest ranch home may not add proportional value.</li>
          <li>• <strong>Neighborhood norms:</strong> If most homes have fences, not having one can hurt you. If none do, a fence may not add as much.</li>
        </ul>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">The Hidden Value: Selling Faster</h2>
      <div className="bg-gray-50 rounded-xl p-6 mb-10">
        <p className="text-gray-700 mb-3">The biggest ROI from a fence often isn&apos;t the dollar amount — it&apos;s how much faster your home sells:</p>
        <ul className="space-y-2 text-gray-700">
          <li>• <strong>Families with kids:</strong> A fenced backyard is often a requirement, not a preference. You instantly qualify for more buyers.</li>
          <li>• <strong>Pet owners:</strong> Same story. A fenced yard eliminates a major objection.</li>
          <li>• <strong>Privacy-conscious buyers:</strong> In neighborhoods with close-together homes, privacy fencing is extremely desirable.</li>
          <li>• <strong>Curb appeal:</strong> An attractive fence (especially ornamental) makes a strong first impression from the street.</li>
        </ul>
        <p className="text-gray-700 mt-3">A home that sells 2 weeks faster saves you mortgage payments, utilities, and carrying costs. That&apos;s real money.</p>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">Best Fences for Resale Value</h2>
      <div className="space-y-3 mb-10">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-gray-700"><strong>🥇 Best overall:</strong> Vinyl privacy fence — low maintenance appeals to buyers, clean look, highest ROI percentage.</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-gray-700"><strong>🥈 Best for curb appeal:</strong> Ornamental aluminum or iron — transforms the look of a property from the street.</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-gray-700"><strong>🥉 Best budget option:</strong> Cedar wood privacy fence — good ROI at a lower price point. Just keep it stained.</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-gray-700"><strong>⚠️ Avoid for resale:</strong> Chain link — functional but can actually make a property look less appealing to buyers.</p>
        </div>
      </div>

      <div className="bg-green-50 rounded-xl p-8 text-center mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Invest in Your Property</h2>
        <p className="text-gray-600 mb-6">Get quotes from top-rated fence contractors who can recommend the best option for your home&apos;s value.</p>
        <Link href="/search" className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">Find Contractors Near You</Link>
      </div>

      <div className="text-sm text-gray-500">
        <p>Related guides: <Link href="/guides/fence-cost" className="text-green-600 hover:underline">Fence Cost Guide</Link> · <Link href="/guides/choosing-material" className="text-green-600 hover:underline">Choosing Materials</Link> · <Link href="/guides/wood-vs-vinyl" className="text-green-600 hover:underline">Wood vs Vinyl</Link></p>
      </div>

      <RelatedLinks pageType="guide" guideSlug="fence-roi" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'Does a Fence Increase Home Value? ROI Guide (2026)',
        description: 'How fences affect property values, ROI by fence type, and what makes a fence add the most resale value.',
        publisher: { '@type': 'Organization', name: 'FenceFind', url: 'https://getfencefind.com' },
      })}} />
    </div>
  );
}
