# NotSoDeFi

**Measuring Real Decentralization**

A framework for objectively measuring blockchain and protocol decentralization. Because "decentralized" doesn't mean what most projects claim it means.

Live: [notsodefi.com](https://notsodefi.com)

## The Framework

Three scores, ten criteria:

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

- **PoW** (Proof of Work) - Bitcoin, etc.
- **PoS** (Proof of Stake) - Ethereum, etc.
- **DPoS** (Delegated Proof of Stake) - EOS, Tron, etc.
- **Hybrid** - Bittensor, Decred, etc.

Some criteria may be N/A depending on the consensus type.

## Data Sources

Automated data fetching from multiple APIs:

| Chain | Node Data | Validator/Mining | Governance |
|-------|-----------|------------------|------------|
| Bitcoin | [Bitnodes](https://bitnodes.io) | [Blockchain.com](https://blockchain.com/pools) | N/A |
| Ethereum | [Ethernodes](https://ethernodes.org) | [Rated Network](https://rated.network) | [Snapshot](https://snapshot.org) |
| Solana | [SolanaBeach](https://solanabeach.io) | [SolanaBeach](https://solanabeach.io) | Manual |

Code control metrics via [GitHub API](https://docs.github.com/en/rest).

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
