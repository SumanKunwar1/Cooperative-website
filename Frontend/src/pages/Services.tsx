// FILE: frontend/src/pages/Services.tsx

"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"
import {
  PiggyBank,
  CreditCard,
  Building2,
  Smartphone,
  Shield,
  Calculator,
  Users,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Star,
  Award,
  Target,
  Clock,
  Briefcase,
  GraduationCap,
  Home,
  Zap,
  Download,
  SmartphoneNfc,
  Loader,
} from "lucide-react"
import SEO from "../components/common/SEO"
import Card from "../components/ui/Card"
import Button from "../components/ui/Button"
import { useTranslation } from "react-i18next"
import { servicesAPI } from "../services/api"

interface ServicesProps {
  onOpenAccount?: (scheme?: string) => void
  onApplyLoan?: (loanType?: string) => void
}

const Services: React.FC<ServicesProps> = ({ onOpenAccount, onApplyLoan }) => {
  const [activeCategory, setActiveCategory] = useState("savings")
  const [expandedScheme, setExpandedScheme] = useState<string | null>(null)
  const [selectedLoanTerm, setSelectedLoanTerm] = useState("1 Year")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // State for API data
  const [savingSchemes, setSavingSchemes] = useState<any[]>([])
  const [loanSchemes, setLoanSchemes] = useState<any[]>([])
  const [additionalFacilities, setAdditionalFacilities] = useState<any[]>([])

  const { t } = useTranslation()

  // Icon mapping
  const iconMap: { [key: string]: any } = {
    PiggyBank,
    Star,
    Award,
    Clock,
    Users,
    Briefcase,
    Building2,
    GraduationCap,
    Home,
    Zap,
    Shield,
    CreditCard,
    Smartphone,
    SmartphoneNfc,
    Calculator,
  }

  // Fetch data from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true)
        const response = await servicesAPI.getAllServices(true)

        if (response.success) {
          setSavingSchemes(response.data.savingSchemes || [])
          setLoanSchemes(response.data.loanSchemes || [])
          setAdditionalFacilities(response.data.additionalFacilities || [])
        }
        setError(null)
      } catch (err: any) {
        console.error("Error fetching services:", err)
        setError("Failed to load services. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  const toggleScheme = (schemeId: string) => {
    setExpandedScheme(expandedScheme === schemeId ? null : schemeId)
  }

  const getColorClasses = (color: string) => {
    const colors = {
      green: "from-green-500 to-green-600 bg-green-100 text-green-600 border-green-200",
      purple: "from-purple-500 to-purple-600 bg-purple-100 text-purple-600 border-purple-200",
      orange: "from-orange-500 to-orange-600 bg-orange-100 text-orange-600 border-orange-200",
      red: "from-red-500 to-red-600 bg-red-100 text-red-600 border-red-200",
      indigo: "from-indigo-500 to-indigo-600 bg-indigo-100 text-indigo-600 border-indigo-200",
      blue: "from-blue-500 to-blue-600 bg-blue-100 text-blue-600 border-blue-200",
      yellow: "from-yellow-500 to-yellow-600 bg-yellow-100 text-yellow-600 border-yellow-200",
    }
    return colors[color as keyof typeof colors] || colors.green
  }

  const handleOpenAccountClick = (scheme?: string) => {
    if (onOpenAccount) {
      onOpenAccount(scheme)
    }
  }

  const handleApplyLoanClick = (loanType?: string) => {
    if (onApplyLoan) {
      onApplyLoan(loanType)
    }
  }

  const handlePlayStoreRedirect = () => {
    window.open("https://play.google.com/store/apps/details?id=com.mbnepal.smartbanking_constellation", "_blank")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-green-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading services...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="bg-red-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <span className="text-red-600 text-2xl">⚠</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Services</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()} className="bg-green-600 hover:bg-green-700">
            Retry
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <SEO
        title={`${t("services")} - Constellation Saving and Credit Cooperative Ltd.`}
        description="Explore our comprehensive financial services including saving schemes, competitive loan rates, ATM services, insurance, and community programs designed for your financial growth."
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 to-green-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">{t("services-hero-title")}</h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto mb-8">{t("services-hero-subtitle")}</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="bg-white/20 rounded-full px-4 py-2">{savingSchemes.length} Saving Schemes</div>
              <div className="bg-white/20 rounded-full px-4 py-2">{loanSchemes.length} Loan Types</div>
              <div className="bg-white/20 rounded-full px-4 py-2">{additionalFacilities.length}+ Facilities</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Service Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              { id: "savings", label: t("saving-schemes"), icon: PiggyBank },
              { id: "loans", label: t("loan-services"), icon: CreditCard },
              { id: "facilities", label: t("additional-facilities"), icon: Building2 },
            ].map((category) => {
              const Icon = category.icon
              return (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    activeCategory === category.id
                      ? "bg-green-600 text-white shadow-lg"
                      : "bg-white text-gray-700 hover:bg-green-50"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {category.label}
                </motion.button>
              )
            })}
          </div>

          {/* Content based on active category */}
          <AnimatePresence mode="wait">
            {/* Savings Schemes Section */}
            {activeCategory === "savings" && (
              <motion.div
                key="savings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t("our-saving-schemes")}</h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t("saving-schemes-subtitle")}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {savingSchemes.map((scheme, index) => {
                    const IconComponent = iconMap[scheme.icon] || PiggyBank
                    const colorClasses = getColorClasses(scheme.color)

                    return (
                      <motion.div
                        key={scheme._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="h-full hover:shadow-xl transition-all duration-300">
                          <div className={`w-16 h-16 ${colorClasses.split(" ")[2]} rounded-full flex items-center justify-center mb-4`}>
                            <IconComponent className={`w-8 h-8 ${colorClasses.split(" ")[3]}`} />
                          </div>
                          <h3 className="text-xl font-bold mb-3">{scheme.title}</h3>

                          <div className="space-y-2 mb-4 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Min. Deposit:</span>
                              <span className="font-semibold">{scheme.minDeposit}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Interest Rate:</span>
                              <span className="font-semibold text-green-600">{scheme.interestRate}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Target Group:</span>
                              <span className="font-semibold text-xs">{scheme.targetGroup}</span>
                            </div>
                          </div>

                          <Button
                            fullWidth
                            variant="outline"
                            size="sm"
                            onClick={() => toggleScheme(scheme._id)}
                            icon={expandedScheme === scheme._id ? ChevronUp : ChevronDown}
                            iconPosition="right"
                            className="mb-3"
                          >
                            {expandedScheme === scheme._id ? t("show-less") : t("view-details")}
                          </Button>

                          <AnimatePresence>
                            {expandedScheme === scheme._id && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="border-t pt-4 space-y-3 mb-4">
                                  <div>
                                    <h4 className="font-semibold text-gray-900 mb-2">Key Features:</h4>
                                    <ul className="space-y-1">
                                      {scheme.features.map((feature: string, idx: number) => (
                                        <li key={idx} className="flex items-start text-sm">
                                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                          <span className="text-gray-600">{feature}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div>
                                      <p className="text-gray-600">Min. Balance:</p>
                                      <p className="font-semibold">{scheme.minBalance}</p>
                                    </div>
                                    <div>
                                      <p className="text-gray-600">Max. Withdrawal:</p>
                                      <p className="font-semibold">{scheme.maxWithdrawal}</p>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          <Button
                            fullWidth
                            onClick={() => handleOpenAccountClick(scheme.title)}
                            className={`bg-gradient-to-r ${colorClasses.split(" ").slice(0, 2).join(" ")} text-white hover:opacity-90`}
                            icon={ArrowRight}
                            iconPosition="right"
                          >
                            {t("open-account")}
                          </Button>
                        </Card>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {/* Loan Services Section */}
            {activeCategory === "loans" && (
              <motion.div
                key="loans"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t("loan-services")}</h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t("loan-subtitle")}</p>
                </div>

                {/* Loan Term Selector */}
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                  {["1 Month", "3 Months", "6 Months", "1 Year"].map((term) => (
                    <button
                      key={term}
                      onClick={() => setSelectedLoanTerm(term)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        selectedLoanTerm === term
                          ? "bg-green-600 text-white shadow-md"
                          : "bg-white text-gray-700 hover:bg-green-50"
                      }`}
                    >
                      {term}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {loanSchemes.map((loan, index) => {
                    const IconComponent = iconMap[loan.icon] || Users

                    return (
                      <motion.div
                        key={loan._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <Card className="h-full text-center hover:shadow-xl transition-all duration-300">
                          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <IconComponent className="w-8 h-8 text-green-600" />
                          </div>
                          <h3 className="text-xl font-bold mb-2">{loan.type}</h3>
                          <p className="text-gray-600 text-sm mb-4">{loan.description}</p>

                          <div className="bg-green-50 rounded-lg p-4 mb-4">
                            <p className="text-sm text-gray-600 mb-1">Interest Rate ({selectedLoanTerm})</p>
                            <p className="text-3xl font-bold text-green-600">
                              {loan.rates[selectedLoanTerm] || "N/A"}
                            </p>
                          </div>

                          <ul className="text-left space-y-2 mb-6">
                            {loan.features.map((feature: string, idx: number) => (
                              <li key={idx} className="flex items-center text-sm">
                                <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                                <span className="text-gray-600">{feature}</span>
                              </li>
                            ))}
                          </ul>

                          <Button
                            fullWidth
                            onClick={() => handleApplyLoanClick(loan.type)}
                            className="bg-green-600 hover:bg-green-700 text-white"
                            icon={ArrowRight}
                            iconPosition="right"
                          >
                            {t("apply-now")}
                          </Button>
                        </Card>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {/* Additional Facilities Section */}
            {activeCategory === "facilities" && (
              <motion.div
                key="facilities"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t("additional-facilities")}</h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t("additional-facilities-subtitle")}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {additionalFacilities.map((facility, index) => {
                    const IconComponent = iconMap[facility.icon] || Building2

                    return (
                      <motion.div
                        key={facility._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <Card className="h-full text-center hover:shadow-xl transition-all duration-300">
                          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <IconComponent className="w-8 h-8 text-green-600" />
                          </div>
                          <h3 className="text-xl font-semibold mb-4">{facility.title}</h3>
                          <p className="text-gray-600 text-sm mb-6">{facility.description}</p>
                          <ul className="text-left space-y-2">
                            {facility.features.map((feature: string, idx: number) => (
                              <li key={idx} className="flex items-center text-sm">
                                <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                                <span className="text-gray-600">{feature}</span>
                              </li>
                            ))}
                          </ul>

                          {facility.playStoreLink && (
                            <div className="mt-6">
                              <Button
                                fullWidth
                                icon={Download}
                                iconPosition="left"
                                onClick={handlePlayStoreRedirect}
                                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold shadow-lg"
                              >
                                Download App
                              </Button>
                              <p className="text-xs text-gray-500 mt-2">Available on Google Play Store</p>
                            </div>
                          )}
                        </Card>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Special Features Highlight */}
      <section className="py-16 bg-gradient-to-r from-green-50 to-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t("why-choose-constellation")}</h2>
            <p className="text-xl text-gray-600">{t("special-features")}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Users,
                title: t("equal-partnership"),
                description: t("equal-partnership-desc"),
              },
              {
                icon: Award,
                title: t("member-recognition"),
                description: t("member-recognition-desc"),
              },
              {
                icon: Target,
                title: t("group-targeted-schemes"),
                description: t("group-targeted-schemes-desc"),
              },
              {
                icon: TrendingUp,
                title: t("business-growth"),
                description: t("business-growth-desc"),
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <feature.icon className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("ready-to-start")}</h2>
            <p className="text-xl mb-8 opacity-90">{t("join-members")}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button
                  size="lg"
                  className="bg-gold-600 text-green-700 hover:bg-green-600 hover:text-white font-semibold shadow-lg transition-all duration-300"
                >
                  {t("become-member")}
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-gold-600 hover:text-green-700 bg-transparent font-semibold transition-all duration-300"
              >
                {t("contact-us")}
              </Button>
            </div>
            <div className="mt-8 text-sm opacity-75">
              <p>📍 Tripureshwor, Kathmandu (Near CTC Mall, Opposite Bir Hospital)</p>
              <p>✉️ constellationscc@gmail.com | 🌐 www.constellationcooperative.com</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Services