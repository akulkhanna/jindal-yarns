import { motion, useScroll, useTransform, useVelocity, useSpring } from 'motion/react';
import { useRef } from 'react';
import millBgImage from '../../assets/791e8438b4df591a5ecba4334360e2ed286ca6fd.png';

export function CinematicBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"]
  });

  const scrollVelocity = useVelocity(scrollYProgress);
  const smoothVelocity = useSpring(scrollVelocity, { stiffness: 60, damping: 20 });
  
  // Velocity-based dynamic blur (Cinematic Motion Blur)
  const velocityBlur = useTransform(smoothVelocity, [-0.1, 0, 0.1], [15, 0, 15]);

  // Master parallax shift
  const yTranslate = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8],
    [1, 1.25, 1.5, 1.2, 1.1]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [0.18, 0.25, 0.1, 0.18, 0.15, 0.12]
  );

  const scrollBlur = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8],
    [0, 2, 8, 0, 10]
  );

  // Combine static scroll blur with dynamic velocity blur
  const finalBlur = useTransform(
    [scrollBlur, velocityBlur],
    ([s, v]) => `blur(${(s as number) + (v as number)}px)`
  );

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none"
      style={{ background: '#0C0E14' }}
    >
      <motion.div
        style={{
          y: yTranslate,
          scale,
          opacity,
          filter: finalBlur,
          backgroundImage: `url(${millBgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          mixBlendMode: 'screen'
        }}
        className="absolute inset-[-10%] grayscale contrast-[1.2] brightness-[0.5]"
      />
      
      {/* Global Tactile Grain - Fixed overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay'
        }} 
      />
    </div>
  );
}

