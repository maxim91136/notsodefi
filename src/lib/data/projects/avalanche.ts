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
  // Chain Score (A1-A5)
  A1: 25,   // Moderate Nakamoto coefficient (~700+ validators)
  A2: 35,   // Estimated top 5 concentration
  A3: 1,    // Primarily avalanchego client
  A4: 70,   // High cloud/datacenter usage
  A5: 1500, // ~1,500 validators (avascan.info estimate)

  // Control Score (B1-B6)
  B1: 3,    // Ava Labs dominant, Foundation exists
  B2: 2,    // Ava Labs controls core development
  B3: 2,    // Ava Labs owns brand and main frontends
  B4: 3,    // Foundation treasury, limited governance
  B5: 2,    // Feb 2024: 5h halt (bug + coordinated restart). Ava Labs controls everything.
  B6: 5,   // New chain (2020), regular upgrades, "move fast" culture

  // Fairness Score (C1-C3)
  C1: 42,   // ~42% to team/investors (10% team, 9.26% foundation, etc.)
  C2: 42,   // Token concentration: ~42% held by team/foundation/investors
  C3: 100,  // Governance: Limited token governance. Ava Labs controls most decisions.
};

export const avalanche: Project = {
  id: 'avalanche',
  name: 'Avalanche',
  symbol: 'AVAX',
  category: 'L1',
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
