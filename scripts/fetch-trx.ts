/**
 * Fetch TRX Network Data
 *
 * Run: npx tsx scripts/fetch-trx.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { TronFetcher } from '../src/lib/data/fetchers/tron';

async function main() {
  console.log('Fetching Tron network data...\n');

  const fetcher = new TronFetcher();
  const metrics = await fetcher.getAllMetrics();

  const nullCount = Object.values(metrics).filter((v) => v === null).length;
  const totalFields = Object.keys(metrics).length;
  const successCount = totalFields - nullCount;

  console.log('Metrics:');
  console.log(`  Total Witnesses: ${metrics.totalWitnesses}`);
  console.log(`  Active Witnesses (SRs): ${metrics.activeWitnesses}`);
  console.log(`  Total Votes: ${metrics.totalVotes?.toLocaleString()}`);
  console.log(`  Latest Block: ${metrics.latestBlock}`);
  console.log(`  Connected Peers: ${metrics.connectedPeers}`);
  console.log(`\nSuccess: ${successCount}/${totalFields} metrics`);

  const data = {
    lastUpdated: new Date().toISOString(),
    source: 'api.trongrid.io',
    metrics,
    fetchStatus:
      nullCount === 0 ? 'success' : nullCount < totalFields ? 'partial' : 'failed',
  };

  const outPath = path.join(process.cwd(), 'data', 'trx.json');
  fs.writeFileSync(outPath, JSON.stringify(data, null, 2));
  console.log(`\nSaved to ${outPath}`);
}

main().catch(console.error);
