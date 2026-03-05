import { ImageResponse } from 'next/og';
import { getCityBySlug } from '@/lib/data';

export const runtime = 'edge';
export const alt = 'Fence Contractors on FenceFind';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const city = await getCityBySlug(slug);

  const cityName = city ? `${city.name}, ${city.stateCode}` : 'Your City';
  const count = city?.contractorCount || 0;

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

          <h1
            style={{
              fontSize: '52px',
              fontWeight: 700,
              color: '#111827',
              lineHeight: 1.2,
              marginBottom: '16px',
            }}
          >
            Best Fence Contractors in {cityName}
          </h1>

          <p style={{ fontSize: '28px', color: '#4b5563', marginBottom: '24px' }}>
            {count}+ rated &amp; reviewed local fence installers
          </p>

          <p style={{ fontSize: '22px', color: '#9ca3af' }}>
            Compare prices, read reviews, get free estimates
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
