import Link from 'next/link';

export default function FiveQuestions() {
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
