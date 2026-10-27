import type { Metadata } from 'next';
import FadeIn from '@/components/FadeIn';
import Image from 'next/image';
import Link from 'next/link';
import TrailTimeline, { type TimelineEvent } from '@/components/TrailTimeline';
import InkUnderline from '@/components/motion/InkUnderline';
import { lifePhotos } from '@/data/lifePhotos';

export const metadata: Metadata = {
  alternates: { canonical: '/about' },
  title: 'About',
  description: 'The story of Jett Iverson. From Plain City, Utah to marketing and AI strategy.',
};

const timelineEvents: TimelineEvent[] = [
  {
    date: 'April 23, 2004',
    title: 'Born in Ogden, Utah',
    description:
      'Started life in Northern Utah, just outside of Ogden. Growing up with the Wasatch Mountains as a backyard shaped just about everything.',
    category: 'personal',
    image: '/Baby Jett.JPEG',
  },
  {
    date: '2009 – 2019',
    title: 'Plain City Elementary & Wahlquist Junior High',
    description:
      'Grew up in Plain City, a small, tight-knit community where most of life happened outside. School, sports, and figuring out how things worked. Junior high in North Ogden is where I started competing more seriously in golf and discovered I was competitive about ideas as much as athletics.',
    category: 'education',
    image: '/Elementary Age Jett.JPEG',
  },
  {
    date: '2019 – 2022',
    title: 'Fremont High School',
    description:
      'Played golf and soccer at Fremont High School in Plain City. Graduated in May 2022. High school is where the curiosity really kicked in.',
    category: 'education',
    image: '/High School Golf.JPEG',
  },
  {
    date: 'Fall 2022',
    title: 'LDS Mission: Brazil',
    description:
      'Left on a two-year mission for The Church of Jesus Christ of Latter-day Saints. Two years completely immersed in Brazilian culture and language. Came back with a completely different perspective on hard work, discipline, and what really matters.',
    category: 'personal',
    image: '/Mission.JPEG',
  },
  {
    date: 'June 2024',
    title: 'The Insurance Center',
    description:
      'Joined The Insurance Center as a Receptionist after returning from Brazil. Got my foot in the door and immediately started looking for ways to contribute beyond the front desk.',
    category: 'career',
  },
  {
    date: 'July 2024',
    title: 'Licensed Insurance Agent',
    description:
      'Earned my insurance license and was promoted to Licensed Agent. Learning the business from the ground up made the marketing work that followed much more grounded in reality.',
    category: 'career',
    image: '/Jett Headshot.jpg',
  },
  {
    date: 'Fall 2024',
    title: 'Utah State University',
    description:
      "Enrolled at Utah State University to pursue a Bachelor's degree. Balancing school, work, and a rapidly growing interest in AI systems and marketing technology.",
    category: 'education',
    image: '/Utah State University.JPEG',
  },
  {
    date: 'October 2024',
    title: 'Met My Wife',
    description:
      'Met the person who would become my best friend and the best part of my life. She supports every random idea I come up with and somehow keeps me grounded at the same time.',
    category: 'personal',
    image: '/Wife.JPEG',
  },
  {
    date: 'April 2025',
    title: 'Engaged',
    description: 'Got down on one knee. She said yes.',
    category: 'personal',
    image: '/engagements.JPEG',
  },
  {
    date: 'August 12, 2025',
    title: 'Married',
    description: 'Married my best friend in Taylorsville, Utah. Easily the best day of my life.',
    category: 'personal',
    image: '/Wedding.JPEG',
  },
  {
    date: 'December 2025',
    title: 'Acting Director of Marketing',
    description:
      "Promoted to Acting Director of Marketing at The Insurance Center. Leading SEO, GEO, and AI integration strategy, building systems that make the brand show up wherever it matters most.",
    category: 'career',
    image: '/Head of Marketing.JPEG',
  },
  {
    date: 'December 2026',
    title: "Bachelor's Degree",
    description:
      "On track to graduate from Utah State University with a Bachelor's degree in December 2026.",
    category: 'education',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ── Page Banner ── */}
      <section className="relative py-24 px-8 overflow-hidden bg-surface-container-low border-b border-white/5">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/IMG_0085.JPG"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-top"
            aria-hidden="true"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-surface-container-low" />
        <div className="max-w-screen-2xl mx-auto relative z-10">
          <FadeIn>
            <span className="font-label text-xs uppercase tracking-luxe text-outline mb-4 block">
              The story
            </span>
            <h1 className="font-headline italic text-6xl md:text-8xl text-primary leading-tight mb-4">
              About Me
            </h1>
            <p className="text-on-surface-variant text-xl max-w-xl">
              Marketer, husband, Roxie&apos;s human. I figure things out, usually on the drive to work.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="pt-24 bg-background">
        <div className="max-w-screen-2xl mx-auto px-8">
          <FadeIn>
            <span className="font-label text-xs uppercase tracking-luxe text-outline mb-4 block">
              The round
            </span>
            <h2 className="font-headline italic text-5xl md:text-6xl text-primary mb-5 leading-tight">
              Tee off <InkUnderline variant="wave">through my life.</InkUnderline>
            </h2>
            <p className="text-on-surface-variant text-lg max-w-xl">
              Scroll to follow the round, and watch out for the trees.
            </p>
          </FadeIn>

        </div>

        <TrailTimeline events={timelineEvents} />
      </section>

      {/* ── Bio ── */}
      <section className="py-24 px-8 bg-surface-container-low">
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <FadeIn className="md:col-span-2 space-y-6 text-on-surface-variant leading-relaxed text-lg">
              <p>
                I grew up in Plain City, Utah. Small town, mountains out the back door, and not
                much traffic in either sense of the word. Golf and fishing are still how I
                reset, and these days I&apos;ve added woodworking to the pile.
              </p>
              <p>
                After high school I spent two years in Brazil on an LDS mission. It reset my
                baseline for hard work and gave me a different lens on how people think,
                communicate, and make decisions. I came back with fluent Portuguese and a clearer
                sense of what I actually want to build.
              </p>
              <p>
                Now I&apos;m finishing a marketing degree at Utah State and running marketing at
                The Insurance Center, where I plan to keep learning and stacking experience. On the
                side I&apos;m obsessed with AI: building systems that make repetitive work
                disappear, and teaching myself how far they can go. I married my best friend,
                Izzy, in August 2025. We have a husky rottweiler mix named Roxie who runs the house.
              </p>
              <p>
                I also turned my commute into a podcast. Commute 2 Work is me talking out loud in
                the driver&apos;s seat, working through what I&apos;m learning about AI, careers, and
                the algorithm, and slowly automating the whole channel.{' '}
                <Link href="/podcast" className="text-primary underline underline-offset-4">
                  Listen in
                </Link>
                .
              </p>
            </FadeIn>

            <FadeIn delay={0.1} className="space-y-4">
              <div className="bg-surface-container-highest p-6 rounded-[1.25rem] border border-white/[0.08]">
                <h3 className="font-label text-xs uppercase tracking-luxe text-outline mb-5">
                  Quick facts
                </h3>
                <ul className="space-y-4">
                  {[
                    { icon: 'location_on', text: 'Syracuse, Utah' },
                    { icon: 'school', text: 'Utah State University' },
                    { icon: 'work', text: 'Acting Director of Marketing, TICU' },
                    { icon: 'favorite', text: 'Married, August 2025' },
                    { icon: 'pets', text: 'Dog dad to Roxie' },
                    { icon: 'golf_course', text: 'Golf & fishing' },
                    { icon: 'carpenter', text: 'Woodworking' },
                    { icon: 'mic', text: 'Host, Commute 2 Work' },
                    { icon: 'smart_toy', text: 'AI & automation nerd' },
                  ].map(({ icon, text }) => (
                    <li
                      key={text}
                      className="flex items-center gap-3 text-on-surface-variant text-sm"
                    >
                      <span className="material-symbols-outlined text-primary text-base">
                        {icon}
                      </span>
                      {text}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-surface-container-highest p-6 rounded-[1.25rem] border border-white/[0.08]">
                <h3 className="font-label text-xs uppercase tracking-luxe text-outline mb-4">
                  Philosophy
                </h3>
                <p className="font-headline italic text-2xl text-primary">
                  &ldquo;Figure it out.&rdquo;
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── What I'm Building ── */}
      <section className="py-24 px-8 bg-background border-t border-white/5">
        <div className="max-w-screen-2xl mx-auto">
          <FadeIn>
            <span className="font-label text-xs uppercase tracking-luxe text-outline mb-4 block">
              Right now
            </span>
            <h2 className="font-headline italic text-5xl text-primary mb-12">
              What I&apos;m building
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: 'search',
                title: 'GEO & AI Search at TIC',
                description:
                  'Running SEO and Generative Engine Optimization for The Insurance Center — making sure the brand shows up in Google, ChatGPT, Perplexity, and every AI Overview, not just page one of a search engine.',
              },
              {
                icon: 'rocket_launch',
                title: 'SearchLight Digital',
                description:
                  'The agency I founded to productize that same SEO/GEO methodology for other businesses — currently pre-launch, built around the idea that most companies have no idea they\'re invisible to AI search.',
              },
              {
                icon: 'smart_toy',
                title: 'AI systems & automation',
                description:
                  'This site included — I build with AI agents rather than around them. Lead scoring, review workflows, content pipelines, even the chess bot in the Arcade. If a process repeats, I try to make it disappear.',
              },
              {
                icon: 'mic',
                title: 'Commute 2 Work',
                description:
                  'My drive-time podcast on YouTube. A place to think out loud, get better at the algorithm, and automate the whole channel, from cutting Shorts to scheduling and uploads.',
              },
            ].map((item) => (
              <FadeIn key={item.title}>
                <div className="bg-surface-container-highest rounded-[1.25rem] border border-white/[0.08] p-8 h-full">
                  <span
                    className="material-symbols-outlined text-primary/60 text-2xl mb-4 block"
                    aria-hidden="true"
                  >
                    {item.icon}
                  </span>
                  <h3 className="font-headline italic text-2xl text-primary mb-3">
                    {item.title}
                  </h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Life in Balance ── */}
      <section className="py-24 px-8 bg-surface-container-low border-t border-white/5">
        <div className="max-w-screen-2xl mx-auto">
          <FadeIn>
            <div className="text-right mb-12">
              <span className="font-label text-xs uppercase tracking-luxe text-outline mb-4 block">
                Outside the office
              </span>
              <h2 className="font-headline italic text-5xl md:text-6xl text-primary">
                A Life in Balance
              </h2>
              <p className="text-on-surface-variant mt-3">
                The small things that spark the big ideas.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {lifePhotos.map((photo, i) => (
              <FadeIn key={photo.alt} delay={i * 0.07}>
                <div className="relative aspect-[4/3] rounded-[1.25rem] overflow-hidden group">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
