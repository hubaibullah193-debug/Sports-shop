'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Container, Section } from '@/components/Layout';
import { Button } from '@/components/Button';
import toast from 'react-hot-toast';
import apiClient from '@/utils/api';
import { FiArrowRight, FiClock, FiDollarSign, FiCheckCircle } from 'react-icons/fi';
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

export default function PrintingPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    quantity: '100',
    paperSize: 'A4',
    paperType: 'MATTE',
    colorMode: 'COLOR',
    sided: 'SINGLE',
    lamination: false,
    binding: '',
    description: '',
  });

  const printingServices = [
    {
      id: 'PHOTOCOPY',
      name: 'Photocopy',
      description: 'Fast and reliable photocopying services for all document types',
      icon: '📄',
      turnaround: '1-2 hours',
      startingPrice: 'From Rs. 2/page',
    },
    {
      id: 'COLOR_PRINTING',
      name: 'Color Printing',
      description: 'Vibrant color printing for brochures, flyers, and documents',
      icon: '🎨',
      turnaround: '24 hours',
      startingPrice: 'From Rs. 5/page',
    },
    {
      id: 'DOCUMENT_PRINTING',
      name: 'Document Printing',
      description: 'Professional document printing with binding options',
      icon: '📋',
      turnaround: '24-48 hours',
      startingPrice: 'From Rs. 4/page',
    },
    {
      id: 'SCANNING',
      name: 'Scanning Services',
      description: 'High-quality document and image scanning to digital format',
      icon: '📸',
      turnaround: '1-2 days',
      startingPrice: 'From Rs. 10/page',
    },
    {
      id: 'BINDING',
      name: 'Binding & Lamination',
      description: 'Professional binding and lamination for documents and posters',
      icon: '📚',
      turnaround: '24 hours',
      startingPrice: 'From Rs. 50',
    },
    {
      id: 'PASSPORT_PHOTOS',
      name: 'Passport Photos',
      description: 'Professional passport-size photos with instant printing',
      icon: '📷',
      turnaround: '30 minutes',
      startingPrice: 'From Rs. 50/set',
    },
    {
      id: 'BUSINESS_CARDS',
      name: 'Business Cards',
      description: 'Premium business card printing with multiple design options',
      icon: '💼',
      turnaround: '2-3 days',
      startingPrice: 'From Rs. 500/100',
    },
    {
      id: 'CUSTOM_PRINTING',
      name: 'Custom Printing',
      description: 'Banners, flex printing, vinyl, T-shirts, and custom designs',
      icon: '✨',
      turnaround: '3-5 days',
      startingPrice: 'Custom Quote',
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await apiClient.post('/api/printing/quote', {
        serviceType: selectedService,
        ...formData,
      });

      toast.success('Quote request submitted! We will contact you within 24 hours.');
      setSelectedService(null);
      setFormData({
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        quantity: '100',
        paperSize: 'A4',
        paperType: 'MATTE',
        colorMode: 'COLOR',
        sided: 'SINGLE',
        lamination: false,
        binding: '',
        description: '',
      });
    } catch (error) {
      toast.error('Failed to submit quote request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <span className="badge badge-accent mb-4">Professional Printing</span>
            <h1 className="heading-lg text-white mb-6">
              Premium Printing Services
            </h1>
            <p className="body-lg text-gray-100">
              High-quality printing solutions for all your business, educational, and personal needs. Fast turnaround, competitive pricing, and professional results guaranteed.
            </p>
          </motion.div>
        </Container>
      </Section>

      {/* Services Grid */}
      <Section className="bg-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="badge badge-secondary mb-4">Our Services</span>
            <h2 className="heading-md mb-4">Complete Printing Solutions</h2>
            <p className="body-lg text-text-light max-w-2xl mx-auto">
              Choose from our wide range of professional printing services
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {printingServices.map((service) => (
              <motion.div
                key={service.id}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                onClick={() => setSelectedService(service.id)}
                className={`card cursor-pointer group border-2 transition-all ${
                  selectedService === service.id
                    ? 'border-secondary shadow-lg bg-gray-light'
                    : 'border-transparent hover:border-secondary'
                }`}
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="subheading mb-2 text-text">{service.name}</h3>
                <p className="body-sm text-text-light mb-4">{service.description}</p>

                <div className="space-y-2 mb-6 border-t border-gray-medium pt-4">
                  <div className="flex items-center gap-2 text-xs text-text-light">
                    <FiClock size={14} className="text-secondary" />
                    <span>Turnaround: {service.turnaround}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-text-light">
                    <FiDollarSign size={14} className="text-secondary" />
                    <span>{service.startingPrice}</span>
                  </div>
                </div>

                <Button
                  variant={selectedService === service.id ? 'secondary' : 'outline'}
                  size="sm"
                  className="w-full justify-center"
                >
                  {selectedService === service.id ? 'Selected' : 'Select Service'}
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* Quote Form Section */}
      {selectedService && (
        <Section className="bg-gray-light">
          <Container>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="max-w-2xl mx-auto"
            >
              <div className="card bg-white">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="heading-sm">Request a Quote</h2>
                    <p className="body-sm text-text-light">
                      {printingServices.find((s) => s.id === selectedService)?.name}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedService(null)}
                    className="text-2xl text-text-light hover:text-text transition"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name & Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-heading font-bold text-text-light uppercase tracking-wider mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        placeholder="Your Name"
                        required
                        className="input-base"
                        value={formData.customerName}
                        onChange={(e) =>
                          setFormData({ ...formData, customerName: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-heading font-bold text-text-light uppercase tracking-wider mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        required
                        className="input-base"
                        value={formData.customerEmail}
                        onChange={(e) =>
                          setFormData({ ...formData, customerEmail: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  {/* Phone & Quantity */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-heading font-bold text-text-light uppercase tracking-wider mb-2">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        placeholder="03XX-XXXXXXX"
                        required
                        className="input-base"
                        value={formData.customerPhone}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            customerPhone: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-heading font-bold text-text-light uppercase tracking-wider mb-2">
                        Quantity *
                      </label>
                      <input
                        type="number"
                        placeholder="100"
                        min="1"
                        required
                        className="input-base"
                        value={formData.quantity}
                        onChange={(e) =>
                          setFormData({ ...formData, quantity: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  {/* Size & Type */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-heading font-bold text-text-light uppercase tracking-wider mb-2">
                        Paper Size
                      </label>
                      <select
                        className="input-base"
                        value={formData.paperSize}
                        onChange={(e) =>
                          setFormData({ ...formData, paperSize: e.target.value })
                        }
                      >
                        <option value="A4">A4</option>
                        <option value="A3">A3</option>
                        <option value="A5">A5</option>
                        <option value="CUSTOM">Custom Size</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-heading font-bold text-text-light uppercase tracking-wider mb-2">
                        Paper Type
                      </label>
                      <select
                        className="input-base"
                        value={formData.paperType}
                        onChange={(e) =>
                          setFormData({ ...formData, paperType: e.target.value })
                        }
                      >
                        <option value="MATTE">Matte</option>
                        <option value="GLOSSY">Glossy</option>
                        <option value="SILK">Silk</option>
                        <option value="PREMIUM">Premium</option>
                      </select>
                    </div>
                  </div>

                  {/* Color Mode & Sided */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-heading font-bold text-text-light uppercase tracking-wider mb-2">
                        Color Mode
                      </label>
                      <select
                        className="input-base"
                        value={formData.colorMode}
                        onChange={(e) =>
                          setFormData({ ...formData, colorMode: e.target.value })
                        }
                      >
                        <option value="COLOR">Color</option>
                        <option value="BLACKWHITE">Black & White</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-heading font-bold text-text-light uppercase tracking-wider mb-2">
                        Printing
                      </label>
                      <select
                        className="input-base"
                        value={formData.sided}
                        onChange={(e) =>
                          setFormData({ ...formData, sided: e.target.value })
                        }
                      >
                        <option value="SINGLE">Single Sided</option>
                        <option value="DOUBLE">Double Sided</option>
                      </select>
                    </div>
                  </div>

                  {/* Add-ons */}
                  <div className="space-y-3 bg-gray-light p-4 rounded-lg">
                    <label className="text-xs font-heading font-bold text-text uppercase tracking-wider">
                      Add-ons (Optional)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="lamination"
                        checked={formData.lamination}
                        onChange={(e) =>
                          setFormData({ ...formData, lamination: e.target.checked })
                        }
                        className="w-4 h-4 rounded cursor-pointer"
                      />
                      <label
                        htmlFor="lamination"
                        className="text-sm font-body text-text cursor-pointer flex items-center gap-2"
                      >
                        <FiCheckCircle size={16} className="text-success" />
                        Add Lamination
                      </label>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-xs font-heading font-bold text-text-light uppercase tracking-wider mb-2">
                      Additional Details (Optional)
                    </label>
                    <textarea
                      placeholder="Tell us more about your printing needs... (design preferences, special requirements, etc.)"
                      rows={4}
                      className="input-base resize-none"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-4">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="flex-1 justify-center"
                      isLoading={isSubmitting}
                    >
                      Get Quote <FiArrowRight size={18} />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      className="flex-1 justify-center"
                      onClick={() => setSelectedService(null)}
                    >
                      Cancel
                    </Button>
                  </div>

                  <p className="text-xs text-text-light text-center">
                    We'll review your request and contact you within 24 hours with a detailed quote.
                  </p>
                </form>
              </div>
            </motion.div>
          </Container>
        </Section>
      )}

      {/* Why Choose Us for Printing */}
      <Section className="bg-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="heading-md mb-4">Why Choose Our Printing Services?</h2>
            <p className="body-lg text-text-light max-w-2xl mx-auto">
              We combine quality, speed, and affordability
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                title: 'High Quality',
                description: 'State-of-the-art printing equipment ensures vibrant colors and sharp details.',
              },
              {
                title: 'Fast Turnaround',
                description: 'Most orders completed within 24-48 hours. Rush orders available.',
              },
              {
                title: 'Competitive Pricing',
                description: 'Best prices in the area without compromising on quality.',
              },
              {
                title: 'Professional Design',
                description: 'Expert design assistance available to help bring your vision to life.',
              },
            ].map((item, idx) => (
              <motion.div key={idx} variants={itemVariants} className="card">
                <div className="text-4xl mb-4">✓</div>
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
            <h2 className="heading-md text-white mb-6">Need More Information?</h2>
            <p className="body-lg opacity-90 mb-8">
              Contact us directly via phone or WhatsApp for immediate assistance with your printing needs.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a href="tel:03458979767">
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  Call: 0345-8979767
                </Button>
              </a>
              <Link href="/contact">
                <Button variant="primary" className="bg-white text-secondary hover:bg-gray-100">
                  Get Custom Quote
                </Button>
              </Link>
            </div>
          </motion.div>
        </Container>
      </Section>
    </>
  );
}
