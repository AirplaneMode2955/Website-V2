'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const line = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function HeroSection() {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 800], [0, 160]);

  return (
    <section className="relative -mt-24 px-8 pt-32 pb-20 overflow-hidden min-h-[940px] flex items-center grain bg-background">
      {/* Background image with parallax */}
      <div className="absolute inset-0 opacity-30 overflow-hidden">
        <motion.div className="absolute inset-[-20%]" style={{ y: bgY }}>
          <Image
            src="/IMG_1120.JPEG"
            alt=""
            fill
            className="object-cover"
            style={{ objectPosition: '30% center' }}
            priority
            aria-hidden="true"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/15 via-background/70 to-background" />
      </div>

      <div className="max-w-screen-2xl mx-auto grid grid-cols-12 gap-8 items-center relative z-10 w-full">
        {/* Left: staggered copy reveal */}
        <motion.div
          className="col-span-12 md:col-span-7"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <div className="overflow-hidden">
            <motion.h1
              variants={line}
              className="font-headline italic text-7xl md:text-[8.5rem] text-primary leading-[0.88] tracking-tight mb-3"
            >
              Hey, I&apos;m<br />Jett.
            </motion.h1>
          </div>

          <div className="overflow-hidden">
            <motion.span
              variants={line}
              className="inline-block font-label text-sm uppercase tracking-luxe text-secondary mb-6"
            >
              AKA Airplane
            </motion.span>
          </div>

          <div className="overflow-hidden">
            <motion.p
              variants={line}
              className="text-on-surface-variant font-headline italic mb-8 leading-snug whitespace-nowrap"
              style={{ fontSize: 'clamp(0.75rem, 3.5vw, 1.5rem)' }}
            >
              Marketer. Husband. Driven by curiosity.
            </motion.p>
          </div>

          <motion.div variants={line} className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/projects"
              className="bg-primary text-on-primary px-8 py-4 rounded-md font-label uppercase tracking-[0.18em] text-sm transition-all duration-200 flex items-center justify-center gap-3 shadow-soft hover:shadow-premium hover:scale-[1.03] active:scale-[0.97]"
            >
              View Projects
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
            <Link
              href="/contact"
              className="border border-primary/40 text-primary px-8 py-4 rounded-md font-label uppercase tracking-[0.18em] text-sm transition-all duration-200 text-center hover:bg-primary hover:text-on-primary hover:scale-[1.03] active:scale-[0.97] hover:border-primary"
            >
              Contact Me
            </Link>
          </motion.div>
        </motion.div>

        {/* Right: portrait */}
        <motion.div
          className="col-span-12 md:col-span-5 relative mt-12 md:mt-0"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative w-full aspect-[4/5] rounded-[1.25rem] overflow-hidden shadow-premium border border-white/10 bg-surface-container-high">
            <Image
              src="/wedding.jpg.JPEG"
              alt="Jett Iverson"
              fill
              className="object-cover object-top"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/25 to-transparent" />
          </div>
          {/* Quote card */}
          <div className="absolute -bottom-8 -left-4 md:-left-10 w-60 bg-secondary-container text-on-secondary-container p-6 rounded-[1rem] shadow-soft border border-white/5">
            <p className="font-headline italic text-2xl mb-2">&ldquo;Figure it out&rdquo;</p>
            <p className="font-label text-[10px] uppercase tracking-luxe text-on-secondary-container/60">
              Philosophy Statement
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
