#!/usr/bin/env npx tsx
/**
 * Fetch Bitcoin Network Data
 *
 * Uses Bitnodes + Blockchain.info APIs to fetch decentralization metrics.
 * Saves results to data/bitcoin.json
 *
 * Usage: npx tsx scripts/fetch-btc.ts [--full]
 */

import * as fs from 'fs';
import * as path from 'path';

import { getBitnodesFetcher } from '../src/lib/data/fetchers/bitnodes';
import { getBlockchainFetcher } from '../src/lib/data/fetchers/blockchain';
import { bitcoin } from '../src/lib/data/projects/bitcoin';

interface BitcoinData {
  lastUpdated: string;
  totalScore: number;
  metrics: {
    // Node metrics (Bitnodes)
    totalNodes: number | null;
    cloudPercentage: number | null;
    // Mining metrics (Blockchain.info)
    top5PoolConcentration: number | null;
    largestPoolPercentage: number | null;
    poolDiversity: number | null;
  };
  fetchStatus: 'success' | 'partial' | 'failed';
}

async function main() {
  console.log('Fetching Bitcoin network data...\n');

  const bitnodes = getBitnodesFetcher();
  const blockchain = getBlockchainFetcher();

  const data: BitcoinData = {
    lastUpdated: new Date().toISOString(),
    totalScore: bitcoin.scores.totalScore,
    metrics: {
      totalNodes: null,
      cloudPercentage: null,
      top5PoolConcentration: null,
      largestPoolPercentage: null,
      poolDiversity: null,
    },
    fetchStatus: 'failed',
  };

  let successCount = 0;

  // 1. Fetch total nodes (Bitnodes - 1 API call)
  console.log('1. Fetching total nodes (Bitnodes)...');
  try {
    const totalNodes = await bitnodes.getTotalNodes();
    if (totalNodes) {
      data.metrics.totalNodes = totalNodes.value as number;
      console.log(`   Total nodes: ${totalNodes.value}`);
      successCount++;
    }
  } catch (e) {
    console.log('   Error:', e);
  }

  // 2. Fetch mining pool data (Blockchain.info - no rate limit)
  console.log('\n2. Fetching mining pool data (Blockchain.info)...');
  try {
    const top5 = await blockchain.getTop5PoolConcentration();
    if (top5) {
      data.metrics.top5PoolConcentration = top5.value as number;
      console.log(`   Top 5 pool concentration: ${top5.value}%`);
      successCount++;
    }
  } catch (e) {
    console.log('   Error:', e);
  }

  try {
    const largest = await blockchain.getLargestPoolPercentage();
    if (largest) {
      data.metrics.largestPoolPercentage = largest.value as number;
      console.log(`   Largest pool: ${largest.value}%`);
      successCount++;
    }
  } catch (e) {
    console.log('   Error:', e);
  }

  try {
    const diversity = await blockchain.getPoolDiversity();
    if (diversity) {
      data.metrics.poolDiversity = diversity.value as number;
      console.log(`   Pool diversity: ${diversity.value} significant pools`);
      successCount++;
    }
  } catch (e) {
    console.log('   Error:', e);
  }

  // 3. Cloud percentage (optional - uses 40 API calls from Bitnodes)
  if (process.argv.includes('--full')) {
    console.log('\n3. Fetching cloud percentage (sampling ~40 nodes)...');
    try {
      const cloudPct = await bitnodes.getCloudPercentageSampled(40);
      if (cloudPct) {
        data.metrics.cloudPercentage = cloudPct.value as number;
        console.log(`   Cloud nodes: ${cloudPct.value}%`);
        successCount++;
      }
    } catch (e) {
      console.log('   Error:', e);
    }
  }

  // Determine status
  data.fetchStatus = successCount === 0 ? 'failed' : successCount >= 4 ? 'success' : 'partial';

  // Save to file
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const outputPath = path.join(dataDir, 'bitcoin.json');
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));

  console.log(`\nSaved to ${outputPath}`);
  console.log(`Status: ${data.fetchStatus} (${successCount} metrics)`);

  if (data.fetchStatus === 'failed') process.exit(1);
}

main().catch((e) => {
  console.error('Fatal error:', e);
  process.exit(1);
});
