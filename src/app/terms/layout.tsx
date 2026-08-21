import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - NotSoDeFi.com',
  description: 'Terms of Service for NotSoDeFi.com decentralization analysis platform.',
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
