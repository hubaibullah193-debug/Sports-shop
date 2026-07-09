'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiPhone,
  FiMail,
  FiClock,
  FiArrowRight,
} from 'react-icons/fi';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Shop', href: '/shop' },
    { label: 'Printing Services', href: '/printing' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  const services = [
    { label: 'Sports Equipment', href: '/shop?category=sports' },
    { label: 'Stationery', href: '/shop?category=stationery' },
    { label: 'Printing', href: '/printing' },
    { label: 'Custom Orders', href: '/contact' },
  ];

  const support = [
    { label: 'FAQ', href: '/faq' },
    { label: 'Track Order', href: '/orders' },
    { label: 'Returns', href: '#' },
    { label: 'Shipping Info', href: '#' },
  ];

  const socialLinks = [
    { icon: FiFacebook, href: '#', label: 'Facebook' },
    { icon: FiInstagram, href: '#', label: 'Instagram' },
    { icon: FiTwitter, href: '#', label: 'Twitter' },
  ];

  const businessHours = [
    { day: 'Monday - Sunday', hours: '7:00 AM - 8:00 PM' },
  ];

  return (
    <footer className="bg-primary text-white pt-16 md:pt-24">
      {/* Main Footer Content */}
      <div className="container-custom mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-heading font-bold text-lg">H</span>
              </div>
              <div>
                <div className="text-sm font-heading font-bold">HUBAIB</div>
                <div className="text-xs text-gray-300 font-body">Sports & Stationery</div>
              </div>
            </div>
            <p className="text-sm text-gray-300 font-body leading-relaxed mb-6">
              Premium sports equipment, stationery, and professional printing services all under one roof.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-white/10 hover:bg-secondary transition-colors flex items-center justify-center"
                    title={social.label}
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-sm font-heading font-bold mb-6 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-white transition-colors flex items-center gap-2 group font-body"
                  >
                    <FiArrowRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 transition-opacity -ml-5"
                    />
                    <span className="group-hover:translate-x-1 transition-transform">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-sm font-heading font-bold mb-6 uppercase tracking-wider">
              Services
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="text-sm text-gray-300 hover:text-white transition-colors flex items-center gap-2 group font-body"
                  >
                    <FiArrowRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 transition-opacity -ml-5"
                    />
                    <span className="group-hover:translate-x-1 transition-transform">
                      {service.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-sm font-heading font-bold mb-6 uppercase tracking-wider">
              Support
            </h4>
            <ul className="space-y-3">
              {support.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-300 hover:text-white transition-colors flex items-center gap-2 group font-body"
                  >
                    <FiArrowRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 transition-opacity -ml-5"
                    />
                    <span className="group-hover:translate-x-1 transition-transform">
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact & Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h4 className="text-sm font-heading font-bold mb-6 uppercase tracking-wider">
              Get in Touch
            </h4>

            {/* Business Hours */}
            <div className="mb-6">
              <div className="flex items-start gap-3 mb-3">
                <FiClock size={18} className="text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-heading font-semibold text-accent mb-1">
                    Business Hours
                  </p>
                  {businessHours.map((schedule) => (
                    <p key={schedule.day} className="text-sm text-gray-300 font-body">
                      {schedule.day}: {schedule.hours}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Actions */}
            <div className="space-y-2">
              <a
                href="tel:03458979767"
                className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors group font-body"
              >
                <FiPhone size={16} />
                <span>0345-8979767</span>
              </a>
              <a
                href="mailto:hubaibullah193@gmail.com"
                className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors group font-body break-all"
              >
                <FiMail size={16} />
                <span>hubaibullah193@gmail.com</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/10"></div>

      {/* Bottom Footer */}
      <div className="container-custom py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-300 font-body text-center md:text-left">
            &copy; {currentYear} HUBAIB SPORTS AND STATIONARY SHOP. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-300 hover:text-white transition-colors font-body">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors font-body">
              Terms of Service
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors font-body">
              Cookies
            </a>
          </div>
        </div>
      </div>

      {/* Footer Accent Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary via-accent to-secondary opacity-30"></div>
    </footer>
  );
};
