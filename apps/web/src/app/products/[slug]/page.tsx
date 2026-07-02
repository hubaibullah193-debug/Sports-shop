'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Container, Section } from '@/components/Layout';
import { Button } from '@/components/Button';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/utils/helpers';
import toast from 'react-hot-toast';
import apiClient from '@/utils/api';
import { Product, Review } from '@/types';

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const { addItem } = useCartStore();

  useEffect(() => {
    fetchProduct();
  }, [slug]);

  const fetchProduct = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.get(`/api/products/${slug}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Failed to fetch product:', error);
      toast.error('Product not found');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Container>
        <Section>
          <div className="animate-pulse">
            <div className="h-96 bg-gray-200 rounded mb-4" />
            <div className="h-8 bg-gray-200 rounded w-1/2 mb-4" />
            <div className="h-4 bg-gray-200 rounded w-1/3" />
          </div>
        </Section>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container>
        <Section className="text-center py-12">
          <p className="text-lg text-gray-600">Product not found</p>
        </Section>
      </Container>
    );
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast.success(`Added ${quantity} item(s) to cart`);
  };

  return (
    <>
      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Images */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="mb-4 bg-gray-100 rounded-lg overflow-hidden h-96">
                {product.images?.[selectedImage] && (
                  <img
                    src={product.images[selectedImage].url}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`border-2 rounded overflow-hidden h-20 ${
                        selectedImage === idx
                          ? 'border-primary'
                          : 'border-gray-300'
                      }`}
                    >
                      <img
                        src={img.url}
                        alt={`View ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="mb-4">
                <span className="text-sm text-gray-600">
                  {product.category?.name}
                </span>
                <h1 className="heading-md mt-2">{product.name}</h1>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold text-primary">
                    {formatPrice(product.price)}
                  </span>
                  {product.compareAtPrice && (
                    <span className="text-lg line-through text-gray-400">
                      {formatPrice(product.compareAtPrice)}
                    </span>
                  )}
                </div>
                {product.discount && (
                  <p className="text-green-600 font-semibold mt-2">
                    Save {product.discount}%
                  </p>
                )}
              </div>

              {/* Stock */}
              <div className="mb-6">
                <p
                  className={`font-semibold ${
                    product.stock > 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {product.stock > 0 ? `${product.stock} In Stock` : 'Out of Stock'}
                </p>
              </div>

              {/* Description */}
              <div className="mb-8">
                <p className="text-gray-600">{product.description}</p>
              </div>

              {/* Specifications */}
              {product.specifications && product.specifications.length > 0 && (
                <div className="mb-8 pb-8 border-b">
                  <h3 className="font-bold mb-4">Specifications</h3>
                  <div className="space-y-2">
                    {product.specifications.map((spec, idx) => (
                      <div key={idx} className="flex justify-between">
                        <span className="text-gray-600">{spec.key}</span>
                        <span className="font-semibold">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Add to Cart */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <label className="font-semibold">Quantity:</label>
                  <div className="flex border rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 hover:bg-gray-100"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(Math.max(1, Number(e.target.value)))
                      }
                      className="w-16 text-center border-l border-r"
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                >
                  Add to Cart
                </Button>

                <Button variant="ghost" size="lg" className="w-full">
                  Add to Wishlist
                </Button>
              </div>

              {/* Meta Info */}
              <div className="mt-8 pt-8 border-t space-y-2 text-sm text-gray-600">
                <p>SKU: {product.sku}</p>
                {product.brand && <p>Brand: {product.brand.name}</p>}
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Reviews Section */}
      {product.reviews && product.reviews.length > 0 && (
        <Section className="bg-gray-50 dark:bg-dark-800">
          <Container>
            <h2 className="heading-md mb-8">Customer Reviews</h2>
            <div className="space-y-6">
              {product.reviews.map((review) => (
                <div key={review.id} className="card">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-semibold">
                        {review.user?.firstName} {review.user?.lastName}
                      </p>
                      <div className="flex gap-1 text-yellow-400">
                        {[...Array(review.rating)].map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <h4 className="font-bold mb-2">{review.title}</h4>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}
