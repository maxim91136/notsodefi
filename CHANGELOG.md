# Changelog

All notable changes to the NotSoDeFi.com Framework.

## [1.0.5] - 2026-01-09

### Changed
- Clarified B5 kill-switch methodology: Only intentional halt mechanisms (admin keys, safe mode, governance halt-authority) trigger 1.0 cap
- Bug-crashes (SOL, SUI, AVAX, POL) no longer penalized as kill-switches - technical immaturity ≠ architectural centralization

## [1.0.4] - 2026-01-09

### Added
- Search filters on SPOF and Roadmap Tracking pages

## [1.0.3] - 2026-01-09

### Added
- **Fetch.ai (FET)** - Project #43: Cosmos SDK AI agent chain (Score: 3.6)
- Roadmap Tracking: ASI Alliance entry (Ocean Protocol exit October 2025)

## [1.0.2] - 2026-01-09

### Changed
- Removed beta labels from header and homepage
- Corrected data source links in README (BNB, Chainlink, DAI)

## [1.0.1] - 2026-01-09

### Changed
- **Updated page URLs** for consistency
  - `/red-flags` → `/risk-indicators`
  - `/follow-the-money` → `/funding-analysis`
  - `/broken-promises` → `/roadmap-tracking`
- **Unified navigation styling**

## [1.0.0] - 2026-01-09

### Initial Release

**NotSoDeFi.com** - Decentralization scoring framework for blockchain networks and DeFi protocols.

#### Framework
- **14 criteria** across three categories: Chain Score (A1-A5), Control Score (B1-B6), Fairness Score (C1-C3)
- **Weighted scoring**: Chain 40%, Control 40%, Fairness 20%
- **Kill-switch cap**: Projects with B5=0 capped at 1.0 total score

#### Features
- **42 projects** tracked with daily data fetches
- **Compare Mode** - Side-by-side comparison of up to 3 projects
- **Trend Charts** - 7-day sparklines showing score history
- **Filter & Search** - By category, consensus type, or name
- **Analysis Pages**:
  - Known Problems - Documented limitations across blockchain systems
  - Marketing Analysis - Marketing claims vs. observable patterns
  - SPOF Analysis - Single Point of Failure analysis
  - Roadmap Tracking - Progressive decentralization timelines
  - VC Portfolio - Venture capital relationships

#### Infrastructure
- Next.js 15 static site
- Cloudflare Pages + KV + R2 + Workers
- Daily API fetches via GitHub Actions
- Historical data archival to R2

#### Data Sources
- Direct blockchain APIs (Solana, Ethereum, etc.)
- Block explorers (Blockchair, Subscan, etc.)
- Aggregators (DefiLlama, CoinGecko)
