import { Metadata } from 'next';
import { ogMeta } from '@/lib/seo';
import ProSignupForm from './ProSignupForm';

export const metadata: Metadata = {
  title: 'Start FenceFind Pro — 14-Day Free Trial | $79/mo',
  description: 'Get unlimited leads, featured placement, and a Verified Pro badge. $79/mo after your 14-day free trial. One fence job pays for 4+ years. Cancel anytime.',
  ...ogMeta({
    title: 'Start FenceFind Pro — 14-Day Free Trial | $79/mo',
    description: 'Get unlimited leads, featured placement, and a Verified Pro badge. $79/mo after your 14-day free trial. Cancel anytime.',
    path: '/pro/signup',
  }),
};

export default function ProSignupPage() {
  return <ProSignupForm />;
}
