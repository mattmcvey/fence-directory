import { MetadataRoute } from 'next';
import { getCities, getStates } from '@/lib/data';
import { BLOG_POSTS } from '@/lib/blog-data';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://getfencefind.com';
  const today = new Date().toISOString().split('T')[0];

  const [cities, states] = await Promise.all([
    getCities(),
    Promise.resolve(getStates()),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: today, changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/states`, lastModified: today, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/cities`, lastModified: today, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/claim`, lastModified: today, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/pricing`, lastModified: today, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/about`, lastModified: today, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/advertise`, lastModified: today, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: today, changeFrequency: 'monthly', priority: 0.5 },
  ];

  const guides = [
    'fence-cost', 'choosing-material', 'wood-vs-vinyl', 'fence-permits',
    'privacy-fence', 'chain-link-fence', 'fence-repair', 'how-long-fence-installation',
    'fence-roi', 'getting-quotes', 'best-time-to-install',
  ];
  const guidePages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/guides`, lastModified: today, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/fence-cost-by-state`, lastModified: today, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/fence-permits`, lastModified: today, changeFrequency: 'monthly', priority: 0.8 },
    ...guides.map((guide) => ({
      url: `${baseUrl}/guides/${guide}`,
      lastModified: today,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];

  const blogPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/blog`, lastModified: today, changeFrequency: 'weekly', priority: 0.8 },
    ...BLOG_POSTS.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: today,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];

  const statePages: MetadataRoute.Sitemap = states.map((state) => ({
    url: `${baseUrl}/state/${state.slug}`,
    lastModified: today,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const cityPages: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${baseUrl}/city/${city.slug}`,
    lastModified: today,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const fenceCostPages: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${baseUrl}/fence-cost/${city.slug}`,
    lastModified: today,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const fencePermitPages: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${baseUrl}/fence-permits/${city.slug}`,
    lastModified: today,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // Contractor pages are discoverable via city pages (internal links).
  // Including all 5,121 would make this sitemap too large for a single file.
  // Google crawls them via the city page links instead.

  return [
    ...staticPages,
    ...guidePages,
    ...blogPages,
    ...statePages,
    ...cityPages,
    ...fenceCostPages,
    ...fencePermitPages,
  ];
}
