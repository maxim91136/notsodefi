# Changelog

All notable changes to the NotSoDeFi Framework.

## [0.2.0] - 2024-12-23

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

## [0.1.0] - 2024-12-23

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
