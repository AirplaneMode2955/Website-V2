import { describe, it, expect } from 'vitest';
import {
  dayKey,
  addDays,
  isConsecutive,
  prettyDate,
  dailyRoundIds,
  roundsByIds,
  isCorrect,
  score,
  emptyState,
  parseState,
  recordDaily,
  recordArchive,
  shareText,
  ROUNDS_PER_PUZZLE,
  type Round,
} from './game';

const testPool: Round[] = [
  { id: 1, type: 'which-won', context: 'c', a: 'A', b: 'B', winner: 'a', metric: 'm', source: 's' },
  { id: 2, type: 'which-won', context: 'c', a: 'A', b: 'B', winner: 'b', metric: 'm', source: 's' },
  { id: 3, type: 'which-won', context: 'c', a: 'A', b: 'B', winner: 'a', metric: 'm', source: 's' },
  { id: 4, type: 'which-won', context: 'c', a: 'A', b: 'B', winner: 'b', metric: 'm', source: 's' },
  { id: 5, type: 'spot-ai', context: 'c', options: ['w', 'x', 'y'], aiIndices: [1], explain: 'e' },
  { id: 6, type: 'spot-ai', context: 'c', options: ['w', 'x', 'y'], aiIndices: [0, 2], explain: 'e' },
  { id: 7, type: 'spot-ai', context: 'c', options: ['w', 'x', 'y'], aiIndices: [2], explain: 'e' },
];

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
    expect(isConsecutive('2026-09-30', '2026-10-01')).toBe(true);
  });

  it('prettyDate renders "Mon D"', () => {
    expect(prettyDate('2026-09-08')).toBe('Sep 8');
    expect(prettyDate('2026-01-31')).toBe('Jan 31');
  });
});

describe('dailyRoundIds', () => {
  it('returns exactly ROUNDS_PER_PUZZLE distinct ids', () => {
    const ids = dailyRoundIds('2026-09-08', testPool);
    expect(ids).toHaveLength(ROUNDS_PER_PUZZLE);
    expect(new Set(ids).size).toBe(ROUNDS_PER_PUZZLE);
  });

  it('is deterministic for a given date', () => {
    expect(dailyRoundIds('2026-09-08', testPool)).toEqual(
      dailyRoundIds('2026-09-08', testPool),
    );
  });

  it('varies by date', () => {
    const a = dailyRoundIds('2026-09-08', testPool).join(',');
    const b = dailyRoundIds('2026-09-09', testPool).join(',');
    expect(a).not.toBe(b);
  });

  it('includes at least one of each type when the pool has both', () => {
    for (const d of ['2026-09-08', '2026-09-09', '2026-09-10', '2026-11-22', '2027-02-14']) {
      const rounds = roundsByIds(dailyRoundIds(d, testPool), testPool);
      expect(rounds.some((r) => r.type === 'which-won')).toBe(true);
      expect(rounds.some((r) => r.type === 'spot-ai')).toBe(true);
    }
  });

  it('honours an explicit schedule entry', () => {
    expect(dailyRoundIds('2026-09-08', testPool, { '2026-09-08': [7, 6, 5, 4, 3] })).toEqual([
      7, 6, 5, 4, 3,
    ]);
  });
});

describe('isCorrect', () => {
  const ww = testPool[0]; // winner 'a'
  const saSingle = testPool[4]; // aiIndices [1]
  const saMulti = testPool[5]; // aiIndices [0,2]

  it('scores which-won by the winner', () => {
    expect(isCorrect(ww, { type: 'which-won', pick: 'a' })).toBe(true);
    expect(isCorrect(ww, { type: 'which-won', pick: 'b' })).toBe(false);
  });

  it('scores spot-ai only on an exact set match', () => {
    expect(isCorrect(saSingle, { type: 'spot-ai', picks: [1] })).toBe(true);
    expect(isCorrect(saSingle, { type: 'spot-ai', picks: [1, 2] })).toBe(false);
    expect(isCorrect(saSingle, { type: 'spot-ai', picks: [] })).toBe(false);
    expect(isCorrect(saMulti, { type: 'spot-ai', picks: [2, 0] })).toBe(true);
    expect(isCorrect(saMulti, { type: 'spot-ai', picks: [0] })).toBe(false);
  });

  it('is false when answer type does not match round type', () => {
    expect(isCorrect(ww, { type: 'spot-ai', picks: [0] })).toBe(false);
  });
});

describe('score', () => {
  it('counts correct flags', () => {
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
    expect(s.lastCompletedDate).toBe('2026-09-08');
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

describe('recordArchive', () => {
  it('adds history without touching the streak', () => {
    const daily = recordDaily(emptyState(), '2026-09-08', 3);
    const withArchive = recordArchive(daily, '2026-09-01', 5);
    expect(withArchive.streak).toBe(daily.streak);
    expect(withArchive.lastCompletedDate).toBe('2026-09-08');
    expect(withArchive.history['2026-09-01']).toEqual({ score: 5 });
  });

  it('does not overwrite an existing history entry', () => {
    const s = recordArchive(emptyState(), '2026-09-01', 5);
    expect(recordArchive(s, '2026-09-01', 0)).toBe(s);
  });
});

describe('shareText', () => {
  const CTA = 'Think your marketing instinct is better? Try it: https://jettiverson.com/play/gut-check';

  it('formats the card for each score with the invite link', () => {
    expect(shareText('2026-09-08', [true, true, true, true, true])).toBe(
      `Gut Check · Sep 8 — 5/5\n🟩🟩🟩🟩🟩\n${CTA}`,
    );
    expect(shareText('2026-09-08', [true, false, true, false, true])).toBe(
      `Gut Check · Sep 8 — 3/5\n🟩⬜🟩⬜🟩\n${CTA}`,
    );
    expect(shareText('2026-09-08', [false, false, false, false, false])).toBe(
      `Gut Check · Sep 8 — 0/5\n⬜⬜⬜⬜⬜\n${CTA}`,
    );
  });
});
