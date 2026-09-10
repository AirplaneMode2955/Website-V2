/* Inline vendor-chess.js + engine.js + book.json into game.template.html and
   write the single self-contained game file the arcade serves.
   Usage: node scripts/chess-persona/assemble.mjs */
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const HERE = import.meta.dirname;
const OUT = path.join(HERE, '..', '..', 'public', 'arcade', 'play-me-chess', 'index.html');

let chess = (await readFile(path.join(HERE, 'vendor-chess.js'), 'utf8'))
  .replace(/export\{[^}]*\};?\s*$/, '').trim() +
  '\n;(typeof globalThis!=="undefined"?globalThis:self).Chess=Chess;';
const engine = await readFile(path.join(HERE, 'engine.js'), 'utf8');
const book = JSON.parse(await readFile(path.join(HERE, 'book.json'), 'utf8'));
let html = await readFile(path.join(HERE, 'game.template.html'), 'utf8');

const guard = (s) => s.replace(/<\/(script)/gi, '<\\/$1'); // never break out of a <script> block

html = html
  .replace('/*__CHESSJS__*/', () => guard(chess))
  .replace('/*__ENGINE__*/', () => guard(engine))
  .replace('/*__BOOK__*/', () => JSON.stringify(book));

if (/\/\*__(CHESSJS|ENGINE|BOOK)__\*\//.test(html)) {
  console.error('ERROR: unreplaced placeholder remains'); process.exit(1);
}
await writeFile(OUT, html);
console.log(`wrote ${OUT}  (${(html.length / 1024).toFixed(1)} KB)`);
