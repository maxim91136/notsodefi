/**
 * Chain Score Criteria (A1-A4)
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
    mappings: [
      { min: 0, max: 25, score: 10, label: 'Excellent (< 25%)' },
      { min: 25, max: 40, score: [7, 8], label: 'Good (25-40%)' },
      { min: 40, max: 60, score: [4, 6], label: 'Moderate (40-60%)' },
      { min: 60, max: 101, score: [1, 3], label: 'Critical (> 60%)' },
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
    mappings: [
      { min: 0, max: 40, score: [9, 10], label: 'Excellent (< 40% cloud)' },
      { min: 40, max: 70, score: [5, 8], label: 'Moderate (40-70% cloud)' },
      { min: 70, max: 101, score: [1, 4], label: 'Critical (> 70% cloud)' },
    ],
    sources: ['https://oakresearch.io/en/reports/sectors/layer-1-report-year-2024'],
  },
];
