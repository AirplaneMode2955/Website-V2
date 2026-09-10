'use client';

import { useEffect, useMemo, useState } from 'react';
import { Reorder, useDragControls } from 'framer-motion';
import {
  dayKey,
  prettyDate,
  dailyPuzzle,
  randomPuzzle,
  correctOrder,
  correctFlags,
  score,
  parseState,
  emptyState,
  recordDaily,
  shareText,
  CLUBS_PER_PUZZLE,
  type Club,
  type Puzzle,
  type GameState,
} from '@/lib/tableTalk/game';

const STORAGE_KEY = 'tabletalk:v1';

type Mode = 'daily' | 'practice';

function loadState(): GameState {
  if (typeof window === 'undefined') return emptyState();
  try {
    return parseState(window.localStorage.getItem(STORAGE_KEY));
  } catch {
    return emptyState();
  }
}

function saveState(s: GameState) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  } catch {
    /* private mode / storage disabled — game still works, just no streak memory */
  }
}

export default function TableTalk() {
  const [mounted, setMounted] = useState(false);
  const [state, setState] = useState<GameState>(emptyState());
  const today = useMemo(() => dayKey(), []);

  const [mode, setMode] = useState<Mode>('daily');
  const [puzzle, setPuzzle] = useState<Puzzle | null>(null);
  const [order, setOrder] = useState<Club[]>([]);
  const [locked, setLocked] = useState(false);
  const [flags, setFlags] = useState<boolean[] | null>(null);
  const [started, setStarted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setState(loadState());
    setMounted(true);
  }, []);

  const alreadyDidToday = Boolean(state.history[today]);

  function beginRun(nextMode: Mode) {
    const p = nextMode === 'daily' ? dailyPuzzle(today) : randomPuzzle();
    setMode(nextMode);
    setPuzzle(p);
    setOrder(p.clubs.slice());
    setLocked(false);
    setFlags(null);
    setCopied(false);
    setStarted(true);
  }

  function move(i: number, dir: -1 | 1) {
    if (locked) return;
    const j = i + dir;
    if (j < 0 || j >= order.length) return;
    setOrder((prev) => {
      const next = prev.slice();
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  }

  function lockIn() {
    if (!puzzle || locked) return;
    const f = correctFlags(puzzle.stat, order);
    setFlags(f);
    setLocked(true);
    if (mode === 'daily') {
      setState((prev) => {
        const updated = recordDaily(prev, today, score(f));
        saveState(updated);
        return updated;
      });
    }
  }

  async function shareResult() {
    if (!flags) return;
    const text = shareText(today, flags);
    const nav = typeof navigator !== 'undefined' ? navigator : undefined;
    if (nav && typeof nav.share === 'function') {
      try {
        await nav.share({ title: 'Table Talk', text });
        return;
      } catch {
        /* user dismissed the share sheet — fall through to copy */
      }
    }
    try {
      await nav!.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
      window.prompt('Copy your result', text);
    }
  }

  /* ───────────────────────── render ───────────────────────── */

  if (!mounted) {
    return <div className="h-64 rounded-[1.25rem] bg-surface-container-low animate-pulse" />;
  }

  // Landing / not-yet-started
  if (!started) {
    return (
      <div>
        <Header />
        <div className="bg-surface-container-highest rounded-[1.25rem] border border-white/[0.08] shadow-soft p-8">
          {alreadyDidToday ? (
            <>
              <p className="font-label text-xs uppercase tracking-luxe text-outline mb-2">
                {prettyDate(today)} — done
              </p>
              <p className="font-headline italic text-4xl text-primary mb-2">
                {state.history[today].score}/{CLUBS_PER_PUZZLE}
              </p>
              <p className="text-on-surface-variant text-sm mb-6">
                Current streak {state.streak} · best {state.maxStreak}. Come back tomorrow
                for a fresh five.
              </p>
            </>
          ) : (
            <>
              <p className="text-on-surface-variant leading-relaxed mb-6">
                Five clubs, one hidden stat. Drag them into order — founding year, ground
                size, titles won, whatever today asks for. One shot a day, streak included.
              </p>
              <button
                onClick={() => beginRun('daily')}
                className="w-full border border-primary/40 text-primary px-6 py-4 rounded-md font-label uppercase tracking-luxe text-sm hover:bg-primary hover:text-on-primary transition-all"
              >
                Play {prettyDate(today)}
              </button>
            </>
          )}
          <button
            onClick={() => beginRun('practice')}
            className="w-full mt-3 border border-white/10 text-on-surface/70 px-4 py-3 rounded-md font-label uppercase tracking-luxe text-xs hover:border-primary/30 hover:text-primary transition-all"
          >
            Practice
          </button>
        </div>
      </div>
    );
  }

  if (!puzzle) return null;

  // Finished — summary
  if (locked && flags) {
    const s = score(flags);
    return (
      <div>
        <Header />
        <div className="bg-surface-container-highest rounded-[1.25rem] border border-white/[0.08] shadow-soft p-8 text-center">
          <p className="font-label text-xs uppercase tracking-luxe text-outline mb-3">
            {mode === 'practice' ? 'Practice' : prettyDate(today)}
          </p>
          <p className="font-headline italic text-6xl text-primary leading-none mb-4">
            {s}/{CLUBS_PER_PUZZLE}
          </p>
          <div className="text-3xl mb-6" aria-hidden="true">
            {flags.map((c, i) => (
              <span key={i} className={c ? '' : 'opacity-30'}>
                {c ? '🟩' : '⬜'}
              </span>
            ))}
          </div>

          <ResultList puzzle={puzzle} order={order} />

          {mode !== 'practice' && (
            <p className="text-on-surface-variant text-sm my-6">
              Streak {state.streak} · best {state.maxStreak}
            </p>
          )}

          {mode !== 'practice' && (
            <>
              <button
                onClick={shareResult}
                className="w-full border border-primary/40 text-primary px-6 py-3 rounded-md font-label uppercase tracking-luxe text-sm hover:bg-primary hover:text-on-primary transition-all mb-2 mt-6"
              >
                {copied ? 'Copied — paste it anywhere' : 'Share my score'}
              </button>
              <p className="text-outline text-xs mb-6">
                Sends your grid plus{' '}
                <span className="text-on-surface-variant">&ldquo;Know your table?&rdquo;</span>{' '}
                and the link.
              </p>
            </>
          )}

          <div className="flex gap-3 mt-6">
            <button
              onClick={() => beginRun('practice')}
              className="flex-1 border border-white/10 text-on-surface/70 px-4 py-3 rounded-md font-label uppercase tracking-luxe text-xs hover:border-primary/30 hover:text-primary transition-all"
            >
              {mode === 'practice' ? 'New round' : 'Practice more'}
            </button>
            <button
              onClick={() => setStarted(false)}
              className="flex-1 border border-white/10 text-on-surface/70 px-4 py-3 rounded-md font-label uppercase tracking-luxe text-xs hover:border-primary/30 hover:text-primary transition-all"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Playing
  return (
    <div>
      <Header />
      <div className="bg-surface-container-highest rounded-[1.25rem] border border-white/[0.08] shadow-soft p-8">
        <div className="flex items-center justify-between mb-6">
          <span className="font-label text-xs uppercase tracking-luxe text-outline">
            {mode === 'practice' ? 'Practice' : 'Daily'}
          </span>
          <span className="font-label text-xs uppercase tracking-luxe text-outline">
            {puzzle.stat.direction}
          </span>
        </div>

        <p className="text-on-surface text-base mb-1">
          Order these clubs by <b className="text-primary">{puzzle.stat.emphasis}</b>
        </p>
        <p className="text-outline text-xs uppercase tracking-wider mb-6">
          Drag to reorder, or use the arrows
        </p>

        <Reorder.Group
          axis="y"
          values={order}
          onReorder={setOrder}
          className="flex flex-col gap-2 list-none"
        >
          {order.map((club, i) => (
            <Row
              key={club.name}
              club={club}
              index={i}
              total={order.length}
              onMove={move}
            />
          ))}
        </Reorder.Group>

        <button
          onClick={lockIn}
          className="w-full mt-6 border border-primary/40 text-primary px-6 py-3 rounded-md font-label uppercase tracking-luxe text-sm hover:bg-primary hover:text-on-primary transition-all"
        >
          Lock it in
        </button>
      </div>
    </div>
  );
}

function Row({
  club,
  index,
  total,
  onMove,
}: {
  club: Club;
  index: number;
  total: number;
  onMove: (i: number, dir: -1 | 1) => void;
}) {
  const controls = useDragControls();
  return (
    <Reorder.Item
      value={club}
      dragListener={false}
      dragControls={controls}
      className="flex items-center gap-3 bg-surface-container-high border border-white/[0.08] rounded-xl px-4 py-3 touch-none"
      whileDrag={{ scale: 1.02, boxShadow: '0 8px 24px rgba(0,0,0,0.35)' }}
    >
      <span
        onPointerDown={(e) => controls.start(e)}
        className="material-symbols-outlined text-outline cursor-grab active:cursor-grabbing select-none shrink-0"
        aria-hidden="true"
      >
        drag_indicator
      </span>
      <span className="font-label text-xs text-outline w-4 text-center shrink-0">
        {index + 1}
      </span>
      <span className="flex-1 text-on-surface text-sm">{club.name}</span>
      <div className="flex flex-col gap-0.5 shrink-0">
        <button
          onClick={() => onMove(index, -1)}
          disabled={index === 0}
          aria-label={`Move ${club.name} up`}
          className="material-symbols-outlined text-base leading-none text-outline hover:text-primary disabled:opacity-20 disabled:hover:text-outline transition-colors"
        >
          keyboard_arrow_up
        </button>
        <button
          onClick={() => onMove(index, 1)}
          disabled={index === total - 1}
          aria-label={`Move ${club.name} down`}
          className="material-symbols-outlined text-base leading-none text-outline hover:text-primary disabled:opacity-20 disabled:hover:text-outline transition-colors"
        >
          keyboard_arrow_down
        </button>
      </div>
    </Reorder.Item>
  );
}

function ResultList({ puzzle, order }: { puzzle: Puzzle; order: Club[] }) {
  const target = correctOrder(puzzle.stat, order);
  return (
    <ul className="flex flex-col gap-2 text-left list-none">
      {order.map((club, i) => {
        const ok = target[i]?.name === club.name;
        return (
          <li
            key={club.name}
            className={[
              'flex items-center gap-3 rounded-xl px-4 py-3 border',
              ok
                ? 'border-primary/40 bg-primary/10'
                : 'border-red-400/30 bg-red-400/5',
            ].join(' ')}
          >
            <span className="font-label text-xs text-outline w-4 text-center shrink-0">
              {i + 1}
            </span>
            <span className="flex-1 text-on-surface text-sm">{club.name}</span>
            <span className="text-primary text-xs tabular-nums">
              {puzzle.stat.format(club[puzzle.stat.key])}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

function Header() {
  return (
    <div className="mb-6">
      <h1 className="font-headline italic text-5xl text-primary leading-tight">Table Talk</h1>
      <p className="text-outline text-sm mt-1">A daily test of who you actually know.</p>
    </div>
  );
}
