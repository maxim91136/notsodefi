/**
 * Tron (TRX) Data Fetcher
 *
 * Fetches network metrics from TronGrid public API.
 * Uses HTTP API for witness (Super Representative) data.
 *
 * Docs: https://developers.tron.network/reference
 */

const TRON_API_BASE = 'https://api.trongrid.io';

interface Witness {
  address: string;
  voteCount: number;
  url: string;
  totalProduced: number;
  totalMissed: number;
  latestBlockNum: number;
  isJobs: boolean;
}

interface WitnessesResponse {
  witnesses: Witness[];
}

interface NodeInfoResponse {
  activeConnectCount: number;
  passiveConnectCount: number;
  totalFlow: number;
  block: string;
  beginSyncNum: number;
  solidityBlock: string;
}

export interface TronMetrics {
  totalWitnesses: number | null;
  activeWitnesses: number | null;
  totalVotes: number | null;
  latestBlock: number | null;
  connectedPeers: number | null;
}

export class TronFetcher {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || TRON_API_BASE;
  }

  /**
   * Get all witnesses (Super Representatives)
   */
  async getWitnesses(): Promise<{
    totalWitnesses: number;
    activeWitnesses: number;
    totalVotes: number;
    latestBlock: number;
  }> {
    const response = await fetch(`${this.baseUrl}/wallet/listwitnesses`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Tron API error: ${response.status}`);
    }

    const data = (await response.json()) as WitnessesResponse;
    const witnesses = data.witnesses || [];
    const activeWitnesses = witnesses.filter((w) => w.isJobs).length;
    const totalVotes = witnesses.reduce((sum, w) => sum + (w.voteCount || 0), 0);
    const blockNums = witnesses.map((w) => w.latestBlockNum || 0).filter((n) => n > 0);
    const latestBlock = blockNums.length > 0 ? Math.max(...blockNums) : 0;

    return {
      totalWitnesses: witnesses.length,
      activeWitnesses,
      totalVotes,
      latestBlock,
    };
  }

  /**
   * Get node info
   */
  async getNodeInfo(): Promise<number> {
    const response = await fetch(`${this.baseUrl}/wallet/getnodeinfo`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Tron API error: ${response.status}`);
    }

    const data = (await response.json()) as NodeInfoResponse;
    return data.activeConnectCount + data.passiveConnectCount;
  }

  /**
   * Get all metrics
   */
  async getAllMetrics(): Promise<TronMetrics> {
    try {
      const [witnessData, connectedPeers] = await Promise.all([
        this.getWitnesses(),
        this.getNodeInfo(),
      ]);

      return {
        totalWitnesses: witnessData.totalWitnesses,
        activeWitnesses: witnessData.activeWitnesses,
        totalVotes: witnessData.totalVotes,
        latestBlock: witnessData.latestBlock,
        connectedPeers,
      };
    } catch (error) {
      console.error('Error fetching Tron metrics:', error);
      return {
        totalWitnesses: null,
        activeWitnesses: null,
        totalVotes: null,
        latestBlock: null,
        connectedPeers: null,
      };
    }
  }
}
