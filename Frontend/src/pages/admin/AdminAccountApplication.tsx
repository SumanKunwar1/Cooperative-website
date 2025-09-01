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
import { accountApplicationService, type AccountApplication } from "../../services/accountApplicationService"
import AdminDashboard from "./AdminDashboard"
import JSZip from "jszip"

const AdminAccountApplications: React.FC = () => {
  const [accountApplications, setAccountApplications] = useState<AccountApplication[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedApplication, setSelectedApplication] = useState<AccountApplication | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [showTextView, setShowTextView] = useState(false)
  const [exportLoading, setExportLoading] = useState(false)

  useEffect(() => {
    fetchApplications()
  }, [statusFilter, searchTerm])

  const fetchApplications = async () => {
    try {
      setLoading(true)
      const applications = await accountApplicationService.getApplications(
        statusFilter === "all" ? undefined : statusFilter,
        searchTerm || undefined,
      )
      setAccountApplications(applications)
    } catch (error) {
      console.error("Error fetching applications:", error)
      alert("Error fetching applications")
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "text-green-600 bg-green-100"
      case "rejected":
        return "text-red-600 bg-red-100"
      case "under-review":
        return "text-yellow-600 bg-yellow-100"
      default:
        return "text-blue-600 bg-blue-100"
    }
  }

  const handleStatusUpdate = async (id: string, status: AccountApplication["status"]) => {
    try {
      const response = await accountApplicationService.updateApplicationStatus(id, status)

      setAccountApplications((prev) => prev.map((app) => (app._id === id ? response.application : app)))

      if (selectedApplication && selectedApplication._id === id) {
        setSelectedApplication(response.application)
      }
    } catch (error) {
      console.error("Error updating application status:", error)
      alert("Error updating application status")
    }
  }

  const generateTextData = (application: AccountApplication): string => {
    return `
ACCOUNT APPLICATION DETAILS
==========================

PERSONAL INFORMATION
-------------------
Full Name: ${application.firstName} ${application.middleName || ""} ${application.lastName}
Date of Birth: ${application.dateOfBirth}
Gender: ${application.gender}
Marital Status: ${application.maritalStatus || "N/A"}
Nationality: ${application.nationality}
Religion: ${application.religion || "N/A"}
Father's Name: ${application.fatherName || "N/A"}
Mother's Name: ${application.motherName || "N/A"}
Spouse's Name: ${application.spouseName || "N/A"}

CONTACT INFORMATION
------------------
Email: ${application.email}
Primary Phone: ${application.primaryPhone}
Alternate Phone: ${application.alternatePhone || "N/A"}
Permanent Address: ${application.permanentAddress}
Temporary Address: ${application.temporaryAddress || "N/A"}
District: ${application.district}
Municipality: ${application.municipality || "N/A"}
Ward No: ${application.wardNo || "N/A"}

IDENTIFICATION DOCUMENTS
-----------------------
Citizenship Number: ${application.citizenshipNo || "N/A"}
Passport Number: ${application.passportNo || "N/A"}
PAN Number: ${application.panNo || "N/A"}

ACCOUNT DETAILS
--------------
Account Type: ${application.accountType}
Initial Deposit: Rs. ${application.initialDeposit}
Deposit Frequency: ${application.depositFrequency || "N/A"}

EMPLOYMENT INFORMATION
---------------------
Occupation: ${application.occupation}
Employer Name: ${application.employerName || "N/A"}
Monthly Income: Rs. ${application.monthlyIncome}
Income Source: ${application.incomeSource || "N/A"}

EMERGENCY CONTACT
----------------
Name: ${application.emergencyContactName || "N/A"}
Phone: ${application.emergencyContactPhone || "N/A"}
Relation: ${application.emergencyContactRelation || "N/A"}

NOMINEE INFORMATION
------------------
Nominee Name: ${application.nomineeName || "N/A"}
Nominee Relation: ${application.nomineeRelation || "N/A"}
Nominee Phone: ${application.nomineePhone || "N/A"}
Nominee Address: ${application.nomineeAddress || "N/A"}

REFERENCES
----------
Reference 1: ${application.reference1Name || "N/A"}
Reference 1 Phone: ${application.reference1Phone || "N/A"}
Reference 1 Address: ${application.reference1Address || "N/A"}
Reference 2: ${application.reference2Name || "N/A"}
Reference 2 Phone: ${application.reference2Phone || "N/A"}
Reference 2 Address: ${application.reference2Address || "N/A"}

APPLICATION STATUS
-----------------
Status: ${application.status}
Submitted Date: ${new Date(application.submittedAt).toLocaleString()}
Last Updated: ${new Date(application.updatedAt || application.submittedAt).toLocaleString()}

UPLOADED DOCUMENTS
-----------------
Profile Picture: ${application.profilePhoto ? "Available" : "Not Uploaded"}
Citizenship Front: ${application.citizenshipFront ? "Available" : "Not Uploaded"}
Citizenship Back: ${application.citizenshipBack ? "Available" : "Not Uploaded"}
Passport: ${application.passport ? "Available" : "Not Uploaded"}
PAN Card: ${application.panCard ? "Available" : "Not Uploaded"}
Income Proof: ${application.incomeProof ? "Available" : "Not Uploaded"}
Bank Statement: ${application.bankStatement ? "Available" : "Not Uploaded"}
Nominee Photo: ${application.nomineePhoto ? "Available" : "Not Uploaded"}
    `.trim()
  }

  const downloadFileFromUrl = async (url: string, filename: string): Promise<Blob | null> => {
    try {
      const response = await fetch(url)
      if (response.ok) {
        return await response.blob()
      }
    } catch (error) {
      console.error(`Error downloading ${filename}:`, error)
    }
    return null
  }

  const exportApplicationAsZip = async (application: AccountApplication) => {
    setExportLoading(true)
    try {
      const zip = new JSZip()

      // Add text data
      const textData = generateTextData(application)
      zip.file(`${application.firstName}_${application.lastName}_Application.txt`, textData)

      // Add documents if they exist
      const documents = [
        { url: application.profilePhoto, name: "Profile_Picture" },
        { url: application.citizenshipFront, name: "Citizenship_Front" },
        { url: application.citizenshipBack, name: "Citizenship_Back" },
        { url: application.passport, name: "Passport" },
        { url: application.panCard, name: "PAN_Card" },
        { url: application.incomeProof, name: "Income_Proof" },
        { url: application.bankStatement, name: "Bank_Statement" },
        { url: application.nomineePhoto, name: "Nominee_Photo" },
      ]

      for (const doc of documents) {
        if (doc.url) {
          const blob = await downloadFileFromUrl(doc.url, doc.name)
          if (blob) {
            const extension = doc.url.split(".").pop() || "jpg"
            zip.file(`${doc.name}.${extension}`, blob)
          }
        }
      }

      // Generate and download zip
      const zipBlob = await zip.generateAsync({ type: "blob" })
      const url = URL.createObjectURL(zipBlob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${application.firstName}_${application.lastName}_Application.zip`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error creating zip file:", error)
      alert("Error creating zip file")
    } finally {
      setExportLoading(false)
    }
  }

  const filteredApplications = accountApplications.filter((app) => {
    const matchesSearch =
      `${app.firstName} ${app.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.primaryPhone.includes(searchTerm)
    const matchesStatus = statusFilter === "all" || app.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <AdminDashboard currentSection="application">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Account Applications</h2>
          <div className="text-sm text-gray-500">Total: {accountApplications.length} applications</div>
        </div>

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
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-500">Loading applications...</p>
            </div>
          ) : filteredApplications.length === 0 ? (
            <div className="text-center py-12">
              <ClockIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Applications Found</h3>
              <p className="text-gray-500">
                {searchTerm || statusFilter !== "all"
                  ? "Try adjusting your search or filter criteria."
                  : "Account applications will appear here when submitted."}
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
                      Account Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Initial Deposit
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{application.accountType}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        Rs. {application.initialDeposit}
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
                          className="text-blue-600 hover:text-blue-900 disabled:opacity-50"
                          title="Export as ZIP"
                        >
                          <DocumentArrowDownIcon className="h-5 w-5" />
                        </button>
                        {application.status === "pending" && (
                          <>
                            <button
                              onClick={() => handleStatusUpdate(application._id, "approved")}
                              className="text-green-600 hover:text-green-900"
                            >
                              <CheckCircleIcon className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(application._id, "rejected")}
                              className="text-red-600 hover:text-red-900"
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
                  <h3 className="text-xl font-bold text-gray-900">Account Application Details</h3>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setShowTextView(!showTextView)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium ${
                        showTextView ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      <DocumentTextIcon className="h-4 w-4 inline mr-1" />
                      Text View
                    </button>
                    <button
                      onClick={() => exportApplicationAsZip(selectedApplication)}
                      disabled={exportLoading}
                      className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm font-medium"
                    >
                      <DocumentArrowDownIcon className="h-4 w-4 inline mr-1" />
                      {exportLoading ? "Exporting..." : "Export ZIP"}
                    </button>
                    <button onClick={() => setSelectedApplication(null)} className="text-gray-400 hover:text-gray-600">
                      <XCircleIcon className="h-6 w-6" />
                    </button>
                  </div>
                </div>

                {showTextView ? (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <pre className="whitespace-pre-wrap text-sm font-mono text-gray-800 max-h-96 overflow-y-auto">
                      {generateTextData(selectedApplication)}
                    </pre>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Personal Information</h4>
                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="font-medium">Name:</span> {selectedApplication.firstName}{" "}
                          {selectedApplication.middleName} {selectedApplication.lastName}
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
                          <span className="font-medium">Nationality:</span> {selectedApplication.nationality}
                        </p>
                        <p>
                          <span className="font-medium">Religion:</span> {selectedApplication.religion || "N/A"}
                        </p>
                        <p>
                          <span className="font-medium">Father's Name:</span> {selectedApplication.fatherName || "N/A"}
                        </p>
                        <p>
                          <span className="font-medium">Mother's Name:</span> {selectedApplication.motherName || "N/A"}
                        </p>
                        <p>
                          <span className="font-medium">Spouse's Name:</span> {selectedApplication.spouseName || "N/A"}
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
                          <span className="font-medium">Temporary Address:</span>{" "}
                          {selectedApplication.temporaryAddress || "N/A"}
                        </p>
                        <p>
                          <span className="font-medium">District:</span> {selectedApplication.district}
                        </p>
                        <p>
                          <span className="font-medium">Municipality:</span> {selectedApplication.municipality || "N/A"}
                        </p>
                        <p>
                          <span className="font-medium">Ward No:</span> {selectedApplication.wardNo || "N/A"}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Account Details</h4>
                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="font-medium">Account Type:</span> {selectedApplication.accountType}
                        </p>
                        <p>
                          <span className="font-medium">Initial Deposit:</span> Rs. {selectedApplication.initialDeposit}
                        </p>
                        <p>
                          <span className="font-medium">Deposit Frequency:</span>{" "}
                          {selectedApplication.depositFrequency || "N/A"}
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
                          <span className="font-medium">Monthly Income:</span> Rs. {selectedApplication.monthlyIncome}
                        </p>
                        <p>
                          <span className="font-medium">Income Source:</span>{" "}
                          {selectedApplication.incomeSource || "N/A"}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Identification</h4>
                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="font-medium">Citizenship No:</span>{" "}
                          {selectedApplication.citizenshipNo || "N/A"}
                        </p>
                        <p>
                          <span className="font-medium">Passport No:</span> {selectedApplication.passportNo || "N/A"}
                        </p>
                        <p>
                          <span className="font-medium">PAN No:</span> {selectedApplication.panNo || "N/A"}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Nominee Information</h4>
                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="font-medium">Nominee Name:</span> {selectedApplication.nomineeName || "N/A"}
                        </p>
                        <p>
                          <span className="font-medium">Relation:</span> {selectedApplication.nomineeRelation || "N/A"}
                        </p>
                        <p>
                          <span className="font-medium">Phone:</span> {selectedApplication.nomineePhone || "N/A"}
                        </p>
                        <p>
                          <span className="font-medium">Address:</span> {selectedApplication.nomineeAddress || "N/A"}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Emergency Contact</h4>
                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="font-medium">Name:</span> {selectedApplication.emergencyContactName || "N/A"}
                        </p>
                        <p>
                          <span className="font-medium">Phone:</span>{" "}
                          {selectedApplication.emergencyContactPhone || "N/A"}
                        </p>
                        <p>
                          <span className="font-medium">Relation:</span>{" "}
                          {selectedApplication.emergencyContactRelation || "N/A"}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">References</h4>
                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="font-medium">Reference 1:</span>{" "}
                          {selectedApplication.reference1Name || "N/A"}
                        </p>
                        <p>
                          <span className="font-medium">Reference 1 Phone:</span>{" "}
                          {selectedApplication.reference1Phone || "N/A"}
                        </p>
                        <p>
                          <span className="font-medium">Reference 1 Address:</span>{" "}
                          {selectedApplication.reference1Address || "N/A"}
                        </p>
                        <p>
                          <span className="font-medium">Reference 2:</span>{" "}
                          {selectedApplication.reference2Name || "N/A"}
                        </p>
                        <p>
                          <span className="font-medium">Reference 2 Phone:</span>{" "}
                          {selectedApplication.reference2Phone || "N/A"}
                        </p>
                        <p>
                          <span className="font-medium">Reference 2 Address:</span>{" "}
                          {selectedApplication.reference2Address || "N/A"}
                        </p>
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

export default AdminAccountApplications
