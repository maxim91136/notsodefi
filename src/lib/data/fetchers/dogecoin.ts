/**
 * Dogecoin Fetcher
 *
 * Fetches network data from Dogecoin using Blockchair API.
 * Dogecoin uses Proof of Work (Scrypt) with merged mining with Litecoin.
 */

const DOGECOIN_API = 'https://api.blockchair.com/dogecoin/stats';

interface BlockchairDogecoinStats {
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

export class DogecoinFetcher {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || DOGECOIN_API;
  }

  /**
   * Get Dogecoin network stats from Blockchair
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
        console.error(`Dogecoin API error: ${response.status}`);
        return null;
      }

      const data: BlockchairDogecoinStats = await response.json();

      if (!data.data) {
        console.error('Dogecoin API: No data in response');
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
      console.error('Dogecoin API fetch error:', error);
      return null;
    }
  }
}

export function getDogecoinFetcher(baseUrl?: string): DogecoinFetcher {
  return new DogecoinFetcher(baseUrl);
}
