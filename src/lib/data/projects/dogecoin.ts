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
  // Chain Score (A1-A5)
  A1: 3,    // Nakamoto coefficient ~3 (merged mining with LTC, same pools)
  A2: 89,   // Top 5 pools same as LTC: ViaBTC, F2Pool, Antpool dominate
  A3: 1,    // Dogecoin Core dominant, no significant alternative clients
  A4: 50,   // Estimated cloud/datacenter percentage
  A5: 400,  // ~400 full nodes (post-DogeReaper exploit Dec 2024)

  // Control Score (B1-B6)
  B1: 9,    // Founders stepped back, Dogecoin Foundation has limited power
  /**
   * B2: Repo/Protocol Ownership = 4
   *
   * Development is concentrated despite community ethos.
   * Source: https://github.com/dogecoin/dogecoin/graphs/contributors
   *
   * - Top 3 contributors = 48% of commits (Bitcoin: 40%)
   * - Top 5 contributors = 60% of commits (Bitcoin: 52%)
   * - Small maintainer team with merge rights
   * - Dogecoin Foundation has limited but real influence
   *
   * Similar concentration to Bitcoin, slightly worse.
   */
  B2: 4,
  B3: 8,    // Brand is community-owned, Foundation doesn't control it
  B4: null, // N/A - No protocol treasury
  B5: 10,   // No halt capability - truly unstoppable PoW chain
  B6: 1,   // Litecoin fork, minimal protocol changes since launch

  // Fairness Score (C1-C3)
  C1: 0,    // 0% premine - fair launch
  C2: 0,    // 0% insider concentration - fair launch, no insider allocation
  C3: 0,    // 0% insider governance - no on-chain governance
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
