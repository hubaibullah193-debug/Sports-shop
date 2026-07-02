'use client';

import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated || user?.role !== 'ADMIN') {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <p className="text-gray-600 mb-6">You don't have permission to access the admin panel.</p>
        <button
          onClick={() => router.push('/')}
          className="px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:shadow-lg"
        >
          Go Back Home
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Admin Navigation */}
      <nav className="bg-dark-800 text-white border-b border-dark-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">Admin Panel</h2>
          <div className="flex gap-6">
            <a href="/admin/dashboard" className="hover:text-primary transition">
              Dashboard
            </a>
            <a href="/admin/products" className="hover:text-primary transition">
              Products
            </a>
            <a href="/admin/orders" className="hover:text-primary transition">
              Orders
            </a>
            <a href="/admin/customers" className="hover:text-primary transition">
              Customers
            </a>
            <a href="/" className="hover:text-primary transition">
              Exit Admin
            </a>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main>{children}</main>
    </div>
  );
}
