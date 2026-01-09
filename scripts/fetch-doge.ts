#!/usr/bin/env npx tsx
/**
 * Fetch Dogecoin Network Data
 *
 * Uses Blockchair API to fetch Dogecoin network metrics.
 * Saves results to data/dogecoin.json
 *
 * Usage: npx tsx scripts/fetch-doge.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { dogecoin } from '../src/lib/data/projects/dogecoin';

import { getDogecoinFetcher } from '../src/lib/data/fetchers/dogecoin';

interface DogecoinData {
  lastUpdated: string;
  source: string;
  totalScore: number;
  metrics: {
    blocks: number | null;
    difficulty: number | null;
    hashrate24h: number | null;
    mempoolTxs: number | null;
    nodes: number | null;
  };
  fetchStatus: 'success' | 'partial' | 'failed';
}

async function main() {
  console.log('Fetching Dogecoin network data...\n');

  const doge = getDogecoinFetcher();

  const data: DogecoinData = {
    lastUpdated: new Date().toISOString(),
    source: 'blockchair.com',
    totalScore: dogecoin.scores.totalScore,
    metrics: {
      blocks: null,
      difficulty: null,
      hashrate24h: null,
      mempoolTxs: null,
      nodes: null,
    },
    fetchStatus: 'failed',
  };

  let successCount = 0;

  // Fetch all network stats
  console.log('Fetching network stats (Blockchair API)...');
  try {
    const stats = await doge.getNetworkStats();
    if (stats) {
      if (stats.blocks !== null) {
        data.metrics.blocks = stats.blocks;
        console.log(`   Blocks: ${stats.blocks.toLocaleString()}`);
        successCount++;
      }
      if (stats.difficulty !== null) {
        data.metrics.difficulty = stats.difficulty;
        console.log(`   Difficulty: ${stats.difficulty.toLocaleString()}`);
        successCount++;
      }
      if (stats.hashrate24h !== null) {
        data.metrics.hashrate24h = stats.hashrate24h;
        console.log(`   Hashrate (24h): ${(stats.hashrate24h / 1e12).toFixed(2)} TH/s`);
        successCount++;
      }
      if (stats.mempoolTxs !== null) {
        data.metrics.mempoolTxs = stats.mempoolTxs;
        console.log(`   Mempool TXs: ${stats.mempoolTxs}`);
        successCount++;
      }
      if (stats.nodes !== null) {
        data.metrics.nodes = stats.nodes;
        console.log(`   Nodes: ${stats.nodes}`);
        successCount++;
      }
    }
  } catch (e) {
    console.log('   Error:', e);
  }

  // Determine status
  data.fetchStatus = successCount === 0 ? 'failed' : successCount >= 4 ? 'success' : 'partial';

  // Save to file
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const outputPath = path.join(dataDir, 'dogecoin.json');
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));

  console.log(`\nSaved to ${outputPath}`);
  console.log(`Status: ${data.fetchStatus} (${successCount} metrics)`);

  if (data.fetchStatus === 'failed') process.exit(1);
}

main().catch((e) => {
  console.error('Fatal error:', e);
  process.exit(1);
});
