export type ArcadeGame = {
  slug: string;
  title: string;
  /** One line: why I built it. */
  blurb: string;
  tags: string[];
  year: string;
  /** 'hosted' games are served from /public/arcade/<slug>/ and open in the /play/<slug> wrapper. */
  mode: 'hosted' | 'link';
  /** hosted: ignored (wrapper route is derived). link: the external URL. */
  href?: string;
};

export const arcadeGames: ArcadeGame[] = [
  {
    slug: 'birthdle',
    title: 'Birthdle',
    blurb:
      "A Wordle riff where the hidden answer is a famous person's birthday. Built to test whether date-guessing carries the same daily-habit loop.",
    tags: ['Game', 'Daily', 'Vanilla JS'],
    year: '2025',
    mode: 'hosted',
  },
  {
    slug: 'retro-world-cup',
    title: 'Retro Cup',
    blurb:
      'A pixel-art World Cup bracket simulator — made in the run-up to 2026 to play with tournament probability somewhere more fun than a spreadsheet.',
    tags: ['Game', 'Simulation', 'Soccer'],
    year: '2025',
    mode: 'hosted',
  },
  {
    slug: 'career-signature',
    title: 'Career Signature',
    blurb:
      "An interactive quiz that turns how you answer into a one-line 'signature' of your working style.",
    tags: ['Quiz', 'Interactive', 'Vanilla JS'],
    year: '2025',
    mode: 'hosted',
  },
  {
    slug: 'remuda-round',
    title: 'Remuda Round',
    blurb:
      'A score tracker for the golf side-games my group actually plays for money. It replaced the napkin math.',
    tags: ['Golf', 'Utility', 'Vanilla JS'],
    year: '2025',
    mode: 'hosted',
  },
  {
    slug: 'pixel-terrarium',
    title: 'Pixel Terrarium',
    blurb:
      "A living pixel city of tiny autonomous 'minds' going about their day. No goal — just watch it run.",
    tags: ['Generative', 'Simulation', 'Canvas'],
    year: '2025',
    mode: 'hosted',
  },
  {
    slug: 'utah-golf-tinder',
    title: 'Utah Golf Tinder',
    blurb:
      "Log every Utah course you've played and watch your percentage of the whole state tick up.",
    tags: ['React', 'Maps', 'Golf'],
    year: '2025',
    mode: 'link',
    href: 'https://utah-golf-tinder.vercel.app/',
  },
];

export const hostedGames = arcadeGames.filter((g) => g.mode === 'hosted');

export function getHostedGame(slug: string): ArcadeGame | undefined {
  return hostedGames.find((g) => g.slug === slug);
}
