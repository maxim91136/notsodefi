/**
 * Stablecoin Fetcher - DefiLlama Stablecoins API
 *
 * Fetches supply data for stablecoins.
 * Note: Decentralization scores are static (stablecoins are centralized by design),
 * but we track supply for transparency.
 */

export interface StablecoinData {
  totalSupply: number;
  chainBreakdown: Record<string, number>;
  topChains: { chain: string; supply: number }[];
}

export interface StablecoinFetchResult {
  success: boolean;
  data?: StablecoinData;
  error?: string;
}

export class StablecoinFetcher {
  private stablecoinId: string;
  private stablecoinName: string;

  constructor(stablecoinId: string, stablecoinName: string) {
    this.stablecoinId = stablecoinId;
    this.stablecoinName = stablecoinName;
  }

  async fetch(): Promise<StablecoinFetchResult> {
    try {
      // DefiLlama stablecoin endpoint
      const response = await fetch(
        `https://stablecoins.llama.fi/stablecoin/${this.stablecoinId}`
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      // Get current supply per chain
      const chainBreakdown: Record<string, number> = {};
      let totalSupply = 0;

      if (data.chainBalances) {
        for (const [chain, chainData] of Object.entries(data.chainBalances)) {
          const tokens = (chainData as { tokens?: Array<{ circulating?: { peggedUSD?: number } }> }).tokens;
          if (tokens && tokens.length > 0) {
            // Get latest entry
            const latest = tokens[tokens.length - 1];
            const supply = latest?.circulating?.peggedUSD || 0;
            if (supply > 0) {
              chainBreakdown[chain] = supply;
              totalSupply += supply;
            }
          }
        }
      }

      // Sort chains by supply
      const topChains = Object.entries(chainBreakdown)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10)
        .map(([chain, supply]) => ({ chain, supply }));

      return {
        success: true,
        data: {
          totalSupply,
          chainBreakdown,
          topChains,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}

// Stablecoin IDs from DefiLlama
export const STABLECOIN_IDS = {
  USDT: '1',
  USDC: '2',
  DAI: '3',
  USDS: '4',  // Sky Dollar (formerly DAI)
  USDe: '33', // Ethena
  USD1: 'world-liberty-financial-usd', // World Liberty Financial stablecoin
} as const;

export function getTetherFetcher(): StablecoinFetcher {
  return new StablecoinFetcher(STABLECOIN_IDS.USDT, 'Tether');
}

export function getUsdcFetcher(): StablecoinFetcher {
  return new StablecoinFetcher(STABLECOIN_IDS.USDC, 'USD Coin');
}

export function getDaiFetcher(): StablecoinFetcher {
  return new StablecoinFetcher(STABLECOIN_IDS.DAI, 'DAI');
}

export function getUsd1Fetcher(): StablecoinFetcher {
  return new StablecoinFetcher(STABLECOIN_IDS.USD1, 'USD1');
}
