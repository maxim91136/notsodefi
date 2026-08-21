import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - NotSoDeFi.com',
  description: 'Privacy Policy for NotSoDeFi.com decentralization analysis platform.',
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
