/**
 * NotSoDeFi.com Framework v0.1
 *
 * A framework for measuring blockchain and protocol decentralization.
 *
 * Three Score Categories:
 * - Chain Score (0-10): Technical/economic decentralization
 * - Control Score (0-10): Power and control structures
 * - Fairness Score (0-10): Launch/distribution/governance fairness
 *
 * Total Score = 0.4 * Chain + 0.4 * Control + 0.2 * Fairness
 */

// Types
export type {
  Criterion,
  CriterionScore,
  Project,
  ProjectScores,
  ScoreMapping,
  Category,
  ConsensusType,
  ProjectCategory,
} from './types';

export { SCORE_WEIGHTS, CATEGORIES } from './types';

// Criteria
export { chainCriteria, controlCriteria, fairnessCriteria } from './criteria';

// Scoring functions
export {
  getScoreFromMapping,
  calculateCategoryScore,
  calculateTotalScore,
  calculateProjectScores,
  getAllCriteria,
  getCriteriaByCategory,
  getCriterionById,
} from './scoring';
