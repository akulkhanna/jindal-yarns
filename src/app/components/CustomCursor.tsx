import { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'motion/react';

type CursorState = 'default' | 'hover' | 'click' | 'text';

export function CustomCursor() {
  const [cursorState, setCursorState] = useState<CursorState>('default');
  const [cursorLabel, setCursorLabel] = useState('');
  const [cursorData, setCursorData] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const trailX = useMotionValue(-100);
  const trailY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700, mass: 0.3 };
  const trailConfig = { damping: 30, stiffness: 120, mass: 0.8 };

  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);
  const trailSmoothX = useSpring(trailX, trailConfig);
  const trailSmoothY = useSpring(trailY, trailConfig);

  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      trailX.set(e.clientX);
      trailY.set(e.clientY);
      setIsVisible(true);
    };

    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);
    const onMouseDown = () => setCursorState('click');
    const onMouseUp = () => setCursorState('hover');

    const onInteractiveEnter = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      const label = el.getAttribute('data-cursor-label') || '';
      const data = el.getAttribute('data-cursor-tech') || null;
      setCursorLabel(label);
      setCursorData(data);
      setCursorState('hover');
    };

    const onInteractiveLeave = () => {
      setCursorLabel('');
      setCursorData(null);
      setCursorState('default');
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);

    const addListeners = () => {
      document.querySelectorAll('a, button, [role="button"], [data-cursor], .magnetic-item').forEach(el => {
        el.addEventListener('mouseenter', onInteractiveEnter);
        el.addEventListener('mouseleave', onInteractiveLeave);
      });
    };

    setTimeout(addListeners, 500);

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [cursorX, cursorY, trailX, trailY]);

  const outerSize = cursorState === 'hover' ? 64 : cursorState === 'click' ? 24 : 40;
  const innerSize = cursorState === 'hover' ? 4 : cursorState === 'click' ? 8 : 4;

  return (
    <>
      {/* HUD Info Panel (Magnetic Data) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000] flex flex-col items-start gap-1 p-2"
        style={{ x: smoothX, y: smoothY, translateX: 40, translateY: -40 }}
      >
        <AnimatePresence>
          {cursorData && (
            <motion.div
              initial={{ opacity: 0, x: -10, clipPath: 'inset(0 100% 0 0)' }}
              animate={{ opacity: 1, x: 0, clipPath: 'inset(0 0% 0 0)' }}
              exit={{ opacity: 0, x: -10, clipPath: 'inset(0 100% 0 0)' }}
              className="bg-[#0F1729]/80 backdrop-blur-md border-l-2 border-[#D4AF37] px-3 py-1.5"
            >
              <div className="text-[#D4AF37] text-[9px] font-mono tracking-tighter uppercase mb-0.5 opacity-50">
                Data Readout // System.01
              </div>
              <div className="text-white text-[10px] font-light tracking-[0.1em] uppercase">
                {cursorData}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Main Cursor Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center"
        style={{ x: smoothX, y: smoothY, translateX: '-50%', translateY: '-50%' }}
        animate={{ width: outerSize, height: outerSize, opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="w-full h-full rounded-full border border-[#D4AF37]/40 flex items-center justify-center overflow-hidden">
          {/* Rotating HUD ring segments */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 border-t-2 border-r-2 border-transparent border-t-[#D4AF37] border-r-[#D4AF37] rounded-full scale-[0.85] opacity-30"
          />
          <AnimatePresence>
            {cursorLabel && (
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-[#D4AF37] text-[8px] tracking-[0.2em] font-medium uppercase whitespace-nowrap z-10"
                style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
              >
                {cursorLabel}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Core Dot (Precise Tracker) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-[#D4AF37]"
        style={{ x: trailSmoothX, y: trailSmoothY, translateX: '-50%', translateY: '-50%' }}
        animate={{ width: innerSize, height: innerSize, opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />

      {/* Atmosphere Glow */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
        style={{
          x: trailSmoothX,
          y: trailSmoothY,
          translateX: '-50%',
          translateY: '-50%',
          background: 'radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 75%)',
        }}
        animate={{ 
          width: cursorState === 'hover' ? 120 : 60, 
          height: cursorState === 'hover' ? 120 : 60, 
          opacity: isVisible ? 1 : 0 
        }}
        transition={{ duration: 0.4 }}
      />
    </>
  );
}

