/**
 * Ethereum Classic Fetcher
 *
 * Fetches network data from Ethereum Classic using Blockscout API.
 * ETC uses Proof of Work (Etchash).
 */

const ETC_BLOCKSCOUT_API = 'https://etc.blockscout.com/api/v2/stats';

interface BlockscoutETCStats {
  total_blocks: string;
  total_transactions: string;
  total_addresses: string;
  average_block_time: number;
  transactions_today: string;
  gas_used_today: string;
}

export class ETCFetcher {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || ETC_BLOCKSCOUT_API;
  }

  /**
   * Get ETC network stats from Blockscout
   */
  async getNetworkStats(): Promise<{
    blocks: number | null;
    transactions: number | null;
    addresses: number | null;
    avgBlockTime: number | null;
  } | null> {
    try {
      const response = await fetch(this.baseUrl);

      if (!response.ok) {
        console.error(`ETC API error: ${response.status}`);
        return null;
      }

      const data: BlockscoutETCStats = await response.json();

      return {
        blocks: data.total_blocks ? parseInt(data.total_blocks) : null,
        transactions: data.total_transactions ? parseInt(data.total_transactions) : null,
        addresses: data.total_addresses ? parseInt(data.total_addresses) : null,
        avgBlockTime: data.average_block_time || null,
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
