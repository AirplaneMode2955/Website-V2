'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function GlowCursor() {
  const [mounted, setMounted] = useState(false);
  const [hovering, setHovering] = useState(false);

  const rawX = useMotionValue(-200);
  const rawY = useMotionValue(-200);

  const x = useSpring(rawX, { stiffness: 300, damping: 22, mass: 0.3 });
  const y = useSpring(rawY, { stiffness: 300, damping: 22, mass: 0.3 });

  useEffect(() => {
    setMounted(true);

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as Element;
      setHovering(!!t.closest('a, button, [data-glow-target]'));
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
    };
  }, [rawX, rawY]);

  if (!mounted) return null;

  const size = hovering ? 52 : 28;

  return (
    <motion.div
      animate={{ width: size, height: size }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        x,
        y,
        translateX: '-50%',
        translateY: '-50%',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999,
        background: hovering
          ? 'radial-gradient(circle, rgba(201,169,110,0.95) 0%, rgba(201,169,110,0.18) 55%, transparent 100%)'
          : 'radial-gradient(circle, rgba(201,169,110,0.85) 0%, rgba(201,169,110,0.12) 60%, transparent 100%)',
        boxShadow: hovering
          ? '0 0 18px 6px rgba(201,169,110,0.45), 0 0 40px 12px rgba(201,169,110,0.18)'
          : '0 0 10px 3px rgba(201,169,110,0.35), 0 0 24px 8px rgba(201,169,110,0.12)',
        filter: 'blur(1px)',
      }}
    />
  );
}
