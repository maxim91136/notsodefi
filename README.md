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

## Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build
```

## Tech Stack

- Next.js 16 (Static Export)
- TypeScript
- Tailwind CSS
- Cloudflare Pages

## License

MIT
