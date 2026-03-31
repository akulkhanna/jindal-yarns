import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Award, Users, TrendingUp, Shield } from 'lucide-react';
import logoImage from '../../assets/437a2f181017e6f146c52fe9dbde9eec4d1d1933.png';
import { AnimatedCounter } from './AnimatedCounter';
import { SplitTextReveal } from './SplitTextReveal';

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.95, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0.95, 1, 1, 0.95]);

  const highlights = [
    { icon: Award, title: 'ISO 9001:2008 Certified', description: 'Recognized for quality management excellence' },
    { icon: Shield, title: 'Government Recognized', description: 'Export House certified by Government of India' },
    { icon: Users, title: '50+ Dedicated Staff', description: 'Expert team committed to textile excellence' },
    { icon: TrendingUp, title: '40+ Years Legacy', description: 'Continuous growth since 1982' }
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{ position: 'relative' }}
      className="min-h-screen bg-[#0F1729] py-24 overflow-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.035]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(#D4AF37 1px, transparent 1px), linear-gradient(90deg, #D4AF37 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }} />
      </div>

      <motion.div style={{ opacity, y, scale }} className="max-w-7xl mx-auto px-8 relative z-10">

        {/* Section header with split-text */}
        <div className="mb-20 text-center">
          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.1em' }}
            whileInView={{ opacity: 1, letterSpacing: '0.3em' }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-[#D4AF37] text-sm uppercase mb-4"
            style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}
          >
            HERITAGE & EXCELLENCE
          </motion.p>
          <SplitTextReveal
            text="About Us"
            as="h2"
            className="text-5xl md:text-6xl font-light tracking-tight text-white mb-6"
            delay={0.1}
            stagger={0.12}
          />
          {/* Animated underline */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: 'center' }}
            className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left – Company Story */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            {/* Card 1 with hover lift */}
            <motion.div
              whileHover={{ y: -4, boxShadow: '0 20px 60px rgba(212,175,55,0.08)' }}
              transition={{ duration: 0.35 }}
              className="border border-[#D4AF37]/20 bg-[#1B2A4E]/30 p-8"
              style={{ backdropFilter: 'blur(8px)' }}
            >
              <img src={logoImage} alt="Jindal Yarns" className="w-48 h-auto mb-6" />
              <h3 className="text-3xl font-light text-white mb-4 tracking-tight">
                Jindal Yarns Private Limited
              </h3>
              <p className="text-white/80 font-light leading-relaxed mb-4">
                Founded in <span className="text-[#D4AF37]">1982</span> by the visionary{' '}
                <span className="text-[#D4AF37]">Late Mr. Mam Chand Jindal</span>, our company has been
                at the forefront of textile manufacturing for over four decades.
              </p>
              <p className="text-white/80 font-light leading-relaxed">
                Today, under the dynamic leadership of{' '}
                <span className="text-[#D4AF37]">Mr. Amit Jindal</span> and{' '}
                <span className="text-[#D4AF37]">Mr. Jagrit Jindal</span>, we uphold our founder's
                vision of excellence, innovation, and integrity in every fiber we produce.
              </p>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              whileHover={{ y: -4, boxShadow: '0 20px 60px rgba(212,175,55,0.08)' }}
              transition={{ duration: 0.35 }}
              className="border border-[#D4AF37]/20 bg-gradient-to-br from-[#1B2A4E]/50 to-[#0F1729] p-8"
              style={{ backdropFilter: 'blur(8px)' }}
            >
              <h4 className="text-xl font-light text-white mb-4 tracking-tight">Our Commitment</h4>
              <p className="text-white/70 font-light leading-relaxed">
                As an <span className="text-[#D4AF37]">ISO 9001:2008 Certified</span> organization
                and a <span className="text-[#D4AF37]">Government of India recognized Export House</span>,
                we combine traditional craftsmanship with modern technology to deliver premium quality
                yarns and home textiles to markets worldwide.
              </p>
            </motion.div>
          </motion.div>

          {/* Right – Highlight cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {highlights.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, borderColor: 'rgba(212,175,55,0.5)', boxShadow: '0 20px 50px rgba(212,175,55,0.08)' }}
                className="border border-[#D4AF37]/20 bg-[#1B2A4E]/30 p-6 group cursor-default transition-colors"
                style={{ backdropFilter: 'blur(8px)' }}
              >
                {/* Icon with animated gold ring on hover */}
                <div className="relative w-12 h-12 mb-4">
                  <motion.div
                    className="absolute inset-0 rounded-full border border-[#D4AF37]/0 group-hover:border-[#D4AF37]/40"
                    transition={{ duration: 0.4 }}
                    style={{ scale: 1.5 }}
                  />
                  <h.icon className="w-10 h-10 text-[#D4AF37] group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-lg font-light text-white mb-2 tracking-tight">{h.title}</h3>
                <p className="text-white/60 text-sm font-light leading-relaxed">{h.description}</p>

                {/* Bottom reveal line */}
                <motion.div
                  className="mt-4 h-px bg-[#D4AF37]/0 group-hover:bg-[#D4AF37]/30 transition-all duration-500"
                  style={{ transformOrigin: 'left' }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Animated Counters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="border-t border-[#D4AF37]/20 pt-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <AnimatedCounter value="1982" label="Established" delay={0} />
            <AnimatedCounter value="40+" label="Years of Excellence" delay={0.15} />
            <AnimatedCounter value="50+" label="Expert Team Members" delay={0.3} />
            <AnimatedCounter value="40+" label="Countries Served" delay={0.45} />
          </div>
        </motion.div>

        {/* Leadership quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 text-center max-w-3xl mx-auto"
        >
          <motion.div
            whileHover={{ x: 4 }}
            transition={{ duration: 0.3 }}
            className="border-l-2 border-[#D4AF37] pl-6 text-left"
          >
            <blockquote
              className="text-xl md:text-2xl font-light text-white/90 leading-relaxed italic"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              "Quality is not an act, it is a habit. We weave excellence into every fiber."
            </blockquote>
            <p className="text-[#D4AF37] text-sm tracking-wide uppercase mt-4"
              style={{ fontFamily: "'Montserrat', sans-serif" }}>
              — Jindal Yarns Leadership
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
