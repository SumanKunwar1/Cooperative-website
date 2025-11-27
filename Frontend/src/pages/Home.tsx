"use client"

import type React from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowRight, Bell, Star } from "lucide-react"
import SEO from "../components/common/SEO"
import Card from "../components/ui/Card"
import Button from "../components/ui/Button"
import AdBanner from "../components/common/AdBanner"
import HeroSection from "../components/home/HeroSection"
import QuickActionsSection from "../components/home/QuickActionsSection"
import ProductsSection from "../components/home/ProductsSection"
import FeaturesSection from "../components/home/FeaturesSection"
import ContactSection from "../components/home/ContactSection"
import { useState, useEffect } from "react"
import { noticeService } from "../services/noticeService"
import { leadershipMessages } from "../data/mockData"
import { mockAdvertisements } from "../data/mockData"

interface Business {
  _id: string
  name: string
  category: string
  subcategory: string
  description: string
  image: string
  rating: number
  reviews: number
  location: string
  phone: string
  email: string
  website?: string
  services: string[]
  isVerified: boolean
  owner: string
  address: string
  status: string
  createdAt: string
}

const Home: React.FC = () => {
  const [notices, setNotices] = useState<any[]>([])
  const [noticesLoading, setNoticesLoading] = useState(true)
  const [noticesError, setNoticesError] = useState<string | null>(null)

  const [businesses, setBusinesses] = useState<Business[]>([])
  const [businessesLoading, setBusinessesLoading] = useState(true)
  const [businessesError, setBusinessesError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        setNoticesLoading(true)
        setNoticesError(null)
        const fetchedNotices = await noticeService.getAllNotices()
        setNotices(fetchedNotices.slice(0, 3))
      } catch (error) {
        console.error("Error fetching notices:", error)
        setNoticesError("Failed to load notices")
        setNotices([]) // Fallback to empty array
      } finally {
        setNoticesLoading(false)
      }
    }

    fetchNotices()
  }, [])

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        setBusinessesLoading(true)
        setBusinessesError(null)
        // Use the same API endpoint as BusinessDirectory
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/business-details/directory`)

        if (!response.ok) {
          throw new Error("Failed to fetch businesses")
        }

        const data = await response.json()
        if (data.success) {
          console.log("[Home] Businesses data received:", data.data)
          // Filter only active businesses like in BusinessDirectory
          const activeBusinesses = data.data.filter((business: Business) => business.status === "active")
          console.log("[Home] Active businesses filtered:", activeBusinesses)
          // Get latest 3 businesses sorted by creation date
          const sortedBusinesses = activeBusinesses.sort(
            (a: Business, b: Business) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          )
          setBusinesses(sortedBusinesses.slice(0, 3))
        } else {
          throw new Error(data.message || "Failed to fetch businesses")
        }
      } catch (error) {
        console.error("Error fetching businesses:", error)
        setBusinessesError("Failed to load businesses")
        setBusinesses([])
      } finally {
        setBusinessesLoading(false)
      }
    }

    fetchBusinesses()
  }, [])

  const handleNoticeClick = (notice: any) => {
    if (notice.documentUrl) {
      window.open(notice.documentUrl, "_blank")
    }
  }

  const createBusinessSlug = (name: string): string => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
      .trim()
  }

  const getDocumentIcon = (type?: string) => {
    switch (type) {
      case "pdf":
        return "📄"
      case "doc":
      case "docx":
        return "📝"
      case "jpg":
      case "png":
        return "🖼️"
      default:
        return "📎"
    }
  }

  return (
    <div className="min-h-screen">
      <SEO />

      {/* Hero Section */}
      <HeroSection />

      {/* Quick Actions */}
      <QuickActionsSection />

      {/* Leadership Messages */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Leadership Messages</h2>
            <p className="text-muted-foreground text-lg">Inspiring words from our esteemed leaders</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {leadershipMessages.map((leader, index) => (
              <motion.div
                key={leader.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <Card className="h-full shadow-xl border-0 bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  {/* Header with centered image */}
                  <div className="flex flex-col items-center text-center mb-6 pb-6 border-b border-border">
                    <div className="w-24 h-24 rounded-full overflow-hidden mb-4 ring-4 ring-primary/20 shadow-lg">
                      <img
                        src={leader.image || "/placeholder.svg"}
                        alt={leader.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-2xl font-bold text-foreground">{leader.name}</h3>
                      <p className="text-primary font-semibold text-lg">{leader.position}</p>
                      <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                        {leader.title}
                      </div>
                    </div>
                  </div>

                  {/* Message content */}
                  <div className="px-2">
                    <blockquote className="text-card-foreground leading-relaxed text-base italic relative">
                      <div className="absolute -top-2 -left-2 text-4xl text-primary/20 font-serif">"</div>
                      <div className="relative z-10 pl-6">{leader.message}</div>
                      <div className="absolute -bottom-4 -right-2 text-4xl text-primary/20 font-serif transform rotate-180">
                        "
                      </div>
                    </blockquote>

                    <div className="mt-8 pt-4 border-t border-border">
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-8 h-0.5 bg-primary"></div>
                        <p className="text-primary font-bold text-sm tracking-wider">{leader.name}</p>
                        <div className="w-8 h-0.5 bg-primary"></div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Features Section */}
      <FeaturesSection />

      {/* Products Section */}
      <ProductsSection />

      {/* Advertisement Section */}
      <section className="py-8 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockAdvertisements
              .filter((ad) => ad.position === "between-sections" && ad.active)
              .slice(0, 3)
              .map((ad, index) => (
                <motion.div
                  key={ad.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <AdBanner ad={ad} />
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* Latest Notices */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Latest Notices</h2>
              <p className="text-muted-foreground">Stay updated with important announcements</p>
            </div>
            <Link to="/notices">
              <Button
                icon={ArrowRight}
                iconPosition="right"
                className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                View All Notices
              </Button>
            </Link>
          </div>

          {noticesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <Card className="h-48 bg-gray-200" children={undefined}></Card>
                </div>
              ))}
            </div>
          ) : noticesError ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">{noticesError}</p>
            </div>
          ) : notices.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No notices available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {notices.map((notice, index) => (
                <motion.div
                  key={notice._id || notice.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="cursor-pointer" onClick={() => handleNoticeClick(notice)}>
                    <Card className="h-full shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-card">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <Bell className="w-5 h-5 text-primary mr-2" />
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              notice.type === "announcement"
                                ? "bg-primary-100 text-primary-800"
                                : notice.type === "circular"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {notice.type || "notice"}
                          </span>
                        </div>
                        {notice.important && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                      </div>
                      <h3 className="text-lg font-semibold mb-3 line-clamp-2">{notice.title}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{notice.content}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-500">
                          {notice.createdAt ? new Date(notice.createdAt).toLocaleDateString() : notice.date}
                        </p>
                        {notice.documentUrl && (
                          <div className="flex items-center gap-1 text-green-600 hover:text-green-800">
                            <span className="text-lg">{getDocumentIcon(notice.documentType)}</span>
                            <span className="text-xs font-medium">View Document</span>
                          </div>
                        )}
                      </div>
                    </Card>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Businesses */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Featured Businesses</h2>
              <p className="text-muted-foreground">Discover local businesses in our directory</p>
            </div>
            <Link to="/business-directory">
              <Button
                icon={ArrowRight}
                iconPosition="right"
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                View Directory
              </Button>
            </Link>
          </div>

          {businessesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <Card className="h-64 bg-gray-200" children={undefined}></Card>
                </div>
              ))}
            </div>
          ) : businessesError ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">{businessesError}</p>
            </div>
          ) : businesses.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No businesses available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {businesses.map((business, index) => (
                <motion.div
                  key={business._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <Link
                    to={`/business-directory/${createBusinessSlug(business.name)}`}
                    state={{ business }}
                    className="block"
                  >
                    <Card className="h-full shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-card cursor-pointer">
                      <div className="flex items-center justify-between mb-4">
                        <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium">
                          {business.category}
                        </span>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="ml-1 text-sm font-medium">{business.rating}</span>
                          <span className="ml-1 text-xs text-gray-500">({business.reviews})</span>
                        </div>
                      </div>
                      {business.isVerified && (
                        <div className="mb-2">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                            ✓ Verified
                          </span>
                        </div>
                      )}
                      <h3 className="text-xl font-semibold mb-3">{business.name}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{business.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {business.services.slice(0, 3).map((service, serviceIndex) => (
                          <span key={serviceIndex} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                            {service}
                          </span>
                        ))}
                        {business.services.length > 3 && (
                          <span className="px-2 py-1 bg-gray-200 text-gray-600 rounded text-xs">
                            +{business.services.length - 3} more
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-600">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                        <span className="text-xs text-green-600 font-medium">View Details →</span>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />

      <section className="py-16 bg-gradient-to-r from-green-600 via-organge-600 to-gold-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Join Our Community?</h2>
            <p className="text-xl mb-8 opacity-90">
              Become a member today and start your journey towards financial prosperity with Constellation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/membership">
                <Button
                  size="lg"
                  className="bg-yellow-500 text-black font-semibold hover:bg-yellow-400 shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  Learn About Membership
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-green-600 bg-transparent shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home