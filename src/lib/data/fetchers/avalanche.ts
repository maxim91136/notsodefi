/**
 * Avalanche (AVAX) Data Fetcher
 *
 * Fetches network metrics from Avalanche public API.
 * P-Chain API for validator data.
 *
 * Docs: https://docs.avax.network/apis/avalanchego/apis/p-chain
 */

const AVAX_API_BASE = 'https://api.avax.network';

interface PlatformValidatorsResponse {
  jsonrpc: string;
  id: number;
  result: {
    validators: Array<{
      nodeID: string;
      weight: string;
      startTime: string;
      endTime: string;
      connected: boolean;
      uptime: string;
      delegationFee?: string;
    }>;
  };
}

interface PlatformHeightResponse {
  jsonrpc: string;
  id: number;
  result: {
    height: string;
  };
}

interface InfoNetworkNameResponse {
  jsonrpc: string;
  id: number;
  result: {
    networkName: string;
  };
}

export interface AvalancheMetrics {
  totalValidators: number | null;
  activeValidators: number | null;
  totalStaked: number | null;
  pChainHeight: number | null;
  networkName: string | null;
}

export class AvalancheFetcher {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || AVAX_API_BASE;
  }

  /**
   * Make JSON-RPC request to Avalanche API
   */
  private async rpcCall<T>(
    endpoint: string,
    method: string,
    params: Record<string, unknown> = {}
  ): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method,
        params,
      }),
    });

    if (!response.ok) {
      throw new Error(`Avalanche API error: ${response.status}`);
    }

    return response.json() as Promise<T>;
  }

  /**
   * Get current validators from P-Chain
   */
  async getCurrentValidators(): Promise<{
    totalValidators: number;
    activeValidators: number;
    totalStaked: number;
  }> {
    const result = await this.rpcCall<PlatformValidatorsResponse>(
      '/ext/bc/P',
      'platform.getCurrentValidators',
      { subnetID: null } // Primary network
    );

    const validators = result.result.validators;
    const activeValidators = validators.filter((v) => v.connected).length;
    const totalStaked = validators.reduce((sum, v) => {
      return sum + BigInt(v.weight);
    }, BigInt(0));

    return {
      totalValidators: validators.length,
      activeValidators,
      totalStaked: Number(totalStaked / BigInt(1e9)), // Convert nAVAX to AVAX
    };
  }

  /**
   * Get P-Chain height
   */
  async getPChainHeight(): Promise<number> {
    const result = await this.rpcCall<PlatformHeightResponse>(
      '/ext/bc/P',
      'platform.getHeight',
      {}
    );

    return parseInt(result.result.height, 10);
  }

  /**
   * Get network name
   */
  async getNetworkName(): Promise<string> {
    const result = await this.rpcCall<InfoNetworkNameResponse>(
      '/ext/info',
      'info.getNetworkName',
      {}
    );

    return result.result.networkName;
  }

  /**
   * Get all metrics
   */
  async getAllMetrics(): Promise<AvalancheMetrics> {
    try {
      const [validatorData, height, networkName] = await Promise.all([
        this.getCurrentValidators(),
        this.getPChainHeight(),
        this.getNetworkName(),
      ]);

      return {
        totalValidators: validatorData.totalValidators,
        activeValidators: validatorData.activeValidators,
        totalStaked: validatorData.totalStaked,
        pChainHeight: height,
        networkName,
      };
    } catch (error) {
      console.error('Error fetching Avalanche metrics:', error);
      return {
        totalValidators: null,
        activeValidators: null,
        totalStaked: null,
        pChainHeight: null,
        networkName: null,
      };
    }
  }
}
