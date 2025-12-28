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

  // Control Score (B5-B10)
  B5: 4,    // Web3 Foundation + Parity significant, but governance on-chain
  B6: 3,    // Parity dominates core development repos
  B7: 4,    // Web3 Foundation owns brand, but community-driven
  B8: 7,    // On-chain treasury governed by DOT holders via OpenGov
  B9: 10,   // No sudo since July 2020 - fully decentralized, no kill switch
  B10: 4,   // "Forkless upgrades" via governance - frequent runtime changes

  // Fairness Score (C9-C10)
  C9: 30,   // 30% to founders, 58% to ICO/investors
  C10: 5,   // OpenGov but whales have more voting power, W3F voting bloc
};

export const polkadot: Project = {
  id: 'polkadot',
  name: 'Polkadot',
  symbol: 'DOT',
  category: 'L1',
  consensusType: 'npos',
  website: 'https://polkadot.com',
  description:
    'NPoS blockchain with very high Nakamoto coefficient (~149). 600 validators, on-chain governance. No sudo since 2020.',
  scores: calculateProjectScores(rawValues),
  lastUpdated: '2025-12-24',
  sources: [
    'https://polkadot.subscan.io',
    'https://wiki.polkadot.network',
    'https://polkadot.com',
  ],
};
