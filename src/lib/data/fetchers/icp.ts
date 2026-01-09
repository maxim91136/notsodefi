/**
 * Internet Computer (ICP) Data Fetcher
 *
 * Uses IC Dashboard API to fetch network metrics.
 * No API key required.
 *
 * Endpoints:
 * - https://ic-api.internetcomputer.org/api/v3/metrics/ic-nodes-count
 * - https://ic-api.internetcomputer.org/api/v3/node-providers-count
 * - https://ic-api.internetcomputer.org/api/v3/subnets
 */

const IC_API_BASE = 'https://ic-api.internetcomputer.org/api/v3';

export interface IcpMetrics {
  totalNodes: number | null;
  upNodes: number | null;
  nodeProviders: number | null;
  subnets: number | null;
  avgNakamotoCoefficient: number | null;
}

export class IcpFetcher {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || IC_API_BASE;
  }

  async getNodeCounts(): Promise<{ total: number | null; up: number | null }> {
    try {
      const response = await fetch(`${this.baseUrl}/metrics/ic-nodes-count`);
      if (!response.ok) {
        console.error('Failed to fetch node counts:', response.status);
        return { total: null, up: null };
      }
      const data = await response.json();

      // Data format: { "total_nodes": [[timestamp, "value"]], "up_nodes": [[timestamp, "value"]] }
      const totalNodes = data.total_nodes?.[0]?.[1];
      const upNodes = data.up_nodes?.[0]?.[1];

      return {
        total: totalNodes ? parseInt(totalNodes, 10) : null,
        up: upNodes ? parseInt(upNodes, 10) : null,
      };
    } catch (error) {
      console.error('Error fetching node counts:', error);
      return { total: null, up: null };
    }
  }

  async getNodeProvidersCount(): Promise<number | null> {
    try {
      const response = await fetch(`${this.baseUrl}/node-providers-count`);
      if (!response.ok) {
        console.error('Failed to fetch node providers count:', response.status);
        return null;
      }
      const data = await response.json();
      return data.count ?? null;
    } catch (error) {
      console.error('Error fetching node providers count:', error);
      return null;
    }
  }

  async getSubnetsInfo(): Promise<{ count: number | null; avgNakamoto: number | null }> {
    try {
      const response = await fetch(`${this.baseUrl}/subnets`);
      if (!response.ok) {
        console.error('Failed to fetch subnets:', response.status);
        return { count: null, avgNakamoto: null };
      }
      const data = await response.json();

      // Data is an array of subnets
      const subnets = data.subnets || data;
      if (!Array.isArray(subnets)) {
        return { count: null, avgNakamoto: null };
      }

      const count = subnets.length;

      // Calculate average Nakamoto coefficient across subnets
      const nakamotoValues = subnets
        .map((s: { nakamoto_coefficient?: number }) => s.nakamoto_coefficient)
        .filter((n: number | undefined): n is number => typeof n === 'number');

      const avgNakamoto = nakamotoValues.length > 0
        ? nakamotoValues.reduce((a: number, b: number) => a + b, 0) / nakamotoValues.length
        : null;

      return { count, avgNakamoto };
    } catch (error) {
      console.error('Error fetching subnets:', error);
      return { count: null, avgNakamoto: null };
    }
  }

  async getAllMetrics(): Promise<IcpMetrics> {
    const [nodeCounts, nodeProviders, subnets] = await Promise.all([
      this.getNodeCounts(),
      this.getNodeProvidersCount(),
      this.getSubnetsInfo(),
    ]);

    return {
      totalNodes: nodeCounts.total,
      upNodes: nodeCounts.up,
      nodeProviders,
      subnets: subnets.count,
      avgNakamotoCoefficient: subnets.avgNakamoto,
    };
  }
}

export function getIcpFetcher(baseUrl?: string): IcpFetcher {
  return new IcpFetcher(baseUrl);
}
