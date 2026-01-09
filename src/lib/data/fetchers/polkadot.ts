/**
 * Polkadot (DOT) Data Fetcher
 *
 * Fetches network metrics from Subscan API.
 * Polkadot uses NPoS (Nominated Proof of Stake) consensus.
 *
 * Docs: https://polkadot.subscan.io/
 */

const SUBSCAN_API_BASE = 'https://polkadot.api.subscan.io';

interface SubscanMetadataResponse {
  code: number;
  message: string;
  generated_at: number;
  data: {
    blockNum: string;
    blockTime: string;
    current_validator_count: string;
    waiting_validator: string;
    currentPools: string;
    count_account_all: string;
    count_account: string;
    current_era: string;
    eraLength: string;
    epochLength: string;
    specVersion: string;
  };
}

interface SubscanStakingResponse {
  code: number;
  message: string;
  data: {
    totalStake: string;
    activeNominatorCount: number;
    minStake: string;
    maxNominator: number;
    minActiveNomination: string;
  };
}

export interface PolkadotMetrics {
  blockNumber: number | null;
  era: number | null;
  activeValidators: number | null;
  waitingValidators: number | null;
  nominationPools: number | null;
  totalAccounts: number | null;
  activeNominators: number | null;
  totalStaked: number | null;
}

export class PolkadotFetcher {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || SUBSCAN_API_BASE;
  }

  /**
   * Fetch from Subscan API
   */
  private async fetchEndpoint<T>(
    endpoint: string,
    body: Record<string, unknown> = {}
  ): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Subscan API error: ${response.status}`);
    }

    return response.json() as Promise<T>;
  }

  /**
   * Get network metadata
   */
  async getMetadata(): Promise<{
    blockNumber: number;
    era: number;
    activeValidators: number;
    waitingValidators: number;
    nominationPools: number;
    totalAccounts: number;
  }> {
    const result = await this.fetchEndpoint<SubscanMetadataResponse>('/api/scan/metadata');

    if (result.code !== 0) {
      throw new Error(`Subscan API error: ${result.message}`);
    }

    return {
      blockNumber: parseInt(result.data.blockNum, 10),
      era: parseInt(result.data.current_era, 10) || 0,
      activeValidators: parseInt(result.data.current_validator_count, 10),
      waitingValidators: parseInt(result.data.waiting_validator, 10),
      nominationPools: parseInt(result.data.currentPools, 10),
      totalAccounts: parseInt(result.data.count_account_all, 10),
    };
  }

  /**
   * Get staking overview
   */
  async getStakingOverview(): Promise<{
    totalStaked: number;
    activeNominators: number;
  }> {
    const result = await this.fetchEndpoint<SubscanStakingResponse>('/api/scan/staking/overview');

    if (result.code !== 0) {
      throw new Error(`Subscan API error: ${result.message}`);
    }

    // Convert Planck to DOT (1 DOT = 10^10 Planck)
    const totalStaked = parseFloat(result.data.totalStake) / 1e10;

    return {
      totalStaked: Math.round(totalStaked),
      activeNominators: result.data.activeNominatorCount,
    };
  }

  /**
   * Get all metrics
   */
  async getAllMetrics(): Promise<PolkadotMetrics> {
    try {
      const [metadata, staking] = await Promise.all([
        this.getMetadata(),
        this.getStakingOverview().catch(() => null),
      ]);

      return {
        blockNumber: metadata.blockNumber,
        era: metadata.era,
        activeValidators: metadata.activeValidators,
        waitingValidators: metadata.waitingValidators,
        nominationPools: metadata.nominationPools,
        totalAccounts: metadata.totalAccounts,
        activeNominators: staking?.activeNominators ?? null,
        totalStaked: staking?.totalStaked ?? null,
      };
    } catch (error) {
      console.error('Error fetching Polkadot metrics:', error);
      return {
        blockNumber: null,
        era: null,
        activeValidators: null,
        waitingValidators: null,
        nominationPools: null,
        totalAccounts: null,
        activeNominators: null,
        totalStaked: null,
      };
    }
  }
}

export function getPolkadotFetcher(baseUrl?: string): PolkadotFetcher {
  return new PolkadotFetcher(baseUrl);
}
