#!/usr/bin/env npx tsx
/**
 * Fetch Litecoin Network Data
 *
 * Uses Blockchair API to fetch Litecoin network metrics.
 * Saves results to data/litecoin.json
 *
 * Usage: npx tsx scripts/fetch-ltc.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { litecoin } from '../src/lib/data/projects/litecoin';

import { getLitecoinFetcher } from '../src/lib/data/fetchers/litecoin';

interface LitecoinData {
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
  console.log('Fetching Litecoin network data...\n');

  const ltc = getLitecoinFetcher();

  const data: LitecoinData = {
    lastUpdated: new Date().toISOString(),
    source: 'blockchair.com',
    totalScore: litecoin.scores.totalScore,
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
    const stats = await ltc.getNetworkStats();
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

  const outputPath = path.join(dataDir, 'litecoin.json');
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));

  console.log(`\nSaved to ${outputPath}`);
  console.log(`Status: ${data.fetchStatus} (${successCount} metrics)`);

  if (data.fetchStatus === 'failed') process.exit(1);
}

main().catch((e) => {
  console.error('Fatal error:', e);
  process.exit(1);
});
