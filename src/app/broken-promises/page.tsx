'use client';

import Link from 'next/link';

type Verdict = 'broken' | 'pending' | 'delivered' | 'never_promised' | 'honest';

interface PromiseEntry {
  project: string;
  symbol: string;
  promise: string;
  date: string;
  currentState: string;
  verdict: Verdict;
  source?: string;
}

const promisesData: PromiseEntry[] = [
  // BROKEN - Promised but never delivered
  {
    project: 'Arbitrum',
    symbol: 'ARB',
    promise: 'Decentralized sequencer coming',
    date: '2022-2023',
    currentState: 'Single Sequencer run by Offchain Labs',
    verdict: 'broken',
  },
  {
    project: 'Optimism',
    symbol: 'OP',
    promise: 'Progressive decentralization',
    date: '2022',
    currentState: 'Single Sequencer, "timelines remain fluid"',
    verdict: 'broken',
  },
  {
    project: 'Uniswap',
    symbol: 'UNI',
    promise: 'Community Governance',
    date: 'Sept 2020',
    currentState: 'Top holders control majority voting power',
    verdict: 'broken',
  },
  {
    project: 'Solana',
    symbol: 'SOL',
    promise: 'Validator distribution',
    date: '2021',
    currentState: 'Foundation Delegation Controls, Validator Count -68% since March 2024',
    verdict: 'broken',
  },
  {
    project: 'Hyperliquid',
    symbol: 'HYPE',
    promise: 'Decentralized perp DEX',
    date: '2024',
    currentState: '5 Foundation Validators = 81% Stake',
    verdict: 'broken',
  },
  {
    project: 'Compound',
    symbol: 'COMP',
    promise: 'Decentralized governance',
    date: '2020',
    currentState: 'Top holders dominate all governance votes',
    verdict: 'broken',
  },
  {
    project: 'Aave',
    symbol: 'AAVE',
    promise: 'DAO governance',
    date: '2020',
    currentState: 'Top 3 voters control 58% of voting power',
    verdict: 'broken',
  },
  {
    project: 'Polygon',
    symbol: 'POL',
    promise: 'Community-driven development',
    date: '2021',
    currentState: 'Polygon Labs appears to maintain significant control',
    verdict: 'broken',
  },
  {
    project: 'Avalanche',
    symbol: 'AVAX',
    promise: 'Decentralized validator network',
    date: '2020',
    currentState: 'Ava Labs dominates development and direction',
    verdict: 'broken',
  },
  {
    project: 'Near',
    symbol: 'NEAR',
    promise: 'Progressive decentralization',
    date: '2020',
    currentState: 'NEAR Foundation appears to maintain significant control',
    verdict: 'broken',
  },

  // PENDING - Promised with deadline passed
  {
    project: 'Starknet',
    symbol: 'STRK',
    promise: 'Decentralization Roadmap 2025',
    date: '2023',
    currentState: 'Still centralized sequencer, deadline approaching',
    verdict: 'pending',
  },
  {
    project: 'Hedera',
    symbol: 'HBAR',
    promise: 'Phase 3: Permissionless nodes',
    date: '2020',
    currentState: '5 years later, still only Council can run nodes',
    verdict: 'pending',
  },
  {
    project: 'Bittensor',
    symbol: 'TAO',
    promise: 'Fair launch, no VC, no premine',
    date: '2019',
    currentState: 'Incubated by Polychain 2019. DCG largest holder (2.4% supply). 4 funding rounds on Crunchbase. Launched 2021 claiming "no VC".',
    verdict: 'broken',
  },
  {
    project: 'Internet Computer',
    symbol: 'ICP',
    promise: 'Decentralized compute',
    date: '2021',
    currentState: 'DFINITY appears to maintain significant control, governance voting shows limited practical impact',
    verdict: 'broken',
  },

  // DELIVERED - Actually decentralized (rare)
  {
    project: 'Bitcoin',
    symbol: 'BTC',
    promise: 'Peer-to-peer electronic cash',
    date: '2009',
    currentState: 'Delivered. Satoshi disappeared. Truly decentralized.',
    verdict: 'delivered',
  },
  {
    project: 'Monero',
    symbol: 'XMR',
    promise: 'Private, decentralized money',
    date: '2014',
    currentState: 'Delivered. No foundation, community-driven.',
    verdict: 'delivered',
  },
  {
    project: 'Ethereum',
    symbol: 'ETH',
    promise: 'World computer',
    date: '2015',
    currentState: 'Partially delivered. EF influence remains, but improving.',
    verdict: 'pending',
  },

  // NEVER PROMISED - Honest from start (or just centralized)
  {
    project: 'Tether',
    symbol: 'USDT',
    promise: 'N/A - Never claimed decentralization',
    date: '-',
    currentState: 'Centralized stablecoin. At least they\'re honest.',
    verdict: 'honest',
  },
  {
    project: 'USDC',
    symbol: 'USDC',
    promise: 'N/A - Never claimed decentralization',
    date: '-',
    currentState: 'Centralized stablecoin. Regulated, still centralized.',
    verdict: 'honest',
  },
  {
    project: 'BNB Chain',
    symbol: 'BNB',
    promise: 'N/A - Binance Chain',
    date: '-',
    currentState: 'It\'s Binance\'s chain. Always was.',
    verdict: 'honest',
  },
  {
    project: 'Tron',
    symbol: 'TRX',
    promise: 'Decentralized internet',
    date: '2017',
    currentState: 'Founder appears to maintain dominant control',
    verdict: 'broken',
  },
  {
    project: 'XRP',
    symbol: 'XRP',
    promise: 'Decentralized payments',
    date: '2012',
    currentState: 'Ripple controls UNL, escrow, and 55B XRP',
    verdict: 'broken',
  },
];

