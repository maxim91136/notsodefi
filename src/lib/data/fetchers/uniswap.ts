/**
 * Uniswap (UNI) Data Fetcher
 *
 * Fetches DeFi protocol metrics from DefiLlama.
 * Key metrics: TVL, volume, treasury, fees/revenue.
 *
 * Note: Uniswap's core contracts are IMMUTABLE - no admin keys,
 * no kill switch, no pause function. Governance only controls
 * fee switch and treasury, not the protocol itself.
 */

const DEFILLAMA_API = 'https://api.llama.fi';

export interface UniswapMetrics {
  tvl: number | null;                    // Total Value Locked in USD
  tvlChange24h: number | null;           // 24h TVL change percentage
  chainTvls: Record<string, number>;     // TVL breakdown by chain
  totalChains: number | null;            // Number of chains deployed
  treasury: number | null;               // Treasury value in USD (excl. own tokens)
  treasuryOwnTokens: number | null;      // UNI tokens held in treasury
  volume24h: number | null;              // 24h trading volume
  fees24h: number | null;                // 24h fees generated
  revenue24h: number | null;             // 24h protocol revenue (after fee switch)
}

export class UniswapFetcher {
  /**
   * Fetch TVL data from DefiLlama
   */
  async getTvl(): Promise<{
    tvl: number | null;
    tvlChange24h: number | null;
    chainTvls: Record<string, number>;
  }> {
    try {
      const response = await fetch(`${DEFILLAMA_API}/protocol/uniswap`);
      if (!response.ok) {
        console.error('DefiLlama API error:', response.status);
        return { tvl: null, tvlChange24h: null, chainTvls: {} };
      }

      const data = await response.json();

      // Extract chain TVLs
      const chainTvls: Record<string, number> = {};
      const excludeKeys = ['borrowed', 'staking', 'pool2'];

      if (data.currentChainTvls) {
        for (const [key, value] of Object.entries(data.currentChainTvls)) {
          if (
            typeof value === 'number' &&
            !key.includes('-') &&
            !excludeKeys.includes(key)
          ) {
            chainTvls[key] = value;
          }
        }
      }

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
   * Fetch volume data from DefiLlama
   */
  async getVolume(): Promise<{ volume24h: number | null }> {
    try {
      // DefiLlama DEX volume endpoint
      const response = await fetch(`${DEFILLAMA_API}/summary/dexs/uniswap`);
      if (!response.ok) {
        return { volume24h: null };
      }

      const data = await response.json();

      return {
        volume24h: data.total24h || null,
      };
    } catch (error) {
      console.error('Error fetching volume:', error);
      return { volume24h: null };
    }
  }

  /**
   * Fetch protocol fees from DefiLlama
   */
  async getFees(): Promise<{
    fees24h: number | null;
    revenue24h: number | null;
  }> {
    try {
      const response = await fetch(`${DEFILLAMA_API}/summary/fees/uniswap`);
      if (!response.ok) {
        return { fees24h: null, revenue24h: null };
      }

      const data = await response.json();

      return {
        fees24h: data.total24h || null,
        revenue24h: data.totalRevenue24h || null,
      };
    } catch (error) {
      console.error('Error fetching fees:', error);
      return { fees24h: null, revenue24h: null };
    }
  }

  /**
   * Fetch treasury data from DefiLlama
   */
  async getTreasury(): Promise<{ total: number | null; ownTokens: number | null }> {
    try {
      const response = await fetch(`${DEFILLAMA_API}/treasury/uniswap`);
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
  async getAllMetrics(): Promise<UniswapMetrics> {
    const [tvlData, volumeData, feesData, treasuryData] = await Promise.all([
      this.getTvl(),
      this.getVolume(),
      this.getFees(),
      this.getTreasury(),
    ]);

    return {
      tvl: tvlData.tvl,
      tvlChange24h: tvlData.tvlChange24h,
      chainTvls: tvlData.chainTvls,
      totalChains: Object.keys(tvlData.chainTvls).length || null,
      treasury: treasuryData.total,
      treasuryOwnTokens: treasuryData.ownTokens,
      volume24h: volumeData.volume24h,
      fees24h: feesData.fees24h,
      revenue24h: feesData.revenue24h,
    };
  }
}

export function getUniswapFetcher(): UniswapFetcher {
  return new UniswapFetcher();
}
