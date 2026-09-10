/* Build book.json (opening book) + profile.json (style metrics) from ./.cache/*.json
   Usage: node scripts/chess-persona/build-book.mjs [username]  (default: eldricklover) */
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const ME = (process.argv[2] || 'eldricklover').toLowerCase();
const DIR = path.join(import.meta.dirname, '.cache');
const OUT = import.meta.dirname;
const MAX_PLY = 20;
const MIN_COUNT = 2;

const files = (await readdir(DIR)).filter((f) => f.endsWith('.json') && !f.startsWith('_'));
const games = [];
for (const f of files) {
  try { for (const g of JSON.parse(await readFile(path.join(DIR, f), 'utf8')).games || []) games.push(g); } catch {}
}

const movetext = (pgn) => {
  if (!pgn) return [];
  const nl = pgn.indexOf('\n\n');
  return (nl >= 0 ? pgn.slice(nl + 2) : pgn)
    .replace(/\{[^}]*\}/g, ' ').replace(/\([^)]*\)/g, ' ').replace(/\$\d+/g, ' ')
    .replace(/\d+\.(\.\.)?/g, ' ').replace(/(1-0|0-1|1\/2-1\/2|\*)\s*$/, ' ')
    .trim().split(/\s+/).filter(Boolean);
};

const book = { white: {}, black: {} };
const style = [];
let used = 0;

for (const g of games) {
  if (g.rules !== 'chess') continue;
  const w = (g.white?.username || '').toLowerCase(), b = (g.black?.username || '').toLowerCase();
  const color = w === ME ? 'white' : b === ME ? 'black' : null;
  if (!color) continue;
  const ms = movetext(g.pgn);
  if (ms.length < 2) continue;
  used++;
  const parity = color === 'white' ? 0 : 1;
  for (let i = 0; i < Math.min(ms.length, MAX_PLY); i++) {
    if (i % 2 !== parity) continue;
    const key = ms.slice(0, i).join(' ');
    (book[color][key] ||= {});
    book[color][key][ms[i]] = (book[color][key][ms[i]] || 0) + 1;
  }
  const me = g[color], opp = g[color === 'white' ? 'black' : 'white'];
  const res = me.result === 'win' ? 'win'
    : ['agreed', 'repetition', 'stalemate', 'insufficient', '50move', 'timevsinsufficient'].includes(me.result) ? 'draw' : 'loss';
  const myMoves = ms.filter((_, i) => i % 2 === parity);
  style.push({
    color, res, plies: ms.length, rating: me.rating || null, tc: g.time_class,
    castle: myMoves.find((m) => m === 'O-O' || m === 'O-O-O') || 'none',
    firstMove: color === 'white' ? ms[0] : null,
    vsE4: color === 'black' && ms[0] === 'e4' ? ms[1] : null,
    vsD4: color === 'black' && ms[0] === 'd4' ? ms[1] : null,
    wonByMate: res === 'win' && opp.result === 'checkmated',
  });
}

// prune deep rare lines
for (const col of ['white', 'black']) {
  const t = book[col], o = {};
  for (const [k, mv] of Object.entries(t)) {
    const ply = k ? k.split(' ').length : 0;
    const tot = Object.values(mv).reduce((a, c) => a + c, 0);
    if (ply >= 6 && tot < MIN_COUNT) continue;
    o[k] = Object.fromEntries(Object.entries(mv).sort((a, b) => b[1] - a[1]));
  }
  book[col] = o;
}

const n = style.length;
const pct = (f) => Math.round((100 * f) / n);
const tally = (sel) => {
  const m = {};
  for (const g of style) { const v = sel(g); if (v != null) m[v] = (m[v] || 0) + 1; }
  return Object.fromEntries(Object.entries(m).sort((a, b) => b[1] - a[1]));
};
const wl = (arr) => {
  const win = arr.filter((g) => g.res === 'win').length, draw = arr.filter((g) => g.res === 'draw').length;
  return { games: arr.length, win, draw, loss: arr.length - win - draw, winPct: +((100 * win) / arr.length).toFixed(1) };
};
const ratingByTc = {};
for (const g of style) { if (g.rating) (ratingByTc[g.tc] ||= []).push(g.rating); }
for (const k of Object.keys(ratingByTc)) {
  const r = ratingByTc[k]; ratingByTc[k] = { min: Math.min(...r), max: Math.max(...r), n: r.length };
}

const profile = {
  generatedFrom: `${used} standard rated games (Chess.com, ${ME})`,
  overall: wl(style),
  asWhite: wl(style.filter((g) => g.color === 'white')),
  asBlack: wl(style.filter((g) => g.color === 'black')),
  medianPlies: [...style.map((g) => g.plies)].sort((a, b) => a - b)[Math.floor(n / 2)],
  drawRatePct: pct(style.filter((g) => g.res === 'draw').length),
  castleShortPct: pct(style.filter((g) => g.castle === 'O-O').length),
  castleLongPct: pct(style.filter((g) => g.castle === 'O-O-O').length),
  neverCastledPct: pct(style.filter((g) => g.castle === 'none').length),
  winsByCheckmatePct: Math.round((100 * style.filter((g) => g.wonByMate).length) / style.filter((g) => g.res === 'win').length),
  firstMoveAsWhite: tally((g) => g.firstMove),
  replyVsE4: tally((g) => g.vsE4),
  replyVsD4: tally((g) => g.vsD4),
  ratingByTc,
};

await writeFile(path.join(OUT, 'book.json'), JSON.stringify(book));
await writeFile(path.join(OUT, 'profile.json'), JSON.stringify(profile, null, 2));
console.log(`book: white ${Object.keys(book.white).length} / black ${Object.keys(book.black).length} positions, ${(JSON.stringify(book).length / 1024).toFixed(1)} KB`);
console.log(JSON.stringify(profile, null, 2));
