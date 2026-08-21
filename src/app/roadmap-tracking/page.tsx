'use client';

import { useState, useMemo } from 'react';
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
    currentState: 'Founder: "Kaspa is neither attempting nor pretending to be a fair launch coin." Early VC-backed development team mined ~3% at launch with capital advantage.',
    verdict: 'honest',
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
    project: 'Polkadot',
    symbol: 'DOT',
    promise: 'Decentralized interoperability',
    date: '2020',
    currentState: 'Sudo removed July 2020. OpenGov on-chain. Core development team maintains the client but cannot override governance.',
    verdict: 'delivered',
  },
  {
    project: 'Ethereum',
    symbol: 'ETH',
    promise: 'World computer',
    date: '2015',
    currentState: 'Partially delivered. Founding foundation retains influence, but its role is diminishing.',
    verdict: 'pending',
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
  const [search, setSearch] = useState('');
  const [verdictFilter, setVerdictFilter] = useState<Verdict | 'all'>('all');

  const filteredData = useMemo(() => {
    return promisesData.filter(entry => {
      const matchesSearch = search === '' ||
        entry.project.toLowerCase().includes(search.toLowerCase()) ||
        entry.symbol.toLowerCase().includes(search.toLowerCase());
      const matchesVerdict = verdictFilter === 'all' || entry.verdict === verdictFilter;
      return matchesSearch && matchesVerdict;
    });
  }, [search, verdictFilter]);

  const broken = filteredData.filter(p => p.verdict === 'broken');
  const pending = filteredData.filter(p => p.verdict === 'pending');
  const delivered = filteredData.filter(p => p.verdict === 'delivered');
  const honest = filteredData.filter(p => p.verdict === 'honest');

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
                <th className="text-left py-2 px-2 text-gray-400">Current Reality</th>
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

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search project..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
        />
        <select
          value={verdictFilter}
          onChange={(e) => setVerdictFilter(e.target.value as Verdict | 'all')}
          className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
        >
          <option value="all">All Status</option>
          <option value="broken">Timeline Passed</option>
          <option value="pending">In Progress</option>
          <option value="delivered">Delivered</option>
          <option value="honest">No Commitment</option>
        </select>
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
