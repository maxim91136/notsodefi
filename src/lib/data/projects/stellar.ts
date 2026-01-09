/**
 * Stellar (XLM) - Decentralization Assessment
 *
 * Federated Byzantine Agreement (FBA) consensus.
 * Only 7 tier-1 organizations control consensus.
 * SDF runs 3 validators directly - 3 failures halts network.
 *
 * CRITICAL: SDF holds 17.3B XLM (34.7% of supply).
 * No on-chain governance - XLM has no voting rights.
 * 100% premined, SDF controls distribution.
 */

import { Project } from '@/lib/framework';
import { calculateProjectScores } from '@/lib/framework';

// Raw assessment values (null = N/A, not applicable)
const rawValues: Record<string, number | null> = {
  // Chain Score (A1-A5)
  A1: 4,    // Nakamoto coefficient ~3-4 (7 tier-1 orgs, 3 failures = halt)
  A2: 80,   // Top 5 concentration ~80% (7 orgs control everything)
  A3: 1,    // Single implementation (stellar-core)
  A4: 50,   // Estimated cloud/datacenter percentage
  A5: 30,   // ~30 validators, only 7 tier-1 organizations

  // Control Score (B1-B6)
  B1: 2,    // SDF controls development, grants, ecosystem
  B2: 2,    // SDF owns stellar/stellar-core GitHub
  B3: 2,    // SDF owns stellar.org, all branding
  B4: 2,    // SDF holds 17.3B XLM (34.7% of total supply)
  B5: 3,    // Network survived SDF validator outage (2021). Goal: 13 tier-1 by Q4 2025.
  B6: 3,   // Some protocol upgrades but FBA consensus unchanged since 2015

  // Fairness Score (C1-C3)
  C1: 35,   // SDF holds 35% of supply; 100% premined
  C2: 35,   // Token concentration: SDF holds 35% of total supply
  C3: 100,  // Governance: No on-chain governance. XLM has no voting rights. SDF decides.
};

export const stellar: Project = {
  id: 'stellar',
  name: 'Stellar',
  symbol: 'XLM',
  category: 'L1',
  consensusType: 'federated',
  website: 'https://stellar.org',
  description:
    'Federated Byzantine Agreement consensus. SDF controls development and significant supply. No on-chain governance.',
  scores: calculateProjectScores(rawValues),
  lastUpdated: '2026-01-06',
  sources: [
    'https://stellar.org',
    'https://dashboard.stellar.org',
    'https://horizon.stellar.org',
    'https://developers.stellar.org/docs/validators',
  ],
};
