# NotSoDeFi.com

**Measuring Real Decentralization** • 38 Projects • Open Source

> *"Don't trust, verify."*

## Why This Exists

The crypto industry has a decentralization problem: everyone claims it, few deliver it. Marketing departments label centralized systems "decentralized" while VCs, foundations, and insiders retain control. Users deserve to know the truth.

NotSoDeFi.com provides **objective, data-driven measurements** of actual decentralization – not promises, not whitepapers, not marketing. We track validator concentration, token distribution, governance power, corporate control, and protocol immutability across 38 projects.

**The goal:** Cut through the noise. Help users understand what they're actually trusting when they use a "decentralized" protocol.

Live: **[notsodefi.com](https://notsodefi.com)**

## Philosophy

- **Transparency over hype** – Scores combine verifiable data with editorial assessment
- **Bitcoin as the benchmark** – The reference point for decentralization scoring
- **Centralization is a risk vector** – Admin keys, kill switches, and foundation control matter
- **Progress is possible** – We track how projects evolve over time

## Features

- **Compare Mode** - Select up to 3 projects for side-by-side comparison
- **Trend Charts** - 7-day sparklines showing score history
- **Network Data** - Daily API fetches with historical R2 archive
- **Filter & Search** - By category, consensus type, or name
- **[Known Problems](https://notsodefi.com/problems)** - Documented limitations across all blockchain systems
- **[Red Flags](https://notsodefi.com/red-flags)** - Marketing-to-reality translation guide
- **[SPOF Analysis](https://notsodefi.com/spof)** - Single Point of Failure analysis (only 5/38 unkillable)
- **[Broken Promises](https://notsodefi.com/broken-promises)** - Progressive decentralization audit
- **[Follow the Money](https://notsodefi.com/follow-the-money)** - VC portfolio overlap (a16z, Paradigm, Polychain)

## The Framework

Three scores, thirteen criteria. Projects with admin kill-switches (B5=0) are capped at 1.0.

**[Read the full methodology →](https://notsodefi.com/methodology)**

| Score | Weight | What it measures |
|-------|--------|------------------|
| **Chain Score** | 40% | Technical/economic decentralization (Nakamoto Coefficient, validator concentration, client independence, node geography) |
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
| Litecoin | LTC | PoW | [Blockchair](https://blockchair.com) |
| Monero | XMR | PoW | [Blockchair](https://blockchair.com) |
| Ethereum | ETH | PoS | Beacon API |
| Solana | SOL | PoS | Solana RPC |
| XRP | XRP | Federated | [XRPL](https://xrpl.org) |
| BNB Chain | BNB | DPoS | BNB Chain RPC |
| Zcash | ZEC | PoW | [Blockchair](https://blockchair.com) |
| Bittensor | TAO | Hybrid | [Taostats](https://taostats.io) |
| Cardano | ADA | PoS | [Blockfrost](https://blockfrost.io) |
| Avalanche | AVAX | PoS | [Avalanche API](https://api.avax.network) |
| Tron | TRX | DPoS | [TronGrid](https://api.trongrid.io) |
| Polkadot | DOT | NPoS | [Subscan](https://polkadot.subscan.io) |
| Cosmos Hub | ATOM | PoS | [Cosmos REST API](https://rest.cosmos.directory) |
| Hyperliquid | HYPE | PoS | [Hyperliquid API](https://api.hyperliquid.xyz) |
| Kaspa | KAS | PoW | [Kaspa REST API](https://api.kaspa.org) |
| Internet Computer | ICP | PoS | [IC Dashboard API](https://ic-api.internetcomputer.org) |
| Chainlink | LINK | Federated | [data.chain.link](https://data.chain.link) |
| Aave | AAVE | PoS | [DefiLlama](https://defillama.com) |
| TON | TON | PoS | [TonAPI](https://tonapi.io) |
| Stellar | XLM | Federated | [Stellar Horizon](https://horizon.stellar.org) |
| Sui | SUI | PoS | [SUI JSON-RPC](https://fullnode.mainnet.sui.io) |
| Uniswap | UNI | PoS | [DefiLlama](https://defillama.com) |
| Hedera | HBAR | Federated | [Hedera Mirror Node](https://mainnet-public.mirrornode.hedera.com) |
| Tether | USDT | Federated | [DefiLlama Stablecoins](https://stablecoins.llama.fi) |
| USD Coin | USDC | Federated | [DefiLlama Stablecoins](https://stablecoins.llama.fi) |
| DAI | DAI | PoS | [DaiStats](https://daistats.com) |
| NEAR Protocol | NEAR | PoS | [NEAR RPC](https://rpc.mainnet.near.org) |
| Aptos | APT | PoS | [Aptos API](https://api.mainnet.aptoslabs.com) |
| Polygon | POL | PoS | [Polygon Staking API](https://staking-api.polygon.technology) |
| Injective | INJ | PoS | [Injective LCD API](https://sentry.lcd.injective.network) |
| Filecoin | FIL | PoS | [Filfox](https://filfox.info) |
| Arbitrum | ARB | PoS | [Arbitrum RPC](https://arb1.arbitrum.io/rpc) |
| Lido | LDO | PoS | [DefiLlama](https://defillama.com) |
| Ethereum Classic | ETC | PoW | [Blockscout](https://etc.blockscout.com) |
| Virtuals Protocol | VIRTUAL | PoS | [DefiLlama](https://defillama.com) |

Data is fetched daily via GitHub Actions and stored in Cloudflare KV. Historical snapshots are archived to R2 daily.

**API Endpoints:**
- `/api/metrics?project=xxx` - Current metrics from KV
- `/api/all-metrics` - All project metrics
- `/api/history?project=xxx&date=YYYY-MM-DD` - Historical snapshot from R2

## Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Create a release
./scripts/release.sh 0.3.0-rc3
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
└── api/                    # Cloudflare Functions
    ├── metrics.js         # GET /api/metrics?project=xxx
    ├── all-metrics.js     # GET /api/all-metrics
    ├── history.js         # GET /api/history (R2)
    └── archive.js         # Manual archive trigger

workers/
└── archive-cron/          # Scheduled Worker
    ├── index.js           # KV → R2 archiver
    └── wrangler.toml      # Cron trigger config
```

## Tech Stack

- Next.js 15 (Static Export)
- TypeScript
- Tailwind CSS
- Cloudflare Pages + KV + R2 + Functions + Workers

## Contributing

This is a community project. Contributions welcome:

- **Add a project** – Fork, create project file in `src/lib/data/projects/`, submit PR
- **Improve scoring** – Open an issue to discuss methodology changes
- **Fix bugs** – PRs welcome
- **Spread the word** – Share with anyone who cares about real decentralization

## License

MIT – Free to use, modify, and distribute.
