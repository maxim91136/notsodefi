/**
 * Polygon PoS - Decentralization Assessment
 *
 * Plasma-based SIDECHAIN, not a true rollup. Originally Matic Network (2017).
 * Security depends on Polygon validators, NOT Ethereum L1.
 * Only checkpoints (merkle roots) posted to Ethereum - no fraud proofs.
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
  // Chain Score (A1-A5) - from Polygon Staking API
  A1: 4,    // Nakamoto Coefficient = 4 (API) - only 4 validators for 33%
  A2: 40,   // Top 5 validators control ~40% (API)
  A3: 1,    // Single client (Heimdall/Bor)
  A4: 75,   // Estimated ~75% cloud infrastructure
  A5: 104,  // 104 active validators (max 105 hardcoded)

  // Control Score (B1-B6)
  B1: 4,    // Polygon Labs very influential, Foundation controls ecosystem
  B2: 3,    // Open source but Polygon Labs controls all core development
  B3: 3,    // polygon.technology - Labs controls brand entirely
  B4: 5,    // Foundation treasury, some transparency
  B5: 2,    // Multiple halts (2022: 11h, 2024: 1h+10h). NC=4, max 105 validators.
  B6: 5,   // Multiple pivots (Matic→Polygon, MATIC→POL, PoS→zkEVM focus)

  // Fairness Score (C1-C3)
  C1: 24,   // ~24% to insiders (16% team + 4% advisors + ~4% seed/early)
  C2: 24,   // Token concentration: ~24% held by team/advisors/early
  C3: 100,  // Governance: Limited token governance. Foundation-driven decisions.
};

export const polygon: Project = {
  id: 'polygon',
  name: 'Polygon',
  symbol: 'POL',
  category: 'L2',
  consensusType: 'pos',
  website: 'https://polygon.technology',
  description:
    'Plasma-based sidechain with own validator set. Not a rollup - security depends on Polygon validators, not Ethereum. Capped at 105 validators.',
  scores: calculateProjectScores(rawValues),
  lastUpdated: '2025-12-29',
  sources: [
    'https://staking-api.polygon.technology/api/v2/validators',
    'https://cryptorank.io/ico/matic-network',
    'https://polygon.technology/blog/polygon-2-0-tokenomics',
    'https://www.tokenomist.ai/matic-network',
  ],
};
