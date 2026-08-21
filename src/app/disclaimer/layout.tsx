import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disclaimer - NotSoDeFi.com',
  description: 'Legal disclaimer and corrections policy for NotSoDeFi.com decentralization analysis.',
};

export default function DisclaimerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
