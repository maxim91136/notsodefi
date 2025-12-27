/**
 * Arbitrum One Fetcher
 *
 * Fetches network data from Arbitrum public RPC.
 * L2 with centralized sequencer - limited on-chain metrics.
 *
 * RPC: https://arb1.arbitrum.io/rpc (public, no API key)
 * Alternative: https://rpc.ankr.com/arbitrum
 */

const ARBITRUM_RPC = 'https://arb1.arbitrum.io/rpc';

export interface ArbitrumMetrics {
  blockNumber: number | null;
  gasPrice: number | null; // in Gwei
  chainId: number | null;
  sequencer: string; // Always 'Centralized (Arbitrum Foundation)'
}

export class ArbitrumFetcher {
  private rpcUrl: string;

  constructor(rpcUrl?: string) {
    this.rpcUrl = rpcUrl || ARBITRUM_RPC;
  }

  /**
   * Make JSON-RPC call
   */
  private async rpcCall<T>(method: string, params: unknown[] = []): Promise<T> {
    const response = await fetch(this.rpcUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method,
        params,
      }),
    });

    if (!response.ok) {
      throw new Error(`Arbitrum RPC error: ${response.status}`);
    }

    const data = await response.json();
    if (data.error) {
      throw new Error(`RPC error: ${data.error.message}`);
    }

    return data.result as T;
  }

  /**
   * Get current block number
   */
  async getBlockNumber(): Promise<number> {
    const hex = await this.rpcCall<string>('eth_blockNumber');
    return parseInt(hex, 16);
  }

  /**
   * Get current gas price in Gwei
   */
  async getGasPrice(): Promise<number> {
    const hex = await this.rpcCall<string>('eth_gasPrice');
    const wei = parseInt(hex, 16);
    return Math.round(wei / 1e9 * 100) / 100; // Convert to Gwei with 2 decimals
  }

  /**
   * Get chain ID (should be 42161 for Arbitrum One)
   */
  async getChainId(): Promise<number> {
    const hex = await this.rpcCall<string>('eth_chainId');
    return parseInt(hex, 16);
  }

  /**
   * Get all metrics
   */
  async getAllMetrics(): Promise<ArbitrumMetrics> {
    try {
      const [blockNumber, gasPrice, chainId] = await Promise.all([
        this.getBlockNumber(),
        this.getGasPrice(),
        this.getChainId(),
      ]);

      return {
        blockNumber,
        gasPrice,
        chainId,
        sequencer: 'Centralized (Arbitrum Foundation)',
      };
    } catch (error) {
      console.error('Failed to fetch Arbitrum metrics:', error);
      return {
        blockNumber: null,
        gasPrice: null,
        chainId: null,
        sequencer: 'Centralized (Arbitrum Foundation)',
      };
    }
  }
}

export function getArbitrumFetcher(rpcUrl?: string): ArbitrumFetcher {
  return new ArbitrumFetcher(rpcUrl);
}
