'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Container, Section } from '@/components/Layout';
import { Button } from '@/components/Button';
import { useAuthStore } from '@/store/authStore';
import apiClient from '@/utils/api';

interface AdminProduct {
  id: string;
  name: string;
  sku: string;
  stock: number;
  price: number;
  category: { name: string };
}

export default function AdminProductsPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [skip, setSkip] = useState(0);
  const take = 20;

  useEffect(() => {
    if (user?.role !== 'ADMIN') {
      router.push('/');
      return;
    }

    fetchProducts();
  }, [user, router, skip]);

  const fetchProducts = async () => {
    try {
      const response = await apiClient.get('/api/admin/products', {
        params: { skip, take },
      });
      setProducts(response.data.products);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Section>
        <div className="flex justify-between items-center mb-8">
          <h1 className="heading-lg">Products</h1>
          <Button
            variant="primary"
            onClick={() => router.push('/admin/products/new')}
          >
            + Add Product
          </Button>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card h-16 animate-pulse bg-gray-200" />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="card overflow-x-auto"
          >
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Product</th>
                  <th className="text-left py-3 px-4">SKU</th>
                  <th className="text-left py-3 px-4">Category</th>
                  <th className="text-left py-3 px-4">Price</th>
                  <th className="text-left py-3 px-4">Stock</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <motion.tr
                    key={product.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-b hover:bg-gray-50 dark:hover:bg-dark-700"
                  >
                    <td className="py-3 px-4 font-semibold">{product.name}</td>
                    <td className="py-3 px-4 font-mono text-sm">{product.sku}</td>
                    <td className="py-3 px-4">{product.category.name}</td>
                    <td className="py-3 px-4">${product.price.toFixed(2)}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded text-sm font-semibold ${
                          product.stock > 10
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {product.stock}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            router.push(`/admin/products/${product.id}`)
                          }
                        >
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm">
                          Delete
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}

        {/* Pagination */}
        <div className="flex gap-2 justify-center mt-8">
          <Button
            variant="ghost"
            onClick={() => setSkip(Math.max(0, skip - take))}
            disabled={skip === 0}
          >
            Previous
          </Button>
          <Button
            variant="ghost"
            onClick={() => setSkip(skip + take)}
          >
            Next
          </Button>
        </div>
      </Section>
    </Container>
  );
}
