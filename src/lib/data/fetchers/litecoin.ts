/**
 * Litecoin Fetcher
 *
 * Fetches network data from Litecoin using Blockchair API.
 * Litecoin uses Proof of Work (Scrypt) similar to Bitcoin.
 */

const LITECOIN_API = 'https://api.blockchair.com/litecoin/stats';

interface BlockchairLitecoinStats {
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

export class LitecoinFetcher {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || LITECOIN_API;
  }

  /**
   * Get Litecoin network stats from Blockchair
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
        console.error(`Litecoin API error: ${response.status}`);
        return null;
      }

      const data: BlockchairLitecoinStats = await response.json();

      if (!data.data) {
        console.error('Litecoin API: No data in response');
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
      console.error('Litecoin API fetch error:', error);
      return null;
    }
  }
}

export function getLitecoinFetcher(baseUrl?: string): LitecoinFetcher {
  return new LitecoinFetcher(baseUrl);
}
