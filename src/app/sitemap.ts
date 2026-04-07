import { MetadataRoute } from 'next';
import { getCities, getAllContractorSlugs, getStates } from '@/lib/data';
import { BLOG_POSTS } from '@/lib/blog-data';

const baseUrl = 'https://getfencefind.com';
const CONTRACTORS_PER_SITEMAP = 500;

// Sitemap IDs:
// 0 = static + guides + blog + states
// 1 = city pages
// 2 = fence-cost pages
// 3 = fence-permit pages
// 4+ = contractor pages (500 per sitemap)

export async function generateSitemaps() {
  const contractorSlugs = await getAllContractorSlugs();
  const contractorSitemapCount = Math.ceil(contractorSlugs.length / CONTRACTORS_PER_SITEMAP);

  const ids = [];
  for (let i = 0; i < 4 + contractorSitemapCount; i++) {
    ids.push({ id: i });
  }
  return ids;
}

export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
  const today = new Date().toISOString().split('T')[0];

  // Sitemap 0: static + guides + blog + states
  if (id === 0) {
    const states = getStates();
    const guides = [
      'fence-cost', 'choosing-material', 'wood-vs-vinyl', 'fence-permits',
      'privacy-fence', 'chain-link-fence', 'fence-repair', 'how-long-fence-installation',
      'fence-roi', 'getting-quotes', 'best-time-to-install',
    ];

    return [
      { url: baseUrl, lastModified: today, changeFrequency: 'daily', priority: 1 },
      { url: `${baseUrl}/states`, lastModified: today, changeFrequency: 'weekly', priority: 0.8 },
      { url: `${baseUrl}/cities`, lastModified: today, changeFrequency: 'weekly', priority: 0.8 },
      { url: `${baseUrl}/claim`, lastModified: today, changeFrequency: 'monthly', priority: 0.7 },
      { url: `${baseUrl}/pricing`, lastModified: today, changeFrequency: 'monthly', priority: 0.6 },
      { url: `${baseUrl}/about`, lastModified: today, changeFrequency: 'monthly', priority: 0.5 },
      { url: `${baseUrl}/advertise`, lastModified: today, changeFrequency: 'monthly', priority: 0.6 },
      { url: `${baseUrl}/contact`, lastModified: today, changeFrequency: 'monthly', priority: 0.5 },
      { url: `${baseUrl}/guides`, lastModified: today, changeFrequency: 'weekly', priority: 0.8 },
      { url: `${baseUrl}/fence-cost-by-state`, lastModified: today, changeFrequency: 'monthly', priority: 0.8 },
      ...guides.map((guide) => ({
        url: `${baseUrl}/guides/${guide}`,
        lastModified: today,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      })),
      { url: `${baseUrl}/blog`, lastModified: today, changeFrequency: 'weekly', priority: 0.8 },
      ...BLOG_POSTS.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: today,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      })),
      ...states.map((state) => ({
        url: `${baseUrl}/state/${state.slug}`,
        lastModified: today,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      })),
    ];
  }

  // Sitemap 1: city pages
  if (id === 1) {
    const cities = await getCities();
    return cities.map((city) => ({
      url: `${baseUrl}/city/${city.slug}`,
      lastModified: today,
      changeFrequency: 'weekly',
      priority: 0.8,
    }));
  }

  // Sitemap 2: fence-cost pages
  if (id === 2) {
    const cities = await getCities();
    return cities.map((city) => ({
      url: `${baseUrl}/fence-cost/${city.slug}`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.8,
    }));
  }

  // Sitemap 3: fence-permit pages
  if (id === 3) {
    const cities = await getCities();
    return cities.map((city) => ({
      url: `${baseUrl}/fence-permits/${city.slug}`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.7,
    }));
  }

  // Sitemap 4+: contractor pages (500 per sitemap)
  const contractorSlugs = await getAllContractorSlugs();
  const offset = (id - 4) * CONTRACTORS_PER_SITEMAP;
  const batch = contractorSlugs.slice(offset, offset + CONTRACTORS_PER_SITEMAP);

  return batch.map((slug) => ({
    url: `${baseUrl}/contractor/${slug}`,
    lastModified: today,
    changeFrequency: 'weekly',
    priority: 0.6,
  }));
}
