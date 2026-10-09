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
  geo: {
    intro: string;
    points: string[];
  };
  searchlight: string;
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
        after: '23,314 / mo',
        change: '12.5×',
        source: 'Google Search Console · first four months after the April 2026 launch',
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
      'Data integrity: while pulling this data I caught a tracking anomaly — two GA4 properties spiking almost identically in a way Search Console didn’t support. I excluded it instead of reporting it as growth. Every number above is what held up after that.',
      'The blog engine figures cover the 59 content URLs in the site’s sitemap group for blog and content pages (Search Console and GA4, Jul 9 – Oct 6, 2026). That group includes a few service and location pages and event recaps, so not every page in it came out of the automated workflow.',
      "One thread of this work connects to an active prospect — an ongoing business relationship I don’t identify here.",
    ],
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
