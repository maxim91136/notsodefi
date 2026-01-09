/**
 * Filecoin Network Data Fetcher
 *
 * Fetches miner and storage metrics from Filfox API.
 * No API key required.
 *
 * API: https://filfox.info/api/v1
 */

const FILFOX_API = 'https://filfox.info/api/v1';

export interface FilecoinMetrics {
  activeMiners: number | null;
  totalPowerPiB: number | null; // Quality-adjusted power in PiB
  nakamotoCoefficient: number | null;
  top5Concentration: number | null;
  top10Concentration: number | null;
}

interface OverviewResponse {
  activeMiners: number;
  totalQualityAdjPower: string;
}

interface TopMinersResponse {
  miners: Array<{
    address: string;
    qualityAdjPower: string;
  }>;
  totalQualityAdjPower: string;
}

export class FilecoinFetcher {
  private apiUrl: string;

  constructor(apiUrl?: string) {
    this.apiUrl = apiUrl || FILFOX_API;
  }

  async getOverview(): Promise<{ activeMiners: number; totalPowerPiB: number }> {
    const response = await fetch(`${this.apiUrl}/overview`);
    if (!response.ok) {
      throw new Error(`Filfox API error: ${response.status}`);
    }

    const data = (await response.json()) as OverviewResponse;

    // Convert power from bytes to PiB (2^50 bytes)
    const totalPowerPiB = Math.round(
      Number(BigInt(data.totalQualityAdjPower) / BigInt(2 ** 50))
    );

    return {
      activeMiners: data.activeMiners,
      totalPowerPiB,
    };
  }

  async getMinerDistribution(): Promise<{
    nakamotoCoefficient: number;
    top5Concentration: number;
    top10Concentration: number;
  }> {
    // Get top 100 miners for distribution analysis
    const response = await fetch(
      `${this.apiUrl}/miner/top-miners/power?count=100`
    );
    if (!response.ok) {
      throw new Error(`Filfox API error: ${response.status}`);
    }

    const data = (await response.json()) as TopMinersResponse;
    const totalPower = BigInt(data.totalQualityAdjPower);

    // Sort by power (should already be sorted, but ensure)
    const miners = data.miners.map((m) => ({
      address: m.address,
      power: BigInt(m.qualityAdjPower),
    }));
    miners.sort((a, b) => (b.power > a.power ? 1 : -1));

    // Nakamoto Coefficient: miners needed for 33% of power
    let cumPower = BigInt(0);
    let nakamoto = 0;
    const threshold = totalPower / BigInt(3);

    for (const miner of miners) {
      cumPower += miner.power;
      nakamoto++;
      if (cumPower >= threshold) break;
    }

    // Top 5 concentration
    const top5Power = miners
      .slice(0, 5)
      .reduce((sum, m) => sum + m.power, BigInt(0));
    const top5Concentration =
      Number((top5Power * BigInt(1000)) / totalPower) / 10;

    // Top 10 concentration
    const top10Power = miners
      .slice(0, 10)
      .reduce((sum, m) => sum + m.power, BigInt(0));
    const top10Concentration =
      Number((top10Power * BigInt(1000)) / totalPower) / 10;

    return {
      nakamotoCoefficient: nakamoto,
      top5Concentration: Math.round(top5Concentration * 10) / 10,
      top10Concentration: Math.round(top10Concentration * 10) / 10,
    };
  }

  async getAllMetrics(): Promise<FilecoinMetrics> {
    try {
      const [overview, distribution] = await Promise.all([
        this.getOverview(),
        this.getMinerDistribution(),
      ]);

      return {
        activeMiners: overview.activeMiners,
        totalPowerPiB: overview.totalPowerPiB,
        nakamotoCoefficient: distribution.nakamotoCoefficient,
        top5Concentration: distribution.top5Concentration,
        top10Concentration: distribution.top10Concentration,
      };
    } catch (error) {
      console.error('Failed to fetch Filecoin metrics:', error);
      return {
        activeMiners: null,
        totalPowerPiB: null,
        nakamotoCoefficient: null,
        top5Concentration: null,
        top10Concentration: null,
      };
    }
  }
}

export function getFilecoinFetcher(apiUrl?: string): FilecoinFetcher {
  return new FilecoinFetcher(apiUrl);
}
