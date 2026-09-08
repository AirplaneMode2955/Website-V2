/**
 * Gut Check — pure game logic. No React, no DOM, no storage.
 * Everything here is deterministic and unit-tested (game.test.ts).
 */

export type WhichWonRound = {
  id: number;
  type: 'which-won';
  /** Short framing, e.g. "Email subject line — B2B SaaS onboarding". */
  context: string;
  a: string;
  b: string;
  winner: 'a' | 'b';
  /** The real result shown on reveal, e.g. "38% vs 22% open rate". */
  metric: string;
  /** Where the figure comes from. Use "illustrative" if not independently sourced. */
  source: string;
};

export type SpotAiRound = {
  id: number;
  type: 'spot-ai';
  context: string;
  options: string[];
  /** Indices of the AI-generated option(s). */
  aiIndices: number[];
  /** The tells, shown on reveal. */
  explain: string;
};

export type Round = WhichWonRound | SpotAiRound;

export type Answer =
  | { type: 'which-won'; pick: 'a' | 'b' }
  | { type: 'spot-ai'; picks: number[] };

export const ROUNDS_PER_PUZZLE = 5;

export const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
] as const;

/* ────────────────────────────── dates ────────────────────────────── */

/** Local-date key, YYYY-MM-DD. */
export function dayKey(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/** Parse a YYYY-MM-DD key to a local Date at midnight. */
export function keyToDate(key: string): Date {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function addDays(key: string, n: number): string {
  const d = keyToDate(key);
  d.setDate(d.getDate() + n);
  return dayKey(d);
}

/** True when `next` is exactly the calendar day after `prev`. */
export function isConsecutive(prev: string, next: string): boolean {
  return addDays(prev, 1) === next;
}

/** "Sep 8" from a YYYY-MM-DD key. */
export function prettyDate(key: string): string {
  const [, m, d] = key.split('-').map(Number);
  return `${MONTHS[m - 1]} ${d}`;
}

/* ─────────────────────── deterministic selection ─────────────────── */

// xmur3 string hash -> seed, then mulberry32 PRNG. Small, stable, dependency-free.
function seedFrom(str: string): () => number {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  let a = (h ^= h >>> 16) >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffled<T>(items: T[], rand: () => number): T[] {
  const out = items.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/**
 * The 5 round ids for a given date. An explicit schedule entry wins; otherwise
 * the pool is shuffled deterministically by date and the first 5 taken, nudged
 * to include at least one of each round type when the pool allows.
 */
export function dailyRoundIds(
  dateKey: string,
  pool: Round[],
  schedule: Record<string, number[]> = {},
): number[] {
  if (schedule[dateKey]?.length) return schedule[dateKey].slice(0, ROUNDS_PER_PUZZLE);

  const rand = seedFrom(dateKey);
  const order = shuffled(pool, rand);
  const pick = order.slice(0, ROUNDS_PER_PUZZLE);

  const hasType = (t: Round['type']) => pick.some((r) => r.type === t);
  const poolHas = (t: Round['type']) => pool.some((r) => r.type === t);
  for (const t of ['which-won', 'spot-ai'] as const) {
    if (!hasType(t) && poolHas(t)) {
      const replacement = order.find((r) => r.type === t && !pick.includes(r));
      const victimIdx = pick.findIndex(
        (r) => pick.filter((x) => x.type === r.type).length > 1,
      );
      if (replacement && victimIdx !== -1) pick[victimIdx] = replacement;
    }
  }
  return pick.map((r) => r.id);
}

export function roundsByIds(ids: number[], pool: Round[]): Round[] {
  return ids
    .map((id) => pool.find((r) => r.id === id))
    .filter((r): r is Round => Boolean(r));
}

/* ────────────────────────────── scoring ─────────────────────────── */

export function isCorrect(round: Round, answer: Answer): boolean {
  if (round.type === 'which-won' && answer.type === 'which-won') {
    return answer.pick === round.winner;
  }
  if (round.type === 'spot-ai' && answer.type === 'spot-ai') {
    const want = [...round.aiIndices].sort((x, y) => x - y).join(',');
    const got = [...answer.picks].sort((x, y) => x - y).join(',');
    return want === got && want.length > 0;
  }
  return false;
}

export function score(correctFlags: boolean[]): number {
  return correctFlags.filter(Boolean).length;
}

/* ───────────────────────────── game state ───────────────────────── */

export type GameState = {
  lastCompletedDate: string | null;
  streak: number;
  maxStreak: number;
  history: Record<string, { score: number }>;
};

export function emptyState(): GameState {
  return { lastCompletedDate: null, streak: 0, maxStreak: 0, history: {} };
}

/** Tolerant parse — any bad shape returns a fresh state rather than throwing. */
export function parseState(raw: string | null): GameState {
  if (!raw) return emptyState();
  try {
    const p = JSON.parse(raw) as Partial<GameState>;
    return {
      lastCompletedDate:
        typeof p.lastCompletedDate === 'string' ? p.lastCompletedDate : null,
      streak: Number.isFinite(p.streak) ? Number(p.streak) : 0,
      maxStreak: Number.isFinite(p.maxStreak) ? Number(p.maxStreak) : 0,
      history: p.history && typeof p.history === 'object' ? p.history : {},
    };
  } catch {
    return emptyState();
  }
}

/**
 * Record a completion of the live daily puzzle for `todayKey`.
 * Idempotent for a day already recorded. A gap since the last completion
 * resets the streak, and this completion starts a new one at 1.
 */
export function recordDaily(
  state: GameState,
  todayKey: string,
  puzzleScore: number,
): GameState {
  if (state.history[todayKey]) return state;

  let streak: number;
  if (state.lastCompletedDate && isConsecutive(state.lastCompletedDate, todayKey)) {
    streak = state.streak + 1;
  } else {
    streak = 1;
  }

  return {
    lastCompletedDate: todayKey,
    streak,
    maxStreak: Math.max(state.maxStreak, streak),
    history: { ...state.history, [todayKey]: { score: puzzleScore } },
  };
}

/** Record an archive (past-date) play. History only — never touches the streak. */
export function recordArchive(
  state: GameState,
  dateKey: string,
  puzzleScore: number,
): GameState {
  if (state.history[dateKey]) return state;
  return { ...state, history: { ...state.history, [dateKey]: { score: puzzleScore } } };
}

/* ────────────────────────────── share ───────────────────────────── */

const SITE = 'https://jettiverson.com/play/gut-check';

export function shareText(dateKey: string, correctFlags: boolean[]): string {
  const grid = correctFlags.map((c) => (c ? '🟩' : '⬜')).join('');
  const n = score(correctFlags);
  return `Gut Check · ${prettyDate(dateKey)}\n${n}/${correctFlags.length}\n${grid}\n${SITE}`;
}
