/**
 * USD1 Stablecoin - Decentralization Assessment
 *
 * BitGo-issued stablecoin for World Liberty Financial. Can freeze addresses.
 *
 * Key Issues:
 * - BitGo Trust Company has complete control over issuance/freeze
 * - Trump family receives 75% of WLFI token sale proceeds (tied to USD1 adoption)
 * - Can freeze any address (like USDC/USDT)
 * - Reserves held by BitGo/Fidelity (custodian risk)
 * - Banking license application filed Jan 2026 to internalize custody under WLF control
 * - B5 = 0 (freeze capability) → Total score capped at 1.0
 *
 * Timeline:
 * - Sept 2025: USD1 launch alongside WLFI token
 * - Jan 7, 2026: World Liberty Financial files banking license application
 * - Goal: Move USD1 issuance/custody in-house under Trump family control
 *
 * @see https://worldlibertyfinancial.com
 * @see https://defillama.com/stablecoin/world-liberty-financial-usd
 */

import { Project } from '@/lib/framework';
import { calculateProjectScores } from '@/lib/framework';

const rawValues: Record<string, number | null> = {
  // Chain Score (A1-A5) - Stablecoin metrics
  A1: 1,    // BitGo Trust Company controls all issuance/burning
  A2: 100,  // Single entity (BitGo) controls everything
  A3: 1,    // Single implementation (BitGo smart contracts)
  A4: null, // N/A - No node operators for stablecoin
  A5: null, // N/A - Stablecoin, no own node network

  // Control Score (B1-B6)
  B1: 1,    // BitGo Trust + WLF partnership control (Trump family benefits)
  B2: 1,    // Closed-source minting contracts controlled by BitGo
  B3: 1,    // World Liberty Financial owns USD1 brand
  B4: 1,    // BitGo/Fidelity control reserves (banking license pending to move in-house)
  B5: 0,    // KILL-SWITCH: Can freeze any address (standard stablecoin freeze capability)
  B6: null, // N/A - Not an upgradeable protocol, issuance rules controlled by BitGo

  // Fairness Score (C1-C3)
  C1: 100,  // 100% BitGo issuance (no community involvement)
  C2: null, // N/A - Stablecoins don't have meaningful "holder concentration"
  C3: 100,  // Zero governance (BitGo unilateral control)
};

export const usd1: Project = {
  id: 'usd1',
  name: 'USD1',
  symbol: 'USD1',
  category: 'Stablecoin',
  consensusType: 'federated',
  website: 'https://worldlibertyfinancial.com',
  description:
    'BitGo-issued stablecoin for World Liberty Financial. Can freeze addresses. Affiliated entities receive 75% of WLFI token sale proceeds per filed disclosures. Banking license application filed Jan 2026.',
  scores: calculateProjectScores(rawValues),
  lastUpdated: '2026-01-09',
  sources: [
    'https://defillama.com/stablecoin/world-liberty-financial-usd',
    'https://www.coindesk.com/business/2025/01/07/trump-defi-project-world-liberty-financial-applies-for-banking-license/',
    'https://www.theblock.co/post/348917/trump-family-now-controls-at-least-60-stake-over-world-liberty-financial-through-new-holding-company-reuters',
    'https://www.dlnews.com/articles/defi/world-liberty-financial-proposal-splits-opinions-as-wlfi-tokens-remain-locked/',
  ],
  notes: [
    'BitGo Trust Company controls all USD1 issuance and has freeze capability (like USDC/USDT).',
    'Trump family receives 75% of World Liberty Financial token sale proceeds, creating financial incentive for USD1 adoption.',
    'Reserves held by BitGo/Fidelity. Banking license application filed Jan 2026 to move custody under WLF control.',
    'USD1 launched Sept 2025 alongside WLFI governance token as primary stablecoin for WLF DeFi protocol.',
    'Standard centralized stablecoin model with single issuer controlling supply and freeze capability.',
  ],
};
