'use client';

import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card = ({ children, className = '', hover = true }: CardProps) => {
  return (
    <div
      className={`bg-white dark:bg-dark-800 rounded-xl shadow-soft ${
        hover ? 'hover:shadow-soft-lg' : ''
      } transition-shadow duration-300 p-6 ${className}`}
    >
      {children}
    </div>
  );
};

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export const Container = ({ children, className = '' }: ContainerProps) => {
  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
  );
};

export const Section = ({ children, className = '' }: ContainerProps) => {
  return <section className={`py-16 md:py-24 ${className}`}>{children}</section>;
};
