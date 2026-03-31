import { motion } from 'motion/react';
import { useState } from 'react';
import { Bed, Bath, Home, Package } from 'lucide-react';

export function HomeTextilesSection() {
  const [activeTab, setActiveTab] = useState('blankets');

  const tabs = [
    { id: 'blankets', label: 'Blankets', icon: Home },
    { id: 'bedsheets', label: 'Bedsheets', icon: Bed },
    { id: 'towels', label: 'Towels', icon: Bath },
    { id: 'carpets', label: 'Carpets & Pillows', icon: Package }
  ];

  const blanketTypes = [
    {
      name: 'Mink Blankets',
      description: 'Ultra-soft, luxurious warmth with superior pile density',
      gsm: '200-400 GSM',
      sizes: 'Single to King Size'
    },
    {
      name: 'Flannel Blankets',
      description: 'Classic comfort with brushed cotton softness',
      gsm: '180-350 GSM',
      sizes: 'All standard sizes'
    },
    {
      name: 'Polar Fleece Blankets',
      description: 'Lightweight insulation with exceptional warmth-to-weight ratio',
      gsm: '160-300 GSM',
      sizes: 'Single to Super King'
    },
    {
      name: 'Donation Blankets',
      description: 'High-quality, cost-effective blankets for charitable distributions',
      gsm: '150-250 GSM',
      sizes: 'Standard sizes'
    },
    {
      name: 'Non-Woven Blankets',
      description: 'Durable, easy-care blankets for institutional use',
      gsm: '120-200 GSM',
      sizes: 'Custom available'
    }
  ];

  const bedsheetSizes = [
    { name: 'Single Bed', size: '152 × 228 cm' },
    { name: 'Double Bed', size: '228 × 254 cm' },
    { name: 'Queen Size', size: '228 × 274 cm' },
    { name: 'King Size', size: '274 × 274 cm' },
    { name: 'Super/Extra King Size', size: '274 × 274 cm' }
  ];

  const towelSpecs = [
    { name: 'Light Weight Towels', gsm: '300-400 GSM', use: 'Gym, Travel' },
    { name: 'Standard Towels', gsm: '450-550 GSM', use: 'Daily Use' },
    { name: 'Premium Towels', gsm: '600-700 GSM', use: 'Hotel, Spa' },
    { name: 'Luxury Towels', gsm: '750-800 GSM', use: 'Premium Hospitality' }
  ];

  const carpetsAndPillows = [
    {
      category: 'Woven Carpets',
      description: 'Traditional craftsmanship with intricate patterns and durability',
      features: ['Hand & Machine Woven', 'Custom Designs', 'Various Pile Heights']
    },
    {
      category: 'Non-Woven Carpets',
      description: 'Modern manufacturing for consistent quality and affordability',
      features: ['Stain Resistant', 'Easy Maintenance', 'Eco-Friendly Options']
    },
    {
      category: 'Microfibre Neck Pillows',
      description: 'Ultra-soft support with hypoallergenic microfiber fill',
      features: ['Travel Friendly', 'Machine Washable', 'Ergonomic Design']
    },
    {
      category: 'Memory Foam Neck Pillows',
      description: 'Orthopedic support with temperature-sensitive memory foam',
      features: ['Pressure Relief', 'Contoured Support', 'Removable Cover']
    }
  ];

  return (
    <section id="home-textiles" className="relative min-h-screen bg-[#0F1729] py-24">
      <div className="max-w-7xl mx-auto px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <p className="text-[#D4AF37] text-sm tracking-[0.3em] uppercase mb-4">
            COMPLETE SOLUTIONS
          </p>
          <h2 className="text-5xl md:text-6xl font-light tracking-tight text-white mb-6">
            Home Textiles
          </h2>
          <p className="text-white/70 text-lg font-light max-w-2xl mx-auto">
            Comprehensive range of premium home textile products crafted for comfort and durability
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 border transition-all flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-white'
                    : 'border-[#D4AF37]/20 text-white/60 hover:border-[#D4AF37]/40'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-light tracking-wide">{tab.label}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Tab Content */}
        <div className="min-h-[600px]">
          {/* Blankets Tab */}
          {activeTab === 'blankets' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {blanketTypes.map((blanket, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border border-[#D4AF37]/20 bg-[#1B2A4E]/30 p-8 hover:border-[#D4AF37]/40 transition-colors"
                >
                  <h3 className="text-2xl font-light text-white mb-3 tracking-tight">
                    {blanket.name}
                  </h3>
                  <p className="text-white/70 font-light leading-relaxed mb-6">
                    {blanket.description}
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center pb-2 border-b border-[#D4AF37]/10">
                      <span className="text-white/50">Weight Range:</span>
                      <span className="text-[#D4AF37] font-light">{blanket.gsm}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/50">Available Sizes:</span>
                      <span className="text-white font-light">{blanket.sizes}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Bedsheets Tab */}
          {activeTab === 'bedsheets' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="border border-[#D4AF37]/20 bg-[#1B2A4E]/30 p-12">
                <h3 className="text-3xl font-light text-white mb-8 tracking-tight">
                  Bedsheet Size Guide
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {bedsheetSizes.map((sheet, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-6 border border-[#D4AF37]/10 bg-[#0F1729]/50"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 border border-[#D4AF37]/30 flex items-center justify-center">
                          <Bed className="w-6 h-6 text-[#D4AF37]" />
                        </div>
                        <span className="text-white font-light text-lg">{sheet.name}</span>
                      </div>
                      <span className="text-[#D4AF37] font-light tracking-wide">{sheet.size}</span>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-8 p-6 border border-[#D4AF37]/20 bg-[#0F1729]/30">
                  <p className="text-white/70 font-light leading-relaxed">
                    <span className="text-[#D4AF37]">Premium Quality:</span> All bedsheets available in 
                    100% cotton, poly-cotton blends, and microfiber options. Thread counts ranging from 
                    180 TC to 400 TC. Custom sizes and colors available on request.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Towels Tab */}
          {activeTab === 'towels' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="border border-[#D4AF37]/20 bg-[#1B2A4E]/30 p-12">
                <h3 className="text-3xl font-light text-white mb-4 tracking-tight">
                  Cotton Terry Towels
                </h3>
                <p className="text-white/70 font-light leading-relaxed mb-8">
                  Premium quality 100% cotton terry towels with superior absorbency and durability. 
                  Available in various GSM ranges to suit different applications.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {towelSpecs.map((towel, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-6 border border-[#D4AF37]/10 bg-[#0F1729]/50"
                    >
                      <h4 className="text-xl font-light text-white mb-3">{towel.name}</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between items-center pb-2 border-b border-[#D4AF37]/10">
                          <span className="text-white/50">Weight:</span>
                          <span className="text-[#D4AF37] font-light">{towel.gsm}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-white/50">Best For:</span>
                          <span className="text-white font-light">{towel.use}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Carpets & Pillows Tab */}
          {activeTab === 'carpets' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {carpetsAndPillows.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border border-[#D4AF37]/20 bg-[#1B2A4E]/30 p-8 hover:border-[#D4AF37]/40 transition-colors"
                >
                  <h3 className="text-2xl font-light text-white mb-3 tracking-tight">
                    {item.category}
                  </h3>
                  <p className="text-white/70 font-light leading-relaxed mb-6">
                    {item.description}
                  </p>
                  <div className="space-y-2">
                    {item.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full mt-2 flex-shrink-0" />
                        <span className="text-white/80 font-light text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 text-center border-t border-[#D4AF37]/20 pt-12"
        >
          <h3 className="text-2xl font-light text-white mb-4 tracking-tight">
            Need Custom Specifications?
          </h3>
          <p className="text-white/70 font-light mb-8 max-w-2xl mx-auto">
            We offer customization in sizes, colors, GSM, and materials for all our home textile products. 
            Contact us for bulk orders and special requirements.
          </p>
          <button className="px-12 py-4 bg-[#D4AF37] text-[#0F1729] hover:bg-[#E8C468] transition-colors font-light tracking-wide">
            REQUEST PRODUCT CATALOG
          </button>
        </motion.div>
      </div>
    </section>
  );
}