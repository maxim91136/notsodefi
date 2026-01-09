/**
 * Lido (LDO) Data Fetcher
 *
 * Fetches liquid staking protocol metrics from DefiLlama and Lido APIs.
 * Key metrics: TVL (staked ETH), APR, fees/revenue.
 *
 * Note: Lido controls ~25% of all staked ETH on Ethereum.
 * This is a significant centralization risk for Ethereum's consensus.
 */

const DEFILLAMA_API = 'https://api.llama.fi';
const LIDO_API = 'https://eth-api.lido.fi';

export interface LidoMetrics {
  tvl: number | null;                    // Total Value Locked (staked ETH) in USD
  tvlChange24h: number | null;           // 24h TVL change percentage
  chainTvls: Record<string, number>;     // TVL breakdown by chain
  apr7d: number | null;                  // 7-day average APR
  aprLatest: number | null;              // Latest APR
  fees24h: number | null;                // 24h fees (staking rewards)
  revenue24h: number | null;             // 24h protocol revenue (10% fee)
  treasury: number | null;               // Treasury value in USD
  treasuryOwnTokens: number | null;      // LDO tokens in treasury
}

export class LidoFetcher {
  /**
   * Fetch TVL data from DefiLlama
   */
  async getTvl(): Promise<{
    tvl: number | null;
    tvlChange24h: number | null;
    chainTvls: Record<string, number>;
  }> {
    try {
      const response = await fetch(`${DEFILLAMA_API}/protocol/lido`);
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
        tvl: totalTvl || data.tvl || null,
        tvlChange24h: data.change_1d || null,
        chainTvls,
      };
    } catch (error) {
      console.error('Error fetching TVL:', error);
      return { tvl: null, tvlChange24h: null, chainTvls: {} };
    }
  }

  /**
   * Fetch APR data from Lido API
   */
  async getApr(): Promise<{ apr7d: number | null; aprLatest: number | null }> {
    try {
      const [smaResponse, latestResponse] = await Promise.all([
        fetch(`${LIDO_API}/v1/protocol/steth/apr/sma`),
        fetch(`${LIDO_API}/v1/protocol/steth/apr/last`),
      ]);

      let apr7d = null;
      let aprLatest = null;

      if (smaResponse.ok) {
        const smaData = await smaResponse.json();
        apr7d = smaData.data?.smaApr || smaData.smaApr || null;
      }

      if (latestResponse.ok) {
        const latestData = await latestResponse.json();
        aprLatest = latestData.data?.apr || latestData.apr || null;
      }

      return { apr7d, aprLatest };
    } catch (error) {
      console.error('Error fetching APR:', error);
      return { apr7d: null, aprLatest: null };
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
      const response = await fetch(`${DEFILLAMA_API}/summary/fees/lido`);
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
      const response = await fetch(`${DEFILLAMA_API}/treasury/lido`);
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
  async getAllMetrics(): Promise<LidoMetrics> {
    const [tvlData, aprData, feesData, treasuryData] = await Promise.all([
      this.getTvl(),
      this.getApr(),
      this.getFees(),
      this.getTreasury(),
    ]);

    return {
      tvl: tvlData.tvl,
      tvlChange24h: tvlData.tvlChange24h,
      chainTvls: tvlData.chainTvls,
      apr7d: aprData.apr7d,
      aprLatest: aprData.aprLatest,
      fees24h: feesData.fees24h,
      revenue24h: feesData.revenue24h,
      treasury: treasuryData.total,
      treasuryOwnTokens: treasuryData.ownTokens,
    };
  }
}

export function getLidoFetcher(): LidoFetcher {
  return new LidoFetcher();
}
