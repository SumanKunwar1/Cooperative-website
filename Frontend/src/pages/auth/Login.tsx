"use client"

import type React from "react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Eye, EyeOff, Lock, Mail, ArrowRight, User, Building } from "lucide-react"
import SEO from "../../components/common/SEO"
import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"
import { useAuth } from "../../contexts/AuthContext"

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
    userType: "individual" as "individual" | "business",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
    // Clear error when user starts typing
    if (error) setError("")
  }

  const handleUserTypeChange = (type: "individual" | "business") => {
    setFormData((prev) => ({
      ...prev,
      userType: type,
    }))
    if (error) setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Simple validation
      if (!formData.email || !formData.password) {
        setError("Please fill in all fields")
        return
      }

      // Simulate login process
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockUser = {
        id: Date.now().toString(),
        name: formData.email.split("@")[0],
        email: formData.email,
        phone: "+977-9800000000",
        membershipType: formData.userType,
        joinedDate: new Date().toISOString(),
      }

      // Login successful
      login(mockUser)

      if (formData.userType === "business") {
        navigate(`/business-dashboard/${encodeURIComponent(mockUser.email)}`)
      } else {
        navigate(`/dashboard/${encodeURIComponent(mockUser.email)}`)
      }
    } catch (error) {
      setError("Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <SEO
        title="Member Login - Constellation Saving and Credit Cooperative Ltd."
        description="Access your Constellation account securely. Login to manage your savings, loans, and digital banking services."
      />

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center mb-4">
            <span className="text-white font-bold text-2xl">C</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="mt-2 text-gray-600">Sign in to your Constellation account</p>
        </motion.div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">{error}</div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Login as</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleUserTypeChange("individual")}
                    className={`flex items-center justify-center px-4 py-3 border rounded-lg transition-all ${
                      formData.userType === "individual"
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <User className="w-5 h-5 mr-2" />
                    Individual
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUserTypeChange("business")}
                    className={`flex items-center justify-center px-4 py-3 border rounded-lg transition-all ${
                      formData.userType === "business"
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <Building className="w-5 h-5 mr-2" />
                    Business
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="mt-1 relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your email"
                  />
                  <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                </div>
                <p className="mt-1 text-xs text-gray-500">Use any email address (demo mode)</p>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="appearance-none block w-full px-3 py-2 pl-10 pr-10 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your password"
                  />
                  <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 text-gray-400" />
                    ) : (
                      <Eye className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                </div>
                <p className="mt-1 text-xs text-gray-500">Use any password (demo mode)</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>

                <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-500">
                  Forgot your password?
                </Link>
              </div>

              <Button type="submit" fullWidth size="lg" disabled={isLoading} icon={ArrowRight} iconPosition="right">
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">New to Constellation?</span>
                </div>
              </div>

              <div className="mt-6">
                <Link to="/register">
                  <Button fullWidth variant="outline" size="lg">
                    Create Account
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
      >
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4 text-center">Access Your Financial Dashboard</h3>
          <div className="space-y-3">
            {[
              "Check account balances and transactions",
              "Apply for loans and track applications",
              "Manage investments and insurance",
              "Access business directory and e-commerce",
            ].map((feature, index) => (
              <div key={index} className="flex items-center text-sm text-blue-800">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                {feature}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Login
