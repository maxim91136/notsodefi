'use client';

import Link from 'next/link';

type SPOFType = 'none' | 'person' | 'company' | 'foundation' | 'infra' | 'protocol' | 'multi';

interface SPOFEntry {
  project: string;
  symbol: string;
  score: number;
  spofType: SPOFType;
  element: string;
  deathScenario: string;
}

const spofData: SPOFEntry[] = [
  // Unkillable
  { project: 'Bitcoin', symbol: 'BTC', score: 7.1, spofType: 'none', element: '-', deathScenario: 'Unkillable' },
  { project: 'Monero', symbol: 'XMR', score: 6.2, spofType: 'none', element: '-', deathScenario: 'Unkillable' },
  { project: 'Dogecoin', symbol: 'DOGE', score: 6.1, spofType: 'none', element: '-', deathScenario: 'Unkillable' },
  { project: 'Bitcoin Cash', symbol: 'BCH', score: 6.1, spofType: 'none', element: '-', deathScenario: 'Unkillable' },
  { project: 'Litecoin', symbol: 'LTC', score: 5.9, spofType: 'none', element: '-', deathScenario: 'Unkillable' },
  { project: 'Kaspa', symbol: 'KAS', score: 6.1, spofType: 'none', element: 'Small dev team', deathScenario: 'Survivable via open source' },

  // Fragile (can survive)
  { project: 'Polkadot', symbol: 'DOT', score: 6.5, spofType: 'person', element: 'Founder', deathScenario: 'Vision lost, but Substrate survives' },
  { project: 'Ethereum', symbol: 'ETH', score: 5.2, spofType: 'person', element: 'Founder (social influence)', deathScenario: 'Survives, loses direction' },
  { project: 'Cosmos Hub', symbol: 'ATOM', score: 5.8, spofType: 'foundation', element: 'ICF + internal conflicts', deathScenario: 'SDK survives, Hub fragile' },
  { project: 'Ethereum Classic', symbol: 'ETC', score: 5.8, spofType: 'none', element: 'Small community', deathScenario: 'Survives as zombie chain' },
  { project: 'Zcash', symbol: 'ZEC', score: 4.9, spofType: 'foundation', element: 'ECC + ZF', deathScenario: 'Two orgs = some redundancy' },
  { project: 'Uniswap', symbol: 'UNI', score: 4.7, spofType: 'protocol', element: 'Immutable contracts', deathScenario: 'Labs gone = frontend gone, forks possible' },
  { project: 'DAI', symbol: 'DAI', score: 5.0, spofType: 'protocol', element: 'USDC collateral risk', deathScenario: 'Issuer freeze = DAI destabilized' },
  { project: 'Aave', symbol: 'AAVE', score: 3.7, spofType: 'person', element: 'Founder', deathScenario: 'Survivable, governance exists' },
  { project: 'Lido', symbol: 'LDO', score: 4.6, spofType: 'protocol', element: 'Ethereum-dependent', deathScenario: 'ETH dies = Lido dies' },

  // Critical (company/foundation death = project death)
  { project: 'Filecoin', symbol: 'FIL', score: 6.2, spofType: 'company', element: 'Protocol Labs', deathScenario: 'Labs gone = slow death' },
  { project: 'Cardano', symbol: 'ADA', score: 5.4, spofType: 'multi', element: 'Founder + Single Client', deathScenario: 'Founder-dependent' },
  { project: 'NEAR', symbol: 'NEAR', score: 5.3, spofType: 'foundation', element: 'NEAR Foundation', deathScenario: 'Foundation gone = dead' },
  { project: 'Sui', symbol: 'SUI', score: 5.1, spofType: 'company', element: 'Mysten Labs', deathScenario: 'Labs gone = dead' },
  { project: 'Bittensor', symbol: 'TAO', score: 5.0, spofType: 'multi', element: 'Opentensor + Infra', deathScenario: 'Centralized infra, Foundation-dependent' },
  { project: 'TON', symbol: 'TON', score: 5.0, spofType: 'foundation', element: 'TON Foundation', deathScenario: 'Post-Telegram, but fragile' },
  { project: 'Aptos', symbol: 'APT', score: 4.6, spofType: 'company', element: 'Aptos Labs', deathScenario: 'Labs gone = dead' },
  { project: 'Avalanche', symbol: 'AVAX', score: 4.4, spofType: 'company', element: 'Ava Labs', deathScenario: 'Labs gone = dead' },
  { project: 'Chainlink', symbol: 'LINK', score: 4.4, spofType: 'multi', element: 'Founder + Labs', deathScenario: 'Founder leaves = project fragile' },
  { project: 'Injective', symbol: 'INJ', score: 4.2, spofType: 'company', element: 'Injective Labs', deathScenario: 'Labs gone = dead' },
  { project: 'Polygon', symbol: 'POL', score: 4.1, spofType: 'company', element: 'Polygon Labs', deathScenario: 'Labs gone = dead' },
  { project: 'Stellar', symbol: 'XLM', score: 3.8, spofType: 'foundation', element: 'SDF (35% supply)', deathScenario: 'SDF exit = collapse' },
  { project: 'Arbitrum', symbol: 'ARB', score: 3.5, spofType: 'infra', element: 'Centralized Sequencer', deathScenario: 'Sequencer down = L2 down' },
  { project: 'Solana', symbol: 'SOL', score: 3.4, spofType: 'multi', element: 'Foundation + Single Client', deathScenario: 'Client bug = 100% down' },
  { project: 'Internet Computer', symbol: 'ICP', score: 3.3, spofType: 'company', element: 'DFINITY', deathScenario: 'DFINITY gone = instant death' },

  // Instant Death (kill-switch + critical SPOF)
  { project: 'Hedera', symbol: 'HBAR', score: 1.0, spofType: 'foundation', element: 'Council (39 corps)', deathScenario: 'Council dissolves = dead' },
  { project: 'Hyperliquid', symbol: 'HYPE', score: 1.0, spofType: 'foundation', element: 'Foundation (58% stake)', deathScenario: 'High exit risk based on stake concentration' },
  { project: 'XRP', symbol: 'XRP', score: 1.0, spofType: 'company', element: 'Ripple Labs', deathScenario: 'Ripple gone = dead' },
  { project: 'Tron', symbol: 'TRX', score: 1.0, spofType: 'person', element: 'Founder', deathScenario: 'Founder exits = dead' },
  { project: 'BNB Chain', symbol: 'BNB', score: 1.0, spofType: 'company', element: 'Binance', deathScenario: 'Binance closed = dead' },
  { project: 'Tether', symbol: 'USDT', score: 1.0, spofType: 'company', element: 'Tether Ltd (iFinex)', deathScenario: 'Bank run = dead' },
  { project: 'USDC', symbol: 'USDC', score: 1.0, spofType: 'company', element: 'Circle', deathScenario: 'Regulated, but centralized' },
  { project: 'Virtuals Protocol', symbol: 'VIRTUAL', score: 3.0, spofType: 'company', element: 'Virtuals Team', deathScenario: 'Team gone = dead, Base-dependent' },
];

