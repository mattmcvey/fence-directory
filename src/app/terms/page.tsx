import Link from 'next/link';
import { Metadata } from 'next';
import { ogMeta } from '@/lib/seo';

const title = 'Terms of Use — FenceFind';
const description = 'Terms of use, disclaimers, and legal information for FenceFind.com.';

export const metadata: Metadata = {
  title,
  description,
  ...ogMeta({ title, description, path: '/terms' }),
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <nav className="text-sm text-gray-500 mb-6 flex flex-wrap gap-1">
        <Link href="/" className="hover:text-green-600">Home</Link>
        <span>/</span>
        <span className="text-gray-900">Terms of Use</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Use</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: April 28, 2026</p>

      <div className="prose prose-green max-w-none text-gray-700 space-y-8">
        <section>
          <h2 className="text-xl font-bold text-gray-900">1. Acceptance of Terms</h2>
          <p>
            By accessing or using FenceFind (&quot;the Site&quot;), operated by FenceFind (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), you agree to be bound by these Terms of Use. If you do not agree, please do not use the Site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900">2. Informational Purposes Only</h2>
          <p>
            All content on this Site — including but not limited to fence permit requirements, cost estimates, height limits, fine amounts, processing times, and building regulations — is provided <strong>for general informational purposes only</strong>. It does not constitute legal, professional, financial, or construction advice.
          </p>
          <p>
            Fence permit requirements, costs, and regulations vary significantly by city, county, and municipality. The information presented on this Site represents typical state-level ranges and general guidance. It may not reflect the specific rules that apply to your property or jurisdiction.
          </p>
          <p>
            <strong>You should always contact your local building department, zoning office, or a licensed professional before starting any fence project.</strong> We strongly recommend verifying all permit requirements, setback rules, height restrictions, and HOA regulations with your local authorities before building.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900">3. No Warranty or Guarantee of Accuracy</h2>
          <p>
            While we make reasonable efforts to provide accurate and up-to-date information, we make <strong>no representations or warranties</strong>, express or implied, about the completeness, accuracy, reliability, suitability, or availability of any information on this Site.
          </p>
          <p>
            Permit requirements, costs, and regulations change frequently. Information on this Site may become outdated at any time without notice. We do not guarantee that the information is current or error-free.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900">4. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, FenceFind and its owners, operators, employees, and affiliates shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from:
          </p>
          <ul>
            <li>Your use of or reliance on any information provided on this Site</li>
            <li>Any errors, omissions, or inaccuracies in the content</li>
            <li>Any actions you take or fail to take based on the content</li>
            <li>Any fines, penalties, or costs incurred as a result of building without proper permits or in violation of local regulations</li>
            <li>Any interactions with contractors listed on this Site</li>
          </ul>
          <p>
            Your use of any information on this Site is <strong>strictly at your own risk</strong>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900">5. Contractor Listings</h2>
          <p>
            FenceFind provides a directory of fence contractors for informational purposes. Listing on this Site does not constitute an endorsement, recommendation, or guarantee of any contractor&apos;s work quality, licensing status, insurance coverage, or business practices.
          </p>
          <p>
            We do not verify contractor licenses, insurance, or qualifications unless explicitly stated. You are responsible for independently verifying a contractor&apos;s credentials, checking references, and confirming licensing and insurance before hiring.
          </p>
          <p>
            FenceFind is not a party to any agreement between you and a contractor. We are not responsible for the quality of work performed, pricing, disputes, or any other aspect of your relationship with a contractor found through this Site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900">6. Cost Estimates</h2>
          <p>
            Fence cost estimates, pricing ranges, and material cost comparisons shown on this Site are approximate figures based on regional averages and publicly available data. Actual costs will vary based on your specific location, materials chosen, fence design, terrain, labor rates, and other factors.
          </p>
          <p>
            Cost information should be used as a general starting point only. Always obtain multiple written quotes from licensed contractors for accurate pricing.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900">7. Quote Requests</h2>
          <p>
            When you submit a quote request through this Site, your information is shared with the selected contractor(s) so they can contact you about your project. We do not guarantee any response time, pricing, or availability from contractors.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900">8. User Conduct</h2>
          <p>
            You agree not to misuse this Site, including submitting false information, attempting to interfere with its operation, or using it for any unlawful purpose.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900">9. Changes to These Terms</h2>
          <p>
            We may update these Terms of Use at any time. Changes take effect when posted. Your continued use of the Site after changes are posted constitutes acceptance of the updated terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900">10. Contact</h2>
          <p>
            If you have questions about these Terms, please <Link href="/contact" className="text-green-600 hover:text-green-700 underline">contact us</Link>.
          </p>
        </section>
      </div>
    </div>
  );
}
