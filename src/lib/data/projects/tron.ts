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
  // Chain Score (A1-A5)
  A1: 27,   // Fixed 27 Super Representatives
  A2: 85,   // High concentration among top SRs
  A3: 1,    // Only java-tron client
  A4: 80,   // High datacenter concentration
  A5: 27,   // Fixed 27 Super Representatives only

  // Control Score (B1-B6)
  B1: 1,    // Justin Sun / Tron Foundation controls
  B2: 2,    // Tron Foundation controls development, but open source
  B3: 1,    // Justin Sun owns brand
  B4: 1,    // Foundation controls treasury
  B5: 0,    // KILL-SWITCH: Justin Sun can effectively control/halt chain
  B6: 5,   // Centralized control, upgrades at Justin Sun's discretion

  // Fairness Score (C1-C3)
  C1: 40,   // Private sale + foundation allocation
  C2: 40,   // Token concentration: ~40% held by foundation/insiders
  C3: 100,  // Governance: No real token governance. Justin Sun controls everything.
};

export const tron: Project = {
  id: 'tron',
  name: 'Tron',
  symbol: 'TRX',
  category: 'L1',
  consensusType: 'dpos',
  website: 'https://tron.network',
  description:
    'DPoS blockchain with fixed Super Representative set. Tron Foundation operates core infrastructure. Documented halt capability.',
  scores: calculateProjectScores(rawValues),
  lastUpdated: '2025-12-24',
  sources: [
    'https://tronscan.org',
    'https://developers.tron.network',
    'https://trongrid.io',
  ],
};
