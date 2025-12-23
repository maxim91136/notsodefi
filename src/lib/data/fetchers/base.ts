/**
 * Base Data Fetcher
 *
 * Abstract class that all API fetchers extend.
 * Handles common functionality like rate limiting, caching, and error handling.
 */

import type { DataSourceProvider, RawDataPoint } from '../sources';

export interface FetcherConfig {
  apiKey?: string;
  baseUrl: string;
  rateLimit: number; // requests per minute
  timeout: number;   // ms
}

export interface FetchResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  cached?: boolean;
}

export abstract class BaseFetcher {
  protected provider: DataSourceProvider;
  protected config: FetcherConfig;
  protected lastRequest: number = 0;

  constructor(provider: DataSourceProvider, config: FetcherConfig) {
    this.provider = provider;
    this.config = config;
  }

  /** Rate limit check */
  protected async throttle(): Promise<void> {
    const minInterval = (60 * 1000) / this.config.rateLimit;
    const elapsed = Date.now() - this.lastRequest;

    if (elapsed < minInterval) {
      await new Promise((resolve) => setTimeout(resolve, minInterval - elapsed));
    }

    this.lastRequest = Date.now();
  }

  /** Make HTTP request with error handling */
  protected async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<FetchResult<T>> {
    await this.throttle();

    const url = `${this.config.baseUrl}${endpoint}`;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
          ...options?.headers,
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        return {
          success: false,
          error: `HTTP ${response.status}: ${response.statusText}`,
        };
      }

      const data = await response.json() as T;
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /** Create a RawDataPoint from fetched value */
  protected createDataPoint(
    value: number | string | null,
    confidence: number = 1.0
  ): RawDataPoint {
    return {
      value,
      timestamp: new Date(),
      source: this.provider,
      confidence,
    };
  }

  /** Abstract method - each fetcher implements its own fetch logic */
  abstract fetch(params: Record<string, string>): Promise<RawDataPoint | null>;

  /** Get provider name */
  getProvider(): DataSourceProvider {
    return this.provider;
  }
}
