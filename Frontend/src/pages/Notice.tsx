"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Helmet } from "react-helmet-async"
import { noticeService, type Notice as NoticeType } from "../services/noticeService"

const Notice: React.FC = () => {
  const [notices, setNotices] = useState<NoticeType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedType, setSelectedType] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchNotices()
  }, [selectedType, searchTerm])

  const fetchNotices = async () => {
    try {
      setLoading(true)
      setError(null)
      const fetchedNotices = await noticeService.getPublicNotices({
        type: selectedType !== "all" ? selectedType : undefined,
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

  const handleDocumentClick = (notice: NoticeType) => {
    if (notice.documentUrl) {
      window.open(notice.documentUrl, "_blank")
    }
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

  const getDocumentIcon = (type?: string) => {
    switch (type) {
      case "pdf":
        return "📄"
      case "doc":
      case "docx":
        return "📝"
      case "jpg":
      case "png":
        return "🖼️"
      default:
        return "📎"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <>
      <Helmet>
        <title>Notice Board - Constellation Saving & Credit Cooperative</title>
        <meta
          name="description"
          content="Stay updated with important announcements, circulars, and news from Constellation Cooperative."
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Notice Board</h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Stay informed with the latest announcements, circulars, and important updates from Constellation
                Cooperative
              </p>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search notices..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedType("all")}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedType === "all" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setSelectedType("announcement")}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedType === "announcement"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Announcements
                </button>
                <button
                  onClick={() => setSelectedType("news")}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedType === "news" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  News
                </button>
                <button
                  onClick={() => setSelectedType("circular")}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedType === "circular"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Circulars
                </button>
              </div>
            </div>
          </div>

          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading notices...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-800">{error}</p>
              <button onClick={fetchNotices} className="mt-2 text-red-600 hover:text-red-800 font-medium">
                Try again
              </button>
            </div>
          )}

          {/* Notices Grid */}
          {!loading && !error && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {notices.map((notice) => (
                <div
                  key={notice.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                  onClick={() => handleDocumentClick(notice)}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(notice.type)}`}>
                        {notice.type.charAt(0).toUpperCase() + notice.type.slice(1)}
                      </span>
                      {notice.important && (
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                          Important
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{notice.title}</h3>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{notice.content}</p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{formatDate(notice.date)}</span>
                      {notice.documentUrl && (
                        <div className="flex items-center gap-1 text-blue-600 hover:text-blue-800">
                          <span className="text-lg">{getDocumentIcon(notice.documentType)}</span>
                          <span className="text-xs font-medium">View Document</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && !error && notices.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📋</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No notices found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 mt-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Connected with Constellation</h2>
            <p className="text-xl text-blue-100 mb-8">
              Never miss important updates. Subscribe to our notifications or contact us directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Subscribe to Updates
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Contact Us: 01-4254939
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Notice
