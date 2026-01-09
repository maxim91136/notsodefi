import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Broken Promises - NotSoDeFi.com',
  description: 'Progressive Decentralization audit. Tracking roadmap promises vs reality for crypto projects.',
};

export default function BrokenPromisesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
