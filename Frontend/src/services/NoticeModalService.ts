// services/NoticeModalService.ts
export interface NoticeModalSettings {
  enabled: boolean
  autoShow: boolean
  showInterval: number // days
  selectedNoticeId: string | null
  lastClosed: string | null
}

class NoticeModalService {
  private readonly STORAGE_KEY = 'noticeModalSettings'
  private readonly SESSION_KEY = 'noticeModalShownInSession'
  private shownInCurrentSession = false

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
      showInterval: 0, // Show every time by default
      selectedNoticeId: null,
      lastClosed: null,
    }
  }

  saveSettings(settings: Partial<NoticeModalSettings>) {
    if (typeof window === 'undefined') return

    try {
      const current = this.getSettings()
      const updated = { ...current, ...settings }
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updated))
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

  resetLastClosed() {
    this.saveSettings({ lastClosed: null })
  }

  markAsClosed() {
    if (typeof window === 'undefined') return

    try {
      const lastClosed = new Date().toISOString()
      this.saveSettings({ lastClosed })
      
      // Mark as shown in current session
      this.shownInCurrentSession = true
      try {
        sessionStorage.setItem(this.SESSION_KEY, 'true')
      } catch (e) {
        console.warn('sessionStorage not available, using in-memory flag')
      }
    } catch (error) {
      console.error('Error marking modal as closed:', error)
    }
  }

  markAsShownInSession() {
    if (typeof window === 'undefined') return

    try {
      this.shownInCurrentSession = true
      try {
        sessionStorage.setItem(this.SESSION_KEY, 'true')
      } catch (e) {
        console.warn('sessionStorage not available, using in-memory flag')
      }
    } catch (error) {
      console.error('Error marking modal as shown in session:', error)
    }
  }

  shouldShowModal(): boolean {
    if (typeof window === 'undefined') return false

    try {
      const settings = this.getSettings()
      
      // Check if modal is enabled and has a selected notice
      if (!settings.enabled || !settings.autoShow || !settings.selectedNoticeId) {
        console.log('Modal not shown: disabled, no auto-show, or no notice selected')
        return false
      }

      // Check if already shown in current session (MOST IMPORTANT - prevents re-showing on navigation)
      if (this.shownInCurrentSession === true) {
        console.log('Modal not shown: already shown in this session')
        return false
      }

      // Also check sessionStorage in case of page reload
      try {
        const shownInSession = sessionStorage.getItem(this.SESSION_KEY)
        if (shownInSession === 'true') {
          console.log('Modal not shown: already shown in this session (from storage)')
          this.shownInCurrentSession = true
          return false
        }
      } catch (e) {
        console.warn('sessionStorage not available, checking in-memory flag only')
      }

      // Check show interval (for showing again after X days)
      if (settings.lastClosed && settings.showInterval > 0) {
        const lastClosed = new Date(settings.lastClosed)
        const now = new Date()
        const daysSinceLastClose = (now.getTime() - lastClosed.getTime()) / (1000 * 60 * 60 * 24)
        
        if (daysSinceLastClose < settings.showInterval) {
          console.log(`Modal not shown: show interval not met (${daysSinceLastClose.toFixed(1)} days since last close)`)
          return false
        }
      }

      console.log('Modal should be shown')
      return true
    } catch (error) {
      console.error('Error checking if modal should be shown:', error)
      return false
    }
  }

  // Force show modal (for manual triggers)
  forceShowModal(): boolean {
    if (typeof window === 'undefined') return false

    try {
      const settings = this.getSettings()
      if (!settings.enabled || !settings.selectedNoticeId) {
        return false
      }

      // Clear session flags to force show
      this.shownInCurrentSession = false
      try {
        sessionStorage.removeItem(this.SESSION_KEY)
      } catch (e) {
        console.warn('sessionStorage not available')
      }
      this.resetLastClosed()
      return true
    } catch (error) {
      console.error('Error forcing modal show:', error)
      return false
    }
  }

  // Reset for testing (remove in production)
  resetSessionFlag() {
    this.shownInCurrentSession = false
    try {
      sessionStorage.removeItem(this.SESSION_KEY)
    } catch (e) {
      console.warn('sessionStorage not available')
    }
  }
}

export const noticeModalService = new NoticeModalService()