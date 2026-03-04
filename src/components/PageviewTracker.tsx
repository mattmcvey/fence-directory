'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { trackPageview, resetTracking } from '@/lib/analytics';

export default function PageviewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    resetTracking();
    trackPageview(pathname);
  }, [pathname]);

  return null;
}
