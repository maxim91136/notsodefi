/**
 * Criterion to Data Source Mappings
 *
 * Defines where each criterion's data comes from.
 * Chain-specific sources are handled via ProjectDataSources.
 */

import type { CriterionDataMapping, ProjectDataSources } from './types';

/** Default mappings for all criteria */
export const criterionMappings: CriterionDataMapping[] = [
  // ============================================================================
  // Chain Score (A1-A4)
  // ============================================================================
  {
    criterionId: 'A1', // Nakamoto Coefficient
    primary: {
      provider: 'chainspect',
      endpoint: '/chain/{chainId}',
      extractor: 'nakamoto_coefficient',
    },
    fallbacks: [
      { provider: 'manual' },
    ],
    updateFrequency: 'weekly',
    chainSpecific: true,
  },
  {
    criterionId: 'A2', // Validator/Miner Concentration
    primary: {
      provider: 'rated', // For PoS chains
      endpoint: '/v1/eth/operators',
      extractor: 'top5_concentration',
    },
    fallbacks: [
      {
        provider: 'blockchain', // For PoW chains
        endpoint: '/pools',
      },
      { provider: 'manual' },
    ],
    updateFrequency: 'weekly',
    chainSpecific: true,
  },
  {
    criterionId: 'A3', // Client Independence
    primary: {
      provider: 'ethernodes', // For ETH
      endpoint: '/clients',
      extractor: 'unique_clients',
    },
    fallbacks: [
      { provider: 'manual' },
    ],
    updateFrequency: 'weekly',
    chainSpecific: true,
  },
  {
    criterionId: 'A4', // Node Geography & Hosting
    primary: {
      provider: 'bitnodes', // For BTC
      endpoint: '/api/v1/snapshots/latest/',
      extractor: 'cloud_percentage',
    },
    fallbacks: [
      {
        provider: 'ethernodes', // For ETH
        endpoint: '/countries',
      },
      { provider: 'manual' },
    ],
    updateFrequency: 'weekly',
    chainSpecific: true,
  },

  // ============================================================================
  // Control Score (B1-B6)
  // ============================================================================
  {
    criterionId: 'B1', // Corporate/Foundation Capture
    primary: {
      provider: 'github',
      endpoint: '/repos/{org}/{repo}/contributors',
      extractor: 'org_dominance',
      transform: (raw) => {
        // Calculate how much one org dominates commits
        const topContributorPercent = raw as number;
        // Invert: higher diversity = higher score
        return Math.round(10 - (topContributorPercent / 10));
      },
    },
    fallbacks: [
      { provider: 'manual' },
    ],
    updateFrequency: 'weekly',
    chainSpecific: true,
  },
  {
    criterionId: 'B2', // Repo/Protocol Ownership
    primary: {
      provider: 'github',
      endpoint: '/repos/{org}/{repo}/stats/contributors',
      extractor: 'maintainer_diversity',
    },
    fallbacks: [
      { provider: 'manual' },
    ],
    updateFrequency: 'weekly',
    chainSpecific: true,
  },
  {
    criterionId: 'B3', // Brand & Frontend Control
    primary: {
      provider: 'manual', // Truly manual - no API for brand ownership
    },
    updateFrequency: 'static',
  },
  {
    criterionId: 'B4', // Treasury & Upgrade Keys
    primary: {
      provider: 'manual', // On-chain analysis needed
    },
    fallbacks: [],
    updateFrequency: 'static',
  },

  // ============================================================================
  // Fairness Score (C1-C2)
  // ============================================================================
  {
    criterionId: 'C1', // Launch Fairness / Premine
    primary: {
      provider: 'manual', // Historical data, never changes
    },
    updateFrequency: 'static',
  },
  {
    criterionId: 'C2', // Token Distribution & Governance Power
    primary: {
      provider: 'snapshot',
      endpoint: '/graphql',
      extractor: 'voting_power_concentration',
    },
    fallbacks: [
      {
        provider: 'coingecko',
        endpoint: '/coins/{id}/holders',
        extractor: 'top_holders_concentration',
      },
      { provider: 'manual' },
    ],
    updateFrequency: 'weekly',
    chainSpecific: true,
  },
];

/** Project-specific data source configurations */
export const projectSources: ProjectDataSources[] = [
  {
    projectId: 'bitcoin',
    identifiers: {
      githubOrg: 'bitcoin',
      githubRepos: ['bitcoin'],
    },
    overrides: {
      // Bitcoin uses bitnodes for A4, not ethernodes
      A4: {
        provider: 'bitnodes',
        endpoint: '/api/v1/snapshots/latest/',
      },
      // Bitcoin uses blockchain.com for A2 (pool distribution)
      A2: {
        provider: 'blockchain',
        endpoint: '/pools',
      },
      // Bitcoin has no on-chain governance
      C2: {
        provider: 'manual',
      },
    },
  },
  {
    projectId: 'ethereum',
    identifiers: {
      githubOrg: 'ethereum',
      githubRepos: ['go-ethereum', 'consensus-specs'],
      snapshotSpace: 'ens.eth', // Example - ETH doesn't use Snapshot directly
      chainId: 'ethereum',
    },
    overrides: {
      A2: {
        provider: 'rated',
        endpoint: '/v1/eth/operators',
      },
      A3: {
        provider: 'ethernodes',
        endpoint: '/clients',
      },
      A4: {
        provider: 'ethernodes',
        endpoint: '/countries',
      },
    },
  },
  {
    projectId: 'solana',
    identifiers: {
      githubOrg: 'solana-labs',
      githubRepos: ['solana', 'solana-program-library'],
      chainId: 'solana',
      snapshotSpace: 'realms.solana', // Solana uses Realms for governance
    },
    overrides: {
      // Solana validator data from solanabeach.io API
      A1: {
        provider: 'solanabeach',
        endpoint: '/v1/validators',
        extractor: 'nakamoto_coefficient',
      },
      A2: {
        provider: 'solanabeach',
        endpoint: '/v1/validators',
        extractor: 'top5_stake_concentration',
      },
      A3: {
        provider: 'solanabeach',
        endpoint: '/v1/cluster-stats',
        extractor: 'client_versions',
      },
      A4: {
        provider: 'solanabeach',
        endpoint: '/v1/validators',
        extractor: 'datacenter_concentration',
      },
      // Solana governance via Realms (no Snapshot)
      C2: {
        provider: 'manual', // Realms API would need custom integration
      },
    },
  },
];

/** Get data source config for a criterion and project */
export function getDataSource(
  criterionId: string,
  projectId: string
): CriterionDataMapping | undefined {
  const projectConfig = projectSources.find((p) => p.projectId === projectId);
  const defaultMapping = criterionMappings.find((m) => m.criterionId === criterionId);

  if (!defaultMapping) return undefined;

  // Check for project-specific override
  if (projectConfig?.overrides[criterionId]) {
    return {
      ...defaultMapping,
      primary: projectConfig.overrides[criterionId]!,
    };
  }

  return defaultMapping;
}

/** Get all data sources needed for a project */
export function getProjectDataSources(projectId: string): CriterionDataMapping[] {
  return criterionMappings.map((mapping) => {
    const resolved = getDataSource(mapping.criterionId, projectId);
    return resolved || mapping;
  });
}
