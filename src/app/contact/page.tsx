import { Metadata } from 'next';
import { ogMeta } from '@/lib/seo';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us — FenceFind',
  description: 'Have a question about FenceFind? Get in touch with our team. We typically respond within 24 hours.',
  ...ogMeta({
    title: 'Contact Us — FenceFind',
    description: 'Have a question about FenceFind? Get in touch with our team.',
    path: '/contact',
  }),
};

export default function ContactPage() {
  return <ContactForm />;
}
