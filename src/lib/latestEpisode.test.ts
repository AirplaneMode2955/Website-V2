import { describe, it, expect } from 'vitest';
import { parseChannelId, parseLatestEpisode } from './latestEpisode';

const feed = `<feed><title>Commute 2 Work</title>
<entry><yt:videoId>SHORT123456</yt:videoId><title>A quick one</title>
<link rel="alternate" href="https://www.youtube.com/shorts/SHORT123456"/><published>2026-10-20T10:00:00+00:00</published></entry>
<entry><yt:videoId>LONG1234567</yt:videoId><title>Tom &amp; Jerry: the &quot;AI&quot; episode</title>
<link rel="alternate" href="https://www.youtube.com/watch?v=LONG1234567"/><published>2026-10-15T10:00:00+00:00</published></entry>
</feed>`;

describe('parseLatestEpisode', () => {
  it('skips Shorts and decodes entities', () => {
    expect(parseLatestEpisode(feed)).toEqual({
      id: 'LONG1234567',
      title: 'Tom & Jerry: the "AI" episode',
      published: '2026-10-15T10:00:00+00:00',
    });
  });

  it('returns null when there is nothing usable', () => {
    expect(parseLatestEpisode('<feed></feed>')).toBeNull();
  });
});

describe('parseChannelId', () => {
  it('finds the id in the RSS link tag', () => {
    const html = '<link rel="alternate" type="application/rss+xml" href="https://www.youtube.com/feeds/videos.xml?channel_id=UCabcdefghijklmnopqrstuv">';
    expect(parseChannelId(html)).toBe('UCabcdefghijklmnopqrstuv');
    expect(parseChannelId('<html></html>')).toBeNull();
  });
});
