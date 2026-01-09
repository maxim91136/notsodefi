/**
 * Aave (AAVE) - Decentralization Assessment
 *
 * "Decentralized" lending protocol where top 3 voters control 58% of governance.
 * Founder bought $10M tokens before key vote. Labs controls code, domain, frontend.
 * Guardian (5/9 multisig) can pause protocol but is community-elected.
 * Treasury: ~$280M managed by Karpatkey. Revenue 2025: $140M.
 */

import { Project } from '@/lib/framework';
import { calculateProjectScores } from '@/lib/framework';

// Raw assessment values (null = N/A, not applicable)
const rawValues: Record<string, number | null> = {
  // Chain Score (A1-A5) - Adapted for DeFi governance
  A1: 3,    // Nakamoto coefficient for governance: ~3 voters needed for majority
  A2: 58,   // Top 3 voters control 58% of voting power - extremely concentrated
  A3: 1,    // Only one protocol implementation, no alternative clients
  A4: 50,   // Multi-chain (ETH, Polygon, Arbitrum, etc.) but same governance
  A5: null, // N/A - Lending protocol on Ethereum, no own node network

  // Control Score (B1-B6)
  B1: 2,    // Aave Labs dominates: roadmap, development, all major decisions
  B2: 2,    // Aave Labs owns github.com/aave, DAO has github.com/aave-dao (limited)
  B3: 2,    // Aave Labs owns aave.com, controls frontend, brand assets
  B4: 6,    // DAO controls ~$280M treasury, managed by Karpatkey via governance
  B5: 5,    // Guardian (5/9 community-elected multisig) can pause, not drain
  B6: 5,   // v1→v2→v3 upgrades, governance-controlled parameter changes

  // Fairness Score (C1-C3)
  C1: 23,   // Original: 23% founders, 77% investors. Team reserve: 3M of 16M (18.75%)
  C2: 30,   // Token concentration: ~30% held by team/early investors today
  C3: 75,   // Governance: Top 1% controls 70-80% of votes. Plutocratic token-weighted voting.
};

export const aave: Project = {
  id: 'aave',
  name: 'Aave',
  symbol: 'AAVE',
  category: 'Lending',
  consensusType: 'pos',  // Token-weighted governance (like PoS: stake = power)
  website: 'https://aave.com',
  description:
    'DeFi lending protocol with token-weighted governance. Labs controls code and frontend. Guardian multisig can pause protocol.',
  scores: calculateProjectScores(rawValues),
  lastUpdated: '2025-12-27',
  sources: [
    'https://cointelegraph.com/news/aave-founder-stani-kulechov-10m-aave-purchase-governance-vote',
    'https://www.ainvest.com/news/aave-governance-crisis-ticking-time-bomb-token-2512/',
    'https://cryptoslate.com/aave-prices-are-crashing-as-insiders-warn-a-hostile-holiday-vote-could-destroy-the-protocols-dominance/',
    'https://coinlaw.io/aave-statistics/',
    'https://defillama.com/protocol/aave',
  ],
};
