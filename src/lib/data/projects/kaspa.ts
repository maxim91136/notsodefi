/**
 * Kaspa (KAS) - Decentralization Assessment
 *
 * Launched November 2021. GHOSTDAG consensus (PoW blockDAG).
 * kHeavyHash algorithm (ASIC mining).
 *
 * "FAIR LAUNCH" CONTROVERSY:
 * - No technical premine (coins weren't pre-created)
 * - BUT: DAGlabs ($8M Polychain funding) mined ~2.5-3% of supply post-launch
 * - Founder Sompolinsky (Dec 2021): "Kaspa is neither attempting nor
 *   pretending to be a 'fair launch' coin"
 * - "DAGlabs is a for-profit entity whose business model is based on mining Kaspa"
 * - Source: https://hashdag.medium.com/in-which-i-love-my-truly-truly-fair-60e74cbaaf7b
 *
 * After launch, DAGlabs dissolved and IP was waived. Now community-run.
 */

import { Project } from '@/lib/framework';
import { calculateProjectScores } from '@/lib/framework';

// Raw assessment values (null = N/A, not applicable)
const rawValues: Record<string, number | null> = {
  // Chain Score (A1-A4)
  A1: 5,    // Nakamoto coefficient ~4-6 for mining pools (estimate)
  A2: 55,   // Top 5 pool concentration ~55% (typical PoW distribution)
  A3: 4,    // Kaspad primary client, rusty-kaspa alternative
  A4: 50,   // Estimated node distribution

  // Control Score (B1-B6)
  B1: 8,    // DAGlabs renounced ownership, community-run
  /**
   * B2: Repo/Protocol Ownership = 5
   *
   * Young project with concentrated early development.
   * Source: https://github.com/kaspanet/kaspad
   *
   * - Core team dominates development
   * - rusty-kaspa alternative exists (positive)
   * - Still early stage, development naturally concentrated
   * - DAGlabs origins mean original team has outsized influence
   *
   * Better than company-controlled, but not fully decentralized.
   */
  B2: 5,
  B3: 8,    // No company owns brand
  B4: 7,    // Multi-sig treasury with elected treasurers
  B5: 10,   // PoW - no kill-switch possible
  B6: 2,   // Young chain (2021) but minimal changes to GHOSTDAG PoW consensus

  // Fairness Score (C1-C2)
  C1: 15,   // ~3% to DAGlabs BUT with $8M VC funding = capital advantage. Founder: "not a fair launch"
  C2: 7,   // Mining distribution, but early capital advantage for insiders
};

export const kaspa: Project = {
  id: 'kaspa',
  name: 'Kaspa',
  symbol: 'KAS',
  category: 'L1',
  consensusType: 'pow',
  website: 'https://kaspa.org',
  description:
    'PoW blockDAG with GHOSTDAG consensus. No technical premine, but ~3% mined by VC-funded DAGlabs ($8M Polychain) at launch. Founder Sompolinsky: "Kaspa is neither attempting nor pretending to be a fair launch coin" (https://hashdag.medium.com/in-which-i-love-my-truly-truly-fair-60e74cbaaf7b)',
  scores: calculateProjectScores(rawValues),
  lastUpdated: '2025-12-29',
  sources: [
    'https://kaspa.org/tokenomics/',
    'https://wiki.kaspa.org/en/prehistory',
    'https://hashdag.medium.com/in-which-i-love-my-truly-truly-fair-60e74cbaaf7b',
    'https://explorer.kaspa.org',
  ],
};
