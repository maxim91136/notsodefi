/**
 * Polygon PoS - Decentralization Assessment
 *
 * Ethereum L2/sidechain using PoS consensus. Originally Matic Network (2017).
 * MATIC→POL migration completed September 2024.
 *
 * Data from Polygon Staking API (daily fetch):
 * - 104 active validators (max 105 hardcoded)
 * - Nakamoto Coefficient: 4 (very low)
 * - Top 5 stake: ~40%, Top 10 stake: ~63%
 * - 3.5B POL staked
 *
 * Token distribution:
 * - 23.33% Ecosystem
 * - 21.86% Foundation
 * - 19% Public Sale
 * - 16% Team
 * - 4% Advisors
 * - 3.8% Seed/Early
 * - Total insiders: ~24% (team + advisors + seed/early)
 *
 * No kill-switch, but validator set is capped at 105 and Foundation has significant influence.
 */

import { Project } from '@/lib/framework';
import { calculateProjectScores } from '@/lib/framework';

// Raw assessment values (null = N/A, not applicable)
const rawValues: Record<string, number | null> = {
  // Chain Score (A1-A4) - from Polygon Staking API
  A1: 4,    // Nakamoto Coefficient = 4 (API) - only 4 validators for 33%
  A2: 40,   // Top 5 validators control ~40% (API)
  A3: 1,    // Single client (Heimdall/Bor)
  A4: 75,   // Estimated ~75% cloud infrastructure

  // Control Score (B5-B10)
  B5: 4,    // Polygon Labs very influential, Foundation controls ecosystem
  B6: 6,    // Open source, but Labs-dominated development
  B7: 3,    // polygon.technology - Labs controls brand entirely
  B8: 5,    // Foundation treasury, some transparency
  B9: 6,    // No kill-switch, but 105 max validators is very limiting
  B10: 5,   // Multiple pivots (Matic→Polygon, MATIC→POL, PoS→zkEVM focus)

  // Fairness Score (C9-C10)
  C9: 24,   // ~24% to insiders (16% team + 4% advisors + ~4% seed/early)
  C10: 5,   // Limited governance, Foundation-driven decisions
};

export const polygon: Project = {
  id: 'polygon',
  name: 'Polygon',
  symbol: 'POL',
  category: 'L2',
  consensusType: 'pos',
  website: 'https://polygon.technology',
  description:
    '104 validators (max 105), Nakamoto Coefficient 4. Top 5 stake ~40%. First L2 in framework. ~24% insider allocation.',
  scores: calculateProjectScores(rawValues),
  lastUpdated: '2025-12-27',
  sources: [
    'https://staking-api.polygon.technology/api/v2/validators',
    'https://cryptorank.io/ico/matic-network',
    'https://polygon.technology/blog/polygon-2-0-tokenomics',
    'https://www.tokenomist.ai/matic-network',
  ],
};
