import type { Metadata } from 'next';
import Link from 'next/link';
import TableTalk from './TableTalk';

export const metadata: Metadata = {
  title: 'Table Talk',
  description:
    'A daily five-club ranking game. Order Premier League clubs by a hidden stat — founding year, ground size, titles won. One shot a day, drag to reorder, share your grid.',
  openGraph: {
    title: 'Table Talk — a daily football ranking game',
    description:
      'Five clubs, one hidden stat. Drag them into order. One shot a day.',
    images: [{ url: '/og/default.png', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', images: ['/og/default.png'] },
};

export default function TableTalkPage() {
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
        <TableTalk />
      </div>
    </section>
  );
}
