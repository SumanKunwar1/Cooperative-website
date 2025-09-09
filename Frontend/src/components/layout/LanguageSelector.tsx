// LanguageSelector.tsx
"use client"

import type React from "react"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"

interface LanguageSelectorProps {
  className?: string
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ className = "" }) => {
  const { i18n } = useTranslation()

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
    localStorage.setItem("i18nextLng", lng)
  }

  const currentLanguage = i18n.language

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* Nepal Flag Button */}
      <motion.button
        onClick={() => changeLanguage("np")}
        className={`relative flex items-center justify-center w-8 h-6 rounded-sm overflow-hidden border-2 transition-all duration-200 ${
          currentLanguage === "np"
            ? "border-blue-500 shadow-lg scale-110"
            : "border-gray-300 hover:border-gray-400 hover:scale-105"
        }`}
        whileHover={{ scale: currentLanguage === "np" ? 1.1 : 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="नेपाली"
      >
        {/* Nepal Flag */}
        <div className="w-full h-full relative">
          {/* Blue border triangle */}
          <div className="absolute inset-0 bg-blue-600">
            {/* Top triangle (red) */}
            <div
              className="absolute bg-red-600"
              style={{
                width: "0",
                height: "0",
                borderLeft: "16px solid transparent",
                borderRight: "16px solid transparent",
                borderBottom: "12px solid #dc2626",
                top: "0",
                left: "0",
              }}
            />
            {/* Bottom triangle (red) */}
            <div
              className="absolute bg-red-600"
              style={{
                width: "0",
                height: "0",
                borderLeft: "16px solid transparent",
                borderRight: "16px solid transparent",
                borderTop: "12px solid #dc2626",
                bottom: "0",
                left: "0",
              }}
            />
            {/* White symbols (simplified) */}
            <div className="absolute top-1 left-1 w-1 h-1 bg-white rounded-full"></div>
            <div className="absolute bottom-1 left-1 w-1.5 h-0.5 bg-white rounded-sm"></div>
          </div>
        </div>
      </motion.button>

      {/* UK Flag Button */}
      <motion.button
        onClick={() => changeLanguage("en")}
        className={`relative flex items-center justify-center w-8 h-6 rounded-sm overflow-hidden border-2 transition-all duration-200 ${
          currentLanguage === "en"
            ? "border-blue-500 shadow-lg scale-110"
            : "border-gray-300 hover:border-gray-400 hover:scale-105"
        }`}
        whileHover={{ scale: currentLanguage === "en" ? 1.1 : 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="English"
      >
        {/* UK Flag */}
        <div className="w-full h-full relative bg-blue-800">
          {/* White diagonal stripes */}
          <div className="absolute inset-0 bg-white transform rotate-45 origin-center w-0.5 left-3.5"></div>
          <div className="absolute inset-0 bg-white transform -rotate-45 origin-center w-0.5 left-3.5"></div>

          {/* Red diagonal stripes */}
          <div className="absolute inset-0 bg-red-600 transform rotate-45 origin-center w-0.5 left-3.5 scale-75"></div>
          <div className="absolute inset-0 bg-red-600 transform -rotate-45 origin-center w-0.5 left-3.5 scale-75"></div>

          {/* White cross */}
          <div className="absolute top-0 left-3 w-0.5 h-full bg-white"></div>
          <div className="absolute top-2.5 left-0 w-full h-0.5 bg-white"></div>

          {/* Red cross */}
          <div className="absolute top-0 left-3.5 w-0.5 h-full bg-red-600"></div>
          <div className="absolute top-3 left-0 w-full h-0.5 bg-red-600"></div>
        </div>
      </motion.button>
    </div>
  )
}

export default LanguageSelector
