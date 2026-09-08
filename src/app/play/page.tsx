import type { Metadata } from 'next';
import Link from 'next/link';
import FadeIn from '@/components/FadeIn';
import Subscribe from '@/components/Subscribe';
import { arcadeGames } from '@/lib/arcadeGames';

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
          className="absolute left-8 top-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, var(--color-primary) 0%, transparent 70%)',
            opacity: 0.06,
          }}
        />
        <div className="max-w-screen-2xl mx-auto relative z-10">
          <FadeIn>
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

      {/* ── Headliner: Gut Check ── */}
      <section className="py-20 px-8 bg-background">
        <div className="max-w-screen-2xl mx-auto">
          <FadeIn>
            <Link
              href="/play/gut-check"
              className="group block bg-surface-container-highest rounded-[1.5rem] border border-white/[0.08] shadow-soft hover:shadow-premium hover:border-primary/20 transition-all overflow-hidden"
            >
              <div className="grid md:grid-cols-[1.2fr_1fr]">
                <div className="p-10 md:p-14">
                  <span className="font-label text-[10px] uppercase tracking-luxe px-3 py-1 bg-primary-container text-on-primary-container rounded-full">
                    New · Daily
                  </span>
                  <h2 className="font-headline italic text-4xl md:text-5xl text-primary mt-6 mb-4 group-hover:text-primary-fixed transition-colors">
                    Gut Check
                  </h2>
                  <p className="text-on-surface-variant leading-relaxed max-w-md mb-6">
                    Five rounds a day. Which headline actually won? Which line was written by
                    a machine? A quick read on whether your marketing instinct is any good —
                    with the real numbers on the reveal.
                  </p>
                  <span className="inline-flex items-center gap-2 border border-primary/40 text-primary px-6 py-3 rounded-md font-label uppercase tracking-[0.18em] text-sm group-hover:bg-primary group-hover:text-on-primary transition-all">
                    Play today&apos;s round
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </span>
                </div>
                <div className="relative bg-surface-container-low border-t md:border-t-0 md:border-l border-white/[0.06] flex items-center justify-center p-10">
                  <div className="flex gap-3 text-4xl md:text-5xl" aria-hidden="true">
                    <span>🟩</span>
                    <span>🟩</span>
                    <span>🟩</span>
                    <span className="opacity-30">⬜</span>
                    <span>🟩</span>
                  </div>
                </div>
              </div>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ── The Arcade grid ── */}
      <section className="pb-28 px-8 bg-background">
        <div className="max-w-screen-2xl mx-auto">
          <FadeIn>
            <span className="font-label text-xs uppercase tracking-luxe text-outline mb-4 block">
              Everything else
            </span>
            <h2 className="font-headline italic text-4xl md:text-5xl text-primary mb-12">
              The Arcade
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {arcadeGames.map((game, i) => {
              const isHosted = game.mode === 'hosted';
              const href = isHosted ? `/play/${game.slug}` : game.href ?? '#';
              const cardClass =
                'group flex flex-col h-full bg-surface-container-highest rounded-[1.25rem] border border-white/[0.08] shadow-soft hover:border-primary/20 hover:shadow-premium transition-all p-8';
              const inner = (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-label text-[10px] uppercase tracking-luxe text-outline">
                      {game.year}
                    </span>
                    <span className="material-symbols-outlined text-primary/40 text-lg">
                      {isHosted ? 'sports_esports' : 'open_in_new'}
                    </span>
                  </div>
                  <h3 className="font-headline italic text-2xl text-primary mb-3 group-hover:text-primary-fixed transition-colors">
                    {game.title}
                  </h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed flex-1">
                    {game.blurb}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-6">
                    {game.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-label text-[10px] uppercase tracking-luxe px-3 py-1 bg-primary/10 text-primary rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="mt-6 text-primary font-label text-xs uppercase tracking-luxe">
                    {isHosted ? 'Play here →' : 'Visit site →'}
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
        </div>
      </section>

      <Subscribe
        heading="New games and pieces by email"
        blurb="I ship a new toy or article every few weeks. Get them when they land."
      />
    </>
  );
}
