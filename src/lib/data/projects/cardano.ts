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
  // Chain Score (A1-A5)
  A1: 25,   // Good Nakamoto coefficient with many pools
  A2: 20,   // Top 5 pools control ~20% of stake
  A3: 1,    // Only cardano-node (Haskell), no alternative implementations
  A4: 50,   // Moderate cloud concentration
  A5: 3000, // ~3,000 stake pools (adapools.org Jan 2025)

  // Control Score (B1-B6)
  B1: 3,    // IOG stepped back from CC (Feb 2025), but still dominates core development
  B2: 3,    // IOG primarily controls core development (cardano-node)
  B3: 5,    // Cardano Foundation holds trademark
  B4: 5,    // Treasury controlled by on-chain governance (DReps)
  B5: 10,   // No halt capability - decentralized stake pools
  B6: 4,   // Multiple eras (Byron→Shelley→Alonzo→Vasil→Chang), planned hard forks

  // Fairness Score (C1-C3)
  C1: 25,   // ~25% to insiders (IOG 17.9%, Foundation 5.4%, Emurgo 2.5%)
  C2: 25,   // Token concentration: ~25% held by IOG/Foundation/Emurgo
  C3: 40,   // On-chain governance active (Constitution Feb 2025, 1500+ DReps), but still plutocratic (ADA-weighted)
};

export const cardano: Project = {
  id: 'cardano',
  name: 'Cardano',
  symbol: 'ADA',
  category: 'L1',
  consensusType: 'pos',
  website: 'https://cardano.org',
  description:
    'PoS blockchain with Ouroboros consensus. On-chain governance via DReps (Constitution Feb 2025). No documented halt capability.',
  scores: calculateProjectScores(rawValues),
  lastUpdated: '2026-01-06',
  sources: [
    'https://blockfrost.io',
    'https://pooltool.io',
    'https://cexplorer.io',
  ],
};
