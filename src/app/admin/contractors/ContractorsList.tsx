'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Star, Shield, Search, ExternalLink } from 'lucide-react';

interface ContractorRow {
  id: string;
  name: string;
  slug: string;
  city: string;
  state: string;
  phone: string;
  email: string | null;
  featured: boolean;
  verified: boolean;
  claimed: boolean;
  subscription_status: string | null;
  created_at: string;
}

export default function ContractorsList({ contractors }: { contractors: ContractorRow[] }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'featured' | 'verified' | 'claimed'>('all');
  const [toggling, setToggling] = useState<string | null>(null);
  const router = useRouter();

  const filtered = useMemo(() => {
    let result = contractors;

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.city.toLowerCase().includes(q) ||
          c.state.toLowerCase().includes(q) ||
          (c.email && c.email.toLowerCase().includes(q))
      );
    }

    if (filter === 'featured') result = result.filter((c) => c.featured);
    else if (filter === 'verified') result = result.filter((c) => c.verified);
    else if (filter === 'claimed') result = result.filter((c) => c.claimed);

    return result;
  }, [contractors, search, filter]);

  const handleToggle = async (id: string, field: 'featured' | 'verified', currentValue: boolean) => {
    setToggling(`${id}-${field}`);
    try {
      const res = await fetch(`/api/admin/contractors/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [field]: !currentValue }),
      });
      if (res.ok) {
        router.refresh();
      }
    } finally {
      setToggling(null);
    }
  };

  const FILTERS = [
    { key: 'all' as const, label: 'All', count: contractors.length },
    { key: 'featured' as const, label: 'Featured', count: contractors.filter((c) => c.featured).length },
    { key: 'verified' as const, label: 'Verified', count: contractors.filter((c) => c.verified).length },
    { key: 'claimed' as const, label: 'Claimed', count: contractors.filter((c) => c.claimed).length },
  ];

  return (
    <div>
      {/* Search + filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, city, state, or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1 w-fit">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                filter === f.key
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {f.label}
              <span className="ml-1 text-xs text-gray-400">({f.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-500 mb-4">{filtered.length} contractor{filtered.length !== 1 ? 's' : ''}</p>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <p className="text-gray-500">No contractors found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((contractor) => (
            <div key={contractor.id} className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900">{contractor.name}</h3>
                    {contractor.featured && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Featured</span>
                    )}
                    {contractor.verified && (
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">Verified</span>
                    )}
                    {contractor.claimed && (
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-medium">Claimed</span>
                    )}
                    {(contractor.subscription_status === 'active' || contractor.subscription_status === 'trialing') && (
                      <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-medium">Pro</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">
                    {contractor.city}, {contractor.state}
                    {contractor.phone && <> &middot; {contractor.phone}</>}
                    {contractor.email && <> &middot; {contractor.email}</>}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Added {new Date(contractor.created_at).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleToggle(contractor.id, 'featured', contractor.featured)}
                    disabled={toggling === `${contractor.id}-featured`}
                    title={contractor.featured ? 'Remove featured' : 'Make featured'}
                    className={`p-2 rounded-lg border transition-colors disabled:opacity-50 ${
                      contractor.featured
                        ? 'bg-green-50 border-green-200 text-green-600 hover:bg-green-100'
                        : 'bg-white border-gray-200 text-gray-400 hover:bg-gray-50 hover:text-green-600'
                    }`}
                  >
                    <Star className="w-4 h-4" fill={contractor.featured ? 'currentColor' : 'none'} />
                  </button>
                  <button
                    onClick={() => handleToggle(contractor.id, 'verified', contractor.verified)}
                    disabled={toggling === `${contractor.id}-verified`}
                    title={contractor.verified ? 'Remove verified' : 'Mark verified'}
                    className={`p-2 rounded-lg border transition-colors disabled:opacity-50 ${
                      contractor.verified
                        ? 'bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100'
                        : 'bg-white border-gray-200 text-gray-400 hover:bg-gray-50 hover:text-blue-600'
                    }`}
                  >
                    <Shield className="w-4 h-4" fill={contractor.verified ? 'currentColor' : 'none'} />
                  </button>
                  <a
                    href={`/contractor/${contractor.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="View public listing"
                    className="p-2 rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
