import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Globe2, Ship, TrendingUp, MapPin } from 'lucide-react';
import colorfulYarnImage from '../../assets/11f705cec3ceb825808316d836561b5ac3b31099.png';

export function GlobalExportSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.95, 1], [0, 1, 1, 0]);

  const regions = [
    { name: 'North America', percentage: '25%' },
    { name: 'Europe', percentage: '35%' },
    { name: 'Asia Pacific', percentage: '30%' },
    { name: 'Middle East', percentage: '10%' }
  ];

  const capabilities = [
    {
      icon: Globe2,
      title: 'Global Network',
      description: 'Strategic partnerships across 40+ countries worldwide'
    },
    {
      icon: Ship,
      title: 'Logistics Excellence',
      description: 'Efficient supply chain with on-time delivery guarantee'
    },
    {
      icon: TrendingUp,
      title: 'Market Leadership',
      description: 'Trusted by leading textile manufacturers globally'
    }
  ];

  return (
    <section
      id="global-export"
      ref={sectionRef}
      style={{ position: 'relative' }}
      className="min-h-screen bg-[#0F1729] py-24"
    >
      <motion.div style={{ opacity }} className="max-w-7xl mx-auto px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <p className="text-[#C0C0C0]/60 text-sm tracking-[0.3em] uppercase mb-4">
            WORLDWIDE REACH
          </p>
          <h2 className="text-5xl md:text-6xl font-light tracking-tight text-white">
            Global Export
          </h2>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Large Image Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2 relative overflow-hidden border border-[#C0C0C0]/10 bg-[#1A1A1B] h-[500px]"
          >
            <motion.div
              style={{ y }}
              className="absolute inset-0"
            >
              <img
                src={colorfulYarnImage}
                alt="Global Yarn Export"
                className="w-full h-full object-cover opacity-70"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h3 className="text-3xl font-light text-white mb-3">
                Diverse Product Range
              </h3>
              <p className="text-[#C0C0C0]/80 font-light max-w-xl">
                From premium cotton to specialized synthetic fibers, delivering quality across every spectrum
              </p>
            </div>
          </motion.div>

          {/* Regional Distribution Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="border border-[#C0C0C0]/10 bg-[#1A1A1B] p-8"
          >
            <MapPin className="w-10 h-10 text-[#C0C0C0] mb-6" />
            <h3 className="text-xl font-light text-white mb-6 tracking-tight">
              Export Distribution
            </h3>
            <div className="space-y-4">
              {regions.map((region, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[#C0C0C0] text-sm">{region.name}</span>
                    <span className="text-white text-sm font-light">{region.percentage}</span>
                  </div>
                  <div className="h-1 bg-[#C0C0C0]/10">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: region.percentage }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                      className="h-full bg-gradient-to-r from-[#C0C0C0] to-white"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {capabilities.map((capability, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
              className="border border-[#C0C0C0]/10 bg-[#1A1A1B] p-8 hover:border-[#C0C0C0]/30 transition-colors group"
            >
              <capability.icon className="w-10 h-10 text-[#C0C0C0] mb-6 group-hover:text-white transition-colors" />
              <h3 className="text-xl font-light text-white mb-3 tracking-tight">
                {capability.title}
              </h3>
              <p className="text-[#C0C0C0]/70 font-light leading-relaxed">
                {capability.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-16 text-center"
        >
          <button className="px-12 py-4 bg-white text-[#000000] hover:bg-[#C0C0C0] transition-colors font-light tracking-wide">
            REQUEST EXPORT CATALOG
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}