/**
 * Injective - Decentralization Assessment
 *
 * Cosmos SDK chain focused on DeFi. Tendermint consensus.
 * Incubated by Binance, backed by Jump Crypto, Pantera, Mark Cuban.
 *
 * Data from Injective LCD API (daily fetch):
 * - 50 active validators
 * - Nakamoto Coefficient: 5
 * - Top 5 stake: ~34%, Top 10 stake: ~51%
 * - 56.7M INJ staked
 *
 * Token distribution:
 * - 36% Ecosystem Development
 * - 20% Team/Founders
 * - 20%+ Private Investors (Jump, Pantera, etc.)
 * - 2% Advisors
 * - Total insiders: ~42%
 *
 * No kill-switch, but only 50 validators and heavy VC backing.
 */

import { Project } from '@/lib/framework';
import { calculateProjectScores } from '@/lib/framework';

// Raw assessment values (null = N/A, not applicable)
const rawValues: Record<string, number | null> = {
  // Chain Score (A1-A5) - from Injective LCD API
  A1: 5,    // Nakamoto Coefficient = 5 (API)
  A2: 34,   // Top 5 validators control ~34% (API)
  A3: 1,    // Single client (injective-chain), Cosmos SDK
  A4: 70,   // Estimated ~70% cloud infrastructure
  A5: 50,   // 50 active validators (Injective LCD API)

  // Control Score (B1-B6)
  B1: 4,    // Injective Labs very influential, VC-backed
  B2: 3,    // Open source but Injective Labs controls all core development
  B3: 4,    // injective.com - Labs controls brand
  B4: 5,    // Foundation treasury, some transparency
  B5: 3,    // Only 50 validators, VC-coordinated, de facto halt capability
  B6: 4,   // Cosmos SDK upgrades, IBC integrations, Labs-driven development

  // Fairness Score (C1-C3)
  C1: 42,   // ~42% to insiders (20% team + 20% private + 2% advisors)
  C2: 42,   // Token concentration: ~42% held by team/investors/advisors
  C3: 45,   // Governance: Cosmos-style voting exists, but insiders dominate
};

export const injective: Project = {
  id: 'injective',
  name: 'Injective',
  symbol: 'INJ',
  category: 'L1',
  consensusType: 'pos',
  website: 'https://injective.com',
  description:
    'Cosmos SDK DeFi chain with Tendermint consensus. Backed by Binance, Jump, Pantera. No kill switch.',
  scores: calculateProjectScores(rawValues),
  lastUpdated: '2025-12-27',
  sources: [
    'https://sentry.lcd.injective.network',
    'https://cryptorank.io/ico/injective-protocol',
    'https://injective.com/INJ_Tokenomics_Paper.pdf',
  ],
};
