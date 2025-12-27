'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Project, ConsensusType, ProjectCategory } from '@/lib/framework';
import { getScoreTextColor } from '@/lib/utils';

interface ProjectTableProps {
  projects: Project[];
}

const CONSENSUS_LABELS: Record<ConsensusType, { label: string; color: string }> = {
  pow: { label: 'PoW', color: 'bg-orange-500/20 text-orange-400' },
  pos: { label: 'PoS', color: 'bg-blue-500/20 text-blue-400' },
  npos: { label: 'NPoS', color: 'bg-emerald-500/20 text-emerald-400' },
  dpos: { label: 'DPoS', color: 'bg-purple-500/20 text-purple-400' },
  hybrid: { label: 'Hybrid', color: 'bg-cyan-500/20 text-cyan-400' },
  federated: { label: 'Federated', color: 'bg-gray-500/20 text-gray-400' },
};

const CATEGORY_LABELS: Record<ProjectCategory, { label: string; color: string }> = {
  L1: { label: 'L1', color: 'bg-sky-500/20 text-sky-400' },
  L2: { label: 'L2', color: 'bg-indigo-500/20 text-indigo-400' },
  DEX: { label: 'DEX', color: 'bg-pink-500/20 text-pink-400' },
  Lending: { label: 'Lending', color: 'bg-amber-500/20 text-amber-400' },
  Oracle: { label: 'Oracle', color: 'bg-violet-500/20 text-violet-400' },
  Stablecoin: { label: 'Stable', color: 'bg-green-500/20 text-green-400' },
  Infrastructure: { label: 'Infra', color: 'bg-slate-500/20 text-slate-400' },
};

// Get unique values that exist in projects
function getAvailableFilters(projects: Project[]) {
  const categories = new Set<ProjectCategory>();
  const consensusTypes = new Set<ConsensusType>();

  for (const p of projects) {
    categories.add(p.category);
    consensusTypes.add(p.consensusType);
  }

  return {
    categories: Array.from(categories),
    consensusTypes: Array.from(consensusTypes),
  };
}

type SortField = 'rank' | 'name' | 'total' | 'chain' | 'control' | 'fairness';
type SortDir = 'asc' | 'desc';

