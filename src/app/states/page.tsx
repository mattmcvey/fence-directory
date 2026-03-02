import { MAJOR_STATES } from '@/lib/seed-data';
import { stateCodeToName } from '@/lib/utils';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Browse Fence Contractors by State — FenceFind',
  description: 'Find fence contractors in all 50 states. Browse our directory of licensed, insured fence installers near you.',
};

// All 50 states for the full browse page
const ALL_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
  'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
  'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
  'Wisconsin', 'Wyoming',
];

export default function StatesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Fence Contractors by State</h1>
      <p className="text-gray-600 mb-10">Find licensed fence installers in all 50 states</p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {ALL_STATES.map((state) => {
          const slug = state.toLowerCase().replace(/\s+/g, '-');
          const stateData = MAJOR_STATES.find((s) => s.name === state);
          return (
            <Link
              key={state}
              href={`/state/${slug}`}
              className="p-4 bg-white border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-all group"
            >
              <div className="font-semibold text-gray-900 group-hover:text-green-600">{state}</div>
              {stateData && (
                <div className="text-sm text-gray-500">{stateData.contractorCount} contractors</div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
