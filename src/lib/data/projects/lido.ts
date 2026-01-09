/**
 * Lido (LDO) - Decentralization Assessment
 *
 * The #1 liquid staking protocol controlling ~25% of all staked ETH.
 * Critical infrastructure for Ethereum's security - and a massive
 * centralization risk if node operators or governance fail.
 *
 * Node Operators: ~30 curated operators (permissioned). Community Staking
 * Module (CSM) launched 2024 for solo stakers, but permissioned set dominates.
 *
 * Governance: Classic plutocracy. 64% of LDO tokens to founders (vested),
 * token-weighted voting, 5% quorum. Dual Governance gives stETH holders
 * veto power, but LDO still controls everything else.
 *
 * Key Risk: Protocol smart contracts ARE upgradeable via governance.
 * Node operators can be added/removed. Not immutable like Uniswap.
 */

import { Project } from '@/lib/framework';
import { calculateProjectScores } from '@/lib/framework';

// Raw assessment values (null = N/A, not applicable)
const rawValues: Record<string, number | null> = {
  // Chain Score (A1-A5) - Adapted for staking protocol
  A1: 15,   // 683 active operators (Q3 2025), CSM permissionless since Feb 2025
  A2: 35,   // Top 5 node operators control ~35% of Lido's stake
  A3: 1,    // Single protocol implementation (Lido Finance)
  A4: 30,   // Multi-chain (ETH, Polygon, Solana) but 95%+ is Ethereum
  A5: null, // N/A - Staking protocol on Ethereum, no own node network

  // Control Score (B1-B6)
  B1: 3,    // Lido DAO + Labs. More decentralized than pure team control, but still small group
  B2: 2,    // github.com/lidofinance - Lido team controls all repositories
  B3: 2,    // lido.fi owned by Lido team, controls frontend and brand
  B4: 7,    // Large DAO treasury, but spending controlled by plutocratic governance
  B5: 5,    // Dual Governance (June 2025) gives stETH holders veto power (5-45 day block, 10% rage quit)
  B6: 5,   // Upgradeable contracts, CSM v2, DVT expansion to Curated Module

  // Fairness Score (C1-C3)
  C1: 64,   // 64% to founders/team (vested over 1yr), ~18% investors, ~18% community
  C2: 64,   // Token concentration: ~64% held by founders/team
  C3: 60,   // Governance: Dual Governance improves stETH holder power, but LDO still dominates
};

export const lido: Project = {
  id: 'lido',
  name: 'Lido',
  symbol: 'LDO',
  category: 'Infrastructure',
  consensusType: 'pos',  // Token-weighted governance
  website: 'https://lido.fi',
  description:
    'Liquid staking protocol for Ethereum. 683 operators (CSM permissionless). Dual Governance gives stETH holders veto power. Controls 24% of staked ETH.',
  scores: calculateProjectScores(rawValues),
  lastUpdated: '2026-01-06',
  sources: [
    'https://lido.fi/governance',
    'https://docs.lido.fi/lido-dao/',
    'https://defillama.com/protocol/lido',
    'https://dune.com/hildobby/eth2-staking',
    'https://operatorportal.lido.fi/',
    'https://blog.lido.fi/introducing-ldo/',
  ],
};
