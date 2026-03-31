'use client';

import { useState, FormEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { Check, Shield, Zap, ArrowRight } from 'lucide-react';

function ProSignupFormInner() {
  const searchParams = useSearchParams();
  const prefillName = searchParams.get('business') || '';
  const prefillCity = searchParams.get('city') || '';
  const prefillState = searchParams.get('state') || '';
  const contractorId = searchParams.get('id') || '';

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    businessName: prefillName,
    email: '',
    city: prefillCity,
    state: prefillState,
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contractorId: contractorId || undefined,
          contractorName: formData.businessName,
          email: formData.email,
        }),
      });
      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || 'Something went wrong. Please try again.');
        setLoading(false);
      }
    } catch {
      setError('Unable to connect. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full mb-4">
            <Zap className="w-4 h-4" /> 14-day free trial
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Start FenceFind Pro</h1>
          <p className="text-gray-600">
            Unlimited leads, featured placement, verified badge.
            <br />
            <strong>$199/mo</strong> after trial — cancel anytime.
          </p>
        </div>

        {/* Quick benefits */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
          <div className="space-y-2 text-sm">
            {[
              'Unlimited leads in your area',
              'Featured at the top of your city page',
              'Verified Pro badge on your profile',
              'One fence job pays for a full year',
            ].map((b) => (
              <div key={b} className="flex items-center gap-2 text-green-800">
                <Check className="w-4 h-4 flex-shrink-0" />
                <span>{b}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Form — just 4 fields */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg border p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-gray-900"
              placeholder="you@company.com"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
              <input
                type="text"
                required
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-gray-900"
                placeholder="CO"
                maxLength={2}
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center gap-2"
          >
            {loading ? 'Loading checkout...' : <>Start Free Trial <ArrowRight className="w-5 h-5" /></>}
          </button>

          <div className="flex items-center justify-center gap-4 text-xs text-gray-400 pt-2">
            <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> Secure checkout</span>
            <span>•</span>
            <span>Cancel anytime</span>
            <span>•</span>
            <span>No charge for 14 days</span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ProSignupForm() {
  return (
    <Suspense>
      <ProSignupFormInner />
    </Suspense>
  );
}
