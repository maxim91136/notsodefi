'use client';

import { ProjectScores } from '@/lib/framework';
import { ScoreCard } from './ScoreCard';
import { ScoreRing } from '@/components/ui';

interface ScoreSummaryProps {
  scores: ProjectScores;
}

export function ScoreSummary({ scores }: ScoreSummaryProps) {
  return (
    <div className="space-y-8">
      {/* Total Score */}
      <div className="flex flex-col items-center">
        <ScoreRing score={scores.totalScore} size="lg" label="Total Score" />
        <p className="mt-2 text-sm text-white/50">
          0.4 × Chain + 0.4 × Control + 0.2 × Fairness
        </p>
      </div>

      {/* Category Scores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ScoreCard category="chain" score={scores.chainScore} />
        <ScoreCard category="control" score={scores.controlScore} />
        <ScoreCard category="fairness" score={scores.fairnessScore} />
      </div>
    </div>
  );
}
