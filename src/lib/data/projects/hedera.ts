/**
 * Hedera (HBAR) - Decentralization Assessment
 *
 * Corporate blockchain run by a "Governing Council" of 29 major corporations
 * (Google, IBM, Boeing, etc.). All 29 consensus nodes are operated by Council
 * members - no one else can run nodes. Permissioned by design.
 *
 * Token distribution: 13.8% founders + 8% Swirlds + 4.4% employees + 17-22% SAFT
 * = ~45% insider allocation. Council controls treasury and all decisions.
 *
 * "Decentralization roadmap" promises permissionless Phase 3... someday.
 */

import { Project } from '@/lib/framework';
import { calculateProjectScores } from '@/lib/framework';

// Raw assessment values (null = N/A, not applicable)
const rawValues: Record<string, number | null> = {
  // Chain Score (A1-A4)
  A1: 10,   // NC ~10 (29 equal-weight nodes, need 1/3+1 = 10 to halt)
  A2: 17,   // Top 5 = 5/29 = ~17% (equal weight distribution among council)
  A3: 1,    // Single implementation (Hedera/Swirlds)
  A4: 100,  // 100% permissioned - only Council members can run nodes

  // Control Score (B1-B6)
  B1: 1,    // Swirlds/Hedera LLC controls all development
  B2: 1,    // Swirlds owns github.com/hashgraph, all code
  B3: 1,    // Hedera LLC owns hedera.com, all branding
  B4: 1,    // Council controls entire treasury, no community governance
  B5: 0,    // Council can halt network at will - explicit kill switch
  B6: 5,   // Council can push updates at will, "decentralization roadmap" pending

  // Fairness Score (C1-C2)
  C1: 45,   // 13.8% founders + 8% Swirlds + 4.4% employees + ~22% SAFT = ~45%
  C2: 1,   // No on-chain governance. Council decides everything. Zero community power.
};

export const hedera: Project = {
  id: 'hedera',
  name: 'Hedera',
  symbol: 'HBAR',
  category: 'L1',
  consensusType: 'federated',  // Hashgraph with permissioned council
  website: 'https://hedera.com',
  description:
    'Corporate blockchain theater. 29 nodes run by Google, IBM, Boeing etc. No one else allowed. Council controls everything. "Decentralization roadmap" is marketing. Kill switch active.',
  scores: calculateProjectScores(rawValues),
  lastUpdated: '2025-12-26',
  sources: [
    'https://hedera.com/council',
    'https://hedera.com/blog/decentralization-of-the-hedera-mainnet-consensus-node-hosting-and-stake-distribution',
    'https://www.mexc.fm/price/HBAR/tokenomics',
    'https://hedera.com/treasury-management-report',
  ],
};
