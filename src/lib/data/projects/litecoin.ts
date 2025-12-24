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
  // Chain Score (A1-A4)
  A1: 3,    // Nakamoto coefficient ~3 (Top 3 pools control 81%)
  A2: 89,   // Top 5 pools: ViaBTC 39%, F2Pool 23%, Antpool 19%, HashSpace 5%, KuCoin 3%
  A3: 1,    // Litecoin Core dominant (Bitcoin Core fork), no significant alternative
  A4: 45,   // Estimated cloud/datacenter percentage similar to Bitcoin

  // Control Score (B5-B9)
  B5: 9,    // Charlie Lee stepped back, no corporate owner, very decentralized
  B6: 7,    // Community-driven development, Litecoin Foundation supports but doesn't control
  B7: 7,    // Litecoin Foundation holds trademark but limited authority
  B8: null, // N/A - No protocol treasury or upgrade keys
  B9: 10,   // No halt capability - truly unstoppable PoW chain

  // Fairness Score (C9-C10)
  C9: 0,    // 0% premine - fair launch like Bitcoin
  C10: null, // N/A - No on-chain governance
};

export const litecoin: Project = {
  id: 'litecoin',
  name: 'Litecoin',
  symbol: 'LTC',
  consensusType: 'pow',
  website: 'https://litecoin.org',
  description:
    'Bitcoin fork with faster block times (2.5 min) and Scrypt PoW. Fair launch, Charlie Lee stepped back from active role.',
  scores: calculateProjectScores(rawValues),
  lastUpdated: '2025-12-24',
  sources: [
    'https://litecoinpool.org/pools',
    'https://blockchair.com/litecoin',
    'https://litecoin.org',
  ],
};
