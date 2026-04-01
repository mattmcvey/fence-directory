import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getCities } from '@/lib/data';

type PageType = 'guide' | 'city' | 'contractor' | 'state';

interface RelatedLinksProps {
  pageType: PageType;
  currentSlug?: string;
  cityName?: string;
  stateCode?: string;
  stateName?: string;
  guideSlug?: string;
  topCities?: { name: string; slug: string; stateCode: string }[];
}

const GUIDE_INFO: Record<string, { title: string; tags: string[] }> = {
  'fence-cost': { title: 'Fence Installation Cost Guide', tags: ['cost', 'material', 'budget'] },
  'choosing-material': { title: 'How to Choose Fence Material', tags: ['material', 'comparison'] },
  'wood-vs-vinyl': { title: 'Wood vs Vinyl Fencing', tags: ['material', 'comparison', 'wood', 'vinyl'] },
  'fence-permits': { title: 'Fence Permit Guide', tags: ['permits', 'regulations'] },
  'privacy-fence': { title: 'Privacy Fence Guide', tags: ['privacy', 'material', 'wood', 'vinyl'] },
  'chain-link-fence': { title: 'Chain Link Fence Guide', tags: ['material', 'chain-link', 'budget'] },
  'fence-repair': { title: 'Fence Repair Guide', tags: ['repair', 'maintenance'] },
  'how-long-fence-installation': { title: 'How Long Does Fence Installation Take?', tags: ['installation', 'timeline'] },
  'fence-roi': { title: 'Fence ROI & Home Value', tags: ['cost', 'investment', 'value'] },
  'getting-quotes': { title: 'How to Get Fence Quotes', tags: ['quotes', 'hiring', 'cost'] },
  'best-time-to-install': { title: 'Best Time to Install a Fence', tags: ['installation', 'timeline', 'cost'] },
};

function getRelatedGuides(currentSlug?: string, limit = 3): { slug: string; title: string }[] {
  if (!currentSlug) {

    return [
      { slug: 'fence-cost', title: GUIDE_INFO['fence-cost'].title },
      { slug: 'choosing-material', title: GUIDE_INFO['choosing-material'].title },
      { slug: 'getting-quotes', title: GUIDE_INFO['getting-quotes'].title },
    ];
  }

  const current = GUIDE_INFO[currentSlug];
  if (!current) return [];

  const scored = Object.entries(GUIDE_INFO)
    .filter(([slug]) => slug !== currentSlug)
    .map(([slug, info]) => {
      const overlap = info.tags.filter(t => current.tags.includes(t)).length;
      return { slug, title: info.title, score: overlap };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return scored;
}

export default async function RelatedLinks({
  pageType,
  currentSlug,
  cityName,
  stateCode,
  stateName,
  guideSlug,
  topCities,
}: RelatedLinksProps) {
  const links: { href: string; label: string }[] = [];

  if (pageType === 'guide') {

    const cities = await getCities();
    const topCities = cities.slice(0, 3);
    for (const city of topCities) {
      links.push({
        href: `/city/${city.slug}`,
        label: `Fence contractors in ${city.name}, ${city.stateCode}`,
      });
    }
    const relatedGuides = getRelatedGuides(guideSlug);
    for (const guide of relatedGuides) {
      links.push({
        href: `/guides/${guide.slug}`,
        label: guide.title,
      });
    }
  } else if (pageType === 'city') {

    const relatedGuides = getRelatedGuides();
    for (const guide of relatedGuides) {
      links.push({
        href: `/guides/${guide.slug}`,
        label: guide.title,
      });
    }
    if (currentSlug) {
      links.push({
        href: `/fence-cost/${currentSlug}`,
        label: `Fence costs in ${cityName || 'your city'}`,
      });
      links.push({
        href: `/fence-permits/${currentSlug}`,
        label: `Fence permits in ${cityName || 'your city'}`,
      });
    }
  } else if (pageType === 'state') {

    const relatedGuides = getRelatedGuides();
    for (const guide of relatedGuides) {
      links.push({
        href: `/guides/${guide.slug}`,
        label: guide.title,
      });
    }
    links.push({
      href: '/states',
      label: 'Browse all states',
    });
    if (topCities) {
      for (const city of topCities.slice(0, 3)) {
        links.push({
          href: `/city/${city.slug}`,
          label: `Fence contractors in ${city.name}, ${city.stateCode}`,
        });
      }
    }
  } else if (pageType === 'contractor') {

    if (cityName && stateCode) {
      const citySlug = `${cityName}-${stateCode}`.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      links.push({
        href: `/city/${citySlug}`,
        label: `All fence contractors in ${cityName}, ${stateCode}`,
      });
      links.push({
        href: `/fence-cost/${citySlug}`,
        label: `Fence costs in ${cityName}`,
      });
    }
    const relatedGuides = getRelatedGuides();
    for (const guide of relatedGuides) {
      links.push({
        href: `/guides/${guide.slug}`,
        label: guide.title,
      });
    }
  }

  if (links.length === 0) return null;

  return (
    <section className="mt-10 bg-gray-50 rounded-xl p-6">
      <h3 className="font-bold text-gray-900 mb-4">Related Resources</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-green-600 hover:text-green-700 flex items-center gap-2 text-sm"
          >
            <ArrowRight className="w-3 h-3 flex-shrink-0" />
            {link.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
