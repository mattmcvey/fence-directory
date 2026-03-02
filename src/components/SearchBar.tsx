'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Search } from 'lucide-react';

interface SearchBarProps {
  size?: 'lg' | 'md';
  defaultValue?: string;
  className?: string;
}

export default function SearchBar({ size = 'md', defaultValue = '', className = '' }: SearchBarProps) {
  const [location, setLocation] = useState(defaultValue);
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (location.trim()) {
      const slug = location.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      router.push(`/search?q=${encodeURIComponent(location.trim())}`);
    }
  };

  const isLarge = size === 'lg';

  return (
    <form onSubmit={handleSubmit} className={`w-full max-w-2xl ${className}`}>
      <div className={`flex items-center bg-white rounded-full shadow-lg border border-gray-200 ${isLarge ? 'p-2' : 'p-1'}`}>
        <MapPin className={`${isLarge ? 'ml-4 w-6 h-6' : 'ml-3 w-5 h-5'} text-gray-400 flex-shrink-0`} />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter your city or zip code..."
          className={`flex-1 outline-none bg-transparent text-gray-800 placeholder-gray-400 ${isLarge ? 'px-4 py-3 text-lg' : 'px-3 py-2 text-base'}`}
        />
        <button
          type="submit"
          className={`bg-green-600 hover:bg-green-700 text-white rounded-full flex items-center justify-center transition-colors flex-shrink-0 ${isLarge ? 'px-8 py-3 text-lg font-semibold' : 'px-6 py-2 text-base font-medium'}`}
        >
          <Search className={`${isLarge ? 'w-5 h-5 mr-2' : 'w-4 h-4 mr-1.5'}`} />
          Search
        </button>
      </div>
    </form>
  );
}
