import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SPOF Analysis - NotSoDeFi.com',
  description: 'Single Point of Failure analysis. What could kill each crypto project?',
};

export default function SPOFLayout({ children }: { children: React.ReactNode }) {
  return children;
}
