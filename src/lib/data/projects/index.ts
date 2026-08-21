/**
 * Projects Data Index
 */

import { Project } from '@/lib/framework';
import { bitcoin } from './bitcoin';
import { ethereum } from './ethereum';
import { litecoin } from './litecoin';
import { monero } from './monero';
import { dogecoin } from './dogecoin';
import { bitcoincash } from './bitcoincash';
import { polkadot } from './polkadot';
import { kaspa } from './kaspa';
import { etc } from './etc';

export const projects: Project[] = [bitcoin, ethereum, litecoin, monero, dogecoin, bitcoincash, polkadot, kaspa, etc];

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

export { bitcoin, ethereum, litecoin, monero, dogecoin, bitcoincash, polkadot, kaspa, etc };
