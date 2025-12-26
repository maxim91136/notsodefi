/**
 * Monero (XMR) - Decentralization Assessment
 *
 * Privacy-focused cryptocurrency launched in 2014.
 * Proof of Work (RandomX) - CPU-friendly algorithm.
 * Fair launch with no premine, strong grassroots community.
 */

import { Project } from '@/lib/framework';
import { calculateProjectScores } from '@/lib/framework';

// Raw assessment values (null = N/A, not applicable)
const rawValues: Record<string, number | null> = {
  // Chain Score (A1-A4)
  A1: 2,    // Nakamoto coefficient ~2 (SupportXMR 44%, Nanopool 21% = 65%)
  A2: 82,   // Top 5 pools: SupportXMR 44%, Nanopool 21%, C3Pool 6%, Kryptex 6%, P2Pool 5%
  A3: 2,    // Monero daemon dominant, but monerod alternatives exist
  A4: 50,   // Estimated - Monero node tracking limited due to privacy

  // Control Score (B5-B9)
  B5: 10,   // No corporate owner - pure grassroots project
  B6: 8,    // Diverse maintainers, community-driven development
  B7: 9,    // No central entity controls brand, community-owned
  B8: null, // N/A - No protocol treasury
  B9: 10,   // No halt capability - truly unstoppable PoW chain

  // Fairness Score (C9-C10)
  C9: 0,    // 0% premine - fair launch
  C10: null, // N/A - No on-chain governance
};

export const monero: Project = {
  id: 'monero',
  name: 'Monero',
  symbol: 'XMR',
  category: 'L1',
  consensusType: 'pow',
  website: 'https://getmonero.org',
  description:
    'Privacy-focused cryptocurrency with RandomX (CPU-friendly) PoW. Fair launch, no premine, strong grassroots community.',
  scores: calculateProjectScores(rawValues),
  lastUpdated: '2025-12-24',
  sources: [
    'https://poolbay.io/crypto/23/monero',
    'https://blockchair.com/monero',
    'https://getmonero.org',
  ],
};
