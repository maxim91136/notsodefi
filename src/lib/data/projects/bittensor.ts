/**
 * Bittensor (TAO) - Decentralization Assessment
 *
 * Decentralized AI/ML network built on Substrate.
 * Launched 2021. Claims "fair launch" but was incubated by Polychain Capital in 2019.
 * Uses Yuma Consensus with validators and miners on subnets.
 *
 * FUNDING REALITY (contradicts "no VC" narrative):
 * - Polychain Capital: Incubated 2019, accumulated ~$200M in TAO (may have sold)
 * - DCG (Barry Silbert): Largest holder ~500k TAO (2.4% supply, ~$175M) - May 2025
 * - Dao5: ~$50M in TAO
 * - Crunchbase: 4 funding rounds documented
 */

import { Project } from '@/lib/framework';
import { calculateProjectScores } from '@/lib/framework';

// Raw assessment values (null = N/A, not applicable)
const rawValues: Record<string, number | null> = {
  // Chain Score (A1-A4)
  A1: 15,   // Moderate Nakamoto coefficient across subnets
  A2: 30,   // Estimated top 5 validator concentration
  A3: 2,    // Bittensor SDK + Subtensor implementations
  A4: 70,   // High cloud usage for AI compute requirements

  // Control Score (B1-B6)
  B1: 4,    // Opentensor Foundation primary but growing ecosystem
  B2: 3,    // Opentensor controls main implementations
  B3: 3,    // Foundation controls trademark and branding
  B4: 4,    // Foundation-controlled treasury
  B5: 7,    // Subnet structure limits halt capability, foundation influence moderate
  B6: 4,   // Young chain (2021), subnet structure evolving, Substrate upgrades

  // Fairness Score (C1-C2)
  C1: 45,   // VCs incubated 2019, DCG 2.4% supply, despite "fair launch" claims
  C2: 6,   // Subnet autonomy + on-chain governance via ZIP-style proposals
};

export const bittensor: Project = {
  id: 'bittensor',
  name: 'Bittensor',
  symbol: 'TAO',
  category: 'L1',
  consensusType: 'hybrid',
  website: 'https://bittensor.com',
  description:
    'Decentralized AI/ML network. Claims "fair launch, no VC" but incubated by Polychain 2019. DCG largest holder (2.4% supply).',
  scores: calculateProjectScores(rawValues),
  lastUpdated: '2025-12-30',
  sources: [
    'https://taostats.io',
    'https://docs.bittensor.com',
    'https://github.com/opentensor/bittensor',
    'https://fortune.com/crypto/2024/04/15/bittensor-polychain-capital/',
    'https://www.theblock.co/post/dcg-bittensor-holdings-2025',
  ],
};
