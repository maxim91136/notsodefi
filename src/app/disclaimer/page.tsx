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
          <h2 className="text-xl font-bold text-white mb-4">What This Is</h2>
          <ul className="space-y-2 list-disc list-inside">
            <li>Educational analysis based on on-chain data, official documentation, and public statements</li>
            <li>A methodology for measuring decentralization, not a judgment of project quality or legitimacy</li>
            <li>A transparency tool for the crypto community</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">What This Is Not</h2>
          <ul className="space-y-2 list-disc list-inside">
            <li>Financial, investment, legal, or tax advice</li>
            <li>A recommendation to buy, sell, or hold any cryptocurrency</li>
            <li>An accusation of fraud, scams, or illegal activity</li>
            <li>A guarantee of accuracy - data may be outdated or incomplete</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">About These Scores</h2>
          <p className="mb-4">
            Scores on NotSoDeFi reflect our methodology&apos;s assessment of decentralization factors. They do not represent:
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
          <h2 className="text-xl font-bold text-white mb-4">Methodology</h2>
          <p>
            All scores are calculated using our transparent methodology, which is publicly documented on our{' '}
            <Link href="/methodology" className="text-blue-400 hover:text-blue-300 underline">
              Methodology page
            </Link>
            . Scores reflect measurable decentralization factors, not subjective opinions on project value or team
            integrity.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">Data Sources</h2>
          <p>
            All data is sourced from public sources including but not limited to: blockchain explorers, official
            project documentation, governance forums, and reputable news outlets. Sources are cited where applicable.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">Limitation of Liability</h2>
          <p>
            NotSoDeFi and its contributors are not liable for any decisions made based on information presented on
            this website. Users should conduct their own research and consult qualified professionals before making
            any financial decisions.
          </p>
        </section>

        <section className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Corrections &amp; Feedback</h2>
          <p className="mb-4">We are committed to accuracy and fairness.</p>

          <h3 className="font-bold text-white mb-2">Reporting Errors</h3>
          <p className="mb-4">
            If you believe any data, score, or statement on NotSoDeFi is inaccurate, please{' '}
            <a
              href="https://github.com/maxim91136/notsodefi/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              open an issue on GitHub
            </a>{' '}
            or submit a pull request with corrections.
          </p>
          <p className="mb-4">Please include:</p>
          <ul className="space-y-1 list-disc list-inside mb-4">
            <li>The specific page and data point in question</li>
            <li>Evidence supporting your correction (links, documentation, on-chain data)</li>
            <li>Your relationship to the project (if any)</li>
          </ul>

          <h3 className="font-bold text-white mb-2">What We Will Correct</h3>
          <ul className="space-y-1 list-disc list-inside mb-4">
            <li>Factual errors (incorrect numbers, dates, attributions)</li>
            <li>Outdated information (if newer data is available)</li>
            <li>Misattributed quotes or sources</li>
          </ul>

          <h3 className="font-bold text-white mb-2">What We Will Not Change</h3>
          <ul className="space-y-1 list-disc list-inside">
            <li>Methodology-based scores (unless methodology itself is flawed)</li>
            <li>Accurate information that a project finds unflattering</li>
            <li>Analysis based on sound reasoning and public data</li>
          </ul>
        </section>

        <div className="text-center text-gray-500 text-sm pt-8 border-t border-gray-800">
          <p>&copy; 2025 NotSoDeFi.com - Measuring Real Decentralization</p>
        </div>
      </div>
    </div>
  );
}
