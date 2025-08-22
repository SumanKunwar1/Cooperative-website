"use client"

import type React from "react"
import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Building2 } from "lucide-react"
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
  UserIcon,
  ShoppingBagIcon,
  UsersIcon,
  BellIcon,
} from "@heroicons/react/24/outline"
import { shopCategories } from "../../data/shop"

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isShopOpen, setIsShopOpen] = useState(false)
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
  const [isMobileShopOpen, setIsMobileShopOpen] = useState(false)
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<string | null>(null)

  const navigate = useNavigate()
  const location = useLocation()

  const closeMobileMenu = () => {
    setIsMenuOpen(false)
    setIsMobileShopOpen(false)
    setExpandedMobileCategory(null)
  }

  const isOnShopPage = location.pathname === "/shop"

  const handleCategoryNavigation = (categorySlug: string, subcategorySlug?: string) => {
    if (isOnShopPage) {
      // If already on shop page, just trigger a custom event to update filters
      // without changing the URL
      const event = new CustomEvent('shopFilterChange', {
        detail: {
          category: categorySlug,
          subcategory: subcategorySlug || ""
        }
      })
      window.dispatchEvent(event)
    } else {
      // If not on shop page, navigate with URL params
      const url = subcategorySlug
        ? `/shop?category=${categorySlug}&subcategory=${subcategorySlug}`
        : `/shop?category=${categorySlug}`
      navigate(url, { replace: false })
    }

    // Close the dropdown
    setIsShopOpen(false)
    setHoveredCategory(null)
  }

  const handleMobileCategoryNavigation = (categorySlug: string, subcategorySlug?: string) => {
    if (isOnShopPage) {
      // If already on shop page, trigger filter change event
      const event = new CustomEvent('shopFilterChange', {
        detail: {
          category: categorySlug,
          subcategory: subcategorySlug || ""
        }
      })
      window.dispatchEvent(event)
    } else {
      // If not on shop page, navigate with URL params
      const url = subcategorySlug
        ? `/shop?category=${categorySlug}&subcategory=${subcategorySlug}`
        : `/shop?category=${categorySlug}`
      navigate(url, { replace: false })
    }

    // Close all mobile menus
    setIsMobileShopOpen(false)
    setExpandedMobileCategory(null)
    setIsMenuOpen(false)
  }

  // Handle "View All Products" navigation
  const handleViewAllProducts = () => {
    if (isOnShopPage) {
      // If already on shop page, clear filters without changing URL
      const event = new CustomEvent('shopFilterChange', {
        detail: {
          category: "",
          subcategory: ""
        }
      })
      window.dispatchEvent(event)
    } else {
      // If not on shop page, navigate to shop
      navigate("/shop", { replace: false })
    }

    setIsShopOpen(false)
    setHoveredCategory(null)
  }

  // Handle mobile "View All Products" navigation
  const handleMobileViewAllProducts = () => {
    if (isOnShopPage) {
      // If already on shop page, clear filters without changing URL
      const event = new CustomEvent('shopFilterChange', {
        detail: {
          category: "",
          subcategory: ""
        }
      })
      window.dispatchEvent(event)
    } else {
      // If not on shop page, navigate to shop
      navigate("/shop", { replace: false })
    }

    setIsMobileShopOpen(false)
    setExpandedMobileCategory(null)
    setIsMenuOpen(false)
  }

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24 px-2">
          <motion.div
            className="flex items-center mr-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Link to="/" className="block">
              <motion.img
                src="https://res.cloudinary.com/dcsgax3ld/image/upload/v1755759270/299574930_451468846995643_7716478953910668088_n_vndizu.jpg"
                alt="Constellation Saving & Credit Cooperative"
                className="h-20 w-20 rounded-full object-cover shadow-lg border-3 border-primary-200"
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  borderColor: "rgb(59 130 246)",
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                animate={{
                  boxShadow: [
                    "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                    "0 20px 25px -5px rgba(59, 130, 246, 0.1)",
                    "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  ],
                }}
                style={{
                  animationDuration: "4s",
                  animationIterationCount: "infinite",
                }}
              />
            </Link>
          </motion.div>

          <nav className="hidden xl:flex items-center space-x-6">
            <Link
              to="/"
              className="text-gray-700 hover:text-primary-600 transition-colors duration-200 font-medium text-sm px-2 py-1 rounded-md hover:bg-primary-50"
            >
              Home
            </Link>

            <Link
              to="/about"
              className="text-gray-700 hover:text-primary-600 transition-colors duration-200 font-medium text-sm px-2 py-1 rounded-md hover:bg-primary-50"
            >
              About Us
            </Link>

            <Link
              to="/services"
              className="text-gray-700 hover:text-primary-600 transition-colors duration-200 font-medium text-sm px-2 py-1 rounded-md hover:bg-primary-50"
            >
              Services
            </Link>

            <div
              className="relative"
              onMouseEnter={() => setIsShopOpen(true)}
              onMouseLeave={() => {
                setIsShopOpen(false)
                setHoveredCategory(null)
              }}
            >
              <button className="flex items-center text-gray-700 hover:text-primary-600 transition-colors duration-200 font-medium text-sm px-2 py-1 rounded-md hover:bg-primary-50">
                <ShoppingBagIcon className="h-3 w-3 mr-1" />
                Shop
                <ChevronDownIcon className="ml-1 h-3 w-3" />
              </button>

              <AnimatePresence>
                {isShopOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 z-50"
                    style={{
                      width: "800px",
                      maxWidth: "calc(100vw - 2rem)",
                    }}
                  >
                    <div className="flex">
                      <div className="w-1/3 border-r border-gray-100 p-4">
                        <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wide mb-4 px-3">
                          Categories
                          {isOnShopPage && (
                            <span className="text-xs text-blue-600 font-normal ml-2">(Filters only)</span>
                          )}
                        </h3>
                        <div className="space-y-1">
                          {shopCategories.map((category) => (
                            <div
                              key={category.id}
                              onMouseEnter={() => setHoveredCategory(category.name)}
                              className="relative"
                            >
                              <button
                                onClick={() => handleCategoryNavigation(category.slug)}
                                className={`flex items-center justify-between w-full text-left px-3 py-3 rounded-lg text-sm font-medium transition-colors duration-150 ${
                                  hoveredCategory === category.name
                                    ? "bg-primary-50 text-primary-700"
                                    : "text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                                }`}
                              >
                                {category.name}
                                <ChevronDownIcon className="h-4 w-4 rotate-[-90deg]" />
                              </button>
                            </div>
                          ))}
                        </div>

                        <div className="mt-6 pt-4 border-t border-gray-100">
                          <button
                            onClick={handleViewAllProducts}
                            className="block w-full text-center bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 font-medium text-sm transition-colors duration-200"
                          >
                            {isOnShopPage ? "Show All Products" : "View All Products"}
                          </button>
                        </div>
                      </div>

                      <div className="w-2/3 p-4">
                        {hoveredCategory ? (
                          <motion.div
                            key={hoveredCategory}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <h4 className="font-bold text-primary-700 text-base mb-4 px-3">{hoveredCategory}</h4>
                            <div className="grid grid-cols-2 gap-2">
                              {shopCategories
                                .find((cat) => cat.name === hoveredCategory)
                                ?.subcategories.map((subcategory) => (
                                  <button
                                    key={subcategory.id}
                                    onClick={() =>
                                      handleCategoryNavigation(
                                        shopCategories.find((cat) => cat.name === hoveredCategory)?.slug || "",
                                        subcategory.slug,
                                      )
                                    }
                                    className="block text-left text-sm text-gray-600 hover:text-primary-600 hover:bg-primary-50 px-3 py-2 rounded-md transition-colors duration-150"
                                  >
                                    {subcategory.name}
                                  </button>
                                ))}
                            </div>
                          </motion.div>
                        ) : (
                          <div className="flex items-center justify-center h-full text-gray-500">
                            <div className="text-center">
                              <ShoppingBagIcon className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                              <p className="text-sm">
                                {isOnShopPage 
                                  ? "Hover over a category to filter products" 
                                  : "Hover over a category to see subcategories"
                                }
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              to="/shareholders"
              className="flex items-center text-gray-700 hover:text-primary-600 transition-colors duration-200 font-medium text-sm px-2 py-1 rounded-md hover:bg-primary-50"
            >
              <UsersIcon className="h-3 w-3 mr-1" />
              Shareholders
            </Link>

            <Link
              to="/membership"
              className="flex items-center text-gray-700 hover:text-primary-600 transition-colors duration-200 font-medium text-sm px-2 py-1 rounded-md hover:bg-primary-50"
            >
              <UsersIcon className="h-3 w-3 mr-1" />
              Membership
            </Link>
            <Link
              to="/business-directory"
              className="flex items-center text-gray-700 hover:text-primary-600 transition-colors duration-200 font-medium px-3 py-2 rounded-md hover:bg-primary-50 text-sm"
            >
              <Building2 className="h-3 w-3 mr-1" />
              Businesses
            </Link>

            <Link
              to="/notice"
              className="flex items-center text-gray-700 hover:text-primary-600 transition-colors duration-200 font-medium text-sm px-2 py-1 rounded-md hover:bg-primary-50"
            >
              <BellIcon className="h-3 w-3 mr-1" />
              Notices
            </Link>
          </nav>

          <div className="hidden xl:flex items-center space-x-3 flex-shrink-0">
            <Link
              to="/login"
              className="flex items-center text-gray-700 hover:text-primary-600 transition-colors duration-200 font-medium px-3 py-2 rounded-md hover:bg-primary-50 text-sm"
            >
              <UserIcon className="h-3 w-3 mr-1" />
              Login
            </Link>

            <Link
              to="/register"
              className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg text-sm whitespace-nowrap"
            >
              Register
            </Link>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="xl:hidden p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100 transition-colors duration-200"
          >
            {isMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="xl:hidden border-t border-gray-200 py-6"
            >
              <div className="flex flex-col space-y-4">
                <Link
                  to="/"
                  onClick={closeMobileMenu}
                  className="text-gray-700 hover:text-primary-600 font-medium text-base py-2 px-2 rounded-md hover:bg-primary-50 transition-colors duration-200"
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  onClick={closeMobileMenu}
                  className="text-gray-700 hover:text-primary-600 font-medium text-base py-2 px-2 rounded-md hover:bg-primary-50 transition-colors duration-200"
                >
                  About
                </Link>

                <Link
                  to="/services"
                  onClick={closeMobileMenu}
                  className="text-gray-700 hover:text-primary-600 font-medium text-base py-2 px-2 rounded-md hover:bg-primary-50 transition-colors duration-200"
                >
                  Services
                </Link>

                <div className="space-y-2">
                  <button
                    onClick={() => setIsMobileShopOpen(!isMobileShopOpen)}
                    className="flex items-center justify-between w-full text-gray-700 hover:text-primary-600 font-medium text-base py-2 px-2 rounded-md hover:bg-primary-50 transition-colors duration-200"
                  >
                    <div className="flex items-center">
                      <ShoppingBagIcon className="h-4 w-4 mr-2" />
                      Shop {isOnShopPage && <span className="text-xs text-blue-600 ml-1">(Filter)</span>}
                    </div>
                    <ChevronDownIcon
                      className={`h-4 w-4 transition-transform duration-200 ${isMobileShopOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  <AnimatePresence>
                    {isMobileShopOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="ml-4 space-y-2 overflow-hidden"
                      >
                        <button
                          onClick={handleMobileViewAllProducts}
                          className="block w-full text-left text-primary-600 hover:text-primary-700 font-medium text-sm py-2 px-3 rounded-md hover:bg-primary-50 transition-colors duration-200 border border-primary-200"
                        >
                          {isOnShopPage ? "Show All Products" : "View All Products"}
                        </button>

                        {shopCategories.map((category) => (
                          <div key={category.id} className="space-y-1">
                            <button
                              onClick={() =>
                                setExpandedMobileCategory(
                                  expandedMobileCategory === category.name ? null : category.name,
                                )
                              }
                              className="flex items-center justify-between w-full text-gray-600 hover:text-primary-600 text-sm py-2 px-3 rounded-md hover:bg-primary-50 transition-colors duration-200"
                            >
                              {category.name}
                              <ChevronDownIcon
                                className={`h-3 w-3 transition-transform duration-200 ${expandedMobileCategory === category.name ? "rotate-180" : ""}`}
                              />
                            </button>

                            <AnimatePresence>
                              {expandedMobileCategory === category.name && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="ml-4 space-y-1 overflow-hidden"
                                >
                                  <button
                                    onClick={() => handleMobileCategoryNavigation(category.slug)}
                                    className="block w-full text-left text-primary-600 hover:text-primary-700 font-medium text-xs py-1 px-2 rounded-md hover:bg-primary-50 transition-colors duration-200"
                                  >
                                    {isOnShopPage ? `Filter ${category.name}` : `View All ${category.name}`}
                                  </button>

                                  {category.subcategories.map((subcategory) => (
                                    <button
                                      key={subcategory.id}
                                      onClick={() => handleMobileCategoryNavigation(category.slug, subcategory.slug)}
                                      className="block w-full text-left text-gray-500 hover:text-primary-600 text-xs py-1 px-2 rounded-md hover:bg-primary-50 transition-colors duration-200"
                                    >
                                      {subcategory.name}
                                    </button>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link
                  to="/shareholders"
                  onClick={closeMobileMenu}
                  className="text-gray-700 hover:text-primary-600 font-medium text-base py-2 px-2 rounded-md hover:bg-primary-50 transition-colors duration-200"
                >
                  Shareholders
                </Link>
                <Link
                  to="/membership"
                  onClick={closeMobileMenu}
                  className="text-gray-700 hover:text-primary-600 font-medium text-base py-2 px-2 rounded-md hover:bg-primary-50 transition-colors duration-200"
                >
                  Membership
                </Link>
                <Link
                  to="/business-directories"
                  onClick={closeMobileMenu}
                  className="text-gray-700 hover:text-primary-600 font-medium text-base py-2 px-2 rounded-md hover:bg-primary-50 transition-colors duration-200"
                >
                  Businesses
                </Link>
                <Link
                  to="/notice"
                  onClick={closeMobileMenu}
                  className="text-gray-700 hover:text-primary-600 font-medium text-base py-2 px-2 rounded-md hover:bg-primary-50 transition-colors duration-200"
                >
                  Notices
                </Link>

                <div className="flex flex-col space-y-3 pt-6 border-t border-gray-200">
                  <Link
                    to="/login"
                    onClick={closeMobileMenu}
                    className="text-gray-700 hover:text-primary-600 font-medium text-base py-2 px-2 rounded-md hover:bg-primary-50 transition-colors duration-200"
                  >
                    Login
                  </Link>
                  <motion.div whileTap={{ scale: 0.95 }}>
                    <Link
                      to="/register"
                      onClick={closeMobileMenu}
                      className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold text-center shadow-md hover:shadow-lg transition-all duration-200"
                    >
                      Register
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}

export default Header