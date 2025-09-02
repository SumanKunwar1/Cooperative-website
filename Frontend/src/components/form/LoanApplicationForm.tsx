"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { User, MapPin, Upload, CreditCard, Building2, CheckCircle, ArrowLeft, DollarSign } from "lucide-react"
import Button from "../ui/Button"
import Card from "../ui/Card"
import { loanApplicationService, type LoanApplicationData } from "../../services/loanApplicationService"

interface LoanApplicationFormProps {
  onBack: () => void
  selectedLoanType?: string
}

const LoanApplicationForm: React.FC<LoanApplicationFormProps> = ({ onBack, selectedLoanType }) => {
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
    "Personal Loan",
    "Business Loan",
    "Education Loan",
    "Household Loan",
    "Emergency Loan",
    "Loan Against FD/Share",
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
      if (!formData.firstName) newErrors.firstName = "First name is required"
      if (!formData.lastName) newErrors.lastName = "Last name is required"
      if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required"
      if (!formData.gender) newErrors.gender = "Gender is required"
    }

    if (step === 2) {
      if (!formData.email) newErrors.email = "Email is required"
      if (!formData.primaryPhone) newErrors.primaryPhone = "Primary phone is required"
      if (!formData.permanentAddress) newErrors.permanentAddress = "Permanent address is required"
    }

    if (step === 3) {
      if (!formData.citizenshipNo) newErrors.citizenshipNo = "Citizenship number is required"
    }

    if (step === 4) {
      if (!formData.occupation) newErrors.occupation = "Occupation is required"
      if (!formData.monthlyIncome) newErrors.monthlyIncome = "Monthly income is required"
    }

    if (step === 5) {
      if (!formData.loanType) newErrors.loanType = "Loan type is required"
      if (!formData.loanAmount) newErrors.loanAmount = "Loan amount is required"
      if (!formData.loanPurpose) newErrors.loanPurpose = "Loan purpose is required"
      if (!formData.loanTerm) newErrors.loanTerm = "Loan term is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 6)) // Reduced to 6 steps
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return

    setIsSubmitting(true)

    try {
      // Prepare the data for submission
      const applicationData: LoanApplicationData = {
        ...formData,
        profilePhoto: uploadedFiles.profilePhoto || undefined,
        citizenshipFront: uploadedFiles.citizenshipFront || undefined,
        citizenshipBack: uploadedFiles.citizenshipBack || undefined,
        incomeProof: uploadedFiles.incomeProof || undefined,
      }

      const response = await loanApplicationService.submitApplication(applicationData)

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
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
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
              <span className="text-sm text-gray-600">Click to upload {label.toLowerCase()}</span>
              <span className="text-xs text-gray-400 mt-1">PDF, JPG, PNG (Max 5MB)</span>
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
              <User className="w-6 h-6 mr-2 text-blue-600" />
              Personal Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter first name"
                />
                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter last name"
                />
                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.dateOfBirth && <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
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
              <MapPin className="w-6 h-6 mr-2 text-blue-600" />
              Contact Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter email address"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Primary Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.primaryPhone}
                  onChange={(e) => handleInputChange("primaryPhone", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter primary phone"
                />
                {errors.primaryPhone && <p className="text-red-500 text-xs mt-1">{errors.primaryPhone}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Permanent Address <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.permanentAddress}
                onChange={(e) => handleInputChange("permanentAddress", e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter permanent address"
              />
              {errors.permanentAddress && <p className="text-red-500 text-xs mt-1">{errors.permanentAddress}</p>}
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center">
              <CreditCard className="w-6 h-6 mr-2 text-blue-600" />
              Identification
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Citizenship Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.citizenshipNo}
                onChange={(e) => handleInputChange("citizenshipNo", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter citizenship number"
              />
              {errors.citizenshipNo && <p className="text-red-500 text-xs mt-1">{errors.citizenshipNo}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FileUploadField label="Profile Photo" field="profilePhoto" required />
              <FileUploadField label="Citizenship Front" field="citizenshipFront" required />
              <FileUploadField label="Citizenship Back" field="citizenshipBack" required />
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center">
              <Building2 className="w-6 h-6 mr-2 text-blue-600" />
              Employment Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Occupation <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.occupation}
                  onChange={(e) => handleInputChange("occupation", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Occupation</option>
                  <option value="Government Employee">Government Employee</option>
                  <option value="Private Employee">Private Employee</option>
                  <option value="Business Owner">Business Owner</option>
                  <option value="Self Employed">Self Employed</option>
                  <option value="Professional">Professional</option>
                  <option value="Other">Other</option>
                </select>
                {errors.occupation && <p className="text-red-500 text-xs mt-1">{errors.occupation}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Monthly Income (NPR) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.monthlyIncome}
                  onChange={(e) => handleInputChange("monthlyIncome", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter monthly income"
                />
                {errors.monthlyIncome && <p className="text-red-500 text-xs mt-1">{errors.monthlyIncome}</p>}
              </div>
            </div>

            <FileUploadField label="Income Proof" field="incomeProof" required />
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center">
              <DollarSign className="w-6 h-6 mr-2 text-blue-600" />
              Loan Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Loan Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.loanType}
                  onChange={(e) => handleInputChange("loanType", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Loan Type</option>
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
                  Loan Amount (NPR) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.loanAmount}
                  onChange={(e) => handleInputChange("loanAmount", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter loan amount"
                />
                {errors.loanAmount && <p className="text-red-500 text-xs mt-1">{errors.loanAmount}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Loan Purpose <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.loanPurpose}
                onChange={(e) => handleInputChange("loanPurpose", e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe the purpose of the loan"
              />
              {errors.loanPurpose && <p className="text-red-500 text-xs mt-1">{errors.loanPurpose}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Loan Term <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.loanTerm}
                onChange={(e) => handleInputChange("loanTerm", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Loan Term</option>
                <option value="1 Month">1 Month</option>
                <option value="3 Months">3 Months</option>
                <option value="6 Months">6 Months</option>
                <option value="1 Year">1 Year</option>
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
              Review & Submit
            </h3>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="font-semibold text-blue-900 mb-4">Loan Application Summary</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Name:</span>
                  <span className="ml-2">
                    {formData.firstName} {formData.lastName}
                  </span>
                </div>
                <div>
                  <span className="font-medium">Email:</span>
                  <span className="ml-2">{formData.email}</span>
                </div>
                <div>
                  <span className="font-medium">Phone:</span>
                  <span className="ml-2">{formData.primaryPhone}</span>
                </div>
                <div>
                  <span className="font-medium">Loan Type:</span>
                  <span className="ml-2">{formData.loanType}</span>
                </div>
                <div>
                  <span className="font-medium">Loan Amount:</span>
                  <span className="ml-2">NPR {formData.loanAmount}</span>
                </div>
                <div>
                  <span className="font-medium">Loan Term:</span>
                  <span className="ml-2">{formData.loanTerm}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input type="checkbox" id="loanTerms" className="rounded" />
              <label htmlFor="loanTerms" className="text-sm text-gray-700">
                I agree to the loan terms and conditions and confirm that all information provided is accurate
              </label>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const steps = ["Personal Info", "Contact Info", "Documents", "Employment", "Loan Details", "Review & Submit"]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button onClick={onBack} className="flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Services
          </button>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">Loan Application</h1>
          <p className="text-gray-600">Complete the form below to apply for your loan</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    index + 1 <= currentStep ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {index + 1}
                </div>
                <span className="ml-2 text-xs text-gray-600 hidden sm:block">{step}</span>
                {index < steps.length - 1 && (
                  <div className={`w-8 h-0.5 mx-2 ${index + 1 < currentStep ? "bg-blue-600" : "bg-gray-200"}`} />
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
            Previous
          </Button>

          {currentStep < 6 ? (
            <Button onClick={nextStep} className="flex items-center">
              Next
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center bg-green-600 hover:bg-green-700"
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
              <CheckCircle className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default LoanApplicationForm
