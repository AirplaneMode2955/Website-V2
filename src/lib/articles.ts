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
    slug: 'why-i-record-my-commute-to-practice-talking',
    source: 'on-site',
    readTime: '3 min read',
    date: 'September 2026',
    title: 'Why I Turned My Commute Into a Daily Speaking Practice',
    excerpt:
      'I started recording unscripted takes on my drive to work because talking clearly under pressure does not improve from reading about it. A few weeks and two dozen episodes in, here is what changed.',
    status: 'published',
    topics: ['Communication', 'Personal Growth', 'Commute 2 Work'],
    sections: [
      {
        body: `My job runs on talking. Client calls, team meetings, video scripts, the pitch I give a prospect who has never heard of SearchLight Digital. For a while, my off-the-cuff answer to most of that was worse than my written one — I'd get the thought right in my head and lose half of it on the way out of my mouth.

Reading about communication was not going to fix that. The only thing that fixes talking badly is talking, a lot, with the camera rolling so I can't pretend it went better than it did. So on August 27, I set my phone on the dash, picked a topic, and pressed record on the drive to work. That's Commute 2 Work — no studio, no script, no editing out the bad parts.`,
      },
      {
        heading: 'One take, no do-overs',
        body: `The rule is simple and it's the whole point: whatever comes out in that drive is what gets posted. No retakes, no cutting the sentence where I trail off, no polishing the argument after the fact. [Starting something new](https://www.youtube.com/watch?v=aWe6VkZ82Gs) is the first one — ten minutes, one topic, every flaw left in.

That constraint is uncomfortable on purpose. The moment I know I can fix it later, I stop working to get it right the first time. Removing the safety net is what makes the rep count.`,
      },
      {
        heading: 'The topic was never really the topic',
        body: `Day one I argued through whether college is still worth it in the AI era. [Is college worth it in the AI era??](https://www.youtube.com/watch?v=xDUvqACH2C8) is not really about college when you watch it back — it's about picking a position cold and defending it out loud for ten straight minutes without notes.

That's the actual skill being built. Not opinions about college. The ability to take a stance, structure it as I go, and land it before I run out of road.`,
      },
      {
        heading: "What's different after two dozen episodes",
        body: `Less throat-clearing. I used to spend the first thirty seconds of any answer warming up to the point. Now I lead with it, because I've had to lead with it two dozen mornings in a row with the clock running.

Fewer dead ends. The habit of talking myself into a sentence I can't finish has mostly gone away, because on camera there's nowhere to hide when it happens. And it carries over — the same muscle that gets me through ten unscripted minutes on a commute is the one that gets me through a client asking a question I didn't prep for.`,
      },
      {
        heading: "Start before it's good",
        body: `None of these are polished. That's on purpose. If you're waiting to sound good before you talk more, you have it backwards — the reps are what make you sound good, not the other way around.

The channel's on YouTube if you want to see the format: [Commute 2 Work](https://www.youtube.com/@Commute2Work).`,
      },
    ],
  },
  {
    slug: 'the-x-factor-is-two-skills-colliding',
    source: 'on-site',
    readTime: '3 min read',
    date: 'September 2026',
    title: 'The "X Factor" Is Just Two Skills Nobody Else Has Combined',
    excerpt:
      'I spent a week of episodes on the same question: what actually creates an "X factor"? Not a rare trait — usually two ordinary skills nobody bothered to combine in one person.',
    status: 'published',
    topics: ['Personal Growth', 'Marketing', 'Commute 2 Work'],
    sections: [
      {
        body: `I kept coming back to the same question across one stretch of episodes: what actually makes someone have an "X factor"? Not talent in the vague sense — the specific thing that makes one marketer, one founder, one person in a room read as different from everyone else with the same resume.

I recorded four separate takes on it because I didn't buy my own first answer. Here's where I landed.`,
      },
      {
        heading: 'The trait explanation does not hold up',
        body: `The easy answer is charisma or confidence — something you either have or don't. [Alex Hormozi's definition of the X factor](https://www.youtube.com/watch?v=GHrc95PnRoI) pushed back on that, and once I sat with it, the trait explanation stopped making sense to me. Confidence is downstream of competence. Nobody is magnetic about a skill they're bad at.

[The French secret to the X factor](https://www.youtube.com/watch?v=b3fHll8XQWk) points at the same thing from a different angle: the people who read as effortlessly good at something usually put in unreasonable, unglamorous hours on it somewhere nobody was watching.`,
      },
      {
        heading: 'The real move is combination',
        body: `The version I actually believe: the X factor shows up when you stack two skills that don't normally live in the same person. A marketer who can also write code. An insurance agent who can also build a following. One skill alone puts you in a crowded field, competing on the same axis as everyone else. Two unrelated skills put you in a field with almost no competition, because almost nobody bothered to build both.

[How to get the X factor — why combining unrelated hobbies makes you dangerous](https://www.youtube.com/watch?v=Q0-dUv-EuVI) is where I worked through this the most directly, using my own mix of marketing, AI tooling, and woodworking as the example.`,
      },
      {
        heading: 'Find your two things',
        body: `You don't need a rare talent. You need two ordinary skills that almost nobody else has bothered to put in the same person. Marketing plus data. Sales plus design. Insurance plus content. Pick the second skill on purpose, and give it the same unglamorous hours as the first one.

That's the whole model, and it's testable — find someone with an X factor you admire and check whether it's actually one skill or two stacked together. I'd bet on two, every time.`,
      },
    ],
  },
  {
    slug: 'practicing-answers-out-loud-before-you-need-them',
    source: 'on-site',
    readTime: '3 min read',
    date: 'September 2026',
    title: 'Practicing Answers Out Loud Before You Need Them',
    excerpt:
      'I ran through real interview questions on my commute, out loud, with no script. The gap between the answer in my head and the one that came out of my mouth taught me more than any interview guide has.',
    status: 'published',
    topics: ['Communication', 'Career', 'Commute 2 Work'],
    sections: [
      {
        body: `Ahead of an interview I had coming up, I used a commute to run through the questions I expected, out loud, in real time, with the camera on. [Prepping for an upcoming job interview on today's drive](https://www.youtube.com/watch?v=LeAwTweO2Wc) is that session — unedited, including the answers that didn't land on the first try.

That gap, between the answer sitting in your head and the one that actually comes out of your mouth, is the whole reason this was worth doing.`,
      },
      {
        heading: 'Knowing the answer is not the same as saying it',
        body: `I knew what I wanted to say about most of those questions before I started talking. That didn't stop the first attempt at half of them from coming out circular, or landing on the point three sentences later than it should have.

Thinking through an answer and saying an answer use different muscles. Interview prep that only happens silently, in your head or on a page, only trains the first one. The second one only gets built by talking, badly, until it stops being bad.`,
      },
      {
        heading: 'The autopilot answer is the wrong answer',
        body: `Around the same week I recorded [Are we actually just LLM's???](https://www.youtube.com/watch?v=2SbyJzP8gTU) — half joking, but the question stuck. A lot of what passes for a prepared answer is really a generic response pattern-matched to the question, not an actual answer to what was asked.

The failure mode is the same one that shows up in an interview: someone asks a specific question, and the reply is a rehearsed paragraph that would technically answer three different questions equally badly. Practicing out loud, on a real question, is what forces a specific answer instead of a generic one.`,
      },
      {
        heading: 'Rehearse the moment, not just the material',
        body: `The material — my resume, my accomplishments, my reasons for wanting the job — I already knew. What needed rehearsal was the moment: hearing the question cold and producing a specific answer to it within a few seconds, out loud, in front of another person.

That's what a commute with a camera running actually trains. Not the content of the answer — the act of producing it live.`,
      },
    ],
  },
  {
    slug: 'search-console-ai-query-data',
    source: 'on-site',
    readTime: '7 min read',
    date: 'September 2026',
    title: "What Search Console's AI Query Data Actually Tells You",
    excerpt:
      'Search Console now shows the questions people type into AI assistants. Most of that data sits unused. Here is how to read it and what to do when your pages show up in it.',
    status: 'published',
    topics: ['SEO', 'GEO', 'Search Console', 'Analytics'],
    sections: [
      {
        body: `Open your Search Console performance report and scroll the query list. Mixed in with the usual keywords, you will see full sentences: "how much is life insurance for a 30 year old," "do I need umbrella coverage if I rent," "what happens if I miss a premium payment."

Those are people talking to an assistant, not typing into a search bar. Google folds AI Overviews and, more recently, AI Mode into the same Performance report, so those impressions and clicks land in the export you already pull every month.

Most businesses never look at them.`,
      },
      {
        heading: 'Why the queries look different',
        body: `Conversational queries are longer, they are phrased as questions, and they carry context the searcher would never bother typing into a keyword box — "if I rent," "for a 30 year old," "after a lapse."

Keyword tools do not surface these because nobody was searching them at volume before. They show up in Search Console because that is where the real demand is now visible. The intent is usually specific and mid-funnel: someone weighing a decision, not just browsing.`,
      },
      {
        heading: 'What to actually look at',
        body: `Filter the query report to entries with five or more words, or ones that start with a question word — how, what, why, when, should, do, can. Then sort by impressions and read down the list. You are sorting every query into one of three buckets:

**Ranking well (position 1–5).** Confirm the page answers that exact question in its first paragraph, in plain language, before any preamble.

**Ranking on the edge (position 6–15).** You are close. A heading rewrite to match the question, or a direct-answer sentence near the top, usually moves it.

**Impressions, no clicks, no ranking page.** A content gap. Someone is asking and you have nothing that answers it.`,
      },
      {
        heading: 'The page-1 test',
        body: `At The Insurance Center, one article ranks position 1 for "how much is life insurance for a 30 year old." It ranks there because the page answers that question in the first two sentences, with a real number range, before any setup.

That is the pattern that wins conversational queries: the answer first, the context second, the sales language last or not at all. Assistants pull the sentence that most directly resolves the question. If your answer is buried under three paragraphs of positioning, it does not get pulled.`,
      },
      {
        heading: 'Turning the list into work',
        body: `Make it a monthly loop:

**1.** Export the query report.
**2.** Tag the conversational queries.
**3.** Map each one to an existing page, or mark it as a gap.
**4.** For gaps, write one focused page per question cluster — not a catch-all FAQ, a real page that answers one question well.
**5.** Re-check position after 30 to 60 days.

It compounds. Every question you answer clearly becomes a candidate for the next assistant's answer too, across every engine, not just the one that logged the impression.`,
      },
      {
        heading: 'What it does not tell you',
        body: `Search Console will not show you which assistant sent the impression, and it will not tell you whether you were named inside an AI-generated answer or just listed below it.

For that you still have to run the queries yourself in ChatGPT, Claude, Gemini, and Perplexity and read the output. Search Console tells you what people are asking and whether you rank. A manual audit tells you whether you are actually in the answer. You need both, and they measure different things.`,
      },
      {
        heading: 'Start this week',
        body: `Pull the query report. Filter to questions. Find the three buckets. Take the five highest-impression gaps and write them.

That is the whole method. The businesses doing this now are building an answer library while their competitors are still checking their rank for "insurance agency near me."`,
      },
    ],
  },
  {
    slug: 'the-marketing-metric-that-was-lying',
    source: 'on-site',
    readTime: '5 min read',
    date: 'September 2026',
    title: 'The Marketing Metric That Was Lying to Me',
    excerpt:
      'While pulling two years of organic search data, I found a spike that would have looked great in a report. It was not real. Here is how to catch the ones that are not.',
    status: 'published',
    topics: ['Analytics', 'GA4', 'Data Integrity'],
    sections: [
      {
        body: `I was assembling organic search numbers for a case study — GA4 on one side, Search Console on the other. The GA4 side showed a stretch where traffic jumped hard. On its own it looked like a win.

Then I lined it up against Search Console for the same weeks and it fell apart.`,
      },
      {
        heading: 'What did not add up',
        body: `Two GA4 properties were spiking at almost exactly the same rate, in the same window. Search Console — impressions, clicks, average position — showed nothing over those weeks that would produce that kind of jump.

Real organic growth shows up in both systems, roughly in proportion. This showed up in one, in a shape that looked more like a measurement artifact than actual demand.`,
      },
      {
        heading: 'The decision',
        body: `I could have reported it. It was in the tool, it was technically traffic, and it made the trend line steeper.

I excluded it and used the number both systems agreed on. The growth figures in that case study — 203% more organic sessions, 232% more organic pageviews — are what held up after the anomaly came out.`,
      },
      {
        heading: 'How to catch these',
        body: `**Cross-check every headline number against a second source.** GA4 against Search Console for organic. The ad platform against GA4 for paid. Never report a number that only one system can see.

**Be suspicious of clean correlation.** Two properties, two channels, or two campaigns moving in near-lockstep is usually instrumentation, not the market.

**Ask what mechanism would produce the change.** If you cannot name a real-world cause — a campaign, a ranking gain, a season, a press hit — treat the number as suspect until you can.

**Segment before you celebrate.** A spike concentrated in one source, one geo, or one hour of the day is a flag, not a result.`,
      },
      {
        heading: 'Why this matters more than it sounds',
        body: `An inflated number does not just make one report wrong. It sets a baseline you now have to keep beating. It sends budget toward something that did not actually work. And the first time someone catches one, every other number you have reported gets a second look.

Excluding noise costs you a smaller headline once. Reporting it costs you your credibility later.`,
      },
      {
        heading: 'The rule I use now',
        body: `If a number would change a decision, it gets verified against a second source before it goes in a deck. If it cannot be verified, it goes in with a flag or it does not go in.

That is the whole rule. It is slower. It is also why I can hand someone the underlying data and let them check it themselves.`,
      },
    ],
  },
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
