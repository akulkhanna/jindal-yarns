import { useEffect, useState } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgress } from './components/ScrollProgress';
import { SectionTransition } from './components/SectionTransition';
import { BurgerMenu } from './components/BurgerMenu';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { YarnCatalog } from './components/YarnCatalog';
import { HomeTextilesSection } from './components/HomeTextilesSection';
import { FiberScienceSection } from './components/FiberScienceSection';
import { GlobalExportSection } from './components/GlobalExportSection';
import { SustainabilitySection } from './components/SustainabilitySection';
import { ContactSection } from './components/ContactSection';
import { PageLoader } from './components/PageLoader';
import { MarqueeStrip } from './components/MarqueeStrip';
import { MagneticGallery } from './components/MagneticGallery';
import { CinematicBackground } from './components/CinematicBackground';

// Film-grain overlay component
function GrainOverlay() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9990] opacity-[0.02]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '200px',
      }}
    />
  );
}

// Smooth reveal wrapper — sections fade+translate on scroll
function SectionReveal({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

export default function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'auto'; // Disable native smooth scroll for better library-based parallax
    document.body.style.cursor = 'none';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <>
      {/* Page Loader — cinematic brand reveal */}
      <PageLoader onComplete={() => setLoaded(true)} />

      <div className="min-h-screen bg-[#0F1729] text-white antialiased" style={{ position: 'relative' }}>
        {/* Cinematic Background (Looming Mill Parallax) */}
        <CinematicBackground />

        {/* Film grain */}
        <GrainOverlay />

        {/* Custom Cursor */}
        <CustomCursor />

        {/* Scroll Progress Bar */}
        <ScrollProgress />

        {/* Navigation */}
        <BurgerMenu />

        {/* Hero */}
        <HeroSection />

        {/* Marquee strip 1 */}
        <MarqueeStrip />

        <SectionTransition index={0} />

        {/* About */}
        <AboutSection />

        {/* Magnetic Gallery selector */}
        <MagneticGallery />

        <SectionTransition index={1} />

        {/* Yarn Catalog */}
        <YarnCatalog />

        {/* Marquee strip 2 – inverted direction */}
        <MarqueeStrip
          items={['Shoddy Acrylic', 'Woollen Yarn', 'Half Wool Blend', 'Recycled Cotton', 'Custom Blends', 'Industrial Grade', 'Export Ready']}
          inverted
        />

        <SectionTransition index={2} />

        {/* Home Textiles */}
        <HomeTextilesSection />

        <SectionTransition index={3} />

        {/* Fiber Science */}
        <FiberScienceSection />

        {/* Marquee strip 3 */}
        <MarqueeStrip
          items={['Panipat, India', '40+ Countries', 'Government Certified', 'ISO 9001:2008', 'B2B Export House', 'Since 1982', 'Premium Quality']}
          speed={45}
        />

        <SectionTransition index={4} />

        {/* Global Export */}
        <GlobalExportSection />

        <SectionTransition index={5} />

        {/* Sustainability */}
        <SustainabilitySection />

        <SectionTransition index={6} />

        {/* Contact */}
        <ContactSection />
      </div>
    </>
  );
}
