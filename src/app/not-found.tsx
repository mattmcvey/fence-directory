import Link from 'next/link';
import SearchBar from '@/components/SearchBar';
import { ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
      <p className="text-gray-600 text-lg mb-8">
        Sorry, we couldn&apos;t find the page you&apos;re looking for. Try searching for a city or zip code below.
      </p>

      <SearchBar size="lg" className="mx-auto mb-12" />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
        <Link href="/states" className="p-5 bg-white border border-gray-200 rounded-xl hover:border-green-300 hover:bg-green-50 transition-all group">
          <p className="font-semibold text-gray-900 group-hover:text-green-600 flex items-center gap-2">
            Browse by State <ArrowRight className="w-4 h-4" />
          </p>
          <p className="text-sm text-gray-500 mt-1">Find contractors in all 50 states</p>
        </Link>
        <Link href="/guides" className="p-5 bg-white border border-gray-200 rounded-xl hover:border-green-300 hover:bg-green-50 transition-all group">
          <p className="font-semibold text-gray-900 group-hover:text-green-600 flex items-center gap-2">
            Fence Guides <ArrowRight className="w-4 h-4" />
          </p>
          <p className="text-sm text-gray-500 mt-1">Cost guides, materials, and permits</p>
        </Link>
        <Link href="/" className="p-5 bg-white border border-gray-200 rounded-xl hover:border-green-300 hover:bg-green-50 transition-all group">
          <p className="font-semibold text-gray-900 group-hover:text-green-600 flex items-center gap-2">
            Home <ArrowRight className="w-4 h-4" />
          </p>
          <p className="text-sm text-gray-500 mt-1">Back to the homepage</p>
        </Link>
      </div>
    </div>
  );
}
