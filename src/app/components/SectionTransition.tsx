import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

interface SectionTransitionProps {
  index: number;
}

// Awwwards-style: clip-path diagonal wipe + marquee-style divider
export function SectionTransition({ index }: SectionTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const lineWidth = useTransform(scrollYProgress, [0.2, 0.6, 0.9], ['0%', '100%', '0%']);
  const opacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0]);
  const scaleX = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0.6, 1, 0.6]);
  const rotate = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? -1 : 1, index % 2 === 0 ? 1 : -1]);

  return (
    <div
      ref={ref}
      className="relative h-20 overflow-hidden flex items-center"
      style={{ backgroundColor: 'transparent' }}
    >
      {/* Diagonal hairline */}
      <motion.div
        style={{ opacity, scaleX, transformOrigin: 'center' }}
        className="absolute inset-x-0 top-1/2 -translate-y-1/2"
      >
        <motion.div
          style={{ width: lineWidth }}
          className="h-px mx-auto"
          css={{
            background: 'linear-gradient(90deg, transparent 0%, #D4AF37 20%, rgba(212,175,55,0.6) 50%, #D4AF37 80%, transparent 100%)'
          }}
          // fallback inline style
        >
          <div
            style={{
              height: '1px',
              width: '100%',
              background: 'linear-gradient(90deg, transparent 0%, #D4AF37 20%, rgba(212,175,55,0.5) 50%, #D4AF37 80%, transparent 100%)'
            }}
          />
        </motion.div>
      </motion.div>

      {/* Center ornament */}
      <motion.div
        style={{ opacity, rotate }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-3"
      >
        <div className="w-1 h-1 rounded-full bg-[#D4AF37]" />
        <div
          className="w-3 h-3 border border-[#D4AF37]/60 rotate-45"
          style={{ flexShrink: 0 }}
        />
        <div className="w-1 h-1 rounded-full bg-[#D4AF37]" />
      </motion.div>
    </div>
  );
}
