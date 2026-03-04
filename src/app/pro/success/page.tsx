import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Welcome to FenceFind Pro!',
  robots: { index: false },
};

export default function ProSuccessPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <div className="bg-green-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-10 h-10 text-green-600" />
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        Welcome to FenceFind Pro! 🎉
      </h1>

      <p className="text-lg text-gray-600 mb-8">
        Your 14-day free trial has started. Your listing is now featured and you&apos;ll
        start receiving lead notifications right away.
      </p>

      <div className="bg-white rounded-xl border p-6 mb-8 text-left">
        <h2 className="font-semibold text-gray-900 mb-4">What happens next:</h2>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <span className="text-gray-700">Your profile now has a <strong>Verified Pro</strong> badge</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <span className="text-gray-700">You&apos;re featured at the <strong>top of your city page</strong></span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <span className="text-gray-700">Quote requests from homeowners will be <strong>emailed to you directly</strong></span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <span className="text-gray-700">Your <strong>14-day free trial</strong> starts today — you won&apos;t be charged until day 15</span>
          </li>
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          View Your Listing <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          href="/pricing"
          className="inline-flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Manage Subscription
        </Link>
      </div>
    </div>
  );
}
