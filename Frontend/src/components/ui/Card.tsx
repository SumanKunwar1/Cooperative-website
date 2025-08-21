import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
  background?: 'white' | 'gray' | 'gradient';
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = true,
  padding = 'md',
  background = 'white'
}) => {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const backgroundClasses = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    gradient: 'bg-gradient-to-r from-blue-50 to-white'
  };

  const baseClasses = `rounded-xl shadow-md border border-gray-100 ${backgroundClasses[background]} ${paddingClasses[padding]} ${className}`;

  return (
    <motion.div
      className={baseClasses}
      whileHover={hover ? { y: -4, shadow: '0 10px 25px -3px rgba(0, 0, 0, 0.1)' } : {}}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

export default Card;