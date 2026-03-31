import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useState } from 'react';
import { Mail, Phone, MapPin, Send, Award, Shield } from 'lucide-react';
import { SplitTextReveal } from './SplitTextReveal';

export function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const contactInfo = [
    { icon: Mail, label: 'Primary Email', value: 'jindalint77@gmail.com' },
    { icon: Mail, label: 'Information Email', value: 'info.jindalyarns@gmail.com' },
    { icon: Phone, label: 'Phone', value: '+91 (0) 1234 567890' },
    { icon: MapPin, label: 'Address', value: 'E-1 Old Industrial Area, Near Hali Park' },
  ];

  const inputBase =
    'w-full bg-transparent border-b text-white px-0 py-3 focus:outline-none transition-all duration-300 font-light placeholder-white/20';

  return (
    <section ref={sectionRef} id="contact" className="relative min-h-screen bg-[#1B2A4E] py-24 overflow-hidden">
      {/* Subtle parallax bg */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 opacity-[0.025]"
      >
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(#D4AF37 1px, transparent 1px), linear-gradient(90deg, #D4AF37 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }} />
      </motion.div>

      {/* Gold gradient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#D4AF37]/5 blur-[100px] rounded-full" />

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        {/* Section header */}
        <div className="mb-20 text-center">
          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.1em' }}
            whileInView={{ opacity: 1, letterSpacing: '0.3em' }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-[#D4AF37] text-sm uppercase mb-4"
            style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}
          >
            GET IN TOUCH
          </motion.p>
          <SplitTextReveal
            text="Contact Us"
            as="h2"
            className="text-5xl md:text-6xl font-light tracking-tight text-white mb-6"
            delay={0.1}
            stagger={0.12}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left – info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-10"
          >
            <div>
              <h3 className="text-3xl font-light text-white mb-4 tracking-tight">
                Start Your Export Journey
              </h3>
              <p className="text-white/70 font-light leading-relaxed">
                Whether you're looking for premium yarn suppliers or have questions about our products,
                our team is ready to assist with expert guidance and competitive pricing.
              </p>
            </div>

            {/* Export CTA card */}
            <motion.div
              whileHover={{ y: -4, boxShadow: '0 20px 60px rgba(212,175,55,0.1)' }}
              transition={{ duration: 0.3 }}
              className="border border-[#D4AF37] bg-gradient-to-br from-[#D4AF37]/10 to-transparent p-8"
            >
              <h4 className="text-2xl font-light text-white mb-3 tracking-tight">Export Inquiries</h4>
              <p className="text-white/60 font-light mb-6 leading-relaxed text-sm">
                Government of India recognized Export House ready to serve global markets
              </p>
              <motion.button
                data-cursor-label="INQUIRE"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative w-full px-8 py-4 bg-[#D4AF37] text-[#0F1729] overflow-hidden font-light tracking-wider flex items-center justify-center gap-2"
              >
                <motion.span
                  className="absolute inset-0 bg-[#FFD700]"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.35 }}
                />
                <span className="relative z-10 flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  SUBMIT EXPORT INQUIRY
                </span>
              </motion.button>
            </motion.div>

            {/* Contact info rows */}
            <div className="space-y-4">
              {contactInfo.map((info, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                  whileHover={{ x: 6, borderColor: 'rgba(212,175,55,0.4)' }}
                  className="flex items-start gap-5 border border-[#D4AF37]/15 bg-[#0F1729]/40 p-5 transition-colors"
                  style={{ backdropFilter: 'blur(8px)' }}
                >
                  <div className="w-8 h-8 flex items-center justify-center border border-[#D4AF37]/20 flex-shrink-0 mt-0.5">
                    <info.icon className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                  <div>
                    <p className="text-[#D4AF37]/60 text-xs tracking-widest uppercase mb-1">{info.label}</p>
                    <p className="text-white font-light text-sm">{info.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="border border-[#D4AF37]/15 bg-[#0F1729]/40 p-5">
              <p className="text-[#D4AF37]/60 text-xs tracking-widest uppercase mb-2">Business Hours</p>
              <p className="text-white/70 text-sm font-light leading-relaxed">
                Monday – Friday: 9:00 AM – 6:00 PM IST<br />
                Saturday: 9:00 AM – 2:00 PM IST<br />
                Sunday: Closed
              </p>
            </div>
          </motion.div>

          {/* Right – Form with animated underline inputs */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="border border-[#D4AF37]/20 p-10"
              style={{ backdropFilter: 'blur(12px)', background: 'rgba(15,23,41,0.5)' }}
            >
              <h3 className="text-2xl font-light text-white mb-10 tracking-tight">Send us a Message</h3>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-64 flex flex-col items-center justify-center gap-4 text-center"
                >
                  <div className="w-16 h-16 border-2 border-[#D4AF37] rounded-full flex items-center justify-center">
                    <div className="text-[#D4AF37] text-2xl">✓</div>
                  </div>
                  <p className="text-white text-xl font-light">Message Sent</p>
                  <p className="text-white/50 text-sm">We'll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <form
                  className="space-y-8"
                  onSubmit={e => { e.preventDefault(); setSubmitted(true); }}
                >
                  {/* Animated underline input helper */}
                  {[
                    { id: 'name', label: 'Full Name', type: 'text', required: true },
                    { id: 'company', label: 'Company', type: 'text', required: true },
                    { id: 'email', label: 'Email Address', type: 'email', required: true },
                    { id: 'phone', label: 'Phone Number', type: 'tel', required: false },
                  ].map(field => (
                    <div key={field.id} className="relative">
                      <input
                        type={field.type}
                        id={field.id}
                        required={field.required}
                        placeholder=" "
                        onFocus={() => setFocusedField(field.id)}
                        onBlur={() => setFocusedField(null)}
                        className={`${inputBase} border-[#D4AF37]/20`}
                        style={{ borderBottomColor: focusedField === field.id ? '#D4AF37' : 'rgba(212,175,55,0.2)' }}
                      />
                      <label
                        htmlFor={field.id}
                        className="absolute left-0 text-white/40 text-sm transition-all duration-300 pointer-events-none"
                        style={{
                          top: focusedField === field.id ? '-18px' : '12px',
                          fontSize: focusedField === field.id ? '11px' : '14px',
                          color: focusedField === field.id ? '#D4AF37' : 'rgba(255,255,255,0.4)',
                          letterSpacing: focusedField === field.id ? '0.15em' : '0.05em',
                        }}
                      >
                        {field.label}{field.required && ' *'}
                      </label>
                      {/* Animated underline */}
                      <motion.div
                        className="absolute bottom-0 left-0 h-px bg-[#D4AF37]"
                        animate={{ width: focusedField === field.id ? '100%' : '0%' }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                  ))}

                  <div className="relative">
                    <select
                      id="inquiry-type"
                      onFocus={() => setFocusedField('inquiry')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full bg-transparent border-b border-[#D4AF37]/20 text-white/70 px-0 py-3 focus:outline-none font-light text-sm appearance-none"
                      style={{ borderBottomColor: focusedField === 'inquiry' ? '#D4AF37' : 'rgba(212,175,55,0.2)' }}
                    >
                      <option value="export" className="bg-[#1B2A4E]">Export Inquiry</option>
                      <option value="yarn" className="bg-[#1B2A4E]">Yarn Products</option>
                      <option value="textiles" className="bg-[#1B2A4E]">Home Textiles</option>
                      <option value="general" className="bg-[#1B2A4E]">General Inquiry</option>
                    </select>
                    <motion.div
                      className="absolute bottom-0 left-0 h-px bg-[#D4AF37]"
                      animate={{ width: focusedField === 'inquiry' ? '100%' : '0%' }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>

                  <div className="relative">
                    <textarea
                      id="message"
                      rows={4}
                      required
                      placeholder="Your message..."
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full bg-transparent border-b text-white px-0 py-3 focus:outline-none font-light text-sm resize-none placeholder-white/20 transition-colors"
                      style={{ borderBottomColor: focusedField === 'message' ? '#D4AF37' : 'rgba(212,175,55,0.2)' }}
                    />
                    <motion.div
                      className="absolute bottom-0 left-0 h-px bg-[#D4AF37]"
                      animate={{ width: focusedField === 'message' ? '100%' : '0%' }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    data-cursor-label="SEND"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="group relative w-full bg-[#D4AF37] text-[#0F1729] py-4 overflow-hidden font-light tracking-wider flex items-center justify-center gap-2"
                  >
                    <motion.span
                      className="absolute inset-0 bg-[#FFD700]"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.35 }}
                    />
                    <span className="relative z-10 flex items-center gap-2">
                      SEND MESSAGE <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>

        {/* Map placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 border border-[#D4AF37]/20 overflow-hidden"
        >
          <div className="w-full h-72 bg-[#0F1729]/60 flex items-center justify-center relative">
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `linear-gradient(#D4AF37 1px, transparent 1px), linear-gradient(90deg, #D4AF37 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }} />
            <div className="text-center relative z-10">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <MapPin className="w-10 h-10 text-[#D4AF37] mx-auto mb-3" />
              </motion.div>
              <p className="text-white/50 font-light text-sm">E-1 Old Industrial Area, Near Hali Park</p>
              <p className="text-[#D4AF37]/40 text-xs mt-1 tracking-widest uppercase">Panipat, India</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-8 mt-24 pt-12 border-t border-[#D4AF37]/20"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 items-center">
          <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-4">
            <div className="w-14 h-14 border-2 border-[#D4AF37] rounded-full flex items-center justify-center">
              <Award className="w-7 h-7 text-[#D4AF37]" />
            </div>
            <div>
              <div className="text-[#D4AF37] font-light tracking-wide text-sm">ISO 9001:2008</div>
              <div className="text-white/50 text-xs">Certified Quality</div>
            </div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-4">
            <div className="w-14 h-14 border-2 border-[#D4AF37] rounded-full flex items-center justify-center">
              <Shield className="w-7 h-7 text-[#D4AF37]" />
            </div>
            <div>
              <div className="text-[#D4AF37] font-light tracking-wide text-sm">Government Recognized</div>
              <div className="text-white/50 text-xs">Export House</div>
            </div>
          </motion.div>

          <div className="flex gap-6 md:justify-end">
            {['Privacy Policy', 'Terms of Service'].map(link => (
              <a
                key={link}
                href="#"
                className="group relative text-white/40 hover:text-[#D4AF37] text-xs font-light transition-colors"
              >
                {link}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-[#D4AF37] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>
        </div>

        <div className="pt-8 border-t border-[#D4AF37]/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs font-light tracking-wide">
            © 2026 Jindal Yarns Private Limited. All rights reserved.
          </p>
          <p className="text-[#D4AF37]/30 text-xs tracking-[0.3em] uppercase">
            Founded 1982 · Made with Excellence
          </p>
        </div>
      </motion.footer>
    </section>
  );
}
