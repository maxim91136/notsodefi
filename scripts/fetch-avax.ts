/**
 * Fetch AVAX Network Data
 *
 * Run: npx tsx scripts/fetch-avax.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { AvalancheFetcher } from '../src/lib/data/fetchers/avalanche';
import { avalanche } from '../src/lib/data/projects/avalanche';

async function main() {
  console.log('Fetching Avalanche network data...\n');

  const fetcher = new AvalancheFetcher();
  const metrics = await fetcher.getAllMetrics();

  const nullCount = Object.values(metrics).filter((v) => v === null).length;
  const totalFields = Object.keys(metrics).length;
  const successCount = totalFields - nullCount;

  console.log('Metrics:');
  console.log(`  Total Validators: ${metrics.totalValidators}`);
  console.log(`  Active Validators: ${metrics.activeValidators}`);
  console.log(`  Total Staked: ${metrics.totalStaked?.toLocaleString()} AVAX`);
  console.log(`  P-Chain Height: ${metrics.pChainHeight}`);
  console.log(`  Network Name: ${metrics.networkName}`);
  console.log(`\nSuccess: ${successCount}/${totalFields} metrics`);

  const data = {
    lastUpdated: new Date().toISOString(),
    source: 'api.avax.network',
    totalScore: avalanche.scores.totalScore,
    metrics,
    fetchStatus:
      nullCount === 0 ? 'success' : nullCount < totalFields ? 'partial' : 'failed',
  };

  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  const outPath = path.join(dataDir, 'avax.json');
  fs.writeFileSync(outPath, JSON.stringify(data, null, 2));
  console.log(`\nSaved to ${outPath}`);
}

main().catch(console.error);
