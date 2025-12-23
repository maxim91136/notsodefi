# Changelog

All notable changes to the NotSoDeFi Framework.

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
