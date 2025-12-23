/**
 * Projects Data Index
 */

import { Project } from '@/lib/framework';
import { bitcoin } from './bitcoin';
import { ethereum } from './ethereum';
import { solana } from './solana';

export const projects: Project[] = [bitcoin, ethereum, solana];

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

export { bitcoin, ethereum, solana };
