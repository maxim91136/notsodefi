/**
 * Fairness Score Criteria (C1-C2)
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
    mappings: [
      { min: 0, max: 5, score: [9, 10], label: 'Fair launch, minimal premine (< 5%)' },
      { min: 5, max: 25, score: [6, 8], label: 'Moderate pre-allocation (5-25%)' },
      { min: 25, max: 50, score: [3, 5], label: 'High pre-allocation (25-50%)' },
      { min: 50, max: 101, score: [0, 2], label: 'Majority pre-allocated (> 50%)' },
    ],
    sources: [
      'https://www.coingecko.com/research/publications/top-layer-1-blockchains',
      'https://fintechmagazine.com/articles/top-10-layer-1-blockchain-networks',
    ],
  },
  {
    id: 'C2',
    name: 'Token Distribution & Governance Power',
    description:
      'Share of insiders (team/VC/exchanges) in supply and governance votes. Less insider control is better.',
    category: 'fairness',
    mappings: [
      { min: 0, max: 20, score: [8, 10], label: 'Insider < 20% voting power' },
      { min: 20, max: 40, score: [5, 7], label: 'Insider 20-40%' },
      { min: 40, max: 60, score: [2, 4], label: 'Insider 40-60%' },
      { min: 60, max: 101, score: [0, 2], label: 'Insider > 60%' },
    ],
    sources: [
      'https://cryptobriefing.com/top-defi-projects-the-6-most-decentralized-protocols/',
      'https://oakresearch.io/en/reports/sectors/layer-1-report-year-2024',
    ],
  },
];
