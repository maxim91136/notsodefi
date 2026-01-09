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
  // Chain Score (A1-A5) - Adapted for DeFi governance
  A1: 5,    // Nakamoto coefficient for governance: ~5-6 large delegates needed for quorum
  A2: 48,   // Top 5 delegates control ~48% of voting power
  A3: 1,    // Single protocol implementation (Uniswap Labs)
  A4: 50,   // Multi-chain deployment but same governance
  A5: null, // N/A - DEX protocol on Ethereum, no own node network

  // Control Score (B1-B6)
  B1: 2,    // Uniswap Labs dominates roadmap and development
  B2: 2,    // Labs owns github.com/Uniswap, controls all repositories
  B3: 2,    // Labs owns uniswap.org, controls frontend and brand
  B4: 6,    // DAO treasury exists, Labs manages implementation
  B5: 10,   // IMMUTABLE CONTRACTS - no admin keys, no kill switch, no pause function!
  B6: 3,   // v1→v2→v3→v4 are NEW deployments, not upgrades. Core contracts immutable.

  // Fairness Score (C1-C3)
  C1: 40,   // 60% community (mostly airdrop), but 21.3% team + 18% investors = 40% insiders
  C2: 40,   // Token concentration: ~40% held by team + investors
  C3: 48,   // Governance: Top 5 delegates = ~48% voting power. Gini 0.938. Plutocratic.
};

export const uniswap: Project = {
  id: 'uniswap',
  name: 'Uniswap',
  symbol: 'UNI',
  category: 'DEX',
  consensusType: 'pos',  // Token-weighted governance
  website: 'https://uniswap.org',
  description:
    'DEX with immutable core contracts (no admin keys, no kill switch). Token-weighted governance. Labs controls development.',
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
