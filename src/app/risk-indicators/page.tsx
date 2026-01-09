'use client';

import Link from 'next/link';

const marketingPatterns = [
  {
    marketing: 'Community-driven',
    pattern: 'Foundation or core team makes key decisions',
  },
  {
    marketing: 'Governance token',
    pattern: 'Token voting concentrated among large holders',
  },
  {
    marketing: 'Decentralized network',
    pattern: 'Multiple nodes operated by related entities',
  },
  {
    marketing: 'Trustless',
    pattern: 'Trust shifted from one entity to another',
  },
  {
    marketing: 'Permissionless',
    pattern: 'Validator set requires approval or stake threshold',
  },
  {
    marketing: 'Open source',
    pattern: 'Code public, governance private',
  },
  {
    marketing: 'Progressive decentralization',
    pattern: 'Timeline not specified or repeatedly delayed',
  },
  {
    marketing: 'Fair launch',
    pattern: 'Early participants had informational advantage',
  },
  {
    marketing: 'No premine',
    pattern: 'Team had mining advantage at launch',
  },
  {
    marketing: 'Decentralized governance',
    pattern: 'Small number of addresses control majority votes',
  },
  {
    marketing: 'Battle-tested',
    pattern: 'No public exploits to date',
  },
  {
    marketing: 'Immutable',
    pattern: 'Upgradeable via governance or admin keys',
  },
  {
    marketing: 'Censorship-resistant',
    pattern: 'Sequencer or validator set can order transactions',
  },
  {
    marketing: 'Decentralized stablecoin',
    pattern: 'Collateral includes centralized assets',
  },
  {
    marketing: 'DAO-governed',
    pattern: 'Token-weighted voting with concentrated holdings',
  },
  {
    marketing: 'Non-custodial',
    pattern: 'Smart contract upgradeable by admin',
  },
  {
    marketing: 'Validator network',
    pattern: 'Validator set selected or approved by foundation',
  },
  {
    marketing: 'Layer 2 solution',
    pattern: 'Separate chain with bridge to mainnet',
  },
];

export default function RiskIndicatorsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <Link href="/" className="text-blue-400 hover:text-blue-300 text-sm">
          &larr; Home
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-2">Marketing Language Analysis</h1>
      <p className="text-gray-400 mb-8">
        Common marketing terms and observable patterns. Compare claims against metrics.
      </p>

      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 mb-8">
        <p className="text-gray-300 text-sm">
          <strong>Note:</strong> Marketing language often differs from technical implementation.
          These patterns are generalizations - individual projects vary. Always verify claims using
          on-chain data on our{' '}
          <Link href="/projects" className="underline hover:text-white">
            projects page
          </Link>.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left py-4 px-4 text-gray-400 font-medium">
                Marketing term
              </th>
              <th className="text-left py-4 px-4 text-gray-400 font-medium">
                Observable pattern
              </th>
            </tr>
          </thead>
          <tbody>
            {marketingPatterns.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
              >
                <td className="py-4 px-4">
                  <span className="text-white font-mono">&quot;{item.marketing}&quot;</span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-gray-300">{item.pattern}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-12 p-6 bg-gray-800/50 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Verification Methods</h2>
        <ul className="space-y-3 text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-gray-400">1.</span>
            <span><strong>Check Nakamoto Coefficient:</strong> How many entities could halt the network?</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-gray-400">2.</span>
            <span><strong>Token Distribution:</strong> Who holds how much? Who had access before launch?</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-gray-400">3.</span>
            <span><strong>Upgrade Mechanism:</strong> Can someone change the rules? Who?</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-gray-400">4.</span>
            <span><strong>Halt Capability:</strong> Can the network be stopped? By whom?</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-gray-400">5.</span>
            <span><strong>Source Documentation:</strong> Compare marketing to technical documentation</span>
          </li>
        </ul>
      </div>

      <div className="mt-8 text-center text-gray-500 text-sm">
        <p>
          Have additional patterns?{' '}
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
