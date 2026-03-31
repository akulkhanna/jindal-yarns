import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Microscope, Zap, Shield, Award } from 'lucide-react';
import yarnSpoolsImage from '../../assets/0b3c1aa950fa166692c9e457fc49a9fbb5eb30af.png';

export function FiberScienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.95, 1], [0, 1, 1, 0]);

  const features = [
    {
      icon: Microscope,
      title: 'Advanced R&D',
      description: 'State-of-the-art fiber technology and continuous innovation in yarn manufacturing.'
    },
    {
      icon: Zap,
      title: 'High Performance',
      description: 'Superior strength, durability, and consistency across all product lines.'
    },
    {
      icon: Shield,
      title: 'Quality Assured',
      description: 'ISO certified processes ensuring the highest standards of textile excellence.'
    },
    {
      icon: Award,
      title: 'Industry Leader',
      description: 'Decades of expertise serving premium global textile manufacturers.'
    }
  ];

  return (
    <section
      id="fiber-science"
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
            TECHNOLOGY
          </p>
          <h2 className="text-5xl md:text-6xl font-light tracking-tight text-white">
            Our Fiber Science
          </h2>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Large Feature Image Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:row-span-2 relative overflow-hidden border border-[#C0C0C0]/10 bg-gradient-to-br from-[#000000] to-[#1A1A1B] group"
          >
            <motion.div style={{ y }} className="h-full">
              <img
                src={yarnSpoolsImage}
                alt="Advanced Yarn Manufacturing"
                className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h3 className="text-3xl font-light text-white mb-2">
                Precision Engineering
              </h3>
              <p className="text-[#C0C0C0]/80 font-light">
                Where science meets craftsmanship in every fiber
              </p>
            </div>
          </motion.div>

          {/* Feature Cards Grid */}
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
              className="border border-[#C0C0C0]/10 bg-[#000000] p-8 hover:border-[#C0C0C0]/30 transition-colors group"
            >
              <feature.icon className="w-10 h-10 text-[#C0C0C0] mb-6 group-hover:text-white transition-colors" />
              <h3 className="text-xl font-light text-white mb-3 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-[#C0C0C0]/70 font-light leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-6 grid grid-cols-3 gap-6"
        >
          {[
            { value: '50+', label: 'Years Experience' },
            { value: '100M+', label: 'Kg Annual Production' },
            { value: '40+', label: 'Countries Served' }
          ].map((stat, index) => (
            <div
              key={index}
              className="border border-[#C0C0C0]/10 bg-[#000000] p-6 text-center"
            >
              <div className="text-3xl md:text-4xl font-light text-white mb-2">
                {stat.value}
              </div>
              <div className="text-[#C0C0C0]/60 text-sm tracking-wide uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}