const getTierInfo = (entry: SPOFEntry) => {
  if (entry.spofType === 'none' && entry.deathScenario === 'Unkillable') {
    return { tier: 'unkillable', label: 'Unkillable', color: 'text-green-400', bg: 'bg-green-900/20', border: 'border-green-700/50', icon: '✅' };
  }
  if (entry.score >= 4.5 && (entry.spofType === 'person' || entry.spofType === 'protocol' || entry.spofType === 'none')) {
    return { tier: 'fragile', label: 'Fragile', color: 'text-yellow-400', bg: 'bg-yellow-900/20', border: 'border-yellow-700/50', icon: '⚠️' };
  }
  if (entry.score === 1.0) {
    return { tier: 'instant', label: 'Instant Death', color: 'text-red-500', bg: 'bg-red-900/30', border: 'border-red-700/50', icon: '💀' };
  }
  return { tier: 'critical', label: 'Critical', color: 'text-orange-400', bg: 'bg-orange-900/20', border: 'border-orange-700/50', icon: '🔴' };
};

const getSpofTypeLabel = (type: SPOFType) => {
  switch (type) {
    case 'none': return 'None';
    case 'person': return 'Person';
    case 'company': return 'Company';
    case 'foundation': return 'Foundation';
    case 'infra': return 'Infrastructure';
    case 'protocol': return 'Protocol';
    case 'multi': return 'Multiple';
    default: return type;
  }
};

