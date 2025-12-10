// NoticeModal.tsx
"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { XMarkIcon, BellIcon } from "@heroicons/react/24/outline"
import { noticeService, type Notice } from "../services/noticeService"
import { noticeModalService } from "../services/NoticeModalService"

interface NoticeModalProps {
  isEnabled: boolean
  onClose: () => void
}

const NoticeModal: React.FC<NoticeModalProps> = ({ isEnabled, onClose }) => {
  const [notice, setNotice] = useState<Notice | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasShown, setHasShown] = useState(false)

  useEffect(() => {
    console.log('NoticeModal mounted with isEnabled:', isEnabled)
    
    if (isEnabled && !hasShown) {
      fetchSelectedNotice()
      setHasShown(true)
    }
  }, [isEnabled, hasShown])

  const fetchSelectedNotice = async () => {
    try {
      console.log('Fetching notice for modal...')
      setLoading(true)
      setError(null)
      
      const selectedNoticeId = noticeModalService.getSelectedNoticeId()
      console.log('Selected notice ID:', selectedNoticeId)
      
      if (selectedNoticeId) {
        // Try to fetch the notice
        const fetchedNotice = await noticeService.getNoticeById(selectedNoticeId)
        console.log('Fetched notice:', fetchedNotice)
        
        if (fetchedNotice && fetchedNotice.status === 'published') {
          setNotice(fetchedNotice)
          return
        }
      }
      
      // If no notice or failed, show default
      createDefaultNotice()
      
    } catch (err) {
      console.error("Error fetching notice:", err)
      setError("Could not load notice. Showing default message.")
      createDefaultNotice()
    } finally {
      setLoading(false)
    }
  }

  const createDefaultNotice = () => {
    const defaultNotice: Notice = {
      id: 'default-notice-' + Date.now(),
      title: 'Welcome to Constellation Cooperative',
      content: 'Thank you for visiting Constellation Saving & Credit Cooperative. This important notice appears only when you first open our website. You can check our Notice Board page for all announcements and updates.',
      type: 'announcement',
      important: true,
      status: 'published',
      author: 'Constellation Cooperative',
      date: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    console.log('Showing default notice')
    setNotice(defaultNotice)
  }

  const handleClose = () => {
    console.log('Closing modal')
    noticeModalService.markAsClosed()
    onClose()
  }

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
      }
    }
    
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [])

  const getTypeColor = (type: string) => {
    switch (type) {
      case "announcement":
        return "bg-green-100 text-green-800"
      case "news":
        return "bg-blue-100 text-blue-800"
      case "circular":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    } catch {
      return new Date().toLocaleDateString()
    }
  }

  // Don't render anything if not enabled
  if (!isEnabled) {
    return null
  }

  return (
    <div className="fixed inset-0 z-[9999]">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-70 animate-in fade-in duration-300"
        onClick={handleClose}
      />
      
      {/* Modal Container */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden animate-in slide-in-from-bottom-8 duration-300 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 bg-gradient-to-r from-green-600 to-green-800 text-white">
            <div className="flex items-center space-x-4">
              <BellIcon className="h-8 w-8" />
              <div>
                <h3 className="text-xl font-bold">Welcome to Constellation Cooperative</h3>
                <p className="text-green-100 text-sm">Important Notice (Shown only on first visit)</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="text-white hover:text-green-200 p-2 rounded-full hover:bg-green-700 transition-colors"
              aria-label="Close"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto flex-1">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading important notice...</p>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <p className="text-red-600 mb-4">{error}</p>
                <button
                  onClick={fetchSelectedNotice}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Retry
                </button>
              </div>
            ) : notice ? (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getTypeColor(notice.type)}`}>
                    {notice.type.charAt(0).toUpperCase() + notice.type.slice(1)}
                  </span>
                  <span className="text-sm text-gray-600">
                    {formatDate(notice.date)}
                  </span>
                  {notice.important && (
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                      Important
                    </span>
                  )}
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {notice.title}
                </h2>

                <div className="text-gray-700 whitespace-pre-wrap leading-relaxed mb-6">
                  {notice.content}
                </div>

                <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-6">
                  <p className="text-green-800 text-sm">
                    <strong>Note:</strong> This notice appears only once when you first visit our website. 
                    You won't see it again when navigating to other pages. 
                    Check our "Notice Board" page for all announcements.
                  </p>
                </div>
              </>
            ) : null}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t bg-gray-50">
            <div className="text-sm text-gray-600">
              Shown on initial website visit
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => window.open('/notice', '_blank')}
                className="px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 font-medium"
              >
                View All Notices
              </button>
              <button
                onClick={handleClose}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
              >
                Close & Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoticeModal