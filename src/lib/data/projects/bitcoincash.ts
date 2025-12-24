/**
 * Bitcoin Cash (BCH) - Decentralization Assessment
 *
 * Bitcoin fork, launched 2017.
 * Proof of Work (SHA-256), larger blocks (32MB).
 * Split from Bitcoin over block size debate.
 */

import { Project } from '@/lib/framework';
import { calculateProjectScores } from '@/lib/framework';

// Raw assessment values (null = N/A, not applicable)
const rawValues: Record<string, number | null> = {
  // Chain Score (A1-A4)
  A1: 3,    // Low Nakamoto coefficient - mining pool concentration
  A2: 55,   // Top pools control ~55% hashrate
  A3: 2,    // Bitcoin Cash Node + BCHD
  A4: 40,   // Moderate cloud usage for PoW

  // Control Score (B5-B9)
  B5: 6,    // No dominant foundation, multiple implementations
  B6: 5,    // Bitcoin Cash Node team, decentralized dev
  B7: 6,    // No central trademark control
  B8: null, // N/A - No protocol-level treasury
  B9: 10,   // No halt capability - PoW chain

  // Fairness Score (C9-C10)
  C9: 0,    // Fork of Bitcoin, inherited fair distribution
  C10: null, // N/A - No formal governance
};

export const bitcoincash: Project = {
  id: 'bitcoincash',
  name: 'Bitcoin Cash',
  symbol: 'BCH',
  consensusType: 'pow',
  website: 'https://bitcoincash.org',
  description:
    'Bitcoin fork with 32MB blocks for scalability. SHA-256 PoW. No premine (fork airdrop to BTC holders).',
  scores: calculateProjectScores(rawValues),
  lastUpdated: '2025-12-24',
  sources: [
    'https://blockchair.com/bitcoin-cash',
    'https://miningpoolstats.stream/bitcoincash',
    'https://cash.coin.dance',
  ],
};
