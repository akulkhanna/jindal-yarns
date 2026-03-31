import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { useRef } from 'react';
import millBgImage from '../../assets/11f705cec3ceb825808316d836561b5ac3b31099.png';

export function CinematicBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"]
  });

  // Create spring-smoothed scroll progress for ultra-smooth buttery motion
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Parallax: Slower, deeper translation
  const yTranslate = useTransform(smoothProgress, [0, 1], ["0%", "8%"]);
  
  // Scale: Subtler breathing effect
  const scale = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    [1.05, 1.15, 1.1]
  );

  // Opacity: Maintains a more consistent "looming" presence
  const opacity = useTransform(
    smoothProgress,
    [0, 0.3, 0.6, 1],
    [0.18, 0.22, 0.15, 0.2]
  );

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[#0C0E14]"
    >
      <motion.div
        aria-hidden="true"
        style={{
          y: yTranslate,
          scale,
          opacity,
          backgroundImage: `url(${millBgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          willChange: 'transform, opacity', // Force onto GPU compositor layer
        }}
        className="absolute inset-[-10%] grayscale contrast-[1.2] brightness-[0.4] pointer-events-none"
      />

      {/* Static Cinematic Grain - More performant than dynamic SVG filters for background */}
      <div 
        className="absolute inset-0 opacity-[0.025] pointer-events-none mix-blend-overlay will-change-[opacity]"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }} 
      />

      {/* Subtle Bottom Vignette to ground the sections */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0C0E14] via-transparent to-transparent opacity-60" />
    </div>
  );
}