export default function SPOFPage() {
  const unkillable = spofData.filter(e => getTierInfo(e).tier === 'unkillable');
  const fragile = spofData.filter(e => getTierInfo(e).tier === 'fragile');
  const critical = spofData.filter(e => getTierInfo(e).tier === 'critical');
  const instant = spofData.filter(e => getTierInfo(e).tier === 'instant');

  const renderTable = (entries: SPOFEntry[], tierInfo: ReturnType<typeof getTierInfo>) => (
    <div className={`${tierInfo.bg} border ${tierInfo.border} rounded-lg p-4 mb-6`}>
      <h2 className={`text-xl font-bold mb-4 ${tierInfo.color}`}>
        {tierInfo.icon} {tierInfo.label} ({entries.length})
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left py-2 px-2 text-gray-400">Project</th>
              <th className="text-left py-2 px-2 text-gray-400">Score</th>
              <th className="text-left py-2 px-2 text-gray-400">SPOF Type</th>
              <th className="text-left py-2 px-2 text-gray-400">The ONE Element</th>
              <th className="text-left py-2 px-2 text-gray-400">Hypothetical Risk</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry.symbol} className="border-b border-gray-800/50 hover:bg-white/5">
                <td className="py-2 px-2">
                  <Link href={`/projects/${entry.project.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-blue-400">
                    <span className="font-medium">{entry.project}</span>
                    <span className="text-gray-500 ml-1">({entry.symbol})</span>
                  </Link>
                </td>
                <td className="py-2 px-2 font-mono">{entry.score.toFixed(1)}</td>
                <td className="py-2 px-2">
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    entry.spofType === 'none' ? 'bg-green-900/50 text-green-400' :
                    entry.spofType === 'person' ? 'bg-purple-900/50 text-purple-400' :
                    entry.spofType === 'company' ? 'bg-red-900/50 text-red-400' :
                    entry.spofType === 'foundation' ? 'bg-orange-900/50 text-orange-400' :
                    entry.spofType === 'infra' ? 'bg-blue-900/50 text-blue-400' :
                    entry.spofType === 'protocol' ? 'bg-cyan-900/50 text-cyan-400' :
                    'bg-gray-700 text-gray-300'
                  }`}>
                    {getSpofTypeLabel(entry.spofType)}
                  </span>
                </td>
                <td className="py-2 px-2 text-gray-300">{entry.element}</td>
                <td className="py-2 px-2 text-gray-400">{entry.deathScenario}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <Link href="/" className="text-blue-400 hover:text-blue-300 text-sm">
          &larr; Home
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-2">Single Point of Failure Analysis</h1>
      <p className="text-gray-400 mb-4">
        What&apos;s the ONE thing that could kill each project? Person, company, foundation, or infrastructure.
      </p>

      <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-4 mb-8">
        <p className="text-yellow-200 text-sm">
          <strong>Disclaimer:</strong> This analysis is based on publicly available data and documentation.
          It is provided for educational purposes only and does not constitute financial advice.
          All assessments represent our methodology&apos;s output based on observable data, not accusations.
          Project structures may change. <a href="https://github.com/maxim91136/notsodefi" target="_blank" rel="noopener noreferrer" className="underline">Submit corrections with evidence</a>.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-green-400">{unkillable.length}</div>
          <div className="text-sm text-gray-400">Unkillable</div>
        </div>
        <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-yellow-400">{fragile.length}</div>
          <div className="text-sm text-gray-400">Fragile</div>
        </div>
        <div className="bg-orange-900/20 border border-orange-700/50 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-orange-400">{critical.length}</div>
          <div className="text-sm text-gray-400">Critical</div>
        </div>
        <div className="bg-red-900/30 border border-red-700/50 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-red-500">{instant.length}</div>
          <div className="text-sm text-gray-400">Instant Death</div>
        </div>
      </div>

      {renderTable(unkillable, { tier: 'unkillable', label: 'Unkillable', color: 'text-green-400', bg: 'bg-green-900/20', border: 'border-green-700/50', icon: '✅' })}
      {renderTable(fragile, { tier: 'fragile', label: 'Fragile (Can Survive)', color: 'text-yellow-400', bg: 'bg-yellow-900/20', border: 'border-yellow-700/50', icon: '⚠️' })}
      {renderTable(critical, { tier: 'critical', label: 'Critical (Death if SPOF fails)', color: 'text-orange-400', bg: 'bg-orange-900/20', border: 'border-orange-700/50', icon: '🔴' })}
      {renderTable(instant, { tier: 'instant', label: 'Instant Death (Kill-switch + Critical SPOF)', color: 'text-red-500', bg: 'bg-red-900/30', border: 'border-red-700/50', icon: '💀' })}

      <div className="mt-12 p-8 bg-gray-800/50 border border-gray-700 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Key Insight</h2>
        <p className="text-gray-300 mb-4">
          Only <span className="text-green-400 font-bold">{unkillable.length} out of {spofData.length} projects</span> have no identifiable Single Point of Failure.
          All of them share common traits:
        </p>
        <ul className="space-y-2 text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-green-400">1.</span>
            <span><strong>Proof of Work</strong> - No staking requirements, anyone can mine</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-400">2.</span>
            <span><strong>Fair Launch</strong> - No premine, no VC allocation, no foundation treasury</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-400">3.</span>
            <span><strong>Founder Exit</strong> - Original creators stepped back or disappeared</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-400">4.</span>
            <span><strong>No Kill Switch</strong> - No admin keys, no pause functions</span>
          </li>
        </ul>
      </div>

      <div className="mt-8 p-6 bg-red-900/20 border border-red-700/50 rounded-lg text-center">
        <p className="text-xl md:text-2xl font-medium text-red-200 italic">
          &ldquo;If ONE person, company, or foundation can kill your chain,<br className="hidden md:block" />
          it&apos;s not decentralized - it&apos;s a startup with extra steps.&rdquo;
        </p>
      </div>

      <div className="mt-8 text-center text-gray-500 text-sm">
        <p>
          Disagree with an assessment?{' '}
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
