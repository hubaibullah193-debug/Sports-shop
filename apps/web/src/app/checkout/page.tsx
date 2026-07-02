'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Container, Section } from '@/components/Layout';
import { Button } from '@/components/Button';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import { formatPrice } from '@/utils/helpers';
import toast from 'react-hot-toast';
import apiClient from '@/utils/api';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    paymentMethod: 'CASH_ON_DELIVERY',
  });

  if (!isAuthenticated) {
    return (
      <Container>
        <Section className="text-center py-12">
          <p className="text-lg text-gray-600 mb-4">
            Please log in to proceed with checkout
          </p>
          <Button
            onClick={() => router.push('/auth/login')}
          >
            Go to Login
          </Button>
        </Section>
      </Container>
    );
  }

  if (items.length === 0) {
    return (
      <Container>
        <Section className="text-center py-12">
          <p className="text-lg text-gray-600 mb-4">Your cart is empty</p>
          <Button onClick={() => router.push('/shop')}>
            Continue Shopping
          </Button>
        </Section>
      </Container>
    );
  }

  const subtotal = getTotalPrice();
  const tax = subtotal * 0.1;
  const shipping = subtotal > 50 ? 0 : 5;
  const total = subtotal + tax + shipping;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const shippingAddress = `${formData.street}, ${formData.city}, ${formData.state} ${formData.postalCode}, ${formData.country}`;

      await apiClient.post('/api/orders', {
        items: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
        shippingAddress,
        paymentMethod: formData.paymentMethod,
      });

      toast.success('Order placed successfully!');
      router.push('/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to place order');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Section>
        <h1 className="heading-lg mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Shipping Info */}
              <div className="card">
                <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    required
                    className="input-base"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    required
                    className="input-base"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    className="input-base"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    required
                    className="input-base"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>

                <input
                  type="text"
                  placeholder="Street Address"
                  required
                  className="input-base mt-4"
                  value={formData.street}
                  onChange={(e) =>
                    setFormData({ ...formData, street: e.target.value })
                  }
                />

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <input
                    type="text"
                    placeholder="City"
                    required
                    className="input-base"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    placeholder="State"
                    required
                    className="input-base"
                    value={formData.state}
                    onChange={(e) =>
                      setFormData({ ...formData, state: e.target.value })
                    }
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <input
                    type="text"
                    placeholder="Postal Code"
                    required
                    className="input-base"
                    value={formData.postalCode}
                    onChange={(e) =>
                      setFormData({ ...formData, postalCode: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    placeholder="Country"
                    required
                    className="input-base"
                    value={formData.country}
                    onChange={(e) =>
                      setFormData({ ...formData, country: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="card">
                <h2 className="text-xl font-bold mb-4">Payment Method</h2>
                <div className="space-y-3">
                  {[
                    { value: 'CASH_ON_DELIVERY', label: 'Cash on Delivery' },
                    { value: 'BANK_TRANSFER', label: 'Bank Transfer' },
                  ].map((method) => (
                    <label key={method.value} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.value}
                        checked={formData.paymentMethod === method.value}
                        onChange={(e) =>
                          setFormData({ ...formData, paymentMethod: e.target.value })
                        }
                      />
                      <span className="font-semibold">{method.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                isLoading={isLoading}
              >
                Place Order
              </Button>
            </form>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card h-fit sticky top-20"
          >
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-3 mb-4 pb-4 border-b max-h-64 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.product?.name} x {item.quantity}
                  </span>
                  <span className="font-semibold">
                    {formatPrice((item.product?.price || 0) * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2 mb-4 pb-4 border-b">
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

            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-primary">{formatPrice(total)}</span>
            </div>
          </motion.div>
        </div>
      </Section>
    </Container>
  );
}
