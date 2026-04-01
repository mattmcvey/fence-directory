import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BLOG_POSTS, getBlogPost } from '@/lib/blog-data';
import { ogMeta } from '@/lib/seo';
import { ArrowLeft } from 'lucide-react';

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
  'average-fence-installation-costs-2026': <AverageFenceCosts />,
  'wood-vs-vinyl-fencing': <WoodVsVinyl />,
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

function AverageFenceCosts() {
  return (
    <>
      <p>
        Planning a fence project in 2026? Whether you&apos;re looking for privacy, security, or curb appeal,
        understanding the true cost of fence installation is the first step to making a smart investment. In this
        guide, we break down average costs by material, project size, and region so you know exactly what to expect.
      </p>

      <h2>National Average: What Most Homeowners Pay</h2>
      <p>
        The average American homeowner spends between <strong>$1,800 and $9,500</strong> on a new fence, with the
        national average landing around <strong>$4,500</strong> for a standard 150-linear-foot privacy fence. Your
        actual cost depends primarily on three factors: the material you choose, the total length of fencing, and
        your local labor market.
      </p>
      <p>
        For a detailed cost calculator based on your specific city,{' '}
        <Link href="/guides/fence-cost" className="text-green-600 hover:text-green-700 font-medium">
          check our full Fence Cost Guide
        </Link>.
      </p>

      <h2>Cost Breakdown by Material</h2>
      <p>Material is the single biggest factor in your total fence cost. Here&apos;s what each option runs in 2026:</p>

      <h3>Wood Fencing: $15-$35 per linear foot</h3>
      <p>
        Wood remains America&apos;s most popular fence material, and for good reason. A standard 6-foot cedar privacy
        fence runs $15-$35 per linear foot installed, putting a typical 150-foot project at $2,250-$5,250. Pressure-treated
        pine sits at the lower end, while cedar and redwood command premium prices. The tradeoff? Wood requires staining
        or sealing every 2-3 years and has a 15-20 year lifespan. But for classic aesthetics and design flexibility,
        it&apos;s hard to beat.
      </p>

      <h3>Vinyl/PVC Fencing: $20-$40 per linear foot</h3>
      <p>
        Vinyl fencing has surged in popularity thanks to its zero-maintenance appeal. At $20-$40 per linear foot installed,
        it costs more upfront than wood, but you&apos;ll never need to paint, stain, or seal it. A 150-foot vinyl privacy
        fence runs $3,000-$6,000. With a 20-30 year lifespan, many homeowners find the lifetime cost is actually lower than
        wood. For a deeper comparison, read our{' '}
        <Link href="/guides/wood-vs-vinyl" className="text-green-600 hover:text-green-700 font-medium">
          Wood vs Vinyl guide
        </Link>.
      </p>

      <h3>Chain Link Fencing: $8-$18 per linear foot</h3>
      <p>
        Chain link is the budget champion at $8-$18 per linear foot. A 150-foot chain link fence runs just $1,200-$2,700,
        making it the most affordable option by a wide margin. It&apos;s durable, requires virtually no maintenance, and lasts
        20-30 years. The downside is obvious: no privacy. But for dog runs, property boundaries, and commercial applications,
        chain link delivers unbeatable value. Learn more in our{' '}
        <Link href="/guides/chain-link-fence" className="text-green-600 hover:text-green-700 font-medium">
          Chain Link Fence Guide
        </Link>.
      </p>

      <h3>Aluminum Fencing: $20-$35 per linear foot</h3>
      <p>
        Aluminum offers elegant, wrought-iron aesthetics without the rust risk. At $20-$35 per linear foot, it&apos;s
        comparable to vinyl in price but with a more ornamental look. It won&apos;t provide full privacy, but it excels
        around pools, front yards, and decorative applications. Expect a 30+ year lifespan with virtually zero maintenance.
      </p>

      <h3>Wrought Iron: $25-$50 per linear foot</h3>
      <p>
        True wrought iron is the premium choice at $25-$50+ per linear foot. It offers unmatched durability (50+ year
        lifespan) and classic curb appeal, but it requires periodic rust treatment and repainting. A 150-foot wrought
        iron fence runs $3,750-$7,500 — a significant investment that pays off in longevity and home value.
      </p>

      <h3>Composite Fencing: $25-$45 per linear foot</h3>
      <p>
        Composite fencing combines wood fibers with plastic polymers for a material that looks like wood but behaves
        like vinyl. At $25-$45 per linear foot, it&apos;s the priciest option, but it&apos;s eco-friendly, rot-proof,
        and maintenance-free with a 25-30 year lifespan.
      </p>

      <h2>Hidden Costs to Watch For</h2>
      <p>Your quoted price per linear foot typically includes materials and basic labor, but several factors can add to the total:</p>
      <ul>
        <li><strong>Old fence removal:</strong> $3-$5 per linear foot if you have an existing fence that needs to come down.</li>
        <li><strong>Permits:</strong> Most cities require a fence permit costing $20-$400. Check our{' '}
          <Link href="/guides/fence-permits" className="text-green-600 hover:text-green-700 font-medium">
            Fence Permit Guide
          </Link> for specifics.</li>
        <li><strong>Gates:</strong> A walk-through gate adds $150-$500. Driveway gates run $500-$4,000+.</li>
        <li><strong>Grading and terrain:</strong> Slopes, rocks, and roots can add 10-30% to labor costs.</li>
        <li><strong>Property survey:</strong> If you&apos;re unsure of your property lines, a survey runs $300-$800.</li>
      </ul>

      <h2>Regional Price Differences</h2>
      <p>
        Where you live significantly impacts fence costs. Coastal and urban areas like California, New York, and
        the Pacific Northwest run 20-40% above the national average, while the Southeast and Midwest tend to be
        10-15% below. For city-specific pricing, browse our{' '}
        <Link href="/fence-cost-by-state" className="text-green-600 hover:text-green-700 font-medium">
          fence cost by state
        </Link> pages.
      </p>

      <h2>How to Save Money on Your Fence</h2>
      <p>
        The number one way to save is to <strong>get at least three quotes</strong>. Prices vary 20-50% between
        contractors for the exact same job. Beyond that, scheduling in the off-season (late fall or winter) often
        means lower prices and faster availability. And don&apos;t forget to check with your neighbor — in many states,
        you can split the cost of a shared boundary fence.
      </p>
      <p>
        Ready to compare local contractors?{' '}
        <Link href="/search" className="text-green-600 hover:text-green-700 font-medium">
          Search fence contractors near you
        </Link>{' '}
        on FenceFind and start getting free estimates today.
      </p>
    </>
  );
}

