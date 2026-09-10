import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const AIRTABLE_BASE_ID = 'appdQv5ACTVH5etFw';
const AIRTABLE_TABLE_ID = 'tblwTmdL4N8yMIHwF';
const AIRTABLE_API_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_ID}`;

const DIFFICULTIES = ['Casual Jett', 'Jett', 'Jett on a good day'];
const COLORS = ['White', 'Black'];
const MAX_ENTRIES = 5;

type Score = {
  name: string;
  moves: number;
  difficulty: string;
  color: string;
  playedAt: string;
};

function airtableHeaders() {
  const token = process.env.AIRTABLE_API_KEY;
  if (!token) return null;
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
}

export async function GET() {
  const headers = airtableHeaders();
  if (!headers) {
    return NextResponse.json({ scores: [], error: 'leaderboard not configured' }, { status: 200 });
  }

  const url = `${AIRTABLE_API_URL}?maxRecords=${MAX_ENTRIES}&sort[0][field]=Moves&sort[0][direction]=asc&fields[]=Name&fields[]=Moves&fields[]=Difficulty&fields[]=Color&fields[]=PlayedAt`;
  const res = await fetch(url, { headers, cache: 'no-store' });
  if (!res.ok) {
    console.error('chess-leaderboard GET: Airtable request failed', res.status, await res.text().catch(() => '<no body>'));
    return NextResponse.json({ scores: [], error: 'leaderboard unavailable' }, { status: 200 });
  }
  const data = await res.json();
  const scores: Score[] = (data.records ?? []).map((r: { fields: Record<string, unknown> }) => ({
    name: String(r.fields.Name ?? ''),
    moves: Number(r.fields.Moves ?? 0),
    difficulty: String(r.fields.Difficulty ?? ''),
    color: String(r.fields.Color ?? ''),
    playedAt: String(r.fields.PlayedAt ?? ''),
  }));
  return NextResponse.json({ scores });
}

export async function POST(request: NextRequest) {
  const headers = airtableHeaders();
  if (!headers) {
    return NextResponse.json({ ok: false, error: 'leaderboard not configured' }, { status: 503 });
  }

  let body: { name?: unknown; moves?: unknown; difficulty?: unknown; color?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid body' }, { status: 400 });
  }

  const name = typeof body.name === 'string' ? body.name.trim().slice(0, 24).replace(/[\r\n\t]/g, ' ') : '';
  const moves = typeof body.moves === 'number' ? Math.round(body.moves) : NaN;
  const difficulty = typeof body.difficulty === 'string' ? body.difficulty : '';
  const color = typeof body.color === 'string' ? body.color : '';

  if (!name) return NextResponse.json({ ok: false, error: 'name required' }, { status: 400 });
  if (!Number.isFinite(moves) || moves < 1 || moves > 500) {
    return NextResponse.json({ ok: false, error: 'invalid moves' }, { status: 400 });
  }
  if (!DIFFICULTIES.includes(difficulty)) {
    return NextResponse.json({ ok: false, error: 'invalid difficulty' }, { status: 400 });
  }
  if (!COLORS.includes(color)) {
    return NextResponse.json({ ok: false, error: 'invalid color' }, { status: 400 });
  }

  const createRes = await fetch(AIRTABLE_API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      records: [
        {
          fields: {
            Name: name,
            Moves: moves,
            Difficulty: difficulty,
            Color: color,
            PlayedAt: new Date().toISOString(),
          },
        },
      ],
    }),
  });

  if (!createRes.ok) {
    console.error('chess-leaderboard POST: Airtable request failed', createRes.status, await createRes.text().catch(() => '<no body>'));
    return NextResponse.json({ ok: false, error: 'could not save score' }, { status: 502 });
  }

  // Return the refreshed top 5 so the client doesn't need a second round trip.
  const listRes = await fetch(
    `${AIRTABLE_API_URL}?maxRecords=${MAX_ENTRIES}&sort[0][field]=Moves&sort[0][direction]=asc&fields[]=Name&fields[]=Moves&fields[]=Difficulty&fields[]=Color&fields[]=PlayedAt`,
    { headers, cache: 'no-store' }
  );
  const listData = listRes.ok ? await listRes.json() : { records: [] };
  const scores: Score[] = (listData.records ?? []).map((r: { fields: Record<string, unknown> }) => ({
    name: String(r.fields.Name ?? ''),
    moves: Number(r.fields.Moves ?? 0),
    difficulty: String(r.fields.Difficulty ?? ''),
    color: String(r.fields.Color ?? ''),
    playedAt: String(r.fields.PlayedAt ?? ''),
  }));

  return NextResponse.json({ ok: true, scores });
}
