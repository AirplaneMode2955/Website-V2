import { describe, expect, it } from 'vitest';
import { bestRating, countEpisodes } from './siteStats';
import { parseLongFormIds } from './latestEpisode';

describe('bestRating', () => {
  it('picks the highest time control', () => {
    expect(
      bestRating({
        chess_rapid: { last: { rating: 1210 } },
        chess_blitz: { last: { rating: 1305 } },
        chess_bullet: { last: { rating: 990 } },
      }),
    ).toEqual({ rating: 1305, timeControl: 'Blitz' });
  });

  it('skips missing time controls and returns null when none', () => {
    expect(bestRating({ chess_rapid: { last: { rating: 1100 } } })).toEqual({ rating: 1100, timeControl: 'Rapid' });
    expect(bestRating({})).toBeNull();
  });
});

describe('episode count', () => {
  it('de-duplicates curated and feed ids', () => {
    expect(countEpisodes(['a', 'b', 'c'], ['c', 'd'])).toBe(4);
  });

  it('skips Shorts in the feed', () => {
    const xml =
      '<feed><entry><yt:videoId>long1</yt:videoId><link rel="alternate" href="https://www.youtube.com/watch?v=long1"/></entry>' +
      '<entry><yt:videoId>short1</yt:videoId><link rel="alternate" href="https://www.youtube.com/shorts/short1"/></entry></feed>';
    expect(parseLongFormIds(xml)).toEqual(['long1']);
  });
});
