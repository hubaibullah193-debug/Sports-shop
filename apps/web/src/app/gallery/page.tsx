'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Container, Section } from '@/components/Layout';
import apiClient from '@/utils/api';

interface GalleryImage {
  id: string;
  imageUrl: string;
  title: string;
  category?: string;
}

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const response = await apiClient.get('/api/gallery/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const fetchImages = async () => {
    try {
      setIsLoading(true);
      const params = selectedCategory ? { category: selectedCategory } : {};
      const response = await apiClient.get('/api/gallery', { params });
      setImages(response.data.images);
    } catch (error) {
      console.error('Failed to fetch images:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchImages();
  }, [selectedCategory, fetchImages]);

  return (
    <>
      <Section className="bg-gradient-to-r from-primary/10 to-secondary/10">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="heading-lg mb-4">Our Gallery</h1>
            <p className="text-xl text-gray-600">
              Explore our products, services, and facilities
            </p>
          </motion.div>
        </Container>
      </Section>

      <Section>
        <Container>
          {/* Category Filter */}
          <div className="flex gap-3 justify-center mb-12 flex-wrap">
            <button
              onClick={() => setSelectedCategory('')}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                selectedCategory === ''
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 dark:bg-dark-700 hover:bg-gray-300'
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-lg font-semibold transition ${
                  selectedCategory === cat
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 dark:bg-dark-700 hover:bg-gray-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-gray-200 dark:bg-dark-700 rounded-lg h-48 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((image, idx) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ delay: idx * 0.05 }}
                  className="rounded-lg overflow-hidden cursor-pointer group"
                >
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    <Image
                      src={image.imageUrl}
                      alt={image.title}
                      width={400}
                      height={192}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition duration-300 flex items-center justify-center">
                      <p className="text-white opacity-0 group-hover:opacity-100 transition text-center font-semibold">
                        {image.title}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {!isLoading && images.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No images found</p>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
