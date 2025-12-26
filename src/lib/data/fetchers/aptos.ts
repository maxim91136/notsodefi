/**
 * Aptos Data Fetcher
 *
 * Fetches network metrics from Aptos REST API.
 * No API key required.
 *
 * Docs: https://aptos.dev/apis/fullnode-rest-api
 */

const APTOS_API_BASE = 'https://api.mainnet.aptoslabs.com/v1';

interface LedgerInfo {
  chain_id: number;
  epoch: string;
  ledger_version: string;
  block_height: string;
}

interface ValidatorInfo {
  addr: string;
  voting_power: string;
}

interface ValidatorSetResponse {
  type: string;
  data: {
    active_validators: ValidatorInfo[];
  };
}

export interface AptosMetrics {
  blockHeight: number | null;
  epoch: number | null;
  activeValidators: number | null;
  totalStaked: number | null;
  nakamotoCoefficient: number | null;
  top5Concentration: number | null;
  top10Concentration: number | null;
}

export class AptosFetcher {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || APTOS_API_BASE;
  }

  private async fetchEndpoint<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`Aptos API error: ${response.status}`);
    }

    return response.json() as Promise<T>;
  }

  async getLedgerInfo(): Promise<{ blockHeight: number; epoch: number }> {
    const result = await this.fetchEndpoint<LedgerInfo>('');
    return {
      blockHeight: parseInt(result.block_height, 10),
      epoch: parseInt(result.epoch, 10),
    };
  }

  async getValidatorStats(): Promise<{
    activeValidators: number;
    totalStaked: number;
    nakamotoCoefficient: number;
    top5Concentration: number;
    top10Concentration: number;
  }> {
    const result = await this.fetchEndpoint<ValidatorSetResponse>(
      '/accounts/0x1/resource/0x1::stake::ValidatorSet'
    );

    const validators = result.data.active_validators;

    // Sort by voting power descending
    validators.sort((a, b) =>
      BigInt(b.voting_power) > BigInt(a.voting_power) ? 1 : -1
    );

    const totalStake = validators.reduce(
      (sum, v) => sum + BigInt(v.voting_power),
      BigInt(0)
    );

    // Nakamoto Coefficient: validators needed for 33% stake
    let cumStake = BigInt(0);
    let nakamoto = 0;
    const threshold = totalStake / BigInt(3);
    for (const v of validators) {
      cumStake += BigInt(v.voting_power);
      nakamoto++;
      if (cumStake >= threshold) break;
    }

    // Top 5 concentration
    const top5Stake = validators
      .slice(0, 5)
      .reduce((sum, v) => sum + BigInt(v.voting_power), BigInt(0));
    const top5Pct =
      totalStake > BigInt(0)
        ? Math.round(Number((top5Stake * BigInt(10000)) / totalStake) / 100)
        : 0;

    // Top 10 concentration
    const top10Stake = validators
      .slice(0, 10)
      .reduce((sum, v) => sum + BigInt(v.voting_power), BigInt(0));
    const top10Pct =
      totalStake > BigInt(0)
        ? Math.round(Number((top10Stake * BigInt(10000)) / totalStake) / 100)
        : 0;

    // Convert octas to APT (1 APT = 10^8 octas)
    const totalStakedApt = Number(totalStake / BigInt(100000000));

    return {
      activeValidators: validators.length,
      totalStaked: totalStakedApt,
      nakamotoCoefficient: nakamoto,
      top5Concentration: top5Pct,
      top10Concentration: top10Pct,
    };
  }

  async getAllMetrics(): Promise<AptosMetrics> {
    try {
      const [ledger, validators] = await Promise.all([
        this.getLedgerInfo(),
        this.getValidatorStats(),
      ]);

      return {
        blockHeight: ledger.blockHeight,
        epoch: ledger.epoch,
        activeValidators: validators.activeValidators,
        totalStaked: validators.totalStaked,
        nakamotoCoefficient: validators.nakamotoCoefficient,
        top5Concentration: validators.top5Concentration,
        top10Concentration: validators.top10Concentration,
      };
    } catch (error) {
      console.error('Error fetching Aptos metrics:', error);
      return {
        blockHeight: null,
        epoch: null,
        activeValidators: null,
        totalStaked: null,
        nakamotoCoefficient: null,
        top5Concentration: null,
        top10Concentration: null,
      };
    }
  }
}

export function getAptosFetcher(baseUrl?: string): AptosFetcher {
  return new AptosFetcher(baseUrl);
}
