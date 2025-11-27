"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  BellIcon,
  EyeIcon,
  XMarkIcon,
  DocumentIcon,
  PhotoIcon,
  EyeSlashIcon,
  PlayIcon,
} from "@heroicons/react/24/outline"
import { noticeService, type Notice, type NoticeFormData } from "../../services/noticeService"
import { noticeModalService, type NoticeModalSettings } from "../../services/NoticeModalService"

// Mock AdminDashboard wrapper
const AdminDashboard: React.FC<{ children: React.ReactNode; currentSection: string }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</div>
    </div>
  )
}

const AdminNotices: React.FC = () => {
  const [notices, setNotices] = useState<Notice[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<"all" | "announcement" | "news" | "circular">("all")
  const [filterStatus, setFilterStatus] = useState<"all" | "published" | "draft" | "archived">("all")
  const [showModal, setShowModal] = useState(false)
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null)
  const [viewingNotice, setViewingNotice] = useState<Notice | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [modalSettings, setModalSettings] = useState<NoticeModalSettings>(noticeModalService.getSettings())

  const [formData, setFormData] = useState<NoticeFormData>({
    title: "",
    content: "",
    type: "announcement",
    important: false,
    status: "draft",
    author: "Admin",
  })

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [filePreview, setFilePreview] = useState<string | null>(null)

  // Fetch notices only when component mounts
  useEffect(() => {
    fetchNotices()
  }, [])

  // Fetch notices when filters change - with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchNotices()
    }, 500) // Debounce for 500ms

    return () => clearTimeout(timeoutId)
  }, [searchTerm, filterType, filterStatus])

  const fetchNotices = async () => {
    try {
      setLoading(true)
      setError(null)
      const fetchedNotices = await noticeService.getAllNotices({
        type: filterType !== "all" ? filterType : undefined,
        status: filterStatus !== "all" ? filterStatus : undefined,
        search: searchTerm || undefined,
      })
      setNotices(fetchedNotices)
    } catch (err) {
      console.error("Error fetching notices:", err)
      setError("Failed to load notices. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      type: "announcement",
      important: false,
      status: "draft",
      author: "Admin",
    })
    setSelectedFile(null)
    setFilePreview(null)
  }

  const handleCreateNotice = () => {
    setEditingNotice(null)
    resetForm()
    setShowModal(true)
  }

  const handleEditNotice = (notice: Notice) => {
    setEditingNotice(notice)
    setFormData({
      title: notice.title,
      content: notice.content,
      type: notice.type,
      important: notice.important,
      status: notice.status,
      author: notice.author,
      documentUrl: notice.documentUrl,
      documentType: notice.documentType,
    })
    setSelectedFile(null)
    setFilePreview(notice.documentUrl || null)
    setShowModal(true)
  }

  const handleViewNotice = (notice: Notice) => {
    setViewingNotice(notice)
  }

  const handleSetModalNotice = (notice: Notice) => {
    if (notice.status !== 'published') {
      alert('Only published notices can be shown in the modal window.')
      return
    }
    
    if (!notice.documentUrl) {
      alert('This notice does not have a document attached. Please attach a document to set it as modal notice.')
      return
    }
    
    noticeModalService.setSelectedNotice(notice.id)
    noticeModalService.resetLastClosed() // Reset to show immediately
    setModalSettings(noticeModalService.getSettings())
    alert(`"${notice.title}" has been set as the modal notice. Users will see this notice every time they visit the website.`)
  }

  const handleRemoveModalNotice = () => {
    noticeModalService.setSelectedNotice(null)
    setModalSettings(noticeModalService.getSettings())
    alert('Modal notice has been removed. No notice will be shown in modal window.')
  }

  const handlePreviewModalNotice = () => {
    const currentModalNotice = getCurrentModalNotice()
    if (currentModalNotice) {
      handleViewNotice(currentModalNotice)
    }
  }

  const handleForceShowModal = () => {
    noticeModalService.resetLastClosed()
    setModalSettings(noticeModalService.getSettings())
    alert('Modal will be shown on next page load regardless of when it was last closed.')
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert("File size must be less than 10MB")
        return
      }

      // Validate file type
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "image/jpeg",
        "image/png",
      ]
      if (!allowedTypes.includes(file.type)) {
        alert("Please select a valid file type (PDF, DOC, DOCX, JPG, PNG)")
        return
      }

      setSelectedFile(file)

      // Create file preview URL
      const fileUrl = URL.createObjectURL(file)
      setFilePreview(fileUrl)

      // Auto-detect document type based on file type
      let docType: "pdf" | "doc" | "docx" | "jpg" | "png" = "pdf"
      if (file.type === "application/pdf") docType = "pdf"
      else if (file.type === "application/msword") docType = "doc"
      else if (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") docType = "docx"
      else if (file.type === "image/jpeg") docType = "jpg"
      else if (file.type === "image/png") docType = "png"

      setFormData({ ...formData, documentType: docType })
    }
  }

  const handleRemoveFile = () => {
    setSelectedFile(null)
    setFilePreview(null)
    setFormData({ ...formData, documentUrl: "", documentType: undefined })
  }

  const handleSubmit = async () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      alert("Please fill in all required fields")
      return
    }

    try {
      setSubmitting(true)
      setError(null)

      if (editingNotice) {
        // Update existing notice
        const updatedNotice = await noticeService.updateNotice(editingNotice.id, formData, selectedFile || undefined)
        setNotices(notices.map((notice) => (notice.id === editingNotice.id ? updatedNotice : notice)))
      } else {
        // Create new notice
        const newNotice = await noticeService.createNotice(formData, selectedFile || undefined)
        setNotices([newNotice, ...notices])
      }

      setShowModal(false)
      resetForm()
      setEditingNotice(null)
    } catch (err) {
      console.error("Error submitting notice:", err)
      setError("Failed to save notice. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteNotice = async (noticeId: string) => {
    if (window.confirm("Are you sure you want to delete this notice? This action cannot be undone.")) {
      try {
        await noticeService.deleteNotice(noticeId)
        setNotices(notices.filter((notice) => notice.id !== noticeId))
        
        // If the deleted notice was the modal notice, remove it
        if (modalSettings.selectedNoticeId === noticeId) {
          handleRemoveModalNotice()
        }
      } catch (err) {
        console.error("Error deleting notice:", err)
        setError("Failed to delete notice. Please try again.")
      }
    }
  }

  const handleStatusChange = async (noticeId: string, newStatus: "published" | "draft" | "archived") => {
    try {
      const notice = notices.find((n) => n.id === noticeId)
      if (!notice) return

      const updatedNotice = await noticeService.updateNotice(noticeId, { status: newStatus })
      setNotices(notices.map((n) => (n.id === noticeId ? updatedNotice : n)))

      // If the notice was the modal notice and is no longer published, remove it
      if (modalSettings.selectedNoticeId === noticeId && newStatus !== 'published') {
        handleRemoveModalNotice()
      }
    } catch (err) {
      console.error("Error updating notice status:", err)
      setError("Failed to update notice status. Please try again.")
    }
  }

  const handleModalSettingsChange = (newSettings: Partial<NoticeModalSettings>) => {
    noticeModalService.saveSettings(newSettings)
    setModalSettings(noticeModalService.getSettings())
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800"
      case "draft":
        return "bg-yellow-100 text-yellow-800"
      case "archived":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getDocumentIcon = (type?: string) => {
    switch (type) {
      case "pdf":
        return <DocumentIcon className="h-4 w-4" />
      case "doc":
      case "docx":
        return <DocumentIcon className="h-4 w-4" />
      case "jpg":
      case "png":
        return <PhotoIcon className="h-4 w-4" />
      default:
        return <DocumentIcon className="h-4 w-4" />
    }
  }

  const getCurrentModalNotice = () => {
    if (!modalSettings.selectedNoticeId) return null
    return notices.find(notice => notice.id === modalSettings.selectedNoticeId)
  }

  const currentModalNotice = getCurrentModalNotice()

  return (
    <AdminDashboard currentSection="notices">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">Notice Management</h2>
          <button
            onClick={handleCreateNotice}
            className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Create Notice
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{error}</p>
            <button onClick={() => setError(null)} className="mt-2 text-red-600 hover:text-red-800 font-medium">
              Dismiss
            </button>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="text-2xl font-bold text-green-600">
              {notices.filter((n) => n.status === "published").length}
            </div>
            <div className="text-sm text-gray-600">Published</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="text-2xl font-bold text-yellow-600">
              {notices.filter((n) => n.status === "draft").length}
            </div>
            <div className="text-sm text-gray-600">Draft</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="text-2xl font-bold text-red-600">{notices.filter((n) => n.important).length}</div>
            <div className="text-sm text-gray-600">Important</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="text-2xl font-bold text-gray-600">{notices.length}</div>
            <div className="text-sm text-gray-600">Total</div>
          </div>
        </div>

        {/* Modal Settings Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Notice Modal Settings</h3>
          
          {/* Current Modal Notice Display */}
          {currentModalNotice ? (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <BellIcon className="h-5 w-5 text-green-600" />
                  <div>
                    <h4 className="font-medium text-green-900">Current Modal Notice</h4>
                    <p className="text-sm text-green-700">{currentModalNotice.title}</p>
                    <p className="text-xs text-green-600">
                      Published on {new Date(currentModalNotice.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handlePreviewModalNotice}
                    className="inline-flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                  >
                    <PlayIcon className="h-4 w-4 mr-1" />
                    Preview Modal
                  </button>
                  <button
                    onClick={handleForceShowModal}
                    className="inline-flex items-center px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                  >
                    <EyeIcon className="h-4 w-4 mr-1" />
                    Force Show
                  </button>
                  <button
                    onClick={handleRemoveModalNotice}
                    className="inline-flex items-center px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                  >
                    <EyeSlashIcon className="h-4 w-4 mr-1" />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <BellIcon className="h-5 w-5 text-yellow-600" />
                <div>
                  <h4 className="font-medium text-yellow-900">No Modal Notice Selected</h4>
                  <p className="text-sm text-yellow-700">
                    Select a published notice with document below to show in the modal window
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Enable Notice Modal
                </label>
                <p className="text-sm text-gray-500">Show selected notice in modal window</p>
              </div>
              <button
                onClick={() => handleModalSettingsChange({ enabled: !modalSettings.enabled })}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
                  modalSettings.enabled ? 'bg-green-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    modalSettings.enabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Auto Show Modal
                </label>
                <p className="text-sm text-gray-500">Automatically show modal on page visit</p>
              </div>
              <button
                onClick={() => handleModalSettingsChange({ autoShow: !modalSettings.autoShow })}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
                  modalSettings.autoShow ? 'bg-green-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    modalSettings.autoShow ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Show Interval
              </label>
              <select
                value={modalSettings.showInterval}
                onChange={(e) => handleModalSettingsChange({ showInterval: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="0">Every time website opens</option>
                <option value="1">Every day</option>
                <option value="3">Every 3 days</option>
                <option value="7">Every week</option>
                <option value="30">Every month</option>
              </select>
            </div>
          </div>

          <div className="mt-4 p-4 bg-green-50 rounded-lg">
            <div className="flex items-center">
              <BellIcon className="h-5 w-5 text-green-600 mr-2" />
              <p className="text-sm text-green-700">
                {modalSettings.enabled && currentModalNotice
                  ? `Modal is enabled and will show "${currentModalNotice.title}" ${modalSettings.showInterval === 0 ? 'every time the website opens' : modalSettings.autoShow ? 'automatically' : 'manually'}.`
                  : modalSettings.enabled 
                  ? 'Modal is enabled but no notice is selected.'
                  : 'Notice modal is currently disabled.'}
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search notices by title or content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as "all" | "announcement" | "news" | "circular")}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent min-w-[140px]"
              >
                <option value="all">All Types</option>
                <option value="announcement">Announcement</option>
                <option value="news">News</option>
                <option value="circular">Circular</option>
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as "all" | "published" | "draft" | "archived")}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent min-w-[140px]"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>
        </div>

        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading notices...</p>
          </div>
        )}

        {/* Notices List */}
        {!loading && (
          <div className="space-y-4">
            {notices.map((notice) => (
              <motion.div
                key={notice.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-all duration-200 ${
                  notice.id === modalSettings.selectedNoticeId ? 'border-green-500 border-2' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="text-xl font-semibold text-gray-900">{notice.title}</h3>
                      <span
                        className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getTypeColor(notice.type)}`}
                      >
                        {notice.type.charAt(0).toUpperCase() + notice.type.slice(1)}
                      </span>
                      {notice.important && (
                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-medium">
                          Important
                        </span>
                      )}
                      {notice.id === modalSettings.selectedNoticeId && (
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                          Modal Notice
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-4 line-clamp-2">{notice.content}</p>
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <span className="font-medium">By {notice.author}</span>
                      <span>Created: {new Date(notice.createdAt).toLocaleDateString()}</span>
                      {notice.date && <span>Published: {new Date(notice.date).toLocaleDateString()}</span>}
                      {notice.documentUrl && (
                        <span className="flex items-center gap-1 text-green-600">
                          {getDocumentIcon(notice.documentType)}
                          <span>Document attached</span>
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Action Buttons - Moved to a separate clearly visible section */}
                  <div className="flex flex-col space-y-3 ml-6 min-w-[200px]">
                    {/* Status Dropdown */}
                    <select
                      value={notice.status}
                      onChange={(e) =>
                        handleStatusChange(notice.id, e.target.value as "published" | "draft" | "archived")
                      }
                      className={`w-full text-xs font-semibold rounded-lg px-3 py-2 border-0 ${getStatusColor(notice.status)} focus:ring-2 focus:ring-green-500`}
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                      <option value="archived">Archived</option>
                    </select>
                    
                    {/* Modal Action Buttons - Very Clear and Visible */}
                    {notice.status === 'published' && notice.documentUrl && (
                      notice.id === modalSettings.selectedNoticeId ? (
                        <button
                          onClick={() => handleRemoveModalNotice()}
                          className="w-full inline-flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium shadow-md"
                          title="Remove from Modal"
                        >
                          <EyeSlashIcon className="h-4 w-4 mr-2" />
                          Remove Modal
                        </button>
                      ) : (
                        <button
                          onClick={() => handleSetModalNotice(notice)}
                          className="w-full inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium shadow-md"
                          title="Set as Modal Notice"
                        >
                          <PlayIcon className="h-4 w-4 mr-2" />
                          Set as Modal
                        </button>
                      )
                    )}

                    {notice.status === 'published' && !notice.documentUrl && (
                      <button
                        disabled
                        className="w-full inline-flex items-center justify-center px-4 py-2 bg-gray-400 text-white rounded-lg cursor-not-allowed text-sm font-medium"
                        title="Add document to set as modal"
                      >
                        <DocumentIcon className="h-4 w-4 mr-2" />
                        No Document
                      </button>
                    )}

                    {/* Standard Action Buttons */}
                    <div className="flex items-center justify-between space-x-2 pt-2 border-t">
                      <button
                        onClick={() => handleViewNotice(notice)}
                        className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                        title="View Notice"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleEditNotice(notice)}
                        className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                        title="Edit Notice"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteNotice(notice.id)}
                        className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                        title="Delete Notice"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {!loading && notices.length === 0 && (
          <div className="text-center py-12">
            <BellIcon className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No notices found</h3>
            <p className="text-gray-500 mb-6">
              {searchTerm || filterType !== "all" || filterStatus !== "all"
                ? "Try adjusting your search criteria or filters."
                : "Get started by creating your first notice."}
            </p>
            {!searchTerm && filterType === "all" && filterStatus === "all" && (
              <button
                onClick={handleCreateNotice}
                className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Create Your First Notice
              </button>
            )}
          </div>
        )}
      </motion.div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-semibold text-gray-900">
                {editingNotice ? "Edit Notice" : "Create New Notice"}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 p-2">
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter notice title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
                <textarea
                  rows={6}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter notice content"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type *</label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value as "announcement" | "news" | "circular" })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="announcement">Announcement</option>
                    <option value="news">News</option>
                    <option value="circular">Circular</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status *</label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value as "published" | "draft" | "archived" })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter author name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Document Upload (Optional)</label>
                <div className="space-y-4">
                  {!filePreview && !selectedFile ? (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                      <div className="text-center">
                        <DocumentIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="mt-2">
                          <label htmlFor="file-upload" className="cursor-pointer">
                            <span className="text-green-600 hover:text-green-500 font-medium">
                              Click to upload a document
                            </span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                              onChange={handleFileUpload}
                            />
                          </label>
                          <p className="text-gray-500 text-sm mt-1">PDF, DOC, DOCX, JPG, PNG up to 10MB</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {getDocumentIcon(formData.documentType)}
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {selectedFile?.name || "Existing document"}
                            </p>
                            <p className="text-xs text-gray-500">
                              {selectedFile
                                ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB`
                                : formData.documentType?.toUpperCase()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {filePreview && (
                            <button
                              type="button"
                              onClick={() => window.open(filePreview, "_blank")}
                              className="text-green-600 hover:text-green-800 text-sm font-medium"
                            >
                              Preview
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={handleRemoveFile}
                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {!filePreview && !selectedFile && (
                    <div className="text-center">
                      <span className="text-gray-400">or</span>
                      <div className="mt-2">
                        <label htmlFor="file-input-button" className="cursor-pointer">
                          <span className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                            <DocumentIcon className="h-4 w-4 mr-2" />
                            Choose File
                          </span>
                          <input
                            id="file-input-button"
                            type="file"
                            className="sr-only"
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            onChange={handleFileUpload}
                          />
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="important"
                  checked={formData.important}
                  onChange={(e) => setFormData({ ...formData, important: e.target.checked })}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="important" className="ml-2 text-sm text-gray-700">
                  Mark as important notice
                </label>
              </div>

              <div className="flex justify-end space-x-4 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  {submitting ? "Saving..." : editingNotice ? "Update Notice" : "Create Notice"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {viewingNotice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-semibold text-gray-900">Notice Details</h3>
              <button onClick={() => setViewingNotice(null)} className="text-gray-400 hover:text-gray-600 p-2">
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center space-x-3 mb-4">
                <span
                  className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getTypeColor(viewingNotice.type)}`}
                >
                  {viewingNotice.type.charAt(0).toUpperCase() + viewingNotice.type.slice(1)}
                </span>
                <span
                  className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(viewingNotice.status)}`}
                >
                  {viewingNotice.status.charAt(0).toUpperCase() + viewingNotice.status.slice(1)}
                </span>
                {viewingNotice.important && (
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">Important</span>
                )}
                {viewingNotice.id === modalSettings.selectedNoticeId && (
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    Current Modal Notice
                  </span>
                )}
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">{viewingNotice.title}</h2>

              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 whitespace-pre-wrap">{viewingNotice.content}</p>
              </div>

              {viewingNotice.documentUrl && (
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getDocumentIcon(viewingNotice.documentType)}
                      <span className="text-sm font-medium text-green-900">Document attached</span>
                    </div>
                    <button
                      onClick={() => window.open(viewingNotice.documentUrl, "_blank")}
                      className="text-green-600 hover:text-green-800 text-sm font-medium"
                    >
                      View Document
                    </button>
                  </div>
                </div>
              )}

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Author:</span> {viewingNotice.author}
                  </div>
                  <div>
                    <span className="font-medium">Created:</span>{" "}
                    {new Date(viewingNotice.createdAt).toLocaleDateString()}
                  </div>
                  {viewingNotice.date && (
                    <div>
                      <span className="font-medium">Published:</span>{" "}
                      {new Date(viewingNotice.date).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>

              {viewingNotice.status === 'published' && viewingNotice.documentUrl && viewingNotice.id !== modalSettings.selectedNoticeId && (
                <div className="flex justify-end pt-4 border-t">
                  <button
                    onClick={() => {
                      handleSetModalNotice(viewingNotice)
                      setViewingNotice(null)
                    }}
                    className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    <PlayIcon className="h-4 w-4 mr-2" />
                    Set as Modal Notice
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </AdminDashboard>
  )
}

export default AdminNotices