function WoodVsVinyl() {
  return (
    <>
      <p>
        Wood and vinyl are the two most popular residential fence materials in America, and for good reason — they
        both deliver privacy, curb appeal, and property security. But they differ significantly in cost, maintenance,
        lifespan, and aesthetics. Here&apos;s an honest, head-to-head comparison to help you decide which one is
        right for your home.
      </p>

      <h2>Upfront Cost: Wood Wins</h2>
      <p>
        If budget is your primary concern, wood is the clear winner. A standard 6-foot wood privacy fence costs
        <strong> $15-$35 per linear foot</strong> installed, depending on the wood species. Pressure-treated pine
        sits at the lower end, while cedar and redwood are pricier. Vinyl privacy fencing runs{' '}
        <strong>$20-$40 per linear foot</strong> — roughly 25-50% more than comparable wood.
      </p>
      <p>
        For a typical 150-foot residential fence, that means wood runs $2,250-$5,250 while vinyl costs $3,000-$6,000.
        For full pricing details, check our{' '}
        <Link href="/guides/fence-cost" className="text-green-600 hover:text-green-700 font-medium">
          Fence Cost Guide
        </Link>.
      </p>

      <h2>Maintenance: Vinyl Wins by a Mile</h2>
      <p>
        This is where vinyl pulls ahead dramatically. A wood fence needs staining or sealing every 2-3 years to
        prevent rot, warping, and insect damage. That&apos;s $500-$1,500 in materials and labor each time, or roughly
        $3,000-$10,000 over the fence&apos;s lifetime. Wood fences also need periodic repairs — loose boards, leaning
        posts, and storm damage are common.
      </p>
      <p>
        Vinyl? Hose it down once a year. That&apos;s it. No painting, staining, sealing, or treating. It doesn&apos;t
        rot, warp, or attract insects. The maintenance cost over 25 years is effectively zero.
      </p>

      <h2>Durability and Lifespan</h2>
      <p>
        A well-maintained wood fence lasts <strong>15-20 years</strong>. &quot;Well-maintained&quot; is the key phrase —
        skip the staining for a few years, and that lifespan drops to 10-12 years. Vinyl fencing lasts{' '}
        <strong>20-30 years</strong> with no maintenance required. However, vinyl can crack in extreme cold and may
        become brittle after prolonged UV exposure (though modern vinyl includes UV inhibitors).
      </p>
      <p>
        One advantage wood has: it&apos;s easier and cheaper to repair. A single broken vinyl panel can be difficult
        to replace and may require a professional, while a broken wood board is a simple DIY fix. Read more about
        repairs in our{' '}
        <Link href="/guides/fence-repair" className="text-green-600 hover:text-green-700 font-medium">
          Fence Repair Guide
        </Link>.
      </p>

      <h2>Appearance and Style</h2>
      <p>
        Wood offers unmatched versatility. You can stain it any color, choose from dozens of styles (board-on-board,
        shadowbox, lattice-top, horizontal slat), and customize the height. Natural wood grain has a warmth and
        character that many homeowners prefer. For design inspiration, see our{' '}
        <Link href="/guides/privacy-fence" className="text-green-600 hover:text-green-700 font-medium">
          Privacy Fence Guide
        </Link>.
      </p>
      <p>
        Vinyl is more limited. Most vinyl fences come in white, tan, or gray, with fewer style options. Modern vinyl
        has improved significantly — some products convincingly mimic wood grain — but it still looks and feels like
        plastic up close. That said, vinyl maintains its appearance year after year, while wood weathers and fades
        without regular upkeep.
      </p>

      <h2>Total Cost of Ownership (10-Year Comparison)</h2>
      <p>Here&apos;s where the math gets interesting. For a 150-foot privacy fence over 10 years:</p>
      <ul>
        <li><strong>Wood:</strong> $3,750 initial + $3,000-$4,500 maintenance = $6,750-$8,250 total</li>
        <li><strong>Vinyl:</strong> $4,500 initial + $0 maintenance = $4,500 total</li>
      </ul>
      <p>
        Over a decade, vinyl is actually <strong>cheaper</strong> than wood despite the higher upfront cost. This
        gap widens over the fence&apos;s full lifespan. If you plan to stay in your home long-term, vinyl is the
        better financial decision.
      </p>

      <h2>Environmental Impact</h2>
      <p>
        Wood is a renewable, biodegradable resource — particularly when sourced from sustainably managed forests
        (look for FSC certification). However, pressure-treated wood contains chemical preservatives that can leach
        into soil. Vinyl is petroleum-based and not biodegradable, but its longer lifespan means fewer replacements
        and less waste over time. For a more eco-friendly option, consider{' '}
        <Link href="/guides/choosing-material" className="text-green-600 hover:text-green-700 font-medium">
          composite fencing
        </Link>, which combines recycled wood and plastic.
      </p>

      <h2>Home Value Impact</h2>
      <p>
        Both materials add value to your home. According to industry data, a new fence can return 50-70% of its cost
        at resale. Wood fences tend to score slightly higher with buyers in traditional neighborhoods, while vinyl
        appeals to buyers who prioritize low maintenance. For more on ROI, read our{' '}
        <Link href="/guides/fence-roi" className="text-green-600 hover:text-green-700 font-medium">
          Fence ROI Guide
        </Link>.
      </p>

      <h2>The Verdict: Which Should You Choose?</h2>
      <p><strong>Choose wood if:</strong></p>
      <ul>
        <li>You want the lowest upfront cost</li>
        <li>Design flexibility and natural aesthetics matter most</li>
        <li>You&apos;re willing to invest time in regular maintenance</li>
        <li>You want easy, affordable repairs</li>
      </ul>
      <p><strong>Choose vinyl if:</strong></p>
      <ul>
        <li>You want zero maintenance</li>
        <li>You&apos;re thinking long-term (10+ years)</li>
        <li>You prefer a lower total cost of ownership</li>
        <li>You live in a humid or wet climate where wood rots faster</li>
      </ul>
      <p>
        Whichever material you choose, the most important step is getting quotes from qualified local contractors.{' '}
        <Link href="/search" className="text-green-600 hover:text-green-700 font-medium">
          Find fence contractors near you
        </Link>{' '}
        and start comparing prices today.
      </p>
    </>
  );
}

