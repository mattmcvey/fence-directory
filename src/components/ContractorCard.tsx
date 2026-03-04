import { Contractor } from '@/types';
import { formatPhone, MATERIAL_LABELS } from '@/lib/utils';
import { Star, Shield, CheckCircle, Phone, Globe, MapPin, Award } from 'lucide-react';
import Link from 'next/link';

interface ContractorCardProps {
  contractor: Contractor;
  distance?: number;
}

export default function ContractorCard({ contractor, distance }: ContractorCardProps) {
  return (
    <div className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border ${contractor.featured ? 'border-green-300 ring-1 ring-green-100' : 'border-gray-100'} overflow-hidden`}>
      {contractor.featured && (
        <div className="bg-green-600 text-white text-xs font-semibold px-4 py-1.5 flex items-center gap-1.5">
          <Award className="w-3.5 h-3.5" />
          Featured Contractor
        </div>
      )}
      <div className="p-4 sm:p-6">
        {/* Header: name + rating */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
          <div className="min-w-0">
            <Link href={`/contractor/${contractor.slug}`}>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 hover:text-green-600 transition-colors break-words">
                {contractor.name}
              </h3>
            </Link>
            <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{contractor.city}, {contractor.state}</span>
              {distance !== undefined && (
                <span className="text-gray-400 flex-shrink-0">• {distance} mi</span>
              )}
            </div>
          </div>
          <div className="flex items-center sm:flex-col sm:items-end gap-2 sm:gap-0 flex-shrink-0">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <span className="font-bold text-gray-900">{contractor.rating}</span>
            </div>
            <span className="text-xs text-gray-500">{contractor.reviewCount} reviews</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{contractor.description}</p>

        {/* Materials */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {contractor.materials.slice(0, 4).map((m) => (
            <span key={m} className="bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-full">
              {MATERIAL_LABELS[m] || m}
            </span>
          ))}
          {contractor.materials.length > 4 && (
            <span className="text-xs text-gray-400 px-1 py-1">+{contractor.materials.length - 4} more</span>
          )}
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-gray-600 mb-4">
          {contractor.licensed && (
            <span className="flex items-center gap-1">
              <Shield className="w-4 h-4 text-blue-500" /> Licensed
            </span>
          )}
          {contractor.insured && (
            <span className="flex items-center gap-1">
              <Shield className="w-4 h-4 text-blue-500" /> Insured
            </span>
          )}
          {contractor.freeEstimates && (
            <span className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-green-500" /> Free Estimates
            </span>
          )}
          {contractor.yearsInBusiness && (
            <span className="text-gray-500">{contractor.yearsInBusiness}+ years</span>
          )}
        </div>

        {/* CTA buttons — stack on mobile */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-3 border-t border-gray-100">
          <a
            href={`tel:${contractor.phone}`}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white text-center py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4" />
            {formatPhone(contractor.phone)}
          </a>
          {contractor.website && (
            <a
              href={contractor.website}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              <Globe className="w-4 h-4" />
              Website
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
