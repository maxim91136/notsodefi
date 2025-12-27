#!/usr/bin/env npx tsx
/**
 * Fetch Internet Computer (ICP) Network Data
 *
 * Uses IC Dashboard API to fetch network metrics.
 * No API key required.
 * Saves results to data/icp.json
 *
 * Usage: npx tsx scripts/fetch-icp.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { icp } from '../src/lib/data/projects/icp';

import { getIcpFetcher } from '../src/lib/data/fetchers/icp';

interface IcpData {
  lastUpdated: string;
  source: string;
  totalScore: number;
  metrics: {
    totalNodes: number | null;
    upNodes: number | null;
    nodeProviders: number | null;
    subnets: number | null;
    avgNakamotoCoefficient: number | null;
  };
  fetchStatus: 'success' | 'partial' | 'failed';
}

async function main() {
  console.log('Fetching Internet Computer (ICP) network data...\n');

  const fetcher = getIcpFetcher();

  const data: IcpData = {
    lastUpdated: new Date().toISOString(),
    source: 'ic-api.internetcomputer.org',
    totalScore: icp.scores.totalScore,
    metrics: {
      totalNodes: null,
      upNodes: null,
      nodeProviders: null,
      subnets: null,
      avgNakamotoCoefficient: null,
    },
    fetchStatus: 'failed',
  };

  let successCount = 0;

  // Fetch all metrics
  console.log('Fetching network stats (IC Dashboard API)...');
  try {
    const metrics = await fetcher.getAllMetrics();

    if (metrics.totalNodes !== null) {
      data.metrics.totalNodes = metrics.totalNodes;
      console.log(`   Total Nodes: ${metrics.totalNodes}`);
      successCount++;
    }
    if (metrics.upNodes !== null) {
      data.metrics.upNodes = metrics.upNodes;
      console.log(`   Up Nodes: ${metrics.upNodes}`);
      successCount++;
    }
    if (metrics.nodeProviders !== null) {
      data.metrics.nodeProviders = metrics.nodeProviders;
      console.log(`   Node Providers: ${metrics.nodeProviders}`);
      successCount++;
    }
    if (metrics.subnets !== null) {
      data.metrics.subnets = metrics.subnets;
      console.log(`   Subnets: ${metrics.subnets}`);
      successCount++;
    }
    if (metrics.avgNakamotoCoefficient !== null) {
      data.metrics.avgNakamotoCoefficient = Math.round(metrics.avgNakamotoCoefficient * 10) / 10;
      console.log(`   Avg Nakamoto Coefficient: ${data.metrics.avgNakamotoCoefficient}`);
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

  const outputPath = path.join(dataDir, 'icp.json');
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));

  console.log(`\nSaved to ${outputPath}`);
  console.log(`Status: ${data.fetchStatus} (${successCount} metrics)`);

  if (data.fetchStatus === 'failed') process.exit(1);
}

main().catch((e) => {
  console.error('Fatal error:', e);
  process.exit(1);
});
