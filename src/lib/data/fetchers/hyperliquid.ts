/**
 * Hyperliquid (HYPE) Data Fetcher
 *
 * Fetches network metrics from Hyperliquid API.
 * Uses HyperBFT consensus (based on HotStuff).
 *
 * Docs: https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api
 */

const HYPERLIQUID_API_BASE = 'https://api.hyperliquid.xyz';

interface ValidatorSummary {
  validator: string;
  signer: string;
  name: string;
  description: string;
  nRecentBlocks: number;
  stake: number;
  isJailed: boolean;
  unjailableAfter: number | null;
  isActive: boolean;
  commission: string;
  stats: Array<[string, { uptimeFraction: string; predictedApr: string; nSamples: number }]>;
}

export interface HyperliquidMetrics {
  totalValidators: number | null;
  activeValidators: number | null;
  totalStake: number | null;
  foundationStake: number | null;
  foundationPercent: number | null;
  top5Concentration: number | null;
  nakamotoCoefficient: number | null;
}

export class HyperliquidFetcher {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || HYPERLIQUID_API_BASE;
  }

  /**
   * Fetch from Hyperliquid API
   */
  private async fetchInfo<T>(type: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}/info`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type }),
    });

    if (!response.ok) {
      throw new Error(`Hyperliquid API error: ${response.status}`);
    }

    return response.json() as Promise<T>;
  }

  /**
   * Get validator summaries
   */
  async getValidatorSummaries(): Promise<ValidatorSummary[]> {
    return this.fetchInfo<ValidatorSummary[]>('validatorSummaries');
  }

  /**
   * Calculate Nakamoto coefficient (validators needed for 33%)
   */
  private calculateNakamotoCoefficient(validators: ValidatorSummary[]): number {
    const activeValidators = validators.filter(v => v.isActive);
    const totalStake = activeValidators.reduce((sum, v) => sum + v.stake, 0);
    const threshold = totalStake * 0.33;

    // Sort by stake descending
    const sorted = [...activeValidators].sort((a, b) => b.stake - a.stake);

    let accumulatedStake = 0;
    let count = 0;

    for (const validator of sorted) {
      accumulatedStake += validator.stake;
      count++;
      if (accumulatedStake >= threshold) {
        break;
      }
    }

    return count;
  }

  /**
   * Get all metrics
   */
  async getAllMetrics(): Promise<HyperliquidMetrics> {
    try {
      const validators = await this.getValidatorSummaries();

      const activeValidators = validators.filter(v => v.isActive);
      const totalStake = activeValidators.reduce((sum, v) => sum + v.stake, 0);

      // Calculate foundation stake (validators starting with "Hyper Foundation")
      const foundationValidators = activeValidators.filter(v =>
        v.name.startsWith('Hyper Foundation')
      );
      const foundationStake = foundationValidators.reduce((sum, v) => sum + v.stake, 0);
      const foundationPercent = totalStake > 0
        ? Math.round((foundationStake / totalStake) * 10000) / 100
        : 0;

      // Calculate top 5 concentration
      const sorted = [...activeValidators].sort((a, b) => b.stake - a.stake);
      const top5Stake = sorted.slice(0, 5).reduce((sum, v) => sum + v.stake, 0);
      const top5Concentration = totalStake > 0
        ? Math.round((top5Stake / totalStake) * 10000) / 100
        : 0;

      // Calculate Nakamoto coefficient
      const nakamotoCoefficient = this.calculateNakamotoCoefficient(validators);

      // Convert stake to HYPE (stake appears to be in 1e6 units)
      const stakeInHype = Math.round(totalStake / 1e6);

      return {
        totalValidators: validators.length,
        activeValidators: activeValidators.length,
        totalStake: stakeInHype,
        foundationStake: Math.round(foundationStake / 1e6),
        foundationPercent,
        top5Concentration,
        nakamotoCoefficient,
      };
    } catch (error) {
      console.error('Error fetching Hyperliquid metrics:', error);
      return {
        totalValidators: null,
        activeValidators: null,
        totalStake: null,
        foundationStake: null,
        foundationPercent: null,
        top5Concentration: null,
        nakamotoCoefficient: null,
      };
    }
  }
}

export function getHyperliquidFetcher(baseUrl?: string): HyperliquidFetcher {
  return new HyperliquidFetcher(baseUrl);
}
