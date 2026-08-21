'use client';

import Link from 'next/link';
import { Project } from '@/lib/framework';
import { Card, CardContent, Badge, ScoreRing } from '@/components/ui';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.id}`}>
      <Card className="hover:border-white/20 transition-all cursor-pointer">
        <CardContent>
          <div className="flex items-start gap-4">
            {/* Score Ring */}
            <ScoreRing score={project.scores.totalScore} size="sm" showLabel={false} />

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-white">{project.name}</h3>
                {project.symbol && (
                  <Badge>{project.symbol}</Badge>
                )}
                {project.scores.killSwitchActive && (
                  <span className="text-red-500" title="Kill-Switch Active - Score capped at 1.0">⚠️</span>
                )}
              </div>
              <p className="mt-1 text-sm text-white/50 line-clamp-2">
                {project.description}
              </p>

              {/* Score Pills */}
              <div className="mt-3 flex flex-wrap gap-2">
                <ScorePill label="Chain" score={project.scores.chainScore} />
                <ScorePill label="Control" score={project.scores.controlScore} />
                <ScorePill label="Fairness" score={project.scores.fairnessScore} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function ScorePill({ label, score }: { label: string; score: number }) {
  return (
    <div className="flex items-center gap-1 text-xs">
      <span className="text-white/40">{label}:</span>
      <span className="font-medium text-white/70">{score.toFixed(1)}</span>
    </div>
  );
}
