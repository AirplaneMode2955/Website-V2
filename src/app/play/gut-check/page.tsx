import type { Metadata } from 'next';
import Link from 'next/link';
import GutCheck from './GutCheck';

export const metadata: Metadata = {
  title: 'Gut Check',
  description:
    'A daily, five-round test of marketing instinct. Which headline actually won? Which line was written by a machine? Real numbers on the reveal.',
  openGraph: {
    title: 'Gut Check — a daily marketing-instinct test',
    description:
      'Five rounds a day. Which headline won? Which line did a machine write?',
    images: [{ url: '/og/gut-check.png', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', images: ['/og/gut-check.png'] },
};

export default function GutCheckPage() {
  return (
    <section className="px-6 md:px-8 py-12 bg-background min-h-[70vh]">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/play"
          className="inline-flex items-center gap-2 text-on-surface/60 hover:text-primary font-label text-xs uppercase tracking-luxe transition-colors mb-8"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Arcade
        </Link>
        <GutCheck />
      </div>
    </section>
  );
}
