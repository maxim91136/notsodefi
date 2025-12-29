'use client';

import Link from 'next/link';

interface VCInvestment {
  project: string;
  symbol: string;
  a16z: boolean;
  paradigm: boolean;
  polychain: boolean;
  other?: string[];
}

const vcData: VCInvestment[] = [
  { project: 'Uniswap', symbol: 'UNI', a16z: true, paradigm: true, polychain: true },
  { project: 'Solana', symbol: 'SOL', a16z: true, paradigm: true, polychain: true },
  { project: 'Arbitrum', symbol: 'ARB', a16z: true, paradigm: true, polychain: true },
  { project: 'Avalanche', symbol: 'AVAX', a16z: true, paradigm: true, polychain: true },
  { project: 'Compound', symbol: 'COMP', a16z: true, paradigm: true, polychain: false },
  { project: 'Cosmos', symbol: 'ATOM', a16z: false, paradigm: true, polychain: true },
  { project: 'Near', symbol: 'NEAR', a16z: true, paradigm: true, polychain: false },
  { project: 'Aptos', symbol: 'APT', a16z: true, paradigm: true, polychain: false },
  { project: 'Optimism', symbol: 'OP', a16z: true, paradigm: true, polychain: false },
  { project: 'Celestia', symbol: 'TIA', a16z: false, paradigm: true, polychain: true },
  { project: 'Bittensor', symbol: 'TAO', a16z: false, paradigm: true, polychain: true },
  { project: 'Sui', symbol: 'SUI', a16z: true, paradigm: false, polychain: false },
  { project: 'MakerDAO', symbol: 'MKR', a16z: true, paradigm: true, polychain: false },
  { project: 'Aave', symbol: 'AAVE', a16z: false, paradigm: true, polychain: false },
  { project: 'Lido', symbol: 'LDO', a16z: true, paradigm: true, polychain: false },
  { project: 'Polygon', symbol: 'POL', a16z: false, paradigm: false, polychain: true },
  { project: 'Internet Computer', symbol: 'ICP', a16z: true, paradigm: false, polychain: true },
  { project: 'Filecoin', symbol: 'FIL', a16z: false, paradigm: true, polychain: true },
];

interface CaseStudy {
  title: string;
  date: string;
  description: string;
  vcInvolved: string;
  outcome: string;
  quote?: string;
}

const caseStudies: CaseStudy[] = [
  {
    title: 'Uniswap BNB Bridge Vote',
    date: 'Feb 2023',
    description: 'a16z pushed for LayerZero (their portfolio company) as the bridge provider. Community voted for Wormhole instead.',
    vcInvolved: 'a16z',
    outcome: 'a16z voted against with 15M UNI. They hold 55M+ UNI total - enough to flip any vote.',
    quote: 'CZ (Binance): "Uniswap controlled by a16z?"',
  },
  {
    title: 'Compound Governance Takeover',
    date: '2020-2024',
    description: 'a16z and Paradigm accumulated enough COMP to control governance outcomes.',
    vcInvolved: 'a16z + Paradigm',
    outcome: 'Top 10 addresses control majority of voting power. "Decentralized governance" is theater.',
  },
  {
    title: 'Solana Foundation Delegation',
    date: '2021-2024',
    description: 'Foundation controls which validators receive delegated stake.',
    vcInvolved: 'a16z + Paradigm + Polychain',
    outcome: 'Validator count dropped 68% since March 2024. Foundation "pruned" validators.',
  },
  {
    title: 'Optimism Token Distribution',
    date: '2022',
    description: 'OP token launched with massive VC allocation disguised as "ecosystem fund".',
    vcInvolved: 'a16z + Paradigm',
    outcome: 'VCs control governance while claiming "community ownership".',
  },
];

