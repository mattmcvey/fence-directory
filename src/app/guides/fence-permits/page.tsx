import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Do You Need a Permit to Build a Fence? State-by-State Guide | FenceFind',
  description: 'Fence permit requirements explained. Learn about height limits, setback rules, HOA regulations, and how to check local codes before building your fence.',
  keywords: 'fence permit, do I need a permit for a fence, fence regulations, fence height limit, fence setback requirements',
};

export default function FencePermitsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Do You Need a Permit to Build a Fence?</h1>
      <p className="text-xl text-gray-600 mb-8">A guide to fence permits, height restrictions, and local regulations.</p>

      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-10">
        <p className="text-yellow-800 font-semibold text-lg mb-2">⚠️ Important</p>
        <p className="text-yellow-700">Fence regulations vary significantly by city, county, and HOA. This guide covers common rules, but <strong>always check with your local building department</strong> before starting your project. A good fence contractor will know your local codes.</p>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">The Short Answer</h2>
      <p className="text-gray-700 mb-6">In most areas, you <strong>do</strong> need a permit if your fence exceeds a certain height (usually 6 feet for backyard, 4 feet for front yard). Even where permits aren&apos;t required, there are usually setback rules, height limits, and material restrictions you need to follow.</p>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Fence Regulations</h2>
      <div className="space-y-4 mb-10">
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="font-semibold text-gray-900 mb-2">📏 Height Limits</h3>
          <ul className="space-y-1 text-gray-700">
            <li>• <strong>Front yard:</strong> Typically 3–4 feet maximum</li>
            <li>• <strong>Side yard:</strong> Usually 4–6 feet</li>
            <li>• <strong>Backyard:</strong> Usually 6 feet maximum, sometimes 8 feet with a permit</li>
            <li>• <strong>Corner lots:</strong> Often have &quot;sight triangle&quot; restrictions near intersections</li>
          </ul>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="font-semibold text-gray-900 mb-2">📐 Setback Requirements</h3>
          <ul className="space-y-1 text-gray-700">
            <li>• Most cities require fences be set back 2–6 inches from the property line</li>
            <li>• Some require 1–2 feet from sidewalks or streets</li>
            <li>• Utility easements may prevent fence installation in certain areas</li>
            <li>• Swimming pool fences have specific distance and height requirements</li>
          </ul>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="font-semibold text-gray-900 mb-2">🏘️ HOA Rules</h3>
          <ul className="space-y-1 text-gray-700">
            <li>• HOAs often restrict fence materials (no chain link, specific colors only)</li>
            <li>• May require architectural review board approval before building</li>
            <li>• Height restrictions are often stricter than city codes</li>
            <li>• Some HOAs prohibit front-yard fences entirely</li>
            <li>• <strong>Check your CC&Rs before anything else</strong> — HOA fines can be expensive</li>
          </ul>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="font-semibold text-gray-900 mb-2">🏊 Pool Fence Requirements</h3>
          <ul className="space-y-1 text-gray-700">
            <li>• Most states require a fence around swimming pools</li>
            <li>• Minimum height is typically 4 feet (some areas require 5 feet)</li>
            <li>• Self-closing, self-latching gates are usually required</li>
            <li>• Fence must not have footholds for climbing (no horizontal rails)</li>
          </ul>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">&quot;Good Neighbor&quot; Rules</h2>
      <div className="bg-gray-50 rounded-xl p-6 mb-10">
        <p className="text-gray-700 mb-3">Many areas have &quot;good neighbor&quot; or &quot;good side out&quot; laws requiring the finished side of the fence to face your neighbor. Some specifics:</p>
        <ul className="space-y-2 text-gray-700">
          <li>• <strong>Notification requirements:</strong> Some cities require you to notify adjacent property owners 30 days before building</li>
          <li>• <strong>Shared fences:</strong> If the fence sits exactly on the property line, both neighbors may share maintenance costs</li>
          <li>• <strong>Spite fence laws:</strong> Some states have laws against fences built solely to annoy a neighbor (usually fences over 10 feet)</li>
        </ul>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Check Your Local Requirements</h2>
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-10">
        <ol className="space-y-3 text-gray-700 list-decimal list-inside">
          <li><strong>Check your HOA CC&Rs first</strong> — if you have an HOA, their rules override city minimums</li>
          <li><strong>Call your city/county building department</strong> — ask about fence permits, height limits, and setback requirements</li>
          <li><strong>Get a property survey</strong> — know your exact property lines before building. A surveyor costs $300-500 but prevents costly disputes</li>
          <li><strong>Call 811 before digging</strong> — this is free and legally required. They&apos;ll mark underground utilities</li>
          <li><strong>Talk to your neighbors</strong> — even if not required, it prevents conflicts and they may split the cost</li>
        </ol>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">What Happens If You Build Without a Permit?</h2>
      <div className="bg-red-50 rounded-xl p-6 mb-10">
        <ul className="space-y-2 text-red-700">
          <li>• <strong>Fines</strong> — typically $100-$1,000 depending on your municipality</li>
          <li>• <strong>Forced removal</strong> — you may be required to tear down the fence at your expense</li>
          <li>• <strong>Selling problems</strong> — unpermitted work can complicate home sales and inspections</li>
          <li>• <strong>Neighbor disputes</strong> — your neighbor can report the fence, leading to all of the above</li>
          <li>• <strong>Insurance issues</strong> — if the fence causes damage, your homeowner&apos;s insurance may not cover it</li>
        </ul>
      </div>

      <div className="bg-green-50 rounded-xl p-8 text-center mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Let a Pro Handle the Permits</h2>
        <p className="text-gray-600 mb-6">Most professional fence contractors handle permits as part of the job. They know local codes and will make sure your fence is compliant.</p>
        <Link href="/search" className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
          Find Licensed Contractors Near You
        </Link>
      </div>

      <div className="text-sm text-gray-500">
        <p>Related guides: <Link href="/guides/fence-cost" className="text-green-600 hover:underline">Fence Cost Guide</Link> · <Link href="/guides/getting-quotes" className="text-green-600 hover:underline">Getting Quotes</Link> · <Link href="/guides/how-long-fence-installation" className="text-green-600 hover:underline">Installation Timeline</Link></p>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'Do You Need a Permit to Build a Fence? State-by-State Guide',
        description: 'Fence permit requirements, height limits, setback rules, and HOA regulations explained.',
        publisher: { '@type': 'Organization', name: 'FenceFind', url: 'https://getfencefind.com' },
      })}} />
    </div>
  );
}
