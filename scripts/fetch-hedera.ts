/**
 * Hedera Data Fetcher Script
 *
 * Fetches network data for Hedera and saves to data/hedera.json
 *
 * Usage: npx tsx scripts/fetch-hedera.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { getHederaFetcher, HederaMetrics } from '../src/lib/data/fetchers/hedera';
import { hedera } from '../src/lib/data/projects/hedera';

interface HederaData {
  lastUpdated: string;
  source: string;
  totalScore: number;
  fetchStatus: 'success' | 'partial' | 'failed';
  metrics: HederaMetrics;
}

async function main() {
  console.log('Fetching Hedera (HBAR) network data...\n');

  const fetcher = getHederaFetcher();

  console.log('Fetching from Hedera Mirror Node API...');
  const metrics = await fetcher.getAllMetrics();

  // Display results
  console.log(`   Total Nodes: ${metrics.totalNodes || 'N/A'}`);
  console.log(`   Total Stake: ${metrics.totalStake ? (metrics.totalStake / 1e9).toFixed(2) + 'B HBAR' : 'N/A'}`);
  console.log(`   Top 5 Concentration: ${metrics.top5Concentration?.toFixed(2) || 'N/A'}%`);
  console.log(`   Released Supply: ${metrics.releasedSupply ? (metrics.releasedSupply / 1e9).toFixed(2) + 'B HBAR' : 'N/A'}`);
  console.log(`   Total Supply: ${metrics.totalSupply ? (metrics.totalSupply / 1e9).toFixed(2) + 'B HBAR' : 'N/A'}`);

  // Count successful metrics
  const coreMetrics = [metrics.totalNodes, metrics.totalStake, metrics.releasedSupply];
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

  const data: HederaData = {
    lastUpdated: new Date().toISOString(),
    source: 'mainnet-public.mirrornode.hedera.com',
    totalScore: hedera.scores.totalScore,
    fetchStatus,
    metrics,
  };

  // Save to file
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  const outputPath = path.join(dataDir, 'hedera.json');
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
  console.log(`\nSaved to ${outputPath}`);
  console.log(`Status: ${fetchStatus}`);
}

main().catch(console.error);
