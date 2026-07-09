'use client';

import { motion } from 'framer-motion';
import { FiSearch, FiArrowRight, FiPhone } from 'react-icons/fi';
import { useState } from 'react';
import Link from 'next/link';

export const HeroBanner = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <div className="relative pt-20 pb-16 md:pb-24 bg-gradient-to-b from-white to-gray-light dark:from-primary dark:to-gray-light">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container-custom">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left Content */}
          <div>
            {/* Tagline Badge */}
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 mb-6">
                <span className="text-xs font-heading font-bold text-secondary uppercase tracking-wider">
                  ⚡ Premium Quality
                </span>
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.h1 variants={itemVariants} className="heading-lg mb-6">
              <span className="text-gradient">Gear, Stationery</span>
              <br />
              <span className="text-primary">&amp; Printing</span>
              <br />
              <span className="text-text-light">Under One Roof</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p variants={itemVariants} className="body-lg mb-8 max-w-xl">
              Premium sports equipment, quality stationery, and professional printing services for athletes, students, and businesses.
            </motion.p>

            {/* Trust Badges */}
            <motion.div variants={itemVariants} className="flex gap-4 mb-8 flex-wrap">
              <div className="flex items-center gap-2 text-sm font-body text-text">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span>Wide Product Range</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-body text-text">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span>Fast Service</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-body text-text">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span>Affordable Prices</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex gap-4 flex-wrap">
              <Link href="/shop">
                <button className="btn-primary inline-flex items-center gap-2">
                  Shop Now
                  <FiArrowRight size={18} />
                </button>
              </Link>
              <a href="tel:03458979767">
                <button className="btn-outline inline-flex items-center gap-2">
                  <FiPhone size={18} />
                  Call Us
                </button>
              </a>
            </motion.div>

            {/* Contact Info Bar */}
            <motion.div
              variants={itemVariants}
              className="mt-12 pt-8 border-t border-gray-medium flex gap-8"
            >
              <div>
                <p className="text-xs font-heading font-semibold text-text-light uppercase tracking-wider mb-1">
                  Phone
                </p>
                <a
                  href="tel:03458979767"
                  className="text-sm font-heading font-bold text-primary hover:text-secondary transition"
                >
                  0345-8979767
                </a>
              </div>
              <div>
                <p className="text-xs font-heading font-semibold text-text-light uppercase tracking-wider mb-1">
                  Hours
                </p>
                <p className="text-sm font-body text-text">Mon-Sun, 7AM - 8PM</p>
              </div>
            </motion.div>
          </div>

          {/* Right Content - Feature Cards */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-2 gap-6"
          >
            {/* Card 1: Sports Equipment */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="card"
            >
              <div className="text-5xl mb-4">⚽</div>
              <h3 className="subheading mb-2">Sports Equipment</h3>
              <p className="body-sm mb-4">
                Football, cricket, badminton, volleyball & gym accessories
              </p>
              <Link href="/shop?category=sports">
                <span className="text-sm font-heading font-bold text-secondary hover:text-primary transition cursor-pointer flex items-center gap-1">
                  Explore <FiArrowRight size={14} />
                </span>
              </Link>
            </motion.div>

            {/* Card 2: Stationery */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="card"
            >
              <div className="text-5xl mb-4">✏️</div>
              <h3 className="subheading mb-2">Stationery</h3>
              <p className="body-sm mb-4">
                School supplies, notebooks, pens & art materials
              </p>
              <Link href="/shop?category=stationery">
                <span className="text-sm font-heading font-bold text-secondary hover:text-primary transition cursor-pointer flex items-center gap-1">
                  Browse <FiArrowRight size={14} />
                </span>
              </Link>
            </motion.div>

            {/* Card 3: Printing Services */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="card col-span-2"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-4xl mb-4">🖨️</div>
                  <h3 className="subheading mb-2">Professional Printing</h3>
                  <p className="body-sm">
                    Banners, business cards, documents & custom printing
                  </p>
                </div>
                <FiArrowRight size={32} className="text-accent opacity-20" />
              </div>
              <Link href="/printing">
                <span className="text-sm font-heading font-bold text-secondary hover:text-primary transition cursor-pointer flex items-center gap-1 mt-4">
                  Get Quote <FiArrowRight size={14} />
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Search Bar Section */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
          className="mt-16 md:mt-24"
        >
          <div className="max-w-2xl">
            <label className="block text-sm font-heading font-bold text-text mb-3">
              What are you looking for?
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search for sports equipment, stationery, printing services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-base pl-5 pr-14"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-3 text-secondary hover:text-primary transition">
                <FiSearch size={20} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
