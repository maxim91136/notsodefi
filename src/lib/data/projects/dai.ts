/**
 * DAI (MakerDAO) - Decentralization Assessment
 *
 * The "decentralized" stablecoin - overcollateralized, DAO-governed.
 * Actually different from USDT/USDC in key ways.
 *
 * What makes it different:
 * - Cannot freeze individual addresses (unlike USDT/USDC)
 * - MKR governance, not corporate control
 * - Overcollateralized (150%), not fiat-backed
 * - Open source smart contracts
 *
 * The catch:
 * - Significant USDC as collateral = indirect Circle dependency
 * - Emergency Shutdown exists (but requires 50K MKR or vote)
 * - MKR distribution still concentrated among early holders
 * - Sky/USDS rebrand ongoing (2024-2025)
 */

import { Project } from '@/lib/framework';
import { calculateProjectScores } from '@/lib/framework';

// Raw assessment values (null = N/A, not applicable)
const rawValues: Record<string, number | null> = {
  // Chain Score (A1-A5) - Adapted for stablecoin
  A1: 8,    // ~8-10 major MKR holders/delegates to reach 51% voting power
  A2: 35,   // Top holders (a16z, delegates) control ~35% of voting power
  A3: 1,    // Single smart contract implementation
  A4: null, // N/A - Runs on Ethereum, no own node network
  A5: null, // N/A - Stablecoin protocol on Ethereum, no own node network

  // Control Score (B1-B6)
  B1: 6,    // DAO governance, but Maker Foundation/Sky has significant influence
  B2: 4,    // Open source, community proposals, but core team leads development - concentrated
  B3: 5,    // makerdao.com, sky.money - foundation controlled, DAO governed
  B4: 7,    // Treasury/reserves governed by MKR votes, not single entity
  B5: 5,    // No direct freeze, but ~40% USDC collateral = indirect Circle dependency. Emergency Shutdown requires 50K MKR
  B6: 4,   // SCD→MCD migration, PSM changes, Sky/USDS rebrand ongoing

  // Fairness Score (C1-C3)
  C1: 40,   // ~40% to Maker Foundation + early investors (a16z, Polychain, etc.)
  C2: 40,   // Token concentration: ~40% MKR held by foundation + early investors
  C3: 35,   // Governance: Top holders (a16z, delegates) control ~35% of voting power
};

export const dai: Project = {
  id: 'dai',
  name: 'DAI',
  symbol: 'DAI',
  category: 'Stablecoin',
  consensusType: 'pos',  // DAO governance via MKR staking/voting
  website: 'https://makerdao.com',
  description:
    'Overcollateralized stablecoin with MKR governance. No individual address freezing. Emergency Shutdown is protocol-wide. Significant USDC collateral exposure.',
  scores: calculateProjectScores(rawValues),
  lastUpdated: '2025-12-29',
  sources: [
    'https://docs.makerdao.com/smart-contract-modules/shutdown',
    'https://coinlaw.io/makerdao-statistics/',
    'https://daistats.com/',
    'https://makerburn.com/',
  ],
};
