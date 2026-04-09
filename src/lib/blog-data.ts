export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  isoDate: string;
  category: string;
  readTime: string;
  metaDescription: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'metal-vs-wood-fence-comparison',
    title: 'Metal vs Wood Fence: Complete Cost & Durability Comparison 2024',
    excerpt: 'Choosing between metal and wood fencing? Compare costs, durability, and maintenance to find the perfect fence for your property.',
    date: 'April 9, 2026',
    isoDate: '2026-04-09',
    category: 'Materials',
    readTime: '8 min read',
    metaDescription: 'Metal vs wood fence comparison: costs, durability, maintenance & installation. Expert guide to choosing the best fencing material for your home in 2024.',
  },
  {
    slug: 'best-fence-for-dogs',
    title: 'Best Fence for Dogs: A Complete Guide by Breed Size and Behavior',
    excerpt: 'From escape artists to diggers, find the right fence type, height, and material to keep your dog safe — plus costs and DIY vs. pro advice.',
    date: 'April 9, 2026',
    isoDate: '2026-04-09',
    category: 'Pet Fencing',
    readTime: '8 min read',
    metaDescription: 'Best fence for dogs by breed size and behavior. Compare wood, vinyl, chain link, and aluminum fences for dogs. Height guides, dig-proof tips, and costs.',
  },
  {
    slug: 'cheap-fence-ideas-for-privacy',
    title: '8 Cheap Fence Ideas for Privacy (That Actually Look Good)',
    excerpt: 'Privacy fencing doesn\'t have to cost a fortune. These budget-friendly options start at $1 per foot and still give you the seclusion you want.',
    date: 'April 9, 2026',
    isoDate: '2026-04-09',
    category: 'Budget Guide',
    readTime: '8 min read',
    metaDescription: 'Cheap fence ideas for privacy: 8 budget-friendly options from $1-25/ft. DIY and pro options including bamboo, stockade, privacy slats, and more.',
  },
  {
    slug: 'average-fence-installation-costs-2026',
    title: 'Average Fence Installation Costs in 2026: A Complete Breakdown',
    excerpt: 'From wood privacy fences to vinyl and chain link, here\'s what you\'ll actually pay for fence installation in 2026 — plus smart ways to save.',
    date: 'March 1, 2026',
    isoDate: '2026-03-01',
    category: 'Cost Guide',
    readTime: '8 min read',
    metaDescription: 'Complete breakdown of fence installation costs in 2026. Average prices for wood ($15-35/ft), vinyl ($20-40/ft), chain link ($8-18/ft), and more. Tips to save money.',
  },
  {
    slug: '5-questions-before-hiring-fence-contractor',
    title: '5 Questions to Ask Before Hiring a Fence Contractor',
    excerpt: 'Don\'t sign a contract until you\'ve asked these five critical questions. Protect your investment and avoid common homeowner mistakes.',
    date: 'February 20, 2026',
    isoDate: '2026-02-20',
    category: 'Hiring Tips',
    readTime: '6 min read',
    metaDescription: '5 essential questions to ask before hiring a fence contractor. Learn how to verify licensing, insurance, warranties, and more to protect your investment.',
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
