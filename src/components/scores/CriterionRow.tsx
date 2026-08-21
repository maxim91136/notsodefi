'use client';

import { useState } from 'react';
import { Criterion, CriterionScore } from '@/lib/framework';
import { getScoreTextColor, getScoreBgColor } from '@/lib/utils';

interface CriterionRowProps {
  criterion: Criterion;
  score?: CriterionScore;
}

export function CriterionRow({ criterion, score }: CriterionRowProps) {
  const [expanded, setExpanded] = useState(false);
  const isNA = score?.score === null;
  const displayScore = score?.score ?? 0;

  return (
    <div
      className="flex items-start gap-4 p-4 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
      onClick={() => setExpanded(!expanded)}
      title={expanded ? 'Click to collapse' : 'Click to expand description'}
    >
      {/* ID Badge */}
      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
        <span className="text-sm font-mono font-medium text-white/70">
          {criterion.id}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-white">{criterion.name}</h4>
        <p className={`mt-1 text-sm text-white/50 ${expanded ? '' : 'line-clamp-2'}`}>
          {criterion.description}
        </p>
        {!expanded && (
          <span className="text-xs text-white/30 mt-1 inline-block">tap to expand</span>
        )}
      </div>

      {/* Score */}
      {isNA ? (
        <div className="flex-shrink-0 px-3 py-1 rounded-lg bg-white/5">
          <span className="text-lg font-bold text-white/30">N/A</span>
        </div>
      ) : (
        <div
          className={`flex-shrink-0 px-3 py-1 rounded-lg ${getScoreBgColor(displayScore)}`}
        >
          <span className={`text-lg font-bold ${getScoreTextColor(displayScore)}`}>
            {displayScore.toFixed(1)}
          </span>
        </div>
      )}
    </div>
  );
}
