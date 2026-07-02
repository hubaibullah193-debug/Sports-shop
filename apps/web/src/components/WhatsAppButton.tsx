'use client';

import { useState } from 'react';
import { FiMessageCircle, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export const WhatsAppButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const whatsappNumber = '+1234567890'; // Replace with your WhatsApp number

  const message = encodeURIComponent(
    'Hello! I would like to inquire about your products and services.'
  );
  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${message}`;

  return (
    <>
      {/* WhatsApp Button */}
      <motion.a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 right-8 p-4 bg-green-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-40"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <FiMessageCircle size={24} />
      </motion.a>

      {/* Chat Toggle */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 p-4 bg-primary text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-40"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <FiX size={24} /> : <FiMessageCircle size={24} />}
      </motion.button>

      {/* Chat Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-8 w-80 bg-white dark:bg-dark-800 rounded-lg shadow-xl z-40 overflow-hidden"
          >
            <div className="bg-primary text-white p-4">
              <h3 className="font-bold">Chat with us!</h3>
              <p className="text-sm opacity-90">Available 9 AM - 6 PM</p>
            </div>
            <div className="p-4 space-y-3">
              <p className="text-sm text-gray-600 dark:text-dark-200">
                Have questions? We're here to help!
              </p>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-green-500 text-white py-2 rounded font-semibold hover:bg-green-600 transition"
              >
                Message on WhatsApp
              </a>
              <a
                href="tel:+1234567890"
                className="block text-center bg-blue-500 text-white py-2 rounded font-semibold hover:bg-blue-600 transition"
              >
                Call Us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
