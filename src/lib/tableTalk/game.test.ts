import { describe, it, expect } from 'vitest';
import {
  CLUBS,
  STATS,
  CLUBS_PER_PUZZLE,
  dayKey,
  addDays,
  isConsecutive,
  prettyDate,
  dailyPuzzle,
  randomPuzzle,
  correctOrder,
  correctFlags,
  score,
  emptyState,
  parseState,
  recordDaily,
  shareText,
} from './game';

describe('dates', () => {
  it('dayKey formats local date', () => {
    expect(dayKey(new Date(2026, 8, 8))).toBe('2026-09-08');
    expect(dayKey(new Date(2026, 0, 1))).toBe('2026-01-01');
  });

  it('addDays crosses month and year boundaries', () => {
    expect(addDays('2026-09-08', 1)).toBe('2026-09-09');
    expect(addDays('2026-09-30', 1)).toBe('2026-10-01');
    expect(addDays('2026-12-31', 1)).toBe('2027-01-01');
    expect(addDays('2026-03-01', -1)).toBe('2026-02-28');
  });

  it('isConsecutive is true only for the very next day', () => {
    expect(isConsecutive('2026-09-08', '2026-09-09')).toBe(true);
    expect(isConsecutive('2026-09-08', '2026-09-10')).toBe(false);
    expect(isConsecutive('2026-09-08', '2026-09-08')).toBe(false);
  });

  it('prettyDate renders "Mon D"', () => {
    expect(prettyDate('2026-09-08')).toBe('Sep 8');
    expect(prettyDate('2026-01-31')).toBe('Jan 31');
  });
});

