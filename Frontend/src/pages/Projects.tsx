"use client"

import type React from "react"
import { useState } from "react"
import { Helmet } from "react-helmet-async"
import { CheckCircle, Clock, Lightbulb, MapPin, DollarSign, Users } from "lucide-react"

const Projects: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"proposed" | "ongoing" | "completed">("proposed")

  const proposedProjects = [
    {
      id: 1,
      title: "Community Financial Literacy Program",
      description: "Comprehensive financial education initiative for underserved communities",
      budget: "NPR 5,00,000",
      targetBeneficiaries: "500+ Community Members",
      location: "Kathmandu Valley",
      status: "proposed",
    },
    {
      id: 2,
      title: "Digital Banking Platform Enhancement",
      description: "Upgrade digital infrastructure and mobile banking capabilities",
      budget: "NPR 25,00,000",
      targetBeneficiaries: "All Members",
      location: "Nationwide",
      status: "proposed",
    },
    {
      id: 3,
      title: "Women Entrepreneurs Loan Scheme",
      description: "Special loan program to support women-led businesses",
      budget: "NPR 10,00,000",
      targetBeneficiaries: "200+ Women Entrepreneurs",
      location: "Kathmandu, Bhaktapur, Lalitpur",
      status: "proposed",
    },
  ]

  const ongoingProjects = [
    {
      id: 4,
      title: "Branch Office Renovation",
      description: "Modernization and renovation of existing branch offices",
      budget: "NPR 8,50,000",
      targetBeneficiaries: "All Members",
      location: "Multiple Locations",
      progress: 65,
      status: "ongoing",
    },
    {
      id: 5,
      title: "Member Training & Development",
      description: "Capacity building and skill development programs for members",
      budget: "NPR 3,50,000",
      targetBeneficiaries: "300+ Members",
      location: "Kathmandu Valley",
      progress: 45,
      status: "ongoing",
    },
    {
      id: 6,
      title: "IT Security & Compliance Upgrade",
      description: "Implementation of advanced security measures and regulatory compliance",
      budget: "NPR 12,00,000",
      targetBeneficiaries: "All Members",
      location: "Head Office & Branches",
      progress: 80,
      status: "ongoing",
    },
  ]

  const completedProjects = [
    {
      id: 7,
      title: "Office Infrastructure Development",
      description: "Construction and setup of new main office headquarters",
      budget: "NPR 50,00,000",
      targetBeneficiaries: "All Members",
      location: "Kathmandu",
      completionDate: "2024-06-30",
      impact: "Enhanced operational capacity and member services",
      status: "completed",
    },
    {
      id: 8,
      title: "Emergency Relief Fund Establishment",
      description: "Crisis assistance fund for members facing financial hardship",
      budget: "NPR 20,00,000",
      targetBeneficiaries: "500+ Members",
      location: "Nationwide",
      completionDate: "2024-04-15",
      impact: "Supported 450+ members in emergency situations",
      status: "completed",
    },
    {
      id: 9,
      title: "Member Database Digitalization",
      description: "Complete digitalization of member records and documentation",
      budget: "NPR 15,00,000",
      targetBeneficiaries: "All Members",
      location: "Head Office & Branches",
      completionDate: "2024-02-28",
      impact: "100% member records now digitalized for better accessibility",
      status: "completed",
    },
    {
      id: 10,
      title: "Community Awareness Campaign",
      description: "Cooperative benefits and financial literacy awareness campaign",
      budget: "NPR 7,50,000",
      targetBeneficiaries: "2000+ Community Members",
      location: "Kathmandu Valley",
      completionDate: "2023-12-31",
      impact: "Reached 2,150 potential members with awareness materials",
      status: "completed",
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

  return (
    <>
      <Helmet>
        <title>Projects - Constellation Saving & Credit Cooperative</title>
        <meta
          name="description"
          content="Explore our proposed, ongoing, and completed projects at Constellation Cooperative."
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#07730E] to-green-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Projects</h1>
              <p className="text-xl text-green-100 max-w-3xl mx-auto">
                Discover the initiatives and projects we're undertaking to enhance services and support our members' growth.
              </p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 mb-10 border-b border-gray-200 pb-0">
            <button
              onClick={() => setActiveTab("proposed")}
              className={`px-6 py-4 font-semibold transition-colors border-b-4 ${
                activeTab === "proposed"
                  ? "border-[#07730E] text-[#07730E]"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              <Lightbulb className="inline-block mr-2" size={20} />
              Proposed Projects
            </button>
            <button
              onClick={() => setActiveTab("ongoing")}
              className={`px-6 py-4 font-semibold transition-colors border-b-4 ${
                activeTab === "ongoing"
                  ? "border-[#07730E] text-[#07730E]"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              <Clock className="inline-block mr-2" size={20} />
              On Going Projects
            </button>
            <button
              onClick={() => setActiveTab("completed")}
              className={`px-6 py-4 font-semibold transition-colors border-b-4 ${
                activeTab === "completed"
                  ? "border-[#07730E] text-[#07730E]"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              <CheckCircle className="inline-block mr-2" size={20} />
              Completed Projects
            </button>
          </div>

          {/* Proposed Projects Tab */}
          {activeTab === "proposed" && (
            <div className="space-y-6">
              {proposedProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 border-l-4 border-[#07730E] hover:transform hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                      <p className="text-gray-600">{project.description}</p>
                    </div>
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium whitespace-nowrap ml-4">
                      Proposed
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                      <DollarSign size={20} className="text-[#07730E]" />
                      <div>
                        <p className="text-xs text-gray-500">Budget</p>
                        <p className="font-semibold text-gray-900">{project.budget}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users size={20} className="text-[#07730E]" />
                      <div>
                        <p className="text-xs text-gray-500">Target Beneficiaries</p>
                        <p className="font-semibold text-gray-900">{project.targetBeneficiaries}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin size={20} className="text-[#07730E]" />
                      <div>
                        <p className="text-xs text-gray-500">Location</p>
                        <p className="font-semibold text-gray-900">{project.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Ongoing Projects Tab */}
          {activeTab === "ongoing" && (
            <div className="space-y-6">
              {ongoingProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 border-l-4 border-[#07730E] hover:transform hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                      <p className="text-gray-600">{project.description}</p>
                    </div>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium whitespace-nowrap ml-4">
                      In Progress
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-gray-700">Project Progress</p>
                      <p className="text-sm font-semibold text-[#07730E]">{project.progress}%</p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-[#07730E] h-2 rounded-full transition-all duration-300"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                      <DollarSign size={20} className="text-[#07730E]" />
                      <div>
                        <p className="text-xs text-gray-500">Budget</p>
                        <p className="font-semibold text-gray-900">{project.budget}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users size={20} className="text-[#07730E]" />
                      <div>
                        <p className="text-xs text-gray-500">Target Beneficiaries</p>
                        <p className="font-semibold text-gray-900">{project.targetBeneficiaries}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin size={20} className="text-[#07730E]" />
                      <div>
                        <p className="text-xs text-gray-500">Location</p>
                        <p className="font-semibold text-gray-900">{project.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Completed Projects Tab */}
          {activeTab === "completed" && (
            <div className="space-y-6">
              {completedProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 border-l-4 border-green-500 hover:transform hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                      <p className="text-gray-600">{project.description}</p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium whitespace-nowrap ml-4">
                      Completed
                    </span>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">Impact & Results</p>
                      <p className="text-gray-600">{project.impact}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                      <DollarSign size={20} className="text-green-600" />
                      <div>
                        <p className="text-xs text-gray-500">Budget</p>
                        <p className="font-semibold text-gray-900">{project.budget}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users size={20} className="text-green-600" />
                      <div>
                        <p className="text-xs text-gray-500">Beneficiaries</p>
                        <p className="font-semibold text-gray-900">{project.targetBeneficiaries}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin size={20} className="text-green-600" />
                      <div>
                        <p className="text-xs text-gray-500">Location</p>
                        <p className="font-semibold text-gray-900">{project.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle size={20} className="text-green-600" />
                      <div>
                        <p className="text-xs text-gray-500">Completed</p>
                        <p className="font-semibold text-gray-900">{formatDate(project.completionDate)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Statistics Section */}
        <div className="bg-[#07730E] bg-opacity-5 py-12 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Project Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-[#07730E] mb-2">{proposedProjects.length}</div>
                <p className="text-gray-600 font-medium">Proposed Projects</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#07730E] mb-2">{ongoingProjects.length}</div>
                <p className="text-gray-600 font-medium">Ongoing Projects</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#07730E] mb-2">{completedProjects.length}</div>
                <p className="text-gray-600 font-medium">Completed Projects</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#07730E] mb-2">
                  {proposedProjects.length + ongoingProjects.length + completedProjects.length}
                </div>
                <p className="text-gray-600 font-medium">Total Projects</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-[#07730E] to-green-800 text-white py-16 mt-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Want to Know More?</h2>
            <p className="text-xl text-green-100 mb-8">
              For detailed information about any of our projects, please contact us or visit our office.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-[#07730E] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Request Project Details
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#07730E] transition-colors">
                Contact: 01-4254939
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Projects