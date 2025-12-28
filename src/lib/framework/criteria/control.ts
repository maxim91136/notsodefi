/**
 * Control Score Criteria (B1-B6)
 *
 * Measures power and control structures around the protocol.
 */

import { Criterion } from '../types';

export const controlCriteria: Criterion[] = [
  {
    id: 'B1',
    name: 'Corporate/Foundation Capture',
    description:
      'Is there a dominant company/foundation controlling roadmap, marketing, and hiring? Can the project survive without them?',
    category: 'control',
    mappings: [
      { min: 9, max: 11, score: [9, 10], label: 'No corporate owner (Bitcoin-style)' },
      { min: 6, max: 9, score: [6, 8], label: 'Multiple orgs, none dominant' },
      { min: 2, max: 6, score: [2, 5], label: 'One entity controls de facto' },
      { min: 0, max: 2, score: [0, 2], label: 'Full "CEO chain"' },
    ],
    sources: [
      'https://fintechmagazine.com/articles/top-10-layer-1-blockchain-networks',
      'https://oakresearch.io/en/reports/sectors/layer-1-report-year-2024',
    ],
  },
  {
    id: 'B2',
    name: 'Repo/Protocol Ownership',
    description:
      'Distribution of merge rights in core repositories (clients, specs). More distributed is better.',
    category: 'control',
    mappings: [
      { min: 8, max: 11, score: [8, 10], label: 'Many maintainers from different orgs' },
      { min: 5, max: 8, score: [5, 7], label: 'Mix of company + community' },
      { min: 0, max: 5, score: [1, 4], label: 'Almost only one company team' },
    ],
    sources: ['https://oakresearch.io/en/reports/sectors/layer-1-report-year-2024'],
  },
  {
    id: 'B3',
    name: 'Brand & Frontend Control',
    description:
      'Who owns brand, domains, main frontends, official wallets/apps? Decentralized ownership is better.',
    category: 'control',
    mappings: [
      { min: 8, max: 11, score: [8, 10], label: 'Brand in DAO/community + multiple frontends' },
      { min: 3, max: 8, score: [3, 7], label: 'Foundation holds brand & main frontend' },
      { min: 0, max: 3, score: [1, 3], label: 'Single corporate frontend, no alternatives' },
    ],
    sources: [
      'https://www.ainvest.com/news/aave-brand-decentralization-vote-pivotal-moment-dao-governance-token-utility-2512/',
      'https://cryptonews.net/news/defi/32174155/',
    ],
  },
  {
    id: 'B4',
    name: 'Treasury & Upgrade Keys',
    description:
      'Composition of treasury/upgrade multisigs and admin keys. More independent signers is better.',
    category: 'control',
    mappings: [
      { min: 10, max: Infinity, score: [8, 10], label: '>= 10 independent signers' },
      { min: 5, max: 10, score: [4, 7], label: '5-9 signers, partly team/VC' },
      { min: 0, max: 5, score: [1, 3], label: '2-4 core dev/founder signers' },
    ],
    sources: [
      'https://bbx.com/article/506587',
      'https://oakresearch.io/en/reports/sectors/layer-1-report-year-2024',
    ],
  },
  {
    id: 'B5',
    name: 'Admin Halt Capability',
    description:
      'Can a single entity or small group unilaterally halt, freeze, or censor the chain? This is a critical centralization risk.',
    category: 'control',
    mappings: [
      { min: 9, max: 11, score: 10, label: 'No halt capability - truly unstoppable' },
      { min: 5, max: 9, score: [5, 8], label: 'Emergency halt requires broad consensus' },
      { min: 1, max: 5, score: [1, 4], label: 'Foundation/team can coordinate halt' },
      { min: 0, max: 1, score: 0, label: 'Single entity can halt/freeze chain' },
    ],
    sources: [
      'https://arxiv.org/html/2407.10302v1',
    ],
  },
  {
    id: 'B6',
    name: 'Protocol Immutability',
    description:
      'Has the protocol made fundamental rule changes (consensus mechanism, monetary policy, contentious forks)? Immutable rules are a core property of decentralization.',
    category: 'control',
    mappings: [
      { min: 0, max: 1, score: 10, label: 'No fundamental changes - immutable rules (Bitcoin)' },
      { min: 1, max: 2, score: [7, 8], label: 'Minor changes, no consensus/monetary changes' },
      { min: 2, max: 4, score: [4, 6], label: '1-2 major changes (fork or consensus change)' },
      { min: 4, max: Infinity, score: [1, 3], label: 'Multiple major changes, "move fast" culture' },
    ],
    sources: [
      'https://ethereum.org/en/history/',
      'https://en.bitcoin.it/wiki/Consensus_versions',
    ],
  },
];
