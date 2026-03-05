import { ImageResponse } from 'next/og';
import { getContractorBySlug } from '@/lib/data';

export const runtime = 'edge';
export const alt = 'Fence Contractor on FenceFind';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const contractor = await getContractorBySlug(slug);

  const name = contractor?.name || 'Fence Contractor';
  const location = contractor ? `${contractor.city}, ${contractor.state}` : '';
  const rating = contractor?.rating || 0;
  const reviewCount = contractor?.reviewCount || 0;

  const stars = '★'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating));

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
            {name}
          </h1>

          {location && (
            <p style={{ fontSize: '28px', color: '#4b5563', marginBottom: '24px' }}>
              {location}
            </p>
          )}

          {rating > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '32px', color: '#facc15', letterSpacing: '2px' }}>
                {stars}
              </span>
              <span style={{ fontSize: '24px', color: '#6b7280' }}>
                {rating.toFixed(1)} ({reviewCount} reviews)
              </span>
            </div>
          )}
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