export function ProjectTable({ projects }: ProjectTableProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField>('rank');
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [selectedCategories, setSelectedCategories] = useState<Set<ProjectCategory>>(new Set());
  const [selectedConsensus, setSelectedConsensus] = useState<Set<ConsensusType>>(new Set());

  const { categories: availableCategories, consensusTypes: availableConsensus } = useMemo(
    () => getAvailableFilters(projects),
    [projects]
  );

  // Pre-compute global ranks (before any filtering)
  const globalRanks = useMemo(() => {
    const ranks = new Map<string, number>();
    projects.forEach((p, idx) => ranks.set(p.id, idx + 1));
    return ranks;
  }, [projects]);

  const filteredAndSortedProjects = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    const filtered = projects.filter((p) => {
      const searchMatch = !query ||
        p.name.toLowerCase().includes(query) ||
        (p.symbol && p.symbol.toLowerCase().includes(query));
      const categoryMatch = selectedCategories.size === 0 || selectedCategories.has(p.category);
      const consensusMatch = selectedConsensus.size === 0 || selectedConsensus.has(p.consensusType);
      return searchMatch && categoryMatch && consensusMatch;
    });

    return [...filtered].sort((a, b) => {
      let cmp = 0;
      switch (sortField) {
        case 'rank':
          cmp = (globalRanks.get(a.id) || 0) - (globalRanks.get(b.id) || 0);
          break;
        case 'name':
          cmp = a.name.localeCompare(b.name);
          break;
        case 'total':
          cmp = b.scores.totalScore - a.scores.totalScore;
          break;
        case 'chain':
          cmp = b.scores.chainScore - a.scores.chainScore;
          break;
        case 'control':
          cmp = b.scores.controlScore - a.scores.controlScore;
          break;
        case 'fairness':
          cmp = b.scores.fairnessScore - a.scores.fairnessScore;
          break;
      }
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [projects, searchQuery, selectedCategories, selectedConsensus, sortField, sortDir, globalRanks]);

  const toggleCategory = (cat: ProjectCategory) => {
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) {
        next.delete(cat);
      } else {
        next.add(cat);
      }
      return next;
    });
  };

  const toggleConsensus = (cons: ConsensusType) => {
    setSelectedConsensus((prev) => {
      const next = new Set(prev);
      if (next.has(cons)) {
        next.delete(cons);
      } else {
        next.add(cons);
      }
      return next;
    });
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategories(new Set());
    setSelectedConsensus(new Set());
    setSortField('rank');
    setSortDir('asc');
  };

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir(field === 'name' ? 'asc' : 'desc');
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <span className="text-white/20 ml-1">↕</span>;
    return <span className="ml-1">{sortDir === 'asc' ? '↑' : '↓'}</span>;
  };

  const hasFilters = searchQuery.length > 0 || selectedCategories.size > 0 || selectedConsensus.size > 0 || sortField !== 'rank';

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <h2 className="font-semibold text-white">Leaderboard</h2>
        <span className="text-sm text-white/50">
          {filteredAndSortedProjects.length === projects.length
            ? `${projects.length} projects`
            : `${filteredAndSortedProjects.length} of ${projects.length} projects`}
        </span>
      </div>

      {/* Filter Bar */}
      <div className="m-4 p-3 bg-white/5 rounded-lg border border-white/10">
        <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-4">
          {/* Search + Count row on mobile */}
          <div className="flex items-center justify-between sm:justify-start gap-2">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 sm:flex-none w-full sm:w-40 px-3 py-2 sm:py-1 text-sm bg-white/5 border border-white/10 rounded text-white placeholder-white/30 focus:outline-none focus:border-white/30"
            />
            <div className="flex items-center gap-2 sm:hidden">
              <span className="text-xs text-white/40">
                {filteredAndSortedProjects.length}/{projects.length}
              </span>
              {hasFilters && (
                <button
                  onClick={clearFilters}
                  className="px-2 py-1 rounded text-xs font-medium bg-red-500/20 text-red-400"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-white/40 uppercase tracking-wider hidden sm:inline">Category:</span>
            <div className="flex flex-wrap gap-1">
              {availableCategories.map((cat) => {
                const { label, color } = CATEGORY_LABELS[cat];
                const isSelected = selectedCategories.has(cat);
                return (
                  <button
                    key={cat}
                    onClick={() => toggleCategory(cat)}
                    className={`px-2.5 py-1.5 sm:px-2 sm:py-1 rounded text-xs font-medium transition-all ${
                      isSelected
                        ? `${color} ring-1 ring-white/30`
                        : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white/60'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Consensus Filters */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-white/40 uppercase tracking-wider hidden sm:inline">Consensus:</span>
            <div className="flex flex-wrap gap-1">
              {availableConsensus.map((cons) => {
                const { label, color } = CONSENSUS_LABELS[cons];
                const isSelected = selectedConsensus.has(cons);
                return (
                  <button
                    key={cons}
                    onClick={() => toggleConsensus(cons)}
                    className={`px-2.5 py-1.5 sm:px-2 sm:py-1 rounded text-xs font-medium transition-all ${
                      isSelected
                        ? `${color} ring-1 ring-white/30`
                        : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white/60'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Clear & Count - Desktop only */}
          <div className="hidden sm:flex items-center gap-2 ml-auto">
            <span className="text-xs text-white/40">
              {filteredAndSortedProjects.length} / {projects.length}
            </span>
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="px-2 py-1 rounded text-xs font-medium bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="sm:hidden px-4 pb-4 space-y-2 max-h-[65vh] overflow-auto">
        {filteredAndSortedProjects.map((project) => {
          const consensus = CONSENSUS_LABELS[project.consensusType];
          const category = CATEGORY_LABELS[project.category];
          const globalRank = globalRanks.get(project.id) || 0;
          const isFirst = globalRank === 1;
          return (
            <div
              key={project.id}
              onClick={() => router.push(`/projects/${project.id}`)}
              className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                isFirst
                  ? 'bg-yellow-500/5 border-yellow-500/30'
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className={`font-mono text-sm ${isFirst ? 'text-yellow-400 font-bold' : 'text-white/40'}`}>
                    #{globalRank}
                  </span>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-medium text-white">{project.name}</span>
                      {project.scores.killSwitchActive && (
                        <span className="text-red-500 text-xs">⚠️</span>
                      )}
                    </div>
                    {project.symbol && (
                      <span className="text-xs text-white/40">{project.symbol}</span>
                    )}
                  </div>
                </div>
                <span className={`text-lg font-bold ${getScoreTextColor(project.scores.totalScore)}`}>
                  {project.scores.totalScore.toFixed(1)}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${category.color}`}>
                  {category.label}
                </span>
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${consensus.color}`}>
                  {consensus.label}
                </span>
              </div>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/10 text-xs text-white/50">
                <div className="flex gap-3">
                  <span>Chain: <span className="text-blue-400">{project.scores.chainScore.toFixed(1)}</span></span>
                  <span>Control: <span className="text-purple-400">{project.scores.controlScore.toFixed(1)}</span></span>
                  <span>Fair: <span className="text-green-400">{project.scores.fairnessScore.toFixed(1)}</span></span>
                </div>
                <span className="text-white/30">→</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop Table View */}
      <div className="hidden sm:block overflow-auto max-h-[65vh]">
      <table className="w-full">
        <thead className="sticky top-0 bg-black z-10">
          <tr className="border-b border-white/10">
            <th
              className="text-center py-3 px-2 sm:px-4 text-sm font-medium text-white/50 w-10 sm:w-12 cursor-pointer hover:text-white/70"
              onClick={() => toggleSort('rank')}
            >
              #<SortIcon field="rank" />
            </th>
            <th
              className="text-left py-3 px-2 sm:px-4 text-sm font-medium text-white/50 cursor-pointer hover:text-white/70"
              onClick={() => toggleSort('name')}
            >
              Project<SortIcon field="name" />
            </th>
            <th className="text-center py-3 px-2 sm:px-4 text-sm font-medium text-white/50">
              Category
            </th>
            <th className="hidden md:table-cell text-center py-3 px-4 text-sm font-medium text-white/50">
              Consensus
            </th>
            <th
              className="text-center py-3 px-2 sm:px-4 text-sm font-medium text-white/50 cursor-pointer hover:text-white/70"
              onClick={() => toggleSort('total')}
              title="Weighted Score: Chain 40% + Control 40% + Fairness 20%"
            >
              Total<SortIcon field="total" />
            </th>
            <th
              className="hidden lg:table-cell text-center py-3 px-4 text-sm font-medium text-blue-400/70 cursor-pointer hover:text-blue-300"
              onClick={() => toggleSort('chain')}
              title="Technical Decentralization (40%): Nakamoto Coefficient, Stake Concentration, Client Diversity, Infrastructure"
            >
              Chain<SortIcon field="chain" />
            </th>
            <th
              className="hidden lg:table-cell text-center py-3 px-4 text-sm font-medium text-purple-400/70 cursor-pointer hover:text-purple-300"
              onClick={() => toggleSort('control')}
              title="Governance Decentralization (40%): Org Influence, Code Control, Brand, Treasury, Kill-Switch"
            >
              Control<SortIcon field="control" />
            </th>
            <th
              className="hidden lg:table-cell text-center py-3 px-4 text-sm font-medium text-green-400/70 cursor-pointer hover:text-green-300"
              onClick={() => toggleSort('fairness')}
              title="Token Distribution Fairness (20%): Insider Allocation, Governance Accessibility"
            >
              Fairness<SortIcon field="fairness" />
            </th>
            <th className="w-6 sm:w-8"></th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedProjects.map((project) => {
            const consensus = CONSENSUS_LABELS[project.consensusType];
            const category = CATEGORY_LABELS[project.category];
            const globalRank = globalRanks.get(project.id) || 0;
            const isFirst = globalRank === 1;
            return (
            <tr
              key={project.id}
              onClick={() => router.push(`/projects/${project.id}`)}
              className={`border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer group ${
                isFirst ? 'bg-yellow-500/5 shadow-[inset_0_0_20px_rgba(234,179,8,0.1)]' : ''
              }`}
            >
              <td className="py-3 sm:py-4 px-2 sm:px-4 text-center">
                <span className={`font-mono ${isFirst ? 'text-yellow-400 font-bold' : 'text-white/40'}`}>
                  {globalRank}
                </span>
              </td>
              <td className="py-3 sm:py-4 px-2 sm:px-4">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="font-medium text-white text-sm sm:text-base">{project.name}</span>
                  {project.symbol && (
                    <span className="text-xs sm:text-sm text-white/40 hidden sm:inline">{project.symbol}</span>
                  )}
                  {project.scores.killSwitchActive && (
                    <span className="text-red-500 text-xs" title="Kill-Switch Active - Score capped at 2.0">⚠️</span>
                  )}
                </div>
              </td>
              <td className="py-3 sm:py-4 px-2 sm:px-4 text-center">
                <span className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs font-medium ${category.color}`}>
                  {category.label}
                </span>
              </td>
              <td className="hidden md:table-cell py-4 px-4 text-center">
                <span className={`px-2 py-1 rounded text-xs font-medium ${consensus.color}`}>
                  {consensus.label}
                </span>
              </td>
              <td className="py-3 sm:py-4 px-2 sm:px-4 text-center">
                <span
                  className={`font-bold cursor-help text-sm sm:text-base ${getScoreTextColor(project.scores.totalScore)}`}
                  title={`${project.scores.chainScore.toFixed(1)}×40% + ${project.scores.controlScore.toFixed(1)}×40% + ${project.scores.fairnessScore.toFixed(1)}×20%${project.scores.killSwitchActive ? ' (capped at 2.0)' : ''}`}
                >
                  {project.scores.totalScore.toFixed(1)}
                </span>
              </td>
              <td className="hidden lg:table-cell py-4 px-4 text-center">
                <span
                  className="text-white/70 cursor-help"
                  title="Validators, Stake Distribution, Client Diversity, Infrastructure"
                >
                  {project.scores.chainScore.toFixed(1)}
                </span>
              </td>
              <td className="hidden lg:table-cell py-4 px-4 text-center">
                <span
                  className="text-white/70 cursor-help"
                  title="Org Influence, Code Control, Brand, Treasury, Kill-Switch"
                >
                  {project.scores.controlScore.toFixed(1)}
                </span>
              </td>
              <td className="hidden lg:table-cell py-4 px-4 text-center">
                <span
                  className="text-white/70 cursor-help"
                  title="Insider Allocation, Governance Access"
                >
                  {project.scores.fairnessScore.toFixed(1)}
                </span>
              </td>
              <td className="py-3 sm:py-4 px-1 sm:px-2 text-center">
                <span className="text-white/30 group-hover:text-white/60 transition-colors">
                  →
                </span>
              </td>
            </tr>
            );
          })}
        </tbody>
      </table>
      </div>
    </div>
  );
}
