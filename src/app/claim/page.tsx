import { Metadata } from 'next';
import { ogMeta } from '@/lib/seo';
import ClaimForm from './ClaimForm';

export const metadata: Metadata = {
  title: 'Claim Your Fence Business Listing — FenceFind',
  description: 'List your fence company on FenceFind for free. Get found by homeowners searching for fence contractors in your area. Upgrade to Pro for featured placement and unlimited leads.',
  ...ogMeta({
    title: 'Claim Your Fence Business Listing — FenceFind',
    description: 'List your fence company on FenceFind for free. Get found by homeowners searching for fence contractors in your area.',
    path: '/claim',
  }),
};

export default function ClaimPage() {
  return <ClaimForm />;
}
