import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BLOG_POSTS, getBlogPost } from '@/lib/blog-data';
import { ogMeta } from '@/lib/seo';
import { ArrowLeft } from 'lucide-react';
import AverageFenceCosts from './posts/average-fence-costs';
import FiveQuestions from './posts/five-questions';
import BestFenceForDogs from './posts/best-fence-for-dogs';
import CheapFenceIdeasPrivacy from './posts/cheap-fence-ideas-privacy';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: 'Post Not Found — FenceFind' };
  return {
    title: `${post.title} | FenceFind Blog`,
    description: post.metaDescription,
    ...ogMeta({
      title: `${post.title} | FenceFind Blog`,
      description: post.metaDescription,
      path: `/blog/${slug}`,
      type: 'article',
    }),
  };
}

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

const POST_CONTENT: Record<string, React.ReactNode> = {
  'best-fence-for-dogs': <BestFenceForDogs />,
  'cheap-fence-ideas-for-privacy': <CheapFenceIdeasPrivacy />,
  'average-fence-installation-costs-2026': <AverageFenceCosts />,
  '5-questions-before-hiring-fence-contractor': <FiveQuestions />,
};

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const content = POST_CONTENT[slug];
  if (!content) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            description: post.metaDescription,
            author: { '@type': 'Organization', name: 'FenceFind' },
            publisher: { '@type': 'Organization', name: 'FenceFind', url: 'https://getfencefind.com' },
            datePublished: post.isoDate,
            dateModified: post.isoDate,
            mainEntityOfPage: `https://getfencefind.com/blog/${slug}`,
          }),
        }}
      />

      <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-green-600 mb-8">
        <ArrowLeft className="w-4 h-4" /> Back to Blog
      </Link>

      <article>
        <div className="flex items-center gap-3 mb-4">
          <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
            {post.category}
          </span>
          <time className="text-sm text-gray-400">{post.date}</time>
          <span className="text-sm text-gray-400">{post.readTime}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 leading-tight">
          {post.title}
        </h1>

        <div className="prose prose-lg prose-green max-w-none text-gray-700">
          {content}
        </div>
      </article>

      <div className="mt-12 border-t pt-8">
        <h3 className="font-bold text-gray-900 mb-4">Keep Reading</h3>
        <div className="grid gap-4">
          {BLOG_POSTS.filter((p) => p.slug !== slug)
            .slice(0, 2)
            .map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
              >
                <p className="font-semibold text-gray-900">{p.title}</p>
                <p className="text-sm text-gray-500 mt-1">{p.excerpt}</p>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
