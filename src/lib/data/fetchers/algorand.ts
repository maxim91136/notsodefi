/**
 * Algorand (ALGO) Data Fetcher
 *
 * Fetches network metrics from Algorand public APIs.
 * Uses AlgoExplorer API and public Algorand node endpoints.
 *
 * Docs: https://developer.algorand.org/docs/rest-apis/algod/
 * Explorer: https://algoexplorer.io/api-dev/v2
 */

const ALGOEXPLORER_API = 'https://algoexplorerapi.io';
const ALGORAND_MAINNET_API = 'https://mainnet-api.algonode.cloud';

interface AlgoNodeStatusResponse {
  'last-round': number;
  'time-since-last-round': number;
  'catchup-time': number;
  'last-version': string;
  'next-version': string;
  'next-version-round': number;
  'next-version-supported': boolean;
  'stopped-at-unsupported-round': boolean;
}

interface AlgoNodeSupplyResponse {
  'current_round': number;
  'online-money': number;
  'total-money': number;
}

interface AlgoExplorerHealthResponse {
  round: number;
  data: string;
  is_migrating: boolean;
  message: string;
  version: string;
}

interface ParticipationAccount {
  address: string;
  'participation-key': {
    'selection-participation-key': string;
    'state-proof-key': string;
    'vote-first-valid': number;
    'vote-key-dilution': number;
    'vote-last-valid': number;
    'vote-participation-key': string;
  };
}

export interface AlgorandMetrics {
  currentRound: number | null;
  totalSupply: number | null; // Total ALGO supply
  onlineStake: number | null; // Amount of ALGO participating in consensus
  stakePercentage: number | null; // % of supply that's online
  lastBlockTime: number | null; // Time since last block (ms)
  apiVersion: string | null;
}

export class AlgorandFetcher {
  private explorerUrl: string;
  private nodeUrl: string;

  constructor(explorerUrl?: string, nodeUrl?: string) {
    this.explorerUrl = explorerUrl || ALGOEXPLORER_API;
    this.nodeUrl = nodeUrl || ALGORAND_MAINNET_API;
  }

  /**
   * Get node status
   */
  async getNodeStatus(): Promise<AlgoNodeStatusResponse | null> {
    try {
      const response = await fetch(`${this.nodeUrl}/v2/status`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        console.error(`Algorand node status error: ${response.status}`);
        return null;
      }

      return await response.json() as AlgoNodeStatusResponse;
    } catch (error) {
      console.error('Error fetching Algorand node status:', error);
      return null;
    }
  }

  /**
   * Get supply information
   */
  async getSupply(): Promise<AlgoNodeSupplyResponse | null> {
    try {
      const response = await fetch(`${this.nodeUrl}/v2/ledger/supply`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        console.error(`Algorand supply error: ${response.status}`);
        return null;
      }

      return await response.json() as AlgoNodeSupplyResponse;
    } catch (error) {
      console.error('Error fetching Algorand supply:', error);
      return null;
    }
  }

  /**
   * Get AlgoExplorer health/status
   */
  async getExplorerHealth(): Promise<AlgoExplorerHealthResponse | null> {
    try {
      const response = await fetch(`${this.explorerUrl}/idx2/health`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        console.error(`AlgoExplorer health error: ${response.status}`);
        return null;
      }

      return await response.json() as AlgoExplorerHealthResponse;
    } catch (error) {
      console.error('Error fetching AlgoExplorer health:', error);
      return null;
    }
  }

  /**
   * Get all metrics
   */
  async getAllMetrics(): Promise<AlgorandMetrics> {
    try {
      const [statusData, supplyData, explorerHealth] = await Promise.all([
        this.getNodeStatus(),
        this.getSupply(),
        this.getExplorerHealth(),
      ]);

      // Calculate metrics
      const currentRound = statusData?.['last-round'] || explorerHealth?.round || null;
      const totalSupply = supplyData?.['total-money'] ? supplyData['total-money'] / 1_000_000 : null; // microALGO to ALGO
      const onlineStake = supplyData?.['online-money'] ? supplyData['online-money'] / 1_000_000 : null;
      const stakePercentage = totalSupply && onlineStake ? (onlineStake / totalSupply) * 100 : null;
      const lastBlockTime = statusData?.['time-since-last-round'] || null;
      const apiVersion = statusData?.['last-version'] || explorerHealth?.version || null;

      return {
        currentRound,
        totalSupply,
        onlineStake,
        stakePercentage,
        lastBlockTime,
        apiVersion,
      };
    } catch (error) {
      console.error('Error fetching Algorand metrics:', error);
      return {
        currentRound: null,
        totalSupply: null,
        onlineStake: null,
        stakePercentage: null,
        lastBlockTime: null,
        apiVersion: null,
      };
    }
  }

  /**
   * Format metrics for display
   */
  formatMetrics(metrics: AlgorandMetrics): Record<string, string> {
    return {
      'Current Round': metrics.currentRound?.toLocaleString() || 'N/A',
      'Total Supply': metrics.totalSupply ? `${metrics.totalSupply.toLocaleString()} ALGO` : 'N/A',
      'Online Stake': metrics.onlineStake ? `${metrics.onlineStake.toLocaleString()} ALGO` : 'N/A',
      'Stake Participation': metrics.stakePercentage ? `${metrics.stakePercentage.toFixed(2)}%` : 'N/A',
      'Last Block Time': metrics.lastBlockTime ? `${(metrics.lastBlockTime / 1000).toFixed(2)}s ago` : 'N/A',
      'API Version': metrics.apiVersion || 'N/A',
    };
  }
}
