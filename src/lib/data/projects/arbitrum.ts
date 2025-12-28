/**
 * Arbitrum One - Decentralization Assessment
 *
 * Ethereum L2 using Optimistic Rollup (Nitro). Launched March 2023.
 * Largest L2 by TVL ($16.78B as of Dec 2025).
 *
 * Key characteristics:
 * - Centralized Sequencer (Arbitrum Foundation)
 * - Security Council (9/12 multisig) can upgrade with no delay
 * - BoLD upgrade (2025) enables permissionless validation
 * - Users can force transactions via L1 (up to 24h delay)
 * - Stage 1 on L2Beat (fraud proofs enabled)
 *
 * Token distribution (March 2023):
 * - 42.78% DAO Treasury
 * - 26.94% Team + Future Team/Advisors
 * - 17.53% Investors
 * - 12.75% Airdrop to users
 * - Total insiders: ~44% (team + investors)
 *
 * Sources:
 * - L2Beat: https://l2beat.com/scaling/projects/arbitrum
 * - Arbitrum Docs: https://docs.arbitrum.io
 * - Token: https://docs.arbitrum.foundation/token-supply
 */

import { Project } from '@/lib/framework';
import { calculateProjectScores } from '@/lib/framework';

// Raw assessment values (null = N/A, not applicable)
const rawValues: Record<string, number | null> = {
  // Chain Score (A1-A4)
  A1: 1,    // Nakamoto Coefficient = 1 (single sequencer)
  A2: 100,  // Top 5 concentration = 100% (one sequencer)
  A3: 1,    // Single client (Nitro)
  A4: null, // N/A for L2 (inherits from Ethereum)

  // Control Score (B5-B10)
  B5: 3,    // Offchain Labs dominates development and operations
  B6: 4,    // github.com/OffchainLabs - Labs controls, but open source
  B7: 3,    // arbitrum.io - Foundation/Labs controls brand
  B8: 5,    // Security Council 9/12 multisig, DAO treasury
  B9: 5,    // Security Council can upgrade, but users can exit via L1
  B10: 5,   // L2 with upgrades (Nitro, BoLD), Security Council can change rules

  // Fairness Score (C9-C10)
  C9: 44,   // ~44% to insiders (27% team + 17.5% investors)
  C10: 5,   // DAO governance, but early token concentration
};

export const arbitrum: Project = {
  id: 'arbitrum',
  name: 'Arbitrum',
  symbol: 'ARB',
  category: 'L2',
  consensusType: 'pos',
  website: 'https://arbitrum.io',
  description:
    'Largest L2 by TVL ($16.78B). Centralized sequencer (Foundation). Security Council 9/12 multisig. 44% insider allocation. Stage 1 on L2Beat.',
  scores: calculateProjectScores(rawValues),
  lastUpdated: '2025-12-27',
  sources: [
    'https://l2beat.com/scaling/projects/arbitrum',
    'https://docs.arbitrum.io',
    'https://docs.arbitrum.foundation/token-supply',
    'https://arbiscan.io',
  ],
};
