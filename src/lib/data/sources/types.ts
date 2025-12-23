/**
 * Data Source Types
 *
 * Defines the schema for fetching decentralization metrics from various APIs.
 * Each criterion can have multiple data sources with fallbacks.
 */

/** Supported data source providers */
export type DataSourceProvider =
  | 'bitnodes'       // Bitcoin node data
  | 'ethernodes'     // Ethereum node data
  | 'solanabeach'    // Solana validator/node data (api.solanabeach.io)
  | 'validatorsapp'  // Solana validators.app
  | 'chainspect'     // Nakamoto coefficient (scraping)
  | 'rated'          // Ethereum validator data
  | 'github'         // Code contribution data
  | 'snapshot'       // Governance voting data
  | 'coingecko'      // Token/market data
  | 'coinlore'       // Token supply data
  | 'blockchain'     // Bitcoin pool/hashrate data
  | 'manual';        // Manually entered (static)

/** Data freshness requirements */
export type UpdateFrequency = 'realtime' | 'daily' | 'weekly' | 'static';

/** Raw data from an API before transformation */
export interface RawDataPoint {
  value: number | string | null;
  timestamp: Date;
  source: DataSourceProvider;
  confidence: number; // 0-1, how reliable is this data
}

/** Configuration for a single data source */
export interface DataSourceConfig {
  provider: DataSourceProvider;
  /** API endpoint or identifier */
  endpoint?: string;
  /** How to extract the value from API response */
  extractor?: string; // JSONPath or function name
  /** Transform raw value to criterion format */
  transform?: (raw: unknown) => number | null;
  /** Rate limit (requests per minute) */
  rateLimit?: number;
  /** Requires API key? */
  requiresAuth?: boolean;
}

/** Mapping of a criterion to its data sources */
export interface CriterionDataMapping {
  criterionId: string;
  /** Primary data source */
  primary: DataSourceConfig;
  /** Fallback sources if primary fails */
  fallbacks?: DataSourceConfig[];
  /** How often to update */
  updateFrequency: UpdateFrequency;
  /** Chain-specific? (e.g., different APIs for BTC vs ETH) */
  chainSpecific?: boolean;
}

/** Project-specific data source overrides */
export interface ProjectDataSources {
  projectId: string;
  /** Override default sources for specific criteria */
  overrides: Partial<Record<string, DataSourceConfig>>;
  /** Chain-specific identifiers (e.g., GitHub repo, token address) */
  identifiers: {
    githubOrg?: string;
    githubRepos?: string[];
    tokenAddress?: string;
    snapshotSpace?: string;
    chainId?: string;
  };
}

/** Cached data for a project */
export interface ProjectDataCache {
  projectId: string;
  lastUpdated: Date;
  data: Record<string, RawDataPoint>;
  /** Which sources succeeded/failed */
  sourceStatus: Record<string, 'success' | 'failed' | 'skipped'>;
}
