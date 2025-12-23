/**
 * Blockchain.info Fetcher
 *
 * Fetches Bitcoin hashrate and mining pool data from blockchain.info API.
 * No authentication required, no rate limit documented.
 *
 * API Docs: https://www.blockchain.com/api
 */

import { BaseFetcher, type FetcherConfig } from './base';
import type { RawDataPoint } from '../sources';

/** Pool distribution response: { "Foundry USA": 250, "AntPool": 150, ... } */
type PoolDistribution = Record<string, number>;

export class BlockchainFetcher extends BaseFetcher {
  constructor(config?: Partial<FetcherConfig>) {
    super('blockchain', {
      baseUrl: 'https://api.blockchain.info',
      rateLimit: 30,    // No documented limit, be conservative
      timeout: 30000,
      ...config,
    });
  }

  /**
   * Fetch pool distribution (blocks mined in last N days)
   * @param timespan - e.g., "5days", "7days", "30days"
   */
  async fetchPoolDistribution(timespan = '5days'): Promise<PoolDistribution | null> {
    const result = await this.request<PoolDistribution>(`/pools?timespan=${timespan}`);
    return result.success ? result.data! : null;
  }

  /**
   * Get top 5 pool concentration percentage
   * Measures mining centralization
   */
  async getTop5PoolConcentration(): Promise<RawDataPoint | null> {
    const pools = await this.fetchPoolDistribution('5days');
    if (!pools) return null;

    // Sort pools by block count
    const sorted = Object.entries(pools)
      .filter(([name]) => name !== 'Unknown') // Exclude unknown
      .sort((a, b) => b[1] - a[1]);

    const totalBlocks = Object.values(pools).reduce((sum, count) => sum + count, 0);
    const top5Blocks = sorted.slice(0, 5).reduce((sum, [, count]) => sum + count, 0);

    const concentration = Math.round((top5Blocks / totalBlocks) * 100);

    return this.createDataPoint(concentration, 1.0);
  }

  /**
   * Get largest single pool percentage
   */
  async getLargestPoolPercentage(): Promise<RawDataPoint | null> {
    const pools = await this.fetchPoolDistribution('5days');
    if (!pools) return null;

    const sorted = Object.entries(pools)
      .filter(([name]) => name !== 'Unknown')
      .sort((a, b) => b[1] - a[1]);

    if (sorted.length === 0) return null;

    const totalBlocks = Object.values(pools).reduce((sum, count) => sum + count, 0);
    const largestBlocks = sorted[0][1];

    const percentage = Math.round((largestBlocks / totalBlocks) * 100);

    return this.createDataPoint(percentage, 1.0);
  }

  /**
   * Get pool diversity (number of significant pools)
   * Counts pools with >1% of blocks
   */
  async getPoolDiversity(): Promise<RawDataPoint | null> {
    const pools = await this.fetchPoolDistribution('5days');
    if (!pools) return null;

    const totalBlocks = Object.values(pools).reduce((sum, count) => sum + count, 0);
    const threshold = totalBlocks * 0.01; // 1% threshold

    const significantPools = Object.entries(pools)
      .filter(([name, count]) => name !== 'Unknown' && count >= threshold)
      .length;

    return this.createDataPoint(significantPools, 1.0);
  }

  /**
   * Generic fetch method
   */
  async fetch(params: Record<string, string>): Promise<RawDataPoint | null> {
    const metric = params.metric || 'top5_concentration';

    switch (metric) {
      case 'top5_concentration':
        return this.getTop5PoolConcentration();
      case 'largest_pool':
        return this.getLargestPoolPercentage();
      case 'pool_diversity':
        return this.getPoolDiversity();
      default:
        return null;
    }
  }
}

/** Singleton instance */
let instance: BlockchainFetcher | null = null;

export function getBlockchainFetcher(): BlockchainFetcher {
  if (!instance) {
    instance = new BlockchainFetcher();
  }
  return instance;
}
