/**
 * Bittensor (TAO) - Decentralization Assessment
 *
 * Decentralized AI/ML network built on Substrate.
 * Launched 2021, no premine.
 * Uses Yuma Consensus with validators and miners on subnets.
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
  C1: 0,    // No premine - fair launch
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
    'Decentralized AI/ML network with 90+ subnets. Fair launch, no premine. Yuma Consensus.',
  scores: calculateProjectScores(rawValues),
  lastUpdated: '2025-12-24',
  sources: [
    'https://taostats.io',
    'https://docs.bittensor.com',
    'https://github.com/opentensor/bittensor',
  ],
};
