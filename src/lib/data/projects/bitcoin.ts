/**
 * Bitcoin (BTC) - Decentralization Assessment
 *
 * The original cryptocurrency, launched in 2009.
 * Fair launch with no premine.
 */

import { Project } from '@/lib/framework';
import { calculateProjectScores } from '@/lib/framework';

// Raw assessment values
const rawValues = {
  // Chain Score (A1-A4)
  A1: 5,    // Nakamoto Coefficient ~5 (mining pool concentration)
  A2: 55,   // Top 5 pools control ~55% hashrate
  A3: 2,    // 2 major clients (Bitcoin Core dominant, btcd)
  A4: 45,   // ~45% nodes in cloud/datacenter

  // Control Score (B5-B8)
  B5: 10,   // No corporate owner - true decentralization
  B6: 7,    // Bitcoin Core has diverse maintainers
  B7: 9,    // No single entity controls brand
  B8: 0,    // N/A - no protocol treasury/upgrade keys

  // Fairness Score (C9-C10)
  C9: 0,    // 0% premine - fair launch
  C10: 5,   // Early miners hold significant supply but no governance
};

export const bitcoin: Project = {
  id: 'bitcoin',
  name: 'Bitcoin',
  symbol: 'BTC',
  website: 'https://bitcoin.org',
  description:
    'The first decentralized cryptocurrency. Proof-of-Work consensus with no central authority.',
  scores: calculateProjectScores(rawValues),
  lastUpdated: '2024-12-01',
  sources: [
    'https://miningpoolstats.stream/bitcoin',
    'https://bitnodes.io',
    'https://nakaflow.io',
  ],
};
