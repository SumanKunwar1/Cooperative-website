"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { EyeIcon, CheckCircleIcon, XCircleIcon, ClockIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { useApplications, type LoanApplication } from "../../contexts/ApplicationContext"
import AdminDashboard from "./AdminDashboard"

const AdminLoanApplications: React.FC = () => {
  const { loanApplications, updateLoanApplicationStatus } = useApplications()
  const [selectedApplication, setSelectedApplication] = useState<LoanApplication | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

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
        return "text-blue-600 bg-blue-100"
    }
  }

  const handleStatusUpdate = (id: string, status: LoanApplication["status"]) => {
    updateLoanApplicationStatus(id, status)
    if (selectedApplication && selectedApplication.id === id) {
      setSelectedApplication({ ...selectedApplication, status })
    }
  }

  return (
    <AdminDashboard currentSection="loan-application">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Loan Applications</h2>
          <div className="text-sm text-gray-500">Total: {loanApplications.length} applications</div>
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
                      key={application.id}
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
                        Rs. {application.loanAmount}
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
                        >
                          <EyeIcon className="h-5 w-5" />
                        </button>
                        {application.status === "pending" && (
                          <>
                            <button
                              onClick={() => handleStatusUpdate(application.id, "approved")}
                              className="text-green-600 hover:text-green-900"
                            >
                              <CheckCircleIcon className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(application.id, "rejected")}
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
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Loan Application Details</h3>
                  <button onClick={() => setSelectedApplication(null)} className="text-gray-400 hover:text-gray-600">
                    <XCircleIcon className="h-6 w-6" />
                  </button>
                </div>

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
                        <span className="font-medium">Marital Status:</span> {selectedApplication.maritalStatus}
                      </p>
                      <p>
                        <span className="font-medium">Nationality:</span> {selectedApplication.nationality}
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
                        <span className="font-medium">Alternate Phone:</span> {selectedApplication.alternatePhone}
                      </p>
                      <p>
                        <span className="font-medium">Permanent Address:</span> {selectedApplication.permanentAddress}
                      </p>
                      <p>
                        <span className="font-medium">District:</span> {selectedApplication.district}
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
                        <span className="font-medium">Loan Amount:</span> Rs. {selectedApplication.loanAmount}
                      </p>
                      <p>
                        <span className="font-medium">Loan Purpose:</span> {selectedApplication.loanPurpose}
                      </p>
                      <p>
                        <span className="font-medium">Loan Term:</span> {selectedApplication.loanTerm}
                      </p>
                      <p>
                        <span className="font-medium">Preferred EMI:</span> Rs. {selectedApplication.preferredEMI}
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
                        <span className="font-medium">Employer:</span> {selectedApplication.employerName}
                      </p>
                      <p>
                        <span className="font-medium">Monthly Income:</span> Rs. {selectedApplication.monthlyIncome}
                      </p>
                      <p>
                        <span className="font-medium">Total Income:</span> Rs. {selectedApplication.totalIncome}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  {selectedApplication.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleStatusUpdate(selectedApplication.id, "under-review")}
                        className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
                      >
                        Mark Under Review
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(selectedApplication.id, "approved")}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(selectedApplication.id, "rejected")}
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
