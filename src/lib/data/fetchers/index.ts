/**
 * Data Fetchers Module
 *
 * Exports all API fetchers for decentralization metrics.
 */

export { BaseFetcher } from './base';
export type { FetcherConfig, FetchResult } from './base';

// Implemented fetchers
export { BitnodesFetcher, getBitnodesFetcher } from './bitnodes';

// TODO: Implement these fetchers
// export { SolanaBeachFetcher } from './solanabeach';
// export { GitHubFetcher } from './github';
// export { EthernodesFetcher } from './ethernodes';
