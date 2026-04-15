import type { Metadata } from 'next';
import FadeIn from '@/components/FadeIn';
import Image from 'next/image';
import TimelineLine from '@/components/TimelineLine';

export const metadata: Metadata = {
  title: 'About',
  description: 'The story of Jett Iverson. From Plain City, Utah to marketing and AI strategy.',
};

type TimelineEvent = {
  date: string;
  title: string;
  description: string;
  category: 'personal' | 'education' | 'career';
  image?: string;
  imageAspect?: string;
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
    imageAspect: 'aspect-[3/4]',
  },
  {
    date: 'Fall 2024',
    title: 'Utah State University',
    description:
      "Enrolled at Utah State University to pursue a Bachelor's degree. Balancing school, work, and a rapidly growing interest in AI systems and marketing technology.",
    category: 'education',
    image: '/Utah State University.JPEG',
    imageAspect: 'aspect-[3/4]',
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
    title: 'Head of Marketing',
    description:
      "Promoted to Head of Marketing at The Insurance Center. Leading SEO, GEO, and AI integration strategy, building systems that make the brand show up wherever it matters most.",
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

const categoryStyles = {
  personal: {
    icon: 'favorite',
    iconBg: 'bg-primary/15',
    iconColor: 'text-primary',
    badge: 'bg-primary/10 text-primary',
    label: 'Personal',
  },
  education: {
    icon: 'school',
    iconBg: 'bg-secondary/15',
    iconColor: 'text-secondary',
    badge: 'bg-secondary/10 text-secondary',
    label: 'Education',
  },
  career: {
    icon: 'rocket_launch',
    iconBg: 'bg-accent/15',
    iconColor: 'text-accent',
    badge: 'bg-accent/10 text-accent',
    label: 'Career',
  },
};

const lifePhotos = [
  { src: '/Mountain 2.0.JPEG', alt: 'Utah mountain landscape' },
  { src: '/IMG_0304.JPEG', alt: 'Jett on a snowmobile in the Utah mountains' },
  { src: '/IMG_9655.JPEG', alt: 'Jett and his wife' },
  { src: '/IMG_3561.JPEG', alt: 'Outdoors in Utah' },
  { src: '/IMG_0085.JPG', alt: 'Family in the mountains' },
  { src: '/IMG_0638.JPEG', alt: 'Utah outdoors' },
  { src: '/IMG_0089.JPEG', alt: 'Skiing in the Utah mountains' },
  { src: '/IMG_4027.JPEG', alt: 'Fishing on the river' },
  { src: '/123_1 3.JPEG', alt: 'Mountain lake with rainbow' },
  { src: '/IMG_9226.JPEG', alt: 'Dinner out' },
  { src: '/IMG_0478.jpeg', alt: 'On a cliff overlook above the river' },
  { src: '/IMG_3219.jpeg', alt: 'Holding a fish at sunset' },
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
              Utah raised. Mission-hardened. Endlessly curious about how things work.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="py-16 px-8 bg-background">
        <div className="max-w-screen-2xl mx-auto">
          <FadeIn>
            <span className="font-label text-xs uppercase tracking-luxe text-outline mb-4 block">
              The timeline
            </span>
            <h2 className="font-headline italic text-5xl text-primary mb-10">Life so far.</h2>
          </FadeIn>

          <div className="relative">
            <TimelineLine />

            <div className="space-y-0">
              {timelineEvents.map((event, i) => {
                const styles = categoryStyles[event.category];
                const isRight = i % 2 === 0;

                return (
                  <FadeIn key={event.title} delay={0.05} className="relative">
                    {/* Mobile layout */}
                    <div className="md:hidden pl-10 pb-7">
                      <div className={`absolute -left-[5px] top-1 w-8 h-8 rounded-lg ${styles.iconBg} flex items-center justify-center`}>
                        <span className={`material-symbols-outlined text-base ${styles.iconColor}`}>
                          {styles.icon}
                        </span>
                      </div>
                      <div className="mb-1">
                        <span className="font-label text-[10px] uppercase tracking-luxe text-outline">
                          {event.date}
                        </span>
                      </div>
                      <div className="bg-surface-container-high rounded-[1rem] overflow-hidden border border-white/[0.08]">
                        {event.image && (
                          <div className={`relative w-full ${event.imageAspect ?? 'aspect-[4/3]'}`}>
                            <Image
                              src={event.image}
                              alt={event.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div className="p-4">
                          <h3 className="font-headline italic text-lg text-primary mb-1">
                            {event.title}
                          </h3>
                          <span
                            className={`inline-block font-label text-[10px] uppercase tracking-luxe px-2 py-0.5 rounded-full mb-2 ${styles.badge}`}
                          >
                            {styles.label}
                          </span>
                          <p className="text-on-surface-variant text-sm leading-relaxed">
                            {event.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Desktop layout: alternating */}
                    <div className="hidden md:grid md:grid-cols-2 md:gap-8 pb-7">
                      {isRight ? (
                        <>
                          <div className="text-right pr-12">
                            <span className="font-label text-[10px] uppercase tracking-luxe text-outline block mb-2">
                              {event.date}
                            </span>
                            <div className="bg-surface-container-high rounded-[1rem] overflow-hidden border border-white/[0.08] inline-block text-left max-w-sm ml-auto">
                              {event.image && (
                                <div className={`relative w-full ${event.imageAspect ?? 'aspect-[4/3]'}`}>
                                  <Image
                                    src={event.image}
                                    alt={event.title}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              )}
                              <div className="p-5">
                                <h3 className="font-headline italic text-lg text-primary mb-1">
                                  {event.title}
                                </h3>
                                <span
                                  className={`inline-block font-label text-[10px] uppercase tracking-luxe px-2 py-0.5 rounded-full mb-2 ${styles.badge}`}
                                >
                                  {styles.label}
                                </span>
                                <p className="text-on-surface-variant text-sm leading-relaxed">
                                  {event.description}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="relative pl-12">
                            <div className={`absolute -left-[16px] top-5 w-8 h-8 rounded-lg ${styles.iconBg} flex items-center justify-center`}>
                              <span className={`material-symbols-outlined text-base ${styles.iconColor}`}>
                                {styles.icon}
                              </span>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="relative pr-12 flex justify-end">
                            <div className={`absolute -right-[16px] top-5 w-8 h-8 rounded-lg ${styles.iconBg} flex items-center justify-center`}>
                              <span className={`material-symbols-outlined text-base ${styles.iconColor}`}>
                                {styles.icon}
                              </span>
                            </div>
                          </div>
                          <div className="pl-12">
                            <span className="font-label text-[10px] uppercase tracking-luxe text-outline block mb-2">
                              {event.date}
                            </span>
                            <div className="bg-surface-container-high rounded-[1rem] overflow-hidden border border-white/[0.08] max-w-sm">
                              {event.image && (
                                <div className={`relative w-full ${event.imageAspect ?? 'aspect-[4/3]'}`}>
                                  <Image
                                    src={event.image}
                                    alt={event.title}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              )}
                              <div className="p-5">
                                <h3 className="font-headline italic text-lg text-primary mb-1">
                                  {event.title}
                                </h3>
                                <span
                                  className={`inline-block font-label text-[10px] uppercase tracking-luxe px-2 py-0.5 rounded-full mb-2 ${styles.badge}`}
                                >
                                  {styles.label}
                                </span>
                                <p className="text-on-surface-variant text-sm leading-relaxed">
                                  {event.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </FadeIn>
                );
              })}
            </div>

            {/* "More to come" marker */}
            <FadeIn className="relative">
              <div className="md:hidden pl-10 pb-4">
                <div className="absolute -left-[5px] top-1 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-base text-primary/40">more_horiz</span>
                </div>
                <p className="font-headline italic text-primary/50 text-lg">More to come…</p>
              </div>
              <div className="hidden md:flex justify-center">
                <p className="font-headline italic text-primary/50 text-lg">More to come…</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Bio ── */}
      <section className="py-24 px-8 bg-surface-container-low">
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <FadeIn className="md:col-span-2 space-y-6 text-on-surface-variant leading-relaxed text-lg">
              <p>
                I grew up in Plain City, Utah. Small town, mountains out the back door, and not
                much traffic in either sense of the word. Golf, fishing, snowmobiling. If it was
                outside, I was there. That part hasn&apos;t changed.
              </p>
              <p>
                After high school I spent two years in Brazil on an LDS mission. It reset my
                baseline for hard work and gave me a different lens on how people think,
                communicate, and make decisions. I came back with fluent Portuguese and a clearer
                sense of what I actually want to build.
              </p>
              <p>
                Now I&apos;m balancing a marketing degree at Utah State, running the full marketing
                operation at The Insurance Center, and building AI systems that make repetitive work
                disappear. I married my best friend in August 2025. I&apos;m driven by the gap
                between what&apos;s possible and what most people think is possible, and I&apos;m
                not close to done figuring that out.
              </p>
            </FadeIn>

            <FadeIn delay={0.1} className="space-y-4">
              <div className="bg-surface-container-highest p-6 rounded-[1.25rem] border border-white/[0.08]">
                <h3 className="font-label text-xs uppercase tracking-luxe text-outline mb-5">
                  Quick facts
                </h3>
                <ul className="space-y-4">
                  {[
                    { icon: 'location_on', text: 'Plain City, Utah' },
                    { icon: 'school', text: 'Utah State University' },
                    { icon: 'work', text: 'Head of Marketing, TICU' },
                    { icon: 'favorite', text: 'Married, August 2025' },
                    { icon: 'golf_course', text: 'Golf & fishing' },
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
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
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
