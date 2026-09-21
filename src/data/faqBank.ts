export type FaqEntry = {
  id: string;
  /** Sample question shown as a suggested chip / display text. */
  question: string;
  /** Words/phrases that should trigger this answer when found in a visitor's message. */
  keywords: string[];
  answer: string;
};

export const faqBank: FaqEntry[] = [
  {
    id: 'who',
    question: 'Who is Jett?',
    keywords: ['who is jett', 'who are you', 'about you', 'about jett', 'introduce yourself', 'tell me about yourself'],
    answer:
      "Jett Iverson is a marketer, husband, and AI strategist based in Utah. He's Acting Director of Marketing at The Insurance Center and studying Marketing at Utah State University's Huntsman School of Business, graduating December 2026.",
  },
  {
    id: 'job',
    question: 'Where does Jett work?',
    keywords: ['work', 'job', 'career', 'insurance center', 'employer', 'company', 'occupation'],
    answer:
      "Jett is Acting Director of Marketing at The Insurance Center, an independent agency in Farr West, Utah. He leads SEO, GEO, and AI implementation across the company's entire marketing operation, and started there in June 2024 as a receptionist before earning his P&C insurance license.",
  },
  {
    id: 'searchlight',
    question: 'What is SearchLight Digital?',
    keywords: ['searchlight', 'search light', 'agency', 'seo agency', 'own business', 'founded'],
    answer:
      "SearchLight Digital is the SEO and GEO (Generative Engine Optimization) agency Jett founded — built for the era where AI answers from ChatGPT, Perplexity, and Google AI Overviews are the new page one. It's currently pre-launch. You can see it at searchlight-digital-v2.vercel.app.",
  },
  {
    id: 'geo',
    question: 'What is GEO?',
    keywords: ['geo', 'generative engine optimization', 'ai search', 'chatgpt', 'ai overview', 'perplexity'],
    answer:
      "GEO stands for Generative Engine Optimization — making sure a brand shows up not just in Google search results, but inside AI answers from ChatGPT, Perplexity, and Google's AI Overviews. Jett runs GEO strategy for The Insurance Center and it's the core service behind SearchLight Digital.",
  },
  {
    id: 'school',
    question: 'Where does Jett go to school?',
    keywords: ['school', 'college', 'university', 'usu', 'utah state', 'huntsman', 'degree', 'gpa', 'graduate', 'student'],
    answer:
      "Jett is studying Marketing at Utah State University's Jon M. Huntsman School of Business, on track to graduate in December 2026 with a 3.74 GPA — while working full time at The Insurance Center. He's also a ProSales member and Google Ads / Meta Business Suite certified.",
  },
  {
    id: 'location',
    question: 'Where is Jett from / based?',
    keywords: ['where is jett from', 'live', 'based', 'location', 'utah', 'plain city', 'ogden'],
    answer:
      'Jett was born in Ogden, Utah and grew up in Plain City — a small town with the Wasatch Mountains as a backyard. He still lives and works in Northern Utah today.',
  },
  {
    id: 'mission',
    question: 'Did Jett serve a mission?',
    keywords: ['mission', 'brazil', 'lds', 'mormon', 'portuguese', 'church'],
    answer:
      'Yes — Jett served a two-year mission for The Church of Jesus Christ of Latter-day Saints in Brazil, from 2022 to 2024. He came back fluent in Portuguese with a reset baseline for hard work and a different lens on how people communicate.',
  },
  {
    id: 'wife',
    question: 'Is Jett married?',
    keywords: ['wife', 'married', 'married jett', 'engaged', 'spouse', 'family', 'isabell', 'izzy'],
    answer:
      "Jett married his wife, Izzy, in Taylorsville, Utah on August 12, 2025 — after meeting her in October 2024 and getting engaged in April 2025. He calls it the best day of his life. They also have a dog, Roxie.",
  },
  {
    id: 'projects',
    question: 'What has Jett built?',
    keywords: ['projects', 'built', 'portfolio', 'apps', 'github', 'code', 'programming', 'software'],
    answer:
      "Jett builds SEO/marketing systems and side projects with AI agents — including the SearchLight Digital agency site, The Insurance Center's website and analytics dashboard, an automated Google Reviews workflow, a Premier League live dashboard, Utah Golf Tinder (a course-tracking map app), and this website's chess bot in the Arcade. See the Projects page for the full list, or github.com/AirplaneMode2955.",
  },
  {
    id: 'results',
    question: "What results has Jett gotten at The Insurance Center?",
    keywords: ['results', 'numbers', 'case study', 'case studies', 'metrics', 'growth', 'roi', 'performance'],
    answer:
      "A few highlights: Google Ads impressions grew 7.4× and inbound calls +105% after a full account rebuild; organic search grew 203%; Google Reviews grew +184% (95 → 270) after Jett built a team leaderboard workflow; and automated drip campaigns grew outreach volume +200%. Full breakdowns are on the homepage and Case Studies page.",
  },
  {
    id: 'philosophy',
    question: "What's Jett's philosophy?",
    keywords: ['philosophy', 'motto', 'mindset', 'figure it out', 'values', 'driven by'],
    answer:
      '"Figure it out." Jett is driven by the gap between what\'s possible and what most people think is possible — and he\'s not close to done exploring that gap.',
  },
  {
    id: 'hobbies',
    question: 'What does Jett do outside of work?',
    keywords: ['hobbies', 'free time', 'outside of work', 'fun', 'golf', 'fishing', 'snowmobiling', 'personal life', 'life outside the office'],
    answer:
      "Outside the office, Jett is usually outside, period — golf, fishing, and snowmobiling in the Utah mountains. He grew up playing golf and soccer at Fremont High School and still gets out on the course whenever he can.",
  },
  {
    id: 'ai',
    question: 'Does Jett work with AI?',
    keywords: ['ai', 'artificial intelligence', 'automation', 'ai agents', 'claude', 'chatbot builder'],
    answer:
      "Yes — Jett builds with AI agents rather than around them. That includes lead scoring, review workflows, content pipelines, GEO/AI-search strategy at The Insurance Center, and this very chatbot, which runs on a local Q&A bank instead of a paid AI API.",
  },
  {
    id: 'resume',
    question: "Can I see Jett's resume?",
    keywords: ['resume', 'cv', 'download resume', 'experience', 'work history'],
    answer:
      "Yep — there's a dedicated Resume page with his full work history, or you can download the PDF directly at /resume.pdf.",
  },
  {
    id: 'contact',
    question: 'How do I contact Jett?',
    keywords: ['contact', 'email', 'reach', 'get in touch', 'phone', 'hire', 'reach out', 'connect'],
    answer:
      'Email is the fastest way to reach Jett: jett@insurancecenterut.com. You can also find him on LinkedIn (linkedin.com/in/jettiverson), Instagram (@jett_iverson), or GitHub (github.com/AirplaneMode2955) — or use the Contact page.',
  },
  {
    id: 'available',
    question: 'Is Jett open to freelance work or consulting?',
    keywords: ['available', 'hire', 'freelance', 'consulting', 'open to work', 'hiring jett', 'collaborate'],
    answer:
      "Jett is open to interesting side projects and consulting conversations — specifically SEO & GEO audits/strategy, marketing systems and automation builds, writing or speaking on AI and marketing, and other ambitious ideas. Reach out at jett@insurancecenterut.com.",
  },
  {
    id: 'content',
    question: 'Does Jett write content?',
    keywords: ['content', 'blog', 'articles', 'writing', 'newsletter'],
    answer:
      "Jett writes about marketing, SEO/GEO, and AI systems — you can find his articles on the Content page of this site.",
  },
  {
    id: 'arcade',
    question: "What's in the Arcade?",
    keywords: ['arcade', 'chess', 'play', 'game', 'chess bot'],
    answer:
      "The Play section of the site includes a few built-from-scratch games and experiments, including an AI chess bot Jett built. Check out the Play page to try them out.",
  },
  {
    id: 'greeting',
    question: 'Hi',
    keywords: ['hi', 'hello', 'hey', 'yo', 'sup', 'greetings'],
    answer:
      "Hey! I'm a little Q&A bot trained on Jett's site content — ask me about his work, background, projects, or how to get in touch.",
  },
  {
    id: 'thanks',
    question: 'Thanks',
    keywords: ['thanks', 'thank you', 'appreciate it', 'thx'],
    answer: "Anytime! Let me know if there's anything else you want to know about Jett.",
  },

  // Fun / personality questions
  {
    id: 'favorite-project',
    question: "What's Jett's favorite project?",
    keywords: ['favorite project', 'best project', 'proudest project', 'favorite thing built', 'coolest project'],
    answer:
      "The chess bot in the Arcade. It doesn't drive leads or move a KPI — he just built it because it was fun.",
  },
  {
    id: 'favorite-golf-course',
    question: "What's Jett's favorite golf course?",
    keywords: ['favorite golf course', 'best golf course', 'favorite course', 'where does jett golf', 'golf course'],
    answer: 'Wolf Creek. Not close.',
  },
  {
    id: 'fishing-spot',
    question: "Where's Jett's favorite fishing spot?",
    keywords: ['favorite fishing spot', 'where does jett fish', 'best fishing spot', 'fishing hole', 'fishing spot'],
    answer: "That one's classified. Ask him in person and maybe he'll tell you.",
  },
  {
    id: 'favorite-team',
    question: 'Does Jett have a favorite soccer team?',
    keywords: ['favorite team', 'favorite soccer team', 'football team', 'liverpool', 'supports what team', 'soccer'],
    answer:
      "Liverpool, no contest — there's a whole live match dashboard among his projects because of it.",
  },
  {
    id: 'weirdest-automation',
    question: "What's the weirdest thing Jett has automated?",
    keywords: ['weirdest automation', 'weirdest thing automated', 'strangest automation', 'automated what', 'weird automation'],
    answer:
      "Responding to text messages. If a reply came back fast and sounded like him, there's a decent chance he didn't actually type it.",
  },
  {
    id: 'useless-skill',
    question: "What's Jett's most useless skill?",
    keywords: ['useless skill', 'weird skill', 'random skill', 'party trick', 'hidden talent'],
    answer:
      "He built the AI chess bot in the Arcade — and it beats him more often than he'd like to admit.",
  },
];

export const suggestedQuestions = ['who', 'job', 'favorite-project', 'projects', 'contact'];
