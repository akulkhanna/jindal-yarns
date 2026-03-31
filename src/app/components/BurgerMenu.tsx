import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface BurgerMenuProps {
  onNavigate?: (section: string) => void;
}

export function BurgerMenu({ onNavigate }: BurgerMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const menuItems = [
    { label: 'Home', href: '#hero', num: '01' },
    { label: 'About Us', href: '#about', num: '02' },
    { label: 'Yarn Catalog', href: '#yarn-catalog', num: '03' },
    { label: 'Home Textiles', href: '#home-textiles', num: '04' },
    { label: 'Fiber Science', href: '#fiber-science', num: '05' },
    { label: 'Global Export', href: '#global-export', num: '06' },
    { label: 'Sustainability', href: '#sustainability', num: '07' },
    { label: 'Contact', href: '#contact', num: '08' },
  ];

  const handleNavigate = (href: string) => {
    setIsOpen(false);
    if (onNavigate) {
      onNavigate(href);
    } else {
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 400);
    }
  };

  return (
    <>
      {/* Burger button — morphs on scroll */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        data-cursor-label={isOpen ? 'CLOSE' : 'MENU'}
        className="fixed top-8 right-8 z-[9000] w-14 h-14 flex items-center justify-center"
        animate={{
          backgroundColor: scrolled ? 'rgba(15,23,41,0.9)' : 'transparent',
          borderColor: isOpen ? 'rgba(212,175,55,0.6)' : 'rgba(212,175,55,0.25)',
        }}
        style={{
          border: '1px solid',
          backdropFilter: 'blur(12px)',
        }}
        aria-label="Toggle menu"
      >
        {/* Animated hamburger to X */}
        <div className="relative w-5 h-4 flex flex-col justify-between">
          <motion.span
            className="block h-px bg-[#D4AF37] origin-center"
            animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.span
            className="block h-px bg-[#D4AF37]"
            animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="block h-px bg-[#D4AF37] origin-center"
            animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Full-screen backdrop with clip-path wipe */}
            <motion.div
              initial={{ clipPath: 'inset(0 0 100% 0)' }}
              animate={{ clipPath: 'inset(0 0 0% 0)' }}
              exit={{ clipPath: 'inset(0 100% 0 0)' }}
              transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
              className="fixed inset-0 z-[8000]"
              style={{ backgroundColor: '#0F1729' }}
              onClick={() => setIsOpen(false)}
            />

            {/* Gold panel accent */}
            <motion.div
              initial={{ clipPath: 'inset(0 0 100% 0)' }}
              animate={{ clipPath: 'inset(0 0 0% 0)' }}
              exit={{ clipPath: 'inset(0 100% 0 0)' }}
              transition={{ duration: 0.7, delay: 0.05, ease: [0.76, 0, 0.24, 1] }}
              className="fixed top-0 left-0 bottom-0 w-1 z-[8001]"
              style={{ background: 'linear-gradient(to bottom, transparent, #D4AF37, transparent)' }}
            />

            {/* Nav content */}
            <motion.nav
              className="fixed inset-0 z-[8500] flex flex-col justify-center px-16 md:px-24"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, delay: 0.3 }}
            >
              <ul className="space-y-2">
                {menuItems.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, delay: 0.35 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <button
                      onClick={() => handleNavigate(item.href)}
                      className="group flex items-baseline gap-6 w-full text-left py-2"
                    >
                      {/* Number */}
                      <span
                        className="text-xs text-[#D4AF37]/40 group-hover:text-[#D4AF37]/80 transition-colors tabular-nums"
                        style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}
                      >
                        {item.num}
                      </span>
                      {/* Label with underline wipe */}
                      <span className="relative">
                        <span
                          className="text-4xl md:text-6xl font-light text-white/70 group-hover:text-white transition-colors duration-300 tracking-tight"
                          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                        >
                          {item.label}
                        </span>
                        {/* Gold underline reveal on hover */}
                        <motion.span
                          className="absolute bottom-0 left-0 h-px bg-[#D4AF37] origin-left"
                          initial={{ scaleX: 0 }}
                          whileHover={{ scaleX: 1 }}
                          transition={{ duration: 0.4 }}
                          style={{ width: '100%' }}
                        />
                      </span>
                    </button>
                  </motion.li>
                ))}
              </ul>

              {/* Footer info */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="absolute bottom-12 left-16 md:left-24"
              >
                <p
                  className="text-[#D4AF37]/40 text-xs tracking-[0.35em] uppercase"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Jindal Yarns Private Limited · Since 1982
                </p>
              </motion.div>

              {/* Corner decor */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute bottom-12 right-12 flex gap-2 items-center"
              >
                <div className="w-8 h-px bg-[#D4AF37]/20" />
                <div className="w-2 h-2 border border-[#D4AF37]/30 rotate-45" />
              </motion.div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
