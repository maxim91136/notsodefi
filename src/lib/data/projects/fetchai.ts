/**
 * Fetch.ai (FET) - Decentralization Assessment
 *
 * Cosmos SDK chain focused on AI agents and autonomous economic agents.
 * Founded 2017 by Cambridge/DeepMind engineers. Binance Launchpad ICO 2019.
 * Part of ASI Alliance (2024) with SingularityNET, Ocean Protocol.
 *
 * Data from Fetch.ai LCD API (daily fetch):
 * - ~60 active validators
 * - Nakamoto Coefficient: ~5-6
 * - Tendermint/CometBFT consensus
 *
 * Token distribution (1.15B total supply):
 * - 6% Binance Launchpad (public sale)
 * - 20% Team
 * - 17% Foundation
 * - 25% Ecosystem development
 * - 32% Staking/network rewards
 * - Total insiders: ~37%
 *
 * Central team controls development and ASI Alliance governance.
 */

import { Project } from '@/lib/framework';
import { calculateProjectScores } from '@/lib/framework';

// Raw assessment values (null = N/A, not applicable)
const rawValues: Record<string, number | null> = {
  // Chain Score (A1-A5) - from Fetch.ai LCD API
  A1: 6,    // Nakamoto Coefficient ~5-6
  A2: 32,   // Top 5 validators control ~32%
  A3: 1,    // Single client (fetchd), Cosmos SDK
  A4: 65,   // Estimated ~65% cloud infrastructure
  A5: 60,   // ~60 active validators

  // Control Score (B1-B6)
  B1: 4,    // Fetch.ai Ltd very influential, Cambridge-based company
  B2: 3,    // Open source but Fetch.ai Ltd controls all core development
  B3: 4,    // fetch.ai - company controls brand
  B4: 5,    // Foundation treasury with some transparency
  B5: 3,    // Only ~60 validators, coordinated by team, de facto halt capability
  B6: 4,    // ASI merger, Cosmos SDK upgrades, team-driven roadmap

  // Fairness Score (C1-C3)
  C1: 37,   // ~37% to insiders (20% team + 17% foundation)
  C2: 37,   // Token concentration: ~37% held by team/foundation
  C3: 50,   // Governance: On-chain voting exists but team dominates
};

export const fetchai: Project = {
  id: 'fetchai',
  name: 'Fetch.ai',
  symbol: 'FET',
  category: 'L1',
  consensusType: 'pos',
  website: 'https://fetch.ai',
  description:
    'Cosmos SDK AI agent chain. Cambridge/DeepMind founders. ASI Alliance member (2024). Company-controlled development.',
  scores: calculateProjectScores(rawValues),
  lastUpdated: '2026-01-09',
  sources: [
    'https://rest-fetchhub.fetch.ai',
    'https://fetch.ai/tokenomics',
    'https://www.binance.com/en/research/projects/fetch-ai',
  ],
};
