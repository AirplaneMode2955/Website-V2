/* Pull all standard rated games for a Chess.com user into ./.cache/*.json
   Usage: node scripts/chess-persona/fetch-games.mjs [username]   (default: eldricklover) */
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const USER = (process.argv[2] || 'eldricklover').toLowerCase();
const CACHE = path.join(import.meta.dirname, '.cache');
const UA = `Mozilla/5.0 (jettiverson.com chess-persona build; ${USER})`;

await mkdir(CACHE, { recursive: true });
const archives = await (await fetch(`https://api.chess.com/pub/player/${USER}/games/archives`, { headers: { 'User-Agent': UA } })).json();
let n = 0;
for (const url of archives.archives || []) {
  const ym = url.split('/games/')[1].replace('/', '-');
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  const body = await res.text();
  await writeFile(path.join(CACHE, `${ym}.json`), body);
  n++;
}
// also grab profile + stats for reference
for (const ep of ['', '/stats']) {
  const r = await fetch(`https://api.chess.com/pub/player/${USER}${ep}`, { headers: { 'User-Agent': UA } });
  await writeFile(path.join(CACHE, `_${ep ? 'stats' : 'profile'}.json`), await r.text());
}
console.log(`fetched ${n} monthly archives for ${USER} -> ${CACHE}`);
