/**
 * Table Talk — pure game logic. No React, no DOM, no storage.
 * Everything here is deterministic and unit-tested (game.test.ts).
 */

export type Club = {
  name: string;
  founded: number;
  capacity: number;
  titles: number;
};

export type StatKey = 'founded' | 'capacity' | 'titles';

export type Stat = {
  key: StatKey;
  /** Rendered with the emphasis phrase already inline, e.g. "Order these clubs by the year they were founded". */
  question: string;
  /** The bit of `question` worth bolding in the UI. */
  emphasis: string;
  /** e.g. "Oldest first". */
  direction: string;
  asc: boolean;
  format: (v: number) => string;
};

// Stable facts only — nothing that shifts week to week.
export const CLUBS: Club[] = [
  { name: 'Arsenal', founded: 1886, capacity: 60704, titles: 13 },
  { name: 'Aston Villa', founded: 1874, capacity: 42657, titles: 7 },
  { name: 'Chelsea', founded: 1905, capacity: 40173, titles: 6 },
  { name: 'Everton', founded: 1878, capacity: 39414, titles: 9 },
  { name: 'Liverpool', founded: 1892, capacity: 61276, titles: 19 },
  { name: 'Manchester City', founded: 1880, capacity: 53400, titles: 10 },
  { name: 'Manchester United', founded: 1878, capacity: 74310, titles: 20 },
  { name: 'Newcastle United', founded: 1892, capacity: 52305, titles: 4 },
  { name: 'Tottenham Hotspur', founded: 1882, capacity: 62850, titles: 2 },
  { name: 'Nottingham Forest', founded: 1865, capacity: 30404, titles: 1 },
  { name: 'Wolverhampton', founded: 1877, capacity: 31750, titles: 3 },
  { name: 'West Ham United', founded: 1895, capacity: 62500, titles: 0 },
  { name: 'Leeds United', founded: 1919, capacity: 37645, titles: 3 },
  { name: 'Sunderland', founded: 1879, capacity: 49000, titles: 6 },
];

export const STATS: Stat[] = [
  {
    key: 'founded',
    question: 'Order these clubs by the year they were founded',
    emphasis: 'the year they were founded',
    direction: 'Oldest first',
    asc: true,
    format: (v) => String(v),
  },
  {
    key: 'capacity',
    question: 'Order these clubs by current stadium capacity',
    emphasis: 'current stadium capacity',
    direction: 'Biggest ground first',
    asc: false,
    format: (v) => v.toLocaleString('en-US'),
  },
  {
    key: 'titles',
    question: 'Order these clubs by English top-flight titles won',
    emphasis: 'English top-flight titles won',
    direction: 'Most titles first',
    asc: false,
    format: (v) => String(v),
  },
];

export const CLUBS_PER_PUZZLE = 5;

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

export type Puzzle = {
  stat: Stat;
  /** The player's starting order — already shuffled, never sorted by `stat`. */
  clubs: Club[];
};

/** The puzzle for a given date — same stat, same 5 clubs, same starting order for everyone that day. */
export function dailyPuzzle(dateKey: string): Puzzle {
  return buildPuzzle(seedFrom(`table-talk:${dateKey}`));
}

/** A fresh, non-deterministic puzzle for practice mode. */
export function randomPuzzle(): Puzzle {
  return buildPuzzle(seedFrom(`table-talk-practice:${Date.now()}:${Math.random()}`));
}

function buildPuzzle(rand: () => number): Puzzle {
  const stat = STATS[Math.floor(rand() * STATS.length)];
  const picks = shuffled(CLUBS, rand).slice(0, CLUBS_PER_PUZZLE);
  const clubs = shuffled(picks, rand);
  return { stat, clubs };
}

/* ────────────────────────────── scoring ─────────────────────────── */

export function correctOrder(stat: Stat, clubs: Club[]): Club[] {
  return clubs
    .slice()
    .sort((a, b) => (stat.asc ? a[stat.key] - b[stat.key] : b[stat.key] - a[stat.key]));
}

/** Which positions in `order` already match the true sort — Wordle-style "in the right spot". */
export function correctFlags(stat: Stat, order: Club[]): boolean[] {
  const target = correctOrder(stat, order);
  return order.map((club, i) => target[i]?.name === club.name);
}

export function score(flags: boolean[]): number {
  return flags.filter(Boolean).length;
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

/* ────────────────────────────── share ───────────────────────────── */

export const SITE = 'https://jettiverson.com/play/table-talk';

export function shareText(dateKey: string, flags: boolean[]): string {
  const grid = flags.map((c) => (c ? '🟩' : '⬜')).join('');
  const n = score(flags);
  return (
    `Table Talk · ${prettyDate(dateKey)} — ${n}/${flags.length}\n` +
    `${grid}\n` +
    `Know your table? ${SITE}`
  );
}
