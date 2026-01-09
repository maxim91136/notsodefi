'use client';

import { getScoreHue } from '@/lib/utils';

interface ScoreRingProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  label?: string;
}

const sizes = {
  sm: { width: 60, stroke: 4, fontSize: 'text-sm' },
  md: { width: 80, stroke: 5, fontSize: 'text-lg' },
  lg: { width: 120, stroke: 6, fontSize: 'text-2xl' },
};

export function ScoreRing({
  score,
  size = 'md',
  showLabel = true,
  label,
}: ScoreRingProps) {
  const { width, stroke, fontSize } = sizes[size];
  const radius = (width - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 10) * circumference;
  const hue = getScoreHue(score);

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width, height: width }}>
        <svg
          width={width}
          height={width}
          className="transform -rotate-90"
        >
          {/* Background ring */}
          <circle
            cx={width / 2}
            cy={width / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={stroke}
            className="text-white/10"
          />
          {/* Progress ring */}
          <circle
            cx={width / 2}
            cy={width / 2}
            r={radius}
            fill="none"
            stroke={`hsl(${hue}, 70%, 50%)`}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            className="transition-all duration-500"
          />
        </svg>
        {/* Score text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`font-bold ${fontSize}`} style={{ color: `hsl(${hue}, 70%, 50%)` }}>
            {score.toFixed(1)}
          </span>
        </div>
      </div>
      {showLabel && label && (
        <span className="mt-2 text-sm text-white/60">{label}</span>
      )}
    </div>
  );
}
