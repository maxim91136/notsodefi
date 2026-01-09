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
  // Chain Score (A1-A5)
  A1: 2,    // Nakamoto coefficient ~2 (SupportXMR 44%, Nanopool 21% = 65%)
  A2: 82,   // Top 5 pools: SupportXMR 44%, Nanopool 21%, C3Pool 6%, Kryptex 6%, P2Pool 5%
  A3: 2,    // Monero daemon dominant, but monerod alternatives exist
  A4: 50,   // Estimated - Monero node tracking limited due to privacy

  /**
   * A5: Full Node Decentralization = 2500
   *
   * Number of independent full nodes validating the chain.
   * Source: https://monero.fail (Jan 2025)
   * Source: https://moneroj.net/nodecountb/
   *
   * Current estimates:
   * - monero.fail: ~2,000-3,000 reachable nodes
   * - Historical data shows ~2,500 average
   *
   * Note: Monero's privacy focus means many nodes run over Tor/I2P
   * and are not publicly reachable. Actual count likely higher.
   *
   * Comparison to Bitcoin: ~2,500 vs ~25,000 = 10x fewer nodes
   * Score: 6-7 (Good: 1,000-5,000 nodes)
   */
  A5: 2500,

  // Control Score (B1-B6)
  B1: 10,   // No corporate owner - pure grassroots project
  /**
   * B2: Repo/Protocol Ownership = 3
   *
   * Monero development is highly concentrated despite community ethos.
   * Source: https://github.com/monero-project/monero/graphs/contributors
   * Source: https://github.com/monero-project/meta/issues/921
   *
   * Critical facts:
   * - Top 2 contributors (fluffypony + moneromooo) = 55% of all commits
   * - Top 3 contributors = 67% of all commits (Bitcoin: 40%)
   * - Top 5 contributors = 73% of all commits (Bitcoin: 52%)
   * - Core Team is explicitly a "closed workgroup" - invite only
   * - Core Team controls: domains, website, GitHub, releases
   * - Anonymous developers = cannot verify independence
   * - 2023 proposal to disband Core Team cited single-point-of-failure risks
   *
   * More concentrated than Bitcoin with less transparency.
   */
  B2: 3,
  B3: 9,    // No central entity controls brand, community-owned
  B4: null, // N/A - No protocol treasury
  B5: 10,   // No halt capability - truly unstoppable PoW chain
  B6: 2,   // Privacy/ASIC-resistance upgrades but no consensus mechanism change

  // Fairness Score (C1-C3)
  C1: 0,    // 0% premine - fair launch
  C2: 0,    // 0% insider concentration - fair launch, no insider allocation
  C3: 0,    // 0% insider governance - no on-chain governance
};

export const monero: Project = {
  id: 'monero',
  name: 'Monero',
  symbol: 'XMR',
  category: 'L1',
  consensusType: 'pow',
  website: 'https://getmonero.org',
  description:
    'Privacy-focused cryptocurrency with RandomX (CPU-friendly) PoW. Fair launch, no premine, community-operated.',
  scores: calculateProjectScores(rawValues),
  lastUpdated: '2025-01-09',
  sources: [
    'https://poolbay.io/crypto/23/monero',
    'https://blockchair.com/monero',
    'https://getmonero.org',
    'https://monero.fail',
  ],
};
