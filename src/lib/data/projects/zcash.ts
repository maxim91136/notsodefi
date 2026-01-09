/**
 * Zcash (ZEC) - Decentralization Assessment
 *
 * Privacy-focused cryptocurrency, launched in 2016.
 * Proof of Work (Equihash) similar to Bitcoin.
 * Founded by Electric Coin Company (ECC).
 */

import { Project } from '@/lib/framework';
import { calculateProjectScores } from '@/lib/framework';

// Raw assessment values (null = N/A, not applicable)
const rawValues: Record<string, number | null> = {
  // Chain Score (A1-A5)
  A1: 3,    // Lower Nakamoto coefficient due to ASIC mining concentration
  A2: 60,   // Top pools control ~60% of hashrate
  A3: 2,    // zcashd and zebrad clients (zcashd deprecated 2025, migrating to zebrad)
  A4: 40,   // Moderate cloud/datacenter percentage
  A5: 150,  // ~130-170 full nodes (Zcash forum Mar 2024)

  // Control Score (B1-B6)
  B1: 5,    // ECC has significant but not total control
  B2: 4,    // Development split between ECC and Zcash Foundation - two entities control all
  B3: 6,    // Trademark shared between ECC and Foundation
  B4: 4,    // Dev fund (20% block reward) controlled by orgs
  B5: 10,   // No halt capability - PoW chain like Bitcoin
  B6: 3,   // Sapling/Orchard upgrades, dev fund changes, but PoW consensus stable

  // Fairness Score (C1-C3)
  C1: 10,   // 10% founders reward (2016-2020), now 20% dev fund
  C2: 30,   // Token concentration: ~30% accumulated by ECC/Foundation via dev fund
  C3: 60,   // Governance: ZIP process exists, but ECC/Foundation dominate decisions
};

export const zcash: Project = {
  id: 'zcash',
  name: 'Zcash',
  symbol: 'ZEC',
  category: 'L1',
  consensusType: 'pow',
  website: 'https://z.cash',
  description:
    'Privacy-focused cryptocurrency using zk-SNARKs. Proof-of-Work (Equihash) with dev fund from block rewards.',
  scores: calculateProjectScores(rawValues),
  lastUpdated: '2025-12-23',
  sources: [
    'https://electriccoin.co',
    'https://zfnd.org',
    'https://miningpoolstats.stream/zcash',
  ],
  notes: [
    'UPDATE (January 8, 2026): Electric Coin Company\'s entire core development team resigned following a board dispute. ZEC dropped 20% in 4 hours. This validates the SPOF risk documented in our analysis - when one of the "two orgs" left, the redundancy was significantly compromised.'
  ],
};
