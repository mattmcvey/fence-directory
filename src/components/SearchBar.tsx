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
      router.push(`/search?q=${encodeURIComponent(location.trim())}`);
    }
  };

  const isLarge = size === 'lg';

  return (
    <form onSubmit={handleSubmit} className={`w-full max-w-2xl ${className}`}>
      {/* Desktop: single row pill */}
      <div className={`flex items-center bg-white rounded-full shadow-lg border border-gray-200 ${isLarge ? 'p-1.5 sm:p-2' : 'p-1'}`}>
        <MapPin className={`${isLarge ? 'ml-3 sm:ml-4 w-5 h-5 sm:w-6 sm:h-6' : 'ml-3 w-5 h-5'} text-gray-400 flex-shrink-0`} />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder={isLarge ? 'City or zip code...' : 'Enter your city or zip code...'}
          className={`flex-1 min-w-0 outline-none bg-transparent text-gray-800 placeholder-gray-400 ${isLarge ? 'px-2 sm:px-4 py-2.5 sm:py-3 text-base sm:text-lg' : 'px-3 py-2 text-base'}`}
        />
        <button
          type="submit"
          className={`bg-green-600 hover:bg-green-700 text-white rounded-full flex items-center justify-center transition-colors flex-shrink-0 ${isLarge ? 'p-3 sm:px-8 sm:py-3 text-base sm:text-lg font-semibold' : 'p-2.5 sm:px-6 sm:py-2 text-base font-medium'}`}
        >
          <Search className={`${isLarge ? 'w-5 h-5 sm:mr-2' : 'w-4 h-4 sm:mr-1.5'}`} />
          <span className="hidden sm:inline">Search</span>
        </button>
      </div>
    </form>
  );
}
