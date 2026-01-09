/**
 * Monero Fetcher
 *
 * Fetches network data from Monero using Blockchair API.
 * Monero uses Proof of Work (RandomX) - CPU-friendly algorithm.
 */

const MONERO_API = 'https://api.blockchair.com/monero/stats';

interface BlockchairMoneroStats {
  data: {
    blocks: number;
    transactions: number;
    difficulty: number;
    hashrate_24h: string;
    mempool_transactions: number;
    market_price_usd: number;
  };
}

export class MoneroFetcher {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || MONERO_API;
  }

  /**
   * Get Monero network stats from Blockchair
   */
  async getNetworkStats(): Promise<{
    blocks: number | null;
    difficulty: number | null;
    hashrate24h: number | null;
    mempoolTxs: number | null;
  } | null> {
    try {
      const response = await fetch(this.baseUrl);

      if (!response.ok) {
        console.error(`Monero API error: ${response.status}`);
        return null;
      }

      const data: BlockchairMoneroStats = await response.json();

      if (!data.data) {
        console.error('Monero API: No data in response');
        return null;
      }

      return {
        blocks: data.data.blocks,
        difficulty: data.data.difficulty,
        hashrate24h: data.data.hashrate_24h ? parseFloat(data.data.hashrate_24h) : null,
        mempoolTxs: data.data.mempool_transactions,
      };
    } catch (error) {
      console.error('Monero API fetch error:', error);
      return null;
    }
  }
}

export function getMoneroFetcher(baseUrl?: string): MoneroFetcher {
  return new MoneroFetcher(baseUrl);
}
