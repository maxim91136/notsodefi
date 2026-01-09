/**
 * XRPL (XRP Ledger) Fetcher
 *
 * Uses public XRPL JSON-RPC endpoints to fetch network data.
 * No API key required.
 *
 * Docs: https://xrpl.org/docs/references/http-websocket-apis/public-api-methods
 */

import { BaseFetcher, FetcherConfig, FetchResult } from './base';
import type { RawDataPoint } from '../sources';

interface ServerInfoResponse {
  result: {
    info: {
      build_version: string;
      complete_ledgers: string;
      hostid: string;
      server_state: string;
      validated_ledger?: {
        seq: number;
        hash: string;
        close_time: number;
      };
      peers: number;
      validation_quorum: number;
      validator_list?: {
        count: number;
        expiration: string;
        status: string;
      };
    };
    status: string;
  };
}

interface ServerStateResponse {
  result: {
    state: {
      build_version: string;
      complete_ledgers: string;
      server_state: string;
      validated_ledger?: {
        seq: number;
      };
      peers: number;
      validation_quorum: number;
    };
    status: string;
  };
}

const DEFAULT_CONFIG: FetcherConfig = {
  baseUrl: 'https://s1.ripple.com:51234',
  rateLimit: 10, // Conservative rate limit
  timeout: 30000,
};

export class XrplFetcher extends BaseFetcher {
  constructor(config: Partial<FetcherConfig> = {}) {
    super('manual', { ...DEFAULT_CONFIG, ...config }); // Using 'manual' as placeholder provider
  }

  /** Make JSON-RPC call */
  private async rpcCall<T>(method: string, params?: Record<string, unknown>): Promise<FetchResult<T>> {
    await this.throttle();

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

      const body: Record<string, unknown> = { method };
      if (params) {
        body.params = [params];
      }

      const response = await fetch(this.config.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        return {
          success: false,
          error: `HTTP ${response.status}: ${response.statusText}`,
        };
      }

      const json = await response.json() as T;
      return { success: true, data: json };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /** Get server info */
  async getServerInfo(): Promise<FetchResult<ServerInfoResponse>> {
    return this.rpcCall<ServerInfoResponse>('server_info');
  }

  /** Get server state */
  async getServerState(): Promise<FetchResult<ServerStateResponse>> {
    return this.rpcCall<ServerStateResponse>('server_state');
  }

  /** Get connected peers count */
  async getConnectedPeers(): Promise<RawDataPoint | null> {
    const result = await this.getServerInfo();
    if (!result.success || !result.data) return null;

    return this.createDataPoint(result.data.result.info.peers);
  }

  /** Get validation quorum */
  async getValidationQuorum(): Promise<RawDataPoint | null> {
    const result = await this.getServerInfo();
    if (!result.success || !result.data) return null;

    return this.createDataPoint(result.data.result.info.validation_quorum);
  }

  /** Get latest validated ledger sequence */
  async getValidatedLedgerSeq(): Promise<RawDataPoint | null> {
    const result = await this.getServerInfo();
    if (!result.success || !result.data) return null;

    const ledger = result.data.result.info.validated_ledger;
    if (!ledger) return null;

    return this.createDataPoint(ledger.seq);
  }

  /** Get server state (synced, connected, etc.) */
  async getServerState2(): Promise<RawDataPoint | null> {
    const result = await this.getServerInfo();
    if (!result.success || !result.data) return null;

    return this.createDataPoint(result.data.result.info.server_state);
  }

  /** Get build version */
  async getBuildVersion(): Promise<RawDataPoint | null> {
    const result = await this.getServerInfo();
    if (!result.success || !result.data) return null;

    return this.createDataPoint(result.data.result.info.build_version);
  }

  /** Get validator list count if available */
  async getValidatorListCount(): Promise<RawDataPoint | null> {
    const result = await this.getServerInfo();
    if (!result.success || !result.data) return null;

    const validatorList = result.data.result.info.validator_list;
    if (!validatorList) return null;

    return this.createDataPoint(validatorList.count);
  }

  /** Abstract method implementation */
  async fetch(): Promise<RawDataPoint | null> {
    return this.getConnectedPeers();
  }
}

/** Singleton instance */
let instance: XrplFetcher | null = null;

export function getXrplFetcher(): XrplFetcher {
  if (!instance) {
    instance = new XrplFetcher();
  }
  return instance;
}
