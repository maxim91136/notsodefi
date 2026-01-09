/**
 * Figure HELOC / Provenance (FIGR_HELOC) - Decentralization Assessment
 *
 * Tokenized Home Equity Lines of Credit on Provenance Blockchain.
 * Provenance is an L1 blockchain built by Figure Technologies (Nasdaq: FIGR).
 * Founded 2018 by Mike Cagney (ex-SoFi CEO).
 *
 * KEY FACTS:
 * - Figure Asset Corp controls 57.7% of HASH tokens
 * - Provenance Foundation: 5.6%
 * - Free float: only 9.5% (~$171M)
 * - 64 active validators (Q2 2024)
 * - $15.3B tokenized assets (mostly Figure's own HELOCs)
 * - Single trading venue: Figure Markets
 *
 * SECURITIES CLASSIFICATION:
 * - FIGR_HELOC tokens are securities under U.S. law
 * - Restricted to institutional/accredited investors
 * - Not available to retail crypto investors
 * - SEC compliance requirements
 *
 */

import { Project } from '@/lib/framework';
import { calculateProjectScores } from '@/lib/framework';

// Raw assessment values (null = N/A, not applicable)
const rawValues: Record<string, number | null> = {
  // Chain Score (A1-A5) - Provenance Blockchain metrics
  A1: 10,   // ~64 validators but Figure's 57.7% stake means ~6-10 could halt consensus
  A2: 42,   // Figure Asset Corp: 57.7%, Foundation: 5.6% = 63.3% insider control
  A3: 1,    // Single implementation (Provenance node software by Figure)
  A4: 30,   // US-focused financial services chain, high datacenter concentration
  A5: 64,   // 64 active validators on Provenance L1 (Q2 2024)

  // Control Score (B1-B6)
  B1: 1,    // Figure Technologies Inc. (public company, Nasdaq: FIGR)
  B2: 1,    // Figure controls provenance-io GitHub org
  B3: 1,    // Figure owns Provenance brand, all marketing, trademark
  B4: 1,    // Figure controls 57.7% tokens + all loan origination
  B5: 3,    // RWA compliance likely requires freeze capability, but no public kill-switch documented
  B6: 2,    // Cosmos SDK governance, but Figure's 57.7% can pass any proposal

  // Fairness Score (C1-C3)
  C1: 100,  // All FIGR_HELOC tokens issued by Figure, HASH 57.7% insider-held
  C2: 58,   // Token concentration: Figure 57.7% + Foundation 5.6% = 63.3%
  C3: 58,   // Governance: Figure can pass any proposal with 57.7% majority
};

export const figrHeloc: Project = {
  id: 'figr-heloc',
  name: 'Figure / Provenance',
  symbol: 'FIGR_HELOC',
  category: 'Infrastructure',
  consensusType: 'pos',
  website: 'https://provenance.io',
  description:
    'Tokenized HELOCs on Figure\'s Provenance blockchain. Figure (Nasdaq: FIGR) controls 57.7% of HASH tokens. Securities-classified, institutional-only. Enterprise blockchain, not DeFi.',
  scores: calculateProjectScores(rawValues),
  lastUpdated: '2025-01-09',
  sources: [
    'https://provenance.io/blog/Q2-2024-Provenance-Blockchain-Update',
    'https://www.provenance.io/whitepaper-tokenomics',
    'https://www.coingecko.com/en/coins/figure-heloc',
    'https://explorer.provenance.io/validators',
    'https://panteracapital.com/blockchain-letter/figure-ipo-where-capital-markets-meet-blockchain/',
  ],
};
