import { Metadata } from 'next';
import SearchBar from '@/components/SearchBar';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'How to Choose the Right Fence Material — Complete Guide | FenceFind',
  description: 'Wood vs vinyl vs chain link vs aluminum: which fence material is best for your home? Compare durability, cost, maintenance, and appearance.',
  keywords: 'best fence material, wood vs vinyl fence, fence material comparison, which fence should I get',
};

const materials = [
  {
    name: 'Wood',
    emoji: '🪵',
    bestFor: 'Privacy fences, classic aesthetics, budget-friendly projects',
    climate: 'Best in dry to moderate climates. Treat or stain for humid/rainy areas.',
    maintenance: 'Stain or seal every 2-3 years. Inspect for rot, warping, and insect damage annually.',
    lifespan: '15-20 years (cedar/redwood last longer)',
    costRange: '$15-35/ft installed',
    rating: { privacy: 5, durability: 3, maintenance: 2, value: 4, appearance: 5 },
    description: 'Wood remains the most popular fencing material in America, and for good reason. Cedar and redwood offer natural rot resistance and beautiful grain patterns. Pine is the budget option but requires more maintenance. Wood fences can be stained or painted any color and built to virtually any design.',
  },
  {
    name: 'Vinyl/PVC',
    emoji: '⬜',
    bestFor: 'Low-maintenance privacy fencing, families with kids',
    climate: 'Excellent in all climates. Resists moisture, won\'t rot or rust.',
    maintenance: 'Rinse with a hose occasionally. No painting, staining, or sealing needed.',
    lifespan: '20-30 years',
    costRange: '$20-40/ft installed',
    rating: { privacy: 5, durability: 4, maintenance: 5, value: 4, appearance: 4 },
    description: 'Vinyl fencing has surged in popularity thanks to its virtually zero maintenance requirements. Modern vinyl looks remarkably like painted wood but never needs painting, staining, or sealing. It won\'t rot, warp, or attract insects. The main downside is limited color options (mostly white, tan, and gray) and higher upfront cost.',
  },
  {
    name: 'Chain Link',
    emoji: '🔗',
    bestFor: 'Pet containment, property marking, security, tight budgets',
    climate: 'Works in all climates. Galvanized or vinyl-coated for rust resistance.',
    maintenance: 'Almost none. Check for bent sections or loose fittings occasionally.',
    lifespan: '20-30 years',
    costRange: '$8-18/ft installed',
    rating: { privacy: 1, durability: 4, maintenance: 5, value: 5, appearance: 2 },
    description: 'Chain link is the most affordable fencing option and incredibly durable. It\'s ideal for keeping pets in the yard, marking property boundaries, and security applications. While it offers no privacy on its own, you can add privacy slats or fabric for partial screening. Vinyl-coated chain link (black or green) looks significantly better than bare galvanized.',
  },
  {
    name: 'Aluminum',
    emoji: '✨',
    bestFor: 'Pool enclosures, decorative fencing, front yards',
    climate: 'Excellent — rust-proof and weather-resistant.',
    maintenance: 'Minimal. Occasional cleaning. No painting needed.',
    lifespan: '30+ years',
    costRange: '$20-35/ft installed',
    rating: { privacy: 2, durability: 5, maintenance: 5, value: 3, appearance: 4 },
    description: 'Aluminum fencing offers the elegant look of wrought iron without the rust or heavy maintenance. It\'s the go-to choice for pool enclosures (meets most pool codes) and decorative front yard fencing. Aluminum won\'t rust, rot, or need painting. However, it provides minimal privacy and isn\'t as strong as steel or iron.',
  },
  {
    name: 'Wrought Iron',
    emoji: '🏰',
    bestFor: 'Security, historic homes, elegant properties',
    climate: 'All climates, but needs rust prevention in humid/coastal areas.',
    maintenance: 'Inspect for rust annually. Repaint every 3-5 years.',
    lifespan: '50+ years',
    costRange: '$25-50/ft installed',
    rating: { privacy: 1, durability: 5, maintenance: 2, value: 3, appearance: 5 },
    description: 'Wrought iron is the gold standard for security and elegance. These fences can last generations with proper maintenance. They\'re incredibly strong, difficult to climb, and make a powerful visual statement. The tradeoffs are high cost, zero privacy, and ongoing rust prevention. Many modern "wrought iron" fences are actually steel with a powder-coat finish.',
  },
  {
    name: 'Composite',
    emoji: '♻️',
    bestFor: 'Eco-conscious homeowners, modern aesthetics, zero maintenance',
    climate: 'Excellent in all climates. Won\'t rot, warp, or fade.',
    maintenance: 'None. Rinse occasionally if dirty.',
    lifespan: '25-30 years',
    costRange: '$25-45/ft installed',
    rating: { privacy: 5, durability: 5, maintenance: 5, value: 3, appearance: 4 },
    description: 'Composite fencing is made from recycled wood fibers and plastic polymers. It mimics the look of wood but requires zero maintenance — no staining, painting, or sealing ever. It\'s eco-friendly, extremely durable, and comes with long warranties. The downside is the highest upfront cost of any fencing material.',
  },
];

