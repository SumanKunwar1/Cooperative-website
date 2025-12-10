// services/NoticeModalService.ts
export interface NoticeModalSettings {
  enabled: boolean
  autoShow: boolean
  selectedNoticeId: string | null
}

class NoticeModalService {
  private readonly STORAGE_KEY = 'noticeModalSettings_simple'
  
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

  // SIMPLIFIED: Always return true to show modal for everyone
  shouldShowModal(): boolean {
    console.log('=== SIMPLIFIED MODAL CHECK ===')
    
    if (typeof window === 'undefined') {
      return false
    }

    // Don't show in admin section
    if (window.location.pathname.startsWith('/admin')) {
      console.log('Not showing modal in admin section')
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

    if (!settings.selectedNoticeId) {
      console.log('No notice selected - but showing anyway for visibility')
      // Even if no notice, we'll show a default one
      return true
    }

    console.log('✅ Modal should be shown')
    return true
  }

  markAsClosed() {
    // Simplified - just log
    console.log('Modal closed by user')
  }

  markAsShownInSession() {
    // Simplified - just log
    console.log('Modal shown in session')
  }

  forceShowModal(): boolean {
    console.log('Force showing modal')
    return true
  }

  resetForDevice() {
    console.log('Reset modal for device')
    try {
      localStorage.removeItem(this.STORAGE_KEY)
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
    
    // Log for debugging
    console.log('Current modal settings:', settings)
  }
}

export const noticeModalService = new NoticeModalService()