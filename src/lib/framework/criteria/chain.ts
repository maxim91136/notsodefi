/**
 * Chain Score Criteria (A1-A5)
 *
 * Measures technical and economic decentralization of the chain.
 */

import { Criterion } from '../types';

export const chainCriteria: Criterion[] = [
  {
    id: 'A1',
    name: 'Nakamoto Coefficient',
    description:
      'Number of independent entities that would need to collude to compromise the system. Higher is better.',
    category: 'chain',
    mappings: [
      { min: 40, max: Infinity, score: 10, label: 'Excellent (>= 40)' },
      { min: 30, max: 40, score: 9, label: 'Very Good (30-39)' },
      { min: 20, max: 30, score: [7, 8], label: 'Good (20-29)' },
      { min: 10, max: 20, score: [5, 6], label: 'Moderate (10-19)' },
      { min: 4, max: 10, score: [3, 4], label: 'Low (4-9)' },
      { min: 0, max: 4, score: [1, 2], label: 'Critical (<= 3)' },
    ],
    sources: [
      'https://nakaflow.io',
      'https://chainspect.app/dashboard/decentralization',
    ],
  },
  {
    id: 'A2',
    name: 'Validator/Miner Concentration',
    description:
      'Share of top 5 validators/miners in stake/hashrate. Lower concentration is better.',
    category: 'chain',
    // NOTE: Scores are [high, low] because lower concentration % = higher score
    mappings: [
      { min: 0, max: 25, score: 10, label: 'Excellent (< 25%)' },
      { min: 25, max: 40, score: [8, 7], label: 'Good (25-40%)' },
      { min: 40, max: 60, score: [6, 4], label: 'Moderate (40-60%)' },
      { min: 60, max: 101, score: [3, 1], label: 'Critical (> 60%)' },
    ],
    sources: ['https://web3index.com/blog/comparing-top-layer-1-blockchains'],
  },
  {
    id: 'A3',
    name: 'Client Independence',
    description:
      'Number of independently developed full-node implementations. Measures resilience against single-codebase bugs and single-entity control.',
    category: 'chain',
    mappings: [
      { min: 3, max: Infinity, score: [9, 10], label: 'Excellent (>= 3 clients, none > 70%)' },
      { min: 2, max: 3, score: [6, 8], label: 'Good (2 clients)' },
      { min: 0, max: 2, score: [2, 4], label: 'Critical (1 dominant client)' },
    ],
    sources: ['https://oakresearch.io/en/reports/sectors/layer-1-report-year-2024'],
  },
  {
    id: 'A4',
    name: 'Node Geography & Hosting',
    description:
      'Geographic distribution of nodes and cloud hosting concentration. Lower cloud % is better.',
    category: 'chain',
    // NOTE: Scores are [high, low] because lower cloud % = higher score
    mappings: [
      { min: 0, max: 40, score: [10, 9], label: 'Excellent (< 40% cloud)' },
      { min: 40, max: 70, score: [8, 5], label: 'Moderate (40-70% cloud)' },
      { min: 70, max: 101, score: [4, 1], label: 'Critical (> 70% cloud)' },
    ],
    sources: ['https://oakresearch.io/en/reports/sectors/layer-1-report-year-2024'],
  },
  {
    id: 'A5',
    name: 'Full Node Decentralization',
    description:
      'Number of independent full nodes validating the chain. More nodes = harder to attack, better censorship resistance. For PoW chains, this is separate from miners. For PoS, validators often = nodes.',
    category: 'chain',
    mappings: [
      { min: 10000, max: Infinity, score: 10, label: 'Excellent (>= 10,000 nodes)' },
      { min: 5000, max: 10000, score: [8, 9], label: 'Very Good (5,000-10,000)' },
      { min: 1000, max: 5000, score: [6, 7], label: 'Good (1,000-5,000)' },
      { min: 500, max: 1000, score: [4, 5], label: 'Moderate (500-1,000)' },
      { min: 100, max: 500, score: [2, 3], label: 'Low (100-500)' },
      { min: 0, max: 100, score: [0, 1], label: 'Critical (< 100 nodes)' },
    ],
    sources: [
      'https://bitnodes.io',
      'https://ethernodes.org',
      'https://monero.fail',
    ],
  },
];
