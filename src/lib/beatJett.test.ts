import { describe, expect, it } from 'vitest';
import {
  birthdle,
  cleanName,
  displayFor,
  isClosed,
  isDayKey,
  isPlausibleToday,
  outOfFive,
  outcome,
  seasonFor,
  tally,
  type Row,
} from './beatJett';

const NOW = new Date('2026-11-12T18:00:00Z');

describe('scoring', () => {
  it('normalizes out-of-five games', () => {
    expect(outOfFive(4)).toEqual({ points: 4, display: '4/5' });
    expect(outOfFive(9).points).toBe(5);
  });

  it('turns Birthdle guesses into higher-is-better points', () => {
    expect(birthdle(true, 1)).toEqual({ points: 6, display: '1/6' });
    expect(birthdle(true, 6)).toEqual({ points: 1, display: '6/6' });
    expect(birthdle(false, 6)).toEqual({ points: 0, display: 'X/6' });
  });

  it('round-trips points back to a display string', () => {
    for (let g = 1; g <= 6; g++) expect(displayFor('birthdle', birthdle(true, g).points)).toBe(`${g}/6`);
    expect(displayFor('birthdle', 0)).toBe('X/6');
    expect(displayFor('gut-check', 3)).toBe('3/5');
  });
});

describe('dates', () => {
  it('validates day keys', () => {
    expect(isDayKey('2026-11-12')).toBe(true);
    expect(isDayKey('2026-02-30')).toBe(false);
    expect(isDayKey('2026-1-5')).toBe(false);
  });

  it('accepts a player "today" within a day of UTC', () => {
    expect(isPlausibleToday('2026-11-11', NOW)).toBe(true);
    expect(isPlausibleToday('2026-11-13', NOW)).toBe(true);
    expect(isPlausibleToday('2026-11-09', NOW)).toBe(false);
  });

  it('closes a day two UTC days later', () => {
    expect(isClosed('2026-11-11', NOW)).toBe(false);
    expect(isClosed('2026-11-10', NOW)).toBe(true);
  });

  it('maps days to quarterly seasons', () => {
    expect(seasonFor('2026-11-12')).toEqual({ label: 'Q4 2026', months: ['2026-10', '2026-11', '2026-12'] });
    expect(seasonFor('2027-01-01').label).toBe('Q1 2027');
  });
});

describe('tally', () => {
  it('scores head-to-heads against Jett', () => {
    expect(outcome(4, 3)).toBe('win');
    expect(outcome(2, 3)).toBe('loss');
    expect(outcome(3, 3)).toBe('tie');
    expect(outcome(3, undefined)).toBe('pending');
  });

  it('works with a single visitor', () => {
    const rows: Row[] = [
      { day: '2026-11-12', game: 'gut-check', points: 3, isJett: true },
      { day: '2026-11-12', game: 'gut-check', points: 4, isJett: false, name: 'Izzy' },
    ];
    const t = tally(rows, '2026-11-12', NOW);
    expect(t.visitors).toBe(1);
    expect(t.jett).toBe(0);
    expect(t.jettToday['gut-check']).toBe('3/5');
    expect(t.wall).toEqual([
      { name: 'Izzy', game: 'gut-check', day: '2026-11-12', display: '4/5', jettDisplay: '3/5' },
    ]);
  });

  it('counts a skipped day as a forfeit once it closes, pending before', () => {
    const rows: Row[] = [
      { day: '2026-11-08', game: 'birthdle', points: 2, isJett: false },
      { day: '2026-11-12', game: 'birthdle', points: 2, isJett: false },
    ];
    const t = tally(rows, '2026-11-12', NOW);
    expect(t.visitors).toBe(1);
    expect(t.forfeits).toBe(1);
    expect(t.pending).toBe(1);
  });

  it('keeps unsigned or losing results off the wall', () => {
    const rows: Row[] = [
      { day: '2026-11-12', game: 'table-talk', points: 5, isJett: true },
      { day: '2026-11-12', game: 'table-talk', points: 2, isJett: false, name: 'Nope' },
      { day: '2026-11-12', game: 'table-talk', points: 1, isJett: false },
    ];
    const t = tally(rows, '2026-11-12', NOW);
    expect(t.jett).toBe(2);
    expect(t.wall).toHaveLength(0);
  });
});

describe('cleanName', () => {
  it('strips markup and trims to 24 chars', () => {
    expect(cleanName('  <b>Roxie</b>\n ')).toBe('b Roxie /b');
    expect(cleanName('x'.repeat(40))).toHaveLength(24);
    expect(cleanName(42)).toBe('');
  });
});
