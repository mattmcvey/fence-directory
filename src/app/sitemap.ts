import { MetadataRoute } from 'next';
import { SEED_CONTRACTORS, SEED_CITIES, MAJOR_STATES } from '@/lib/seed-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://fencefind.com';

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1 },
    { url: `${baseUrl}/states`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/claim`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
  ];

  const statePages = MAJOR_STATES.map((state) => ({
    url: `${baseUrl}/state/${state.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const cityPages = SEED_CITIES.map((city) => ({
    url: `${baseUrl}/city/${city.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const contractorPages = SEED_CONTRACTORS.map((c) => ({
    url: `${baseUrl}/contractor/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...statePages, ...cityPages, ...contractorPages];
}
