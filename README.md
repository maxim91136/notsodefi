# NotSoDeFi

**Measuring Real Decentralization**

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

- **PoW** (Proof of Work) - Bitcoin, Bitcoin Cash, Dogecoin, Litecoin, Monero, Zcash
- **PoS** (Proof of Stake) - Ethereum, Solana, Cardano, Avalanche, Polkadot, Cosmos, Hyperliquid
- **DPoS** (Delegated Proof of Stake) - BNB Chain, Tron
- **Federated** - XRP
- **Hybrid** - Bittensor

Some criteria may be N/A depending on the consensus type.

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
| Polkadot | DOT | PoS | [Subscan](https://polkadot.subscan.io) |
| Cosmos Hub | ATOM | PoS | [Cosmos REST API](https://rest.cosmos.directory) |
| Hyperliquid | HYPE | PoS | [Hyperliquid API](https://api.hyperliquid.xyz) |

All data is fetched daily via GitHub Actions.

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
│   ├── layout/            # Header, Footer
│   ├── scores/            # Score display components
│   └── ui/                # Base UI components
└── lib/
    ├── framework/         # Scoring logic & criteria
    ├── data/
    │   ├── projects/      # Project definitions
    │   ├── sources/       # API source mappings
    │   └── fetchers/      # API fetcher classes
    └── utils/             # Helper functions
```

## Tech Stack

- Next.js 15 (Static Export)
- TypeScript
- Tailwind CSS
- Cloudflare Pages

## License

MIT
