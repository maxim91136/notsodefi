/**
 * Fairness Score Criteria (C1-C3)
 *
 * Measures launch, distribution, and governance fairness.
 */

import { Criterion } from '../types';

export const fairnessCriteria: Criterion[] = [
  {
    id: 'C1',
    name: 'Launch Fairness / Premine',
    description:
      'Team/VC/Foundation premine and launch model (fair launch vs. sale/IDO). Less premine is better.',
    category: 'fairness',
    // NOTE: Scores are [high, low] because lower premine % = higher score
    mappings: [
      { min: 0, max: 5, score: [10, 9], label: 'Fair launch, minimal premine (< 5%)' },
      { min: 5, max: 25, score: [8, 6], label: 'Moderate pre-allocation (5-25%)' },
      { min: 25, max: 50, score: [5, 3], label: 'High pre-allocation (25-50%)' },
      { min: 50, max: 101, score: [2, 0], label: 'Majority pre-allocated (> 50%)' },
    ],
    sources: [
      'https://www.coingecko.com/research/publications/top-layer-1-blockchains',
      'https://fintechmagazine.com/articles/top-10-layer-1-blockchain-networks',
    ],
  },
  {
    id: 'C2',
    name: 'Token Concentration',
    description:
      'Share of circulating supply held by insiders (team/VC/foundation). Less concentration is better.',
    category: 'fairness',
    // NOTE: Scores are [high, low] because lower concentration % = higher score
    mappings: [
      { min: 0, max: 20, score: [10, 8], label: 'Insider < 20% of supply' },
      { min: 20, max: 40, score: [7, 5], label: 'Insider 20-40%' },
      { min: 40, max: 60, score: [4, 2], label: 'Insider 40-60%' },
      { min: 60, max: 101, score: [2, 0], label: 'Insider > 60%' },
    ],
    sources: [
      'https://cryptobriefing.com/top-defi-projects-the-6-most-decentralized-protocols/',
      'https://oakresearch.io/en/reports/sectors/layer-1-report-year-2024',
    ],
  },
  {
    id: 'C3',
    name: 'Governance Control',
    description:
      'Share of governance voting power held by insiders. 100% = no token governance (team decides everything). Less insider control is better.',
    category: 'fairness',
    // NOTE: Scores are [high, low] because lower insider control % = higher score
    mappings: [
      { min: 0, max: 20, score: [10, 8], label: 'Insider < 20% voting power' },
      { min: 20, max: 40, score: [7, 5], label: 'Insider 20-40%' },
      { min: 40, max: 60, score: [4, 2], label: 'Insider 40-60%' },
      { min: 60, max: 101, score: [2, 0], label: 'Insider > 60% or no governance' },
    ],
    sources: [
      'https://cryptobriefing.com/top-defi-projects-the-6-most-decentralized-protocols/',
      'https://oakresearch.io/en/reports/sectors/layer-1-report-year-2024',
    ],
  },
];
