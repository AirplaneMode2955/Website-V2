# chess-persona — "The Eldrick"

Build tooling for the **Play Me in Chess** arcade game
(`public/arcade/play-me-chess/index.html`), a chess bot tuned to play like Jett
("EldrickLover" on Chess.com).

The shipped game is one self-contained HTML file. These scripts regenerate it
from Jett's real game history.

## Pipeline

```bash
node scripts/chess-persona/fetch-games.mjs      # -> .cache/*.json  (Chess.com public API, ~30 monthly archives)
node scripts/chess-persona/build-book.mjs       # -> book.json + profile.json
node scripts/chess-persona/assemble.mjs         # -> public/arcade/play-me-chess/index.html
node scripts/chess-persona/engine.test.mjs      # sanity checks (book, mate-in-1, time cap, slip)
npm run seo                                      # refresh sitemap if the slug changed
```

`.cache/` (raw game JSON) is git-ignored; `book.json` and `profile.json` are the
committed derived snapshot (currently from 311 games, 2021–2026).

## Files

| File | Role |
|---|---|
| `fetch-games.mjs` | Pull all standard rated games for a Chess.com user |
| `build-book.mjs` | Extract the weighted opening book + aggregate style profile |
| `book.json` | Opening book: `{white,black}` trees, key = SAN path, value = `{san: count}` of Jett's move |
| `profile.json` | Style metrics used for the in-game scouting report |
| `engine.js` | The engine (negamax + α-β + quiescence + style re-rank + human "slip"), runs in a Blob Worker |
| `vendor-chess.js` | chess.js 0.13.4 (BSD-2), move legality — inlined into the game |
| `game.template.html` | The game shell with `/*__CHESSJS__*/`, `/*__ENGINE__*/`, `/*__BOOK__*/` placeholders |
| `assemble.mjs` | Inline all three into the template → the shipped `index.html` |
| `engine.test.mjs` | Standalone Node checks (not wired into `npm test`) |

## How "plays like Jett" works

1. **Opening book** — while the game so far matches a line Jett has played, the
   bot plays his move (weighted by how often he chose it). This is literally his
   repertoire: 1.d4 → e3 → c4 as White, the French / 1...e5 / Scandinavian as
   Black.
2. **Strength** — small search (depth 2–4 by difficulty) at roughly his ~1000
   rating, plus a per-move probability of a rating-appropriate "slip" (playing a
   move up to ~1 pawn worse than best).
3. **Habits** — at the root, among near-best moves the engine prefers checks,
   captures near the enemy king, the e3/c4 structure, early minor-piece
   development, and it under-weights its own king safety (Jett castles late or
   not at all).

See `../../docs/superpowers/specs/2026-09-09-chess-persona-design.md` for the
full design.
