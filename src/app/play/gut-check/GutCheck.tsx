'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  dayKey,
  addDays,
  prettyDate,
  dailyRoundIds,
  roundsByIds,
  isCorrect,
  score,
  parseState,
  emptyState,
  recordDaily,
  recordArchive,
  shareText,
  ROUNDS_PER_PUZZLE,
  type Round,
  type Answer,
  type GameState,
} from '@/lib/gutCheck/game';
import { pool, schedule } from '@/lib/gutCheck/puzzles';

const STORAGE_KEY = 'gutcheck:v1';
const ARCHIVE_DAYS = 10;

type Mode = 'daily' | 'practice' | 'archive';
type Phase = 'answering' | 'revealed';

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

function randomRoundIds(count: number): number[] {
  const ids = pool.map((r) => r.id);
  for (let i = ids.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [ids[i], ids[j]] = [ids[j], ids[i]];
  }
  return ids.slice(0, Math.min(count, ids.length));
}

export default function GutCheck() {
  const [mounted, setMounted] = useState(false);
  const [state, setState] = useState<GameState>(emptyState());
  const today = useMemo(() => dayKey(), []);

  // run config
  const [mode, setMode] = useState<Mode>('daily');
  const [runDate, setRunDate] = useState<string>(today); // date the puzzle belongs to (daily/archive)
  const [roundIds, setRoundIds] = useState<number[]>([]);
  const [started, setStarted] = useState(false);
  const [showArchive, setShowArchive] = useState(false);

  // in-run progress
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('answering');
  const [picks, setPicks] = useState<number[]>([]); // spot-ai selection / which-won as [0|1]
  const [results, setResults] = useState<boolean[]>([]);
  const [done, setDone] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setState(loadState());
    setMounted(true);
  }, []);

  const rounds = useMemo(() => roundsByIds(roundIds, pool), [roundIds]);
  const current: Round | undefined = rounds[index];
  const finished = started && done;
  const alreadyDidToday = Boolean(state.history[today]);

  function beginRun(nextMode: Mode, date: string) {
    const ids =
      nextMode === 'practice'
        ? randomRoundIds(ROUNDS_PER_PUZZLE)
        : dailyRoundIds(date, pool, schedule);
    setMode(nextMode);
    setRunDate(date);
    setRoundIds(ids);
    setIndex(0);
    setPhase('answering');
    setPicks([]);
    setResults([]);
    setDone(false);
    setCopied(false);
    setStarted(true);
    setShowArchive(false);
  }

  function togglePick(i: number) {
    if (phase === 'revealed' || !current) return;
    if (current.type === 'which-won') {
      setPicks([i]);
    } else {
      setPicks((p) => (p.includes(i) ? p.filter((x) => x !== i) : [...p, i]));
    }
  }

  function lockIn() {
    if (!current || picks.length === 0) return;
    const answer: Answer =
      current.type === 'which-won'
        ? { type: 'which-won', pick: picks[0] === 0 ? 'a' : 'b' }
        : { type: 'spot-ai', picks };
    setResults((r) => [...r, isCorrect(current, answer)]);
    setPhase('revealed');
  }

  function next() {
    if (index + 1 < rounds.length) {
      setIndex(index + 1);
      setPhase('answering');
      setPicks([]);
      return;
    }
    // finishing the run
    setDone(true);
    if (mode === 'practice') return; // nothing to persist
    const finalScore = score(results);
    setState((prev) => {
      const updated =
        runDate === today
          ? recordDaily(prev, today, finalScore)
          : recordArchive(prev, runDate, finalScore);
      saveState(updated);
      return updated;
    });
  }

  async function copyShare() {
    const text = shareText(runDate, results);
    try {
      await navigator.clipboard.writeText(text);
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
        {showArchive ? (
          <ArchivePicker
            today={today}
            state={state}
            onPick={(d) => beginRun(d === today ? 'daily' : 'archive', d)}
            onBack={() => setShowArchive(false)}
          />
        ) : (
          <div className="bg-surface-container-highest rounded-[1.25rem] border border-white/[0.08] shadow-soft p-8">
            {alreadyDidToday ? (
              <>
                <p className="font-label text-xs uppercase tracking-luxe text-outline mb-2">
                  {prettyDate(today)} — done
                </p>
                <p className="font-headline italic text-4xl text-primary mb-2">
                  {state.history[today].score}/{ROUNDS_PER_PUZZLE}
                </p>
                <p className="text-on-surface-variant text-sm mb-6">
                  Current streak {state.streak} · best {state.maxStreak}. Come back tomorrow
                  for a fresh five.
                </p>
              </>
            ) : (
              <>
                <p className="text-on-surface-variant leading-relaxed mb-6">
                  Five rounds. Some ask which piece of copy actually won; some ask which
                  line a machine wrote. Pick, then see the real answer. One puzzle a day —
                  streak included.
                </p>
                <button
                  onClick={() => beginRun('daily', today)}
                  className="w-full border border-primary/40 text-primary px-6 py-4 rounded-md font-label uppercase tracking-luxe text-sm hover:bg-primary hover:text-on-primary transition-all"
                >
                  Play {prettyDate(today)}
                </button>
              </>
            )}
            <div className="flex gap-3 mt-3">
              <button
                onClick={() => beginRun('practice', today)}
                className="flex-1 border border-white/10 text-on-surface/70 px-4 py-3 rounded-md font-label uppercase tracking-luxe text-xs hover:border-primary/30 hover:text-primary transition-all"
              >
                Practice
              </button>
              <button
                onClick={() => setShowArchive(true)}
                className="flex-1 border border-white/10 text-on-surface/70 px-4 py-3 rounded-md font-label uppercase tracking-luxe text-xs hover:border-primary/30 hover:text-primary transition-all"
              >
                Past days
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Summary
  if (finished) {
    const s = score(results);
    return (
      <div>
        <Header />
        <div className="bg-surface-container-highest rounded-[1.25rem] border border-white/[0.08] shadow-soft p-8 text-center">
          <p className="font-label text-xs uppercase tracking-luxe text-outline mb-3">
            {mode === 'practice' ? 'Practice' : prettyDate(runDate)}
          </p>
          <p className="font-headline italic text-6xl text-primary leading-none mb-4">
            {s}/{rounds.length}
          </p>
          <div className="text-3xl mb-6" aria-hidden="true">
            {results.map((c, i) => (
              <span key={i} className={c ? '' : 'opacity-30'}>
                {c ? '🟩' : '⬜'}
              </span>
            ))}
          </div>
          {mode !== 'practice' && runDate === today && (
            <p className="text-on-surface-variant text-sm mb-6">
              Streak {state.streak} · best {state.maxStreak}
            </p>
          )}

          {mode !== 'practice' && (
            <button
              onClick={copyShare}
              className="w-full border border-primary/40 text-primary px-6 py-3 rounded-md font-label uppercase tracking-luxe text-sm hover:bg-primary hover:text-on-primary transition-all mb-3"
            >
              {copied ? 'Copied' : 'Share result'}
            </button>
          )}

          <div className="flex gap-3">
            {mode === 'practice' ? (
              <button
                onClick={() => beginRun('practice', today)}
                className="flex-1 border border-primary/40 text-primary px-4 py-3 rounded-md font-label uppercase tracking-luxe text-xs hover:bg-primary hover:text-on-primary transition-all"
              >
                New round
              </button>
            ) : (
              <button
                onClick={() => beginRun('practice', today)}
                className="flex-1 border border-white/10 text-on-surface/70 px-4 py-3 rounded-md font-label uppercase tracking-luxe text-xs hover:border-primary/30 hover:text-primary transition-all"
              >
                Practice more
              </button>
            )}
            <button
              onClick={() => {
                setStarted(false);
                setShowArchive(mode === 'archive');
              }}
              className="flex-1 border border-white/10 text-on-surface/70 px-4 py-3 rounded-md font-label uppercase tracking-luxe text-xs hover:border-primary/30 hover:text-primary transition-all"
            >
              {mode === 'archive' ? 'Back to archive' : 'Done'}
            </button>
          </div>
        </div>

        <Recap rounds={rounds} results={results} />
      </div>
    );
  }

  // Playing a round
  if (!current) return null;
  const roundCorrect = phase === 'revealed' ? results[index] : null;

  return (
    <div>
      <Header />
      <div className="bg-surface-container-highest rounded-[1.25rem] border border-white/[0.08] shadow-soft p-8">
        <div className="flex items-center justify-between mb-6">
          <span className="font-label text-xs uppercase tracking-luxe text-outline">
            Round {index + 1} / {rounds.length}
          </span>
          <span className="font-label text-xs uppercase tracking-luxe text-outline">
            {mode === 'practice'
              ? 'Practice'
              : mode === 'archive'
                ? prettyDate(runDate)
                : 'Daily'}
          </span>
        </div>

        <p className="font-label text-xs uppercase tracking-luxe text-primary/70 mb-2">
          {current.type === 'which-won' ? 'Which one won?' : 'Spot the AI'}
        </p>
        <p className="text-on-surface-variant text-sm mb-6">{current.context}</p>

        {current.type === 'which-won' ? (
          <div className="space-y-3">
            {(['a', 'b'] as const).map((key, i) => {
              const selected = picks[0] === i;
              const isWinner = current.winner === key;
              const showState = phase === 'revealed';
              return (
                <button
                  key={key}
                  onClick={() => togglePick(i)}
                  disabled={showState}
                  className={[
                    'w-full text-left p-4 rounded-xl border transition-all',
                    showState
                      ? isWinner
                        ? 'border-primary bg-primary/10 text-on-surface'
                        : selected
                          ? 'border-red-400/40 bg-red-400/5 text-on-surface-variant'
                          : 'border-white/5 text-on-surface-variant opacity-60'
                      : selected
                        ? 'border-primary bg-primary/5 text-on-surface'
                        : 'border-white/10 text-on-surface-variant hover:border-primary/30',
                  ].join(' ')}
                >
                  <span className="font-label text-[10px] uppercase tracking-luxe text-outline mr-2">
                    {key}
                  </span>
                  {key === 'a' ? current.a : current.b}
                  {showState && isWinner && (
                    <span className="material-symbols-outlined text-primary text-sm align-middle ml-2">
                      check_circle
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="space-y-3">
            {current.options.map((opt, i) => {
              const selected = picks.includes(i);
              const isAi = current.aiIndices.includes(i);
              const showState = phase === 'revealed';
              return (
                <button
                  key={i}
                  onClick={() => togglePick(i)}
                  disabled={showState}
                  className={[
                    'w-full text-left p-4 rounded-xl border transition-all',
                    showState
                      ? isAi
                        ? 'border-primary bg-primary/10 text-on-surface'
                        : selected
                          ? 'border-red-400/40 bg-red-400/5 text-on-surface-variant'
                          : 'border-white/5 text-on-surface-variant opacity-60'
                      : selected
                        ? 'border-primary bg-primary/5 text-on-surface'
                        : 'border-white/10 text-on-surface-variant hover:border-primary/30',
                  ].join(' ')}
                >
                  {opt}
                  {showState && isAi && (
                    <span className="font-label text-[10px] uppercase tracking-luxe text-primary ml-2">
                      AI
                    </span>
                  )}
                </button>
              );
            })}
            {phase === 'answering' && (
              <p className="text-outline text-xs">
                Select every line you think a machine wrote — could be more than one.
              </p>
            )}
          </div>
        )}

        {phase === 'answering' ? (
          <button
            onClick={lockIn}
            disabled={picks.length === 0}
            className="w-full mt-6 border border-primary/40 text-primary px-6 py-3 rounded-md font-label uppercase tracking-luxe text-sm enabled:hover:bg-primary enabled:hover:text-on-primary transition-all disabled:opacity-40"
          >
            Lock in
          </button>
        ) : (
          <div className="mt-6">
            <div
              className={`rounded-xl border p-4 mb-4 ${
                roundCorrect
                  ? 'border-primary/30 bg-primary/5'
                  : 'border-white/10 bg-surface-container-low'
              }`}
            >
              <p className="font-label text-xs uppercase tracking-luxe mb-2 text-primary">
                {roundCorrect ? 'Nailed it' : 'Not this time'}
              </p>
              {current.type === 'which-won' ? (
                <>
                  <p className="text-on-surface text-sm mb-1">{current.metric}</p>
                  <p className="text-outline text-xs">Source: {current.source}</p>
                </>
              ) : (
                <p className="text-on-surface-variant text-sm">{current.explain}</p>
              )}
            </div>
            <button
              onClick={next}
              className="w-full border border-primary/40 text-primary px-6 py-3 rounded-md font-label uppercase tracking-luxe text-sm hover:bg-primary hover:text-on-primary transition-all"
            >
              {index + 1 < rounds.length ? 'Next round' : 'See result'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="mb-6">
      <h1 className="font-headline italic text-5xl text-primary leading-tight">Gut Check</h1>
      <p className="text-outline text-sm mt-1">A daily read on your marketing instinct.</p>
    </div>
  );
}

function ArchivePicker({
  today,
  state,
  onPick,
  onBack,
}: {
  today: string;
  state: GameState;
  onPick: (date: string) => void;
  onBack: () => void;
}) {
  const dates = Array.from({ length: ARCHIVE_DAYS }, (_, i) => addDays(today, -i));
  return (
    <div className="bg-surface-container-highest rounded-[1.25rem] border border-white/[0.08] shadow-soft p-8">
      <div className="flex items-center justify-between mb-5">
        <p className="font-label text-xs uppercase tracking-luxe text-outline">Past days</p>
        <button
          onClick={onBack}
          className="font-label text-xs uppercase tracking-luxe text-on-surface/60 hover:text-primary transition-colors"
        >
          Back
        </button>
      </div>
      <div className="space-y-2">
        {dates.map((d) => {
          const played = state.history[d];
          return (
            <button
              key={d}
              onClick={() => onPick(d)}
              className="w-full flex items-center justify-between p-4 rounded-xl border border-white/10 text-on-surface-variant hover:border-primary/30 hover:text-primary transition-all"
            >
              <span>
                {prettyDate(d)}
                {d === today && (
                  <span className="font-label text-[10px] uppercase tracking-luxe text-outline ml-2">
                    today
                  </span>
                )}
              </span>
              <span className="font-label text-xs uppercase tracking-luxe">
                {played ? `${played.score}/${ROUNDS_PER_PUZZLE}` : 'Play'}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Recap({ rounds, results }: { rounds: Round[]; results: boolean[] }) {
  return (
    <div className="mt-4 bg-surface-container-low rounded-[1.25rem] border border-white/[0.06] p-6">
      <p className="font-label text-xs uppercase tracking-luxe text-outline mb-4">The recap</p>
      <ol className="space-y-4">
        {rounds.map((r, i) => (
          <li key={r.id} className="flex gap-3 text-sm">
            <span className={results[i] ? '' : 'opacity-30'} aria-hidden="true">
              {results[i] ? '🟩' : '⬜'}
            </span>
            <div>
              <p className="text-on-surface-variant">{r.context}</p>
              <p className="text-outline text-xs mt-1">
                {r.type === 'which-won'
                  ? `Winner: ${r.winner === 'a' ? r.a : r.b} — ${r.metric}`
                  : r.explain}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
