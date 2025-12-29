/**
 * Kaspa (KAS) - Decentralization Assessment
 *
 * Launched November 2021, developed by community after DAGlabs renounced ownership.
 * GHOSTDAG consensus (PoW blockDAG).
 * Fair launch: no premine, no ICO, no team allocation.
 * 100% mineable, kHeavyHash algorithm (ASIC mining).
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
  C1: 100,  // 0% premine - TRUE FAIR LAUNCH
  C2: 8,   // 100% mining distribution, similar to Bitcoin
};

export const kaspa: Project = {
  id: 'kaspa',
  name: 'Kaspa',
  symbol: 'KAS',
  category: 'L1',
  consensusType: 'pow',
  website: 'https://kaspa.org',
  description:
    'PoW blockDAG with GHOSTDAG consensus. Fair launch: 0% premine, no ICO, no team allocation. Community-run since DAGlabs renounced ownership.',
  scores: calculateProjectScores(rawValues),
  lastUpdated: '2025-12-25',
  sources: [
    'https://kaspa.org/tokenomics/',
    'https://api.kaspa.org/docs',
    'https://explorer.kaspa.org',
  ],
};
