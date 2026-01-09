import Link from 'next/link';

export default function DisclaimerPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <Link href="/" className="text-blue-400 hover:text-blue-300 text-sm">
          &larr; Back to Home
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-8">Disclaimer</h1>

      <div className="space-y-8 text-gray-300">
        <section>
          <h2 className="text-xl font-bold text-white mb-4">Nature of This Website</h2>
          <p className="mb-4">
            NotSoDeFi.com provides educational analysis and commentary on decentralization metrics in blockchain
            projects. All content represents the opinions and assessments of the contributors based on publicly
            available data and our documented methodology.
          </p>
          <div className="mb-4">
            <p className="font-semibold text-white mb-2">This website:</p>
            <ul className="space-y-2 list-disc list-inside">
              <li>Provides educational analysis, not factual verdicts</li>
              <li>Expresses opinions based on our interpretation of public data</li>
              <li>Offers a framework for evaluating decentralization, not investment guidance</li>
              <li>Is maintained by independent contributors with no affiliation to rated projects</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-white mb-2">This website does not provide:</p>
            <ul className="space-y-2 list-disc list-inside">
              <li>Financial, investment, legal, or tax advice</li>
              <li>Recommendations to buy, sell, or hold any cryptocurrency or token</li>
              <li>Accusations of fraud, illegality, or misconduct</li>
              <li>Guarantees of accuracy, completeness, or timeliness of data</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">Opinion and Commentary</h2>
          <p className="mb-4">
            All scores, assessments, categorizations, and statements on this website constitute the opinions of the
            contributors. Phrases such as &quot;centralized,&quot; &quot;high concentration,&quot; or similar
            characterizations reflect our analytical conclusions based on observable data — not statements of absolute
            fact.
          </p>
          <p>
            When we state that a project exhibits centralization characteristics, we mean that, in our assessment based
            on our methodology and publicly available information, the project exhibits characteristics that we
            interpret as centralized. Others may reasonably disagree with our interpretations.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">About These Scores</h2>
          <p className="mb-4">
            Scores on NotSoDeFi reflect our methodology&apos;s assessment of decentralization factors. They do not
            represent:
          </p>
          <ul className="space-y-2 list-disc list-inside mb-4">
            <li>Overall project quality or potential</li>
            <li>Investment recommendations</li>
            <li>Accusations of misconduct</li>
          </ul>
          <p>
            A low score indicates centralization risks as defined by our methodology - not that a project is
            &quot;bad&quot; or will fail. Projects may be centralized by design, by necessity (early stage), or by
            circumstance. Context matters.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">No Liability</h2>
          <p className="mb-4">NotSoDeFi.com, its contributors, operators, and affiliates:</p>
          <ul className="space-y-2 list-disc list-inside mb-4">
            <li>Accept no liability for any decisions made based on information presented here</li>
            <li>Make no warranties about the accuracy, reliability, or completeness of any content</li>
            <li>Are not responsible for any losses, damages, or consequences arising from use of this site</li>
          </ul>
          <p>
            Users should conduct their own research and consult qualified professionals before making any financial or
            investment decisions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">Data and Sources</h2>
          <p className="mb-4">
            All data is sourced from publicly available information including but not limited to:
          </p>
          <ul className="space-y-2 list-disc list-inside mb-4">
            <li>Blockchain explorers and on-chain data</li>
            <li>Official project documentation and announcements</li>
            <li>Public governance forums and voting records</li>
            <li>Press releases and news reports</li>
            <li>Academic and industry research</li>
          </ul>
          <p>Sources are cited where applicable. Data may become outdated between updates.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">Methodology</h2>
          <p>
            All scores are calculated using our transparent methodology, which is publicly documented on our{' '}
            <Link href="/methodology" className="text-blue-400 hover:text-blue-300 underline">
              Methodology page
            </Link>
            . Scores reflect measurable decentralization factors based on our interpretation of public data.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">Satirical Content</h2>
          <p>
            Certain pages (including &quot;Marketing Red Flags&quot;) contain satirical commentary intended to
            encourage critical thinking. This content is clearly marked and should not be interpreted as factual
            assertions about specific projects.
          </p>
        </section>

        <section className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Corrections &amp; Disputes</h2>
          <p className="mb-4">We are committed to accuracy and fairness.</p>

          <h3 className="font-bold text-white mb-2">Reporting Errors</h3>
          <p className="mb-4">
            If you believe any information is inaccurate or misleading, please{' '}
            <a
              href="https://github.com/maxim91136/notsodefi/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              submit corrections via GitHub
            </a>{' '}
            with supporting evidence.
          </p>
          <p className="mb-4">Please include:</p>
          <ul className="space-y-1 list-disc list-inside mb-4">
            <li>The specific content in question</li>
            <li>Evidence supporting your correction (links, documentation, on-chain data)</li>
            <li>Your relationship to the project (if any)</li>
          </ul>

          <h3 className="font-bold text-white mb-2">What We Will Correct</h3>
          <ul className="space-y-1 list-disc list-inside mb-4">
            <li>Factual errors (incorrect numbers, dates, attributions)</li>
            <li>Outdated information when newer data is available</li>
            <li>Misattributed quotes or sources</li>
          </ul>

          <h3 className="font-bold text-white mb-2">What We Will Not Remove</h3>
          <ul className="space-y-1 list-disc list-inside">
            <li>Accurate information that projects may find unflattering</li>
            <li>Opinions and analysis based on sound methodology and public data</li>
            <li>Scores calculated per our documented methodology</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">Jurisdictional Notice</h2>
          <p>
            This website is operated for educational purposes. Users accessing this site do so at their own risk and
            are responsible for compliance with local laws.
          </p>
        </section>

        <div className="text-center text-gray-500 text-sm pt-8 border-t border-gray-800">
          <p>&copy; 2025 NotSoDeFi.com - Educational Analysis - Not Financial Advice</p>
        </div>
      </div>
    </div>
  );
}
