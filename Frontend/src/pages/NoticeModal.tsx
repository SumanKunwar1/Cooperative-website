// NoticeModal.tsx
"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { XMarkIcon } from "@heroicons/react/24/outline"
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
        
        if (fetchedNotice && fetchedNotice.status === 'published' && fetchedNotice.documentUrl) {
          setNotice(fetchedNotice)
          return
        }
      }
      
      // If no notice with document found, close modal
      console.log('No valid notice with document found')
      setError(null)
      
    } catch (err) {
      console.error("Error fetching notice:", err)
      setError("Could not load document. Please try again.")
    } finally {
      setLoading(false)
    }
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

  // Don't render anything if not enabled
  if (!isEnabled) {
    return null
  }

  // Don't render if no notice or error
  if (!notice || error) {
    return null
  }

  // Determine if document is PDF or Image
  const isPdf = notice.documentType === 'pdf'
  const isImage = ['jpg', 'jpeg', 'png'].includes(notice.documentType?.toLowerCase() || '')

  return (
    <div className="fixed inset-0 z-[9999]">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-70 animate-in fade-in duration-300"
        onClick={handleClose}
      />
      
      {/* Modal Container */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden animate-in slide-in-from-bottom-8 duration-300 flex flex-col">
          {/* Close Button */}
          <div className="flex justify-end p-4 border-b bg-white">
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Document Content */}
          {loading ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading document...</p>
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-auto">
              {isPdf ? (
                // PDF Embed
                <iframe
                  src={`${notice.documentUrl}#toolbar=0`}
                  className="w-full h-full"
                  style={{ minHeight: '500px' }}
                  title="Notice Document"
                />
              ) : isImage ? (
                // Image Display
                <div className="flex items-center justify-center bg-gray-100 p-4" style={{ minHeight: '500px' }}>
                  <img
                    src={notice.documentUrl}
                    alt="Notice Document"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              ) : (
                // Unsupported document type - show download link
                <div className="flex flex-col items-center justify-center p-8" style={{ minHeight: '500px' }}>
                  <p className="text-gray-600 mb-4">Document cannot be displayed inline.</p>
                  <button
                    onClick={() => window.open(notice.documentUrl, '_blank')}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Download Document
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default NoticeModal