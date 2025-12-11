
"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Target, Eye, Users, Calendar, Globe, MapPin, Star } from "lucide-react"
import SEO from "../components/common/SEO"
import Card from "../components/ui/Card"
import { aboutApi, AboutData } from "../services/aboutApi"

const About: React.FC = () => {
  const [aboutData, setAboutData] = useState<AboutData | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("mission")

  useEffect(() => {
    fetchAboutData()
  }, [])

  const fetchAboutData = async () => {
    try {
      setLoading(true)
      const result = await aboutApi.getAbout()
      console.log("About API result:", result)
      
      if (result.success && result.data) {
        console.log("About data loaded from API:", result.data)
        setAboutData(result.data)
      } else {
        console.log("Using fallback data")
        setAboutData(getFallbackData())
      }
    } catch (error) {
      console.error("Error fetching about data:", error)
      setAboutData(getFallbackData())
    } finally {
      setLoading(false)
    }
  }

  // Simple fallback data with safe defaults
  const getFallbackData = (): AboutData => {
    return {
      heroTitle: "About Constellation Cooperative",
      heroSubtitle: "Empowering communities through cooperative banking since 2010",
      companyInfo: {
        establishedDate: "12th May 2010",
        location: "Kathmandu, Nepal",
        registrationNumber: "3163/066/067",
        officeLocationLabel: "Head Office Location",
        officeAddress: "6th Floor, Civil Trade Centre (CTC Mall), Sundhara, Kathmandu",
        mission: "To create a vibrant business community where together, everyone can achieve more through cooperative principles and mutual support.",
        vision: "To be the leading cooperative institution fostering economic growth and social development in Nepal.",
      },
      stats: [
        { label: "Years of Service", value: "15+", description: "Serving since 2010" },
        { label: "Registration No.", value: "3163/066/067", description: "Registered under Department of Cooperatives" },
        { label: "Experience", value: "20+", description: "Years of combined experience" },
        { label: "Committee Term", value: "2081-2086", description: "Current committee term" }
      ],
      story: {
        title: "Our Story Since 2010",
        paragraphs: [
          "Founded in 2010, Constellation Saving and Credit Cooperative Limited began with a vision to create a vibrant business community where members could grow together through mutual support and cooperative principles.",
          "Over the years, we've grown from a small group of visionary individuals to a trusted financial institution serving thousands of members across the community.",
          "Our journey is marked by continuous innovation, member-centric services, and a commitment to financial inclusion and empowerment."
        ],
        contactInfo: {
          title: "Contact Information",
          address1: "6th Floor, Civil Trade Centre (CTC Mall)",
          address2: "Sundhara, Kathmandu Metropolitan City Ward No. 22",
          registration: "Registration No: 3163/066/067",
          ministryName: "Ministry of Land Management, Cooperatives and Poverty Alleviation"
        },
        images: []
      },
      mission: "To create a vibrant business community where together, everyone can achieve more through cooperative principles and mutual support.",
      vision: "To be the leading cooperative institution fostering economic growth and social development in Nepal.",
      purposes: [
        "To promote savings habits among members",
        "To provide credit facilities to members",
        "To promote cooperative principles and values",
        "To enhance financial literacy in the community",
        "To support entrepreneurship and business development",
        "To foster economic empowerment",
        "To build strong community relationships",
        "To ensure sustainable growth and development"
      ],
      values: [
        {
          title: "Integrity",
          description: "We conduct our business with honesty, transparency, and ethical practices.",
          icon: "🤝",
          images: []
        },
        {
          title: "Community Focus",
          description: "We prioritize the needs and development of our community members.",
          icon: "🏘️",
          images: []
        },
        {
          title: "Innovation",
          description: "We embrace new technologies and methods to better serve our members.",
          icon: "💡",
          images: []
        },
        {
          title: "Excellence",
          description: "We strive for excellence in all our services and operations.",
          icon: "⭐",
          images: []
        }
      ],
      milestones: [
        { year: "2010", event: "Cooperative established with 50 founding members", icon: "building", images: [] },
        { year: "2010", event: "First general assembly and committee formation", icon: "users", images: [] },
        { year: "2015", event: "Expanded services and reached 1000+ members", icon: "trending-up", images: [] },
        { year: "2020", event: "Launched digital banking services", icon: "globe", images: [] },
        { year: "2024", event: "Celebrated 14 years of service", icon: "calendar", images: [] },
        { year: "2025", event: "Awarded for excellence in cooperative banking", icon: "award", images: [] }
      ],
      communityImpacts: [
        {
          title: "Financial Literacy",
          description: "Conducted workshops reaching 500+ community members on financial management",
          metrics: "500+ participants trained",
          images: []
        },
        {
          title: "Business Development",
          description: "Supported 200+ small businesses through microfinance and training",
          metrics: "200+ businesses supported",
          images: []
        },
        {
          title: "Cultural Programs",
          description: "Organized community cultural events and festivals",
          metrics: "10+ annual events",
          images: []
        }
      ],
      seoTitle: "About Us - Constellation Saving and Credit Cooperative Limited",
      seoDescription: "Learn about our journey since 2010, serving the community through cooperative banking services. Discover our mission of shared growth and financial empowerment."
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    )
  }

  const data = aboutData || getFallbackData()

  // Safe data access with defaults
  const companyInfo = data.companyInfo || getFallbackData().companyInfo
  const story = data.story || getFallbackData().story
  const stats = data.stats || []
  const values = data.values || []
  const milestones = data.milestones || []
  const communityImpacts = data.communityImpacts || []
  const purposes = data.purposes || []

  return (
    <div className="min-h-screen">
      <SEO title={data.seoTitle} description={data.seoDescription} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 to-green-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">{data.heroTitle}</h1>
              <p className="text-xl md:text-2xl mb-8 leading-relaxed">{data.heroSubtitle}</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                  <Calendar className="w-4 h-4 mr-2" />
                  {companyInfo.establishedDate}
                </div>
                <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                  <MapPin className="w-4 h-4 mr-2" />
                  {companyInfo.location}
                </div>
                <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                  <Users className="w-4 h-4 mr-2" />
                  {companyInfo.registrationNumber}
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
                  src="https://res.cloudinary.com/dcsgax3ld/image/upload/v1765037533/constellation/businesses/szjea2titgfhlbzn4hp5.jpg"
                  alt="Constellation Cooperative Building"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-sm font-medium">{companyInfo.officeLocationLabel}</p>
                  <p className="text-xs opacity-90">{companyInfo.officeAddress}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {stats.length > 0 && (
        <section className="py-16 bg-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="text-center"
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300">
                    <div className="text-3xl lg:text-4xl font-bold text-green-600 mb-2">{stat.value}</div>
                    <div className="text-gray-900 font-semibold mb-1">{stat.label}</div>
                    <div className="text-sm text-gray-600">{stat.description}</div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Story Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{story.title}</h2>
              {story.paragraphs.map((paragraph: string, index: number) => (
                <p key={index} className="text-lg text-gray-600 mb-6 leading-relaxed">
                  {paragraph}
                </p>
              ))}

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{story.contactInfo.title}</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                    <span className="text-gray-700">
                      {story.contactInfo.address1}
                      <br />
                      {story.contactInfo.address2}
                      <br />
                      {story.contactInfo.registration}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Globe className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-gray-700">{story.contactInfo.ministryName}</span>
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
                  src="https://res.cloudinary.com/dcsgax3ld/image/upload/v1765005778/constellation/businesses/k3hlmodzutorz8vd8l3q.jpg"
                  alt="Member Meeting"
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg overflow-hidden shadow-md">
                  <img
                    src="https://res.cloudinary.com/dcsgax3ld/image/upload/v1756952859/a-lifestyle-advertisement-featuring-a-hy_E0x22UVzSD6uE0Q97QsUuA_Ttts0gdZRzWcxh_m5SJMSg_r2hjsj.jpg"
                    alt="ATM Services"
                    className="w-full h-32 object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden shadow-md">
                  <img
                    src="https://res.cloudinary.com/dcsgax3ld/image/upload/v1756952859/a-photograph-of-a-vibrant-financial-educ_DnnYVJB0RbmyoEfPu-TNKQ_YgZtt-fBRL2Vjn34n-94aQ_cg8uqr.jpg"
                    alt="Financial Education"
                    className="w-full h-32 object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Purposes Tabs */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Foundation</h2>
            <p className="text-xl text-gray-600">Built on strong principles and clear vision</p>
          </motion.div>

          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 rounded-lg p-1 flex">
              {["mission", "vision", "purposes"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-md font-medium transition-all duration-300 ${
                    activeTab === tab ? "bg-green-600 text-white shadow-md" : "text-gray-600 hover:text-green-600"
                  }`}
                >
                  {tab === "mission" ? "Mission" : tab === "vision" ? "Vision" : "Purposes"}
                </button>
              ))}
            </div>
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            {activeTab === "mission" && (
              <Card className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-lg text-gray-600 leading-relaxed">{data.mission}</p>
              </Card>
            )}

            {activeTab === "vision" && (
              <Card className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Eye className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                <p className="text-lg text-gray-600 leading-relaxed">{data.vision}</p>
              </Card>
            )}

            {activeTab === "purposes" && (
              <Card>
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Our Purposes</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {purposes.map((purpose: string, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start p-4 bg-gray-50 rounded-lg hover:bg-green-50 transition-colors duration-300"
                    >
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
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
      {values.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h3>
              <p className="text-xl text-gray-600">Guiding principles that define our cooperative spirit</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300">
                    <div className="text-4xl mb-4">{value.icon}</div>
                    <h4 className="text-lg font-bold text-gray-900 mb-3">{value.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Milestones Section */}
      {milestones.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
              <p className="text-xl text-gray-600">Milestones that shaped our success</p>
            </motion.div>

            <div className="relative">
              <div className="space-y-8">
                {milestones.map((milestone, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"} items-center gap-8`}
                  >
                    <div className="flex-1">
                      <Card className="h-full">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-2xl font-bold text-green-600">{milestone.year}</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.event}</h3>
                      </Card>
                    </div>
                    <div className="w-4 h-4 bg-green-600 rounded-full flex-shrink-0"></div>
                    <div className="flex-1"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Community Impact Section */}
      {communityImpacts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Community Impact</h2>
              <p className="text-xl text-gray-600">Making a difference in the lives we touch</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {communityImpacts.map((impact, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-green-50 to-white">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{impact.title}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{impact.description}</p>
                    <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {impact.metrics}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default About
