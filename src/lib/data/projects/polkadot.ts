/**
 * Polkadot (DOT) - Decentralization Assessment
 *
 * Launched 2020, developed by Parity Technologies.
 * NPoS (Nominated Proof of Stake) consensus.
 * Very high Nakamoto coefficient (~149-173), 600 validators.
 * Sudo removed July 2020 - fully decentralized governance.
 */

import { Project } from '@/lib/framework';
import { calculateProjectScores } from '@/lib/framework';

// Raw assessment values (null = N/A, not applicable)
const rawValues: Record<string, number | null> = {
  // Chain Score (A1-A4)
  A1: 149,  // Very high Nakamoto coefficient (~149-173)
  A2: 5,    // ~5% top 5 concentration (NPoS equalizes stake rewards)
  A3: 4,    // Parity dominant, but Gossamer (Go), Kagome (C++), Smoldot exist
  A4: 55,   // Estimated cloud/datacenter percentage

  // Control Score (B1-B6)
  B1: 4,    // Web3 Foundation + Parity significant, but governance on-chain
  B2: 3,    // Parity dominates core development repos
  B3: 4,    // Web3 Foundation owns brand, but community-driven
  B4: 7,    // On-chain treasury governed by DOT holders via OpenGov
  B5: 10,   // No sudo since July 2020 - fully decentralized, no kill switch
  B6: 4,   // "Forkless upgrades" via governance - frequent runtime changes

  // Fairness Score (C1-C2)
  C1: 30,   // 30% to founders, 58% to ICO/investors
  C2: 5,   // OpenGov but whales have more voting power, W3F voting bloc
};

export const polkadot: Project = {
  id: 'polkadot',
  name: 'Polkadot',
  symbol: 'DOT',
  category: 'L1',
  consensusType: 'npos',
  website: 'https://polkadot.com',
  description:
    'NPoS blockchain with on-chain governance (OpenGov). Forkless upgrades. No sudo since 2020.',
  scores: calculateProjectScores(rawValues),
  lastUpdated: '2025-12-24',
  sources: [
    'https://polkadot.subscan.io',
    'https://wiki.polkadot.network',
    'https://polkadot.com',
  ],
};
