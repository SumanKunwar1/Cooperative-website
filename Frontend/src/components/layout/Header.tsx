"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import LanguageSelector from "./LanguageSelector"
import { useTranslation } from "react-i18next"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t } = useTranslation()

  const socialMedia = [
    {
      name: "Facebook",
      url: "https://www.facebook.com/constellation.cooperative.2025",
      icon: "https://img.freepik.com/premium-vector/round-facebook-logo-isolated-white-background_469489-897.jpg?semt=ais_hybrid&w=740&q=80",
    },
    {
      name: "Twitter",
      url: "https://twitter.com",
      icon: "https://img.freepik.com/free-vector/twitter-new-2023-x-logo-white-background-vector_1017-45422.jpg",
    },
    {
      name: "WhatsApp",
      url: "https://wa.me",
      icon: "https://img.freepik.com/premium-photo/round-whatsapp-logo-isolated-white-background_469489-1039.jpg?semt=ais_incoming&w=740&q=80",
    },
    {
      name: "YouTube",
      url: "https://youtube.com",
      icon: "https://img.freepik.com/premium-vector/youtube-logo-youtube-is-videosharing-website-youtube-icon-eps-10-vector-illustration_981536-469.jpg?semt=ais_hybrid&w=740&q=80",
    },
    {
      name: "Instagram",
      url: "https://instagram.com",
      icon: "https://img.freepik.com/premium-vector/purple-gradiend-social-media-logo_197792-1883.jpg?semt=ais_hybrid&w=740&q=80",
    },
    {
      name: "Messenger",
      url: "https://messenger.com",
      icon: "https://img.freepik.com/premium-vector/messenger-app-icon-facebook-meta-platforms_277909-524.jpg?semt=ais_hybrid&w=740&q=80",
    },
  ]

  const navItems = [
    { label: t("home"), href: "/", key: "home" },
    { label: t("about"), href: "/about", key: "about" },
    { label: t("services"), href: "/services", key: "services" },
    { label: t("shop"), href: "/shop", key: "shop" },
    { label: t("businesses"), href: "/business-directory", key: "businesses" },
    { label: t("notices"), href: "/notice", key: "notices" },
    { label: t("report"), href: "/reports-bulletin", key: "report" },
    { label: t("download"), href: "/downloads", key: "download" },
    { label: t("ourTeam"), href: "/teams", key: "ourTeam" },
    { label: t("project"), href: "/projects", key: "project" },
    { label: t("footer-gallery"), href: "/gallery", key: "footer-gallery" },
    { label: t("footer-contact-info"), href: "/contact", key: "footer-contact-info" },
  ]

  return (
    <>
      {/* Top Section - Logo, Social Icons, Flags, Auth (NOT STICKY) */}
      <div className="bg-white border-b-2 border-[#07730E]">
        <div className="w-full px-2 sm:px-3 md:px-6 lg:px-8 py-2 sm:py-3 md:py-4">
          <div className="flex items-center justify-between gap-1 sm:gap-2 md:gap-4 lg:gap-6">
            {/* Logo - Far Left */}
            <div className="flex-shrink-0">
              <img
                src="https://res.cloudinary.com/dihev9qxc/image/upload/v1763985739/WhatsApp_Image_2025-11-24_at_10.47.58_37464530_pqsbzb.jpg"
                alt="Constellation Logo"
                className="h-12 sm:h-16 md:h-20 lg:h-24 w-auto object-contain"
              />
            </div>

            {/* Social Media Icons - 2x3 Grid - Hidden on mobile and tablet */}
            <div className="hidden lg:flex flex-col gap-0.5 md:gap-1 flex-shrink-0">
              <div className="flex gap-1 md:gap-2">
                {socialMedia.slice(0, 3).map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center hover:opacity-70 transition-opacity duration-200"
                    title={social.name}
                  >
                    <img
                      src={social.icon || "/placeholder.svg"}
                      alt={social.name}
                      className="h-5 md:h-7 lg:h-8 w-auto object-contain"
                    />
                  </a>
                ))}
              </div>
              <div className="flex gap-1 md:gap-2">
                {socialMedia.slice(3, 6).map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center hover:opacity-70 transition-opacity duration-200"
                    title={social.name}
                  >
                    <img
                      src={social.icon || "/placeholder.svg"}
                      alt={social.name}
                      className="h-5 md:h-7 lg:h-8 w-auto object-contain"
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* Language Selector - Hidden on mobile and tablet */}
            <div className="hidden lg:flex flex-shrink-0">
              <LanguageSelector />
            </div>

            {/* Auth Buttons - Visible on md and up */}
            <div className="hidden md:flex gap-1 lg:gap-2 flex-shrink-0">
              <a
                href="/login"
                className="px-2 md:px-2 lg:px-3 py-0.5 md:py-1 lg:py-1.5 text-gray-700 hover:text-gray-900 font-medium transition-colors text-xs md:text-xs lg:text-sm whitespace-nowrap flex items-center gap-1"
              >
                <svg className="w-3 h-3 lg:w-3.5 lg:h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
                {t("login")}
              </a>

              <a
                href="/register"
                className="px-2 md:px-2 lg:px-3 py-0.5 md:py-1 lg:py-1.5 bg-[#07730E] text-white rounded hover:bg-[#16572f] font-medium transition-colors text-xs md:text-xs lg:text-sm whitespace-nowrap"
              >
                {t("register")}
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-1.5 text-gray-700 hover:bg-gray-100 rounded transition-colors flex-shrink-0"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Menu - Professional Green Strip (STICKY) */}
      <nav className="sticky top-0 z-50 bg-[#07730E] shadow-md">
        <div className="w-full px-2 sm:px-3 md:px-6 lg:px-8">
          {/* Desktop Navigation - Equally Distributed */}
          <ul className="hidden md:flex items-center justify-between gap-0 py-2 md:py-2.5 lg:py-3">
            {navItems.map((item) => (
              <li key={item.key} className="flex-1 text-center">
                <a
                  href={item.href}
                  className="text-white hover:bg-[#0a5a0d] transition-colors duration-200 font-medium text-xs lg:text-sm px-0.5 md:px-1 lg:px-2 py-1 lg:py-1.5 rounded block whitespace-nowrap overflow-hidden text-ellipsis"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Auth Buttons - Only visible on mobile */}
          <div className="md:hidden flex gap-1 flex-shrink-0 ml-auto py-2">
            <a
              href="/login"
              className="px-2 py-0.5 text-white hover:opacity-80 font-medium transition-opacity text-xs whitespace-nowrap flex items-center gap-0.5"
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              {t("login")}
            </a>

            <a
              href="/register"
              className="px-2 py-0.5 bg-white text-[#07730E] rounded hover:bg-gray-100 font-medium transition-colors text-xs whitespace-nowrap"
            >
              {t("register")}
            </a>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-2 space-y-1 border-t border-[#0f4620]">
              {navItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  className="text-white hover:bg-[#0a5a0d] transition-colors duration-200 font-medium text-xs sm:text-sm px-2.5 py-1.5 rounded block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </nav>
    </>
  )
}

export default Header