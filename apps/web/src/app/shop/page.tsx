'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Container, Section } from '@/components/Layout';
import { Button } from '@/components/Button';
import apiClient from '@/utils/api';

interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  images: Array<{ url: string; alt?: string }>;
  discount?: number;
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: 0,
    maxPrice: 1000,
    search: '',
  });

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.get('/api/products', {
        params: filters,
      });
      setProducts(response.data.products);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Section className="bg-gradient-to-r from-primary/10 to-secondary/10">
        <Container>
          <h1 className="heading-lg">Shop All Products</h1>
          <p className="text-lg text-gray-600 mt-2">
            Discover our wide range of premium sports equipment and stationery
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters */}
            <div className="card">
              <h3 className="text-lg font-bold mb-4">Filters</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Search</label>
                  <input
                    type="text"
                    placeholder="Product name..."
                    className="input-base"
                    value={filters.search}
                    onChange={(e) =>
                      setFilters({ ...filters, search: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Category</label>
                  <select
                    className="input-base"
                    value={filters.category}
                    onChange={(e) =>
                      setFilters({ ...filters, category: e.target.value })
                    }
                  >
                    <option value="">All Categories</option>
                    <option value="sports">Sports Equipment</option>
                    <option value="stationery">Stationery</option>
                    <option value="accessories">Accessories</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Price Range</label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      value={filters.maxPrice}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          maxPrice: Number(e.target.value),
                        })
                      }
                      className="w-full"
                    />
                    <p className="text-sm text-gray-600">
                      $0 - ${filters.maxPrice}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Products */}
            <div className="lg:col-span-3">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="card animate-pulse">
                      <div className="w-full h-48 bg-gray-200 rounded mb-4" />
                      <div className="h-4 bg-gray-200 rounded mb-2" />
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <motion.div
                      key={product.id}
                      whileHover={{ y: -8 }}
                      className="card group overflow-hidden"
                    >
                      <Link href={`/products/${product.slug}`}>
                        <div className="relative overflow-hidden rounded-lg mb-4 h-48 bg-gray-100">
                          {product.images?.[0] && (
                            <img
                              src={product.images[0].url}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          )}
                          {product.discount && (
                            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
                              -{product.discount}%
                            </div>
                          )}
                        </div>

                        <h3 className="font-semibold group-hover:text-primary transition">
                          {product.name}
                        </h3>
                        <p className="text-primary font-bold mt-2">
                          ${product.price.toFixed(2)}
                        </p>
                      </Link>

                      <Button variant="primary" size="sm" className="w-full mt-4">
                        Add to Cart
                      </Button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
