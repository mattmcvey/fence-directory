'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

export default function CitySearch() {
  const [query, setQuery] = useState('');

  return (
    <div className="relative mb-8">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        type="text"
        placeholder="Filter cities..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          const sections = document.querySelectorAll('[data-city-section]');
          const val = e.target.value.toLowerCase();
          sections.forEach((section) => {
            const cards = section.querySelectorAll('[data-city]');
            let visible = 0;
            cards.forEach((card) => {
              const name = card.getAttribute('data-city') || '';
              const show = !val || name.toLowerCase().includes(val);
              (card as HTMLElement).style.display = show ? '' : 'none';
              if (show) visible++;
            });
            (section as HTMLElement).style.display = visible > 0 ? '' : 'none';
          });
        }}
        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
      />
    </div>
  );
}
