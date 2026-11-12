/**
 * Visitors vs. Jett — pure scoreboard logic. No React, no storage, no network.
 *
 * Jett plays each daily game too; his score is the one to beat that day.
 * Every visitor result is a head-to-head: beat Jett and Visitors get a point,
 * lose and Jett gets one. If Jett never plays a day, everyone who played it
 * wins by forfeit. Works the same whether one person played or a hundred.
 */

export const GAMES = ['birthdle', 'table-talk', 'gut-check'] as const;
export type GameId = (typeof GAMES)[number];

export const GAME_LABELS: Record<GameId, string> = {
  birthdle: 'Birthdle',
  'table-talk': 'Table Talk',
  'gut-check': 'Gut Check',
};

export function isGameId(v: unknown): v is GameId {
  return typeof v === 'string' && (GAMES as readonly string[]).includes(v);
}

/* ───────────────────────────── scoring ───────────────────────────── */

export type Result = { points: number; display: string };

/** Gut Check and Table Talk: correct out of 5. Higher is better. */
export function outOfFive(correct: number): Result {
  const c = Math.max(0, Math.min(5, Math.round(correct)));
  return { points: c, display: `${c}/5` };
}

/** Birthdle: solved in N of 6 guesses → 7 - N points; a loss is 0. */
export function birthdle(won: boolean, guesses: number): Result {
  if (!won) return { points: 0, display: 'X/6' };
  const g = Math.max(1, Math.min(6, Math.round(guesses)));
  return { points: 7 - g, display: `${g}/6` };
}

/** Largest legal points value per game (for server-side validation). */
export const MAX_POINTS: Record<GameId, number> = {
  birthdle: 6,
  'table-talk': 5,
  'gut-check': 5,
};

export function displayFor(game: GameId, points: number): string {
  if (game === 'birthdle') return points === 0 ? 'X/6' : `${7 - points}/6`;
  return `${points}/5`;
}

/* ────────────────────────────── dates ────────────────────────────── */

const DAY_RE = /^\d{4}-\d{2}-\d{2}$/;

export function isDayKey(v: unknown): v is string {
  if (typeof v !== 'string' || !DAY_RE.test(v)) return false;
  const [y, m, d] = v.split('-').map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  return dt.getUTCFullYear() === y && dt.getUTCMonth() === m - 1 && dt.getUTCDate() === d;
}

/** Local-date key, YYYY-MM-DD (matches what the daily games use). */
export function localDayKey(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function utcDayKey(d: Date = new Date()): string {
  return d.toISOString().slice(0, 10);
}

export function addDaysUtc(key: string, n: number): string {
  const [y, m, d] = key.split('-').map(Number);
  return utcDayKey(new Date(Date.UTC(y, m - 1, d + n)));
}

/** Players are in different time zones, so accept their "today" within a day of UTC's. */
export function isPlausibleToday(day: string, now: Date = new Date()): boolean {
  const today = utcDayKey(now);
  return day >= addDaysUtc(today, -1) && day <= addDaysUtc(today, 1);
}

/**
 * A day is "closed" — so a missing Jett score becomes a forfeit — once it is
 * over in every US time zone. Two UTC days later is a safe, simple rule.
 */
export function isClosed(day: string, now: Date = new Date()): boolean {
  return day < addDaysUtc(utcDayKey(now), -1);
}

export type Season = { label: string; months: string[] };

/** Seasons are calendar quarters. `months` are YYYY-MM prefixes. */
export function seasonFor(day: string): Season {
  const [y, m] = day.split('-').map(Number);
  const q = Math.floor((m - 1) / 3);
  const months = [1, 2, 3].map((i) => `${y}-${String(q * 3 + i).padStart(2, '0')}`);
  return { label: `Q${q + 1} ${y}`, months };
}

/* ───────────────────────────── tally ─────────────────────────────── */

export type Row = {
  day: string;
  game: GameId;
  points: number;
  isJett: boolean;
  name?: string;
  playedAt?: string;
};

export type Outcome = 'win' | 'loss' | 'tie' | 'pending';

/** A visitor's result against Jett's score (undefined = Jett hasn't played). */
export function outcome(visitor: number, jett: number | undefined): Outcome {
  if (jett === undefined) return 'pending';
  if (visitor > jett) return 'win';
  if (visitor < jett) return 'loss';
  return 'tie';
}

export type WallEntry = { name: string; game: GameId; day: string; display: string; jettDisplay: string };

export type Tally = {
  visitors: number;
  jett: number;
  ties: number;
  forfeits: number;
  pending: number;
  /** Jett's posted score per game for `today`, if he has played. */
  jettToday: Partial<Record<GameId, string>>;
  wall: WallEntry[];
};

export function jettScores(rows: Row[]): Map<string, number> {
  const m = new Map<string, number>();
  for (const r of rows) {
    if (!r.isJett) continue;
    const k = `${r.day}|${r.game}`;
    m.set(k, Math.max(m.get(k) ?? -1, r.points));
  }
  return m;
}

export function tally(rows: Row[], today: string, now: Date = new Date(), wallSize = 12): Tally {
  const jett = jettScores(rows);
  const t: Tally = { visitors: 0, jett: 0, ties: 0, forfeits: 0, pending: 0, jettToday: {}, wall: [] };

  for (const r of rows) {
    if (r.isJett) {
      if (r.day === today) t.jettToday[r.game] = displayFor(r.game, jett.get(`${r.day}|${r.game}`)!);
      continue;
    }
    const j = jett.get(`${r.day}|${r.game}`);
    const o = outcome(r.points, j);
    if (o === 'win') t.visitors++;
    else if (o === 'loss') t.jett++;
    else if (o === 'tie') t.ties++;
    else if (isClosed(r.day, now)) {
      t.visitors++;
      t.forfeits++;
    } else t.pending++;

    if (o === 'win' && r.name) {
      t.wall.push({
        name: r.name,
        game: r.game,
        day: r.day,
        display: displayFor(r.game, r.points),
        jettDisplay: displayFor(r.game, j!),
      });
    }
  }

  t.wall.sort((a, b) => (a.day < b.day ? 1 : a.day > b.day ? -1 : 0));
  t.wall = t.wall.slice(0, wallSize);
  return t;
}

/* ─────────────────────────── validation ──────────────────────────── */

export const PLAYER_ID_RE = /^[a-z0-9-]{8,40}$/i;

/** Wall names: short, single line, no markup characters. */
export function cleanName(v: unknown): string {
  if (typeof v !== 'string') return '';
  return v
    .replace(/[\r\n\t<>]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 24);
}
