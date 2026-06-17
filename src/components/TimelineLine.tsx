'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function TimelineLine() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 80%', 'end end'],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div
      ref={ref}
      className="absolute left-[7px] md:left-1/2 top-0 bottom-0 w-px md:-translate-x-px overflow-hidden"
    >
      <motion.div
        className="absolute top-0 left-0 right-0 bottom-0 bg-primary/15 origin-top"
        style={{ scaleY }}
      />
    </div>
  );
}
