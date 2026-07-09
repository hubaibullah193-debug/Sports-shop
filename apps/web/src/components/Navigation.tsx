'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMenu, FiX, FiShoppingCart, FiPhone } from 'react-icons/fi';

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/shop', label: 'Shop' },
    { href: '/printing', label: 'Printing Services' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-lg dark:bg-gray-light'
          : 'bg-white/95 dark:bg-gray-light/95 backdrop-blur-sm'
      }`}
    >
      <div className="container-custom">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-heading font-bold text-lg">H</span>
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-heading font-bold text-primary">HUBAIB</div>
              <div className="text-xs text-text-light font-body">Sports & Stationery</div>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <div className="px-4 py-2 rounded-lg text-sm font-heading font-medium text-text hover:bg-gray-light transition-colors group relative">
                  {link.label}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary group-hover:w-full transition-all duration-300"></div>
                </div>
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Phone CTA - Hidden on mobile */}
            <a
              href="tel:03458979767"
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/10 text-secondary hover:bg-secondary/20 transition-colors"
            >
              <FiPhone size={18} />
              <span className="text-sm font-heading font-semibold hidden lg:inline">0345-8979767</span>
            </a>

            {/* Cart Icon */}
            <Link href="/cart" className="relative p-2 hover:bg-gray-light rounded-lg transition-colors">
              <FiShoppingCart size={22} className="text-text" />
              <span className="absolute top-0 right-0 w-5 h-5 bg-secondary text-white text-xs rounded-full flex items-center justify-center font-bold">
                0
              </span>
            </Link>

            {/* Login Button - Desktop */}
            <Link href="/auth/login" className="hidden md:block btn-primary text-sm">
              Login
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 hover:bg-gray-light rounded-lg transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-gray-medium pb-4 space-y-2"
          >
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)}>
                <div className="block px-4 py-3 text-sm font-heading font-medium text-text hover:bg-gray-light rounded-lg transition-colors">
                  {link.label}
                </div>
              </Link>
            ))}
            <div className="px-4 pt-2 border-t border-gray-medium">
              <Link href="/auth/login" className="btn-primary w-full text-center text-sm mt-4 block">
                Login
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};
