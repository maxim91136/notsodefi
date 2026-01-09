#!/usr/bin/env npx tsx
/**
 * Fetch Bittensor Network Data
 *
 * Uses Taostats API to fetch Bittensor network metrics.
 * Requires TAOSTATS_API_KEY environment variable.
 * Saves results to data/tao.json
 *
 * Usage: TAOSTATS_API_KEY=xxx npx tsx scripts/fetch-tao.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { bittensor } from '../src/lib/data/projects/bittensor';

import { getBittensorFetcher } from '../src/lib/data/fetchers/bittensor';

interface TaoData {
  lastUpdated: string;
  source: string;
  totalScore: number;
  metrics: {
    blockNumber: number | null;
    accounts: number | null;
    subnets: number | null;
    totalStaked: number | null;
    issued: number | null;
    totalValidators: number | null;
    totalActiveKeys: number | null;
  };
  fetchStatus: 'success' | 'partial' | 'failed';
}

async function main() {
  const apiKey = process.env.TAOSTATS_API_KEY;

  if (!apiKey) {
    console.error('Error: TAOSTATS_API_KEY environment variable is required');
    process.exit(1);
  }

  console.log('Fetching Bittensor network data...\n');

  const fetcher = getBittensorFetcher(apiKey);

  const data: TaoData = {
    lastUpdated: new Date().toISOString(),
    source: 'taostats.io',
    totalScore: bittensor.scores.totalScore,
    metrics: {
      blockNumber: null,
      accounts: null,
      subnets: null,
      totalStaked: null,
      issued: null,
      totalValidators: null,
      totalActiveKeys: null,
    },
    fetchStatus: 'failed',
  };

  let successCount = 0;

  // Fetch all metrics
  console.log('Fetching network stats (Taostats API)...');
  try {
    const metrics = await fetcher.getAllMetrics();

    if (metrics.blockNumber !== null) {
      data.metrics.blockNumber = metrics.blockNumber;
      console.log(`   Block Number: ${metrics.blockNumber.toLocaleString()}`);
      successCount++;
    }
    if (metrics.accounts !== null) {
      data.metrics.accounts = metrics.accounts;
      console.log(`   Accounts: ${metrics.accounts.toLocaleString()}`);
      successCount++;
    }
    if (metrics.subnets !== null) {
      data.metrics.subnets = metrics.subnets;
      console.log(`   Subnets: ${metrics.subnets}`);
      successCount++;
    }
    if (metrics.totalStaked !== null) {
      data.metrics.totalStaked = metrics.totalStaked;
      console.log(`   Total Staked: ${metrics.totalStaked.toLocaleString()} TAO`);
      successCount++;
    }
    if (metrics.issued !== null) {
      data.metrics.issued = metrics.issued;
      console.log(`   Issued: ${metrics.issued.toLocaleString()} TAO`);
      successCount++;
    }
    if (metrics.totalValidators !== null) {
      data.metrics.totalValidators = metrics.totalValidators;
      console.log(`   Total Validators: ${metrics.totalValidators.toLocaleString()}`);
      successCount++;
    }
    if (metrics.totalActiveKeys !== null) {
      data.metrics.totalActiveKeys = metrics.totalActiveKeys;
      console.log(`   Total Active Keys: ${metrics.totalActiveKeys.toLocaleString()}`);
      successCount++;
    }
  } catch (e) {
    console.log('   Error:', e);
  }

  // Determine status
  data.fetchStatus = successCount === 0 ? 'failed' : successCount >= 5 ? 'success' : 'partial';

  // Save to file
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const outputPath = path.join(dataDir, 'tao.json');
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));

  console.log(`\nSaved to ${outputPath}`);
  console.log(`Status: ${data.fetchStatus} (${successCount} metrics)`);

  if (data.fetchStatus === 'failed') process.exit(1);
}

main().catch((e) => {
  console.error('Fatal error:', e);
  process.exit(1);
});
