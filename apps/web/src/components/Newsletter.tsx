'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Container, Section } from '@/components/Layout';
import { Button } from '@/components/Button';
import toast from 'react-hot-toast';
import apiClient from '@/utils/api';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await apiClient.post('/api/contact/newsletter', { email, name });
      toast.success('Successfully subscribed to our newsletter!');
      setEmail('');
      setName('');
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to subscribe');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Section className="bg-gradient-to-r from-primary to-secondary text-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-lg mb-8 opacity-90">
            Get exclusive deals, new product launches, and printing service tips delivered to your inbox
          </p>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Your Name (optional)"
              className="flex-1 px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Your Email"
              required
              className="flex-1 px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              type="submit"
              variant="secondary"
              size="lg"
              isLoading={isLoading}
            >
              Subscribe
            </Button>
          </form>
        </motion.div>
      </Container>
    </Section>
  );
}
