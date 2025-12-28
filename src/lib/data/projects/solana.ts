/**
 * Solana (SOL) - Decentralization Assessment
 *
 * High-performance blockchain, launched 2020.
 * Known for speed but criticized for centralization.
 */

import { Project } from '@/lib/framework';
import { calculateProjectScores } from '@/lib/framework';

// Raw assessment values (null = N/A, not applicable)
const rawValues: Record<string, number | null> = {
  // Chain Score (A1-A4)
  A1: 19,   // Nakamoto Coefficient ~19 (validators)
  A2: 35,   // Top 5 validators control ~35%
  A3: 1,    // 1 dominant client (Solana Labs client)
  A4: 75,   // ~75% nodes in cloud (AWS, etc.)

  // Control Score (B1-B6)
  B1: 3,    // Solana Labs/Foundation heavily dominant
  B2: 2,    // Almost entirely Solana Labs controlled
  B3: 2,    // Solana Labs controls brand, main frontend
  B4: 4,    // Foundation multisig, limited signers
  B5: 3,    // Has had coordinated halts, validators can be pressured
  B6: 6,   // Frequent upgrades, outages with restarts, "move fast" culture

  // Fairness Score (C1-C2)
  C1: 48,   // ~48% to team/VCs/foundation
  C2: 45,  // Significant insider control
};

export const solana: Project = {
  id: 'solana',
  name: 'Solana',
  symbol: 'SOL',
  category: 'L1',
  consensusType: 'pos',
  website: 'https://solana.com',
  description:
    'High-performance blockchain optimized for speed and low fees. Single-client architecture.',
  scores: calculateProjectScores(rawValues),
  lastUpdated: '2025-12-23',
  sources: [
    'https://solanabeach.io',
    'https://chainspect.app/chain/solana',
    'https://messari.io/asset/solana',
  ],
};
