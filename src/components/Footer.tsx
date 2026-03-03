import Link from 'next/link';
import { MAJOR_STATES } from '@/lib/seed-data';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">FenceFind</h3>
            <p className="text-sm leading-relaxed">
              Find trusted fence contractors in your area. Compare ratings, read reviews, and get free estimates from licensed professionals.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Popular States</h4>
            <ul className="space-y-2 text-sm">
              {MAJOR_STATES.slice(0, 6).map((state) => (
                <li key={state.code}>
                  <Link href={`/state/${state.slug}`} className="hover:text-green-400 transition-colors">
                    {state.name} Fence Contractors
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Guides</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/guides" className="hover:text-green-400 transition-colors">All Guides</Link></li>
              <li><Link href="/guides/fence-cost" className="hover:text-green-400 transition-colors">Fence Cost Guide</Link></li>
              <li><Link href="/guides/wood-vs-vinyl" className="hover:text-green-400 transition-colors">Wood vs Vinyl</Link></li>
              <li><Link href="/guides/privacy-fence" className="hover:text-green-400 transition-colors">Privacy Fences</Link></li>
              <li><Link href="/guides/getting-quotes" className="hover:text-green-400 transition-colors">Getting Quotes</Link></li>
              <li><Link href="/guides/fence-permits" className="hover:text-green-400 transition-colors">Permit Guide</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">For Contractors</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/claim" className="hover:text-green-400 transition-colors">Claim Your Listing</Link></li>
              <li><Link href="/pricing" className="hover:text-green-400 transition-colors">Premium Listings</Link></li>
              <li><Link href="/advertise" className="hover:text-green-400 transition-colors">Advertise</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>© {new Date().getFullYear()} FenceFind. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
