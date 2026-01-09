/**
 * Virtuals Protocol (VIRTUAL) Data Fetcher
 *
 * Fetches AI Agent launchpad metrics from DefiLlama.
 * Key metrics: fees/revenue across Base/Ethereum/Solana.
 *
 * Note: No TVL tracking - this is an AI Agent launchpad, not traditional DeFi.
 * Revenue from: Virtual-fun, Virtual-app, CBBTC-prototype/sentient, agent trading.
 */

const DEFILLAMA_API = 'https://api.llama.fi';

export interface VirtualsMetrics {
  fees24h: number | null;             // 24h fees
  fees7d: number | null;              // 7-day fees
  fees30d: number | null;             // 30-day fees
  feesTotal: number | null;           // All-time fees
  chainBreakdown: {                   // Fees by chain
    base: number | null;
    ethereum: number | null;
    solana: number | null;
  };
}

export class VirtualsFetcher {
  /**
   * Fetch protocol fees from DefiLlama
   */
  async getFees(): Promise<{
    fees24h: number | null;
    fees7d: number | null;
    fees30d: number | null;
    feesTotal: number | null;
    chainBreakdown: { base: number | null; ethereum: number | null; solana: number | null };
  }> {
    try {
      const response = await fetch(`${DEFILLAMA_API}/summary/fees/virtuals-protocol`);
      if (!response.ok) {
        console.error('DefiLlama fees API error:', response.status);
        return {
          fees24h: null,
          fees7d: null,
          fees30d: null,
          feesTotal: null,
          chainBreakdown: { base: null, ethereum: null, solana: null },
        };
      }

      const data = await response.json();

      // Extract chain breakdown from totalDataChartBreakdown if available
      // Format: [timestamp, {"Base": {"Virtuals Protocol": 17389}, "Ethereum": {...}, ...}]
      let baseTotal = null;
      let ethTotal = null;
      let solTotal = null;

      if (data.totalDataChartBreakdown && Array.isArray(data.totalDataChartBreakdown)) {
        // Get last data point for each chain
        const lastPoint = data.totalDataChartBreakdown[data.totalDataChartBreakdown.length - 1];
        if (lastPoint && lastPoint[1]) {
          const chains = lastPoint[1];
          // Extract value from nested structure: {"Chain": {"Virtuals Protocol": value}}
          if (chains.Base && typeof chains.Base === 'object') {
            baseTotal = chains.Base['Virtuals Protocol'] ?? null;
          }
          if (chains.Ethereum && typeof chains.Ethereum === 'object') {
            ethTotal = chains.Ethereum['Virtuals Protocol'] ?? null;
          }
          if (chains.Solana && typeof chains.Solana === 'object') {
            solTotal = chains.Solana['Virtuals Protocol'] ?? null;
          }
        }
      }

      return {
        fees24h: data.total24h || null,
        fees7d: data.total7d || null,
        fees30d: data.total30d || null,
        feesTotal: data.totalAllTime || null,
        chainBreakdown: {
          base: baseTotal,
          ethereum: ethTotal,
          solana: solTotal,
        },
      };
    } catch (error) {
      console.error('Error fetching fees:', error);
      return {
        fees24h: null,
        fees7d: null,
        fees30d: null,
        feesTotal: null,
        chainBreakdown: { base: null, ethereum: null, solana: null },
      };
    }
  }

  /**
   * Get all metrics
   */
  async getAllMetrics(): Promise<VirtualsMetrics> {
    const feesData = await this.getFees();

    return {
      fees24h: feesData.fees24h,
      fees7d: feesData.fees7d,
      fees30d: feesData.fees30d,
      feesTotal: feesData.feesTotal,
      chainBreakdown: feesData.chainBreakdown,
    };
  }
}

export function getVirtualsFetcher(): VirtualsFetcher {
  return new VirtualsFetcher();
}
