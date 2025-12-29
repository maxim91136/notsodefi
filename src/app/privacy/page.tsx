import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <Link href="/" className="text-blue-400 hover:text-blue-300 text-sm">
          &larr; Back to Home
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

      <div className="space-y-8 text-gray-300">
        <section>
          <h2 className="text-xl font-bold text-white mb-4">1. Information We Collect</h2>
          <p className="mb-4">NotSoDeFi.com is designed to minimize data collection. We may collect:</p>
          <ul className="space-y-2 list-disc list-inside mb-4">
            <li>Anonymous usage statistics (page views, browser type, country)</li>
            <li>Information you voluntarily submit (GitHub issues, contact forms)</li>
          </ul>
          <p className="mb-4">We do NOT collect:</p>
          <ul className="space-y-2 list-disc list-inside">
            <li>Personal identification information without your consent</li>
            <li>Financial information</li>
            <li>Wallet addresses or blockchain data from visitors</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">2. Cookies</h2>
          <p>
            This website uses minimal essential cookies for site functionality. We do not use third-party tracking
            cookies or advertising cookies.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">3. Data Sharing</h2>
          <p className="mb-4">
            We do not sell, trade, or share personal information with third parties, except:
          </p>
          <ul className="space-y-2 list-disc list-inside">
            <li>When required by law</li>
            <li>To protect our rights or safety</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">4. Data Retention</h2>
          <p>
            Anonymous analytics data is retained for statistical purposes. Contact information from inquiries is
            retained only as long as necessary to respond.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">5. Your Rights</h2>
          <p>
            You may request access to, correction of, or deletion of any personal information we hold. Submit requests
            via{' '}
            <a
              href="https://github.com/maxim91136/notsodefi/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              GitHub
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">6. Changes</h2>
          <p>
            We may update this Privacy Policy periodically. Changes will be posted on this page with an updated date.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">7. Contact</h2>
          <p>
            For privacy inquiries, please{' '}
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

        <div className="text-center text-gray-500 text-sm pt-8 border-t border-gray-800">
          <p>&copy; 2025 NotSoDeFi.com - Educational Analysis - Not Financial Advice</p>
        </div>
      </div>
    </div>
  );
}
