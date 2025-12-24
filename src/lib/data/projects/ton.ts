/**
 * TON (Toncoin) - Decentralization Assessment
 *
 * Originally Telegram Open Network, relaunched 2021.
 * Proof of Stake with sharding.
 * TON Foundation controls development.
 */

import { Project } from '@/lib/framework';
import { calculateProjectScores } from '@/lib/framework';

// Raw assessment values (null = N/A, not applicable)
const rawValues: Record<string, number | null> = {
  // Chain Score (A1-A4)
  A1: 20,   // ~350 validators but stake concentrated
  A2: 40,   // Moderate concentration
  A3: 1,    // Only ton-blockchain client
  A4: 80,   // High cloud/datacenter usage

  // Control Score (B5-B9)
  B5: 3,    // TON Foundation dominant (originally Telegram)
  B6: 2,    // Foundation controls core development
  B7: 2,    // Foundation owns brand, Telegram integration
  B8: 4,    // Foundation-controlled treasury
  B9: 6,    // Validators can be influenced, Foundation has soft power

  // Fairness Score (C9-C10)
  C9: 50,   // ~50% from original Telegram ICO + foundation allocation
  C10: 4,   // Limited governance, Foundation-driven decisions
};

export const ton: Project = {
  id: 'ton',
  name: 'TON',
  symbol: 'TON',
  consensusType: 'pos',
  website: 'https://ton.org',
  description:
    'Originally Telegram Open Network. PoS with sharding. Strong Telegram integration, Foundation-controlled.',
  scores: calculateProjectScores(rawValues),
  lastUpdated: '2025-12-24',
  sources: [
    'https://tonstat.com',
    'https://tonscan.org',
    'https://ton.org/docs',
  ],
};
