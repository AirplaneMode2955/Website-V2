'use client';

import { motion, type Variants } from 'framer-motion';

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045 } },
};

const chip: Variants = {
  hidden: { opacity: 0, scale: 0.75 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.22 } },
};

interface AnimatedSkillsProps {
  skills: Record<string, string[]>;
}

export default function AnimatedSkills({ skills }: AnimatedSkillsProps) {
  return (
    <div className="space-y-4">
      {Object.entries(skills).map(([category, items]) => (
        <div key={category} className="flex flex-wrap items-start gap-3">
          <span className="font-label text-[10px] uppercase tracking-luxe text-outline w-20 flex-shrink-0 pt-1">
            {category}
          </span>
          <motion.div
            className="flex flex-wrap gap-2"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            {items.map((skill) => (
              <motion.span
                key={skill}
                variants={chip}
                className="font-label text-[10px] uppercase tracking-luxe px-3 py-1 bg-primary-container text-on-primary-container rounded-full"
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>
        </div>
      ))}
    </div>
  );
}
