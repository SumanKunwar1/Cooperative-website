// About.tsx
"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Target, Eye, Award, Users, TrendingUp, Building, Calendar, Globe, MapPin, Star } from "lucide-react"
import SEO from "../components/common/SEO"
import Card from "../components/ui/Card"
import { useTranslation } from "react-i18next"

const About: React.FC = () => {
  const [] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("mission")
  const { t } = useTranslation()

  const values = [
    {
      icon: Target,
      title: t("value-title-mutual-trust"),
      description: t("value-desc-mutual-trust"),
    },
    {
      icon: Users,
      title: t("value-title-community-support"),
      description: t("value-desc-community-support"),
    },
    {
      icon: TrendingUp,
      title: t("value-title-financial-empowerment"),
      description: t("value-desc-financial-empowerment"),
    },
    {
      icon: Award,
      title: t("value-title-strong-relationships"),
      description: t("value-desc-strong-relationships"),
    },
  ]

  const milestones = [
    {
      year: "2010",
      event: t("milestone-2010-0"),
      icon: Building,
    },
    { 
      year: "2010", 
      event: t("milestone-2010-1"), 
      icon: Users 
    },
    {
      year: "2015",
      event: t("milestone-2015-2"),
      icon: TrendingUp,
    },
    { 
      year: "2020", 
      event: t("milestone-2020-3"), 
      icon: Globe 
    },
    {
      year: "2024",
      event: t("milestone-2024-4"),
      icon: Calendar,
    },
    { 
      year: "2025", 
      event: t("milestone-2025-5"), 
      icon: Award 
    },
  ]

  const stats = [
    { label: t("stat-years-of-service"), value: "15+", description: t("stat-desc-years-of-service") },
    { label: t("stat-registration-no."), value: "3163/066/067", description: t("stat-desc-registration-no.") },
    { label: t("stat-experience"), value: "20+", description: t("stat-desc-experience") },
    { label: t("stat-committee-term"), value: "2081-2086", description: t("stat-desc-committee-term") },
  ]

  const purposes = [
    t("purpose-1"),
    t("purpose-2"),
    t("purpose-3"),
    t("purpose-4"),
    t("purpose-5"),
    t("purpose-6"),
    t("purpose-7"),
    t("purpose-8"),
  ]

  return (
    <div className="min-h-screen">
      <SEO
        title="About Us - Constellation Saving and Credit Cooperative Limited"
        description="Learn about our journey since 2010, serving the community through cooperative banking services. Discover our mission of shared growth and financial empowerment."
      />

      {/* Hero Section with Company Image */}
      <section className="relative bg-gradient-to-r from-green-600 to-green-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">{t("about-hero-title")}</h1>
              <p className="text-xl md:text-2xl mb-8 leading-relaxed">
                {t("about-hero-subtitle")}
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                  <Calendar className="w-4 h-4 mr-2" />
                  {t("established-date")}
                </div>
                <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                  <MapPin className="w-4 h-4 mr-2" />
                  {t("location")}
                </div>
                <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                  <Users className="w-4 h-4 mr-2" />
                  {t("registration-number")}
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
                  src="https://res.cloudinary.com/dcsgax3ld/image/upload/v1756952860/a-lifestyle-advertisement-for-constellat_FI7enEI2QL2txykwtyrADg_ndM-eqhmSj61c2yOQhmxig_zhfjec.jpg"
                  alt="Constellation Cooperative Building"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-sm font-medium">{t("office-location-label")}</p>
                  <p className="text-xs opacity-90">{t("office-address")}</p>
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
                  <div className="text-3xl lg:text-4xl font-bold text-green-600 mb-2">{stat.value}</div>
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{t("our-story-title")}</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {t("story-paragraph-1")}
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {t("story-paragraph-2")}
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {t("story-paragraph-3")}
              </p>

              {/* Contact Information */}
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{t("contact-info-title")}</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                    <span className="text-gray-700">
                      {t("contact-address-1")}
                      <br />
                      {t("contact-address-2")}
                      <br />
                      {t("contact-registration")}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Globe className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-gray-700">
                      {t("ministry-name")}
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
                  src="https://res.cloudinary.com/dcsgax3ld/image/upload/v1756952860/a-photograph-of-a-cooperative-boardroom-_6wY51f7wRICLsJIvK_U8-w_idJgcaJhS7uKnL0TyKO3eQ_dfgl3u.jpg"
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

      {/* Interactive Mission, Vision, Values Tabs */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t("foundation-title")}</h2>
            <p className="text-xl text-gray-600">{t("foundation-subtitle")}</p>
          </motion.div>

          {/* Tab Navigation */}
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
                  {t(`tab-${tab}`)}
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
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{t("mission-title")}</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {t("mission-content")}
                </p>
              </Card>
            )}

            {activeTab === "vision" && (
              <Card className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Eye className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{t("vision-title")}</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {t("vision-content")}
                </p>
              </Card>
            )}

            {activeTab === "purposes" && (
              <Card>
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{t("purposes-title")}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {purposes.map((purpose, index) => (
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
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-4">{t("values-title")}</h3>
            <p className="text-xl text-gray-600">{t("values-subtitle")}</p>
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
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <value.icon className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="text-xl font-semibold mb-4">{value.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive History Timeline */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-4">{t("journey-title")}</h3>
            <p className="text-xl text-gray-600">{t("journey-subtitle")}</p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-0.5 w-1 bg-green-200 h-full"></div>

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
                          className={`w-10 h-10 bg-green-100 rounded-full flex items-center justify-center ${
                            index % 2 === 0 ? "ml-auto" : ""
                          }`}
                        >
                          <milestone.icon className="w-5 h-5 text-green-600" />
                        </div>
                        {index % 2 === 0 && (
                          <span className="text-2xl font-bold text-green-600 mr-4">{milestone.year}</span>
                        )}
                        {index % 2 !== 0 && (
                          <span className="text-2xl font-bold text-green-600 ml-4">{milestone.year}</span>
                        )}
                      </div>
                      <p className="text-gray-700">{milestone.event}</p>
                    </Card>
                  </motion.div>
                </div>

                {/* Timeline dot */}
                <motion.div
                  className="w-4 h-4 bg-green-600 rounded-full border-4 border-white shadow-lg"
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
            <h3 className="text-3xl font-bold text-gray-900 mb-4">{t("community-impact-title")}</h3>
            <p className="text-xl text-gray-600">{t("community-impact-subtitle")}</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-6">
                  <h4 className="text-xl font-semibold text-green-900 mb-4">{t("financial-literacy-title")}</h4>
                  <p className="text-green-800">
                    {t("financial-literacy-desc")}
                  </p>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-6">
                  <h4 className="text-xl font-semibold text-green-900 mb-4">{t("business-development-title")}</h4>
                  <p className="text-green-800">
                    {t("business-development-desc")}
                  </p>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-6">
                  <h4 className="text-xl font-semibold text-orange-900 mb-4">{t("cultural-programs-title")}</h4>
                  <p className="text-orange-800">
                    {t("cultural-programs-desc")}
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
                    src="https://res.cloudinary.com/dcsgax3ld/image/upload/v1756952859/a-photograph-of-a-financial-education-wo_KjyGH8n6QFS9lOTn8TUs8g_YgZtt-fBRL2Vjn34n-94aQ_aa8afm.jpg"
                    alt="Financial Literacy Workshop"
                    className="w-full h-32 object-cover"
                  />
                </div>
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <img
                    src="https://res.cloudinary.com/dcsgax3ld/image/upload/v1756952860/a-lifestyle-advertisement-for-constellat_FI7enEI2QL2txykwtyrADg_ndM-eqhmSj61c2yOQhmxig_zhfjec.jpg"
                    alt="Business Exhibition"
                    className="w-full h-40 object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <img
                    src="https://res.cloudinary.com/dcsgax3ld/image/upload/v1756952859/a-photograph-of-a-cooperative-boardroom-_Qc-W-egkSmW3LZCcZmSpNw_idJgcaJhS7uKnL0TyKO3eQ_zs9yas.jpg"
                    alt="Cultural Festival"
                    className="w-full h-40 object-cover"
                  />
                </div>
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <img
                    src="https://res.cloudinary.com/dcsgax3ld/image/upload/v1756953197/a-dynamic-lifestyle-advertisement-for-co_7BNCAb3FS2y9y3KkatZczQ_ynsFbyEfR0W00xmli7OuEQ_esrgwe.jpg"
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