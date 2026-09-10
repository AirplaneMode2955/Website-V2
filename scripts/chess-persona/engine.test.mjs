/* Standalone checks for the arcade engine + book loader (not part of `npm test`).
   Usage: node scripts/chess-persona/engine.test.mjs */
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const HERE = import.meta.dirname;
let chessjs = (await readFile(path.join(HERE, 'vendor-chess.js'), 'utf8')).replace(/export\{[^}]*\};?\s*$/, '').trim();
const engine = await readFile(path.join(HERE, 'engine.js'), 'utf8');
const BOOK = JSON.parse(await readFile(path.join(HERE, 'book.json'), 'utf8'));

let _res;
globalThis.postMessage = (m) => _res && _res(m);
(0, eval)(chessjs + '\nglobalThis.Chess = Chess;');
(0, eval)(engine);
const ask = (p) => new Promise((r) => { _res = r; globalThis.onmessage({ data: p }); });
const base = { botColor: 'w', depth: 3, book: 0, slipP: 0, slipCp: 90, bookData: BOOK, path: '', fen: new Chess().fen() };

let pass = 0, fail = 0;
const ok = (name, cond, extra = '') => cond ? (pass++, console.log('  ok  ' + name)) : (fail++, console.log('FAIL  ' + name + '  ' + extra));

{
  const r = await ask({ ...base, book: 1 });
  ok('book: opening move is one of Jett’s', ['d4', 'e4', 'c4', 'd3'].includes(r.san), JSON.stringify(r));
  const c = new Chess(); c.move('d4'); c.move('d5');
  const r2 = await ask({ ...base, book: 1, path: 'd4 d5', fen: c.fen() });
  ok('book: after 1.d4 d5 plays a booked reply (e3 favourite)', ['e3', 'Nf3', 'Nc3', 'c4', 'f4'].includes(r2.san), JSON.stringify(r2));
}
{
  const c = new Chess(); ['a4', 'a5', 'h4', 'h5'].forEach((m) => c.move(m));
  const r = await ask({ ...base, book: 1, path: 'a4 a5 h4 h5', botColor: 'b', fen: c.fen() });
  ok('book miss falls through to a legal move', c.moves().includes(r.san), JSON.stringify(r));
}
{
  const r = await ask({ ...base, fen: '6k1/5ppp/8/8/8/8/5PPP/3R2K1 w - - 0 1' });
  ok('finds mate in 1 (Rd8#)', r.san === 'Rd8#', JSON.stringify(r));
}
{
  const t = Date.now();
  const r = await ask({ ...base, depth: 4 });
  ok('depth 4 from start returns a legal move', new Chess().moves().includes(r.san), JSON.stringify(r));
  ok('depth 4 respects the time cap (<2200ms)', Date.now() - t < 2200, Date.now() - t + 'ms');
}
{
  const fen = '4k3/8/3n4/8/8/8/8/3RK3 w - - 0 1'; // Rxd6 wins a clean, undefended knight (not check)
  let worse = 0;
  for (let i = 0; i < 40; i++) { const r = await ask({ ...base, fen, depth: 2, slipP: 1, slipCp: 2000 }); if (r.san !== 'Rxd6') worse++; }
  ok('slipP=1 sometimes avoids the best move', worse > 0, 'worse=' + worse);
  let always = true;
  for (let i = 0; i < 15; i++) { const r = await ask({ ...base, fen, depth: 2, slipP: 0 }); if (r.san !== 'Rxd6') always = false; }
  ok('slipP=0 always grabs the free knight', always);
}
{
  const r = await ask({ ...base, depth: 1 });
  ok('never returns null when legal moves exist', typeof r.san === 'string' && r.san.length > 0, JSON.stringify(r));
}

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
