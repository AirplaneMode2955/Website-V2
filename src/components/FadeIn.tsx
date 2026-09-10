'use client';

import { motion, useReducedMotion } from 'framer-motion';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export default function FadeIn({ children, delay = 0, className = '' }: FadeInProps) {
  const reduce = useReducedMotion();

  const variants = reduce
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }
    : {
        hidden: { opacity: 0, rotateX: 40, y: 40 },
        visible: { opacity: 1, rotateX: 0, y: 0 },
      };

  return (
    <motion.div
      className={className}
      style={reduce ? undefined : { perspective: 900, transformStyle: 'preserve-3d' }}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: reduce ? 0.3 : 0.65,
        delay: reduce ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
