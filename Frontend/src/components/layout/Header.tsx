"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import LanguageSelector from "./LanguageSelector"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
      url: "https://wa.me/9768772461",
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
    { label: "Home", href: "/", key: "home" },
    { label: "About Us", href: "/about", key: "about" },
    { label: "Services", href: "/services", key: "services" },
    { label: "Shop", href: "/shop", key: "shop" },
    { label: "Business Directory", href: "/business-directory", key: "businesses" },
    { label: "Notices", href: "/notice", key: "notices" },
    { label: "Report & Bulletin", href: "/reports-bulletin", key: "report" },
    { label: "Downloads", href: "/downloads", key: "download" },
    { label: "Our Team", href: "/teams", key: "ourTeam" },
    { label: "Projects", href: "/projects", key: "project" },
    { label: "Gallery", href: "/gallery", key: "footer-gallery" },
    { label: "Contact", href: "/contact", key: "footer-contact-info" },
  ]

  return (
    <>
      {/* Top Section - Optimized for Mobile */}
      <div className="bg-white border-b-2 border-[#07730E]">
        {/* Mobile/Tablet View - Stacked Layout */}
        <div className="md:hidden w-full px-2 py-2">
          {/* First Row: Logo + Menu Button */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex-shrink-0">
              <img
                src="https://res.cloudinary.com/dihev9qxc/image/upload/v1763985739/WhatsApp_Image_2025-11-24_at_10.47.58_37464530_pqsbzb.jpg"
                alt="Constellation Logo"
                className="h-12 w-auto object-contain"
              />
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-1.5 text-gray-700 hover:bg-gray-100 rounded transition-colors flex-shrink-0"
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

          {/* Second Row: Social Media Icons + Language Selector - Horizontal Scroll */}
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-1 pb-1 min-w-max items-center">
              {socialMedia.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center hover:opacity-70 transition-opacity duration-200 flex-shrink-0"
                  title={social.name}
                >
                  <img
                    src={social.icon || "/placeholder.svg"}
                    alt={social.name}
                    className="h-6 w-6 object-contain"
                  />
                </a>
              ))}
              
              {/* Language Selector in same row */}
              <div className="flex-shrink-0 ml-1 pl-1 border-l border-gray-300">
                <LanguageSelector className="gap-1" />
              </div>
            </div>
          </div>

          {/* Third Row: Mobile Auth Buttons */}
          <div className="flex gap-1 mt-2">
            <a
              href="/login"
              className="flex-1 px-2 py-1.5 text-gray-700 hover:bg-gray-100 font-medium transition-colors text-xs whitespace-nowrap flex items-center justify-center gap-1 border border-gray-300 rounded"
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              Login
            </a>

            <a
              href="/register"
              className="flex-1 px-2 py-1.5 bg-[#07730E] text-white rounded hover:bg-[#16572f] font-medium transition-colors text-xs whitespace-nowrap"
            >
              Register
            </a>
          </div>
        </div>

        {/* Desktop View - Original Layout */}
        <div className="hidden md:block w-full px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4 lg:gap-6">
            {/* Logo */}
            <div className="flex-shrink-0">
              <img
                src="https://res.cloudinary.com/dihev9qxc/image/upload/v1763985739/WhatsApp_Image_2025-11-24_at_10.47.58_37464530_pqsbzb.jpg"
                alt="Constellation Logo"
                className="h-20 lg:h-24 w-auto object-contain"
              />
            </div>

            {/* Social Media Icons - Grid (Desktop) */}
            <div className="flex flex-col gap-1 flex-shrink-0">
              <div className="flex gap-2">
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
                      className="h-7 lg:h-8 w-auto object-contain"
                    />
                  </a>
                ))}
              </div>
              <div className="flex gap-2">
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
                      className="h-7 lg:h-8 w-auto object-contain"
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* Language Selector */}
            <div className="flex flex-shrink-0">
              <LanguageSelector />
            </div>

            {/* Auth Buttons - Desktop */}
            <div className="flex gap-2 flex-shrink-0">
              <a
                href="/login"
                className="px-3 py-1.5 text-gray-700 hover:text-gray-900 font-medium transition-colors text-sm whitespace-nowrap flex items-center gap-1"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
                Login
              </a>

              <a
                href="/register"
                className="px-3 py-1.5 bg-[#07730E] text-white rounded hover:bg-[#16572f] font-medium transition-colors text-sm whitespace-nowrap"
              >
                Register
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu - Professional Green Strip (STICKY) */}
      <nav className="sticky top-0 z-50 bg-[#07730E] shadow-md">
        <div className="w-full px-2 sm:px-3 md:px-6 lg:px-8">
          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center justify-between gap-0 py-2 md:py-2.5 lg:py-3">
            {navItems.map((item) => (
              <li key={item.key} className="flex-1 text-center">
                <a
                  href={item.href}
                  className="text-white hover:bg-[#0a5a0d] transition-colors duration-200 font-medium text-xs lg:text-sm px-1 lg:px-2 py-1 lg:py-1.5 rounded block whitespace-nowrap overflow-hidden text-ellipsis"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Navigation - Dropdown Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-2 space-y-1 border-t border-[#0f4620] max-h-96 overflow-y-auto">
              {navItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  className="text-white hover:bg-[#0a5a0d] transition-colors duration-200 font-medium text-xs px-2.5 py-1.5 rounded block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hide scrollbar for horizontal scroll on mobile */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  )
}

export default Header