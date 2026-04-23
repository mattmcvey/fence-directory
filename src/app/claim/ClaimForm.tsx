'use client';

import { useState, useEffect, useRef, FormEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Search, Star, TrendingUp, Users } from 'lucide-react';
import { Suspense } from 'react';

function ClaimFormInner() {
  const searchParams = useSearchParams();
  const prefillName = searchParams.get('business') || '';
  const prefillCity = searchParams.get('city') || '';
  const prefillState = searchParams.get('state') || '';
  const contractorId = searchParams.get('id') || '';
  const plan = searchParams.get('plan') || '';
  const isNewBusiness = !contractorId;

  const [lookupQuery, setLookupQuery] = useState('');
  const [lookupResults, setLookupResults] = useState<{ id: string; name: string; city: string; state: string; slug: string }[]>([]);
  const [lookupSearched, setLookupSearched] = useState(false);
  const [lookupLoading, setLookupLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  useEffect(() => {
    if (!isNewBusiness) return;
    if (lookupQuery.length < 2) {
      setLookupResults([]);
      setLookupSearched(false);
      return;
    }
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setLookupLoading(true);
      try {
        const res = await fetch(`/api/contractors/search?q=${encodeURIComponent(lookupQuery)}`);
        const data = await res.json();
        setLookupResults(data);
        setLookupSearched(true);
      } catch {
        setLookupResults([]);
      } finally {
        setLookupLoading(false);
      }
    }, 300);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [lookupQuery, isNewBusiness]);

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
            {isNewBusiness ? 'Add Your Fence Business' : 'Claim Your Listing'}
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            {isNewBusiness
              ? "Don\u2019t see your business on FenceFind? Add it for free and start connecting with homeowners searching for fence contractors in your area."
              : 'Verify your business and take control of your listing. Update your info, respond to leads, and grow your online presence.'}
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
                <p className="font-medium text-green-600 mb-2">Pro — $79/mo</p>
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
          {isNewBusiness && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-1">Already listed on FenceFind?</h2>
              <p className="text-gray-600 text-sm mb-4">Search for your business first — you may already have a listing to claim.</p>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={lookupQuery}
                  onChange={(e) => setLookupQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-gray-900"
                  placeholder="Search by company name..."
                />
              </div>
              {lookupLoading && (
                <p className="text-gray-400 text-sm mt-3">Searching...</p>
              )}
              {!lookupLoading && lookupSearched && lookupResults.length > 0 && (
                <div className="mt-3 border border-gray-200 rounded-lg divide-y divide-gray-100">
                  {lookupResults.slice(0, 5).map((c) => (
                    <a
                      key={c.id}
                      href={`/claim?id=${c.id}&business=${encodeURIComponent(c.name)}&city=${encodeURIComponent(c.city)}&state=${encodeURIComponent(c.state)}`}
                      className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
                    >
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{c.name}</p>
                        <p className="text-gray-500 text-xs">{c.city}, {c.state}</p>
                      </div>
                      <span className="text-green-600 text-sm font-medium whitespace-nowrap">Claim this listing →</span>
                    </a>
                  ))}
                </div>
              )}
              {!lookupLoading && lookupSearched && lookupResults.length === 0 && (
                <p className="text-gray-500 text-sm mt-3">No existing listing found — fill out the form below to add your business.</p>
              )}
            </div>
          )}

          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {plan === 'pro' ? 'Start Your Pro Trial' : isNewBusiness ? 'Add Your Business — Free' : 'Claim Your Listing — Free'}
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

          {/* Context-aware helper text below form */}
          {!isNewBusiness && (
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-5 text-center">
              <p className="font-semibold text-gray-900 mb-1">Can&apos;t find your business?</p>
              <p className="text-gray-600 text-sm mb-3">
                If your company isn&apos;t listed on FenceFind yet, you can add it for free.
              </p>
              <a
                href="/claim"
                className="inline-block text-sm font-medium text-green-700 hover:text-green-800 underline underline-offset-2"
              >
                Add a new business instead
              </a>
            </div>
          )}
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
