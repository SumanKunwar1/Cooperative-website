"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Users, Building, Award, TrendingUp } from "lucide-react"

const HeroSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [searchResults, setSearchResults] = useState<{
    businesses: Array<{ id: string; name: string; category: string }>
    services: Array<{ id: string; name: string; provider: string }>
  }>({ businesses: [], services: [] })

  // Mock data for demonstration
  const mockBusinesses = [
    { id: "1", name: "Tech Solutions Inc", category: "Technology" },
    { id: "2", name: "Green Energy Co", category: "Energy" },
    { id: "3", name: "Local Bakery", category: "Food & Beverage" },
    { id: "4", name: "Fitness Center", category: "Health & Wellness" },
  ]

  const mockServices = [
    { id: "1", name: "Business Loans", provider: "Constellation Financial" },
    { id: "2", name: "Investment Advisory", provider: "Constellation Wealth" },
    { id: "3", name: "Insurance Services", provider: "Constellation Insurance" },
    { id: "4", name: "Savings Accounts", provider: "Constellation Banking" },
  ]

  const handleSearch = (query: string) => {
    setSearchQuery(query)

    if (query.trim() === "") {
      setSearchResults({ businesses: [], services: [] })
      return
    }

    // Filter mock data based on search query
    const filteredBusinesses = mockBusinesses.filter(
      (business) =>
        business.name.toLowerCase().includes(query.toLowerCase()) ||
        business.category.toLowerCase().includes(query.toLowerCase()),
    )

    const filteredServices = mockServices.filter(
      (service) =>
        service.name.toLowerCase().includes(query.toLowerCase()) ||
        service.provider.toLowerCase().includes(query.toLowerCase()),
    )

    setSearchResults({
      businesses: filteredBusinesses,
      services: filteredServices,
    })
  }

  return (
    <section className="relative bg-white overflow-hidden">
      {/* Background Video/Image */}
      <div className="absolute inset-0 z-0">
        <div className="h-full w-full object-cover">
          <video
            className="w-full h-full object-cover opacity-80"
            autoPlay
            loop
            muted
            src="/placeholder.svg?height=800&width=1200"
          />
        </div>
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
        <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
          <div className="sm:text-center lg:text-left">
            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl tracking-tight font-bold text-white sm:text-5xl md:text-6xl"
            >
              <span className="block">Your journey to</span>
              <span className="block text-blue-400">financial prosperity</span>
              <span className="block">starts here</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-3 text-base text-white sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
            >
              Connect with local businesses, discover financial services, and join a community that supports your
              economic growth and prosperity.
            </motion.p>

            {/* Search Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-8 sm:mt-12"
            >
              <div className="relative max-w-xl mx-auto lg:mx-0">
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-md border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search businesses, services, opportunities..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                />
                <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
              </div>

              {/* Display Search Results */}
              {(searchResults.businesses.length > 0 || searchResults.services.length > 0) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 bg-white rounded-lg shadow-lg max-w-xl mx-auto lg:mx-0 p-4"
                >
                  {searchResults.businesses.length > 0 && (
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold mb-2 text-gray-800">Businesses</h3>
                      <ul>
                        {searchResults.businesses.map((business) => (
                          <li key={business.id} className="p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                            <div className="block w-full h-full">
                              <span className="font-medium">{business.name}</span> -{" "}
                              <span className="text-gray-600">{business.category}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {searchResults.services.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-gray-800">Services</h3>
                      <ul>
                        {searchResults.services.map((service) => (
                          <li key={service.id} className="p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                            <div className="block w-full h-full">
                              <span className="font-medium">{service.name}</span> -{" "}
                              <span className="text-gray-600">{service.provider}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>

            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto lg:mx-0"
            >
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Building className="h-6 w-6 text-blue-400" />
                </div>
                <div className="text-2xl font-semibold text-white">500+</div>
                <div className="text-sm text-gray-300">Businesses</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-6 w-6 text-blue-400" />
                </div>
                <div className="text-2xl font-semibold text-white">10K+</div>
                <div className="text-sm text-gray-300">Members</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Award className="h-6 w-6 text-blue-400" />
                </div>
                <div className="text-2xl font-semibold text-white">50+</div>
                <div className="text-sm text-gray-300">Services</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="h-6 w-6 text-blue-400" />
                </div>
                <div className="text-2xl font-semibold text-white">$2M+</div>
                <div className="text-sm text-gray-300">Loans Funded</div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-8 flex flex-col sm:flex-row gap-4 max-w-xl mx-auto lg:mx-0"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300"
              >
                Join Our Community
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black transition-all duration-300"
              >
                Explore Services
              </motion.button>
            </motion.div>
          </div>
        </main>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-white rounded-full mt-2"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
        </div>
      </motion.div>
    </section>
  )
}

export default HeroSection
