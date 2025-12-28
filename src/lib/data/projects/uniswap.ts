/**
 * Uniswap (UNI) - Decentralization Assessment
 *
 * The #1 DEX with a unique split personality: Core contracts are IMMUTABLE
 * (no admin keys, no kill switch, no pause - truly trustless), but governance
 * is extremely plutocratic (Gini 0.938, top 1% = 47.5% voting power).
 *
 * UNIfication (Dec 2024): Shifted control from Foundation to Labs.
 * 100M UNI burn approved. Fee switch finally activated after years.
 *
 * Token distribution: 60% community (mostly airdropped), 21.3% team (4yr vesting),
 * 18% investors. Fully unlocked since 2024.
 */

import { Project } from '@/lib/framework';
import { calculateProjectScores } from '@/lib/framework';

// Raw assessment values (null = N/A, not applicable)
const rawValues: Record<string, number | null> = {
  // Chain Score (A1-A4) - Adapted for DeFi governance
  A1: 5,    // Nakamoto coefficient for governance: ~5-6 large delegates needed for quorum
  A2: 48,   // Top 5 delegates control ~48% of voting power
  A3: 1,    // Single protocol implementation (Uniswap Labs)
  A4: 50,   // Multi-chain deployment but same governance

  // Control Score (B5-B10)
  B5: 2,    // Uniswap Labs dominates roadmap and development
  B6: 2,    // Labs owns github.com/Uniswap, controls all repositories
  B7: 2,    // Labs owns uniswap.org, controls frontend and brand
  B8: 6,    // DAO treasury exists, Labs manages implementation
  B9: 10,   // IMMUTABLE CONTRACTS - no admin keys, no kill switch, no pause function!
  B10: 3,   // v1→v2→v3→v4 are NEW deployments, not upgrades. Core contracts immutable.

  // Fairness Score (C9-C10)
  C9: 40,   // 60% community (mostly airdrop), but 21.3% team + 18% investors = 40% insiders
  C10: 2,   // Gini 0.938, top 1% = 47.5% voting power. Plutocratic governance.
};

export const uniswap: Project = {
  id: 'uniswap',
  name: 'Uniswap',
  symbol: 'UNI',
  category: 'DEX',
  consensusType: 'pos',  // Token-weighted governance
  website: 'https://uniswap.org',
  description:
    'Dr. Jekyll & Mr. Hyde of DeFi: Core contracts are IMMUTABLE (no admin keys, no kill switch - truly trustless!), but governance is plutocracy (Gini 0.938, top 1% = 47.5%). UNIfication shifted control to Labs. 40% insider allocation.',
  scores: calculateProjectScores(rawValues),
  lastUpdated: '2025-12-26',
  sources: [
    'https://uniswap.org/governance',
    'https://gov.uniswap.org/',
    'https://www.tally.xyz/gov/uniswap',
    'https://defillama.com/protocol/uniswap',
    'https://dune.com/queries/1364527', // UNI token distribution
  ],
};
