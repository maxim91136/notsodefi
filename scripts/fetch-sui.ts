/**
 * SUI Data Fetcher Script
 *
 * Fetches network data for SUI and saves to data/sui.json
 *
 * Usage: npx tsx scripts/fetch-sui.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { getSuiFetcher, SuiMetrics } from '../src/lib/data/fetchers/sui';
import { sui } from '../src/lib/data/projects/sui';

interface SuiData {
  lastUpdated: string;
  source: string;
  totalScore: number;
  fetchStatus: 'success' | 'partial' | 'failed';
  metrics: SuiMetrics;
}

async function main() {
  console.log('Fetching SUI network data...\n');

  const fetcher = getSuiFetcher();

  console.log('Fetching system state from SUI RPC...');
  const metrics = await fetcher.getAllMetrics();

  // Display results
  console.log(`   Epoch: ${metrics.epoch || 'N/A'}`);
  console.log(`   Protocol Version: ${metrics.protocolVersion || 'N/A'}`);
  console.log(`   Active Validators: ${metrics.totalValidators || 'N/A'} / ${metrics.maxValidators || 'N/A'}`);
  console.log(`   Total Stake: ${metrics.totalStake ? (metrics.totalStake / 1e9).toFixed(2) + 'B SUI' : 'N/A'}`);
  console.log(`   Min Validator Stake: ${metrics.minValidatorStake ? (metrics.minValidatorStake / 1e6).toFixed(0) + 'M SUI' : 'N/A'}`);
  console.log(`   Top 5 Concentration: ${metrics.top5Concentration?.toFixed(2) || 'N/A'}%`);
  console.log(`   Nakamoto Coefficient: ${metrics.nakamotoCoefficient || 'N/A'}`);
  console.log(`   Reference Gas Price: ${metrics.referenceGasPrice || 'N/A'} MIST`);

  // Count successful metrics
  const coreMetrics = [
    metrics.epoch,
    metrics.totalValidators,
    metrics.totalStake,
    metrics.nakamotoCoefficient,
  ];
  const successCount = coreMetrics.filter((v) => v !== null).length;

  // Determine fetch status
  let fetchStatus: 'success' | 'partial' | 'failed';
  if (successCount === coreMetrics.length) {
    fetchStatus = 'success';
  } else if (successCount > 0) {
    fetchStatus = 'partial';
  } else {
    fetchStatus = 'failed';
  }

  const data: SuiData = {
    lastUpdated: new Date().toISOString(),
    source: 'SUI JSON-RPC (fullnode.mainnet.sui.io)',
    totalScore: sui.scores.totalScore,
    fetchStatus,
    metrics,
  };

  // Save to file
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  const outputPath = path.join(dataDir, 'sui.json');
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
  console.log(`\nSaved to ${outputPath}`);
  console.log(`Status: ${fetchStatus}`);
}

main().catch(console.error);
