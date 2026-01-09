/**
 * Algorand (ALGO) - Decentralization Assessment
 *
 * Pure Proof-of-Stake blockchain founded by Turing Award winner Silvio Micali.
 * Launched 2019 with academic cryptography backing.
 *
 * CRITICAL ISSUE: Relay nodes are PERMISSIONED and controlled by Algorand Foundation.
 */

import { Project } from '@/lib/framework';
import { calculateProjectScores } from '@/lib/framework';

// Raw assessment values (null = N/A, not applicable)
const rawValues: Record<string, number | null> = {
  // Chain Score (A1-A5)
  A1: 7,    // Nakamoto Coefficient higher than Ethereum 2.0 per research, but metric not publicly published
  A2: 3,    // CRITICAL: Relay nodes are PERMISSIONED, Foundation-controlled infrastructure
  A3: 2,    // go-algorand dominates, only 1-2 production implementations (low client diversity)
  A4: 55,   // Estimated 50-65% cloud/datacenter concentration (unverified)
  A5: 100,  // ~100 relay nodes (permissioned, Foundation-controlled)

  // Control Score (B1-B6)
  B1: 2,    // Foundation + Algorand Inc (Silvio Micali) controls all development/roadmap decisions
  B2: 3,    // go-algorand maintained exclusively by Algorand team, single-entity dominance
  B3: 6,    // Foundation owns trademark/brand, but strong community alternatives (AlgoExplorer, Pera, etc.)
  B4: 2,    // Foundation controls 500M+ ALGO treasury with unilateral spending (100M+ ALGO/quarter, no community vote)
  B5: 5,    // No direct protocol halt switch, but relay control enables practical network halt
  B6: 6,    // Core PPoS unchanged since launch, but governance/incentive structure modified over time

  // Fairness Score (C1-C3)
  C1: 60,   // 25% insider premine (Foundation 5%, Team/Investors 20%)
  C2: 30,   // Current insider holdings ~25-35% (decreasing as Foundation distributes treasury)
  C3: 50,   // Governance open to all ALGO holders, but only Foundation can propose votes
};

export const algorand: Project = {
  id: 'algorand',
  name: 'Algorand',
  symbol: 'ALGO',
  category: 'L1',
  consensusType: 'pos',
  website: 'https://algorand.co',
  description:
    'Pure Proof-of-Stake blockchain founded by Turing Award winner Silvio Micali. Uses cryptographic sortition for consensus.',
  scores: calculateProjectScores(rawValues),
  lastUpdated: '2026-01-08',
  sources: [
    'https://algorand.co/technology/pure-proof-of-stake',
    'https://developer.algorand.org/docs/run-a-node/setup/types/',
    'https://www.algorand.foundation/news/community-relay-node-program',
    'https://algorand.co/algorand-foundation/transparency',
    'https://algoexplorer.io',
  ],
  notes: [
    'CRITICAL: Relay nodes are PERMISSIONED and controlled by Algorand Foundation. While participation nodes are open to anyone, the relay infrastructure creates a centralized coordination point that can halt network communication.',
    'Foundation controls 500M+ ALGO treasury with unilateral spending authority (~100M ALGO per quarter). No community vote required for allocations.',
    'go-algorand is the dominant client implementation. Low client diversity compared to Bitcoin/Ethereum creates single point of failure risk.',
    'Only Foundation can propose governance votes. Community can vote on proposals but cannot initiate them.',
    'Nakamoto Coefficient research (July 2024) shows ALGO performs better than Ethereum 2.0, but Foundation does not publish this metric publicly.',
    'Token unlock completed November 2024. All 10B ALGO now in circulation. Insider holdings (~25-35%) decreasing as Foundation distributes treasury.',
  ],
};
