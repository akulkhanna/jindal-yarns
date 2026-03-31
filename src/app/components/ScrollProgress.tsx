import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { useState, useEffect } from 'react';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Percentage label
  const [pct, setPct] = useState(0);
  useEffect(() => {
    return scrollYProgress.on('change', v => setPct(Math.round(v * 100)));
  }, [scrollYProgress]);

  const barOpacity = useTransform(scrollYProgress, [0, 0.02], [0, 1]);

  return (
    <>
      {/* Gold progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[9500]"
        style={{
          scaleX,
          opacity: barOpacity,
          background: 'linear-gradient(90deg, #D4AF37, #FFD700, #D4AF37)',
        }}
      />

      {/* Glow under bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-4 origin-left z-[9499] pointer-events-none"
        style={{
          scaleX,
          opacity: barOpacity,
          background: 'linear-gradient(180deg, rgba(212,175,55,0.3) 0%, transparent 100%)',
        }}
      />

      {/* Percentage indicator — bottom right */}
      <motion.div
        style={{ opacity: barOpacity }}
        className="fixed bottom-8 right-8 z-[9500] flex items-center gap-2"
      >
        <div
          className="text-[#D4AF37]/50 text-xs tabular-nums"
          style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300, letterSpacing: '0.1em' }}
        >
          {String(pct).padStart(2, '0')}%
        </div>
      </motion.div>
    </>
  );
}
