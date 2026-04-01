import { requireAdmin } from '@/lib/auth';
import { getServiceClient } from '@/lib/supabase';
import Link from 'next/link';
import { FileText, Users, MessageSquare, BarChart3 } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard — FenceFind',
  robots: { index: false },
};

export default async function AdminPage() {
  await requireAdmin();

  const supabase = getServiceClient();

  const [contractorResult, pendingResult, quoteResult] = await Promise.all([
    supabase.from('contractors').select('id', { count: 'exact', head: true }),
    supabase.from('claim_requests').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('quote_requests').select('id', { count: 'exact', head: true }),
  ]);

  const stats = [
    {
      label: 'Total Contractors',
      value: contractorResult.count || 0,
      icon: Users,
      color: 'bg-green-50 text-green-600',
      href: '/admin/contractors',
    },
    {
      label: 'Pending Claims',
      value: pendingResult.count || 0,
      icon: FileText,
      color: 'bg-yellow-50 text-yellow-600',
      href: '/admin/claims',
    },
    {
      label: 'Total Quotes',
      value: quoteResult.count || 0,
      icon: MessageSquare,
      color: 'bg-blue-50 text-blue-600',
      href: '/admin/claims',
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Admin Dashboard</h1>
      <p className="text-gray-600 mb-8">FenceFind management overview</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-sm text-gray-500">{stat.label}</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value.toLocaleString()}</p>
            </Link>
          );
        })}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-semibold text-gray-900 mb-4">Quick Links</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            href="/admin/claims"
            className="flex items-center gap-3 px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <FileText className="w-5 h-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Manage Claims</span>
          </Link>
          <Link
            href="/admin/contractors"
            className="flex items-center gap-3 px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <Users className="w-5 h-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Manage Contractors</span>
          </Link>
          <Link
            href="/admin/analytics"
            className="flex items-center gap-3 px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <BarChart3 className="w-5 h-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">View Analytics</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
