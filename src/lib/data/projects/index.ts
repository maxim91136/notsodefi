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

export const projects: Project[] = [bitcoin, ethereum, solana, xrp, bnb, zcash, bittensor, cardano, avalanche, tron, litecoin, monero];

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
    return order === 'desc' ? bScore - aScore : aScore - bScore;
  });
}

export { bitcoin, ethereum, solana, xrp, bnb, zcash, bittensor, cardano, avalanche, tron, litecoin, monero };
