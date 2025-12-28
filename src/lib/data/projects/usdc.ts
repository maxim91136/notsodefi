/**
 * USD Coin (USDC) - Decentralization Assessment
 *
 * Circle's $45B stablecoin. US-regulated, "compliant", same centralization.
 *
 * The "good cop" to Tether's "bad cop" - but identical kill-switch.
 *
 * Fun facts:
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
  // Chain Score (A1-A4) - Adapted for stablecoin
  A1: 1,    // Nakamoto coefficient = 1 (Circle controls everything)
  A2: 100,  // 100% concentration - single entity
  A3: 1,    // Single "implementation" - Circle's minting system
  A4: null, // N/A - No node network, runs on other chains

  // Control Score (B5-B10)
  B5: 1,    // Circle = total corporate control
  B6: 1,    // Circle owns all code, closed source minting
  B7: 1,    // Circle owns circle.com, usdc.com, all branding
  B8: 1,    // $76B reserves controlled by one company
  B9: 0,    // KILL-SWITCH: Can freeze ANY address instantly
  B10: null, // N/A - Not a protocol, corporate product

  // Fairness Score (C9-C10)
  C9: 100,  // 100% minted by Circle - no distribution mechanism
  C10: 1,   // Zero governance - Circle decides everything
};

export const usdc: Project = {
  id: 'usdc',
  name: 'USD Coin',
  symbol: 'USDC',
  category: 'Stablecoin',
  consensusType: 'federated',  // Single entity control
  website: 'https://circle.com/usdc',
  description:
    '$76B stablecoin by Circle (NYSE: CRCL). Publicly traded company with same kill-switch as Tether. Can freeze any address. Depegged during SVB collapse. Centre dissolved - Circle now sole issuer.',
  scores: calculateProjectScores(rawValues),
  lastUpdated: '2025-12-26',
  sources: [
    'https://circle.com/transparency',
    'https://www.circle.com/blog/usdc-reserves-composition',
    'https://www.coindesk.com/business/2023/08/21/circle-takes-full-control-of-usdc-after-centre-consortium-dissolution/',
    'https://www.theblock.co/post/220094/circle-freezes-usdc-tokens-linked-to-tornado-cash',
  ],
};
