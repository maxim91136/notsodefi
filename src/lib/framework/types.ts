/**
 * NotSoDeFi Framework v0.1 - Core Types
 *
 * Defines the data structures for the decentralization scoring framework.
 */

// ============================================================================
// Score Types
// ============================================================================

export interface ScoreMapping {
  /** Minimum value (inclusive) */
  min: number;
  /** Maximum value (exclusive) */
  max: number;
  /** Score or score range [min, max] */
  score: number | [number, number];
  /** Human-readable label */
  label: string;
}

export interface Criterion {
  /** Unique identifier (A1, B5, C9, etc.) */
  id: string;
  /** Display name */
  name: string;
  /** Detailed description */
  description: string;
  /** Which score category this belongs to */
  category: 'chain' | 'control' | 'fairness';
  /** Value-to-score mappings */
  mappings: ScoreMapping[];
  /** Reference sources */
  sources?: string[];
}

export interface CriterionScore {
  /** Reference to criterion ID */
  criterionId: string;
  /** Raw input value */
  rawValue: number | string;
  /** Calculated score (0-10) */
  score: number;
  /** Optional notes/explanation */
  notes?: string;
}

// ============================================================================
// Project Types
// ============================================================================

export interface ProjectScores {
  /** Chain Score (0-10) - technical/economic decentralization */
  chainScore: number;
  /** Control Score (0-10) - power/control structures */
  controlScore: number;
  /** Fairness Score (0-10) - launch/distribution/governance */
  fairnessScore: number;
  /** Total Score = 0.4*Chain + 0.4*Control + 0.2*Fairness */
  totalScore: number;
  /** Individual criterion scores */
  criterionScores: CriterionScore[];
}

export interface Project {
  /** Unique identifier (slug) */
  id: string;
  /** Project name */
  name: string;
  /** Token symbol */
  symbol?: string;
  /** Logo URL or path */
  logo?: string;
  /** Project website */
  website?: string;
  /** Brief description */
  description?: string;
  /** Calculated scores */
  scores: ProjectScores;
  /** ISO date of last update */
  lastUpdated: string;
  /** Data sources */
  sources?: string[];
}

// ============================================================================
// Constants
// ============================================================================

/** Score calculation weights */
export const SCORE_WEIGHTS = {
  chain: 0.4,
  control: 0.4,
  fairness: 0.2,
} as const;

/** Category display info */
export const CATEGORIES = {
  chain: {
    name: 'Chain Score',
    description: 'Technical and economic decentralization of the chain',
    color: 'blue',
  },
  control: {
    name: 'Control Score',
    description: 'Power and control structures around the protocol',
    color: 'purple',
  },
  fairness: {
    name: 'Fairness Score',
    description: 'Launch, distribution, and governance fairness',
    color: 'green',
  },
} as const;

export type Category = keyof typeof CATEGORIES;
