'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Container, Section } from '@/components/Layout';
import { Button } from '@/components/Button';
import toast from 'react-hot-toast';
import apiClient from '@/utils/api';

export default function PrintingPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    quantity: 100,
    paperSize: 'A4',
    paperType: 'MATTE',
    colorMode: 'COLOR',
    sided: 'SINGLE',
    lamination: false,
    binding: '',
  });

  const services = [
    { id: 'FLEX_PRINTING', name: 'Flex Printing', icon: '🎨', price: 50 },
    { id: 'BANNER_PRINTING', name: 'Banner Printing', icon: '📋', price: 100 },
    { id: 'VINYL_PRINTING', name: 'Vinyl Printing', icon: '🏷️', price: 75 },
    { id: 'BUSINESS_CARDS', name: 'Business Cards', icon: '💼', price: 25 },
    { id: 'T_SHIRT_PRINTING', name: 'T-Shirt Printing', icon: '👕', price: 60 },
    { id: 'STICKER_PRINTING', name: 'Sticker Printing', icon: '✨', price: 15 },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await apiClient.post('/api/printing/quote', {
        serviceType: selectedService,
        ...formData,
      });

      toast.success('Quote request submitted! We will contact you soon.');
      setSelectedService(null);
      setFormData({
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        quantity: 100,
        paperSize: 'A4',
        paperType: 'MATTE',
        colorMode: 'COLOR',
        sided: 'SINGLE',
        lamination: false,
        binding: '',
      });
    } catch (error) {
      toast.error('Failed to submit quote request');
    }
  };

  return (
    <>
      <Section className="bg-gradient-to-r from-primary/10 to-secondary/10">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="heading-lg mb-4">Professional Printing Services</h1>
            <p className="text-xl text-gray-600">
              High-quality printing solutions for all your business needs
            </p>
          </motion.div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {services.map((service) => (
              <motion.div
                key={service.id}
                whileHover={{ y: -8 }}
                onClick={() => setSelectedService(service.id)}
                className={`card cursor-pointer text-center ${
                  selectedService === service.id ? 'ring-2 ring-primary' : ''
                }`}
              >
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                <p className="text-primary text-2xl font-bold mb-4">
                  From ${service.price}
                </p>
                <Button variant="secondary" size="sm">
                  Select
                </Button>
              </motion.div>
            ))}
          </div>

          {selectedService && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="card max-w-2xl mx-auto"
            >
              <h2 className="text-2xl font-bold mb-6">Get Your Quote</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    required
                    className="input-base"
                    value={formData.customerName}
                    onChange={(e) =>
                      setFormData({ ...formData, customerName: e.target.value })
                    }
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    className="input-base"
                    value={formData.customerEmail}
                    onChange={(e) =>
                      setFormData({ ...formData, customerEmail: e.target.value })
                    }
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    required
                    className="input-base"
                    value={formData.customerPhone}
                    onChange={(e) =>
                      setFormData({ ...formData, customerPhone: e.target.value })
                    }
                  />
                  <input
                    type="number"
                    placeholder="Quantity"
                    min="1"
                    className="input-base"
                    value={formData.quantity}
                    onChange={(e) =>
                      setFormData({ ...formData, quantity: Number(e.target.value) })
                    }
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <select
                    className="input-base"
                    value={formData.paperSize}
                    onChange={(e) =>
                      setFormData({ ...formData, paperSize: e.target.value })
                    }
                  >
                    <option>A4</option>
                    <option>A3</option>
                    <option>CUSTOM</option>
                  </select>

                  <select
                    className="input-base"
                    value={formData.paperType}
                    onChange={(e) =>
                      setFormData({ ...formData, paperType: e.target.value })
                    }
                  >
                    <option>MATTE</option>
                    <option>GLOSSY</option>
                    <option>SILK</option>
                  </select>
                </div>

                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.lamination}
                      onChange={(e) =>
                        setFormData({ ...formData, lamination: e.target.checked })
                      }
                    />
                    Add Lamination
                  </label>
                </div>

                <Button variant="primary" size="lg" className="w-full">
                  Request Quote
                </Button>
              </form>
            </motion.div>
          )}
        </Container>
      </Section>
    </>
  );
}
