import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FenceFind — Find Trusted Fence Contractors Near You',
  description: 'Compare top-rated fence contractors in your area. Read reviews, get free estimates, and find licensed fence installers for wood, vinyl, chain link, and more.',
  keywords: 'fence contractor, fence installer, fence company near me, fence installation, fence repair, wood fence, vinyl fence, chain link fence',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
