/**
 * Litecoin (LTC) - Decentralization Assessment
 *
 * Bitcoin fork launched in 2011 by Charlie Lee.
 * Proof of Work (Scrypt) - ASIC resistant originally, now ASIC mining.
 * Fair launch with no premine.
 */

import { Project } from '@/lib/framework';
import { calculateProjectScores } from '@/lib/framework';

// Raw assessment values (null = N/A, not applicable)
const rawValues: Record<string, number | null> = {
  // Chain Score (A1-A5)
  A1: 3,    // Nakamoto coefficient ~3 (Top 3 pools control 81%)
  A2: 89,   // Top 5 pools: ViaBTC 39%, F2Pool 23%, Antpool 19%, HashSpace 5%, KuCoin 3%
  A3: 1,    // Litecoin Core dominant (Bitcoin Core fork), no significant alternative
  A4: 45,   // Estimated cloud/datacenter percentage similar to Bitcoin
  A5: 900,  // ~900 full nodes (Blockchair Jan 2025)

  // Control Score (B1-B6)
  B1: 9,    // Charlie Lee stepped back, no corporate owner, very decentralized
  /**
   * B2: Repo/Protocol Ownership = 4
   *
   * Bitcoin fork with similar development concentration.
   * Source: https://github.com/litecoin-project/litecoin
   *
   * - Small maintainer team (Bitcoin Core fork structure)
   * - Litecoin Foundation has influence over development direction
   * - Charlie Lee still influential despite "stepping back"
   * - Similar gatekeeper structure to Bitcoin
   *
   * As a Bitcoin fork, inherits similar centralization patterns.
   */
  B2: 4,
  B3: 7,    // Litecoin Foundation holds trademark but limited authority
  B4: null, // N/A - No protocol treasury or upgrade keys
  B5: 10,   // No halt capability - truly unstoppable PoW chain
  B6: 1,   // Bitcoin fork, minimal changes since launch (MimbleWimble optional)

  // Fairness Score (C1-C3)
  C1: 0,    // 0% premine - fair launch like Bitcoin
  C2: 0,    // 0% insider concentration - fair launch, no insider allocation
  C3: 0,    // 0% insider governance - no on-chain governance
};

export const litecoin: Project = {
  id: 'litecoin',
  name: 'Litecoin',
  symbol: 'LTC',
  category: 'L1',
  consensusType: 'pow',
  website: 'https://litecoin.org',
  description:
    'Bitcoin fork with faster block times and Scrypt PoW. Fair launch, no premine. No kill switch.',
  scores: calculateProjectScores(rawValues),
  lastUpdated: '2025-12-24',
  sources: [
    'https://litecoinpool.org/pools',
    'https://blockchair.com/litecoin',
    'https://litecoin.org',
  ],
};
