// services/NoticeModalService.ts
export interface NoticeModalSettings {
  enabled: boolean
  autoShow: boolean
  selectedNoticeId: string | null
  lastShown: string | null
}

class NoticeModalService {
  private readonly STORAGE_KEY = 'noticeModalSettings_initial'
  private readonly SESSION_KEY = 'modalShownOnce'
  private readonly INITIAL_LOAD_KEY = 'initialLoadChecked'
  
  getSettings(): NoticeModalSettings {
    if (typeof window === 'undefined') {
      return this.getDefaultSettings()
    }

    try {
      const stored = localStorage.getItem(this.STORAGE_KEY)
      if (stored) {
        return { ...this.getDefaultSettings(), ...JSON.parse(stored) }
      }
    } catch (error) {
      console.error('Error reading notice modal settings:', error)
    }

    return this.getDefaultSettings()
  }

  private getDefaultSettings(): NoticeModalSettings {
    return {
      enabled: true,
      autoShow: true,
      selectedNoticeId: null,
      lastShown: null,
    }
  }

  saveSettings(settings: Partial<NoticeModalSettings>) {
    if (typeof window === 'undefined') return

    try {
      const current = this.getSettings()
      const updated = { ...current, ...settings }
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updated))
      console.log('Modal settings saved:', updated)
    } catch (error) {
      console.error('Error saving notice modal settings:', error)
    }
  }

  setSelectedNotice(noticeId: string | null) {
    this.saveSettings({ selectedNoticeId: noticeId })
  }

  getSelectedNoticeId(): string | null {
    return this.getSettings().selectedNoticeId
  }

  shouldShowModal(): boolean {
    console.log('=== Checking if modal should be shown (INITIAL LOAD ONLY) ===')
    
    if (typeof window === 'undefined') {
      return false
    }

    // Don't show in admin section
    if (window.location.pathname.startsWith('/admin')) {
      console.log('Skipping modal in admin section')
      return false
    }

    const settings = this.getSettings()
    
    // Basic checks
    if (!settings.enabled) {
      console.log('Modal disabled in settings')
      return false
    }

    if (!settings.autoShow) {
      console.log('AutoShow disabled')
      return false
    }

    // Check if already shown in this session (using sessionStorage)
    try {
      const alreadyShown = sessionStorage.getItem(this.SESSION_KEY)
      if (alreadyShown === 'true') {
        console.log('Modal already shown in this session')
        return false
      }
    } catch (e) {
      console.warn('sessionStorage not available')
    }

    // Check if we already checked on initial load
    const initialLoadChecked = sessionStorage.getItem(this.INITIAL_LOAD_KEY)
    if (initialLoadChecked === 'true') {
      console.log('Already checked on initial load')
      return false
    }

    // Mark that we've checked on initial load
    try {
      sessionStorage.setItem(this.INITIAL_LOAD_KEY, 'true')
    } catch (e) {
      console.warn('Could not save initial load check')
    }

    console.log('✅ Modal should be shown on initial load')
    return true
  }

  markAsClosed() {
    console.log('Modal closed by user')
    // Mark as shown in session so it doesn't show again
    try {
      sessionStorage.setItem(this.SESSION_KEY, 'true')
      // Also save the timestamp
      this.saveSettings({ lastShown: new Date().toISOString() })
    } catch (e) {
      console.warn('Could not save session state')
    }
  }

  markAsShownInSession() {
    console.log('Modal shown in session')
    try {
      sessionStorage.setItem(this.SESSION_KEY, 'true')
    } catch (e) {
      console.warn('Could not save session state')
    }
  }

  forceShowModal(): boolean {
    console.log('Force showing modal')
    // Clear session flag to force show
    try {
      sessionStorage.removeItem(this.SESSION_KEY)
    } catch (e) {
      console.warn('Could not clear session state')
    }
    return true
  }

  resetForDevice() {
    console.log('Reset modal session')
    try {
      sessionStorage.removeItem(this.SESSION_KEY)
      sessionStorage.removeItem(this.INITIAL_LOAD_KEY)
      console.log('Modal session reset - will show on next initial load')
    } catch (error) {
      console.error('Error resetting modal:', error)
    }
  }

  initialize() {
    if (typeof window === 'undefined') return
    
    console.log('Initializing NoticeModalService...')
    
    // Ensure default settings are saved
    const settings = this.getSettings()
    if (!localStorage.getItem(this.STORAGE_KEY)) {
      this.saveSettings(settings)
    }
  }
}

export const noticeModalService = new NoticeModalService()