/**
 * Internet Computer (ICP) - Decentralization Assessment
 *
 * Launched May 2021 by DFINITY Foundation.
 * Novel "Chain Key" consensus running on specialized node machines.
 * ~48-50% insider allocation. 95% price decline from ATH.
 * NNS governance but DFINITY has ~40% voting power.
 */

import { Project } from '@/lib/framework';
import { calculateProjectScores } from '@/lib/framework';

// Raw assessment values (null = N/A, not applicable)
const rawValues: Record<string, number | null> = {
  // Chain Score (A1-A5)
  A1: 5,    // Nakamoto coefficient ~4.6-5.0 (very low)
  A2: 55,   // Top 5 concentration estimated ~55% (based on low NC)
  A3: 1,    // Only 1 client (IC replica) - no diversity
  A4: 85,   // 100% specialized data center hardware (node machines)
  A5: 500,  // ~500 node machines across subnets (dashboard.internetcomputer.org)

  // Control Score (B1-B6)
  B1: 2,    // DFINITY Foundation dominates roadmap, marketing, hiring
  B2: 2,    // DFINITY controls all core repositories
  B3: 3,    // DFINITY owns brand, domains, main interfaces
  B4: 5,    // NNS treasury but DFINITY+IC Association = 40% voting power
  B5: 4,    // NNS can do anything but requires proposals/voting (not single entity)
  B6: 5,   // DFINITY-controlled development, frequent NNS upgrades

  // Fairness Score (C1-C3)
  C1: 50,   // ~48-50% insider allocation (DFINITY, team, seed, strategic)
  C2: 50,   // Token concentration: ~50% held by DFINITY/team/seed/strategic
  C3: 40,   // Governance: NNS governance exists, but DFINITY+IC Association = 40% voting power
};

export const icp: Project = {
  id: 'icp',
  name: 'Internet Computer',
  symbol: 'ICP',
  category: 'L1',
  consensusType: 'pos',
  website: 'https://internetcomputer.org',
  description:
    'Chain Key consensus with NNS governance. DFINITY Foundation controls development. Permissioned node providers.',
  scores: calculateProjectScores(rawValues),
  lastUpdated: '2025-12-25',
  sources: [
    'https://dashboard.internetcomputer.org',
    'https://ic-api.internetcomputer.org/api/v3/',
    'https://coincarp.com/currencies/dfinity/project-info/',
    'https://cryptorank.io/ico/internet-computer',
  ],
};
