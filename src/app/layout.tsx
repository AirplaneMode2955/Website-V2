import type { Metadata } from 'next';
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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/favicon-64.png" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
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
