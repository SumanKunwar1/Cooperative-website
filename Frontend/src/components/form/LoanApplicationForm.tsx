"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { User, MapPin, Upload, CreditCard, Building2, CheckCircle, ArrowLeft, DollarSign } from "lucide-react"
import Button from "../ui/Button"
import Card from "../ui/Card"
import { useTranslation } from "react-i18next"

interface LoanApplicationFormProps {
  onBack: () => void
  selectedLoanType?: string
}

const LoanApplicationForm: React.FC<LoanApplicationFormProps> = ({ onBack, selectedLoanType }) => {
  const { t } = useTranslation()

  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",

    // Contact Information
    email: "",
    primaryPhone: "",
    permanentAddress: "",

    // Identification
    citizenshipNo: "",

    // Employment Information
    occupation: "",
    monthlyIncome: "",

    // Loan Information
    loanType: selectedLoanType || "",
    loanAmount: "",
    loanPurpose: "",
    loanTerm: "",
  })

  const [uploadedFiles, setUploadedFiles] = useState({
    profilePhoto: null as File | null,
    citizenshipFront: null as File | null,
    citizenshipBack: null as File | null,
    incomeProof: null as File | null,
  })

  const [currentStep, setCurrentStep] = useState(1)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const loanTypes = [
    t("personal-loan"),
    t("business-loan"),
    t("education-loan"),
    t("household-loan"),
    t("emergency-loan"),
    t("loan-against-fd"),
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleFileUpload = (field: string, file: File) => {
    setUploadedFiles((prev) => ({ ...prev, [field]: file }))
  }

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {}

    if (step === 1) {
      if (!formData.firstName) newErrors.firstName = t("first-name-required")
      if (!formData.lastName) newErrors.lastName = t("last-name-required")
      if (!formData.dateOfBirth) newErrors.dateOfBirth = t("date-of-birth-required")
      if (!formData.gender) newErrors.gender = t("gender-required")
    }

    if (step === 2) {
      if (!formData.email) newErrors.email = t("email-required")
      if (!formData.primaryPhone) newErrors.primaryPhone = t("primary-phone-required")
      if (!formData.permanentAddress) newErrors.permanentAddress = t("permanent-address-required")
    }

    if (step === 3) {
      if (!formData.citizenshipNo) newErrors.citizenshipNo = t("citizenship-required")
    }

    if (step === 4) {
      if (!formData.occupation) newErrors.occupation = t("occupation-required")
      if (!formData.monthlyIncome) newErrors.monthlyIncome = t("monthly-income-required")
    }

    if (step === 5) {
      if (!formData.loanType) newErrors.loanType = t("loan-type-required")
      if (!formData.loanAmount) newErrors.loanAmount = t("loan-amount-required")
      if (!formData.loanPurpose) newErrors.loanPurpose = t("loan-purpose-required")
      if (!formData.loanTerm) newErrors.loanTerm = t("loan-term-required")
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 6))
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      alert("Loan application submitted successfully! We will contact you within 2-3 business days for verification.")
      onBack()
    } catch (error) {
      console.error("Error submitting loan application:", error)
      alert(`Error submitting application: ${error instanceof Error ? error.message : "Unknown error"}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const FileUploadField = ({
    label,
    field,
    required = false,
    accept = "image/*,.pdf",
  }: {
    label: string
    field: string
    required?: boolean
    accept?: string
  }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-green-400 transition-colors">
        <input
          type="file"
          accept={accept}
          onChange={(e) => e.target.files?.[0] && handleFileUpload(field, e.target.files[0])}
          className="hidden"
          id={field}
        />
        <label htmlFor={field} className="cursor-pointer">
          {uploadedFiles[field as keyof typeof uploadedFiles] ? (
            <div className="flex items-center justify-center text-green-600">
              <CheckCircle className="w-5 h-5 mr-2" />
              <span className="text-sm">{(uploadedFiles[field as keyof typeof uploadedFiles] as File)?.name}</span>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <Upload className="w-8 h-8 text-gray-400 mb-2" />
              <span className="text-sm text-gray-600">
                {t("click-to-upload")} {label.toLowerCase()}
              </span>
              <span className="text-xs text-gray-400 mt-1">{t("file-format")}</span>
            </div>
          )}
        </label>
      </div>
    </div>
  )

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center">
              <User className="w-6 h-6 mr-2 text-green-600" />
              {t("personal-information")}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("first-name")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder={t("enter-first-name")}
                />
                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("last-name")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder={t("enter-last-name")}
                />
                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("date-of-birth")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                {errors.dateOfBirth && <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("gender")} <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">{t("select-gender")}</option>
                  <option value="Male">{t("male")}</option>
                  <option value="Female">{t("female")}</option>
                  <option value="Other">{t("other")}</option>
                </select>
                {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center">
              <MapPin className="w-6 h-6 mr-2 text-green-600" />
              {t("contact-information")}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("email-address")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder={t("enter-email")}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("primary-phone")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.primaryPhone}
                  onChange={(e) => handleInputChange("primaryPhone", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder={t("enter-primary-phone")}
                />
                {errors.primaryPhone && <p className="text-red-500 text-xs mt-1">{errors.primaryPhone}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("permanent-address")} <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.permanentAddress}
                onChange={(e) => handleInputChange("permanentAddress", e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder={t("enter-permanent-address")}
              />
              {errors.permanentAddress && <p className="text-red-500 text-xs mt-1">{errors.permanentAddress}</p>}
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center">
              <CreditCard className="w-6 h-6 mr-2 text-green-600" />
              {t("identification-documents")}
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("citizenship-number")} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.citizenshipNo}
                onChange={(e) => handleInputChange("citizenshipNo", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder={t("enter-citizenship")}
              />
              {errors.citizenshipNo && <p className="text-red-500 text-xs mt-1">{errors.citizenshipNo}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FileUploadField label={t("picture")} field="profilePhoto" required />
              <FileUploadField label={t("citizenship-front")} field="citizenshipFront" required />
              <FileUploadField label={t("citizenship-back")} field="citizenshipBack" required />
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center">
              <Building2 className="w-6 h-6 mr-2 text-green-600" />
              {t("employment-information")}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("occupation")} <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.occupation}
                  onChange={(e) => handleInputChange("occupation", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">{t("select-occupation")}</option>
                  <option value="Government Employee">{t("government-employee")}</option>
                  <option value="Private Employee">{t("private-employee")}</option>
                  <option value="Business Owner">{t("business-owner")}</option>
                  <option value="Self Employed">{t("self-employed")}</option>
                  <option value="Professional">Professional</option>
                  <option value="Other">{t("other")}</option>
                </select>
                {errors.occupation && <p className="text-red-500 text-xs mt-1">{errors.occupation}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("monthly-income")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.monthlyIncome}
                  onChange={(e) => handleInputChange("monthlyIncome", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder={t("enter-monthly-income")}
                />
                {errors.monthlyIncome && <p className="text-red-500 text-xs mt-1">{errors.monthlyIncome}</p>}
              </div>
            </div>

            <FileUploadField label={t("income-proof")} field="incomeProof" required />
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center">
              <DollarSign className="w-6 h-6 mr-2 text-green-600" />
              {t("loan-information")}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("loan-type")} <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.loanType}
                  onChange={(e) => handleInputChange("loanType", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">{t("select-loan-type")}</option>
                  {loanTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {errors.loanType && <p className="text-red-500 text-xs mt-1">{errors.loanType}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("loan-amount")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.loanAmount}
                  onChange={(e) => handleInputChange("loanAmount", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder={t("enter-loan-amount")}
                />
                {errors.loanAmount && <p className="text-red-500 text-xs mt-1">{errors.loanAmount}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("loan-purpose")} <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.loanPurpose}
                onChange={(e) => handleInputChange("loanPurpose", e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder={t("describe-loan-purpose")}
              />
              {errors.loanPurpose && <p className="text-red-500 text-xs mt-1">{errors.loanPurpose}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("loan-term")} <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.loanTerm}
                onChange={(e) => handleInputChange("loanTerm", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">{t("select-loan-term")}</option>
                <option value="1 Month">{t("1-month")}</option>
                <option value="3 Months">{t("3-months")}</option>
                <option value="6 Months">{t("6-months")}</option>
                <option value="1 Year">{t("1-year")}</option>
                <option value="2 Years">2 Years</option>
                <option value="3 Years">3 Years</option>
              </select>
              {errors.loanTerm && <p className="text-red-500 text-xs mt-1">{errors.loanTerm}</p>}
            </div>
          </div>
        )

      case 6:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center">
              <CheckCircle className="w-6 h-6 mr-2 text-green-600" />
              {t("review-submit")}
            </h3>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h4 className="font-semibold text-green-900 mb-4">{t("loan-application-summary")}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">{t("name")}:</span>
                  <span className="ml-2">
                    {formData.firstName} {formData.lastName}
                  </span>
                </div>
                <div>
                  <span className="font-medium">{t("email")}:</span>
                  <span className="ml-2">{formData.email}</span>
                </div>
                <div>
                  <span className="font-medium">{t("phone")}:</span>
                  <span className="ml-2">{formData.primaryPhone}</span>
                </div>
                <div>
                  <span className="font-medium">{t("loan-type")}:</span>
                  <span className="ml-2">{formData.loanType}</span>
                </div>
                <div>
                  <span className="font-medium">{t("loan-amount")}:</span>
                  <span className="ml-2">NPR {formData.loanAmount}</span>
                </div>
                <div>
                  <span className="font-medium">{t("loan-term")}:</span>
                  <span className="ml-2">{formData.loanTerm}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input type="checkbox" id="loanTerms" className="rounded" />
              <label htmlFor="loanTerms" className="text-sm text-gray-700">
                {t("agree-loan-terms")}
              </label>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const steps = [
    t("personal-information"),
    t("contact-information"),
    t("identification-documents"),
    t("employment-information"),
    t("loan-information"),
    t("review-submit"),
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button onClick={onBack} className="flex items-center text-green-600 hover:text-green-700 mb-4">
            <ArrowLeft className="w-5 h-5 mr-2" />
            {t("back-to-services")}
          </button>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t("loan-application")}</h1>
          <p className="text-gray-600">{t("complete-form-loan")}</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    index + 1 <= currentStep ? "bg-green-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {index + 1}
                </div>
                <span className="ml-2 text-xs text-gray-600 hidden sm:block">{step}</span>
                {index < steps.length - 1 && (
                  <div className={`w-8 h-0.5 mx-2 ${index + 1 < currentStep ? "bg-green-600" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <Card className="mb-8">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStep()}
          </motion.div>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center bg-transparent"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t("previous")}
          </Button>

          {currentStep < 6 ? (
            <Button onClick={nextStep} className="flex items-center">
              {t("next")}
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center bg-green-600 hover:bg-green-700"
            >
              {isSubmitting ? t("submitting") : t("submit-application")}
              <CheckCircle className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default LoanApplicationForm
