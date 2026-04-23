'use client';

import { useState, FormEvent } from 'react';
import { CheckCircle, Send } from 'lucide-react';

interface CityQuoteFormProps {
  cityName: string;
  stateCode: string;
  citySlug: string;
}

export default function CityQuoteForm({ cityName, stateCode, citySlug }: CityQuoteFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    fenceType: '',
    message: '',
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/quotes/multi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ citySlug, ...formData }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.');
        return;
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
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
        <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-gray-900 mb-1">Quote Requests Sent!</h3>
        <p className="text-gray-600 text-sm">
          We&apos;ve sent your request to top-rated fence contractors in {cityName}. They&apos;ll reach out to you soon.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-1">
        Get Free Quotes from {cityName} Fence Contractors
      </h2>
      <p className="text-gray-600 text-sm mb-4">
        Describe your project and we&apos;ll connect you with top-rated local pros.
      </p>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Your name"
          className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-gray-900 bg-white"
        />
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Email address"
          className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-gray-900 bg-white"
        />
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="Phone (optional)"
          className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-gray-900 bg-white"
        />
        <select
          value={formData.fenceType}
          onChange={(e) => setFormData({ ...formData, fenceType: e.target.value })}
          className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-gray-900 bg-white"
        >
          <option value="">Fence type...</option>
          <option value="privacy">Privacy Fence</option>
          <option value="picket">Picket Fence</option>
          <option value="security">Security Fence</option>
          <option value="pool">Pool Fence</option>
          <option value="chain-link">Chain Link</option>
          <option value="other">Other</option>
        </select>
        <textarea
          rows={2}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Tell us about your project (optional)"
          className="sm:col-span-2 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none resize-none text-gray-900 bg-white"
        />
        {error && (
          <div className="sm:col-span-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="sm:col-span-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
        >
          <Send className="w-4 h-4" />
          {submitting ? 'Sending...' : 'Get Free Quotes'}
        </button>
      </form>
    </div>
  );
}
