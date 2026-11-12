import { CHANNEL_URL } from './podcast';

export type LatestEpisode = { id: string; title: string; published: string };

const FEED_URL = 'https://www.youtube.com/feeds/videos.xml?channel_id=';

/** The channel page advertises its RSS feed, which is where the channel id comes from. */
export function parseChannelId(html: string): string | null {
  const m = html.match(/feeds\/videos\.xml\?channel_id=(UC[\w-]{22})/);
  return m ? m[1] : null;
}

function decode(text: string) {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'");
}

/** First long-form upload in the feed. Shorts link to /shorts/ and are skipped. */
export function parseLatestEpisode(xml: string): LatestEpisode | null {
  for (const entry of xml.split('<entry>').slice(1)) {
    const link = entry.match(/<link rel="alternate" href="([^"]+)"/)?.[1] ?? '';
    if (link.includes('/shorts/')) continue;
    const id = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1];
    const title = entry.match(/<title>([^<]+)<\/title>/)?.[1];
    const published = entry.match(/<published>([^<]+)<\/published>/)?.[1];
    if (id && title && published) return { id, title: decode(title), published };
  }
  return null;
}

/** Every long-form video id in the feed (Shorts skipped). The feed holds the ~15 newest uploads. */
export function parseLongFormIds(xml: string): string[] {
  const ids: string[] = [];
  for (const entry of xml.split('<entry>').slice(1)) {
    const link = entry.match(/<link rel="alternate" href="([^"]+)"/)?.[1] ?? '';
    if (link.includes('/shorts/')) continue;
    const id = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1];
    if (id) ids.push(id);
  }
  return ids;
}

/** The channel's RSS feed, or null on any failure. Fetches are cached and shared across callers. */
export async function getFeedXml(): Promise<string | null> {
  try {
    const page = await fetch(CHANNEL_URL, { next: { revalidate: 86400 } });
    if (!page.ok) return null;
    const channelId = parseChannelId(await page.text());
    if (!channelId) return null;
    const feed = await fetch(FEED_URL + channelId, { next: { revalidate: 3600 } });
    if (!feed.ok) return null;
    return await feed.text();
  } catch {
    return null;
  }
}

/** Returns null on any failure so the page can simply leave the card out. */
export async function getLatestEpisode(): Promise<LatestEpisode | null> {
  const xml = await getFeedXml();
  return xml ? parseLatestEpisode(xml) : null;
}
