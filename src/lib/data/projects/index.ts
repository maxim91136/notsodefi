/**
 * Projects Data Index
 */

import { Project } from '@/lib/framework';
import { bitcoin } from './bitcoin';
import { ethereum } from './ethereum';
import { solana } from './solana';
import { xrp } from './xrp';
import { bnb } from './bnb';
import { zcash } from './zcash';
import { bittensor } from './bittensor';
import { cardano } from './cardano';
import { avalanche } from './avalanche';
import { tron } from './tron';
import { litecoin } from './litecoin';
import { monero } from './monero';
import { dogecoin } from './dogecoin';
import { bitcoincash } from './bitcoincash';
import { polkadot } from './polkadot';
import { cosmos } from './cosmos';
import { hyperliquid } from './hyperliquid';
import { kaspa } from './kaspa';
import { icp } from './icp';
import { chainlink } from './chainlink';
import { aave } from './aave';
import { ton } from './ton';
import { stellar } from './stellar';
import { sui } from './sui';
import { uniswap } from './uniswap';
import { hedera } from './hedera';
import { tether } from './tether';
import { usdc } from './usdc';
import { dai } from './dai';
import { near } from './near';
import { aptos } from './aptos';
import { polygon } from './polygon';
import { injective } from './injective';
import { filecoin } from './filecoin';
import { arbitrum } from './arbitrum';
import { lido } from './lido';
import { etc } from './etc';
import { virtuals } from './virtuals';
import { render } from './render';
import { algorand } from './algorand';
import { usd1 } from './usd1';
import { figrHeloc } from './figr-heloc';

export const projects: Project[] = [bitcoin, ethereum, solana, xrp, bnb, zcash, bittensor, cardano, avalanche, tron, litecoin, monero, dogecoin, bitcoincash, polkadot, cosmos, hyperliquid, kaspa, icp, chainlink, aave, ton, stellar, sui, uniswap, hedera, tether, usdc, dai, near, aptos, polygon, injective, filecoin, arbitrum, lido, etc, virtuals, render, algorand, usd1, figrHeloc];

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

export function getProjectsByScore(
  sortBy: 'totalScore' | 'chainScore' | 'controlScore' | 'fairnessScore' = 'totalScore',
  order: 'asc' | 'desc' = 'desc'
): Project[] {
  return [...projects].sort((a, b) => {
    const aScore = a.scores[sortBy];
    const bScore = b.scores[sortBy];
    const primaryDiff = order === 'desc' ? bScore - aScore : aScore - bScore;

    // If scores are equal, use uncappedScore as tiebreaker (for kill-switch capped projects)
    if (primaryDiff === 0) {
      return order === 'desc'
        ? b.scores.uncappedScore - a.scores.uncappedScore
        : a.scores.uncappedScore - b.scores.uncappedScore;
    }
    return primaryDiff;
  });
}

export { bitcoin, ethereum, solana, xrp, bnb, zcash, bittensor, cardano, avalanche, tron, litecoin, monero, dogecoin, bitcoincash, polkadot, cosmos, hyperliquid, kaspa, icp, chainlink, aave, ton, stellar, sui, uniswap, hedera, tether, usdc, dai, near, aptos, polygon, injective, filecoin, arbitrum, lido, etc, virtuals, render, algorand, usd1, figrHeloc };
