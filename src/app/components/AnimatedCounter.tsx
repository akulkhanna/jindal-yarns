import { useInView } from 'motion/react';
import { useRef, useEffect, useState } from 'react';

interface AnimatedCounterProps {
  value: string; // e.g. "40+" or "1982" or "ISO"
  label: string;
  delay?: number;
}

function isNumeric(val: string) {
  return /^\d/.test(val);
}

function extractNumber(val: string) {
  const match = val.match(/(\d+)/);
  return match ? parseInt(match[1]) : 0;
}

function getSuffix(val: string) {
  return val.replace(/\d+/, '');
}

export function AnimatedCounter({ value, label, delay = 0 }: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true });
  const [displayValue, setDisplayValue] = useState('00');
  const [hasAnimated, setHasAnimated] = useState(false);

  const numeric = isNumeric(value);
  const targetNum = extractNumber(value);
  const suffix = getSuffix(value);

  useEffect(() => {
    if (!isInView || hasAnimated || !numeric) return;
    setHasAnimated(true);

    const duration = 1800;
    const fps = 60;
    const frames = (duration / 1000) * fps;
    let frame = 0;

    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        frame++;
        const progress = frame / frames;
        // Ease out expo
        const eased = 1 - Math.pow(1 - progress, 4);
        const current = Math.round(eased * targetNum);
        setDisplayValue(String(current));

        if (frame >= frames) {
          clearInterval(interval);
          setDisplayValue(String(targetNum));
        }
      }, 1000 / fps);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [isInView, hasAnimated, numeric, targetNum, delay]);

  return (
    <div ref={ref} className="text-center group">
      <div
        className="text-4xl md:text-5xl font-light text-[#D4AF37] mb-2 tabular-nums"
        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
      >
        {numeric ? `${displayValue}${suffix}` : value}
      </div>
      <div
        className="text-white/50 text-xs tracking-[0.25em] uppercase"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        {label}
      </div>
      {/* Gold underline on hover */}
      <div className="mt-3 h-px w-8 bg-[#D4AF37]/30 mx-auto transition-all duration-500 group-hover:w-16 group-hover:bg-[#D4AF37]/60" />
    </div>
  );
}
