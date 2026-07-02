'use client';

import { motion } from 'framer-motion';
import { Container, Section } from '@/components/Layout';

const teamMembers = [
  {
    name: 'John Smith',
    role: 'Founder & CEO',
    image: '👨‍💼',
    bio: 'With 20+ years in retail, John founded Elite Sports to deliver premium quality at fair prices.',
  },
  {
    name: 'Sarah Johnson',
    role: 'Head of Operations',
    image: '👩‍💼',
    bio: 'Sarah ensures every order is handled with care and precision.',
  },
  {
    name: 'Mike Chen',
    role: 'Print Services Manager',
    image: '👨‍🔧',
    bio: 'Expert in printing technology, Mike leads our state-of-the-art printing operations.',
  },
  {
    name: 'Lisa Garcia',
    role: 'Customer Success Manager',
    image: '👩‍💻',
    bio: 'Lisa is dedicated to making sure every customer has an exceptional experience.',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <Section className="bg-gradient-to-r from-primary/10 to-secondary/10">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h1 className="heading-lg mb-4">About Elite Sports</h1>
            <p className="text-xl text-gray-600">
              Your trusted partner for premium sports equipment, quality stationery, and
              professional printing services since 2010
            </p>
          </motion.div>
        </Container>
      </Section>

      {/* Mission & Vision */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}>
              <h2 className="heading-md mb-4">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-4">
                To provide exceptional quality products and services that empower our customers
                to succeed in sports, business, and education.
              </p>
              <p className="text-gray-600">
                We believe in offering premium products at accessible prices, backed by outstanding
                customer service and support.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}>
              <h2 className="heading-md mb-4">Our Vision</h2>
              <p className="text-lg text-gray-600 mb-4">
                To be the leading one-stop destination for sports equipment, stationery, and
                printing solutions in the region.
              </p>
              <p className="text-gray-600">
                Through innovation, quality, and customer-centric service, we aspire to exceed
                expectations and build lasting relationships.
              </p>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Values */}
      <Section className="bg-gray-50 dark:bg-dark-800">
        <Container>
          <h2 className="heading-md text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '⭐',
                title: 'Quality',
                description: 'We never compromise on quality in every product and service we deliver.',
              },
              {
                icon: '🤝',
                title: 'Integrity',
                description: 'Honesty and transparency guide our business relationships and operations.',
              },
              {
                icon: '🚀',
                title: 'Innovation',
                description: 'We continuously improve and adapt to meet evolving customer needs.',
              },
              {
                icon: '❤️',
                title: 'Customer Focus',
                description: 'Your satisfaction is at the heart of everything we do.',
              },
              {
                icon: '🌱',
                title: 'Sustainability',
                description: 'We are committed to environmentally responsible practices.',
              },
              {
                icon: '👥',
                title: 'Community',
                description: 'We support and grow together with our employees and communities.',
              },
            ].map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="card text-center"
              >
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-lg font-bold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Team */}
      <Section>
        <Container>
          <h2 className="heading-md text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="card text-center"
              >
                <div className="text-6xl mb-4 text-center">{member.image}</div>
                <h3 className="font-bold">{member.name}</h3>
                <p className="text-primary text-sm mb-3">{member.role}</p>
                <p className="text-sm text-gray-600">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Stats */}
      <Section className="bg-primary text-white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '15+', label: 'Years in Business' },
              { number: '50K+', label: 'Happy Customers' },
              { number: '10K+', label: 'Products' },
              { number: '98%', label: 'Customer Satisfaction' },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
              >
                <p className="text-5xl font-bold mb-2">{stat.number}</p>
                <p className="text-lg opacity-90">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
