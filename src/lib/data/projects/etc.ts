/**
 * Ethereum Classic (ETC) - Decentralization Assessment
 *
 * The original Ethereum chain that continued after the 2016 DAO Fork.
 * Proof of Work (Etchash) with "Code is Law" philosophy.
 * Maintained by ETC Cooperative and community.
 */

import { Project } from '@/lib/framework';
import { calculateProjectScores } from '@/lib/framework';

// Raw assessment values (null = N/A, not applicable)
const rawValues: Record<string, number | null> = {
  // Chain Score (A1-A5)
  A1: 4,    // ~4-5 pools needed for 51% hashrate
  A2: 55,   // Top pools control ~55% of hashrate
  A3: 2,    // Core-Geth dominant (~90%), Besu exists but low usage
  A4: 40,   // Moderate datacenter percentage, mining pools distributed globally
  A5: 250,  // ~250 full nodes (etcnodes.org estimate)

  // Control Score (B1-B6)
  B1: 7,    // ETC Cooperative/Labs exist but limited control, community-driven
  B2: 4,    // Core-Geth team dominant, Besu maintained by ChainSafe/ETC Coop - few gatekeepers
  B3: 8,    // No trademark monopoly, community-owned brand
  B4: 8,    // No protocol-level treasury, foundations are separate entities
  B5: 10,   // No admin controls - pure PoW chain like Bitcoin
  B6: 9,   // THE immutable chain - refused DAO fork, "Code is Law" ethos

  // Fairness Score (C1-C3)
  C1: 15,   // Same as ETH - 72M presale in 2014 (~15% of current supply)
  C2: 15,   // Token concentration: ~15% from original ETH presale
  C3: null, // Governance: N/A - ECIP rough consensus, no token voting
};

export const etc: Project = {
  id: 'etc',
  name: 'Ethereum Classic',
  symbol: 'ETC',
  category: 'L1',
  consensusType: 'pow',
  website: 'https://ethereumclassic.org',
  description:
    'The original Ethereum chain that continued after the 2016 DAO Fork. Maintains "Code is Law" philosophy with immutable ledger and Proof-of-Work consensus.',
  scores: calculateProjectScores(rawValues),
  lastUpdated: '2025-12-28',
  sources: [
    'https://ethereumclassic.org',
    'https://etccooperative.org',
    'https://etc.blockscout.com',
    'https://miningpoolstats.stream/ethereumclassic',
  ],
};
