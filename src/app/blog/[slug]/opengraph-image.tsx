import { ImageResponse } from 'next/og';
import { getBlogPost } from '@/lib/blog-data';

export const runtime = 'edge';
export const alt = 'FenceFind Blog';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  const title = post?.title || 'FenceFind Blog';

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
              FenceFind Blog
            </span>
          </div>
          <h1
            style={{
              fontSize: '44px',
              fontWeight: 700,
              color: '#111827',
              lineHeight: 1.3,
              maxWidth: '900px',
            }}
          >
            {title}
          </h1>
          {post && (
            <p style={{ fontSize: '20px', color: '#6b7280', marginTop: '16px' }}>
              {post.date} | {post.readTime}
            </p>
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
