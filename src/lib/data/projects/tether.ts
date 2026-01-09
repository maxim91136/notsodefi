/**
 * Tether (USDT) - Decentralization Assessment
 *
 * Single company (Tether Ltd/iFinex) controls all issuance,
 * can freeze any address, opaque reserves.
 *
 * Facts:
 * - 7th largest holder of US Treasuries globally
 * - Same company as Bitfinex exchange
 * - Fined $41M by CFTC (2021) regarding reserve representations
 * - Can and does freeze addresses on request
 */

import { Project } from '@/lib/framework';
import { calculateProjectScores } from '@/lib/framework';

// Raw assessment values (null = N/A, not applicable)
const rawValues: Record<string, number | null> = {
  // Chain Score (A1-A5) - Adapted for stablecoin
  A1: 1,    // Nakamoto coefficient = 1 (Tether Ltd controls everything)
  A2: 100,  // 100% concentration - single entity
  A3: 1,    // Single "implementation" - Tether's minting system
  A4: null, // N/A - No node network, runs on other chains
  A5: null, // N/A - Stablecoin, no own node network

  // Control Score (B1-B6)
  B1: 1,    // Tether Ltd (iFinex Inc) = total corporate control
  B2: 1,    // Tether owns all code, closed source minting
  B3: 1,    // Tether owns tether.to, all branding
  B4: 1,    // $118B reserves controlled by one company
  B5: 0,    // KILL-SWITCH: Can freeze ANY address instantly
  B6: null, // N/A - Not a protocol, corporate product

  // Fairness Score (C1-C3)
  C1: 100,  // 100% minted by Tether - no distribution mechanism
  C2: 0,    // Token concentration: N/A for stablecoin - users hold USDT, not insiders
  C3: 100,  // Governance: Zero token governance - Tether Ltd decides everything
};

export const tether: Project = {
  id: 'tether',
  name: 'Tether',
  symbol: 'USDT',
  category: 'Stablecoin',
  consensusType: 'federated',  // Single entity control
  website: 'https://tether.to',
  description:
    'Centralized stablecoin issued by Tether Ltd (iFinex). Can freeze any address. Same ownership as Bitfinex.',
  scores: calculateProjectScores(rawValues),
  lastUpdated: '2025-12-26',
  sources: [
    'https://tether.to/transparency',
    'https://www.cftc.gov/PressRoom/PressReleases/8450-21',
    'https://protos.com/tether-papers-crypto-stablecoin-usdt-investigation/',
    'https://www.coindesk.com/policy/2024/10/25/tether-holdings-jump-to-over-100-billion-in-us-treasuries/',
  ],
};
