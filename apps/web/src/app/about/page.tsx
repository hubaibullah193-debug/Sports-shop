'use client';

import { motion } from 'framer-motion';
import { Container, Section } from '@/components/Layout';
import { FiAward, FiTrendingUp, FiUsers, FiTarget } from 'react-icons/fi';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function AboutPage() {
  const values = [
    {
      icon: FiAward,
      title: 'Quality First',
      description: 'We never compromise on product quality. Every item is carefully selected and tested.',
    },
    {
      icon: FiTrendingUp,
      title: 'Innovation',
      description: 'Continuously improving our services and expanding our product range to meet customer needs.',
    },
    {
      icon: FiUsers,
      title: 'Customer Focus',
      description: 'Your satisfaction is our top priority. Dedicated to providing excellent customer service.',
    },
    {
      icon: FiTarget,
      title: 'Integrity',
      description: 'Honest, transparent, and reliable in every business interaction with our customers.',
    },
  ];

  const stats = [
    { number: '10+', label: 'Years of Service' },
    { number: '1000+', label: 'Happy Customers' },
    { number: '5000+', label: 'Product SKUs' },
    { number: '98%', label: 'Customer Satisfaction' },
  ];

  return (
    <>
      {/* Hero Section */}
      <Section className="bg-gradient-primary text-white pt-32 pb-24">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="badge badge-accent mb-4">About Us</span>
            <h1 className="heading-lg text-white mb-6">
              HUBAIB SPORTS AND STATIONARY SHOP
            </h1>
            <p className="body-lg text-gray-100">
              Your trusted partner for premium sports equipment, quality stationery, and professional printing services. Serving the community with excellence since our inception.
            </p>
          </motion.div>
        </Container>
      </Section>

      {/* Our Story Section */}
      <Section className="bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Story Text */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="heading-md mb-6">Our Story</h2>
              <div className="space-y-4 mb-8">
                <p className="body-lg">
                  HUBAIB SPORTS AND STATIONARY SHOP was founded with a simple mission: to provide premium quality products and services that empower athletes, students, and businesses to succeed.
                </p>
                <p className="body-lg">
                  Located at Danishkool Road, Pandiali Adda Bazar, District Mohmand, we have built a reputation for offering exceptional value through competitive pricing, quality products, and outstanding customer service.
                </p>
                <p className="body-lg">
                  Today, we proudly serve thousands of customers with sports equipment, stationery supplies, and professional printing services. Our commitment to excellence remains unchanged.
                </p>
              </div>
              <div className="flex gap-4">
                <div>
                  <p className="font-heading font-bold text-2xl text-secondary mb-2">10+</p>
                  <p className="body-sm">Years of Excellence</p>
                </div>
                <div>
                  <p className="font-heading font-bold text-2xl text-secondary mb-2">1000+</p>
                  <p className="body-sm">Satisfied Customers</p>
                </div>
              </div>
            </motion.div>

            {/* Right: Image Placeholder */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="card bg-gray-light h-96 flex items-center justify-center"
            >
              <div className="text-6xl">🏪</div>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Mission & Vision */}
      <Section className="bg-gray-light">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="card bg-white"
            >
              <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-6">
                <FiTarget className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="heading-sm mb-4">Our Mission</h3>
              <p className="body-md">
                To provide exceptional quality sports equipment, stationery, and professional printing services that empower our customers to succeed in sports, business, and education.
              </p>
              <p className="body-md mt-4 text-text-light">
                We believe in offering premium products at competitive prices, backed by outstanding customer service and support.
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="card bg-white"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <FiTrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="heading-sm mb-4">Our Vision</h3>
              <p className="body-md">
                To be the leading one-stop destination for sports equipment, stationery, and professional printing solutions in the region.
              </p>
              <p className="body-md mt-4 text-text-light">
                Through innovation, quality, and customer-centric service, we aspire to exceed expectations and build lasting relationships.
              </p>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Core Values */}
      <Section className="bg-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="badge badge-secondary mb-4">Values</span>
            <h2 className="heading-md mb-4">Our Core Values</h2>
            <p className="body-lg text-text-light max-w-2xl mx-auto">
              These principles guide everything we do
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {values.map((value, idx) => {
              const Icon = value.icon;
              return (
                <motion.div key={idx} variants={itemVariants} className="card">
                  <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-secondary" />
                  </div>
                  <h3 className="subheading mb-3">{value.title}</h3>
                  <p className="body-md">{value.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </Container>
      </Section>

      {/* Statistics */}
      <Section className="gradient-primary text-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="heading-md text-white mb-4">By The Numbers</h2>
            <p className="body-lg opacity-90 max-w-2xl mx-auto">
              Our growth is a testament to customer trust and satisfaction
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {stats.map((stat, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <p className="text-5xl md:text-6xl font-heading font-bold mb-3">
                  {stat.number}
                </p>
                <p className="body-md opacity-90">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* Why Choose Us */}
      <Section className="bg-gray-light">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="badge badge-primary mb-4">Why Choose Us</span>
            <h2 className="heading-md mb-4">What Sets Us Apart</h2>
            <p className="body-lg text-text-light max-w-2xl mx-auto">
              We go beyond just selling products—we build lasting relationships with our customers
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {[
              {
                title: 'Wide Product Range',
                description: 'Complete selection of sports equipment, stationery, and printing services all in one location',
              },
              {
                title: 'Competitive Pricing',
                description: 'Best value for money without compromising on quality. Affordable prices for everyone.',
              },
              {
                title: 'Professional Service',
                description: 'Knowledgeable staff ready to help you find exactly what you need.',
              },
              {
                title: 'Fast Turnaround',
                description: 'Quick service on printing and custom orders. Professional quality delivered fast.',
              },
              {
                title: 'Quality Assurance',
                description: 'All products are carefully selected and verified for quality before sale.',
              },
              {
                title: 'Customer Support',
                description: 'Responsive support team available during business hours. Your satisfaction guaranteed.',
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="card bg-white border-l-4 border-secondary"
              >
                <h3 className="subheading text-secondary mb-3">{item.title}</h3>
                <p className="body-md">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* Contact CTA */}
      <Section className="bg-gradient-to-r from-secondary to-accent text-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="heading-md text-white mb-6">Ready to Experience Our Service?</h2>
            <p className="body-lg opacity-90 mb-8">
              Visit us today or contact us to learn more about our products and services.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a
                href="tel:03458979767"
                className="btn-primary bg-white text-primary hover:bg-gray-100"
              >
                Call Us: 0345-8979767
              </a>
              <a
                href="/contact"
                className="btn-outline border-white text-white hover:bg-white/10"
              >
                Visit Contact Page
              </a>
            </div>
          </motion.div>
        </Container>
      </Section>
    </>
  );
}
