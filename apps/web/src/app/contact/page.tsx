'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Container, Section } from '@/components/Layout';
import { Button } from '@/components/Button';
import toast from 'react-hot-toast';
import apiClient from '@/utils/api';
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiClock,
  FiMessageCircle,
  FiArrowRight,
} from 'react-icons/fi';

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
    transition: { duration: 0.6 },
  },
};

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await apiClient.post('/api/contact', formData);
      toast.success('Message sent successfully! We will get back to you soon.');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message');
    } finally {
      setIsLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: FiMapPin,
      title: 'Visit Us',
      details: ['Danishkool Road', 'Pandiali Adda Bazar', 'District Mohmand'],
      href: '#',
    },
    {
      icon: FiPhone,
      title: 'Call Us',
      details: ['0345-8979767', 'WhatsApp Priority', 'Available 7 days a week'],
      href: 'tel:03458979767',
    },
    {
      icon: FiMail,
      title: 'Email Us',
      details: ['hubaibullah193@gmail.com', 'Response within 24 hours'],
      href: 'mailto:hubaibullah193@gmail.com',
    },
  ];

  const businessHours = [
    { day: 'Monday - Sunday', hours: '7:00 AM - 8:00 PM' },
  ];

  return (
    <>
      {/* Hero Section */}
      <Section className="bg-gradient-primary text-white pt-32 pb-24">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="badge badge-accent mb-4">Get in Touch</span>
            <h1 className="heading-lg text-white mb-6">Contact HUBAIB</h1>
            <p className="body-lg text-gray-100">
              We'd love to hear from you. Whether you have questions about our products or need a custom printing quote, we're here to help.
            </p>
          </motion.div>
        </Container>
      </Section>

      {/* Contact Information Cards */}
      <Section className="bg-white">
        <Container>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            {contactInfo.map((info, idx) => {
              const Icon = info.icon;
              return (
                <motion.a
                  key={idx}
                  variants={itemVariants}
                  href={info.href}
                  className="card group hover:border-secondary hover:shadow-lg transition-all cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4 group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                    <Icon className="w-6 h-6 text-secondary group-hover:text-white" />
                  </div>
                  <h3 className="subheading mb-3">{info.title}</h3>
                  <div className="space-y-1">
                    {info.details.map((detail, i) => (
                      <p key={i} className="body-sm text-text-light">
                        {detail}
                      </p>
                    ))}
                  </div>
                </motion.a>
              );
            })}
          </motion.div>
        </Container>
      </Section>

      {/* Main Contact Section */}
      <Section className="bg-gray-light">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column: Contact Info & Hours */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Business Hours */}
              <div className="card bg-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <FiClock className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="subheading">Business Hours</h3>
                </div>
                <div className="space-y-3 pl-13">
                  {businessHours.map((schedule, idx) => (
                    <div key={idx}>
                      <p className="font-heading font-bold text-sm text-text">
                        {schedule.day}
                      </p>
                      <p className="body-sm text-text-light">{schedule.hours}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div className="card bg-white">
                <h3 className="subheading mb-4">Quick Links</h3>
                <div className="space-y-3">
                  <a
                    href="tel:03458979767"
                    className="flex items-center gap-3 p-3 rounded-lg bg-gray-light hover:bg-secondary/10 transition-colors group"
                  >
                    <FiPhone className="w-5 h-5 text-secondary group-hover:text-primary transition" />
                    <span className="text-sm font-heading font-bold text-text group-hover:text-secondary transition">
                      Call Now
                    </span>
                  </a>
                  <a
                    href={`https://wa.me/923458979767?text=Hello%20HUBAIB%20SPORTS%20AND%20STATIONARY%20SHOP!%20I%20would%20like%20to%20inquire%20about%20your%20products%20and%20services.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg bg-gray-light hover:bg-green-100 transition-colors group"
                  >
                    <FiMessageCircle className="w-5 h-5 text-green-500 group-hover:text-green-600 transition" />
                    <span className="text-sm font-heading font-bold text-text group-hover:text-green-600 transition">
                      WhatsApp Chat
                    </span>
                  </a>
                  <a
                    href="mailto:hubaibullah193@gmail.com"
                    className="flex items-center gap-3 p-3 rounded-lg bg-gray-light hover:bg-accent/10 transition-colors group"
                  >
                    <FiMail className="w-5 h-5 text-accent group-hover:text-primary transition" />
                    <span className="text-sm font-heading font-bold text-text group-hover:text-accent transition">
                      Send Email
                    </span>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 card bg-white"
            >
              <h2 className="heading-sm mb-2">Send us a Message</h2>
              <p className="body-sm text-text-light mb-8">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-heading font-bold text-text-light uppercase tracking-wider mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="Your Name"
                      required
                      className="input-base"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-heading font-bold text-text-light uppercase tracking-wider mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      required
                      className="input-base"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                </div>

                {/* Phone & Subject Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-heading font-bold text-text-light uppercase tracking-wider mb-2">
                      Phone (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="03XX-XXXXXXX"
                      className="input-base"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-heading font-bold text-text-light uppercase tracking-wider mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      placeholder="How can we help?"
                      required
                      className="input-base"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-heading font-bold text-text-light uppercase tracking-wider mb-2">
                    Message *
                  </label>
                  <textarea
                    placeholder="Tell us more about your inquiry..."
                    required
                    rows={6}
                    className="input-base resize-none"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full justify-center"
                  isLoading={isLoading}
                >
                  Send Message <FiArrowRight size={18} />
                </Button>
              </form>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Map Section */}
      <Section className="bg-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="heading-md mb-4">Find Us on the Map</h2>
            <p className="body-lg text-text-light max-w-2xl mx-auto">
              Visit our shop at Danishkool Road, Pandiali Adda Bazar, District Mohmand
            </p>
          </motion.div>

          <div className="rounded-xl overflow-hidden h-96 md:h-[500px] shadow-lg">
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              title="HUBAIB Sports and Stationary Shop Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3319.3844393849603!2d71.48861!3d34.22028!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfc9a3e3e3e3e3%3A0x0!2zMzTCsDEzJzEyLjgiTiA3McKwMjknMTkuOCJF!5e0!3m2!1sen!2s!4v1234567890"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </div>
        </Container>
      </Section>

      {/* Alternative Contact Methods */}
      <Section className="bg-gradient-to-r from-secondary to-accent">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white max-w-3xl mx-auto"
          >
            <h2 className="heading-md text-white mb-6">Prefer to Reach Us Directly?</h2>
            <p className="body-lg opacity-90 mb-8">
              We're available via phone and WhatsApp during business hours. We'll respond to all inquiries promptly.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a href="tel:03458979767">
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  <FiPhone size={18} /> Call: 0345-8979767
                </Button>
              </a>
              <a
                href={`https://wa.me/923458979767?text=Hello%20HUBAIB%20SPORTS%20AND%20STATIONARY%20SHOP!%20I%20would%20like%20to%20inquire%20about%20your%20products%20and%20services.`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="primary" className="bg-white text-secondary hover:bg-gray-100">
                  <FiMessageCircle size={18} /> WhatsApp Chat
                </Button>
              </a>
            </div>
          </motion.div>
        </Container>
      </Section>
    </>
  );
}
