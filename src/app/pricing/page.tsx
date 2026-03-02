import { Metadata } from 'next';
import Link from 'next/link';
import { Check, X } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pricing — FenceFind for Contractors',
  description: 'Get listed on FenceFind. Free basic listings or upgrade to premium for featured placement, verified badge, and lead notifications.',
};

const features = [
  { name: 'Business profile page', free: true, premium: true },
  { name: 'Contact info displayed', free: true, premium: true },
  { name: 'Service area listing', free: true, premium: true },
  { name: 'Up to 3 photos', free: true, premium: false },
  { name: 'Unlimited photos', free: false, premium: true },
  { name: 'Featured placement in search', free: false, premium: true },
  { name: 'Verified badge', free: false, premium: true },
  { name: 'Priority in city pages', free: false, premium: true },
  { name: 'Lead notifications (email + SMS)', free: false, premium: true },
  { name: 'Analytics dashboard', free: false, premium: true },
  { name: 'Quote request form on profile', free: false, premium: true },
  { name: 'Competitor insights', free: false, premium: true },
  { name: 'Priority support', free: false, premium: true },
  { name: 'Google review integration', free: false, premium: true },
];

export default function PricingPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Start free. Upgrade when you&apos;re ready to grow.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
        {/* Free */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Free</h2>
          <p className="text-gray-500 mb-6">Get found by local homeowners</p>
          <div className="mb-8">
            <span className="text-5xl font-bold text-gray-900">$0</span>
            <span className="text-gray-500">/month</span>
          </div>
          <Link
            href="/claim"
            className="block w-full text-center border-2 border-green-600 text-green-600 hover:bg-green-50 py-3 rounded-lg font-semibold transition-colors mb-8"
          >
            Get Started Free
          </Link>
          <ul className="space-y-3">
            {features.map((f) => (
              <li key={f.name} className="flex items-center gap-3">
                {f.free ? (
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                ) : (
                  <X className="w-5 h-5 text-gray-300 flex-shrink-0" />
                )}
                <span className={f.free ? 'text-gray-700' : 'text-gray-400'}>{f.name}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Premium */}
        <div className="bg-white rounded-2xl shadow-lg border-2 border-green-500 p-8 relative">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-600 text-white text-sm font-semibold px-4 py-1 rounded-full">
            Most Popular
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Premium</h2>
          <p className="text-gray-500 mb-6">Maximize your leads and visibility</p>
          <div className="mb-8">
            <span className="text-5xl font-bold text-gray-900">$99</span>
            <span className="text-gray-500">/month</span>
          </div>
          <Link
            href="/claim"
            className="block w-full text-center bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors mb-8"
          >
            Start Premium
          </Link>
          <ul className="space-y-3">
            {features.map((f) => (
              <li key={f.name} className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">{f.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-2">Can I cancel anytime?</h3>
            <p className="text-gray-600">Yes. Premium is month-to-month with no contracts. Cancel anytime and your listing reverts to the free tier.</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-2">How do I claim my existing listing?</h3>
            <p className="text-gray-600">If your business already appears on FenceFind, click &ldquo;Claim This Listing&rdquo; on your profile page. We&apos;ll verify your ownership via phone or email.</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-2">What kind of leads will I get?</h3>
            <p className="text-gray-600">Premium members receive notifications when homeowners in their service area request quotes. These are high-intent leads — people actively looking for fence work.</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-2">How is FenceFind different from HomeAdvisor or Angi?</h3>
            <p className="text-gray-600">We&apos;re focused exclusively on fence contractors. No shared leads, no bidding wars. Your listing is yours, and homeowners contact you directly.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