describe('club and stat data', () => {
  it('has enough clubs to fill a puzzle', () => {
    expect(CLUBS.length).toBeGreaterThanOrEqual(CLUBS_PER_PUZZLE);
  });

  it('every club name is unique', () => {
    const names = CLUBS.map((c) => c.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it('every stat has a working formatter', () => {
    for (const s of STATS) {
      expect(typeof s.format(CLUBS[0][s.key])).toBe('string');
    }
  });
});

describe('dailyPuzzle', () => {
  it('returns exactly CLUBS_PER_PUZZLE distinct clubs', () => {
    const p = dailyPuzzle('2026-09-08');
    expect(p.clubs).toHaveLength(CLUBS_PER_PUZZLE);
    expect(new Set(p.clubs.map((c) => c.name)).size).toBe(CLUBS_PER_PUZZLE);
  });

  it('is deterministic for a given date', () => {
    const a = dailyPuzzle('2026-09-08');
    const b = dailyPuzzle('2026-09-08');
    expect(a.stat.key).toBe(b.stat.key);
    expect(a.clubs.map((c) => c.name)).toEqual(b.clubs.map((c) => c.name));
  });

  it('varies by date', () => {
    const dates = Array.from({ length: 30 }, (_, i) => addDays('2026-09-01', i));
    const signatures = new Set(
      dates.map((d) => {
        const p = dailyPuzzle(d);
        return p.stat.key + '|' + p.clubs.map((c) => c.name).join(',');
      }),
    );
    expect(signatures.size).toBeGreaterThan(1);
  });

  it('produces a resolvable puzzle for a year of dates', () => {
    for (let i = 0; i < 365; i++) {
      const d = addDays('2026-09-01', i);
      const p = dailyPuzzle(d);
      expect(p.clubs).toHaveLength(CLUBS_PER_PUZZLE);
      expect(STATS.some((s) => s.key === p.stat.key)).toBe(true);
    }
  });
});

describe('randomPuzzle', () => {
  it('also returns a valid, playable puzzle', () => {
    const p = randomPuzzle();
    expect(p.clubs).toHaveLength(CLUBS_PER_PUZZLE);
    expect(new Set(p.clubs.map((c) => c.name)).size).toBe(CLUBS_PER_PUZZLE);
  });
});

describe('scoring', () => {
  const stat = STATS.find((s) => s.key === 'founded')!; // ascending, oldest first
  const clubs = [
    { name: 'A', founded: 1900, capacity: 0, titles: 0 },
    { name: 'B', founded: 1880, capacity: 0, titles: 0 },
    { name: 'C', founded: 1890, capacity: 0, titles: 0 },
  ];

  it('correctOrder sorts ascending or descending per stat', () => {
    expect(correctOrder(stat, clubs).map((c) => c.name)).toEqual(['B', 'C', 'A']);
    const desc = STATS.find((s) => s.key === 'titles')!;
    const t = [
      { name: 'X', founded: 0, capacity: 0, titles: 1 },
      { name: 'Y', founded: 0, capacity: 0, titles: 3 },
      { name: 'Z', founded: 0, capacity: 0, titles: 2 },
    ];
    expect(correctOrder(desc, t).map((c) => c.name)).toEqual(['Y', 'Z', 'X']);
  });

  it('correctFlags marks only positions already in the right spot', () => {
    // Player already has the right order.
    expect(correctFlags(stat, [clubs[1], clubs[2], clubs[0]])).toEqual([true, true, true]);
    // Player has the exact wrong (reversed) order.
    expect(correctFlags(stat, [clubs[0], clubs[2], clubs[1]])).toEqual([false, true, false]);
  });

  it('score counts correct flags', () => {
    expect(score([true, true, true, true, true])).toBe(5);
    expect(score([false, false, false, false, false])).toBe(0);
    expect(score([true, false, true, false, true])).toBe(3);
  });
});

describe('parseState', () => {
  it('returns empty state for null / garbage', () => {
    expect(parseState(null)).toEqual(emptyState());
    expect(parseState('not json')).toEqual(emptyState());
    expect(parseState('{"streak":"lots"}')).toEqual(emptyState());
  });

  it('round-trips a real state', () => {
    const s = recordDaily(emptyState(), '2026-09-08', 4);
    expect(parseState(JSON.stringify(s))).toEqual(s);
  });
});

describe('recordDaily — streak logic', () => {
  it('first ever play starts streak at 1', () => {
    const s = recordDaily(emptyState(), '2026-09-08', 3);
    expect(s.streak).toBe(1);
    expect(s.maxStreak).toBe(1);
    expect(s.history['2026-09-08']).toEqual({ score: 3 });
  });

  it('consecutive days increment the streak', () => {
    let s = recordDaily(emptyState(), '2026-09-08', 3);
    s = recordDaily(s, '2026-09-09', 5);
    s = recordDaily(s, '2026-09-10', 2);
    expect(s.streak).toBe(3);
    expect(s.maxStreak).toBe(3);
  });

  it('a skipped day resets the streak to 1 and keeps maxStreak', () => {
    let s = recordDaily(emptyState(), '2026-09-08', 3);
    s = recordDaily(s, '2026-09-09', 5);
    s = recordDaily(s, '2026-09-11', 4); // gap
    expect(s.streak).toBe(1);
    expect(s.maxStreak).toBe(2);
  });

  it('is idempotent for a day already recorded', () => {
    const first = recordDaily(emptyState(), '2026-09-08', 3);
    const again = recordDaily(first, '2026-09-08', 5);
    expect(again).toBe(first);
  });
});

describe('shareText', () => {
  const CTA = 'Know your table? https://jettiverson.com/play/table-talk';

  it('formats the card for each score with the invite link', () => {
    expect(shareText('2026-09-08', [true, true, true, true, true])).toBe(
      `Table Talk · Sep 8 — 5/5\n🟩🟩🟩🟩🟩\n${CTA}`,
    );
    expect(shareText('2026-09-08', [true, false, true, false, true])).toBe(
      `Table Talk · Sep 8 — 3/5\n🟩⬜🟩⬜🟩\n${CTA}`,
    );
    expect(shareText('2026-09-08', [false, false, false, false, false])).toBe(
      `Table Talk · Sep 8 — 0/5\n⬜⬜⬜⬜⬜\n${CTA}`,
    );
  });
});
