"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Eye, EyeOff, Lock, Mail, User, Phone, ArrowRight } from "lucide-react"
import SEO from "../../components/common/SEO"
import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"
import { useAuth } from "../../contexts/AuthContext"
import { useTranslation } from "react-i18next"

const Register: React.FC = () => {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    businessName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    membershipType: "individual",
    agreeToTerms: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const { login } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    // Check for pending cart item and redirect URL
    const redirectAfterLogin = localStorage.getItem("redirectAfterLogin")
    const pendingCartItem = localStorage.getItem("pendingCartItem")

    if (redirectAfterLogin || pendingCartItem) {
      // Store these for after successful registration
      console.log("Pending redirect:", redirectAfterLogin)
      console.log("Pending cart item:", pendingCartItem)
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
    // Clear error when user starts typing
    if (error) setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validation
    if (
      !formData.businessName ||
      !formData.email ||
      !formData.phone ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError(t("please-fill-all-fields"))
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError(t("passwords-do-not-match"))
      return
    }

    if (formData.password.length < 6) {
      setError(t("password-min-length"))
      return
    }

    if (!formData.agreeToTerms) {
      setError(t("agree-to-terms-required"))
      return
    }

    setIsLoading(true)

    try {
      // API call to register endpoint
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          businessName: formData.businessName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          membershipType: formData.membershipType,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || t("registration-failed"))
      }

      // Log the user in with the response data
      login({
        id: data.user.id,
        businessName: data.user.businessName,
        email: data.user.email,
        phone: data.user.phone,
        membershipType: data.user.membershipType,
        joinedDate: data.user.joinedDate,
      })

      // Store the token in localStorage
      localStorage.setItem("token", data.token)

      const redirectAfterLogin = localStorage.getItem("redirectAfterLogin")
      const pendingCartItem = localStorage.getItem("pendingCartItem")

      if (pendingCartItem) {
        try {
          const cartItemData = JSON.parse(pendingCartItem)
          // Dispatch event to add the pending cart item
          window.dispatchEvent(new CustomEvent("cartItemAdded", { detail: cartItemData }))
          localStorage.removeItem("pendingCartItem")
        } catch (error) {
          console.error("Error processing pending cart item:", error)
        }
      }

      if (redirectAfterLogin) {
        localStorage.removeItem("redirectAfterLogin")
        navigate(redirectAfterLogin)
        return
      }

      // Default redirect based on membership type
      const encodedName = encodeURIComponent(data.user.businessName.replace(/\s+/g, "-").toLowerCase())
      if (formData.membershipType === "business") {
        navigate(`/business-dashboard/${encodedName}`)
      } else {
        navigate(`/dashboard/${encodedName}`)
      }
    } catch (error: any) {
      setError(error.message || t("registration-failed"))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <SEO
        title={`${t("register")} - Constellation Saving and Credit Cooperative Ltd.`}
        description={t("register-subtitle")}
      />

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center mb-4">
            <span className="text-white font-bold text-2xl">C</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">{t("join-constellation")}</h2>
          <p className="mt-2 text-gray-600">{t("register-subtitle")}</p>
        </motion.div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">{error}</div>
              )}

              {/* Membership Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t("membership-type")}</label>
                <div className="grid grid-cols-2 gap-4">
                  <label className="relative">
                    <input
                      type="radio"
                      name="membershipType"
                      value="individual"
                      checked={formData.membershipType === "individual"}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div
                      className={`border-2 rounded-lg p-4 cursor-pointer text-center transition-colors ${
                        formData.membershipType === "individual"
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <User className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                      <span className="text-sm font-medium">{t("individual")}</span>
                    </div>
                  </label>
                  <label className="relative">
                    <input
                      type="radio"
                      name="membershipType"
                      value="business"
                      checked={formData.membershipType === "business"}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div
                      className={`border-2 rounded-lg p-4 cursor-pointer text-center transition-colors ${
                        formData.membershipType === "business"
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <User className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                      <span className="text-sm font-medium">{t("business")}</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Name Field */}
              <div>
                <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">
                  {t("full-name")}
                </label>
                <div className="mt-1 relative">
                  <input
                    id="businessName"
                    name="businessName"
                    type="text"
                    required
                    value={formData.businessName}
                    onChange={handleInputChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder={t("enter-full-name")}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  {t("email-address")}
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
                    placeholder={t("enter-email")}
                  />
                  <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  {t("phone-number")}
                </label>
                <div className="mt-1 relative">
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder={t("enter-phone")}
                  />
                  <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  {t("password")}
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="appearance-none block w-full px-3 py-2 pl-10 pr-10 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder={t("create-strong-password")}
                    minLength={6}
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
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  {t("confirm-password")}
                </label>
                <div className="mt-1 relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="appearance-none block w-full px-3 py-2 pl-10 pr-10 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder={t("confirm-your-password")}
                  />
                  <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5 text-gray-400" />
                    ) : (
                      <Eye className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              {/* Terms Agreement */}
              <div className="flex items-center">
                <input
                  id="agreeToTerms"
                  name="agreeToTerms"
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-700">
                  {t("agree-to-terms")}{" "}
                  <Link to="/terms" className="text-blue-600 hover:text-blue-500">
                    {t("terms-of-service")}
                  </Link>{" "}
                  {t("and")}{" "}
                  <Link to="/privacy" className="text-blue-600 hover:text-blue-500">
                    {t("privacy-policy")}
                  </Link>
                </label>
              </div>

              <Button type="submit" fullWidth size="lg" disabled={isLoading} icon={ArrowRight} iconPosition="right">
                {isLoading ? t("creating-account") : t("create-account")}
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">{t("already-have-account")}</span>
                </div>
              </div>

              <div className="mt-6">
                <Link to="/login">
                  <Button fullWidth variant="outline" size="lg">
                    {t("sign-in")}
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default Register