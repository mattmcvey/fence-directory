import { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Fence Guides & Resources — Expert Advice | FenceFind',
  description: 'Expert fence guides: costs, materials, permits, installation timelines, ROI, and more. Everything you need to know before hiring a fence contractor.',
};

const guides = [
  {
    slug: 'fence-cost',
    title: 'Fence Installation Cost Guide (2026)',
    description: 'Average costs by material, project size, and factors that affect your total price.',
    icon: '💰',
  },
  {
    slug: 'choosing-material',
    title: 'Choosing the Right Fence Material',
    description: 'Compare wood, vinyl, chain link, aluminum, and more to find the best fit for your property.',
    icon: '🪵',
  },
  {
    slug: 'wood-vs-vinyl',
    title: 'Wood vs Vinyl Fence: Pros, Cons & Costs',
    description: 'The two most popular fence materials compared side-by-side on cost, durability, maintenance, and appearance.',
    icon: '⚖️',
  },
  {
    slug: 'privacy-fence',
    title: 'Privacy Fence Ideas, Costs & Installation',
    description: 'Everything you need to know about privacy fences — types, materials, costs, and height regulations.',
    icon: '🏡',
  },
  {
    slug: 'chain-link-fence',
    title: 'Chain Link Fence Cost & Installation Guide',
    description: 'The most affordable fencing option explained — costs, gauges, coatings, and when chain link makes sense.',
    icon: '🔗',
  },
  {
    slug: 'fence-permits',
    title: 'Do You Need a Permit to Build a Fence?',
    description: 'Permit requirements, common regulations, height limits, setbacks, and how to check your local codes.',
    icon: '📋',
  },
  {
    slug: 'fence-repair',
    title: 'Fence Repair Guide: DIY vs Pro',
    description: 'Common fence problems, when to DIY vs hire a pro, and what repairs typically cost.',
    icon: '🔧',
  },
  {
    slug: 'how-long-fence-installation',
    title: 'How Long Does Fence Installation Take?',
    description: 'Realistic timelines by fence type, what affects duration, and how to prepare for installation day.',
    icon: '⏱️',
  },
  {
    slug: 'fence-roi',
    title: 'Does a Fence Increase Home Value?',
    description: 'ROI by fence type, what appraisers look for, and which fences add the most resale value.',
    icon: '📈',
  },
  {
    slug: 'getting-quotes',
    title: 'How to Get Fence Quotes: What to Ask',
    description: 'How to request estimates, compare bids, spot red flags, and choose the right contractor.',
    icon: '📝',
  },
  {
    slug: 'best-time-to-install',
    title: 'Best Time to Install a Fence',
    description: 'Season-by-season guide to fence installation timing. Save 10-25% by installing at the right time.',
    icon: '📅',
  },
];

export default function GuidesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-3 mb-4">
        <BookOpen className="w-8 h-8 text-green-600" />
        <h1 className="text-4xl font-bold text-gray-900">Fence Guides</h1>
      </div>
      <p className="text-xl text-gray-600 mb-10">
        Expert advice to help you plan your fence project — from choosing materials to hiring the right contractor.
      </p>

      <div className="grid gap-4">
        {guides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="flex items-start gap-4 p-6 bg-white border border-gray-200 rounded-xl hover:border-green-300 hover:shadow-md transition-all group"
          >
            <span className="text-3xl">{guide.icon}</span>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                {guide.title}
              </h2>
              <p className="text-gray-600 mt-1">{guide.description}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 bg-green-50 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Ready to Start Your Project?</h2>
        <p className="text-gray-600 mb-6">Find top-rated fence contractors in your area.</p>
        <Link
          href="/search"
          className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
        >
          Search Contractors
        </Link>
      </div>
    </div>
  );
}
