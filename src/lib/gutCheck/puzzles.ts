import type { Round } from './game';

/**
 * The round pool. Add new rounds here over time (see puzzles.README.md).
 *
 * `source: 'illustrative'` marks a realistic but not independently verified
 * figure — fine for seeding, replace with sourced examples as you gather them.
 * Ids are stable and must never be reused for a different round.
 */
export const pool: Round[] = [
  {
    id: 1,
    type: 'which-won',
    context: 'Call-to-action button — political campaign signup page',
    a: 'Sign Up',
    b: 'Learn More',
    winner: 'b',
    metric: '+18.6% signup rate for "Learn More"',
    source: 'Obama 2008 campaign A/B test (Optimizely / Dan Siroker, widely published)',
  },
  {
    id: 2,
    type: 'which-won',
    context: 'Email subject line — abandoned cart, DTC apparel',
    a: 'You left something behind',
    b: 'Your cart is about to expire',
    winner: 'a',
    metric: '+27% open rate for the softer line',
    source: 'illustrative',
  },
  {
    id: 3,
    type: 'which-won',
    context: 'Landing page headline — B2B analytics tool',
    a: 'Analytics that answer "what should I do next?"',
    b: 'The most powerful analytics platform on the market',
    winner: 'a',
    metric: '+34% demo requests for the outcome-led headline',
    source: 'illustrative',
  },
  {
    id: 4,
    type: 'which-won',
    context: 'Google Search ad — local HVAC company',
    a: 'AC Repair Near You — Same-Day Service, Upfront Pricing',
    b: 'Trusted HVAC Experts Since 1998 — Family Owned & Operated',
    winner: 'a',
    metric: '2.1× CTR for the specific-offer ad',
    source: 'illustrative',
  },
  {
    id: 5,
    type: 'which-won',
    context: 'Pricing page CTA — SaaS free trial',
    a: 'Start your free trial',
    b: 'Try it free — no card required',
    winner: 'b',
    metric: '+14% trial starts when the friction-reducer is stated',
    source: 'illustrative',
  },
  {
    id: 6,
    type: 'which-won',
    context: 'Nonprofit donation ask — year-end email',
    a: 'Give $50 today',
    b: 'Your $50 covers a week of meals for one family',
    winner: 'b',
    metric: '+31% donation rate for the concrete framing',
    source: 'illustrative',
  },
  {
    id: 7,
    type: 'which-won',
    context: 'Push notification — mobile fitness app, re-engagement',
    a: "You haven't worked out in 5 days 👀",
    b: 'A 12-minute session is waiting for you',
    winner: 'b',
    metric: '+22% open rate; the guilt line also raised uninstalls',
    source: 'illustrative',
  },
  {
    id: 8,
    type: 'which-won',
    context: 'Blog post title — insurance content marketing',
    a: 'How Much Is Life Insurance for a 30-Year-Old?',
    b: 'Understanding the Factors That Influence Life Insurance Premiums',
    winner: 'a',
    metric: '4× organic clicks; the question matches how people actually search',
    source: 'The Insurance Center, Search Console (Jett Iverson)',
  },
  {
    id: 9,
    type: 'which-won',
    context: 'Homepage hero subhead — freelance design studio',
    a: 'We build brands for companies that are done blending in.',
    b: 'A full-service creative agency delivering end-to-end brand solutions.',
    winner: 'a',
    metric: '+40% scroll-past-hero and +19% contact clicks',
    source: 'illustrative',
  },
  {
    id: 10,
    type: 'which-won',
    context: 'Cold outreach opening line — agency prospecting',
    a: 'I noticed your top competitor is showing up in ChatGPT answers and you are not.',
    b: 'I hope this email finds you well. I wanted to reach out about your marketing.',
    winner: 'a',
    metric: '3.5× reply rate for the specific observation',
    source: 'illustrative',
  },
  {
    id: 11,
    type: 'spot-ai',
    context: 'Instagram caption — small-batch coffee roaster',
    options: [
      'Burned my hand on the roaster again. Worth it. New Ethiopia lands Friday.',
      'In a world of mass-produced coffee, we believe in the art of the small batch.',
      'Friday. Ethiopia. Washed. Notes of peach and something we keep arguing about.',
      "3am roast session because that's when the drum sounds right. Link in bio.",
    ],
    aiIndices: [1],
    explain:
      'The AI line is the one with no specific detail — no burned hand, no 3am, no argument about tasting notes. "In a world of…" and "the art of the…" are stock construction.',
  },
  {
    id: 12,
    type: 'spot-ai',
    context: 'Product description — mechanical keyboard',
    options: [
      'Elevate your typing experience with a keyboard designed for both productivity and style.',
      'Sounds like a typewriter, feels like butter, annoys everyone in your meeting.',
      '75% layout. Hot-swap sockets. The stabilizers come lubed because life is short.',
      'Doubleshot PBT keycaps that will outlive the laptop you plug them into.',
    ],
    aiIndices: [0],
    explain:
      '"Elevate your … experience," "designed for both X and Y" — hedged, benefit-free, could describe any keyboard. The others make a claim or a joke a person would actually write.',
  },
  {
    id: 13,
    type: 'spot-ai',
    context: 'LinkedIn post opener — marketer sharing a lesson',
    options: [
      'We cut our ad budget 40% last quarter. Leads went up. Here is what happened.',
      "Everyone said I was crazy. They were wrong. Here's the story. 🧵",
      'In today’s fast-paced digital landscape, marketers must constantly adapt to stay ahead.',
      'A client fired us, then rehired us six weeks later. The reason still bugs me.',
    ],
    aiIndices: [2],
    explain:
      '"In today’s fast-paced digital landscape" is the single most common AI opener. It states a truism and commits to nothing. Option 2 is human but bad — clickbait, not AI.',
  },
  {
    id: 14,
    type: 'spot-ai',
    context: 'Homepage value proposition — project management app',
    options: [
      'Plan less. Ship more. Argue about scope somewhere other than Slack.',
      'Streamline your workflow and boost team productivity with our all-in-one solution.',
      'The to-do app your PM will not be able to reorganize into oblivion.',
      'Deadlines that move when you move them, not when a Gantt chart says so.',
    ],
    aiIndices: [1],
    explain:
      '"Streamline your workflow," "boost productivity," "all-in-one solution" — three filler phrases in one sentence. No point of view. The rest have an opinion about how teams actually work.',
  },
  {
    id: 15,
    type: 'spot-ai',
    context: 'Email sign-off — SaaS onboarding sequence',
    options: [
      "Reply to this email if you get stuck. A real person (me) reads them.",
      'Should you have any questions, please do not hesitate to reach out to our team.',
      'That’s everything for day one. Tomorrow: the one setting everyone forgets.',
      "Hit reply with your biggest headache right now and I'll point you somewhere useful.",
    ],
    aiIndices: [1],
    explain:
      '"Should you have any questions, please do not hesitate" is boilerplate politeness with no human on the other end. The others name a person, a next step, or ask for something specific.',
  },
  {
    id: 16,
    type: 'spot-ai',
    context: 'Ad copy — budgeting app, two of these are AI',
    options: [
      'Take control of your finances with a smarter way to budget.',
      'You spent $312 on coffee last month. We are not judging. (We are a little.)',
      'Effortlessly manage your money and achieve your financial goals today.',
      'See every subscription you forgot about, in one slightly upsetting list.',
    ],
    aiIndices: [0, 2],
    explain:
      'Both AI lines lean on "take control of your finances" / "achieve your financial goals" — generic aspiration, no specifics. The human lines cite a real number or a real feeling.',
  },
];

/**
 * Optional hand-picked schedule: date (YYYY-MM-DD) -> exactly the round ids for
 * that day. Any date not listed falls back to deterministic selection by date.
 * Keep this for launch week and any day you want to curate.
 */
export const schedule: Record<string, number[]> = {};
