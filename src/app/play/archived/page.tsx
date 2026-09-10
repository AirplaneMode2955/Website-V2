import type { Metadata } from 'next';
import Link from 'next/link';
import FadeIn from '@/components/FadeIn';
import { archivedGames } from '@/lib/arcadeGames';

export const metadata: Metadata = {
  title: 'Archived — The Arcade',
  description: 'Earlier arcade experiments, kept playable but off the main shelf.',
  robots: { index: false, follow: true },
};

export default function ArchivedArcadePage() {
  return (
    <section className="py-16 px-8 bg-background min-h-[60vh]">
      <div className="max-w-screen-2xl mx-auto">
        <FadeIn>
          <Link
            href="/play"
            className="inline-flex items-center gap-2 text-on-surface/60 hover:text-primary font-label text-xs uppercase tracking-luxe transition-colors"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Arcade
          </Link>
          <h1 className="font-headline italic text-5xl md:text-6xl text-primary mt-6 mb-4">
            The Archive
          </h1>
          <p className="text-on-surface-variant text-lg max-w-2xl mb-14">
            Prototypes and early swings that didn&apos;t make the main shelf. Still here,
            still playable — just not the first thing I&apos;d show you.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {archivedGames.map((game, i) => {
            const isHosted = game.mode === 'hosted';
            const href = isHosted ? `/play/${game.slug}` : game.href ?? '#';
            const cardClass =
              'group flex flex-col h-full bg-surface-container rounded-2xl border border-white/[0.06] p-8 hover:border-primary/20 transition-colors opacity-80 hover:opacity-100';
            const inner = (
              <>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-label text-xs uppercase tracking-luxe text-outline">
                    {game.year}
                  </span>
                  <span className="material-symbols-outlined text-primary/30 text-lg">
                    {isHosted ? 'sports_esports' : 'open_in_new'}
                  </span>
                </div>
                <h2 className="font-headline italic text-2xl md:text-3xl text-primary/90 mb-3 group-hover:text-primary transition-colors">
                  {game.title}
                </h2>
                <p className="text-on-surface-variant text-sm leading-relaxed flex-1">
                  {game.blurb}
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-primary/70 font-label text-[11px] uppercase tracking-luxe group-hover:text-primary transition-colors">
                  {isHosted ? 'Play here' : 'Visit site'}
                  <span className="material-symbols-outlined text-sm">
                    {isHosted ? 'arrow_forward' : 'open_in_new'}
                  </span>
                </span>
              </>
            );

            return (
              <FadeIn key={game.slug} delay={i * 0.05} className="h-full">
                {isHosted ? (
                  <Link href={href} className={cardClass}>
                    {inner}
                  </Link>
                ) : (
                  <a href={href} target="_blank" rel="noopener noreferrer" className={cardClass}>
                    {inner}
                  </a>
                )}
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
