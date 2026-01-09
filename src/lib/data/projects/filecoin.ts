/**
 * Filecoin - Decentralization Assessment
 *
 * Decentralized storage network. Protocol Labs project, ICO 2017 ($257M raised).
 * Uses Proof-of-Replication and Proof-of-Spacetime instead of traditional PoS.
 *
 * Data from Filfox API (daily fetch):
 * - 1054 active miners
 * - Nakamoto Coefficient: 92 (excellent!)
 * - Top 5 power: ~3%, Top 10 power: ~5.6%
 * - 20,366 PiB total storage power
 *
 * Token distribution (2B max supply):
 * - 70% Mining rewards (miners earn over time)
 * - 15% Protocol Labs (inc. 4.5% team) - 6-year vesting
 * - 5% Filecoin Foundation - 6-year vesting
 * - 10% Fundraising (ICO + ecosystem)
 * - Total insiders: ~30%
 *
 * Control: Protocol Labs dominates development. Filecoin Foundation exists but limited.
 * No kill-switch - miners operate independently.
 */

import { Project } from '@/lib/framework';
import { calculateProjectScores } from '@/lib/framework';

// Raw assessment values (null = N/A, not applicable)
const rawValues: Record<string, number | null> = {
  // Chain Score (A1-A5) - from Filfox API
  A1: 92,   // Nakamoto Coefficient = 92 (API) - exceptional decentralization
  A2: 3,    // Top 5 miners only ~3% (API) - very distributed
  A3: 2,    // Lotus is dominant, but Venus exists
  A4: 60,   // Storage providers are distributed globally, some datacenter concentration
  A5: 1054, // ~1054 active storage providers (filfox.info API)

  // Control Score (B1-B6)
  B1: 4,    // Protocol Labs dominates, Foundation exists but less influential
  B2: 3,    // Open source but Protocol Labs dominates all core development
  B3: 4,    // filecoin.io - Protocol Labs controls brand
  B4: 5,    // Foundation treasury, some transparency
  B5: 10,   // No kill-switch - miners operate independently, no admin keys
  B6: 4,   // FIPs and network upgrades, Protocol Labs driven development

  // Fairness Score (C1-C3)
  C1: 30,   // ~30% to insiders (15% Labs + 5% Foundation + 10% ICO)
  C2: 30,   // Token concentration: ~30% held by Labs/Foundation/ICO investors
  C3: 60,   // Governance: FIPs exist but Protocol Labs dominates decision-making
};

export const filecoin: Project = {
  id: 'filecoin',
  name: 'Filecoin',
  symbol: 'FIL',
  category: 'Infrastructure',
  consensusType: 'pos', // Uses Proof-of-Spacetime, closest to PoS
  website: 'https://filecoin.io',
  description:
    'Decentralized storage network using Proof-of-Spacetime. Protocol Labs developed. No kill switch.',
  scores: calculateProjectScores(rawValues),
  lastUpdated: '2025-12-27',
  sources: [
    'https://filfox.info/api/v1/overview',
    'https://spec.filecoin.io/systems/filecoin_token/token_allocation/',
    'https://tokenomist.ai/filecoin',
    'https://chainbroker.io/projects/filecoin/',
  ],
};
