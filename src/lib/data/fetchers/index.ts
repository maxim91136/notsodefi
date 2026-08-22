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

// Ethereum fetchers
export { EthereumBeaconFetcher, getEthereumBeaconFetcher } from './ethereum-beacon';

// Litecoin fetchers
export { LitecoinFetcher } from './litecoin';

// Monero fetchers
export { MoneroFetcher } from './monero';

// Dogecoin fetchers
export { DogecoinFetcher } from './dogecoin';

// Bitcoin Cash fetchers
export { BitcoinCashFetcher } from './bitcoincash';

// Kaspa fetchers
export { KaspaFetcher, getKaspaFetcher } from './kaspa';

// Ethereum Classic fetchers
export { ETCFetcher, getETCFetcher } from './etc';
