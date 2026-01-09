#!/usr/bin/env npx tsx
/**
 * Fetch Monero Network Data
 *
 * Uses Blockchair API to fetch Monero network metrics.
 * Saves results to data/monero.json
 *
 * Usage: npx tsx scripts/fetch-xmr.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { monero } from '../src/lib/data/projects/monero';

import { getMoneroFetcher } from '../src/lib/data/fetchers/monero';

interface MoneroData {
  lastUpdated: string;
  source: string;
  totalScore: number;
  metrics: {
    blocks: number | null;
    difficulty: number | null;
    hashrate24h: number | null;
    mempoolTxs: number | null;
  };
  fetchStatus: 'success' | 'partial' | 'failed';
}

async function main() {
  console.log('Fetching Monero network data...\n');

  const xmr = getMoneroFetcher();

  const data: MoneroData = {
    lastUpdated: new Date().toISOString(),
    source: 'blockchair.com',
    totalScore: monero.scores.totalScore,
    metrics: {
      blocks: null,
      difficulty: null,
      hashrate24h: null,
      mempoolTxs: null,
    },
    fetchStatus: 'failed',
  };

  let successCount = 0;

  // Fetch all network stats
  console.log('Fetching network stats (Blockchair API)...');
  try {
    const stats = await xmr.getNetworkStats();
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
        console.log(`   Hashrate (24h): ${(stats.hashrate24h / 1e9).toFixed(2)} GH/s`);
        successCount++;
      }
      if (stats.mempoolTxs !== null) {
        data.metrics.mempoolTxs = stats.mempoolTxs;
        console.log(`   Mempool TXs: ${stats.mempoolTxs}`);
        successCount++;
      }
    }
  } catch (e) {
    console.log('   Error:', e);
  }

  // Determine status
  data.fetchStatus = successCount === 0 ? 'failed' : successCount >= 3 ? 'success' : 'partial';

  // Save to file
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const outputPath = path.join(dataDir, 'monero.json');
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));

  console.log(`\nSaved to ${outputPath}`);
  console.log(`Status: ${data.fetchStatus} (${successCount} metrics)`);

  if (data.fetchStatus === 'failed') process.exit(1);
}

main().catch((e) => {
  console.error('Fatal error:', e);
  process.exit(1);
});
