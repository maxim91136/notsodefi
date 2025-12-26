/**
 * SUI - Decentralization Assessment
 *
 * Move-based L1 by Mysten Labs (ex-Meta Diem team).
 * PoS consensus with ~126 validators, NC 19.
 * High staking requirement (30M SUI minimum).
 *
 * CRITICAL: 52% of supply "unallocated" but controlled by Sui Foundation.
 * Justin Bons claims 84% of staked supply controlled by insiders.
 * No public sale - only private investors and foundation.
 */

import { Project } from '@/lib/framework';
import { calculateProjectScores } from '@/lib/framework';

// Raw assessment values (null = N/A, not applicable)
const rawValues: Record<string, number | null> = {
  // Chain Score (A1-A4)
  A1: 19,   // Nakamoto coefficient 19 (above median for PoS)
  A2: 12,   // Top 5 concentration ~12%
  A3: 1,    // Single implementation (Mysten Labs)
  A4: 50,   // Estimated cloud/datacenter percentage

  // Control Score (B5-B9)
  B5: 2,    // Mysten Labs dominates development, Sui Foundation controls treasury
  B6: 2,    // Mysten Labs owns github.com/MystenLabs/sui
  B7: 2,    // Mysten Labs/Foundation controls sui.io
  B8: 3,    // 52% "unallocated" controlled by Foundation, staked for network
  B9: 6,    // No clear kill switch, but Foundation has significant influence

  // Fairness Score (C9-C10)
  C9: 20,   // ~20% direct founders/team (Mysten 1.6% + Early Contributors 6% + unlocks)
  C10: 3,   // Token voting exists but 84% of staked supply controlled by insiders
};

export const sui: Project = {
  id: 'sui',
  name: 'Sui',
  symbol: 'SUI',
  consensusType: 'pos',
  website: 'https://sui.io',
  description:
    'PoS L1 with NC 19, 126 validators. 52% of supply controlled by Foundation. No public sale, insiders dominate.',
  scores: calculateProjectScores(rawValues),
  lastUpdated: '2025-12-26',
  sources: [
    'https://sui.io',
    'https://docs.sui.io/concepts/tokenomics',
    'https://suiscan.xyz/mainnet/validators',
    'https://messari.io/project/sui',
  ],
};
