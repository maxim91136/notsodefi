/**
 * Bitcoin Cash (BCH) - Decentralization Assessment
 *
 * Bitcoin fork launched in 2017 during the block size war.
 * Proof of Work (SHA-256), inherited Bitcoin's fair launch.
 * No additional premine, community-driven after Roger Ver era.
 */

import { Project } from '@/lib/framework';
import { calculateProjectScores } from '@/lib/framework';

// Raw assessment values (null = N/A, not applicable)
const rawValues: Record<string, number | null> = {
  // Chain Score (A1-A4)
  A1: 2,    // Nakamoto coefficient ~2 (ViaBTC alone has 37%)
  A2: 49,   // Top 5 pools: ViaBTC 37%, Antpool 5%, F2Pool 3%, Molepool 2%, Binance 1%
  A3: 2,    // BCHN dominant, but Bitcoin Unlimited and others exist
  A4: 50,   // Estimated cloud/datacenter percentage

  // Control Score (B1-B6)
  B1: 7,    // No corporate owner now, Roger Ver era ended, community-driven
  B2: 7,    // BCHN is main client, diverse contributors
  B3: 7,    // No clear brand owner after BCH/BSV/eCash splits
  B4: null, // N/A - No protocol treasury
  B5: 10,   // No halt capability - truly unstoppable PoW chain
  B6: 3,   // BCH/BSV/eCash splits, block size changes, but PoW unchanged

  // Fairness Score (C1-C2)
  C1: 0,    // 0% premine - inherited Bitcoin's fair launch
  C2: null, // N/A - No on-chain governance
};

export const bitcoincash: Project = {
  id: 'bitcoincash',
  name: 'Bitcoin Cash',
  symbol: 'BCH',
  category: 'L1',
  consensusType: 'pow',
  website: 'https://bitcoincash.org',
  description:
    'Bitcoin fork focused on larger blocks. SHA-256 PoW, inherited fair launch. High mining concentration (ViaBTC 37%).',
  scores: calculateProjectScores(rawValues),
  lastUpdated: '2025-12-24',
  sources: [
    'https://poolbay.io/crypto/11/bitcoin-cash',
    'https://blockchair.com/bitcoin-cash',
    'https://bitcoincash.org',
  ],
};
