export const CHANNEL_URL = 'https://www.youtube.com/@Commute2Work';

export type Episode = { id: string; title: string };

export type EpisodeGroup = {
  icon: string;
  title: string;
  blurb: string;
  episodes: Episode[];
};

export const episodeGroups: EpisodeGroup[] = [
  {
    icon: 'work',
    title: 'AI and your career',
    blurb: 'What AI changes about getting hired, getting promoted, and staying useful.',
    episodes: [
      { id: 'ZG2GL24FwN8', title: 'Companies Will Hire Your AI, not you' },
      { id: 'JyTME6zgC_k', title: 'College Students Who Don’t Use AI Are Falling Behind' },
      { id: 'XBRSEMrRrko', title: 'The One Habit That Makes You Truly Indispensable' },
    ],
  },
  {
    icon: 'smartphone',
    title: 'Attention, algorithms, and stuff',
    blurb: 'Why we scroll, why we buy, and what happens when we get bored on purpose.',
    episodes: [
      { id: 'o8RZx8lcJwI', title: 'You’re Not Addicted by Accident: How Algorithms Keep You Scrolling' },
      { id: 'FbU06uHqFTE', title: 'Maybe we don’t need more entertainment. Maybe we need to be bored again.' },
      { id: '3drMyenan0Q', title: 'Disneyland Made Me Rethink Consumerism' },
    ],
  },
  {
    icon: 'construction',
    title: 'Building in public',
    blurb: 'The portfolio, the chess bot, and the automations I am wiring up behind the channel.',
    episodes: [
      { id: '693GKgTBR8w', title: 'How to Rank in AI Search Engines (Claude GEO Strategy)' },
      { id: 'qvdypYXBrSA', title: 'How to Build an Interactive AI Personal Website Portfolio' },
      { id: 'Bw13DqqHqH8', title: 'Build a Custom Chess Bot API for Your Portfolio Website' },
    ],
  },
  {
    icon: 'favorite',
    title: 'Real life',
    blurb: 'Rejection, who actually shows up for you, and figuring it out as I go.',
    episodes: [
      { id: 'wdZ-Cf0IGuE', title: 'I Made It to the Final Round… and Got Rejected' },
      { id: '7xQKlbmG-yg', title: 'The Hard Truth About Who Actually Supports You' },
    ],
  },
];

/** Top-performing Shorts by views (snapshot from YouTube, 2026-10-16). */
export const topShorts: Episode[] = [
  { id: 'mSQE8Zixtqc', title: 'How you do anything is how you do everything' },
  { id: 'QEv511KApP8', title: 'If AI Does 90% of Marketing… What Are We Learning?' },
  { id: 'ccAVaZb0XiA', title: 'Your 1-Year-Old Would Be Just as Happy in the Mud' },
  { id: 'b3fHll8XQWk', title: 'The French secret to the X factor' },
  { id: 'VD1JPmEPe9Y', title: 'What AI reasoning actually means' },
  { id: 'WFyieC6Chyo', title: 'I wanted this job so bad. Then the email came.' },
  { id: '_iN8QxLy-Hc', title: 'Big tech doesn’t care about you' },
  { id: 'dawxHQle5Q8', title: 'Companies will hire you for the AI you trained' },
];
