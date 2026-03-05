import { MetadataRoute } from 'next';
import { getCities, getAllContractorSlugs, getStates } from '@/lib/data';
import { BLOG_POSTS } from '@/lib/blog-data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://getfencefind.com';

  // Fixed dates — avoid new Date() which makes Google think everything updates daily
  const CONTENT_UPDATED = '2026-03-01';
  const SITE_UPDATED = '2026-03-05';

  const [cities, contractorSlugs, states] = await Promise.all([
    getCities(),
    getAllContractorSlugs(),
    Promise.resolve(getStates()),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: SITE_UPDATED, changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/states`, lastModified: CONTENT_UPDATED, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/search`, lastModified: CONTENT_UPDATED, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/claim`, lastModified: CONTENT_UPDATED, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/pricing`, lastModified: CONTENT_UPDATED, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/about`, lastModified: CONTENT_UPDATED, changeFrequency: 'monthly', priority: 0.5 },
  ];

  // Guide pages
  const guides = [
    'fence-cost', 'choosing-material', 'wood-vs-vinyl', 'fence-permits',
    'privacy-fence', 'chain-link-fence', 'fence-repair', 'how-long-fence-installation',
    'fence-roi', 'getting-quotes', 'best-time-to-install',
  ];
  const guidePages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/guides`, lastModified: CONTENT_UPDATED, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/fence-cost-by-state`, lastModified: CONTENT_UPDATED, changeFrequency: 'monthly', priority: 0.8 },
    ...guides.map((guide) => ({
      url: `${baseUrl}/guides/${guide}`,
      lastModified: CONTENT_UPDATED,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];

  // Blog pages
  const blogPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/blog`, lastModified: SITE_UPDATED, changeFrequency: 'weekly', priority: 0.8 },
    ...BLOG_POSTS.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: CONTENT_UPDATED,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];

  const statePages: MetadataRoute.Sitemap = states.map((state) => ({
    url: `${baseUrl}/state/${state.slug}`,
    lastModified: CONTENT_UPDATED,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // City pages (high priority — local landing pages)
  const cityPages: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${baseUrl}/city/${city.slug}`,
    lastModified: CONTENT_UPDATED,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Fence cost pages (high priority — money keywords)
  const fenceCostPages: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${baseUrl}/fence-cost/${city.slug}`,
    lastModified: CONTENT_UPDATED,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // Fence permit pages
  const fencePermitPages: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${baseUrl}/fence-permits/${city.slug}`,
    lastModified: CONTENT_UPDATED,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // Contractor pages — use a fixed date since we don't have updated_at available in slugs-only query
  const contractorPages: MetadataRoute.Sitemap = contractorSlugs.map((slug) => ({
    url: `${baseUrl}/contractor/${slug}`,
    lastModified: CONTENT_UPDATED,
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...guidePages,
    ...blogPages,
    ...statePages,
    ...cityPages,
    ...fenceCostPages,
    ...fencePermitPages,
    ...contractorPages,
  ];
}
