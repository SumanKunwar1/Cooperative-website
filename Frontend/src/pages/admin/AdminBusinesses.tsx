// AdminBusinesses.tsx
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
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline"
import AdminDashboard from "./AdminDashboard"
import type { Business, BusinessFormData } from "../../types/adminBusiness"

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

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

interface BusinessFormProps {
  isEdit?: boolean
  formData: BusinessFormData
  formErrors: Partial<BusinessFormData>
  serviceInput: string
  pricingInput: { tier: string; price: string }
  galleryInput: string
  onFormDataChange: (data: BusinessFormData | ((prev: BusinessFormData) => BusinessFormData)) => void
  onServiceInputChange: (value: string) => void
  onPricingInputChange: (field: string, value: string) => void
  onGalleryInputChange: (value: string) => void
  onSubmit: () => void
  onCancel: () => void
  onAddService: () => void
  onRemoveService: (service: string) => void
  onAddPricing: () => void
  onRemovePricing: (tier: string) => void
  onAddGallery: () => void
  onRemoveGallery: (image: string) => void
  onImageChange: (file: File | null) => void
  onGalleryFileChange: (file: File | null) => void
  isLoading: boolean
}

const BusinessForm: React.FC<BusinessFormProps> = ({
  isEdit = false,
  formData,
  formErrors,
  serviceInput,
  pricingInput,
  galleryInput,
  onFormDataChange,
  onServiceInputChange,
  onPricingInputChange,
  onGalleryInputChange,
  onSubmit,
  onCancel,
  onAddService,
  onRemoveService,
  onAddPricing,
  onRemovePricing,
  onAddGallery,
  onRemoveGallery,
  onImageChange,
  onGalleryFileChange,
  isLoading,
}) => {
  const handleInputChange = useCallback(
    (field: keyof BusinessFormData, value: any) => {
      onFormDataChange((prev: BusinessFormData) => ({ ...prev, [field]: value }))
    },
    [onFormDataChange],
  )

  const handleOpeningHoursChange = useCallback(
    (day: string, hours: string) => {
      onFormDataChange((prev: BusinessFormData) => ({
        ...prev,
        openingHours: {
          ...prev.openingHours,
          [day]: hours,
        },
      }))
    },
    [onFormDataChange],
  )

  return (
    <div className="p-6 max-h-[90vh] overflow-y-auto">
      <div className="flex items-center justify-between mb-4 sticky top-0 bg-white py-2">
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
        className="space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Business Name*</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Display Name (Optional)</label>
            <input
              type="text"
              value={formData.businessName || ""}
              onChange={(e) => handleInputChange("businessName", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter display name (if different)"
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category*</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Subcategory*</label>
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Short Description*</label>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${formErrors.description ? "border-red-500" : "border-gray-300"}`}
            placeholder="Enter short description for listings"
            rows={2}
            disabled={isLoading}
          />
          {formErrors.description && <p className="text-red-500 text-xs mt-1">{formErrors.description}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Description (Optional)</label>
          <textarea
            value={formData.fullDescription || ""}
            onChange={(e) => handleInputChange("fullDescription", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter detailed business description"
            rows={4}
            disabled={isLoading}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone*</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Location*</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${formErrors.location ? "border-red-500" : "border-gray-300"}`}
              placeholder="Enter location (city, area)"
              disabled={isLoading}
            />
            {formErrors.location && <p className="text-red-500 text-xs mt-1">{formErrors.location}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Website (Optional)</label>
            <input
              type="url"
              value={formData.website || ""}
              onChange={(e) => handleInputChange("website", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter website URL"
              disabled={isLoading}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Address*</label>
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Owner Name*</label>
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Business Image*</label>
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
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${formErrors.image ? "border-red-500" : "border-gray-300"}`}
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
          {formErrors.image && <p className="text-red-500 text-xs mt-1">{formErrors.image}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Gallery Images & Videos (Optional)</label>
          <div className="space-y-2 mb-2">
            <input
              type="file"
              accept="image/*,video/*"
              onChange={(e) => onGalleryFileChange(e.target.files?.[0] || null)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              disabled={isLoading}
            />
            <div className="text-center text-sm text-gray-500">OR</div>
            <div className="flex gap-2">
              <input
                type="url"
                value={galleryInput}
                onChange={(e) => onGalleryInputChange(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter image/video URL"
                disabled={isLoading}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    onAddGallery()
                  }
                }}
              />
              <button
                type="button"
                onClick={onAddGallery}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
                disabled={isLoading}
              >
                Add
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {formData.gallery?.map((media, index) => (
              <div key={index} className="relative group">
                {media.includes("data:video") || media.match(/\.(mp4|webm|ogg|mov|avi)$/i) ? (
                  <video
                    src={media}
                    className="h-16 w-16 object-cover rounded-lg"
                    muted
                    onError={(e) => {
                      e.currentTarget.style.display = "none"
                    }}
                  />
                ) : (
                  <img
                    src={media || "/placeholder.svg"}
                    alt={`Gallery ${index + 1}`}
                    className="h-16 w-16 object-cover rounded-lg"
                    onError={(e) => {
                      e.currentTarget.style.display = "none"
                    }}
                  />
                )}
                <button
                  type="button"
                  onClick={() => onRemoveGallery(media)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  disabled={isLoading}
                >
                  <XMarkIcon className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Services*</label>
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
          {formErrors.services && <p className="text-red-500 text-xs mt-1">{formErrors.services}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Pricing (Optional)</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Tier Name</label>
              <input
                type="text"
                value={pricingInput.tier}
                onChange={(e) => onPricingInputChange("tier", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="e.g., Basic"
                disabled={isLoading}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Price</label>
              <input
                type="text"
                value={pricingInput.price}
                onChange={(e) => onPricingInputChange("price", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="e.g., $50 or Contact"
                disabled={isLoading}
              />
            </div>
            <div className="flex items-end">
              <button
                type="button"
                onClick={onAddPricing}
                className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
                disabled={isLoading || !pricingInput.tier}
              >
                Add Tier
              </button>
            </div>
          </div>
          {formData.pricing && Object.keys(formData.pricing).length > 0 && (
            <div className="flex flex-wrap gap-2">
              {Object.entries(formData.pricing).map(([tier, price]) => (
                <span
                  key={tier}
                  className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
                >
                  <CurrencyDollarIcon className="h-3 w-3 mr-1" />
                  {tier}: {price}
                  <button
                    type="button"
                    onClick={() => onRemovePricing(tier)}
                    className="ml-1 text-blue-500 hover:text-blue-700"
                    disabled={isLoading}
                  >
                    <XMarkIcon className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Opening Hours (Optional)</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {daysOfWeek.map((day) => (
              <div key={day} className="flex items-center justify-between">
                <span className="text-sm text-gray-700 w-24">{day}</span>
                <input
                  type="text"
                  value={formData.openingHours?.[day] || ""}
                  onChange={(e) => handleOpeningHoursChange(day, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., 9:00 AM - 5:00 PM or Closed"
                  disabled={isLoading}
                />
              </div>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
            <input
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={formData.rating}
              onChange={(e) => handleInputChange("rating", Number.parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reviews Count</label>
            <input
              type="number"
              min="0"
              value={formData.reviews}
              onChange={(e) => handleInputChange("reviews", Number.parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="flex space-x-3 pt-4 border-t border-gray-200">
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
      className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden"
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
    services: [],
    isVerified: false,
    owner: "",
    address: "",
    status: "active",
    rating: 0,
    reviews: 0,
  })
  const [formErrors, setFormErrors] = useState<Partial<BusinessFormData>>({})
  const [serviceInput, setServiceInput] = useState("")
  const [pricingInput, setPricingInput] = useState({ tier: "", price: "" })
  const [galleryInput, setGalleryInput] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"

  // Fetch all businesses from API
  const fetchBusinesses = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await fetch(`${API_BASE_URL}/api/business-details/admin`)

      if (!response.ok) {
        throw new Error(`Failed to fetch businesses: ${response.statusText}`)
      }

      const result = await response.json()

      if (result.success) {
        setBusinesses(result.data)
      } else {
        throw new Error(result.message || "Failed to fetch businesses")
      }
    } catch (err) {
      console.error("Error fetching businesses:", err)
      setError(err instanceof Error ? err.message : "Failed to fetch businesses")
    } finally {
      setIsLoading(false)
    }
  }

  // Load businesses on component mount
  useEffect(() => {
    fetchBusinesses()
  }, [])

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
      services: [],
      isVerified: false,
      owner: "",
      address: "",
      status: "active",
      rating: 0,
      reviews: 0,
    })
    setFormErrors({})
    setServiceInput("")
    setPricingInput({ tier: "", price: "" })
    setGalleryInput("")
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
    if (!formData.image.trim()) errors.image = "Image is required"
    if (formData.services.length === 0) errors.services = ["At least one service is required"]

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }, [formData])

  const handleAddBusiness = useCallback(async () => {
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      const businessData = {
        name: formData.name,
        businessName: formData.businessName,
        category: formData.category,
        subcategory: formData.subcategory,
        description: formData.description,
        fullDescription: formData.fullDescription,
        image: formData.image,
        gallery: formData.gallery,
        rating: formData.rating,
        reviews: formData.reviews,
        location: formData.location,
        address: formData.address,
        phone: formData.phone,
        email: formData.email,
        website: formData.website,
        services: formData.services,
        pricing: formData.pricing,
        openingHours: formData.openingHours,
        isVerified: formData.isVerified,
        owner: formData.owner,
        status: formData.status,
        createdBy: "admin",
      }

      const response = await fetch(`${API_BASE_URL}/api/business-details`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(businessData),
      })

      if (!response.ok) {
        throw new Error(`Failed to create business: ${response.statusText}`)
      }

      const result = await response.json()

      if (result.success) {
        // Add the new business to the list
        setBusinesses((prev) => [...prev, result.data])
        setShowAddModal(false)
        resetForm()
        setError(null)
      } else {
        throw new Error(result.message || "Failed to create business")
      }
    } catch (err) {
      console.error("Error adding business:", err)
      setError(err instanceof Error ? err.message : "Failed to add business")
    } finally {
      setIsSubmitting(false)
    }
  }, [formData, resetForm, validateForm])

  const handleEditBusiness = useCallback(async () => {
    if (!selectedBusiness || !validateForm()) return

    setIsSubmitting(true)
    try {
      const businessData = {
        name: formData.name,
        businessName: formData.businessName,
        category: formData.category,
        subcategory: formData.subcategory,
        description: formData.description,
        fullDescription: formData.fullDescription,
        image: formData.image,
        gallery: formData.gallery,
        rating: formData.rating,
        reviews: formData.reviews,
        location: formData.location,
        address: formData.address,
        phone: formData.phone,
        email: formData.email,
        website: formData.website,
        services: formData.services,
        pricing: formData.pricing,
        openingHours: formData.openingHours,
        isVerified: formData.isVerified,
        owner: formData.owner,
        status: formData.status,
      }

      const response = await fetch(`${API_BASE_URL}/api/business-details/${selectedBusiness._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(businessData),
      })

      if (!response.ok) {
        throw new Error(`Failed to update business: ${response.statusText}`)
      }

      const result = await response.json()

      if (result.success) {
        // Update the business in the list
        setBusinesses((prev) => prev.map((b) => (b._id === selectedBusiness._id ? result.data : b)))
        setShowEditModal(false)
        setSelectedBusiness(null)
        resetForm()
        setError(null)
      } else {
        throw new Error(result.message || "Failed to update business")
      }
    } catch (err) {
      console.error("Error updating business:", err)
      setError(err instanceof Error ? err.message : "Failed to update business")
    } finally {
      setIsSubmitting(false)
    }
  }, [formData, selectedBusiness, resetForm, validateForm])

  const handleDeleteBusiness = useCallback(async (id: string) => {
    if (!confirm("Are you sure you want to delete this business?")) return

    try {
      const response = await fetch(`${API_BASE_URL}/api/business-details/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error(`Failed to delete business: ${response.statusText}`)
      }

      const result = await response.json()

      if (result.success) {
        // Remove the business from the list
        setBusinesses((prev) => prev.filter((b) => b._id !== id))
        setError(null)
      } else {
        throw new Error(result.message || "Failed to delete business")
      }
    } catch (err) {
      console.error("Error deleting business:", err)
      setError(err instanceof Error ? err.message : "Failed to delete business")
    }
  }, [])

  const handleEditClick = useCallback((business: Business) => {
    setSelectedBusiness(business)
    setFormData({
      name: business.name,
      businessName: business.businessName || "",
      category: business.category,
      subcategory: business.subcategory,
      description: business.description,
      fullDescription: business.fullDescription || "",
      image: business.image,
      gallery: business.gallery || [],
      rating: business.rating,
      reviews: business.reviews,
      location: business.location,
      address: business.address,
      phone: business.phone,
      email: business.email,
      website: business.website || "",
      services: business.services,
      pricing: business.pricing || {},
      openingHours: business.openingHours || {},
      isVerified: business.isVerified,
      owner: business.owner,
      status: business.status,
    })
    setShowEditModal(true)
  }, [])

  const handleViewClick = useCallback((business: Business) => {
    setSelectedBusiness(business)
    setShowViewModal(true)
  }, [])

  const handleGalleryFileChange = useCallback(
    (file: File | null) => {
      if (file) {
        const reader = new FileReader()
        reader.onloadend = () => {
          const result = reader.result as string
          if (!formData.gallery?.includes(result)) {
            setFormData((prev) => ({
              ...prev,
              gallery: [...(prev.gallery || []), result],
            }))
          }
        }
        reader.readAsDataURL(file)
      }
    },
    [formData.gallery],
  )

  const handleAddService = useCallback(() => {
    if (serviceInput.trim() && !formData.services.includes(serviceInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        services: [...prev.services, serviceInput.trim()],
      }))
      setServiceInput("")
    }
  }, [serviceInput, formData.services])

  const handleRemoveService = useCallback((service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.filter((s) => s !== service),
    }))
  }, [])

  const handleAddPricing = useCallback(() => {
    if (pricingInput.tier.trim() && pricingInput.price.trim()) {
      setFormData((prev) => ({
        ...prev,
        pricing: {
          ...prev.pricing,
          [pricingInput.tier]: pricingInput.price,
        },
      }))
      setPricingInput({ tier: "", price: "" })
    }
  }, [pricingInput])

  const handleRemovePricing = useCallback((tier: string) => {
    setFormData((prev) => {
      const newPricing = { ...prev.pricing }
      delete newPricing[tier]
      return {
        ...prev,
        pricing: newPricing,
      }
    })
  }, [])

  const handleAddGallery = useCallback(() => {
    if (galleryInput.trim() && !formData.gallery?.includes(galleryInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        gallery: [...(prev.gallery || []), galleryInput.trim()],
      }))
      setGalleryInput("")
    }
  }, [galleryInput, formData.gallery])

  const handleRemoveGallery = useCallback((image: string) => {
    setFormData((prev) => ({
      ...prev,
      gallery: (prev.gallery || []).filter((img) => img !== image),
    }))
  }, [])

  const handleImageChange = useCallback((file: File | null) => {
    setImageFile(file)
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: reader.result as string,
        }))
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const BusinessCard = ({ business }: { business: Business }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 transition-all hover:shadow-lg">
      <div className="relative">
        <img
          src={business.image || "/placeholder.svg"}
          alt={business.name}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.svg"
          }}
        />
        <div className="absolute top-2 right-2 flex items-center space-x-1">
          {business.isVerified && (
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
              <CheckBadgeIcon className="h-3 w-3 mr-1" />
              Verified
            </span>
          )}
          <span
            className={`text-xs px-2 py-1 rounded-full ${business.status === "active" ? "bg-green-100 text-green-800" : business.status === "pending" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}
          >
            {business.status.charAt(0).toUpperCase() + business.status.slice(1)}
          </span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg text-gray-900 truncate">{business.name}</h3>
          <div className="flex items-center text-yellow-500">
            <span className="text-sm font-medium mr-1">{business.rating}</span>
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-2">{business.description}</p>
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <BuildingOfficeIcon className="h-4 w-4 mr-1" />
          <span>
            {business.category} - {business.subcategory}
          </span>
        </div>
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <span className="truncate">{business.location}</span>
        </div>
        <div className="flex flex-wrap gap-1 mb-3">
          {business.services.slice(0, 3).map((service, idx) => (
            <span key={idx} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
              {service}
            </span>
          ))}
          {business.services.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
              +{business.services.length - 3} more
            </span>
          )}
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">By: {business.owner}</span>
          <div className="flex space-x-2">
            <button
              onClick={() => handleViewClick(business)}
              className="p-1 text-blue-600 hover:text-blue-800"
              title="View Details"
            >
              <EyeIcon className="h-5 w-5" />
            </button>
            <button
              onClick={() => handleEditClick(business)}
              className="p-1 text-green-600 hover:text-green-800"
              title="Edit"
            >
              <PencilIcon className="h-5 w-5" />
            </button>
            <button
              onClick={() => handleDeleteBusiness(business._id)}
              className="p-1 text-red-600 hover:text-red-800"
              title="Delete"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const BusinessViewModal = () => {
    if (!selectedBusiness) return null

    return (
      <ModalBackground onClose={() => setShowViewModal(false)}>
        <div className="p-6 max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-4 sticky top-0 bg-white py-2">
            <h3 className="text-lg font-semibold text-gray-900">Business Details</h3>
            <button onClick={() => setShowViewModal(false)} className="text-gray-400 hover:text-gray-600">
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <img
                  src={selectedBusiness.image || "/placeholder.svg"}
                  alt={selectedBusiness.name}
                  className="w-full h-64 object-cover rounded-lg"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg"
                  }}
                />
                {selectedBusiness.gallery && selectedBusiness.gallery.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-medium text-gray-700 mb-2">Gallery</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {selectedBusiness.gallery.map((image, index) => (
                        <img
                          key={index}
                          src={image || "/placeholder.svg"}
                          alt={`Gallery ${index + 1}`}
                          className="h-20 w-full object-cover rounded"
                          onError={(e) => {
                            e.currentTarget.style.display = "none"
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="md:w-2/3 space-y-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedBusiness.name}</h2>
                  {selectedBusiness.businessName && <p className="text-gray-600">{selectedBusiness.businessName}</p>}
                  <div className="flex items-center mt-2 space-x-2">
                    {selectedBusiness.isVerified && (
                      <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        <CheckBadgeIcon className="h-3 w-3 mr-1" />
                        Verified
                      </span>
                    )}
                    <span
                      className={`inline-flex items-center px-2 py-1 text-xs rounded-full ${selectedBusiness.status === "active" ? "bg-green-100 text-green-800" : selectedBusiness.status === "pending" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}
                    >
                      {selectedBusiness.status.charAt(0).toUpperCase() + selectedBusiness.status.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center text-yellow-500">
                  <span className="text-lg font-medium mr-1">{selectedBusiness.rating}</span>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-gray-600 text-sm ml-1">({selectedBusiness.reviews} reviews)</span>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 mb-1">Description</h4>
                  <p className="text-gray-600">{selectedBusiness.description}</p>
                  {selectedBusiness.fullDescription && (
                    <p className="text-gray-600 mt-2">{selectedBusiness.fullDescription}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-1">Category</h4>
                    <p className="text-gray-600">
                      {selectedBusiness.category} - {selectedBusiness.subcategory}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 mb-1">Location</h4>
                    <p className="text-gray-600">{selectedBusiness.location}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 mb-1">Address</h4>
                  <p className="text-gray-600">{selectedBusiness.address}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-1">Contact Email</h4>
                    <p className="text-gray-600">{selectedBusiness.email}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 mb-1">Contact Phone</h4>
                    <p className="text-gray-600">{selectedBusiness.phone}</p>
                  </div>
                </div>

                {selectedBusiness.website && (
                  <div>
                    <h4 className="font-medium text-gray-700 mb-1">Website</h4>
                    <a
                      href={selectedBusiness.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {selectedBusiness.website}
                    </a>
                  </div>
                )}

                <div>
                  <h4 className="font-medium text-gray-700 mb-1">Owner</h4>
                  <p className="text-gray-600">{selectedBusiness.owner}</p>
                </div>

                {selectedBusiness.services && selectedBusiness.services.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-700 mb-1">Services</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedBusiness.services.map((service, index) => (
                        <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 text-sm rounded-full">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedBusiness.pricing && Object.keys(selectedBusiness.pricing).length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-700 mb-1">Pricing</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      {Object.entries(selectedBusiness.pricing).map(([tier, price]) => (
                        <div key={tier} className="bg-blue-50 p-3 rounded-lg">
                          <div className="font-medium text-blue-800 capitalize">{tier}</div>
                          <div className="text-blue-600">{price}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedBusiness.openingHours && Object.keys(selectedBusiness.openingHours).length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-700 mb-1">Opening Hours</h4>
                    <div className="space-y-1">
                      {daysOfWeek.map((day) => (
                        <div key={day} className="flex justify-between">
                          <span className="text-gray-600">{day}:</span>
                          <span className="text-gray-800 font-medium">
                            {selectedBusiness.openingHours?.[day] || "Closed"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-1">Created At</h4>
                    <p className="text-gray-600">{new Date(selectedBusiness.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 mb-1">Last Updated</h4>
                    <p className="text-gray-600">{new Date(selectedBusiness.updatedAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-3 pt-4 border-t border-gray-200">
              <button
                onClick={() => setShowViewModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowViewModal(false)
                  handleEditClick(selectedBusiness)
                }}
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Edit Business
              </button>
            </div>
          </div>
        </div>
      </ModalBackground>
    )
  }

  return (
    <AdminDashboard>
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Business Management</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="mt-4 md:mt-0 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add New Business
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center">
            <ExclamationTriangleIcon className="h-5 w-5 mr-2" />
            {error}
            <button onClick={() => setError(null)} className="ml-auto text-red-800">
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search businesses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center justify-end text-sm text-gray-500">
              <span>
                Showing {filteredBusinesses.length} of {businesses.length} businesses
              </span>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : filteredBusinesses.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <BuildingOfficeIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No businesses found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || filterCategory !== "all"
                ? "Try adjusting your search or filter to find what you're looking for."
                : "Get started by adding your first business."}
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center justify-center mx-auto"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Add New Business
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBusinesses.map((business) => (
              <BusinessCard key={business._id} business={business} />
            ))}
          </div>
        )}

        <AnimatePresence>
          {showAddModal && (
            <ModalBackground onClose={() => !isSubmitting && setShowAddModal(false)}>
              <BusinessForm
                formData={formData}
                formErrors={formErrors}
                serviceInput={serviceInput}
                pricingInput={pricingInput}
                galleryInput={galleryInput}
                onFormDataChange={setFormData}
                onServiceInputChange={setServiceInput}
                onPricingInputChange={(field, value) => setPricingInput((prev) => ({ ...prev, [field]: value }))}
                onGalleryInputChange={setGalleryInput}
                onSubmit={handleAddBusiness}
                onCancel={() => {
                  setShowAddModal(false)
                  resetForm()
                }}
                onAddService={handleAddService}
                onRemoveService={handleRemoveService}
                onAddPricing={handleAddPricing}
                onRemovePricing={handleRemovePricing}
                onAddGallery={handleAddGallery}
                onRemoveGallery={handleRemoveGallery}
                onImageChange={handleImageChange}
                onGalleryFileChange={handleGalleryFileChange}
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
                pricingInput={pricingInput}
                galleryInput={galleryInput}
                onFormDataChange={setFormData}
                onServiceInputChange={setServiceInput}
                onPricingInputChange={(field, value) => setPricingInput((prev) => ({ ...prev, [field]: value }))}
                onGalleryInputChange={setGalleryInput}
                onSubmit={handleEditBusiness}
                onCancel={() => {
                  setShowEditModal(false)
                  setSelectedBusiness(null)
                  resetForm()
                }}
                onAddService={handleAddService}
                onRemoveService={handleRemoveService}
                onAddPricing={handleAddPricing}
                onRemovePricing={handleRemovePricing}
                onAddGallery={handleAddGallery}
                onRemoveGallery={handleRemoveGallery}
                onImageChange={handleImageChange}
                onGalleryFileChange={handleGalleryFileChange}
                isLoading={isSubmitting}
              />
            </ModalBackground>
          )}

          {showViewModal && <BusinessViewModal />}
        </AnimatePresence>
      </div>
    </AdminDashboard>
  )
}

export default AdminBusinesses
