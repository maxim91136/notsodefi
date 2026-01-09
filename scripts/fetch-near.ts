#!/usr/bin/env npx tsx
/**
 * Fetch NEAR Protocol Network Data
 *
 * Uses NEAR RPC API to fetch network metrics.
 * No API key required.
 * Saves results to data/near.json
 *
 * Usage: npx tsx scripts/fetch-near.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { near } from '../src/lib/data/projects/near';

import { getNearFetcher } from '../src/lib/data/fetchers/near';

interface NearData {
  lastUpdated: string;
  source: string;
  totalScore: number;
  metrics: {
    blockHeight: number | null;
    chainId: string | null;
    activeValidators: number | null;
    totalStaked: number | null;
    nakamotoCoefficient: number | null;
    top5Concentration: number | null;
    top10Concentration: number | null;
  };
  fetchStatus: 'success' | 'partial' | 'failed';
}

async function main() {
  console.log('Fetching NEAR Protocol network data...\n');

  const fetcher = getNearFetcher();

  const data: NearData = {
    lastUpdated: new Date().toISOString(),
    source: 'rpc.mainnet.near.org',
    totalScore: near.scores.totalScore,
    metrics: {
      blockHeight: null,
      chainId: null,
      activeValidators: null,
      totalStaked: null,
      nakamotoCoefficient: null,
      top5Concentration: null,
      top10Concentration: null,
    },
    fetchStatus: 'failed',
  };

  let successCount = 0;

  console.log('Fetching network stats (NEAR RPC)...');
  try {
    const metrics = await fetcher.getAllMetrics();

    if (metrics.blockHeight !== null) {
      data.metrics.blockHeight = metrics.blockHeight;
      console.log(`   Block Height: ${metrics.blockHeight.toLocaleString()}`);
      successCount++;
    }
    if (metrics.chainId !== null) {
      data.metrics.chainId = metrics.chainId;
      console.log(`   Chain ID: ${metrics.chainId}`);
      successCount++;
    }
    if (metrics.activeValidators !== null) {
      data.metrics.activeValidators = metrics.activeValidators;
      console.log(`   Active Validators: ${metrics.activeValidators}`);
      successCount++;
    }
    if (metrics.totalStaked !== null) {
      data.metrics.totalStaked = metrics.totalStaked;
      console.log(`   Total Staked: ${metrics.totalStaked.toLocaleString()} NEAR`);
      successCount++;
    }
    if (metrics.nakamotoCoefficient !== null) {
      data.metrics.nakamotoCoefficient = metrics.nakamotoCoefficient;
      console.log(`   Nakamoto Coefficient: ${metrics.nakamotoCoefficient}`);
      successCount++;
    }
    if (metrics.top5Concentration !== null) {
      data.metrics.top5Concentration = metrics.top5Concentration;
      console.log(`   Top 5 Concentration: ${metrics.top5Concentration}%`);
      successCount++;
    }
    if (metrics.top10Concentration !== null) {
      data.metrics.top10Concentration = metrics.top10Concentration;
      console.log(`   Top 10 Concentration: ${metrics.top10Concentration}%`);
      successCount++;
    }
  } catch (e) {
    console.log('   Error:', e);
  }

  // Determine status
  data.fetchStatus =
    successCount === 0 ? 'failed' : successCount >= 5 ? 'success' : 'partial';

  // Save to file
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const outputPath = path.join(dataDir, 'near.json');
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));

  console.log(`\nSaved to ${outputPath}`);
  console.log(`Status: ${data.fetchStatus} (${successCount} metrics)`);

  if (data.fetchStatus === 'failed') process.exit(1);
}

main().catch((e) => {
  console.error('Fatal error:', e);
  process.exit(1);
});
