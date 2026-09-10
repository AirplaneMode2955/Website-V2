import type { Metadata, Viewport } from 'next';
import { Newsreader, Manrope } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/next';
import { GoogleAnalytics } from '@next/third-parties/google';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';

const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
  display: 'swap',
  style: ['normal', 'italic'],
  weight: ['300', '400', '500', '600', '700'],
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
  weight: ['200', '300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://jettiverson.com'),
  title: {
    default: 'Jett Iverson',
    template: '%s — Jett Iverson',
  },
  description:
    'Jett Iverson — Marketer, husband, and AI strategist based in Utah. Performance marketing, SEO, GEO, and AI systems.',
  openGraph: {
    title: 'Jett Iverson',
    description: 'Performance marketing, technical SEO, and AI systems. Based in Utah.',
    type: 'website',
    url: 'https://jettiverson.com',
    images: [{ url: '/og/default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jett Iverson',
    description: 'Performance marketing, technical SEO, and AI systems. Based in Utah.',
    images: ['/og/default.png'],
  },
  alternates: {
    canonical: '/',
  },
};

export const viewport: Viewport = {
  themeColor: '#141c14',
  colorScheme: 'dark',
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Jett Iverson',
  url: 'https://jettiverson.com',
  jobTitle: 'Acting Director of Marketing',
  worksFor: { '@type': 'Organization', name: 'The Insurance Center' },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Utah State University — Jon M. Huntsman School of Business',
  },
  knowsAbout: [
    'Performance Marketing',
    'Search Engine Optimization',
    'Generative Engine Optimization',
    'Google Ads',
    'AI systems',
  ],
  sameAs: [
    'https://www.linkedin.com/in/jettiverson',
    'https://www.instagram.com/jett_iverson/',
    'https://github.com/AirplaneMode2955',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/favicon-64.png" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
        {/* Icon font: must be `display=block` — its fallback glyphs are unusable ligature
            text, so `swap`/`optional` would flash or permanently hide every icon. */}
        {/* eslint-disable-next-line @next/next/google-font-display */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body
        className={`${newsreader.variable} ${manrope.variable} bg-background text-on-surface selection:bg-primary selection:text-on-primary`}
      >
        <Nav />
        <main className="pt-24">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <Analytics />
        <GoogleAnalytics gaId="G-K3YWDXK69Y" />
      </body>
    </html>
  );
}
