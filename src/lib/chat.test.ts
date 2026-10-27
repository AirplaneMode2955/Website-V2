import { describe, it, expect } from 'vitest';
import { sanitizeTurns, createRateLimiter, buildSystemPrompt, MAX_CHARS, MAX_TURNS } from './chat';

describe('sanitizeTurns', () => {
  it('accepts a normal conversation ending on a user turn', () => {
    const out = sanitizeTurns([
      { role: 'user', content: 'Who is Jett?' },
      { role: 'assistant', content: 'A marketer.' },
      { role: 'user', content: 'Where does he work?' },
    ]);
    expect(out).toHaveLength(3);
  });

  it('rejects non-arrays, bad roles, and non-string content', () => {
    expect(sanitizeTurns('hi')).toBeNull();
    expect(sanitizeTurns([{ role: 'system', content: 'x' }])).toBeNull();
    expect(sanitizeTurns([{ role: 'user', content: 5 }])).toBeNull();
    expect(sanitizeTurns([null])).toBeNull();
  });

  it('rejects empty input and conversations that do not end on a user turn', () => {
    expect(sanitizeTurns([])).toBeNull();
    expect(sanitizeTurns([{ role: 'user', content: '   ' }])).toBeNull();
    expect(
      sanitizeTurns([
        { role: 'user', content: 'hi' },
        { role: 'assistant', content: 'hello' },
      ]),
    ).toBeNull();
  });

  it('truncates long messages and caps history', () => {
    const many = Array.from({ length: 20 }, (_, i) => ({
      role: i % 2 === 0 ? 'user' : 'assistant',
      content: 'x'.repeat(MAX_CHARS + 100),
    }));
    many.push({ role: 'user', content: 'last' });
    const out = sanitizeTurns(many)!;
    expect(out.length).toBeLessThanOrEqual(MAX_TURNS);
    expect(out[0].role).toBe('user');
    expect(out.every((t) => t.content.length <= MAX_CHARS)).toBe(true);
  });
});

describe('createRateLimiter', () => {
  it('blocks after the limit and resets after the window', () => {
    const allow = createRateLimiter(2, 1000);
    expect(allow('a', 0)).toBe(true);
    expect(allow('a', 10)).toBe(true);
    expect(allow('a', 20)).toBe(false);
    expect(allow('b', 20)).toBe(true);
    expect(allow('a', 1001)).toBe(true);
  });
});

describe('buildSystemPrompt', () => {
  it('includes the site facts and the guardrails', () => {
    const prompt = buildSystemPrompt();
    expect(prompt).toContain('Director of Marketing');
    expect(prompt).toContain('Never invent');
  });
});
