/**
 * Chainlink (LINK) - Decentralization Assessment
 *
 * The "decentralized oracle network" that powers DeFi.
 * ETH/USD feed: 31 operators, minimum 10 required.
 * Multisig can modify price feeds (4-of-9).
 * 80% of LINK held by 125 wallets. Team still holds ~25%.
 * Sergey Nazarov worth $600M-$1.2B from LINK holdings.
 */

import { Project } from '@/lib/framework';
import { calculateProjectScores } from '@/lib/framework';

// Raw assessment values (null = N/A, not applicable)
const rawValues: Record<string, number | null> = {
  // Chain Score (A1-A5)
  A1: 10,   // Nakamoto coefficient = 10 (minimum required for ETH/USD feed)
  A2: 16,   // Top 5 of 31 operators = ~16%, BUT all are vetted/permissioned
  A3: 1,    // Only 1 client - Chainlink node software, no diversity
  A4: 50,   // Mix of infra providers (Deutsche Telekom, Blockdaemon, etc.)
  A5: 16000, // ~16,000 DONs (Decentralized Oracle Networks) globally

  // Control Score (B1-B6)
  B1: 2,    // Chainlink Labs dominates: roadmap, hiring, all development
  B2: 2,    // Chainlink Labs owns github.com/smartcontractkit
  B3: 2,    // Chainlink Labs owns chain.link, all interfaces, brand
  B4: 2,    // 35% "node rewards" + team holdings = no transparent treasury
  B5: 3,    // Multisig (4-of-9) can modify feeds, cannot halt network
  B6: 5,   // v1→v2 upgrades, CCIP additions, "move fast" infrastructure

  // Fairness Score (C1-C3)
  C1: 35,   // 35% team/company, 35% "node rewards" (team controls distribution)
  C2: 35,   // Token concentration: ~35% team holdings, 80% held by 125 wallets
  C3: 100,  // Governance: NO token governance - LINK holders have zero voting rights, Labs decides everything
};

export const chainlink: Project = {
  id: 'chainlink',
  name: 'Chainlink',
  symbol: 'LINK',
  category: 'Oracle',
  consensusType: 'federated',  // Permissioned node operators, vetted by Chainlink
  website: 'https://chain.link',
  description:
    'Oracle network with permissioned operator set. Multisig can update price feeds. Chainlink Labs operates primary development.',
  scores: calculateProjectScores(rawValues),
  lastUpdated: '2025-12-25',
  sources: [
    'https://data.chain.link/feeds/ethereum/mainnet/eth-usd',
    'https://insights.glassnode.com/an-on-chain-distribution-analysis-of-chainlink-link/',
    'https://cryptocoin.news/news/defi-news/breaking-chris-blec-calls-out-critical-chainlink-centralization-flaw-72555/',
    'https://coinlaw.io/chainlink-statistics/',
  ],
};
