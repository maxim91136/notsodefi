/**
 * Kaspa (KAS) Data Fetcher
 *
 * Fetches network metrics from Kaspa REST API.
 * Uses GHOSTDAG/blockDAG consensus (PoW).
 *
 * Docs: https://api.kaspa.org/docs
 */

const KASPA_API_BASE = 'https://api.kaspa.org';

interface NetworkInfoResponse {
  networkName: string;
  blockCount: string;
  headerCount: string;
  difficulty: number;
  virtualDaaScore: string;
}

interface HashrateResponse {
  hashrate: number;
}

interface CoinSupplyResponse {
  circulatingSupply: string;
  maxSupply: string;
}

interface BlockRewardResponse {
  blockreward: number;
}

export interface KaspaMetrics {
  networkName: string | null;
  blockCount: number | null;
  difficulty: number | null;
  hashrate: number | null;
  circulatingSupply: number | null;
  maxSupply: number | null;
  blockReward: number | null;
}

export class KaspaFetcher {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || KASPA_API_BASE;
  }

  /**
   * Fetch from Kaspa REST API
   */
  private async fetchEndpoint<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Kaspa API error: ${response.status}`);
    }

    return response.json() as Promise<T>;
  }

  /**
   * Get network info
   */
  async getNetworkInfo(): Promise<{
    networkName: string;
    blockCount: number;
    difficulty: number;
  }> {
    const result = await this.fetchEndpoint<NetworkInfoResponse>('/info/network');

    return {
      networkName: result.networkName,
      blockCount: parseInt(result.blockCount, 10),
      difficulty: result.difficulty,
    };
  }

  /**
   * Get current hashrate
   */
  async getHashrate(): Promise<number> {
    const result = await this.fetchEndpoint<HashrateResponse>('/info/hashrate');
    // Hashrate is returned in TH/s, convert to PH/s for display
    return Math.round(result.hashrate / 1000);
  }

  /**
   * Get coin supply info
   */
  async getCoinSupply(): Promise<{
    circulatingSupply: number;
    maxSupply: number;
  }> {
    const result = await this.fetchEndpoint<CoinSupplyResponse>('/info/coinsupply');

    // Supply is in sompi (1 KAS = 1e8 sompi)
    return {
      circulatingSupply: Math.round(parseInt(result.circulatingSupply, 10) / 1e8),
      maxSupply: Math.round(parseInt(result.maxSupply, 10) / 1e8),
    };
  }

  /**
   * Get current block reward
   */
  async getBlockReward(): Promise<number> {
    const result = await this.fetchEndpoint<BlockRewardResponse>('/info/blockreward');
    return result.blockreward;
  }

  /**
   * Get all metrics
   */
  async getAllMetrics(): Promise<KaspaMetrics> {
    try {
      const [network, hashrate, supply, blockReward] = await Promise.all([
        this.getNetworkInfo(),
        this.getHashrate(),
        this.getCoinSupply(),
        this.getBlockReward(),
      ]);

      return {
        networkName: network.networkName,
        blockCount: network.blockCount,
        difficulty: network.difficulty,
        hashrate,
        circulatingSupply: supply.circulatingSupply,
        maxSupply: supply.maxSupply,
        blockReward,
      };
    } catch (error) {
      console.error('Error fetching Kaspa metrics:', error);
      return {
        networkName: null,
        blockCount: null,
        difficulty: null,
        hashrate: null,
        circulatingSupply: null,
        maxSupply: null,
        blockReward: null,
      };
    }
  }
}

export function getKaspaFetcher(baseUrl?: string): KaspaFetcher {
  return new KaspaFetcher(baseUrl);
}
