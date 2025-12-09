// services/SimpleTranslateService.ts (Production-Ready with Rate Limit Protection)
"use client"

class SimpleTranslateService {
  private cache = new Map<string, string>()
  private pendingRequests = new Map<string, Promise<string>>()
  private requestCount = 0
  private readonly MAX_REQUESTS_PER_MINUTE = 20 // Conservative limit
  private failedAPIs = new Set<string>()

  constructor() {
    this.loadCache()
    this.startRequestCounterReset()
  }

  private startRequestCounterReset() {
    // Reset request counter every minute
    setInterval(() => {
      this.requestCount = 0
    }, 60000)

    // Reset failed APIs every 5 minutes
    setInterval(() => {
      this.failedAPIs.clear()
    }, 300000)
  }

  private loadCache() {
    if (typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem('simple-translation-cache')
        if (cached) {
          const entries = JSON.parse(cached)
          entries.forEach(([key, value]: [string, string]) => {
            this.cache.set(key, value)
          })
          console.log(`Loaded ${this.cache.size} cached translations`)
        }
      } catch (e) {
        console.warn('Failed to load translation cache:', e)
      }
    }
  }

  private saveCache() {
    if (typeof window !== 'undefined') {
      try {
        const entries = Array.from(this.cache.entries())
        localStorage.setItem('simple-translation-cache', JSON.stringify(entries))
      } catch (e) {
        console.warn('Failed to save translation cache:', e)
      }
    }
  }

  private getCacheKey(text: string, targetLang: string): string {
    return `${targetLang}:${text.toLowerCase().trim()}`
  }

  private canMakeRequest(): boolean {
    return this.requestCount < this.MAX_REQUESTS_PER_MINUTE
  }

  private incrementRequestCount() {
    this.requestCount++
  }

  // API 1: MyMemory
  private async translateWithMyMemory(text: string, targetLang: string): Promise<string> {
    if (this.failedAPIs.has('mymemory')) throw new Error('MyMemory temporarily unavailable')
    
    const target = targetLang === 'np' ? 'ne' : targetLang
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${target}`
    
    try {
      const response = await fetch(url, {
        method: 'GET',
        signal: AbortSignal.timeout(3000)
      })

      if (response.status === 429 || response.status === 403) {
        this.failedAPIs.add('mymemory')
        throw new Error('Rate limited')
      }

      if (response.ok) {
        const data = await response.json()
        const translated = data.responseData?.translatedText
        if (translated && translated !== text) {
          return translated
        }
      }
    } catch (error: any) {
      if (error.message?.includes('429') || error.message?.includes('403')) {
        this.failedAPIs.add('mymemory')
      }
      throw error
    }
    
    throw new Error('MyMemory failed')
  }

  // API 2: Alternative Free API - Translate.com
  private async translateWithTranslateAPI(text: string, targetLang: string): Promise<string> {
    if (this.failedAPIs.has('translateapi')) throw new Error('TranslateAPI temporarily unavailable')
    
    const target = targetLang === 'np' ? 'ne' : targetLang
    
    try {
      // Using a different endpoint that's more reliable
      const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${target}&dt=t&q=${encodeURIComponent(text)}`, {
        method: 'GET',
        signal: AbortSignal.timeout(3000)
      })

      if (response.status === 429 || response.status === 403) {
        this.failedAPIs.add('translateapi')
        throw new Error('Rate limited')
      }

      if (response.ok) {
        const data = await response.json()
        if (data && data[0] && data[0][0] && data[0][0][0]) {
          const translated = data[0][0][0]
          if (translated !== text) {
            return translated
          }
        }
      }
    } catch (error: any) {
      if (error.message?.includes('429') || error.message?.includes('403')) {
        this.failedAPIs.add('translateapi')
      }
      throw error
    }
    
    throw new Error('TranslateAPI failed')
  }

  // API 3: Lingva Translate
  private async translateWithLingva(text: string, targetLang: string): Promise<string> {
    if (this.failedAPIs.has('lingva')) throw new Error('Lingva temporarily unavailable')
    
    const target = targetLang === 'np' ? 'ne' : targetLang
    
    try {
      const response = await fetch(`https://lingva.ml/api/v1/en/${target}/${encodeURIComponent(text)}`, {
        method: 'GET',
        signal: AbortSignal.timeout(3000)
      })

      if (response.status === 429 || response.status === 403) {
        this.failedAPIs.add('lingva')
        throw new Error('Rate limited')
      }

      if (response.ok) {
        const data = await response.json()
        if (data.translation && data.translation !== text) {
          return data.translation
        }
      }
    } catch (error: any) {
      if (error.message?.includes('429') || error.message?.includes('403')) {
        this.failedAPIs.add('lingva')
      }
      throw error
    }
    
    throw new Error('Lingva failed')
  }

  async translate(text: string, targetLang: string): Promise<string> {
    if (!text || text.trim().length < 2) return text
    if (targetLang === 'en') return text

    const cacheKey = this.getCacheKey(text, targetLang)
    
    // ALWAYS return from cache if available (most important optimization)
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!
    }

    // Check if already requesting
    if (this.pendingRequests.has(cacheKey)) {
      return this.pendingRequests.get(cacheKey)!
    }

    // Check rate limit
    if (!this.canMakeRequest()) {
      console.warn('Rate limit reached, returning original text')
      return text
    }

    // Create translation request
    const translationPromise = (async () => {
      this.incrementRequestCount()

      try {
        let translated = text
        let lastError = null

        // Try available APIs in order
        const apiMethods = [
          { name: 'translateapi', fn: () => this.translateWithTranslateAPI(text, targetLang) },
          { name: 'lingva', fn: () => this.translateWithLingva(text, targetLang) },
          { name: 'mymemory', fn: () => this.translateWithMyMemory(text, targetLang) },
        ]

        // Try each API that hasn't failed
        for (const api of apiMethods) {
          if (!this.failedAPIs.has(api.name)) {
            try {
              translated = await api.fn()
              if (translated !== text) {
                break // Success!
              }
            } catch (error) {
              lastError = error
              console.warn(`${api.name} failed:`, error)
              // Continue to next API
            }
          }
        }

        // Cache result (even if translation failed, cache original to avoid re-requesting)
        this.cache.set(cacheKey, translated)
        
        // Save cache periodically
        if (this.cache.size % 50 === 0) {
          this.saveCache()
        }

        return translated
      } catch (error) {
        console.warn('All translation APIs failed:', error)
        // Cache the original text to prevent repeated failures
        this.cache.set(cacheKey, text)
        return text
      } finally {
        this.pendingRequests.delete(cacheKey)
      }
    })()

    this.pendingRequests.set(cacheKey, translationPromise)
    return translationPromise
  }

  clearCache() {
    this.cache.clear()
    this.pendingRequests.clear()
    this.requestCount = 0
    this.failedAPIs.clear()
    localStorage.removeItem('simple-translation-cache')
  }

  getStats() {
    return {
      cacheSize: this.cache.size,
      requestsThisMinute: this.requestCount,
      failedAPIs: Array.from(this.failedAPIs),
      maxRequestsPerMinute: this.MAX_REQUESTS_PER_MINUTE
    }
  }
}

export const simpleTranslateService = new SimpleTranslateService()