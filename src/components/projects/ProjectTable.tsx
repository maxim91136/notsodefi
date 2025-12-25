'use client';

import { useRouter } from 'next/navigation';
import { Project, ConsensusType } from '@/lib/framework';
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

export function ProjectTable({ projects }: ProjectTableProps) {
  const router = useRouter();

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-center py-3 px-4 text-sm font-medium text-white/50 w-12">
              #
            </th>
            <th className="text-left py-3 px-4 text-sm font-medium text-white/50">
              Project
            </th>
            <th className="text-center py-3 px-4 text-sm font-medium text-white/50">
              Consensus
            </th>
            <th className="text-center py-3 px-4 text-sm font-medium text-white/50">
              Total
            </th>
            <th className="text-center py-3 px-4 text-sm font-medium text-blue-400/70">
              Chain
            </th>
            <th className="text-center py-3 px-4 text-sm font-medium text-purple-400/70">
              Control
            </th>
            <th className="text-center py-3 px-4 text-sm font-medium text-green-400/70">
              Fairness
            </th>
            <th className="w-8"></th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, index) => {
            const consensus = CONSENSUS_LABELS[project.consensusType];
            const isFirst = index === 0;
            return (
            <tr
              key={project.id}
              onClick={() => router.push(`/projects/${project.id}`)}
              className={`border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer group ${
                isFirst ? 'bg-yellow-500/5 shadow-[inset_0_0_20px_rgba(234,179,8,0.1)]' : ''
              }`}
            >
              <td className="py-4 px-4 text-center">
                <span className={`font-mono ${isFirst ? 'text-yellow-400 font-bold' : 'text-white/40'}`}>
                  {index + 1}
                </span>
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-white">{project.name}</span>
                  {project.symbol && (
                    <span className="text-sm text-white/40">{project.symbol}</span>
                  )}
                  {project.scores.killSwitchActive && (
                    <span className="text-red-500" title="Kill-Switch Active - Score capped at 2.0">⚠️</span>
                  )}
                </div>
              </td>
              <td className="py-4 px-4 text-center">
                <span className={`px-2 py-1 rounded text-xs font-medium ${consensus.color}`}>
                  {consensus.label}
                </span>
              </td>
              <td className="py-4 px-4 text-center">
                <span
                  className={`font-bold ${getScoreTextColor(project.scores.totalScore)}`}
                >
                  {project.scores.totalScore.toFixed(1)}
                </span>
              </td>
              <td className="py-4 px-4 text-center">
                <span className="text-white/70">
                  {project.scores.chainScore.toFixed(1)}
                </span>
              </td>
              <td className="py-4 px-4 text-center">
                <span className="text-white/70">
                  {project.scores.controlScore.toFixed(1)}
                </span>
              </td>
              <td className="py-4 px-4 text-center">
                <span className="text-white/70">
                  {project.scores.fairnessScore.toFixed(1)}
                </span>
              </td>
              <td className="py-4 px-2 text-center">
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
  );
}
