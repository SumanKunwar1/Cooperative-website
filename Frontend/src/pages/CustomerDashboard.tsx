"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { motion } from "framer-motion"
import {
  User,
  ShoppingBag,
  Heart,
  CreditCard,
  Bell,
  Settings,
  LogOut,
  Package,
  Calendar,
  TrendingUp,
  Eye,
  Mail,
  Award,
  Clock,
} from "lucide-react"
import { useAuth } from "../contexts/AuthContext"
import SEO from "../components/common/SEO"
import Card from "../components/ui/Card"
import Button from "../components/ui/Button"

interface Order {
  id: string
  date: string
  status: "delivered" | "shipped" | "processing" | "cancelled"
  total: number
  items: number
}

interface WishlistItem {
  id: string
  name: string
  price: number
  image: string
  inStock: boolean
}

const CustomerDashboard: React.FC = () => {
  const { email } = useParams<{ email: string }>()
  const navigate = useNavigate()
  const { user, logout, isAuthenticated } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate("/login")
      return
    }

    // Validate that the URL email matches the logged-in user's email
    if (email && email !== encodeURIComponent(user.email)) {
      navigate(`/dashboard/${encodeURIComponent(user.email)}`)
      return
    }
  }, [isAuthenticated, user, email, navigate])

  // Mock orders data
  const recentOrders: Order[] = [
    { id: "ORD-001", date: "2024-01-20", status: "delivered", total: 2500, items: 2 },
    { id: "ORD-002", date: "2024-01-18", status: "shipped", total: 4500, items: 1 },
    { id: "ORD-003", date: "2024-01-15", status: "processing", total: 1200, items: 3 },
    { id: "ORD-004", date: "2024-01-12", status: "delivered", total: 3200, items: 1 },
  ]

  // Mock wishlist data
  const wishlistItems: WishlistItem[] = [
    {
      id: "1",
      name: "Premium Laptop Stand",
      price: 3500,
      image: "/laptop-stand.png",
      inStock: true,
    },
    {
      id: "2",
      name: "Wireless Mouse",
      price: 1200,
      image: "/wireless-mouse.png",
      inStock: false,
    },
  ]

  const handleLogout = () => {
    logout()
    navigate("/")
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
      default:
        return "text-gray-700 bg-gray-50 border-gray-200"
    }
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: TrendingUp },
    { id: "orders", label: "Orders", icon: ShoppingBag },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "profile", label: "Profile", icon: User },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO title={`Dashboard - ${user.name}`} description="Manage your account, orders, and preferences" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xl font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Welcome back, {user.name}!</h1>
                  <p className="text-muted-foreground mt-1 flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    {user.email}
                  </p>
                  <p className="text-sm text-muted-foreground flex items-center mt-1">
                    <Clock className="w-4 h-4 mr-2" />
                    Member since {new Date(user.joinedDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted">
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
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
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
                    <Card className="p-6 border-l-4 border-l-primary">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground font-medium">Total Orders</p>
                          <p className="text-3xl font-bold text-foreground mt-1">24</p>
                          <p className="text-xs text-emerald-600 mt-1">+3 this month</p>
                        </div>
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <ShoppingBag className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                    </Card>

                    <Card className="p-6 border-l-4 border-l-emerald-500">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground font-medium">Total Spent</p>
                          <p className="text-3xl font-bold text-foreground mt-1">NPR 45,600</p>
                          <p className="text-xs text-emerald-600 mt-1">+12% from last month</p>
                        </div>
                        <div className="p-3 bg-emerald-100 rounded-lg">
                          <CreditCard className="w-6 h-6 text-emerald-600" />
                        </div>
                      </div>
                    </Card>

                    <Card className="p-6 border-l-4 border-l-amber-500">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground font-medium">Loyalty Points</p>
                          <p className="text-3xl font-bold text-foreground mt-1">1,250</p>
                          <p className="text-xs text-amber-600 mt-1">Expires in 6 months</p>
                        </div>
                        <div className="p-3 bg-amber-100 rounded-lg">
                          <Award className="w-6 h-6 text-amber-600" />
                        </div>
                      </div>
                    </Card>
                  </div>

                  <Card className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-semibold text-foreground">Recent Orders</h3>
                      <Button variant="outline" size="sm" onClick={() => setActiveTab("orders")}>
                        View All Orders
                      </Button>
                    </div>
                    <div className="space-y-4">
                      {recentOrders.slice(0, 3).map((order) => (
                        <div
                          key={order.id}
                          className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-border"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="p-2 bg-primary/10 rounded-lg">
                              <Package className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-semibold text-foreground">{order.id}</p>
                              <p className="text-sm text-muted-foreground flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {order.date} • {order.items} items
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-foreground">NPR {order.total.toLocaleString()}</p>
                            <span
                              className={`inline-block px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(order.status)}`}
                            >
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === "orders" && (
                <Card className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-6">Order History</h3>
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div
                        key={order.id}
                        className="border border-border rounded-lg p-6 hover:shadow-sm transition-shadow"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <h4 className="font-semibold text-foreground text-lg">{order.id}</h4>
                            <span
                              className={`inline-block px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(order.status)}`}
                            >
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </div>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                        </div>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center space-x-6">
                            <span className="flex items-center">
                              <Calendar className="w-4 h-4 mr-2" />
                              {order.date}
                            </span>
                            <span className="flex items-center">
                              <Package className="w-4 h-4 mr-2" />
                              {order.items} items
                            </span>
                          </div>
                          <span className="font-semibold text-foreground text-lg">
                            NPR {order.total.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Wishlist Tab */}
              {activeTab === "wishlist" && (
                <Card className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-6">My Wishlist</h3>
                  {wishlistItems.length > 0 ? (
                    <div className="space-y-4">
                      {wishlistItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center space-x-4 p-4 border border-border rounded-lg hover:shadow-sm transition-shadow"
                        >
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-lg border border-border"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground text-lg">{item.name}</h4>
                            <p className="text-xl font-bold text-primary">NPR {item.price.toLocaleString()}</p>
                            <p className={`text-sm font-medium ${item.inStock ? "text-emerald-600" : "text-red-600"}`}>
                              {item.inStock ? "In Stock" : "Out of Stock"}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" disabled={!item.inStock}>
                              Add to Cart
                            </Button>
                            <Button variant="outline" size="sm">
                              Remove
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground text-lg">Your wishlist is empty</p>
                      <Link to="/shop">
                        <Button className="mt-4">Browse Products</Button>
                      </Link>
                    </div>
                  )}
                </Card>
              )}

              {/* Profile Tab */}
              {activeTab === "profile" && (
                <Card className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-6">Profile Information</h3>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                        <input
                          type="text"
                          defaultValue={user.name}
                          className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-input"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                        <input
                          type="email"
                          defaultValue={user.email}
                          className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-input"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                        <input
                          type="tel"
                          defaultValue={user.phone}
                          className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-input"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Member Since</label>
                        <input
                          type="text"
                          value={new Date(user.joinedDate).toLocaleDateString()}
                          disabled
                          className="w-full px-4 py-3 border border-border rounded-lg bg-muted text-muted-foreground"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button>Update Profile</Button>
                    </div>
                  </div>
                </Card>
              )}

              {/* Settings Tab */}
              {activeTab === "settings" && (
                <div className="space-y-6">
                  <Card className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-6">Account Settings</h3>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <h4 className="font-medium text-foreground">Email Notifications</h4>
                          <p className="text-sm text-muted-foreground">Receive updates about your orders</p>
                        </div>
                        <input
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
                        />
                      </div>
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <h4 className="font-medium text-foreground">SMS Notifications</h4>
                          <p className="text-sm text-muted-foreground">Get text updates for important events</p>
                        </div>
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
                        />
                      </div>
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <h4 className="font-medium text-foreground">Marketing Emails</h4>
                          <p className="text-sm text-muted-foreground">Receive promotional offers and news</p>
                        </div>
                        <input
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
                        />
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-6">Security</h3>
                    <div className="space-y-4">
                      <Button variant="outline" fullWidth className="justify-start bg-transparent">
                        Change Password
                      </Button>
                      <Button variant="outline" fullWidth className="justify-start bg-transparent">
                        Two-Factor Authentication
                      </Button>
                      <Button
                        variant="outline"
                        fullWidth
                        className="justify-start text-destructive border-destructive hover:bg-destructive/10 bg-transparent"
                      >
                        Delete Account
                      </Button>
                    </div>
                  </Card>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomerDashboard
