/**
 * Polkadot (DOT) - Decentralization Assessment
 *
 * Heterogeneous multi-chain protocol, launched 2020.
 * Nominated Proof of Stake (NPoS).
 * Founded by Gavin Wood, developed by Parity Technologies.
 */

import { Project } from '@/lib/framework';
import { calculateProjectScores } from '@/lib/framework';

// Raw assessment values (null = N/A, not applicable)
const rawValues: Record<string, number | null> = {
  // Chain Score (A1-A4)
  A1: 30,   // Good validator count but nomination pools concentrate stake
  A2: 25,   // Relatively well distributed among validators
  A3: 2,    // Polkadot (Parity) + Kagome (Soramitsu)
  A4: 70,   // High cloud/datacenter usage

  // Control Score (B5-B9)
  B5: 3,    // W3F + Parity Technologies dominant
  B6: 2,    // Parity controls Substrate and Polkadot client
  B7: 3,    // Web3 Foundation owns brand and trademarks
  B8: 7,    // On-chain treasury with OpenGov
  B9: 8,    // No single-entity halt capability

  // Fairness Score (C9-C10)
  C9: 30,   // ~30% to W3F, Parity, founders
  C10: 8,   // OpenGov - very active on-chain governance
};

export const polkadot: Project = {
  id: 'polkadot',
  name: 'Polkadot',
  symbol: 'DOT',
  consensusType: 'pos',
  website: 'https://polkadot.network',
  description:
    'Heterogeneous multi-chain protocol with parachains. NPoS consensus. OpenGov for treasury and upgrades.',
  scores: calculateProjectScores(rawValues),
  lastUpdated: '2025-12-24',
  sources: [
    'https://polkadot.subscan.io',
    'https://polkadot.js.org/apps',
    'https://wiki.polkadot.network',
  ],
};
