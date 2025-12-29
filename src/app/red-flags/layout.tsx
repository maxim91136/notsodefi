import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Red Flags - NotSoDeFi.com',
  description: 'Marketing translation guide for crypto projects. What they say vs what they mean.',
};

export default function RedFlagsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
