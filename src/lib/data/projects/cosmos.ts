/**
 * Cosmos (ATOM) - Decentralization Assessment
 *
 * Internet of Blockchains, launched 2019.
 * Tendermint BFT consensus (PoS).
 * IBC protocol for cross-chain communication.
 */

import { Project } from '@/lib/framework';
import { calculateProjectScores } from '@/lib/framework';

// Raw assessment values (null = N/A, not applicable)
const rawValues: Record<string, number | null> = {
  // Chain Score (A1-A4)
  A1: 7,    // 180 validators but top-heavy stake distribution
  A2: 35,   // Moderate concentration among top validators
  A3: 2,    // Gaia (main) + some alternatives
  A4: 75,   // High cloud/datacenter usage

  // Control Score (B5-B9)
  B5: 4,    // Interchain Foundation + various companies (Informal, etc.)
  B6: 4,    // Multiple teams: Informal Systems, Strangelove, Binary Builders
  B7: 4,    // ICF holds some brand control
  B8: 6,    // Community pool with on-chain governance
  B9: 8,    // No single-entity halt capability

  // Fairness Score (C9-C10)
  C9: 22,   // ~22% to Tendermint Inc, ICF, early contributors
  C10: 7,   // Active governance, many proposals pass
};

export const cosmos: Project = {
  id: 'cosmos',
  name: 'Cosmos',
  symbol: 'ATOM',
  consensusType: 'pos',
  website: 'https://cosmos.network',
  description:
    'Internet of Blockchains with IBC protocol. Tendermint BFT consensus. 180 validators, active governance.',
  scores: calculateProjectScores(rawValues),
  lastUpdated: '2025-12-24',
  sources: [
    'https://mintscan.io/cosmos',
    'https://atomscan.com',
    'https://cosmos.network/ecosystem',
  ],
};
