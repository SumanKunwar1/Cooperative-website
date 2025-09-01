"use client"

import type React from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { MapPinIcon, PhoneIcon, EnvelopeIcon, ClockIcon } from "@heroicons/react/24/outline"

const Footer: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <footer className="bg-gray-900 text-white">
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center space-x-3">
              <img
                src="https://res.cloudinary.com/dcsgax3ld/image/upload/v1755759270/299574930_451468846995643_7716478953910668088_n_vndizu.jpg"
                alt="Constellation Logo"
                className="h-10 w-10 rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg font-bold text-white">Constellation</h3>
                <p className="text-sm text-gray-400">Saving & Credit Cooperative</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Empowering communities through cooperative banking solutions. Building financial stability and prosperity
              together.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/constellationcooperative1/" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                <span className="sr-only">Facebook</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                  Our Services
                </Link>
              </li>
              <li>
                <Link to="/membership" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                  Membership
                </Link>
              </li>
              <li>
                <Link
                  to="/business-directory"
                  className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
                >
                  Business Directory
                </Link>
              </li>
              <li>
                <Link to="/notices" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                  Notices
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/our-team" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                  Our Team
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-conditions"
                  className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                  FAQ
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPinIcon className="h-5 w-5 text-primary-400 mt-0.5 flex-shrink-0" />
                <p className="text-gray-400 text-sm">
                  Civil Trade Center, Sundhara, 
                  <br />
                 Ward No. 11, Kathmandu
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <PhoneIcon className="h-5 w-5 text-primary-400 flex-shrink-0" />
                <p className="text-gray-400 text-sm">+977-1-4441234</p>
              </div>
              <div className="flex items-center space-x-3">
                <EnvelopeIcon className="h-5 w-5 text-primary-400 flex-shrink-0" />
                <p className="text-gray-400 text-sm">info@constellation.coop</p>
              </div>
              <div className="flex items-start space-x-3">
                <ClockIcon className="h-5 w-5 text-primary-400 mt-0.5 flex-shrink-0" />
                <div className="text-gray-400 text-sm">
                  <p>Sun - Fri: 10:00 AM - 5:00 PM</p>
                  <p>Saturday: 10:00 AM - 3:00 PM</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          variants={itemVariants}
          className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-gray-400 text-sm">
            © 2024 Constellation Saving & Credit Cooperative Ltd. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              to="/privacy-policy"
              className="text-gray-400 hover:text-primary-400 text-sm transition-colors duration-200"
            >
              Privacy
            </Link>
            <Link
              to="/terms-conditions"
              className="text-gray-400 hover:text-primary-400 text-sm transition-colors duration-200"
            >
              Terms
            </Link>
            <Link to="/sitemap" className="text-gray-400 hover:text-primary-400 text-sm transition-colors duration-200">
              Sitemap
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  )
}

export default Footer
