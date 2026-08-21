# NotSoDeFi.com

**Decentralization Metrics** • Open Source

## Overview

NotSoDeFi.com provides quantitative decentralization metrics for blockchain networks and DeFi protocols.

Tracks validator concentration, token distribution, governance power, corporate control, and protocol immutability.

Live: **[notsodefi.com](https://notsodefi.com)**

## Philosophy

- **Transparency** – Scores combine verifiable data with editorial assessment
- **Bitcoin as baseline** – Reference point for comparative scoring
- **Centralization factors** – Documents admin keys, kill switches, and foundation control
- **Progress tracking** – Records how projects evolve over time

## Features

- **Compare Mode** - Select up to 3 projects for side-by-side comparison
- **Network Data** - Daily API fetches, cached in Cloudflare KV
- **Filter & Search** - By category, consensus type, or name
- **[Known Problems](https://notsodefi.com/problems)** - Documented limitations across all blockchain systems
- **[Risk Indicators](https://notsodefi.com/risk-indicators)** - Marketing claims vs. observable patterns
- **[SPOF Analysis](https://notsodefi.com/spof)** - Single Point of Failure analysis
- **[Roadmap Tracking](https://notsodefi.com/roadmap-tracking)** - Progressive decentralization timelines

## The Framework

Three scores, fourteen criteria. Projects with admin kill-switches (B5=0) are capped at 1.0.

**[Read the full methodology →](https://notsodefi.com/methodology)**

| Score | Weight | What it measures |
|-------|--------|------------------|
| **Chain Score** | 40% | Technical/economic decentralization (Nakamoto Coefficient, validator concentration, client independence, node geography, full node count) |
| **Control Score** | 40% | Power structures (corporate capture, repo ownership, brand control, treasury keys, protocol immutability) |
| **Fairness Score** | 20% | Launch/distribution fairness (premine, token concentration, governance control) |

```
TotalScore = 0.4 × Chain + 0.4 × Control + 0.2 × Fairness
```

## Consensus Types

- **PoW** - Proof of Work
- **PoS** - Proof of Stake
- **NPoS** - Nominated Proof of Stake
- **DPoS** - Delegated Proof of Stake
- **Federated** - Federated consensus
- **Hybrid** - Mixed mechanisms

Some criteria may be N/A depending on the consensus type.

## Project Categories

- **L1** - Layer 1 blockchains
- **L2** - Layer 2 scaling solutions
- **DEX** - Decentralized exchanges
- **Lending** - Lending protocols
- **Oracle** - Oracle networks
- **Stablecoin** - Stablecoins
- **Infrastructure** - Infrastructure providers

## Supported Chains

| Chain | Symbol | Consensus | Data Source |
|-------|--------|-----------|-------------|
| Bitcoin | BTC | PoW | [Bitnodes](https://bitnodes.io) + [Blockchain.info](https://blockchain.info) |
| Bitcoin Cash | BCH | PoW | [Blockchair](https://blockchair.com) |
| Dogecoin | DOGE | PoW | [Blockchair](https://blockchair.com) |
| Ethereum | ETH | PoS | [Beacon API](https://beaconcha.in) |
| Ethereum Classic | ETC | PoW | [Blockscout](https://etc.blockscout.com) |
| Kaspa | KAS | PoW | [Kaspa REST API](https://api.kaspa.org) |
| Litecoin | LTC | PoW | [Blockchair](https://blockchair.com) |
| Monero | XMR | PoW | [Blockchair](https://blockchair.com) |
| Polkadot | DOT | NPoS | [Subscan](https://polkadot.subscan.io) |

Data is fetched daily via GitHub Actions and stored in Cloudflare KV.

**API Endpoints:**
- `/api/metrics?project=xxx` - Current metrics from KV
- `/api/all-metrics` - All project metrics

## Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Create a release
./scripts/release.sh 1.0.1
```

## Project Structure

```
src/
├── app/                    # Next.js pages
├── components/             # React components
│   ├── data/              # Data display (NetworkData, ApiStatusCard)
│   ├── layout/            # Header, Footer
│   ├── scores/            # Score display components
│   └── ui/                # Base UI components
├── hooks/                  # React hooks (useMetrics)
└── lib/
    ├── framework/         # Scoring logic & criteria
    ├── data/
    │   ├── projects/      # Project definitions
    │   ├── sources/       # API source mappings
    │   └── fetchers/      # API fetcher classes
    └── utils/             # Helper functions

functions/
└── api/                    # Cloudflare Pages Functions
    ├── metrics.js         # GET /api/metrics?project=xxx
    └── all-metrics.js     # GET /api/all-metrics
```

## Tech Stack

- Next.js 16 (Static Export)
- TypeScript
- Tailwind CSS
- Cloudflare Pages + KV

## Contributing

This is a community project. Contributions welcome:

- **Add a project** – Fork, create project file in `src/lib/data/projects/`, submit PR
- **Improve scoring** – Open an issue to discuss methodology changes
- **Fix bugs** – PRs welcome
- **Spread the word** – Share the project

## License

The application code is MIT-licensed – free to use, modify, and distribute.

The scoring methodology, framework criteria, and per-project analyses are **not** covered by the MIT license and remain All Rights Reserved – see [LICENSE-METHODOLOGY](./LICENSE-METHODOLOGY).
