/**
 * Data Fetchers Module
 *
 * Exports all API fetchers for decentralization metrics.
 */

export { BaseFetcher } from './base';
export type { FetcherConfig, FetchResult } from './base';

// Bitcoin fetchers
export { BitnodesFetcher, getBitnodesFetcher } from './bitnodes';
export { BlockchainFetcher, getBlockchainFetcher } from './blockchain';

// Solana fetchers
export { SolanaRpcFetcher, getSolanaRpcFetcher } from './solana-rpc';

// TODO: Implement these fetchers
// export { GitHubFetcher } from './github';
// export { EthernodesFetcher } from './ethernodes';
