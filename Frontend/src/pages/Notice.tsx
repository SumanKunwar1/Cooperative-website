"use client"

import type React from "react"
import { useState } from "react"
import { Helmet } from "react-helmet-async"

interface Notice {
  id: string
  title: string
  content: string
  date: string
  type: "announcement" | "news" | "circular"
  important: boolean
  documentUrl?: string
  documentType?: "pdf" | "doc" | "docx" | "jpg" | "png"
}

const mockNotices: Notice[] = [
  {
    id: "1",
    title: "Annual General Meeting 2024",
    content:
      "All members are cordially invited to attend the Annual General Meeting scheduled for March 15, 2024. Please find the detailed agenda and meeting guidelines in the attached document.",
    date: "2024-02-15",
    type: "announcement",
    important: true,
    documentUrl: "/documents/agm-2024-agenda.pdf",
    documentType: "pdf",
  },
  {
    id: "2",
    title: "New Digital Banking Services",
    content:
      "We are pleased to announce the launch of our new digital banking platform for all members. This revolutionary service will provide 24/7 access to your accounts.",
    date: "2024-02-10",
    type: "news",
    important: false,
    documentUrl: "/documents/digital-banking-guide.pdf",
    documentType: "pdf",
  },
  {
    id: "3",
    title: "Interest Rate Revision Circular",
    content:
      "Effective from March 1, 2024, the interest rates for savings accounts will be revised. Please review the new rate structure in the attached circular.",
    date: "2024-02-08",
    type: "circular",
    important: true,
    documentUrl: "/documents/interest-rate-circular.pdf",
    documentType: "pdf",
  },
  {
    id: "4",
    title: "Holiday Schedule 2024",
    content:
      "Please note the updated holiday schedule for 2024. All branches will remain closed on the mentioned dates.",
    date: "2024-01-30",
    type: "announcement",
    important: false,
    documentUrl: "/documents/holiday-schedule-2024.jpg",
    documentType: "jpg",
  },
  {
    id: "5",
    title: "Loan Policy Updates",
    content:
      "Important updates to our loan policies and procedures. All members planning to apply for loans should review these changes.",
    date: "2024-01-25",
    type: "circular",
    important: true,
    documentUrl: "/documents/loan-policy-updates.docx",
    documentType: "docx",
  },
  {
    id: "6",
    title: "Community Development Program Launch",
    content:
      "Constellation Cooperative is proud to announce the launch of our Community Development Program aimed at supporting local businesses and entrepreneurs.",
    date: "2024-01-20",
    type: "news",
    important: false,
    documentUrl: "/documents/community-program-details.pdf",
    documentType: "pdf",
  },
]

const Notice: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredNotices = mockNotices.filter((notice) => {
    const matchesType = selectedType === "all" || notice.type === selectedType
    const matchesSearch =
      notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notice.content.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesType && matchesSearch
  })

  const handleDocumentClick = (notice: Notice) => {
    if (notice.documentUrl) {
      // In a real application, this would open the actual document
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

          {/* Notices Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredNotices.map((notice) => (
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

          {filteredNotices.length === 0 && (
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
