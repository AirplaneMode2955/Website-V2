export type ArticleSection = {
  heading?: string;
  body: string;
};

export type Article = {
  slug: string;
  source: 'on-site' | 'LinkedIn Pulse';
  readTime: string;
  date: string;
  title: string;
  excerpt: string;
  url?: string;
  status: 'published' | 'coming-soon';
  topics: string[];
  sections?: ArticleSection[];
};

export const articles: Article[] = [
  {
    slug: 'why-small-businesses-are-invisible-to-ai-search',
    source: 'on-site',
    readTime: '6 min read',
    date: 'June 2026',
    title: 'Why Your Small Business Is Invisible to AI Search (And What to Do About It)',
    excerpt:
      'AI Overviews, ChatGPT, and Perplexity are now answering millions of searches before a single link gets clicked. If your business isn\'t optimized for these systems, you\'re losing customers you\'ll never even know about.',
    status: 'published',
    topics: ['GEO', 'SEO', 'Small Business', 'AI Search'],
    sections: [
      {
        body: `Something changed in search, and most small businesses haven't noticed yet.

When someone types "best insurance agency near me" or "who should I trust for commercial coverage," they used to see ten blue links and pick one. Now, increasingly, they see an AI-generated answer at the top of the page — one that cites specific businesses, quotes their content, and sometimes doesn't show the traditional results at all.

That answer isn't random. It's not a mystery. It's the result of a system — and if you understand how it works, you can influence it.

This is Generative Engine Optimization, or GEO. And for small businesses competing against bigger players with larger budgets, it might be the most important shift in marketing you'll see this decade.`,
      },
      {
        heading: 'The shift nobody briefed you on',
        body: `Traditional SEO was about ranking on page one of Google. The goal was simple: show up in the ten blue links and get clicks. Local businesses competed on reviews, on-page signals, and backlinks.

That game hasn't ended — but a second game has started running alongside it.

AI-generated answers (Google calls them AI Overviews, formerly Search Generative Experience) now appear at the top of a significant percentage of searches. ChatGPT, Perplexity, and other AI assistants are being used to directly answer questions that used to require clicking a website.

The user asks a question. The AI answers it. The user moves on.

If your business isn't part of that answer, you don't exist in that moment — even if you rank #1 in the traditional results below.`,
      },
      {
        heading: 'Why small businesses are especially at risk',
        body: `Large brands have something small businesses often don't: authoritative, well-structured content at scale. They have dedicated teams writing detailed guides, FAQs, and explainer content — exactly the kind of material AI systems pull from when composing answers.

Small business websites, by contrast, often have thin content. A homepage. A services page. Maybe a "Contact Us." Nothing that gives an AI model enough substance to cite them as an authoritative source.

This isn't a technology problem. It's a content gap — and it's one that's entirely fixable.

The businesses that solve it now, while most of their local competitors are still playing the old SEO game, will have a compounding advantage that's hard to close later.`,
      },
      {
        heading: 'What AI systems actually look for',
        body: `GEO is still being studied, but what's emerging from research and practitioner experience is consistent:

**Authoritativeness signals.** AI systems favor content from sources that other credible sources reference. This means the fundamentals of traditional SEO — earning quality backlinks, getting cited by local press, building review volume — still matter. They feed into GEO.

**Direct, specific answers.** AI models are essentially looking for the clearest answer to a question. If someone asks "what's the difference between term and whole life insurance," the business whose website clearly, accurately answers that question in a well-structured format is more likely to get cited.

**Schema markup and structured data.** When your site tells search engines (and by extension, AI crawlers) exactly what you are — your business type, service areas, hours, specialties — you give those systems cleaner signals to work with.

**E-E-A-T: Experience, Expertise, Authoritativeness, Trustworthiness.** Google has long valued these signals, and they flow directly into AI Overviews. Real case studies, expert bylines, credentials, and transparent information all contribute.`,
      },
      {
        heading: 'Three things you can do this week',
        body: `You don't need a team of content writers or a six-figure agency retainer to start closing this gap.

**1. Write one comprehensive FAQ page for your most-asked questions.** Think about the five questions prospects ask you most often before hiring you. Write clear, complete, conversational answers to each one on a single dedicated page. Structure it with headers. This is low-hanging fruit for AI citation.

**2. Add or update your schema markup.** LocalBusiness schema, FAQPage schema, and Service schema tell AI crawlers exactly what your business does and where. Most website platforms make this manageable with plugins or settings.

**3. Build a consistent presence on data sources AI models trust.** Google Business Profile, Yelp, industry-specific directories, and local news citations are all inputs. An actively managed GBP with recent photos, updated hours, and consistent responses to reviews is a signal worth investing in.

None of this is a one-time fix. GEO is an ongoing practice, just like traditional SEO. But the businesses that start now will be the ones that show up in AI answers six months from now — while their competitors are still wondering why their traffic is declining.`,
      },
      {
        heading: 'The bottom line',
        body: `The rules of search changed, and they changed fast. AI-generated answers are not a future trend — they're happening now, in real searches, for real businesses.

The small businesses that adapt early won't just survive the shift. They'll have a window to take market share from larger competitors who are slower to move.

GEO isn't a replacement for great service, fair prices, and genuine expertise. It's the thing that makes sure those qualities actually get discovered.`,
      },
    ],
  },
  {
    slug: 'seo-still-works-heres-what-changed',
    source: 'on-site',
    readTime: '7 min read',
    date: 'June 2026',
    title: 'SEO Still Works. Here\'s What Changed and What Still Matters in 2026',
    excerpt:
      'Every few years someone declares SEO dead. It never dies — but it does change. Here\'s an honest look at what\'s different in 2026, what still works exactly as it always did, and where small businesses should focus their energy.',
    status: 'published',
    topics: ['SEO', 'GEO', 'Small Business', 'Content Strategy'],
    sections: [
      {
        body: `Every year, someone writes the "SEO is dead" article. And every year, businesses that understand SEO keep using it to generate inbound leads that cost a fraction of paid advertising.

SEO isn't dead. But it has changed — in ways that matter, that are real, and that most agencies aren't being straight with their clients about.

Here's what's actually different in 2026, and what any small business needs to know to make smart decisions about where to invest their marketing dollars.`,
      },
      {
        heading: 'What\'s genuinely different',
        body: `**AI Overviews have changed the top of the page.** Google's AI-generated summaries now sit above traditional results for a growing percentage of queries. For some informational searches, users get a complete answer before they see a single organic link. Click-through rates for those positions have shifted as a result.

This doesn't mean ranking doesn't matter — it means the nature of what you're competing for has expanded. You're competing for AI citation as well as blue-link position.

**Zero-click searches are a real phenomenon.** Users getting answers directly from search results without clicking through to websites has been a trend for years, and it's accelerating. Featured snippets, People Also Ask boxes, and now AI Overviews all serve this pattern.

The response is not to panic. It's to produce content that earns the citation — because even in a zero-click environment, being named as the authoritative source builds brand recognition and drives eventual conversions.

**The content quality bar is higher.** Google's Helpful Content updates over the past few years have penalized thin, keyword-stuffed, SEO-for-SEO's-sake content. What ranks now is content that's genuinely useful to the reader — written by someone who actually knows the subject.`,
      },
      {
        heading: 'What hasn\'t changed at all',
        body: `**Technical fundamentals still matter.** A site that loads slowly, has broken links, poor mobile experience, or thin page structure will underperform — in 2016 and in 2026. The core technical work hasn't become less important; it's become table stakes.

**Links are still a signal.** The "links don't matter anymore" narrative has circulated for years. It's not accurate. High-quality, relevant backlinks remain one of the strongest ranking signals. What's changed is that manipulative link building has been devalued, and genuine editorial links from credible sources are more valuable than ever.

**Local search is still very much alive for local businesses.** Google Maps rankings, local pack positions, and Google Business Profile optimization directly drive foot traffic and phone calls for local businesses. This channel is not disrupted by AI Overviews in the same way national searches are.

**Reviews compound.** A business with 200 genuine five-star reviews and a strong GBP presence outperforms competitors with better websites and bigger budgets in local search, consistently. This has been true for a decade and it's still true.`,
      },
      {
        heading: 'The honest truth about keywords',
        body: `Keyword research is still essential — but the intent model has evolved.

In 2015, you'd identify a keyword ("home insurance Logan Utah") and write a page that targeted it. That still works for some queries.

But modern SEO requires thinking in topic clusters and user journeys, not individual keywords. What does someone searching for home insurance actually need to know? What questions do they ask along the way? What makes them choose one agency over another?

The businesses that answer those questions comprehensively — in a way that a real expert would — are the ones that rank and get cited. The ones that stuff keywords into thin pages are falling behind.`,
      },
      {
        heading: 'Where small businesses should focus',
        body: `If you're a small business trying to prioritize where to put your SEO energy in 2026, here's a straightforward framework:

**Priority 1: Google Business Profile.** If you serve a local area, your GBP is the highest-ROI SEO asset you have. Fill out every field. Maintain recent photos. Post updates. Respond to every review. This directly affects your Maps ranking and is increasingly integrated into AI-generated local answers.

**Priority 2: A small number of genuinely useful articles.** You don't need a 50-post blog. You need five to ten pieces of content that actually answer the questions your prospects ask — written in a way that demonstrates real expertise. These compound over time.

**Priority 3: Consistent NAP and structured data.** Your Name, Address, and Phone number should be identical everywhere on the internet — your site, your GBP, every directory. Structured data helps search engines and AI models understand exactly what you offer.

**Priority 4: Earn citations and links through real-world activity.** Local press, chamber of commerce memberships, industry associations, sponsorships — these build the kind of authority signals that no amount of on-page optimization can replicate.`,
      },
      {
        heading: 'The mindset shift that matters most',
        body: `The businesses that struggle with SEO are usually treating it as a technical checklist. The businesses that win at it have internalized a different mindset: they're trying to be the best resource for the people they serve.

When you write genuinely useful content, earn genuine reviews, build genuine relationships that result in citations — you build something that search algorithms and AI models are actively trying to surface.

SEO has always rewarded this. It just rewards it more reliably now than it used to.`,
      },
    ],
  },
  {
    slug: 'geo-practical-guide-for-local-businesses',
    source: 'on-site',
    readTime: '8 min read',
    date: 'June 2026',
    title: 'GEO: A Practical Guide for Local Businesses Who Want to Show Up in AI Answers',
    excerpt:
      'Generative Engine Optimization is not a buzzword — it\'s a real, actionable discipline. Here\'s a ground-level guide to what GEO is, how it works, and the specific moves any local business can make to start showing up in AI-generated answers.',
    status: 'published',
    topics: ['GEO', 'Local SEO', 'Small Business', 'AI Search'],
    sections: [
      {
        body: `Let's start with what GEO actually is, because the term is being used loosely in a lot of marketing conversations right now.

Generative Engine Optimization is the practice of structuring your content, authority signals, and digital presence so that AI systems — Google's AI Overviews, ChatGPT, Perplexity, and others — include your business in the answers they generate for relevant queries.

It's the discipline of getting cited, not just ranked.

That distinction matters. Traditional SEO is about earning a position in a list of links. GEO is about earning a mention in a generated response — which means the AI has to determine that your business is a credible, relevant source worth naming.

Here's how to make that happen.`,
      },
      {
        heading: 'Understand how AI answers are built',
        body: `AI systems that generate answers are trained on large datasets, then retrieve and synthesize current information from the web at query time. When you ask ChatGPT or Perplexity who the best local insurance agency is, they're pulling from indexed web content, business directories, review platforms, and sources they've learned to weight as credible.

Google's AI Overviews work similarly, but with access to Google's full knowledge graph — which means your GBP data, local review signals, and how Google has categorized your business all feed into the output.

What this means practically: GEO isn't one thing you do. It's the aggregate of everything that signals "this business is credible and relevant" across the web.`,
      },
      {
        heading: 'The four pillars of GEO for local businesses',
        body: `**Pillar 1: Authoritative, specific content on your website**

AI models cite content that directly and clearly answers questions. The best content for GEO is not your homepage — it's your FAQ pages, your service explainers, your blog posts that address the exact questions your customers ask before hiring someone.

Write as if you're explaining something to a smart person who knows nothing about your industry. Be specific. Be complete. Use headings that match the natural language of the question. "What does general liability insurance cover for contractors?" is a heading that will get cited. "Our Insurance Solutions" is not.

**Pillar 2: Consistent structured data and business listings**

AI systems that generate local answers rely heavily on structured data. This means:
- Your Google Business Profile is fully filled out with the right categories, service areas, business description, and accurate contact info
- Your website has LocalBusiness schema markup
- Your NAP (Name, Address, Phone) is identical on every platform — website, GBP, Yelp, industry directories, and anywhere else you appear

Inconsistency here is a trust signal problem. AI models prefer sources that are consistently described across multiple data points.

**Pillar 3: Third-party validation**

This is where GEO and traditional SEO overlap most directly. AI models give weight to businesses that other credible sources reference. This means:
- Genuine reviews on Google, Yelp, and relevant platforms
- Citations in local press, industry publications, or community resources
- Backlinks from credible local or industry websites
- Mentions in other content that AI models might pull from

A business with 300 genuine Google reviews, features in two local news articles, and a listing in an industry association directory is giving AI models multiple corroborating signals that it's a real, established, trusted business.

**Pillar 4: Demonstrating E-E-A-T through your content**

Google's concept of Experience, Expertise, Authoritativeness, and Trustworthiness (E-E-A-T) directly shapes what AI Overviews surface. The tactics:
- Byline articles with real credentials ("Written by [Name], Licensed Property & Casualty Insurance Agent")
- Case studies and specific outcomes, not vague claims
- Transparent business information: physical address, named staff, licensing numbers where applicable
- Content that demonstrates genuine domain expertise — not just information that could have been copied from any insurance website`,
      },
      {
        heading: 'A 90-day GEO action plan',
        body: `If you want a concrete starting point, here's a sequence that builds the most important foundations first:

**Month 1: Fix the foundation**
- Audit and complete your Google Business Profile completely
- Ensure your NAP is consistent across the five or ten most important directories (Google, Yelp, Facebook, Apple Maps, industry-specific directories)
- Add LocalBusiness and Service schema to your website if it's missing
- Respond to every existing review, positive and negative

**Month 2: Build the content core**
- Identify the ten questions prospects ask most before hiring you
- Write clear, expert-level answers to each — one dedicated FAQ page, or a set of individual posts
- Add author bylines with credentials to any content pages
- Start a systematic process for requesting reviews from happy clients

**Month 3: Build authority**
- Reach out to one or two local publications about coverage of your business (a milestone, a community initiative, a genuinely useful angle)
- Look for industry association directories or local chamber resources where you're not yet listed
- Identify one or two websites that serve your audience that might link to your content
- Review your content for specificity — replace any vague claims with specific outcomes and evidence

This isn't glamorous. But it's the work that compounds. A business that executes this consistently for twelve months is building the kind of authority that AI systems are designed to surface — and it becomes increasingly hard for competitors to replicate.`,
      },
      {
        heading: 'How to know if it\'s working',
        body: `GEO is harder to track than traditional SEO because there's no "GEO ranking report" you can pull. But there are signals:

- Run your most important queries through Google, ChatGPT, and Perplexity periodically and note whether your business is mentioned
- Watch for changes in direct traffic, branded search volume, and conversion rates — GEO affects top-of-funnel discovery even when it's hard to attribute directly
- Monitor your Google Business Profile for increases in profile views, direction requests, and phone calls
- Track your review volume and rating trend

The goal isn't a perfect attribution model. The goal is to be the business that shows up when a potential customer asks an AI what they should do. That's a conversion opportunity that didn't exist three years ago, and it's available to local businesses willing to put in the foundational work.`,
      },
      {
        heading: 'One final thought',
        body: `The businesses that dismiss GEO as a buzzword right now are making the same mistake that businesses made when they dismissed mobile search in 2012 or local SEO in 2014.

The channel is real. The traffic is real. The businesses adapting to it early are picking up market share that will be difficult to claw back later.

You don't need to understand the technical details of how large language models work. You just need to commit to being the most credible, clearly described, actively maintained business in your space — and then make sure that credibility is legible to the systems that are being asked about you.

That's GEO. And it's available to any business willing to do the work.`,
      },
    ],
  },
  {
    slug: 'what-it-means-to-be-big-i-best-practices-agency',
    source: 'LinkedIn Pulse',
    readTime: '5 min read',
    date: 'March 2026',
    title: 'What It Means to Be a Big "I" Best Practices Agency (And Why It Should Matter to You)',
    excerpt:
      'The Big "I" Best Practices designation identifies the top-performing independent agencies in the country. The Insurance Center has earned it six consecutive years running — here\'s what that means.',
    url: 'https://www.linkedin.com/pulse/what-means-big-i-best-practices-agency-why-should-matter-4pizc/',
    status: 'published',
    topics: ['Insurance', 'Agency Management', 'Best Practices'],
  },
  {
    slug: 'ai-not-replacing-insurance-brokers',
    source: 'LinkedIn Pulse',
    readTime: '4 min read',
    date: 'March 2026',
    title: "AI Isn't Replacing Insurance Brokers, It's Making the Best Ones Better",
    excerpt:
      'How integrating AI into the workflow enhances broker efficiency — spending less time on admin and more time providing meaningful guidance on coverage gaps and risk.',
    url: 'https://www.linkedin.com/pulse/ai-isnt-replacing-insurance-brokers-its-making-best-lmkhc/',
    status: 'published',
    topics: ['AI', 'Insurance', 'Workflow'],
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getOnSiteArticles(): Article[] {
  return articles.filter((a) => a.source === 'on-site' && a.status === 'published');
}
