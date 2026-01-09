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
    currentState: '7+ coordinated halts since 2020, 50+ hours downtime. Foundation controls delegation.',
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
    project: 'Algorand',
    symbol: 'ALGO',
    promise: 'Permissionless relay nodes',
    date: '2021',
    currentState: 'Relay nodes still permissioned (2026). Foundation held 63% stake until 2025. xGov scaled back to grant voting only.',
    verdict: 'broken',
  },
  {
    project: 'Polygon',
    symbol: 'POL',
    promise: 'Community-driven development',
    date: '2021',
    currentState: 'Multiple halts (2022: 11h, 2024: 1h+10h). Low Nakamoto Coefficient, max 105 validators hardcoded.',
    verdict: 'broken',
  },
  {
    project: 'Avalanche',
    symbol: 'AVAX',
    promise: 'Decentralized validator network',
    date: '2020',
    currentState: 'Feb 2024: 5h halt. Ava Labs controls dev/brand. No token governance.',
    verdict: 'broken',
  },
  {
    project: 'Near',
    symbol: 'NEAR',
    promise: 'Progressive decentralization',
    date: '2020',
    currentState: 'No halts. Foundation + Pagoda can still coordinate validators.',
    verdict: 'pending',
  },
  {
    project: 'Chainlink',
    symbol: 'LINK',
    promise: 'Decentralized oracle network',
    date: '2017',
    currentState: 'Chainlink Labs controls node selection, multisigs, and feed composition',
    verdict: 'broken',
  },
  {
    project: 'Stellar',
    symbol: 'XLM',
    promise: 'Decentralized financial inclusion',
    date: '2014',
    currentState: 'Only 7 Tier-1 orgs. SDF holds 35% supply. No on-chain governance. XLM has no voting rights.',
    verdict: 'broken',
  },
  {
    project: 'Sui',
    symbol: 'SUI',
    promise: 'Decentralized Layer 1',
    date: '2023',
    currentState: 'Nov 2024: 2h halt (crash loop). 84% staked by insiders. Mysten Labs controls everything.',
    verdict: 'broken',
  },
  {
    project: 'Aptos',
    symbol: 'APT',
    promise: 'Decentralized Layer 1',
    date: '2022',
    currentState: 'No token governance. 49% insider allocation. Labs controls all development.',
    verdict: 'broken',
  },
  {
    project: 'Filecoin',
    symbol: 'FIL',
    promise: 'Decentralized storage network',
    date: '2017',
    currentState: 'High Nakamoto Coefficient. Protocol Labs influential but miners operate independently.',
    verdict: 'pending',
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
    currentState: 'July 2024: Network halted ("safe mode"). Incubated by Polychain 2019. DCG holds 2.4% supply.',
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
    project: 'Litecoin',
    symbol: 'LTC',
    promise: 'Lightweight Bitcoin alternative',
    date: '2011',
    currentState: 'Fair launch, no premine. Lee sold stake 2017 but still Foundation Director.',
    verdict: 'delivered',
  },
  {
    project: 'Dogecoin',
    symbol: 'DOGE',
    promise: 'Fun, community-driven cryptocurrency',
    date: '2013',
    currentState: 'Fair launch meme coin. No foundation control.',
    verdict: 'delivered',
  },
  {
    project: 'Bitcoin Cash',
    symbol: 'BCH',
    promise: 'Peer-to-peer electronic cash',
    date: '2017',
    currentState: 'Fork delivered on bigger blocks promise. Community-driven.',
    verdict: 'delivered',
  },
  {
    project: 'Kaspa',
    symbol: 'KAS',
    promise: 'Fair launch PoW',
    date: '2021',
    currentState: 'Founder: "Kaspa is neither attempting nor pretending to be a fair launch coin." DAGlabs ($8M Polychain) mined ~3% at launch with capital advantage.',
    verdict: 'honest',
  },
  {
    project: 'Zcash',
    symbol: 'ZEC',
    promise: 'Privacy-preserving cryptocurrency',
    date: '2016',
    currentState: 'Privacy tech works. ECC and Foundation still influential in governance.',
    verdict: 'pending',
  },
  {
    project: 'Ethereum Classic',
    symbol: 'ETC',
    promise: 'Immutable Ethereum continuation',
    date: '2016',
    currentState: 'Maintained original chain after DAO fork. No foundation control.',
    verdict: 'delivered',
  },
  {
    project: 'Render Network',
    symbol: 'RENDER',
    promise: 'Decentralized GPU computing',
    date: '2017',
    currentState: 'Foundation/team can pause job routing. RenderLabs (for-profit) controls direction.',
    verdict: 'broken',
  },
  {
    project: 'Cardano',
    symbol: 'ADA',
    promise: 'Peer-reviewed decentralized blockchain',
    date: '2017',
    currentState: 'Constitution passed Feb 2025. On-chain governance active. IOG influence declining.',
    verdict: 'pending',
  },
  {
    project: 'Polkadot',
    symbol: 'DOT',
    promise: 'Decentralized interoperability',
    date: '2020',
    currentState: 'Sudo removed July 2020. OpenGov on-chain. Parity develops but cannot override governance.',
    verdict: 'delivered',
  },
  {
    project: 'Cosmos',
    symbol: 'ATOM',
    promise: 'Internet of blockchains',
    date: '2019',
    currentState: 'Cosmos Labs (2025) centralized engineering. Sunsetting stewardship. Validators call it "excessive centralization".',
    verdict: 'broken',
  },
  {
    project: 'TON',
    symbol: 'TON',
    promise: 'Decentralized Telegram blockchain',
    date: '2018',
    currentState: 'Society DAO (2025) with 3.6M participants. Foundation still dominant. 85% whale-mined supply unchanged.',
    verdict: 'pending',
  },
  {
    project: 'DAI',
    symbol: 'DAI',
    promise: 'Decentralized stablecoin',
    date: '2017',
    currentState: 'MakerDAO governance concentrated, "Endgame" restructuring underway',
    verdict: 'pending',
  },
  {
    project: 'Injective',
    symbol: 'INJ',
    promise: 'Decentralized derivatives exchange',
    date: '2021',
    currentState: 'Only 50 validators, VC-coordinated (Binance, Jump, Pantera). Labs controls everything.',
    verdict: 'broken',
  },
  {
    project: 'Fetch.ai',
    symbol: 'FET',
    promise: 'ASI Alliance - Unified AI Ecosystem',
    date: 'March 2024',
    currentState: 'Ocean Protocol exited October 2025. Legal proceedings initiated.',
    verdict: 'broken',
  },
  {
    project: 'Lido',
    symbol: 'LDO',
    promise: 'Decentralized liquid staking',
    date: '2020',
    currentState: 'CSM permissionless Feb 2025. DVT adoption growing. Dual Governance Module active.',
    verdict: 'pending',
  },
  {
    project: 'Virtuals Protocol',
    symbol: 'VIRTUAL',
    promise: 'Decentralized AI agents',
    date: '2024',
    currentState: 'Too early to assess - project recently launched',
    verdict: 'pending',
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
    currentState: 'Binance-controlled chain. Consistent with positioning.',
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
      return { label: 'TIMELINE PASSED', icon: '⏰', color: 'text-red-400', bg: 'bg-red-900/20', border: 'border-red-700/50' };
    case 'pending':
      return { label: 'IN PROGRESS', icon: '📋', color: 'text-yellow-400', bg: 'bg-yellow-900/20', border: 'border-yellow-700/50' };
    case 'delivered':
      return { label: 'DELIVERED', icon: '○', color: 'text-green-400', bg: 'bg-green-900/20', border: 'border-green-700/50' };
    case 'honest':
      return { label: 'NO COMMITMENT', icon: 'ℹ️', color: 'text-gray-400', bg: 'bg-gray-800/50', border: 'border-gray-700/50' };
    default:
      return { label: 'UNKNOWN', icon: '?', color: 'text-gray-400', bg: 'bg-gray-800/50', border: 'border-gray-700/50' };
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
        <Link href="/" className="text-blue-400 hover:text-blue-300 text-sm">
          &larr; Home
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-2">Roadmap Tracking</h1>
      <p className="text-gray-400 mb-4">
        Comparing stated decentralization roadmaps against current observable status.
      </p>

      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 mb-8">
        <p className="text-gray-300 text-sm">
          <strong>Context:</strong> &quot;Progressive Decentralization&quot; (coined January 2020) describes a 3-stage model
          where projects launch centralized, then transition to community control over time.
          This page tracks stated timelines against current status.
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
          <div className="text-sm text-gray-400">Timeline Passed</div>
        </div>
        <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-yellow-400">{pending.length}</div>
          <div className="text-sm text-gray-400">In Progress</div>
        </div>
        <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-green-400">{delivered.length}</div>
          <div className="text-sm text-gray-400">Delivered</div>
        </div>
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-gray-400">{honest.length}</div>
          <div className="text-sm text-gray-400">No Commitment</div>
        </div>
      </div>

      {renderTable(broken, 'broken')}
      {renderTable(pending, 'pending')}
      {renderTable(delivered, 'delivered')}
      {renderTable(honest, 'honest')}

      <div className="mt-12 p-8 bg-gray-800/50 border border-gray-700/50 rounded-lg text-center">
        <p className="text-lg md:text-xl font-medium text-gray-300">
          Promises are statements about the future.<br className="hidden md:block" />
          Metrics reflect the present.
        </p>
      </div>

      <div className="mt-8 p-6 bg-gray-800/50 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Documentation Approach</h2>
        <ul className="space-y-3 text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-gray-400">1.</span>
            <span><strong>Record stated commitments</strong> - From official sources</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-gray-400">2.</span>
            <span><strong>Note target dates</strong> - When provided</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-gray-400">3.</span>
            <span><strong>Compare to current state</strong> - Observable metrics</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-gray-400">4.</span>
            <span><strong>Categorize status</strong> - Delivered, In Progress, or Timeline Passed</span>
          </li>
        </ul>
      </div>

      <div className="mt-8 p-6 bg-yellow-900/20 border border-yellow-700/50 rounded-lg">
        <h2 className="text-xl font-bold mb-4 text-yellow-400">Common Patterns</h2>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li>&bull; &quot;We&apos;ll decentralize once we scale&quot; - Check timeline</li>
          <li>&bull; &quot;Security requires temporary centralization&quot; - Check duration</li>
          <li>&bull; &quot;Decentralization roadmap coming soon&quot; - Check dates</li>
          <li>&bull; &quot;Community governance&quot; + VC majority stake - Check voting power</li>
          <li>&bull; &quot;Progressive decentralization&quot; - Check concrete milestones</li>
        </ul>
      </div>

      <div className="mt-8 text-center text-gray-500 text-sm">
        <p>
          Have additional data?{' '}
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
