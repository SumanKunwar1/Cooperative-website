"use client"

import React, { useState } from "react"
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
  PhotoIcon
} from "@heroicons/react/24/outline"

interface Notice {
  id: string
  title: string
  content: string
  date: string
  type: "announcement" | "news" | "circular"
  important: boolean
  documentUrl?: string
  documentType?: "pdf" | "doc" | "docx" | "jpg" | "png"
  status: "published" | "draft" | "archived"
  author: string
  createdAt: string
}

// Mock AdminDashboard wrapper
const AdminDashboard: React.FC<{ children: React.ReactNode; currentSection: string }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </div>
    </div>
  )
}

const AdminNotices: React.FC = () => {
  const [notices, setNotices] = useState<Notice[]>([
    {
      id: "1",
      title: "Annual General Meeting 2024",
      content: "All members are cordially invited to attend the Annual General Meeting scheduled for March 15, 2024. Please find the detailed agenda and meeting guidelines in the attached document.",
      date: "2024-02-15",
      type: "announcement",
      important: true,
      documentUrl: "/documents/agm-2024-agenda.pdf",
      documentType: "pdf",
      status: "published",
      author: "Admin",
      createdAt: "2024-02-15"
    },
    {
      id: "2",
      title: "New Digital Banking Services",
      content: "We are pleased to announce the launch of our new digital banking platform for all members. This revolutionary service will provide 24/7 access to your accounts.",
      date: "2024-02-10",
      type: "news",
      important: false,
      documentUrl: "/documents/digital-banking-guide.pdf",
      documentType: "pdf",
      status: "published",
      author: "IT Department",
      createdAt: "2024-02-10"
    },
    {
      id: "3",
      title: "Interest Rate Revision Circular",
      content: "Effective from March 1, 2024, the interest rates for savings accounts will be revised. Please review the new rate structure in the attached circular.",
      date: "2024-02-08",
      type: "circular",
      important: true,
      status: "draft",
      author: "Finance Team",
      createdAt: "2024-02-08"
    }
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<"all" | "announcement" | "news" | "circular">("all")
  const [filterStatus, setFilterStatus] = useState<"all" | "published" | "draft" | "archived">("all")
  const [showModal, setShowModal] = useState(false)
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null)
  const [viewingNotice, setViewingNotice] = useState<Notice | null>(null)

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    type: "announcement" as "announcement" | "news" | "circular",
    important: false,
    documentUrl: "",
    documentType: "pdf" as "pdf" | "doc" | "docx" | "jpg" | "png",
    status: "draft" as "published" | "draft" | "archived",
    author: "Admin"
  })

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [filePreview, setFilePreview] = useState<string | null>(null)

  const filteredNotices = notices.filter((notice) => {
    const matchesSearch =
      notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notice.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || notice.type === filterType
    const matchesStatus = filterStatus === "all" || notice.status === filterStatus
    return matchesSearch && matchesType && matchesStatus
  })

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      type: "announcement",
      important: false,
      documentUrl: "",
      documentType: "pdf",
      status: "draft",
      author: "Admin"
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
      documentUrl: notice.documentUrl || "",
      documentType: notice.documentType || "pdf",
      status: notice.status,
      author: notice.author
    })
    setSelectedFile(null)
    setFilePreview(notice.documentUrl || null)
    setShowModal(true)
  }

  const handleViewNotice = (notice: Notice) => {
    setViewingNotice(notice)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB')
        return
      }

      // Validate file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png']
      if (!allowedTypes.includes(file.type)) {
        alert('Please select a valid file type (PDF, DOC, DOCX, JPG, PNG)')
        return
      }

      setSelectedFile(file)
      
      // Create file preview URL
      const fileUrl = URL.createObjectURL(file)
      setFilePreview(fileUrl)
      
      // Auto-detect document type based on file type
      let docType: "pdf" | "doc" | "docx" | "jpg" | "png" = "pdf"
      if (file.type === 'application/pdf') docType = "pdf"
      else if (file.type === 'application/msword') docType = "doc"
      else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') docType = "docx"
      else if (file.type === 'image/jpeg') docType = "jpg"
      else if (file.type === 'image/png') docType = "png"
      
      setFormData({...formData, documentType: docType})
    }
  }

  const handleRemoveFile = () => {
    setSelectedFile(null)
    setFilePreview(null)
    setFormData({...formData, documentUrl: ""})
  }

  const handleSubmit = () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('Please fill in all required fields')
      return
    }
    
    const currentDate = new Date().toISOString().split("T")[0]
    
    // Handle file upload - in a real app, you'd upload to a server
    let documentUrl = formData.documentUrl
    if (selectedFile) {
      // For demo purposes, we'll use the blob URL
      // In production, you would upload to your server/cloud storage
      documentUrl = URL.createObjectURL(selectedFile)
    }
    
    if (editingNotice) {
      // Update existing notice
      setNotices(notices.map(notice => 
        notice.id === editingNotice.id
          ? {
              ...notice,
              ...formData,
              documentUrl: documentUrl,
              date: formData.status === "published" ? currentDate : notice.date
            }
          : notice
      ))
    } else {
      // Create new notice
      const newNotice: Notice = {
        id: Date.now().toString(),
        ...formData,
        documentUrl: documentUrl,
        date: formData.status === "published" ? currentDate : "",
        createdAt: currentDate
      }
      setNotices([newNotice, ...notices])
    }
    
    setShowModal(false)
    resetForm()
    setEditingNotice(null)
  }

  const handleDeleteNotice = (noticeId: string) => {
    if (window.confirm("Are you sure you want to delete this notice? This action cannot be undone.")) {
      setNotices(notices.filter(notice => notice.id !== noticeId))
    }
  }

  const handleStatusChange = (noticeId: string, newStatus: "published" | "draft" | "archived") => {
    const currentDate = new Date().toISOString().split("T")[0]
    setNotices(notices.map(notice =>
      notice.id === noticeId
        ? {
            ...notice,
            status: newStatus,
            date: newStatus === "published" ? currentDate : notice.date
          }
        : notice
    ))
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "announcement":
        return "bg-blue-100 text-blue-800"
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

  return (
    <AdminDashboard currentSection="notices">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">Notice Management</h2>
          <button 
            onClick={handleCreateNotice}
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Create Notice
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{notices.filter(n => n.status === 'published').length}</div>
            <div className="text-sm text-gray-600">Published</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="text-2xl font-bold text-yellow-600">{notices.filter(n => n.status === 'draft').length}</div>
            <div className="text-sm text-gray-600">Draft</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="text-2xl font-bold text-red-600">{notices.filter(n => n.important).length}</div>
            <div className="text-sm text-gray-600">Important</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="text-2xl font-bold text-gray-600">{notices.length}</div>
            <div className="text-sm text-gray-600">Total</div>
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
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as "all" | "announcement" | "news" | "circular")}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[140px]"
              >
                <option value="all">All Types</option>
                <option value="announcement">Announcement</option>
                <option value="news">News</option>
                <option value="circular">Circular</option>
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as "all" | "published" | "draft" | "archived")}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[140px]"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notices List */}
        <div className="space-y-4">
          {filteredNotices.map((notice) => (
            <motion.div
              key={notice.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h3 className="text-xl font-semibold text-gray-900">{notice.title}</h3>
                    <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getTypeColor(notice.type)}`}>
                      {notice.type.charAt(0).toUpperCase() + notice.type.slice(1)}
                    </span>
                    {notice.important && (
                      <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-medium">
                        Important
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-2">{notice.content}</p>
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <span className="font-medium">By {notice.author}</span>
                    <span>Created: {new Date(notice.createdAt).toLocaleDateString()}</span>
                    {notice.date && <span>Published: {new Date(notice.date).toLocaleDateString()}</span>}
                    {notice.documentUrl && (
                      <span className="flex items-center gap-1 text-blue-600">
                        {getDocumentIcon(notice.documentType)}
                        <span>Document attached</span>
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-3 ml-4">
                  <select
                    value={notice.status}
                    onChange={(e) => handleStatusChange(notice.id, e.target.value as "published" | "draft" | "archived")}
                    className={`text-xs font-semibold rounded-full px-3 py-2 border-0 ${getStatusColor(notice.status)} focus:ring-2 focus:ring-blue-500`}
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => handleViewNotice(notice)}
                      className="text-purple-600 hover:text-purple-900 p-2 rounded-md hover:bg-purple-50 transition-colors"
                      title="View Notice"
                    >
                      <EyeIcon className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={() => handleEditNotice(notice)}
                      className="text-blue-600 hover:text-blue-900 p-2 rounded-md hover:bg-blue-50 transition-colors"
                      title="Edit Notice"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteNotice(notice.id)}
                      className="text-red-600 hover:text-red-900 p-2 rounded-md hover:bg-red-50 transition-colors"
                      title="Delete Notice"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredNotices.length === 0 && (
          <div className="text-center py-12">
            <BellIcon className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No notices found</h3>
            <p className="text-gray-500 mb-6">
              {searchTerm || filterType !== 'all' || filterStatus !== 'all' 
                ? "Try adjusting your search criteria or filters." 
                : "Get started by creating your first notice."
              }
            </p>
            {(!searchTerm && filterType === 'all' && filterStatus === 'all') && (
              <button 
                onClick={handleCreateNotice}
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
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
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 p-2"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter notice title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
                <textarea
                  rows={6}
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter notice content"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type *</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value as "announcement" | "news" | "circular"})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    onChange={(e) => setFormData({...formData, status: e.target.value as "published" | "draft" | "archived"})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  onChange={(e) => setFormData({...formData, author: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                            <span className="text-blue-600 hover:text-blue-500 font-medium">
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
                          <p className="text-gray-500 text-sm mt-1">
                            PDF, DOC, DOCX, JPG, PNG up to 10MB
                          </p>
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
                              {selectedFile ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB` : formData.documentType.toUpperCase()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {filePreview && (
                            <button
                              type="button"
                              onClick={() => window.open(filePreview, '_blank')}
                              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
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
                  onChange={(e) => setFormData({...formData, important: e.target.checked})}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
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
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingNotice ? "Update Notice" : "Create Notice"}
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
              <button
                onClick={() => setViewingNotice(null)}
                className="text-gray-400 hover:text-gray-600 p-2"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex items-center space-x-3 mb-4">
                <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getTypeColor(viewingNotice.type)}`}>
                  {viewingNotice.type.charAt(0).toUpperCase() + viewingNotice.type.slice(1)}
                </span>
                <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(viewingNotice.status)}`}>
                  {viewingNotice.status.charAt(0).toUpperCase() + viewingNotice.status.slice(1)}
                </span>
                {viewingNotice.important && (
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                    Important
                  </span>
                )}
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{viewingNotice.title}</h2>
              
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 whitespace-pre-wrap">{viewingNotice.content}</p>
              </div>

              {viewingNotice.documentUrl && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getDocumentIcon(viewingNotice.documentType)}
                      <span className="text-sm font-medium text-blue-900">Document attached</span>
                    </div>
                    <button 
                      onClick={() => window.open(viewingNotice.documentUrl, '_blank')}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
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
                    <span className="font-medium">Created:</span> {new Date(viewingNotice.createdAt).toLocaleDateString()}
                  </div>
                  {viewingNotice.date && (
                    <div>
                      <span className="font-medium">Published:</span> {new Date(viewingNotice.date).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminDashboard>
  )
}

export default AdminNotices