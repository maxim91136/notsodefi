/**
 * Polkadot (DOT) - Decentralization Assessment
 *
 * Launched 2020, developed by Parity Technologies.
 * NPoS (Nominated Proof of Stake) consensus.
 * Sudo removed July 2020.
 *
 * KEY OBSERVATIONS:
 *
 * 1. NAKAMOTO COEFFICIENT DISCREPANCY
 *    Marketing states NC of 149-173 (counts individual validators).
 *    By operator: ~93 for 33% attack threshold.
 *    Binance runs 15+ validators controlling ~37% of staked DOT.
 *
 * 2. EXCHANGE CONCENTRATION
 *    Top 15 validators are ALL Binance (Jan 2025 Subscan data).
 *    NPoS "equalizes" stake per validator (~20.7M DOT each), operators
 *    run multiple validators.
 *
 * 3. TOKEN CONCENTRATION
 *    Top 50 wallets hold 50%+ of supply (CCN data).
 *    W3F, Parity, and early investors have significant governance weight.
 *
 * 4. DEVELOPMENT CONCENTRATION
 *    Parity Technologies controls core development.
 *    Alternative clients (Gossamer, Kagome, Smoldot) have low adoption.
 *
 * 5. FORKLESS UPGRADES
 *    Runtime upgrades happen regularly via governance.
 *    Different immutability model than traditional hard-fork chains.
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
   * A1: Nakamoto Coefficient = 93
   *
   * Marketing states NC of 149-173 (counts individual validators).
   * By operator, NC is ~93 for 33% attack threshold.
   *
   * Data (CCN, Subscan API Jan 2025):
   * - 93 validators needed to reach 33% of stake
   * - Binance runs 15+ validators = ~37% of staked DOT
   * - NPoS "equalizes" stake per validator (~20.7M DOT each)
   */
  A1: 93,

  /**
   * A2: Validator/Miner Concentration = 50%
   *
   * Top 5 OPERATORS control majority of stake (not individual validators).
   * Source: polkadot.api.subscan.io (Jan 2025)
   *
   * Binance alone:
   * - 15 validators in top 20
   * - Each with ~20.7M DOT stake
   * - Total: ~311M DOT = ~37% of ~840M total staked
   *
   * Top 5 operators (Binance, Kraken, etc.) likely control 50%+.
   * Individual validator metrics are meaningless when one operator
   * runs dozens of validators.
   */
  A2: 50,

  /**
   * A3: Client Diversity = 4
   *
   * Parity Technologies dominates with the Rust implementation.
   * Alternative clients exist but are minor/incomplete:
   * - Gossamer (Go) - ChainSafe, in development
   * - Kagome (C++) - Soramitsu, limited adoption
   * - Smoldot (light client) - not a full node
   *
   * Score: 4 (alternatives exist but Parity is >95% dominant)
   */
  A3: 4,

  /**
   * A4: Node Geography & Hosting = 55%
   *
   * Estimated ~55% of validators run in cloud/datacenter hosting.
   * High concentration in AWS, Hetzner, OVH.
   *
   * Source: Polkawatch, community estimates
   */
  A4: 55,

  /**
   * A5: Full Node Decentralization = 300
   *
   * Polkadot has ~297 active validators in the set.
   * Source: Subscan (Jan 2025)
   *
   * Note: NPoS limits active validator count.
   */
  A5: 300,

  // ===========================================================================
  // Control Score (B1-B6) - Governance & Power Structures
  // ===========================================================================

  /**
   * B1: Corporate/Foundation Capture = 4
   *
   * Web3 Foundation + Parity Technologies are primary decision makers.
   * - W3F funds development, holds significant DOT
   * - Parity Technologies builds core infrastructure
   * - OpenGov exists, insiders have significant voting weight
   */
  B1: 4,

  /**
   * B2: Repo/Protocol Ownership = 3
   *
   * Parity Technologies dominates core development.
   * Source: github.com/paritytech/polkadot-sdk
   *
   * - Parity employees are majority of maintainers
   * - Community contributions exist but Parity controls direction
   * - Alternative client teams have minimal influence on core protocol
   *
   * Score: 3 (almost only one company team)
   */
  B2: 3,

  /**
   * B3: Brand & Frontend Control = 4
   *
   * Web3 Foundation owns the Polkadot brand.
   * - polkadot.com, polkadot.network controlled by W3F
   * - Multiple frontends exist (Polkadot.js, Nova, etc.)
   * - But official branding/messaging is centralized
   *
   * Score: 4 (foundation holds brand & main frontend)
   */
  B3: 4,

  /**
   * B4: Treasury & Upgrade Keys = 7
   *
   * On-chain treasury governed by DOT holders via OpenGov.
   * - No multisig, direct token voting
   * - ~22M DOT in treasury
   * - But W3F/Parity/whales have outsized voting power
   *
   * Score: 7 (on-chain governance, but whale-dominated)
   */
  B4: 7,

  /**
   * B5: Admin Halt Capability = 10
   *
   * No sudo since July 2020.
   * - Sudo pallet removed via governance
   * - No single entity can halt/freeze chain
   * - Emergency actions require governance vote
   *
   * This is legitimately decentralized - no kill switch.
   * Score: 10 (truly unstoppable at protocol level)
   */
  B5: 10,

  /**
   * B6: Protocol Immutability = 4
   *
   * "Forkless upgrades" = frequent runtime changes via governance.
   * - Runtime upgrades happen regularly
   * - Consensus changes can happen without hard forks
   * - Less immutability than traditional chains
   *
   * This is by design (flexibility) but reduces decentralization.
   * Whoever controls governance controls the protocol rules.
   *
   * Score: 4 (multiple major changes, "move fast" culture)
   */
  B6: 4,

  // ===========================================================================
  // Fairness Score (C1-C3) - Launch & Distribution
  // ===========================================================================

  /**
   * C1: Launch Fairness / Premine = 30%
   *
   * ICO-funded project with significant insider allocation.
   * - ~30% to Web3 Foundation, Parity, founders
   * - ~58% sold in ICO to investors (2017)
   * - ~12% to treasury/ecosystem
   *
   * Not a fair launch. Heavy VC/insider presence.
   */
  C1: 30,

  /**
   * C2: Token Concentration = 50%
   *
   * Top 50 wallets hold 50%+ of supply.
   * Source: CCN analysis
   *
   * - W3F, Parity, early investors hold large bags
   * - Exchange wallets (Binance etc.) concentrate retail stake
   * - NOT 30% as previously claimed without sources
   */
  C2: 50,

  /**
   * C3: Governance Control = 35%
   *
   * OpenGov exists but whales dominate.
   * - W3F voting bloc significant
   * - Large DOT holders can swing votes
   * - Retail participation low due to complexity
   *
   * Better than no governance, but not truly decentralized.
   */
  C3: 35,
};

