"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  EyeIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  MagnifyingGlassIcon,
  DocumentArrowDownIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline"
import { loanApplicationService, type LoanApplication } from "../../services/loanApplicationService"
import AdminDashboard from "./AdminDashboard"
import JSZip from "jszip"

const AdminLoanApplications: React.FC = () => {
  const [loanApplications, setLoanApplications] = useState<LoanApplication[]>([])
  const [selectedApplication, setSelectedApplication] = useState<LoanApplication | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [loading, setLoading] = useState(true)
  const [showTextView, setShowTextView] = useState(false)
  const [exportLoading, setExportLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    setLoading(true)
    setError(null)
    try {
      const applications = await loanApplicationService.getApplications()
      setLoanApplications(applications)
    } catch (error: any) {
      console.error("Error fetching applications:", error)
      setError(`Error fetching applications: ${error.message || "Please check your connection"}`)
    } finally {
      setLoading(false)
    }
  }

  const filteredApplications = loanApplications.filter((app) => {
    const matchesSearch =
      `${app.firstName} ${app.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.primaryPhone.includes(searchTerm)
    const matchesStatus = statusFilter === "all" || app.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "text-green-600 bg-green-100"
      case "rejected":
        return "text-red-600 bg-red-100"
      case "under-review":
        return "text-yellow-600 bg-yellow-100"
      default:
        return "text-green-600 bg-green-100"
    }
  }

  const handleStatusUpdate = async (id: string, status: LoanApplication["status"]) => {
    try {
      const response = await loanApplicationService.updateApplicationStatus(id, status)
      if (response) {
        await fetchApplications()
        if (selectedApplication && selectedApplication._id === id) {
          setSelectedApplication({ ...selectedApplication, status })
        }
      }
    } catch (error) {
      console.error("Error updating application status:", error)
      alert("Error updating application status")
    }
  }

  const generateTextView = (application: LoanApplication): string => {
    return `LOAN APPLICATION DETAILS
========================

Application ID: ${application._id}
Status: ${application.status.toUpperCase()}
Submitted: ${new Date(application.submittedAt).toLocaleString()}
Last Updated: ${new Date(application.updatedAt).toLocaleString()}

PERSONAL INFORMATION
-------------------
Name: ${application.firstName} ${application.lastName}
Date of Birth: ${application.dateOfBirth}
Gender: ${application.gender}
Marital Status: ${application.maritalStatus || "N/A"}
Nationality: ${application.nationality || "N/A"}

CONTACT INFORMATION
------------------
Email: ${application.email}
Primary Phone: ${application.primaryPhone}
Alternate Phone: ${application.alternatePhone || "N/A"}
Permanent Address: ${application.permanentAddress}
District: ${application.district || "N/A"}

IDENTIFICATION
-------------
Citizenship Number: ${application.citizenshipNo}

EMPLOYMENT INFORMATION
---------------------
Occupation: ${application.occupation}
Monthly Income: NPR ${application.monthlyIncome}
Employer Name: ${application.employerName || "N/A"}
Total Income: NPR ${application.totalIncome || "N/A"}

LOAN INFORMATION
---------------
Loan Type: ${application.loanType}
Loan Amount: NPR ${application.loanAmount}
Loan Purpose: ${application.loanPurpose}
Loan Term: ${application.loanTerm}
Preferred EMI: NPR ${application.preferredEMI || "N/A"}

UPLOADED DOCUMENTS
-----------------
Profile Photo: ${application.profilePhoto ? "Uploaded" : "Not Uploaded"}
Citizenship Front: ${application.citizenshipFront ? "Uploaded" : "Not Uploaded"}
Citizenship Back: ${application.citizenshipBack ? "Uploaded" : "Not Uploaded"}
Income Proof: ${application.incomeProof ? "Uploaded" : "Not Uploaded"}

Generated on: ${new Date().toLocaleString()}
`
  }

  const exportApplicationAsZip = async (application: LoanApplication) => {
    setExportLoading(true)
    try {
      const zip = new JSZip()

      // Add text file with application data
      const textContent = generateTextView(application)
      zip.file(`${application.firstName}_${application.lastName}_Application.txt`, textContent)

      // Add documents if they exist
      const documents = [
        { key: "profilePhoto", name: "Profile_Photo" },
        { key: "citizenshipFront", name: "Citizenship_Front" },
        { key: "citizenshipBack", name: "Citizenship_Back" },
        { key: "incomeProof", name: "Income_Proof" },
      ]

      for (const doc of documents) {
        const url = application[doc.key as keyof LoanApplication] as string
        if (url) {
          try {
            const response = await fetch(url)
            if (response.ok) {
              const blob = await response.blob()
              const extension = url.split(".").pop() || "jpg"
              zip.file(`${doc.name}.${extension}`, blob)
            }
          } catch (error) {
            console.error(`Error downloading ${doc.name}:`, error)
          }
        }
      }

      // Generate and download zip
      const content = await zip.generateAsync({ type: "blob" })
      const link = document.createElement("a")
      link.href = URL.createObjectURL(content)
      link.download = `${application.firstName}_${application.lastName}_LoanApplication.zip`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(link.href)
    } catch (error) {
      console.error("Error creating zip file:", error)
      alert("Error creating download file. Please try again.")
    } finally {
      setExportLoading(false)
    }
  }

  if (loading) {
    return (
      <AdminDashboard currentSection="loan-application">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-600">Loading applications...</div>
        </div>
      </AdminDashboard>
    )
  }

  return (
    <AdminDashboard currentSection="loan-application">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Loan Applications</h2>
          <div className="text-sm text-gray-500">Total: {loanApplications.length} applications</div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            <p>{error}</p>
            <button
              onClick={fetchApplications}
              className="mt-2 text-sm text-red-800 underline hover:text-red-900"
            >
              Try again
            </button>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="under-review">Under Review</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Applications List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {filteredApplications.length === 0 ? (
            <div className="text-center py-12">
              <ClockIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Applications Found</h3>
              <p className="text-gray-500">
                {searchTerm || statusFilter !== "all"
                  ? "Try adjusting your search or filter criteria."
                  : "Loan applications will appear here when submitted."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Applicant
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Loan Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Submitted
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredApplications.map((application) => (
                    <motion.tr
                      key={application._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {application.firstName} {application.lastName}
                          </div>
                          <div className="text-sm text-gray-500">{application.email}</div>
                          <div className="text-sm text-gray-500">{application.primaryPhone}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{application.loanType}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        NPR {application.loanAmount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(application.status)}`}
                        >
                          {application.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(application.submittedAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button
                          onClick={() => setSelectedApplication(application)}
                          className="text-purple-600 hover:text-purple-900"
                          title="View Details"
                        >
                          <EyeIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => exportApplicationAsZip(application)}
                          disabled={exportLoading}
                          className="text-green-600 hover:text-green-900 disabled:opacity-50"
                          title="Download as ZIP"
                        >
                          <DocumentArrowDownIcon className="h-5 w-5" />
                        </button>
                        {application.status === "pending" && (
                          <>
                            <button
                              onClick={() => handleStatusUpdate(application._id, "approved")}
                              className="text-green-600 hover:text-green-900"
                              title="Approve"
                            >
                              <CheckCircleIcon className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(application._id, "rejected")}
                              className="text-red-600 hover:text-red-900"
                              title="Reject"
                            >
                              <XCircleIcon className="h-5 w-5" />
                            </button>
                          </>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Application Detail Modal */}
        {selectedApplication && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Loan Application Details</h3>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setShowTextView(!showTextView)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      {showTextView ? "Card View" : "Text View"}
                    </button>
                    <button
                      onClick={() => exportApplicationAsZip(selectedApplication)}
                      disabled={exportLoading}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center disabled:opacity-50"
                    >
                      <DocumentArrowDownIcon className="h-4 w-4 mr-2" />
                      {exportLoading ? "Exporting..." : "Export ZIP"}
                    </button>
                    <button onClick={() => setSelectedApplication(null)} className="text-gray-400 hover:text-gray-600">
                      <XCircleIcon className="h-6 w-6" />
                    </button>
                  </div>
                </div>

                {showTextView ? (
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <pre className="whitespace-pre-wrap text-sm font-mono text-gray-800">
                      {generateTextView(selectedApplication)}
                    </pre>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Personal Information</h4>
                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="font-medium">Name:</span> {selectedApplication.firstName}{" "}
                          {selectedApplication.lastName}
                        </p>
                        <p>
                          <span className="font-medium">Date of Birth:</span> {selectedApplication.dateOfBirth}
                        </p>
                        <p>
                          <span className="font-medium">Gender:</span> {selectedApplication.gender}
                        </p>
                        <p>
                          <span className="font-medium">Marital Status:</span>{" "}
                          {selectedApplication.maritalStatus || "N/A"}
                        </p>
                        <p>
                          <span className="font-medium">Nationality:</span> {selectedApplication.nationality || "N/A"}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Contact Information</h4>
                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="font-medium">Email:</span> {selectedApplication.email}
                        </p>
                        <p>
                          <span className="font-medium">Primary Phone:</span> {selectedApplication.primaryPhone}
                        </p>
                        <p>
                          <span className="font-medium">Alternate Phone:</span>{" "}
                          {selectedApplication.alternatePhone || "N/A"}
                        </p>
                        <p>
                          <span className="font-medium">Permanent Address:</span> {selectedApplication.permanentAddress}
                        </p>
                        <p>
                          <span className="font-medium">District:</span> {selectedApplication.district || "N/A"}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Loan Details</h4>
                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="font-medium">Loan Type:</span> {selectedApplication.loanType}
                        </p>
                        <p>
                          <span className="font-medium">Loan Amount:</span> NPR {selectedApplication.loanAmount}
                        </p>
                        <p>
                          <span className="font-medium">Loan Purpose:</span> {selectedApplication.loanPurpose}
                        </p>
                        <p>
                          <span className="font-medium">Loan Term:</span> {selectedApplication.loanTerm}
                        </p>
                        <p>
                          <span className="font-medium">Preferred EMI:</span> NPR{" "}
                          {selectedApplication.preferredEMI || "N/A"}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Employment Information</h4>
                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="font-medium">Occupation:</span> {selectedApplication.occupation}
                        </p>
                        <p>
                          <span className="font-medium">Employer:</span> {selectedApplication.employerName || "N/A"}
                        </p>
                        <p>
                          <span className="font-medium">Monthly Income:</span> NPR {selectedApplication.monthlyIncome}
                        </p>
                        <p>
                          <span className="font-medium">Total Income:</span> NPR{" "}
                          {selectedApplication.totalIncome || "N/A"}
                        </p>
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <h4 className="font-semibold text-gray-900 mb-3">Uploaded Documents</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                          { key: "profilePhoto", label: "Profile Photo" },
                          { key: "citizenshipFront", label: "Citizenship Front" },
                          { key: "citizenshipBack", label: "Citizenship Back" },
                          { key: "incomeProof", label: "Income Proof" },
                        ].map((doc) => (
                          <div key={doc.key} className="text-center">
                            <div
                              className={`w-full h-24 rounded-lg border-2 border-dashed flex items-center justify-center ${
                                selectedApplication[doc.key as keyof LoanApplication]
                                  ? "border-green-300 bg-green-50"
                                  : "border-gray-300 bg-gray-50"
                              }`}
                            >
                              {selectedApplication[doc.key as keyof LoanApplication] ? (
                                <a
                                  href={selectedApplication[doc.key as keyof LoanApplication] as string}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-green-600 hover:text-green-800"
                                >
                                  <CheckCircleIcon className="h-8 w-8" />
                                </a>
                              ) : (
                                <XCircleIcon className="h-8 w-8 text-gray-400" />
                              )}
                            </div>
                            <p className="text-xs text-gray-600 mt-1">{doc.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-6 flex justify-end space-x-3">
                  {selectedApplication.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleStatusUpdate(selectedApplication._id, "under-review")}
                        className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
                      >
                        Mark Under Review
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(selectedApplication._id, "approved")}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(selectedApplication._id, "rejected")}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminDashboard>
  )
}

export default AdminLoanApplications