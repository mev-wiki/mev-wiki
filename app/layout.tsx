import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import type { Metadata } from 'next';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import SocialIcons from '@/components/social-icons';
import { Analytics } from '@vercel/analytics/react';
import { source } from '@/lib/source';

const siteConfig = {
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mev.wiki/',
  title: process.env.NEXT_PUBLIC_SITE_TITLE || 'MEV Wiki',
  description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || 'Welcome to the MEV Wiki.',
  keywords: process.env.NEXT_PUBLIC_SITE_KEYWORDS?.split(',') || ['MEV', 'Maximal Extractable Value', 'Ethereum', 'front-running', 'sandwich attacks', 'blockchain', 'DeFi', 'Flashbots'],
  twitterHandle: process.env.NEXT_PUBLIC_TWITTER_HANDLE || '@AutomataNetwork',
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.title,
  keywords: siteConfig.keywords,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.title,
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: `${siteConfig.title}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/mev-logo.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    shortcut: '/favicon.ico',
    apple: '/mev-logo.png',
  },
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen font-sans">
        <RootProvider>
          <DocsLayout tree={source.pageTree} {...baseOptions()}>
            <SocialIcons />
            {children}
          </DocsLayout>
          <Analytics />
        </RootProvider>
      </body>
    </html>
  );
}
