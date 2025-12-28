# Changelog

All notable changes to the NotSoDeFi.com Framework.

## [0.30.0-rc1] - 2025-12-28

### Improved
- **README** - Mission statement and philosophy
  - "Why This Exists" – the decentralization problem
  - Philosophy section (transparency, Bitcoin benchmark)
  - Contributing guidelines

## [0.29.0-rc1] - 2025-12-28

### Added
- **Hero Logo** - New Mjölnir logo with runic circle
  - Replaces text-based hero title
  - Nordic theme: "smashing DeFi illusions"

## [0.28.0-rc1] - 2025-12-28

### Added
- **Ethereum Classic (ETC)** - 37th project
  - "Code is Law" - the original Ethereum chain
  - PoW (Etchash) consensus
  - Blockscout API integration for live data
  - B10 Protocol Immutability: 9 (refused DAO fork)

## [0.27.0-rc1] - 2025-12-28

### Changed
- **Rebrand** - NotSoDeFi → NotSoDeFi.com
  - Updated all page titles, metadata, and UI logos
  - Header and Hero now show NotSo**DeFi**.com

### Fixed
- **Trends** - Fixed KV key mismatches breaking sparklines for 4 projects
  - ada → cardano, avax → avalanche, tao → bittensor, trx → tron
- **HBAR** - Shortened source URL for mobile display

## [0.26.0-rc1] - 2025-12-28

### Added
- **B10 Protocol Immutability** - 12th criterion measuring fundamental rule changes
  - Consensus mechanism changes (PoW→PoS)
  - Monetary policy changes
  - Contentious forks
  - Bitcoin scores 10 (immutable since 2009)
  - Ethereum scores 4-6 (DAO Fork + The Merge)
  - Stablecoins get null (not protocols)

### Improved
- **Code Hardening** - Fixed 6 lint errors
  - Moved SortIcon component outside render function
  - Removed unused imports across 5 files
  - Fixed anonymous default export in archive worker

### Changed
- **Framework** - Now 12 criteria (was 11)
  - Control Score: B5-B10 (was B5-B9)

## [0.25.0-rc1] - 2025-12-28

### Added
- **Lido (LDO)** - 36th project (Liquid Staking)
  - Controls ~25% of all staked ETH
  - ~30 permissioned node operators
  - 64% founder allocation, plutocratic governance
  - Upgradeable contracts, dual governance with stETH veto
  - Score: ~3.5 (significant centralization risk)
  - Data: DefiLlama + Lido API (TVL, APR, fees, treasury)

- **DAI Data Pipeline** - Complete data fetcher for MakerDAO stablecoin
  - DefiLlama Stablecoins API integration
  - Supply tracking across chains

### Improved
- **Data Pipeline Coverage** - Now 36/36 projects have live data pipelines

## [0.24.0-rc2] - 2025-12-27

### Fixed
- **Stablecoin Pages** - Fixed client-side crash on USDT/USDC pages (different data structure)
- **Aave Fairness Score** - Corrected C10 from 2 to 75 (4.5 → 3.8)

### Added
- **Stablecoin Display** - Show Total Supply and Top Chains for USDT/USDC

## [0.24.0-rc1] - 2025-12-27

