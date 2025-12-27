# NotSoDeFi

**Measuring Real Decentralization** • 33 Projects

A framework for objectively measuring blockchain and protocol decentralization. Because "decentralized" doesn't mean what most projects claim it means.

Live: [notsodefi.com](https://notsodefi.com)

## The Framework

Three scores, eleven criteria. Projects with admin kill-switches (B9=0) are capped at 2.0:

| Score | Weight | What it measures |
|-------|--------|------------------|
| **Chain Score** | 40% | Technical/economic decentralization (Nakamoto Coefficient, validator concentration, client diversity, node geography) |
| **Control Score** | 40% | Power structures (corporate capture, repo ownership, brand control, treasury keys) |
| **Fairness Score** | 20% | Launch/distribution fairness (premine, token distribution, governance power) |

```
TotalScore = 0.4 × Chain + 0.4 × Control + 0.2 × Fairness
```

## Consensus Types

The framework distinguishes between different consensus mechanisms:

- **PoW** (Proof of Work) - Bitcoin, Bitcoin Cash, Dogecoin, Kaspa, Litecoin, Monero, Zcash
- **PoS** (Proof of Stake) - Ethereum, Solana, Cardano, Avalanche, Cosmos, Hyperliquid, TON, Sui, ICP, Aave, Uniswap, DAI, NEAR, Aptos, Polygon, Injective
- **NPoS** (Nominated Proof of Stake) - Polkadot
- **DPoS** (Delegated Proof of Stake) - BNB Chain, Tron
- **Federated** - XRP, Chainlink, Stellar, Hedera, Tether, USDC
- **Hybrid** - Bittensor

Some criteria may be N/A depending on the consensus type.

## Project Categories

Projects are classified by type:

- **L1** - Layer 1 blockchains (Bitcoin, Ethereum, Solana, etc.)
- **L2** - Layer 2 scaling solutions (Polygon)
- **DEX** - Decentralized exchanges (Uniswap)
- **Lending** - Lending protocols (Aave)
- **Oracle** - Oracle networks (Chainlink)
- **Stablecoin** - Stablecoins (Tether, USDC, DAI)
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

Data is fetched daily via GitHub Actions and stored in Cloudflare KV. The site reads live data from `/api/metrics`.

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
│   ├── data/              # Data display (LiveNetworkData, ApiStatusCard)
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
└── api/                    # Cloudflare Functions (KV API)
    ├── metrics.js         # GET /api/metrics?project=xxx
    └── all-metrics.js     # GET /api/all-metrics
```

## Tech Stack

- Next.js 15 (Static Export)
- TypeScript
- Tailwind CSS
- Cloudflare Pages + KV + Functions

## License

MIT
