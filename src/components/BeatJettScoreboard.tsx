'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { GAMES, GAME_LABELS, localDayKey, type Tally } from '@/lib/beatJett';

type Data =
  | ({ configured: true; season: string; today: string } & Tally)
  | { configured: false; season: string };

const GAME_HREF: Record<(typeof GAMES)[number], string> = {
  birthdle: '/play/birthdle',
  'table-talk': '/play/table-talk',
  'gut-check': '/play/gut-check',
};

/** Visitors vs. Jett — season tally, today's scores to beat, and the Beat Jett wall. */
export default function BeatJettScoreboard() {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    let live = true;
    fetch(`/api/beat-jett?today=${localDayKey()}`, { cache: 'no-store' })
      .then((r) => r.json())
      .then((d: Data) => live && setData(d))
      .catch(() => live && setData(null));
    return () => {
      live = false;
    };
  }, []);

  // Not set up yet (or Airtable unreachable): render nothing rather than a broken board.
  if (!data || !data.configured) return null;

  const leader =
    data.visitors > data.jett ? 'Visitors lead' : data.jett > data.visitors ? 'Jett leads' : 'All square';

  return (
    <section id="scoreboard" className="px-8 pt-10 bg-background scroll-mt-24">
      <div className="max-w-screen-2xl mx-auto">
        <div className="bg-surface-container-high rounded-[1.5rem] border border-white/[0.08] p-6 md:p-10">
          <div className="flex flex-wrap items-baseline justify-between gap-3 mb-8">
            <div>
              <span className="font-label text-xs uppercase tracking-luxe text-outline block mb-2">
                Season scoreboard · {data.season}
              </span>
              <h2 className="font-headline italic text-4xl md:text-5xl text-primary">Visitors vs. Jett</h2>
            </div>
            <span className="font-label text-[10px] uppercase tracking-luxe px-3 py-1 bg-primary/10 text-primary rounded-full">
              {leader}
            </span>
          </div>

          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 md:gap-10 mb-8 text-center">
            <div>
              <div className="font-headline italic text-6xl md:text-8xl text-primary tabular-nums leading-none">
                {data.visitors}
              </div>
              <div className="font-label text-xs uppercase tracking-luxe text-outline mt-3">Visitors</div>
            </div>
            <div className="font-headline italic text-2xl text-outline">vs.</div>
            <div>
              <div className="font-headline italic text-6xl md:text-8xl text-primary tabular-nums leading-none">
                {data.jett}
              </div>
              <div className="font-label text-xs uppercase tracking-luxe text-outline mt-3">Jett</div>
            </div>
          </div>

          <p className="text-on-surface-variant text-sm max-w-2xl mb-8">
            I play every daily game too. Beat my score and the Visitors get a point; lose and I do. If I
            skip a day, everyone who played it wins by forfeit
            {data.forfeits > 0 ? ` (I've forfeited ${data.forfeits} so far, which is embarrassing)` : ''}.
            Resets every quarter.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
            {GAMES.map((g) => {
              const score = data.jettToday[g];
              return (
                <Link
                  key={g}
                  href={GAME_HREF[g]}
                  className="group flex items-center justify-between rounded-xl bg-surface-container-highest border border-white/[0.06] px-4 py-3 hover:border-primary/25 transition-colors"
                >
                  <span>
                    <span className="block font-headline italic text-lg text-primary">{GAME_LABELS[g]}</span>
                    <span className="block text-xs text-on-surface-variant">
                      {score ? `Jett today: ${score}` : "Jett hasn't played yet"}
                    </span>
                  </span>
                  <span className="material-symbols-outlined text-primary/70 group-hover:text-primary text-base">
                    arrow_forward
                  </span>
                </Link>
              );
            })}
          </div>

          <div>
            <span className="font-label text-xs uppercase tracking-luxe text-outline block mb-4">
              The Beat Jett wall
            </span>
            {data.wall.length === 0 ? (
              <p className="text-on-surface-variant text-sm">
                Nobody&apos;s signed it this season. Could be you.
              </p>
            ) : (
              <ul className="flex flex-wrap gap-2">
                {data.wall.map((w, i) => (
                  <li
                    key={`${w.name}-${w.day}-${w.game}-${i}`}
                    className="rounded-full bg-primary/10 text-primary px-3 py-1.5 text-sm"
                    title={`${GAME_LABELS[w.game]} · ${w.day}`}
                  >
                    <span className="font-medium">{w.name}</span>
                    <span className="text-primary/60">
                      {' '}
                      · {GAME_LABELS[w.game]} {w.display} vs. {w.jettDisplay}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
