# Changelog

All notable changes to the NotSoDeFi Framework.

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
