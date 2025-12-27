/**
 * Stellar Data Fetcher Script
 *
 * Fetches network data for Stellar and saves to data/stellar.json
 *
 * Usage: npx tsx scripts/fetch-stellar.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { getStellarFetcher, StellarMetrics } from '../src/lib/data/fetchers/stellar';
import { stellar } from '../src/lib/data/projects/stellar';

interface StellarData {
  lastUpdated: string;
  source: string;
  totalScore: number;
  fetchStatus: 'success' | 'partial' | 'failed';
  metrics: StellarMetrics;
}

async function main() {
  console.log('Fetching Stellar (XLM) network data...\n');

  const fetcher = getStellarFetcher();

  console.log('Fetching ledger and supply metrics from Horizon + Dashboard API...');
  const metrics = await fetcher.getAllMetrics();

  // Display results
  console.log(`   Ledger Sequence: ${metrics.ledgerSequence?.toLocaleString() || 'N/A'}`);
  console.log(`   Protocol Version: ${metrics.protocolVersion || 'N/A'}`);
  console.log(`   TX Success/Failed: ${metrics.txSuccessCount || 0}/${metrics.txFailedCount || 0}`);
  console.log(`   Operations: ${metrics.operationCount || 'N/A'}`);
  console.log(`   Base Fee: ${metrics.baseFee || 'N/A'} stroops`);
  console.log(`   Total Supply: ${metrics.totalSupply ? (metrics.totalSupply / 1e9).toFixed(2) + 'B XLM' : 'N/A'}`);
  console.log(`   Circulating Supply: ${metrics.circulatingSupply ? (metrics.circulatingSupply / 1e9).toFixed(2) + 'B XLM' : 'N/A'}`);
  console.log(`   SDF Mandate: ${metrics.sdfMandate ? (metrics.sdfMandate / 1e9).toFixed(2) + 'B XLM' : 'N/A'} (${metrics.sdfMandatePercent?.toFixed(1) || 'N/A'}%)`);

  // Count successful metrics
  const coreMetrics = [
    metrics.ledgerSequence,
    metrics.totalSupply,
    metrics.sdfMandate,
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

  const data: StellarData = {
    lastUpdated: new Date().toISOString(),
    source: 'Stellar Horizon + Dashboard API',
    totalScore: stellar.scores.totalScore,
    fetchStatus,
    metrics,
  };

  // Save to file
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  const outputPath = path.join(dataDir, 'stellar.json');
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
  console.log(`\nSaved to ${outputPath}`);
  console.log(`Status: ${fetchStatus}`);
}

main().catch(console.error);
