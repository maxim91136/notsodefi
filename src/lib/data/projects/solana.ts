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
  // Chain Score (A1-A5)
  A1: 19,   // Nakamoto Coefficient ~19 (validators)
  A2: 35,   // Top 5 validators control ~35%
  A3: 5,    // 2 clients: Agave (~79%) + Firedancer (~21% of stake, Jump Crypto)
  A4: 75,   // ~75% nodes in cloud (AWS, etc.)
  A5: 800,  // ~795 validators (down from 2500 in 2023, pruning process 2025)

  // Control Score (B1-B6)
  B1: 3,    // Solana Labs/Foundation heavily dominant
  B2: 2,    // Almost entirely Solana Labs controlled
  B3: 2,    // Solana Labs controls brand, main frontend
  B4: 4,    // Foundation multisig, limited signers
  B5: 2,    // Bug-crashes with coordinated restarts, no intentional halt mechanism
  B6: 6,   // Frequent upgrades, outages with restarts, "move fast" culture

  // Fairness Score (C1-C3)
  C1: 48,   // ~48% to team/VCs/foundation
  C2: 45,   // Token concentration: ~45% held by insiders
  C3: 100,  // Governance: No token governance. Foundation/Labs control all decisions.
};

export const solana: Project = {
  id: 'solana',
  name: 'Solana',
  symbol: 'SOL',
  category: 'L1',
  consensusType: 'pos',
  website: 'https://solana.com',
  description:
    'High-performance blockchain optimized for speed and low fees. Firedancer (Jump Crypto) now ~21% of stake.',
  scores: calculateProjectScores(rawValues),
  lastUpdated: '2025-12-29',
  sources: [
    'https://solanabeach.io',
    'https://chainspect.app/chain/solana',
    'https://messari.io/asset/solana',
  ],
};
