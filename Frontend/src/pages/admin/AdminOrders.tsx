"use client"

import { useState, useEffect } from "react"
import { Edit, Truck, Package, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import AdminDashboard from "./AdminDashboard"

interface OrderItem {
  productId: string
  productName: string
  productImage: string
  quantity: number
  price: number
}

interface Order {
  id: string
  userId: string
  customerName: string
  customerEmail: string
  items: OrderItem[]
  shippingAddress: {
    firstName: string
    lastName: string
    email: string
    phone: string
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  paymentMethod: "cod" | "paypal"
  subtotal: number
  deliveryCharge: number
  tax: number
  totalAmount: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  orderDate: string
  estimatedDelivery: string
}

const statusTabs = [
  { key: "pending", label: "Pending", icon: Package, color: "yellow" },
  { key: "processing", label: "Processing", icon: Edit, color: "blue" },
  { key: "shipped", label: "Shipped", icon: Truck, color: "purple" },
  { key: "delivered", label: "Delivered", icon: CheckCircle, color: "green" },
  { key: "cancelled", label: "Cancelled", icon: XCircle, color: "red" },
]

// Define the allowed status progression
const statusProgression: Record<string, string[]> = {
  pending: ["processing", "cancelled"],
  processing: ["shipped", "cancelled"],
  shipped: ["delivered"],
  delivered: [], // Final state
  cancelled: [], // Final state
}

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [activeTab, setActiveTab] = useState<string>("pending")
  const [isUpdating, setIsUpdating] = useState(false)
  const [updateSuccess, setUpdateSuccess] = useState<string | null>(null)
  const [pendingStatusChange, setPendingStatusChange] = useState<string | null>(null)

  useEffect(() => {
    const loadOrders = () => {
      try {
        const storedOrders = localStorage.getItem("adminOrders")
        if (storedOrders) {
          setOrders(JSON.parse(storedOrders))
        }
      } catch (error) {
        console.error("Error loading orders:", error)
      } finally {
        setLoading(false)
      }
    }

    loadOrders()

    // Listen for new orders from checkout
    const handleNewOrder = (event: CustomEvent) => {
      const newOrder = event.detail
      setOrders((prev) => {
        const updated = [...prev, newOrder]
        localStorage.setItem("adminOrders", JSON.stringify(updated))
        return updated
      })
    }

    window.addEventListener("orderPlaced", handleNewOrder as EventListener)
    return () => window.removeEventListener("orderPlaced", handleNewOrder as EventListener)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "processing":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "shipped":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Package size={16} />
      case "processing":
        return <Edit size={16} />
      case "shipped":
        return <Truck size={16} />
      case "delivered":
        return <CheckCircle size={16} />
      case "cancelled":
        return <XCircle size={16} />
      default:
        return <Package size={16} />
    }
  }

  const getTabColor = (status: string, isActive: boolean) => {
    if (!isActive) return "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"

    switch (status) {
      case "pending":
        return "border-yellow-500 text-yellow-600"
      case "processing":
        return "border-blue-500 text-blue-600"
      case "shipped":
        return "border-purple-500 text-purple-600"
      case "delivered":
        return "border-green-500 text-green-600"
      case "cancelled":
        return "border-red-500 text-red-600"
      default:
        return "border-gray-500 text-gray-600"
    }
  }

  const handleView = (order: Order) => {
    setSelectedOrder(order)
    setShowModal(true)
  }

  const confirmStatusUpdate = async (orderId: string, newStatus: string) => {
    setIsUpdating(true)
    setUpdateSuccess(null)

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      const updatedOrders = orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus as any } : order,
      )

      setOrders(updatedOrders)
      localStorage.setItem("adminOrders", JSON.stringify(updatedOrders))

      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus as any })
      }

      // Dispatch event to update customer dashboard
      window.dispatchEvent(
        new CustomEvent("orderStatusUpdated", {
          detail: { orderId, newStatus },
        }),
      )

      setPendingStatusChange(null)
      setUpdateSuccess(`Order ${orderId} status successfully updated to ${newStatus.toUpperCase()}`)
      setTimeout(() => setUpdateSuccess(null), 5000)
    } catch (error) {
      console.error("Error updating order status:", error)
      alert("Failed to update order status. Please try again.")
    } finally {
      setIsUpdating(false)
    }
  }

  // Filter orders based on active tab
  const filteredOrders = orders.filter((order) => order.status === activeTab)

  // Get count for each status
  const getStatusCount = (status: string) => {
    return orders.filter((order) => order.status === status).length
  }

  // Get allowed next statuses for current order
  const getAllowedStatuses = (currentStatus: string): string[] => {
    return statusProgression[currentStatus] || []
  }

  // Format customer name from shipping address
  const getCustomerName = (order: Order) => {
    return order.customerName || `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`
  }

  // Clear success message when modal closes
  useEffect(() => {
    if (!showModal) {
      setUpdateSuccess(null)
      setPendingStatusChange(null)
    }
  }, [showModal])

  if (loading) {
    return (
      <AdminDashboard currentSection="orders">
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </AdminDashboard>
    )
  }

  return (
    <AdminDashboard currentSection="orders">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Orders Management</h1>
            <p className="text-gray-600">Manage customer orders and update fulfillment status</p>
          </div>
          <div className="text-sm text-gray-500">Total Orders: {orders.length}</div>
        </div>

        {/* Status Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {statusTabs.map((tab) => {
              const count = getStatusCount(tab.key)
              const Icon = tab.icon
              const isActive = activeTab === tab.key

              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${getTabColor(tab.key, isActive)}`}
                >
                  <Icon size={16} className="mr-2" />
                  {tab.label}
                  <span
                    className={`ml-2 px-2 py-1 text-xs rounded-full ${
                      isActive ? getStatusColor(tab.key) : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Active Tab Content */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {getStatusIcon(activeTab)}
                <h2 className="ml-2 text-lg font-semibold text-gray-900">
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Orders ({filteredOrders.length})
                </h2>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(activeTab)}`}>
                {filteredOrders.length} {filteredOrders.length === 1 ? "order" : "orders"}
              </div>
            </div>
          </div>

          {/* Orders List */}
          <div className="p-6">
            {filteredOrders.length > 0 ? (
              <div className="space-y-4">
                {filteredOrders.map((order) => (
                  <div
                    key={order.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-4">
                          <div>
                            <h3 className="font-semibold text-gray-900">Order #{order.id}</h3>
                            <p className="text-sm text-gray-600">{getCustomerName(order)}</p>
                            <p className="text-sm text-gray-500">{order.customerEmail}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">${order.totalAmount.toFixed(2)}</p>
                            <p className="text-sm text-gray-500">{new Date(order.orderDate).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="mt-3 flex items-center gap-4">
                          <span
                            className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(order.status)}`}
                          >
                            {getStatusIcon(order.status)}
                            <span className="ml-1">{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
                          </span>
                          <span className="text-sm text-gray-500">
                            {order.items.length} {order.items.length === 1 ? "item" : "items"}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleView(order)}
                          className="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="flex justify-center mb-4 text-gray-400">{getStatusIcon(activeTab)}</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No {activeTab} orders</h3>
                <p className="text-gray-500">There are currently no orders with {activeTab} status.</p>
              </div>
            )}
          </div>
        </div>

        {/* Order Details Modal */}
        {showModal && selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">Order Details - {selectedOrder.id}</h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <XCircle size={24} />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Success Message */}
                {updateSuccess && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <CheckCircle className="text-green-600 mr-2" size={20} />
                      <p className="text-green-800 font-medium">{updateSuccess}</p>
                    </div>
                  </div>
                )}

                {/* Order Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Information</h3>
                    <div className="space-y-2">
                      <p>
                        <span className="font-medium">Name:</span> {getCustomerName(selectedOrder)}
                      </p>
                      <p>
                        <span className="font-medium">Email:</span> {selectedOrder.customerEmail}
                      </p>
                      <p>
                        <span className="font-medium">Phone:</span> {selectedOrder.shippingAddress.phone}
                      </p>
                      <p>
                        <span className="font-medium">Order Date:</span>{" "}
                        {new Date(selectedOrder.orderDate).toLocaleDateString()}
                      </p>
                      <p>
                        <span className="font-medium">Payment:</span> {selectedOrder.paymentMethod.toUpperCase()}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Order Status</h3>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <span
                          className={`inline-flex items-center px-3 py-1 text-sm font-semibold rounded-full border ${getStatusColor(selectedOrder.status)}`}
                        >
                          {getStatusIcon(selectedOrder.status)}
                          <span className="ml-2">
                            {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                          </span>
                        </span>
                      </div>

                      {/* Status Update Controls */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Update Status (Forward Only)
                        </label>
                        <div className="space-y-3">
                          <div className="flex gap-2">
                            <select
                              value={pendingStatusChange || selectedOrder.status}
                              onChange={(e) => setPendingStatusChange(e.target.value)}
                              disabled={isUpdating || getAllowedStatuses(selectedOrder.status).length === 0}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                            >
                              <option value={selectedOrder.status}>
                                {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)} (Current)
                              </option>
                              {getAllowedStatuses(selectedOrder.status).map((status) => (
                                <option key={status} value={status}>
                                  {status.charAt(0).toUpperCase() + status.slice(1)}
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* Show confirmation buttons when a new status is selected */}
                          {pendingStatusChange && pendingStatusChange !== selectedOrder.status && (
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-sm font-medium text-blue-800">
                                    Change status from "{selectedOrder.status}" to "{pendingStatusChange}"?
                                  </p>
                                  <p className="text-xs text-blue-600 mt-1">
                                    This action cannot be undone and will notify the customer.
                                  </p>
                                </div>
                                <div className="flex gap-2 ml-4">
                                  <button
                                    onClick={() => confirmStatusUpdate(selectedOrder.id, pendingStatusChange)}
                                    disabled={isUpdating}
                                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                                  >
                                    {isUpdating ? (
                                      <>
                                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                                        Updating...
                                      </>
                                    ) : (
                                      <>
                                        <CheckCircle size={14} />
                                        Confirm
                                      </>
                                    )}
                                  </button>
                                  <button
                                    onClick={() => setPendingStatusChange(null)}
                                    disabled={isUpdating}
                                    className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300 disabled:opacity-50"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}

                          {getAllowedStatuses(selectedOrder.status).length === 0 && (
                            <p className="text-sm text-gray-500 flex items-center">
                              <AlertCircle size={14} className="mr-1" />
                              This order has reached its final status
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Order Items</h3>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {selectedOrder.items.map((item, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                <img
                                  src={item.productImage || "/placeholder.svg?height=40&width=40"}
                                  alt={item.productName}
                                  className="w-10 h-10 rounded-lg object-cover mr-3"
                                />
                                <span className="text-sm text-gray-900">{item.productName}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.quantity}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              ${item.price.toFixed(2)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              ${(item.quantity * item.price).toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Order Summary */}
                  <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal:</span>
                        <span>${selectedOrder.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Delivery:</span>
                        <span>${selectedOrder.deliveryCharge.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Tax:</span>
                        <span>${selectedOrder.tax.toFixed(2)}</span>
                      </div>
                      <div className="border-t border-gray-200 pt-2">
                        <div className="flex justify-between font-semibold">
                          <span>Total:</span>
                          <span>${selectedOrder.totalAmount.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Shipping Information */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Shipping Information</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Shipping Address:</p>
                        <p className="text-sm text-gray-900 mt-1">
                          {selectedOrder.shippingAddress.street}
                          <br />
                          {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state}{" "}
                          {selectedOrder.shippingAddress.zipCode}
                          <br />
                          {selectedOrder.shippingAddress.country}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Estimated Delivery:</p>
                        <p className="text-sm text-gray-900 mt-1">
                          {new Date(selectedOrder.estimatedDelivery).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminDashboard>
  )
}

export default AdminOrders
