/**
 * Score Color Utilities
 *
 * Color mappings for score visualization.
 */

export type ScoreLevel = 'excellent' | 'good' | 'moderate' | 'concerning' | 'critical';

export function getScoreLevel(score: number): ScoreLevel {
  if (score >= 8) return 'excellent';
  if (score >= 6) return 'good';
  if (score >= 4) return 'moderate';
  if (score >= 2) return 'concerning';
  return 'critical';
}

export function getScoreLabel(score: number): string {
  const level = getScoreLevel(score);
  const labels: Record<ScoreLevel, string> = {
    excellent: 'Excellent',
    good: 'Good',
    moderate: 'Moderate',
    concerning: 'Concerning',
    critical: 'Critical',
  };
  return labels[level];
}

/** Tailwind text color class */
export function getScoreTextColor(score: number): string {
  const level = getScoreLevel(score);
  const colors: Record<ScoreLevel, string> = {
    excellent: 'text-emerald-500',
    good: 'text-lime-500',
    moderate: 'text-yellow-500',
    concerning: 'text-orange-500',
    critical: 'text-red-500',
  };
  return colors[level];
}

/** Tailwind background color class */
export function getScoreBgColor(score: number): string {
  const level = getScoreLevel(score);
  const colors: Record<ScoreLevel, string> = {
    excellent: 'bg-emerald-500/10',
    good: 'bg-lime-500/10',
    moderate: 'bg-yellow-500/10',
    concerning: 'bg-orange-500/10',
    critical: 'bg-red-500/10',
  };
  return colors[level];
}

/** Tailwind border color class */
export function getScoreBorderColor(score: number): string {
  const level = getScoreLevel(score);
  const colors: Record<ScoreLevel, string> = {
    excellent: 'border-emerald-500/30',
    good: 'border-lime-500/30',
    moderate: 'border-yellow-500/30',
    concerning: 'border-orange-500/30',
    critical: 'border-red-500/30',
  };
  return colors[level];
}

/** Ring gradient for SVG (hue: 0=red to 120=green) */
export function getScoreHue(score: number): number {
  // Map 0-10 to 0-120 (red to green)
  return Math.round((score / 10) * 120);
}
