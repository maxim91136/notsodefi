/**
 * Fetch Tether (USDT) supply data from DefiLlama
 *
 * Note: Decentralization score is static (always 2.0 due to kill switch).
 * This fetcher tracks supply data for transparency.
 *
 * Usage: npx tsx scripts/fetch-tether.ts
 */

import { getTetherFetcher } from '../src/lib/data/fetchers';
import * as fs from 'fs';
import * as path from 'path';
import { tether } from '../src/lib/data/projects/tether';

interface TetherData {
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
  console.log('Fetching Tether (USDT) data from DefiLlama...\n');

  const fetcher = getTetherFetcher();
  const result = await fetcher.fetch();

  if (!result.success) {
    console.error('Failed to fetch data:', result.error);
    process.exit(1);
  }

  const supplyData = result.data!;

  console.log('=== TETHER (USDT) SUPPLY DATA ===\n');
  console.log(`Total Supply: $${(supplyData.totalSupply / 1e9).toFixed(2)}B`);
  console.log(`\nTop Chains:`);
  for (const { chain, supply } of supplyData.topChains) {
    const pct = ((supply / supplyData.totalSupply) * 100).toFixed(1);
    console.log(`  ${chain}: $${(supply / 1e9).toFixed(2)}B (${pct}%)`);
  }

  // Save to JSON (like other fetch scripts)
  const data: TetherData = {
    lastUpdated: new Date().toISOString(),
    source: 'DefiLlama Stablecoins API',
    totalScore: tether.scores.totalScore,
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
      'Decentralization score is static (2.0) - stablecoins are centralized by design',
      'Supply data tracked for transparency',
      'Tether Ltd can freeze any address at will',
    ],
  };

  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  const outputPath = path.join(dataDir, 'tether.json');
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
  console.log(`\nSaved to ${outputPath}`);
}

main().catch(console.error);
