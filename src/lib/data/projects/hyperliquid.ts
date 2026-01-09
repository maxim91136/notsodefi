/**
 * Hyperliquid (HYPE) - Decentralization Assessment
 *
 * Launched 2024, developed by Hyperliquid Labs.
 * HyperBFT consensus (based on HotStuff).
 * 24 active validators, Nakamoto coefficient = 3 (all Foundation!).
 * Foundation controls ~59% of stake.
 * KILL-SWITCH: Bridge pause, withdrawal freeze, token delisting.
 */

import { Project } from '@/lib/framework';
import { calculateProjectScores } from '@/lib/framework';

// Raw assessment values (null = N/A, not applicable)
const rawValues: Record<string, number | null> = {
  // Chain Score (A1-A5)
  A1: 3,    // Nakamoto coefficient = 3 (all 3 are Foundation validators!)
  A2: 61,   // Top 5 concentration = 60.71%
  A3: 1,    // Single closed-source binary until recently
  A4: 90,   // ~90% datacenter concentration (validators mostly cloud-hosted)
  A5: 24,   // 24 validators (app.hyperliquid.xyz/staking)

  // Control Score (B1-B6)
  B1: 2,    // Hyperliquid Labs controls everything
  B2: 1,    // Closed source, single company development - no public code review possible
  B3: 2,    // Single company owns brand
  B4: 2,    // 38.888% future emissions controlled by foundation
  B5: 0,    // KILL-SWITCH: Bridge pause, withdrawal freeze, forced delisting
  B6: 6,   // Brand new (2024), moving fast, centralized control over upgrades

  // Fairness Score (C1-C3)
  C1: 40,   // 23.8% team + 38.9% future emissions = ~63% not freely distributed
  C2: 63,   // Token concentration: ~63% controlled by team + future emissions
  C3: 100,  // Governance: No token governance. Labs controls all decisions.
};

export const hyperliquid: Project = {
  id: 'hyperliquid',
  name: 'Hyperliquid',
  symbol: 'HYPE',
  category: 'L1',
  consensusType: 'pos',
  website: 'https://hyperliquid.xyz',
  description:
    'Perp DEX L1 with HyperBFT consensus. Foundation holds 58% of staked supply. Documented halt capability.',
  scores: calculateProjectScores(rawValues),
  lastUpdated: '2025-12-25',
  sources: [
    'https://app.hyperliquid.xyz/staking',
    'https://hyperliquid.gitbook.io/hyperliquid-docs',
    'https://github.com/hyperliquid-dex/node',
  ],
};
