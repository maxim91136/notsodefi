/**
 * Bitnodes Fetcher
 *
 * Fetches Bitcoin node data from bitnodes.io API.
 * Free tier: 50 requests/day without authentication.
 *
 * API Docs: https://bitnodes.io/api/
 *
 * Note: Snapshot endpoint only provides basic data (no geo).
 * Node status endpoint has geo data but requires per-node queries.
 * We use sampling for geo/cloud metrics (40 nodes = ~80% of daily limit).
 */

import { BaseFetcher, type FetcherConfig } from './base';
import type { RawDataPoint } from '../sources';

/** Bitnodes API response types */
interface BitnodesSnapshot {
  timestamp: number;
  total_nodes: number;
  latest_height: number;
  nodes: Record<string, [number, string, number, number, number]>;
}

interface BitnodesNodeStatus {
  address: string;
  status: string;
  // [protocol, user_agent, timestamp, services, height, hostname, city, country, lat, lon, timezone, asn, org]
  data: [number, string, number, number, number, string, string | null, string, number, number, string, string, string];
  mbps: string;
  rtt: number;
}

/** Known cloud provider ASNs */
const CLOUD_ASNS = new Set([
  'AS16509',  // Amazon
  'AS14618',  // Amazon
  'AS15169',  // Google
  'AS8075',   // Microsoft
  'AS396982', // Google Cloud
  'AS13335',  // Cloudflare
  'AS14061',  // DigitalOcean
  'AS20473',  // Vultr
  'AS63949',  // Linode
  'AS24940',  // Hetzner
  'AS51167',  // Contabo
  'AS16276',  // OVH
  'AS12876',  // Scaleway
]);

export class BitnodesFetcher extends BaseFetcher {
  constructor(config?: Partial<FetcherConfig>) {
    super('bitnodes', {
      baseUrl: 'https://bitnodes.io',
      rateLimit: 3,      // ~50/day = ~3/hour to be safe
      timeout: 30000,
      ...config,
    });
  }

  /**
   * Fetch latest snapshot (basic data only)
   */
  async fetchSnapshot(): Promise<BitnodesSnapshot | null> {
    const result = await this.request<BitnodesSnapshot>('/api/v1/snapshots/latest/');
    return result.success ? result.data! : null;
  }

  /**
   * Fetch detailed node status (includes geo/ASN data)
   * Uses ADDRESS-PORT format (dash, not colon)
   */
  async fetchNodeStatus(address: string, port: string): Promise<BitnodesNodeStatus | null> {
    const result = await this.request<BitnodesNodeStatus>(`/api/v1/nodes/${address}-${port}/`);
    return result.success ? result.data! : null;
  }

  /**
   * Get total node count (reliable, 1 API call)
   */
  async getTotalNodes(): Promise<RawDataPoint | null> {
    const snapshot = await this.fetchSnapshot();
    if (!snapshot) return null;
    return this.createDataPoint(snapshot.total_nodes, 1.0);
  }

  /**
   * Sample nodes to estimate cloud percentage
   * Uses ~40 API calls for statistical sampling
   */
  async getCloudPercentageSampled(sampleSize = 40): Promise<RawDataPoint | null> {
    const snapshot = await this.fetchSnapshot();
    if (!snapshot) return null;

    // Get IPv4 nodes only (exclude .onion for sampling)
    const nodeKeys = Object.keys(snapshot.nodes).filter(k => !k.includes('.onion'));
    if (nodeKeys.length === 0) return null;

    // Random sample
    const shuffled = nodeKeys.sort(() => Math.random() - 0.5);
    const sample = shuffled.slice(0, Math.min(sampleSize, nodeKeys.length));

    let cloudCount = 0;
    let successCount = 0;

    for (const nodeKey of sample) {
      const [address, port] = nodeKey.includes('[')
        ? [nodeKey.slice(1, nodeKey.lastIndexOf(']')), nodeKey.split(':').pop()!]
        : nodeKey.split(':');

      const status = await this.fetchNodeStatus(address, port);
      if (status?.data) {
        successCount++;
        const asn = status.data[11];
        if (asn && CLOUD_ASNS.has(asn)) {
          cloudCount++;
        }
      }
    }

    if (successCount === 0) return null;

    const cloudPercentage = Math.round((cloudCount / successCount) * 100);
    // Lower confidence due to sampling
    const confidence = Math.min(0.8, successCount / sampleSize);

    return this.createDataPoint(cloudPercentage, confidence);
  }

  /**
   * Sample nodes to estimate geographic concentration
   */
  async getGeographicConcentrationSampled(sampleSize = 40): Promise<RawDataPoint | null> {
    const snapshot = await this.fetchSnapshot();
    if (!snapshot) return null;

    const nodeKeys = Object.keys(snapshot.nodes).filter(k => !k.includes('.onion'));
    if (nodeKeys.length === 0) return null;

    const shuffled = nodeKeys.sort(() => Math.random() - 0.5);
    const sample = shuffled.slice(0, Math.min(sampleSize, nodeKeys.length));

    const countryCount: Record<string, number> = {};
    let successCount = 0;

    for (const nodeKey of sample) {
      const [address, port] = nodeKey.includes('[')
        ? [nodeKey.slice(1, nodeKey.lastIndexOf(']')), nodeKey.split(':').pop()!]
        : nodeKey.split(':');

      const status = await this.fetchNodeStatus(address, port);
      if (status?.data) {
        successCount++;
        const country = status.data[7];
        if (country) {
          countryCount[country] = (countryCount[country] || 0) + 1;
        }
      }
    }

    if (successCount === 0) return null;

    // Top 5 concentration
    const sorted = Object.entries(countryCount).sort((a, b) => b[1] - a[1]).slice(0, 5);
    const top5Count = sorted.reduce((sum, [, count]) => sum + count, 0);
    const top5Percentage = Math.round((top5Count / successCount) * 100);

    const confidence = Math.min(0.7, successCount / sampleSize);

    return this.createDataPoint(top5Percentage, confidence);
  }

  /**
   * Generic fetch method (required by base class)
   */
  async fetch(params: Record<string, string>): Promise<RawDataPoint | null> {
    const metric = params.metric || 'total_nodes';

    switch (metric) {
      case 'total_nodes':
        return this.getTotalNodes();
      case 'cloud_percentage':
        return this.getCloudPercentageSampled();
      case 'geographic_concentration':
        return this.getGeographicConcentrationSampled();
      default:
        return null;
    }
  }
}

/** Singleton instance */
let instance: BitnodesFetcher | null = null;

export function getBitnodesFetcher(): BitnodesFetcher {
  if (!instance) {
    instance = new BitnodesFetcher();
  }
  return instance;
}
