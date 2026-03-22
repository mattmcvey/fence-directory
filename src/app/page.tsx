import SearchBar from '@/components/SearchBar';
import ContractorCard from '@/components/ContractorCard';
import { getFeaturedContractors, getCities, getStates, getSiteStats } from '@/lib/data';
import { Shield, Star, DollarSign, Users, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { websiteSchema, ogMeta } from '@/lib/seo';
import { Metadata } from 'next';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'FenceFind — Find Trusted Fence Contractors Near You | Free Estimates',
  description: 'Compare top-rated fence contractors in your area. Read verified reviews, compare pricing for wood, vinyl & chain link fences, and get free estimates from licensed installers across all 50 states.',
  keywords: 'fence contractor, fence installer, fence company near me, fence installation, fence cost, fence repair, wood fence, vinyl fence, chain link fence, fence estimate',
  ...ogMeta({
    title: 'FenceFind — Find Trusted Fence Contractors Near You',
    description: 'Compare top-rated fence contractors. Read reviews, compare pricing, and get free estimates from licensed installers.',
    path: '/',
  }),
};

export default async function HomePage() {
  const [featuredContractors, cities, stats] = await Promise.all([
    getFeaturedContractors(),
    getCities(),
    getSiteStats(),
  ]);
  const states = getStates();

  return (
    <div>
      {/* Website schema for sitelinks search box */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema()) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-green-700 via-green-600 to-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 md:py-28 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
            Find Trusted Fence<br className="hidden sm:block" /> Contractors Near You
          </h1>
          <p className="text-green-100 text-base sm:text-lg md:text-xl mb-8 sm:mb-10 max-w-2xl mx-auto">
            Compare top-rated fence installers, read reviews, and get free estimates from licensed professionals in your area.
          </p>
          <SearchBar size="lg" className="mx-auto" />
          <p className="text-green-200 text-sm mt-4">
            Search by city, zip code, or state — we cover all 50 states
          </p>
        </div>
      </section>

      {/* Trust signals */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <Users className="w-8 h-8 text-green-600 mb-2" />
              <span className="text-2xl font-bold text-gray-900">{stats.contractorCount.toLocaleString()}+</span>
              <span className="text-sm text-gray-500">Contractors Listed</span>
            </div>
            <div className="flex flex-col items-center">
              <Star className="w-8 h-8 text-yellow-500 mb-2" />
              <span className="text-2xl font-bold text-gray-900">{stats.avgRating}</span>
              <span className="text-sm text-gray-500">Average Rating</span>
            </div>
            <div className="flex flex-col items-center">
              <Shield className="w-8 h-8 text-blue-500 mb-2" />
              <span className="text-2xl font-bold text-gray-900">{stats.cityCount}+</span>
              <span className="text-sm text-gray-500">Cities Covered</span>
            </div>
            <div className="flex flex-col items-center">
              <DollarSign className="w-8 h-8 text-green-600 mb-2" />
              <span className="text-2xl font-bold text-gray-900">{stats.freeEstimatePercent}%</span>
              <span className="text-sm text-gray-500">Offer Free Estimates</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Contractors */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Contractors</h2>
        <p className="text-gray-600 mb-8">Top-rated fence professionals across the country</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredContractors.map((contractor) => (
            <ContractorCard key={contractor.id} contractor={contractor} />
          ))}
        </div>
      </section>

      {/* Browse by State */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Browse by State</h2>
          <p className="text-gray-600 mb-8">Find fence contractors in your state</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {states.map((state) => (
              <Link
                key={state.code}
                href={`/state/${state.slug}`}
                className="p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-green-600">{state.name}</div>
                <div className="text-sm text-gray-500">{state.contractorCount} contractors</div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/states" className="text-green-600 hover:text-green-700 font-medium inline-flex items-center gap-1">
              View all states <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Cities */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Popular Cities</h2>
        <p className="text-gray-600 mb-8">Most searched locations for fence contractors</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {cities.map((city) => (
            <Link
              key={city.slug}
              href={`/city/${city.slug}`}
              className="p-4 bg-white border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-all group"
            >
              <div className="font-semibold text-gray-900 group-hover:text-green-600">{city.name}</div>
              <div className="text-sm text-gray-500">{city.state}</div>
              <div className="text-xs text-gray-400 mt-1">{city.contractorCount} contractors</div>
            </Link>
          ))}
        </div>
      </section>

      {/* SEO Content */}
      <section className="bg-green-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Find the Best Fence Contractor</h2>
          <div className="prose prose-green max-w-none text-gray-700">
            <p>
              Finding a reliable fence contractor doesn&apos;t have to be difficult. FenceFind makes it easy to compare
              local fence companies, read verified reviews, and request free estimates — all in one place.
            </p>
            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">What to Look for in a Fence Contractor</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Licensing & Insurance:</strong> Always verify your contractor is licensed and carries liability insurance. This protects you if something goes wrong during installation.</li>
              <li><strong>Experience:</strong> Look for contractors with at least 5 years of experience. They&apos;ll handle unexpected challenges better and deliver higher quality work.</li>
              <li><strong>Reviews & References:</strong> Check online reviews and ask for references. A reputable contractor will have plenty of satisfied customers.</li>
              <li><strong>Written Estimates:</strong> Get at least 3 written estimates before choosing. This helps you understand fair pricing in your area.</li>
              <li><strong>Material Expertise:</strong> Different fence materials (wood, vinyl, chain link, aluminum) require different skills. Choose a contractor experienced with your preferred material.</li>
            </ul>
            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Average Fence Installation Costs</h3>
            <p>
              Fence installation costs vary by material, height, and location. On average, homeowners spend between
              $1,800 and $9,500 on a new fence, with most projects falling in the $2,500–$5,000 range. Wood privacy
              fences typically cost $15–$35 per linear foot, while vinyl runs $20–$40 per linear foot installed.
            </p>
          </div>
        </div>
      </section>

      {/* CTA for contractors */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Are You a Fence Contractor?</h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Get listed on FenceFind and connect with homeowners searching for fence installation and repair services in your area.
          </p>
          <Link
            href="/claim"
            className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
          >
            List Your Business — It&apos;s Free
          </Link>
        </div>
      </section>
    </div>
  );
}
