// Client-side pageview tracker
// Sends pageview data to our API route

function getDeviceType(): string {
  if (typeof window === 'undefined') return 'unknown';
  const ua = navigator.userAgent;
  if (/tablet|ipad|playbook|silk/i.test(ua)) return 'tablet';
  if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(ua)) return 'mobile';
  return 'desktop';
}

function getBrowser(): string {
  if (typeof window === 'undefined') return 'unknown';
  const ua = navigator.userAgent;
  if (ua.includes('Firefox/')) return 'Firefox';
  if (ua.includes('Edg/')) return 'Edge';
  if (ua.includes('Chrome/') && !ua.includes('Edg/')) return 'Chrome';
  if (ua.includes('Safari/') && !ua.includes('Chrome/')) return 'Safari';
  if (ua.includes('Opera/') || ua.includes('OPR/')) return 'Opera';
  return 'Other';
}

function getOS(): string {
  if (typeof window === 'undefined') return 'unknown';
  const ua = navigator.userAgent;
  if (ua.includes('Windows')) return 'Windows';
  if (ua.includes('Mac OS')) return 'macOS';
  if (ua.includes('Linux')) return 'Linux';
  if (ua.includes('Android')) return 'Android';
  if (/iPhone|iPad|iPod/.test(ua)) return 'iOS';
  return 'Other';
}

// Generate a daily session hash (privacy-friendly, like Vercel)
function getSessionId(): string {
  const today = new Date().toISOString().split('T')[0];
  const key = `ff_sid_${today}`;
  let sid = sessionStorage.getItem(key);
  if (!sid) {
    sid = crypto.randomUUID();
    // Clear old session IDs
    for (let i = 0; i < sessionStorage.length; i++) {
      const k = sessionStorage.key(i);
      if (k && k.startsWith('ff_sid_') && k !== key) {
        sessionStorage.removeItem(k);
      }
    }
    sessionStorage.setItem(key, sid);
  }
  return sid;
}

let tracked = new Set<string>();

export function trackPageview(path?: string) {
  if (typeof window === 'undefined') return;

  const pagePath = path || window.location.pathname;

  // Don't track admin pages or duplicate pageviews in same navigation
  if (pagePath.startsWith('/admin')) return;
  if (tracked.has(pagePath)) return;
  tracked.add(pagePath);

  const sessionId = getSessionId();

  const data = {
    path: pagePath,
    referrer: document.referrer || null,
    device_type: getDeviceType(),
    browser: getBrowser(),
    os: getOS(),
    session_id: sessionId,
  };

  // Use sendBeacon for reliability (won't block navigation)
  const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
  navigator.sendBeacon('/api/analytics/track', blob);
}

// Reset tracked pages (call on route change)
export function resetTracking() {
  tracked.clear();
}