const getVerdictInfo = (verdict: Verdict) => {
  switch (verdict) {
    case 'broken':
      return { label: 'BROKEN', icon: '🤥', color: 'text-red-400', bg: 'bg-red-900/20', border: 'border-red-700/50' };
    case 'pending':
      return { label: 'PENDING', icon: '⏳', color: 'text-yellow-400', bg: 'bg-yellow-900/20', border: 'border-yellow-700/50' };
    case 'delivered':
      return { label: 'DELIVERED', icon: '✅', color: 'text-green-400', bg: 'bg-green-900/20', border: 'border-green-700/50' };
    case 'honest':
      return { label: 'NEVER PROMISED', icon: '🤷', color: 'text-gray-400', bg: 'bg-gray-800/50', border: 'border-gray-700/50' };
    default:
      return { label: 'UNKNOWN', icon: '❓', color: 'text-gray-400', bg: 'bg-gray-800/50', border: 'border-gray-700/50' };
  }
};

export default function BrokenPromisesPage() {
  const broken = promisesData.filter(p => p.verdict === 'broken');
  const pending = promisesData.filter(p => p.verdict === 'pending');
  const delivered = promisesData.filter(p => p.verdict === 'delivered');
  const honest = promisesData.filter(p => p.verdict === 'honest');

  const renderTable = (entries: PromiseEntry[], verdictType: Verdict) => {
    const info = getVerdictInfo(verdictType);
    return (
      <div className={`${info.bg} border ${info.border} rounded-lg p-4 mb-6`}>
        <h2 className={`text-xl font-bold mb-4 ${info.color}`}>
          {info.icon} {info.label} ({entries.length})
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 px-2 text-gray-400">Project</th>
                <th className="text-left py-2 px-2 text-gray-400">Promise</th>
                <th className="text-left py-2 px-2 text-gray-400">Date</th>
                <th className="text-left py-2 px-2 text-gray-400">Reality (2024/25)</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.symbol} className="border-b border-gray-800/50 hover:bg-white/5">
                  <td className="py-3 px-2">
                    <span className="font-medium">{entry.project}</span>
                    <span className="text-gray-500 ml-1">({entry.symbol})</span>
                  </td>
                  <td className="py-3 px-2 text-gray-300 italic">&quot;{entry.promise}&quot;</td>
                  <td className="py-3 px-2 text-gray-500 font-mono text-xs">{entry.date}</td>
                  <td className="py-3 px-2 text-gray-300">{entry.currentState}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <Link href="/projects" className="text-blue-400 hover:text-blue-300 text-sm">
          &larr; Back to Rankings
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-2">Broken Promises</h1>
      <p className="text-gray-400 mb-4">
        &quot;Progressive Decentralization&quot; - the crypto industry&apos;s favorite excuse for staying centralized.
      </p>

      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 mb-8">
        <p className="text-gray-300 text-sm">
          <strong>The Playbook:</strong> In January 2020, the concept of &quot;Progressive Decentralization&quot; was coined -
          a 3-stage model where startups launch centralized, then &quot;exit to the community.&quot;
          Five years later, most projects remain at Stage 1.
        </p>
      </div>

      <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-4 mb-8">
        <p className="text-yellow-200 text-sm">
          <strong>Disclaimer:</strong> This page documents publicly stated roadmaps and their current status based on
          observable data. &quot;Broken&quot; indicates a stated timeline has passed without delivery - not accusations of intent.
          Project structures evolve. This is educational analysis, not financial advice.{' '}
          <a href="https://github.com/maxim91136/notsodefi" target="_blank" rel="noopener noreferrer" className="underline">
            Submit corrections with evidence
          </a>.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-red-400">{broken.length}</div>
          <div className="text-sm text-gray-400">Broken</div>
        </div>
        <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-yellow-400">{pending.length}</div>
          <div className="text-sm text-gray-400">Pending</div>
        </div>
        <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-green-400">{delivered.length}</div>
          <div className="text-sm text-gray-400">Delivered</div>
        </div>
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-gray-400">{honest.length}</div>
          <div className="text-sm text-gray-400">Never Promised</div>
        </div>
      </div>

      {renderTable(broken, 'broken')}
      {renderTable(pending, 'pending')}
      {renderTable(delivered, 'delivered')}
      {renderTable(honest, 'honest')}

      <div className="mt-12 p-8 bg-red-900/20 border border-red-700/50 rounded-lg text-center">
        <p className="text-xl md:text-2xl font-medium text-red-200 italic">
          &ldquo;Progressive decentralization is just centralization<br className="hidden md:block" />
          with a roadmap to nowhere.&rdquo;
        </p>
      </div>

      <div className="mt-8 p-6 bg-gray-800/50 rounded-lg">
        <h2 className="text-xl font-bold mb-4">The Pattern</h2>
        <ul className="space-y-3 text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-red-400">1.</span>
            <span><strong>Launch centralized</strong> - &quot;For speed and security&quot;</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-400">2.</span>
            <span><strong>Promise decentralization</strong> - &quot;It&apos;s on the roadmap&quot;</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-400">3.</span>
            <span><strong>Raise billions</strong> - VCs love &quot;decentralized&quot; narratives</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-400">4.</span>
            <span><strong>Never deliver</strong> - &quot;Timelines remain fluid&quot;</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-400">5.</span>
            <span><strong>Repeat</strong> - New promises, same centralization</span>
          </li>
        </ul>
      </div>

      <div className="mt-8 p-6 bg-yellow-900/20 border border-yellow-700/50 rounded-lg">
        <h2 className="text-xl font-bold mb-4 text-yellow-400">How to Spot the Pattern</h2>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li>&bull; &quot;We&apos;ll decentralize once we scale&quot; - They won&apos;t</li>
          <li>&bull; &quot;Security requires temporary centralization&quot; - Permanent</li>
          <li>&bull; &quot;Decentralization roadmap coming soon&quot; - It&apos;s been years</li>
          <li>&bull; &quot;Community governance&quot; + VC majority stake - Theater</li>
          <li>&bull; &quot;Progressive decentralization&quot; without dates - Never</li>
        </ul>
      </div>

      <div className="mt-8 text-center text-gray-500 text-sm">
        <p>
          Know more broken promises?{' '}
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
