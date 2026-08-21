import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Header } from '@/components/layout';
import { Footer } from '@/components/layout';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'NotSoDeFi.com - Measuring Real Decentralization',
  description:
    'A framework for objectively measuring blockchain and protocol decentralization. Chain Score, Control Score, Fairness Score.',
  keywords: ['decentralization', 'blockchain', 'crypto', 'DeFi', 'analysis'],
  openGraph: {
    title: 'NotSoDeFi.com - Measuring Real Decentralization',
    description:
      'A framework for objectively measuring blockchain and protocol decentralization.',
    url: 'https://notsodefi.com',
    siteName: 'NotSoDeFi.com',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NotSoDeFi.com - Measuring Real Decentralization',
    description:
      'A framework for objectively measuring blockchain and protocol decentralization.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
