/**
 * Fetch ALGO Network Data
 *
 * Run: npx tsx scripts/fetch-algo.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { AlgorandFetcher } from '../src/lib/data/fetchers/algorand';
import { algorand } from '../src/lib/data/projects/algorand';

async function main() {
  console.log('Fetching Algorand network data...\n');

  const fetcher = new AlgorandFetcher();
  const metrics = await fetcher.getAllMetrics();

  const nullCount = Object.values(metrics).filter((v) => v === null).length;
  const totalFields = Object.keys(metrics).length;
  const successCount = totalFields - nullCount;

  console.log('Metrics:');
  console.log(`  Current Round: ${metrics.currentRound?.toLocaleString()}`);
  console.log(`  Total Supply: ${metrics.totalSupply?.toLocaleString()} ALGO`);
  console.log(`  Online Stake: ${metrics.onlineStake?.toLocaleString()} ALGO`);
  console.log(`  Stake Participation: ${metrics.stakePercentage?.toFixed(2)}%`);
  console.log(`  Last Block Time: ${metrics.lastBlockTime ? (metrics.lastBlockTime / 1000).toFixed(2) + 's ago' : 'N/A'}`);
  console.log(`  API Version: ${metrics.apiVersion}`);
  console.log(`\nSuccess: ${successCount}/${totalFields} metrics`);

  const data = {
    lastUpdated: new Date().toISOString(),
    source: 'mainnet-api.algonode.cloud + algoexplorerapi.io',
    totalScore: algorand.scores.totalScore,
    metrics,
    fetchStatus:
      nullCount === 0 ? 'success' : nullCount < totalFields ? 'partial' : 'failed',
  };

  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  const outPath = path.join(dataDir, 'algo.json');
  fs.writeFileSync(outPath, JSON.stringify(data, null, 2));
  console.log(`\nSaved to ${outPath}`);
}

main().catch(console.error);
