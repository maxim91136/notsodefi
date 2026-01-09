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
  // Chain Score (A1-A5)
  A1: 2,    // Nakamoto Coefficient ~2 (Lido + Coinbase dominate staking)
  A2: 65,   // Top 5 staking entities control ~65%
  A3: 3,    // 3+ clients (Geth, Nethermind, Besu, Erigon)
  A4: 60,   // ~60% nodes in cloud infrastructure
  A5: 11000, // ~11,000 full nodes (ethernodes.org Jan 2025)

  // Control Score (B1-B6)
  B1: 4,    // EF has significant soft power: treasury, roadmap influence, grants
  /**
   * B2: Repo/Protocol Ownership = 5
   *
   * Multiple client teams exist, but concentration remains high.
   * Source: https://github.com/ethereum/go-ethereum/graphs/contributors
   *
   * geth (dominant client ~60% of nodes):
   * - Top 3 contributors = 56% of commits (Bitcoin: 40%)
   * - Top 5 contributors = 68% of commits (Bitcoin: 52%)
   *
   * Mitigating factors:
   * - Multiple independent clients (Prysm, Lighthouse, Nethermind, Besu)
   * - Different organizations maintain different clients
   *
   * Centralizing factors:
   * - EF funds most client teams (indirect influence)
   * - geth still dominates node share
   * - Core devs have significant merge control
   *
   * More diverse than single-client chains, but geth still dominates.
   */
  B2: 5,
  B3: 6,    // EF controls ethereum.org but many frontends exist
  B4: null, // N/A - No protocol-level treasury multisig
  B5: 10,   // No halt capability - decentralized PoS validators
  B6: 4,   // DAO Fork (2016) + The Merge PoW→PoS (2022) + frequent EIPs

  // Fairness Score (C1-C3)
  C1: 20,   // ~20% premine (9.9% founders + 9.9% foundation)
  C2: 25,   // Token concentration: insiders hold ~25% (diluted over time)
  C3: null, // Governance: No on-chain token governance. Core devs decide via rough consensus.
};

export const ethereum: Project = {
  id: 'ethereum',
  name: 'Ethereum',
  symbol: 'ETH',
  category: 'L1',
  consensusType: 'pos',
  website: 'https://ethereum.org',
  description:
    'Decentralized platform for smart contracts. Transitioned from PoW to PoS in 2022.',
  scores: calculateProjectScores(rawValues),
  lastUpdated: '2025-12-24',
  sources: [
    'https://rated.network',
    'https://clientdiversity.org',
    'https://ethernodes.org',
  ],
};
