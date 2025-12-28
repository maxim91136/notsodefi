/**
 * Internet Computer (ICP) - Decentralization Assessment
 *
 * Launched May 2021 by DFINITY Foundation.
 * Novel "Chain Key" consensus running on specialized node machines.
 * Highly controversial: ~48-50% insider allocation, 95% price crash.
 * NNS governance but DFINITY has ~40% voting power.
 */

import { Project } from '@/lib/framework';
import { calculateProjectScores } from '@/lib/framework';

// Raw assessment values (null = N/A, not applicable)
const rawValues: Record<string, number | null> = {
  // Chain Score (A1-A4)
  A1: 5,    // Nakamoto coefficient ~4.6-5.0 (very low)
  A2: 55,   // Top 5 concentration estimated ~55% (based on low NC)
  A3: 1,    // Only 1 client (IC replica) - no diversity
  A4: 85,   // 100% specialized data center hardware (node machines)

  // Control Score (B5-B10)
  B5: 2,    // DFINITY Foundation dominates roadmap, marketing, hiring
  B6: 2,    // DFINITY controls all core repositories
  B7: 3,    // DFINITY owns brand, domains, main interfaces
  B8: 5,    // NNS treasury but DFINITY+IC Association = 40% voting power
  B9: 4,    // NNS can do anything but requires proposals/voting (not single entity)
  B10: 5,   // DFINITY-controlled development, frequent NNS upgrades

  // Fairness Score (C9-C10)
  C9: 50,   // ~48-50% insider allocation (DFINITY, team, seed, strategic)
  C10: 3,   // NNS governance but insiders dominate voting
};

export const icp: Project = {
  id: 'icp',
  name: 'Internet Computer',
  symbol: 'ICP',
  category: 'L1',
  consensusType: 'pos',
  website: 'https://internetcomputer.org',
  description:
    'Novel "World Computer" with Chain Key consensus. DFINITY controls ~40% voting. 48-50% insider allocation. 95% crash from ATH. Node providers must be approved by NNS.',
  scores: calculateProjectScores(rawValues),
  lastUpdated: '2025-12-25',
  sources: [
    'https://dashboard.internetcomputer.org',
    'https://ic-api.internetcomputer.org/api/v3/',
    'https://coincarp.com/currencies/dfinity/project-info/',
    'https://cryptorank.io/ico/internet-computer',
  ],
};
