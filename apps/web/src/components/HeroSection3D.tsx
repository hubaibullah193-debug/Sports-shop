'use client';

import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { Button } from '@/components/Button';
import { Container, Section } from '@/components/Layout';

const Floating3DObject = ({
  icon,
  delay,
  rotationAxis,
  size,
}: {
  icon: string;
  delay: number;
  rotationAxis: 'x' | 'y' | 'z';
  size: 'sm' | 'md' | 'lg' | 'xl';
}) => {
  const rotations = {
    x: { rotateX: 360, rotateY: 0, rotateZ: 0 },
    y: { rotateX: 0, rotateY: 360, rotateZ: 0 },
    z: { rotateX: 0, rotateY: 0, rotateZ: 360 },
  };

  const sizeClasses = {
    sm: 'text-4xl md:text-6xl',
    md: 'text-6xl md:text-8xl',
    lg: 'text-8xl md:text-9xl',
    xl: 'text-9xl md:text-[200px]',
  };

  return (
    <motion.div
      className={`absolute ${sizeClasses[size]} opacity-20 dark:opacity-30`}
      animate={rotations[rotationAxis]}
      transition={{
        duration: 12 + Math.random() * 4,
        repeat: Infinity,
        ease: 'linear',
        delay,
      }}
      style={{
        perspective: '1200px',
        filter: 'drop-shadow(0 30px 60px rgba(0, 0, 0, 0.4))',
      }}
    >
      {icon}
    </motion.div>
  );
};

export const HeroSection3D = () => {
  const objects = [
    // Large background objects - full coverage
    { icon: '🖨️', delay: 0, axis: 'y' as const, size: 'xl' as const, top: '5%', left: '-5%' },
    { icon: '⚽', delay: 1.5, axis: 'z' as const, size: 'xl' as const, top: '10%', right: '-8%' },
    { icon: '✏️', delay: 2.5, axis: 'x' as const, size: 'lg' as const, bottom: '10%', left: '-3%' },
    { icon: '🏏', delay: 0.8, axis: 'y' as const, size: 'lg' as const, bottom: '5%', right: '0%' },

    // Mid-size objects for depth
    { icon: '📚', delay: 1.2, axis: 'z' as const, size: 'lg' as const, top: '40%', left: '5%' },
    { icon: '🎒', delay: 2, axis: 'x' as const, size: 'md' as const, top: '30%', right: '8%' },
    { icon: '📝', delay: 0.5, axis: 'y' as const, size: 'md' as const, bottom: '35%', left: '12%' },
    { icon: '⚙️', delay: 1.8, axis: 'z' as const, size: 'md' as const, bottom: '40%', right: '5%' },

    // Small accent objects
    { icon: '🎯', delay: 2.2, axis: 'x' as const, size: 'sm' as const, top: '15%', left: '20%' },
    { icon: '📎', delay: 0.3, axis: 'y' as const, size: 'sm' as const, top: '60%', right: '15%' },
    { icon: '✂️', delay: 2.8, axis: 'z' as const, size: 'sm' as const, bottom: '20%', left: '35%' },
    { icon: '🖍️', delay: 1.1, axis: 'x' as const, size: 'sm' as const, bottom: '25%', right: '25%' },
  ];

  return (
    <Section className="relative overflow-hidden min-h-screen flex items-center justify-center py-32 md:py-48">
      {/* Dark Mode Background */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg,
            #0f1419 0%,
            #1a2332 25%,
            #1f2937 50%,
            #1a2332 75%,
            #0f1419 100%)`,
        }}
      />

      {/* Animated Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, .05) 25%, rgba(255, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .05) 75%, rgba(255, 255, 255, .05) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, .05) 25%, rgba(255, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .05) 75%, rgba(255, 255, 255, .05) 76%, transparent 77%, transparent)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* 3D Objects Background - Full Page Coverage */}
      <div className="absolute inset-0 overflow-hidden perspective">
        {objects.map((obj, idx) => (
          <Floating3DObject
            key={idx}
            icon={obj.icon}
            delay={obj.delay}
            rotationAxis={obj.axis}
            size={obj.size}
          />
        ))}
      </div>

      {/* Radial Gradient Overlay for Focus */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, rgba(15, 20, 25, 0) 0%, rgba(15, 20, 25, 0.4) 100%)`,
        }}
      />

      {/* Content - Foreground */}
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Animated Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-6"
          >
            <div className="px-4 py-2 rounded-full bg-accent/10 border border-accent/30 text-accent text-sm font-semibold">
              ✨ Welcome to Elite Sports & Stationery
            </div>
          </motion.div>

          {/* Animated Title */}
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 drop-shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Hubaib's Sports and Stationary House
          </motion.h1>

          {/* Animated Subtitle */}
          <motion.p
            className="text-lg md:text-2xl text-gray-300 mb-8 drop-shadow-lg max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover premium sports equipment, quality stationery, and professional printing services all in one place
          </motion.p>

          {/* Animated Buttons */}
          <motion.div
            className="flex gap-4 justify-center flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button variant="primary" size="lg">
              Shop Now <FiArrowRight />
            </Button>
            <Button variant="ghost" size="lg">
              Explore Printing
            </Button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="mt-12"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="flex justify-center">
              <div className="text-gray-400 text-sm">
                <div className="text-2xl">↓</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>

      {/* Floating Glow Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: `radial-gradient(circle, rgba(200, 162, 75, 0.8) 0%, rgba(200, 162, 75, 0) 70%)`,
              boxShadow: '0 0 20px rgba(200, 162, 75, 0.5)',
            }}
            animate={{
              y: [-50, 200 + i * 30, -50],
              x: [Math.random() * 40 - 20, Math.random() * 60 - 30, Math.random() * 40 - 20],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 8 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.3,
            }}
            initial={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 60}%`,
            }}
          />
        ))}
      </div>
    </Section>
  );
};
