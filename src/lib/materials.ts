import type { FenceMaterial } from '@/types';

export interface MaterialConfig {
  slug: string;
  dbValue: FenceMaterial;
  name: string;
  costKey: string;
  description: string;
  pros: string[];
  cons: string[];
  bestFor: string;
  lifespan: string;
  maintenance: string;
  guideLink: string;
  guideName: string;
}

export const MATERIALS: MaterialConfig[] = [
  {
    slug: 'wood',
    dbValue: 'wood',
    name: 'Wood',
    costKey: 'wood',
    description: 'Wood is America\'s most popular fence material, offering classic aesthetics, full privacy, and design flexibility. Cedar and pressure-treated pine are the most common choices.',
    pros: ['Most affordable privacy option', 'Dozens of style options', 'Easy to repair', 'Can be stained any color', 'Natural, warm appearance'],
    cons: ['Requires staining/sealing every 2-3 years', '15-20 year lifespan', 'Susceptible to rot and insects', 'Can warp in humid climates'],
    bestFor: 'Homeowners who want privacy and design flexibility at a moderate price',
    lifespan: '15-20 years',
    maintenance: 'Stain or seal every 2-3 years; repair loose boards as needed',
    guideLink: '/guides/privacy-fence',
    guideName: 'Privacy Fence Guide',
  },
  {
    slug: 'vinyl',
    dbValue: 'vinyl',
    name: 'Vinyl',
    costKey: 'vinyl',
    description: 'Vinyl fencing delivers full privacy with zero maintenance. It won\'t rot, warp, or attract insects, making it ideal for homeowners who want a "set it and forget it" fence.',
    pros: ['Zero maintenance', '20-30 year lifespan', 'Won\'t rot, warp, or fade', 'Resistant to insects', 'No painting or staining needed'],
    cons: ['Higher upfront cost than wood', 'Fewer style and color options', 'Can crack in extreme cold', 'Harder to repair than wood'],
    bestFor: 'Homeowners who want long-term value with no maintenance',
    lifespan: '20-30 years',
    maintenance: 'Hose down once a year — that\'s it',
    guideLink: '/guides/wood-vs-vinyl',
    guideName: 'Wood vs Vinyl Guide',
  },
  {
    slug: 'chain-link',
    dbValue: 'chain-link',
    name: 'Chain Link',
    costKey: 'chainLink',
    description: 'Chain link is the most affordable fencing option available. It\'s durable, low-maintenance, and ideal for property boundaries, dog runs, and commercial applications.',
    pros: ['Lowest cost per foot', 'Virtually maintenance-free', '20-30 year lifespan', 'Transparent — doesn\'t block light', 'Quick to install'],
    cons: ['No privacy (without slats)', 'Basic appearance', 'Dogs can climb it', 'Can rust without vinyl coating'],
    bestFor: 'Budget-conscious homeowners, large properties, dog runs, and commercial use',
    lifespan: '20-30 years',
    maintenance: 'Virtually none; check for rust spots annually',
    guideLink: '/guides/chain-link-fence',
    guideName: 'Chain Link Fence Guide',
  },
  {
    slug: 'aluminum',
    dbValue: 'aluminum',
    name: 'Aluminum',
    costKey: 'aluminum',
    description: 'Aluminum fencing provides elegant, ornamental styling without the rust risk of wrought iron. It\'s ideal for front yards, pool enclosures, and decorative applications.',
    pros: ['Rust-proof and corrosion-resistant', 'Elegant, ornamental look', '30+ year lifespan', 'Virtually maintenance-free', 'Great for pools (meets code)'],
    cons: ['No privacy', 'Not as strong as wrought iron', 'Can bend under impact', 'Limited to ornamental styles'],
    bestFor: 'Front yards, pool areas, and decorative applications where appearance matters',
    lifespan: '30+ years',
    maintenance: 'Occasional rinse; touch up scratches to prevent oxidation',
    guideLink: '/guides/choosing-material',
    guideName: 'Choosing a Fence Material',
  },
  {
    slug: 'wrought-iron',
    dbValue: 'wrought-iron',
    name: 'Wrought Iron',
    costKey: 'wroughtIron',
    description: 'Wrought iron is the premium choice for homeowners who want maximum durability and classic curb appeal. It\'s the strongest residential fence material available.',
    pros: ['Unmatched durability (50+ years)', 'Classic, timeless aesthetics', 'Highest security', 'Increases property value', 'Custom designs available'],
    cons: ['Most expensive option', 'Requires rust treatment', 'Needs periodic repainting', 'No privacy', 'Heavy — harder to install'],
    bestFor: 'Upscale properties, historic homes, and maximum security applications',
    lifespan: '50+ years',
    maintenance: 'Rust treatment and repainting every 3-5 years',
    guideLink: '/guides/choosing-material',
    guideName: 'Choosing a Fence Material',
  },
  {
    slug: 'composite',
    dbValue: 'composite',
    name: 'Composite',
    costKey: 'composite',
    description: 'Composite fencing combines recycled wood fibers and plastic polymers to create a material that looks like wood but requires zero maintenance. It\'s the eco-friendly premium option.',
    pros: ['Looks like real wood', 'Zero maintenance', 'Eco-friendly (recycled materials)', '25-30 year lifespan', 'Won\'t rot, warp, or splinter'],
    cons: ['Highest upfront cost', 'Limited color options', 'Can fade slightly over time', 'Fewer contractors install it'],
    bestFor: 'Eco-conscious homeowners who want a wood look without the upkeep',
    lifespan: '25-30 years',
    maintenance: 'None required; occasional cleaning for aesthetics',
    guideLink: '/guides/choosing-material',
    guideName: 'Choosing a Fence Material',
  },
];

export function getMaterialBySlug(slug: string): MaterialConfig | undefined {
  return MATERIALS.find((m) => m.slug === slug);
}

export const MATERIAL_SLUGS = MATERIALS.map((m) => m.slug);
