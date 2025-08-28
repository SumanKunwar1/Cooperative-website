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
  ImageIcon,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react"
import { useAuth } from "../contexts/AuthContext"
import SEO from "../components/common/SEO"
import Card from "../components/ui/Card"
import Button from "../components/ui/Button"
import type { Business } from "../types/business"

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

  const [businessForm, setBusinessForm] = useState<Partial<Business>>({
    businessName: "",
    category: "",
    subcategory: "",
    description: "",
    fullDescription: "",
    image: "",
    gallery: [],
    rating: 0,
    reviews: 0,
    location: "",
    address: "",
    phone: "",
    email: "",
    website: "",
    services: [],
    isVerified: false,
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

  const loadBusinessData = () => {
    // Mock data - in real app, fetch from API based on user
    const mockBusiness: Business = {
      id: "1",
      businessName: "TechSolutions Nepal",
      category: "Technology",
      subcategory: "IT Services",
      description: "Professional IT consulting and software development services for businesses.",
      fullDescription:
        "TechSolutions Nepal is a leading IT consulting firm established in 2015, specializing in custom software development, web applications, mobile apps, and digital transformation solutions.",
      image: "/placeholder.svg?height=400&width=600",
      gallery: [
        "/placeholder.svg?height=300&width=400",
        "/placeholder.svg?height=300&width=400",
        "/placeholder.svg?height=300&width=400",
      ],
      rating: 4.8,
      reviews: 45,
      location: "Kathmandu, Nepal",
      address: "Putalisadak, Kathmandu 44600, Nepal",
      phone: "01-4567890",
      email: "info@techsolutions.com.np",
      website: "www.techsolutions.com.np",
      services: ["Web Development", "Mobile Apps", "IT Consulting", "Cloud Services"],
      isVerified: true,
      openingHours: {
        Monday: "9:00 AM - 6:00 PM",
        Tuesday: "9:00 AM - 6:00 PM",
        Wednesday: "9:00 AM - 6:00 PM",
        Thursday: "9:00 AM - 6:00 PM",
        Friday: "9:00 AM - 6:00 PM",
        Saturday: "10:00 AM - 4:00 PM",
        Sunday: "Closed",
      },
      features: ["Free Consultation", "24/7 Support", "Agile Development", "Quality Assurance"],
      pricing: [
        {
          service: "Website Development",
          price: "Starting from NPR 50,000",
          description: "Custom responsive websites with modern design",
        },
        {
          service: "Mobile App Development",
          price: "Starting from NPR 150,000",
          description: "Native and cross-platform mobile applications",
        },
        {
          service: "IT Consulting",
          price: "NPR 2,000/hour",
          description: "Expert advice on technology strategy and implementation",
        },
      ],
    }
    setBusiness(mockBusiness)
  }

  const loadBookings = () => {
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
      businessName: "",
      category: "",
      subcategory: "",
      description: "",
      fullDescription: "",
      image: "",
      gallery: [],
      rating: 0,
      reviews: 0,
      location: "",
      address: "",
      phone: "",
      email: "",
      website: "",
      services: [],
      isVerified: false,
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
      setBusinessForm(business)
      setShowEditModal(true)
    }
  }

  const handleDeleteBusiness = () => {
    if (window.confirm("Are you sure you want to delete your business? This action cannot be undone.")) {
      setBusiness(null)
    }
  }

  const handleSaveBusiness = (e: React.FormEvent) => {
    e.preventDefault()

    if (showCreateModal) {
      // Create new business
      const newBusiness: Business = {
        ...(businessForm as Business),
        id: Date.now().toString(),
        rating: 0,
        reviews: 0,
        isVerified: false,
      }
      setBusiness(newBusiness)
      setShowCreateModal(false)
    } else if (showEditModal) {
      // Update existing business
      const updatedBusiness: Business = {
        ...(businessForm as Business),
        id: business?.id || Date.now().toString(),
      }
      setBusiness(updatedBusiness)
      setShowEditModal(false)
    }

    setBusinessForm({})
  }

  const handleImageUpload = async (file: File, type: "main" | "gallery") => {
    if (type === "main") {
      setUploadingImage(true)
    } else {
      setUploadingGallery(true)
    }

    try {
      // Simulate upload - in real app, upload to cloud storage
      const imageUrl = URL.createObjectURL(file)

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
    } finally {
      if (type === "main") {
        setUploadingImage(false)
      } else {
        setUploadingGallery(false)
      }
    }
  }

  const handleBookingStatusUpdate = (bookingId: string, newStatus: Booking["status"]) => {
    setBookings((prev) =>
      prev.map((booking) => (booking.id === bookingId ? { ...booking, status: newStatus } : booking)),
    )
  }

  const handleFormChange = (field: string, value: any) => {
    setBusinessForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleArrayFieldChange = (field: string, index: number, value: string) => {
    const currentArray = (businessForm[field as keyof Business] as string[]) || []
    const newArray = [...currentArray]
    newArray[index] = value
    setBusinessForm((prev) => ({ ...prev, [field]: newArray }))
  }

  const addArrayField = (field: string) => {
    const currentArray = (businessForm[field as keyof Business] as string[]) || []
    setBusinessForm((prev) => ({ ...prev, [field]: [...currentArray, ""] }))
  }

  const removeArrayField = (field: string, index: number) => {
    const currentArray = (businessForm[field as keyof Business] as string[]) || []
    const newArray = currentArray.filter((_, i) => i !== index)
    setBusinessForm((prev) => ({ ...prev, [field]: newArray }))
  }

  const handlePricingChange = (index: number, field: keyof Business["pricing"][0], value: string) => {
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
        Monday: prev.openingHours?.Monday || "",
        Tuesday: prev.openingHours?.Tuesday || "",
        Wednesday: prev.openingHours?.Wednesday || "",
        Thursday: prev.openingHours?.Thursday || "",
        Friday: prev.openingHours?.Friday || "",
        Saturday: prev.openingHours?.Saturday || "",
        Sunday: prev.openingHours?.Sunday || "",
        [day]: hours,
      } as Business["openingHours"],
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

  const tabs = [
    { id: "overview", label: "Overview", icon: TrendingUp },
    { id: "business", label: "My Business", icon: Building2 },
    { id: "bookings", label: "Bookings", icon: Calendar },
    { id: "profile", label: "Profile", icon: Settings },
  ]

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
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
                          onClick={() => window.open(`/business-directory/${business.id}`, "_blank")}
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
                            <h3 className="text-xl font-bold text-gray-900 mb-1">{business.businessName}</h3>
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
                          <div className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</div>
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
                        <label className="block text-sm font-medium text-gray-700 mb-2">Member Since</label>
                        <input
                          type="text"
                          value={user.joinedDate ? new Date(user.joinedDate).toLocaleDateString() : ""}
                          disabled
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-500"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button>Update Profile</Button>
                    </div>
                  </div>
                </Card>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Create/Edit Business Modal */}
      {(showCreateModal || showEditModal) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  {showCreateModal ? "Create Your Business Listing" : "Edit Business Listing"}
                </h3>
                <button
                  onClick={() => {
                    setShowCreateModal(false)
                    setShowEditModal(false)
                    setBusinessForm({})
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSaveBusiness} className="space-y-8">
                {/* Basic Information */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Business Name *</label>
                      <input
                        type="text"
                        required
                        value={businessForm.businessName || ""}
                        onChange={(e) => handleFormChange("name", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                      <select
                        required
                        value={businessForm.category || ""}
                        onChange={(e) => handleFormChange("category", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select Category</option>
                        <option value="Technology">Technology</option>
                        <option value="Food & Beverage">Food & Beverage</option>
                        <option value="Hospitality">Hospitality</option>
                        <option value="Home Services">Home Services</option>
                        <option value="Retail">Retail</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Education">Education</option>
                        <option value="Finance">Finance</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Subcategory</label>
                      <input
                        type="text"
                        value={businessForm.subcategory || ""}
                        onChange={(e) => handleFormChange("subcategory", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., IT Services, Restaurant, Hotel"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                      <input
                        type="text"
                        required
                        value={businessForm.location || ""}
                        onChange={(e) => handleFormChange("location", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., Kathmandu, Nepal"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Short Description *</label>
                    <textarea
                      required
                      rows={3}
                      value={businessForm.description || ""}
                      onChange={(e) => handleFormChange("description", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Brief description of your business (max 200 characters)"
                      maxLength={200}
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Description</label>
                    <textarea
                      rows={5}
                      value={businessForm.fullDescription || ""}
                      onChange={(e) => handleFormChange("fullDescription", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Detailed description of your business, services, and what makes you unique"
                    />
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Images</h4>

                  {/* Main Business Image */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Main Business Image</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                      {businessForm.image ? (
                        <div className="relative">
                          <img
                            src={businessForm.image || "/placeholder.svg"}
                            alt="Business"
                            className="w-full h-48 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => handleFormChange("image", "")}
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="text-center">
                          <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <div className="flex flex-col items-center">
                            <label className="cursor-pointer">
                              <span className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                {uploadingImage ? "Uploading..." : "Upload Image"}
                              </span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0]
                                  if (file) handleImageUpload(file, "main")
                                }}
                                disabled={uploadingImage}
                              />
                            </label>
                            <p className="text-sm text-gray-500 mt-2">PNG, JPG up to 5MB</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Gallery Images */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Gallery Images</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                      {(businessForm.gallery || []).map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Gallery ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newGallery = (businessForm.gallery || []).filter((_, i) => i !== index)
                              handleFormChange("gallery", newGallery)
                            }}
                            className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center h-32">
                        <label className="cursor-pointer text-center">
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <span className="text-sm text-blue-600 hover:text-blue-700">
                            {uploadingGallery ? "Uploading..." : "Add Image"}
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0]
                              if (file) handleImageUpload(file, "gallery")
                            }}
                            disabled={uploadingGallery}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                      <input
                        type="tel"
                        required
                        value={businessForm.phone || ""}
                        onChange={(e) => handleFormChange("phone", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="01-1234567"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                      <input
                        type="email"
                        required
                        value={businessForm.email || ""}
                        onChange={(e) => handleFormChange("email", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="info@yourbusiness.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                      <input
                        type="url"
                        value={businessForm.website || ""}
                        onChange={(e) => handleFormChange("website", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="www.yourbusiness.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
                      <input
                        type="text"
                        required
                        value={businessForm.address || ""}
                        onChange={(e) => handleFormChange("address", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Street address, City, Postal Code"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Opening Hours</h4>
                  <div className="space-y-3">
                    {Object.entries(businessForm.openingHours || {}).map(([day, hours]) => (
                      <div key={day} className="flex items-center gap-4">
                        <div className="w-24 text-sm font-medium text-gray-700">{day}</div>
                        <input
                          type="text"
                          value={hours}
                          onChange={(e) => handleOpeningHoursChange(day, e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="9:00 AM - 6:00 PM or Closed"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Services */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Services</h4>
                  <div className="space-y-2">
                    {(businessForm.services || []).map((service, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={service}
                          onChange={(e) => handleArrayFieldChange("services", index, e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Service name"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeArrayField("services", index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => addArrayField("services")}
                      className="w-full"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Service
                    </Button>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Services & Pricing</h4>
                  <div className="space-y-4">
                    {(businessForm.pricing || []).map((pricing, index) => (
                      <div key={index} className="p-4 border border-gray-200 rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Service Name</label>
                            <input
                              type="text"
                              value={pricing.service}
                              onChange={(e) => handlePricingChange(index, "service", e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="e.g., Website Development"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                            <input
                              type="text"
                              value={pricing.price}
                              onChange={(e) => handlePricingChange(index, "price", e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="e.g., Starting from NPR 50,000"
                            />
                          </div>
                        </div>
                        <div className="mb-3">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                          <textarea
                            rows={2}
                            value={pricing.description}
                            onChange={(e) => handlePricingChange(index, "description", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Brief description of the service"
                          />
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removePricingField(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button type="button" variant="outline" onClick={addPricingField} className="w-full bg-transparent">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Service & Pricing
                    </Button>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Features</h4>
                  <div className="space-y-2">
                    {(businessForm.features || []).map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) => handleArrayFieldChange("features", index, e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="e.g., Free Consultation, 24/7 Support"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeArrayField("features", index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => addArrayField("features")}
                      className="w-full"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Feature
                    </Button>
                  </div>
                </div>

                <div className="flex gap-4 pt-6 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowCreateModal(false)
                      setShowEditModal(false)
                      setBusinessForm({})
                    }}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1">
                    <Save className="w-4 h-4 mr-2" />
                    {showCreateModal ? "Create Business Listing" : "Update Business Listing"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BusinessDashboard