export const polkadot: Project = {
  id: 'polkadot',
  name: 'Polkadot',
  symbol: 'DOT',
  category: 'L1',
  consensusType: 'npos',
  website: 'https://polkadot.com',
  description:
    'NPoS blockchain. NC discrepancy: official 149 validators, ~93 unique operators. Binance runs 15+ validators (~37% stake). Top 50 wallets hold 50%+. Parity dominates development. Frequent forkless upgrades.',
  scores: calculateProjectScores(rawValues),
  lastUpdated: '2025-01-09',
  sources: [
    'https://polkadot.api.subscan.io - Validator data Jan 2025',
    'CCN - Nakamoto Coefficient 93, Top 50 wallets 50%+',
    'https://wiki.polkadot.com/docs/learn-nominator',
  ],
  notes: [
    'Polkadot markets a high Nakamoto Coefficient (149-173), but this counts individual validators, not operators. Binance alone runs 15+ validators controlling ~37% of stake.',
    'NPoS distributes stake per validator (~20.7M DOT each). Single operators can run multiple validators, concentrating control.',
    'Sudo removed July 2020 - no single entity can halt the chain.',
    'OpenGov provides on-chain governance. W3F/Parity voting blocs and whale concentration influence protocol direction.',
    'Forkless upgrades enable flexibility but reduce immutability. Governance controls rule changes.',
  ],
};
