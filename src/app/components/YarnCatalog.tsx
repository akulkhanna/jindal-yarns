import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ThreeJSFiberSpool } from './ThreeJSFiberSpool';
import woolTextureImage from '../../assets/0b3c1aa950fa166692c9e457fc49a9fbb5eb30af.png';

export function YarnCatalog() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const smoothCatalogProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const parallaxY = useTransform(smoothCatalogProgress, [0, 1], [50, -50]);
  const opacity = useTransform(smoothCatalogProgress, [0, 0.15, 0.95, 1], [0, 1, 1, 0]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const yarnCategories = [
    {
      id: 1,
      name: 'Shoddy Acrylic Yarn',
      description: 'Premium recycled acrylic fibers with excellent durability and color retention. Perfect for knitwear and industrial applications.',
      features: ['High tensile strength', 'Color-fast', 'Eco-friendly'],
      counts: '10s to 30s',
      applications: 'Sweaters, Shawls, Blankets'
    },
    {
      id: 2,
      name: 'Woollen Yarn',
      description: 'Pure woollen yarn crafted from finest quality wool. Offers superior warmth, breathability, and natural elasticity.',
      features: ['100% Pure Wool', 'Temperature regulating', 'Natural elasticity'],
      counts: '8s to 24s',
      applications: 'Premium Garments, Carpets, Upholstery'
    },
    {
      id: 3,
      name: 'Half Wool (50% Wool) Yarn',
      description: 'Perfect blend of wool and synthetic fibers providing optimal balance of comfort, durability, and affordability.',
      features: ['50% Wool blend', 'Enhanced durability', 'Cost-effective'],
      counts: '10s to 28s',
      applications: 'Blankets, Shawls, Apparel'
    },
    {
      id: 4,
      name: 'Blended Yarn',
      description: 'Innovative fiber combinations engineered for specific performance characteristics and unique textile properties.',
      features: ['Custom blends', 'Versatile applications', 'Performance optimized'],
      counts: '12s to 32s',
      applications: 'Technical Textiles, Fashion Wear'
    },
    {
      id: 5,
      name: 'Recycled Cotton Blended Coloured/White Yarn',
      description: 'Sustainable recycled cotton blends available in vibrant colors and classic white. Commitment to environmental responsibility.',
      features: ['Eco-friendly', 'Sustainable sourcing', 'Vibrant colors'],
      counts: '6s to 20s',
      applications: 'Home Textiles, Casual Wear, Towels'
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % yarnCategories.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + yarnCategories.length) % yarnCategories.length);
  };

  return (
    <section
      id="yarn-catalog"
      ref={sectionRef}
      style={{ position: 'relative' }}
      className="min-h-screen bg-[#1B2A4E] py-24 overflow-hidden"
    >
      {/* Parallax Background with Wool Texture */}
      <motion.div
        style={{ y: parallaxY }}
        className="absolute inset-0 opacity-10"
      >
        <img
          src={woolTextureImage}
          alt="Wool Texture"
          className="w-full h-full object-cover scale-110"
        />
      </motion.div>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1B2A4E]/90 via-[#1B2A4E]/80 to-[#1B2A4E]/90" />

      <motion.div style={{ opacity }} className="max-w-7xl mx-auto px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <p className="text-[#D4AF37] text-sm tracking-[0.3em] uppercase mb-4">
            PREMIUM QUALITY
          </p>
          <h2 className="text-5xl md:text-6xl font-light tracking-tight text-white mb-6">
            Our Yarn Collection
          </h2>
          <p className="text-white/70 text-lg font-light max-w-2xl mx-auto">
            Discover our diverse range of premium yarns, each crafted with precision and care
          </p>
        </motion.div>

        {/* Featured Yarn Slider */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mb-12"
        >
          <div className="border border-[#D4AF37]/20 bg-[#0F1729]/80 backdrop-blur-sm overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Yarn Details */}
              <div className="p-12 flex flex-col justify-center">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-[#D4AF37]/60 text-sm tracking-widest uppercase mb-4">
                    Product {currentIndex + 1} of {yarnCategories.length}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-light text-white mb-6 tracking-tight">
                    {yarnCategories[currentIndex].name}
                  </h3>
                  <p className="text-white/70 font-light leading-relaxed mb-8">
                    {yarnCategories[currentIndex].description}
                  </p>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3">
                      <div className="w-1 h-1 bg-[#D4AF37] rounded-full mt-2.5 flex-shrink-0" />
                      <div>
                        <span className="text-white/50 text-sm">Count Range: </span>
                        <span className="text-white font-light">{yarnCategories[currentIndex].counts}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1 h-1 bg-[#D4AF37] rounded-full mt-2.5 flex-shrink-0" />
                      <div>
                        <span className="text-white/50 text-sm">Applications: </span>
                        <span className="text-white font-light">{yarnCategories[currentIndex].applications}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {yarnCategories[currentIndex].features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 border border-[#D4AF37]/30 text-[#D4AF37] text-sm font-light tracking-wide"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <button 
                    className="group relative px-8 py-3 bg-[#D4AF37] text-[#0F1729] overflow-hidden font-light tracking-wider" 
                    data-cursor-label="SAMPLE"
                    data-cursor-tech={`${yarnCategories[currentIndex].counts} // PURE.QUALITY`}
                  >
                  <span className="absolute inset-0 bg-[#FFD700] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                    REQUEST SAMPLES
                  </button>
                </motion.div>
              </div>

              {/* Yarn Visual - Tactile 3D Spool */}
              <div className="relative bg-gradient-to-br from-[#D4AF37]/5 to-[#D4AF37]/10 p-12 flex items-center justify-center min-h-[500px] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.8, rotate: 15 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="relative w-full h-full flex items-center justify-center"
                    data-cursor-label="FEEL"
                    data-cursor-tech="3D.Fiber // Live.View"
                  >
                    <ThreeJSFiberSpool />

                    {/* Tech specs readout */}
                    <div className="absolute bottom-4 left-4 font-mono text-[9px] text-[#D4AF37]/40 tracking-widest leading-relaxed">
                      VOL: 0.12m³<br/>
                      TENSILE: HIGH<br/>
                      STATE: INSPECTED
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4 pointer-events-none">
            <button
              onClick={prevSlide}
              className="w-12 h-12 bg-[#D4AF37]/90 hover:bg-[#D4AF37] text-[#0F1729] flex items-center justify-center transition-colors pointer-events-auto"
              aria-label="Previous yarn"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="w-12 h-12 bg-[#D4AF37]/90 hover:bg-[#D4AF37] text-[#0F1729] flex items-center justify-center transition-colors pointer-events-auto"
              aria-label="Next yarn"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {yarnCategories.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1 transition-all ${
                  idx === currentIndex ? 'w-12 bg-[#D4AF37]' : 'w-6 bg-[#D4AF37]/30'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </motion.div>

        {/* Quick Grid View */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          {yarnCategories.map((yarn, idx) => (
            <button
              key={yarn.id}
              onClick={() => setCurrentIndex(idx)}
              className={`border p-6 text-center transition-all ${
                idx === currentIndex
                  ? 'border-[#D4AF37] bg-[#D4AF37]/10'
                  : 'border-[#D4AF37]/20 bg-[#0F1729]/50 hover:border-[#D4AF37]/40'
              }`}
            >
              <div className={`text-4xl font-light mb-3 ${
                idx === currentIndex ? 'text-[#D4AF37]' : 'text-[#D4AF37]/40'
              }`}>
                {idx + 1}
              </div>
              <div className={`text-sm font-light tracking-wide ${
                idx === currentIndex ? 'text-white' : 'text-white/60'
              }`}>
                {yarn.name.split(' ')[0]}
              </div>
            </button>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}