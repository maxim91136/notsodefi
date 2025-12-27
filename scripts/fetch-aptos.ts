#!/usr/bin/env npx tsx
/**
 * Fetch Aptos Network Data
 *
 * Uses Aptos REST API to fetch network metrics.
 * No API key required.
 * Saves results to data/aptos.json
 *
 * Usage: npx tsx scripts/fetch-aptos.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { aptos } from '../src/lib/data/projects/aptos';

import { getAptosFetcher } from '../src/lib/data/fetchers/aptos';

interface AptosData {
  lastUpdated: string;
  source: string;
  totalScore: number;
  metrics: {
    blockHeight: number | null;
    epoch: number | null;
    activeValidators: number | null;
    totalStaked: number | null;
    nakamotoCoefficient: number | null;
    top5Concentration: number | null;
    top10Concentration: number | null;
  };
  fetchStatus: 'success' | 'partial' | 'failed';
}

async function main() {
  console.log('Fetching Aptos network data...\n');

  const fetcher = getAptosFetcher();

  const data: AptosData = {
    lastUpdated: new Date().toISOString(),
    source: 'api.mainnet.aptoslabs.com',
    totalScore: aptos.scores.totalScore,
    metrics: {
      blockHeight: null,
      epoch: null,
      activeValidators: null,
      totalStaked: null,
      nakamotoCoefficient: null,
      top5Concentration: null,
      top10Concentration: null,
    },
    fetchStatus: 'failed',
  };

  let successCount = 0;

  console.log('Fetching network stats (Aptos API)...');
  try {
    const metrics = await fetcher.getAllMetrics();

    if (metrics.blockHeight !== null) {
      data.metrics.blockHeight = metrics.blockHeight;
      console.log(`   Block Height: ${metrics.blockHeight.toLocaleString()}`);
      successCount++;
    }
    if (metrics.epoch !== null) {
      data.metrics.epoch = metrics.epoch;
      console.log(`   Epoch: ${metrics.epoch}`);
      successCount++;
    }
    if (metrics.activeValidators !== null) {
      data.metrics.activeValidators = metrics.activeValidators;
      console.log(`   Active Validators: ${metrics.activeValidators}`);
      successCount++;
    }
    if (metrics.totalStaked !== null) {
      data.metrics.totalStaked = metrics.totalStaked;
      console.log(`   Total Staked: ${metrics.totalStaked.toLocaleString()} APT`);
      successCount++;
    }
    if (metrics.nakamotoCoefficient !== null) {
      data.metrics.nakamotoCoefficient = metrics.nakamotoCoefficient;
      console.log(`   Nakamoto Coefficient: ${metrics.nakamotoCoefficient}`);
      successCount++;
    }
    if (metrics.top5Concentration !== null) {
      data.metrics.top5Concentration = metrics.top5Concentration;
      console.log(`   Top 5 Concentration: ${metrics.top5Concentration}%`);
      successCount++;
    }
    if (metrics.top10Concentration !== null) {
      data.metrics.top10Concentration = metrics.top10Concentration;
      console.log(`   Top 10 Concentration: ${metrics.top10Concentration}%`);
      successCount++;
    }
  } catch (e) {
    console.log('   Error:', e);
  }

  // Determine status
  data.fetchStatus =
    successCount === 0 ? 'failed' : successCount >= 5 ? 'success' : 'partial';

  // Save to file
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const outputPath = path.join(dataDir, 'aptos.json');
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));

  console.log(`\nSaved to ${outputPath}`);
  console.log(`Status: ${data.fetchStatus} (${successCount} metrics)`);

  if (data.fetchStatus === 'failed') process.exit(1);
}

main().catch((e) => {
  console.error('Fatal error:', e);
  process.exit(1);
});
