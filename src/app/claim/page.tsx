import { Metadata } from 'next';
import { ogMeta } from '@/lib/seo';
import ClaimForm from './ClaimForm';

export const metadata: Metadata = {
  title: 'List or Claim Your Fence Business — FenceFind',
  description: 'Add your fence company to FenceFind for free or claim an existing listing. Get found by homeowners searching for fence contractors in your area. Upgrade to Pro for featured placement and unlimited leads.',
  ...ogMeta({
    title: 'List or Claim Your Fence Business — FenceFind',
    description: 'Add your fence company to FenceFind for free or claim an existing listing. Get found by homeowners searching for fence contractors in your area.',
    path: '/claim',
  }),
};

export default function ClaimPage() {
  return <ClaimForm />;
}
