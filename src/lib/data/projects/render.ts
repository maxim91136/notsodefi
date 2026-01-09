/**
 * Render Network (RENDER) - Decentralization Assessment
 *
 * Decentralized GPU computing network for 3D rendering, AI/ML workloads.
 * Originally developed by OTOY, now governed by Render Network Foundation.
 *
 * Token distribution (644M max supply):
 * - 65% Render User Development Fund (ecosystem/emissions)
 * - 25% Token sale purchasers
 * - 10% Team and advisors
 * - Total insiders: ~35%
 *
 * Uses Burn-Mint Equilibrium (BME) model since RNP-001.
 * Node operators provide GPU compute, earn RENDER tokens.
 * Migrated from Ethereum to Solana in 2023.
 *
 * Control: Foundation is non-profit but OTOY/RenderLabs remain influential.
 * Governance via RNP (Render Network Proposals) with community voting.
 */

import { Project } from '@/lib/framework';
import { calculateProjectScores } from '@/lib/framework';

// Raw assessment values (null = N/A, not applicable)
const rawValues: Record<string, number | null> = {
  // Chain Score (A1-A5)
  // Note: Render is not a blockchain - it's a compute network on Solana
  A1: null, // N/A - not a blockchain, node operators provide GPU compute
  A2: null, // N/A - no blockchain consensus/validators
  A3: 1, // Single client implementation (Render Network client)
  A4: 70, // Many node operators in datacenters, some consumer GPUs
  A5: null, // N/A - GPU compute network on Solana, no own blockchain

  // Control Score (B1-B6)
  B1: 4, // OTOY founded project, Foundation exists but RenderLabs (for-profit spinout) influential
  B2: 4, // Repos transferred to Foundation, but core team dominates development
  B3: 5, // Brand controlled by Foundation, reasonable separation from OTOY
  B4: 4, // 65% Development Fund managed by Foundation, emissions controlled via RNPs
  B5: 2, // Foundation/team can pause job routing, centralized control capability
  B6: 12, // Regular RNP upgrades (RNP-001, 003, 006, 013, 015, 019, 021...)

  // Fairness Score (C1-C3)
  C1: 35, // ~35% to insiders (10% team + 25% token sale)
  C2: 40, // Development Fund (65%) controlled by Foundation, moderate concentration
  C3: 50, // RNP governance with community voting, but Foundation review required
};

export const render: Project = {
  id: 'render',
  name: 'Render Network',
  symbol: 'RENDER',
  category: 'Infrastructure',
  consensusType: 'pos', // Uses Solana for token, compute network is off-chain
  website: 'https://rendernetwork.com',
  description:
    'Decentralized GPU computing network for 3D rendering and AI. Foundation-governed with RNP voting system.',
  scores: calculateProjectScores(rawValues),
  lastUpdated: '2026-01-06',
  sources: [
    'https://renderfoundation.com/',
    'https://know.rendernetwork.com/basics/token-metrics-summary',
    'https://know.rendernetwork.com/about-render-network-governance/render-network-proposal-rnp-system',
    'https://messari.io/report/understanding-the-render-network-a-comprehensive-overview',
  ],
  notes: [
    'Not a blockchain - GPU compute network using Solana for token/payments',
    'RenderLabs (2025 for-profit spinout) handles commercial AI integration',
  ],
};
