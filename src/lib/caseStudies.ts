export type CaseStudyMetric = {
  label: string;
  before: string;
  after: string;
  change: string;
  source: string;
};

export type CaseStudyStat = {
  label: string;
  value: string;
  note: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  tagline: string;
  client: string;
  role: string;
  period: string;
  tags: string[];
  overview: string[];
  metrics: CaseStudyMetric[];
  blogEngine?: {
    intro: string;
    stats: CaseStudyStat[];
    points: string[];
  };
  geo?: {
    intro: string;
    points: string[];
  };
  /** Free-form sections for case studies that aren't about search. */
  sections?: {
    heading: string;
    paragraphs?: string[];
    points?: string[];
  }[];
  searchlight?: string;
  disclosures: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: 'organic-search',
    title: "How I Grew an Insurance Agency's Organic Search 203%",
    tagline:
      'Two years of SEO and GEO work at The Insurance Center, through a full website migration — measured in GA4 and Search Console.',
    client: 'The Insurance Center — an independent insurance agency in Northern Utah',
    role: 'Acting Director of Marketing',
    period: 'June 2024 – present',
    tags: ['SEO', 'GEO', 'Website Migration', 'GA4', 'Search Console'],
    overview: [
      "I'm Acting Director of Marketing at The Insurance Center, an independent insurance agency in Northern Utah. I took over marketing in June 2024. No one had held the role in a dedicated capacity before me.",
      'In April 2026 the agency migrated to a new website. I owned SEO and GEO strategy through that migration — information architecture, redirects, content, and the plan for rebuilding organic visibility on a new site.',
      "The numbers below were pulled live from GA4's Organic Search channel and Google Search Console.",
    ],
    metrics: [
      {
        label: 'Organic search sessions',
        before: '139 / mo',
        after: '421 / mo',
        change: '+203%',
        source: 'GA4 — Organic Search channel · June 2024 → July 2026',
      },
      {
        label: 'Organic pageviews',
        before: '235 / mo',
        after: '780 / mo',
        change: '+232%',
        source: 'GA4 — Organic Search channel · same span',
      },
      {
        label: 'Search Console impressions — new site',
        before: '1,860 / mo',
        after: '28,106 / mo',
        change: '15.1×',
        source: 'Google Search Console · April 2026 launch month → September 2026',
      },
      {
        label: 'SEO/GEO content pages built',
        before: 'from a near-blank slate',
        after: 'in five months',
        change: '50 pages',
        source: 'Built on the new site after the April 2026 migration',
      },
    ],
    blogEngine: {
      intro:
        'I built and run an automated workflow for the agency blog. It handles ideation, drafting, grading, revision, and publishing. It posts once a week, runs on its own, and saves me 3–5 hours every week.',
      stats: [
        {
          label: 'Search impressions',
          value: '20,462',
          note: 'Blog and content pages · Jul 9 – Oct 6, 2026 · Search Console',
        },
        {
          label: 'Average position',
          value: '16.3',
          note: 'Impression-weighted · same window',
        },
        {
          label: 'Search clicks',
          value: '109',
          note: 'From 21 pages that earned at least one click',
        },
        {
          label: 'Share of site impressions',
          value: '27%',
          note: '24% of the site’s search clicks · 77,149 impressions and 445 clicks site-wide',
        },
        {
          label: 'Publishing cadence',
          value: '1 / week',
          note: 'Runs without manual steps',
        },
        {
          label: 'Time saved',
          value: '3–5 hrs / wk',
          note: 'Versus writing and posting by hand',
        },
      ],
      points: [
        '50 of the 59 pages in this group earned impressions in the first 90 days.',
        'Visibility is ahead of clicks: 109 clicks on 20,462 impressions is a 0.53% click-through rate. The life insurance cost post sits at position 2.2 with 3 clicks, which points to a title and meta description problem, so that is the next fix.',
      ],
    },
    geo: {
      intro:
        'GEO is generative-engine optimization — showing up inside AI answers, not just the ten blue links. I ran a GEO audit across the four assistants people actually use: ChatGPT, Claude, Gemini, and Perplexity. It scored the agency’s visibility at 61/100.',
      points: [
        'The audit checked whether the agency gets cited, described accurately, and recommended when someone asks an insurance question in each assistant.',
        'Search Console now logs real AI-conversation search queries. I verified our content ranking inside those queries — not just traditional search.',
        'One article ranks at position 1 for “how much is life insurance for a 30 year old.”',
      ],
    },
    searchlight:
      "This is the same SEO and GEO practice I’m building into SearchLight Digital, my own agency (pre-launch). It’s kept separate from my work at The Insurance Center.",
    disclosures: [
      'Data integrity: while pulling this data I caught a tracking anomaly — two GA4 properties spiking almost identically in a way Search Console didn’t support. I excluded it instead of reporting it as growth. It was still there when I re-checked in late October: GA4 organic sessions for August through October 2026 read roughly 1,500, 4,600, and 3,400 against 146, 178, and 154 Search Console clicks. That is why the session figures above stop at July 2026. Every number above is what held up after that.',
      'The blog engine figures cover the 59 content URLs in the site’s sitemap group for blog and content pages (Search Console and GA4, Jul 9 – Oct 6, 2026). That group includes a few service and location pages and event recaps, so not every page in it came out of the automated workflow.',
      "One thread of this work connects to an active prospect — an ongoing business relationship I don’t identify here.",
    ],
  },
  {
    slug: 'ai-prospecting-agent',
    title: 'I Connected ZoomInfo to Claude and Outreach Volume Rose 400%',
    tagline:
      "An MCP agent that pulls and ranks the week's best prospects, then drafts the outreach. Built and run at The Insurance Center.",
    client: 'The Insurance Center — an independent insurance agency in Northern Utah',
    role: 'Acting Director of Marketing',
    period: 'Ongoing',
    tags: ['AI', 'MCP', 'ZoomInfo', 'Claude', 'Prospecting'],
    overview: [
      "I run marketing at The Insurance Center solo, with no marketing department, so prospecting has to run without me building lists by hand.",
      "I connected ZoomInfo to Claude through an MCP server. It runs weekly: it pulls the top 10-15 prospects, ranks them (niche first, then geography, then Utah), and drafts the outreach for each.",
    ],
    metrics: [
      {
        label: 'Outreach volume',
        before: 'Before the agent',
        after: 'After the agent',
        change: '+400%',
        source: 'The Insurance Center outreach activity, before vs. after the agent went live',
      },
      {
        label: 'Weekly ranked prospects',
        before: 'Raw ZoomInfo search',
        after: 'Ranked, with drafts',
        change: '10–15',
        source: 'Agent output each week',
      },
    ],
    sections: [
      {
        heading: 'What it does',
        points: [
          'Pulls the week’s top prospects from ZoomInfo through an MCP server, with no manual list-building.',
          'Ranks them in a fixed order: niche, then geography, then Utah.',
          'Drafts outreach for each prospect so the work left for me is review and send.',
        ],
      },
      {
        heading: 'What came of it',
        paragraphs: [
          'Outreach volume went up 400%, and multiple large accounts converted. It runs in production, not as a demo.',
        ],
      },
    ],
    disclosures: [
      'The 400% figure compares outreach volume before and after the agent. Prospect names and account details are not published here.',
    ],
  },
  {
    slug: 'marketing-dashboard',
    title: 'From a Week of Reports to a One-Minute Answer',
    tagline:
      'A React and Python dashboard that puts SEO performance, lead flow, keyword rank, and revenue attribution in one place.',
    client: 'The Insurance Center — an independent insurance agency in Northern Utah',
    role: 'Acting Director of Marketing',
    period: 'Ongoing',
    tags: ['React', 'Python', 'Dashboard', 'Attribution', 'SEO'],
    overview: [
      'Answering "what\'s actually working?" used to take about a week of reports.',
      'I built a dashboard in React and Python that combines SEO performance, lead flow, keyword rank, and revenue attribution, so those questions get answered in the same view.',
    ],
    metrics: [
      {
        label: 'Time to answer "what\'s working?"',
        before: 'About a week of reports',
        after: 'Under a minute',
        change: 'Week → <1 min',
        source: 'Time from question to answer, before vs. after the dashboard',
      },
      {
        label: 'Data combined in one view',
        before: 'Separate reports',
        after: 'One dashboard',
        change: '4 sources',
        source: 'SEO performance, lead flow, keyword rank, revenue attribution',
      },
    ],
    sections: [
      {
        heading: 'Why it matters',
        paragraphs: [
          'I measure every channel against revenue. Putting revenue attribution next to SEO performance, lead flow, and keyword rank means the answer is already there when the question comes up.',
        ],
      },
    ],
    disclosures: [
      'The time comparison is my own before-and-after for answering a "what\'s working?" question, not an external benchmark.',
    ],
  },
  {
    slug: 'youtube-growth',
    title: 'Growing a Business YouTube Channel About 12× in a Year',
    tagline:
      "A video editing workflow took the agency's YouTube channel from 31.9K views in 2025 to 395.2K in 2026.",
    client: 'The Insurance Center — an independent insurance agency in Northern Utah',
    role: 'Acting Director of Marketing',
    period: '2025 – 2026',
    tags: ['YouTube', 'Video', 'Social', 'Workflow'],
    overview: [
      "Video is one of the channels I own at The Insurance Center, alongside paid search, SEO and GEO, social, lifecycle email, and reputation.",
      'I built a video editing workflow, and the channel grew from 31.9K views in 2025 to 395.2K in 2026 (through Oct 26), about 12×. Watch time went from 128 to 7,900 hours.',
    ],
    metrics: [
      {
        label: 'Channel views',
        before: '31.9K (2025)',
        after: '395.2K (2026)',
        change: '≈12×',
        source: 'YouTube Analytics · 2025 vs. 2026 through Oct 26',
      },
      {
        label: 'Watch time',
        before: '128 hrs',
        after: '7,900 hrs',
        change: '≈62×',
        source: 'YouTube Analytics · same periods',
      },
    ],
    sections: [
      {
        heading: 'What changed',
        paragraphs: [
          'The video editing workflow is what changed. Views went from 31.9K to 395.2K and watch time from 128 to 7,900 hours, and I run organic social across platforms alongside it.',
        ],
      },
    ],
    disclosures: [
      'The 2026 figures run through October 26, 2026, so the year is not complete. Both years are measured on the same channel.',
    ],
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
