'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/utils/helpers';
import { Button } from '@/components/Button';
import { Container, Section } from '@/components/Layout';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);

  const subtotal = getTotalPrice();
  const tax = subtotal * 0.1;
  const shipping = subtotal > 50 ? 0 : 5;
  const total = subtotal + tax + shipping;

  return (
    <Container>
      <Section>
        <h1 className="heading-lg mb-8">Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">Your cart is empty</p>
            <Button className="mt-4">Continue Shopping</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="card flex gap-4"
                >
                  {item.product?.images?.[0] && (
                    <img
                      src={item.product.images[0].url}
                      alt={item.product.name}
                      className="w-24 h-24 object-cover rounded"
                    />
                  )}

                  <div className="flex-1">
                    <h3 className="font-semibold">{item.product?.name}</h3>
                    <p className="text-primary font-bold mt-2">
                      {formatPrice(item.product?.price || 0)}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="px-2 py-1 border rounded"
                    >
                      −
                    </button>
                    <span className="px-4">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="px-2 py-1 border rounded"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.productId)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card h-fit sticky top-20"
            >
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              <div className="space-y-3 mb-4 pb-4 border-b">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (10%)</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
                </div>
              </div>

              <div className="flex justify-between text-lg font-bold mb-6">
                <span>Total</span>
                <span className="text-primary">{formatPrice(total)}</span>
              </div>

              <Button variant="primary" size="lg" className="w-full mb-2">
                Proceed to Checkout
              </Button>
              <Button variant="ghost" className="w-full">
                Continue Shopping
              </Button>
            </motion.div>
          </div>
        )}
      </Section>
    </Container>
  );
}
