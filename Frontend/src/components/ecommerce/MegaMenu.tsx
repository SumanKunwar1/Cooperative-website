import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { mockCategories } from '../../data/mockData';

const MegaMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link
        to="/shop"
        className="flex items-center text-sm font-medium text-gray-700 hover:text-green-600 transition-colors duration-200"
      >
        Shop
        <ChevronDown className="w-4 h-4 ml-1" />
      </Link>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-screen max-w-4xl bg-white shadow-xl rounded-lg border border-gray-200 z-50"
            style={{ left: '-200px' }}
          >
            <div className="p-6">
              <div className="grid grid-cols-4 gap-8">
                {mockCategories.map((category) => (
                  <div key={category.id} className="space-y-4">
                    <Link
                      to={`/shop/category/${category.slug}`}
                      className="block text-lg font-semibold text-gray-900 hover:text-green-600 transition-colors"
                    >
                      {category.name}
                    </Link>
                    <ul className="space-y-2">
                      {category.subcategories.map((subcategory) => (
                        <li key={subcategory.id}>
                          <Link
                            to={`/shop/category/${category.slug}/${subcategory.slug}`}
                            className="text-sm text-gray-600 hover:text-green-600 transition-colors"
                          >
                            {subcategory.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Featured Products</h3>
                    <p className="text-sm text-gray-600">Discover our member businesses' best offerings</p>
                  </div>
                  <Link
                    to="/shop/featured"
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
                  >
                    View All Featured
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MegaMenu;