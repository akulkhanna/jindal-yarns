import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import { ThreeJSLogoIntro } from './ThreeJSLogoIntro';
import logoImage from '../../assets/437a2f181017e6f146c52fe9dbde9eec4d1d1933.png';

interface PageLoaderProps {
  onComplete: () => void;
}

export function PageLoader({ onComplete }: PageLoaderProps) {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<'intro' | 'counting' | 'reveal' | 'done'>('intro');

  useEffect(() => {
    if (phase !== 'counting') return;

    const duration = 1800; // Faster count since we have an physical intro now
    const steps = 80;
    const interval = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += Math.floor(Math.random() * 4) + 1;
      if (current >= 100) {
        current = 100;
        setCount(100);
        clearInterval(timer);
        setTimeout(() => setPhase('reveal'), 300);
        setTimeout(() => {
          setPhase('done');
          onComplete();
        }, 1600);
      } else {
        setCount(current);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [phase, onComplete]);

  return (
    <AnimatePresence mode="wait">
      {phase !== 'done' && (
        <motion.div
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: '#0F1729' }}
          exit={{ 
            y: '-100%',
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }
          }}
        >
          {/* Phase 1: WebGL Thread Assembler */}
          {phase === 'intro' && (
            <ThreeJSLogoIntro 
              logoUrl={logoImage} 
              onReady={() => console.log('Intro Ready')}
              onComplete={() => setPhase('counting')}
            />
          )}

          {/* Background Reveal Panels for Transition */}
          <motion.div
            className="absolute inset-0 bg-[#D4AF37]"
            initial={{ y: '100%' }}
            animate={
              phase === 'reveal'
                ? { y: 0 }
                : { y: '100%' }
            }
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="absolute inset-0 bg-[#0F1729]"
            initial={{ y: '100%' }}
            animate={
              phase === 'reveal'
                ? { y: 0, transition: { delay: 0.1, duration: 0.7, ease: [0.76, 0, 0.24, 1] } }
                : { y: '100%' }
            }
          />

          {/* Counting content (reveal after intro) */}
          <AnimatePresence>
            {phase === 'counting' && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="relative z-10 flex flex-col items-center gap-16"
              >
                {/* Brand name */}
                <div className="overflow-hidden">
                  <motion.div
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div
                      className="text-[#D4AF37] tracking-[0.5em] text-sm uppercase font-light"
                      style={{ fontFamily: "'Cinzel', Georgia, serif" }}
                    >
                      Jindal Yarns Private Limited
                    </div>
                  </motion.div>
                </div>

                {/* Counter */}
                <div className="relative">
                  <motion.div
                    className="text-white leading-none select-none"
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: 'clamp(80px, 16vw, 180px)',
                      fontWeight: 300,
                      letterSpacing: '-0.04em'
                    }}
                  >
                    {String(count).padStart(2, '0')}
                  </motion.div>
                  <motion.div
                    className="absolute bottom-0 left-0 h-px bg-[#D4AF37]"
                    initial={{ width: '0%' }}
                    animate={{ width: `${count}%` }}
                    transition={{ ease: 'linear' }}
                  />
                </div>

                {/* Tagline */}
                <div className="overflow-hidden">
                  <motion.div
                    initial={{ y: '110%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="text-white/30 text-xs tracking-[0.4em] uppercase"
                  >
                    Premium Fiber Excellence Since 1982
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Interactive UI Marks */}
          <div className="absolute inset-0 pointer-events-none">
            {[
              'top-8 left-8',
              'top-8 right-8',
              'bottom-8 left-8',
              'bottom-8 right-8'
            ].map((pos, i) => (
              <motion.div
                key={i}
                className={`absolute ${pos} w-8 h-8 border-[#D4AF37]/40`}
                style={{
                  borderTopWidth: pos.includes('top') ? '1px' : 0,
                  borderBottomWidth: pos.includes('bottom') ? '1px' : 0,
                  borderLeftWidth: pos.includes('left') ? '1px' : 0,
                  borderRightWidth: pos.includes('right') ? '1px' : 0,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: phase === 'counting' ? 1 : 0 }}
                transition={{ duration: 0.6 }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

