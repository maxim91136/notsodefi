/**
 * TON (Toncoin) - Decentralization Assessment
 *
 * Originally developed by Telegram (2018), abandoned after SEC lawsuit.
 * Revived by community as TON Foundation.
 * PoS consensus with ~375 validators.
 * Nakamoto coefficient ~80 (validator side decent).
 *
 * CRITICAL: 85% of tokens mined by interconnected whales
 * affiliated with TON Foundation during IPoW phase (2020-2022).
 * Top 10 holders own 61%, top 100 control 92% of supply.
 */

import { Project } from '@/lib/framework';
import { calculateProjectScores } from '@/lib/framework';

// Raw assessment values (null = N/A, not applicable)
const rawValues: Record<string, number | null> = {
  // Chain Score (A1-A4)
  A1: 80,   // Nakamoto coefficient ~80 (validator-side decent)
  A2: 15,   // Top 5 validator concentration ~15% (estimated from NC)
  A3: 1,    // Single implementation (ton-blockchain/ton)
  A4: 50,   // Estimated cloud/datacenter percentage

  // Control Score (B1-B6)
  B1: 3,    // TON Foundation significant influence, but community growing
  B2: 2,    // GitHub org (ton-blockchain) controlled by TON Foundation
  B3: 2,    // TON Foundation owns ton.org, controls brand
  B4: 2,    // 85% mined by connected whales, insiders control vast resources
  B5: 7,    // Config changes require validator consensus, no single admin halt
  B6: 4,   // Revived from Telegram, some changes from original design

  // Fairness Score (C1-C2)
  C1: 85,   // 85% mined by interconnected whales affiliated with TON Foundation
  C2: 2,   // Top 10 holders own 61%, top 100 control 92% - massive concentration
};

export const ton: Project = {
  id: 'ton',
  name: 'TON',
  symbol: 'TON',
  category: 'L1',
  consensusType: 'pos',
  website: 'https://ton.org',
  description:
    'PoS chain originally developed by Telegram. Revived by TON Foundation. High token concentration from initial mining phase.',
  scores: calculateProjectScores(rawValues),
  lastUpdated: '2025-12-26',
  sources: [
    'https://tonscan.org',
    'https://chainspect.app/chain/ton',
    'https://tonvalidators.org',
    'https://medium.com/@whiterabbit_hq/ton-blockchain-a-group-of-related-whales-mined-85-of-ton-supply-2e3300cc93bc',
  ],
};
