'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Container, Section } from '@/components/Layout';
import apiClient from '@/utils/api';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.get('/api/faq');
      setFaqs(response.data);
    } catch (error) {
      console.error('Failed to fetch FAQs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const groupedFaqs = faqs.reduce(
    (acc, faq) => {
      const category = faq.category || 'General';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(faq);
      return acc;
    },
    {} as Record<string, FAQ[]>
  );

  return (
    <>
      <Section className="bg-gradient-to-r from-primary/10 to-secondary/10">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="heading-lg mb-4">Frequently Asked Questions</h1>
            <p className="text-xl text-gray-600">Find answers to common questions</p>
          </motion.div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="max-w-3xl mx-auto">
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="card h-16 animate-pulse bg-gray-200" />
                ))}
              </div>
            ) : (
              Object.entries(groupedFaqs).map(([category, categoryFaqs]) => (
                <motion.div key={category} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h2 className="text-2xl font-bold mb-4 text-primary">{category}</h2>
                  <div className="space-y-3 mb-8">
                    {categoryFaqs.map((faq) => (
                      <motion.div
                        key={faq.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="card cursor-pointer"
                        onClick={() => setExpanded(expanded === faq.id ? null : faq.id)}
                      >
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold text-lg pr-4">{faq.question}</h3>
                          <span className="text-2xl text-primary">
                            {expanded === faq.id ? '−' : '+'}
                          </span>
                        </div>

                        {expanded === faq.id && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-gray-600 mt-4 pt-4 border-t"
                          >
                            {faq.answer}
                          </motion.p>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </Container>
      </Section>
    </>
  );
}
