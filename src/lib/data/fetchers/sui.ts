/**
 * SUI Data Fetcher
 *
 * Fetches network metrics from SUI JSON-RPC API.
 * Uses suix_getLatestSuiSystemState for validator/staking data.
 *
 * Docs: https://docs.sui.io/sui-api-ref
 */

const SUI_RPC = 'https://fullnode.mainnet.sui.io:443';

interface ValidatorInfo {
  suiAddress: string;
  name: string;
  votingPower: string;
  nextEpochStake: string;
  stakingPoolSuiBalance: string;
  commissionRate: string;
}

interface SystemStateResponse {
  jsonrpc: string;
  id: number;
  result: {
    epoch: string;
    protocolVersion: string;
    totalStake: string;
    activeValidators: ValidatorInfo[];
    maxValidatorCount: string;
    minValidatorJoiningStake: string;
    referenceGasPrice: string;
    stakeSubsidyBalance: string;
  };
}

export interface SuiMetrics {
  epoch: number | null;
  protocolVersion: number | null;
  totalValidators: number | null;
  maxValidators: number | null;
  totalStake: number | null;
  minValidatorStake: number | null;
  top5Concentration: number | null;
  nakamotoCoefficient: number | null;
  referenceGasPrice: number | null;
}

export class SuiFetcher {
  private rpcUrl: string;

  constructor(rpcUrl?: string) {
    this.rpcUrl = rpcUrl || SUI_RPC;
  }

  private async rpcCall<T>(method: string, params: unknown[] = []): Promise<T> {
    const response = await fetch(this.rpcUrl, {
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
      throw new Error(`SUI RPC error: ${response.status}`);
    }

    const data = await response.json();
    if (data.error) {
      throw new Error(`SUI RPC error: ${data.error.message}`);
    }

    return data as T;
  }

  /**
   * Get system state with validator info
   */
  async getSystemState(): Promise<{
    epoch: number;
    protocolVersion: number;
    totalValidators: number;
    maxValidators: number;
    totalStake: number;
    minValidatorStake: number;
    top5Concentration: number;
    nakamotoCoefficient: number;
    referenceGasPrice: number;
  }> {
    const result = await this.rpcCall<SystemStateResponse>(
      'suix_getLatestSuiSystemState'
    );

    const state = result.result;
    const validators = state.activeValidators;

    // Convert MIST to SUI (1 SUI = 1e9 MIST)
    const totalStake = Math.round(parseInt(state.totalStake, 10) / 1e9);
    const minValidatorStake = Math.round(
      parseInt(state.minValidatorJoiningStake, 10) / 1e9
    );

    // Get stakes for concentration calculation
    const stakes = validators
      .map((v) => parseInt(v.nextEpochStake, 10))
      .sort((a, b) => b - a);

    const totalStakeRaw = stakes.reduce((sum, s) => sum + s, 0);

    // Top 5 concentration
    const top5Stake = stakes.slice(0, 5).reduce((sum, s) => sum + s, 0);
    const top5Concentration =
      Math.round((top5Stake / totalStakeRaw) * 10000) / 100;

    // Nakamoto coefficient (33% for BFT)
    let cumulative = 0;
    let nakamotoCoefficient = 0;
    for (let i = 0; i < stakes.length; i++) {
      cumulative += stakes[i];
      if (cumulative >= totalStakeRaw * 0.33) {
        nakamotoCoefficient = i + 1;
        break;
      }
    }

    return {
      epoch: parseInt(state.epoch, 10),
      protocolVersion: parseInt(state.protocolVersion, 10),
      totalValidators: validators.length,
      maxValidators: parseInt(state.maxValidatorCount, 10),
      totalStake,
      minValidatorStake,
      top5Concentration,
      nakamotoCoefficient,
      referenceGasPrice: parseInt(state.referenceGasPrice, 10),
    };
  }

  /**
   * Get all metrics
   */
  async getAllMetrics(): Promise<SuiMetrics> {
    try {
      const state = await this.getSystemState();

      return {
        epoch: state.epoch,
        protocolVersion: state.protocolVersion,
        totalValidators: state.totalValidators,
        maxValidators: state.maxValidators,
        totalStake: state.totalStake,
        minValidatorStake: state.minValidatorStake,
        top5Concentration: state.top5Concentration,
        nakamotoCoefficient: state.nakamotoCoefficient,
        referenceGasPrice: state.referenceGasPrice,
      };
    } catch (error) {
      console.error('Error fetching SUI metrics:', error);
      return {
        epoch: null,
        protocolVersion: null,
        totalValidators: null,
        maxValidators: null,
        totalStake: null,
        minValidatorStake: null,
        top5Concentration: null,
        nakamotoCoefficient: null,
        referenceGasPrice: null,
      };
    }
  }
}

export function getSuiFetcher(rpcUrl?: string): SuiFetcher {
  return new SuiFetcher(rpcUrl);
}
