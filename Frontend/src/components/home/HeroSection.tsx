"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, Users, Building, Award, TrendingUp } from "lucide-react"
import { useTranslation } from "react-i18next"
import { heroAPI, type HeroContent } from "../../lib/heroApi"

const HeroSection: React.FC = () => {
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [, setSearchResults] = useState<{
    businesses: Array<{ id: string; name: string; category: string }>
    services: Array<{ id: string; name: string; provider: string }>
  }>({ businesses: [], services: [] })

  const [heroContent, setHeroContent] = useState<HeroContent | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchHeroContent = async () => {
      try {
        const content = await heroAPI.getActiveHeroContent()
        setHeroContent(content)
      } catch (error) {
        console.error("Failed to fetch hero content:", error)
        setHeroContent({
          title: {
            line1: t("hero-title-line1"),
            line2: t("hero-title-line2"),
            line3: t("hero-title-line3"),
          },
          description: t("hero-description"),
          backgroundMedia: [],
          currentMediaIndex: 0,
          searchPlaceholder: t("hero-search-placeholder"),
          statistics: {
            businesses: { count: "500+", label: t("hero-stat-businesses") },
            members: { count: "10K+", label: t("hero-stat-members") },
            services: { count: "50+", label: t("hero-stat-services") },
            loans: { count: "$2M+", label: t("hero-stat-loans") },
          },
          ctaButtons: {
            primary: { text: t("hero-cta-primary"), action: "/join" },
            secondary: { text: t("hero-cta-secondary"), action: "/services" },
          },
          isActive: true,
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchHeroContent()
  }, [t])

  const handleSearch = (query: string) => {
    setSearchQuery(query)

    if (query.trim() === "") {
      setSearchResults({ businesses: [], services: [] })
      return
    }

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

  if (isLoading || !heroContent) {
    return (
      <section className="relative bg-white overflow-hidden min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading hero content...</p>
        </div>
      </section>
    )
  }

  const currentMedia = heroContent.backgroundMedia[heroContent.currentMediaIndex]

  return (
    <section className="relative bg-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="h-full w-full object-cover">
          {currentMedia ? (
            currentMedia.type === "video" ? (
              <video
                className="w-full h-full object-cover opacity-90"
                autoPlay
                loop
                muted
                src={currentMedia.url}
              />
            ) : (
              <img
                className="w-full h-full object-cover opacity-90"
                src={currentMedia.url || "/placeholder.svg"}
                alt={currentMedia.alt}
              />
            )
          ) : (
            <video
              className="w-full h-full object-cover opacity-90"
              autoPlay
              loop
              muted
              src="/placeholder.svg?height=800&width=1200"
            />
          )}
        </div>

        {/* LIGHT OVERLAY for visibility */}
        <div className="absolute inset-0 bg-black opacity-20"></div>
      </div>

      <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
        <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
          <div className="sm:text-center lg:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl tracking-tight font-bold text-white sm:text-5xl md:text-6xl"
            >
              <span className="block">{t("hero-title-line1")}</span>
              <span className="block text-blue-500">{t("hero-title-line2")}</span>
              <span className="block">{t("hero-title-line3")}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-3 text-base text-white sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
            >
              {t("hero-description")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-8 sm:mt-12"
            >
              <div className="relative max-w-xl mx-auto lg:mx-0">
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-md border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-700"
                  placeholder={t("hero-search-placeholder")}
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                />
                <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto lg:mx-0"
            >
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Building className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-2xl font-semibold text-white">500+</div>
                <div className="text-sm text-gray-300">{t("hero-stat-businesses")}</div>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-2xl font-semibold text-white">10K+</div>
                <div className="text-sm text-gray-300">{t("hero-stat-members")}</div>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Award className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-2xl font-semibold text-white">50+</div>
                <div className="text-sm text-gray-300">{t("hero-stat-services")}</div>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-2xl font-semibold text-white">$2M+</div>
                <div className="text-sm text-gray-300">{t("hero-stat-loans")}</div>
              </div>
            </motion.div>

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
                onClick={() => (window.location.href = "/join")}
              >
                {t("hero-cta-primary")}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black transition-all duration-300"
                onClick={() => (window.location.href = "/services")}
              >
                {t("hero-cta-secondary")}
              </motion.button>
            </motion.div>
          </div>
        </main>
      </div>

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
