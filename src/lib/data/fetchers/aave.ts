/**
 * Aave (AAVE) Data Fetcher
 *
 * Fetches DeFi protocol metrics from DefiLlama and on-chain sources.
 * Key metrics: TVL, revenue, treasury, governance participation.
 */

const DEFILLAMA_API = 'https://api.llama.fi';

export interface AaveMetrics {
  tvl: number | null;                    // Total Value Locked in USD
  tvlChange24h: number | null;           // 24h TVL change percentage
  chainTvls: Record<string, number>;     // TVL breakdown by chain
  totalChains: number | null;            // Number of chains deployed
  treasury: number | null;               // Treasury value in USD (excl. own tokens)
  treasuryOwnTokens: number | null;      // AAVE tokens held in treasury
  revenue24h: number | null;             // 24h protocol revenue
  revenue30d: number | null;             // 30d protocol revenue
}

export class AaveFetcher {
  /**
   * Fetch TVL data from DefiLlama
   */
  async getTvl(): Promise<{
    tvl: number | null;
    tvlChange24h: number | null;
    chainTvls: Record<string, number>;
  }> {
    try {
      const response = await fetch(`${DEFILLAMA_API}/protocol/aave`);
      if (!response.ok) {
        console.error('DefiLlama API error:', response.status);
        return { tvl: null, tvlChange24h: null, chainTvls: {} };
      }

      const data = await response.json();

      // Extract chain TVLs from currentChainTvls (excludes borrowed, staking, pool2)
      const chainTvls: Record<string, number> = {};
      const excludeKeys = ['borrowed', 'staking', 'pool2'];

      if (data.currentChainTvls) {
        for (const [key, value] of Object.entries(data.currentChainTvls)) {
          // Only include actual chains (not borrowed, staking, etc.)
          if (
            typeof value === 'number' &&
            !key.includes('-') &&
            !excludeKeys.includes(key)
          ) {
            chainTvls[key] = value;
          }
        }
      }

      // Calculate total TVL from chain TVLs
      const totalTvl = Object.values(chainTvls).reduce((sum, v) => sum + v, 0);

      return {
        tvl: totalTvl || null,
        tvlChange24h: data.change_1d || null,
        chainTvls,
      };
    } catch (error) {
      console.error('Error fetching TVL:', error);
      return { tvl: null, tvlChange24h: null, chainTvls: {} };
    }
  }

  /**
   * Fetch protocol fees/revenue from DefiLlama
   */
  async getRevenue(): Promise<{
    revenue24h: number | null;
    revenue30d: number | null;
  }> {
    try {
      const response = await fetch(`${DEFILLAMA_API}/summary/fees/aave?dataType=dailyRevenue`);
      if (!response.ok) {
        return { revenue24h: null, revenue30d: null };
      }

      const data = await response.json();

      return {
        revenue24h: data.total24h || null,
        revenue30d: data.total30d || null,
      };
    } catch (error) {
      console.error('Error fetching revenue:', error);
      return { revenue24h: null, revenue30d: null };
    }
  }

  /**
   * Fetch treasury data from DefiLlama
   * Returns total treasury excluding own token holdings (to avoid double counting)
   */
  async getTreasury(): Promise<{ total: number | null; ownTokens: number | null }> {
    try {
      const response = await fetch(`${DEFILLAMA_API}/treasury/aave`);
      if (!response.ok) {
        return { total: null, ownTokens: null };
      }

      const data = await response.json();
      const currentTvls = data.currentChainTvls || {};

      let total = 0;
      let ownTokens = 0;

      for (const [key, value] of Object.entries(currentTvls)) {
        if (typeof value === 'number') {
          if (key === 'OwnTokens') {
            ownTokens = value;
          } else if (!key.includes('OwnTokens')) {
            total += value;
          }
        }
      }

      return { total: total || null, ownTokens: ownTokens || null };
    } catch (error) {
      console.error('Error fetching treasury:', error);
      return { total: null, ownTokens: null };
    }
  }

  /**
   * Get all metrics
   */
  async getAllMetrics(): Promise<AaveMetrics> {
    const [tvlData, revenueData, treasuryData] = await Promise.all([
      this.getTvl(),
      this.getRevenue(),
      this.getTreasury(),
    ]);

    return {
      tvl: tvlData.tvl,
      tvlChange24h: tvlData.tvlChange24h,
      chainTvls: tvlData.chainTvls,
      totalChains: Object.keys(tvlData.chainTvls).length || null,
      treasury: treasuryData.total,
      treasuryOwnTokens: treasuryData.ownTokens,
      revenue24h: revenueData.revenue24h,
      revenue30d: revenueData.revenue30d,
    };
  }
}

export function getAaveFetcher(): AaveFetcher {
  return new AaveFetcher();
}
