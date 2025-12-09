// services/SimpleTranslateService.ts (Production-Ready with Enhanced Rate Limit Protection)
"use client"

class SimpleTranslateService {
  private cache = new Map<string, string>()
  private pendingRequests = new Map<string, Promise<string>>()
  private requestCount = 0
  private readonly MAX_REQUESTS_PER_MINUTE = 15 // More conservative limit
  private readonly REQUEST_DELAY_MS = 300 // Delay between requests
  private lastRequestTime = 0
  private failedAPIs = new Set<string>()
  private apiFailureTimestamps = new Map<string, number[]>()

  constructor() {
    this.loadCache()
    this.startRequestCounterReset()
  }

  private startRequestCounterReset(): void {
    // Reset request counter every minute
    setInterval(() => {
      this.requestCount = 0
    }, 60000)

    // Reset failed APIs every 10 minutes instead of 5
    setInterval(() => {
      this.failedAPIs.clear()
      this.apiFailureTimestamps.clear()
    }, 600000)
  }

  private loadCache(): void {
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

  private saveCache(): void {
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

  private incrementRequestCount(): void {
    this.requestCount++
  }

  private async respectRateLimit(): Promise<void> {
    const now = Date.now()
    const timeSinceLastRequest = now - this.lastRequestTime
    
    if (timeSinceLastRequest < this.REQUEST_DELAY_MS) {
      const delayNeeded = this.REQUEST_DELAY_MS - timeSinceLastRequest
      await new Promise(resolve => setTimeout(resolve, delayNeeded))
    }
    
    this.lastRequestTime = Date.now()
  }

  private trackAPIFailure(apiName: string): void {
    if (!this.apiFailureTimestamps.has(apiName)) {
      this.apiFailureTimestamps.set(apiName, [])
    }
    
    const timestamps = this.apiFailureTimestamps.get(apiName)!
    const now = Date.now()
    timestamps.push(now)
    
    // Keep only failures from last 5 minutes
    const fiveMinutesAgo = now - 5 * 60 * 1000
    const recentFailures = timestamps.filter(t => t > fiveMinutesAgo)
    this.apiFailureTimestamps.set(apiName, recentFailures)
    
    // Disable API if more than 3 failures in 5 minutes
    if (recentFailures.length > 3) {
      this.failedAPIs.add(apiName)
      console.warn(`${apiName} disabled due to repeated failures`)
    }
  }

  private isAPIAvailable(apiName: string): boolean {
    return !this.failedAPIs.has(apiName)
  }

  // API 1: Google Translate (Most Reliable)
  private async translateWithGoogle(text: string, targetLang: string): Promise<string> {
    if (!this.isAPIAvailable('google')) throw new Error('Google Translate unavailable')
    
    const target = targetLang === 'np' ? 'ne' : targetLang
    
    try {
      await this.respectRateLimit()
      
      const response = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${target}&dt=t&q=${encodeURIComponent(text)}`,
        {
          method: 'GET',
          headers: {
            'User-Agent': 'Mozilla/5.0'
          },
          signal: AbortSignal.timeout(3000)
        }
      )

      if (response.status === 429) {
        this.trackAPIFailure('google')
        throw new Error('Rate limited')
      }

      if (response.status === 403) {
        this.trackAPIFailure('google')
        throw new Error('Forbidden')
      }

      if (response.ok) {
        const data = await response.json()
        if (data && Array.isArray(data) && data[0] && Array.isArray(data[0]) && data[0][0]) {
          const translated = data[0][0][0]
          if (translated && typeof translated === 'string' && translated !== text) {
            return translated
          }
        }
      }
    } catch (error: any) {
      if (error.message?.includes('Rate limited') || error.message?.includes('Forbidden')) {
        this.trackAPIFailure('google')
      }
      throw error
    }
    
    throw new Error('Google Translate failed')
  }

  // API 2: MyMemory (Backup)
  private async translateWithMyMemory(text: string, targetLang: string): Promise<string> {
    if (!this.isAPIAvailable('mymemory')) throw new Error('MyMemory unavailable')
    
    const target = targetLang === 'np' ? 'ne' : targetLang
    
    try {
      await this.respectRateLimit()
      
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${target}`,
        {
          method: 'GET',
          signal: AbortSignal.timeout(3000)
        }
      )

      if (response.status === 429) {
        this.trackAPIFailure('mymemory')
        throw new Error('Rate limited')
      }

      if (response.status === 403) {
        this.trackAPIFailure('mymemory')
        throw new Error('Forbidden')
      }

      if (response.ok) {
        const data = await response.json()
        const translated = data.responseData?.translatedText
        if (translated && translated !== text) {
          return translated
        }
      }
    } catch (error: any) {
      if (error.message?.includes('Rate limited') || error.message?.includes('Forbidden')) {
        this.trackAPIFailure('mymemory')
      }
      throw error
    }
    
    throw new Error('MyMemory failed')
  }

  // API 3: Lingva (Lightweight Alternative)
  private async translateWithLingva(text: string, targetLang: string): Promise<string> {
    if (!this.isAPIAvailable('lingva')) throw new Error('Lingva unavailable')
    
    const target = targetLang === 'np' ? 'ne' : targetLang
    
    try {
      await this.respectRateLimit()
      
      const response = await fetch(
        `https://lingva.ml/api/v1/en/${target}/${encodeURIComponent(text)}`,
        {
          method: 'GET',
          signal: AbortSignal.timeout(3000)
        }
      )

      if (response.status === 429) {
        this.trackAPIFailure('lingva')
        throw new Error('Rate limited')
      }

      if (response.status === 403) {
        this.trackAPIFailure('lingva')
        throw new Error('Forbidden')
      }

      if (response.ok) {
        const data = await response.json()
        if (data.translation && data.translation !== text) {
          return data.translation
        }
      }
    } catch (error: any) {
      if (error.message?.includes('Rate limited') || error.message?.includes('Forbidden')) {
        this.trackAPIFailure('lingva')
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

    // Check if already requesting (deduplication)
    if (this.pendingRequests.has(cacheKey)) {
      return this.pendingRequests.get(cacheKey)!
    }

    // Check rate limit
    if (!this.canMakeRequest()) {
      console.warn('Rate limit reached for this minute, using original text')
      // Cache to prevent re-requesting
      this.cache.set(cacheKey, text)
      return text
    }

    // Create translation request
    const translationPromise = (async (): Promise<string> => {
      this.incrementRequestCount()

      try {
        let translated = text

        // Try available APIs in order of reliability
        const apiMethods = [
          { name: 'google', fn: () => this.translateWithGoogle(text, targetLang) },
          { name: 'mymemory', fn: () => this.translateWithMyMemory(text, targetLang) },
          { name: 'lingva', fn: () => this.translateWithLingva(text, targetLang) },
        ]

        // Try each API that hasn't been disabled
        for (const api of apiMethods) {
          if (this.isAPIAvailable(api.name)) {
            try {
              translated = await api.fn()
              if (translated !== text) {
                break // Success!
              }
            } catch (error) {
              console.debug(`${api.name} failed:`, error)
              // Continue to next API
            }
          }
        }

        // Cache result (even if translation failed, cache original to avoid re-requesting)
        this.cache.set(cacheKey, translated)
        
        // Save cache periodically (every 50 new translations)
        if (this.cache.size % 50 === 0) {
          this.saveCache()
        }

        return translated
      } catch (error) {
        console.debug('All translation APIs failed:', error)
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

  clearCache(): void {
    this.cache.clear()
    this.pendingRequests.clear()
    this.requestCount = 0
    this.failedAPIs.clear()
    this.apiFailureTimestamps.clear()
    localStorage.removeItem('simple-translation-cache')
  }

  getStats() {
    return {
      cacheSize: this.cache.size,
      requestsThisMinute: this.requestCount,
      disabledAPIs: Array.from(this.failedAPIs),
      maxRequestsPerMinute: this.MAX_REQUESTS_PER_MINUTE,
      requestDelay: this.REQUEST_DELAY_MS
    }
  }
}

export const simpleTranslateService = new SimpleTranslateService()