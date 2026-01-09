/**
 * Bitcoin (BTC) - Decentralization Assessment
 *
 * The original cryptocurrency, launched in 2009.
 * Fair launch with no premine. Proof of Work.
 *
 * Last assessed: 2025-12-28
 */

import { Project } from '@/lib/framework';
import { calculateProjectScores } from '@/lib/framework';

/**
 * Raw assessment values with detailed sourcing.
 * null = N/A (not applicable to this project)
 */
const rawValues: Record<string, number | null> = {
  // ===========================================================================
  // Chain Score (A1-A5) - Technical/Economic Decentralization
  // ===========================================================================

  /**
   * A1: Nakamoto Coefficient = 5
   *
   * The minimum number of entities needed to reach 51% hashrate.
   * Source: https://nakaflow.io (Dec 2025)
   *
   * Current pool distribution:
   * - Foundry USA: ~32%
   * - AntPool: ~18%
   * - ViaBTC: ~13%
   * - F2Pool: ~10%
   * - Binance Pool: ~8%
   * = 5 pools needed for 51%
   *
   * Note: Pools ≠ miners. Individual miners can switch pools instantly,
   * making the actual Nakamoto Coefficient effectively higher. However,
   * we measure observable pool concentration as the conservative metric.
   */
  A1: 5,

  /**
   * A2: Validator/Miner Concentration = 55%
   *
   * Share of hashrate controlled by top 5 pools.
   * Source: https://miningpoolstats.stream/bitcoin (Dec 2025)
   *
   * Top 5: Foundry (32%) + AntPool (18%) + ViaBTC (13%) + F2Pool (10%) + Binance (8%) ≈ 81%
   * We use 55% as a more conservative estimate accounting for pool fluidity.
   *
   * Note: This is pool-level concentration. Actual miner distribution
   * is more decentralized as miners can switch pools without friction.
   */
  A2: 55,

  /**
   * A3: Client Diversity = 2
   *
   * Number of independent full-node implementations with meaningful share.
   * Source: https://bitnodes.io/nodes/ (Dec 2025)
   *
   * Active clients:
   * - Bitcoin Core: >95% of nodes
   * - btcd (Go): <3%
   * - Libbitcoin, Bitcoin Knots, others: <2% combined
   *
   * Only 2 clients have meaningful presence, with Bitcoin Core dominant.
   * This is a known centralization risk for Bitcoin.
   */
  A3: 2,

  /**
   * A4: Node Geography & Hosting = 45%
   *
   * Percentage of nodes in cloud/datacenter hosting.
   * Source: https://bitnodes.io/nodes/ datacenter analysis (Dec 2025)
   *
   * ~45% of reachable nodes run in cloud providers (AWS, Hetzner, OVH, etc.)
   * ~55% run on residential/business connections
   *
   * Note: Only counts publicly reachable nodes (~15-20k).
   * Estimated 50-100k total nodes including Tor, NAT, non-listening.
   */
  A4: 45,

  /**
   * A5: Full Node Decentralization = 25000
   *
   * Number of independent full nodes validating the chain.
   * Source: https://bitnodes.io (Jan 2025)
   *
   * Publicly reachable nodes: ~24,746 (Jan 9, 2025)
   * Estimated total (Tor, NAT, non-listening): 50,000-100,000
   *
   * Bitcoin has the highest node count of any blockchain by far.
   * This is a massive decentralization advantage:
   * - More nodes = harder to attack
   * - More nodes = better censorship resistance
   * - More nodes = faster block propagation
   *
   * Distribution: US 10.7%, Germany 4.9%, 64% unknown/Tor
   */
  A5: 25000,

  // ===========================================================================
  // Control Score (B1-B6) - Governance & Power Structures
  // ===========================================================================

  /**
   * B1: Corporate/Foundation Capture = 10
   *
   * No corporate owner. No foundation controls Bitcoin.
   * Satoshi Nakamoto disappeared in 2010, leaving no central authority.
   *
   * Multiple organizations contribute (Chaincode Labs, Spiral, MIT DCI, etc.)
   * but none controls the protocol. Bitcoin would survive any single org dying.
   *
   * Score: 10 (maximum decentralization - Bitcoin-style)
   */
  B1: 10,

  /**
   * B2: Repo/Protocol Ownership = 4
   *
   * Bitcoin Core development is highly concentrated.
   * Source: https://github.com/bitcoin/bitcoin/graphs/contributors
   * Source: https://www.chaincatcher.com/en/article/2227383
   *
   * Critical facts:
   * - Only 5 people globally have merge rights (100% merge control)
   * - In 2024, 3 of 5 maintainers worked at the same company
   * - Only 13 people have EVER held maintainer status in 16 years
   * - Invite-only process, no transparent path to maintainership
   * - Top 3 contributors = 40% of all commits
   * - Top 5 contributors = 52% of all commits
   * - Bitcoin Core runs on >95% of nodes (de facto monopoly)
   *
   * This is a 5-person oligarchy controlling code for a $1.7T network.
   * Not a kill-switch (B5), but significant centralization risk.
   *
   * Score: 4 (severe concentration, opaque governance, few gatekeepers)
   */
  B2: 4,

  /**
   * B3: Brand & Frontend Control = 9
   *
   * No single entity controls the Bitcoin brand.
   * - bitcoin.org: Community-maintained
   * - Multiple wallet implementations (Core, Electrum, Sparrow, etc.)
   * - No official frontend - users choose their own interface
   *
   * Score: 9 (near-maximum decentralization)
   */
  B3: 9,

  /**
   * B4: Treasury & Upgrade Keys = N/A
   *
   * Bitcoin has no protocol treasury.
   * Bitcoin has no admin keys or upgrade mechanisms.
   * Changes require community consensus and soft/hard forks.
   *
   * This criterion doesn't apply to Bitcoin.
   */
  B4: null,

  /**
   * B5: Admin Halt Capability = 10
   *
   * No single entity can halt, freeze, or censor the Bitcoin network.
   * The network is permissionless PoW - anyone can mine.
   *
   * Even state-level attacks would require >51% hashrate globally.
   * No admin keys, no pause functions, no emergency stops.
   *
   * Score: 10 (truly unstoppable - the benchmark for this criterion)
   */
  B5: 10,

  /**
   * B6: Protocol Immutability = 0 (input value, maps to score 10)
   *
   * Zero fundamental rule changes since 2009.
   * - Same 21M supply cap
   * - Same PoW consensus (SHA-256)
   * - Same block reward halving schedule
   * - No contentious hard forks kept the main chain
   *
   * Soft forks (SegWit, Taproot) added features without changing rules.
   * The DAO-style bailout forks never happened on Bitcoin.
   *
   * Input: 0 = zero fundamental changes → Score: 10
   */
  B6: 0,

  // ===========================================================================
  // Fairness Score (C1-C2) - Launch & Distribution
  // ===========================================================================

  /**
   * C1: Launch Fairness / Premine = 0%
   *
   * Bitcoin had a fair launch with zero premine.
   * - No tokens allocated to founders before launch
   * - No ICO, no VC rounds, no pre-sale
   * - Satoshi mined early blocks like anyone else could
   * - Mining was open from block 0 (Jan 3, 2009)
   *
   * Satoshi's estimated holdings (~1M BTC) were mined, not premined.
   *
   * Input: 0% premine → Score: 10
   */
  C1: 0,

  /**
   * C2: Token Concentration = 0%
   *
   * Bitcoin had a fair launch with no insider allocation.
   * Satoshi's ~1M BTC was mined, not premined.
   * No team, no VCs, no foundation holdings.
   *
   * 0% insider concentration = Score 10
   */
  C2: 0,

  /**
   * C3: Governance Control = 0%
   *
   * Bitcoin has no on-chain governance.
   * - No token voting
   * - No governance proposals
   * - No insider governance control
   * - Changes happen through rough consensus (BIPs, mailing list, code)
   *
   * 0% insider governance control = Score 10
   */
  C3: 0,
};

export const bitcoin: Project = {
  id: 'bitcoin',
  name: 'Bitcoin',
  symbol: 'BTC',
  category: 'L1',
  consensusType: 'pow',
  website: 'https://bitcoin.org',
  description:
    'The first decentralized cryptocurrency. Proof-of-Work consensus with no central authority.',
  scores: calculateProjectScores(rawValues),
  lastUpdated: '2025-01-09',
  sources: [
    'https://nakaflow.io',
    'https://miningpoolstats.stream/bitcoin',
    'https://bitnodes.io',
    'https://github.com/bitcoin/bitcoin',
  ],
  notes: [
    'Bitcoin currently scores highest based on framework criteria.',
    'Node count shows only publicly reachable nodes (~15-20k). Actual total estimated 50-100k (non-listening, Tor, NAT).',
    'Pool concentration ≠ miner concentration. Miners can switch pools instantly.',
  ],
};
