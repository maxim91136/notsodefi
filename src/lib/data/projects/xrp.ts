/**
 * XRP (XRP) - Decentralization Assessment
 *
 * XRP Ledger, launched in 2012 by Ripple Labs.
 * Federated Consensus with UNL (Unique Node List).
 * 100% premined, massive insider allocation.
 */

import { Project } from '@/lib/framework';
import { calculateProjectScores } from '@/lib/framework';

// Raw assessment values (null = N/A, not applicable)
const rawValues: Record<string, number | null> = {
  // Chain Score (A1-A4)
  A1: 28,   // ~28 validators in quorum (low Nakamoto coefficient)
  A2: 80,   // Ripple's default UNL dominates validator trust
  A3: 1,    // Essentially one client (rippled)
  A4: 70,   // High percentage of validators in datacenters

  // Control Score (B1-B6)
  B1: 2,    // Ripple Labs has significant control
  B2: 3,    // rippled development controlled by Ripple
  B3: 2,    // Ripple owns XRP trademark and brand
  B4: 1,    // Ripple controls escrow (55B XRP), releases up to 1B/month
  B5: 0,    // KILL-SWITCH: Ripple's default UNL controls consensus, can exclude validators
  B6: 3,   // Some amendments but consensus mechanism unchanged since 2012

  // Fairness Score (C1-C2)
  C1: 100,  // 100% premine - all 100B XRP created at genesis
  C2: 2,   // Amendments require 80% validator approval, but UNL controlled
};

export const xrp: Project = {
  id: 'xrp',
  name: 'XRP',
  symbol: 'XRP',
  category: 'L1',
  consensusType: 'federated',
  website: 'https://xrpl.org',
  description:
    'Federated Consensus with trusted validator lists (UNL). Fully premined at genesis. Ripple Labs controls escrow and default UNL.',
  scores: calculateProjectScores(rawValues),
  lastUpdated: '2025-12-23',
  sources: [
    'https://xrpl.org/consensus.html',
    'https://livenet.xrpl.org/network/validators',
    'https://ripple.com/xrp/',
  ],
};
