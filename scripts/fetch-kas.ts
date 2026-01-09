#!/usr/bin/env npx tsx
/**
 * Fetch Kaspa Network Data
 *
 * Uses Kaspa REST API to fetch network metrics.
 * No API key required.
 * Saves results to data/kaspa.json
 *
 * Usage: npx tsx scripts/fetch-kas.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { kaspa } from '../src/lib/data/projects/kaspa';

import { getKaspaFetcher } from '../src/lib/data/fetchers/kaspa';

interface KasData {
  lastUpdated: string;
  source: string;
  totalScore: number;
  metrics: {
    networkName: string | null;
    blockCount: number | null;
    difficulty: number | null;
    hashrate: number | null;
    circulatingSupply: number | null;
    maxSupply: number | null;
    blockReward: number | null;
  };
  fetchStatus: 'success' | 'partial' | 'failed';
}

async function main() {
  console.log('Fetching Kaspa network data...\n');

  const fetcher = getKaspaFetcher();

  const data: KasData = {
    lastUpdated: new Date().toISOString(),
    source: 'api.kaspa.org',
    totalScore: kaspa.scores.totalScore,
    metrics: {
      networkName: null,
      blockCount: null,
      difficulty: null,
      hashrate: null,
      circulatingSupply: null,
      maxSupply: null,
      blockReward: null,
    },
    fetchStatus: 'failed',
  };

  let successCount = 0;

  // Fetch all metrics
  console.log('Fetching network stats (Kaspa REST API)...');
  try {
    const metrics = await fetcher.getAllMetrics();

    if (metrics.networkName !== null) {
      data.metrics.networkName = metrics.networkName;
      console.log(`   Network: ${metrics.networkName}`);
      successCount++;
    }
    if (metrics.blockCount !== null) {
      data.metrics.blockCount = metrics.blockCount;
      console.log(`   Block Count: ${metrics.blockCount.toLocaleString()}`);
      successCount++;
    }
    if (metrics.difficulty !== null) {
      data.metrics.difficulty = metrics.difficulty;
      console.log(`   Difficulty: ${metrics.difficulty.toExponential(2)}`);
      successCount++;
    }
    if (metrics.hashrate !== null) {
      data.metrics.hashrate = metrics.hashrate;
      console.log(`   Hashrate: ${metrics.hashrate.toLocaleString()} PH/s`);
      successCount++;
    }
    if (metrics.circulatingSupply !== null) {
      data.metrics.circulatingSupply = metrics.circulatingSupply;
      console.log(`   Circulating: ${(metrics.circulatingSupply / 1e9).toFixed(2)}B KAS`);
      successCount++;
    }
    if (metrics.maxSupply !== null) {
      data.metrics.maxSupply = metrics.maxSupply;
      console.log(`   Max Supply: ${(metrics.maxSupply / 1e9).toFixed(2)}B KAS`);
      successCount++;
    }
    if (metrics.blockReward !== null) {
      data.metrics.blockReward = metrics.blockReward;
      console.log(`   Block Reward: ${metrics.blockReward.toFixed(2)} KAS`);
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

  const outputPath = path.join(dataDir, 'kaspa.json');
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));

  console.log(`\nSaved to ${outputPath}`);
  console.log(`Status: ${data.fetchStatus} (${successCount} metrics)`);

  if (data.fetchStatus === 'failed') process.exit(1);
}

main().catch((e) => {
  console.error('Fatal error:', e);
  process.exit(1);
});
