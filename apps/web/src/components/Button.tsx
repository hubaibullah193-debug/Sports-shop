'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  onClick,
  className = '',
  type = 'button',
}: ButtonProps) => {
  const baseClass = 'font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2';

  const variantClass = {
    primary: 'bg-primary text-white hover:shadow-lg active:scale-95',
    secondary: 'bg-secondary text-white hover:shadow-lg active:scale-95',
    ghost: 'bg-transparent border-2 border-primary text-primary hover:bg-primary/5',
  };

  const sizeClass = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseClass} ${variantClass[variant]} ${sizeClass[size]} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
    >
      {isLoading && <div className="animate-spin">⏳</div>}
      {children}
    </motion.button>
  );
};
