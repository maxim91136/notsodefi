/**
 * Cosmos Hub (ATOM) - Decentralization Assessment
 *
 * Launched 2019, developed by Tendermint/All in Bits.
 * Tendermint/CometBFT consensus (BFT PoS).
 * ~200 validators, Nakamoto coefficient ~6-7.
 * ICO 2017: 80% investors, 20% founders/foundation.
 */

import { Project } from '@/lib/framework';
import { calculateProjectScores } from '@/lib/framework';

// Raw assessment values (null = N/A, not applicable)
const rawValues: Record<string, number | null> = {
  // Chain Score (A1-A4)
  A1: 7,    // Nakamoto coefficient ~6-7 (top 22 control 67%+)
  A2: 36,   // Top 5 concentration ~36%
  A3: 2,    // Gaia dominant, limited client diversity
  A4: 60,   // Estimated cloud/datacenter percentage

  // Control Score (B5-B9)
  B5: 5,    // ICF + Tendermint influence, but distributed governance
  B6: 5,    // Multiple contributors, but core team influence
  B7: 4,    // Interchain Foundation owns brand
  B8: 5,    // ICF treasury, governance participation
  B9: 10,   // No halt capability - fully decentralized BFT

  // Fairness Score (C9-C10)
  C9: 20,   // 20% to founders/foundation, 80% ICO investors
  C10: 5,   // On-chain governance but whale concentration
};

export const cosmos: Project = {
  id: 'cosmos',
  name: 'Cosmos Hub',
  symbol: 'ATOM',
  category: 'L1',
  consensusType: 'pos',
  website: 'https://cosmos.network',
  description:
    'BFT PoS hub for IBC ecosystem. ~200 validators, Nakamoto ~6-7. ICO 2017 with 20% founder allocation.',
  scores: calculateProjectScores(rawValues),
  lastUpdated: '2025-12-24',
  sources: [
    'https://www.mintscan.io/cosmos',
    'https://hub.cosmos.network',
    'https://cosmos.network',
  ],
};
