/**
 * Tether (USDT) - Decentralization Assessment
 *
 * The $118B elephant in the room. Single company (Tether Ltd/iFinex)
 * controls all issuance, can freeze any address, opaque reserves.
 *
 * "Decentralized" stablecoin that is literally a database entry
 * controlled by one company in the British Virgin Islands.
 *
 * Fun facts:
 * - 7th largest holder of US Treasuries globally
 * - Same company as Bitfinex exchange
 * - Fined $41M by CFTC for lying about reserves
 * - Can and does freeze addresses on request
 */

import { Project } from '@/lib/framework';
import { calculateProjectScores } from '@/lib/framework';

// Raw assessment values (null = N/A, not applicable)
const rawValues: Record<string, number | null> = {
  // Chain Score (A1-A4) - Adapted for stablecoin
  A1: 1,    // Nakamoto coefficient = 1 (Tether Ltd controls everything)
  A2: 100,  // 100% concentration - single entity
  A3: 1,    // Single "implementation" - Tether's minting system
  A4: null, // N/A - No node network, runs on other chains

  // Control Score (B5-B10)
  B5: 1,    // Tether Ltd (iFinex Inc) = total corporate control
  B6: 1,    // Tether owns all code, closed source minting
  B7: 1,    // Tether owns tether.to, all branding
  B8: 1,    // $118B reserves controlled by one company
  B9: 0,    // KILL-SWITCH: Can freeze ANY address instantly
  B10: null, // N/A - Not a protocol, corporate product

  // Fairness Score (C9-C10)
  C9: 100,  // 100% minted by Tether - no distribution mechanism
  C10: 1,   // Zero governance - Tether decides everything
};

export const tether: Project = {
  id: 'tether',
  name: 'Tether',
  symbol: 'USDT',
  category: 'Stablecoin',
  consensusType: 'federated',  // Single entity control
  website: 'https://tether.to',
  description:
    '$118B stablecoin controlled by one company. Can freeze any address. 7th largest US Treasury holder. Same company as Bitfinex. Fined $41M for lying about reserves.',
  scores: calculateProjectScores(rawValues),
  lastUpdated: '2025-12-26',
  sources: [
    'https://tether.to/transparency',
    'https://www.cftc.gov/PressRoom/PressReleases/8450-21',
    'https://protos.com/tether-papers-crypto-stablecoin-usdt-investigation/',
    'https://www.coindesk.com/policy/2024/10/25/tether-holdings-jump-to-over-100-billion-in-us-treasuries/',
  ],
};
