/**
 * Polygon PoS Staking API Fetcher
 *
 * Fetches validator and staking data from Polygon's public staking API.
 * No API key required.
 *
 * API: https://staking-api.polygon.technology/api/v2/validators
 */

const POLYGON_STAKING_API = 'https://staking-api.polygon.technology/api/v2';

export interface PolygonMetrics {
  activeValidators: number | null;
  totalStaked: number | null; // in POL
  nakamotoCoefficient: number | null;
  top5Concentration: number | null; // percentage
  top10Concentration: number | null; // percentage
}

interface ValidatorResponse {
  success: boolean;
  result: Array<{
    id: number;
    name: string;
    signer: string;
    totalStaked: number; // in wei (returned as number in scientific notation)
    status: string; // 'active' = active
    uptimePercent: number;
  }>;
}

export class PolygonFetcher {
  private apiUrl: string;

  constructor(apiUrl?: string) {
    this.apiUrl = apiUrl || POLYGON_STAKING_API;
  }

  /**
   * Fetch validator stats from Polygon Staking API
   */
  async getValidatorStats(): Promise<{
    activeValidators: number;
    totalStaked: number;
    nakamotoCoefficient: number;
    top5Concentration: number;
    top10Concentration: number;
  }> {
    // Fetch all validators (limit=0 returns all, offset=1 skips header)
    const response = await fetch(`${this.apiUrl}/validators?limit=0&offset=1`);
    if (!response.ok) {
      throw new Error(`Polygon API error: ${response.status}`);
    }

    const data = (await response.json()) as ValidatorResponse;
    if (!data.success || !data.result) {
      throw new Error('Invalid Polygon API response');
    }

    // Filter active validators (status === 'active')
    const activeValidators = data.result.filter((v) => v.status === 'active');
    const activeCount = activeValidators.length;

    // Sort by stake descending
    activeValidators.sort((a, b) => (b.totalStaked || 0) - (a.totalStaked || 0));

    // Calculate total stake (already in wei as number)
    const totalStakeWei = activeValidators.reduce(
      (sum, v) => sum + (v.totalStaked || 0),
      0
    );

    // Convert from wei to POL (18 decimals)
    const totalStaked = Math.round(totalStakeWei / 10 ** 18);

    // Nakamoto Coefficient: validators needed for 33% of stake
    let cumStake = 0;
    let nakamoto = 0;
    const threshold = totalStakeWei / 3;

    for (const v of activeValidators) {
      cumStake += v.totalStaked || 0;
      nakamoto++;
      if (cumStake >= threshold) break;
    }

    // Top 5 concentration
    const top5Stake = activeValidators
      .slice(0, 5)
      .reduce((sum, v) => sum + (v.totalStaked || 0), 0);
    const top5Concentration =
      totalStakeWei > 0 ? (top5Stake / totalStakeWei) * 100 : 0;

    // Top 10 concentration
    const top10Stake = activeValidators
      .slice(0, 10)
      .reduce((sum, v) => sum + (v.totalStaked || 0), 0);
    const top10Concentration =
      totalStakeWei > 0 ? (top10Stake / totalStakeWei) * 100 : 0;

    return {
      activeValidators: activeCount,
      totalStaked,
      nakamotoCoefficient: nakamoto,
      top5Concentration: Math.round(top5Concentration * 10) / 10,
      top10Concentration: Math.round(top10Concentration * 10) / 10,
    };
  }

  /**
   * Get all metrics
   */
  async getAllMetrics(): Promise<PolygonMetrics> {
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
      console.error('Failed to fetch Polygon metrics:', error);
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

export function getPolygonFetcher(apiUrl?: string): PolygonFetcher {
  return new PolygonFetcher(apiUrl);
}
