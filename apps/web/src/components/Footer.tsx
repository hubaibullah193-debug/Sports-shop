'use client';

import Link from 'next/link';
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi';

export const Footer = () => {
  return (
    <footer className="bg-dark-800 text-dark-50 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4">Elite Sports</h3>
            <p className="text-sm text-dark-300">
              Premium sports equipment, stationery, and professional printing services.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/shop" className="hover:text-primary transition">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/printing" className="hover:text-primary transition">
                  Printing Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/faq" className="hover:text-primary transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-primary transition">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-primary transition">
                  Shipping
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="hover:text-primary transition">
                <FiFacebook size={20} />
              </a>
              <a href="#" className="hover:text-primary transition">
                <FiTwitter size={20} />
              </a>
              <a href="#" className="hover:text-primary transition">
                <FiInstagram size={20} />
              </a>
              <a href="#" className="hover:text-primary transition">
                <FiLinkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-dark-700 mt-12 pt-8 text-center text-sm text-dark-300">
          <p>&copy; 2026 Elite Sports Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
