import Anthropic from '@anthropic-ai/sdk';
import * as fs from 'fs';
import * as path from 'path';

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------
const MODEL = 'claude-sonnet-4-20250514';
const MAX_TOKENS = 8192;

const INTERNAL_LINKS = [
  { href: '/search', label: 'Search fence contractors near you' },
  { href: '/guides/fence-cost', label: 'Fence Cost Guide' },
  { href: '/guides/privacy-fence', label: 'Privacy Fence Guide' },
  { href: '/guides/chain-link-fence', label: 'Chain Link Fence Guide' },
  { href: '/guides/fence-permits', label: 'fence permit requirements' },
  { href: '/fence-cost-by-state', label: 'fence costs by state' },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Turn "best fence for windy areas" into "best-fence-for-windy-areas" */
function slugify(topic: string): string {
  return topic
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/** Turn a slug into a PascalCase component name */
function componentName(slug: string): string {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join('');
}

/** Format a Date as "April 9, 2026" */
function formatDate(d: Date): string {
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/** Format a Date as "2026-04-09" */
function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

/** Choose a category from the topic text */
function inferCategory(topic: string): string {
  const t = topic.toLowerCase();
  if (t.includes('cost') || t.includes('price') || t.includes('budget') || t.includes('cheap')) return 'Cost Guide';
  if (t.includes('dog') || t.includes('pet') || t.includes('cat')) return 'Pet Fencing';
  if (t.includes('privacy')) return 'Privacy';
  if (t.includes('permit') || t.includes('regulation') || t.includes('law') || t.includes('hoa')) return 'Regulations';
  if (t.includes('diy') || t.includes('install')) return 'Installation';
  if (t.includes('contractor') || t.includes('hiring') || t.includes('pro')) return 'Hiring Tips';
  if (t.includes('material') || t.includes('wood') || t.includes('vinyl') || t.includes('chain') || t.includes('aluminum') || t.includes('composite')) return 'Materials';
  return 'Fencing Tips';
}

// ---------------------------------------------------------------------------
// Prompt
// ---------------------------------------------------------------------------

function buildPrompt(topic: string): string {
  return `You are a professional blog writer for FenceFind, a website that helps homeowners find and compare fence contractors.

Write a blog post about: "${topic}"

REQUIREMENTS:
1. Write ONLY the JSX content that goes inside the React component. Do NOT include the import statement, the function declaration, or the fragment wrapper — I will add those myself.
2. Start with an opening <p> paragraph that hooks the reader.
3. Use <h2> for major section headings and <h3> for sub-sections.
4. Use <p> for paragraphs, <ul>/<li> for bullet lists, and <strong> for emphasis.
5. Include 3-4 internal links using this exact JSX syntax:
   {' '}<Link href="/path" className="text-green-600 hover:text-green-700 font-medium">link text</Link>{' '}
   Choose from these internal pages:
${INTERNAL_LINKS.map((l) => `   - ${l.href} (${l.label})`).join('\n')}
6. IMPORTANT: Use &apos; for apostrophes and &quot; for double-quotes within text content. Never use raw ' or " inside JSX text.
7. Include a section titled "When to Hire a Pro" (use <h2>) with practical advice.
8. End with a call-to-action section that links to /search encouraging readers to find local fence contractors on FenceFind.
9. Target 1200-1800 words, approximately 8 min read.
10. Write in an authoritative but conversational tone — helpful, specific, and direct. Include specific costs, measurements, and practical details where relevant.
11. Do NOT include any markdown, code fences, or explanation. Output ONLY the raw JSX content.

EXAMPLE of the expected output format (abbreviated):
<p>Opening paragraph about the topic...</p>

<h2>First Section</h2>
<p>Content with <strong>bold terms</strong> and specific details...</p>

<h2>When to Hire a Pro</h2>
<p>Guidance about hiring professionals...</p>
<ul>
  <li>Reason one</li>
  <li>Reason two</li>
</ul>

<h2>Find a Fence Contractor Near You</h2>
<p>
  Closing CTA text.{' '}
  <Link href="/search" className="text-green-600 hover:text-green-700 font-medium">
    Search fence contractors near you
  </Link>{' '}
  on FenceFind and get free quotes.
</p>`;
}

function buildMetadataPrompt(topic: string, title: string): string {
  return `Given this blog post topic and title, generate metadata.

Topic: "${topic}"
Title: "${title}"

Return ONLY a JSON object (no markdown, no code fences) with these exact fields:
{
  "title": "A compelling SEO blog title (50-65 chars)",
  "excerpt": "A 1-2 sentence excerpt for the blog listing page (under 160 chars)",
  "metaDescription": "An SEO meta description (under 160 chars) with primary keywords"
}

The title should be specific and include relevant keywords. The excerpt should entice clicks. The meta description should be optimized for search engines.`;
}

// ---------------------------------------------------------------------------
// API Calls
// ---------------------------------------------------------------------------

async function generatePostContent(client: Anthropic, topic: string): Promise<string> {
  console.log('  Generating blog post content...');
  const response = await client.messages.create({
    model: MODEL,
    max_tokens: MAX_TOKENS,
    messages: [{ role: 'user', content: buildPrompt(topic) }],
  });

  const textBlock = response.content.find((b) => b.type === 'text');
  if (!textBlock || textBlock.type !== 'text') {
    throw new Error('No text content in API response');
  }

  let content = textBlock.text.trim();

  // Strip markdown code fences if the model wrapped the output
  content = content.replace(/^```(?:tsx?|jsx?|html)?\n?/i, '').replace(/\n?```$/i, '');

  return content;
}

async function generateMetadata(
  client: Anthropic,
  topic: string,
  title: string,
): Promise<{ title: string; excerpt: string; metaDescription: string }> {
  console.log('  Generating metadata...');
  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 1024,
    messages: [{ role: 'user', content: buildMetadataPrompt(topic, title) }],
  });

  const textBlock = response.content.find((b) => b.type === 'text');
  if (!textBlock || textBlock.type !== 'text') {
    throw new Error('No text content in metadata API response');
  }

  let raw = textBlock.text.trim();
  // Strip markdown code fences if present
  raw = raw.replace(/^```(?:json)?\n?/i, '').replace(/\n?```$/i, '');

  try {
    return JSON.parse(raw);
  } catch {
    throw new Error(`Failed to parse metadata JSON:\n${raw}`);
  }
}

// ---------------------------------------------------------------------------
// File Writers
// ---------------------------------------------------------------------------

function writePostFile(slug: string, name: string, jsxContent: string): string {
  const postsDir = path.resolve(__dirname, '../src/app/blog/[slug]/posts');
  const filePath = path.join(postsDir, `${slug}.tsx`);

  const fileContent = `import Link from 'next/link';

export default function ${name}() {
  return (
    <>
      ${jsxContent}
    </>
  );
}
`;

  fs.writeFileSync(filePath, fileContent, 'utf-8');
  return filePath;
}

function updateBlogData(
  slug: string,
  meta: { title: string; excerpt: string; metaDescription: string },
  date: Date,
  category: string,
): void {
  const blogDataPath = path.resolve(__dirname, '../src/lib/blog-data.ts');
  let content = fs.readFileSync(blogDataPath, 'utf-8');

  // Escape single quotes in metadata values for the TS source
  const safeTitle = meta.title.replace(/'/g, "\\'");
  const safeExcerpt = meta.excerpt.replace(/'/g, "\\'");
  const safeMetaDesc = meta.metaDescription.replace(/'/g, "\\'");

  const newEntry = `  {
    slug: '${slug}',
    title: '${safeTitle}',
    excerpt: '${safeExcerpt}',
    date: '${formatDate(date)}',
    isoDate: '${isoDate(date)}',
    category: '${category}',
    readTime: '8 min read',
    metaDescription: '${safeMetaDesc}',
  },`;

  // Insert at position 0 in the BLOG_POSTS array (after the opening bracket)
  const arrayStart = 'export const BLOG_POSTS: BlogPost[] = [';
  const insertPoint = content.indexOf(arrayStart);
  if (insertPoint === -1) {
    throw new Error('Could not find BLOG_POSTS array in blog-data.ts');
  }
  const afterBracket = insertPoint + arrayStart.length;
  content = content.slice(0, afterBracket) + '\n' + newEntry + content.slice(afterBracket);

  fs.writeFileSync(blogDataPath, content, 'utf-8');
}

function updatePageFile(slug: string, name: string): void {
  const pagePath = path.resolve(__dirname, '../src/app/blog/[slug]/page.tsx');
  let content = fs.readFileSync(pagePath, 'utf-8');

  // 1. Add import — insert after the last existing post import line
  //    We find all lines that import from './posts/...' and insert after the last one.
  const importRegex = /^import .+ from '.\/posts\/.+';$/gm;
  let lastImportMatch: RegExpExecArray | null = null;
  let match: RegExpExecArray | null;
  while ((match = importRegex.exec(content)) !== null) {
    lastImportMatch = match;
  }

  if (!lastImportMatch) {
    throw new Error('Could not find existing post imports in page.tsx');
  }

  const importLine = `import ${name} from './posts/${slug}';`;
  const importInsertPos = lastImportMatch.index + lastImportMatch[0].length;
  content = content.slice(0, importInsertPos) + '\n' + importLine + content.slice(importInsertPos);

  // 2. Add to POST_CONTENT record — insert after the opening brace of the record
  const recordStart = 'const POST_CONTENT: Record<string, React.ReactNode> = {';
  const recordPos = content.indexOf(recordStart);
  if (recordPos === -1) {
    throw new Error('Could not find POST_CONTENT record in page.tsx');
  }
  const afterRecordBrace = recordPos + recordStart.length;
  const newEntry = `\n  '${slug}': <${name} />,`;
  content = content.slice(0, afterRecordBrace) + newEntry + content.slice(afterRecordBrace);

  fs.writeFileSync(pagePath, content, 'utf-8');
}

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

function validateJSX(content: string): string[] {
  const warnings: string[] = [];

  // Check for common issues
  if (!content.includes('<h2>')) {
    warnings.push('WARNING: No <h2> headings found in generated content');
  }
  if (!content.includes('<Link ')) {
    warnings.push('WARNING: No internal <Link> components found');
  }
  if (!content.includes('/search')) {
    warnings.push('WARNING: No link to /search found (missing CTA?)');
  }
  if (content.includes('```')) {
    warnings.push('WARNING: Content contains markdown code fences');
  }

  // Check for raw quotes that should be escaped
  // We look for apostrophes in text content (not in JSX attributes)
  // This is a heuristic — just flag for review
  const textSegments = content.replace(/<[^>]+>/g, ' ');
  if (/(?<=[a-zA-Z])'(?=[a-zA-Z])/.test(textSegments)) {
    warnings.push('WARNING: Possible unescaped apostrophes in text content (should use &apos;)');
  }

  return warnings;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  const topic = process.argv[2];
  if (!topic) {
    console.error('Usage: npx tsx scripts/generate-blog-post.ts "your topic here"');
    process.exit(1);
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error('Error: ANTHROPIC_API_KEY environment variable is not set');
    process.exit(1);
  }

  const slug = slugify(topic);
  const name = componentName(slug);
  const now = new Date();
  const category = inferCategory(topic);

  console.log(`\n--- Blog Post Generator ---`);
  console.log(`  Topic:     ${topic}`);
  console.log(`  Slug:      ${slug}`);
  console.log(`  Component: ${name}`);
  console.log(`  Category:  ${category}`);
  console.log(`  Date:      ${formatDate(now)}`);
  console.log('');

  // Check that slug doesn't already exist
  const postsDir = path.resolve(__dirname, '../src/app/blog/[slug]/posts');
  const targetFile = path.join(postsDir, `${slug}.tsx`);
  if (fs.existsSync(targetFile)) {
    console.error(`Error: Post file already exists: ${targetFile}`);
    process.exit(1);
  }

  const client = new Anthropic({ apiKey });

  // Step 1: Generate post content
  let jsxContent: string;
  try {
    jsxContent = await generatePostContent(client, topic);
  } catch (err) {
    console.error('Error generating post content:', err);
    process.exit(1);
  }

  // Step 2: Validate content
  const warnings = validateJSX(jsxContent);
  if (warnings.length > 0) {
    console.log('\nValidation warnings:');
    warnings.forEach((w) => console.log(`  ${w}`));
    console.log('');
  }

  // Step 3: Derive a title from the first h2 or use the topic as a preliminary title
  // Then ask Claude for proper metadata
  const preliminaryTitle = topic
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  let meta: { title: string; excerpt: string; metaDescription: string };
  try {
    meta = await generateMetadata(client, topic, preliminaryTitle);
  } catch (err) {
    console.error('Error generating metadata:', err);
    process.exit(1);
  }

  // Step 4: Write files
  console.log('  Writing post file...');
  const postPath = writePostFile(slug, name, jsxContent);
  console.log(`  Created: ${postPath}`);

  console.log('  Updating blog-data.ts...');
  updateBlogData(slug, meta, now, category);
  console.log('  Updated: src/lib/blog-data.ts');

  console.log('  Updating page.tsx...');
  updatePageFile(slug, name);
  console.log('  Updated: src/app/blog/[slug]/page.tsx');

  // Step 5: Summary
  console.log(`\n--- Done! ---`);
  console.log(`  New post: src/app/blog/[slug]/posts/${slug}.tsx`);
  console.log(`  Title:    ${meta.title}`);
  console.log(`  Slug:     ${slug}`);
  console.log(`  Category: ${category}`);
  console.log(`\n  To preview: npm run dev, then visit http://localhost:3000/blog/${slug}`);
  console.log('');
}

main();
