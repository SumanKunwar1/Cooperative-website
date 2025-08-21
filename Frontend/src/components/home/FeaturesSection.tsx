"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Shield, TrendingUp, Users, Globe } from "lucide-react"
import Card from "../ui/Card"

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: "Reliability",
      description: "Secure cooperative licensed under Nepal's Cooperative Act with proven track record since 2007.",
    },
    {
      icon: TrendingUp,
      title: "Accessibility",
      description: "Easy savings and credit services for all members with flexible deposit and withdrawal options.",
    },
    {
      icon: Users,
      title: "Modern Facilities",
      description: "Digital banking, ATM, online transactions, and contemporary banking solutions.",
    },
    {
      icon: Globe,
      title: "Transparency",
      description: "Regular audits, financial reporting, and transparent operations for member confidence.",
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Key Features of Constellation</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Reliability, Accessibility, Modern Facilities, Transparency, Community Focus, and Professional Management.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="text-center h-full">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
