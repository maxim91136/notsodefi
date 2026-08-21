/**
 * NotSoDeFi.com Framework v0.1 - Core Types
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
  /** Unique identifier (A1, B1, C1, etc.) */
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
  /** Raw input value (null = N/A, not applicable) */
  rawValue: number | string | null;
  /** Calculated score (0-10), null if N/A */
  score: number | null;
  /** Optional notes/explanation */
  notes?: string;
}

// ============================================================================
// Project Types
// ============================================================================

/** Consensus mechanism type */
export type ConsensusType = 'pow' | 'pos' | 'npos' | 'dpos' | 'hybrid' | 'federated';

/** Project category type */
export type ProjectCategory = 'L1' | 'L2' | 'DEX' | 'Lending' | 'Oracle' | 'Stablecoin' | 'Infrastructure';

export interface ProjectScores {
  /** Chain Score (0-10) - technical/economic decentralization */
  chainScore: number;
  /** Control Score (0-10) - power/control structures */
  controlScore: number;
  /** Fairness Score (0-10) - launch/distribution/governance */
  fairnessScore: number;
  /** Total Score = 0.4*Chain + 0.4*Control + 0.2*Fairness */
  totalScore: number;
  /** Uncapped total score (before kill-switch cap) - used for sorting */
  uncappedScore: number;
  /** Individual criterion scores */
  criterionScores: CriterionScore[];
  /** Kill-Switch Veto: true if B5 < threshold, capping totalScore */
  killSwitchActive?: boolean;
}

export interface Project {
  /** Unique identifier (slug) */
  id: string;
  /** Project name */
  name: string;
  /** Token symbol */
  symbol?: string;
  /** Project category */
  category: ProjectCategory;
  /** Consensus mechanism */
  consensusType: ConsensusType;
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
  /** Additional notes/caveats */
  notes?: string[];
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
