'use client';

import { motion } from 'framer-motion';
import { FiSearch, FiArrowRight, FiMessageCircle } from 'react-icons/fi';
import { useState } from 'react';
import Link from 'next/link';

export const HeroBanner = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { name: 'Sports Equipment', emoji: '⚽', color: 'from-blue-500 to-blue-600', href: '/shop?category=sports' },
    { name: 'Stationery', emoji: '✏️', color: 'from-purple-500 to-purple-600', href: '/shop?category=stationery' },
    { name: 'Printing Services', emoji: '🖨️', color: 'from-orange-500 to-orange-600', href: '/printing' },
    { name: 'Office Supplies', emoji: '📎', color: 'from-pink-500 to-pink-600', href: '/shop?category=office' },
  ];

  const featuredProducts = [
    { id: 1, name: 'Premium Cricket Bat', image: '🏏', price: '$45', discount: '-15%' },
    { id: 2, name: 'Fountain Pen Set', image: '✏️', price: '$28', discount: '-20%' },
    { id: 3, name: 'Sports Ball Pack', image: '⚽', price: '$32', discount: '-10%' },
    { id: 4, name: 'Printing Services', image: '🖨️', price: 'Quote', discount: 'Free' },
  ];

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
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="relative bg-gradient-to-b from-gray-50 to-white dark:from-dark-900 dark:to-dark-800">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Top Banner Section */}
        <div className="container mx-auto px-4 py-12 md:py-20">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto"
          >
            {/* Header */}
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold text-text dark:text-white mb-4">
                Your One-Stop Shop for
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  Sports & Stationery
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
                Premium quality products for athletes, students, and professionals
              </p>
            </motion.div>

            {/* Search Bar */}
            <motion.div variants={itemVariants} className="mb-12">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for sports equipment, stationery, or services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 pr-16 rounded-full border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-800 text-text dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-primary transition-colors"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-3 text-primary hover:bg-gray-100 dark:hover:bg-dark-700 rounded-full transition">
                  <FiSearch size={20} />
                </button>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex gap-4 justify-center flex-wrap mb-16">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white bg-gradient-to-r from-primary to-secondary hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                Shop Now <FiArrowRight />
              </Link>
              <a
                href="https://wa.me/923458979767?text=Hello%20Hubaib's%20Sports%20and%20Stationery%20House!%20I%20would%20like%20to%20inquire%20about%20your%20products%20and%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white bg-green-500 hover:bg-green-600 transition-all duration-300 hover:-translate-y-1"
              >
                <FiMessageCircle /> Chat on WhatsApp
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Featured Products Carousel */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="container mx-auto px-4 py-12"
        >
          <motion.h2 variants={itemVariants} className="text-3xl font-bold text-text dark:text-white mb-8 text-center">
            Featured Products
          </motion.h2>
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {featuredProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                <div className="bg-white dark:bg-dark-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                  {/* Discount Badge */}
                  {product.discount && (
                    <div className="absolute top-4 right-4 z-10 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {product.discount}
                    </div>
                  )}

                  {/* Product Image */}
                  <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-50 dark:from-dark-700 dark:to-dark-600 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-300">
                    {product.image}
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className="font-semibold text-text dark:text-white mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-primary">{product.price}</span>
                      <button className="p-2 rounded-full bg-gray-100 dark:bg-dark-700 text-primary hover:bg-primary hover:text-white transition-colors">
                        <FiArrowRight size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="container mx-auto px-4 py-16"
        >
          <motion.h2 variants={itemVariants} className="text-3xl font-bold text-text dark:text-white mb-8 text-center">
            Shop by Category
          </motion.h2>
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {categories.map((category, idx) => (
              <Link key={idx} href={category.href}>
                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  className={`h-40 rounded-2xl bg-gradient-to-br ${category.color} p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between group`}
                >
                  <div className="text-5xl group-hover:scale-110 transition-transform duration-300 origin-left">
                    {category.emoji}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{category.name}</h3>
                    <p className="text-sm opacity-90 group-hover:opacity-100 transition">Explore now →</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </motion.div>

        {/* Bottom Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4 py-12 mb-8"
        >
          <div className="bg-gradient-to-r from-primary via-secondary to-accent rounded-2xl p-8 md:p-12 text-white shadow-xl">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">Need Custom Printing?</h2>
            <p className="text-lg opacity-90 mb-6 max-w-2xl">
              Get professional quotes for banners, business cards, flex printing, and more. Fast turnaround guaranteed.
            </p>
            <Link
              href="/printing"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary font-semibold rounded-full hover:bg-gray-100 transition-colors"
            >
              Request a Quote <FiArrowRight />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
