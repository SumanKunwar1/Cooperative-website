// services/autoTranslationService.ts (Production - Massive Dictionary to Minimize API Calls)
"use client"

import { simpleTranslateService } from './simpleTranslateService'

interface CacheEntry {
  text: string
  timestamp: number
  lang: string
}

class AutoTranslationService {
  private cache = new Map<string, CacheEntry>()
  private currentLang = 'en'
  private enabled = true
  private isTranslating = false
  private translatedElements = new WeakSet<Node>()
  private observer: MutationObserver | null = null
  private translationQueue: Array<() => Promise<void>> = []
  private isProcessingQueue = false
  
  // MASSIVE DICTIONARY - Covers 90% of your website to avoid API calls
  private commonTranslations: Record<string, string> = {
    // Navigation & Header
    'home': 'गृह पृष्ठ ',
    'about': 'हाम्रो बारे',
    'about us': 'हाम्रो बारेमा',
    'services': 'सेवाहरु',
    'shop': 'पसल',
    'contact': 'सम्पर्क',
    'contact us': 'हामीलाई सम्पर्क गर्नुहोस्',
    'login': 'लगइन',
    'register': 'दर्ता गर्नुहोस्',
    'business directory': 'व्यवसाय निर्देशिका',
    'notices': 'सूचनाहरु',
    'report & bulletin': 'प्रतिवेदन र बुलेटिन',
    'downloads': 'डाउनलोडहरु',
    'our team': 'हामृो टोली',
    'projects': 'परियोजनाहरु',
    'gallery': 'ग्यालेरी',
    'logout': 'बाहिर निस्कनुहोस्',
    
    // Common Actions
    'add to cart': 'कार्टमा थप्नुहोस्',
    'buy now': 'अहिले किनुहोस्',
    'view details': 'विवरण हेर्नुहोस्',
    'read more': 'थप पढुनुहोस्',
    'learn more': 'थप जानुनुहोस्',
    'apply now': 'अहिले आवेदन दिनुहोस्',
    'open account': 'खाता खोलुनुहोस्',
    'download': 'डाउनलोड',
    'submit': 'पेश गर्नुहोस्',
    'cancel': 'रद्द गर्नुहोस्',
    'save': 'बचत गर्नुहोस्',
    'edit': 'सम्पादन गर्नुहोस्',
    'delete': 'मेटाउनुहोस्',
    'back': 'पछाडि',
    'next': 'अर्को',
    'previous': 'अघिल्लो',
    'close': 'बन्द गर्नुहोस्',
    'search': 'खोजुनुहोस्',
    'filter': 'फिल्टर',
    
    // Shop Related
    'cart': 'कार्ट',
    'checkout': 'चेकआउट',
    'product': 'उत्पादन',
    'products': 'उत्पादनहरु',
    'price': 'मूल्य',
    'quantity': 'मात्रा',
    'in stock': 'स्टकमा छ',
    'out of stock': 'स्टक समाप्त',
    'total': 'जम्मा',
    'subtotal': 'उप-जम्मा',
    'free shipping': 'निःशुल्क ढुवानी',
    'reviews': 'समीक्षाहरु',
    'rating': 'मूल्यांकन',
    'description': 'विवरण',
    'specifications': 'विशिष्टताहरु',
    
    // Services Page
    'saving schemes': 'बचत योजनाहरु',
    'loan services': 'ऋण सेवाहरु',
    'additional facilities': 'अतिरिक्त सुविधाहरु',
    'annual interest': 'वार्षिक ब्याज',
    'minimum deposit': 'न्यूनतम निक्षेप',
    'minimum balance': 'न्यूनतम मौजदात',
    'interest rate': 'ब्याज दर',
    'key features': 'मुख्य विशेषताहरु',
    'personal loan': 'व्यक्तिगत ऋण',
    'business loan': 'व्यवसाय ऋण',
    'education loan': 'शिक्षा ऋण',
    'atm services': 'एटीएम सेवाहरु',
    'digital banking': 'डिजिटल बैंकिङ',
    'insurance services': 'बीमा सेवाहरु',
    'mobile app': 'मोबाइल एप',
    
    // About Page
    'our story': 'हामृो कथा',
    'our mission': 'हामृो मिशन',
    'our vision': 'हामृो दृष्टिकोण',
    'our values': 'हामृो मूल्यहरु',
    'mission': 'मिशन',
    'vision': 'दृष्टिकोण',
    'values': 'मूल्यहरु',
    'community impact': 'समदायमा प्रभाव',
    'financial literacy': 'वित्तीय साक्षरता',
    'member since': 'सदस्य देखी',
    'years of service': 'सेवाका वर्षहरु',
    
    // Common Phrases
    'welcome': 'स्वागत छ',
    'thank you': 'धन्यवाद',
    'please': 'कृपया',
    'yes': 'हो',
    'no': 'होईन',
    'ok': 'ठीक छ',
    'confirm': 'पुष्टि गर्नुहोस्',
    'continue': 'जारी राखुनुहोस्',
    'loading': 'लोड हुइरहेको',
    'success': 'सफल',
    'error': 'त्रुटि',
    'warning': 'चेतावनी',
    'information': 'जानकारी',
    
    // Forms
    'name': 'नाम',
    'email': 'इमेल',
    'phone': 'फोन',
    'address': 'ठेगाना',
    'message': 'सन्देश',
    'password': 'पासवर्ड',
    'confirm password': 'पासवर्ड पुष्टि गर्नुहोस्',
    'username': 'प्रयोगकर्ता नाम',
    'required': 'आवश्यक',
    'optional': 'वैकल्पिक',
    
    // Time & Date
    'today': 'आज',
    'yesterday': 'हिजो',
    'tomorrow': 'भोली',
    'week': 'हप्ता',
    'month': 'महिना',
    'year': 'वर्ष',
    'date': 'मिति',
    'time': 'समय',
    
    // Business
    'business': 'व्यवसाय',
    'company': 'कम्पनी',
    'cooperative': 'सहकारी',
    'member': 'सदस्य',
    'members': 'सदस्यहरु',
    'chairman': 'अध्यक्ष',
    'manager': 'प्रबन्धक',
    'staff': 'कर्मचारी',
    'customer': 'ग्राहक',
    'customers': 'ग्राहकहरु',
    
    // Financial Terms
    'account': 'खाता',
    'balance': 'मौजदात',
    'deposit': 'निक्षेप',
    'withdrawal': 'निकासी',
    'transaction': 'लेनदेन',
    'payment': 'भुक्तानी',
    'transfer': 'स्थानान्तरण',
    'loan': 'ऋण',
    'saving': 'बचत',
    'investment': 'लगानी',
    'dividend': 'लाभांश',
    'share': 'शेयर',
    'profit': 'नाफा',
    'loss': 'घाटा',
    
    // Status
    'active': 'सक्रिय',
    'inactive': 'निष्क्रिय',
    'pending': 'पेन्डिङ',
    'approved': 'स्वीकृत',
    'rejected': 'अस्वीकृत',
    'completed': 'पूरा भएको',
    'processing': 'प्रक्रिया भइरहेको',
    'new': 'नयाँ',
    'old': 'पुरानो',
    
    // Common Words
    'all': 'सबै',
    'more': 'थप',
    'less': 'कम',
    'show': 'देखाउनुहोस्',
    'hide': 'लुकाउनुहोस्',
    'open': 'खोलुनुहोस्',
    'select': 'चयन गर्नुहोस्',
    'upload': 'अपलोड गर्नुहोस्',
    'print': 'प्रिन्ट गर्नुहोस्',
    'copy': 'प्रतिलिपि',
    'settings': 'सेटिङहरु',
    'help': 'मद्दत',
    'support': 'समर्थन',
    'faq': 'बारम्बार सोधिने प्रश्नहरु',
    'terms': 'सर्तहरु',
    'privacy': 'गोपनीयता',
    'policy': 'नीति',
    'Constellation': 'कन्स्टलेसन',
    'Saving & Credit Cooperative': 'सेभिङ एण्ड क्रेडिट कोअपरेटिभ',
    'nepal': 'नेपाल',
    'terms and conditions': 'नियमहरु र सर्तहरु',
    'privacy policy': 'गोपनीयता नीति',
    'our services': 'हाम्रा सेवाहरु',
    'membership': 'सदस्यता',
    'photo gallery': 'फोटो ग्यालेरी',
    'terms and policies': 'नियमहरु र नीतिहरु',
    'terms & conditions': 'नियमहरु र सर्तहरु',
    'Empowering communities through cooperative banking solutions. Building financial stability and prosperity together.': 'सहकारी बैंकिङ समाधान मार्फत समुदायहरुलाई सशक्त बनाउँदै। वित्तीय स्थिरता र समृद्धि सँगै निर्माण गर्दै।',
    'chairperson': 'अध्यक्ष',
    'vice chairperson': 'उपाध्यक्ष',
    'secretary': 'सचिव',
    'treasurer': 'कोषाध्यक्ष',
    'board member': 'बोर्ड सदस्य',
    'president': 'अध्यक्ष',
    'vice president': 'उपाध्यक्ष',
    'managerial staff': 'प्रबन्धकीय कर्मचारी',
    'technical staff': 'प्राविधिक कर्मचारी',
    'support staff': 'समर्थन कर्मचारी',
    'Word from President': 'अध्यक्षबाट शब्द',
    'Word from General Manager': 'प्रबन्धकबाट शब्द'
  }
  
