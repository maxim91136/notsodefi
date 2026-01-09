#!/usr/bin/env npx tsx
/**
 * Fetch Arbitrum One Network Data
 *
 * Uses Arbitrum public RPC to fetch network metrics.
 * No API key required.
 * Saves results to data/arbitrum.json
 *
 * Usage: npx tsx scripts/fetch-arb.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { arbitrum } from '../src/lib/data/projects/arbitrum';
import { getArbitrumFetcher } from '../src/lib/data/fetchers/arbitrum';

interface ArbitrumData {
  lastUpdated: string;
  source: string;
  totalScore: number;
  metrics: {
    blockNumber: number | null;
    gasPrice: number | null;
    chainId: number | null;
    sequencer: string;
  };
  fetchStatus: 'success' | 'partial' | 'failed';
}

async function main() {
  console.log('Fetching Arbitrum One network data...\n');

  const fetcher = getArbitrumFetcher();

  const data: ArbitrumData = {
    lastUpdated: new Date().toISOString(),
    source: 'arb1.arbitrum.io/rpc',
    totalScore: arbitrum.scores.totalScore,
    metrics: {
      blockNumber: null,
      gasPrice: null,
      chainId: null,
      sequencer: 'Centralized (Arbitrum Foundation)',
    },
    fetchStatus: 'failed',
  };

  let successCount = 0;

  console.log('Fetching network stats (Arbitrum RPC)...');
  try {
    const metrics = await fetcher.getAllMetrics();

    if (metrics.blockNumber !== null) {
      data.metrics.blockNumber = metrics.blockNumber;
      console.log(`   Block Number: ${metrics.blockNumber.toLocaleString()}`);
      successCount++;
    }
    if (metrics.gasPrice !== null) {
      data.metrics.gasPrice = metrics.gasPrice;
      console.log(`   Gas Price: ${metrics.gasPrice} Gwei`);
      successCount++;
    }
    if (metrics.chainId !== null) {
      data.metrics.chainId = metrics.chainId;
      console.log(`   Chain ID: ${metrics.chainId}`);
      successCount++;
    }
    data.metrics.sequencer = metrics.sequencer;
    console.log(`   Sequencer: ${metrics.sequencer}`);
  } catch (e) {
    console.log('   Error:', e);
  }

  // Determine status
  data.fetchStatus =
    successCount === 0 ? 'failed' : successCount >= 2 ? 'success' : 'partial';

  // Save to file
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const outputPath = path.join(dataDir, 'arbitrum.json');
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));

  console.log(`\nSaved to ${outputPath}`);
  console.log(`Status: ${data.fetchStatus} (${successCount} metrics)`);

  if (data.fetchStatus === 'failed') process.exit(1);
}

main().catch((e) => {
  console.error('Fatal error:', e);
  process.exit(1);
});
