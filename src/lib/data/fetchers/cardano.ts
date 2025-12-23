/**
 * Cardano (ADA) Fetcher
 *
 * Fetches network data from Blockfrost API.
 * Cardano uses Ouroboros PoS consensus.
 */

const BLOCKFROST_API_BASE = 'https://cardano-mainnet.blockfrost.io/api/v0';

interface BlockfrostNetwork {
  supply: {
    max: string;
    total: string;
    circulating: string;
    locked: string;
    treasury: string;
    reserves: string;
  };
  stake: {
    live: string;
    active: string;
  };
}

interface BlockfrostEpoch {
  epoch: number;
  start_time: number;
  end_time: number;
  first_block_time: number;
  last_block_time: number;
  block_count: number;
  tx_count: number;
  output: string;
  fees: string;
  active_stake: string;
}

interface BlockfrostPoolsExtended {
  pool_id: string;
  live_stake: string;
  live_size: number;
  live_saturation: number;
  active_stake: string;
  blocks_minted: number;
}

export class CardanoFetcher {
  private projectId: string;
  private baseUrl: string;

  constructor(projectId: string, baseUrl?: string) {
    this.projectId = projectId;
    this.baseUrl = baseUrl || BLOCKFROST_API_BASE;
  }

  private async fetchEndpoint<T>(endpoint: string): Promise<T | null> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: {
          project_id: this.projectId,
        },
      });

      if (!response.ok) {
        console.error(`Blockfrost API error: ${response.status}`);
        return null;
      }

      return (await response.json()) as T;
    } catch (error) {
      console.error('Blockfrost API fetch error:', error);
      return null;
    }
  }

  /**
   * Get network info (supply, stake)
   */
  async getNetworkInfo(): Promise<{
    totalSupply: number | null;
    circulatingSupply: number | null;
    liveStake: number | null;
    activeStake: number | null;
    treasury: number | null;
  } | null> {
    const data = await this.fetchEndpoint<BlockfrostNetwork>('/network');

    if (!data) {
      return null;
    }

    // Convert lovelace to ADA (1 ADA = 1,000,000 lovelace)
    const toAda = (lovelace: string) => parseFloat(lovelace) / 1_000_000;

    return {
      totalSupply: data.supply?.total ? toAda(data.supply.total) : null,
      circulatingSupply: data.supply?.circulating ? toAda(data.supply.circulating) : null,
      liveStake: data.stake?.live ? toAda(data.stake.live) : null,
      activeStake: data.stake?.active ? toAda(data.stake.active) : null,
      treasury: data.supply?.treasury ? toAda(data.supply.treasury) : null,
    };
  }

  /**
   * Get latest epoch info
   */
  async getLatestEpoch(): Promise<{
    epoch: number | null;
    blockCount: number | null;
    txCount: number | null;
  } | null> {
    const data = await this.fetchEndpoint<BlockfrostEpoch>('/epochs/latest');

    if (!data) {
      return null;
    }

    return {
      epoch: data.epoch,
      blockCount: data.block_count,
      txCount: data.tx_count,
    };
  }

  /**
   * Get pool count and top pools concentration
   */
  async getPoolStats(): Promise<{
    totalPools: number | null;
    top5Concentration: number | null;
  } | null> {
    // Get total pool count
    const pools = await this.fetchEndpoint<string[]>('/pools?count=1&page=1');

    // Get extended pool data for top 5
    const topPools = await this.fetchEndpoint<BlockfrostPoolsExtended[]>('/pools/extended?count=5&order=desc');

    if (!pools || !topPools) {
      return null;
    }

    // Calculate top 5 concentration
    let top5Stake = 0;
    let totalLiveStake = 0;

    // Get total live stake from network info
    const network = await this.getNetworkInfo();
    if (network?.liveStake) {
      totalLiveStake = network.liveStake;
    }

    for (const pool of topPools) {
      top5Stake += parseFloat(pool.live_stake) / 1_000_000;
    }

    const top5Concentration = totalLiveStake > 0
      ? Math.round((top5Stake / totalLiveStake) * 100 * 100) / 100
      : null;

    return {
      totalPools: pools.length > 0 ? await this.getTotalPoolCount() : null,
      top5Concentration,
    };
  }

  private async getTotalPoolCount(): Promise<number | null> {
    // Fetch multiple pages to estimate total (Blockfrost returns max 100 per page)
    let page = 1;
    let totalCount = 0;

    while (page <= 50) { // Max 5000 pools
      const pools = await this.fetchEndpoint<string[]>(`/pools?count=100&page=${page}`);
      if (!pools || pools.length === 0) break;
      totalCount += pools.length;
      if (pools.length < 100) break;
      page++;
    }

    return totalCount > 0 ? totalCount : null;
  }

  /**
   * Get all Cardano metrics
   */
  async getAllMetrics(): Promise<{
    epoch: number | null;
    blockCount: number | null;
    txCount: number | null;
    totalSupply: number | null;
    circulatingSupply: number | null;
    liveStake: number | null;
    activeStake: number | null;
    totalPools: number | null;
  }> {
    const [network, epoch, pools] = await Promise.all([
      this.getNetworkInfo(),
      this.getLatestEpoch(),
      this.getPoolStats(),
    ]);

    return {
      epoch: epoch?.epoch ?? null,
      blockCount: epoch?.blockCount ?? null,
      txCount: epoch?.txCount ?? null,
      totalSupply: network?.totalSupply ?? null,
      circulatingSupply: network?.circulatingSupply ?? null,
      liveStake: network?.liveStake ?? null,
      activeStake: network?.activeStake ?? null,
      totalPools: pools?.totalPools ?? null,
    };
  }
}

export function getCardanoFetcher(projectId: string, baseUrl?: string): CardanoFetcher {
  return new CardanoFetcher(projectId, baseUrl);
}
