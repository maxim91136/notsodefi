# Changelog

All notable changes to the NotSoDeFi Framework.

## [0.3.0-rc3] - 2025-12-23

### Changed
- Improved `release.sh` with README validation and better output
- Release script now checks VERSION, CHANGELOG, and README

## [0.3.0-rc2] - 2025-12-23

### Added
- Dynamic footer with version, date, and author link
- `release.sh` script for automated release management
- README: Data sources table, project structure, release command

### Changed
- Footer now reads version from VERSION file
- Removed duplicate version display from homepage
- Fixed Next.js version in docs (15, not 16)

## [0.3.0-rc1] - 2025-12-23

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
- Dynamic version display on homepage (reads from VERSION file)
- Verified premine data: BTC 0%, ETH 20%, SOL 48%

### Changed
- Ethereum C9 (Premine) corrected from 15% to 20%
- Data architecture prepared for GitHub Actions + Cloudflare KV

### Infrastructure
- `src/lib/data/sources/` - Data source types and mappings
- `src/lib/data/fetchers/` - API fetcher base classes

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
