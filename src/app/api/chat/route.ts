import { NextRequest, NextResponse } from 'next/server';
import { buildSystemPrompt, createRateLimiter, sanitizeTurns } from '../../../lib/chat';

export const dynamic = 'force-dynamic';

const API_URL = 'https://api.anthropic.com/v1/messages';
const MODEL = process.env.ANTHROPIC_MODEL || 'claude-haiku-5-5';

// 12 questions per visitor per 10 minutes. See createRateLimiter for the caveat.
const allow = createRateLimiter(12, 10 * 60 * 1000);

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'unavailable' }, { status: 503 });
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (!allow(ip)) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  const turns = sanitizeTurns(body?.messages);
  if (!turns) {
    return NextResponse.json({ error: 'bad_request' }, { status: 400 });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 300,
        system: buildSystemPrompt(),
        messages: turns,
      }),
      signal: controller.signal,
    });
    if (!res.ok) {
      console.error('chat: Anthropic request failed', res.status, await res.text().catch(() => '<no body>'));
      return NextResponse.json({ error: 'unavailable' }, { status: 502 });
    }
    const data = await res.json();
    const text = Array.isArray(data.content)
      ? data.content
          .filter((b: { type: string }) => b.type === 'text')
          .map((b: { text: string }) => b.text)
          .join('')
          .trim()
      : '';
    if (!text) return NextResponse.json({ error: 'unavailable' }, { status: 502 });
    return NextResponse.json({ answer: text });
  } catch (err) {
    console.error('chat: request error', err);
    return NextResponse.json({ error: 'unavailable' }, { status: 502 });
  } finally {
    clearTimeout(timeout);
  }
}
