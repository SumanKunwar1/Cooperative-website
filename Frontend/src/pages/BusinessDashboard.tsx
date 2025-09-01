"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import {
  Building2,
  Plus,
  Edit,
  Trash2,
  Eye,
  Save,
  X,
  Star,
  MapPin,
  Phone,
  Mail,
  Clock,
  TrendingUp,
  Calendar,
  Settings,
  LogOut,
  Bell,
  Search,
  Filter,
  Upload,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react"
import { useAuth } from "../contexts/AuthContext"
import SEO from "../components/common/SEO"
import Card from "../components/ui/Card"
import Button from "../components/ui/Button"
import type { Business, Pricing } from "../types/business"

interface Booking {
  id: string
  customerName: string
  customerEmail: string
  customerPhone: string
  service: string
  preferredDate: string
  preferredTime: string
  message: string
  status: "pending" | "confirmed" | "completed" | "cancelled"
  createdAt: string
  businessId: string
}

interface BusinessFormData {
  name: string
  category: string
  subcategory: string
  description: string
  fullDescription: string
  image: string
  gallery: string[]
  location: string
  address: string
  phone: string
  email: string
  website?: string
  services: string[]
  openingHours: { [key: string]: string }
  features: string[]
  pricing: Pricing[]
}

const BusinessDashboard: React.FC = () => {
  const { email } = useParams<{ email: string }>()
  const navigate = useNavigate()
  const { user, logout, isAuthenticated } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")
  const [business, setBusiness] = useState<Business | null>(null)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [loading, setLoading] = useState(true)
  const [, setError] = useState<string | null>(null)

  const [businessForm, setBusinessForm] = useState<BusinessFormData>({
    name: "",
    category: "",
    subcategory: "",
    description: "",
    fullDescription: "",
    image: "",
    gallery: [],
    location: "",
    address: "",
    phone: "",
    email: "",
    website: "",
    services: [],
    openingHours: {
      Monday: "9:00 AM - 6:00 PM",
      Tuesday: "9:00 AM - 6:00 PM",
      Wednesday: "9:00 AM - 6:00 PM",
      Thursday: "9:00 AM - 6:00 PM",
      Friday: "9:00 AM - 6:00 PM",
      Saturday: "10:00 AM - 4:00 PM",
      Sunday: "Closed",
    },
    features: [],
    pricing: [],
  })

  const [uploadingImage, setUploadingImage] = useState(false)
  const [uploadingGallery, setUploadingGallery] = useState(false)

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"

  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate("/login")
      return
    }

    if (user.membershipType !== "business") {
      navigate(`/dashboard/${encodeURIComponent(user.email)}`)
      return
    }

    // Validate that the URL email matches the logged-in user's email
    if (email && email !== encodeURIComponent(user.email)) {
      navigate(`/business-dashboard/${encodeURIComponent(user.email)}`)
      return
    }

    loadBusinessData()
    loadBookings()
  }, [isAuthenticated, user, email, navigate])

  const handleImageUpload = async (file: File, type: "main" | "gallery") => {
    if (type === "main") {
      setUploadingImage(true)
    } else {
      setUploadingGallery(true)
    }

    try {
      const formData = new FormData()
      formData.append("image", file)

      const response = await fetch(`${API_URL}/api/upload/image`, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Upload failed")
      }

      const result = await response.json()
      const imageUrl = result.data.url

      if (type === "main") {
        setBusinessForm((prev) => ({ ...prev, image: imageUrl }))
      } else {
        setBusinessForm((prev) => ({
          ...prev,
          gallery: [...(prev.gallery || []), imageUrl],
        }))
      }
    } catch (error) {
      console.error("Upload failed:", error)
      alert("Image upload failed. Please try again.")
    } finally {
      if (type === "main") {
        setUploadingImage(false)
      } else {
        setUploadingGallery(false)
      }
    }
  }

  const handleRemoveGalleryImage = async (index: number) => {
    const newGallery = [...businessForm.gallery]
    newGallery.splice(index, 1)
    setBusinessForm((prev) => ({ ...prev, gallery: newGallery }))
  }

  const handleSaveBusiness = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const userId = "507f1f77bcf86cd799439011" // Replace with actual user ID
      let response

      const businessData = {
        ...businessForm,
        owner: userId,
      }

      if (showCreateModal) {
        // Create new business
        response = await fetch(`${API_URL}/api/business-details`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(businessData),
        })
      } else if (showEditModal && business?._id) {
        // Update existing business
        response = await fetch(`${API_URL}/api/business-details/${business._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(businessForm),
        })
      }

      if (response && response.ok) {
        const data = await response.json()
        setBusiness(data.data)
        setShowCreateModal(false)
        setShowEditModal(false)
        setBusinessForm({} as BusinessFormData)
        alert("Business saved successfully!")
      } else {
        const errorData = await response?.json()
        console.error("API Error:", errorData)
        throw new Error(errorData?.message || "Failed to save business")
      }
    } catch (err) {
      console.error("Error saving business:", err)
      setError(err instanceof Error ? err.message : "Failed to save business")
    }
  }

  useEffect(() => {
    const loadUserBusiness = async () => {
      try {
        setLoading(true)
        const userId = "507f1f77bcf86cd799439011" // Replace with actual user ID

        const response = await fetch(`${API_URL}/api/business-details/user/${userId}`)

        if (response.ok) {
          const data = await response.json()
          setBusiness(data.data)
        } else if (response.status !== 404) {
          // Only throw error if it's not a "not found" error
          const errorData = await response.json()
          throw new Error(errorData.message || "Failed to load business")
        }
      } catch (err) {
        console.error("Error loading business:", err)
        setError(err instanceof Error ? err.message : "Failed to load business")
      } finally {
        setLoading(false)
      }
    }

    loadUserBusiness()
  }, [])

  const loadBusinessData = async () => {
    try {
      setLoading(true)

      const response = await fetch(`${API_URL}/api/business-details`)

      if (response.ok) {
        const data = await response.json()
        if (data.success && data.data) {
          setBusiness(data.data)
        } else {
          setBusiness(null)
        }
      } else if (response.status === 404) {
        setBusiness(null)
      } else {
        throw new Error("Failed to load business data")
      }
    } catch (err) {
      console.error("Error loading business data:", err)
      setBusiness(null)
    } finally {
      setLoading(false)
    }
  }

  const loadBookings = () => {
    // Mock data for bookings - in a real app, you would fetch from API
    const mockBookings: Booking[] = [
      {
        id: "1",
        customerName: "John Doe",
        customerEmail: "john@example.com",
        customerPhone: "9841234567",
        service: "Web Development",
        preferredDate: "2024-01-15",
        preferredTime: "10:00",
        message: "Need a modern e-commerce website for my business",
        status: "pending",
        createdAt: "2024-01-10T10:30:00Z",
        businessId: "1",
      },
      {
        id: "2",
        customerName: "Jane Smith",
        customerEmail: "jane@example.com",
        customerPhone: "9851234567",
        service: "Mobile Apps",
        preferredDate: "2024-01-20",
        preferredTime: "14:00",
        message: "Looking for a mobile app for my restaurant",
        status: "confirmed",
        createdAt: "2024-01-08T15:45:00Z",
        businessId: "1",
      },
      {
        id: "3",
        customerName: "Mike Johnson",
        customerEmail: "mike@example.com",
        customerPhone: "9861234567",
        service: "IT Consulting",
        preferredDate: "2024-01-12",
        preferredTime: "09:00",
        message: "Need consultation on cloud migration strategy",
        status: "completed",
        createdAt: "2024-01-05T09:15:00Z",
        businessId: "1",
      },
    ]
    setBookings(mockBookings)
  }

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  const handleCreateBusiness = () => {
    setBusinessForm({
      name: "",
      category: "",
      subcategory: "",
      description: "",
      fullDescription: "",
      image: "",
      gallery: [],
      location: "",
      address: "",
      phone: user?.phone || "",
      email: user?.email || "",
      website: "",
      services: [],
      openingHours: {
        Monday: "9:00 AM - 6:00 PM",
        Tuesday: "9:00 AM - 6:00 PM",
        Wednesday: "9:00 AM - 6:00 PM",
        Thursday: "9:00 AM - 6:00 PM",
        Friday: "9:00 AM - 6:00 PM",
        Saturday: "10:00 AM - 4:00 PM",
        Sunday: "Closed",
      },
      features: [],
      pricing: [],
    })
    setShowCreateModal(true)
  }

  const handleEditBusiness = () => {
    if (business) {
      setBusinessForm({
        name: business.businessName || "",
        category: business.category || "",
        subcategory: business.subcategory || "",
        description: business.description || "",
        fullDescription: business.fullDescription || business.description || "",
        image: business.image || "",
        gallery: business.gallery || [],
        location: business.location || "",
        address: business.address || "",
        phone: business.phone || "",
        email: business.email || "",
        website: business.website || "",
        services: business.services || [],
        openingHours: business.openingHours || {},
        features: business.features || [],
        pricing: business.pricing || [],
      })
      setShowEditModal(true)
    }
  }

  const handleDeleteBusiness = async () => {
    if (window.confirm("Are you sure you want to delete your business? This action cannot be undone.")) {
      try {
        const response = await fetch(`${API_URL}/api/business-details/${business?._id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (response.ok) {
          setBusiness(null)
          setShowEditModal(false)
        } else {
          throw new Error("Failed to delete business")
        }
      } catch (err) {
        console.error("Error deleting business:", err)
        alert("Failed to delete business. Please try again.")
      }
    }
  }

  const handleFormChange = (field: string, value: any) => {
    setBusinessForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleArrayFieldChange = (field: string, index: number, value: string) => {
    const currentArray = (businessForm[field as keyof BusinessFormData] as string[]) || []
    const newArray = [...currentArray]
    newArray[index] = value
    setBusinessForm((prev) => ({ ...prev, [field]: newArray }))
  }

  const addArrayField = (field: string) => {
    const currentArray = (businessForm[field as keyof BusinessFormData] as string[]) || []
    setBusinessForm((prev) => ({ ...prev, [field]: [...currentArray, ""] }))
  }

  const removeArrayField = (field: string, index: number) => {
    const currentArray = (businessForm[field as keyof BusinessFormData] as string[]) || []
    const newArray = currentArray.filter((_, i) => i !== index)
    setBusinessForm((prev) => ({ ...prev, [field]: newArray }))
  }

  const handlePricingChange = (index: number, field: keyof Pricing, value: string) => {
    const currentPricing = businessForm.pricing || []
    const newPricing = [...currentPricing]
    newPricing[index] = { ...newPricing[index], [field]: value }
    setBusinessForm((prev) => ({ ...prev, pricing: newPricing }))
  }

  const addPricingField = () => {
    const currentPricing = businessForm.pricing || []
    setBusinessForm((prev) => ({
      ...prev,
      pricing: [...currentPricing, { service: "", price: "", description: "" }],
    }))
  }

  const removePricingField = (index: number) => {
    const currentPricing = businessForm.pricing || []
    const newPricing = currentPricing.filter((_, i) => i !== index)
    setBusinessForm((prev) => ({ ...prev, pricing: newPricing }))
  }

  const handleOpeningHoursChange = (day: string, hours: string) => {
    setBusinessForm((prev) => ({
      ...prev,
      openingHours: {
        ...prev.openingHours,
        [day]: hours,
      },
    }))
  }

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.customerEmail.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || booking.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const handleBookingStatusUpdate = (bookingId: string, newStatus: Booking["status"]) => {
    setBookings((prevBookings) =>
      prevBookings.map((booking) => (booking.id === bookingId ? { ...booking, status: newStatus } : booking)),
    )
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: TrendingUp },
    { id: "business", label: "My Business", icon: Building2 },
    { id: "bookings", label: "Bookings", icon: Calendar },
    { id: "profile", label: "Profile", icon: Settings },
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div>User not found. Please log in again.</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title={`Business Dashboard - ${user.businessName}`}
        description="Manage your business listing and bookings"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  {user.businessName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Business Dashboard</h1>
                  <p className="text-gray-600 mt-1 flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    {user.email}
                  </p>
                  <p className="text-sm text-gray-500 flex items-center mt-1">
                    <Clock className="w-4 h-4 mr-2" />
                    Member since {user.joinedDate ? new Date(user.joinedDate).toLocaleDateString() : "N/A"}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors rounded-lg hover:bg-gray-100">
                  <Bell className="w-5 h-5" />
                </button>
                <Button variant="outline" onClick={handleLogout} className="flex items-center bg-transparent">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="sticky top-4">
              <Card className="p-2">
                <nav className="space-y-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-all duration-200 ${
                        activeTab === tab.id
                          ? "bg-blue-600 text-white shadow-sm"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                    >
                      <tab.icon className="w-5 h-5 mr-3" />
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </Card>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Overview Tab */}
              {activeTab === "overview" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="p-6 border-l-4 border-l-blue-600">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 font-medium">Business Status</p>
                          <p className="text-3xl font-bold text-gray-900 mt-1">{business ? "Active" : "Not Set"}</p>
                          <p className="text-xs text-green-600 mt-1">{business ? "Listed" : "Create your listing"}</p>
                        </div>
                        <div className="p-3 bg-blue-100 rounded-lg">
                          <Building2 className="w-6 h-6 text-blue-600" />
                        </div>
                      </div>
                    </Card>

                    <Card className="p-6 border-l-4 border-l-green-500">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 font-medium">Total Bookings</p>
                          <p className="text-3xl font-bold text-gray-900 mt-1">{bookings.length}</p>
                          <p className="text-xs text-green-600 mt-1">Service requests</p>
                        </div>
                        <div className="p-3 bg-green-100 rounded-lg">
                          <Calendar className="w-6 h-6 text-green-600" />
                        </div>
                      </div>
                    </Card>

                    <Card className="p-6 border-l-4 border-l-amber-500">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 font-medium">Rating</p>
                          <p className="text-3xl font-bold text-gray-900 mt-1">{business?.rating || "0.0"}</p>
                          <p className="text-xs text-amber-600 mt-1">Out of 5.0</p>
                        </div>
                        <div className="p-3 bg-amber-100 rounded-lg">
                          <Star className="w-6 h-6 text-amber-600" />
                        </div>
                      </div>
                    </Card>
                  </div>

                  <Card className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Bookings</h3>
                    <div className="space-y-4">
                      {bookings.slice(0, 3).map((booking) => (
                        <div key={booking.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                          <div
                            className={`p-2 rounded-lg ${
                              booking.status === "pending"
                                ? "bg-yellow-100"
                                : booking.status === "confirmed"
                                  ? "bg-blue-100"
                                  : booking.status === "completed"
                                    ? "bg-green-100"
                                    : "bg-red-100"
                            }`}
                          >
                            {booking.status === "pending" ? (
                              <AlertCircle className="w-5 h-5 text-yellow-600" />
                            ) : booking.status === "confirmed" ? (
                              <CheckCircle className="w-5 h-5 text-blue-600" />
                            ) : booking.status === "completed" ? (
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            ) : (
                              <XCircle className="w-5 h-5 text-red-600" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900">{booking.customerName}</p>
                            <p className="text-sm text-gray-600">
                              {booking.service} • {booking.preferredDate}
                            </p>
                          </div>
                          <div className="text-right">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                booking.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : booking.status === "confirmed"
                                    ? "bg-blue-100 text-blue-800"
                                    : booking.status === "completed"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-red-100 text-red-800"
                              }`}
                            >
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              )}

              {/* Business Tab */}
              {activeTab === "business" && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">My Business</h2>
                      <p className="text-gray-600">Manage your business listing</p>
                    </div>
                    {!business ? (
                      <Button onClick={handleCreateBusiness} className="flex items-center">
                        <Plus className="w-4 h-4 mr-2" />
                        Create Business Listing
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button
                          onClick={handleEditBusiness}
                          variant="outline"
                          className="flex items-center bg-transparent"
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        <Button
                          onClick={() => window.open(`/business-directory/${business.slug}`, "_blank")}
                          variant="outline"
                          className="flex items-center"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Public
                        </Button>
                      </div>
                    )}
                  </div>

                  {business ? (
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                      <img
                        src={business.image || "/placeholder.svg?height=200&width=400"}
                        alt={business.businessName}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">
                              {business.name || business.businessName}
                            </h3>
                            <p className="text-blue-600 font-medium">{business.subcategory}</p>
                          </div>
                          {business.isVerified && (
                            <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                              Verified
                            </div>
                          )}
                        </div>

                        <p className="text-gray-600 mb-4">{business.description}</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 mr-1" />
                            <span className="font-semibold text-gray-900">{business.rating}</span>
                            <span className="text-gray-500 ml-1">({business.reviews} reviews)</span>
                          </div>
                          <div className="flex items-center text-gray-500">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span className="text-sm">{business.location}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <Phone className="w-4 h-4" />
                            <span>{business.phone}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <Mail className="w-4 h-4" />
                            <span>{business.email}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {business.services.slice(0, 4).map((service, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                              {service}
                            </span>
                          ))}
                          {business.services.length > 4 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                              +{business.services.length - 4} more
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t">
                          <div className="text-sm text-gray-500">
                            Last updated: {new Date(business.updatedAt).toLocaleDateString()}
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="outline" onClick={handleEditBusiness}>
                              <Edit className="w-4 h-4 mr-1" />
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={handleDeleteBusiness}
                              className="text-red-600 hover:text-red-700 bg-transparent"
                            >
                              <Trash2 className="w-4 h-4 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ) : (
                    <Card className="p-12 text-center">
                      <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">No Business Listed</h3>
                      <p className="text-gray-600 mb-6">
                        Create your business listing to start receiving bookings and connect with customers.
                      </p>
                      <Button onClick={handleCreateBusiness}>
                        <Plus className="w-4 h-4 mr-2" />
                        Create Your Business Listing
                      </Button>
                    </Card>
                  )}
                </div>
              )}

              {activeTab === "bookings" && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Service Bookings</h2>
                      <p className="text-gray-600">Manage customer booking requests</p>
                    </div>
                  </div>

                  {/* Search and Filter */}
                  <Card className="p-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1 relative">
                        <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                        <input
                          type="text"
                          placeholder="Search bookings..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div className="relative">
                        <Filter className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                        <select
                          value={filterStatus}
                          onChange={(e) => setFilterStatus(e.target.value)}
                          className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="all">All Status</option>
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>
                  </Card>

                  {/* Bookings List */}
                  <div className="space-y-4">
                    {filteredBookings.map((booking) => (
                      <Card key={booking.id} className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900">{booking.customerName}</h3>
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  booking.status === "pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : booking.status === "confirmed"
                                      ? "bg-blue-100 text-blue-800"
                                      : booking.status === "completed"
                                        ? "bg-green-100 text-green-800"
                                        : "bg-red-100 text-red-800"
                                }`}
                              >
                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                              </span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                              <div className="flex items-center">
                                <Mail className="w-4 h-4 mr-2" />
                                {booking.customerEmail}
                              </div>
                              <div className="flex items-center">
                                <Phone className="w-4 h-4 mr-2" />
                                {booking.customerPhone}
                              </div>
                              <div className="flex items-center">
                                <Building2 className="w-4 h-4 mr-2" />
                                {booking.service}
                              </div>
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-2" />
                                {booking.preferredDate} at {booking.preferredTime}
                              </div>
                            </div>
                            {booking.message && (
                              <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                                <p className="text-sm text-gray-700">{booking.message}</p>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t">
                          <div className="text-sm text-gray-500">
                            Requested: {new Date(booking.createdAt).toLocaleDateString()}
                          </div>
                          <div className="flex items-center space-x-2">
                            {booking.status === "pending" && (
                              <>
                                <Button
                                  size="sm"
                                  onClick={() => handleBookingStatusUpdate(booking.id, "confirmed")}
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  <CheckCircle className="w-4 h-4 mr-1" />
                                  Confirm
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleBookingStatusUpdate(booking.id, "cancelled")}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <XCircle className="w-4 h-4 mr-1" />
                                  Cancel
                                </Button>
                              </>
                            )}
                            {booking.status === "confirmed" && (
                              <Button
                                size="sm"
                                onClick={() => handleBookingStatusUpdate(booking.id, "completed")}
                                className="bg-blue-600 hover:bg-blue-700"
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Mark Complete
                              </Button>
                            )}
                            <Button size="sm" variant="outline">
                              <Mail className="w-4 h-4 mr-1" />
                              Contact
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>

                  {filteredBookings.length === 0 && (
                    <Card className="p-12 text-center">
                      <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings found</h3>
                      <p className="text-gray-600">
                        {searchTerm || filterStatus !== "all"
                          ? "Try adjusting your search or filter criteria."
                          : "You haven't received any booking requests yet."}
                      </p>
                    </Card>
                  )}
                </div>
              )}

              {/* Profile Tab */}
              {activeTab === "profile" && (
                <Card className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Business Profile</h3>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Business Owner Name</label>
                        <input
                          type="text"
                          defaultValue={user.businessName}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          defaultValue={user.email}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                        <input
                          type="tel"
                          defaultValue={user.phone}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Membership Type</label>
                        <input
                          type="text"
                          defaultValue={user.membershipType}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <div className="pt-4 border-t">
                      <Button>Save Changes</Button>
                    </div>
                  </div>
                </Card>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Create Business Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">Create Business Listing</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveBusiness} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
                  <input
                    type="text"
                    required
                    value={businessForm.name}
                    onChange={(e) => handleFormChange("name", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    required
                    value={businessForm.category}
                    onChange={(e) => handleFormChange("category", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Category</option>
                    <option value="Technology">Technology</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Education">Education</option>
                    <option value="Hospitality">Hospitality</option>
                    <option value="Retail">Retail</option>
                    <option value="Construction">Construction</option>
                    <option value="Automotive">Automotive</option>
                    <option value="Beauty">Beauty</option>
                    <option value="Finance">Finance</option>
                    <option value="Legal">Legal</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subcategory</label>
                  <input
                    type="text"
                    required
                    value={businessForm.subcategory}
                    onChange={(e) => handleFormChange("subcategory", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Short Description</label>
                  <textarea
                    required
                    rows={2}
                    value={businessForm.description}
                    onChange={(e) => handleFormChange("description", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Description</label>
                  <textarea
                    required
                    rows={4}
                    value={businessForm.fullDescription}
                    onChange={(e) => handleFormChange("fullDescription", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    required
                    value={businessForm.location}
                    onChange={(e) => handleFormChange("location", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <input
                    type="text"
                    required
                    value={businessForm.address}
                    onChange={(e) => handleFormChange("address", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    required
                    value={businessForm.phone}
                    onChange={(e) => handleFormChange("phone", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={businessForm.email}
                    onChange={(e) => handleFormChange("email", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Website (optional)</label>
                  <input
                    type="url"
                    value={businessForm.website}
                    onChange={(e) => handleFormChange("website", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Main Image</label>
                  <div className="flex items-center space-x-4">
                    {businessForm.image && (
                      <img
                        src={businessForm.image || "/placeholder.svg"}
                        alt="Business preview"
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    )}
                    <div>
                      <input
                        type="file"
                        id="mainImage"
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleImageUpload(e.target.files[0], "main")
                          }
                        }}
                        className="hidden"
                      />
                      <label
                        htmlFor="mainImage"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors inline-flex items-center"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        {uploadingImage ? "Uploading..." : "Upload Image"}
                      </label>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gallery Images</label>
                  <div className="flex flex-wrap gap-4 mb-4">
                    {businessForm.gallery.map((img, index) => (
                      <div key={index} className="relative">
                        <img
                          src={img || "/placeholder.svg"}
                          alt={`Gallery ${index + 1}`}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveGalleryImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <input
                    type="file"
                    id="galleryImage"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleImageUpload(e.target.files[0], "gallery")
                      }
                    }}
                    className="hidden"
                  />
                  <label
                    htmlFor="galleryImage"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors inline-flex items-center"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {uploadingGallery ? "Uploading..." : "Add Gallery Image"}
                  </label>
                </div>
                <div className="md:col-span-2">
                  <div className="flex items-center justify-between mb-4">
                    <label className="block text-sm font-medium text-gray-700">Services Offered</label>
                    <button
                      type="button"
                      onClick={() => addArrayField("services")}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      + Add Service
                    </button>
                  </div>
                  <div className="space-y-3">
                    {businessForm.services.map((service, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={service}
                          onChange={(e) => handleArrayFieldChange("services", index, e.target.value)}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <button
                          type="button"
                          onClick={() => removeArrayField("services", index)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    {businessForm.services.length === 0 && (
                      <p className="text-sm text-gray-500 italic">No services added yet.</p>
                    )}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <div className="flex items-center justify-between mb-4">
                    <label className="block text-sm font-medium text-gray-700">Pricing</label>
                    <button
                      type="button"
                      onClick={addPricingField}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      + Add Pricing
                    </button>
                  </div>
                  <div className="space-y-4">
                    {businessForm.pricing.map((item, index) => (
                      <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Service</label>
                          <input
                            type="text"
                            value={item.service}
                            onChange={(e) => handlePricingChange(index, "service", e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                          <input
                            type="text"
                            value={item.price}
                            onChange={(e) => handlePricingChange(index, "price", e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div className="flex items-end space-x-2">
                          <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                            <input
                              type="text"
                              value={item.description}
                              onChange={(e) => handlePricingChange(index, "description", e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => removePricingField(index)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                    {businessForm.pricing.length === 0 && (
                      <p className="text-sm text-gray-500 italic">No pricing information added yet.</p>
                    )}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-4">Opening Hours</label>
                  <div className="space-y-3">
                    {Object.entries(businessForm.openingHours).map(([day, hours]) => (
                      <div key={day} className="flex items-center">
                        <label className="w-24 text-sm font-medium text-gray-700">{day}</label>
                        <input
                          type="text"
                          value={hours}
                          onChange={(e) => handleOpeningHoursChange(day, e.target.value)}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end space-x-4 pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowCreateModal(false)}
                  className="bg-transparent"
                >
                  Cancel
                </Button>
                <Button type="submit">
                  <Save className="w-4 h-4 mr-2" />
                  Create Business
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Edit Business Modal */}
      {showEditModal && business && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">Edit Business Listing</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveBusiness} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
                  <input
                    type="text"
                    required
                    value={businessForm.name}
                    onChange={(e) => handleFormChange("name", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    required
                    value={businessForm.category}
                    onChange={(e) => handleFormChange("category", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Category</option>
                    <option value="Technology">Technology</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Education">Education</option>
                    <option value="Hospitality">Hospitality</option>
                    <option value="Retail">Retail</option>
                    <option value="Construction">Construction</option>
                    <option value="Automotive">Automotive</option>
                    <option value="Beauty">Beauty</option>
                    <option value="Finance">Finance</option>
                    <option value="Legal">Legal</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subcategory</label>
                  <input
                    type="text"
                    required
                    value={businessForm.subcategory}
                    onChange={(e) => handleFormChange("subcategory", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Short Description</label>
                  <textarea
                    required
                    rows={2}
                    value={businessForm.description}
                    onChange={(e) => handleFormChange("description", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Description</label>
                  <textarea
                    required
                    rows={4}
                    value={businessForm.fullDescription}
                    onChange={(e) => handleFormChange("fullDescription", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    required
                    value={businessForm.location}
                    onChange={(e) => handleFormChange("location", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <input
                    type="text"
                    required
                    value={businessForm.address}
                    onChange={(e) => handleFormChange("address", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    required
                    value={businessForm.phone}
                    onChange={(e) => handleFormChange("phone", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={businessForm.email}
                    onChange={(e) => handleFormChange("email", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Website (optional)</label>
                  <input
                    type="url"
                    value={businessForm.website}
                    onChange={(e) => handleFormChange("website", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Main Image</label>
                  <div className="flex items-center space-x-4">
                    {businessForm.image && (
                      <img
                        src={businessForm.image || "/placeholder.svg"}
                        alt="Business preview"
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    )}
                    <div>
                      <input
                        type="file"
                        id="editMainImage"
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleImageUpload(e.target.files[0], "main")
                          }
                        }}
                        className="hidden"
                      />
                      <label
                        htmlFor="editMainImage"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors inline-flex items-center"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        {uploadingImage ? "Uploading..." : "Upload Image"}
                      </label>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gallery Images</label>
                  <div className="flex flex-wrap gap-4 mb-4">
                    {businessForm.gallery.map((img, index) => (
                      <div key={index} className="relative">
                        <img
                          src={img || "/placeholder.svg"}
                          alt={`Gallery ${index + 1}`}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveGalleryImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <input
                    type="file"
                    id="editGalleryImage"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleImageUpload(e.target.files[0], "gallery")
                      }
                    }}
                    className="hidden"
                  />
                  <label
                    htmlFor="editGalleryImage"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors inline-flex items-center"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {uploadingGallery ? "Uploading..." : "Add Gallery Image"}
                  </label>
                </div>
                <div className="md:col-span-2">
                  <div className="flex items-center justify-between mb-4">
                    <label className="block text-sm font-medium text-gray-700">Services Offered</label>
                    <button
                      type="button"
                      onClick={() => addArrayField("services")}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      + Add Service
                    </button>
                  </div>
                  <div className="space-y-3">
                    {businessForm.services.map((service, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={service}
                          onChange={(e) => handleArrayFieldChange("services", index, e.target.value)}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <button
                          type="button"
                          onClick={() => removeArrayField("services", index)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    {businessForm.services.length === 0 && (
                      <p className="text-sm text-gray-500 italic">No services added yet.</p>
                    )}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <div className="flex items-center justify-between mb-4">
                    <label className="block text-sm font-medium text-gray-700">Pricing</label>
                    <button
                      type="button"
                      onClick={addPricingField}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      + Add Pricing
                    </button>
                  </div>
                  <div className="space-y-4">
                    {businessForm.pricing.map((item, index) => (
                      <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Service</label>
                          <input
                            type="text"
                            value={item.service}
                            onChange={(e) => handlePricingChange(index, "service", e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                          <input
                            type="text"
                            value={item.price}
                            onChange={(e) => handlePricingChange(index, "price", e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div className="flex items-end space-x-2">
                          <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                            <input
                              type="text"
                              value={item.description}
                              onChange={(e) => handlePricingChange(index, "description", e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => removePricingField(index)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                    {businessForm.pricing.length === 0 && (
                      <p className="text-sm text-gray-500 italic">No pricing information added yet.</p>
                    )}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-4">Opening Hours</label>
                  <div className="space-y-3">
                    {Object.entries(businessForm.openingHours).map(([day, hours]) => (
                      <div key={day} className="flex items-center">
                        <label className="w-24 text-sm font-medium text-gray-700">{day}</label>
                        <input
                          type="text"
                          value={hours}
                          onChange={(e) => handleOpeningHoursChange(day, e.target.value)}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end space-x-4 pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowEditModal(false)}
                  className="bg-transparent"
                >
                  Cancel
                </Button>
                <Button type="submit">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default BusinessDashboard
