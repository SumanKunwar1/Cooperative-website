"use client"

import type React from "react"
import { useState } from "react"
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
} from "lucide-react"
import SEO from "../components/common/SEO"
import Card from "../components/ui/Card"
import Button from "../components/ui/Button"
import { useTranslation } from "react-i18next"

interface ServicesProps {
  onOpenAccount?: (scheme?: string) => void
  onApplyLoan?: (loanType?: string) => void
}

const Services: React.FC<ServicesProps> = ({ onOpenAccount, onApplyLoan }) => {
  const [activeCategory, setActiveCategory] = useState("savings")
  const [expandedScheme, setExpandedScheme] = useState<string | null>(null)
  const [selectedLoanTerm, setSelectedLoanTerm] = useState("1 Year")

  const { t } = useTranslation()

  const savingSchemes = [
    {
      id: "general",
      title: t("constellation-general-saving"),
      icon: PiggyBank,
      minDeposit: "Rs. 200",
      minBalance: "Rs. 500",
      interestRate: "5%",
      maxWithdrawal: "Rs. 200,000",
      targetGroup: t("target-group-housewives"),
      features: [
        t("feature-flexible-saving"),
        t("feature-interest-daily"),
        t("feature-interest-merged"),
        t("feature-flexible-withdrawal"),
      ],
      color: "green",
    },
    {
      id: "special",
      title: t("constellation-special-saving"),
      icon: Star,
      minDeposit: "Rs. 500",
      minBalance: "Rs. 1,000",
      interestRate: "6%",
      maxWithdrawal: "Rs. 300,000",
      targetGroup: t("target-group-all"),
      features: [
        t("feature-higher-interest"),
        t("feature-daily-weekly-monthly"),
        t("feature-slogan"),
        t("feature-better-withdrawal"),
      ],
      color: "green",
    },
    {
      id: "super",
      title: t("constellation-super-saving"),
      icon: Award,
      minDeposit: "Rs. 1,000",
      minBalance: "Rs. 5,000",
      interestRate: "7%",
      maxWithdrawal: "Rs. 500,000",
      targetGroup: t("target-group-high-value"),
      features: [
        t("feature-maximum-interest"),
        t("feature-heavy-savings"),
        t("feature-flexible-deposit"),
        t("feature-highest-withdrawal"),
      ],
      color: "purple",
    },
    {
      id: "daily",
      title: t("constellation-daily-saving"),
      icon: Clock,
      minDeposit: "Rs. 200",
      minBalance: "Rs. 300",
      interestRate: "8%",
      maxWithdrawal: "Rs. 300,000",
      targetGroup: t("target-group-business"),
      features: [
        t("feature-daily-only"),
        t("feature-highest-interest"),
        t("feature-monthly-minimum"),
        t("feature-daily-income"),
      ],
      color: "orange",
    },
    {
      id: "shareholder",
      title: t("constellation-shareholder-saving"),
      icon: Users,
      minDeposit: "Rs. 1,500",
      minBalance: "Rs. 1,500",
      interestRate: "10%",
      maxWithdrawal: "As per requirement",
      targetGroup: t("target-group-shareholders"),
      features: [
        t("feature-highest-rate"),
        t("feature-monthly-compulsory"),
        t("feature-exclusive-shareholders"),
        t("feature-premium-benefits"),
      ],
      color: "red",
    },
    {
      id: "business",
      title: t("constellation-business-saving"),
      icon: Briefcase,
      minDeposit: "Rs. 5,000",
      minBalance: "Rs. 15,000",
      interestRate: "10%",
      maxWithdrawal: "Unlimited",
      targetGroup: t("target-group-business-members"),
      features: [
        t("feature-business-focused"),
        t("feature-overdraft"),
        t("feature-daily-high-interest"),
        t("feature-withdraw-more"),
      ],
      color: "indigo",
    },
  ]

  const loanSchemes = [
    {
      type: t("personal-loan"),
      icon: Users,
      rates: { "1 Month": "14%", "3 Months": "15%", "6 Months": "16%", "1 Year": "17%" },
      description: t("personal-loan-desc"),
      features: [t("quick-approval"), t("minimal-documentation"), t("flexible-repayment")],
    },
    {
      type: t("business-loan"),
      icon: Building2,
      rates: { "1 Month": "14%", "3 Months": "15%", "6 Months": "16%", "1 Year": "17%" },
      description: t("business-loan-desc"),
      features: [t("business-development"), t("working-capital"), t("equipment-purchase")],
    },
    {
      type: t("education-loan"),
      icon: GraduationCap,
      rates: { "1 Month": "14%", "3 Months": "15%", "6 Months": "16%", "1 Year": "17%" },
      description: t("education-loan-desc"),
      features: [t("student-friendly"), t("deferred-payments"), t("competitive-rates")],
    },
    {
      type: t("household-loan"),
      icon: Home,
      rates: { "1 Month": "14%", "3 Months": "15%", "6 Months": "16%", "1 Year": "17%" },
      description: t("household-loan-desc"),
      features: [t("home-improvements"), t("appliance-purchase"), t("family-needs")],
    },
    {
      type: t("emergency-loan"),
      icon: Zap,
      rates: { "1 Month": "15%", "3 Months": "15%", "6 Months": "16%", "1 Year": "17%" },
      description: t("emergency-loan-desc"),
      features: [t("same-day-approval"), t("minimal-requirements"), t("fast-disbursement")],
    },
    {
      type: t("loan-against-fd"),
      icon: Shield,
      rates: { "1 Month": "10%", "3 Months": "11%", "6 Months": "12%", "1 Year": "13%" },
      description: t("loan-against-fd-desc"),
      features: [t("lowest-interest"), t("instant-approval"), t("no-additional-collateral")],
    },
  ]

  const additionalFacilities = [
    {
      title: t("atm-services"),
      description: t("atm-services-desc"),
      icon: CreditCard,
      features: [t("24-7-withdrawal"), t("balance-inquiry"), t("mini-statements"), t("pin-change")],
    },
    {
      title: t("digital-banking"),
      description: t("digital-banking-desc"),
      icon: Smartphone,
      features: [t("account-management"), t("fund-transfers"), t("bill-payments"), t("transaction-history")],
    },
    {
      title: t("Mobile App"),
      description: t("mobile-app-desc"),
      icon: SmartphoneNfc,
      features: [t("Mobile Banking"), t("Easy Transactions"), t("Secure Login"), t("Real Time Updates")],
      playStoreLink: "https://play.google.com/store/apps/details?id=com.mbnepal.smartbanking_constellation",
    },
    {
      title: t("insurance-services"),
      description: t("insurance-services-desc"),
      icon: Shield,
      features: [t("life-insurance"), t("health-insurance"), t("family-protection"), t("affordable-premiums")],
    },
    {
      title: t("financial-literacy"),
      description: t("financial-literacy-desc"),
      icon: Calculator,
      features: [t("financial-workshops"), t("investment-guidance"), t("savings-planning"), t("business-training")],
    },
  
    {
      title: t("business-directory"),
      description: t("business-directory-desc"),
      icon: Building2,
      features: [t("business-listings"), t("networking-events"), t("trade-exhibitions"), t("member-promotions")],
    },
  ]

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

  return (
    <div className="min-h-screen">
      <SEO
        title={`${t("services")} - Constellation Saving and Credit Cooperative Ltd.`}
        description="Explore our comprehensive financial services including 6 saving schemes, competitive loan rates, ATM services, insurance, and community programs designed for your financial growth."
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
              <div className="bg-white/20 rounded-full px-4 py-2">{t("services-hero-schemes")}</div>
              <div className="bg-white/20 rounded-full px-4 py-2">{t("services-hero-loans")}</div>
              <div className="bg-white/20 rounded-full px-4 py-2">{t("services-hero-atm")}</div>
              <div className="bg-white/20 rounded-full px-4 py-2">{t("services-hero-insurance")}</div>
              <div className="bg-white/20 rounded-full px-4 py-2">{t("services-hero-mobile-app")}</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Service Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center mb-12">
            <div className="bg-gray-100 rounded-xl p-2 flex flex-wrap gap-2">
              {[
                { id: "savings", label: t("saving-schemes"), icon: PiggyBank },
                { id: "loans", label: t("loan-services"), icon: CreditCard },
                { id: "facilities", label: t("additional-facilities"), icon: Star },
              ].map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    activeCategory === category.id
                      ? "bg-green-600 text-white shadow-lg"
                      : "text-gray-600 hover:text-green-600 hover:bg-white"
                  }`}
                >
                  <category.icon className="w-5 h-5 mr-2" />
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {/* Saving Schemes Section */}
            {activeCategory === "savings" && (
              <motion.div
                key="savings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t("saving-schemes")}</h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t("saving-schemes-subtitle")}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {savingSchemes.map((scheme, index) => {
                    const colorClasses = getColorClasses(scheme.color)
                    return (
                      <motion.div
                        key={scheme.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative"
                      >
                        <Card className="h-full hover:shadow-xl transition-all duration-300 overflow-hidden">
                          {/* Header with gradient */}
                          <div
                            className={`bg-gradient-to-r ${colorClasses.split(" ")[0]} ${colorClasses.split(" ")[1]} p-6 -m-6 mb-6 text-white`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <scheme.icon className="w-8 h-8 mr-3" />
                                <div>
                                  <h3 className="text-xl font-bold">{scheme.title}</h3>
                                  <p className="text-white/90 text-sm">{scheme.targetGroup}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-bold">{scheme.interestRate}</div>
                                <div className="text-white/90 text-sm">{t("annual-interest")}</div>
                              </div>
                            </div>
                          </div>

                          {/* Key Details */}
                          <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="text-center p-3 bg-gray-50 rounded-lg">
                              <div className="text-sm text-gray-600">{t("min-deposit")}</div>
                              <div className="font-semibold text-gray-900">{scheme.minDeposit}</div>
                            </div>
                            <div className="text-center p-3 bg-gray-50 rounded-lg">
                              <div className="text-sm text-gray-600">{t("min-balance")}</div>
                              <div className="font-semibold text-gray-900">{scheme.minBalance}</div>
                            </div>
                          </div>

                          {/* Features */}
                          <div className="mb-6">
                            <h4 className="font-semibold text-gray-900 mb-3">{t("key-features")}</h4>
                            <ul className="space-y-2">
                              {scheme.features.map((feature, idx) => (
                                <li key={idx} className="flex items-start">
                                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                  <span className="text-gray-700 text-sm">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Expandable Details */}
                          <div className="border-t pt-4">
                            <button
                              onClick={() => toggleScheme(scheme.id)}
                              className="flex items-center justify-between w-full text-left font-medium text-gray-900 hover:text-green-600 transition-colors"
                            >
                              <span>{t("view-details")}</span>
                              {expandedScheme === scheme.id ? (
                                <ChevronUp className="w-5 h-5" />
                              ) : (
                                <ChevronDown className="w-5 h-5" />
                              )}
                            </button>

                            <AnimatePresence>
                              {expandedScheme === scheme.id && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="mt-4 p-4 bg-gray-50 rounded-lg"
                                >
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                    <div>
                                      <span className="font-medium">{t("max-withdrawal")}:</span>
                                      <span className="ml-2 text-gray-700">{scheme.maxWithdrawal}</span>
                                    </div>
                                    <div>
                                      <span className="font-medium">{t("interest-calculation")}:</span>
                                      <span className="ml-2 text-gray-700">{t("daily-balance")}</span>
                                    </div>
                                    <div>
                                      <span className="font-medium">{t("compounding")}:</span>
                                      <span className="ml-2 text-gray-700">{t("every-6-months")}</span>
                                    </div>
                                    <div>
                                      <span className="font-medium">{t("target-group")}:</span>
                                      <span className="ml-2 text-gray-700">{scheme.targetGroup}</span>
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>

                          <Button
                            fullWidth
                            className="mt-4"
                            icon={ArrowRight}
                            iconPosition="right"
                            onClick={() => handleOpenAccountClick(scheme.title)}
                          >
                            {t("open-account")}
                          </Button>
                        </Card>
                      </motion.div>
                    )
                  })}
                </div>
                <p className="text-gray-600 mr-4 flex justify-center mt-6">If you prefer to fill out the physical form, please download it using the button below and complete the required details.</p>

                <div className="flex justify-center mt-4">
            <button
              onClick={() => {
                const link = document.createElement("a");
                link.href =
                  "https://drive.google.com/uc?export=download&id=10i7P7JUVA_jdDpkacJbS9PO2TrGhq9Fn";
                link.download = "Khata_Kholne_Form.pdf";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
            >
              Download Form
        </button>
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
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">{t("loan-services-subtitle")}</p>

                  {/* Loan Term Selector */}
                  <div className="flex justify-center">
                    <div className="bg-gray-100 rounded-lg p-1 flex">
                      {[t("1-month"), t("3-months"), t("6-months"), t("1-year")].map((term) => (
                        <button
                          key={term}
                          onClick={() => setSelectedLoanTerm(term)}
                          className={`px-4 py-2 rounded-md font-medium transition-all duration-300 ${
                            selectedLoanTerm === term
                              ? "bg-green-600 text-white shadow-md"
                              : "text-gray-600 hover:text-green-600"
                          }`}
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {loanSchemes.map((loan, index) => (
                    <motion.div
                      key={loan.type}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                    >
                      <Card className="h-full hover:shadow-xl transition-all duration-300">
                        <div className="text-center mb-6">
                          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <loan.icon className="w-8 h-8 text-green-600" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{loan.type}</h3>
                          <p className="text-gray-600 text-sm">{loan.description}</p>
                        </div>

                        {/* Interest Rate Display */}
                        <div className="text-center mb-6">
                          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-4">
                            <div className="text-3xl font-bold mb-1">
                              {loan.rates[selectedLoanTerm as keyof typeof loan.rates]}
                            </div>
                            <div className="text-green-100 text-sm">
                              {t("annual-interest")} ({selectedLoanTerm})
                            </div>
                          </div>
                        </div>

                        {/* Features */}
                        <div className="mb-6">
                          <h4 className="font-semibold text-gray-900 mb-3">{t("features")}</h4>
                          <ul className="space-y-2">
                            {loan.features.map((feature, idx) => (
                              <li key={idx} className="flex items-center text-sm">
                                <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                                <span className="text-gray-700">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <Button
                          fullWidth
                          icon={ArrowRight}
                          iconPosition="right"
                          onClick={() => handleApplyLoanClick(loan.type)}
                        >
                          {t("apply-now")}
                        </Button>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Loan Comparison Table */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-16"
                >
                  <Card>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                      {t("interest-rate-comparison")}
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4 font-semibold text-gray-900">{t("loan-type")}</th>
                            <th className="text-center py-3 px-4 font-semibold text-gray-900">{t("1-month")}</th>
                            <th className="text-center py-3 px-4 font-semibold text-gray-900">{t("3-months")}</th>
                            <th className="text-center py-3 px-4 font-semibold text-gray-900">{t("6-months")}</th>
                            <th className="text-center py-3 px-4 font-semibold text-gray-900">{t("1-year")}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {loanSchemes.map((loan, index) => (
                            <tr key={loan.type} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                              <td className="py-3 px-4 font-medium text-gray-900">{loan.type}</td>
                              <td className="text-center py-3 px-4 text-gray-700">{loan.rates["1 Month"]}</td>
                              <td className="text-center py-3 px-4 text-gray-700">{loan.rates["3 Months"]}</td>
                              <td className="text-center py-3 px-4 text-gray-700">{loan.rates["6 Months"]}</td>
                              <td className="text-center py-3 px-4 text-gray-700">{loan.rates["1 Year"]}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Card>
                </motion.div>
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
                  {additionalFacilities.map((facility, index) => (
                    <motion.div
                      key={facility.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <Card className="h-full text-center hover:shadow-xl transition-all duration-300">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                          <facility.icon className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-xl font-semibold mb-4">{facility.title}</h3>
                        <p className="text-gray-600 text-sm mb-6">{facility.description}</p>
                        <ul className="text-left space-y-2">
                          {facility.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center text-sm">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                              <span className="text-gray-600">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        
                        {/* Special button for Mobile App */}
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
                  ))}
                </div>

                {/* Mobile App Highlight Section */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-16"
                >
                  <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                    <div className="flex flex-col md:flex-row items-center">
                      <div className="md:w-2/3 p-6">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Constellation Mobile Banking App</h3>
                        <p className="text-gray-700 mb-4">
                          Manage your finances on the go with our feature-rich mobile banking application. 
                          Access your accounts, transfer funds, pay bills, and much more from the convenience of your smartphone.
                        </p>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="flex items-center">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                            <span className="text-sm">Secure Login</span>
                          </div>
                          <div className="flex items-center">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                            <span className="text-sm">Real-time Updates</span>
                          </div>
                          <div className="flex items-center">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                            <span className="text-sm">Easy Transactions</span>
                          </div>
                          <div className="flex items-center">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                            <span className="text-sm">24/7 Access</span>
                          </div>
                        </div>
                        <Button
                          size="lg"
                          icon={Download}
                          iconPosition="left"
                          onClick={handlePlayStoreRedirect}
                          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold shadow-lg"
                        >
                          Get App on Play Store
                        </Button>
                      </div>
                      <div className="md:w-1/3 p-6 flex justify-center">
                        <div className="bg-white rounded-2xl p-4 shadow-lg border border-blue-200">
                          <SmartphoneNfc className="w-32 h-32 text-blue-500" />
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
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