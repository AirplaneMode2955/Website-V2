import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { NextRequest } from 'next/server';
import { POST } from './route';

function req(body: unknown, ip = '1.1.1.1') {
  return new NextRequest('http://localhost/api/chat', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-forwarded-for': ip },
    body: JSON.stringify(body),
  });
}

const ok = { messages: [{ role: 'user', content: 'Who is Jett?' }] };

describe('POST /api/chat', () => {
  beforeEach(() => {
    vi.stubEnv('ANTHROPIC_API_KEY', 'test-key');
  });
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it('returns 503 without an API key so the client can fall back to the FAQ', async () => {
    vi.stubEnv('ANTHROPIC_API_KEY', '');
    const res = await POST(req(ok, '2.2.2.2'));
    expect(res.status).toBe(503);
  });

  it('rejects malformed bodies', async () => {
    const res = await POST(req({ messages: 'nope' }, '3.3.3.3'));
    expect(res.status).toBe(400);
  });

  it('forwards sanitized turns and the system prompt, and returns the model text', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ content: [{ type: 'text', text: 'A marketer in Utah.' }] }), { status: 200 }),
    );
    vi.stubGlobal('fetch', fetchMock);
    const res = await POST(req(ok, '4.4.4.4'));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ answer: 'A marketer in Utah.' });
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('https://api.anthropic.com/v1/messages');
    expect(init.headers['x-api-key']).toBe('test-key');
    const sent = JSON.parse(init.body);
    expect(sent.max_tokens).toBe(300);
    expect(sent.messages).toEqual(ok.messages);
    expect(sent.system).toContain('FACTS:');
  });

  it('maps an upstream failure to 502', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('boom', { status: 500 })));
    const res = await POST(req(ok, '5.5.5.5'));
    expect(res.status).toBe(502);
  });

  it('rate limits a visitor after 12 requests', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation(
        async () => new Response(JSON.stringify({ content: [{ type: 'text', text: 'ok' }] }), { status: 200 }),
      ),
    );
    const statuses: number[] = [];
    for (let i = 0; i < 13; i++) statuses.push((await POST(req(ok, '9.9.9.9'))).status);
    expect(statuses.slice(0, 12).every((s) => s === 200)).toBe(true);
    expect(statuses[12]).toBe(429);
  });
});
