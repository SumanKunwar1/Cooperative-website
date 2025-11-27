"use client"

import type React from "react"
import { Helmet } from "react-helmet-async"
import { Download, FileText } from "lucide-react"

const Downloads: React.FC = () => {
  const downloadCategories = [
    {
      category: "Reports",
      items: [
        {
          id: 1,
          title: "Annual Report 2024",
          description: "Comprehensive annual report with financial details and organizational updates",
          link: "https://drive.google.com/file/d/1avSvckwQk69hzpvCu_TLVCEVe2NxuoeD/view?usp=sharing",
        },
        {
          id: 2,
          title: "Annual Report 2023",
          description: "Annual report for the fiscal year 2023",
          link: "#",
        },
      ],
    },
    {
      category: "Bulletin",
      items: [
        {
          id: 3,
          title: "Q4 2024 Quarterly Bulletin",
          description: "Latest quarterly updates and performance metrics",
          link: "#",
        },
        {
          id: 4,
          title: "Q3 2024 Quarterly Bulletin",
          description: "Q3 2024 updates and announcements",
          link: "#",
        },
      ],
    },
    {
      category: "Member Application",
      items: [
        {
          id: 5,
          title: "Member Application Form",
          description: "Application form for new members joining Constellation Cooperative",
          link: "#",
        },
      ],
    },
    {
      category: "Forms",
      items: [
        {
          id: 6,
          title: "Loan Application Forms",
          description: "Standard forms for loan applications and inquiries",
          link: "#",
        },
        {
          id: 7,
          title: "Account Open Forms",
          description: "Forms required to open a new account with us",
          link: "#",
        },
      ],
    },
    {
      category: "Rules & Regulations",
      items: [
        {
          id: 8,
          title: "सहकारी ऐन तथा नियमावली",
          description: "सहकारी ऐन, नियम र आन्तररक कार्यविधिहरु",
          link: "#",
        },
        {
          id: 9,
          title: "आन्तररक कार्यविधिहरु",
          description: "संस्थाको आन्तररक कार्यविधि र दिशानिर्देशन",
          link: "#",
        },
      ],
    },
  ]

  const handleDownload = (link: string) => {
    if (link !== "#") {
      window.open(link, "_blank")
    }
  }

  return (
    <>
      <Helmet>
        <title>Downloads - Constellation Saving & Credit Cooperative</title>
        <meta
          name="description"
          content="Download important forms, reports, bulletins, and documents from Constellation Cooperative."
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#07730E] to-green-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Downloads</h1>
              <p className="text-xl text-green-100 max-w-3xl mx-auto">
                Access all important documents, forms, reports, and guidelines from Constellation Cooperative.
              </p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="space-y-12">
            {downloadCategories.map((categorySection, sectionIdx) => (
              <div key={sectionIdx} className="space-y-6">
                {/* Category Header */}
                <div className="flex items-center gap-3 pb-4 border-b-2 border-[#07730E]">
                  <div className="w-2 h-8 bg-[#07730E] rounded"></div>
                  <h2 className="text-2xl font-bold text-gray-900">{categorySection.category}</h2>
                </div>

                {/* Documents Grid */}
                <div className="grid gap-6 md:grid-cols-2">
                  {categorySection.items.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 border-l-4 border-[#07730E] hover:transform hover:-translate-y-1"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-[#07730E] bg-opacity-10">
                            <FileText size={24} className="text-[#07730E]" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.title}</h3>
                          <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                          <button
                            onClick={() => handleDownload(item.link)}
                            disabled={item.link === "#"}
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                              item.link !== "#"
                                ? "bg-[#07730E] text-white hover:bg-green-700"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                          >
                            <Download size={16} />
                            Download
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-[#07730E] bg-opacity-5 py-12 mt-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Need Help?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#07730E] mb-2">📞</div>
                <h3 className="font-semibold text-gray-900 mb-2">Contact Us</h3>
                <p className="text-gray-600">Call us at 01-4254939 for assistance</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#07730E] mb-2">📧</div>
                <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                <p className="text-gray-600">Send your queries to our support team</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#07730E] mb-2">🏢</div>
                <h3 className="font-semibold text-gray-900 mb-2">Visit Office</h3>
                <p className="text-gray-600">Visit our office for physical documents</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-[#07730E] to-green-800 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Can't Find What You're Looking For?</h2>
            <p className="text-xl text-green-100 mb-8">
              Contact our support team and we'll help you find the documents you need.
            </p>
            <button className="bg-white text-[#07730E] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Contact Support: 01-4254939
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Downloads