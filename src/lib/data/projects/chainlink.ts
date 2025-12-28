/**
 * Chainlink (LINK) - Decentralization Assessment
 *
 * The "decentralized oracle network" that powers DeFi.
 * ETH/USD feed: 31 operators, minimum 10 required.
 * Undocumented multisig can manipulate ANY price feed.
 * 80% of LINK held by 125 wallets. Team still holds ~25%.
 * Sergey Nazarov worth $600M-$1.2B from LINK holdings.
 */

import { Project } from '@/lib/framework';
import { calculateProjectScores } from '@/lib/framework';

// Raw assessment values (null = N/A, not applicable)
const rawValues: Record<string, number | null> = {
  // Chain Score (A1-A4)
  A1: 10,   // Nakamoto coefficient = 10 (minimum required for ETH/USD feed)
  A2: 16,   // Top 5 of 31 operators = ~16%, BUT all are vetted/permissioned
  A3: 1,    // Only 1 client - Chainlink node software, no diversity
  A4: 50,   // Mix of infra providers (Deutsche Telekom, Blockdaemon, etc.)

  // Control Score (B5-B10)
  B5: 2,    // Chainlink Labs dominates: roadmap, hiring, all development
  B6: 2,    // Chainlink Labs owns github.com/smartcontractkit
  B7: 2,    // Chainlink Labs owns chain.link, all interfaces, brand
  B8: 2,    // 35% "node rewards" + team holdings = no transparent treasury
  B9: 3,    // Undocumented multisig CAN manipulate feeds, but not halt network
  B10: 5,   // v1→v2 upgrades, CCIP additions, "move fast" infrastructure

  // Fairness Score (C9-C10)
  C9: 35,   // 35% team/company, 35% "node rewards" (team controls distribution)
  C10: 2,   // No on-chain governance, Chainlink Labs makes all decisions
};

export const chainlink: Project = {
  id: 'chainlink',
  name: 'Chainlink',
  symbol: 'LINK',
  category: 'Oracle',
  consensusType: 'federated',  // Permissioned node operators, vetted by Chainlink
  website: 'https://chain.link',
  description:
    'Oracle monopoly powering DeFi. ETH/USD: 31 operators, 10 minimum. Undocumented multisig can manipulate any feed. 80% of LINK in 125 wallets. Sergey worth $1B+.',
  scores: calculateProjectScores(rawValues),
  lastUpdated: '2025-12-25',
  sources: [
    'https://data.chain.link/feeds/ethereum/mainnet/eth-usd',
    'https://insights.glassnode.com/an-on-chain-distribution-analysis-of-chainlink-link/',
    'https://cryptocoin.news/news/defi-news/breaking-chris-blec-calls-out-critical-chainlink-centralization-flaw-72555/',
    'https://coinlaw.io/chainlink-statistics/',
  ],
};
