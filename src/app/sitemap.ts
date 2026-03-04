import { MetadataRoute } from 'next';
import { getCities, getAllContractorSlugs, getStates } from '@/lib/data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://getfencefind.com';

  const [cities, contractorSlugs, states] = await Promise.all([
    getCities(),
    getAllContractorSlugs(),
    Promise.resolve(getStates()),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/states`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/search`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/claim`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/pricing`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ];

  // Guide pages
  const guides = [
    'fence-cost', 'choosing-material', 'wood-vs-vinyl', 'fence-permits',
    'privacy-fence', 'chain-link-fence', 'fence-repair', 'how-long-fence-installation',
    'fence-roi', 'getting-quotes', 'best-time-to-install',
  ];
  const guidePages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/guides`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/fence-cost-by-state`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    ...guides.map((guide) => ({
      url: `${baseUrl}/guides/${guide}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];

  const statePages: MetadataRoute.Sitemap = states.map((state) => ({
    url: `${baseUrl}/state/${state.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // City pages (high priority — local landing pages)
  const cityPages: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${baseUrl}/city/${city.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Fence cost pages (high priority — money keywords)
  const fenceCostPages: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${baseUrl}/fence-cost/${city.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // Fence permit pages
  const fencePermitPages: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${baseUrl}/fence-permits/${city.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // Contractor pages
  const contractorPages: MetadataRoute.Sitemap = contractorSlugs.map((slug) => ({
    url: `${baseUrl}/contractor/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...guidePages,
    ...statePages,
    ...cityPages,
    ...fenceCostPages,
    ...fencePermitPages,
    ...contractorPages,
  ];
}
