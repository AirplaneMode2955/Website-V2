import { describe, it, expect } from 'vitest';
import { pool, schedule } from './puzzles';
import { dailyRoundIds, ROUNDS_PER_PUZZLE } from './game';

describe('puzzle pool integrity', () => {
  it('has enough rounds to seed the archive and practice mode', () => {
    expect(pool.length).toBeGreaterThanOrEqual(ROUNDS_PER_PUZZLE * 2);
  });

  it('every round id is a positive integer and unique', () => {
    const ids = pool.map((r) => r.id);
    for (const id of ids) {
      expect(Number.isInteger(id)).toBe(true);
      expect(id).toBeGreaterThan(0);
    }
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('every round matches its variant shape', () => {
    for (const r of pool) {
      expect(r.context.trim().length).toBeGreaterThan(0);
      if (r.type === 'which-won') {
        expect(r.a.trim().length).toBeGreaterThan(0);
        expect(r.b.trim().length).toBeGreaterThan(0);
        expect(['a', 'b']).toContain(r.winner);
        expect(r.metric.trim().length).toBeGreaterThan(0);
        expect(r.source.trim().length).toBeGreaterThan(0);
      } else if (r.type === 'spot-ai') {
        expect(r.options.length).toBeGreaterThanOrEqual(3);
        expect(r.options.every((o) => o.trim().length > 0)).toBe(true);
        expect(r.aiIndices.length).toBeGreaterThan(0);
        expect(r.aiIndices.length).toBeLessThan(r.options.length);
        expect(new Set(r.aiIndices).size).toBe(r.aiIndices.length);
        for (const i of r.aiIndices) {
          expect(Number.isInteger(i)).toBe(true);
          expect(i).toBeGreaterThanOrEqual(0);
          expect(i).toBeLessThan(r.options.length);
        }
      } else {
        throw new Error(`unknown round type: ${JSON.stringify(r)}`);
      }
    }
  });

  it('has both round types represented', () => {
    expect(pool.some((r) => r.type === 'which-won')).toBe(true);
    expect(pool.some((r) => r.type === 'spot-ai')).toBe(true);
  });
});

describe('schedule integrity', () => {
  it('keys look like YYYY-MM-DD and reference exactly a full puzzle of real ids', () => {
    const ids = new Set(pool.map((r) => r.id));
    for (const [date, roundIds] of Object.entries(schedule)) {
      expect(date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(roundIds).toHaveLength(ROUNDS_PER_PUZZLE);
      expect(new Set(roundIds).size).toBe(ROUNDS_PER_PUZZLE);
      for (const id of roundIds) expect(ids.has(id)).toBe(true);
    }
  });
});

describe('generated daily puzzles are always complete', () => {
  it('produces 5 resolvable rounds for a year of dates', () => {
    const start = new Date(2026, 8, 1);
    for (let i = 0; i < 365; i++) {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
        d.getDate(),
      ).padStart(2, '0')}`;
      const ids = dailyRoundIds(key, pool, schedule);
      expect(ids).toHaveLength(ROUNDS_PER_PUZZLE);
      expect(ids.every((id) => pool.some((r) => r.id === id))).toBe(true);
    }
  });
});
