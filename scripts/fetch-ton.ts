/**
 * TON Data Fetcher Script
 *
 * Fetches network data for TON and saves to data/ton.json
 *
 * Usage: npx tsx scripts/fetch-ton.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { getTonFetcher, TonMetrics } from '../src/lib/data/fetchers/ton';
import { ton } from '../src/lib/data/projects/ton';

interface TonData {
  lastUpdated: string;
  source: string;
  totalScore: number;
  fetchStatus: 'success' | 'partial' | 'failed';
  metrics: TonMetrics;
}

async function main() {
  console.log('Fetching TON (Toncoin) network data...\n');

  const fetcher = getTonFetcher();

  console.log('Fetching validator and blockchain metrics from TonAPI...');
  const metrics = await fetcher.getAllMetrics();

  // Display results
  console.log(`   Block Number: ${metrics.blockNumber?.toLocaleString() || 'N/A'}`);
  console.log(`   Total Validators: ${metrics.totalValidators || 'N/A'}`);
  console.log(`   Total Stake: ${metrics.totalStake ? (metrics.totalStake / 1e6).toFixed(2) + 'M TON' : 'N/A'}`);
  console.log(`   Min Stake: ${metrics.minStake ? metrics.minStake.toLocaleString() + ' TON' : 'N/A'}`);
  console.log(`   Top 5 Concentration: ${metrics.top5Concentration?.toFixed(2) || 'N/A'}%`);
  console.log(`   Fees Collected: ${metrics.feesCollected?.toLocaleString() || 'N/A'} TON`);

  // Count successful metrics
  const coreMetrics = [
    metrics.blockNumber,
    metrics.totalValidators,
    metrics.totalStake,
  ];
  const successCount = coreMetrics.filter((v) => v !== null).length;

  // Determine fetch status
  let fetchStatus: 'success' | 'partial' | 'failed';
  if (successCount === coreMetrics.length) {
    fetchStatus = 'success';
  } else if (successCount > 0) {
    fetchStatus = 'partial';
  } else {
    fetchStatus = 'failed';
  }

  const data: TonData = {
    lastUpdated: new Date().toISOString(),
    source: 'TonAPI (tonapi.io)',
    totalScore: ton.scores.totalScore,
    fetchStatus,
    metrics,
  };

  // Save to file
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  const outputPath = path.join(dataDir, 'ton.json');
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
  console.log(`\nSaved to ${outputPath}`);
  console.log(`Status: ${fetchStatus}`);
}

main().catch(console.error);
