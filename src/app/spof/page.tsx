'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { projects } from '@/lib/data/projects';

type SPOFType = 'none' | 'person';

interface SPOFData {
  symbol: string;
  spofType: SPOFType;
  element: string;
  deathScenario: string;
}

interface SPOFEntry extends SPOFData {
  project: string;
  score: number;
}

// SPOF-specific data only - scores come from projects dynamically
const spofDataRaw: SPOFData[] = [
  // Unkillable
  { symbol: 'BTC', spofType: 'none', element: '-', deathScenario: 'Unkillable' },
  { symbol: 'XMR', spofType: 'none', element: '-', deathScenario: 'Unkillable' },
  { symbol: 'DOGE', spofType: 'none', element: '-', deathScenario: 'Unkillable' },
  { symbol: 'BCH', spofType: 'none', element: '-', deathScenario: 'Unkillable' },
  { symbol: 'LTC', spofType: 'none', element: '-', deathScenario: 'Unkillable' },
  { symbol: 'KAS', spofType: 'none', element: 'Small dev team', deathScenario: 'Survivable via open source' },
  { symbol: 'ETC', spofType: 'none', element: 'Small community', deathScenario: 'Survives as zombie chain' },

  // Fragile (can survive)
  { symbol: 'ETH', spofType: 'person', element: 'Founder (social influence)', deathScenario: 'Survives, loses direction' },
];

// Build lookup map from projects
const projectMap = new Map(projects.map(p => [p.symbol, p]));

// Merge SPOF data with dynamic scores from projects
const spofData: SPOFEntry[] = spofDataRaw
  .map(data => {
    const project = projectMap.get(data.symbol);
    if (!project) return null;
    return {
      ...data,
      project: project.name,
      score: project.scores.totalScore,
    };
  })
  .filter((entry): entry is SPOFEntry => entry !== null);

const getTierInfo = (entry: SPOFEntry) => {
  if (entry.spofType === 'none' && entry.deathScenario === 'Unkillable') {
    return { tier: 'unkillable', label: 'No SPOF Identified', color: 'text-green-400', bg: 'bg-green-900/20', border: 'border-green-700/50', icon: '○' };
  }
  return { tier: 'fragile', label: 'Limited Dependency', color: 'text-yellow-400', bg: 'bg-yellow-900/20', border: 'border-yellow-700/50', icon: '△' };
};

const getSpofTypeLabel = (type: SPOFType) => {
  switch (type) {
    case 'none': return 'None';
    case 'person': return 'Person';
    default: return type;
  }
};

export default function SPOFPage() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<SPOFType | 'all'>('all');

  const filteredData = useMemo(() => {
    return spofData.filter(entry => {
      const matchesSearch = search === '' ||
        entry.project.toLowerCase().includes(search.toLowerCase()) ||
        entry.symbol.toLowerCase().includes(search.toLowerCase());
      const matchesType = typeFilter === 'all' || entry.spofType === typeFilter;
      return matchesSearch && matchesType;
    });
  }, [search, typeFilter]);

  const byScoreDesc = (a: SPOFEntry, b: SPOFEntry) => b.score - a.score;
  const unkillable = filteredData.filter(e => getTierInfo(e).tier === 'unkillable').sort(byScoreDesc);
  const fragile = filteredData.filter(e => getTierInfo(e).tier === 'fragile').sort(byScoreDesc);

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
              <th className="text-left py-2 px-2 text-gray-400">Primary Dependency</th>
              <th className="text-left py-2 px-2 text-gray-400">Dependency Scenario</th>
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
                    'bg-purple-900/50 text-purple-400'
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
        What could technically end each protocol &mdash; for protocols without a controlling entity.
      </p>

      <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-4 mb-8">
        <p className="text-yellow-200 text-sm">
          <strong>Disclaimer:</strong> This analysis is based on publicly available data and documentation.
          It is provided for educational purposes only and does not constitute financial advice.
          All assessments represent our methodology&apos;s output based on observable data, not accusations.
          Project structures may change. <a href="https://github.com/maxim91136/notsodefi" target="_blank" rel="noopener noreferrer" className="underline">Submit corrections with evidence</a>.
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
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value as SPOFType | 'all')}
          className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
        >
          <option value="all">All Types</option>
          <option value="none">None</option>
          <option value="person">Person</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-green-400">{unkillable.length}</div>
          <div className="text-sm text-gray-400">No SPOF</div>
        </div>
        <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-yellow-400">{fragile.length}</div>
          <div className="text-sm text-gray-400">Limited</div>
        </div>
      </div>

      {renderTable(unkillable, { tier: 'unkillable', label: 'No SPOF Identified', color: 'text-green-400', bg: 'bg-green-900/20', border: 'border-green-700/50', icon: '○' })}
      {renderTable(fragile, { tier: 'fragile', label: 'Limited Dependency', color: 'text-yellow-400', bg: 'bg-yellow-900/20', border: 'border-yellow-700/50', icon: '△' })}

      <div className="mt-12 p-8 bg-gray-800/50 border border-gray-700 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Classification Criteria</h2>
        <p className="text-gray-300 mb-4">
          <span className="text-green-400 font-bold">{unkillable.length} of {spofData.length} projects</span> show no identifiable single point of failure based on available data.
          Common characteristics observed:
        </p>
        <ul className="space-y-2 text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-gray-400">1.</span>
            <span><strong>Proof of Work consensus</strong> - Permissionless participation</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-gray-400">2.</span>
            <span><strong>No premine or insider allocation</strong> - Open distribution</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-gray-400">3.</span>
            <span><strong>No centralized halt capability</strong> - No admin controls</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-gray-400">4.</span>
            <span><strong>Multiple independent implementations</strong> - Client diversity</span>
          </li>
        </ul>
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
