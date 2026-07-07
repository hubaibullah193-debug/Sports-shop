'use client';

import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { Button } from '@/components/Button';
import { Container, Section } from '@/components/Layout';

const Floating3DObject = ({
  icon,
  delay,
  rotationAxis,
}: {
  icon: string;
  delay: number;
  rotationAxis: 'x' | 'y' | 'z';
}) => {
  const rotations = {
    x: { rotateX: 360, rotateY: 0, rotateZ: 0 },
    y: { rotateX: 0, rotateY: 360, rotateZ: 0 },
    z: { rotateX: 0, rotateY: 0, rotateZ: 360 },
  };

  return (
    <motion.div
      className="absolute text-6xl md:text-8xl"
      animate={rotations[rotationAxis]}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'linear',
        delay,
      }}
      style={{
        perspective: '1000px',
        filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.2))',
      }}
    >
      {icon}
    </motion.div>
  );
};

export const HeroSection3D = () => {
  const objects = [
    { icon: '⚽', delay: 0, axis: 'y' as const, top: '10%', left: '10%' },
    { icon: '🏏', delay: 1, axis: 'z' as const, top: '20%', right: '15%' },
    { icon: '🖨️', delay: 2, axis: 'x' as const, bottom: '20%', left: '12%' },
    { icon: '✏️', delay: 1.5, axis: 'y' as const, bottom: '15%', right: '10%' },
    { icon: '📚', delay: 2.5, axis: 'z' as const, top: '35%', right: '5%' },
    { icon: '🎒', delay: 0.5, axis: 'x' as const, top: '50%', left: '5%' },
  ];

  return (
    <Section className="relative overflow-hidden py-32 md:py-48">
      {/* 3D Background Gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent opacity-95"
        style={{
          background: `linear-gradient(135deg,
            rgba(22, 58, 79, 0.95) 0%,
            rgba(45, 143, 129, 0.95) 50%,
            rgba(200, 162, 75, 0.95) 100%)`,
        }}
      />

      {/* Animated 3D Objects Background */}
      <div className="absolute inset-0 overflow-hidden perspective">
        {objects.map((obj, idx) => (
          <Floating3DObject
            key={idx}
            icon={obj.icon}
            delay={obj.delay}
            rotationAxis={obj.axis}
          />
        ))}
      </div>

      {/* Content - Foreground */}
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center max-w-3xl mx-auto"
        >
          {/* Animated Title */}
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            Hubaib's Sports and Stationary House
          </motion.h1>

          {/* Animated Subtitle */}
          <motion.p
            className="text-xl md:text-2xl text-white/90 mb-8 drop-shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover high-quality products for sports, office, and professional printing
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
        </motion.div>
      </Container>

      {/* Floating Particles Effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-60"
            animate={{
              y: [0, -100, 0],
              x: [-20, 20, -20],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 50}%`,
            }}
          />
        ))}
      </div>
    </Section>
  );
};
