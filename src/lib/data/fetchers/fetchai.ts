/**
 * Fetch.ai (FET) Data Fetcher
 *
 * Cosmos SDK chain focused on AI agents and autonomous economic activity.
 * Part of Artificial Superintelligence Alliance (ASI) with SingularityNET & Ocean.
 * No API key required.
 *
 * API: https://rest-fetchhub.fetch.ai
 */

const FETCHAI_LCD_URL = 'https://rest-fetchhub.fetch.ai';

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

export interface FetchaiMetrics {
  activeValidators: number | null;
  totalStaked: number | null;
  nakamotoCoefficient: number | null;
  top5Concentration: number | null;
  top10Concentration: number | null;
}

export class FetchaiFetcher {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || FETCHAI_LCD_URL;
  }

  private async fetchEndpoint<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`Fetch.ai API error: ${response.status}`);
    }

    return response.json() as Promise<T>;
  }

  async getValidatorStats(): Promise<{
    activeValidators: number;
    totalStaked: number;
    nakamotoCoefficient: number;
    top5Concentration: number;
    top10Concentration: number;
  }> {
    const result = await this.fetchEndpoint<ValidatorsResponse>(
      '/cosmos/staking/v1beta1/validators?status=BOND_STATUS_BONDED&pagination.limit=200'
    );

    const validators = result.validators;
    const activeCount = validators.length;

    // Sort by tokens descending
    validators.sort((a, b) => {
      const aTokens = BigInt(a.tokens || '0');
      const bTokens = BigInt(b.tokens || '0');
      return bTokens > aTokens ? 1 : bTokens < aTokens ? -1 : 0;
    });

    // Calculate total stake
    const totalStakeRaw = validators.reduce(
      (sum, v) => sum + BigInt(v.tokens || '0'),
      BigInt(0)
    );

    // Convert from base units to FET (18 decimals)
    const totalStaked = Number(totalStakeRaw / BigInt(10 ** 18));

    // Nakamoto Coefficient: validators needed for 33% of stake
    let cumStake = BigInt(0);
    let nakamoto = 0;
    const threshold = totalStakeRaw / BigInt(3);

    for (const v of validators) {
      cumStake += BigInt(v.tokens || '0');
      nakamoto++;
      if (cumStake >= threshold) break;
    }

    // Top 5 concentration
    const top5Stake = validators
      .slice(0, 5)
      .reduce((sum, v) => sum + BigInt(v.tokens || '0'), BigInt(0));
    const top5Concentration =
      totalStakeRaw > BigInt(0)
        ? Number((top5Stake * BigInt(10000)) / totalStakeRaw) / 100
        : 0;

    // Top 10 concentration
    const top10Stake = validators
      .slice(0, 10)
      .reduce((sum, v) => sum + BigInt(v.tokens || '0'), BigInt(0));
    const top10Concentration =
      totalStakeRaw > BigInt(0)
        ? Number((top10Stake * BigInt(10000)) / totalStakeRaw) / 100
        : 0;

    return {
      activeValidators: activeCount,
      totalStaked,
      nakamotoCoefficient: nakamoto,
      top5Concentration: Math.round(top5Concentration * 10) / 10,
      top10Concentration: Math.round(top10Concentration * 10) / 10,
    };
  }

  async getAllMetrics(): Promise<FetchaiMetrics> {
    try {
      const stats = await this.getValidatorStats();
      return {
        activeValidators: stats.activeValidators,
        totalStaked: stats.totalStaked,
        nakamotoCoefficient: stats.nakamotoCoefficient,
        top5Concentration: stats.top5Concentration,
        top10Concentration: stats.top10Concentration,
      };
    } catch (error) {
      console.error('Failed to fetch Fetch.ai metrics:', error);
      return {
        activeValidators: null,
        totalStaked: null,
        nakamotoCoefficient: null,
        top5Concentration: null,
        top10Concentration: null,
      };
    }
  }
}

export function getFetchaiFetcher(baseUrl?: string): FetchaiFetcher {
  return new FetchaiFetcher(baseUrl);
}
