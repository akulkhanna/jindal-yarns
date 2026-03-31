import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Leaf, Droplet, Recycle, Sun } from 'lucide-react';

export function SustainabilitySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.95, 1], [0, 1, 1, 0]);

  const initiatives = [
    {
      icon: Leaf,
      title: 'Eco-Friendly Materials',
      description: 'Organic and sustainable fiber sourcing with minimal environmental impact',
      stats: '60% Sustainable Sources'
    },
    {
      icon: Droplet,
      title: 'Water Conservation',
      description: 'Advanced water recycling systems reducing consumption by 40%',
      stats: '40% Water Saved'
    },
    {
      icon: Recycle,
      title: 'Zero Waste Goal',
      description: 'Comprehensive recycling programs across all production facilities',
      stats: '85% Waste Recycled'
    },
    {
      icon: Sun,
      title: 'Renewable Energy',
      description: 'Solar-powered manufacturing plants reducing carbon footprint',
      stats: '35% Solar Energy'
    }
  ];

  const commitments = [
    'Carbon Neutral by 2030',
    'Fair Trade Certified',
    'ISO 14001 Environmental Management',
    'GOTS Organic Certified'
  ];

  return (
    <section
      id="sustainability"
      ref={sectionRef}
      style={{ position: 'relative' }}
      className="min-h-screen bg-[#1B2A4E] py-24"
    >
      <motion.div style={{ opacity }} className="max-w-7xl mx-auto px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="text-[#C0C0C0]/60 text-sm tracking-[0.3em] uppercase mb-4">
            OUR COMMITMENT
          </p>
          <h2 className="text-5xl md:text-6xl font-light tracking-tight text-white mb-6">
            Sustainability
          </h2>
          <p className="text-xl text-[#C0C0C0]/80 font-light max-w-2xl">
            Building a greener future through responsible manufacturing and ethical practices
          </p>
        </motion.div>

        {/* Initiatives Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {initiatives.map((initiative, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
              className="border border-[#C0C0C0]/10 bg-[#000000] p-8 group hover:border-[#C0C0C0]/30 transition-colors"
            >
              <div className="flex items-start justify-between mb-6">
                <initiative.icon className="w-12 h-12 text-[#C0C0C0] group-hover:text-white transition-colors" />
                <span className="text-[#C0C0C0]/60 text-sm font-light tracking-wide">
                  {initiative.stats}
                </span>
              </div>
              <h3 className="text-2xl font-light text-white mb-3 tracking-tight">
                {initiative.title}
              </h3>
              <p className="text-[#C0C0C0]/70 font-light leading-relaxed">
                {initiative.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Commitments Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="border border-[#C0C0C0]/10 bg-gradient-to-br from-[#000000] to-[#1A1A1B] p-12"
        >
          <h3 className="text-2xl font-light text-white mb-8 tracking-tight">
            Our Certifications & Goals
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {commitments.map((commitment, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                className="flex items-start gap-3"
              >
                <div className="w-2 h-2 bg-[#C0C0C0] rounded-full mt-2 flex-shrink-0" />
                <span className="text-[#C0C0C0] font-light tracking-wide">
                  {commitment}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quote Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center max-w-3xl mx-auto"
        >
          <blockquote className="text-2xl md:text-3xl font-light text-white/90 leading-relaxed mb-6 italic">
            "Excellence in manufacturing means excellence in stewardship of our planet"
          </blockquote>
          <p className="text-[#C0C0C0]/60 text-sm tracking-[0.3em] uppercase">
            JINDAL YARNS SUSTAINABILITY VISION
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}