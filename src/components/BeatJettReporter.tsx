'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  GAME_LABELS,
  birthdle,
  localDayKey,
  outOfFive,
  type GameId,
  type Outcome,
  type Result,
} from '@/lib/beatJett';

/**
 * Watches one daily game's saved result (the games already keep it in
 * localStorage on this origin — Birthdle too, since its iframe is same-origin)
 * and, once today's puzzle is finished, reports it to the Visitors vs. Jett
 * scoreboard and shows how you did against Jett.
 *
 * Jett marks his own browser by visiting any game page with ?jett=<key> once.
 */

const SENT_KEY = 'beatjett:sent:v1';
const PLAYER_KEY = 'beatjett:player';
const JETT_KEY = 'beatjett:key';

type Sent = {
  isJett?: boolean;
  result?: Outcome;
  display: string;
  jettDisplay?: string | null;
  recordId?: string;
  signed?: string;
  visitors?: number;
};

function store(): Storage | null {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = store()?.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown) {
  try {
    store()?.setItem(key, JSON.stringify(value));
  } catch {
    /* storage blocked — the result just won't be remembered */
  }
}

function playerId(): string {
  const s = store();
  let id = s?.getItem(PLAYER_KEY) ?? '';
  if (!/^[a-z0-9-]{8,40}$/i.test(id)) {
    id =
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `p-${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
    try {
      s?.setItem(PLAYER_KEY, id);
    } catch {
      /* ignore */
    }
  }
  return id;
}

/** Today's finished result for a game, or null if not finished yet. */
function todaysResult(game: GameId, today: string): Result | null {
  if (game === 'birthdle') {
    // Birthdle keys its state by an unpadded local date: birthdle_state_2026-1-5
    const d = new Date();
    const key = `birthdle_state_${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    const st = readJson<{ guesses?: unknown[]; finished?: boolean; won?: boolean } | null>(key, null);
    if (!st?.finished || !Array.isArray(st.guesses)) return null;
    return birthdle(!!st.won, st.guesses.length);
  }
  const key = game === 'gut-check' ? 'gutcheck:v1' : 'tabletalk:v1';
  const st = readJson<{ history?: Record<string, { score?: number }> } | null>(key, null);
  const score = st?.history?.[today]?.score;
  return typeof score === 'number' ? outOfFive(score) : null;
}

export default function BeatJettReporter({ game }: { game: GameId }) {
  const [today] = useState(() => localDayKey());
  const [sent, setSent] = useState<Sent | null>(null);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const posting = useRef(false);

  const sentKey = `${game}|${today}`;

  // Capture ?jett=<key> once so Jett's browser posts the score to beat.
  useEffect(() => {
    const k = new URLSearchParams(window.location.search).get('jett');
    if (k) {
      try {
        store()?.setItem(JETT_KEY, k);
      } catch {
        /* ignore */
      }
    }
    const prior = readJson<Record<string, Sent>>(SENT_KEY, {})[sentKey];
    if (prior) setSent(prior);
  }, [sentKey]);

  const report = useCallback(async () => {
    if (posting.current) return;
    const all = readJson<Record<string, Sent>>(SENT_KEY, {});
    if (all[sentKey]) return;
    const r = todaysResult(game, today);
    if (!r) return;

    posting.current = true;
    try {
      const jettKey = store()?.getItem(JETT_KEY) || undefined;
      const res = await fetch('/api/beat-jett', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ game, day: today, points: r.points, playerId: playerId(), jettKey }),
      });
      if (res.status === 503) return; // scoreboard not set up yet — stay quiet
      const data = await res.json();
      if (!data.ok) return;
      const s: Sent = data.isJett
        ? { isJett: true, display: data.display, visitors: data.visitors }
        : { result: data.result, display: data.display, jettDisplay: data.jettDisplay, recordId: data.recordId };
      writeJson(SENT_KEY, { ...readJson<Record<string, Sent>>(SENT_KEY, {}), [sentKey]: s });
      setSent(s);
      setOpen(true);
    } catch {
      /* offline — try again on the next tick */
    } finally {
      posting.current = false;
    }
  }, [game, today, sentKey]);

  // The games save on finish; poll gently so we notice without touching their code.
  useEffect(() => {
    if (sent) return;
    report();
    const id = window.setInterval(report, 1500);
    return () => window.clearInterval(id);
  }, [sent, report]);

  async function sign(e: React.FormEvent) {
    e.preventDefault();
    if (!sent?.recordId || !name.trim()) return;
    setBusy(true);
    setError('');
    try {
      const res = await fetch('/api/beat-jett', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recordId: sent.recordId, playerId: playerId(), name }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error);
      const s = { ...sent, signed: data.name as string };
      writeJson(SENT_KEY, { ...readJson<Record<string, Sent>>(SENT_KEY, {}), [sentKey]: s });
      setSent(s);
    } catch {
      setError("Couldn't sign the wall. Try again in a sec.");
    } finally {
      setBusy(false);
    }
  }

  if (!sent) return null;

  const label = GAME_LABELS[game];
  let headline: string;
  let detail: string;
  if (sent.isJett) {
    headline = 'Score to beat: posted.';
    detail = `You put up ${sent.display} on ${label} today. ${sent.visitors ? `${sent.visitors} visitor${sent.visitors === 1 ? '' : 's'} played before you.` : 'Now we wait.'}`;
  } else if (sent.result === 'win') {
    headline = 'You beat Jett.';
    detail = `${sent.display} vs. his ${sent.jettDisplay}. Point to the Visitors.`;
  } else if (sent.result === 'loss') {
    headline = 'Jett wins this one.';
    detail = `His ${sent.jettDisplay} beat your ${sent.display}. Tomorrow's a new puzzle.`;
  } else if (sent.result === 'tie') {
    headline = 'Dead even.';
    detail = `You both went ${sent.display}. No points.`;
  } else {
    headline = "Jett hasn't played yet.";
    detail = `Your ${sent.display} is locked in. If he forgets to play today, you win by forfeit.`;
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 left-5 z-40 rounded-full bg-surface-container-highest border border-white/10 shadow-premium px-4 py-2 font-label text-[11px] uppercase tracking-luxe text-primary hover:border-primary/30 transition-colors"
      >
        You vs. Jett
      </button>
    );
  }

  return (
    <div
      role="status"
      className="fixed bottom-5 left-4 right-4 sm:left-5 sm:right-auto sm:w-[22rem] z-40 rounded-2xl bg-surface-container-highest border border-white/10 shadow-premium p-5"
    >
      <button
        type="button"
        onClick={() => setOpen(false)}
        aria-label="Minimize"
        className="absolute top-3 right-3 text-outline hover:text-primary transition-colors"
      >
        <span className="material-symbols-outlined text-base">close</span>
      </button>
      <span className="font-label text-[10px] uppercase tracking-luxe text-outline block mb-2">
        Visitors vs. Jett · {label}
      </span>
      <p className="font-headline italic text-2xl text-primary mb-1">{headline}</p>
      <p className="text-on-surface-variant text-sm leading-relaxed">{detail}</p>

      {sent.result === 'win' && !sent.signed && (
        <form onSubmit={sign} className="mt-4 flex gap-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={24}
            placeholder="Your name for the wall"
            aria-label="Your name for the Beat Jett wall"
            className="flex-1 min-w-0 rounded-md bg-surface-container-low border border-white/10 px-3 py-2 text-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary/50"
          />
          <button
            type="submit"
            disabled={busy || !name.trim()}
            className="rounded-md bg-primary text-on-primary px-4 py-2 font-label text-[11px] uppercase tracking-luxe disabled:opacity-50"
          >
            Sign
          </button>
        </form>
      )}
      {sent.signed && (
        <p className="mt-3 text-sm text-primary">Signed as {sent.signed}. You&apos;re on the wall.</p>
      )}
      {error && <p className="mt-2 text-xs text-[#e8a39a]">{error}</p>}

      <Link
        href="/play#scoreboard"
        className="mt-4 inline-flex items-center gap-1 font-label text-[11px] uppercase tracking-luxe text-primary/80 hover:text-primary transition-colors"
      >
        Season scoreboard
        <span className="material-symbols-outlined text-sm">arrow_forward</span>
      </Link>
    </div>
  );
}
