#!/usr/bin/env npx tsx
/**
 * Fetch Hyperliquid Network Data
 *
 * Uses Hyperliquid API to fetch network metrics.
 * No API key required.
 * Saves results to data/hyperliquid.json
 *
 * Usage: npx tsx scripts/fetch-hype.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { hyperliquid } from '../src/lib/data/projects/hyperliquid';

import { getHyperliquidFetcher } from '../src/lib/data/fetchers/hyperliquid';

interface HypeData {
  lastUpdated: string;
  source: string;
  totalScore: number;
  metrics: {
    totalValidators: number | null;
    activeValidators: number | null;
    totalStake: number | null;
    foundationStake: number | null;
    foundationPercent: number | null;
    top5Concentration: number | null;
    nakamotoCoefficient: number | null;
  };
  fetchStatus: 'success' | 'partial' | 'failed';
}

async function main() {
  console.log('Fetching Hyperliquid network data...\n');

  const fetcher = getHyperliquidFetcher();

  const data: HypeData = {
    lastUpdated: new Date().toISOString(),
    source: 'api.hyperliquid.xyz',
    totalScore: hyperliquid.scores.totalScore,
    metrics: {
      totalValidators: null,
      activeValidators: null,
      totalStake: null,
      foundationStake: null,
      foundationPercent: null,
      top5Concentration: null,
      nakamotoCoefficient: null,
    },
    fetchStatus: 'failed',
  };

  let successCount = 0;

  // Fetch all metrics
  console.log('Fetching validator stats (Hyperliquid API)...');
  try {
    const metrics = await fetcher.getAllMetrics();

    if (metrics.totalValidators !== null) {
      data.metrics.totalValidators = metrics.totalValidators;
      console.log(`   Total Validators: ${metrics.totalValidators}`);
      successCount++;
    }
    if (metrics.activeValidators !== null) {
      data.metrics.activeValidators = metrics.activeValidators;
      console.log(`   Active Validators: ${metrics.activeValidators}`);
      successCount++;
    }
    if (metrics.totalStake !== null) {
      data.metrics.totalStake = metrics.totalStake;
      console.log(`   Total Stake: ${metrics.totalStake.toLocaleString()} HYPE`);
      successCount++;
    }
    if (metrics.foundationStake !== null) {
      data.metrics.foundationStake = metrics.foundationStake;
      console.log(`   Foundation Stake: ${metrics.foundationStake.toLocaleString()} HYPE`);
      successCount++;
    }
    if (metrics.foundationPercent !== null) {
      data.metrics.foundationPercent = metrics.foundationPercent;
      console.log(`   Foundation %: ${metrics.foundationPercent}%`);
      successCount++;
    }
    if (metrics.top5Concentration !== null) {
      data.metrics.top5Concentration = metrics.top5Concentration;
      console.log(`   Top 5 Concentration: ${metrics.top5Concentration}%`);
      successCount++;
    }
    if (metrics.nakamotoCoefficient !== null) {
      data.metrics.nakamotoCoefficient = metrics.nakamotoCoefficient;
      console.log(`   Nakamoto Coefficient: ${metrics.nakamotoCoefficient}`);
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

  const outputPath = path.join(dataDir, 'hyperliquid.json');
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));

  console.log(`\nSaved to ${outputPath}`);
  console.log(`Status: ${data.fetchStatus} (${successCount} metrics)`);

  if (data.fetchStatus === 'failed') process.exit(1);
}

main().catch((e) => {
  console.error('Fatal error:', e);
  process.exit(1);
});
