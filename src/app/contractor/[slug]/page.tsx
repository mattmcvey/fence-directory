import { getContractorBySlug, getAllContractorSlugs } from '@/lib/data';
import { formatPhone, MATERIAL_LABELS, SERVICE_LABELS } from '@/lib/utils';
import { Star, Shield, CheckCircle, Phone, Globe, MapPin, Clock, Award, ChevronLeft, Zap } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import QuoteForm from '@/components/QuoteForm';
import { localBusinessSchema, breadcrumbSchema, ogMeta } from '@/lib/seo';

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const contractor = await getContractorBySlug(slug);
  if (!contractor) return { title: 'Contractor Not Found — FenceFind' };
  const title = `${contractor.name} — Fence Contractor in ${contractor.city}, ${contractor.state} | FenceFind`;
  const description = `${contractor.name} is a ${contractor.rating}-star rated fence contractor in ${contractor.city}, ${contractor.state}. Licensed & insured. ${contractor.description.slice(0, 100)}. Get a free estimate today.`;
  return {
    title,
    description,
    ...ogMeta({ title, description, path: `/contractor/${slug}` }),
  };
}

export async function generateStaticParams() {
  const slugs = await getAllContractorSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function ContractorPage({ params }: PageProps) {
  const { slug } = await params;
  const contractor = await getContractorBySlug(slug);
  if (!contractor) notFound();

  const citySlug = `${contractor.city}-${contractor.state}`.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema(contractor)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: contractor.city, url: `/city/${citySlug}` },
            { name: contractor.name, url: `/contractor/${contractor.slug}` },
          ])),
        }}
      />

      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-500 mb-4 flex flex-wrap gap-1">
        <Link href="/" className="hover:text-green-600">Home</Link>
        <span>/</span>
        <Link href={`/city/${citySlug}`} className="hover:text-green-600">{contractor.city}, {contractor.state}</Link>
        <span>/</span>
        <span className="text-gray-900 truncate max-w-[200px]">{contractor.name}</span>
      </nav>

      {contractor.featured && (
        <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg px-4 py-2 mb-6 inline-flex items-center gap-2 text-sm font-medium">
          <Award className="w-4 h-4" /> Featured Contractor
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2">
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
        <div className="p-4 sm:p-6 lg:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{contractor.name}</h1>
          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 sm:gap-4 text-gray-600 mb-6">
            <div className="flex items-center gap-1 text-sm sm:text-base">
              <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <span>{contractor.address}, {contractor.city}, {contractor.state} {contractor.zip}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <span className="font-bold text-gray-900">{contractor.rating}</span>
              <span className="text-gray-500">({contractor.reviewCount} reviews)</span>
            </div>
          </div>

          <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">{contractor.description}</p>

          {/* Contact buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
            <a
              href={`tel:${contractor.phone}`}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Call {formatPhone(contractor.phone)}
            </a>
            {contractor.website && (
              <a
                href={contractor.website}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
              >
                <Globe className="w-5 h-5" />
                Visit Website
              </a>
            )}
          </div>

          {/* Claim & Quote CTAs */}
          {!contractor.claimed && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4 sm:p-6 mb-8">
              <p className="font-bold text-gray-900 mb-1">Is this your business?</p>
              <p className="text-gray-600 text-sm mb-4">
                Get unlimited leads, featured placement, and a verified Pro badge. 14-day free trial.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Link
                  href={`/pro/signup?id=${contractor.id}&business=${encodeURIComponent(contractor.name)}&city=${encodeURIComponent(contractor.city)}&state=${encodeURIComponent(contractor.state)}`}
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors"
                >
                  <Zap className="w-4 h-4" />
                  Start Pro — Free Trial
                </Link>
                <Link
                  href={`/claim?id=${contractor.id}&business=${encodeURIComponent(contractor.name)}&city=${encodeURIComponent(contractor.city)}&state=${encodeURIComponent(contractor.state)}`}
                  className="inline-flex items-center gap-2 border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
                >
                  Claim Free Listing
                </Link>
              </div>
            </div>
          )}

          {/* Details grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Services Offered</h2>
              <div className="flex flex-wrap gap-2">
                {contractor.services.map((s) => (
                  <span key={s} className="bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-sm font-medium">
                    {SERVICE_LABELS[s] || s}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Fence Materials</h2>
              <div className="flex flex-wrap gap-2">
                {contractor.materials.map((m) => (
                  <span key={m} className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-sm font-medium">
                    {MATERIAL_LABELS[m] || m}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Trust badges */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Business Details</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {contractor.licensed && (
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="w-5 h-5 text-blue-500" />
                  <span>Licensed</span>
                </div>
              )}
              {contractor.insured && (
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="w-5 h-5 text-blue-500" />
                  <span>Insured</span>
                </div>
              )}
              {contractor.freeEstimates && (
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Free Estimates</span>
                </div>
              )}
              {contractor.yearsInBusiness && (
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <span>{contractor.yearsInBusiness}+ Years</span>
                </div>
              )}
              {contractor.verified && (
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Verified</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-5 h-5 text-gray-400" />
                <span>{contractor.serviceRadius} mi radius</span>
              </div>
            </div>
          </div>
        </div>
      </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <QuoteForm contractorId={contractor.id} contractorName={contractor.name} />
          </div>
        </div>
      </div>

      {/* Related links for internal SEO */}
      <div className="mt-8 bg-gray-50 rounded-xl p-6">
        <h3 className="font-bold text-gray-900 mb-3">More in {contractor.city}</h3>
        <div className="flex flex-wrap gap-3">
          <Link href={`/city/${citySlug}`} className="text-green-600 hover:text-green-700 text-sm">
            All {contractor.city} contractors →
          </Link>
          <Link href={`/fence-cost/${citySlug}`} className="text-green-600 hover:text-green-700 text-sm">
            Fence cost in {contractor.city} →
          </Link>
          <Link href="/guides/getting-quotes" className="text-green-600 hover:text-green-700 text-sm">
            How to get quotes →
          </Link>
        </div>
      </div>
    </div>
  );
}
