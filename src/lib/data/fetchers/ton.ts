/**
 * TON (Toncoin) Data Fetcher
 *
 * Fetches network metrics from TonAPI (tonapi.io).
 * Uses v2 REST API for validators and blockchain data.
 *
 * Docs: https://docs.tonconsole.com/tonapi/rest-api
 */

const TONAPI_BASE = 'https://tonapi.io/v2';

interface ValidatorInfo {
  address: string;
  adnl_addr: string;
  stake: number;
  max_factor: number;
}

interface ValidatorsResponse {
  elect_at: number;
  elect_close: number;
  min_stake: number;
  total_stake: number;
  validators: ValidatorInfo[];
}

interface MasterchainHeadResponse {
  seqno: number;
  shard: string;
  workchain: number;
  root_hash: string;
  file_hash: string;
  global_id: number;
  gen_utime: number;
  tx_quantity: number;
  value_flow: {
    from_prev_blk: {
      grams: number;
    };
    fees_collected: {
      grams: number;
    };
    created: {
      grams: number;
    };
  };
}

export interface TonMetrics {
  blockNumber: number | null;
  totalValidators: number | null;
  totalStake: number | null;
  minStake: number | null;
  electAt: number | null;
  top5Concentration: number | null;
  feesCollected: number | null;
}

export class TonFetcher {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || TONAPI_BASE;
  }

  private async fetchEndpoint<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`TonAPI error: ${response.status}`);
    }

    return response.json() as Promise<T>;
  }

  /**
   * Get masterchain head info
   */
  async getMasterchainHead(): Promise<{
    seqno: number;
    feesCollected: number;
  }> {
    const result = await this.fetchEndpoint<MasterchainHeadResponse>(
      '/blockchain/masterchain-head'
    );

    return {
      seqno: result.seqno,
      feesCollected: result.value_flow?.fees_collected?.grams || 0,
    };
  }

  /**
   * Get validator stats
   */
  async getValidatorStats(): Promise<{
    totalValidators: number;
    totalStake: number;
    minStake: number;
    electAt: number;
    top5Concentration: number;
  }> {
    const result = await this.fetchEndpoint<ValidatorsResponse>(
      '/blockchain/validators'
    );

    const validators = result.validators || [];
    const totalValidators = validators.length;

    // Total stake in nanoTON, convert to TON
    const totalStake = Math.round(result.total_stake / 1_000_000_000);
    const minStake = Math.round(result.min_stake / 1_000_000_000);

    // Calculate top 5 concentration
    let top5Concentration = 0;
    if (validators.length > 0) {
      // Sort by stake descending
      const sorted = [...validators].sort((a, b) => b.stake - a.stake);
      const top5Stake = sorted.slice(0, 5).reduce((sum, v) => sum + v.stake, 0);
      top5Concentration = Math.round((top5Stake / result.total_stake) * 10000) / 100;
    }

    return {
      totalValidators,
      totalStake,
      minStake,
      electAt: result.elect_at,
      top5Concentration,
    };
  }

  /**
   * Get all metrics
   */
  async getAllMetrics(): Promise<TonMetrics> {
    try {
      const [head, validators] = await Promise.all([
        this.getMasterchainHead(),
        this.getValidatorStats(),
      ]);

      return {
        blockNumber: head.seqno,
        totalValidators: validators.totalValidators,
        totalStake: validators.totalStake,
        minStake: validators.minStake,
        electAt: validators.electAt,
        top5Concentration: validators.top5Concentration,
        feesCollected: Math.round(head.feesCollected / 1_000_000_000),
      };
    } catch (error) {
      console.error('Error fetching TON metrics:', error);
      return {
        blockNumber: null,
        totalValidators: null,
        totalStake: null,
        minStake: null,
        electAt: null,
        top5Concentration: null,
        feesCollected: null,
      };
    }
  }
}

export function getTonFetcher(baseUrl?: string): TonFetcher {
  return new TonFetcher(baseUrl);
}
