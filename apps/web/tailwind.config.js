import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0D6EFD',
        secondary: '#198754',
        accent: '#FF6B00',
        background: '#F8F9FA',
        text: '#212529',
      },
    },
  },
  plugins: [],
};
export default config;
