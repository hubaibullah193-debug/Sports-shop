'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Container, Section } from '@/components/Layout';
import { formatPrice, formatDate } from '@/utils/helpers';
import { Button } from '@/components/Button';
import apiClient from '@/utils/api';

interface OrderDetail {
  id: string;
  orderNumber: string;
  status: string;
  paymentStatus: string;
  items: Array<{
    id: string;
    quantity: number;
    price: number;
    product: {
      name: string;
      slug: string;
      images: Array<{ url: string }>;
    };
  }>;
  subtotal: number;
  tax: number;
  shippingCost: number;
  total: number;
  shippingAddress: string;
  createdAt: string;
  deliveredAt?: string;
  trackingNumber?: string;
}

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const orderNumber = params.orderNumber as string;
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, [orderNumber, fetchOrder]);

  const fetchOrder = async () => {
    try {
      const response = await apiClient.get(`/api/orders/${orderNumber}`);
      setOrder(response.data);
    } catch (error) {
      console.error('Failed to fetch order:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Container>
        <Section>
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3" />
            <div className="h-24 bg-gray-200 rounded" />
            <div className="h-48 bg-gray-200 rounded" />
          </div>
        </Section>
      </Container>
    );
  }

  if (!order) {
    return (
      <Container>
        <Section className="text-center py-12">
          <p className="text-lg text-gray-600 mb-4">Order not found</p>
          <Button onClick={() => router.push('/dashboard')}>Back to Dashboard</Button>
        </Section>
      </Container>
    );
  }

  const getStatusIcon = (status: string) => {
    const icons: Record<string, string> = {
      PENDING: '⏳',
      CONFIRMED: '✓',
      PROCESSING: '⚙️',
      SHIPPED: '📦',
      DELIVERED: '✅',
      CANCELLED: '❌',
    };
    return icons[status] || '•';
  };

  const statusSteps = [
    { status: 'PENDING', label: 'Pending' },
    { status: 'CONFIRMED', label: 'Confirmed' },
    { status: 'PROCESSING', label: 'Processing' },
    { status: 'SHIPPED', label: 'Shipped' },
    { status: 'DELIVERED', label: 'Delivered' },
  ];

  const currentStepIndex = statusSteps.findIndex((s) => s.status === order.status);

  return (
    <Container>
      <Section>
        <div className="mb-8">
          <Button onClick={() => router.push('/dashboard')}>← Back to Orders</Button>
        </div>

        <h1 className="heading-lg mb-2">Order {order.orderNumber}</h1>
        <p className="text-gray-600 mb-8">
          Placed on {formatDate(order.createdAt)}
        </p>

        {/* Status Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card mb-8"
        >
          <h2 className="text-lg font-bold mb-6">Order Status</h2>

          <div className="flex justify-between items-center mb-8">
            {statusSteps.map((step, idx) => (
              <div key={step.status} className="flex flex-col items-center flex-1">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg mb-2 ${
                    idx <= currentStepIndex
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {getStatusIcon(step.status)}
                </motion.div>
                <p className="text-sm font-semibold text-center">{step.label}</p>

                {idx < statusSteps.length - 1 && (
                  <div
                    className={`absolute w-12 h-1 mt-5 ml-6 ${
                      idx < currentStepIndex ? 'bg-primary' : 'bg-gray-200'
                    }`}
                    style={{ marginLeft: 'calc(50% + 20px)' }}
                  />
                )}
              </div>
            ))}
          </div>

          {order.trackingNumber && (
            <div className="pt-4 border-t">
              <p className="text-sm text-gray-600">Tracking Number</p>
              <p className="font-mono font-bold">{order.trackingNumber}</p>
            </div>
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-4"
          >
            <h2 className="text-lg font-bold">Order Items</h2>

            {order.items.map((item) => (
              <div key={item.id} className="card flex gap-4">
                {item.product.images?.[0] && (
                  <Image
                    src={item.product.images[0].url}
                    alt={item.product.name}
                    width={96}
                    height={96}
                    className="w-24 h-24 object-cover rounded"
                  />
                )}

                <div className="flex-1">
                  <h3 className="font-semibold">{item.product.name}</h3>
                  <p className="text-primary font-bold mt-2">
                    {formatPrice(item.price)} × {item.quantity} = {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card h-fit"
          >
            <h2 className="text-lg font-bold mb-4">Order Summary</h2>

            <div className="space-y-3 pb-4 border-b">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>{formatPrice(order.tax)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{formatPrice(order.shippingCost)}</span>
              </div>
            </div>

            <div className="flex justify-between text-lg font-bold pt-4">
              <span>Total</span>
              <span className="text-primary">{formatPrice(order.total)}</span>
            </div>

            <div className="mt-6 p-4 bg-gray-50 dark:bg-dark-700 rounded">
              <p className="text-sm font-semibold mb-2">Shipping Address</p>
              <p className="text-sm text-gray-600">{order.shippingAddress}</p>
            </div>

            <div className="mt-4 p-4 bg-gray-50 dark:bg-dark-700 rounded">
              <p className="text-sm font-semibold mb-2">Payment Status</p>
              <p className={`text-sm font-bold ${
                order.paymentStatus === 'COMPLETED'
                  ? 'text-green-600'
                  : 'text-yellow-600'
              }`}>
                {order.paymentStatus}
              </p>
            </div>

            <Button variant="primary" size="lg" className="w-full mt-6">
              Download Invoice
            </Button>
          </motion.div>
        </div>
      </Section>
    </Container>
  );
}
