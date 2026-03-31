import { motion } from 'motion/react';

interface MarqueeStripProps {
  items?: string[];
  speed?: number;
  inverted?: boolean;
}

const defaultItems = [
  'Premium Yarn',
  'ISO 9001:2008 Certified',
  'Export House',
  '40+ Years Excellence',
  'Home Textiles',
  'Global Export',
  'Sustainable Fibers',
  'Since 1982',
];

export function MarqueeStrip({ items = defaultItems, speed = 35, inverted = false }: MarqueeStripProps) {
  const repeated = [...items, ...items, ...items];

  return (
    <div
      className="w-full overflow-hidden border-y"
      style={{ borderColor: 'rgba(212,175,55,0.15)', backgroundColor: 'rgba(27,42,78,0.5)' }}
    >
      <div className="relative flex py-4">
        <motion.div
          className="flex shrink-0 gap-12 items-center pr-12"
          animate={{ x: inverted ? ['0%', '33.33%'] : ['0%', '-33.33%'] }}
          transition={{ duration: speed, ease: 'linear', repeat: Infinity }}
        >
          {repeated.map((item, i) => (
            <div key={i} className="flex items-center gap-12 shrink-0">
              <span
                className="text-xs tracking-[0.35em] uppercase whitespace-nowrap"
                style={{
                  color: 'rgba(212,175,55,0.7)',
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 300,
                }}
              >
                {item}
              </span>
              <span className="w-1 h-1 rounded-full bg-[#D4AF37] opacity-40 shrink-0" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