  private excludedSelectors = [
    'code', 'pre', 'script', 'style', 'textarea',
    'input[type="text"]', 'input[type="email"]', 'input[type="password"]',
    '.no-translate', '[data-notranslate]', '[translate="no"]',
    'noscript', 'svg', 'path', 'circle', 'rect', 'polygon'
  ]

  constructor() {
    this.loadCache()
    this.initializeLanguage()
    this.preloadCommonTranslations()
  }

  private initializeLanguage(): void {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('preferred-language')
      this.currentLang = savedLang || 'en'
      if (!savedLang) {
        localStorage.setItem('preferred-language', 'en')
      }
    }
  }

  private preloadCommonTranslations(): void {
    Object.entries(this.commonTranslations).forEach(([eng, nep]) => {
      const cacheKey = this.getCacheKey(eng, 'np')
      this.cache.set(cacheKey, {
        text: nep,
        timestamp: Date.now(),
        lang: 'np'
      })
    })
    console.log(`Pre-loaded ${Object.keys(this.commonTranslations).length} common translations`)
  }

  private loadCache(): void {
    if (typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem('auto-translation-cache')
        if (cached) {
          const entries = JSON.parse(cached)
          entries.forEach(([key, entry]: [string, CacheEntry]) => {
            this.cache.set(key, entry)
          })
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
        localStorage.setItem('auto-translation-cache', JSON.stringify(entries))
      } catch (e) {
        console.warn('Failed to save translation cache:', e)
      }
    }
  }

  private getCacheKey(text: string, targetLang: string): string {
    return `${targetLang}:${text.toLowerCase().trim()}`
  }

  private shouldTranslateText(text: string): boolean {
    const trimmed = text.trim()
    if (!trimmed || trimmed.length < 2) return false
    
    const skipPatterns = [
      /^\d+$/, /^\d+[.,]\d+$/, /^https?:\/\//i, /^www\./i,
      /^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/, /^\$?\d+(\.\d+)?%?$/,
      /^[^a-zA-Z]*$/, /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      /^[\d\s\-\+\(\)]+$/, /^Rs\.?\s*\d+/i, /^NPR\s*\d+/i
    ]

    return !skipPatterns.some(pattern => pattern.test(trimmed))
  }

  private async translateText(text: string, targetLang: string): Promise<string> {
    if (!this.shouldTranslateText(text)) return text
    if (targetLang === 'en') return text

    const cacheKey = this.getCacheKey(text, targetLang)
    const cached = this.cache.get(cacheKey)
    
    // Return cached (including dictionary)
    if (cached && Date.now() - cached.timestamp < 90 * 24 * 60 * 60 * 1000) {
      return cached.text
    }

    // Check dictionary (already pre-cached but double-check)
    const lowerText = text.toLowerCase().trim()
    if (targetLang === 'np' && this.commonTranslations[lowerText]) {
      return this.commonTranslations[lowerText]
    }

    // Only call API if not in dictionary/cache
    try {
      const translated = await simpleTranslateService.translate(text, targetLang)
      
      if (translated !== text) {
        this.cache.set(cacheKey, {
          text: translated,
          timestamp: Date.now(),
          lang: targetLang
        })
        return translated
      }
    } catch (error) {
      // Fail silently - return original text
      console.debug('Translation failed for:', text)
    }

    return text
  }

  private async processQueue(): Promise<void> {
    if (this.isProcessingQueue || this.translationQueue.length === 0) return
    
    this.isProcessingQueue = true
    
    while (this.translationQueue.length > 0) {
      const batch = this.translationQueue.splice(0, 30)
      await Promise.all(batch.map(fn => fn().catch(() => {})))
    }
    
    this.isProcessingQueue = false
    this.saveCache()
  }

  private async translateElement(element: HTMLElement): Promise<void> {
    if (this.translatedElements.has(element)) return
    if (this.excludedSelectors.some(s => element.matches(s) || element.closest(s))) return

    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
      acceptNode: (node) => {
        if (!node.textContent?.trim()) return NodeFilter.FILTER_REJECT
        const parent = node.parentElement
        if (!parent || this.excludedSelectors.some(s => parent.matches(s) || parent.closest(s))) {
          return NodeFilter.FILTER_REJECT
        }
        const tagName = parent.tagName.toLowerCase()
        if (['script', 'style', 'textarea', 'code', 'pre'].includes(tagName)) {
          return NodeFilter.FILTER_REJECT
        }
        return NodeFilter.FILTER_ACCEPT
      }
    })

    const tasks: Array<() => Promise<void>> = []
    let node: Text | null
    
    while ((node = walker.nextNode() as Text | null)) {
      const original = node.textContent?.trim()
      if (original && this.shouldTranslateText(original)) {
        const textNode = node
        tasks.push(async () => {
          const translated = await this.translateText(original, this.currentLang)
          if (translated !== original && textNode.textContent) {
            textNode.textContent = textNode.textContent.replace(original, translated)
          }
        })
      }
    }

    const attributesToTranslate = ['title', 'alt', 'placeholder', 'aria-label']
    const elements = element.querySelectorAll('*')
    
    for (const el of Array.from(elements)) {
      for (const attr of attributesToTranslate) {
        const value = el.getAttribute(attr)
        if (value && this.shouldTranslateText(value)) {
          tasks.push(async () => {
            const translated = await this.translateText(value, this.currentLang)
            if (translated !== value) {
              el.setAttribute(attr, translated)
            }
          })
        }
      }
    }

    this.translationQueue.push(...tasks)
    this.translatedElements.add(element)
    await this.processQueue()
  }

  async translatePage(lang: string = this.currentLang): Promise<void> {
    if (!this.enabled || this.isTranslating) return
    
    if (lang === 'en') {
      const currentLang = this.currentLang
      this.currentLang = 'en'
      localStorage.setItem('preferred-language', 'en')
      
      if (currentLang !== 'en') {
        this.translatedElements = new WeakSet()
        window.location.reload()
      }
      return
    }

    if (lang === this.currentLang && this.translatedElements.has(document.body)) {
      console.log('Page already translated to', lang)
      return
    }

    this.isTranslating = true
    this.currentLang = lang
    localStorage.setItem('preferred-language', lang)

    try {
      await this.translateElement(document.body)
      if (!this.observer) this.setupMutationObserver()
      console.log(`Page translated to ${lang}`)
    } catch (error) {
      console.error('Failed to translate page:', error)
    } finally {
      this.isTranslating = false
    }
  }

  private setupMutationObserver(): void {
    if (this.observer) return

    this.observer = new MutationObserver((mutations) => {
      if (this.isTranslating || this.currentLang === 'en') return
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE && !this.translatedElements.has(node)) {
              this.translateElement(node as HTMLElement).catch(() => {})
            }
          })
        }
      })
    })

    this.observer.observe(document.body, { childList: true, subtree: true })
  }

  enable(): void { this.enabled = true }
  disable(): void {
    this.enabled = false
    if (this.observer) {
      this.observer.disconnect()
      this.observer = null
    }
  }
  getEnabled(): boolean { return this.enabled }
  getCurrentLanguage(): string { return this.currentLang }
  
  clearCache(): void {
    this.cache.clear()
    this.translatedElements = new WeakSet()
    this.translationQueue = []
    localStorage.removeItem('auto-translation-cache')
    simpleTranslateService.clearCache()
    this.preloadCommonTranslations()
  }
}

export const autoTranslationService = new AutoTranslationService()