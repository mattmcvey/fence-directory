import { Metadata } from 'next';
import Link from 'next/link';
import { ogMeta, breadcrumbSchema } from '@/lib/seo';
import { BLOG_POSTS } from '@/lib/blog-data';

export const metadata: Metadata = {
  title: 'Fence Blog — Tips, Costs & Expert Advice | FenceFind',
  description: 'Expert articles on fence installation costs, material comparisons, and tips for hiring contractors. Stay informed with the FenceFind blog.',
  ...ogMeta({
    title: 'Fence Blog — Tips, Costs & Expert Advice | FenceFind',
    description: 'Expert articles on fence installation costs, material comparisons, and tips for hiring contractors.',
    path: '/blog',
  }),
};

export default function BlogIndexPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Blog', url: '/blog' },
          ])),
        }}
      />
      <h1 className="text-4xl font-bold text-gray-900 mb-4">FenceFind Blog</h1>
      <p className="text-xl text-gray-600 mb-10">
        Expert advice on fence installation, costs, materials, and hiring the right contractor.
      </p>

      <div className="space-y-8">
        {BLOG_POSTS.map((post) => (
          <article
            key={post.slug}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
          >
            <Link href={`/blog/${post.slug}`}>
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                  {post.category}
                </span>
                <time className="text-sm text-gray-400">{post.date}</time>
                <span className="text-sm text-gray-400">{post.readTime}</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-green-600 transition-colors">
                {post.title}
              </h2>
              <p className="text-gray-600 leading-relaxed">{post.excerpt}</p>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
