'use client';

import Link from 'next/link';
import { Project, ConsensusType } from '@/lib/framework';
import { getScoreTextColor } from '@/lib/utils';

interface ProjectTableProps {
  projects: Project[];
}

const CONSENSUS_LABELS: Record<ConsensusType, { label: string; color: string }> = {
  pow: { label: 'PoW', color: 'bg-orange-500/20 text-orange-400' },
  pos: { label: 'PoS', color: 'bg-blue-500/20 text-blue-400' },
  dpos: { label: 'DPoS', color: 'bg-purple-500/20 text-purple-400' },
  hybrid: { label: 'Hybrid', color: 'bg-cyan-500/20 text-cyan-400' },
};

export function ProjectTable({ projects }: ProjectTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/10">
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
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => {
            const consensus = CONSENSUS_LABELS[project.consensusType];
            return (
            <tr
              key={project.id}
              className="border-b border-white/5 hover:bg-white/5 transition-colors"
            >
              <td className="py-4 px-4">
                <Link
                  href={`/projects/${project.id}`}
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <span className="font-medium text-white">{project.name}</span>
                  {project.symbol && (
                    <span className="text-sm text-white/40">{project.symbol}</span>
                  )}
                </Link>
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
            </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
