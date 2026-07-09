'use client';

import { motion } from 'framer-motion';
import { Container, Section } from '@/components/Layout';
import { Button } from '@/components/Button';
import {
  FiStar,
  FiTruck,
  FiShield,
  FiCheckCircle,
  FiArrowRight,
  FiClock,
  FiDollarSign,
  FiPackage,
} from 'react-icons/fi';
import { HeroBanner } from '@/components/HeroBanner';
import Link from 'next/link';

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

export default function Home() {
  const whyChooseUs = [
    {
      icon: FiTruck,
      title: 'Fast & Reliable Delivery',
      description: 'Quick turnaround on all orders with professional handling',
    },
    {
      icon: FiDollarSign,
      title: 'Affordable Prices',
      description: 'Best value for premium quality products and services',
    },
    {
      icon: FiPackage,
      title: 'Wide Product Range',
      description: 'Everything from sports to stationery under one roof',
    },
    {
      icon: FiShield,
      title: 'Quality Assurance',
      description: 'Trusted brands and proven quality standards',
    },
    {
      icon: FiCheckCircle,
      title: 'Expert Service',
      description: 'Knowledgeable staff ready to assist you',
    },
    {
      icon: FiStar,
      title: 'Customer Satisfaction',
      description: 'Your satisfaction is our top priority',
    },
  ];

  const services = [
    {
      title: 'Sports Equipment',
      description: 'Football, cricket, badminton, volleyball, gym accessories and fitness equipment',
      icon: '⚽',
      link: '/shop?category=sports',
    },
    {
      title: 'Stationery',
      description: 'School supplies, office supplies, notebooks, pens and art materials',
      icon: '✏️',
      link: '/shop?category=stationery',
    },
    {
      title: 'Professional Printing',
      description: 'Photocopy, color printing, document printing, scanning, binding, lamination and custom printing',
      icon: '🖨️',
      link: '/printing',
    },
  ];

  const testimonials = [
    {
      name: 'Ahmed Khan',
      role: 'School Administrator',
      text: 'Excellent service and fast delivery. They have everything we need for our school supplies. Highly recommended!',
      rating: 5,
    },
    {
      name: 'Faisal Ahmad',
      role: 'Sports Coach',
      text: 'Best sports equipment quality in the area. Great pricing and the staff is very knowledgeable.',
      rating: 5,
    },
    {
      name: 'Sara Khan',
      role: 'Business Owner',
      text: 'Their printing services are top-notch. Professional quality and always on time. Great for our business cards.',
      rating: 5,
    },
  ];

  const faqs = [
    {
      question: 'What are your business hours?',
      answer: 'We are open Monday to Sunday from 7:00 AM to 8:00 PM. We are here to serve you throughout the week.',
    },
    {
      question: 'Do you offer delivery services?',
      answer: 'Yes, we offer fast and reliable delivery for orders. Contact us for delivery rates and availability in your area.',
    },
    {
      question: 'How long does printing usually take?',
      answer: 'Most printing orders are completed within 24-48 hours depending on complexity. Rush orders may be available.',
    },
    {
      question: 'What brands do you stock?',
      answer: 'We stock premium and trusted brands in sports equipment and stationery. Contact us for specific product inquiries.',
    },
    {
      question: 'Do you accept bulk orders?',
      answer: 'Absolutely! We offer special pricing for bulk and corporate orders. Please contact us for quotations.',
    },
    {
      question: 'How can I place an order?',
      answer: 'You can visit our shop in person, call us at 0345-8979767, email us, or use our online platform.',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <HeroBanner />

      {/* Why Choose Us Section */}
      <Section className="bg-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="badge badge-secondary mb-4">Why Choose Us</span>
            <h2 className="heading-md mb-4">Why Customers Trust HUBAIB</h2>
            <p className="body-lg text-text-light max-w-2xl mx-auto">
              We've been serving the community with quality products and professional services for years
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {whyChooseUs.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="card group hover:border-secondary"
                >
                  <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4 group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                    <Icon className="w-6 h-6 text-secondary group-hover:text-white" />
                  </div>
                  <h3 className="subheading mb-3">{feature.title}</h3>
                  <p className="body-md">{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </Container>
      </Section>

      {/* Our Services Section */}
      <Section className="bg-gray-light">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="badge badge-primary mb-4">Our Services</span>
            <h2 className="heading-md mb-4">Everything You Need</h2>
            <p className="body-lg text-text-light max-w-2xl mx-auto">
              Premium sports equipment, quality stationery, and professional printing services all under one roof
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {services.map((service, idx) => (
              <Link key={idx} href={service.link}>
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  className="card bg-white cursor-pointer group border-2 border-transparent hover:border-secondary transition-all"
                >
                  <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="heading-sm mb-3">{service.title}</h3>
                  <p className="body-md mb-6">{service.description}</p>
                  <div className="flex items-center gap-2 text-secondary font-heading font-bold text-sm">
                    Explore <FiArrowRight size={16} className="group-hover:translate-x-1 transition" />
                  </div>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* Featured Categories */}
      <Section className="bg-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="heading-md mb-4">Shop by Category</h2>
            <p className="body-lg text-text-light max-w-2xl mx-auto">
              Browse our extensive collection organized by category
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {[
              { name: 'Football', icon: '⚽', link: '/shop?category=football' },
              { name: 'Cricket', icon: '🏏', link: '/shop?category=cricket' },
              { name: 'Badminton', icon: '🎾', link: '/shop?category=badminton' },
              { name: 'Volleyball', icon: '🏐', link: '/shop?category=volleyball' },
              { name: 'Notebooks', icon: '📓', link: '/shop?category=notebooks' },
              { name: 'Pens', icon: '✏️', link: '/shop?category=pens' },
            ].map((cat, idx) => (
              <Link key={idx} href={cat.link}>
                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  className="card text-center cursor-pointer group bg-gradient-to-br from-gray-light to-white border-gray-medium hover:border-secondary transition-all"
                >
                  <div className="text-4xl mb-3 group-hover:scale-125 transition-transform duration-300">
                    {cat.icon}
                  </div>
                  <p className="text-sm font-heading font-bold text-text">{cat.name}</p>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* Testimonials Section */}
      <Section className="bg-gradient-primary text-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="badge badge-accent mb-4">Testimonials</span>
            <h2 className="heading-md mb-4 text-white">What Our Customers Say</h2>
            <p className="body-lg opacity-90 max-w-2xl mx-auto">
              Real reviews from satisfied customers
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 hover:border-white/40 transition-all"
              >
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <FiStar key={i} size={18} className="fill-accent text-accent" />
                  ))}
                </div>
                <div className="text-5xl mb-4 opacity-40">
                  "
                </div>
                <p className="body-md mb-6 opacity-90">{testimonial.text}</p>
                <div className="border-t border-white/10 pt-4">
                  <p className="font-heading font-bold text-sm">{testimonial.name}</p>
                  <p className="text-xs opacity-70">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* FAQ Section */}
      <Section className="bg-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="badge badge-secondary mb-4">FAQ</span>
            <h2 className="heading-md mb-4">Frequently Asked Questions</h2>
            <p className="body-lg text-text-light max-w-2xl mx-auto">
              Find answers to common questions about our products and services
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
          >
            {faqs.map((faq, idx) => (
              <motion.div key={idx} variants={itemVariants} className="card">
                <h3 className="subheading text-secondary mb-3">{faq.question}</h3>
                <p className="body-md">{faq.answer}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* Printing Services CTA */}
      <Section className="bg-gradient-to-r from-secondary to-accent">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center text-white"
          >
            <h2 className="heading-md mb-6 text-white">Need Professional Printing Services?</h2>
            <p className="body-lg mb-8 opacity-90">
              Get high-quality printing for banners, business cards, documents, and custom designs. Fast turnaround guaranteed.
            </p>
            <Link href="/printing">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                Request a Quote <FiArrowRight size={18} />
              </Button>
            </Link>
          </motion.div>
        </Container>
      </Section>

      {/* Business Hours & Location */}
      <Section className="bg-gray-light">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Business Hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="card text-center"
            >
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <FiClock className="w-6 h-6 text-accent" />
              </div>
              <h3 className="subheading mb-4">Business Hours</h3>
              <p className="body-md mb-2">
                <span className="font-heading font-bold">Monday - Sunday</span>
              </p>
              <p className="body-md text-text-light">7:00 AM - 8:00 PM</p>
            </motion.div>

            {/* Phone */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="card text-center"
            >
              <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                <FiTruck className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="subheading mb-4">Phone</h3>
              <a href="tel:03458979767" className="text-lg font-heading font-bold text-secondary hover:text-primary transition">
                0345-8979767
              </a>
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="card text-center"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <FiShield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="subheading mb-4">Email</h3>
              <a
                href="mailto:hubaibullah193@gmail.com"
                className="text-sm font-heading font-bold text-secondary hover:text-primary transition break-all"
              >
                hubaibullah193@gmail.com
              </a>
            </motion.div>
          </div>
        </Container>
      </Section>
    </>
  );
}
