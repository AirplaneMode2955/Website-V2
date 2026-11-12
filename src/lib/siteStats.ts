import { CHESS_USERNAME } from '../data/siteStats';
import { episodeGroups } from './podcast';
import { getFeedXml, parseLongFormIds } from './latestEpisode';

export type ChessRating = { rating: number; timeControl: 'Rapid' | 'Blitz' | 'Bullet' };

type ChessComStats = Partial<Record<'chess_rapid' | 'chess_blitz' | 'chess_bullet', { last?: { rating?: number } }>>;

/** Highest of rapid / blitz / bullet from the Chess.com stats payload. */
export function bestRating(stats: ChessComStats): ChessRating | null {
  const candidates: ChessRating[] = [];
  const pairs = [
    ['chess_rapid', 'Rapid'],
    ['chess_blitz', 'Blitz'],
    ['chess_bullet', 'Bullet'],
  ] as const;
  for (const [key, timeControl] of pairs) {
    const r = stats[key]?.last?.rating;
    if (typeof r === 'number' && r > 0) candidates.push({ rating: r, timeControl });
  }
  if (!candidates.length) return null;
  return candidates.reduce((a, b) => (b.rating > a.rating ? b : a));
}

/** Live Chess.com rating, refreshed hourly. Null on any failure so the tile just hides. */
export async function getChessRating(): Promise<ChessRating | null> {
  try {
    const res = await fetch(`https://api.chess.com/pub/player/${CHESS_USERNAME}/stats`, {
      headers: { 'User-Agent': 'personal-site-stats/1.0', Accept: 'application/json' },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return bestRating((await res.json()) as ChessComStats);
  } catch {
    return null;
  }
}

/**
 * Long-form Commute 2 Work episodes: the curated list on the podcast page plus
 * anything newer in the YouTube feed, de-duplicated. New uploads count as soon
 * as they hit the feed, without anyone touching code.
 */
export function countEpisodes(curatedIds: string[], feedIds: string[]): number {
  return new Set([...curatedIds, ...feedIds]).size;
}

export async function getEpisodeCount(): Promise<number> {
  const curated = episodeGroups.flatMap((g) => g.episodes.map((e) => e.id));
  const xml = await getFeedXml();
  return countEpisodes(curated, xml ? parseLongFormIds(xml) : []);
}
