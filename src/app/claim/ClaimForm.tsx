'use client';

import { useState, FormEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Star, TrendingUp, Users } from 'lucide-react';
import { Suspense } from 'react';

function ClaimFormInner() {
  const searchParams = useSearchParams();
  const prefillName = searchParams.get('business') || '';
  const prefillCity = searchParams.get('city') || '';
  const prefillState = searchParams.get('state') || '';
  const contractorId = searchParams.get('id') || '';
  const plan = searchParams.get('plan') || '';

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    businessName: prefillName,
    contactName: '',
    email: '',
    phone: '',
    city: prefillCity,
    state: prefillState,
    website: '',
    message: '',
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/claims', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, contractorId: contractorId || undefined }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.');
        return;
      }


      if (plan === 'pro') {
        const stripeRes = await fetch('/api/stripe/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contractorId: data.contractorId || contractorId || undefined,
            claimId: data.claimId || undefined,
            contractorName: formData.businessName,
            email: formData.email,
          }),
        });
        const stripeData = await stripeRes.json();
        if (stripeData.url) {
          window.location.href = stripeData.url;
          return;
        }

        setError('Claim submitted! But we couldn\'t start checkout. Please contact us or try again from the pricing page.');
      }

      setSubmitted(true);
    } catch {
      setError('Unable to submit. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Thanks for Your Interest!</h1>
        <p className="text-gray-600 text-lg">
          We&apos;ve received your listing request. Our team will review it and get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Benefits */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            List Your Fence Business
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Join thousands of fence contractors on FenceFind and connect with homeowners actively searching for your services.
          </p>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="bg-green-100 rounded-lg p-3 h-fit">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">Reach More Customers</h3>
                <p className="text-gray-600">Get found by homeowners searching for fence contractors in your area. Our SEO-optimized pages rank on Google.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-green-100 rounded-lg p-3 h-fit">
                <Star className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">Showcase Your Work</h3>
                <p className="text-gray-600">Display your ratings, reviews, photos, and specialties. Stand out from the competition.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-green-100 rounded-lg p-3 h-fit">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">Grow Your Business</h3>
                <p className="text-gray-600">Pro listings get featured placement, unlimited leads, and direct notifications. Upgrade anytime.</p>
              </div>
            </div>
          </div>

          <div className="mt-10 bg-gray-50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-3">Free vs Pro</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium text-gray-900 mb-2">Free Listing</p>
                <ul className="space-y-1 text-gray-600">
                  <li>✓ Basic profile</li>
                  <li>✓ Contact info</li>
                  <li>✓ Service area</li>
                  <li>✓ 3 photos</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-green-600 mb-2">Pro — $199/mo</p>
                <ul className="space-y-1 text-gray-600">
                  <li>✓ Unlimited leads</li>
                  <li>✓ Featured placement</li>
                  <li>✓ Verified Pro badge</li>
                  <li>✓ Unlimited photos</li>
                  <li>✓ Lead notifications</li>
                  <li>✓ 14-day free trial</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div>
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {plan === 'pro' ? 'Start Your Pro Trial' : 'Get Started — Free'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Business Name *</label>
                <input
                  type="text"
                  required
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-gray-900"
                  placeholder="Your Fence Company"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Name *</label>
                <input
                  type="text"
                  required
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-gray-900"
                  placeholder="John Smith"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-gray-900"
                    placeholder="you@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-gray-900"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-gray-900"
                    placeholder="Denver"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-gray-900"
                    placeholder="CO"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Website (optional)</label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-gray-900"
                  placeholder="https://yourcompany.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tell us about your business</label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none resize-none text-gray-900"
                  placeholder="Services, materials, years in business..."
                />
              </div>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold text-lg transition-colors"
              >
                {submitting ? 'Submitting...' : plan === 'pro' ? 'Continue to Pro Setup →' : 'Submit Free Listing'}
              </button>
              <p className="text-xs text-gray-500 text-center">
                {plan === 'pro'
                  ? 'You\'ll be taken to secure checkout. 14-day free trial — cancel anytime.'
                  : 'By submitting, you agree to our terms of service. No credit card required.'}
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ClaimForm() {
  return (
    <Suspense>
      <ClaimFormInner />
    </Suspense>
  );
}
