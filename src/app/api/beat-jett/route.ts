import { NextRequest, NextResponse } from 'next/server';
import {
  MAX_POINTS,
  PLAYER_ID_RE,
  cleanName,
  displayFor,
  isDayKey,
  isGameId,
  isPlausibleToday,
  jettScores,
  outcome,
  seasonFor,
  tally,
  utcDayKey,
  type GameId,
  type Row,
} from '@/lib/beatJett';

export const dynamic = 'force-dynamic';

// Same base as the chess leaderboard. The table is addressed by name so no id is needed.
const AIRTABLE_BASE_ID = 'app3bMurOKZmdWma0';
const TABLE = encodeURIComponent('Daily Results');
const API = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${TABLE}`;

type Fields = {
  Day?: string;
  Game?: string;
  Points?: number;
  Display?: string;
  IsJett?: boolean;
  PlayerId?: string;
  Name?: string;
  PlayedAt?: string;
};
type AirRecord = { id: string; fields: Fields };

function headers() {
  const token = process.env.AIRTABLE_API_KEY;
  if (!token) return null;
  return { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
}

function toRow(r: AirRecord): Row | null {
  const f = r.fields;
  if (!isDayKey(f.Day) || !isGameId(f.Game) || typeof f.Points !== 'number') return null;
  return { day: f.Day, game: f.Game, points: f.Points, isJett: !!f.IsJett, name: f.Name || undefined };
}

async function select(h: Record<string, string>, formula: string): Promise<AirRecord[] | null> {
  const out: AirRecord[] = [];
  let offset: string | undefined;
  do {
    const qs = new URLSearchParams({ filterByFormula: formula, pageSize: '100' });
    if (offset) qs.set('offset', offset);
    const res = await fetch(`${API}?${qs}`, { headers: h, cache: 'no-store' });
    if (!res.ok) {
      console.error('beat-jett: Airtable select failed', res.status, await res.text().catch(() => ''));
      return null;
    }
    const data = (await res.json()) as { records: AirRecord[]; offset?: string };
    out.push(...data.records);
    offset = data.offset;
  } while (offset && out.length < 5000);
  return out;
}

function seasonFormula(day: string) {
  const { months } = seasonFor(day);
  return `OR(${months.map((m) => `LEFT({Day},7)='${m}'`).join(',')})`;
}

/** GET /api/beat-jett?today=YYYY-MM-DD → season tally, Jett's scores today, the wall. */
export async function GET(request: NextRequest) {
  const h = headers();
  const q = request.nextUrl.searchParams.get('today');
  const today = isDayKey(q) && isPlausibleToday(q) ? q : utcDayKey();
  const season = seasonFor(today);
  if (!h) return NextResponse.json({ configured: false, season: season.label });

  const records = await select(h, seasonFormula(today));
  if (!records) return NextResponse.json({ configured: false, season: season.label });

  const rows = records.map(toRow).filter((r): r is Row => r !== null);
  return NextResponse.json({ configured: true, season: season.label, today, ...tally(rows, today) });
}

/** POST { game, day, points, playerId, jettKey? } → this result vs. Jett. */
export async function POST(request: NextRequest) {
  const h = headers();
  if (!h) return NextResponse.json({ ok: false, error: 'not configured' }, { status: 503 });

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid body' }, { status: 400 });
  }

  const { game, day, points, playerId, jettKey } = body;
  if (!isGameId(game)) return NextResponse.json({ ok: false, error: 'invalid game' }, { status: 400 });
  if (!isDayKey(day) || !isPlausibleToday(day)) {
    return NextResponse.json({ ok: false, error: 'invalid day' }, { status: 400 });
  }
  if (typeof points !== 'number' || !Number.isInteger(points) || points < 0 || points > MAX_POINTS[game]) {
    return NextResponse.json({ ok: false, error: 'invalid points' }, { status: 400 });
  }
  if (typeof playerId !== 'string' || !PLAYER_ID_RE.test(playerId)) {
    return NextResponse.json({ ok: false, error: 'invalid player' }, { status: 400 });
  }

  let isJett = false;
  if (jettKey !== undefined && jettKey !== null && jettKey !== '') {
    const secret = process.env.BEAT_JETT_KEY;
    if (!secret || jettKey !== secret) {
      return NextResponse.json({ ok: false, error: 'bad jett key' }, { status: 403 });
    }
    isJett = true;
  }

  const sameDay = await select(h, `AND({Day}='${day}',{Game}='${game}')`);
  if (!sameDay) return NextResponse.json({ ok: false, error: 'unavailable' }, { status: 502 });

  // One result per player per game per day — a refresh or second tab never double-counts.
  const existing = sameDay.find((r) => r.fields.PlayerId === playerId && !!r.fields.IsJett === isJett);
  let recordId = existing?.id;
  let myPoints = existing && typeof existing.fields.Points === 'number' ? existing.fields.Points : points;

  if (!existing) {
    const res = await fetch(API, {
      method: 'POST',
      headers: h,
      body: JSON.stringify({
        records: [
          {
            fields: {
              Day: day,
              Game: game,
              Points: points,
              Display: displayFor(game, points),
              IsJett: isJett,
              PlayerId: playerId,
              PlayedAt: new Date().toISOString(),
            },
          },
        ],
        typecast: true,
      }),
    });
    if (!res.ok) {
      console.error('beat-jett: Airtable create failed', res.status, await res.text().catch(() => ''));
      return NextResponse.json({ ok: false, error: 'could not save' }, { status: 502 });
    }
    const created = (await res.json()) as { records: AirRecord[] };
    recordId = created.records[0]?.id;
    myPoints = points;
    sameDay.push({ id: recordId ?? '', fields: { Day: day, Game: game, Points: points, IsJett: isJett } });
  }

  const rows = sameDay.map(toRow).filter((r): r is Row => r !== null);
  const jett = jettScores(rows).get(`${day}|${game}`);

  if (isJett) {
    const visitors = rows.filter((r) => !r.isJett).length;
    return NextResponse.json({ ok: true, isJett: true, display: displayFor(game, myPoints), visitors });
  }

  return NextResponse.json({
    ok: true,
    recordId,
    result: outcome(myPoints, jett),
    display: displayFor(game, myPoints),
    jettDisplay: jett === undefined ? null : displayFor(game as GameId, jett),
  });
}

/** PATCH { recordId, playerId, name } → sign the Beat Jett wall (only if you actually won). */
export async function PATCH(request: NextRequest) {
  const h = headers();
  if (!h) return NextResponse.json({ ok: false, error: 'not configured' }, { status: 503 });

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid body' }, { status: 400 });
  }
  const { recordId, playerId } = body;
  const name = cleanName(body.name);
  if (typeof recordId !== 'string' || !/^rec[A-Za-z0-9]{14}$/.test(recordId)) {
    return NextResponse.json({ ok: false, error: 'invalid record' }, { status: 400 });
  }
  if (typeof playerId !== 'string' || !PLAYER_ID_RE.test(playerId)) {
    return NextResponse.json({ ok: false, error: 'invalid player' }, { status: 400 });
  }
  if (!name) return NextResponse.json({ ok: false, error: 'name required' }, { status: 400 });

  const getRes = await fetch(`${API}/${recordId}`, { headers: h, cache: 'no-store' });
  if (!getRes.ok) return NextResponse.json({ ok: false, error: 'not found' }, { status: 404 });
  const rec = (await getRes.json()) as AirRecord;
  const row = toRow(rec);
  if (!row || row.isJett || rec.fields.PlayerId !== playerId) {
    return NextResponse.json({ ok: false, error: 'not yours' }, { status: 403 });
  }

  const sameDay = await select(h, `AND({Day}='${row.day}',{Game}='${row.game}',{IsJett})`);
  const jett = sameDay ? jettScores(sameDay.map(toRow).filter((r): r is Row => r !== null)).get(`${row.day}|${row.game}`) : undefined;
  if (outcome(row.points, jett) !== 'win') {
    return NextResponse.json({ ok: false, error: 'only winners sign the wall' }, { status: 403 });
  }

  const res = await fetch(`${API}/${recordId}`, {
    method: 'PATCH',
    headers: h,
    body: JSON.stringify({ fields: { Name: name } }),
  });
  if (!res.ok) return NextResponse.json({ ok: false, error: 'could not save' }, { status: 502 });
  return NextResponse.json({ ok: true, name });
}
