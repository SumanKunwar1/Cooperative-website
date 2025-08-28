"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import {
  HomeIcon,
  UsersIcon,
  BuildingOfficeIcon,
  ShoppingBagIcon,
  CogIcon,
  BellIcon,
  ChartBarIcon,
  DocumentTextIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline"
import { useAdmin } from "../../contexts/AdminContext"
import { useNavigate } from "react-router-dom"

interface AdminDashboardProps {
  children?: React.ReactNode
  currentSection?: string
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ children, currentSection = "overview" }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { admin, logout } = useAdmin()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/admin/login")
  }

  const sidebarItems = [
    { id: "overview", name: "Overview", icon: HomeIcon, path: "/admin/dashboard" },
    { id: "users", name: "Users", icon: UsersIcon, path: "/admin/users" },
    { id: "businesses", name: "Businesses", icon: BuildingOfficeIcon, path: "/admin/businesses" },
    { id: "products", name: "Products", icon: ShoppingBagIcon, path: "/admin/products" },
    { id: "orders", name: "Orders", icon: ShoppingBagIcon, path: "/admin/orders" },
    { id: "services", name: "Services", icon: CogIcon, path: "/admin/services" },
    { id: "shareholders", name: "Shareholders", icon: UserGroupIcon, path: "/admin/shareholders" },
    { id: "application", name: "Account Application", icon: ShoppingBagIcon, path: "/admin/account-applications" },
    { id: "loan-application", name: "Loan Application", icon: ShoppingBagIcon, path: "/admin/loan-applications" },
    { id: "about", name: "About Us", icon: DocumentTextIcon, path: "/admin/about" },
    { id: "notices", name: "Notices", icon: BellIcon, path: "/admin/notices" },
    { id: "analytics", name: "Analytics", icon: ChartBarIcon, path: "/admin/analytics" },
    { id: "Gallery", name: "Gallery", icon: DocumentTextIcon, path: "/admin/gallery" },
    { id: "team", name: "Team", icon: UsersIcon, path: "/admin/teams" },
  ]

  const stats = [
    { name: "Total Users", value: "2,847", change: "+12%", changeType: "positive" },
    { name: "Active Businesses", value: "156", change: "+8%", changeType: "positive" },
    { name: "Products Listed", value: "1,234", change: "+23%", changeType: "positive" },
    { name: "Monthly Revenue", value: "$45,678", change: "-2%", changeType: "negative" },
  ]

  const recentActivity = [
    { id: 1, action: "New business registered", user: "ABC Electronics", time: "2 hours ago" },
    { id: 2, action: "Product added", user: "Fashion Store", time: "4 hours ago" },
    { id: 3, action: "User account created", user: "john.doe@email.com", time: "6 hours ago" },
    { id: 4, action: "Service booking", user: "Tech Solutions", time: "8 hours ago" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center space-x-3">
            <img
              src="https://res.cloudinary.com/dcsgax3ld/image/upload/v1755759270/299574930_451468846995643_7716478953910668088_n_vndizu.jpg"
              alt="Constellation"
              className="h-8 w-8 rounded-full"
            />
            <span className="text-lg font-semibold text-gray-900">Admin Panel</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Scrollable Navigation */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <nav className="flex-1 overflow-y-auto px-3 py-6">
            <div className="space-y-1">
              {sidebarItems.map((item) => {
                const Icon = item.icon
                const isActive = currentSection === item.id
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => navigate(item.path)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                      isActive
                        ? "bg-purple-100 text-purple-700 border-r-2 border-purple-700"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                    {item.name}
                  </motion.button>
                )
              })}
            </div>
          </nav>

          {/* Bottom Admin Section - Fixed at bottom */}
          <div className="flex-shrink-0 p-4 border-t border-gray-200 bg-white">
            <div className="flex items-center space-x-3 mb-3">
              <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-medium text-purple-700">{admin?.name.charAt(0).toUpperCase()}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{admin?.name}</p>
                <p className="text-xs text-gray-500 truncate">{admin?.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
            >
              <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5 flex-shrink-0" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Top Bar */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
              >
                <Bars3Icon className="h-6 w-6" />
              </button>
              <h1 className="text-xl font-semibold text-gray-900 capitalize">
                {currentSection === "overview" ? "Dashboard Overview" : currentSection}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                <BellIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-6">
          {children || (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                      </div>
                      <div
                        className={`text-sm font-medium ${
                          stat.changeType === "positive" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {stat.change}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => navigate("/admin/users")}
                      className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                    >
                      <UsersIcon className="h-8 w-8 text-blue-600 mb-2" />
                      <span className="text-sm font-medium text-blue-900">Manage Users</span>
                    </button>
                    <button
                      onClick={() => navigate("/admin/businesses")}
                      className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200"
                    >
                      <BuildingOfficeIcon className="h-8 w-8 text-green-600 mb-2" />
                      <span className="text-sm font-medium text-green-900">Add Business</span>
                    </button>
                    <button
                      onClick={() => navigate("/admin/products")}
                      className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-200"
                    >
                      <ShoppingBagIcon className="h-8 w-8 text-purple-600 mb-2" />
                      <span className="text-sm font-medium text-purple-900">Add Product</span>
                    </button>
                    <button
                      onClick={() => navigate("/admin/shareholders")}
                      className="flex flex-col items-center p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors duration-200"
                    >
                      <UserGroupIcon className="h-8 w-8 text-indigo-600 mb-2" />
                      <span className="text-sm font-medium text-indigo-900">Shareholders</span>
                    </button>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-3">
                        <div className="h-2 w-2 bg-purple-600 rounded-full mt-2"></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900">{activity.action}</p>
                          <p className="text-xs text-gray-500">
                            {activity.user} • {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}

export default AdminDashboard
