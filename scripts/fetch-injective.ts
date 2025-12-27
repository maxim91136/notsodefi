#!/usr/bin/env npx tsx
/**
 * Fetch Injective Network Data
 *
 * Uses Injective LCD API (Cosmos SDK) to fetch validator metrics.
 * No API key required.
 * Saves results to data/injective.json
 *
 * Usage: npx tsx scripts/fetch-injective.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { injective } from '../src/lib/data/projects/injective';

import { getInjectiveFetcher } from '../src/lib/data/fetchers/injective';

interface InjectiveData {
  lastUpdated: string;
  source: string;
  totalScore: number;
  metrics: {
    activeValidators: number | null;
    totalStaked: number | null;
    nakamotoCoefficient: number | null;
    top5Concentration: number | null;
    top10Concentration: number | null;
  };
  fetchStatus: 'success' | 'partial' | 'failed';
}

async function main() {
  console.log('Fetching Injective network data...\n');

  const fetcher = getInjectiveFetcher();

  const data: InjectiveData = {
    lastUpdated: new Date().toISOString(),
    source: 'sentry.lcd.injective.network',
    totalScore: injective.scores.totalScore,
    metrics: {
      activeValidators: null,
      totalStaked: null,
      nakamotoCoefficient: null,
      top5Concentration: null,
      top10Concentration: null,
    },
    fetchStatus: 'failed',
  };

  let successCount = 0;

  console.log('Fetching validator stats (Injective LCD API)...');
  try {
    const metrics = await fetcher.getAllMetrics();

    if (metrics.activeValidators !== null) {
      data.metrics.activeValidators = metrics.activeValidators;
      console.log(`   Active Validators: ${metrics.activeValidators}`);
      successCount++;
    }
    if (metrics.totalStaked !== null) {
      data.metrics.totalStaked = metrics.totalStaked;
      console.log(`   Total Staked: ${metrics.totalStaked.toLocaleString()} INJ`);
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
    successCount === 0 ? 'failed' : successCount >= 4 ? 'success' : 'partial';

  // Save to file
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const outputPath = path.join(dataDir, 'injective.json');
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));

  console.log(`\nSaved to ${outputPath}`);
  console.log(`Status: ${data.fetchStatus} (${successCount} metrics)`);

  if (data.fetchStatus === 'failed') process.exit(1);
}

main().catch((e) => {
  console.error('Fatal error:', e);
  process.exit(1);
});
