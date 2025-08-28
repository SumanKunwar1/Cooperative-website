"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import {
  UserIcon,
  ShoppingBag,
  Heart,
  Settings,
  LogOut,
  Package,
  Calendar,
  Eye,
  Mail,
  ChevronRight,
  Home,
  Phone,
  Save,
  Edit,
  Trash2,
  Star,
  X,
} from "lucide-react"
import { useAuth } from "../contexts/AuthContext"
import SEO from "../components/common/SEO"

interface Order {
  id: string
  date: string
  status: "delivered" | "shipped" | "processing" | "cancelled" | "in-cart"
  total: number
  items: number
  productName?: string
  productImage?: string
}

interface WishlistItem {
  id: string
  name: string
  price: number
  image: string
  inStock: boolean
}

interface Review {
  id: string
  orderId: string
  productName: string
  rating: number
  comment: string
  date: string
  productImage: string
}

interface CustomerUser {
  id: string
  businessName: string
  email: string
  phone?: string
  membershipType?: string
  joinedDate?: string
  role?: string
}

const CustomerDashboard: React.FC = () => {
  const { name } = useParams<{ name: string }>()
  const navigate = useNavigate()
  const { user, logout, isAuthenticated } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [selectedOrderForReview, setSelectedOrderForReview] = useState<Order | null>(null)
  const [reviewRating, setReviewRating] = useState(0)
  const [reviewComment, setReviewComment] = useState("")
  const [profileData, setProfileData] = useState<CustomerUser>(
    user || {
      id: "",
      businessName: "",
      email: "",
      phone: "",
      membershipType: "",
      joinedDate: "",
      role: "",
    },
  )

  const [recentOrders, setRecentOrders] = useState<Order[]>([
    { id: "ORD-001", date: "2024-01-20", status: "delivered", total: 2500, items: 2 },
    { id: "ORD-002", date: "2024-01-18", status: "shipped", total: 4500, items: 1 },
    { id: "ORD-003", date: "2024-01-15", status: "processing", total: 1200, items: 3 },
    { id: "ORD-004", date: "2024-01-12", status: "delivered", total: 3200, items: 1 },
  ])

  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate("/login")
      return
    }

    const expectedName = user.businessName.replace(/\s+/g, "-").toLowerCase()
    if (name && name !== expectedName) {
      navigate(`/dashboard/${expectedName}`)
      return
    }
  }, [isAuthenticated, user, name, navigate])

  useEffect(() => {
    const handleCartItemAdded = (event: CustomEvent) => {
      const orderItem = event.detail
      setRecentOrders((prev) => [orderItem, ...prev])
    }

    const handleOrderStatusUpdate = (event: CustomEvent) => {
      const { orderId, status } = event.detail
      setRecentOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status } : order)))
    }

    window.addEventListener("cartItemAdded", handleCartItemAdded as EventListener)
    window.addEventListener("orderStatusUpdate", handleOrderStatusUpdate as EventListener)

    return () => {
      window.removeEventListener("cartItemAdded", handleCartItemAdded as EventListener)
      window.removeEventListener("orderStatusUpdate", handleOrderStatusUpdate as EventListener)
    }
  }, [])

  const handleCheckoutComplete = (orderData: any) => {
    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      date: new Date().toISOString(),
      status: "processing",
      total: orderData.total,
      items: orderData.items.length,
      productName: orderData.items[0]?.name,
      productImage: orderData.items[0]?.image,
    }

    setRecentOrders((prev) => [newOrder, ...prev])

    // Remove in-cart items and convert to processing orders
    setRecentOrders((prev) =>
      prev.map((order) => (order.status === "in-cart" ? { ...order, status: "processing" as const } : order)),
    )
  }

  // Mock wishlist data
  const wishlistItems: WishlistItem[] = [
    {
      id: "1",
      name: "Premium Laptop Stand",
      price: 3500,
      image: "/placeholder.svg?height=80&width=80",
      inStock: true,
    },
    {
      id: "2",
      name: "Wireless Mouse",
      price: 1200,
      image: "/placeholder.svg?height=80&width=80",
      inStock: false,
    },
  ]

  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "REV-001",
      orderId: "ORD-001",
      productName: "Premium Laptop Stand",
      rating: 5,
      comment: "Excellent product! Very sturdy and well-built. Highly recommended.",
      date: "2024-01-22",
      productImage: "/placeholder.svg?height=60&width=60",
    },
    {
      id: "REV-002",
      orderId: "ORD-004",
      productName: "Wireless Keyboard",
      rating: 4,
      comment: "Good quality keyboard, but could be better for the price.",
      date: "2024-01-14",
      productImage: "/placeholder.svg?height=60&width=60",
    },
  ])

  const handleLogout = () => {
    if (confirm("Are you sure you want to log out?")) {
      logout()
      navigate("/")
    }
  }

  const handleProfileUpdate = () => {
    // Update profile logic here
    setIsEditingProfile(false)
    alert("Profile updated successfully")
  }

  const handleSubmitReview = () => {
    if (!selectedOrderForReview || reviewRating === 0) {
      alert("Please select a rating")
      return
    }

    const newReview: Review = {
      id: `REV-${Date.now()}`,
      orderId: selectedOrderForReview.id,
      productName: selectedOrderForReview.productName || "Product Name",
      rating: reviewRating,
      comment: reviewComment,
      date: new Date().toISOString().split("T")[0],
      productImage: selectedOrderForReview.productImage || "/placeholder.svg?height=60&width=60",
    }

    setReviews((prev) => [newReview, ...prev])
    setShowReviewModal(false)
    setSelectedOrderForReview(null)
    setReviewRating(0)
    setReviewComment("")
    alert("Review submitted successfully!")
  }

  const openReviewModal = (order: Order) => {
    setSelectedOrderForReview(order)
    setShowReviewModal(true)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "text-emerald-700 bg-emerald-50 border-emerald-200"
      case "shipped":
        return "text-blue-700 bg-blue-50 border-blue-200"
      case "processing":
        return "text-amber-700 bg-amber-50 border-amber-200"
      case "cancelled":
        return "text-red-700 bg-red-50 border-red-200"
      case "in-cart":
        return "text-purple-700 bg-purple-50 border-purple-200"
      default:
        return "text-gray-700 bg-gray-50 border-gray-200"
    }
  }

  const cartItemsCount = recentOrders.filter((order) => order.status === "in-cart").length
  const sidebarItems = [
    { id: "overview", label: "Overview", icon: Home },
    {
      id: "orders",
      label: "My Orders",
      icon: Package,
      badge: recentOrders.filter((o) => o.status !== "in-cart").length,
    },
    { id: "cart", label: "Cart Items", icon: ShoppingBag, badge: cartItemsCount },
    { id: "wishlist", label: "Wishlist", icon: Heart, badge: wishlistItems.length },
    { id: "reviews", label: "Reviews", icon: Star, badge: reviews.length },
    { id: "profile", label: "Profile", icon: UserIcon },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  if (!user) {
    return (
      <div className="min-h-screen pt-24 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 bg-gray-50">
      <SEO title={`Dashboard - ${user.businessName}`} description="Manage your account, orders, and preferences" />

      <div className="flex">
        <div className="w-64 bg-white shadow-lg min-h-screen">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center">
                <UserIcon className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{user.businessName}</h3>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            </div>
          </div>

          <nav className="p-4">
            <ul className="space-y-2">
              {sidebarItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === item.id
                        ? "bg-blue-600/10 text-blue-600 border border-blue-600/20"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon size={20} />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    {item.badge !== undefined && item.badge > 0 && (
                      <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full min-w-[20px] text-center">
                        {item.badge}
                      </span>
                    )}
                    <ChevronRight
                      size={16}
                      className={`transition-transform ${activeTab === item.id ? "rotate-90" : ""}`}
                    />
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-4 border-t border-gray-200">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut size={20} />
                <span className="font-medium">Log Out</span>
              </button>
            </div>
          </nav>
        </div>

        <div className="flex-1 p-8">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div>
                <div className="mb-8">
                  <h1 className="text-3xl font-serif text-gray-900 mb-2">Welcome back, {user.businessName}!</h1>
                  <p className="text-gray-700">Here's what's happening with your account</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Total Orders</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {recentOrders.filter((o) => o.status !== "in-cart").length}
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Package className="text-blue-600" size={24} />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Cart Items</p>
                        <p className="text-2xl font-bold text-gray-900">{cartItemsCount}</p>
                      </div>
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <ShoppingBag className="text-purple-600" size={24} />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Wishlist Items</p>
                        <p className="text-2xl font-bold text-gray-900">{wishlistItems.length}</p>
                      </div>
                      <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                        <Heart className="text-red-600" size={24} />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Reviews Written</p>
                        <p className="text-2xl font-bold text-gray-900">{reviews.length}</p>
                      </div>
                      <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <Star className="text-yellow-600" size={24} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-serif text-gray-900 mb-4">Recent Activity</h2>
                  {recentOrders.length === 0 ? (
                    <p className="text-center text-gray-600 py-8">No recent activity</p>
                  ) : (
                    recentOrders.slice(0, 5).map((order) => (
                      <div
                        key={order.id}
                        className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            {order.status === "in-cart" ? (
                              <ShoppingBag size={20} className="text-purple-600" />
                            ) : (
                              <Package size={20} className="text-gray-600" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {order.status === "in-cart" ? "Added to Cart" : order.id}
                            </p>
                            <p className="text-sm text-gray-600">
                              {order.productName || `${order.items} items`} •{" "}
                              {new Date(order.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}
                          >
                            {order.status === "in-cart" ? "In Cart" : order.status}
                          </span>
                          <p className="text-sm font-medium text-gray-900 mt-1">NPR {order.total.toLocaleString()}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {activeTab === "cart" && (
              <div>
                <div className="mb-6">
                  <h1 className="text-2xl font-serif text-gray-900 mb-2">Cart Items</h1>
                  <p className="text-gray-700">Items you've added to your cart</p>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  {cartItemsCount === 0 ? (
                    <div className="text-center py-12">
                      <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
                      <p className="text-xl text-gray-700 mb-2">Your cart is empty</p>
                      <p className="text-gray-500">Add some products to get started!</p>
                      <button
                        onClick={() => navigate("/shop")}
                        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Continue Shopping
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {recentOrders
                        .filter((order) => order.status === "in-cart")
                        .map((item) => (
                          <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden">
                            <div className="bg-purple-50 px-6 py-4 border-b border-purple-200">
                              <div className="flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                  <h3 className="font-semibold text-gray-900">{item.productName || "Product"}</h3>
                                  <span className="px-3 py-1 rounded-full text-sm font-medium text-purple-700 bg-purple-100">
                                    In Cart
                                  </span>
                                </div>
                                <div className="flex items-center gap-4">
                                  <span className="text-lg font-bold text-gray-900">
                                    NPR {item.total.toLocaleString()}
                                  </span>
                                  <button
                                    onClick={() => navigate("/cart")}
                                    className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                                  >
                                    <Eye size={16} />
                                    View Cart
                                  </button>
                                </div>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">
                                Added on {new Date(item.date).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        ))}

                      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                        <div>
                          <p className="text-lg font-semibold text-gray-900">
                            Total: NPR{" "}
                            {recentOrders
                              .filter((o) => o.status === "in-cart")
                              .reduce((sum, item) => sum + item.total, 0)
                              .toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-600">{cartItemsCount} items in cart</p>
                        </div>
                        <button
                          onClick={() => navigate("/checkout")}
                          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        >
                          Proceed to Checkout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div>
                <div className="mb-6">
                  <h1 className="text-2xl font-serif text-gray-900 mb-2">My Orders</h1>
                  <p className="text-gray-700">Track and manage your orders</p>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  {recentOrders.filter((order) => order.status !== "in-cart").length === 0 ? (
                    <div className="text-center py-12">
                      <Package size={64} className="mx-auto text-gray-300 mb-4" />
                      <p className="text-xl text-gray-700 mb-2">No orders found</p>
                      <p className="text-gray-500">Your order history will appear here</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {recentOrders
                        .filter((order) => order.status !== "in-cart")
                        .map((order) => (
                          <div key={order.id} className="border border-gray-200 rounded-lg overflow-hidden">
                            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                              <div className="flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                  <h3 className="font-semibold text-gray-900">Order #{order.id}</h3>
                                  <span
                                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}
                                  >
                                    {order.status}
                                  </span>
                                </div>
                                <div className="flex items-center gap-4">
                                  <span className="text-lg font-bold text-gray-900">
                                    NPR {order.total.toLocaleString()}
                                  </span>
                                  {order.status === "delivered" ? (
                                    <button
                                      onClick={() => openReviewModal(order)}
                                      className="flex items-center gap-2 px-3 py-1 bg-yellow-500/20 text-yellow-700 rounded hover:bg-yellow-500/30 text-sm"
                                    >
                                      <Star size={16} />
                                      Write Review
                                    </button>
                                  ) : (
                                    <button className="flex items-center gap-2 px-3 py-1 bg-blue-600/20 text-blue-600 rounded hover:bg-blue-600/30 text-sm">
                                      <Eye size={16} />
                                      View Details
                                    </button>
                                  )}
                                </div>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">
                                Placed on {new Date(order.date).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === "wishlist" && (
              <div>
                <div className="mb-6">
                  <h1 className="text-2xl font-serif text-gray-900 mb-2">My Wishlist</h1>
                  <p className="text-gray-700">Items you've saved for later</p>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  {wishlistItems.length === 0 ? (
                    <div className="text-center py-12">
                      <Heart size={64} className="mx-auto text-gray-300 mb-4" />
                      <p className="text-xl text-gray-700 mb-2">Your wishlist is empty</p>
                      <p className="text-gray-500">Add some items to get started!</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {wishlistItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-blue-600/30 transition-colors"
                        >
                          <img
                            src={item.image || "/placeholder.svg?height=80&width=80"}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                            <p className="text-blue-600 font-bold text-lg">NPR {item.price.toLocaleString()}</p>
                            <p className={`text-sm font-medium ${item.inStock ? "text-green-600" : "text-red-600"}`}>
                              {item.inStock ? "In Stock" : "Out of Stock"}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              disabled={!item.inStock}
                              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                            >
                              Add to Cart
                            </button>
                            <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div>
                <div className="mb-6">
                  <h1 className="text-2xl font-serif text-gray-900 mb-2">Profile Information</h1>
                  <p className="text-gray-700">Manage your personal information</p>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center">
                        <UserIcon className="text-blue-600" size={32} />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{user.businessName}</h3>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                    </div>
                    {!isEditingProfile ? (
                      <button
                        onClick={() => setIsEditingProfile(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600/20 text-blue-600 rounded-lg hover:bg-blue-600/30 transition-colors"
                      >
                        <Edit size={16} />
                        Edit Profile
                      </button>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={handleProfileUpdate}
                          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <Save size={16} />
                          Save Changes
                        </button>
                        <button
                          onClick={() => {
                            setIsEditingProfile(false)
                            setProfileData(user)
                          }}
                          className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">Business Name</label>
                        {isEditingProfile ? (
                          <input
                            type="text"
                            value={profileData.businessName || ""}
                            onChange={(e) => setProfileData((prev) => ({ ...prev, businessName: e.target.value }))}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                          />
                        ) : (
                          <div className="px-4 py-3 bg-gray-50 rounded-lg">
                            <p className="text-gray-900">{user.businessName}</p>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">Email Address</label>
                        <div className="px-4 py-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Mail size={16} className="text-gray-500" />
                            <p className="text-gray-900">{user.email}</p>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">Phone Number</label>
                        {isEditingProfile ? (
                          <input
                            type="tel"
                            value={profileData.phone || ""}
                            onChange={(e) => setProfileData((prev) => ({ ...prev, phone: e.target.value }))}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                          />
                        ) : (
                          <div className="px-4 py-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-2">
                              <Phone size={16} className="text-gray-500" />
                              <p className="text-gray-900">{user.phone || "Not provided"}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">Member Since</label>
                        <div className="px-4 py-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-gray-500" />
                            <p className="text-gray-900">
                              {user.joinedDate ? new Date(user.joinedDate).toLocaleDateString() : "N/A"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === "reviews" && (
              <div>
                <div className="mb-6">
                  <h1 className="text-2xl font-serif text-gray-900 mb-2">My Reviews</h1>
                  <p className="text-gray-700">Reviews you've written for products</p>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  {reviews.length === 0 ? (
                    <div className="text-center py-12">
                      <Star size={64} className="mx-auto text-gray-300 mb-4" />
                      <p className="text-xl text-gray-700 mb-2">No reviews yet</p>
                      <p className="text-gray-500">Write your first review after receiving an order!</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {reviews.map((review) => (
                        <div key={review.id} className="border border-gray-200 rounded-lg p-6">
                          <div className="flex items-start gap-4">
                            <img
                              src={review.productImage || "/placeholder.svg"}
                              alt={review.productName}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="font-semibold text-gray-900">{review.productName}</h3>
                                <span className="text-sm text-gray-500">
                                  {new Date(review.date).toLocaleDateString()}
                                </span>
                              </div>
                              <div className="flex items-center gap-1 mb-3">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    size={16}
                                    className={`${
                                      star <= review.rating ? "text-yellow-500 fill-current" : "text-gray-300"
                                    }`}
                                  />
                                ))}
                                <span className="text-sm text-gray-600 ml-2">{review.rating} out of 5 stars</span>
                              </div>
                              <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                              <p className="text-sm text-gray-500 mt-2">Order #{review.orderId}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div>
                <div className="mb-6">
                  <h1 className="text-2xl font-serif text-gray-900 mb-2">Account Settings</h1>
                  <p className="text-gray-700">Manage your account preferences and security</p>
                </div>

                <div className="space-y-6">
                  {/* Account Settings */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Preferences</h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <h3 className="font-medium text-gray-900">Email Notifications</h3>
                          <p className="text-sm text-gray-600">Receive updates about your orders and account</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-600/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <h3 className="font-medium text-gray-900">SMS Notifications</h3>
                          <p className="text-sm text-gray-600">Get text updates for order status</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-600/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <h3 className="font-medium text-gray-900">Marketing Emails</h3>
                          <p className="text-sm text-gray-600">Receive promotional offers and news</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-600/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Security Settings */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Security</h2>
                    <div className="space-y-4">
                      <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-600/30 transition-colors">
                        <div className="text-left">
                          <h3 className="font-medium text-gray-900">Change Password</h3>
                          <p className="text-sm text-gray-600">Update your account password</p>
                        </div>
                        <ChevronRight size={20} className="text-gray-400" />
                      </button>

                      <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-600/30 transition-colors">
                        <div className="text-left">
                          <h3 className="font-medium text-gray-900">Two-Factor Authentication</h3>
                          <p className="text-sm text-gray-600">Add an extra layer of security</p>
                        </div>
                        <ChevronRight size={20} className="text-gray-400" />
                      </button>
                    </div>
                  </div>

                  {/* Danger Zone */}
                  <div className="bg-white rounded-lg shadow-sm border border-red-200 p-6">
                    <h2 className="text-lg font-semibold text-red-600 mb-4">Danger Zone</h2>
                    <div className="space-y-4">
                      <button className="w-full flex items-center justify-between p-4 border border-red-200 rounded-lg hover:border-red-300 transition-colors">
                        <div className="text-left">
                          <h3 className="font-medium text-red-600">Delete Account</h3>
                          <p className="text-sm text-red-500">Permanently delete your account and all data</p>
                        </div>
                        <ChevronRight size={20} className="text-red-400" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Write a Review</h2>
              <button
                onClick={() => {
                  setShowReviewModal(false)
                  setSelectedOrderForReview(null)
                  setReviewRating(0)
                  setReviewComment("")
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Order #{selectedOrderForReview?.id}</p>
              <p className="font-medium text-gray-900">How would you rate this product?</p>
            </div>

            <div className="mb-4">
              <div className="flex items-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} onClick={() => setReviewRating(star)} className="focus:outline-none">
                    <Star
                      size={24}
                      className={`${
                        star <= reviewRating ? "text-yellow-500 fill-current" : "text-gray-300 hover:text-yellow-400"
                      } transition-colors`}
                    />
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-600">
                {reviewRating > 0 ? `${reviewRating} out of 5 stars` : "Click to rate"}
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-900 mb-2">Write your review (optional)</label>
              <textarea
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                placeholder="Share your experience with this product..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"
                rows={4}
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSubmitReview}
                disabled={reviewRating === 0}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Submit Review
              </button>
              <button
                onClick={() => {
                  setShowReviewModal(false)
                  setSelectedOrderForReview(null)
                  setReviewRating(0)
                  setReviewComment("")
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CustomerDashboard
