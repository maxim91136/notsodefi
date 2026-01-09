'use client';

import Link from 'next/link';

const redFlags = [
  {
    marketing: 'Community-driven',
    reality: 'Foundation appears to make key decisions',
  },
  {
    marketing: 'Governance token',
    reality: 'Whale voting, no real power',
  },
  {
    marketing: 'Decentralized network',
    reality: 'Multiple servers instead of one',
  },
  {
    marketing: 'Trustless',
    reality: 'Trust us instead',
  },
  {
    marketing: 'Permissionless',
    reality: '...except for validators',
  },
  {
    marketing: 'Open source',
    reality: 'Code is open, control is closed',
  },
  {
    marketing: 'Progressive decentralization',
    reality: 'Maybe, someday',
  },
  {
    marketing: 'Fair launch',
    reality: 'Insiders knew earlier',
  },
  {
    marketing: 'No premine',
    reality: 'VC-funded team mined first',
  },
  {
    marketing: 'Decentralized governance',
    reality: '10 wallets decide everything',
  },
  {
    marketing: 'Battle-tested',
    reality: 'Not hacked yet (publicly)',
  },
  {
    marketing: 'Immutable',
    reality: 'Until we need to upgrade',
  },
  {
    marketing: 'Censorship-resistant',
    reality: 'Sequencer can ignore transactions',
  },
  {
    marketing: 'Decentralized stablecoin',
    reality: '40% USDC as collateral',
  },
  {
    marketing: 'DAO-governed',
    reality: 'Plutocracy with extra steps',
  },
  {
    marketing: 'Non-custodial',
    reality: 'Upgradeable proxy contract',
  },
  {
    marketing: 'Validator network',
    reality: '21 picked by the foundation',
  },
  {
    marketing: 'Layer 2 solution',
    reality: 'Sidechain with Ethereum logo',
  },
];

export default function RedFlagsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <Link href="/" className="text-blue-400 hover:text-blue-300 text-sm">
          &larr; Home
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-2">Marketing Red Flags</h1>
      <p className="text-gray-400 mb-8">
        What crypto projects say vs. what they mean. A translation guide for marketing language.
      </p>

      <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-4 mb-8">
        <p className="text-yellow-200 text-sm">
          <strong>Satirical Commentary:</strong> The following is satirical commentary designed to encourage
          critical thinking about marketing language in the cryptocurrency industry. These are humorous
          generalizations, not factual assertions about specific projects. Individual projects vary significantly.
          Always verify claims on our{' '}
          <Link href="/projects" className="underline hover:text-yellow-100">
            projects page
          </Link>.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left py-4 px-4 text-gray-400 font-medium">
                When a project says...
              </th>
              <th className="text-left py-4 px-4 text-gray-400 font-medium">
                ...it often means:
              </th>
            </tr>
          </thead>
          <tbody>
            {redFlags.map((flag, index) => (
              <tr
                key={index}
                className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
              >
                <td className="py-4 px-4">
                  <span className="text-green-400 font-mono">&quot;{flag.marketing}&quot;</span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-red-400">{flag.reality}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-12 p-8 bg-red-900/20 border border-red-700/50 rounded-lg text-center">
        <p className="text-xl md:text-2xl font-medium text-red-200 italic">
          &ldquo;The more a project advertises decentralization,<br className="hidden md:block" />
          the more skeptical you should be.&rdquo;
        </p>
        <p className="mt-4 text-gray-400 text-sm">
          Truly decentralized projects (Bitcoin, Monero) don&apos;t need to emphasize it - it&apos;s simply true.
        </p>
      </div>

      <div className="mt-12 p-6 bg-gray-800/50 rounded-lg">
        <h2 className="text-xl font-bold mb-4">How to Verify Marketing Claims</h2>
        <ul className="space-y-3 text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-blue-400">1.</span>
            <span><strong>Check Nakamoto Coefficient:</strong> How many entities could halt the network?</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400">2.</span>
            <span><strong>Token Distribution:</strong> Who holds how much? Who had access before launch?</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400">3.</span>
            <span><strong>Upgrade Mechanism:</strong> Can someone change the rules? Who?</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400">4.</span>
            <span><strong>Kill Switch:</strong> Can the network be stopped? By whom?</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400">5.</span>
            <span><strong>Read Founder Quotes:</strong> What do they say when they&apos;re being honest?</span>
          </li>
        </ul>
      </div>

      <div className="mt-8 text-center text-gray-500 text-sm">
        <p>
          Know more red flags?{' '}
          <a
            href="https://github.com/maxim91136/notsodefi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300"
          >
            Submit a Pull Request
          </a>
        </p>
      </div>
    </div>
  );
}
