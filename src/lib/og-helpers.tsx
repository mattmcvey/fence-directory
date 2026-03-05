import { ImageResponse } from 'next/og';

export const ogSize = { width: 1200, height: 630 };

export function createGuideOgImage(title: string) {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
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
            justifyContent: 'center',
            flex: 1,
            padding: '60px 80px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '40px',
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                backgroundColor: '#16a34a',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '20px',
                fontWeight: 700,
              }}
            >
              F
            </div>
            <span style={{ fontSize: '24px', fontWeight: 600, color: '#6b7280' }}>
              FenceFind
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '24px',
            }}
          >
            <div
              style={{
                backgroundColor: '#dcfce7',
                color: '#16a34a',
                padding: '6px 16px',
                borderRadius: '20px',
                fontSize: '18px',
                fontWeight: 600,
              }}
            >
              Guide
            </div>
          </div>
          <h1
            style={{
              fontSize: '48px',
              fontWeight: 700,
              color: '#111827',
              lineHeight: 1.3,
              maxWidth: '900px',
            }}
          >
            {title}
          </h1>
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
    { ...ogSize }
  );
}
