import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'FenceFind — Find Trusted Fence Contractors Near You';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          backgroundColor: '#ffffff',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            padding: '60px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '32px',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                backgroundColor: '#16a34a',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '32px',
                fontWeight: 700,
              }}
            >
              F
            </div>
            <span style={{ fontSize: '48px', fontWeight: 700, color: '#111827' }}>
              FenceFind
            </span>
          </div>
          <p
            style={{
              fontSize: '28px',
              color: '#4b5563',
              textAlign: 'center',
              maxWidth: '700px',
              lineHeight: 1.4,
            }}
          >
            Find Trusted Fence Contractors Near You
          </p>
          <p
            style={{
              fontSize: '20px',
              color: '#9ca3af',
              textAlign: 'center',
              marginTop: '16px',
            }}
          >
            Compare ratings, read reviews, get free estimates
          </p>
        </div>
        <div
          style={{
            width: '100%',
            height: '8px',
            backgroundColor: '#16a34a',
          }}
        />
      </div>
    ),
    { ...size }
  );
}
