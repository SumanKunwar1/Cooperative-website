// components/RootWrapper.tsx
"use client"

import React, { useEffect } from 'react'
import { autoTranslationService } from '../../services/autoTranslationService'

interface RootWrapperProps {
  children: React.ReactNode
}

const RootWrapper: React.FC<RootWrapperProps> = ({ children }) => {
  useEffect(() => {
    // Initialize translation service
    autoTranslationService.enable()
    
    // Apply saved language on initial load
    const savedLang = localStorage.getItem('preferred-language')
    if (savedLang && savedLang !== 'en') {
      // Small delay to ensure DOM is fully loaded
      setTimeout(() => {
        autoTranslationService.translatePage(savedLang).catch(console.error)
      }, 1000)
    }

    // Add global styles for translated content
    const style = document.createElement('style')
    style.textContent = `
      [data-translated] {
        transition: opacity 0.3s ease;
      }
      .translation-loading {
        opacity: 0.5;
      }
      .no-translate, [data-notranslate] {
        translate: none !important;
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return <>{children}</>
}

export default RootWrapper