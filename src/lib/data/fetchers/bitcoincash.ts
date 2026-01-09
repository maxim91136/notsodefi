/**
 * Bitcoin Cash Fetcher
 *
 * Fetches network data from Bitcoin Cash using Blockchair API.
 * Bitcoin Cash uses Proof of Work (SHA-256), forked from Bitcoin in 2017.
 */

const BITCOINCASH_API = 'https://api.blockchair.com/bitcoin-cash/stats';

interface BlockchairBitcoinCashStats {
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

export class BitcoinCashFetcher {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || BITCOINCASH_API;
  }

  /**
   * Get Bitcoin Cash network stats from Blockchair
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
        console.error(`Bitcoin Cash API error: ${response.status}`);
        return null;
      }

      const data: BlockchairBitcoinCashStats = await response.json();

      if (!data.data) {
        console.error('Bitcoin Cash API: No data in response');
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
      console.error('Bitcoin Cash API fetch error:', error);
      return null;
    }
  }
}

export function getBitcoinCashFetcher(baseUrl?: string): BitcoinCashFetcher {
  return new BitcoinCashFetcher(baseUrl);
}