export default function FollowTheMoneyPage() {
  const countInvestments = (vc: 'a16z' | 'paradigm' | 'polychain') => {
    return vcData.filter(v => v[vc]).length;
  };

  const countOverlap = () => {
    return vcData.filter(v => (v.a16z && v.paradigm) || (v.a16z && v.polychain) || (v.paradigm && v.polychain)).length;
  };

  const countAllThree = () => {
    return vcData.filter(v => v.a16z && v.paradigm && v.polychain).length;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <Link href="/projects" className="text-blue-400 hover:text-blue-300 text-sm">
          &larr; Back to Rankings
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-2">Follow the Money</h1>
      <p className="text-gray-400 mb-8">
        The same VCs control the &quot;decentralized&quot; ecosystem. Here&apos;s the map.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-purple-900/20 border border-purple-700/50 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-purple-400">{countInvestments('a16z')}</div>
          <div className="text-sm text-gray-400">a16z Projects</div>
        </div>
        <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-blue-400">{countInvestments('paradigm')}</div>
          <div className="text-sm text-gray-400">Paradigm Projects</div>
        </div>
        <div className="bg-cyan-900/20 border border-cyan-700/50 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-cyan-400">{countInvestments('polychain')}</div>
          <div className="text-sm text-gray-400">Polychain Projects</div>
        </div>
        <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-red-400">{countAllThree()}</div>
          <div className="text-sm text-gray-400">All 3 VCs</div>
        </div>
      </div>

      {/* VC Overlap Matrix */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 mb-8">
        <h2 className="text-xl font-bold mb-4">VC Portfolio Overlap Matrix</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 px-3 text-gray-400">Project</th>
                <th className="text-center py-2 px-3 text-purple-400">a16z</th>
                <th className="text-center py-2 px-3 text-blue-400">Paradigm</th>
                <th className="text-center py-2 px-3 text-cyan-400">Polychain</th>
                <th className="text-center py-2 px-3 text-gray-400">Overlap</th>
              </tr>
            </thead>
            <tbody>
              {vcData.map((entry) => {
                const overlapCount = [entry.a16z, entry.paradigm, entry.polychain].filter(Boolean).length;
                return (
                  <tr key={entry.symbol} className="border-b border-gray-800/50 hover:bg-white/5">
                    <td className="py-2 px-3">
                      <span className="font-medium">{entry.project}</span>
                      <span className="text-gray-500 ml-1">({entry.symbol})</span>
                    </td>
                    <td className="py-2 px-3 text-center">
                      {entry.a16z ? <span className="text-purple-400">✓</span> : <span className="text-gray-600">-</span>}
                    </td>
                    <td className="py-2 px-3 text-center">
                      {entry.paradigm ? <span className="text-blue-400">✓</span> : <span className="text-gray-600">-</span>}
                    </td>
                    <td className="py-2 px-3 text-center">
                      {entry.polychain ? <span className="text-cyan-400">✓</span> : <span className="text-gray-600">-</span>}
                    </td>
                    <td className="py-2 px-3 text-center">
                      <span className={`px-2 py-0.5 rounded text-xs ${
                        overlapCount === 3 ? 'bg-red-900/50 text-red-400' :
                        overlapCount === 2 ? 'bg-yellow-900/50 text-yellow-400' :
                        'bg-gray-700 text-gray-400'
                      }`}>
                        {overlapCount}/3
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Case Studies */}
      <h2 className="text-xl font-bold mb-4">Case Studies: VC Power in Action</h2>
      <div className="space-y-4 mb-8">
        {caseStudies.map((study, index) => (
          <div key={index} className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-bold text-white">{study.title}</h3>
              <span className="text-xs text-gray-500 font-mono">{study.date}</span>
            </div>
            <p className="text-gray-300 text-sm mb-2">{study.description}</p>
            <p className="text-gray-400 text-sm mb-2">
              <span className="text-purple-400">VCs involved:</span> {study.vcInvolved}
            </p>
            <p className="text-red-400 text-sm">
              <strong>Outcome:</strong> {study.outcome}
            </p>
            {study.quote && (
              <p className="text-yellow-400 text-sm mt-2 italic">&quot;{study.quote}&quot;</p>
            )}
          </div>
        ))}
      </div>

      {/* Key Insight */}
      <div className="mt-8 p-8 bg-red-900/20 border border-red-700/50 rounded-lg text-center">
        <p className="text-xl md:text-2xl font-medium text-red-200 italic">
          &ldquo;Same VCs, same control.<br className="hidden md:block" />
          It&apos;s not a decentralized ecosystem - it&apos;s a portfolio.&rdquo;
        </p>
      </div>

      {/* The Problem */}
      <div className="mt-8 p-6 bg-gray-800/50 rounded-lg">
        <h2 className="text-xl font-bold mb-4">The Problem</h2>
        <ul className="space-y-3 text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-red-400">1.</span>
            <span><strong>Governance capture:</strong> VCs accumulate tokens before launch, then control all votes</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-400">2.</span>
            <span><strong>Conflict of interest:</strong> Same VCs in competing protocols push their portfolio companies</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-400">3.</span>
            <span><strong>Coordinated exits:</strong> VCs can dump tokens across multiple projects simultaneously</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-400">4.</span>
            <span><strong>Fake competition:</strong> &quot;Competing&quot; protocols owned by the same investors</span>
          </li>
        </ul>
      </div>

      {/* a16z Deep Dive */}
      <div className="mt-8 p-6 bg-purple-900/20 border border-purple-700/50 rounded-lg">
        <h2 className="text-xl font-bold mb-4 text-purple-400">a16z Crypto: The Elephant in the Room</h2>
        <p className="text-gray-300 text-sm mb-4">
          Andreessen Horowitz (a16z) has invested in <strong>127+ crypto companies</strong>, including:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
          <div className="text-gray-400">Coinbase (exchange)</div>
          <div className="text-gray-400">Uniswap (DEX)</div>
          <div className="text-gray-400">Compound (lending)</div>
          <div className="text-gray-400">MakerDAO (stablecoin)</div>
          <div className="text-gray-400">Solana (L1)</div>
          <div className="text-gray-400">Aptos (L1)</div>
          <div className="text-gray-400">Sui (L1)</div>
          <div className="text-gray-400">Near (L1)</div>
          <div className="text-gray-400">Arbitrum (L2)</div>
          <div className="text-gray-400">Optimism (L2)</div>
          <div className="text-gray-400">LayerZero (bridge)</div>
          <div className="text-gray-400">EigenLayer (restaking)</div>
        </div>
        <p className="text-gray-400 text-sm mt-4">
          When a16z is invested in the exchange, the L1, the L2, the DEX, the lending protocol, AND the bridge...
          who exactly is competing with whom?
        </p>
      </div>

      <div className="mt-8 text-center text-gray-500 text-sm">
        <p>
          Data sourced from public VC portfolios and token holder analysis.{' '}
          <a
            href="https://github.com/maxim91136/notsodefi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300"
          >
            Submit corrections
          </a>
        </p>
      </div>
    </div>
  );
}
