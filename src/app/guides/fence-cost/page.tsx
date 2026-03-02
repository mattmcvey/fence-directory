import { Metadata } from 'next';
import Link from 'next/link';
import SearchBar from '@/components/SearchBar';

export const metadata: Metadata = {
  title: 'Fence Installation Cost Guide 2026 — Average Prices by Material | FenceFind',
  description: 'How much does a fence cost in 2026? Average fence installation costs by material: wood ($15-35/ft), vinyl ($20-40/ft), chain link ($8-18/ft), and more. Get free estimates.',
  keywords: 'fence cost, fence installation cost, how much does a fence cost, wood fence cost, vinyl fence cost, chain link fence cost, fence price per foot',
};

const costData = [
  { material: 'Wood (Privacy)', perFoot: '$15–$35', total150: '$2,250–$5,250', total200: '$3,000–$7,000', lifespan: '15–20 years', pros: 'Classic look, customizable, relatively affordable', cons: 'Requires maintenance, can rot/warp' },
  { material: 'Vinyl/PVC', perFoot: '$20–$40', total150: '$3,000–$6,000', total200: '$4,000–$8,000', lifespan: '20–30 years', pros: 'Low maintenance, no painting/staining, durable', cons: 'Higher upfront cost, limited colors' },
  { material: 'Chain Link', perFoot: '$8–$18', total150: '$1,200–$2,700', total200: '$1,600–$3,600', lifespan: '20–30 years', pros: 'Most affordable, durable, low maintenance', cons: 'No privacy, industrial look' },
  { material: 'Aluminum', perFoot: '$20–$35', total150: '$3,000–$5,250', total200: '$4,000–$7,000', lifespan: '30+ years', pros: 'Elegant look, rust-resistant, low maintenance', cons: 'Less privacy, not as strong' },
  { material: 'Wrought Iron', perFoot: '$25–$50', total150: '$3,750–$7,500', total200: '$5,000–$10,000', lifespan: '50+ years', pros: 'Extremely durable, classic appearance, security', cons: 'Expensive, can rust, heavy' },
  { material: 'Composite', perFoot: '$25–$45', total150: '$3,750–$6,750', total200: '$5,000–$9,000', lifespan: '25–30 years', pros: 'Low maintenance, eco-friendly, looks like wood', cons: 'Most expensive option' },
];

export default function FenceCostGuidePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Fence Installation Cost Guide (2026)
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Average costs by material, project size, and factors that affect your total price.
      </p>

      <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-10">
        <p className="text-green-800 font-semibold text-lg mb-2">💡 Quick Answer</p>
        <p className="text-green-700">
          Most homeowners spend <strong>$1,800 to $9,500</strong> on fence installation, with the national
          average around <strong>$4,500</strong> for a standard 150-linear-foot privacy fence. The biggest
          factor is material choice.
        </p>
      </div>

      {/* Cost table */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Cost by Fence Material</h2>
      <div className="overflow-x-auto mb-12">
        <table className="w-full bg-white rounded-xl shadow-sm border border-gray-200">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left py-4 px-4 font-semibold text-gray-900">Material</th>
              <th className="text-left py-4 px-4 font-semibold text-gray-900">Per Linear Foot</th>
              <th className="text-left py-4 px-4 font-semibold text-gray-900">150 ft Yard</th>
              <th className="text-left py-4 px-4 font-semibold text-gray-900">200 ft Yard</th>
              <th className="text-left py-4 px-4 font-semibold text-gray-900">Lifespan</th>
            </tr>
          </thead>
          <tbody>
            {costData.map((row, i) => (
              <tr key={row.material} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="py-4 px-4 font-medium text-gray-900">{row.material}</td>
                <td className="py-4 px-4 text-gray-700">{row.perFoot}</td>
                <td className="py-4 px-4 text-gray-700">{row.total150}</td>
                <td className="py-4 px-4 text-gray-700">{row.total200}</td>
                <td className="py-4 px-4 text-gray-500">{row.lifespan}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Material details */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Material Pros & Cons</h2>
      <div className="space-y-6 mb-12">
        {costData.map((row) => (
          <div key={row.material} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-3">{row.material} Fence</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-900">Cost:</span>
                <span className="text-gray-600 ml-2">{row.perFoot} per linear foot installed</span>
              </div>
              <div>
                <span className="font-medium text-green-600">Pros:</span>
                <span className="text-gray-600 ml-2">{row.pros}</span>
              </div>
              <div>
                <span className="font-medium text-red-500">Cons:</span>
                <span className="text-gray-600 ml-2">{row.cons}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Factors */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Factors That Affect Fence Cost</h2>
      <div className="prose prose-lg max-w-none text-gray-700 mb-12">
        <ul>
          <li><strong>Fence height:</strong> Standard 6-foot privacy fences cost more than 4-foot fences. Add 20-40% for taller options.</li>
          <li><strong>Terrain:</strong> Slopes, rocks, and tree roots increase labor costs by 10-30%.</li>
          <li><strong>Permits:</strong> Most cities require a fence permit ($20-400 depending on location).</li>
          <li><strong>Old fence removal:</strong> Removing an existing fence adds $3-5 per linear foot.</li>
          <li><strong>Gates:</strong> A standard walk gate adds $150-500. Driveway gates run $500-4,000+.</li>
          <li><strong>Labor rates:</strong> Vary significantly by region. Urban areas cost 15-25% more than rural.</li>
          <li><strong>Season:</strong> Spring and summer are peak season — you may get better prices in fall/winter.</li>
        </ul>
      </div>

      {/* Tips */}
      <div className="bg-gray-900 text-white rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-bold mb-4">5 Tips to Save Money on Fence Installation</h2>
        <ol className="space-y-3 text-gray-300">
          <li><strong className="text-white">1. Get 3+ quotes.</strong> Prices vary 20-50% between contractors for the same job.</li>
          <li><strong className="text-white">2. Schedule off-season.</strong> Late fall and winter typically have lower rates and faster availability.</li>
          <li><strong className="text-white">3. Check for shared fence laws.</strong> In many states, neighbors split the cost of a boundary fence.</li>
          <li><strong className="text-white">4. Consider materials carefully.</strong> Vinyl costs more upfront but saves on maintenance costs over time.</li>
          <li><strong className="text-white">5. Ask about financing.</strong> Many contractors offer payment plans for larger projects.</li>
        </ol>
      </div>

      {/* CTA */}
      <div className="text-center bg-green-50 rounded-xl p-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Your Fence Quote?</h2>
        <p className="text-gray-600 mb-6">Find licensed fence contractors in your area and request free estimates.</p>
        <SearchBar size="lg" className="mx-auto" />
      </div>

      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Fence Installation Cost Guide 2026',
            description: 'Average fence installation costs by material type including wood, vinyl, chain link, and more.',
            author: { '@type': 'Organization', name: 'FenceFind' },
            publisher: { '@type': 'Organization', name: 'FenceFind' },
            datePublished: '2026-03-01',
            dateModified: '2026-03-01',
          }),
        }}
      />
    </div>
  );
}
