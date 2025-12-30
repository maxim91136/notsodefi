import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SPOF Analysis - NotSoDeFi.com',
  description: 'Single Point of Failure analysis for 38 crypto projects. What could kill each project?',
};

export default function SPOFLayout({ children }: { children: React.ReactNode }) {
  return children;
}
