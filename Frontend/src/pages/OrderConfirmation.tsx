"use client"

import type React from "react"
import { Link, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { CheckCircle, Package, Truck, Mail, Calendar, ArrowRight, Download, Share2 } from "lucide-react"
import SEO from "../components/common/SEO"
import Card from "../components/ui/Card"
import Button from "../components/ui/Button"

const OrderConfirmation: React.FC = () => {
  const location = useLocation()
  const { orderNumber, orderData } = location.state || {}

  // Mock order data if not provided
  const order = orderData || {
    items: [
      { name: "Premium Wireless Headphones", quantity: 1, price: 2500 },
      { name: "Smart Fitness Watch", quantity: 2, price: 4500 },
    ],
    subtotal: 11500,
    shipping: 0,
    tax: 1495,
    total: 12995,
  }

  const orderNum = orderNumber || "ORD-" + Date.now()
  const estimatedDelivery = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString()

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO title="Order Confirmation" description="Your order has been successfully placed" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-8"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600 text-lg">Thank you for your purchase. Your order has been successfully placed.</p>
        </motion.div>

        {/* Order Details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
        >
          {/* Order Summary */}
          <Card>
            <div className="flex items-center mb-4">
              <Package className="w-5 h-5 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Order Summary</h3>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="font-medium text-gray-900">Order Number:</span>
                <span className="text-blue-600 font-mono">{orderNum}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-900">Order Date:</span>
                <span className="text-gray-600">{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-900">Payment Status:</span>
                <span className="text-green-600 font-medium">Paid</span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h4 className="font-medium text-gray-900 mb-3">Items Ordered</h4>
              <div className="space-y-2">
                {order.items.map((item: any, index: number) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>NPR {(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>NPR {order.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>{order.shipping === 0 ? "Free" : `NPR ${order.shipping.toLocaleString()}`}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>NPR {order.tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span className="text-blue-600">NPR {order.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Delivery Information */}
          <Card>
            <div className="flex items-center mb-4">
              <Truck className="w-5 h-5 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Delivery Information</h3>
            </div>

            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Calendar className="w-4 h-4 text-blue-600 mr-2" />
                  <span className="font-medium text-blue-900">Estimated Delivery</span>
                </div>
                <p className="text-blue-800 font-semibold">{estimatedDelivery}</p>
                <p className="text-blue-700 text-sm mt-1">3-5 business days</p>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Shipping Address</h4>
                <div className="text-gray-600 text-sm">
                  <p>John Doe</p>
                  <p>123 Main Street</p>
                  <p>Kathmandu, 44600</p>
                  <p>Nepal</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Tracking Information</h4>
                <p className="text-sm text-gray-600 mb-2">
                  You'll receive a tracking number via email once your order ships.
                </p>
                <div className="flex items-center text-sm text-blue-600">
                  <Mail className="w-4 h-4 mr-1" />
                  <span>Confirmation sent to your email</span>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Order Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Order Status</h3>
            <div className="flex items-center justify-between">
              {[
                { step: "Order Placed", icon: CheckCircle, completed: true, current: false },
                { step: "Processing", icon: Package, completed: false, current: true },
                { step: "Shipped", icon: Truck, completed: false, current: false },
                { step: "Delivered", icon: CheckCircle, completed: false, current: false },
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                      item.completed
                        ? "bg-green-100 text-green-600"
                        : item.current
                          ? "bg-blue-100 text-blue-600"
                          : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      item.completed || item.current ? "text-gray-900" : "text-gray-400"
                    }`}
                  >
                    {item.step}
                  </span>
                  {index < 3 && (
                    <div
                      className={`absolute h-0.5 w-full mt-5 ${item.completed ? "bg-green-600" : "bg-gray-200"}`}
                      style={{ left: "50%", width: "calc(100% - 2.5rem)" }}
                    />
                  )}
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/customer-dashboard">
            <Button icon={ArrowRight} iconPosition="right">
              View Order History
            </Button>
          </Link>

          <Button variant="outline" icon={Download}>
            Download Receipt
          </Button>

          <Button variant="outline" icon={Share2}>
            Share Order
          </Button>

          <Link to="/shop">
            <Button variant="outline">Continue Shopping</Button>
          </Link>
        </motion.div>

        {/* Support Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <Card className="bg-blue-50 border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Need Help?</h3>
            <p className="text-blue-800 mb-4">
              If you have any questions about your order, our customer support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-100 bg-transparent">
                Contact Support
              </Button>
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-100 bg-transparent">
                Track Your Order
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default OrderConfirmation
