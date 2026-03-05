import { createGuideOgImage, ogSize } from '@/lib/og-helpers';

export const runtime = 'edge';
export const alt = 'FenceFind Guide';
export const size = ogSize;
export const contentType = 'image/png';

export default function Image() {
  return createGuideOgImage('How to Choose the Right Fence Material');
}
