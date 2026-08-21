import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Risk Indicators - NotSoDeFi.com',
  description: 'Common marketing terms and observable patterns in blockchain projects.',
};

export default function RiskIndicatorsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
