/**
 * NotSoDeFi.com Framework v0.1 - Scoring Logic
 *
 * Core functions for calculating decentralization scores.
 */

import {
  Criterion,
  CriterionScore,
  ProjectScores,
  ScoreMapping,
  SCORE_WEIGHTS,
} from './types';
import { chainCriteria } from './criteria/chain';
import { controlCriteria } from './criteria/control';
import { fairnessCriteria } from './criteria/fairness';

// ============================================================================
// Score Calculation
// ============================================================================

/**
 * Get score from a value using criterion mappings.
 * Interpolates within score ranges.
 */
export function getScoreFromMapping(
  value: number,
  mappings: ScoreMapping[]
): number {
  // Sort mappings by min value (ascending)
  const sorted = [...mappings].sort((a, b) => a.min - b.min);

  for (const mapping of sorted) {
    if (value >= mapping.min && value < mapping.max) {
      if (Array.isArray(mapping.score)) {
        // Interpolate within the range
        const range = mapping.max - mapping.min;
        const position = range > 0 ? (value - mapping.min) / range : 0;
        return mapping.score[0] + position * (mapping.score[1] - mapping.score[0]);
      }
      return mapping.score;
    }
  }

  // Handle edge cases: check if value equals max of last mapping
  const last = sorted[sorted.length - 1];
  if (last && value >= last.max) {
    return Array.isArray(last.score) ? last.score[1] : last.score;
  }

  return 0;
}

/**
 * Calculate average score from a set of criterion scores.
 */
export function calculateCategoryScore(
  criteria: Criterion[],
  scores: Record<string, number>
): number {
  const validScores = criteria
    .map((c) => scores[c.id])
    .filter((s): s is number => s !== undefined && s !== null);

  if (validScores.length === 0) return 0;
  return validScores.reduce((sum, s) => sum + s, 0) / validScores.length;
}

/**
 * Calculate total score using weighted formula.
 * TotalScore = 0.4 * Chain + 0.4 * Control + 0.2 * Fairness
 */
export function calculateTotalScore(
  chainScore: number,
  controlScore: number,
  fairnessScore: number
): number {
  return (
    SCORE_WEIGHTS.chain * chainScore +
    SCORE_WEIGHTS.control * controlScore +
    SCORE_WEIGHTS.fairness * fairnessScore
  );
}

// ============================================================================
// Kill-Switch Veto
// ============================================================================

/**
 * Kill-Switch Veto: If B5 (Admin Halt Capability) score is below threshold,
 * the total score is capped. This penalizes chains where a single entity
 * can halt, freeze, or censor the chain unilaterally.
 */
const KILL_SWITCH_THRESHOLD = 1; // B5 score of 0 = single entity can halt
const KILL_SWITCH_CAP = 1.0; // Harsh penalty: kill-switch = fundamentally centralized

/**
 * Calculate all scores for a project from raw criterion values.
 * Values can be null to indicate N/A (not applicable).
 */
export function calculateProjectScores(
  rawValues: Record<string, number | null>
): ProjectScores {
  const criterionScores: CriterionScore[] = [];
  const scores: Record<string, number> = {};

  // Process all criteria
  const allCriteria = [...chainCriteria, ...controlCriteria, ...fairnessCriteria];

  for (const criterion of allCriteria) {
    const rawValue = rawValues[criterion.id];

    // Handle N/A values (null)
    if (rawValue === null) {
      criterionScores.push({
        criterionId: criterion.id,
        rawValue: null,
        score: null,
        notes: 'N/A - Not applicable',
      });
      continue;
    }

    if (rawValue !== undefined) {
      const score = getScoreFromMapping(rawValue, criterion.mappings);
      scores[criterion.id] = score;
      criterionScores.push({
        criterionId: criterion.id,
        rawValue,
        score: Math.round(score * 10) / 10, // Round to 1 decimal
      });
    }
  }

  // Calculate category scores (N/A values are automatically ignored)
  const chainScore = calculateCategoryScore(chainCriteria, scores);
  const controlScore = calculateCategoryScore(controlCriteria, scores);
  const fairnessScore = calculateCategoryScore(fairnessCriteria, scores);
  const uncappedScore = calculateTotalScore(chainScore, controlScore, fairnessScore);
  let totalScore = uncappedScore;

  // Kill-Switch Veto: If B5 score < threshold, cap total score
  // Chains where single entity can halt/freeze can't score high regardless of other metrics
  const b5Score = scores['B5'];
  const killSwitchActive = b5Score !== undefined && b5Score < KILL_SWITCH_THRESHOLD;
  if (killSwitchActive) {
    totalScore = Math.min(totalScore, KILL_SWITCH_CAP);
  }

  return {
    chainScore: Math.round(chainScore * 10) / 10,
    controlScore: Math.round(controlScore * 10) / 10,
    fairnessScore: Math.round(fairnessScore * 10) / 10,
    totalScore: Math.round(totalScore * 10) / 10,
    uncappedScore: Math.round(uncappedScore * 10) / 10,
    criterionScores,
    killSwitchActive,
  };
}

// ============================================================================
// Criterion Lookup
// ============================================================================

/** Get all criteria */
export function getAllCriteria(): Criterion[] {
  return [...chainCriteria, ...controlCriteria, ...fairnessCriteria];
}

/** Get criteria by category */
export function getCriteriaByCategory(
  category: 'chain' | 'control' | 'fairness'
): Criterion[] {
  switch (category) {
    case 'chain':
      return chainCriteria;
    case 'control':
      return controlCriteria;
    case 'fairness':
      return fairnessCriteria;
  }
}

/** Get single criterion by ID */
export function getCriterionById(id: string): Criterion | undefined {
  return getAllCriteria().find((c) => c.id === id);
}
