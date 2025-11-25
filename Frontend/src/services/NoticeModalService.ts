// noticeModalService.ts
interface NoticeModalSettings {
  enabled: boolean
  autoShow: boolean
  showInterval: number // days
  lastClosedAt: string | null
  selectedNoticeId: string | null // ID of the specific notice to show in modal
  shownInCurrentSession: boolean // Track if shown in current session
}

class NoticeModalService {
  private readonly STORAGE_KEY = 'noticeModalSettings'
  private readonly SESSION_KEY = 'noticeModalShownInSession'

  getSettings(): NoticeModalSettings {
    const defaultSettings: NoticeModalSettings = {
      enabled: true,
      autoShow: true,
      showInterval: 0, // 0 means show every time
      lastClosedAt: null,
      selectedNoticeId: null,
      shownInCurrentSession: false
    }

    if (typeof window === 'undefined') {
      return defaultSettings
    }

    try {
      const stored = localStorage.getItem(this.STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        // Ensure showInterval is 0 for always showing
        return { ...defaultSettings, ...parsed, showInterval: 0, shownInCurrentSession: false }
      }
    } catch (error) {
      console.error('Error reading notice modal settings:', error)
    }

    return defaultSettings
  }

  saveSettings(settings: Partial<NoticeModalSettings>): void {
    if (typeof window === 'undefined') return

    try {
      const currentSettings = this.getSettings()
      const newSettings = { ...currentSettings, ...settings, showInterval: 0 } // Always force showInterval to 0
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(newSettings))
    } catch (error) {
      console.error('Error saving notice modal settings:', error)
    }
  }

  shouldShowModal(): boolean {
    const settings = this.getSettings()
    
    // Check if modal has been shown in current session
    if (typeof window !== 'undefined') {
      const shownInSession = sessionStorage.getItem(this.SESSION_KEY)
      if (shownInSession === 'true') {
        console.log('Modal already shown in current session - not showing again')
        return false
      }
    }
    
    console.log('Modal Settings Check:', {
      enabled: settings.enabled,
      autoShow: settings.autoShow,
      selectedNoticeId: settings.selectedNoticeId,
      showInterval: settings.showInterval,
      lastClosedAt: settings.lastClosedAt
    })
    
    if (!settings.enabled || !settings.autoShow || !settings.selectedNoticeId) {
      console.log('Modal not shown - disabled or no notice selected')
      return false
    }

    // ALWAYS show modal when website opens (showInterval = 0 means always show)
    // Ignore lastClosedAt completely
    console.log('Modal will be shown - always show enabled')
    return true
  }

  markAsClosed(): void {
    this.saveSettings({
      lastClosedAt: new Date().toISOString()
    })
    
    // Mark as shown in current session so it doesn't show again until page reload
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(this.SESSION_KEY, 'true')
    }
  }

  markAsShownInSession(): void {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(this.SESSION_KEY, 'true')
    }
  }

  enableModal(): void {
    this.saveSettings({ enabled: true })
  }

  disableModal(): void {
    this.saveSettings({ enabled: false })
  }

  setAutoShow(autoShow: boolean): void {
    this.saveSettings({ autoShow })
  }

  setShowInterval(): void {
    // Always force to 0 (show every time)
    this.saveSettings({ showInterval: 0 })
  }

  setSelectedNotice(noticeId: string | null): void {
    this.saveSettings({ selectedNoticeId: noticeId })
    // Reset session flag when admin changes the selected notice
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(this.SESSION_KEY)
    }
  }

  getSelectedNoticeId(): string | null {
    return this.getSettings().selectedNoticeId
  }

  // Reset last closed timestamp to force showing modal
  resetLastClosed(): void {
    this.saveSettings({ lastClosedAt: null })
    // Reset session flag to allow showing again
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(this.SESSION_KEY)
    }
  }

  // Force modal to always show
  forceAlwaysShow(): void {
    this.saveSettings({ 
      enabled: true,
      autoShow: true,
      showInterval: 0,
      lastClosedAt: null
    })
    // Reset session flag to allow showing immediately
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(this.SESSION_KEY)
    }
  }

  // Check if modal was shown in current session
  wasShownInCurrentSession(): boolean {
    if (typeof window === 'undefined') return false
    return sessionStorage.getItem(this.SESSION_KEY) === 'true'
  }
}

export const noticeModalService = new NoticeModalService()
export type { NoticeModalSettings }