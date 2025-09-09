// LanguageSelector.tsx
"use client"

import React from "react"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import ReactCountryFlag from "react-country-flag"

interface LanguageSelectorProps {
  className?: string
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ className = "" }) => {
  const { i18n } = useTranslation()

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("i18nextLng", lng)
    }
  }

  const currentLanguage = i18n.language

  const btnBase =
    "relative flex items-center justify-center w-8 h-6 rounded-sm overflow-hidden transition-all duration-200 bg-white"

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* Nepal Flag */}
      <motion.button
        onClick={() => changeLanguage("np")}
        className={`${btnBase} ${
          currentLanguage === "np"
            ? "ring-2 ring-blue-500 shadow-xl scale-110"
            : "opacity-90 hover:opacity-100 hover:scale-105"
        }`}
        whileHover={{ scale: currentLanguage === "np" ? 1.12 : 1.06 }}
        whileTap={{ scale: 0.97 }}
        title="नेपाली"
        aria-label="Switch language to Nepali"
      >
        <ReactCountryFlag
          countryCode="NP"
          svg
          style={{
            width: "2rem",
            height: "2rem",
          }}
        />
      </motion.button>

      {/* UK Flag */}
      <motion.button
        onClick={() => changeLanguage("en")}
        className={`${btnBase} ${
          currentLanguage === "en"
            ? "ring-2 ring-blue-500 shadow-xl scale-110"
            : "opacity-90 hover:opacity-100 hover:scale-105"
        }`}
        whileHover={{ scale: currentLanguage === "en" ? 1.12 : 1.06 }}
        whileTap={{ scale: 0.97 }}
        title="English"
        aria-label="Switch language to English"
      >
        <ReactCountryFlag
          countryCode="GB"
          svg
          style={{
            width: "2rem",
            height: "2rem",
          }}
        />
      </motion.button>
    </div>
  )
}

export default LanguageSelector
