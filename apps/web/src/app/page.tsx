'use client';

import { motion } from 'framer-motion';
import { Container, Section } from '@/components/Layout';
import { Button } from '@/components/Button';
import { FiStar, FiTruck, FiShield } from 'react-icons/fi';
import { HeroBanner } from '@/components/HeroBanner';

export default function Home() {
  const features = [
    {
      icon: FiTruck,
      title: 'Fast Delivery',
      description: 'Free shipping on orders over $50',
    },
    {
      icon: FiShield,
      title: 'Secure Payment',
      description: 'Safe and secure checkout process',
    },
    {
      icon: FiStar,
      title: 'Premium Quality',
      description: 'Trusted brands and high standards',
    },
  ];

  const categories = [
    { name: 'Sports Equipment', image: '⚽', link: '/shop?category=sports' },
    { name: 'Stationery', image: '✏️', link: '/shop?category=stationery' },
    { name: 'Accessories', image: '🎒', link: '/shop?category=accessories' },
    { name: 'Printing Services', image: '🖨️', link: '/printing' },
  ];

  return (
    <>
      {/* Premium Hero Banner */}
      <HeroBanner />

      {/* Features */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.2 }}
                  className="card text-center"
                >
                  <Icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Categories */}
      <Section className="bg-gray-50 dark:bg-dark-800">
        <Container>
          <h2 className="heading-md text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, idx) => (
              <motion.a
                key={idx}
                href={cat.link}
                whileHover={{ y: -8 }}
                className="card text-center cursor-pointer hover:shadow-soft-lg"
              >
                <div className="text-6xl mb-4">{cat.image}</div>
                <h3 className="font-semibold">{cat.name}</h3>
              </motion.a>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="bg-primary text-white">
        <Container className="text-center">
          <h2 className="text-4xl font-bold mb-4">Need Professional Printing?</h2>
          <p className="text-lg mb-8 opacity-90">
            Get quotes for flex printing, banners, business cards, and more
          </p>
          <Button variant="secondary" size="lg">
            Request a Quote
          </Button>
        </Container>
      </Section>
    </>
  );
}
