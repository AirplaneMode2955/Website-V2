import type { Metadata } from 'next';
import Link from 'next/link';
import FadeIn from '@/components/FadeIn';
import { featuredGames, archivedGames } from '@/lib/arcadeGames';
import { GameIcon } from '@/components/icons/ArcadeIcons';

export const metadata: Metadata = {
  title: 'Play',
  description:
    "The Arcade — small games and toys Jett Iverson has built, plus Gut Check, a daily test of marketing instinct.",
  openGraph: {
    title: 'Play — The Arcade',
    description:
      'Small games and toys Jett Iverson built for the fun of it, plus Gut Check, a daily marketing-instinct test.',
    images: [{ url: '/og/play.png', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', images: ['/og/play.png'] },
};

const ACCENT_TILES = [
  '#c9dbc3', '#d94f3d', '#c9dbc3', '#8da68a', '#d5cbb5',
  '#c9dbc3', '#d94f3d', '#8da68a', '#c9dbc3', '#d5cbb5',
  '#c9dbc3', '#8da68a',
];

export default function PlayPage() {
  return (
    <>
      {/* ── Page Banner ── */}
      <section className="relative py-24 px-8 bg-surface-container-low border-b border-white/5 overflow-hidden">
        <span
          aria-hidden="true"
          className="absolute right-0 top-1/2 -translate-y-1/2 font-headline italic text-primary select-none pointer-events-none leading-none pr-8"
          style={{ fontSize: 'clamp(6rem, 16vw, 15rem)', opacity: 0.04 }}
        >
          Play
        </span>
        <div
          aria-hidden="true"
          className="absolute left-8 top-1/2 -translate-y-1/2 w-[560px] h-[320px] rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, var(--color-primary) 0%, transparent 70%)',
            opacity: 0.12,
          }}
        />
        <div className="max-w-screen-2xl mx-auto relative z-10">
          <FadeIn>
            {/* drifting pixel accent */}
            <div className="flex gap-1.5 mb-6" aria-hidden="true">
              {ACCENT_TILES.map((c, i) => (
                <span
                  key={i}
                  className="arcade-tile block h-3 w-3 rounded-[3px]"
                  style={{ background: c, animationDelay: `${i * 0.18}s` }}
                />
              ))}
            </div>
            <span className="font-label text-xs uppercase tracking-luxe text-outline mb-4 block">
              The Arcade
            </span>
            <h1 className="font-headline italic text-6xl md:text-8xl text-primary leading-tight mb-4">
              Play
            </h1>
            <p className="text-on-surface-variant text-xl max-w-xl">
              Small things I&apos;ve built for the fun of building them — games, simulators,
              and one daily test of marketing instinct.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Gut Check — compact daily strip ── */}
      <section className="px-8 pt-10 bg-background">
        <div className="max-w-screen-2xl mx-auto">
          <FadeIn>
            <Link
              href="/play/gut-check"
              className="group flex flex-wrap items-center gap-x-5 gap-y-3 bg-surface-container-high rounded-2xl border border-white/[0.08] px-6 py-4 hover:border-primary/25 transition-colors"
            >
              <span className="text-2xl" aria-hidden="true">
                🟩🟩🟩⬜🟩
              </span>
              <span className="font-label text-[10px] uppercase tracking-luxe px-2.5 py-1 bg-primary-container text-on-primary-container rounded-full">
                Daily
              </span>
              <span className="font-headline italic text-xl text-primary">Gut Check</span>
              <span className="text-on-surface-variant text-sm flex-1 min-w-[12rem]">
                Which headline won? Which line did a machine write? Five rounds.
              </span>
              <span className="inline-flex items-center gap-1.5 text-primary font-label text-xs uppercase tracking-luxe group-hover:text-primary-fixed transition-colors">
                Play today
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </span>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ── The Arcade — the main event ── */}
      <section className="py-16 px-8 bg-background">
        <div className="max-w-screen-2xl mx-auto">
          <FadeIn>
            <span className="font-label text-xs uppercase tracking-luxe text-outline mb-4 block">
              {featuredGames.length} to play
            </span>
            <h2 className="font-headline italic text-5xl md:text-7xl text-primary mb-4">
              The Arcade
            </h2>
            <p className="text-on-surface-variant text-lg max-w-2xl mb-14">
              A drawer of side projects — some are real games, some are toys I couldn&apos;t
              stop tinkering with. Most run right here on the page.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredGames.map((game, i) => {
              const isInternal = game.mode === 'hosted' || game.mode === 'route';
              const href = isInternal ? `/play/${game.slug}` : game.href ?? '#';
              const cardClass =
                'group flex flex-col h-full bg-surface-container-highest rounded-[1.5rem] border border-white/[0.08] shadow-soft hover:border-primary/25 hover:shadow-premium transition-all p-10';
              const inner = (
                <>
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-label text-xs uppercase tracking-luxe text-outline">
                      {game.year}
                    </span>
                    <GameIcon slug={game.slug} className="w-11 h-11" />
                  </div>
                  <h3 className="font-headline italic text-3xl md:text-4xl text-primary mb-4 group-hover:text-primary-fixed transition-colors">
                    {game.title}
                  </h3>
                  <p className="text-on-surface-variant leading-relaxed flex-1">
                    {game.blurb}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-8">
                    {game.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-label text-[10px] uppercase tracking-luxe px-3 py-1 bg-primary/10 text-primary rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="mt-8 inline-flex items-center gap-1.5 text-primary font-label text-xs uppercase tracking-luxe">
                    {isInternal ? 'Play here' : 'Visit site'}
                    <span className="material-symbols-outlined text-sm">
                      {isInternal ? 'arrow_forward' : 'open_in_new'}
                    </span>
                  </span>
                </>
              );

              return (
                <FadeIn key={game.slug} delay={i * 0.05} className="h-full">
                  {isInternal ? (
                    <Link href={href} className={cardClass}>
                      {inner}
                    </Link>
                  ) : (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cardClass}
                    >
                      {inner}
                    </a>
                  )}
                </FadeIn>
              );
            })}
          </div>

          {archivedGames.length > 0 && (
            <FadeIn>
              <p className="text-on-surface-variant/70 text-sm mt-14">
                A couple of earlier experiments that didn&apos;t earn their spot.{' '}
                <Link
                  href="/play/archived"
                  className="inline-flex items-center gap-1 text-primary/80 hover:text-primary font-label text-xs uppercase tracking-luxe transition-colors align-middle"
                >
                  Archived games
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </p>
            </FadeIn>
          )}
        </div>
      </section>
    </>
  );
}
