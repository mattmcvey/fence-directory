import Link from 'next/link';

export default function AverageFenceCosts() {
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
