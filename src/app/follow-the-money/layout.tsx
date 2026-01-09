import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Follow the Money - NotSoDeFi.com',
  description: 'VC portfolio overlap in crypto. Mapping a16z, Paradigm, and Polychain investments.',
};

export default function FollowTheMoneyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
