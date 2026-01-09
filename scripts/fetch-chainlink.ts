/**
 * Chainlink Data Fetcher Script
 *
 * Fetches network data for Chainlink and saves to data/chainlink.json
 *
 * Usage: npx tsx scripts/fetch-chainlink.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { getChainlinkFetcher, ChainlinkMetrics } from '../src/lib/data/fetchers/chainlink';
import { chainlink } from '../src/lib/data/projects/chainlink';

interface ChainlinkData {
  lastUpdated: string;
  source: string;
  totalScore: number;
  fetchStatus: 'success' | 'partial' | 'failed';
  metrics: ChainlinkMetrics;
}

async function main() {
  console.log('Fetching Chainlink (LINK) network data...\n');

  const fetcher = getChainlinkFetcher(process.env.ETHERSCAN_API_KEY);

  console.log('Fetching oracle network metrics...');
  const metrics = await fetcher.getAllMetrics();

  // Count successful metrics
  const metricValues = Object.values(metrics);
  const successCount = metricValues.filter((v) => v !== null).length;
  const totalCount = metricValues.length;

  console.log(`   ETH/USD Oracles: ${metrics.ethUsdOracles}`);
  console.log(`   ETH/USD Min Answers: ${metrics.ethUsdMinAnswers}`);
  console.log(`   ETH/USD Decimals: ${metrics.ethUsdDecimals}`);
  console.log(`   ETH/USD Latest Round: ${metrics.ethUsdLatestRound}`);
  console.log(`   Total Data Feeds: ~${metrics.totalDataFeeds}`);

  // Determine fetch status
  let fetchStatus: 'success' | 'partial' | 'failed';
  if (successCount === totalCount) {
    fetchStatus = 'success';
  } else if (successCount > 0) {
    fetchStatus = 'partial';
  } else {
    fetchStatus = 'failed';
  }

  const data: ChainlinkData = {
    lastUpdated: new Date().toISOString(),
    source: 'data.chain.link + Etherscan',
    totalScore: chainlink.scores.totalScore,
    fetchStatus,
    metrics,
  };

  // Save to file
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  const outputPath = path.join(dataDir, 'chainlink.json');
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
  console.log(`\nSaved to ${outputPath}`);
  console.log(`Status: ${fetchStatus} (${successCount} metrics)`);
}

main().catch(console.error);
