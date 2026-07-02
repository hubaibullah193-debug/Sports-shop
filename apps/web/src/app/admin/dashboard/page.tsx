'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Container, Section } from '@/components/Layout';
import { useAuthStore } from '@/store/authStore';
import apiClient from '@/utils/api';

interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  lowStockProducts: number;
}

interface AdminOrder {
  id: string;
  orderNumber: string;
  total: number;
  status: string;
  user: { email: string };
  createdAt: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'ADMIN') {
      router.push('/');
      return;
    }

    fetchDashboardData();
  }, [isAuthenticated, user, router]);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, ordersRes] = await Promise.all([
        apiClient.get('/api/admin/dashboard'),
        apiClient.get('/api/admin/orders?take=10'),
      ]);

      setStats(statsRes.data);
      setOrders(ordersRes.data.orders);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
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
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-24 bg-gray-200 rounded" />
              ))}
            </div>
          </div>
        </Section>
      </Container>
    );
  }

  const statCards = [
    { label: 'Total Revenue', value: `$${stats?.totalRevenue.toFixed(2)}`, color: 'text-green-600' },
    { label: 'Total Orders', value: stats?.totalOrders, color: 'text-blue-600' },
    { label: 'Total Customers', value: stats?.totalCustomers, color: 'text-purple-600' },
    { label: 'Low Stock', value: stats?.lowStockProducts, color: 'text-red-600' },
  ];

  return (
    <Container>
      <Section>
        <h1 className="heading-lg mb-8">Admin Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {statCards.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="card"
            >
              <p className="text-gray-600 text-sm mb-2">{stat.label}</p>
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card"
        >
          <h2 className="text-2xl font-bold mb-6">Recent Orders</h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-4">Order #</th>
                  <th className="text-left py-2 px-4">Customer</th>
                  <th className="text-left py-2 px-4">Total</th>
                  <th className="text-left py-2 px-4">Status</th>
                  <th className="text-left py-2 px-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-b hover:bg-gray-50 dark:hover:bg-dark-700"
                  >
                    <td className="py-3 px-4 font-mono text-sm">{order.orderNumber}</td>
                    <td className="py-3 px-4">{order.user.email}</td>
                    <td className="py-3 px-4 font-bold">${order.total.toFixed(2)}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 rounded bg-blue-100 text-blue-800 text-sm">
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Admin Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {[
            { label: 'Manage Products', href: '/admin/products' },
            { label: 'Manage Orders', href: '/admin/orders' },
            { label: 'Manage Customers', href: '/admin/customers' },
          ].map((action, idx) => (
            <motion.button
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + idx * 0.1 }}
              onClick={() => router.push(action.href)}
              className="card text-center py-8 hover:shadow-lg transition"
            >
              <p className="font-bold">{action.label}</p>
            </motion.button>
          ))}
        </div>
      </Section>
    </Container>
  );
}
