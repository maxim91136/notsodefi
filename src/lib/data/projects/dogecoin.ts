/**
 * Dogecoin (DOGE) - Decentralization Assessment
 *
 * Meme cryptocurrency launched in 2013 by Billy Markus & Jackson Palmer.
 * Proof of Work (Scrypt) with merged mining with Litecoin since 2014.
 * Fair launch with no premine, community-driven.
 */

import { Project } from '@/lib/framework';
import { calculateProjectScores } from '@/lib/framework';

// Raw assessment values (null = N/A, not applicable)
const rawValues: Record<string, number | null> = {
  // Chain Score (A1-A4)
  A1: 3,    // Nakamoto coefficient ~3 (merged mining with LTC, same pools)
  A2: 89,   // Top 5 pools same as LTC: ViaBTC, F2Pool, Antpool dominate
  A3: 1,    // Dogecoin Core dominant, no significant alternative clients
  A4: 50,   // Estimated cloud/datacenter percentage

  // Control Score (B5-B9)
  B5: 9,    // Founders stepped back, Dogecoin Foundation has limited power
  B6: 7,    // Community-driven development, Foundation supports but doesn't control
  B7: 8,    // Brand is community-owned, Foundation doesn't control it
  B8: null, // N/A - No protocol treasury
  B9: 10,   // No halt capability - truly unstoppable PoW chain

  // Fairness Score (C9-C10)
  C9: 0,    // 0% premine - fair launch
  C10: null, // N/A - No on-chain governance
};

export const dogecoin: Project = {
  id: 'dogecoin',
  name: 'Dogecoin',
  symbol: 'DOGE',
  category: 'L1',
  consensusType: 'pow',
  website: 'https://dogecoin.com',
  description:
    'Meme coin turned legitimate cryptocurrency. Scrypt PoW with merged mining with Litecoin. Fair launch, no premine.',
  scores: calculateProjectScores(rawValues),
  lastUpdated: '2025-12-24',
  sources: [
    'https://blockchair.com/dogecoin',
    'https://miningpoolstats.stream/dogecoin',
    'https://dogecoin.com',
  ],
};
