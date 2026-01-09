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
  // Chain Score (A1-A5)
  A1: 7,    // Nakamoto coefficient ~6-7 (top 22 control 67%+)
  A2: 36,   // Top 5 concentration ~36%
  A3: 2,    // Gaia dominant, limited client diversity
  A4: 60,   // Estimated cloud/datacenter percentage
  A5: 180,  // 180 active validators (Cosmos Hub active set limit)

  // Control Score (B1-B6)
  B1: 3,    // Cosmos Labs (2025) = centralized engineering under ICF, sunsetting stewardship system
  B2: 2,    // Cosmos Labs now central development team for Cosmos Hub and stack
  B3: 4,    // Interchain Foundation owns brand
  B4: 5,    // ICF treasury, governance participation
  B5: 3,    // Cosmos Labs has de facto control via governance, coordinated validators
  B6: 4,   // IBC upgrades, Tendermint→CometBFT transition, frequent SDK updates

  // Fairness Score (C1-C3)
  C1: 15,   // ~15% to founders/foundation, 80% ICO investors
  C2: 15,   // Token concentration: ICF + Tendermint hold ~10-15%
  C3: 70,   // Governance: On-chain voting exists but Cosmos Labs dominates direction. "Excessive centralization" per validators.
};

export const cosmos: Project = {
  id: 'cosmos',
  name: 'Cosmos Hub',
  symbol: 'ATOM',
  category: 'L1',
  consensusType: 'pos',
  website: 'https://cosmos.network',
  description:
    'BFT PoS hub for IBC ecosystem. Cosmos Labs (2025) centralized engineering. On-chain governance with concentrated voting power.',
  scores: calculateProjectScores(rawValues),
  lastUpdated: '2025-12-24',
  sources: [
    'https://www.mintscan.io/cosmos',
    'https://hub.cosmos.network',
    'https://cosmos.network',
  ],
};
