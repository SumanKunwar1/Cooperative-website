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
  Heart,
  Briefcase,
  GraduationCap,
  Home,
  Zap,
} from "lucide-react"
import SEO from "../components/common/SEO"
import Card from "../components/ui/Card"
import Button from "../components/ui/Button"

interface ServicesProps {
  onOpenAccount?: (scheme?: string) => void
  onApplyLoan?: (loanType?: string) => void
}

const Services: React.FC<ServicesProps> = ({ onOpenAccount, onApplyLoan }) => {
  const [activeCategory, setActiveCategory] = useState("savings")
  const [expandedScheme, setExpandedScheme] = useState<string | null>(null)
  const [selectedLoanTerm, setSelectedLoanTerm] = useState("1 Year")

  const savingSchemes = [
    {
      id: "general",
      title: "Constellation General Saving Scheme",
      icon: PiggyBank,
      minDeposit: "Rs. 200",
      minBalance: "Rs. 500",
      interestRate: "5%",
      maxWithdrawal: "Rs. 200,000",
      targetGroup: "Housewives, Businesspersons, Employees",
      features: [
        "Flexible saving: Daily, Weekly, or Monthly",
        "Interest calculated on daily balance",
        "Interest merged with principal every 6 months",
        "Flexible withdrawal as per need",
      ],
      color: "blue",
    },
    {
      id: "special",
      title: "Constellation Special Saving Scheme",
      icon: Star,
      minDeposit: "Rs. 500",
      minBalance: "Rs. 1,000",
      interestRate: "6%",
      maxWithdrawal: "Rs. 300,000",
      targetGroup: "All Members",
      features: [
        "Higher interest rate than general scheme",
        "Daily, Weekly, or Monthly deposits",
        'Slogan: "Increased income and employment"',
        "Better withdrawal limits",
      ],
      color: "green",
    },
    {
      id: "super",
      title: "Constellation Super Saving Scheme",
      icon: Award,
      minDeposit: "Rs. 1,000",
      minBalance: "Rs. 5,000",
      interestRate: "7%",
      maxWithdrawal: "Rs. 500,000",
      targetGroup: "High-value Savers",
      features: [
        "Maximum interest rate for regular savings",
        "Heavy savings with maximum benefits",
        "Flexible deposit options",
        "Highest withdrawal facility",
      ],
      color: "purple",
    },
    {
      id: "daily",
      title: "Constellation Daily Saving Scheme",
      icon: Clock,
      minDeposit: "Rs. 200",
      minBalance: "Rs. 300",
      interestRate: "8%",
      maxWithdrawal: "Rs. 300,000",
      targetGroup: "Businesspersons",
      features: [
        "Daily savings only",
        "Highest interest rate (8%)",
        "Interest on monthly minimum balance",
        "Perfect for daily income earners",
      ],
      color: "orange",
    },
    {
      id: "shareholder",
      title: "Constellation Shareholder Saving Scheme",
      icon: Users,
      minDeposit: "Rs. 1,500",
      minBalance: "Rs. 1,500",
      interestRate: "10%",
      maxWithdrawal: "As per requirement",
      targetGroup: "Shareholding Members",
      features: [
        "Highest interest rate (10%)",
        "Monthly compulsory savings",
        "Exclusive for shareholders",
        "Premium member benefits",
      ],
      color: "red",
    },
    {
      id: "business",
      title: "Constellation Business Saving Scheme",
      icon: Briefcase,
      minDeposit: "Rs. 5,000",
      minBalance: "Rs. 15,000",
      interestRate: "10%",
      maxWithdrawal: "Unlimited",
      targetGroup: "Business Members with Shares",
      features: [
        "Business-focused savings",
        "Overdraft facility available",
        "Daily savings with high interest",
        "Withdraw more than available balance",
      ],
      color: "indigo",
    },
  ]

  const loanSchemes = [
    {
      type: "Personal Loan",
      icon: Users,
      rates: { "1 Month": "14%", "3 Months": "15%", "6 Months": "16%", "1 Year": "17%" },
      description: "For personal financial needs and emergencies",
      features: ["Quick approval", "Minimal documentation", "Flexible repayment"],
    },
    {
      type: "Business Loan",
      icon: Building2,
      rates: { "1 Month": "14%", "3 Months": "15%", "6 Months": "16%", "1 Year": "17%" },
      description: "Support your business growth and expansion",
      features: ["Business development", "Working capital", "Equipment purchase"],
    },
    {
      type: "Education Loan",
      icon: GraduationCap,
      rates: { "1 Month": "14%", "3 Months": "15%", "6 Months": "16%", "1 Year": "17%" },
      description: "Invest in education for a brighter future",
      features: ["Student-friendly terms", "Deferred payments", "Competitive rates"],
    },
    {
      type: "Household Loan",
      icon: Home,
      rates: { "1 Month": "14%", "3 Months": "15%", "6 Months": "16%", "1 Year": "17%" },
      description: "For household needs and improvements",
      features: ["Home improvements", "Appliance purchase", "Family needs"],
    },
    {
      type: "Emergency Loan",
      icon: Zap,
      rates: { "1 Month": "15%", "3 Months": "15%", "6 Months": "16%", "1 Year": "17%" },
      description: "Quick financial assistance for urgent needs",
      features: ["Same-day approval", "Minimal requirements", "Fast disbursement"],
    },
    {
      type: "Loan Against FD/Share",
      icon: Shield,
      rates: { "1 Month": "10%", "3 Months": "11%", "6 Months": "12%", "1 Year": "13%" },
      description: "Lowest rates against your deposits/shares",
      features: ["Lowest interest rates", "Instant approval", "No additional collateral"],
    },
  ]

  const additionalFacilities = [
    {
      title: "ATM Services",
      description: "Convenient 24/7 access to your funds",
      icon: CreditCard,
      features: ["24/7 cash withdrawal", "Balance inquiry", "Mini statements", "PIN change facility"],
    },
    {
      title: "Digital Banking",
      description: "Online and mobile banking services (planned expansion)",
      icon: Smartphone,
      features: ["Account management", "Fund transfers", "Bill payments", "Transaction history"],
    },
    {
      title: "Insurance Services",
      description: "Life and health insurance for members",
      icon: Shield,
      features: ["Life insurance coverage", "Health insurance plans", "Family protection", "Affordable premiums"],
    },
    {
      title: "Financial Literacy",
      description: "Educational programs and workshops",
      icon: Calculator,
      features: ["Financial workshops", "Investment guidance", "Savings planning", "Business training"],
    },
    {
      title: "Community Programs",
      description: "Social and cultural activities for members",
      icon: Heart,
      features: ["Festival celebrations", "Sports events", "Group tours", "Cultural programs"],
    },
    {
      title: "Business Directory",
      description: "Networking and business promotion services",
      icon: Building2,
      features: ["Business listings", "Networking events", "Trade exhibitions", "Member promotions"],
    },
  ]

  const toggleScheme = (schemeId: string) => {
    setExpandedScheme(expandedScheme === schemeId ? null : schemeId)
  }

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "from-blue-500 to-blue-600 bg-blue-100 text-blue-600 border-blue-200",
      green: "from-green-500 to-green-600 bg-green-100 text-green-600 border-green-200",
      purple: "from-purple-500 to-purple-600 bg-purple-100 text-purple-600 border-purple-200",
      orange: "from-orange-500 to-orange-600 bg-orange-100 text-orange-600 border-orange-200",
      red: "from-red-500 to-red-600 bg-red-100 text-red-600 border-red-200",
      indigo: "from-indigo-500 to-indigo-600 bg-indigo-100 text-indigo-600 border-indigo-200",
    }
    return colors[color as keyof typeof colors] || colors.blue
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

  return (
    <div className="min-h-screen">
      <SEO
        title="Our Services - Constellation Saving and Credit Cooperative Ltd."
        description="Explore our comprehensive financial services including 6 saving schemes, competitive loan rates, ATM services, insurance, and community programs designed for your financial growth."
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Services</h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto mb-8">
              Comprehensive financial solutions with competitive rates and member-focused benefits
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="bg-white/20 rounded-full px-4 py-2">6 Saving Schemes</div>
              <div className="bg-white/20 rounded-full px-4 py-2">10 Loan Types</div>
              <div className="bg-white/20 rounded-full px-4 py-2">ATM Services</div>
              <div className="bg-white/20 rounded-full px-4 py-2">Insurance Coverage</div>
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
                { id: "savings", label: "Saving Schemes", icon: PiggyBank },
                { id: "loans", label: "Loan Services", icon: CreditCard },
                { id: "facilities", label: "Additional Facilities", icon: Star },
              ].map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    activeCategory === category.id
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-gray-600 hover:text-blue-600 hover:bg-white"
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
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Saving Schemes</h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Choose from our 6 specialized saving schemes designed for different financial goals and lifestyles
                  </p>
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
                                <div className="text-white/90 text-sm">Annual Interest</div>
                              </div>
                            </div>
                          </div>

                          {/* Key Details */}
                          <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="text-center p-3 bg-gray-50 rounded-lg">
                              <div className="text-sm text-gray-600">Min. Deposit</div>
                              <div className="font-semibold text-gray-900">{scheme.minDeposit}</div>
                            </div>
                            <div className="text-center p-3 bg-gray-50 rounded-lg">
                              <div className="text-sm text-gray-600">Min. Balance</div>
                              <div className="font-semibold text-gray-900">{scheme.minBalance}</div>
                            </div>
                          </div>

                          {/* Features */}
                          <div className="mb-6">
                            <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
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
                              className="flex items-center justify-between w-full text-left font-medium text-gray-900 hover:text-blue-600 transition-colors"
                            >
                              <span>View Details</span>
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
                                      <span className="font-medium">Max Withdrawal:</span>
                                      <span className="ml-2 text-gray-700">{scheme.maxWithdrawal}</span>
                                    </div>
                                    <div>
                                      <span className="font-medium">Interest Calculation:</span>
                                      <span className="ml-2 text-gray-700">Daily Balance</span>
                                    </div>
                                    <div>
                                      <span className="font-medium">Compounding:</span>
                                      <span className="ml-2 text-gray-700">Every 6 months</span>
                                    </div>
                                    <div>
                                      <span className="font-medium">Target Group:</span>
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
                            Open Account
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
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Loan Services</h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                    Competitive interest rates with flexible repayment options for all your financial needs
                  </p>

                  {/* Loan Term Selector */}
                  <div className="flex justify-center">
                    <div className="bg-gray-100 rounded-lg p-1 flex">
                      {["1 Month", "3 Months", "6 Months", "1 Year"].map((term) => (
                        <button
                          key={term}
                          onClick={() => setSelectedLoanTerm(term)}
                          className={`px-4 py-2 rounded-md font-medium transition-all duration-300 ${
                            selectedLoanTerm === term
                              ? "bg-blue-600 text-white shadow-md"
                              : "text-gray-600 hover:text-blue-600"
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
                          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <loan.icon className="w-8 h-8 text-blue-600" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{loan.type}</h3>
                          <p className="text-gray-600 text-sm">{loan.description}</p>
                        </div>

                        {/* Interest Rate Display */}
                        <div className="text-center mb-6">
                          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-4">
                            <div className="text-3xl font-bold mb-1">
                              {loan.rates[selectedLoanTerm as keyof typeof loan.rates]}
                            </div>
                            <div className="text-blue-100 text-sm">Interest Rate ({selectedLoanTerm})</div>
                          </div>
                        </div>

                        {/* Features */}
                        <div className="mb-6">
                          <h4 className="font-semibold text-gray-900 mb-3">Features:</h4>
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
                          Apply Now
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
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Interest Rate Comparison</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4 font-semibold text-gray-900">Loan Type</th>
                            <th className="text-center py-3 px-4 font-semibold text-gray-900">1 Month</th>
                            <th className="text-center py-3 px-4 font-semibold text-gray-900">3 Months</th>
                            <th className="text-center py-3 px-4 font-semibold text-gray-900">6 Months</th>
                            <th className="text-center py-3 px-4 font-semibold text-gray-900">1 Year</th>
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
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Additional Facilities</h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Beyond banking - comprehensive services for your complete financial and social well-being
                  </p>
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
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                          <facility.icon className="w-8 h-8 text-blue-600" />
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
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Special Features Highlight */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Constellation?</h2>
            <p className="text-xl text-gray-600">Special features that set us apart</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Users,
                title: "Equal Partnership",
                description: "Equal shares, equal rights, equal duties for all members",
              },
              {
                icon: Award,
                title: "Member Recognition",
                description: "Rewards and recognition for active members",
              },
              {
                icon: Target,
                title: "Group-Targeted Schemes",
                description: "Specialized saving schemes for different groups",
              },
              {
                icon: TrendingUp,
                title: "Business Growth",
                description: "Promotion of entrepreneurship and business development",
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
                  <feature.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Financial Journey?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join over 1,000 satisfied members who trust Constellation for their financial growth
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button
                  size="lg"
                  className="bg-white text-blue-700 hover:bg-blue-600 hover:text-white font-semibold shadow-lg transition-all duration-300"
                >
                  Become a Member Today
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-700 bg-transparent font-semibold transition-all duration-300"
              >
                Contact Us: 01-4254939
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
