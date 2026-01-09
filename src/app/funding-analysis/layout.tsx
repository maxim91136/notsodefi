import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'VC Portfolio Analysis - NotSoDeFi.com',
  description: 'Venture capital portfolio overlap in crypto. a16z, Paradigm, and Polychain investments.',
};

export default function FollowTheMoneyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
