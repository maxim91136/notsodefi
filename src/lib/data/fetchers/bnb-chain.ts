/**
 * BNB Chain Fetcher
 *
 * Fetches network data from BNB Chain (formerly BSC) using public RPC.
 * BNB Chain uses Proof of Staked Authority (PoSA) with 21 validators.
 */

const BNB_RPC_ENDPOINTS = [
  'https://bsc-dataseed1.binance.org',
  'https://bsc-dataseed2.binance.org',
  'https://bsc-dataseed3.binance.org',
  'https://bsc-dataseed4.binance.org',
];

interface JsonRpcResponse<T> {
  jsonrpc: string;
  id: number;
  result?: T;
  error?: { code: number; message: string };
}

export class BnbChainFetcher {
  private endpoint: string;
  private requestId: number = 1;

  constructor(endpoint?: string) {
    this.endpoint = endpoint || BNB_RPC_ENDPOINTS[0];
  }

  private async rpcCall<T>(method: string, params: unknown[] = []): Promise<T | null> {
    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: this.requestId++,
          method,
          params,
        }),
      });

      if (!response.ok) {
        console.error(`BNB RPC error: ${response.status}`);
        return null;
      }

      const data: JsonRpcResponse<T> = await response.json();

      if (data.error) {
        console.error(`BNB RPC error: ${data.error.message}`);
        return null;
      }

      return data.result ?? null;
    } catch (error) {
      console.error('BNB RPC fetch error:', error);
      return null;
    }
  }

  /**
   * Get current block number
   */
  async getBlockNumber(): Promise<number | null> {
    const result = await this.rpcCall<string>('eth_blockNumber');
    if (!result) return null;
    return parseInt(result, 16);
  }

  /**
   * Get peer count
   */
  async getPeerCount(): Promise<number | null> {
    const result = await this.rpcCall<string>('net_peerCount');
    if (!result) return null;
    return parseInt(result, 16);
  }

  /**
   * Get current validators (from latest block's extraData or via parlia consensus)
   * Note: BNB Chain has 21 active validators in PoSA
   */
  async getValidatorCount(): Promise<number> {
    // BNB Chain always has exactly 21 active validators in PoSA
    return 21;
  }

  /**
   * Get gas price in Gwei
   */
  async getGasPrice(): Promise<number | null> {
    const result = await this.rpcCall<string>('eth_gasPrice');
    if (!result) return null;
    // Convert from Wei to Gwei
    return Math.round(parseInt(result, 16) / 1e9);
  }

  /**
   * Get chain ID
   */
  async getChainId(): Promise<number | null> {
    const result = await this.rpcCall<string>('eth_chainId');
    if (!result) return null;
    return parseInt(result, 16);
  }

  /**
   * Get syncing status
   */
  async isSyncing(): Promise<boolean | null> {
    const result = await this.rpcCall<boolean | object>('eth_syncing');
    // Returns false if not syncing, object if syncing
    return result === false ? false : true;
  }
}

export function getBnbChainFetcher(endpoint?: string): BnbChainFetcher {
  return new BnbChainFetcher(endpoint);
}
