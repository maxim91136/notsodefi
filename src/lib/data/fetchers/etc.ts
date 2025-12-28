/**
 * Ethereum Classic Fetcher
 *
 * Fetches network data from Ethereum Classic using Blockchair API.
 * ETC uses Proof of Work (Etchash).
 */

const ETC_EXPLORER_API = 'https://api.blockchair.com/ethereum/classic/stats';

interface BlockchairETCStats {
  data: {
    blocks: number;
    transactions: number;
    difficulty: number;
    hashrate_24h: string;
    mempool_transactions: number;
    nodes: number;
    market_price_usd: number;
  };
}

export class ETCFetcher {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || ETC_EXPLORER_API;
  }

  /**
   * Get ETC network stats from Blockchair
   */
  async getNetworkStats(): Promise<{
    blocks: number | null;
    difficulty: number | null;
    hashrate24h: number | null;
    mempoolTxs: number | null;
    nodes: number | null;
  } | null> {
    try {
      const response = await fetch(this.baseUrl);

      if (!response.ok) {
        console.error(`ETC API error: ${response.status}`);
        return null;
      }

      const data: BlockchairETCStats = await response.json();

      if (!data.data) {
        console.error('ETC API: No data in response');
        return null;
      }

      return {
        blocks: data.data.blocks,
        difficulty: data.data.difficulty,
        hashrate24h: data.data.hashrate_24h ? parseFloat(data.data.hashrate_24h) : null,
        mempoolTxs: data.data.mempool_transactions,
        nodes: data.data.nodes,
      };
    } catch (error) {
      console.error('ETC API fetch error:', error);
      return null;
    }
  }
}

export function getETCFetcher(baseUrl?: string): ETCFetcher {
  return new ETCFetcher(baseUrl);
}
