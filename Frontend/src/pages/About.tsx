"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import {
  Target,
  Eye,
  Award,
  Users,
  TrendingUp,
  Building,
  Calendar,
  Globe,
  MapPin,
  Phone,
  Mail,
  Star,
} from "lucide-react"
import SEO from "../components/common/SEO"
import Card from "../components/ui/Card"

const About: React.FC = () => {
  const [] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("mission")

  const values = [
    {
      icon: Target,
      title: "Financial Empowerment",
      description:
        "We empower members through accessible financial services and promote regular savings habits for long-term security.",
    },
    {
      icon: Users,
      title: "Equal Partnership",
      description: "Equal shares, equal rights, equal duties - creating an environment of equality among all members.",
    },
    {
      icon: TrendingUp,
      title: "Entrepreneurship",
      description:
        "We encourage self-employment, entrepreneurship, and business growth through our comprehensive loan schemes.",
    },
    {
      icon: Award,
      title: "Member Recognition",
      description: "We provide awards and recognition to active members based on multiple performance indicators.",
    },
  ]

  const milestones = [
    { year: "2007", event: "Constellation Saving and Credit Cooperative Ltd. established (2064 B.S.)", icon: Building },
    { year: "2010", event: "Introduced specialized saving schemes for different member groups", icon: Users },
    { year: "2015", event: "Launched comprehensive loan facilities with competitive rates", icon: TrendingUp },
    { year: "2018", event: "ATM services introduced for member convenience", icon: Globe },
    { year: "2020", event: "Digital banking platform development initiated", icon: Calendar },
    { year: "2024", event: "Expanded to serve 1000+ active members with Rs. 50M+ loans disbursed", icon: Award },
  ]

  const leadership = [
    {
      name: "Board of Directors",
      position: "Governing Body",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Experienced professionals guiding strategic decisions and ensuring cooperative principles are maintained.",
    },
    {
      name: "Management Team",
      position: "Executive Leadership",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Dedicated team managing daily operations, member services, and business development initiatives.",
    },
    {
      name: "Member Representatives",
      position: "Community Voice",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Elected representatives ensuring member interests are prioritized in all cooperative decisions.",
    },
  ]

  const stats = [
    { label: "Years of Service", value: "17+", description: "Serving since 2007" },
    { label: "Active Members", value: "1000+", description: "Growing community" },
    { label: "Loans Disbursed", value: "NPR 50M+", description: "Supporting dreams" },
    { label: "Saving Schemes", value: "6+", description: "Diverse options" },
  ]

  const purposes = [
    "Increase financial and social awareness of members",
    "Promote regular and disciplined savings among members",
    "Provide financial services through mobilization of members' savings",
    "Offer loans for income-generating and productive purposes",
    "Strengthen members' business, income sources, and livelihood",
    "Encourage self-employment, entrepreneurship, and financial stability",
    "Create a reliable financial network reducing financial risks",
    "Motivate collective participation in social and cultural programs",
  ]


  return (
    <div className="min-h-screen">
      <SEO
        title="About Us - Constellation Saving and Credit Cooperative Ltd."
        description="Learn about our 17+ years of serving the Kathmandu community through cooperative banking services since 2007. Discover our mission, vision, and commitment to financial empowerment."
      />

      {/* Hero Section with Company Image */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">About Constellation</h1>
              <p className="text-xl md:text-2xl mb-8 leading-relaxed">
                Today's Saving for Tomorrow's Security, a Bright Future for Generations Ahead
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                  <Calendar className="w-4 h-4 mr-2" />
                  Established 2007
                </div>
                <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                  <MapPin className="w-4 h-4 mr-2" />
                  Tripureshwor, Kathmandu
                </div>
                <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                  <Users className="w-4 h-4 mr-2" />
                  1000+ Members
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Constellation Cooperative Building"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-sm font-medium">Our Office Location</p>
                  <p className="text-xs opacity-90">Near CTC Mall, Opposite Bir Hospital</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Stats Section */}
      <section className="py-16 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300">
                  <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">{stat.value}</div>
                  <div className="text-gray-900 font-semibold mb-1">{stat.label}</div>
                  <div className="text-sm text-gray-600">{stat.description}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Story with Images */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Story Since 2007</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Constellation Saving and Credit Cooperative Ltd. was established in 2064 B.S. (2007 A.D.) with
                Registration No. 3463/064/65 under the Division Cooperative Office, Kathmandu. Located in the heart of
                Tripureshwor, near CTC Mall and opposite Bir Hospital, we have been serving our community for over 17
                years.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Our cooperative was founded on the principle of financial empowerment through collective effort. We
                believe in creating equal opportunities for all members through equal shares, equal rights, and equal
                responsibilities.
              </p>

              {/* Contact Information */}
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="text-gray-700">01-4254939</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="text-gray-700">constellationscc@gmail.com</span>
                  </div>
                  <div className="flex items-center">
                    <Globe className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="text-gray-700">www.constellationcooperative.com</span>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                    <span className="text-gray-700">
                      Tripureshwor, Kathmandu, Nepal
                      <br />
                      PAN No.: 308300684
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img
                  src="/placeholder.svg?height=300&width=500"
                  alt="Member Meeting"
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg overflow-hidden shadow-md">
                  <img
                    src="/placeholder.svg?height=200&width=250"
                    alt="ATM Services"
                    className="w-full h-32 object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden shadow-md">
                  <img
                    src="/placeholder.svg?height=200&width=250"
                    alt="Financial Education"
                    className="w-full h-32 object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Mission, Vision, Values Tabs */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Foundation</h2>
            <p className="text-xl text-gray-600">The principles that guide our cooperative</p>
          </motion.div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 rounded-lg p-1 flex">
              {["mission", "vision", "purposes"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-md font-medium transition-all duration-300 ${
                    activeTab === tab ? "bg-blue-600 text-white shadow-md" : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            {activeTab === "mission" && (
              <Card className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  To provide accessible, innovative, and member-focused financial services that promote economic growth,
                  support local businesses, and strengthen our community through cooperative principles. We aim to
                  increase financial and social awareness while encouraging regular savings and providing easy access to
                  credit facilities.
                </p>
              </Card>
            )}

            {activeTab === "vision" && (
              <Card className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Eye className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  To be Nepal's leading cooperative financial institution, recognized for innovation, community impact,
                  and sustainable growth. We envision a future where every member achieves financial stability through
                  our comprehensive services, creating a bright future for generations ahead.
                </p>
              </Card>
            )}

            {activeTab === "purposes" && (
              <Card>
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Our Core Purposes</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {purposes.map((purpose, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors duration-300"
                    >
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700">{purpose}</span>
                    </motion.div>
                  ))}
                </div>
              </Card>
            )}
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h3>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="text-center h-full hover:shadow-xl transition-all duration-300">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <value.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="text-xl font-semibold mb-4">{value.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team with Images */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Leadership Structure</h3>
            <p className="text-xl text-gray-600">Dedicated professionals serving our cooperative community</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadership.map((leader, index) => (
              <motion.div
                key={leader.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="text-center hover:shadow-xl transition-all duration-300">
                  <div className="w-48 h-48 mx-auto mb-6 rounded-2xl overflow-hidden">
                    <img
                      src={leader.image || "/placeholder.svg"}
                      alt={leader.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="text-xl font-semibold mb-2">{leader.name}</h4>
                  <p className="text-blue-600 font-medium mb-4">{leader.position}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{leader.bio}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive History Timeline */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h3>
            <p className="text-xl text-gray-600">Key milestones in our cooperative's growth</p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-0.5 w-1 bg-blue-200 h-full"></div>

            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex items-center mb-12 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8"}`}>
                  <motion.div whileHover={{ scale: 1.02 }}>
                    <Card className="hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center mb-3">
                        <div
                          className={`w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center ${
                            index % 2 === 0 ? "ml-auto" : ""
                          }`}
                        >
                          <milestone.icon className="w-5 h-5 text-blue-600" />
                        </div>
                        {index % 2 === 0 && (
                          <span className="text-2xl font-bold text-blue-600 mr-4">{milestone.year}</span>
                        )}
                        {index % 2 !== 0 && (
                          <span className="text-2xl font-bold text-blue-600 ml-4">{milestone.year}</span>
                        )}
                      </div>
                      <p className="text-gray-700">{milestone.event}</p>
                    </Card>
                  </motion.div>
                </div>

                {/* Timeline dot */}
                <motion.div
                  className="w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg"
                  whileHover={{ scale: 1.2 }}
                ></motion.div>
                <div className="flex-1"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Impact Section with Images */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Community Impact</h3>
            <p className="text-xl text-gray-600">How we're making a difference in our community</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6">
                  <h4 className="text-xl font-semibold text-blue-900 mb-4">Financial Literacy Programs</h4>
                  <p className="text-blue-800">
                    Educational workshops and seminars to improve financial knowledge and skills among community
                    members.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-6">
                  <h4 className="text-xl font-semibold text-green-900 mb-4">Business Development</h4>
                  <p className="text-green-800">
                    Supporting local entrepreneurs through business exhibitions, directories, and networking
                    opportunities.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-6">
                  <h4 className="text-xl font-semibold text-orange-900 mb-4">Cultural Programs</h4>
                  <p className="text-orange-800">
                    Organizing traditional events like Deusi-Bhailo, festivals, sports activities, and community
                    gatherings.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="space-y-4">
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <img
                    src="/placeholder.svg?height=200&width=300"
                    alt="Financial Literacy Workshop"
                    className="w-full h-32 object-cover"
                  />
                </div>
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <img
                    src="/placeholder.svg?height=200&width=300"
                    alt="Business Exhibition"
                    className="w-full h-40 object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <img
                    src="/placeholder.svg?height=200&width=300"
                    alt="Cultural Festival"
                    className="w-full h-40 object-cover"
                  />
                </div>
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <img
                    src="/placeholder.svg?height=200&width=300"
                    alt="Sports Event"
                    className="w-full h-32 object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
