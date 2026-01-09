/**
 * Virtuals Protocol (VIRTUAL) - Decentralization Assessment
 *
 * AI Agent launchpad on Base (Coinbase L2). Formerly PathDAO (gaming guild, 2021).
 * Rebranded to Virtuals Protocol in late 2023/early 2024.
 *
 * FUNDING:
 * - $16M seed round (2021, as PathDAO)
 * - Led by DeFiance Capital, Merit Circle
 * - 18 investors total including Master Ventures, NewTribe Capital, LVT Capital
 *
 * TOKENOMICS:
 * - 60% Public Distribution (fully unlocked)
 * - 35% Ecosystem Treasury (DAO multi-sig, max 10%/year emission)
 * - 5% Liquidity Pool
 * - All tokens vested/unlocked
 */

import { Project } from '@/lib/framework';
import { calculateProjectScores } from '@/lib/framework';

// Raw assessment values (null = N/A, not applicable)
const rawValues: Record<string, number | null> = {
  // Chain Score (A1-A5) - Adapted for DeFi/Protocol
  A1: 3,    // Small team (2 co-founders + core team) controls protocol direction
  A2: 55,   // 35% treasury + early VC holdings = significant concentration
  A3: 1,    // Single implementation by Virtuals team
  A4: 80,   // Runs entirely on Base (Coinbase L2) - single chain dependency
  A5: null, // N/A - Protocol on Base L2, no own node network

  // Control Score (B1-B6)
  B1: 2,    // Small team: Jansen Teng (CEO) + Wee Kee, ex-BCG consultants
  B2: 2,    // Team controls all code repositories
  B3: 2,    // Team controls virtuals.io, whitepaper, brand
  B4: 4,    // DAO multi-sig treasury, but team effectively controls
  B5: 5,    // Unknown if contracts upgradeable, Base dependency adds risk
  B6: 4,    // Young protocol (2024 rebrand), likely upgradeable contracts

  // Fairness Score (C1-C3)
  C1: 40,   // 60% public, but 35% treasury + VCs from 2021 seed = insider advantage
  C2: 40,   // Token concentration: ~40% controlled by treasury + early VCs
  C3: 60,   // Governance: veVIRTUAL governance exists, but early/concentrated
};

export const virtuals: Project = {
  id: 'virtuals-protocol',
  name: 'Virtuals Protocol',
  symbol: 'VIRTUAL',
  category: 'Infrastructure',
  consensusType: 'pos',
  website: 'https://virtuals.io',
  description:
    'AI Agent launchpad on Base. Formerly PathDAO (2021). VC-backed ($16M seed).',
  scores: calculateProjectScores(rawValues),
  lastUpdated: '2025-12-30',
  sources: [
    'https://whitepaper.virtuals.io/usdvirtual-tokenomics/token-distribution',
    'https://cryptorank.io/ico/virtual-protocol',
    'https://pitchbook.com/profiles/company/493051-69',
    'https://www.coingecko.com/en/coins/virtual-protocol',
  ],
};
