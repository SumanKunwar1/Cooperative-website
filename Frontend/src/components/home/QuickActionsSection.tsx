"use client"

import type React from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Users, Store, Globe, Calendar } from "lucide-react"
import { useTranslation } from "react-i18next"
import Card from "../ui/Card"

const QuickActionsSection: React.FC = () => {
  const { t } = useTranslation()

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Link to="/login">
              <Card hover className="text-center h-full">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{t("quick-actions-member-login")}</h3>
                <p className="text-gray-600 text-sm">{t("quick-actions-member-login-desc")}</p>
              </Card>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Link to="/business-registration">
              <Card hover className="text-center h-full bg-gradient-to-r from-yellow-50 to-yellow-100">
                <div className="w-12 h-12 bg-gold-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Store className="w-6 h-6 text-gold-700" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{t("quick-actions-register-business")}</h3>
                <p className="text-gray-600 text-sm">{t("quick-actions-register-business-desc")}</p>
              </Card>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/shop">
              <Card hover className="text-center h-full">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{t("quick-actions-shop")}</h3>
                <p className="text-gray-600 text-sm">{t("quick-actions-shop-desc")}</p>
              </Card>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link to="/events">
              <Card hover className="text-center h-full">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{t("quick-actions-events")}</h3>
                <p className="text-gray-600 text-sm">{t("quick-actions-events-desc")}</p>
              </Card>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default QuickActionsSection
