/**
 * USD Coin (USDC) - Decentralization Assessment
 *
 * Circle's stablecoin. US-regulated, same centralization as other stablecoins.
 *
 * Facts:
 * - Circle is US-based (vs Tether's BVI)
 * - Has frozen addresses on OFAC sanctions
 * - Depegged during SVB collapse (March 2023)
 * - Centre Consortium dissolved - Circle now sole issuer
 * - Same freeze capability as Tether
 */

import { Project } from '@/lib/framework';
import { calculateProjectScores } from '@/lib/framework';

// Raw assessment values (null = N/A, not applicable)
const rawValues: Record<string, number | null> = {
  // Chain Score (A1-A5) - Adapted for stablecoin
  A1: 1,    // Nakamoto coefficient = 1 (Circle controls everything)
  A2: 100,  // 100% concentration - single entity
  A3: 1,    // Single "implementation" - Circle's minting system
  A4: null, // N/A - No node network, runs on other chains
  A5: null, // N/A - Stablecoin, no own node network

  // Control Score (B1-B6)
  B1: 1,    // Circle = total corporate control
  B2: 1,    // Circle owns all code, closed source minting
  B3: 1,    // Circle owns circle.com, usdc.com, all branding
  B4: 1,    // $76B reserves controlled by one company
  B5: 0,    // KILL-SWITCH: Can freeze ANY address instantly
  B6: null, // N/A - Not a protocol, corporate product

  // Fairness Score (C1-C3)
  C1: 100,  // 100% minted by Circle - no distribution mechanism
  C2: 0,    // Token concentration: N/A for stablecoin - users hold USDC, not insiders
  C3: 100,  // Governance: Zero token governance - Circle decides everything
};

export const usdc: Project = {
  id: 'usdc',
  name: 'USD Coin',
  symbol: 'USDC',
  category: 'Stablecoin',
  consensusType: 'federated',  // Single entity control
  website: 'https://circle.com/usdc',
  description:
    'Centralized stablecoin issued by Circle. Can freeze any address. Centre dissolved - Circle now sole issuer. US-regulated with same freeze capability as Tether.',
  scores: calculateProjectScores(rawValues),
  lastUpdated: '2025-12-26',
  sources: [
    'https://circle.com/transparency',
    'https://www.circle.com/blog/usdc-reserves-composition',
    'https://www.coindesk.com/business/2023/08/21/circle-takes-full-control-of-usdc-after-centre-consortium-dissolution/',
    'https://www.theblock.co/post/220094/circle-freezes-usdc-tokens-linked-to-tornado-cash',
  ],
};
