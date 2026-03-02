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
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div>
            <Link href={`/contractor/${contractor.slug}`}>
              <h3 className="text-xl font-bold text-gray-900 hover:text-green-600 transition-colors">
                {contractor.name}
              </h3>
            </Link>
            <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
              <MapPin className="w-4 h-4" />
              <span>{contractor.city}, {contractor.state}</span>
              {distance !== undefined && (
                <span className="text-gray-400">• {distance} mi away</span>
              )}
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <span className="font-bold text-gray-900">{contractor.rating}</span>
            </div>
            <span className="text-xs text-gray-500">{contractor.reviewCount} reviews</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{contractor.description}</p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {contractor.materials.slice(0, 5).map((m) => (
            <span key={m} className="bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-full">
              {MATERIAL_LABELS[m] || m}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-4">
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

        <div className="flex gap-3 pt-3 border-t border-gray-100">
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
              className="px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
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
