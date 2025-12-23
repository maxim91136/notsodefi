/**
 * Cardano (ADA) - Decentralization Assessment
 *
 * Proof of Stake blockchain, launched 2017.
 * Ouroboros consensus, academic research-driven.
 * ~3000 stake pools, high decentralization focus.
 */

import { Project } from '@/lib/framework';
import { calculateProjectScores } from '@/lib/framework';

// Raw assessment values (null = N/A, not applicable)
const rawValues: Record<string, number | null> = {
  // Chain Score (A1-A4)
  A1: 25,   // Good Nakamoto coefficient with many pools
  A2: 20,   // Top 5 pools control ~20% of stake
  A3: 3,    // Multiple node implementations (Cardano-node, Daedalus, etc.)
  A4: 50,   // Moderate cloud concentration

  // Control Score (B5-B8)
  B5: 4,    // IOG (IOHK), Cardano Foundation, Emurgo - diversified but coordinated
  B6: 3,    // IOG primarily controls core development
  B7: 5,    // Cardano Foundation holds trademark
  B8: 5,    // Treasury controlled by governance (Catalyst)

  // Fairness Score (C9-C10)
  C9: 17,   // ~17% to IOHK, Foundation, Emurgo in ICO
  C10: 7,   // Project Catalyst - on-chain voting for treasury
};

export const cardano: Project = {
  id: 'cardano',
  name: 'Cardano',
  symbol: 'ADA',
  consensusType: 'pos',
  website: 'https://cardano.org',
  description:
    'Research-driven PoS blockchain with Ouroboros consensus. ~3000 stake pools, on-chain governance via Catalyst.',
  scores: calculateProjectScores(rawValues),
  lastUpdated: '2025-12-24',
  sources: [
    'https://blockfrost.io',
    'https://pooltool.io',
    'https://cexplorer.io',
  ],
};
