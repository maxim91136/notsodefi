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
  // Chain Score (A1-A5)
  A1: 19,   // Nakamoto coefficient 19 (above median for PoS)
  A2: 84,   // 84% staked supply controlled by insiders (Foundation stakes 52% across validators)
  A3: 1,    // Single implementation (Mysten Labs)
  A4: 50,   // Estimated cloud/datacenter percentage
  A5: 126,  // ~126 active validators (suiscan.xyz)

  // Control Score (B1-B6)
  B1: 2,    // Mysten Labs dominates development, Sui Foundation controls treasury
  B2: 2,    // Mysten Labs owns github.com/MystenLabs/sui
  B3: 2,    // Mysten Labs/Foundation controls sui.io
  B4: 3,    // 52% "unallocated" controlled by Foundation, staked for network
  B5: 2,    // Nov 2024: 2h halt (crash loop). 84% insider-staked = de facto kill switch
  B6: 6,   // Brand new (2023), Mysten Labs controlled, rapid iteration

  // Fairness Score (C1-C3)
  C1: 20,   // ~20% direct founders/team (Mysten 1.6% + Early Contributors 6% + unlocks)
  C2: 52,   // Token concentration: 52% "unallocated" but controlled by Foundation
  C3: 84,   // Governance: Token voting exists but 84% of staked supply controlled by insiders
};

export const sui: Project = {
  id: 'sui',
  name: 'Sui',
  symbol: 'SUI',
  category: 'L1',
  consensusType: 'pos',
  website: 'https://sui.io',
  description:
    'Move-based PoS L1 from ex-Meta Diem team. Foundation holds majority of token supply. No public sale.',
  scores: calculateProjectScores(rawValues),
  lastUpdated: '2025-12-26',
  sources: [
    'https://sui.io',
    'https://docs.sui.io/concepts/tokenomics',
    'https://suiscan.xyz/mainnet/validators',
    'https://messari.io/project/sui',
  ],
};
