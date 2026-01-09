/**
 * Fetch USD1 supply data from DefiLlama
 *
 * Note: Decentralization score is static (always 1.0 due to kill switch).
 * This fetcher tracks supply data for transparency.
 *
 * Usage: npx tsx scripts/fetch-usd1.ts
 */

import { getUsd1Fetcher } from '../src/lib/data/fetchers/stablecoin';
import * as fs from 'fs';
import * as path from 'path';
import { usd1 } from '../src/lib/data/projects/usd1';

interface Usd1Data {
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
  console.log('Fetching USD1 data from DefiLlama...\n');

  const fetcher = getUsd1Fetcher();
  const result = await fetcher.fetch();

  if (!result.success) {
    console.error('Failed to fetch data:', result.error);
    process.exit(1);
  }

  const supplyData = result.data!;

  console.log('=== USD1 SUPPLY DATA ===\n');
  console.log(`Total Supply: $${(supplyData.totalSupply / 1e9).toFixed(2)}B`);
  console.log(`\nTop Chains:`);
  for (const { chain, supply } of supplyData.topChains) {
    const pct = ((supply / supplyData.totalSupply) * 100).toFixed(1);
    console.log(`  ${chain}: $${(supply / 1e9).toFixed(2)}B (${pct}%)`);
  }

  // Save to JSON (like other fetch scripts)
  const data: Usd1Data = {
    lastUpdated: new Date().toISOString(),
    source: 'DefiLlama Stablecoins API',
    totalScore: usd1.scores.totalScore,
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
      'Decentralization score is static (1.0) - BitGo can freeze any address',
      'Supply data tracked for transparency',
      'Trump family receives 75% of World Liberty Financial token sale proceeds',
      'Banking license application filed Jan 2026 to internalize custody',
    ],
  };

  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  const outputPath = path.join(dataDir, 'usd1.json');
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
  console.log(`\nSaved to ${outputPath}`);
}

main().catch(console.error);
