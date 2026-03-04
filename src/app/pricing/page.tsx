import { Metadata } from 'next';
import Link from 'next/link';
import { Check, X, Zap, TrendingUp, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pricing — FenceFind for Contractors',
  description: 'Get listed on FenceFind. Free basic listings or upgrade to Pro for featured placement, unlimited leads, and priority visibility. Starting at $199/month.',
};

const freeFeatures = [
  'Business profile page',
  'Contact info displayed',
  'Service area listing',
  'Up to 3 photos',
  'Listed in search results',
];

const proFeatures = [
  'Everything in Free, plus:',
  'Unlimited leads in your area',
  'Featured placement in city search',
  'Verified Pro badge',
  'Priority on city & state pages',
  'Lead notifications (email + SMS)',
  'Unlimited photos & portfolio',
  'Quote request form on your profile',
  'Profile analytics dashboard',
  'Google review integration',
  'Priority support',
];

export default function PricingPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Grow Your Fence Business</h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
          One simple plan. Unlimited leads. No per-lead fees, no bidding wars.
        </p>
      </div>

      {/* Value props */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
        <div className="text-center p-4">
          <Zap className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <h3 className="font-semibold text-gray-900">Unlimited Leads</h3>
          <p className="text-sm text-gray-500 mt-1">Every quote request in your area goes straight to you. No caps.</p>
        </div>
        <div className="text-center p-4">
          <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <h3 className="font-semibold text-gray-900">Top Placement</h3>
          <p className="text-sm text-gray-500 mt-1">Featured at the top of your city page where homeowners look first.</p>
        </div>
        <div className="text-center p-4">
          <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <h3 className="font-semibold text-gray-900">No Contracts</h3>
          <p className="text-sm text-gray-500 mt-1">Month-to-month. Cancel anytime. Your listing reverts to free.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
        {/* Free */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
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
            Claim Your Listing
          </Link>
          <ul className="space-y-3">
            {freeFeatures.map((f) => (
              <li key={f} className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">{f}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pro */}
        <div className="bg-white rounded-2xl shadow-lg border-2 border-green-500 p-6 sm:p-8 relative">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-600 text-white text-sm font-semibold px-4 py-1 rounded-full">
            Best Value
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Pro</h2>
          <p className="text-gray-500 mb-6">Unlimited leads + featured placement</p>
          <div className="mb-2">
            <span className="text-5xl font-bold text-gray-900">$199</span>
            <span className="text-gray-500">/month</span>
          </div>
          <p className="text-sm text-green-700 mb-6">One fence job pays for a full year</p>
          <Link
            href="/claim?plan=pro"
            className="block w-full text-center bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors mb-8"
          >
            Start Pro — 14-Day Free Trial
          </Link>
          <ul className="space-y-3">
            {proFeatures.map((f) => (
              <li key={f} className="flex items-center gap-3">
                {f.startsWith('Everything') ? (
                  <span className="text-gray-400 text-sm font-medium">{f}</span>
                ) : (
                  <>
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{f}</span>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ROI calculator */}
      <div className="bg-green-50 border border-green-200 rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">The Math is Simple</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold text-gray-900">$199</div>
            <div className="text-sm text-gray-600">Monthly cost</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900">$4,500</div>
            <div className="text-sm text-gray-600">Average fence job</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-600">22x ROI</div>
            <div className="text-sm text-gray-600">From just one job</div>
          </div>
        </div>
        <p className="text-center text-gray-600 mt-4 text-sm">
          Close just one lead per month and FenceFind pays for itself 22 times over.
        </p>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <details className="bg-white rounded-xl border p-6 group">
            <summary className="font-semibold text-gray-900 cursor-pointer list-none flex justify-between items-center">
              What does &ldquo;unlimited leads&rdquo; mean?
              <span className="text-green-600 group-open:rotate-45 transition-transform text-xl ml-2">+</span>
            </summary>
            <p className="text-gray-600 mt-3">Every homeowner who requests a quote in your service area gets sent directly to you. No caps, no per-lead charges, no shared leads. If 50 people request quotes this month, you get all 50.</p>
          </details>
          <details className="bg-white rounded-xl border p-6 group">
            <summary className="font-semibold text-gray-900 cursor-pointer list-none flex justify-between items-center">
              Can I cancel anytime?
              <span className="text-green-600 group-open:rotate-45 transition-transform text-xl ml-2">+</span>
            </summary>
            <p className="text-gray-600 mt-3">Yes. Pro is month-to-month with no contracts or cancellation fees. Cancel anytime from your dashboard and your listing reverts to the free tier at the end of your billing period.</p>
          </details>
          <details className="bg-white rounded-xl border p-6 group">
            <summary className="font-semibold text-gray-900 cursor-pointer list-none flex justify-between items-center">
              Is there a free trial?
              <span className="text-green-600 group-open:rotate-45 transition-transform text-xl ml-2">+</span>
            </summary>
            <p className="text-gray-600 mt-3">Yes — Pro comes with a 14-day free trial. Try it risk-free. You won&apos;t be charged until day 15, and you can cancel anytime during the trial.</p>
          </details>
          <details className="bg-white rounded-xl border p-6 group">
            <summary className="font-semibold text-gray-900 cursor-pointer list-none flex justify-between items-center">
              How is FenceFind different from HomeAdvisor or Angi?
              <span className="text-green-600 group-open:rotate-45 transition-transform text-xl ml-2">+</span>
            </summary>
            <p className="text-gray-600 mt-3">We&apos;re focused exclusively on fence contractors. No shared leads, no bidding wars, no per-lead fees. You pay one flat monthly rate and get every lead in your area. Homeowners contact you directly — we don&apos;t sell the same lead to 5 competitors.</p>
          </details>
          <details className="bg-white rounded-xl border p-6 group">
            <summary className="font-semibold text-gray-900 cursor-pointer list-none flex justify-between items-center">
              How do I claim my existing listing?
              <span className="text-green-600 group-open:rotate-45 transition-transform text-xl ml-2">+</span>
            </summary>
            <p className="text-gray-600 mt-3">If your business already appears on FenceFind, click &ldquo;Claim This Listing&rdquo; on your profile page. We&apos;ll verify your ownership via phone or email. Claiming is free — you only pay if you upgrade to Pro.</p>
          </details>
        </div>
      </div>
    </div>
  );
}
