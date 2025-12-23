/**
 * Bittensor (TAO) Fetcher
 *
 * Fetches network data from Taostats API.
 * Bittensor is a decentralized AI/ML network built on Substrate.
 * Uses DPoS-like consensus with validators and miners on subnets.
 */

const TAOSTATS_API_BASE = 'https://api.taostats.io/api';

interface TaostatsStatsResponse {
  pagination: {
    current_page: number;
    total_items: number;
  };
  data: Array<{
    block_number: number;
    timestamp: string;
    issued: string;
    total_staked: string;
    alpha_staked: string;
    root_staked: string;
    subnet_locked: string;
    free_balance: string;
    accounts: number;
    balance_holders: number;
    extrinsics: number;
    transfers: number;
    subnets: number;
    registration_cost: string;
  }>;
}

interface TaostatsSubnetsResponse {
  pagination: {
    current_page: number;
    total_items: number;
  };
  data: Array<{
    netuid: number;
    owner: string;
    tempo: number;
    active_keys: number;
    validators: number;
    max_validators: number;
    emission: string;
    difficulty: string;
    registration_allowed: boolean;
  }>;
}

export class BittensorFetcher {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string, baseUrl?: string) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl || TAOSTATS_API_BASE;
  }

  private async fetchEndpoint<T>(endpoint: string): Promise<T | null> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: {
          Authorization: this.apiKey,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        console.error(`Taostats API error: ${response.status}`);
        return null;
      }

      return (await response.json()) as T;
    } catch (error) {
      console.error('Taostats API fetch error:', error);
      return null;
    }
  }

  /**
   * Get latest network stats
   */
  async getNetworkStats(): Promise<{
    blockNumber: number | null;
    accounts: number | null;
    subnets: number | null;
    totalStaked: number | null;
    issued: number | null;
    registrationCost: number | null;
  } | null> {
    const data = await this.fetchEndpoint<TaostatsStatsResponse>('/stats/latest/v1');

    if (!data?.data?.[0]) {
      return null;
    }

    const stats = data.data[0];

    return {
      blockNumber: stats.block_number,
      accounts: stats.accounts,
      subnets: stats.subnets,
      totalStaked: stats.total_staked ? parseFloat(stats.total_staked) / 1e9 : null, // Convert from RAO to TAO
      issued: stats.issued ? parseFloat(stats.issued) / 1e9 : null,
      registrationCost: stats.registration_cost ? parseFloat(stats.registration_cost) / 1e9 : null,
    };
  }

  /**
   * Get subnet overview (validators count across subnets)
   */
  async getSubnetOverview(): Promise<{
    totalValidators: number | null;
    totalActiveKeys: number | null;
    subnetCount: number | null;
  } | null> {
    const data = await this.fetchEndpoint<TaostatsSubnetsResponse>('/subnet/latest/v1?limit=200');

    if (!data?.data) {
      return null;
    }

    const subnets = data.data;
    const totalValidators = subnets.reduce((sum, s) => sum + (s.validators || 0), 0);
    const totalActiveKeys = subnets.reduce((sum, s) => sum + (s.active_keys || 0), 0);

    return {
      totalValidators,
      totalActiveKeys,
      subnetCount: subnets.length,
    };
  }

  /**
   * Get all Bittensor metrics
   */
  async getAllMetrics(): Promise<{
    blockNumber: number | null;
    accounts: number | null;
    subnets: number | null;
    totalStaked: number | null;
    issued: number | null;
    totalValidators: number | null;
    totalActiveKeys: number | null;
  }> {
    const [stats, subnetOverview] = await Promise.all([
      this.getNetworkStats(),
      this.getSubnetOverview(),
    ]);

    return {
      blockNumber: stats?.blockNumber ?? null,
      accounts: stats?.accounts ?? null,
      subnets: stats?.subnets ?? null,
      totalStaked: stats?.totalStaked ?? null,
      issued: stats?.issued ?? null,
      totalValidators: subnetOverview?.totalValidators ?? null,
      totalActiveKeys: subnetOverview?.totalActiveKeys ?? null,
    };
  }
}

export function getBittensorFetcher(apiKey: string, baseUrl?: string): BittensorFetcher {
  return new BittensorFetcher(apiKey, baseUrl);
}
