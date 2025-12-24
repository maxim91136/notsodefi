/**
 * Litecoin (LTC) - Decentralization Assessment
 *
 * Bitcoin fork, launched 2011 by Charlie Lee.
 * Proof of Work (Scrypt). Fair launch, no premine.
 * Merged mining with Dogecoin since 2014.
 */

import { Project } from '@/lib/framework';
import { calculateProjectScores } from '@/lib/framework';

// Raw assessment values (null = N/A, not applicable)
const rawValues: Record<string, number | null> = {
  // Chain Score (A1-A4)
  A1: 4,    // Low Nakamoto coefficient due to mining pool concentration
  A2: 55,   // Top pools control ~55% hashrate
  A3: 1,    // Only Litecoin Core client
  A4: 35,   // Lower cloud usage for PoW mining

  // Control Score (B5-B9)
  B5: 8,    // Litecoin Foundation has minimal influence
  B6: 6,    // Charlie Lee stepped back, community devs
  B7: 7,    // Foundation holds trademark but minimal control
  B8: null, // N/A - No protocol-level treasury
  B9: 10,   // No halt capability - PoW chain

  // Fairness Score (C9-C10)
  C9: 0,    // Fair launch, no premine
  C10: null, // N/A - No formal governance
};

export const litecoin: Project = {
  id: 'litecoin',
  name: 'Litecoin',
  symbol: 'LTC',
  consensusType: 'pow',
  website: 'https://litecoin.org',
  description:
    'Bitcoin fork with faster blocks (2.5 min) and Scrypt PoW. Fair launch, no premine. Charlie Lee created.',
  scores: calculateProjectScores(rawValues),
  lastUpdated: '2025-12-24',
  sources: [
    'https://litecoinpool.org',
    'https://miningpoolstats.stream/litecoin',
    'https://blockchair.com/litecoin',
  ],
};
