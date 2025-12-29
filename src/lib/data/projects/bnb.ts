/**
 * BNB Chain (BNB) - Decentralization Assessment
 *
 * Formerly Binance Smart Chain (BSC), launched in 2020.
 * Proof of Staked Authority (PoSA) with 21 validators.
 * Controlled by Binance exchange.
 */

import { Project } from '@/lib/framework';
import { calculateProjectScores } from '@/lib/framework';

// Raw assessment values (null = N/A, not applicable)
const rawValues: Record<string, number | null> = {
  // Chain Score (A1-A4)
  A1: 21,   // Fixed 21 validators - extremely low Nakamoto coefficient
  A2: 90,   // Top validators heavily concentrated, Binance-affiliated
  A3: 1,    // Only one official client
  A4: 85,   // Most validators run in datacenter/cloud

  // Control Score (B1-B6)
  B1: 1,    // Binance has near-total control
  B2: 2,    // Development controlled by Binance
  B3: 1,    // Binance owns brand completely
  B4: 1,    // Binance controls protocol upgrades
  B5: 0,    // KILL-SWITCH: Binance can halt/freeze chain unilaterally
  B6: 5,   // Centralized control, frequent upgrades at Binance's discretion

  // Fairness Score (C1-C2)
  C1: 50,   // BNB was ICO token, Binance holds large supply
  C2: 1,   // Governance controlled by Binance
};

export const bnb: Project = {
  id: 'bnb',
  name: 'BNB Chain',
  symbol: 'BNB',
  category: 'L1',
  consensusType: 'dpos',
  website: 'https://www.bnbchain.org',
  description:
    'Proof of Staked Authority blockchain. Controlled by Binance exchange. Kill switch active.',
  scores: calculateProjectScores(rawValues),
  lastUpdated: '2025-12-23',
  sources: [
    'https://www.bnbchain.org/en/staking',
    'https://bscscan.com/validators',
    'https://docs.bnbchain.org/bnb-smart-chain/validator/',
  ],
};
