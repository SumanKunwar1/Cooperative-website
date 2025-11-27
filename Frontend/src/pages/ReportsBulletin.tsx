"use client"

import type React from "react"
import { useState } from "react"
import { Helmet } from "react-helmet-async"
import { FileText, Download } from "lucide-react"

const ReportsBulletin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"reports" | "bulletin">("reports")

  const reports = [
    {
      id: 1,
      title: "Annual Report 2024",
      description: "Comprehensive annual report of Constellation Saving & Credit Cooperative for the year 2024",
      date: "2024-12-31",
      link: "https://drive.google.com/file/d/1avSvckwQk69hzpvCu_TLVCEVe2NxuoeD/view?usp=sharing",
    },
    {
      id: 2,
      title: "Annual Report 2023",
      description: "Comprehensive annual report of Constellation Saving & Credit Cooperative for the year 2023",
      date: "2023-12-31",
      link: "#",
    },
    {
      id: 3,
      title: "Annual Report 2022",
      description: "Comprehensive annual report of Constellation Saving & Credit Cooperative for the year 2022",
      date: "2022-12-31",
      link: "#",
    },
  ]

  const bulletins = [
    {
      id: 1,
      title: "Q4 2024 Quarterly Bulletin",
      description: "Latest updates, performance metrics, and important announcements for Q4 2024",
      date: "2024-12-15",
      link: "#",
    },
    {
      id: 2,
      title: "Q3 2024 Quarterly Bulletin",
      description: "Latest updates, performance metrics, and important announcements for Q3 2024",
      date: "2024-09-15",
      link: "#",
    },
    {
      id: 3,
      title: "Q2 2024 Quarterly Bulletin",
      description: "Latest updates, performance metrics, and important announcements for Q2 2024",
      date: "2024-06-15",
      link: "#",
    },
    {
      id: 4,
      title: "Q1 2024 Quarterly Bulletin",
      description: "Latest updates, performance metrics, and important announcements for Q1 2024",
      date: "2024-03-15",
      link: "#",
    },
  ]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const handleDownload = (link: string) => {
    if (link !== "#") {
      window.open(link, "_blank")
    }
  }

  return (
    <>
      <Helmet>
        <title>Reports & Bulletin - Constellation Saving & Credit Cooperative</title>
        <meta
          name="description"
          content="Access annual reports and quarterly bulletins from Constellation Cooperative."
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#07730E] to-green-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Reports & Bulletin</h1>
              <p className="text-xl text-green-100 max-w-3xl mx-auto">
                Explore our comprehensive annual reports and quarterly bulletins. Stay informed about our organizational performance and updates.
              </p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Tab Navigation */}
          <div className="flex gap-4 mb-8 border-b border-gray-200">
            <button
              onClick={() => setActiveTab("reports")}
              className={`px-6 py-3 font-semibold transition-colors border-b-2 ${
                activeTab === "reports"
                  ? "border-[#07730E] text-[#07730E]"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              <FileText className="inline-block mr-2" size={20} />
              Reports
            </button>
            <button
              onClick={() => setActiveTab("bulletin")}
              className={`px-6 py-3 font-semibold transition-colors border-b-2 ${
                activeTab === "bulletin"
                  ? "border-[#07730E] text-[#07730E]"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              <FileText className="inline-block mr-2" size={20} />
              Quarterly Bulletin
            </button>
          </div>

          {/* Reports Tab */}
          {activeTab === "reports" && (
            <div className="space-y-6">
              {reports.map((report) => (
                <div
                  key={report.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 border-l-4 border-[#07730E]"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <FileText size={24} className="text-[#07730E]" />
                        <h3 className="text-xl font-semibold text-gray-900">{report.title}</h3>
                      </div>
                      <p className="text-gray-600 mb-3">{report.description}</p>
                      <p className="text-sm text-gray-500">Published: {formatDate(report.date)}</p>
                    </div>
                    <button
                      onClick={() => handleDownload(report.link)}
                      disabled={report.link === "#"}
                      className={`ml-4 px-6 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors ${
                        report.link !== "#"
                          ? "bg-[#07730E] text-white hover:bg-green-700"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      <Download size={18} />
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bulletin Tab */}
          {activeTab === "bulletin" && (
            <div className="space-y-6">
              {bulletins.map((bulletin) => (
                <div
                  key={bulletin.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 border-l-4 border-[#07730E]"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <FileText size={24} className="text-[#07730E]" />
                        <h3 className="text-xl font-semibold text-gray-900">{bulletin.title}</h3>
                      </div>
                      <p className="text-gray-600 mb-3">{bulletin.description}</p>
                      <p className="text-sm text-gray-500">Published: {formatDate(bulletin.date)}</p>
                    </div>
                    <button
                      onClick={() => handleDownload(bulletin.link)}
                      disabled={bulletin.link === "#"}
                      className={`ml-4 px-6 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors ${
                        bulletin.link !== "#"
                          ? "bg-[#07730E] text-white hover:bg-green-700"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      <Download size={18} />
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-[#07730E] to-green-800 text-white py-16 mt-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Need More Information?</h2>
            <p className="text-xl text-green-100 mb-8">
              Contact us for any questions about our reports or organizational performance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-[#07730E] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Request Document
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#07730E] transition-colors">
                Contact Us: 01-4254939
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ReportsBulletin