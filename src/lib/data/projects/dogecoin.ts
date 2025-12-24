/**
 * Dogecoin (DOGE) - Decentralization Assessment
 *
 * Meme cryptocurrency, launched 2013.
 * Proof of Work (Scrypt), merged mining with Litecoin.
 * Originally a joke, now major payment network.
 */

import { Project } from '@/lib/framework';
import { calculateProjectScores } from '@/lib/framework';

// Raw assessment values (null = N/A, not applicable)
const rawValues: Record<string, number | null> = {
  // Chain Score (A1-A4)
  A1: 3,    // Low Nakamoto coefficient - merged mining pools dominate
  A2: 60,   // Top pools control ~60% (same pools as LTC)
  A3: 1,    // Only Dogecoin Core client
  A4: 35,   // Lower cloud usage for PoW

  // Control Score (B5-B9)
  B5: 7,    // Dogecoin Foundation exists but minimal power
  B6: 5,    // Small dev team, community contributions
  B7: 8,    // Foundation holds trademark loosely
  B8: null, // N/A - No protocol-level treasury
  B9: 10,   // No halt capability - PoW chain

  // Fairness Score (C9-C10)
  C9: 5,    // No premine, but early mining was fast (random blocks)
  C10: null, // N/A - No formal governance
};

export const dogecoin: Project = {
  id: 'dogecoin',
  name: 'Dogecoin',
  symbol: 'DOGE',
  consensusType: 'pow',
  website: 'https://dogecoin.com',
  description:
    'Meme coin turned major crypto. Scrypt PoW with merged mining (Litecoin). No premine, community-driven.',
  scores: calculateProjectScores(rawValues),
  lastUpdated: '2025-12-24',
  sources: [
    'https://dogechain.info',
    'https://miningpoolstats.stream/dogecoin',
    'https://blockchair.com/dogecoin',
  ],
};
