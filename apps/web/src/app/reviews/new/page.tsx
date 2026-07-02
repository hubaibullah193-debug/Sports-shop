'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Container, Section } from '@/components/Layout';
import { Button } from '@/components/Button';
import apiClient from '@/utils/api';
import toast from 'react-hot-toast';

interface FormData {
  productId: string;
  rating: number;
  title: string;
  comment: string;
}

export default function ReviewFormPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    productId: '',
    rating: 5,
    title: '',
    comment: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await apiClient.post('/api/reviews', formData);
      toast.success('Thank you for your review!');
      router.push('/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to submit review');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <h1 className="heading-lg mb-2">Leave a Review</h1>
          <p className="text-gray-600 mb-8">
            Share your experience with this product
          </p>

          <form onSubmit={handleSubmit} className="card space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">
                Product ID *
              </label>
              <input
                type="text"
                required
                className="input-base"
                value={formData.productId}
                onChange={(e) =>
                  setFormData({ ...formData, productId: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Rating *
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, rating: star })
                    }
                    className={`text-3xl transition ${
                      star <= formData.rating
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Title *
              </label>
              <input
                type="text"
                placeholder="e.g., Great quality and fast delivery"
                required
                className="input-base"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Comment
              </label>
              <textarea
                placeholder="Share your detailed experience..."
                rows={5}
                className="input-base"
                value={formData.comment}
                onChange={(e) =>
                  setFormData({ ...formData, comment: e.target.value })
                }
              />
            </div>

            <div className="flex gap-3">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isLoading}
                className="flex-1"
              >
                Submit Review
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="lg"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
            </div>
          </form>
        </motion.div>
      </Section>
    </Container>
  );
}
