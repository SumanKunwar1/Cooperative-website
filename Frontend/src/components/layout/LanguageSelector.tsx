"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { autoTranslationService } from "../../services/autoTranslationService"
import ReactCountryFlag from "react-country-flag"

interface LanguageSelectorProps {
  className?: string
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ className = "" }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en')
  const [isTranslating, setIsTranslating] = useState(false)

  useEffect(() => {
    // Always start with English
    const savedLang = localStorage.getItem('preferred-language') || 'en'
    setCurrentLanguage(savedLang)
  }, [])

  const changeLanguage = async (lng: string) => {
    if (lng === currentLanguage || isTranslating) return
    
    setIsTranslating(true)
    
    try {
      await autoTranslationService.translatePage(lng)
      setCurrentLanguage(lng)
      localStorage.setItem('preferred-language', lng)
    } catch (error) {
      console.error('Language change failed:', error)
      alert('Translation failed. Please try again.')
    } finally {
      setIsTranslating(false)
    }
  }

  const btnBase = "relative flex items-center justify-center w-8 h-6 rounded-sm overflow-hidden transition-all duration-200 bg-white"

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {isTranslating && (
        <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
      )}
      
      {/* Nepali Flag - Click to translate to Nepali */}
      <motion.button
        onClick={() => changeLanguage("np")}
        disabled={isTranslating}
        className={`${btnBase} ${
          currentLanguage === "np"
            ? "ring-2 ring-green-500 shadow-md scale-110"
            : "opacity-90 hover:opacity-100 hover:scale-105"
        } disabled:opacity-50`}
        whileHover={{ scale: currentLanguage === "np" ? 1.12 : 1.06 }}
        whileTap={{ scale: 0.95 }}
        title="नेपाली"
      >
        <ReactCountryFlag
          countryCode="NP"
          svg
          style={{
            width: "2.3rem",
            height: "2.3rem",
          }}
        />
      </motion.button>

      {/* English Flag - Click to translate to English */}
      <motion.button
        onClick={() => changeLanguage("en")}
        disabled={isTranslating}
        className={`${btnBase} ${
          currentLanguage === "en"
            ? "ring-2 ring-green-500 shadow-md scale-110"
            : "opacity-90 hover:opacity-100 hover:scale-105"
        } disabled:opacity-50`}
        whileHover={{ scale: currentLanguage === "en" ? 1.12 : 1.06 }}
        whileTap={{ scale: 0.95 }}
        title="English"
      >
        <ReactCountryFlag
          countryCode="GB"
          svg
          style={{
            width: "2.3rem",
            height: "2.3rem",
          }}
        />
      </motion.button>
    </div>
  )
}

export default LanguageSelector