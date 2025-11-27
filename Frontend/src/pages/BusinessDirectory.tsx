"use client"

import type React from "react"
import { useState, useMemo, useEffect } from "react"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import type { Business } from "../types/adminBusiness"

interface BusinessDirectoryProps {
  businesses?: Business[]
}

const categories = [
  "All Categories",
  "Technology",
  "Food & Beverage",
  "Hospitality",
  "Home Services",
  "Retail",
  "Healthcare",
  "Education",
  "Others",
]

const createBusinessSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .trim()
}

const BusinessDirectory: React.FC<BusinessDirectoryProps> = ({ businesses: initialBusinesses }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [sortBy, setSortBy] = useState("name")
  const [currentPage, setCurrentPage] = useState(1)
  const [businesses, setBusinesses] = useState<Business[]>(initialBusinesses || [])
  const [loading, setLoading] = useState(!initialBusinesses)
  const [error, setError] = useState<string | null>(null)
  const businessesPerPage = 15

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"

  // Validate environment variable
  useEffect(() => {
    if (!import.meta.env.VITE_API_URL) {
      console.warn("VITE_API_URL environment variable is not set. Using default: http://localhost:5000")
    }
  }, [])

  // Fetch businesses from API
  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const apiUrl = `${API_BASE_URL}/api/business-details/directory`
        console.log("Fetching businesses from:", apiUrl)
        
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        // First check if response is ok
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        // Check content type
        const contentType = response.headers.get('content-type')
        if (!contentType || !contentType.includes('application/json')) {
          const text = await response.text()
          console.error("Received non-JSON response. First 200 chars:", text.substring(0, 200))
          throw new Error("Server returned non-JSON response. Please check if the backend server is running correctly.")
        }

        const data = await response.json()
        
        if (data.success) {
          console.log("Businesses data received:", data.data)
          const activeBusinesses = data.data.filter((business: Business) => business.status === "active")
          console.log("Active businesses filtered:", activeBusinesses)
          setBusinesses(activeBusinesses)
        } else {
          throw new Error(data.message || "Failed to fetch businesses")
        }
      } catch (err) {
        console.error("Error fetching businesses:", err)
        const errorMessage = err instanceof Error ? err.message : "An error occurred while fetching businesses"
        setError(errorMessage)
        
        // Fallback to initial businesses if available
        if (initialBusinesses && initialBusinesses.length > 0) {
          console.log("Using initial businesses as fallback")
          setBusinesses(initialBusinesses)
          setError(null)
        }
      } finally {
        setLoading(false)
      }
    }

    if (!initialBusinesses || initialBusinesses.length === 0) {
      fetchBusinesses()
    } else {
      console.log("Using provided initial businesses")
      setBusinesses(initialBusinesses)
      setLoading(false)
    }
  }, [initialBusinesses])

  const filteredBusinesses = useMemo(() => {
    const filtered = businesses.filter((business) => {
      const matchesSearch =
        business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        business.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        business.services.some((service) => service.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesCategory = selectedCategory === "All Categories" || business.category === selectedCategory

      return matchesSearch && matchesCategory
    })

    // Sort businesses
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating
        case "reviews":
          return b.reviews - a.reviews
        case "name":
        default:
          return a.name.localeCompare(b.name)
      }
    })

    return filtered
  }, [searchTerm, selectedCategory, sortBy, businesses])

  const totalPages = Math.ceil(filteredBusinesses.length / businessesPerPage)
  const startIndex = (currentPage - 1) * businessesPerPage
  const endIndex = startIndex + businessesPerPage
  const currentBusinesses = filteredBusinesses.slice(startIndex, endIndex)

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedCategory, sortBy])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading businesses...</p>
        </div>
      </div>
    )
  }

  if (error && businesses.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-500 text-xl mb-4">Error Loading Businesses</div>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="space-y-3">
            <button
              onClick={() => window.location.reload()}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Try Again
            </button>
            <p className="text-sm text-gray-500">
              Make sure your backend server is running on http://localhost:5000
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>Business Directory - Constellation Saving & Credit Cooperative</title>
        <meta
          name="description"
          content="Discover trusted businesses in our cooperative network. Find IT services, restaurants, hotels, and more from verified member businesses."
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Business Directory</h1>
              <p className="text-xl md:text-2xl mb-8 text-green-100">
                Discover trusted businesses in our cooperative network
              </p>
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search businesses, services, or categories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-6 py-4 text-gray-900 rounded-lg text-lg focus:outline-none focus:ring-4 focus:ring-green-300"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Error Banner - Only show if there's an error but we have businesses to display */}
        {error && businesses.length > 0 && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    {error} Showing cached businesses.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Register Your Business Section */}
        <div className="bg-white border-b-2 border-green-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 text-center">
              <h2 className="text-2xl font-bold text-green-900 mb-3">Register Your Business</h2>
              <p className="text-green-700 mb-4">
                Join our cooperative network and connect with thousands of potential customers
              </p>
              <Link
                to="/register"
                className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200"
              >
                Register Now
              </Link>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="name">Name (A-Z)</option>
                    <option value="rating">Highest Rated</option>
                    <option value="reviews">Most Reviews</option>
                  </select>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                Showing {startIndex + 1}-{Math.min(endIndex, filteredBusinesses.length)} of {filteredBusinesses.length}{" "}
                businesses
              </div>
            </div>
          </div>
        </div>

        {/* Business Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {filteredBusinesses.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No businesses found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentBusinesses.map((business) => (
                  <div
                    key={business._id}
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                  >
                    <div className="relative">
                      <img
                        src={business.image || "/placeholder.svg"}
                        alt={business.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg"
                        }}
                      />
                      {business.isVerified && (
                        <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Verified
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1">{business.name}</h3>
                          <p className="text-sm text-green-600 font-medium">{business.subcategory}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-sm font-medium text-gray-700">{business.rating}</span>
                          <span className="text-sm text-gray-500">({business.reviews})</span>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4 line-clamp-2">{business.description}</p>

                      <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        {business.location}
                      </div>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {business.services.slice(0, 3).map((service, index) => (
                          <span key={index} className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full">
                            {service}
                          </span>
                        ))}
                        {business.services.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            +{business.services.length - 3} more
                          </span>
                        )}
                      </div>

                      <Link
                        to={`/business-directory/${createBusinessSlug(business.name)}`}
                        state={{ business }}
                        className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200 text-center block"
                      >
                        View Details & Book
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center mt-12 gap-2">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 rounded-lg ${
                        currentPage === page
                          ? "bg-green-600 text-white"
                          : "border border-gray-300 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Want to List Your Business?</h2>
            <p className="text-xl mb-8 text-green-100">
              Join our cooperative network and connect with thousands of potential customers
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/business-registration"
                className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
              >
                Register Your Business
              </Link>
              <Link
                to="/contact"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors duration-200"
              >
                Contact Us: 01-4254939
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BusinessDirectory