function FiveQuestions() {
  return (
    <>
      <p>
        Hiring a fence contractor is a significant investment — the average project runs $2,000-$8,000 depending on
        materials and scope. The difference between a great contractor and a bad one can mean thousands of dollars in
        repairs, delays, and headaches. Before you sign anything, make sure you ask these five critical questions.
      </p>

      <h2>1. &quot;Are you licensed and insured in this state?&quot;</h2>
      <p>
        This is non-negotiable. A licensed contractor has met your state&apos;s minimum competency requirements, and
        insurance protects you if something goes wrong during installation. Specifically, ask for:
      </p>
      <ul>
        <li><strong>General liability insurance</strong> — covers damage to your property during the project</li>
        <li><strong>Workers&apos; compensation insurance</strong> — covers injuries to workers on your property</li>
        <li><strong>A valid contractor&apos;s license</strong> — required in most states for projects over a certain dollar threshold</li>
      </ul>
      <p>
        Ask for proof of both and verify them independently. A legitimate contractor will happily provide these documents.
        If they hesitate or make excuses, walk away. For more on what licensing means in your area, check our{' '}
        <Link href="/guides/fence-permits" className="text-green-600 hover:text-green-700 font-medium">
          Fence Permits Guide
        </Link>.
      </p>

      <h2>2. &quot;Can you provide a detailed written estimate?&quot;</h2>
      <p>
        A professional estimate should be detailed and in writing. It should include:
      </p>
      <ul>
        <li>Total cost broken down by materials and labor</li>
        <li>Specific material brands, grades, and quantities</li>
        <li>Timeline for start and completion</li>
        <li>Permit responsibility (who pulls the permit?)</li>
        <li>Old fence removal costs (if applicable)</li>
        <li>Payment schedule (avoid anyone who demands full payment upfront)</li>
      </ul>
      <p>
        Vague verbal quotes are a red flag. A written estimate protects both you and the contractor. For tips on
        evaluating quotes, read our{' '}
        <Link href="/guides/getting-quotes" className="text-green-600 hover:text-green-700 font-medium">
          Guide to Getting Fence Quotes
        </Link>.
      </p>

      <h2>3. &quot;What&apos;s your warranty on materials and labor?&quot;</h2>
      <p>
        Most reputable fence contractors offer warranties, but the terms vary widely. Ask about:
      </p>
      <ul>
        <li><strong>Workmanship warranty:</strong> Typically 1-5 years, covering issues caused by poor installation (leaning posts, gates that won&apos;t latch, etc.)</li>
        <li><strong>Material warranty:</strong> Often passes through from the manufacturer. Vinyl typically comes with 20-year+ warranties; wood warranties are shorter.</li>
      </ul>
      <p>
        Get the warranty terms in writing as part of your contract. A contractor who won&apos;t stand behind their work
        isn&apos;t worth hiring at any price. Pay attention to what voids the warranty — some require you to register
        the warranty within a certain timeframe.
      </p>

      <h2>4. &quot;Who handles the permit, and is it included in the price?&quot;</h2>
      <p>
        Most municipalities require a fence permit before installation can begin. Permits typically cost $20-$400
        and involve submitting a site plan showing fence location, height, and setbacks from property lines. The key
        questions are:
      </p>
      <ul>
        <li>Does the contractor pull the permit, or is that your responsibility?</li>
        <li>Is the permit fee included in their quote?</li>
        <li>Will they schedule the required inspection after installation?</li>
      </ul>
      <p>
        Experienced local contractors handle permits routinely and know exactly what your city requires. If a contractor
        suggests skipping the permit, that&apos;s a major red flag — you could face fines or be required to remove the
        fence entirely. Learn more about local permit requirements on our{' '}
        <Link href="/states" className="text-green-600 hover:text-green-700 font-medium">
          city and state pages
        </Link>.
      </p>

      <h2>5. &quot;Can you provide references from recent local projects?&quot;</h2>
      <p>
        Online reviews are helpful, but direct references from recent customers are even better. Ask for 2-3 references
        from projects completed in the past 6 months, ideally in your area. When you contact them, ask:
      </p>
      <ul>
        <li>Was the project completed on time and on budget?</li>
        <li>Was the crew professional and respectful of the property?</li>
        <li>Were there any issues, and how were they resolved?</li>
        <li>Would you hire them again?</li>
      </ul>
      <p>
        A contractor with a strong track record will gladly provide references. While you&apos;re at it, check their
        reviews on FenceFind, Google, and the BBB for a fuller picture.
      </p>

      <h2>Bonus: Red Flags to Watch For</h2>
      <p>Beyond these five questions, watch out for these warning signs:</p>
      <ul>
        <li><strong>Demands full payment upfront.</strong> A reasonable payment schedule is 10-30% deposit, with the balance due upon completion.</li>
        <li><strong>No physical address or business phone.</strong> Legitimate contractors have an established business presence.</li>
        <li><strong>Pressure to sign immediately.</strong> &quot;This price is only good today&quot; is a classic high-pressure tactic. Any reputable quote should be valid for at least 30 days.</li>
        <li><strong>Significantly lower than other quotes.</strong> If one bid is 40%+ below the others, something is off — they may be cutting corners on materials or plan to hit you with change orders.</li>
      </ul>

      <h2>Ready to Find Qualified Contractors?</h2>
      <p>
        The best way to find reliable fence contractors is to compare multiple options. On FenceFind, every listed
        contractor is rated and reviewed by local homeowners, so you can quickly identify the top professionals in
        your area. We recommend getting at least three quotes before making your decision.
      </p>
      <p>
        <Link href="/search" className="text-green-600 hover:text-green-700 font-medium">
          Search for fence contractors near you
        </Link>{' '}
        and start requesting free estimates today. For more guidance on the fence installation process, explore our{' '}
        <Link href="/guides" className="text-green-600 hover:text-green-700 font-medium">
          complete fence guides library
        </Link>.
      </p>
    </>
  );
}