function RatingDots({ value, max = 5 }: { value: number; max?: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: max }).map((_, i) => (
        <div key={i} className={`w-3 h-3 rounded-full ${i < value ? 'bg-green-500' : 'bg-gray-200'}`} />
      ))}
    </div>
  );
}

export default function ChoosingMaterialPage() {
  const faqs = [
    { q: 'What is the best fence material for privacy?', a: 'Wood and vinyl are the best materials for privacy fences. Both can be installed as solid panels at 6 feet tall. Wood offers more style options while vinyl requires less maintenance.' },
    { q: 'What is the cheapest fence material?', a: 'Chain link is the cheapest fence material at $10–25 per linear foot installed. Wood is the next most affordable at $15–35 per foot, especially if you choose pressure-treated pine.' },
    { q: 'What fence material lasts the longest?', a: 'Wrought iron and aluminum fences last 50+ years with minimal maintenance. Vinyl lasts 20–30 years. Wood lasts 15–20 years but requires regular staining and maintenance.' },
    { q: 'Which fence material is best for dogs?', a: 'Chain link and wood privacy fences are both great for dogs. Chain link is affordable and durable, while wood privacy fences prevent dogs from seeing and reacting to passersby.' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map(({ q, a }) => ({
              '@type': 'Question', name: q,
              acceptedAnswer: { '@type': 'Answer', text: a },
            })),
          }),
        }}
      />
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        How to Choose the Right Fence Material
      </h1>
      <p className="text-xl text-gray-600 mb-10">
        The complete comparison guide for homeowners. Wood, vinyl, chain link, aluminum, iron, and composite — pros, cons, and costs.
      </p>

      {/* Quick comparison */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-12">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-2 font-semibold">Material</th>
                <th className="text-left py-3 px-2 font-semibold">Privacy</th>
                <th className="text-left py-3 px-2 font-semibold">Durability</th>
                <th className="text-left py-3 px-2 font-semibold">Maintenance</th>
                <th className="text-left py-3 px-2 font-semibold">Value</th>
                <th className="text-left py-3 px-2 font-semibold">Cost/ft</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((m) => (
                <tr key={m.name} className="border-b border-gray-100">
                  <td className="py-3 px-2 font-medium">{m.emoji} {m.name}</td>
                  <td className="py-3 px-2"><RatingDots value={m.rating.privacy} /></td>
                  <td className="py-3 px-2"><RatingDots value={m.rating.durability} /></td>
                  <td className="py-3 px-2"><RatingDots value={m.rating.maintenance} /></td>
                  <td className="py-3 px-2"><RatingDots value={m.rating.value} /></td>
                  <td className="py-3 px-2 text-gray-600">{m.costRange}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailed sections */}
      {materials.map((m) => (
        <div key={m.name} className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{m.emoji} {m.name} Fencing</h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <p className="text-gray-700 mb-4">{m.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div><strong>Best for:</strong> <span className="text-gray-600">{m.bestFor}</span></div>
              <div><strong>Cost:</strong> <span className="text-gray-600">{m.costRange}</span></div>
              <div><strong>Climate:</strong> <span className="text-gray-600">{m.climate}</span></div>
              <div><strong>Lifespan:</strong> <span className="text-gray-600">{m.lifespan}</span></div>
              <div className="md:col-span-2"><strong>Maintenance:</strong> <span className="text-gray-600">{m.maintenance}</span></div>
            </div>
          </div>
        </div>
      ))}

      {/* Decision helper */}
      <div className="bg-green-50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Still Not Sure? Ask Yourself:</h2>
        <ul className="space-y-3 text-gray-700">
          <li><strong>Need privacy?</strong> → Wood, vinyl, or composite</li>
          <li><strong>On a budget?</strong> → Chain link or basic wood</li>
          <li><strong>Hate maintenance?</strong> → Vinyl, aluminum, or composite</li>
          <li><strong>Have a pool?</strong> → Aluminum (meets most pool codes)</li>
          <li><strong>Want it to last forever?</strong> → Wrought iron or aluminum</li>
          <li><strong>Care about the environment?</strong> → Composite (recycled materials)</li>
          <li><strong>Want the best look?</strong> → Wood (cedar/redwood) or wrought iron</li>
        </ul>
      </div>

      {/* CTA */}
      <div className="text-center bg-white rounded-xl p-10 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Get Expert Advice From Local Pros</h2>
        <p className="text-gray-600 mb-6">
          A local fence contractor can help you choose the best material for your climate, soil, and budget.
          Get free estimates from top-rated pros near you.
        </p>
        <SearchBar size="lg" className="mx-auto" />
      </div>
    </div>
  );
}
