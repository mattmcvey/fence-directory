import Link from 'next/link';
import { Fence } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-green-600 text-white p-1.5 rounded-lg">
              <Fence className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold text-gray-900">FenceFind</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/states" className="text-gray-600 hover:text-green-600 transition-colors text-sm font-medium">
              Browse by State
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-green-600 transition-colors text-sm font-medium">
              About
            </Link>
            <Link
              href="/claim"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              List Your Business
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
