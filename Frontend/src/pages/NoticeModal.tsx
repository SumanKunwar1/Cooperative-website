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
    <div className="fixed inset-0 z-[9999] bg-black bg-opacity-70 flex items-center justify-center p-4">
      {/* Close Button */}
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
        aria-label="Close"
      >
        <XMarkIcon className="h-8 w-8" />
      </button>

      {/* Document Content */}
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-white">Loading document...</p>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          {isPdf ? (
            // PDF Embed - Shrink to fit entire viewport
            <iframe
              src={`${notice.documentUrl}#toolbar=0&view=fitpage`}
              className="bg-white rounded-lg shadow-2xl"
              style={{
                width: '100%',
                height: '100%',
                maxWidth: '90vw',
                maxHeight: '90vh',
                border: 'none',
              }}
              title="Notice Document"
            />
          ) : isImage ? (
            // Image Display - Shrink to fit entire viewport
            <img
              src={notice.documentUrl}
              alt="Notice Document"
              className="rounded-lg shadow-2xl"
              style={{
                maxWidth: '90vw',
                maxHeight: '90vh',
                width: 'auto',
                height: 'auto',
                objectFit: 'contain',
              }}
            />
          ) : (
            // Unsupported document type - show download link
            <div className="flex flex-col items-center justify-center bg-white p-8 rounded-lg shadow-2xl">
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
  )
}

export default NoticeModal