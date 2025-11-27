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
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    console.log('NoticeModal useEffect - isEnabled:', isEnabled)
    if (isEnabled) {
      setIsVisible(true)
      fetchSelectedNotice()
    } else {
      setIsVisible(false)
      setNotice(null)
      setLoading(false)
    }
  }, [isEnabled])

  const fetchSelectedNotice = async () => {
    try {
      setLoading(true)
      setError(null)
      const selectedNoticeId = noticeModalService.getSelectedNoticeId()
      
      console.log('Fetching notice for modal, ID:', selectedNoticeId)
      
      if (!selectedNoticeId) {
        console.log("No notice selected for modal")
        setNotice(null)
        setLoading(false)
        return
      }

      // Fetch the specific notice by ID
      const fetchedNotice = await noticeService.getNoticeById(selectedNoticeId)
      console.log('Fetched notice:', fetchedNotice)
      
      // Only show if the notice is published
      if (fetchedNotice.status === 'published') {
        setNotice(fetchedNotice)
      } else {
        console.log("Selected notice is not published")
        setNotice(null)
      }
    } catch (err) {
      console.error("Error fetching selected notice:", err)
      setError("Failed to load notice. Please try again.")
      setNotice(null)
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setIsVisible(false)
    // Small delay to allow animation to complete
    setTimeout(() => {
      onClose()
    }, 300)
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "announcement":
        return "bg-green-100 text-green-800"
      case "news":
        return "bg-green-100 text-green-800"
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
      return dateString
    }
  }

  // Don't render anything if not enabled or not visible
  if (!isEnabled || !isVisible) {
    console.log('NoticeModal not enabled or not visible, returning null')
    return null
  }

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          </div>
          <p className="text-center text-gray-600">Loading notice...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
          <div className="text-center py-8">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={fetchSelectedNotice}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Try Again
            </button>
            <button
              onClick={handleClose}
              className="ml-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!notice) {
    console.log('No notice available, returning null')
    return null
  }

  console.log('Rendering notice modal with notice:', notice.title)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-scaleIn">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-green-600 to-green-800 text-white">
          <div className="flex items-center space-x-3">
            <BellIcon className="h-6 w-6" />
            <div>
              <h3 className="text-lg font-semibold">Important Notice</h3>
              <p className="text-green-100 text-sm">
                Stay updated with our latest announcement
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-white hover:text-green-200 p-2 transition-colors rounded-full hover:bg-green-700"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Notice Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="flex items-center space-x-3 mb-4">
            <span
              className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getTypeColor(
                notice.type
              )}`}
            >
              {notice.type.charAt(0).toUpperCase() + notice.type.slice(1)}
            </span>
            <span className="text-sm text-gray-500">
              {formatDate(notice.date)}
            </span>
            {notice.important && (
              <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                Important
              </span>
            )}
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {notice.title}
          </h2>

          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
              {notice.content}
            </p>
          </div>

          {notice.documentUrl && (
            <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <span className="text-green-600 text-lg">
                      {notice.documentType === "pdf"
                        ? "📄"
                        : notice.documentType === "doc" ||
                          notice.documentType === "docx"
                        ? "📝"
                        : "🖼️"}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-green-900">
                      Document attached
                    </p>
                    <p className="text-xs text-green-700">
                      {notice.documentType?.toUpperCase()} file
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => window.open(notice.documentUrl, "_blank")}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                >
                  View Document
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t bg-gray-50">
          <div className="text-sm text-gray-600">
            By {notice.author} • {formatDate(notice.createdAt)}
          </div>
          <button
            onClick={handleClose}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default NoticeModal