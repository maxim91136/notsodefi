#!/usr/bin/env npx tsx
/**
 * Fetch Cosmos Hub Network Data
 *
 * Uses Cosmos REST API (LCD) to fetch network metrics.
 * No API key required.
 * Saves results to data/cosmos.json
 *
 * Usage: npx tsx scripts/fetch-atom.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { cosmos } from '../src/lib/data/projects/cosmos';

import { getCosmosFetcher } from '../src/lib/data/fetchers/cosmos';

interface AtomData {
  lastUpdated: string;
  source: string;
  totalScore: number;
  metrics: {
    blockHeight: number | null;
    chainId: string | null;
    activeValidators: number | null;
    totalBonded: number | null;
    totalUnbonded: number | null;
    top5Concentration: number | null;
  };
  fetchStatus: 'success' | 'partial' | 'failed';
}

async function main() {
  console.log('Fetching Cosmos Hub network data...\n');

  const fetcher = getCosmosFetcher();

  const data: AtomData = {
    lastUpdated: new Date().toISOString(),
    source: 'rest.cosmos.directory',
    totalScore: cosmos.scores.totalScore,
    metrics: {
      blockHeight: null,
      chainId: null,
      activeValidators: null,
      totalBonded: null,
      totalUnbonded: null,
      top5Concentration: null,
    },
    fetchStatus: 'failed',
  };

  let successCount = 0;

  // Fetch all metrics
  console.log('Fetching network stats (Cosmos REST API)...');
  try {
    const metrics = await fetcher.getAllMetrics();

    if (metrics.blockHeight !== null) {
      data.metrics.blockHeight = metrics.blockHeight;
      console.log(`   Block Height: ${metrics.blockHeight.toLocaleString()}`);
      successCount++;
    }
    if (metrics.chainId !== null) {
      data.metrics.chainId = metrics.chainId;
      console.log(`   Chain ID: ${metrics.chainId}`);
      successCount++;
    }
    if (metrics.activeValidators !== null) {
      data.metrics.activeValidators = metrics.activeValidators;
      console.log(`   Active Validators: ${metrics.activeValidators}`);
      successCount++;
    }
    if (metrics.totalBonded !== null) {
      data.metrics.totalBonded = metrics.totalBonded;
      console.log(`   Total Bonded: ${metrics.totalBonded.toLocaleString()} ATOM`);
      successCount++;
    }
    if (metrics.totalUnbonded !== null) {
      data.metrics.totalUnbonded = metrics.totalUnbonded;
      console.log(`   Total Unbonded: ${metrics.totalUnbonded.toLocaleString()} ATOM`);
      successCount++;
    }
    if (metrics.top5Concentration !== null) {
      data.metrics.top5Concentration = metrics.top5Concentration;
      console.log(`   Top 5 Concentration: ${metrics.top5Concentration}%`);
      successCount++;
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

  const outputPath = path.join(dataDir, 'cosmos.json');
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));

  console.log(`\nSaved to ${outputPath}`);
  console.log(`Status: ${data.fetchStatus} (${successCount} metrics)`);

  if (data.fetchStatus === 'failed') process.exit(1);
}

main().catch((e) => {
  console.error('Fatal error:', e);
  process.exit(1);
});
