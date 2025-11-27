"use client"

import React, { useEffect, useRef, useState } from "react"
import { heroAPI, HeroContent, MediaItem } from "../../lib/heroApi"

const AUTO_PLAY_INTERVAL_MS = 3000 // 3 seconds per slide

const HeroSection: React.FC = () => {
  const [heroContent, setHeroContent] = useState<HeroContent | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const lastTransitionRef = useRef<number>(Date.now())

  // Fetch hero content
  useEffect(() => {
    let mounted = true
    const fetchContent = async () => {
      try {
        const content = await heroAPI.getActiveHeroContent()
        if (mounted) setHeroContent(content)
      } catch (err) {
        console.error("Failed to fetch hero content:", err)
        if (mounted) {
          setHeroContent({
            backgroundMedia: [
              { type: "image", url: "/placeholder-1.jpg", alt: "slide-1" },
              { type: "image", url: "/placeholder-2.jpg", alt: "slide-2" },
            ],
            currentMediaIndex: 0,
            isActive: true,
          })
        }
      }
    }

    fetchContent()
    return () => {
      mounted = false
    }
  }, [])

  // Auto-play logic with precise timing
  useEffect(() => {
    if (!heroContent || (heroContent.backgroundMedia?.length ?? 0) <= 1) return

    // Clear existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    if (!isPaused) {
      lastTransitionRef.current = Date.now()
      
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => {
          const nextIndex = (prev + 1) % heroContent.backgroundMedia.length
          lastTransitionRef.current = Date.now()
          return nextIndex
        })
      }, AUTO_PLAY_INTERVAL_MS)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [heroContent, isPaused])

  if (!heroContent) {
    return <section className="w-full h-[400px] bg-gray-100" />
  }

  const slides: MediaItem[] = heroContent.backgroundMedia ?? []

  const goTo = (idx: number) => {
    setCurrentIndex(idx % slides.length)
    lastTransitionRef.current = Date.now()
  }

  const onMouseEnter = () => setIsPaused(true)
  const onMouseLeave = () => setIsPaused(false)
  const onFocus = () => setIsPaused(true)
  const onBlur = () => setIsPaused(false)

  return (
    <section
      className="relative overflow-hidden w-full h-[640px] md:h-[600px] lg:h-[520px] xl:h-[470px] 2xl:h-[440px]"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      aria-label="Hero media carousel"
    >
      {/* Slides */}
      <div className="absolute inset-0 w-full h-full">
        {slides.map((media, idx) => {
          const isActive = idx === currentIndex
          return (
            <div
              key={idx}
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
              aria-hidden={!isActive}
            >
              {media.type === "video" ? (
                <video
                  className="w-full h-full object-cover"
                  src={media.url}
                  autoPlay={isActive}
                  loop
                  muted
                  playsInline
                />
              ) : (
                <img
                  className="w-full h-full object-cover"
                  src={media.url}
                  alt={media.alt}
                  loading="lazy"
                />
              )}
            </div>
          )
        })}
      </div>

      {/* Pager dots */}
      {slides.length > 1 && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-4 z-20 flex gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className={`w-3 h-3 rounded-full transition-[transform,background-color] duration-200 ${
                idx === currentIndex ? "scale-125 bg-white/90" : "bg-white/40"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default HeroSection