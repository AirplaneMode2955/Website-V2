'use client';

import { motion, useReducedMotion } from 'framer-motion';

/**
 * A single hand-drawn pen stroke that draws itself under its text the first
 * time it scrolls into view. Inline, so it can wrap one word inside a headline.
 */

const STROKES = {
  // gentle double wave, for short phrases and quotes
  wave: 'M2 10 C 40 4, 90 14, 130 8 S 185 6, 198 9',
  // long, slightly rising swoop, for the end of a headline
  swoop: 'M2 8 C 50 2, 120 12, 198 5',
  // quick flick, for a single short word
  flick: 'M4 9 C 60 5, 140 11, 196 6',
} as const;

interface InkUnderlineProps {
  children: React.ReactNode;
  variant?: keyof typeof STROKES;
  /** Tailwind text color class for the stroke, e.g. "text-accent". */
  color?: string;
  delay?: number;
  className?: string;
}

export default function InkUnderline({
  children,
  variant = 'swoop',
  color = 'text-accent',
  delay = 0.2,
  className = '',
}: InkUnderlineProps) {
  const reduce = useReducedMotion();

  return (
    <span className={`relative inline-block ${className}`}>
      {children}
      <svg
        aria-hidden="true"
        viewBox="0 0 200 14"
        preserveAspectRatio="none"
        className={`pointer-events-none absolute left-[-2%] -bottom-[0.18em] h-[0.28em] min-h-[8px] w-[104%] overflow-visible ${color}`}
      >
        <motion.path
          d={STROKES[variant]}
          fill="none"
          stroke="currentColor"
          strokeWidth={3}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: reduce ? 1 : 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: reduce ? 0 : 0.9, delay: reduce ? 0 : delay, ease: [0.65, 0, 0.35, 1] }}
        />
      </svg>
    </span>
  );
}
