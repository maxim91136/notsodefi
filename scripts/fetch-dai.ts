/**
 * Fetch DAI (MakerDAO) supply data from DefiLlama
 *
 * Note: DAI is different from USDT/USDC - overcollateralized, no individual freeze.
 * This fetcher tracks supply data for transparency.
 *
 * Usage: npx tsx scripts/fetch-dai.ts
 */

import { getDaiFetcher } from '../src/lib/data/fetchers';
import * as fs from 'fs';
import * as path from 'path';
import { dai } from '../src/lib/data/projects/dai';

interface DaiData {
  lastUpdated: string;
  source: string;
  totalScore: number;
  fetchStatus: 'success' | 'failed';
  data: {
    totalSupplyUsd: number;
    topChains: Array<{
      chain: string;
      supplyUsd: number;
      percentage: number;
    }>;
  };
  notes: string[];
}

async function main() {
  console.log('Fetching DAI (MakerDAO) data from DefiLlama...\n');

  const fetcher = getDaiFetcher();
  const result = await fetcher.fetch();

  if (!result.success) {
    console.error('Failed to fetch data:', result.error);
    process.exit(1);
  }

  const supplyData = result.data!;

  console.log('=== DAI (MAKERDAO) SUPPLY DATA ===\n');
  console.log(`Total Supply: $${(supplyData.totalSupply / 1e9).toFixed(2)}B`);
  console.log(`\nTop Chains:`);
  for (const { chain, supply } of supplyData.topChains) {
    const pct = ((supply / supplyData.totalSupply) * 100).toFixed(1);
    console.log(`  ${chain}: $${(supply / 1e9).toFixed(2)}B (${pct}%)`);
  }

  // Save to JSON
  const data: DaiData = {
    lastUpdated: new Date().toISOString(),
    source: 'DefiLlama Stablecoins API',
    totalScore: dai.scores.totalScore,
    fetchStatus: 'success',
    data: {
      totalSupplyUsd: Math.round(supplyData.totalSupply),
      topChains: supplyData.topChains.map(({ chain, supply }) => ({
        chain,
        supplyUsd: Math.round(supply),
        percentage: Number(((supply / supplyData.totalSupply) * 100).toFixed(2)),
      })),
    },
    notes: [
      'DAI is overcollateralized (150%), not fiat-backed like USDT/USDC',
      'No individual address freeze capability - different from centralized stablecoins',
      'Emergency Shutdown exists but requires 50K MKR or governance vote',
      '~35% USDC collateral creates indirect Circle dependency',
    ],
  };

  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  const outputPath = path.join(dataDir, 'dai.json');
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
  console.log(`\nSaved to ${outputPath}`);
}

main().catch(console.error);
