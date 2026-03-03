import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Fence Repair Guide: Common Issues, DIY vs Pro, Costs (2026) | FenceFind',
  description: 'Fence repair costs $150-$700 on average. Learn about common fence problems, when to DIY vs hire a pro, and whether to repair or replace your fence.',
  keywords: 'fence repair, fence repair cost, how to repair a fence, fence repair near me, fence post repair',
};

export default function FenceRepairPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Fence Repair Guide: Common Issues, DIY vs Pro, Costs</h1>
      <p className="text-xl text-gray-600 mb-8">How to diagnose fence problems and decide whether to fix or replace.</p>

      <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-10">
        <p className="text-green-800 font-semibold text-lg mb-2">💡 Quick Answer</p>
        <p className="text-green-700">Most fence repairs cost <strong>$150–$700</strong>. Replacing a few boards is a simple DIY job. Leaning fences, broken posts, and storm damage usually need a professional.</p>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Fence Problems & Repair Costs</h2>
      <div className="space-y-4 mb-10">
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-gray-900">Broken or Missing Boards</h3>
            <span className="text-green-600 font-medium">$50–$150</span>
          </div>
          <p className="text-gray-600 mb-2">The most common repair. Individual boards crack, warp, or blow off in storms.</p>
          <p className="text-gray-700"><strong>DIY?</strong> Yes — remove old board, measure, cut replacement, nail or screw in place. Easy weekend project.</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-gray-900">Leaning Fence</h3>
            <span className="text-yellow-600 font-medium">$150–$400</span>
          </div>
          <p className="text-gray-600 mb-2">Usually caused by rotting posts, loose soil, or wind damage. Gets worse if ignored.</p>
          <p className="text-gray-700"><strong>DIY?</strong> Maybe — you can brace with steel supports. But if the post is rotted underground, it needs professional replacement.</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-gray-900">Broken/Rotted Post</h3>
            <span className="text-orange-600 font-medium">$200–$500 per post</span>
          </div>
          <p className="text-gray-600 mb-2">The most serious common repair. Posts rot at ground level where moisture collects.</p>
          <p className="text-gray-700"><strong>DIY?</strong> Difficult — requires digging out concrete footing, setting new post, realigning panels. Hire a pro.</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-gray-900">Sagging Gate</h3>
            <span className="text-green-600 font-medium">$100–$300</span>
          </div>
          <p className="text-gray-600 mb-2">Gates sag over time from weight and use. Hardware loosens, hinges bend, posts shift.</p>
          <p className="text-gray-700"><strong>DIY?</strong> Yes — install an anti-sag gate kit ($20-40 at any hardware store). Takes 30 minutes.</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-gray-900">Storm/Wind Damage</h3>
            <span className="text-red-600 font-medium">$200–$1,000+</span>
          </div>
          <p className="text-gray-600 mb-2">High winds can knock down entire sections. Falling trees can destroy fence runs.</p>
          <p className="text-gray-700"><strong>DIY?</strong> No — usually needs multiple posts and panels replaced. Check your homeowner&apos;s insurance — storm damage may be covered.</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">Repair vs Replace: When to Call It</h2>
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="bg-green-50 rounded-lg p-6">
          <h3 className="font-semibold text-green-800 mb-3">🔧 Repair When:</h3>
          <ul className="space-y-2 text-green-700">
            <li>• Damage is localized (1-2 sections)</li>
            <li>• Fence is less than 10 years old</li>
            <li>• Posts are still solid</li>
            <li>• Repair cost is less than 50% of replacement</li>
            <li>• You&apos;re not planning to sell soon</li>
          </ul>
        </div>
        <div className="bg-red-50 rounded-lg p-6">
          <h3 className="font-semibold text-red-800 mb-3">🔄 Replace When:</h3>
          <ul className="space-y-2 text-red-700">
            <li>• Multiple posts are rotted</li>
            <li>• More than 20% of boards are damaged</li>
            <li>• Fence is over 15 years old</li>
            <li>• Repair costs exceed 50% of replacement</li>
            <li>• You&apos;re planning to sell your home</li>
            <li>• You want to upgrade material or style</li>
          </ul>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">Preventive Maintenance Tips</h2>
      <div className="bg-gray-50 rounded-xl p-6 mb-10">
        <ul className="space-y-2 text-gray-700">
          <li>• <strong>Inspect annually:</strong> Walk the fence line every spring. Catch small problems before they become big ones.</li>
          <li>• <strong>Keep soil away from wood:</strong> Soil contact accelerates rot. Maintain a 2-inch gap between ground and bottom board.</li>
          <li>• <strong>Stain/seal wood fences:</strong> Every 2-3 years. This is the #1 thing you can do to extend fence life.</li>
          <li>• <strong>Clear vegetation:</strong> Vines, bushes, and trees pushing against fences cause damage. Keep plants trimmed back.</li>
          <li>• <strong>Fix small problems fast:</strong> A loose board becomes a missing board. A small lean becomes a fallen section.</li>
        </ul>
      </div>

      <div className="bg-green-50 rounded-xl p-8 text-center mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Need a Fence Repair Pro?</h2>
        <p className="text-gray-600 mb-6">Find fence contractors in your area who handle repairs and replacements.</p>
        <Link href="/search" className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">Find Contractors Near You</Link>
      </div>

      <div className="text-sm text-gray-500">
        <p>Related guides: <Link href="/guides/fence-cost" className="text-green-600 hover:underline">Fence Cost Guide</Link> · <Link href="/guides/fence-roi" className="text-green-600 hover:underline">Fence ROI</Link> · <Link href="/guides/getting-quotes" className="text-green-600 hover:underline">Getting Quotes</Link></p>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'Fence Repair Guide: Common Issues, DIY vs Pro, Costs',
        description: 'How to diagnose and fix common fence problems, with cost estimates and DIY guidance.',
        publisher: { '@type': 'Organization', name: 'FenceFind', url: 'https://getfencefind.com' },
      })}} />
    </div>
  );
}
