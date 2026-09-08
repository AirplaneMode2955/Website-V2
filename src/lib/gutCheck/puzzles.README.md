# Gut Check — keeping the puzzle pool fed

All content lives in `puzzles.ts`. The game picks 5 rounds per day: an explicit
`schedule` entry for that date wins, otherwise 5 rounds are chosen
deterministically from `pool` by date. Practice mode and the archive draw from
the same pool.

Aim to add a handful of rounds a month. `npm test` fails the build if anything
here is malformed, so a bad entry never reaches production.

## Adding a round

Append to `pool`. Give it the next unused `id` (ids are permanent — never
renumber or reuse).

### "Which one won?"

```ts
{
  id: 17,
  type: 'which-won',
  context: 'Email subject line — B2B SaaS renewal',   // the framing shown to the player
  a: 'Your plan renews in 7 days',
  b: 'A quick question about your account',
  winner: 'b',                                         // 'a' | 'b'
  metric: '+19% open rate for the curiosity line',     // shown on reveal
  source: 'illustrative',                              // where the number is from
}
```

Use `source: 'illustrative'` for a realistic-but-unverified figure. Replace
those with sourced examples (your own campaigns, published case studies) as you
collect them — the credibility of the game rests on the reveals being true.

### "Spot the AI"

```ts
{
  id: 18,
  type: 'spot-ai',
  context: 'Instagram caption — local bakery',
  options: [
    'Human line with a specific, weird, true detail.',
    'AI line: hedged, no specifics, stock phrasing.',
    'Another human line.',
    'Another human line.',
  ],
  aiIndices: [1],           // one or more; must be fewer than options.length
  explain: 'Name the tells — the "in a world of…" opener, the triad, the lack of any real detail.',
}
```

3–4 options. The player must select the AI set exactly to get the round right.

## Curating a specific day

Add to `schedule`:

```ts
export const schedule: Record<string, number[]> = {
  '2026-09-15': [1, 8, 11, 4, 13],   // exactly 5 existing ids
};
```

Good for a launch week or a themed day. Any date without an entry falls back to
automatic selection.
