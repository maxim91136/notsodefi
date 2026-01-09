/**
 * Zcash Fetcher
 *
 * Fetches network data from Zcash using public APIs.
 * Zcash uses Proof of Work (Equihash) similar to Bitcoin.
 */

const ZCASH_EXPLORER_API = 'https://api.blockchair.com/zcash/stats';

interface BlockchairZcashStats {
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

export class ZcashFetcher {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || ZCASH_EXPLORER_API;
  }

  /**
   * Get Zcash network stats from Blockchair
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
        console.error(`Zcash API error: ${response.status}`);
        return null;
      }

      const data: BlockchairZcashStats = await response.json();

      if (!data.data) {
        console.error('Zcash API: No data in response');
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
      console.error('Zcash API fetch error:', error);
      return null;
    }
  }
}

export function getZcashFetcher(baseUrl?: string): ZcashFetcher {
  return new ZcashFetcher(baseUrl);
}
