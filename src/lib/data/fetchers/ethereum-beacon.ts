/**
 * Ethereum Beacon API Fetcher
 *
 * Uses public Beacon API endpoints to fetch validator and consensus data.
 * No API key required.
 *
 * Beacon API: https://ethereum-beacon-api.publicnode.com
 * Docs: https://ethereum.github.io/beacon-APIs/
 */

import { BaseFetcher, FetcherConfig, FetchResult } from './base';
import type { RawDataPoint } from '../sources';

interface FinalityCheckpoints {
  data: {
    finalized: { epoch: string };
    current_justified: { epoch: string };
    previous_justified: { epoch: string };
  };
}

interface NodeVersion {
  data: {
    version: string;
  };
}

interface PeerCount {
  data: {
    connected: string;
    connecting: string;
    disconnected: string;
    disconnecting: string;
  };
}

interface SyncStatus {
  data: {
    head_slot: string;
    sync_distance: string;
    is_syncing: boolean;
    is_optimistic: boolean;
    el_offline: boolean;
  };
}

const DEFAULT_CONFIG: FetcherConfig = {
  baseUrl: 'https://ethereum-beacon-api.publicnode.com',
  rateLimit: 10, // Conservative rate limit
  timeout: 30000,
};

export class EthereumBeaconFetcher extends BaseFetcher {
  constructor(config: Partial<FetcherConfig> = {}) {
    super('ethernodes', { ...DEFAULT_CONFIG, ...config });
  }

  /** Get finality checkpoints */
  async getFinalityCheckpoints(): Promise<FetchResult<FinalityCheckpoints>> {
    return this.request<FinalityCheckpoints>('/eth/v1/beacon/states/head/finality_checkpoints');
  }

  /** Get node version */
  async getNodeVersion(): Promise<FetchResult<NodeVersion>> {
    return this.request<NodeVersion>('/eth/v1/node/version');
  }

  /** Get peer count */
  async getPeerCount(): Promise<FetchResult<PeerCount>> {
    return this.request<PeerCount>('/eth/v1/node/peer_count');
  }

  /** Get sync status */
  async getSyncStatus(): Promise<FetchResult<SyncStatus>> {
    return this.request<SyncStatus>('/eth/v1/node/syncing');
  }

  /** Get total validator count from state */
  async getValidatorCount(): Promise<RawDataPoint | null> {
    // Use the validator count endpoint
    const result = await this.request<{ data: { active_ongoing: string; pending_queued: string; exited_slashed: string } }>(
      '/eth/v1/beacon/states/head/validator_balances'
    );

    // This endpoint returns all validator balances, count them
    if (!result.success) {
      // Fallback: try to get from a summary endpoint
      const altResult = await this.request<{ data: unknown[] }>('/eth/v1/beacon/states/head/validators?status=active_ongoing');
      if (altResult.success && altResult.data) {
        return this.createDataPoint(altResult.data.data.length);
      }
      return null;
    }

    return null;
  }

  /** Get active validator count */
  async getActiveValidators(): Promise<RawDataPoint | null> {
    try {
      // Get count of active validators
      const result = await this.request<{ data: { index: string }[] }>(
        '/eth/v1/beacon/states/head/validators?status=active_ongoing'
      );

      if (result.success && result.data) {
        return this.createDataPoint(result.data.data.length);
      }
    } catch (e) {
      console.log('Error fetching validators:', e);
    }

    return null;
  }

  /** Get connected peers count */
  async getConnectedPeers(): Promise<RawDataPoint | null> {
    const result = await this.getPeerCount();
    if (!result.success || !result.data) return null;

    return this.createDataPoint(parseInt(result.data.data.connected, 10));
  }

  /** Get current finalized epoch */
  async getFinalizedEpoch(): Promise<RawDataPoint | null> {
    const result = await this.getFinalityCheckpoints();
    if (!result.success || !result.data) return null;

    return this.createDataPoint(parseInt(result.data.data.finalized.epoch, 10));
  }

  /** Get sync distance (0 = fully synced) */
  async getSyncDistance(): Promise<RawDataPoint | null> {
    const result = await this.getSyncStatus();
    if (!result.success || !result.data) return null;

    return this.createDataPoint(parseInt(result.data.data.sync_distance, 10));
  }

  /** Get current head slot */
  async getHeadSlot(): Promise<RawDataPoint | null> {
    const result = await this.getSyncStatus();
    if (!result.success || !result.data) return null;

    return this.createDataPoint(parseInt(result.data.data.head_slot, 10));
  }

  /** Abstract method implementation */
  async fetch(): Promise<RawDataPoint | null> {
    return this.getConnectedPeers();
  }
}

/** Singleton instance */
let instance: EthereumBeaconFetcher | null = null;

export function getEthereumBeaconFetcher(): EthereumBeaconFetcher {
  if (!instance) {
    instance = new EthereumBeaconFetcher();
  }
  return instance;
}
