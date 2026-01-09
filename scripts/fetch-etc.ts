#!/usr/bin/env npx tsx
/**
 * Fetch Ethereum Classic Network Data
 *
 * Uses Blockscout API to fetch ETC network metrics.
 * Saves results to data/etc.json
 *
 * Usage: npx tsx scripts/fetch-etc.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { etc } from '../src/lib/data/projects/etc';
import { getETCFetcher } from '../src/lib/data/fetchers/etc';

interface ETCData {
  lastUpdated: string;
  source: string;
  totalScore: number;
  metrics: {
    blocks: number | null;
    transactions: number | null;
    addresses: number | null;
    avgBlockTime: number | null;
  };
  fetchStatus: 'success' | 'partial' | 'failed';
}

async function main() {
  console.log('Fetching Ethereum Classic network data...\n');

  const fetcher = getETCFetcher();

  const data: ETCData = {
    lastUpdated: new Date().toISOString(),
    source: 'etc.blockscout.com',
    totalScore: etc.scores.totalScore,
    metrics: {
      blocks: null,
      transactions: null,
      addresses: null,
      avgBlockTime: null,
    },
    fetchStatus: 'failed',
  };

  let successCount = 0;

  // Fetch all network stats
  console.log('Fetching network stats (Blockscout API)...');
  try {
    const stats = await fetcher.getNetworkStats();
    if (stats) {
      if (stats.blocks !== null) {
        data.metrics.blocks = stats.blocks;
        console.log(`   Blocks: ${stats.blocks.toLocaleString()}`);
        successCount++;
      }
      if (stats.transactions !== null) {
        data.metrics.transactions = stats.transactions;
        console.log(`   Transactions: ${stats.transactions.toLocaleString()}`);
        successCount++;
      }
      if (stats.addresses !== null) {
        data.metrics.addresses = stats.addresses;
        console.log(`   Addresses: ${stats.addresses.toLocaleString()}`);
        successCount++;
      }
      if (stats.avgBlockTime !== null) {
        data.metrics.avgBlockTime = stats.avgBlockTime;
        console.log(`   Avg Block Time: ${(stats.avgBlockTime / 1000).toFixed(1)}s`);
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

  const outputPath = path.join(dataDir, 'etc.json');
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));

  console.log(`\nSaved to ${outputPath}`);
  console.log(`Status: ${data.fetchStatus} (${successCount} metrics)`);

  if (data.fetchStatus === 'failed') process.exit(1);
}

main().catch((e) => {
  console.error('Fatal error:', e);
  process.exit(1);
});
