"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  BuildingOfficeIcon,
  EyeIcon,
} from "@heroicons/react/24/outline"
import AdminDashboard from "./AdminDashboard"

interface Business {
  id: string
  name: string
  category: string
  owner: string
  email: string
  phone: string
  address: string
  status: "active" | "pending" | "suspended"
  rating: number
  createdAt: string
}

const AdminBusinesses: React.FC = () => {
  const [businesses, setBusinesses] = useState<Business[]>([
    {
      id: "1",
      name: "ABC Electronics",
      category: "Electronics",
      owner: "John Smith",
      email: "contact@abcelectronics.com",
      phone: "+977-1-4441234",
      address: "Kathmandu, Nepal",
      status: "active",
      rating: 4.5,
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      name: "Fashion Hub",
      category: "Clothing",
      owner: "Jane Doe",
      email: "info@fashionhub.com",
      phone: "+977-1-4445678",
      address: "Lalitpur, Nepal",
      status: "pending",
      rating: 4.2,
      createdAt: "2024-01-18",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "pending" | "suspended">("all")
  const [, setShowAddModal] = useState(false)

  const filteredBusinesses = businesses.filter((business) => {
    const matchesSearch =
      business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      business.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      business.owner.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || business.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const handleDeleteBusiness = (businessId: string) => {
    if (window.confirm("Are you sure you want to delete this business?")) {
      setBusinesses(businesses.filter((business) => business.id !== businessId))
    }
  }

  const handleStatusChange = (businessId: string, newStatus: "active" | "pending" | "suspended") => {
    setBusinesses(
      businesses.map((business) => (business.id === businessId ? { ...business, status: newStatus } : business)),
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "suspended":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <AdminDashboard currentSection="businesses">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">Business Management</h2>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors duration-200"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Business
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
                  placeholder="Search businesses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as "all" | "active" | "pending" | "suspended")}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>

        {/* Businesses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBusinesses.map((business) => (
            <motion.div
              key={business.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <BuildingOfficeIcon className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{business.name}</h3>
                    <p className="text-sm text-gray-500">{business.category}</p>
                  </div>
                </div>
                <span
                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(business.status)}`}
                >
                  {business.status}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Owner:</span> {business.owner}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Email:</span> {business.email}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Phone:</span> {business.phone}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Address:</span> {business.address}
                </p>
                <div className="flex items-center space-x-1">
                  <span className="text-sm font-medium text-gray-600">Rating:</span>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(business.rating) ? "text-yellow-400" : "text-gray-300"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-1 text-sm text-gray-600">({business.rating})</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <button className="text-purple-600 hover:text-purple-900 p-1 rounded-md hover:bg-purple-50">
                    <EyeIcon className="h-4 w-4" />
                  </button>
                  <button className="text-blue-600 hover:text-blue-900 p-1 rounded-md hover:bg-blue-50">
                    <PencilIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteBusiness(business.id)}
                    className="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-red-50"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
                <select
                  value={business.status}
                  onChange={(e) =>
                    handleStatusChange(business.id, e.target.value as "active" | "pending" | "suspended")
                  }
                  className="text-xs border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredBusinesses.length === 0 && (
          <div className="text-center py-12">
            <BuildingOfficeIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No businesses found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm ? "Try adjusting your search criteria." : "Get started by adding a new business."}
            </p>
          </div>
        )}
      </motion.div>
    </AdminDashboard>
  )
}

export default AdminBusinesses
