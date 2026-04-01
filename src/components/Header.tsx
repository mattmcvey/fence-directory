'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Fence, Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';
import { createAuthBrowserClient } from '@/lib/supabase';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, loading } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createAuthBrowserClient();
    await supabase.auth.signOut();
    setMobileMenuOpen(false);
    router.push('/');
    router.refresh();
  };

  return (
    <header className="bg-white border-b border-gray-200 relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-green-600 text-white p-1.5 rounded-lg">
              <Fence className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold text-gray-900">FenceFind</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/states" className="text-gray-600 hover:text-green-600 transition-colors text-sm font-medium">
              Browse by State
            </Link>
            <Link href="/guides" className="text-gray-600 hover:text-green-600 transition-colors text-sm font-medium">
              Guides
            </Link>
            <Link href="/blog" className="text-gray-600 hover:text-green-600 transition-colors text-sm font-medium">
              Blog
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-green-600 transition-colors text-sm font-medium">
              About
            </Link>
            <Link
              href="/claim"
              className="text-gray-600 hover:text-green-600 transition-colors text-sm font-medium"
            >
              List Free
            </Link>
            {!loading && (
              user ? (
                <Link
                  href="/dashboard"
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="text-gray-600 hover:text-green-600 transition-colors text-sm font-medium"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/pro/signup"
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Go Pro
                  </Link>
                </>
              )
            )}
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 inset-x-0 bg-white border-b border-gray-200 shadow-lg z-50">
          <nav className="flex flex-col px-4 py-4 gap-1">
            <Link
              href="/states"
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-700 hover:bg-green-50 hover:text-green-600 px-4 py-3 rounded-lg transition-colors font-medium"
            >
              Browse by State
            </Link>
            <Link
              href="/guides"
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-700 hover:bg-green-50 hover:text-green-600 px-4 py-3 rounded-lg transition-colors font-medium"
            >
              Guides
            </Link>
            <Link
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-700 hover:bg-green-50 hover:text-green-600 px-4 py-3 rounded-lg transition-colors font-medium"
            >
              Blog
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-700 hover:bg-green-50 hover:text-green-600 px-4 py-3 rounded-lg transition-colors font-medium"
            >
              About
            </Link>
            <Link
              href="/claim"
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-700 hover:bg-green-50 hover:text-green-600 px-4 py-3 rounded-lg transition-colors font-medium"
            >
              List Free
            </Link>
            {!loading && (
              user ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg text-center font-medium transition-colors mt-1"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2 text-gray-500 hover:text-gray-700 px-4 py-3 rounded-lg transition-colors font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-gray-700 hover:bg-green-50 hover:text-green-600 px-4 py-3 rounded-lg transition-colors font-medium"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/pro/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg text-center font-medium transition-colors mt-1"
                  >
                    Go Pro
                  </Link>
                </>
              )
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
