import { motion } from 'motion/react';
import { ReactNode, useState, MouseEvent } from 'react';

interface PremiumCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}

export function PremiumCard({ 
  children, 
  className = '',
  glowColor = '#D4AF37'
}: PremiumCardProps) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateXValue = ((y - centerY) / centerY) * -10;
    const rotateYValue = ((x - centerX) / centerX) * 10;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX,
        rotateY,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 20
      }}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000
      }}
    >
      {/* Glow effect on hover */}
      <motion.div
        className="absolute -inset-1 rounded-lg opacity-0"
        style={{
          background: `radial-gradient(circle at center, ${glowColor}30, transparent 70%)`,
          filter: 'blur(20px)'
        }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Card content */}
      <div className="relative">
        {children}
      </div>
    </motion.div>
  );
}