### Added
- **Arbitrum (ARB)** - 35th project (L2)
  - Largest L2 by TVL ($16.78B)
  - Centralized sequencer (Arbitrum Foundation)
  - Security Council 9/12 multisig
  - 44% insider allocation (27% team + 17.5% investors)
  - Score: ~3.8 (L2 with centralization concerns)
  - Data: [Arbitrum RPC](https://arb1.arbitrum.io/rpc)

## [0.23.0-rc2] - 2025-12-27

### Added
- **Custom Favicon** - NSD red/white GameStop-style icon
- **Apple Touch Icon** - iOS home screen icon

### Removed
- **Next.js Boilerplate** - Removed default Vercel/Next.js SVGs from public/

## [0.23.0-rc1] - 2025-12-27

### Performance
- **Remove recharts** - Replaced with lightweight SVG sparklines (~150-200KB bundle size saved)
- **Batch Sparkline API** - New `/api/sparklines` endpoint reduces 280 API calls to 1
- **Request Caching** - 5-minute in-memory cache for metrics with request deduplication
- **Request Deduplication** - Prevents duplicate API calls when multiple components request same data

### Added
- **Centralized Project Config** - New `src/lib/config/projects.ts` as single source of truth
- **ErrorBoundary Component** - Graceful error handling for React components
- **formatTimeAgo Utility** - Centralized relative time formatting

### Improved
- **Accessibility** - ARIA labels for status indicators and compare checkboxes
- **Code Quality** - Removed duplicate KV key mappings from components

## [0.22.0-rc1] - 2025-12-27

### Fixed
- **Table Row Click** - Entire row now clickable for navigation (not just individual cells)

## [0.21.0] - 2025-12-27

### Added
- **Sparkline Charts** - 7-day score trend visualization in project table
- **Comparison Mode** - Compare up to 3 projects side-by-side
- **R2 Historical Storage** - Daily metric snapshots with `totalScore`

### Changed
- **Fetch Scripts** - All 34 scripts include `totalScore` for trend tracking
- **Data Workflows** - All 33 workflows now have `workflow_dispatch`
- **Archive Worker** - Runs daily at 6:00 UTC

### Fixed
- **Fetch Scripts** - Added missing `data/` directory creation

## [0.20.0-rc1] - 2025-12-27

### Added
- **Sparkline Charts** - 7-day trend visualization in project table
  - Uses recharts library
  - Shows "—" until data is collected (collecting x/7 days)
  - Hidden on mobile (md: breakpoint)
- **Comparison Mode** - Compare up to 3 projects side-by-side
  - Checkbox selection in table and mobile cards
  - Fixed comparison panel at bottom
  - Shows Total, Chain, Control, Fairness scores

### Changed
- **"Leaderboard" → "All Projects"** - Clearer terminology
- **Table Navigation** - Checkbox column separated from row click

## [0.19.0-rc1] - 2025-12-27

### Added
- **Filecoin (FIL)** - 34th project (Infrastructure)
  - Nakamoto Coefficient: 92, Top 5: 3%
  - Data: [Filfox API](https://filfox.info)
  - Score: 6.60 (#5 ranking)

## [0.18.0-rc6] - 2025-12-27

### Added
- **R2 Historical Storage** - Daily metric snapshots
  - Cloudflare Worker `notsodefi-archive` with cron trigger
  - `/api/history?project=xxx&date=YYYY-MM-DD` endpoint
  - Structure: `/{project}/{YYYY-MM-DD}.json`
  - Auto-deploy workflow for worker updates

### Changed
- **README** - Added API endpoints and workers documentation

## [0.18.0-rc5] - 2025-12-27

### Added
- **R2 Historical Storage** - Daily metric snapshots (timing fix)

## [0.18.0-rc3] - 2025-12-27

### Changed
- **Workflow Schedules** - Optimized for overnight execution
  - 5-minute intervals between all 32 workflows
  - Start: 01:00 UTC (02:00 CET / 03:00 CEST)
  - End: 03:35 UTC (04:35 CET / 05:35 CEST)

## [0.18.0-rc2] - 2025-12-27

### Changed
- **README** - Updated architecture documentation
  - Data flow: GitHub Actions → KV → `/api/metrics`
  - Project structure with `hooks/` and `functions/`
  - Tech stack: Cloudflare Pages + KV + Functions

## [0.18.0-rc1] - 2025-12-27

### Added
- **Cloudflare KV Integration** - Live data without git commits
  - Data workflows push to KV instead of committing
  - `/api/metrics?project=xxx` API endpoint
  - `/api/all-metrics` API for pipeline status
  - Client-side fetching with `useMetrics` hook

### Changed
- **LiveNetworkData** - Now fetches from KV API
- **ApiStatusCard** - Now fetches from KV API
- **32 Workflows** - All updated to push to KV

### Removed
- `data/*.json` files from repository
- Git commits for data updates

### Infrastructure
- KV Namespace: `notsodefi-data`
- Functions: `/functions/api/metrics.js`, `/functions/api/all-metrics.js`
- Hooks: `src/hooks/useMetrics.ts`

## [0.17.0-rc1] - 2025-12-27

### Added
- **Mobile Hamburger Menu** - Navigation for mobile devices
  - Hamburger icon appears on <640px screens
  - Dropdown with Projects, Calculator, GitHub links
  - Menu closes automatically on navigation

- **Mobile Card Layout** - Cards instead of table on mobile
  - Full project info in compact card format
  - Shows rank, name, score, category, consensus, subscores
  - Replaces horizontal table scrolling

### Changed
- **Dynamic Project Counter** - Header now shows filtered count
  - Default: "33 projects"
  - With filters: "X of 33 projects"
  - Updates live as filters change

## [0.16.0-rc2] - 2025-12-27

### Added
- **Score Tooltips** - Hover über Scores zeigt Breakdown
  - Headers erklären Kategorien und Gewichtung
  - Total-Score zeigt Berechnung (z.B. "5.2×40% + 4.8×40% + 6.1×20%")
  - Subscores zeigen enthaltene Kriterien

## [0.16.0-rc1] - 2025-12-27

### Changed
- **Data Pipeline Status UX overhaul**
  - Compact badge overview always visible (chain + status dot)
  - Hover tooltips show source + last update time
  - Collapsible details section for full info
  - Issues shown prominently in red when present

## [0.15.0-rc8] - 2025-12-27

### Fixed
- Updated README consensus types list (added all 33 projects)
- Added NEAR, APT, POL, INJ to Data Pipeline Status

## [0.15.0-rc7] - 2025-12-27

### Added
- **Injective (INJ)** - 33rd project
  - Score: **4.7** (No Kill-Switch)
  - 50 validators, Nakamoto Coefficient 5
  - Top 5 stake: ~34%, Top 10 stake: ~51%
  - Cosmos SDK DeFi chain
  - Daily workflow via Injective LCD API

### Scoring - Injective
| Criterion | Value | Score | Notes |
|-----------|-------|-------|-------|
| A1 | 5 | 2.6/10 | Nakamoto Coefficient 5 |
| A2 | 34% | 6.6/10 | Top 5 validators control ~34% |
| A3 | 1 | 3.0/10 | Single client (Cosmos SDK) |
| B5 | 4 | 4.0/10 | Injective Labs + VC influence (Binance, Jump) |
| B9 | 7 | 6.3/10 | No kill-switch, Cosmos governance |
| C9 | 42% | 3.9/10 | Team 20% + Private 20% + Advisors 2% |

## [0.15.0-rc6] - 2025-12-27

### Added
- **Polygon (POL)** - 32nd project, first L2
  - Score: **4.5** (No Kill-Switch)
  - 104 validators (max 105 hardcoded)
  - Nakamoto Coefficient: 4 (very centralized)
  - Top 5 stake: ~40%, Top 10 stake: ~63%
  - Daily workflow via Polygon Staking API

### Fixed
- Filter now preserves global rankings instead of re-numbering

### Scoring - Polygon
| Criterion | Value | Score | Notes |
|-----------|-------|-------|-------|
| A1 | 4 | 2.3/10 | Nakamoto Coefficient 4 - only 4 validators for 33% |
| A2 | 40% | 6.0/10 | Top 5 validators control ~40% |
| A3 | 1 | 3.0/10 | Single client (Heimdall/Bor) |
| B5 | 4 | 4.0/10 | Polygon Labs very influential |
| B9 | 6 | 5.3/10 | No kill-switch, but 105 max validators limiting |
| C9 | 24% | 6.4/10 | Team 16% + Advisors 4% + Seed ~4% |

## [0.15.0-rc5] - 2025-12-26

### Added
- **Aptos (APT)** - 31st project
  - Score: **5.0** (No Kill-Switch)
  - 136 validators, Nakamoto Coefficient 18
  - Top 5 stake: 12%, Top 10 stake: 22%
  - Move-based L1 from ex-Meta Diem team
  - Daily workflow via Aptos REST API

### Scoring - Aptos
| Criterion | Value | Score | Notes |
|-----------|-------|-------|-------|
| A1 | 18 | 5.3/10 | Nakamoto Coefficient from API |
| A2 | 12% | 9.0/10 | Top 5 validators control 12% |
| A3 | 1 | 3.0/10 | Single client (aptos-core) |
| B5 | 4 | 4.0/10 | Aptos Labs/Foundation very influential |
| B9 | 7 | 6.3/10 | No kill-switch, coordinated validator set |
| C9 | 49% | 3.4/10 | Team 19% + Foundation 16.5% + Investors 13.5% |

## [0.15.0-rc4] - 2025-12-26

### Added
- **NEAR Protocol** - 30th project
  - Score: **5.7** (No Kill-Switch)
  - 384 validators, Nakamoto Coefficient 10
  - Top 5 stake: 21%, Top 10 stake: 34%
  - Nightshade sharding, stateless validation
  - Daily workflow via NEAR RPC API

### Scoring - NEAR
| Criterion | Value | Score | Notes |
|-----------|-------|-------|-------|
| A1 | 10 | 4.0/10 | Nakamoto Coefficient from API |
| A2 | 21% | 8.3/10 | Top 5 validators control 21% |
| A3 | 1 | 3.0/10 | Single client (nearcore) |
| B5 | 5 | 5.0/10 | NEAR Foundation influential |
| B9 | 8 | 7.3/10 | No kill-switch |
| C9 | 29% | 5.4/10 | Team 8.5% + VCs 14.4% + Foundation 6% |

## [0.15.0-rc3] - 2025-12-26

### Added
- **DAI (MakerDAO)** - 29th project
  - Score: **5.5** (No Kill-Switch!)
  - $8.4B overcollateralized stablecoin
  - MKR governance, cannot freeze individual addresses
  - Emergency Shutdown exists but requires 50K MKR vote
  - ~35% USDC collateral = indirect Circle dependency

### Scoring - DAI
| Criterion | Value | Score | Notes |
|-----------|-------|-------|-------|
| A1 | 8 | 3.7/10 | ~8-10 major MKR holders for 51% voting |
| A2 | 35% | 7.7/10 | Top holders (a16z, delegates) |
| B5 | 6 | 6.0/10 | DAO governance, Sky has influence |
| B9 | 8 | 7.3/10 | NO freeze capability - only protocol-wide Emergency Shutdown |
| C9 | 40% | 4.2/10 | Maker Foundation + early investors |

**The "Good" Stablecoin:**
- Cannot freeze YOUR address (unlike USDT/USDC)
- 150% overcollateralized, not fiat-backed
- Open source smart contracts
- But: USDC as collateral creates indirect Circle dependency

## [0.15.0-rc2] - 2025-12-26

### Added
- **USD Coin (USDC)** - 28th project
  - Score: **2.0** (Kill-Switch Active)
  - $76B stablecoin by Circle (NYSE: CRCL)
  - Same kill-switch as Tether - can freeze any address
  - Daily workflow at 14:30 UTC via DefiLlama

### Scoring - USDC
| Criterion | Value | Score | Notes |
|-----------|-------|-------|-------|
| A1 | 1 | 0/10 | Nakamoto Coefficient = 1 |
| A2 | 100% | 0/10 | Single entity concentration |
| B5 | 1 | 0/10 | Circle = total corporate control |
| B9 | 0 | **KILL** | Can freeze ANY address |
| C9 | 100% | 0/10 | 100% minted by Circle |

**The "Good Cop":**
- $76B controlled by Circle (publicly traded NYSE: CRCL)
- US-regulated but same freeze capability as Tether
- Frozen $109M across 372 addresses (AMLBot Dec 2025)
- Depegged during SVB collapse (March 2023)
- Centre Consortium dissolved - Circle now sole issuer

## [0.15.0-rc1] - 2025-12-26

### Added
- **Stablecoin Category** - New project category for stablecoins
  - Green "Stable" badge in project table
  - Tether (USDT) as first stablecoin project

- **Tether (USDT)** - 27th project
  - Score: **2.0** (Kill-Switch Active)
  - Control Score: 1.10 (near minimum)
  - $186B supply tracked via DefiLlama Stablecoins API
  - Daily workflow at 14:00 UTC

- **Filter UI** - Interactive filters above leaderboard
  - Category filters (L1, DEX, Lending, Oracle, Stable)
  - Consensus filters (PoW, PoS, NPoS, DPoS, Hybrid, Federated)
  - Project counter shows filtered/total
  - Clear button to reset filters

### Scoring - Tether
| Criterion | Value | Score | Notes |
|-----------|-------|-------|-------|
| A1 | 1 | 0/10 | Nakamoto Coefficient = 1 |
| A2 | 100% | 0/10 | Single entity concentration |
| B5 | 1 | 0/10 | Total corporate control |
| B9 | 0 | **KILL** | Can freeze ANY address |
| C9 | 100% | 0/10 | 100% minted by Tether |

**The Monster Category:**
- $186B controlled by one company (Tether Ltd/iFinex)
- 7th largest holder of US Treasuries globally
- Same company as Bitfinex exchange
- Fined $41M by CFTC for lying about reserves
- Can and does freeze addresses on request

## [0.14.0] - 2025-12-26

### Added
- **Project Categories** - New column in project table
  - L1 (Layer 1 blockchains)
  - L2 (Layer 2 scaling solutions)
  - DEX (Decentralized exchanges)
  - Lending (Lending protocols)
  - Oracle (Oracle networks)
  - Infrastructure (Infrastructure providers)

- Color-coded badges for each category
- All 26 projects categorized (23 L1, 1 DEX, 1 Lending, 1 Oracle)

## [0.13.0] - 2025-12-26

### Added
- **Uniswap (UNI)** - 25th project with full data pipeline
  - DefiLlama API fetcher (TVL, volume, fees, treasury)
  - Daily workflow at 12:00 UTC
  - #1 DEX with immutable contracts

- **Hedera (HBAR)** - 26th project with full data pipeline
  - Hedera Mirror Node API fetcher (nodes, stake, supply)
  - Daily workflow at 13:00 UTC
  - Corporate blockchain run by Governing Council

### Scoring
| Project | Score | Notes |
|---------|-------|-------|
| Uniswap | 4.60 | B9=10 - IMMUTABLE CONTRACTS! |
| Hedera | 2.00 | **KILL-SWITCH ACTIVE** |

**Uniswap - The Good:**
- B9 = 10/10 - Core contracts are IMMUTABLE
- No admin keys, no kill switch, no pause function
- This is unique among major DeFi protocols

**Uniswap - The Bad:**
- Governance Gini 0.938 (extreme inequality)
- Top 1% controls 47.5% voting power
- 40% insider allocation (21.3% team + 18% investors)
- UNIfication (Dec 2024) shifted control from Foundation to Labs

**Hedera - Corporate Blockchain Theater:**
- Only 10 active nodes (Google, IBM, etc.)
- 100% permissioned - no one else can run nodes
- Top 5 concentration: 51.56%
- Council can halt network at will (B9=0)
- 45% insider allocation (founders, Swirlds, employees, SAFT)
- "Decentralization roadmap" Phase 3 = marketing vapor

## [0.11.0] - 2025-12-26

### Added
- **Sui (SUI)** - 24th project with full data pipeline
  - SUI JSON-RPC fetcher (suix_getLatestSuiSystemState)
  - Daily workflow at 11:00 UTC
  - Move-based L1 by Mysten Labs (ex-Meta Diem team)

### Scoring
| Project | Score | Notes |
|---------|-------|-------|
| Sui | 5.20 | Foundation-controlled PoS |

**Key metrics:**
- Chain Score: 6.20 (NC 19, 126 validators)
- Control Score: 2.90 (Mysten Labs dominates)
- Fairness Score: 7.90 (appears fair, but...)

**Critical findings:**
- 126 active validators (max 150)
- Nakamoto coefficient 19 (decent for PoS)
- Top 5 concentration only 11.56%
- 30M SUI minimum stake (~$120M at current prices)
- 52% of supply "unallocated" but controlled by Sui Foundation
- Justin Bons claims 84% of staked supply controlled by insiders
- No public sale - only private investors and foundation
- Mysten Labs controls github.com/MystenLabs/sui

**Token distribution controversy:**
- Sui Foundation denies founder control of treasury
- But 52% "unallocated" tokens are staked and earning yield
- Foundation effectively controls governance through staking

## [0.10.0] - 2025-12-26

### Added
- **Stellar (XLM)** - 23rd project with full data pipeline
  - Horizon + Dashboard API fetcher (ledgers, supply, SDF holdings)
  - Daily workflow at 10:30 UTC
  - Federated Byzantine Agreement (FBA) consensus

### Scoring
| Project | Score | Notes |
|---------|-------|-------|
| Stellar | 3.70 | SDF-controlled federation |

**Key metrics:**
- Chain Score: 3.50 (NC ~4, 7 tier-1 orgs control consensus)
- Control Score: 2.70 (SDF controls everything)
- Fairness Score: 5.90 (100% premined, no governance)

**Critical findings:**
- Only 7 "tier-1" organizations control consensus
- If 3 tier-1 orgs fail → network halts
- SDF runs 3 validators directly
- SDF holds 17.3B XLM (34.7% of total supply)
- No on-chain governance - XLM has no voting rights
- 100% premined, original 100B burned to 50B in 2019
- Top 10 wallets hold 57.5% of supply

**SDF control:**
- Controls stellar.org brand
- Controls stellar/stellar-core GitHub
- Controls token distribution and grants
- Upgrade decisions require SDF coordination

## [0.9.0] - 2025-12-26

### Added
- **TON (Toncoin)** - 22nd project with full data pipeline
  - TonAPI fetcher (validators, staking, blocks)
  - Daily workflow at 10:00 UTC
  - Telegram-origin PoS chain

### Scoring
| Project | Score | Notes |
|---------|-------|-------|
| TON | 5.10 | Whale-controlled chain |

**Key metrics:**
- Chain Score: 7.30 (Nakamoto Coefficient ~80)
- Control Score: 3.10 (TON Foundation dominant)
- Fairness Score: 4.80 (catastrophic distribution)

**Critical findings:**
- 85% of tokens mined by interconnected whales affiliated with TON Foundation
- Top 10 holders own 61.22%, top 100 control 91.59%
- 20% of supply frozen via governance vote (never-activated genesis wallets)
- TON Foundation controls brand (ton.org), GitHub repos
- Originally Telegram's project, abandoned after SEC lawsuit
- Revived by "community" (same whales)

**Validator side (the good):**
- ~367 validators
- Top 5 concentration only 2.43%
- Nakamoto coefficient ~80
- On-chain config changes require validator consensus

## [0.8.1] - 2025-12-26

### Added
- **Aave (AAVE)** - 21st project with full data pipeline
  - DefiLlama API fetcher (TVL, treasury, revenue)
  - Daily workflow at 9:30 UTC
  - DeFi lending protocol with PoS-style governance

### Scoring
| Project | Score | Notes |
|---------|-------|-------|
| Aave | 4.50 | Governance theater exposed |

**Critical findings:**
- Top 3 voters control 58% of voting power
- Founder bought $10M tokens to swing governance vote
- Aave Labs controls GitHub, domain, frontend
- Guardian (5/9 multisig) can pause but is community-elected
- 23% founders allocation (2020 - reasonable for era)
- Treasury: $73M + $67M in own tokens (managed by Karpatkey)
- TVL: $33B across 19 chains
- Revenue 2025: $140M (exceeds prior 3 years combined)

**Governance crisis (Dec 2025):**
- "Stealth privatization" - $10M/year revenue diverted to Labs
- "Poison pill" proposal to seize all Aave IP
- Holiday vote timed to minimize participation
- AAVE -18% in one week

## [0.8.0] - 2025-12-25

### Added
- **Chainlink (LINK)** - 20th project with full data pipeline
  - The oracle monopoly that powers DeFi
  - ETH/USD feed: 31 node operators, minimum 10 required
  - Undocumented multisig can manipulate ANY price feed
  - Daily workflow at 9:00 UTC

### Scoring
| Project | Score | Notes |
|---------|-------|-------|
| Chainlink | ~3.4 | DeFi's single point of failure |

**Critical findings:**
- 80% of LINK controlled by 125 wallets
- Team still holds ~25% of supply
- Only 1 client - Chainlink node software
- Node operators "vetted" by Chainlink - permissioned network
- Chris Blec: "1-3 unknown signers can manipulate any price feed"
- Sergey Nazarov worth $600M-$1.2B from LINK holdings
- market.link (transparency tool) was deprecated

**Systemic risk:** DeFi depends on Chainlink. If 10-16 nodes collude (33-50%), they control price feeds that secure billions.

## [0.7.3] - 2025-12-25

### Added
- **Satoshi Quote** on homepage: "If you don't believe me or don't get it, I don't have the time to try to convince you, sorry."

## [0.7.2] - 2025-12-25

### Added
- **Internet Computer (ICP)** - 19th project with full data pipeline
  - IC Dashboard API fetcher (ic-api.internetcomputer.org)
  - Daily workflow at 8:30 UTC
  - Chain Key consensus on specialized node machines
  - 701 total nodes, 105 node providers, 47 subnets

### Scoring
| Project | Score | Notes |
|---------|-------|-------|
| Internet Computer | ~3.1 | Heavy insider allocation, DFINITY dominance |

**Critical findings:**
- 48-50% insider allocation (DFINITY, team, seed investors)
- DFINITY Foundation controls ~40% NNS voting power
- Only 1 client (IC replica) - zero client diversity
- 100% specialized data center hardware (node machines)
- Nakamoto coefficient ~4.6-5.0 (very low for "world computer")
- Node providers must be approved by NNS (permissioned)
- 95% price crash from ATH - slow rug in progress

## [0.7.1] - 2025-12-25

### Added
- **NPoS Consensus Type** - Polkadot now shows NPoS (emerald badge) instead of PoS
- **Gandhi Quote** on homepage: "First they ignore you, then they laugh at you, then they fight you, then you win."

### Changed
- Polkadot consensus type: PoS → NPoS (Nominated Proof of Stake)

## [0.7.0] - 2025-12-25

### Added
- **Kaspa (KAS)** - 18th project with full data pipeline
  - Kaspa REST API fetcher (api.kaspa.org)
  - Daily workflow at 8:00 UTC
  - GHOSTDAG consensus (PoW blockDAG)
  - **TRUE FAIR LAUNCH**: 0% premine, no ICO, no team allocation

### Scoring
| Project | Score | Notes |
|---------|-------|-------|
| Kaspa | ~7.0 | Fair launch champion - no premine |

**Key findings:**
- 100% mineable, kHeavyHash algorithm (ASIC mining)
- DAGlabs renounced ownership - fully community-run
- ~473 PH/s hashrate, 27B/28.7B KAS circulating
- No kill-switch (B9=10) - PoW with no admin controls

## [0.6.9] - 2025-12-25

### Added
- **Kill-Switch Warning** ⚠️ - Projects with B9=0 now show warning icon
- **Core Principles** on homepage: "Don't trust, verify", "No hype, just facts", "Decentralization ≠ Price"
- **Uncapped Score** field for proper sorting of capped projects

### Fixed
- Kill-switch projects (2.0) now sorted by their would-be score
  - Correct order: HYPE (3.5) > TRX (3.2) > XRP (3.1) > BNB (2.9)

## [0.6.8] - 2025-12-25

### Added
- **Hyperliquid (HYPE)** - 17th project with full data pipeline
  - Hyperliquid API fetcher (api.hyperliquid.xyz)
  - Daily workflow at 7:00 UTC
  - HyperBFT consensus (based on HotStuff)
  - 24 active validators, NC = 3 (all Foundation!)

### Scoring
| Project | Score | Notes |
|---------|-------|-------|
| Hyperliquid | 2.0 | **KILL-SWITCH ACTIVE** - capped at 2.0 |

**Critical findings:**
- Foundation controls 59% of stake (5 of 24 validators)
- Nakamoto Coefficient = 3, but all 3 are Hyper Foundation validators
- Bridge pause, withdrawal freeze, forced delisting capabilities
- Closed-source binary until recently

## [0.6.7] - 2025-12-24

### Added
- **Cosmos Hub (ATOM)** - 16th project with full data pipeline
  - Cosmos REST API fetcher (rest.cosmos.directory)
  - Daily workflow at 6:00 UTC
  - Tendermint/CometBFT BFT consensus
  - ~200 validators, Nakamoto coefficient ~6-7

### Scoring
| Project | Score | Notes |
|---------|-------|-------|
| Cosmos | ~5.8 | Lower NC than expected, ICO allocation |

Nakamoto Coefficient ~6-7, Top 5 = 36%. 20% to founders/foundation, 80% ICO. Gaia client dominance.

## [0.6.6] - 2025-12-24

### Added
- **Polkadot (DOT)** - 15th project with full data pipeline
  - Subscan API fetcher for network stats (600 validators, 655 waiting)
  - Daily workflow at 5:55 UTC
  - NPoS consensus with very high Nakamoto coefficient (~149-173)
  - No sudo since July 2020 - fully decentralized governance

### Scoring
| Project | Score | Notes |
|---------|-------|-------|
| Polkadot | ~6.8 | High NC but ICO/premine hurts |

Very high technical decentralization (600 validators, Nakamoto ~149), but 30% founders + 58% ICO allocation affects fairness score.

## [0.6.5] - 2025-12-24

### Added
- **Bitcoin Cash (BCH)** - 14th project with full data pipeline
  - Blockchair API fetcher for network stats (603 nodes, 7.4 EH/s)
  - Daily workflow at 5:50 UTC
  - Inherited Bitcoin's fair launch (no additional premine)
  - High mining concentration: ViaBTC 37% alone

### Scoring
| Project | Score | Rank |
|---------|-------|------|
| Bitcoin Cash | 6.6 | ~#5 |

Bitcoin fork != automatic high score. ViaBTC dominance hurts.

## [0.6.4] - 2025-12-24

### Added
- **Dogecoin (DOGE)** - 13th project with full data pipeline
  - Blockchair API fetcher for network stats (524 nodes, 3.6 PH/s)
  - Daily workflow at 5:45 UTC
  - Merged mining with Litecoin (same pool distribution)
  - Fair launch, no premine, community-driven

### Scoring
| Project | Score | Rank |
|---------|-------|------|
| Dogecoin | 7.0 | #3 |

**Top 3 all community/fair-launch coins**: BTC, LTC, DOGE 🐕

## [0.6.3.1] - 2025-12-24

### Fixed
- **Data Pipeline Status**: Added missing LTC and XMR to API status display

## [0.6.3] - 2025-12-24

### Added
- **Monero (XMR)** - 12th project with full data pipeline
  - Blockchair API fetcher for network stats (5.92 GH/s RandomX)
  - Daily workflow at 5:40 UTC
  - Fair launch, no premine, grassroots community
  - High pool concentration warning (SupportXMR 44%, Top 2 = 65%)

### Scoring
| Project | Score | Rank |
|---------|-------|------|
| Monero | 7.0 | #3 |

**Top 3 now all PoW fair-launch chains**: BTC, LTC, XMR

## [0.6.2] - 2025-12-24

### Added
- **Litecoin (LTC)** - 11th project with full data pipeline
  - Blockchair API fetcher for network stats (956 nodes, 2.6 PH/s)
  - Daily workflow at 5:35 UTC
  - Fair launch, no premine, Charlie Lee stepped back

### Scoring
| Project | Score | Rank |
|---------|-------|------|
| Litecoin | 7.1 | #2 |

## [0.6.1] - 2025-12-24

### Changed
- **UI**: Leaderboard rows fully clickable with arrow indicator
- **ETH B5**: 6 → 4 (EF has more soft power than initially rated)

### Scoring Impact
| Project | Score | Change |
|---------|-------|--------|
| Ethereum | 5.9 | -0.2 |

## [0.6.0] - 2025-12-24

### Added
- **B9 "Admin Halt Capability"** - New criterion measuring if single entity can halt/freeze chain
- **Kill-Switch Veto** - Projects with B9=0 are automatically capped at 2.0 total score
  - Affected: BNB Chain, XRP, Tron

### Changed
- **11 Criteria** - Framework now has 11 criteria (was 10)
- **Updated Scores** - All projects re-scored with B9 values
- **UI Updates** - Main page and projects page describe kill-switch cap

### Scoring Impact
| Project | Score | Status |
|---------|-------|--------|
| Bitcoin | 7.3 | Leader |
| Ethereum | 6.1 | |
| Cardano | 5.7 | |
| BNB | 2.0 | Kill-Switch Capped |
| XRP | 2.0 | Kill-Switch Capped |
| Tron | 2.0 | Kill-Switch Capped |

## [0.5.5] - 2025-12-24

### Changed
- **Leaderboard**: Added rank column with golden glow for #1
- **UI Cleanup**: Removed redundant update time text from API Status card

## [0.5.4] - 2025-12-24

### Added
- **Tron Integration**
  - TronGrid API Fetcher (public API)
  - Witnesses (Super Representatives), votes, block height
  - TRX Workflow (`data-trx.yml`) runs daily at 7:30 UTC
- **Tron in Leaderboard**
  - Full decentralization scoring (DPoS, 27 SRs)
  - Live Network Data card on /projects/tron

### Changed
- **10 Chains Now Supported**: BTC, ETH, SOL, XRP, BNB, ZEC, TAO, ADA, AVAX, TRX

### Infrastructure
- `scripts/fetch-trx.ts` - Tron data fetch script
- `data/trx.json` - Cached Tron network data

## [0.5.3] - 2025-12-24

### Added
- **Avalanche Integration**
  - Avalanche P-Chain API Fetcher (public RPC)
  - Validator count, active validators, total staked, P-Chain height
  - AVAX Workflow (`data-avax.yml`) runs daily at 7:00 UTC
- **Avalanche in Leaderboard**
  - Full decentralization scoring (PoS, Snowman consensus)
  - Live Network Data card on /projects/avalanche

### Changed
- **9 Chains Now Supported**: BTC, ETH, SOL, XRP, BNB, ZEC, TAO, ADA, AVAX

### Infrastructure
- `scripts/fetch-avax.ts` - Avalanche data fetch script
- `data/avax.json` - Cached Avalanche network data

## [0.5.2] - 2025-12-24

### Changed
- **UI Cleanup**: Removed separate Methodology card, integrated into page intro
- **ADA Scores**: Corrected Cardano decentralization ratings
  - A3: 1 (only cardano-node implementation)
  - B5: 2 (IOG dominates development)
  - C9: 25% (actual insider allocation)

## [0.5.1] - 2025-12-24

### Added
- **Cardano Integration**
  - Blockfrost API Fetcher (requires project ID)
  - Epoch, block count, tx count, stake metrics, pool count
  - ADA Workflow (`data-ada.yml`) runs daily at 6:30 UTC
- **Cardano in Leaderboard**
  - Full decentralization scoring (PoS, Ouroboros, ~3000 pools)
  - Live Network Data card on /projects/cardano

### Changed
- **8 Chains Now Supported**: BTC, ETH, SOL, XRP, BNB, ZEC, TAO, ADA

### Infrastructure
- `scripts/fetch-ada.ts` - Cardano data fetch script
- `data/ada.json` - Cached Cardano network data
- `BLOCKFROST_PROJECT_ID` repo secret required

## [0.5.0] - 2025-12-24

### Added
- **Bittensor Integration**
  - Taostats API Fetcher (requires API key)
  - Block number, accounts, subnets, validators, active keys tracking
  - TAO Workflow (`data-tao.yml`) runs daily at 6:00 UTC
- **Bittensor in Leaderboard**
  - Full decentralization scoring (hybrid consensus, fair launch, no premine)
  - Live Network Data card on /projects/bittensor

### Changed
- **7 Chains Now Supported**: BTC, ETH, SOL, XRP, BNB, ZEC, TAO
- Updated README with all supported chains table
- Compact footer for mobile

### Infrastructure
- `scripts/fetch-tao.ts` - Bittensor data fetch script
- `data/tao.json` - Cached Bittensor network data
- `TAOSTATS_API_KEY` repo secret required

## [0.4.9] - 2025-12-23

### Added
- **Zcash Integration**
  - Zcash Fetcher using Blockchair API
  - Block height, nodes, difficulty, hashrate tracking
  - ZEC Workflow (`data-zec.yml`) runs daily at 5:30 UTC
- **Zcash in Leaderboard**
  - Full decentralization scoring (PoW, dev fund, ECC/Foundation)
  - Live Network Data card on /projects/zcash

### Infrastructure
- `scripts/fetch-zec.ts` - Zcash data fetch script
- `data/zec.json` - Cached Zcash network data

## [0.4.8] - 2025-12-23

### Added
- **BNB Chain Integration**
  - BNB Chain Fetcher using public RPC (bsc-dataseed.binance.org)
  - Block number, peer count, validator count, gas price tracking
  - BNB Workflow (`data-bnb.yml`) runs daily at 5:00 UTC
- **BNB in Leaderboard**
  - Full decentralization scoring (21 validators, DPoS, Binance controlled)
  - Live Network Data card on /projects/bnb

### Infrastructure
- `scripts/fetch-bnb.ts` - BNB data fetch script
- `data/bnb.json` - Cached BNB network data

## [0.4.7] - 2025-12-23

### Added
- **XRP Ledger Integration**
  - XRPL Fetcher using public JSON-RPC (s1.ripple.com)
  - Validation quorum and ledger sequence tracking
  - XRP Workflow (`data-xrp.yml`) runs daily at 4:30 UTC
- **XRP in Leaderboard**
  - Full decentralization scoring (100% premine, federated consensus)
  - Live Network Data card on /projects/xrp

### Framework
- New consensus type: `federated` for XRPL-style consensus

### Infrastructure
- `scripts/fetch-xrp.ts` - XRP data fetch script
- `data/xrp.json` - Cached XRP network data

## [0.4.6] - 2025-12-23

### Added
- **Live Network Data Card** on project pages
  - Shows real-time metrics from daily fetches
  - Displays data source and "Updated Xm ago" timestamp
  - Status badge (Live/Partial/Error)
- **API Status Card** on projects overview
  - Pipeline status for all chains (BTC/SOL/ETH)
  - Source attribution and freshness indicator

### UI/UX
- Data transparency: Every metric shows source + timestamp
- Color-coded status indicators

## [0.4.5] - 2025-12-23

### Added
- **Ethereum Beacon API Fetcher** using PublicNode
  - Connected peers, head slot, finalized epoch
  - Sync distance monitoring
- **ETH Workflow** (`data-eth.yml`) runs daily at 4:00 UTC

### Changed
- Workflow schedules shifted to 3:00-4:00 UTC window
  - BTC: 3:00 UTC | SOL: 3:30 UTC | ETH: 4:00 UTC

### Infrastructure
- `scripts/fetch-eth.ts` - Ethereum data fetch script
- `data/ethereum.json` - Cached Ethereum network data

## [0.4.4] - 2025-12-23

### Added
- **Solana RPC Fetcher** using official public RPC
  - Validator counts (total, active)
  - Nakamoto Coefficient calculation
  - Top 5 stake concentration
  - Node count and client versions
- **SOL Workflow** (`data-sol.yml`) runs daily at 3:30 UTC

### Infrastructure
- `scripts/fetch-sol.ts` - Solana data fetch script
- `data/solana.json` - Cached Solana network data

## [0.4.3] - 2025-12-23

### Fixed
- **BTC Workflow** now has write permissions for auto-commits
- Workflow tested and working in production

### Changed
- Renamed workflow file to `data-btc.yml` with name "BTC: Fetch Network Data"
- Single-chain workflow structure (modular per coin)

## [0.4.2] - 2025-12-23

### Changed
- **Enhanced release.sh** with automatic git tags and GitHub releases
  - Creates git tag and GitHub release automatically
  - Extracts changelog notes for release description
- **Modular GitHub Actions workflow**
  - Separate jobs: `btc`, `sol`, `eth` (selectable)
  - Clear naming: "Data: Fetch Decentralization Metrics"
  - Commit messages with ticker prefix (BTC, SOL, ETH)

## [0.4.1] - 2025-12-23

### Added
- **Blockchain.info Fetcher** for mining pool data
  - `BlockchainFetcher` class for hashrate/pool metrics
  - Top 5 pool concentration, largest pool %, pool diversity
- **Consensus Type Labels** in project table
  - Visual badges: PoW (orange), PoS (blue), DPoS (purple), Hybrid (cyan)

### Changed
- `fetch-btc.ts` now fetches both node and pool data
- Updated `bitcoin.json` with mining pool metrics

## [0.4.0] - 2025-12-23

### Added
- **Bitcoin Data Fetcher** using Bitnodes API
  - `BitnodesFetcher` class with sampling for geo/cloud data
  - Fetches total nodes, cloud percentage, geographic concentration
  - Rate limiting and error handling
- **GitHub Actions Workflow** for automated data updates
  - Daily scheduled fetch at 06:00 UTC
  - Manual trigger with chain selection
  - Auto-commit updated data
- **Data directory** with `data/bitcoin.json`
- **Fetch script** `scripts/fetch-btc.ts`

### Infrastructure
- `.github/workflows/fetch-data.yml` - Automated data pipeline
- `data/` - Cached network data (updated daily)

## [0.3.0] - 2025-12-23

### Added
- **Data Source Schema** for automated API fetching
  - `DataSourceProvider` types: bitnodes, ethernodes, solanabeach, github, etc.
  - `CriterionDataMapping` with primary sources and fallbacks
  - `ProjectDataSources` for chain-specific API configurations
- **Base Fetcher** class with rate limiting and error handling
- **Project-specific API mappings**:
  - Bitcoin: bitnodes (nodes), blockchain.com (pools)
  - Ethereum: rated (validators), ethernodes (nodes/clients)
  - Solana: solanabeach (validators, stake, clients)
- Dynamic footer with version, date, and author link
- `release.sh` script for automated release management
- README: Data sources table, project structure

### Changed
- Ethereum C9 (Premine) corrected from 15% to 20%
- Footer now reads version from VERSION file
- GitHub header link now points to actual repository

### Infrastructure
- `src/lib/data/sources/` - Data source types and mappings
- `src/lib/data/fetchers/` - API fetcher base classes
- `scripts/release.sh` - Automated release workflow

## [0.2.0] - 2025-12-23

### Added
- **Consensus Type** field for projects (`pow`, `pos`, `dpos`, `hybrid`)
- **N/A support** for criteria that don't apply to certain consensus types
- VERSION file for tracking releases

### Changed
- Bitcoin scoring: B8 (Treasury Keys) and C10 (Governance Power) now N/A for PoW
- Scoring logic now ignores N/A values when calculating averages
- Improved README with framework documentation

### Fixed
- Bitcoin score now more accurately reflects PoW characteristics

## [0.1.0] - 2025-12-23

### Added
- Initial framework implementation
- Three score categories: Chain, Control, Fairness
- 10 criteria (A1-A4, B5-B8, C9-C10)
- Example projects: Bitcoin, Ethereum, Solana
- Next.js web app with:
  - Landing page with framework explanation
  - Projects overview and comparison table
  - Individual project detail pages
  - Interactive score calculator
- Cloudflare Pages deployment with Git integration
