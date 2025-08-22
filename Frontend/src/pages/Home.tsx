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
import { mockNotices, mockBusinesses, leadershipMessages } from "../data/mockData"
import { mockAdvertisements } from "../data/mockData"

const Home: React.FC = () => {

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
                <Card className="h-full shadow-xl border-0 bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 rounded-full overflow-hidden mr-4 ring-4 ring-primary/20">
                      <img
                        src={leader.image || "/placeholder.svg"}
                        alt={leader.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{leader.title}</h3>
                      <p className="text-primary font-medium">{leader.name}</p>
                      <p className="text-muted-foreground text-sm">{leader.position}</p>
                    </div>
                  </div>
                  <blockquote className="text-card-foreground leading-relaxed italic">"{leader.message}"</blockquote>
                  <div className="mt-6 pt-4 border-t border-border">
                    <p className="text-right text-primary font-semibold">- {leader.name}</p>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockNotices.slice(0, 3).map((notice, index) => (
              <motion.div
                key={notice.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
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
                        {notice.type}
                      </span>
                    </div>
                    {notice.important && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                  </div>
                  <h3 className="text-lg font-semibold mb-3 line-clamp-2">{notice.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{notice.content}</p>
                  <p className="text-xs text-gray-500">{notice.date}</p>
                </Card>
              </motion.div>
            ))}
          </div>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockBusinesses
              .filter((b) => b.featured)
              .map((business, index) => (
                <motion.div
                  key={business.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <Card className="h-full shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-card">
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium">
                        {business.category}
                      </span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm font-medium">{business.rating}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{business.name}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{business.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {business.services.slice(0, 3).map((service) => (
                        <span key={service} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                          {service}
                        </span>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />

      <section className="py-16 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white relative overflow-hidden">
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
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-600 bg-transparent shadow-2xl transform hover:scale-105 transition-all duration-300"
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
