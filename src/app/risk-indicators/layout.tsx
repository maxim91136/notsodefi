import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Marketing Language Analysis - NotSoDeFi.com',
  description: 'Common marketing terms and observable patterns in blockchain projects.',
};

export default function RedFlagsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
