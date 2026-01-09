/**
 * NEAR Protocol - Decentralization Assessment
 *
 * Sharded PoS blockchain, launched 2020.
 * Nightshade sharding for scalability, stateless validation.
 *
 * Data from NEAR RPC API (daily fetch):
 * - 384 active validators
 * - Nakamoto Coefficient: 10
 * - Top 5 stake: 21%, Top 10 stake: 34%
 * - 585M NEAR staked
 *
 * Token distribution:
 * - ~29% to insiders (team 8.5% + VCs 14.4% + foundation 6%)
 * - No kill-switch capability
 */

import { Project } from '@/lib/framework';
import { calculateProjectScores } from '@/lib/framework';

// Raw assessment values (null = N/A, not applicable)
const rawValues: Record<string, number | null> = {
  // Chain Score (A1-A5) - from NEAR RPC API
  A1: 10,   // Nakamoto Coefficient = 10 (API: validators needed for 33% stake)
  A2: 21,   // Top 5 validators control 21% (API)
  A3: 1,    // Single client (nearcore), Rust implementation
  A4: 65,   // Estimated ~65% cloud infrastructure
  A5: 384,  // 384 active validators (nearblocks.io Jan 2025)

  // Control Score (B1-B6)
  B1: 5,    // NEAR Foundation influential but not dominant
  B2: 3,    // Open source but NEAR Foundation/Pagoda dominates development
  B3: 4,    // near.org, brand controlled by Foundation
  B4: 5,    // Foundation treasury, multisig governance
  B5: 4,    // NC=10 - Foundation + Pagoda can coordinate halt with top validators
  B6: 5,   // New chain (2020), Nightshade sharding upgrades, Phase 2 changes

  // Fairness Score (C1-C3)
  C1: 29,   // ~29% to team (8.5%) + VCs (14.4%) + foundation (6%)
  C2: 29,   // Token concentration: ~29% held by team/VCs/foundation
  C3: 50,   // Governance: Limited on-chain governance. Foundation influence significant.
};

export const near: Project = {
  id: 'near',
  name: 'NEAR Protocol',
  symbol: 'NEAR',
  category: 'L1',
  consensusType: 'pos',
  website: 'https://near.org',
  description:
    'Sharded PoS blockchain with Nightshade consensus. No kill switch. Foundation-led development.',
  scores: calculateProjectScores(rawValues),
  lastUpdated: '2025-12-26',
  sources: [
    'https://rpc.mainnet.near.org',
    'https://nearblocks.io/node-explorer',
    'https://near.org/blog/near-token-supply-and-distribution',
    'https://icodrops.com/near-protocol/',
  ],
};
