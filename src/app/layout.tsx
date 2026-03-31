import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageviewTracker from '@/components/PageviewTracker';
import { organizationSchema } from '@/lib/seo';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://getfencefind.com'),
  title: {
    default: 'FenceFind — Find Trusted Fence Contractors Near You',
    template: '%s',
  },
  description: 'Compare top-rated fence contractors in your area. Read reviews, get free estimates, and find licensed fence installers for wood, vinyl, chain link, and more.',
  keywords: 'fence contractor, fence installer, fence company near me, fence installation, fence repair, wood fence, vinyl fence, chain link fence, fence cost',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {

  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
        />
      </head>
      <body className={`${inter.className} bg-gray-50 min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <PageviewTracker />
        <Analytics />
      </body>
    </html>
  );
}
