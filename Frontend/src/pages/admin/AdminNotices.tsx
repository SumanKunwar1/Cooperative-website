"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { PlusIcon, PencilIcon, TrashIcon, MagnifyingGlassIcon, BellIcon, EyeIcon } from "@heroicons/react/24/outline"
import AdminDashboard from "./AdminDashboard"

interface Notice {
  id: string
  title: string
  content: string
  type: "announcement" | "alert" | "info" | "warning"
  status: "published" | "draft" | "archived"
  priority: "low" | "medium" | "high"
  author: string
  createdAt: string
  publishedAt?: string
}

const AdminNotices: React.FC = () => {
  const [notices, setNotices] = useState<Notice[]>([
    {
      id: "1",
      title: "Annual General Meeting 2024",
      content: "The Annual General Meeting will be held on March 15, 2024, at 10:00 AM in the main conference hall.",
      type: "announcement",
      status: "published",
      priority: "high",
      author: "Admin",
      createdAt: "2024-01-15",
      publishedAt: "2024-01-15",
    },
    {
      id: "2",
      title: "System Maintenance Notice",
      content: "Our online banking system will be under maintenance on January 25, 2024, from 2:00 AM to 6:00 AM.",
      type: "alert",
      status: "published",
      priority: "medium",
      author: "IT Department",
      createdAt: "2024-01-18",
      publishedAt: "2024-01-18",
    },
    {
      id: "3",
      title: "New Loan Products Available",
      content: "We are excited to announce new loan products with competitive interest rates.",
      type: "info",
      status: "draft",
      priority: "low",
      author: "Admin",
      createdAt: "2024-01-20",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<"all" | "announcement" | "alert" | "info" | "warning">("all")
  const [filterStatus, setFilterStatus] = useState<"all" | "published" | "draft" | "archived">("all")

  const filteredNotices = notices.filter((notice) => {
    const matchesSearch =
      notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notice.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || notice.type === filterType
    const matchesStatus = filterStatus === "all" || notice.status === filterStatus
    return matchesSearch && matchesType && matchesStatus
  })

  const handleDeleteNotice = (noticeId: string) => {
    if (window.confirm("Are you sure you want to delete this notice?")) {
      setNotices(notices.filter((notice) => notice.id !== noticeId))
    }
  }

  const handleStatusChange = (noticeId: string, newStatus: "published" | "draft" | "archived") => {
    setNotices(
      notices.map((notice) =>
        notice.id === noticeId
          ? {
              ...notice,
              status: newStatus,
              publishedAt:
                newStatus === "published" && !notice.publishedAt
                  ? new Date().toISOString().split("T")[0]
                  : notice.publishedAt,
            }
          : notice,
      ),
    )
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "announcement":
        return "bg-blue-100 text-blue-800"
      case "alert":
        return "bg-red-100 text-red-800"
      case "info":
        return "bg-green-100 text-green-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <AdminDashboard currentSection="notices">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">Notice Management</h2>
          <button className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors duration-200">
            <PlusIcon className="h-5 w-5 mr-2" />
            Create Notice
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search notices..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as "all" | "announcement" | "alert" | "info" | "warning")}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="announcement">Announcement</option>
              <option value="alert">Alert</option>
              <option value="info">Info</option>
              <option value="warning">Warning</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as "all" | "published" | "draft" | "archived")}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        {/* Notices List */}
        <div className="space-y-4">
          {filteredNotices.map((notice) => (
            <motion.div
              key={notice.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{notice.title}</h3>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(notice.type)}`}
                    >
                      {notice.type}
                    </span>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(notice.priority)}`}
                    >
                      {notice.priority}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3 line-clamp-2">{notice.content}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>By {notice.author}</span>
                    <span>Created: {new Date(notice.createdAt).toLocaleDateString()}</span>
                    {notice.publishedAt && <span>Published: {new Date(notice.publishedAt).toLocaleDateString()}</span>}
                  </div>
                </div>
                <div className="flex items-center space-x-3 ml-4">
                  <select
                    value={notice.status}
                    onChange={(e) =>
                      handleStatusChange(notice.id, e.target.value as "published" | "draft" | "archived")
                    }
                    className={`text-xs font-semibold rounded-full px-2 py-1 border-0 ${getStatusColor(notice.status)} focus:ring-2 focus:ring-purple-500`}
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                  <div className="flex items-center space-x-1">
                    <button className="text-purple-600 hover:text-purple-900 p-1 rounded-md hover:bg-purple-50">
                      <EyeIcon className="h-4 w-4" />
                    </button>
                    <button className="text-blue-600 hover:text-blue-900 p-1 rounded-md hover:bg-blue-50">
                      <PencilIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteNotice(notice.id)}
                      className="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-red-50"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredNotices.length === 0 && (
          <div className="text-center py-12">
            <BellIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No notices found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm ? "Try adjusting your search criteria." : "Get started by creating a new notice."}
            </p>
          </div>
        )}
      </motion.div>
    </AdminDashboard>
  )
}

export default AdminNotices
