'use client';

import { motion } from 'framer-motion';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

const flipVariants = {
  hidden: {
    opacity: 0,
    rotateX: 40,
    y: 40,
  },
  visible: {
    opacity: 1,
    rotateX: 0,
    y: 0,
  },
};

export default function FadeIn({ children, delay = 0, className = '' }: FadeInProps) {
  return (
    <motion.div
      className={className}
      style={{ perspective: 900, transformStyle: 'preserve-3d' }}
      variants={flipVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
