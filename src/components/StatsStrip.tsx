import FadeIn from '@/components/FadeIn';
import RoastTimer from '@/components/RoastTimer';
import { golfStats } from '@/data/siteStats';
import { getChessRating, getEpisodeCount } from '@/lib/siteStats';

type Tile = { value: string; label: string; href?: string };

/**
 * Live stats band: chess rating (Chess.com), podcast episodes (YouTube feed),
 * golf numbers (hand-updated in src/data/siteStats.ts), and the roast timer.
 * Any number that can't be fetched or isn't filled in simply drops out.
 */
export default async function StatsStrip({ className = '' }: { className?: string }) {
  const [chess, episodes] = await Promise.all([getChessRating(), getEpisodeCount()]);

  const tiles: Tile[] = [];
  if (chess) {
    tiles.push({
      value: chess.rating.toLocaleString('en-US'),
      label: `Chess.com ${chess.timeControl.toLowerCase()} rating`,
      href: '/play/play-me-chess',
    });
  }
  if (episodes > 0) {
    tiles.push({ value: String(episodes), label: 'Commute 2 Work episodes', href: '/content' });
  }
  if (golfStats.handicap !== null) {
    tiles.push({ value: golfStats.handicap.toFixed(1), label: 'Golf handicap' });
  }
  if (golfStats.coursesPlayed !== null) {
    tiles.push({
      value: `${golfStats.coursesPlayed}/${golfStats.totalCourses}`,
      label: 'Utah courses played',
      href: 'https://utah-golf-tinder.vercel.app/',
    });
  }

  const tileClass =
    'block h-full rounded-2xl bg-surface-container-highest border border-white/[0.06] px-6 py-6';

  return (
    <section className={`px-8 bg-background ${className}`}>
      <div className="max-w-screen-2xl mx-auto">
        <FadeIn>
          <div className="flex flex-wrap gap-3">
            {tiles.map((t) => {
              const inner = (
                <>
                  <div className="font-headline italic text-4xl md:text-5xl text-primary tabular-nums leading-none">
                    {t.value}
                  </div>
                  <div className="font-label text-xs uppercase tracking-luxe text-outline mt-3">{t.label}</div>
                </>
              );
              const external = t.href?.startsWith('http');
              return (
                <div key={t.label} className="flex-1 basis-[calc(50%-0.375rem)] lg:basis-0 min-w-0">
                  {t.href ? (
                    <a
                      href={t.href}
                      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className={`${tileClass} hover:border-primary/25 transition-colors`}
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className={tileClass}>{inner}</div>
                  )}
                </div>
              );
            })}
            <div className={`${tileClass} !h-auto basis-full lg:basis-0 lg:flex-[2] min-w-0`}>
              <RoastTimer />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
