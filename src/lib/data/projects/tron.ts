/**
 * Tron (TRX) - Decentralization Assessment
 *
 * DPoS blockchain, launched 2017.
 * 27 Super Representatives elected by voting.
 * Controlled by Justin Sun / Tron Foundation.
 */

import { Project } from '@/lib/framework';
import { calculateProjectScores } from '@/lib/framework';

// Raw assessment values (null = N/A, not applicable)
const rawValues: Record<string, number | null> = {
  // Chain Score (A1-A4)
  A1: 27,   // Fixed 27 Super Representatives
  A2: 85,   // High concentration among top SRs
  A3: 1,    // Only java-tron client
  A4: 80,   // High datacenter concentration

  // Control Score (B1-B6)
  B1: 1,    // Justin Sun / Tron Foundation controls
  B2: 1,    // Tron Foundation controls development
  B3: 1,    // Justin Sun owns brand
  B4: 1,    // Foundation controls treasury
  B5: 0,    // KILL-SWITCH: Justin Sun can effectively control/halt chain
  B6: 5,   // Centralized control, upgrades at Justin Sun's discretion

  // Fairness Score (C1-C2)
  C1: 40,   // Private sale + foundation allocation
  C2: 1,   // Voting controlled by few large holders
};

export const tron: Project = {
  id: 'tron',
  name: 'Tron',
  symbol: 'TRX',
  category: 'L1',
  consensusType: 'dpos',
  website: 'https://tron.network',
  description:
    'DPoS blockchain with 27 Super Representatives. Controlled by Justin Sun and Tron Foundation.',
  scores: calculateProjectScores(rawValues),
  lastUpdated: '2025-12-24',
  sources: [
    'https://tronscan.org',
    'https://developers.tron.network',
    'https://trongrid.io',
  ],
};
