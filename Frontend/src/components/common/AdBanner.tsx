import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Advertisement } from '../../types';

interface AdBannerProps {
  ad: Advertisement;
  onClose?: () => void;
  className?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ ad, onClose, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative bg-gradient-to-r from-green-50 to-white rounded-lg overflow-hidden shadow-md border border-green-100 ${className}`}
    >
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-2 right-2 z-10 p-1 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
        >
          <X className="w-4 h-4 text-gray-600" />
        </button>
      )}
      
      <a href={ad.link} className="block">
        <div className="relative">
          <img
            src={ad.image}
            alt={ad.title}
            className="w-full h-32 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="font-semibold text-lg">{ad.title}</h3>
            <p className="text-sm opacity-90">Click to learn more</p>
          </div>
        </div>
      </a>
    </motion.div>
  );
};

export default AdBanner;