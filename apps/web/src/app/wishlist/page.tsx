'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Container, Section } from '@/components/Layout';
import { Button } from '@/components/Button';
import apiClient from '@/utils/api';

interface WishlistItem {
  id: string;
  product: {
    id: string;
    slug: string;
    name: string;
    price: number;
    images: Array<{ url: string }>;
  };
}

export default function WishlistPage() {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const response = await apiClient.get('/api/users/wishlist');
      setItems(response.data);
    } catch (error) {
      console.error('Failed to fetch wishlist:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromWishlist = async (productId: string) => {
    try {
      await apiClient.delete(`/api/users/wishlist/${productId}`);
      setItems(items.filter((item) => item.product.id !== productId));
    } catch (error) {
      console.error('Failed to remove from wishlist:', error);
    }
  };

  return (
    <Container>
      <Section>
        <h1 className="heading-lg mb-8">My Wishlist</h1>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="card animate-pulse">
                <div className="w-full h-48 bg-gray-200 rounded mb-4" />
                <div className="h-4 bg-gray-200 rounded mb-2" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600 mb-4">Your wishlist is empty</p>
            <Button onClick={() => window.location.href = '/shop'}>Continue Shopping</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="card group overflow-hidden"
              >
                <div className="relative overflow-hidden rounded-lg mb-4 h-48 bg-gray-100">
                  {item.product.images?.[0] && (
                    <Image
                      src={item.product.images[0].url}
                      alt={item.product.name}
                      width={400}
                      height={192}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  )}
                </div>

                <h3 className="font-semibold group-hover:text-primary transition">
                  {item.product.name}
                </h3>
                <p className="text-primary font-bold mt-2">${item.product.price}</p>

                <div className="flex gap-2 mt-4">
                  <Button variant="primary" size="sm" className="flex-1">
                    Add to Cart
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFromWishlist(item.product.id)}
                  >
                    Remove
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </Section>
    </Container>
  );
}
