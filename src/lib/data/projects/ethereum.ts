/**
 * Ethereum (ETH) - Decentralization Assessment
 *
 * Smart contract platform, launched 2015.
 * Transitioned to Proof-of-Stake in 2022 (The Merge).
 */

import { Project } from '@/lib/framework';
import { calculateProjectScores } from '@/lib/framework';

// Raw assessment values (null = N/A, not applicable)
const rawValues: Record<string, number | null> = {
  // Chain Score (A1-A4)
  A1: 2,    // Nakamoto Coefficient ~2 (Lido + Coinbase dominate staking)
  A2: 65,   // Top 5 staking entities control ~65%
  A3: 3,    // 3+ clients (Geth, Nethermind, Besu, Erigon)
  A4: 60,   // ~60% nodes in cloud infrastructure

  // Control Score (B5-B9)
  B5: 6,    // Ethereum Foundation influential but not dominant
  B6: 8,    // Multiple client teams, diverse maintainers
  B7: 6,    // EF controls ethereum.org but many frontends exist
  B8: null, // N/A - No protocol-level treasury multisig
  B9: 10,   // No halt capability - decentralized PoS validators

  // Fairness Score (C9-C10)
  C9: 20,   // ~20% premine (9.9% founders + 9.9% foundation)
  C10: 25,  // Insiders hold significant but diluted share
};

export const ethereum: Project = {
  id: 'ethereum',
  name: 'Ethereum',
  symbol: 'ETH',
  consensusType: 'pos',
  website: 'https://ethereum.org',
  description:
    'Decentralized platform for smart contracts. Transitioned from PoW to PoS in 2022.',
  scores: calculateProjectScores(rawValues),
  lastUpdated: '2025-12-23',
  sources: [
    'https://rated.network',
    'https://clientdiversity.org',
    'https://ethernodes.org',
  ],
};
