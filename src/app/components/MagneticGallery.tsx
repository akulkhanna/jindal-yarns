import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useRef, useState } from 'react';

interface MagneticCardProps {
  id: number;
  name: string;
  count: string;
  image?: string;
}

function MagneticCard({ id, name, count }: MagneticCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXRelative = e.clientX - rect.left;
    const mouseYRelative = e.clientY - rect.top;
    
    x.set(mouseXRelative / width - 0.5);
    y.set(mouseYRelative / height - 0.5);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="relative aspect-square group cursor-none"
    >
      <motion.div 
        className="absolute inset-0 bg-[#1A237E]/20 border border-[#FFD600]/20 rounded-xl overflow-hidden backdrop-blur-sm"
        whileHover={{ borderColor: 'rgba(255, 214, 0, 0.5)', scale: 1.02 }}
      >
        {/* Subtle background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFD600]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="p-8 h-full flex flex-col justify-between items-center text-center">
          <div className="w-16 h-16 border border-[#FFD600]/30 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
            <span className="text-[#FFD600] text-xl font-light">{id}</span>
          </div>
          
          <div style={{ transform: 'translateZ(20px)' }}>
            <h4 className="text-[#FFD600] text-lg font-light tracking-wider mb-2 uppercase">
              {name}
            </h4>
            <p className="text-white/40 text-xs tracking-[0.2em]">
              COUNT: {count}
            </p>
          </div>

          <motion.div 
            className="w-12 h-px bg-gradient-to-r from-transparent via-[#FFD600] to-transparent opacity-30 group-hover:scale-x-150 transition-transform duration-700"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export function MagneticGallery() {
  const cards = [
    { id: 1, name: 'Acrylic', count: '2/15s' },
    { id: 2, name: 'Wool Blend', count: '1/12s' },
    { id: 3, name: 'Mink Soft', count: '4/20s' },
    { id: 4, name: 'Silk Finish', count: '1/10s' },
    { id: 5, name: 'Cotton Mix', count: '2/24s' },
    { id: 6, name: 'Heavy Duty', count: '1/6s' },
    { id: 7, name: 'Ultra Fine', count: '2/32s' },
    { id: 8, name: 'Gilded Yarn', count: '1/15s' },
    { id: 9, name: 'Obsidian', count: '1/10s' },
  ];

  return (
    <section className="py-24 bg-[#0C0E14] overflow-hidden" id="gallery">
      <div className="max-w-7xl mx-auto px-8">
        <div className="mb-16 text-center space-y-4">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[#FFD600] text-sm tracking-[0.3em] font-light uppercase"
          >
            Tactile Selection
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl text-white font-light font-display tracking-tight"
          >
            Industrial Masterpieces
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <MagneticCard {...card} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
