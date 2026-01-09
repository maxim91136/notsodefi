/**
 * NEAR Protocol Data Fetcher
 *
 * Fetches network metrics from NEAR RPC API.
 * No API key required.
 *
 * Docs: https://docs.near.org/api/rpc/introduction
 */

const NEAR_RPC_URL = 'https://rpc.mainnet.near.org';

interface ValidatorsResponse {
  jsonrpc: string;
  result: {
    current_validators: Array<{
      account_id: string;
      stake: string;
      is_slashed: boolean;
    }>;
    epoch_height: number;
    epoch_start_height: number;
  };
}

interface StatusResponse {
  jsonrpc: string;
  result: {
    chain_id: string;
    sync_info: {
      latest_block_height: number;
      latest_block_hash: string;
    };
    version: {
      version: string;
    };
  };
}

export interface NearMetrics {
  blockHeight: number | null;
  chainId: string | null;
  activeValidators: number | null;
  totalStaked: number | null;
  nakamotoCoefficient: number | null;
  top5Concentration: number | null;
  top10Concentration: number | null;
}

export class NearFetcher {
  private rpcUrl: string;

  constructor(rpcUrl?: string) {
    this.rpcUrl = rpcUrl || NEAR_RPC_URL;
  }

  private async rpcCall<T>(method: string, params: unknown[] = []): Promise<T> {
    const response = await fetch(this.rpcUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: '1',
        method,
        params,
      }),
    });

    if (!response.ok) {
      throw new Error(`NEAR RPC error: ${response.status}`);
    }

    return response.json() as Promise<T>;
  }

  async getStatus(): Promise<{ blockHeight: number; chainId: string }> {
    const result = await this.rpcCall<StatusResponse>('status', []);
    return {
      blockHeight: result.result.sync_info.latest_block_height,
      chainId: result.result.chain_id,
    };
  }

  async getValidatorStats(): Promise<{
    activeValidators: number;
    totalStaked: number;
    nakamotoCoefficient: number;
    top5Concentration: number;
    top10Concentration: number;
  }> {
    const result = await this.rpcCall<ValidatorsResponse>('validators', [null]);
    const validators = result.result.current_validators;

    // Sort by stake descending
    validators.sort((a, b) => (BigInt(b.stake) > BigInt(a.stake) ? 1 : -1));

    const totalStake = validators.reduce((sum, v) => sum + BigInt(v.stake), BigInt(0));

    // Nakamoto Coefficient: validators needed for 33% stake
    let cumStake = BigInt(0);
    let nakamoto = 0;
    const threshold = totalStake / BigInt(3);
    for (const v of validators) {
      cumStake += BigInt(v.stake);
      nakamoto++;
      if (cumStake >= threshold) break;
    }

    // Top 5 concentration
    const top5Stake = validators
      .slice(0, 5)
      .reduce((sum, v) => sum + BigInt(v.stake), BigInt(0));
    const top5Pct =
      totalStake > BigInt(0)
        ? Math.round(Number((top5Stake * BigInt(10000)) / totalStake) / 100)
        : 0;

    // Top 10 concentration
    const top10Stake = validators
      .slice(0, 10)
      .reduce((sum, v) => sum + BigInt(v.stake), BigInt(0));
    const top10Pct =
      totalStake > BigInt(0)
        ? Math.round(Number((top10Stake * BigInt(10000)) / totalStake) / 100)
        : 0;

    // Convert yoctoNEAR to NEAR (1 NEAR = 10^24 yoctoNEAR)
    const totalStakedNear = Number(totalStake / BigInt('1000000000000000000000000'));

    return {
      activeValidators: validators.length,
      totalStaked: totalStakedNear,
      nakamotoCoefficient: nakamoto,
      top5Concentration: top5Pct,
      top10Concentration: top10Pct,
    };
  }

  async getAllMetrics(): Promise<NearMetrics> {
    try {
      const [status, validators] = await Promise.all([
        this.getStatus(),
        this.getValidatorStats(),
      ]);

      return {
        blockHeight: status.blockHeight,
        chainId: status.chainId,
        activeValidators: validators.activeValidators,
        totalStaked: validators.totalStaked,
        nakamotoCoefficient: validators.nakamotoCoefficient,
        top5Concentration: validators.top5Concentration,
        top10Concentration: validators.top10Concentration,
      };
    } catch (error) {
      console.error('Error fetching NEAR metrics:', error);
      return {
        blockHeight: null,
        chainId: null,
        activeValidators: null,
        totalStaked: null,
        nakamotoCoefficient: null,
        top5Concentration: null,
        top10Concentration: null,
      };
    }
  }
}

export function getNearFetcher(rpcUrl?: string): NearFetcher {
  return new NearFetcher(rpcUrl);
}
