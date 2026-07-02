'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-dark-800 shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-primary">
            Elite Sports
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8">
            <Link href="/shop" className="hover:text-primary transition">
              Shop
            </Link>
            <Link href="/printing" className="hover:text-primary transition">
              Printing
            </Link>
            <Link href="/about" className="hover:text-primary transition">
              About
            </Link>
            <Link href="/contact" className="hover:text-primary transition">
              Contact
            </Link>
          </div>

          {/* Actions */}
          <div className="hidden md:flex gap-4">
            <Link href="/cart" className="hover:text-primary transition">
              Cart
            </Link>
            <Link href="/auth/login" className="btn-primary text-sm">
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pb-4 space-y-4"
          >
            <Link href="/shop" className="block hover:text-primary">
              Shop
            </Link>
            <Link href="/printing" className="block hover:text-primary">
              Printing
            </Link>
            <Link href="/about" className="block hover:text-primary">
              About
            </Link>
            <Link href="/contact" className="block hover:text-primary">
              Contact
            </Link>
          </motion.div>
        )}
      </div>
    </nav>
  );
};
