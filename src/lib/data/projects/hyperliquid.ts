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
  // Chain Score (A1-A4)
  A1: 3,    // Nakamoto coefficient = 3 (all 3 are Foundation validators!)
  A2: 61,   // Top 5 concentration = 60.71%
  A3: 1,    // Single closed-source binary until recently
  A4: 25,   // Only 24 validators, mostly datacenter

  // Control Score (B5-B9)
  B5: 2,    // Hyperliquid Labs controls everything
  B6: 2,    // Closed source, single company development
  B7: 2,    // Single company owns brand
  B8: 2,    // 38.888% future emissions controlled by foundation
  B9: 0,    // KILL-SWITCH: Bridge pause, withdrawal freeze, forced delisting

  // Fairness Score (C9-C10)
  C9: 40,   // 23.8% team + 38.9% future emissions = ~63% not freely distributed
  C10: 6,   // Airdrop to 94k users was fairly distributed
};

export const hyperliquid: Project = {
  id: 'hyperliquid',
  name: 'Hyperliquid',
  symbol: 'HYPE',
  category: 'L1',
  consensusType: 'pos',
  website: 'https://hyperliquid.xyz',
  description:
    'Perp DEX L1 with HyperBFT. NC=3 (all Foundation!), 59% stake by Foundation. Kill-switch active.',
  scores: calculateProjectScores(rawValues),
  lastUpdated: '2025-12-25',
  sources: [
    'https://app.hyperliquid.xyz/staking',
    'https://hyperliquid.gitbook.io/hyperliquid-docs',
    'https://github.com/hyperliquid-dex/node',
  ],
};
