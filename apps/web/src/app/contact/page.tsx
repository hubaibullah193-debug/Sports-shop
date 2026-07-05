'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Container, Section } from '@/components/Layout';
import { Button } from '@/components/Button';
import toast from 'react-hot-toast';
import apiClient from '@/utils/api';

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await apiClient.post('/api/contact', formData);
      toast.success('Message sent successfully! We will get back to you soon.');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message');
    } finally {
      setIsLoading(false);
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
            <h1 className="heading-lg mb-4">Get in Touch</h1>
            <p className="text-xl text-gray-600">
              We'd love to hear from you. Send us a message!
            </p>
          </motion.div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-lg font-bold mb-2">📍 Visit Us</h3>
                <p className="text-gray-600">Adda Bazar Danishkool Road</p>
                <p className="text-gray-600">Pandiali, Distt Mohmand</p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">📞 Call Us</h3>
                <p className="text-gray-600">03458979767 (WhatsApp Priority)</p>
                <p className="text-gray-600">03470954961</p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">📧 Email</h3>
                <p className="text-gray-600">hubaibullah193@gmail.com</p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">⏰ Hours</h3>
                <p className="text-gray-600">Mon - Fri: 9:00 AM - 6:00 PM</p>
                <p className="text-gray-600">Sat: 10:00 AM - 4:00 PM</p>
                <p className="text-gray-600">Sun: Closed</p>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="lg:col-span-2 card"
            >
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    required
                    className="input-base"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    required
                    className="input-base"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="tel"
                    placeholder="Phone (Optional)"
                    className="input-base"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    placeholder="Subject"
                    required
                    className="input-base"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                  />
                </div>

                <textarea
                  placeholder="Your Message"
                  required
                  rows={6}
                  className="input-base"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  isLoading={isLoading}
                >
                  Send Message
                </Button>
              </form>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Map Section */}
      <Section className="bg-gray-100 dark:bg-dark-800">
        <Container>
          <div className="rounded-lg overflow-hidden h-96 bg-gray-300">
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              title="Elite Sports Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.1234567890!2d-74.0059728!3d40.7127753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjAiTiA3NMKwMDAnMjEuNCJX!5e0!3m2!1sen!2sus!4v1234567890"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </div>
        </Container>
      </Section>
    </>
  );
}
