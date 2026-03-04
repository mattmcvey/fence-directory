import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Search, Star, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About FenceFind — Trusted Fence Contractor Directory',
  description: 'FenceFind helps homeowners find licensed, insured fence contractors in their area. Learn about our mission and how we vet contractors.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">About FenceFind</h1>

      <div className="prose prose-lg max-w-none text-gray-700 mb-12">
        <p>
          FenceFind was built with a simple mission: make it easy for homeowners to find trustworthy fence
          contractors. Whether you need a new privacy fence, a chain link repair, or a custom gate, we connect
          you with licensed professionals in your area.
        </p>
        <p>
          We know hiring a contractor can be stressful. That&apos;s why every listing on FenceFind includes
          real reviews, verified credentials, and direct contact information — no middlemen, no runaround.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
          <Search className="w-10 h-10 text-green-600 mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Easy Search</h3>
          <p className="text-gray-600">
            Search by city or zip code to find fence contractors near you. Filter by material type,
            services, and ratings to find the perfect match.
          </p>
        </div>
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
          <Shield className="w-10 h-10 text-blue-500 mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Verified Pros</h3>
          <p className="text-gray-600">
            We verify licensing and insurance for featured contractors. Look for the verified badge
            to know you&apos;re hiring a legitimate professional.
          </p>
        </div>
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
          <Star className="w-10 h-10 text-yellow-500 mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Real Reviews</h3>
          <p className="text-gray-600">
            Read genuine reviews from homeowners who&apos;ve used these contractors. Ratings are pulled
            from verified sources to keep things honest.
          </p>
        </div>
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
          <Users className="w-10 h-10 text-green-600 mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Free to Use</h3>
          <p className="text-gray-600">
            FenceFind is completely free for homeowners. Search, compare, and contact contractors
            without any fees or obligations.
          </p>
        </div>
      </div>

      <div className="bg-green-50 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Are You a Fence Contractor?</h2>
        <p className="text-gray-700 mb-6">
          Join FenceFind to reach homeowners actively searching for fence services. Basic listings are
          free — upgrade to Pro for featured placement, unlimited leads, and direct notifications.
        </p>
        <Link
          href="/claim"
          className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          List Your Business
        </Link>
      </div>
    </div>
  );
}
