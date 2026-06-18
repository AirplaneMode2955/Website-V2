'use client';

import { motion } from 'framer-motion';

interface MotionCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function MotionCard({ children, className = '' }: MotionCardProps) {
  return (
    <motion.div
      className={className}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
