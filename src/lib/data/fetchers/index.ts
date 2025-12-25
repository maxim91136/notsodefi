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

// Ethereum fetchers
export { EthereumBeaconFetcher, getEthereumBeaconFetcher } from './ethereum-beacon';

// XRP Ledger fetchers
export { XrplFetcher, getXrplFetcher } from './xrpl';

// BNB Chain fetchers
export { BnbChainFetcher, getBnbChainFetcher } from './bnb-chain';

// Zcash fetchers
export { ZcashFetcher, getZcashFetcher } from './zcash';

// Bittensor fetchers
export { BittensorFetcher, getBittensorFetcher } from './bittensor';

// Cardano fetchers
export { CardanoFetcher, getCardanoFetcher } from './cardano';

// Avalanche fetchers
export { AvalancheFetcher } from './avalanche';

// Tron fetchers
export { TronFetcher } from './tron';

// Litecoin fetchers
export { LitecoinFetcher } from './litecoin';

// Monero fetchers
export { MoneroFetcher } from './monero';

// Dogecoin fetchers
export { DogecoinFetcher } from './dogecoin';

// Bitcoin Cash fetchers
export { BitcoinCashFetcher } from './bitcoincash';

// Polkadot fetchers
export { PolkadotFetcher, getPolkadotFetcher } from './polkadot';

// Cosmos fetchers
export { CosmosFetcher, getCosmosFetcher } from './cosmos';

// Hyperliquid fetchers
export { HyperliquidFetcher, getHyperliquidFetcher } from './hyperliquid';

// Kaspa fetchers
export { KaspaFetcher, getKaspaFetcher } from './kaspa';
