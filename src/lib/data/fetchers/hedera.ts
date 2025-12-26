/**
 * Hedera (HBAR) Data Fetcher
 *
 * Fetches network data from Hedera Mirror Node API.
 * All nodes are operated by Governing Council members.
 *
 * Docs: https://docs.hedera.com/hedera/sdks-and-apis/rest-api
 */

const MIRROR_NODE_API = 'https://mainnet-public.mirrornode.hedera.com/api/v1';

interface NodeInfo {
  node_id: number;
  node_account_id: string;
  description: string;
  stake: number;
  stake_rewarded: number;
  stake_not_rewarded: number;
  max_stake: number;
}

interface NodesResponse {
  nodes: NodeInfo[];
}

interface NetworkSupplyResponse {
  released_supply: string;
  total_supply: string;
  timestamp: string;
}

export interface HederaMetrics {
  totalNodes: number | null;
  totalStake: number | null;
  top5Concentration: number | null;
  releasedSupply: number | null;
  totalSupply: number | null;
}

export class HederaFetcher {
  private apiUrl: string;

  constructor(apiUrl?: string) {
    this.apiUrl = apiUrl || MIRROR_NODE_API;
  }

  /**
   * Fetch network nodes data
   */
  async getNodes(): Promise<{
    totalNodes: number;
    totalStake: number;
    top5Concentration: number;
  }> {
    const response = await fetch(`${this.apiUrl}/network/nodes`);
    if (!response.ok) {
      throw new Error(`Hedera API error: ${response.status}`);
    }

    const data: NodesResponse = await response.json();
    const nodes = data.nodes;

    // Calculate total stake
    const stakes = nodes.map((n) => n.stake).sort((a, b) => b - a);
    const totalStake = stakes.reduce((sum, s) => sum + s, 0);

    // Top 5 concentration
    const top5Stake = stakes.slice(0, 5).reduce((sum, s) => sum + s, 0);
    const top5Concentration =
      totalStake > 0 ? Math.round((top5Stake / totalStake) * 10000) / 100 : 0;

    return {
      totalNodes: nodes.length,
      totalStake: Math.round(totalStake / 1e8), // Convert to HBAR
      top5Concentration,
    };
  }

  /**
   * Fetch supply data
   */
  async getSupply(): Promise<{
    releasedSupply: number;
    totalSupply: number;
  }> {
    const response = await fetch(`${this.apiUrl}/network/supply`);
    if (!response.ok) {
      throw new Error(`Hedera API error: ${response.status}`);
    }

    const data: NetworkSupplyResponse = await response.json();

    return {
      releasedSupply: Math.round(parseInt(data.released_supply, 10) / 1e8),
      totalSupply: Math.round(parseInt(data.total_supply, 10) / 1e8),
    };
  }

  /**
   * Get all metrics
   */
  async getAllMetrics(): Promise<HederaMetrics> {
    try {
      const [nodesData, supplyData] = await Promise.all([
        this.getNodes(),
        this.getSupply(),
      ]);

      return {
        totalNodes: nodesData.totalNodes,
        totalStake: nodesData.totalStake,
        top5Concentration: nodesData.top5Concentration,
        releasedSupply: supplyData.releasedSupply,
        totalSupply: supplyData.totalSupply,
      };
    } catch (error) {
      console.error('Error fetching Hedera metrics:', error);
      return {
        totalNodes: null,
        totalStake: null,
        top5Concentration: null,
        releasedSupply: null,
        totalSupply: null,
      };
    }
  }
}

export function getHederaFetcher(apiUrl?: string): HederaFetcher {
  return new HederaFetcher(apiUrl);
}
