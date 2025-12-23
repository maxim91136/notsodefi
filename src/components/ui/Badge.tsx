import { ReactNode } from 'react';
import { getScoreBgColor, getScoreTextColor, getScoreLabel } from '@/lib/utils';

interface BadgeProps {
  children?: ReactNode;
  score?: number;
  variant?: 'default' | 'score';
  className?: string;
}

export function Badge({
  children,
  score,
  variant = 'default',
  className = '',
}: BadgeProps) {
  if (variant === 'score' && score !== undefined) {
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
          ${getScoreBgColor(score)} ${getScoreTextColor(score)} ${className}`}
      >
        {getScoreLabel(score)}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
        bg-white/10 text-white/70 ${className}`}
    >
      {children}
    </span>
  );
}
