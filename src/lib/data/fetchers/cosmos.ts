/**
 * Cosmos Hub (ATOM) Data Fetcher
 *
 * Fetches network metrics from Cosmos REST API (LCD).
 * Uses Tendermint/CometBFT consensus.
 *
 * Docs: https://hub.cosmos.network/main/resources/service-providers
 */

const COSMOS_API_BASE = 'https://rest.cosmos.directory/cosmoshub';

interface StakingPoolResponse {
  pool: {
    not_bonded_tokens: string;
    bonded_tokens: string;
  };
}

interface ValidatorsResponse {
  validators: Array<{
    operator_address: string;
    tokens: string;
    status: string;
    description: {
      moniker: string;
    };
  }>;
  pagination: {
    total: string;
  };
}

interface LatestBlockResponse {
  block: {
    header: {
      height: string;
      chain_id: string;
    };
  };
}

export interface CosmosMetrics {
  blockHeight: number | null;
  chainId: string | null;
  activeValidators: number | null;
  totalBonded: number | null;
  totalUnbonded: number | null;
  top5Concentration: number | null;
}

export class CosmosFetcher {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || COSMOS_API_BASE;
  }

  /**
   * Fetch from Cosmos REST API
   */
  private async fetchEndpoint<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Cosmos API error: ${response.status}`);
    }

    return response.json() as Promise<T>;
  }

  /**
   * Get latest block info
   */
  async getLatestBlock(): Promise<{
    height: number;
    chainId: string;
  }> {
    const result = await this.fetchEndpoint<LatestBlockResponse>('/cosmos/base/tendermint/v1beta1/blocks/latest');

    return {
      height: parseInt(result.block.header.height, 10),
      chainId: result.block.header.chain_id,
    };
  }

  /**
   * Get staking pool info
   */
  async getStakingPool(): Promise<{
    totalBonded: number;
    totalUnbonded: number;
  }> {
    const result = await this.fetchEndpoint<StakingPoolResponse>('/cosmos/staking/v1beta1/pool');

    // Convert uatom to ATOM (1 ATOM = 1,000,000 uatom)
    return {
      totalBonded: Math.round(parseInt(result.pool.bonded_tokens, 10) / 1_000_000),
      totalUnbonded: Math.round(parseInt(result.pool.not_bonded_tokens, 10) / 1_000_000),
    };
  }

  /**
   * Get validator stats
   */
  async getValidatorStats(): Promise<{
    activeValidators: number;
    top5Concentration: number;
  }> {
    // Get all bonded validators
    const result = await this.fetchEndpoint<ValidatorsResponse>(
      '/cosmos/staking/v1beta1/validators?status=BOND_STATUS_BONDED&pagination.limit=500'
    );

    const validators = result.validators;
    const activeCount = validators.length;

    // Calculate total stake
    const totalStake = validators.reduce((sum, v) => sum + BigInt(v.tokens), BigInt(0));

    // Sort by tokens and get top 5
    const sorted = [...validators].sort((a, b) => {
      const aTokens = BigInt(a.tokens);
      const bTokens = BigInt(b.tokens);
      return bTokens > aTokens ? 1 : bTokens < aTokens ? -1 : 0;
    });

    const top5Stake = sorted.slice(0, 5).reduce((sum, v) => sum + BigInt(v.tokens), BigInt(0));
    const top5Concentration = totalStake > 0
      ? Math.round(Number((top5Stake * BigInt(10000)) / totalStake) / 100)
      : 0;

    return {
      activeValidators: activeCount,
      top5Concentration,
    };
  }

  /**
   * Get all metrics
   */
  async getAllMetrics(): Promise<CosmosMetrics> {
    try {
      const [block, pool, validators] = await Promise.all([
        this.getLatestBlock(),
        this.getStakingPool(),
        this.getValidatorStats(),
      ]);

      return {
        blockHeight: block.height,
        chainId: block.chainId,
        activeValidators: validators.activeValidators,
        totalBonded: pool.totalBonded,
        totalUnbonded: pool.totalUnbonded,
        top5Concentration: validators.top5Concentration,
      };
    } catch (error) {
      console.error('Error fetching Cosmos metrics:', error);
      return {
        blockHeight: null,
        chainId: null,
        activeValidators: null,
        totalBonded: null,
        totalUnbonded: null,
        top5Concentration: null,
      };
    }
  }
}

export function getCosmosFetcher(baseUrl?: string): CosmosFetcher {
  return new CosmosFetcher(baseUrl);
}
