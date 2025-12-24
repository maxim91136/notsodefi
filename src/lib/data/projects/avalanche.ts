/**
 * Avalanche (AVAX) - Decentralization Assessment
 *
 * High-performance blockchain, launched 2020.
 * Snowman consensus (PoS variant).
 * Three chains: P-Chain, X-Chain, C-Chain.
 */

import { Project } from '@/lib/framework';
import { calculateProjectScores } from '@/lib/framework';

// Raw assessment values (null = N/A, not applicable)
const rawValues: Record<string, number | null> = {
  // Chain Score (A1-A4)
  A1: 25,   // Moderate Nakamoto coefficient (~700+ validators)
  A2: 35,   // Estimated top 5 concentration
  A3: 1,    // Primarily avalanchego client
  A4: 70,   // High cloud/datacenter usage

  // Control Score (B5-B8)
  B5: 3,    // Ava Labs dominant, Foundation exists
  B6: 2,    // Ava Labs controls core development
  B7: 2,    // Ava Labs owns brand and main frontends
  B8: 3,    // Foundation treasury, limited governance

  // Fairness Score (C9-C10)
  C9: 42,   // ~42% to team/investors (10% team, 9.26% foundation, etc.)
  C10: 3,   // Limited governance, Ava Labs influence
};

export const avalanche: Project = {
  id: 'avalanche',
  name: 'Avalanche',
  symbol: 'AVAX',
  consensusType: 'pos',
  website: 'https://avax.network',
  description:
    'High-performance blockchain with Snowman consensus. Three chains (P/X/C). Ava Labs developed.',
  scores: calculateProjectScores(rawValues),
  lastUpdated: '2025-12-24',
  sources: [
    'https://subnets.avax.network/validators',
    'https://docs.avax.network',
    'https://snowtrace.io',
  ],
};
