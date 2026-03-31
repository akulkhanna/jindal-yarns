import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import logoImage from '../../assets/437a2f181017e6f146c52fe9dbde9eec4d1d1933.png';
import yarnBallsImage from '../../assets/eb9d82b244200300e8016bcef7574329f69b54ad.png';

// Text scramble hook — awwwards staple effect
function useTextScramble(finalText: string, delay = 0) {
  const [display, setDisplay] = useState('');
  const chars = '!<>-_\\/[]{}—=+*^?#ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const frameRef = useRef(0);
  const startedRef = useRef(false);

  useEffect(() => {
    const start = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      let frame = 0;
      const totalFrames = finalText.length * 4;
      const update = () => {
        let result = '';
        for (let i = 0; i < finalText.length; i++) {
          if (i < Math.floor(frame / 4)) {
            result += finalText[i];
          } else {
            result += chars[Math.floor(Math.random() * chars.length)];
          }
        }
        setDisplay(result);
        frame++;
        if (frame <= totalFrames) {
          frameRef.current = requestAnimationFrame(update);
        } else {
          setDisplay(finalText);
        }
      };
      frameRef.current = requestAnimationFrame(update);
    };

    const t = setTimeout(start, delay);
    return () => {
      clearTimeout(t);
      cancelAnimationFrame(frameRef.current);
    };
  }, [finalText, delay]);

  return display;
}

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start']
  });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.88]);

  const scrambledTitle = useTextScramble('Premium Fiber', 800);

  // Words for stagger reveal
  const words = ['Leading', 'the', 'global', 'textile', 'industry', 'with', 'innovation,', 'precision,', 'and', 'sustainable', 'manufacturing', 'excellence', 'since', '1982.'];

  return (
    <section
      id="hero"
      ref={sectionRef}
      style={{ position: 'relative' }}
      className="min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0F1729] via-[#1B2A4E] to-[#0F1729]"
    >
      {/* Background grid */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-[#D4AF37]/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/4 -right-1/4 w-[800px] h-[800px] bg-[#1B2A4E]/30 rounded-full blur-[120px]"
        />
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(#D4AF37 1px, transparent 1px), linear-gradient(90deg, #D4AF37 1px, transparent 1px)`,
            backgroundSize: '80px 80px'
          }} />
        </div>
      </div>

      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 max-w-7xl mx-auto px-8 py-24"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left column */}
          <div className="space-y-8">
            {/* Logo */}
            <motion.img
              initial={{ opacity: 0, scale: 0.9, filter: 'blur(8px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ x: mousePosition.x * 0.5, y: mousePosition.y * 0.5 }}
              src={logoImage}
              alt="Jindal Yarns"
              className="w-64 h-auto"
            />

            <div className="space-y-6">
              {/* Scrambled H1 with clip mask word reveal */}
              <div style={{ overflow: 'hidden' }}>
                <motion.h1
                  className="text-6xl md:text-8xl font-light tracking-tighter text-white leading-none"
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="font-mono">{scrambledTitle}</span>
                </motion.h1>
              </div>

              {/* "Excellence" - clip reveal */}
              <div style={{ overflow: 'hidden' }}>
                <motion.div
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span
                    className="text-6xl md:text-8xl font-light tracking-tighter text-[#D4AF37] leading-none inline-block scroll-m-20"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    data-cursor-label="MASTER"
                    data-cursor-tech="Precision: 0.01mm // Fiber.Science"
                  >
                    Excellence
                  </span>
                </motion.div>
              </div>

              {/* Gold line */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: 'left' }}
                className="h-px w-24 bg-gradient-to-r from-[#D4AF37] to-transparent"
              />

              {/* Word-by-word paragraph reveal */}
              <p className="text-xl text-white/70 font-light tracking-wide max-w-lg leading-relaxed flex flex-wrap gap-x-[0.3em]">
                {words.map((word, i) => (
                  <span key={i} style={{ overflow: 'hidden', display: 'inline-block' }}>
                    <motion.span
                      style={{ display: 'inline-block' }}
                      initial={{ y: '110%', opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 1.1 + i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </p>
            </div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.6 }}
              className="flex gap-6"
            >
              <motion.button
                data-cursor-label="VIEW"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="group relative px-10 py-4 bg-[#D4AF37] text-[#0F1729] overflow-hidden font-light tracking-wider"
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-[#FFD700] to-[#D4AF37]"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.35 }}
                />
                <span className="relative z-10">EXPLORE CATALOG</span>
              </motion.button>

              <motion.button
                data-cursor-label="TOUCH"
                whileHover={{ scale: 1.04, borderColor: '#D4AF37' }}
                whileTap={{ scale: 0.96 }}
                className="px-10 py-4 border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all font-light tracking-wider"
              >
                GET IN TOUCH
              </motion.button>
            </motion.div>

            {/* Stats with animated counters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.8 }}
              className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10"
            >
              {[
                { value: '42+', label: 'Years Legacy' },
                { value: '40+', label: 'Countries' },
                { value: 'ISO', label: 'Certified' }
              ].map((stat, i) => (
                <div key={i}>
                  <motion.div
                    className="text-3xl font-light text-[#D4AF37] mb-1"
                    whileHover={{ scale: 1.1, color: '#FFFFFF' }}
                    data-cursor-label="METRIC"
                    data-cursor-tech={`${stat.label} // Verified.Stat`}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm text-white/50 tracking-wide">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right column - floating yarn */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, filter: 'blur(20px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[600px] flex items-center justify-center"
          >
            <motion.div
              animate={{ y: [0, -30, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              style={{ x: mousePosition.x, y: mousePosition.y }}
              className="relative"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 blur-[100px] bg-gradient-to-r from-[#D4AF37]/30 to-[#FFD700]/30 scale-150 rounded-full"
              />

              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
                src={yarnBallsImage}
                alt="Premium Yarn"
                className="relative z-10 w-full max-w-lg h-auto drop-shadow-2xl"
              />

              {/* Orbiting rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 border-2 border-[#D4AF37]/20 rounded-full scale-110"
                style={{ borderStyle: 'dashed' }}
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 border border-[#D4AF37]/10 rounded-full scale-125"
              />

              {/* Floating particles */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -100, 0], x: [0, Math.sin(i) * 50, 0], opacity: [0, 1, 0] }}
                  transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5, ease: 'easeInOut' }}
                  className="absolute w-2 h-2 bg-[#D4AF37] rounded-full blur-sm"
                  style={{ top: `${20 + i * 15}%`, left: `${30 + i * 10}%` }}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <div className="w-6 h-10 border-2 border-[#D4AF37]/40 rounded-full flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1.5 h-3 bg-[#D4AF37] rounded-full"
            />
          </div>
          <span className="text-[#D4AF37]/60 text-xs tracking-[0.3em] uppercase">Scroll</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
