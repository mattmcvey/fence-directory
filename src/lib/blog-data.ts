export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  metaDescription: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'average-fence-installation-costs-2026',
    title: 'Average Fence Installation Costs in 2026: A Complete Breakdown',
    excerpt: 'From wood privacy fences to vinyl and chain link, here\'s what you\'ll actually pay for fence installation in 2026 — plus smart ways to save.',
    date: 'March 1, 2026',
    category: 'Cost Guide',
    readTime: '8 min read',
    metaDescription: 'Complete breakdown of fence installation costs in 2026. Average prices for wood ($15-35/ft), vinyl ($20-40/ft), chain link ($8-18/ft), and more. Tips to save money.',
  },
  {
    slug: 'wood-vs-vinyl-fencing',
    title: 'Wood vs Vinyl Fencing: Which Is Right for Your Home?',
    excerpt: 'Comparing the two most popular fence materials head-to-head on cost, durability, maintenance, appearance, and long-term value.',
    date: 'February 25, 2026',
    category: 'Material Guide',
    readTime: '7 min read',
    metaDescription: 'Wood vs vinyl fencing comparison: cost, durability, maintenance, and appearance. Find out which fence material is the best choice for your home and budget.',
  },
  {
    slug: '5-questions-before-hiring-fence-contractor',
    title: '5 Questions to Ask Before Hiring a Fence Contractor',
    excerpt: 'Don\'t sign a contract until you\'ve asked these five critical questions. Protect your investment and avoid common homeowner mistakes.',
    date: 'February 20, 2026',
    category: 'Hiring Tips',
    readTime: '6 min read',
    metaDescription: '5 essential questions to ask before hiring a fence contractor. Learn how to verify licensing, insurance, warranties, and more to protect your investment.',
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
