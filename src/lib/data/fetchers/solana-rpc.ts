/**
 * Solana RPC Fetcher
 *
 * Uses official Solana public RPC endpoints to fetch validator and network data.
 * No API key required.
 *
 * Rate limits: 100 requests per 10 seconds (public mainnet-beta)
 * Docs: https://solana.com/docs/references/clusters
 */

import { BaseFetcher, FetcherConfig, FetchResult } from './base';
import type { RawDataPoint } from '../sources';

interface VoteAccount {
  votePubkey: string;
  nodePubkey: string;
  activatedStake: number; // lamports
  commission: number;
}

interface VoteAccountsResponse {
  current: VoteAccount[];
  delinquent: VoteAccount[];
}

interface ClusterNode {
  pubkey: string;
  gossip: string | null;
  tpu: string | null;
  rpc: string | null;
  version: string | null;
}

const DEFAULT_CONFIG: FetcherConfig = {
  baseUrl: 'https://api.mainnet-beta.solana.com',
  rateLimit: 10, // Conservative: 10 req/min (actual limit is 600/min)
  timeout: 30000, // 30s timeout for RPC calls
};

export class SolanaRpcFetcher extends BaseFetcher {
  constructor(config: Partial<FetcherConfig> = {}) {
    super('solanabeach', { ...DEFAULT_CONFIG, ...config }); // Using 'solanabeach' as provider type
  }

  /** Make JSON-RPC call */
  private async rpcCall<T>(method: string, params: unknown[] = []): Promise<FetchResult<T>> {
    await this.throttle();

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

      const response = await fetch(this.config.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method,
          params,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        return {
          success: false,
          error: `HTTP ${response.status}: ${response.statusText}`,
        };
      }

      const json = await response.json() as { result?: T; error?: { message: string } };

      if (json.error) {
        return { success: false, error: json.error.message };
      }

      return { success: true, data: json.result };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /** Get all vote accounts (validators with stake) */
  async getVoteAccounts(): Promise<FetchResult<VoteAccountsResponse>> {
    return this.rpcCall<VoteAccountsResponse>('getVoteAccounts');
  }

  /** Get all cluster nodes */
  async getClusterNodes(): Promise<FetchResult<ClusterNode[]>> {
    return this.rpcCall<ClusterNode[]>('getClusterNodes');
  }

  /** Get total active validators */
  async getTotalValidators(): Promise<RawDataPoint | null> {
    const result = await this.getVoteAccounts();
    if (!result.success || !result.data) return null;

    const total = result.data.current.length + result.data.delinquent.length;
    return this.createDataPoint(total);
  }

  /** Get active (non-delinquent) validators */
  async getActiveValidators(): Promise<RawDataPoint | null> {
    const result = await this.getVoteAccounts();
    if (!result.success || !result.data) return null;

    return this.createDataPoint(result.data.current.length);
  }

  /** Get total nodes in cluster */
  async getTotalNodes(): Promise<RawDataPoint | null> {
    const result = await this.getClusterNodes();
    if (!result.success || !result.data) return null;

    return this.createDataPoint(result.data.length);
  }

  /** Calculate Nakamoto Coefficient (validators needed for 33% stake) */
  async getNakamotoCoefficient(): Promise<RawDataPoint | null> {
    const result = await this.getVoteAccounts();
    if (!result.success || !result.data) return null;

    const validators = result.data.current;
    if (validators.length === 0) return null;

    // Sort by stake descending
    const sorted = [...validators].sort((a, b) => b.activatedStake - a.activatedStake);

    // Calculate total stake
    const totalStake = sorted.reduce((sum, v) => sum + v.activatedStake, 0);
    const threshold = totalStake * 0.33;

    // Count validators needed to reach 33%
    let cumulativeStake = 0;
    let nakamoto = 0;

    for (const validator of sorted) {
      cumulativeStake += validator.activatedStake;
      nakamoto++;
      if (cumulativeStake >= threshold) break;
    }

    return this.createDataPoint(nakamoto);
  }

  /** Get top 5 validators stake concentration (%) */
  async getTop5Concentration(): Promise<RawDataPoint | null> {
    const result = await this.getVoteAccounts();
    if (!result.success || !result.data) return null;

    const validators = result.data.current;
    if (validators.length === 0) return null;

    // Sort by stake descending
    const sorted = [...validators].sort((a, b) => b.activatedStake - a.activatedStake);

    // Calculate total and top 5 stake
    const totalStake = sorted.reduce((sum, v) => sum + v.activatedStake, 0);
    const top5Stake = sorted.slice(0, 5).reduce((sum, v) => sum + v.activatedStake, 0);

    const percentage = Math.round((top5Stake / totalStake) * 1000) / 10; // One decimal
    return this.createDataPoint(percentage);
  }

  /** Get largest validator stake percentage */
  async getLargestValidatorPercentage(): Promise<RawDataPoint | null> {
    const result = await this.getVoteAccounts();
    if (!result.success || !result.data) return null;

    const validators = result.data.current;
    if (validators.length === 0) return null;

    // Find max stake
    const totalStake = validators.reduce((sum, v) => sum + v.activatedStake, 0);
    const maxStake = Math.max(...validators.map((v) => v.activatedStake));

    const percentage = Math.round((maxStake / totalStake) * 1000) / 10;
    return this.createDataPoint(percentage);
  }

  /** Get client version diversity (unique versions) */
  async getClientVersions(): Promise<RawDataPoint | null> {
    const result = await this.getClusterNodes();
    if (!result.success || !result.data) return null;

    const versions = new Set<string>();
    for (const node of result.data) {
      if (node.version) {
        // Extract major.minor version
        const majorMinor = node.version.split('.').slice(0, 2).join('.');
        versions.add(majorMinor);
      }
    }

    return this.createDataPoint(versions.size);
  }

  /** Get superminority count (validators in top 33% stake) */
  async getSuperminorityCount(): Promise<RawDataPoint | null> {
    const nakamoto = await this.getNakamotoCoefficient();
    return nakamoto;
  }

  /** Abstract method implementation */
  async fetch(): Promise<RawDataPoint | null> {
    return this.getTotalValidators();
  }
}

/** Singleton instance */
let instance: SolanaRpcFetcher | null = null;

export function getSolanaRpcFetcher(): SolanaRpcFetcher {
  if (!instance) {
    instance = new SolanaRpcFetcher();
  }
  return instance;
}
