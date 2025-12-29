import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Calculator - NotSoDeFi.com',
  description: 'Calculate decentralization scores using the NotSoDeFi framework. Input metrics and get Chain, Control, and Fairness scores.',
};

export default function CalculatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
