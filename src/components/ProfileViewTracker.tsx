'use client';

import { useEffect } from 'react';

export default function ProfileViewTracker({ contractorId }: { contractorId: string }) {
  useEffect(() => {
    const payload = JSON.stringify({ contractorId, eventType: 'profile_view' });
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/events', new Blob([payload], { type: 'application/json' }));
    } else {
      fetch('/api/events', { method: 'POST', body: payload, keepalive: true });
    }
  }, [contractorId]);

  return null;
}
