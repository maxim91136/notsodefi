/**
 * Aptos - Decentralization Assessment
 *
 * Move-based L1, launched October 2022. Ex-Meta Diem team.
 *
 * Data from Aptos REST API (daily fetch):
 * - 136 active validators
 * - Nakamoto Coefficient: 18
 * - Top 5 stake: 12%, Top 10 stake: 22%
 * - 850M APT staked
 *
 * Token distribution (at launch):
 * - 51% Community (but Foundation controls most)
 * - 19% Core contributors
 * - 16.5% Foundation
 * - 13.5% Investors (a16z, Tiger Global, etc.)
 * - Total insiders at launch: ~49%
 *
 * No kill-switch capability, but Aptos Foundation has significant influence.
 */

import { Project } from '@/lib/framework';
import { calculateProjectScores } from '@/lib/framework';

// Raw assessment values (null = N/A, not applicable)
const rawValues: Record<string, number | null> = {
  // Chain Score (A1-A5) - from Aptos API
  A1: 18,   // Nakamoto Coefficient = 18 (API)
  A2: 12,   // Top 5 validators control 12% (API)
  A3: 1,    // Single client (aptos-core), Move/Rust
  A4: 70,   // Estimated ~70% cloud infrastructure
  A5: 136,  // 136 active validators (Aptos Explorer)

  // Control Score (B1-B6)
  B1: 4,    // Aptos Labs/Foundation very influential
  B2: 2,    // Open source but Aptos Labs controls all core development - highly concentrated
  B3: 3,    // aptos.dev, aptoslabs.com - Labs controls brand
  B4: 4,    // Foundation treasury, limited transparency
  B5: 3,    // Coordinated validator set, Foundation/Labs can coordinate halt
  B6: 6,   // Brand new (2022), ex-Meta team, rapid development cycle

  // Fairness Score (C1-C3)
  C1: 49,   // ~49% to insiders (team 19% + foundation 16.5% + investors 13.5%)
  C2: 49,   // Token concentration: ~49% held by team/foundation/investors
  C3: 100,  // Governance: Limited token governance. Foundation-driven decisions.
};

export const aptos: Project = {
  id: 'aptos',
  name: 'Aptos',
  symbol: 'APT',
  category: 'L1',
  consensusType: 'pos',
  website: 'https://aptosfoundation.org',
  description:
    'Move-based L1 from ex-Meta Diem team. PoS consensus. No kill switch. Foundation-controlled development.',
  scores: calculateProjectScores(rawValues),
  lastUpdated: '2025-12-26',
  sources: [
    'https://api.mainnet.aptoslabs.com/v1',
    'https://aptosfoundation.org/currents/aptos-tokenomics-overview',
    'https://tokenomist.ai/aptos',
    'https://cryptorank.io/ico/aptos',
  ],
};
