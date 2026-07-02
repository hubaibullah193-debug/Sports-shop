'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { Container, Section } from '@/components/Layout';
import { motion } from 'framer-motion';
import { Button } from '@/components/Button';
import apiClient from '@/utils/api';
import toast from 'react-hot-toast';

interface Order {
  id: string;
  orderNumber: string;
  total: number;
  status: string;
  createdAt: string;
  deliveredAt?: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }

    fetchOrders();
  }, [isAuthenticated, router]);

  const fetchOrders = async () => {
    try {
      const response = await apiClient.get('/api/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      toast.error('Failed to load orders');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      CONFIRMED: 'bg-blue-100 text-blue-800',
      PROCESSING: 'bg-purple-100 text-purple-800',
      SHIPPED: 'bg-indigo-100 text-indigo-800',
      DELIVERED: 'bg-green-100 text-green-800',
      CANCELLED: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Container>
      <Section>
        <div className="flex justify-between items-center mb-8">
          <h1 className="heading-lg">My Dashboard</h1>
          <Button onClick={() => router.push('/shop')}>Continue Shopping</Button>
        </div>

        {/* User Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card mb-8"
        >
          <h2 className="text-2xl font-bold mb-4">Welcome, {user?.firstName}!</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-gray-600 text-sm">Email</p>
              <p className="font-semibold">{user?.email}</p>
            </div>
            {user?.phone && (
              <div>
                <p className="text-gray-600 text-sm">Phone</p>
                <p className="font-semibold">{user.phone}</p>
              </div>
            )}
            <div>
              <p className="text-gray-600 text-sm">Role</p>
              <p className="font-semibold capitalize">{user?.role.toLowerCase()}</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push('/profile')}
              >
                Edit Profile
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-2xl font-bold mb-6">My Orders</h2>

          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="card h-20 animate-pulse bg-gray-200" />
              ))}
            </div>
          ) : orders.length === 0 ? (
            <div className="card text-center py-12">
              <p className="text-gray-600 mb-4">You haven't placed any orders yet.</p>
              <Button onClick={() => router.push('/shop')}>Start Shopping</Button>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="card"
                >
                  <div className="flex justify-between items-start md:items-center mb-4 flex-col md:flex-row gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Order Number</p>
                      <p className="font-bold">{order.orderNumber}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600">Total</p>
                      <p className="font-bold">${order.total.toFixed(2)}</p>
                    </div>

                    <div>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>

                    <div className="flex gap-2 w-full md:w-auto">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.push(`/orders/${order.orderNumber}`)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>

                  <p className="text-sm text-gray-500">
                    Ordered on {new Date(order.createdAt).toLocaleDateString()}
                    {order.deliveredAt &&
                      ` • Delivered on ${new Date(order.deliveredAt).toLocaleDateString()}`}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </Section>
    </Container>
  );
}
