#!/usr/bin/env npx tsx
/**
 * Fetch Cardano Network Data
 *
 * Uses Blockfrost API to fetch Cardano network metrics.
 * Requires BLOCKFROST_PROJECT_ID environment variable.
 * Saves results to data/ada.json
 *
 * Usage: BLOCKFROST_PROJECT_ID=xxx npx tsx scripts/fetch-ada.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { cardano } from '../src/lib/data/projects/cardano';

import { getCardanoFetcher } from '../src/lib/data/fetchers/cardano';

interface AdaData {
  lastUpdated: string;
  source: string;
  totalScore: number;
  metrics: {
    epoch: number | null;
    blockCount: number | null;
    txCount: number | null;
    totalSupply: number | null;
    circulatingSupply: number | null;
    liveStake: number | null;
    activeStake: number | null;
    totalPools: number | null;
  };
  fetchStatus: 'success' | 'partial' | 'failed';
}

async function main() {
  const projectId = process.env.BLOCKFROST_PROJECT_ID;

  if (!projectId) {
    console.error('Error: BLOCKFROST_PROJECT_ID environment variable is required');
    process.exit(1);
  }

  console.log('Fetching Cardano network data...\n');

  const fetcher = getCardanoFetcher(projectId);

  const data: AdaData = {
    lastUpdated: new Date().toISOString(),
    source: 'blockfrost.io',
    totalScore: cardano.scores.totalScore,
    metrics: {
      epoch: null,
      blockCount: null,
      txCount: null,
      totalSupply: null,
      circulatingSupply: null,
      liveStake: null,
      activeStake: null,
      totalPools: null,
    },
    fetchStatus: 'failed',
  };

  let successCount = 0;

  // Fetch all metrics
  console.log('Fetching network stats (Blockfrost API)...');
  try {
    const metrics = await fetcher.getAllMetrics();

    if (metrics.epoch !== null) {
      data.metrics.epoch = metrics.epoch;
      console.log(`   Epoch: ${metrics.epoch}`);
      successCount++;
    }
    if (metrics.blockCount !== null) {
      data.metrics.blockCount = metrics.blockCount;
      console.log(`   Blocks (epoch): ${metrics.blockCount.toLocaleString()}`);
      successCount++;
    }
    if (metrics.txCount !== null) {
      data.metrics.txCount = metrics.txCount;
      console.log(`   Transactions (epoch): ${metrics.txCount.toLocaleString()}`);
      successCount++;
    }
    if (metrics.totalSupply !== null) {
      data.metrics.totalSupply = metrics.totalSupply;
      console.log(`   Total Supply: ${Math.round(metrics.totalSupply).toLocaleString()} ADA`);
      successCount++;
    }
    if (metrics.circulatingSupply !== null) {
      data.metrics.circulatingSupply = metrics.circulatingSupply;
      console.log(`   Circulating: ${Math.round(metrics.circulatingSupply).toLocaleString()} ADA`);
      successCount++;
    }
    if (metrics.liveStake !== null) {
      data.metrics.liveStake = metrics.liveStake;
      console.log(`   Live Stake: ${Math.round(metrics.liveStake).toLocaleString()} ADA`);
      successCount++;
    }
    if (metrics.activeStake !== null) {
      data.metrics.activeStake = metrics.activeStake;
      console.log(`   Active Stake: ${Math.round(metrics.activeStake).toLocaleString()} ADA`);
      successCount++;
    }
    if (metrics.totalPools !== null) {
      data.metrics.totalPools = metrics.totalPools;
      console.log(`   Total Pools: ${metrics.totalPools.toLocaleString()}`);
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

  const outputPath = path.join(dataDir, 'ada.json');
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));

  console.log(`\nSaved to ${outputPath}`);
  console.log(`Status: ${data.fetchStatus} (${successCount} metrics)`);

  if (data.fetchStatus === 'failed') process.exit(1);
}

main().catch((e) => {
  console.error('Fatal error:', e);
  process.exit(1);
});
