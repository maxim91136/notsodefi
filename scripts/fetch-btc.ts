#!/usr/bin/env npx tsx
/**
 * Fetch Bitcoin Network Data
 *
 * Uses Bitnodes API to fetch decentralization metrics.
 * Saves results to data/bitcoin.json
 *
 * Usage: npx tsx scripts/fetch-btc.ts
 */

import * as fs from 'fs';
import * as path from 'path';

// Import the fetcher
import { getBitnodesFetcher } from '../src/lib/data/fetchers/bitnodes';

interface BitcoinData {
  lastUpdated: string;
  metrics: {
    totalNodes: number | null;
    cloudPercentage: number | null;
    geographicConcentration: number | null;
  };
  confidence: {
    totalNodes: number;
    cloudPercentage: number;
    geographicConcentration: number;
  };
  fetchStatus: 'success' | 'partial' | 'failed';
}

async function main() {
  console.log('Fetching Bitcoin network data...\n');

  const fetcher = getBitnodesFetcher();
  const data: BitcoinData = {
    lastUpdated: new Date().toISOString(),
    metrics: {
      totalNodes: null,
      cloudPercentage: null,
      geographicConcentration: null,
    },
    confidence: {
      totalNodes: 0,
      cloudPercentage: 0,
      geographicConcentration: 0,
    },
    fetchStatus: 'failed',
  };

  let successCount = 0;

  // 1. Fetch total nodes (1 API call)
  console.log('1. Fetching total nodes...');
  try {
    const totalNodes = await fetcher.getTotalNodes();
    if (totalNodes) {
      data.metrics.totalNodes = totalNodes.value as number;
      data.confidence.totalNodes = totalNodes.confidence;
      console.log(`   Total nodes: ${totalNodes.value}`);
      successCount++;
    } else {
      console.log('   Failed to fetch total nodes');
    }
  } catch (e) {
    console.log('   Error:', e);
  }

  // Note: Sampling methods use ~40 API calls each
  // With 50/day limit, we can only run one sampling per day
  // For now, we just fetch total nodes (the reliable metric)
  // Cloud/geo data can be fetched manually or with API key

  console.log('\n2. Cloud/geographic data requires sampling (40 API calls)');
  console.log('   Skipping to preserve API quota');
  console.log('   Run with --full flag to fetch all metrics');

  // Check if --full flag is passed
  if (process.argv.includes('--full')) {
    console.log('\n3. Fetching cloud percentage (sampling ~40 nodes)...');
    try {
      const cloudPct = await fetcher.getCloudPercentageSampled(40);
      if (cloudPct) {
        data.metrics.cloudPercentage = cloudPct.value as number;
        data.confidence.cloudPercentage = cloudPct.confidence;
        console.log(`   Cloud nodes: ${cloudPct.value}% (confidence: ${cloudPct.confidence})`);
        successCount++;
      }
    } catch (e) {
      console.log('   Error:', e);
    }
  }

  // Determine fetch status
  if (successCount === 0) {
    data.fetchStatus = 'failed';
  } else if (successCount < 3) {
    data.fetchStatus = 'partial';
  } else {
    data.fetchStatus = 'success';
  }

  // Save to file
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const outputPath = path.join(dataDir, 'bitcoin.json');
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));

  console.log(`\nData saved to ${outputPath}`);
  console.log(`Status: ${data.fetchStatus}`);

  // Exit with error if failed
  if (data.fetchStatus === 'failed') {
    process.exit(1);
  }
}

main().catch((e) => {
  console.error('Fatal error:', e);
  process.exit(1);
});
