import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <Link href="/" className="text-blue-400 hover:text-blue-300 text-sm">
          &larr; Back to Home
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>

      <div className="space-y-8 text-gray-300">
        <section>
          <h2 className="text-xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing NotSoDeFi.com (&quot;the Website&quot;), you agree to these Terms of Service. If you do not
            agree, do not use this Website.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">2. Nature of Service</h2>
          <p>
            The Website provides educational analysis and commentary on blockchain decentralization. All content
            represents opinions based on publicly available data and our documented methodology. The Website does not
            provide financial, investment, legal, or tax advice.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">3. No Warranties</h2>
          <p>
            THE WEBSITE IS PROVIDED &quot;AS IS&quot; WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
            NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, ACCURACY, OR
            NON-INFRINGEMENT.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">4. Limitation of Liability</h2>
          <p>
            IN NO EVENT SHALL NOTSODEFI.COM, ITS CONTRIBUTORS, OR OPERATORS BE LIABLE FOR ANY DIRECT, INDIRECT,
            INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE WEBSITE OR RELIANCE ON
            ANY INFORMATION PROVIDED.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">5. User Responsibilities</h2>
          <p className="mb-4">You agree to:</p>
          <ul className="space-y-2 list-disc list-inside">
            <li>Use the Website for lawful purposes only</li>
            <li>Not misrepresent information from this Website</li>
            <li>Conduct your own research before making financial decisions</li>
            <li>Not use automated systems to scrape or overload the Website</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">6. Intellectual Property</h2>
          <p>
            All content, methodology, and branding are the property of NotSoDeFi.com. You may share content with
            attribution but may not reproduce it for commercial purposes without permission.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">7. Third-Party Links</h2>
          <p>
            The Website may link to external sources. We are not responsible for the content, accuracy, or practices of
            third-party websites.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">8. Corrections and Disputes</h2>
          <p>
            For correction requests, see our{' '}
            <Link href="/disclaimer" className="text-blue-400 hover:text-blue-300 underline">
              Disclaimer page
            </Link>
            . For legal notices or disputes, please{' '}
            <a
              href="https://github.com/maxim91136/notsodefi/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              open an issue on GitHub
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">9. Modifications</h2>
          <p>
            We reserve the right to modify these Terms at any time. Continued use of the Website constitutes acceptance
            of modified Terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">10. Severability</h2>
          <p>
            If any provision of these Terms is found unenforceable, the remaining provisions shall continue in effect.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">11. Governing Law and Jurisdiction</h2>
          <p className="mb-4">
            These Terms shall be governed by and construed in accordance with the laws of the Federal Republic of Germany,
            without regard to its conflict of law provisions.
          </p>
          <p>
            Any disputes arising from or relating to these Terms or your use of the Website shall be subject to the
            exclusive jurisdiction of the courts of Germany. For consumers within the European Union, mandatory consumer
            protection laws of your country of residence may apply.
          </p>
        </section>

        <div className="text-center text-gray-500 text-sm pt-8 border-t border-gray-800">
          <p>&copy; 2025 NotSoDeFi.com - Educational Analysis - Not Financial Advice</p>
        </div>
      </div>
    </div>
  );
}
