"use client"

import type React from "react"
import { useState, useCallback, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  BuildingOfficeIcon,
  EyeIcon,
  XMarkIcon,
  CheckBadgeIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline"
import AdminDashboard from "./AdminDashboard"

interface Business {
  id: string
  _id: string
  name: string
  category: string
  subcategory: string
  description: string
  image: string
  rating: number
  reviews: number
  location: string
  phone: string
  email: string
  website?: string
  services: string[]
  isVerified: boolean
  owner: string
  address: string
  status: "active" | "inactive" | "pending"
  createdBy: string
  createdAt: string
  updatedAt: string
}

interface BusinessFormData {
  name: string
  category: string
  subcategory: string
  description: string
  image: string
  location: string
  phone: string
  email: string
  website: string
  services: string[]
  isVerified: boolean
  owner: string
  address: string
  status: "active" | "inactive" | "pending"
}

const categories = [
  "Technology",
  "Food & Beverage",
  "Hospitality",
  "Home Services",
  "Retail",
  "Healthcare",
  "Education",
  "Others",
]

const subcategories: { [key: string]: string[] } = {
  Technology: ["IT Services", "Software Development", "Hardware", "Telecommunications"],
  "Food & Beverage": ["Restaurant", "Cafe", "Fast Food", "Catering", "Bar"],
  Hospitality: ["Hotel", "Resort", "Guest House", "Travel Agency"],
  "Home Services": ["Electrical", "Plumbing", "Cleaning", "Maintenance"],
  Retail: ["Wholesale", "Shopping", "Grocery", "Fashion"],
  Healthcare: ["Medical", "Dental", "Pharmacy", "Clinic"],
  Education: ["School", "Training", "Tutoring", "Institute"],
  Others: ["General", "Miscellaneous"],
}

// Move BusinessForm component outside to prevent re-creation
interface BusinessFormProps {
  isEdit?: boolean
  formData: BusinessFormData
  formErrors: Partial<BusinessFormData>
  serviceInput: string
  onFormDataChange: (data: BusinessFormData | ((prev: BusinessFormData) => BusinessFormData)) => void
  onServiceInputChange: (value: string) => void
  onSubmit: () => void
  onCancel: () => void
  onAddService: () => void
  onRemoveService: (service: string) => void
  onImageChange: (file: File | null) => void
  isLoading: boolean
}

const BusinessForm: React.FC<BusinessFormProps> = ({
  isEdit = false,
  formData,
  formErrors,
  serviceInput,
  onFormDataChange,
  onServiceInputChange,
  onSubmit,
  onCancel,
  onAddService,
  onRemoveService,
  onImageChange,
  isLoading,
}) => {
  // Fixed: Remove formData from dependency array to prevent stale closure
  const handleInputChange = useCallback(
    (field: keyof BusinessFormData, value: any) => {
      onFormDataChange((prev: BusinessFormData) => ({ ...prev, [field]: value }))
    },
    [onFormDataChange],
  )

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{isEdit ? "Edit Business" : "Add New Business"}</h3>
        <button onClick={onCancel} className="text-gray-400 hover:text-gray-600" disabled={isLoading}>
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit()
        }}
        className="space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${formErrors.name ? "border-red-500" : "border-gray-300"}`}
              placeholder="Enter business name"
              disabled={isLoading}
            />
            {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Owner Name</label>
            <input
              type="text"
              value={formData.owner}
              onChange={(e) => handleInputChange("owner", e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${formErrors.owner ? "border-red-500" : "border-gray-300"}`}
              placeholder="Enter owner name"
              disabled={isLoading}
            />
            {formErrors.owner && <p className="text-red-500 text-xs mt-1">{formErrors.owner}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={formData.category}
              onChange={(e) => {
                handleInputChange("category", e.target.value)
                handleInputChange("subcategory", "")
              }}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${formErrors.category ? "border-red-500" : "border-gray-300"}`}
              disabled={isLoading}
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {formErrors.category && <p className="text-red-500 text-xs mt-1">{formErrors.category}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subcategory</label>
            <select
              value={formData.subcategory}
              onChange={(e) => handleInputChange("subcategory", e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${formErrors.subcategory ? "border-red-500" : "border-gray-300"}`}
              disabled={!formData.category || isLoading}
            >
              <option value="">Select subcategory</option>
              {formData.category &&
                subcategories[formData.category]?.map((subcat) => (
                  <option key={subcat} value={subcat}>
                    {subcat}
                  </option>
                ))}
            </select>
            {formErrors.subcategory && <p className="text-red-500 text-xs mt-1">{formErrors.subcategory}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${formErrors.description ? "border-red-500" : "border-gray-300"}`}
            placeholder="Enter business description"
            rows={3}
            disabled={isLoading}
          />
          {formErrors.description && <p className="text-red-500 text-xs mt-1">{formErrors.description}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${formErrors.email ? "border-red-500" : "border-gray-300"}`}
              placeholder="Enter email address"
              disabled={isLoading}
            />
            {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${formErrors.phone ? "border-red-500" : "border-gray-300"}`}
              placeholder="Enter phone number"
              disabled={isLoading}
            />
            {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${formErrors.location ? "border-red-500" : "border-gray-300"}`}
              placeholder="Enter location"
              disabled={isLoading}
            />
            {formErrors.location && <p className="text-red-500 text-xs mt-1">{formErrors.location}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Website (Optional)</label>
            <input
              type="url"
              value={formData.website}
              onChange={(e) => handleInputChange("website", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter website URL"
              disabled={isLoading}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Address</label>
          <textarea
            value={formData.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${formErrors.address ? "border-red-500" : "border-gray-300"}`}
            placeholder="Enter complete business address"
            rows={2}
            disabled={isLoading}
          />
          {formErrors.address && <p className="text-red-500 text-xs mt-1">{formErrors.address}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Business Image</label>
          <div className="space-y-2">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => onImageChange(e.target.files?.[0] || null)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              disabled={isLoading}
            />
            <div className="text-center text-sm text-gray-500">OR</div>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => handleInputChange("image", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter image URL"
              disabled={isLoading}
            />
          </div>
          {formData.image && (
            <div className="mt-2">
              <img
                src={formData.image || "/placeholder.svg"}
                alt="Preview"
                className="h-20 w-20 object-cover rounded-lg"
                onError={(e) => {
                  e.currentTarget.style.display = "none"
                }}
              />
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Services</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={serviceInput}
              onChange={(e) => onServiceInputChange(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter a service"
              disabled={isLoading}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  onAddService()
                }
              }}
            />
            <button
              type="button"
              onClick={onAddService}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
              disabled={isLoading}
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.services.map((service, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 bg-purple-100 text-purple-700 text-sm rounded-full"
              >
                {service}
                <button
                  type="button"
                  onClick={() => onRemoveService(service)}
                  className="ml-1 text-purple-500 hover:text-purple-700"
                  disabled={isLoading}
                >
                  <XMarkIcon className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isVerified}
                onChange={(e) => handleInputChange("isVerified", e.target.checked)}
                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                disabled={isLoading}
              />
              <span className="text-sm font-medium text-gray-700">Verified Business</span>
              <CheckBadgeIcon className="h-4 w-4 text-green-500" />
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={formData.status}
              onChange={(e) => handleInputChange("status", e.target.value as "active" | "inactive" | "pending")}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              disabled={isLoading}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>

        <div className="flex space-x-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {isEdit ? "Updating..." : "Adding..."}
              </>
            ) : isEdit ? (
              "Update Business"
            ) : (
              "Add Business"
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

const ModalBackground = ({ children, onClose }: { children: React.ReactNode; onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </motion.div>
  </motion.div>
)

const AdminBusinesses: React.FC = () => {
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [formData, setFormData] = useState<BusinessFormData>({
    name: "",
    category: "",
    subcategory: "",
    description: "",
    image: "",
    location: "",
    phone: "",
    email: "",
    website: "",
    services: [],
    isVerified: false,
    owner: "",
    address: "",
    status: "active",
  })
  const [formErrors, setFormErrors] = useState<Partial<BusinessFormData>>({})
  const [serviceInput, setServiceInput] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)

  // Fetch businesses from API
  const fetchBusinesses = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      const token = localStorage.getItem("token")

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/businesses`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch businesses: ${response.statusText}`)
      }

      const data = await response.json()
      // Extract the businesses array from the response data
      const businessesData = data.data || data.businesses || []
      setBusinesses(businessesData)
    } catch (err: any) {
      console.error("Error fetching businesses:", err)
      setError(err.message || "Failed to load businesses")
      setBusinesses([]) // Ensure businesses is always an array
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchBusinesses()
  }, [fetchBusinesses])

  const filteredBusinesses = businesses.filter((business) => {
    const matchesSearch =
      business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      business.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      business.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      business.subcategory.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || business.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const resetForm = useCallback(() => {
    setFormData({
      name: "",
      category: "",
      subcategory: "",
      description: "",
      image: "",
      location: "",
      phone: "",
      email: "",
      website: "",
      services: [],
      isVerified: false,
      owner: "",
      address: "",
      status: "active",
    })
    setFormErrors({})
    setServiceInput("")
    setImageFile(null)
  }, [])

  const validateForm = useCallback((): boolean => {
    const errors: Partial<BusinessFormData> = {}

    if (!formData.name.trim()) errors.name = "Business name is required"
    if (!formData.category) errors.category = "Category is required"
    if (!formData.subcategory) errors.subcategory = "Subcategory is required"
    if (!formData.description.trim()) errors.description = "Description is required"
    if (!formData.owner.trim()) errors.owner = "Owner name is required"
    if (!formData.email.trim()) {
      errors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid"
    }
    if (!formData.phone.trim()) errors.phone = "Phone is required"
    if (!formData.location.trim()) errors.location = "Location is required"
    if (!formData.address.trim()) errors.address = "Address is required"

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }, [formData])

  const handleAddBusiness = useCallback(async () => {
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      const token = localStorage.getItem("token")

      // Create FormData with individual fields
      const formDataToSend = new FormData()

      // Append all business data as individual fields
      formDataToSend.append("name", formData.name)
      formDataToSend.append("category", formData.category)
      formDataToSend.append("subcategory", formData.subcategory)
      formDataToSend.append("description", formData.description)
      formDataToSend.append("location", formData.location)
      formDataToSend.append("phone", formData.phone)
      formDataToSend.append("email", formData.email)
      formDataToSend.append("website", formData.website)
      formDataToSend.append("owner", formData.owner)
      formDataToSend.append("address", formData.address)
      formDataToSend.append("status", formData.status)
      formDataToSend.append("isVerified", formData.isVerified.toString())

      // Append services as JSON string
      formDataToSend.append("services", JSON.stringify(formData.services))

      // Append image file if exists
      if (imageFile) {
        formDataToSend.append("image", imageFile)
      } else if (formData.image && !formData.image.startsWith("blob:")) {
        // If it's a URL, append it as imageUrl
        formDataToSend.append("imageUrl", formData.image)
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/businesses`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to add business")
      }

      const result = await response.json()
      if (result.success) {
        await fetchBusinesses()
        resetForm()
        setShowViewModal(false)
        setError(null)
      } else {
        throw new Error(result.message || "Failed to add business")
      }
    } catch (error) {
      console.error("Error adding business:", error)
      setError(error instanceof Error ? error.message : "Something went wrong!")
    } finally {
      setIsSubmitting(false)
    }
  }, [formData, imageFile, validateForm, fetchBusinesses, resetForm])

  const handleEditBusiness = useCallback(async () => {
    if (!validateForm() || !selectedBusiness) return

    setIsSubmitting(true)
    try {
      const token = localStorage.getItem("token")

      // Create FormData with individual fields
      const formDataToSend = new FormData()

      // Append all business data as individual fields
      formDataToSend.append("name", formData.name)
      formDataToSend.append("category", formData.category)
      formDataToSend.append("subcategory", formData.subcategory)
      formDataToSend.append("description", formData.description)
      formDataToSend.append("location", formData.location)
      formDataToSend.append("phone", formData.phone)
      formDataToSend.append("email", formData.email)
      formDataToSend.append("website", formData.website)
      formDataToSend.append("owner", formData.owner)
      formDataToSend.append("address", formData.address)
      formDataToSend.append("status", formData.status)
      formDataToSend.append("isVerified", formData.isVerified.toString())

      // Append services as JSON string
      formDataToSend.append("services", JSON.stringify(formData.services))

      // Append image file if exists
      if (imageFile) {
        formDataToSend.append("image", imageFile)
      } else if (formData.image && !formData.image.startsWith("blob:")) {
        // If it's a URL, append it as imageUrl
        formDataToSend.append("imageUrl", formData.image)
      }

      const businessId = selectedBusiness._id || selectedBusiness.id
      console.log("[v0] Updating business with ID:", businessId)

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/businesses/${businessId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to update business")
      }

      const result = await response.json()
      if (result.success) {
        await fetchBusinesses()
        resetForm()
        setShowEditModal(false)
        setSelectedBusiness(null)
        setError(null)
      } else {
        throw new Error(result.message || "Failed to update business")
      }
    } catch (error) {
      console.error("Error updating business:", error)
      setError(error instanceof Error ? error.message : "Something went wrong!")
    } finally {
      setIsSubmitting(false)
    }
  }, [formData, imageFile, selectedBusiness, validateForm, fetchBusinesses, resetForm])

  const handleDeleteBusiness = useCallback(
    async (businessId: string) => {
      if (!window.confirm("Are you sure you want to delete this business?")) return

      try {
        const token = localStorage.getItem("token")
        const id = businessId || businesses.find((b) => b._id === businessId)?._id

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/businesses/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || "Failed to delete business")
        }

        await fetchBusinesses()
      } catch (error) {
        console.error("Error deleting business:", error)
        setError(error instanceof Error ? error.message : "Failed to delete business")
      }
    },
    [fetchBusinesses],
  )

  const openEditModal = useCallback((business: Business) => {
    setSelectedBusiness(business)
    setFormData({
      name: business.name,
      category: business.category,
      subcategory: business.subcategory,
      description: business.description,
      image: business.image,
      location: business.location,
      phone: business.phone,
      email: business.email,
      website: business.website || "",
      services: business.services,
      isVerified: business.isVerified,
      owner: business.owner,
      address: business.address,
      status: business.status,
    })
    setShowEditModal(true)
  }, [])

  const openViewModal = useCallback((business: Business) => {
    setSelectedBusiness(business)
    setShowViewModal(true)
  }, [])

  const addService = useCallback(() => {
    if (serviceInput.trim() && !formData.services.includes(serviceInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        services: [...prev.services, serviceInput.trim()],
      }))
      setServiceInput("")
    }
  }, [serviceInput, formData.services])

  const removeService = useCallback((serviceToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.filter((service) => service !== serviceToRemove),
    }))
  }, [])

  // Fixed: Use functional update pattern to avoid stale closure
  const handleFormDataChange = useCallback(
    (updater: BusinessFormData | ((prev: BusinessFormData) => BusinessFormData)) => {
      setFormData(updater)
    },
    [],
  )

  const handleCancelForm = useCallback(() => {
    setShowAddModal(false)
    setShowEditModal(false)
    setSelectedBusiness(null)
    resetForm()
  }, [resetForm])

  const handleImageChange = useCallback((file: File | null) => {
    setImageFile(file)
    if (file) {
      // Create a temporary URL for preview
      const objectUrl = URL.createObjectURL(file)
      setFormData((prev) => ({ ...prev, image: objectUrl }))
    }
  }, [])

  const dismissError = useCallback(() => {
    setError(null)
  }, [])

  return (
    <AdminDashboard currentSection="businesses">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        {/* Error Alert */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start justify-between"
            >
              <div className="flex items-start">
                <ExclamationTriangleIcon className="h-5 w-5 text-red-400 mt-0.5 mr-3" />
                <div>
                  <h3 className="text-sm font-medium text-red-800">Error</h3>
                  <p className="text-sm text-red-600 mt-1">{error}</p>
                </div>
              </div>
              <button onClick={dismissError} className="text-red-500 hover:text-red-700">
                <XMarkIcon className="h-5 w-5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

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
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <svg
              className="animate-spin h-8 w-8 text-purple-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span className="ml-2 text-gray-600">Loading businesses...</span>
          </div>
        )}

        {/* Businesses Grid */}
        {!isLoading && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBusinesses.map((business) => (
                <motion.div
                  key={business._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {business.image ? (
                        <img
                          src={business.image || "/placeholder.svg"}
                          alt={business.name}
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                          <BuildingOfficeIcon className="h-6 w-6 text-purple-600" />
                        </div>
                      )}
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="text-lg font-semibold text-gray-900">{business.name}</h3>
                          {business.isVerified && (
                            <CheckBadgeIcon className="h-5 w-5 text-green-500" title="Verified Business" />
                          )}
                        </div>
                        <p className="text-sm text-gray-500">{business.subcategory}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-gray-600 line-clamp-2">{business.description}</p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Owner:</span> {business.owner}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Location:</span> {business.location}
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
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="ml-1 text-sm text-gray-600">({business.reviews})</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${business.status === "active" ? "bg-green-100 text-green-800" : business.status === "inactive" ? "bg-gray-100 text-gray-800" : "bg-yellow-100 text-yellow-800"}`}
                    >
                      {business.status}
                    </span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openViewModal(business)}
                        className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
                        title="View Details"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => openEditModal(business)}
                        className="p-2 text-blue-500 hover:text-blue-700 rounded-lg hover:bg-blue-50"
                        title="Edit"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteBusiness(business._id || business.id)}
                        className="p-2 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50"
                        title="Delete"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Empty State */}
            {filteredBusinesses.length === 0 && (
              <div className="text-center py-12">
                <BuildingOfficeIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No businesses found</h3>
                <p className="text-gray-500 mb-4">
                  {searchTerm || filterCategory !== "all"
                    ? "Try adjusting your search or filter criteria"
                    : "Get started by adding your first business"}
                </p>
                {!searchTerm && filterCategory === "all" && (
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors duration-200"
                  >
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Add Business
                  </button>
                )}
              </div>
            )}
          </>
        )}

        {/* Modals */}
        <AnimatePresence>
          {showAddModal && (
            <ModalBackground onClose={() => !isSubmitting && setShowAddModal(false)}>
              <BusinessForm
                formData={formData}
                formErrors={formErrors}
                serviceInput={serviceInput}
                onFormDataChange={handleFormDataChange}
                onServiceInputChange={setServiceInput}
                onSubmit={handleAddBusiness}
                onCancel={handleCancelForm}
                onAddService={addService}
                onRemoveService={removeService}
                onImageChange={handleImageChange}
                isLoading={isSubmitting}
              />
            </ModalBackground>
          )}

          {showEditModal && (
            <ModalBackground onClose={() => !isSubmitting && setShowEditModal(false)}>
              <BusinessForm
                isEdit={true}
                formData={formData}
                formErrors={formErrors}
                serviceInput={serviceInput}
                onFormDataChange={handleFormDataChange}
                onServiceInputChange={setServiceInput}
                onSubmit={handleEditBusiness}
                onCancel={handleCancelForm}
                onAddService={addService}
                onRemoveService={removeService}
                onImageChange={handleImageChange}
                isLoading={isSubmitting}
              />
            </ModalBackground>
          )}

          {showViewModal && selectedBusiness && (
            <ModalBackground onClose={() => setShowViewModal(false)}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Business Details</h3>
                  <button onClick={() => setShowViewModal(false)} className="text-gray-400 hover:text-gray-600">
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    {selectedBusiness.image ? (
                      <img
                        src={selectedBusiness.image || "/placeholder.svg"}
                        alt={selectedBusiness.name}
                        className="h-16 w-16 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="h-16 w-16 bg-purple-100 rounded-lg flex items-center justify-center">
                        <BuildingOfficeIcon className="h-8 w-8 text-purple-600" />
                      </div>
                    )}
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="text-xl font-bold text-gray-900">{selectedBusiness.name}</h4>
                        {selectedBusiness.isVerified && (
                          <CheckBadgeIcon className="h-5 w-5 text-green-500" title="Verified Business" />
                        )}
                      </div>
                      <p className="text-gray-500">
                        {selectedBusiness.category} - {selectedBusiness.subcategory}
                      </p>
                      <span
                        className={`inline-block mt-2 px-2 py-1 rounded-full text-xs font-medium ${selectedBusiness.status === "active" ? "bg-green-100 text-green-800" : selectedBusiness.status === "inactive" ? "bg-gray-100 text-gray-800" : "bg-yellow-100 text-yellow-800"}`}
                      >
                        {selectedBusiness.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Contact Information</h5>
                      <div className="space-y-1 text-sm">
                        <p>
                          <span className="font-medium">Owner:</span> {selectedBusiness.owner}
                        </p>
                        <p>
                          <span className="font-medium">Email:</span> {selectedBusiness.email}
                        </p>
                        <p>
                          <span className="font-medium">Phone:</span> {selectedBusiness.phone}
                        </p>
                        {selectedBusiness.website && (
                          <p>
                            <span className="font-medium">Website:</span>{" "}
                            <a
                              href={selectedBusiness.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-purple-600 hover:underline"
                            >
                              {selectedBusiness.website}
                            </a>
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Location</h5>
                      <div className="space-y-1 text-sm">
                        <p>{selectedBusiness.location}</p>
                        <p className="text-gray-600">{selectedBusiness.address}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Description</h5>
                    <p className="text-sm text-gray-600">{selectedBusiness.description}</p>
                  </div>

                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Services</h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedBusiness.services.map((service, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 bg-purple-100 text-purple-700 text-sm rounded-full"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Rating & Reviews</h5>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`h-5 w-5 ${i < Math.floor(selectedBusiness.rating) ? "text-yellow-400" : "text-gray-300"}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="ml-2 text-sm text-gray-600">({selectedBusiness.reviews} reviews)</span>
                      </div>
                    </div>

                    <div>
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Created At</h5>
                      <p className="text-sm text-gray-600">
                        {new Date(selectedBusiness.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ModalBackground>
          )}
        </AnimatePresence>
      </motion.div>
    </AdminDashboard>
  )
}

export default AdminBusinesses
