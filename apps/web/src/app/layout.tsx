import { Metadata } from 'next';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import '@/globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Elite Sports Store - Premium Sports Equipment & Stationery',
  description:
    'Shop high-quality sports equipment, stationery, and professional printing services. Premium products at competitive prices.',
  keywords: 'sports equipment, stationery, printing services, online shop',
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  authors: [{ name: 'Elite Sports' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://elitesports.com',
    title: 'Elite Sports Store',
    description: 'Premium Sports Equipment & Stationery',
    images: [{ url: 'https://elitesports.com/og-image.jpg' }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-background dark:bg-dark-900 text-text dark:text-dark-50">
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
