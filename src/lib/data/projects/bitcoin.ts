/**
 * Bitcoin (BTC) - Decentralization Assessment
 *
 * The original cryptocurrency, launched in 2009.
 * Fair launch with no premine. Proof of Work.
 */

import { Project } from '@/lib/framework';
import { calculateProjectScores } from '@/lib/framework';

// Raw assessment values (null = N/A, not applicable)
const rawValues: Record<string, number | null> = {
  // Chain Score (A1-A4)
  A1: 5,    // Nakamoto Coefficient ~5 (mining pools, but miners can switch)
  A2: 55,   // Top 5 pools control ~55% hashrate
  A3: 2,    // 2 major clients (Bitcoin Core dominant, btcd)
  A4: 45,   // ~45% nodes in cloud/datacenter

  // Control Score (B1-B6)
  B1: 10,   // No corporate owner - true decentralization
  B2: 7,    // Bitcoin Core has diverse maintainers
  B3: 9,    // No single entity controls brand
  B4: null, // N/A - No protocol treasury or upgrade keys
  B5: 10,   // No halt capability - truly unstoppable PoW chain
  B6: 0,   // Zero fundamental changes - immutable protocol since 2009

  // Fairness Score (C1-C2)
  C1: 0,    // 0% premine - fair launch
  C2: null, // N/A - No on-chain governance
};

export const bitcoin: Project = {
  id: 'bitcoin',
  name: 'Bitcoin',
  symbol: 'BTC',
  category: 'L1',
  consensusType: 'pow',
  website: 'https://bitcoin.org',
  description:
    'The first decentralized cryptocurrency. Proof-of-Work consensus with no central authority.',
  scores: calculateProjectScores(rawValues),
  lastUpdated: '2025-12-23',
  sources: [
    'https://miningpoolstats.stream/bitcoin',
    'https://bitnodes.io',
    'https://nakaflow.io',
  ],
  notes: [
    'Node count shows only publicly reachable nodes. Actual total estimated 2-5x higher (non-listening, Tor, NAT, private nodes).',
  ],
};
