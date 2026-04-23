'use client';

import { ReactNode, MouseEvent } from 'react';

interface TrackableLinkProps {
  href: string;
  contractorId: string;
  eventType: 'phone_click' | 'website_click';
  className?: string;
  children: ReactNode;
  external?: boolean;
}

export default function TrackableLink({
  href,
  contractorId,
  eventType,
  className,
  children,
  external,
}: TrackableLinkProps) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Fire tracking event — use sendBeacon for reliability (doesn't block navigation)
    const payload = JSON.stringify({ contractorId, eventType });
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/events', new Blob([payload], { type: 'application/json' }));
    } else {
      fetch('/api/events', { method: 'POST', body: payload, keepalive: true });
    }
    // Let the default link behavior proceed
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={className}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  );
}
