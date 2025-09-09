"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { User, MapPin, Upload, CreditCard, Building2, Users, CheckCircle, AlertCircle, ArrowLeft } from "lucide-react"
import Button from "../ui/Button"
import Card from "../ui/Card"
import { useTranslation } from "react-i18next"
import { useApplications } from "../../contexts/ApplicationContext"
import { accountApplicationService, type AccountApplicationData } from "../../services/accountApplicationService"

interface AccountOpeningFormProps {
  onBack: () => void
  selectedScheme?: string
}

const AccountOpeningForm: React.FC<AccountOpeningFormProps> = ({ onBack, selectedScheme }) => {
  const { t } = useTranslation()

  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    maritalStatus: "",
    nationality: "Nepali",
    religion: "",

    // Contact Information
    email: "",
    primaryPhone: "",
    alternatePhone: "",
    permanentAddress: "",
    temporaryAddress: "",
    district: "",
    municipality: "",
    wardNo: "",

    // Identification
    citizenshipNo: "",
    passportNo: "",
    panNo: "",

    // Employment Information
    occupation: "",
    employerName: "",
    monthlyIncome: "",
    incomeSource: "",

    // Family Information
    fatherName: "",
    motherName: "",
    spouseName: "",

    // Emergency Contact
    emergencyContactName: "",
    emergencyContactPhone: "",
    emergencyContactRelation: "",

    // Account Details
    accountType: selectedScheme || "",
    initialDeposit: "",
    depositFrequency: "",

    // Nominee Information
    nomineeName: "",
    nomineeRelation: "",
    nomineePhone: "",
    nomineeAddress: "",

    // References
    reference1Name: "",
    reference1Phone: "",
    reference1Address: "",
    reference2Name: "",
    reference2Phone: "",
    reference2Address: "",
  })

  const [uploadedFiles, setUploadedFiles] = useState({
    profilePhoto: null as File | null,
    citizenshipFront: null as File | null,
    citizenshipBack: null as File | null,
    passport: null as File | null,
    panCard: null as File | null,
    incomeProof: null as File | null,
    bankStatement: null as File | null,
    nomineePhoto: null as File | null,
  })

  const [currentStep, setCurrentStep] = useState(1)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { addAccountApplication } = useApplications()

  const savingSchemes = [
    t("constellation-general-saving"),
    t("constellation-special-saving"),
    t("constellation-super-saving"),
    t("constellation-daily-saving"),
    t("constellation-shareholder-saving"),
    t("constellation-business-saving"),
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
      if (!formData.nationality) newErrors.nationality = "Nationality is required"
    }

    if (step === 2) {
      if (!formData.email) newErrors.email = t("email-required")
      if (!formData.primaryPhone) newErrors.primaryPhone = t("primary-phone-required")
      if (!formData.permanentAddress) newErrors.permanentAddress = t("permanent-address-required")
      if (!formData.district) newErrors.district = t("district-required")
    }

    if (step === 3) {
      if (!formData.citizenshipNo && !formData.passportNo) {
        newErrors.citizenshipNo = "Either citizenship or passport number is required"
      }
    }

    if (step === 4) {
      if (!formData.occupation) newErrors.occupation = t("occupation-required")
      if (!formData.monthlyIncome) newErrors.monthlyIncome = t("monthly-income-required")
    }

    if (step === 6) {
      if (!formData.accountType) newErrors.accountType = t("account-type-required")
      if (!formData.initialDeposit) newErrors.initialDeposit = t("initial-deposit-required")
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 8))
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault()
    }
    setIsSubmitting(true)

    try {
      // Prepare the data for submission
      const applicationData: AccountApplicationData = {
        ...formData,
        profilePhoto: uploadedFiles.profilePhoto || undefined,
        citizenshipFront: uploadedFiles.citizenshipFront || undefined,
        citizenshipBack: uploadedFiles.citizenshipBack || undefined,
        passport: uploadedFiles.passport || undefined,
        panCard: uploadedFiles.panCard || undefined,
        incomeProof: uploadedFiles.incomeProof || undefined,
        bankStatement: uploadedFiles.bankStatement || undefined,
        nomineePhoto: uploadedFiles.nomineePhoto || undefined,
      }

      const response = await accountApplicationService.submitApplication(applicationData)

      alert("Account opening application submitted successfully! We will contact you within 2-3 business days.")

      // Add to context for local state management
      addAccountApplication({
        ...response.application,
        id: response.application._id,
      })

      onBack()
    } catch (error) {
      console.error("Error submitting application:", error)
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
              <User className="w-6 h-6 mr-2 text-blue-600" />
              {t("personal-information")}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("first-name")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={t("enter-first-name")}
                />
                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("middle-name")}</label>
                <input
                  type="text"
                  value={formData.middleName}
                  onChange={(e) => handleInputChange("middleName", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={t("enter-middle-name")}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("last-name")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={t("enter-last-name")}
                />
                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("date-of-birth")} <span className="text-red-500">*</span>
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
                  {t("gender")} <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">{t("select-gender")}</option>
                  <option value="Male">{t("male")}</option>
                  <option value="Female">{t("female")}</option>
                  <option value="Other">{t("other")}</option>
                </select>
                {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("marital-status")}</label>
                <select
                  value={formData.maritalStatus}
                  onChange={(e) => handleInputChange("maritalStatus", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">{t("select-status")}</option>
                  <option value="Single">{t("single")}</option>
                  <option value="Married">{t("married")}</option>
                  <option value="Divorced">{t("divorced")}</option>
                  <option value="Widowed">{t("widowed")}</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("nationality")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.nationality}
                  onChange={(e) => handleInputChange("nationality", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={t("enter-nationality")}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("religion")}</label>
                <input
                  type="text"
                  value={formData.religion}
                  onChange={(e) => handleInputChange("religion", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={t("enter-religion")}
                />
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center">
              <MapPin className="w-6 h-6 mr-2 text-blue-600" />
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={t("enter-primary-phone")}
                />
                {errors.primaryPhone && <p className="text-red-500 text-xs mt-1">{errors.primaryPhone}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t("alternate-phone")}</label>
              <input
                type="tel"
                value={formData.alternatePhone}
                onChange={(e) => handleInputChange("alternatePhone", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={t("enter-alternate-phone")}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("permanent-address")} <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.permanentAddress}
                onChange={(e) => handleInputChange("permanentAddress", e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={t("enter-permanent-address")}
              />
              {errors.permanentAddress && <p className="text-red-500 text-xs mt-1">{errors.permanentAddress}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t("temporary-address")}</label>
              <textarea
                value={formData.temporaryAddress}
                onChange={(e) => handleInputChange("temporaryAddress", e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={t("enter-temporary-address")}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("district")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.district}
                  onChange={(e) => handleInputChange("district", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={t("enter-district")}
                />
                {errors.district && <p className="text-red-500 text-xs mt-1">{errors.district}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("municipality")}</label>
                <input
                  type="text"
                  value={formData.municipality}
                  onChange={(e) => handleInputChange("municipality", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={t("enter-municipality")}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("ward-no")}</label>
                <input
                  type="number"
                  value={formData.wardNo}
                  onChange={(e) => handleInputChange("wardNo", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={t("enter-ward")}
                />
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center">
              <CreditCard className="w-6 h-6 mr-2 text-blue-600" />
              {t("identification-documents")}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("citizenship-number")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.citizenshipNo}
                  onChange={(e) => handleInputChange("citizenshipNo", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={t("enter-citizenship")}
                />
                {errors.citizenshipNo && <p className="text-red-500 text-xs mt-1">{errors.citizenshipNo}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("passport-number")}</label>
                <input
                  type="text"
                  value={formData.passportNo}
                  onChange={(e) => handleInputChange("passportNo", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={t("enter-passport")}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t("pan-number")}</label>
              <input
                type="text"
                value={formData.panNo}
                onChange={(e) => handleInputChange("panNo", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={t("enter-pan")}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FileUploadField label={t("picture")} field="profilePhoto" required accept="image/*" />
              <FileUploadField label={t("citizenship-front")} field="citizenshipFront" required accept="image/*,.pdf" />
              <FileUploadField label={t("citizenship-back")} field="citizenshipBack" required accept="image/*,.pdf" />
              <FileUploadField label={t("passport")} field="passport" accept="image/*,.pdf" />
              <FileUploadField label={t("pan-card")} field="panCard" accept="image/*,.pdf" />
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center">
              <Building2 className="w-6 h-6 mr-2 text-blue-600" />
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">{t("select-occupation")}</option>
                  <option value="Government Employee">{t("government-employee")}</option>
                  <option value="Private Employee">{t("private-employee")}</option>
                  <option value="Business Owner">{t("business-owner")}</option>
                  <option value="Self Employed">{t("self-employed")}</option>
                  <option value="Student">{t("student")}</option>
                  <option value="Housewife">{t("housewife")}</option>
                  <option value="Retired">{t("retired")}</option>
                  <option value="Other">{t("other")}</option>
                </select>
                {errors.occupation && <p className="text-red-500 text-xs mt-1">{errors.occupation}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("employer-name")}</label>
                <input
                  type="text"
                  value={formData.employerName}
                  onChange={(e) => handleInputChange("employerName", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={t("enter-employer")}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("monthly-income")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.monthlyIncome}
                  onChange={(e) => handleInputChange("monthlyIncome", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={t("enter-monthly-income")}
                />
                {errors.monthlyIncome && <p className="text-red-500 text-xs mt-1">{errors.monthlyIncome}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("income-source")}</label>
                <select
                  value={formData.incomeSource}
                  onChange={(e) => handleInputChange("incomeSource", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">{t("select-income-source")}</option>
                  <option value="Salary">{t("salary")}</option>
                  <option value="Business">{t("business")}</option>
                  <option value="Investment">{t("investment")}</option>
                  <option value="Pension">{t("pension")}</option>
                  <option value="Other">{t("other")}</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FileUploadField label={t("income-proof")} field="incomeProof" accept="image/*,.pdf" />
              <FileUploadField label={t("bank-statement")} field="bankStatement" accept="image/*,.pdf" />
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center">
              <Users className="w-6 h-6 mr-2 text-blue-600" />
              {t("family-information")}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("fathers-name")}</label>
                <input
                  type="text"
                  value={formData.fatherName}
                  onChange={(e) => handleInputChange("fatherName", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={t("enter-fathers-name")}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("mothers-name")}</label>
                <input
                  type="text"
                  value={formData.motherName}
                  onChange={(e) => handleInputChange("motherName", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={t("enter-mothers-name")}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t("spouses-name")}</label>
              <input
                type="text"
                value={formData.spouseName}
                onChange={(e) => handleInputChange("spouseName", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={t("enter-spouses-name")}
              />
            </div>

            <div className="border-t pt-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4">{t("emergency-contact")}</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t("contact-name")}</label>
                  <input
                    type="text"
                    value={formData.emergencyContactName}
                    onChange={(e) => handleInputChange("emergencyContactName", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={t("enter-contact-name")}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t("contact-phone")}</label>
                  <input
                    type="tel"
                    value={formData.emergencyContactPhone}
                    onChange={(e) => handleInputChange("emergencyContactPhone", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={t("enter-contact-phone")}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t("relationship")}</label>
                  <select
                    value={formData.emergencyContactRelation}
                    onChange={(e) => handleInputChange("emergencyContactRelation", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">{t("select-relationship")}</option>
                    <option value="Father">{t("father")}</option>
                    <option value="Mother">{t("mother")}</option>
                    <option value="Spouse">{t("spouse")}</option>
                    <option value="Sibling">{t("sibling")}</option>
                    <option value="Friend">{t("friend")}</option>
                    <option value="Other">{t("other")}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )

      case 6:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center">
              <CreditCard className="w-6 h-6 mr-2 text-blue-600" />
              {t("account-details")}
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("account-type")} <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.accountType}
                onChange={(e) => handleInputChange("accountType", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">{t("select-account-type")}</option>
                {savingSchemes.map((scheme) => (
                  <option key={scheme} value={scheme}>
                    {scheme}
                  </option>
                ))}
              </select>
              {errors.accountType && <p className="text-red-500 text-xs mt-1">{errors.accountType}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("initial-deposit")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.initialDeposit}
                  onChange={(e) => handleInputChange("initialDeposit", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={t("enter-initial-deposit")}
                />
                {errors.initialDeposit && <p className="text-red-500 text-xs mt-1">{errors.initialDeposit}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("deposit-frequency")}</label>
                <select
                  value={formData.depositFrequency}
                  onChange={(e) => handleInputChange("depositFrequency", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">{t("select-frequency")}</option>
                  <option value="Daily">{t("daily")}</option>
                  <option value="Weekly">{t("weekly")}</option>
                  <option value="Monthly">{t("monthly")}</option>
                </select>
              </div>
            </div>
          </div>
        )

      case 7:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center">
              <Users className="w-6 h-6 mr-2 text-blue-600" />
              {t("nominee-references")}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("nominee-name")}</label>
                <input
                  type="text"
                  value={formData.nomineeName}
                  onChange={(e) => handleInputChange("nomineeName", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={t("enter-nominee-name")}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("relationship")}</label>
                <select
                  value={formData.nomineeRelation}
                  onChange={(e) => handleInputChange("nomineeRelation", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">{t("select-relationship")}</option>
                  <option value="Father">{t("father")}</option>
                  <option value="Mother">{t("mother")}</option>
                  <option value="Spouse">{t("spouse")}</option>
                  <option value="Son">{t("son")}</option>
                  <option value="Daughter">{t("daughter")}</option>
                  <option value="Sibling">{t("sibling")}</option>
                  <option value="Other">{t("other")}</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("nominee-phone")}</label>
                <input
                  type="tel"
                  value={formData.nomineePhone}
                  onChange={(e) => handleInputChange("nomineePhone", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={t("enter-nominee-phone")}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t("nominee-address")}</label>
              <textarea
                value={formData.nomineeAddress}
                onChange={(e) => handleInputChange("nomineeAddress", e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={t("enter-nominee-address")}
              />
            </div>

            <FileUploadField label={t("nominee-picture")} field="nomineePhoto" accept="image/*" />

            <div className="border-t pt-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4">{t("references")}</h4>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t("reference-1-name")}</label>
                    <input
                      type="text"
                      value={formData.reference1Name}
                      onChange={(e) => handleInputChange("reference1Name", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={t("enter-reference-name")}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t("reference-1-phone")}</label>
                    <input
                      type="tel"
                      value={formData.reference1Phone}
                      onChange={(e) => handleInputChange("reference1Phone", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={t("enter-reference-phone")}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t("reference-1-address")}</label>
                    <input
                      type="text"
                      value={formData.reference1Address}
                      onChange={(e) => handleInputChange("reference1Address", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={t("enter-reference-address")}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t("reference-2-name")}</label>
                    <input
                      type="text"
                      value={formData.reference2Name}
                      onChange={(e) => handleInputChange("reference2Name", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={t("enter-reference-name")}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t("reference-2-phone")}</label>
                    <input
                      type="tel"
                      value={formData.reference2Phone}
                      onChange={(e) => handleInputChange("reference2Phone", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={t("enter-reference-phone")}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t("reference-2-address")}</label>
                    <input
                      type="text"
                      value={formData.reference2Address}
                      onChange={(e) => handleInputChange("reference2Address", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={t("enter-reference-address")}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 8:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center">
              <CheckCircle className="w-6 h-6 mr-2 text-green-600" />
              {t("review-submit")}
            </h3>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="font-semibold text-blue-900 mb-4">{t("application-summary")}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">{t("name")}:</span>
                  <span className="ml-2">
                    {formData.firstName} {formData.middleName} {formData.lastName}
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
                  <span className="font-medium">{t("account-type")}:</span>
                  <span className="ml-2">{formData.accountType}</span>
                </div>
                <div>
                  <span className="font-medium">{t("initial-deposit")}:</span>
                  <span className="ml-2">NPR {formData.initialDeposit}</span>
                </div>
                <div>
                  <span className="font-medium">{t("occupation")}:</span>
                  <span className="ml-2">{formData.occupation}</span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5" />
                <div className="text-sm text-yellow-800">
                  <p className="font-medium mb-2">{t("important-notes")}</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>{t("ensure-accurate")}</li>
                    <li>{t("subject-to-verification")}</li>
                    <li>{t("contact-within-days")}</li>
                    <li>{t("bring-original-documents")}</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input type="checkbox" id="terms" className="rounded" />
              <label htmlFor="terms" className="text-sm text-gray-700">
                {t("agree-terms")}
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
    t("family-information"),
    t("account-details"),
    t("nominee-references"),
    t("review-submit"),
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button onClick={onBack} className="flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="w-5 h-5 mr-2" />
            {t("back-to-services")}
          </button>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t("account-opening-application")}</h1>
          <p className="text-gray-600">{t("complete-form-account")}</p>
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
            {t("previous")}
          </Button>

          {currentStep < 8 ? (
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

export default AccountOpeningForm
