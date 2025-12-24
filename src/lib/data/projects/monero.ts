/**
 * Monero (XMR) - Decentralization Assessment
 *
 * Privacy-focused cryptocurrency, launched 2014.
 * Proof of Work (RandomX - ASIC resistant).
 * No premine, community-led development.
 */

import { Project } from '@/lib/framework';
import { calculateProjectScores } from '@/lib/framework';

// Raw assessment values (null = N/A, not applicable)
const rawValues: Record<string, number | null> = {
  // Chain Score (A1-A4)
  A1: 4,    // Mining pool concentration exists
  A2: 45,   // Better distributed than most PoW chains
  A3: 1,    // Monero Core (monerod) only production client
  A4: 20,   // Low cloud usage - RandomX favors home mining

  // Control Score (B5-B9)
  B5: 8,    // No foundation, community-led
  B6: 7,    // Core team but decentralized contribution process
  B7: 9,    // No trademark control, truly community-owned
  B8: null, // N/A - Community crowdfunding (CCS), no protocol treasury
  B9: 10,   // No halt capability - PoW, privacy makes coordination hard

  // Fairness Score (C9-C10)
  C9: 0,    // No premine, fair launch
  C10: null, // N/A - No formal governance, rough consensus
};

export const monero: Project = {
  id: 'monero',
  name: 'Monero',
  symbol: 'XMR',
  consensusType: 'pow',
  website: 'https://getmonero.org',
  description:
    'Privacy-focused cryptocurrency with ring signatures and stealth addresses. RandomX PoW (ASIC-resistant). No premine.',
  scores: calculateProjectScores(rawValues),
  lastUpdated: '2025-12-24',
  sources: [
    'https://localmonero.co/blocks',
    'https://miningpoolstats.stream/monero',
    'https://moneroj.net',
  ],
};
