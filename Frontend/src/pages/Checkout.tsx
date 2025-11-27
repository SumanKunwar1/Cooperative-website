"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import {
  CreditCard,
  MapPin,
  User,
  Phone,
  Mail,
  Lock,
  ArrowLeft,
  ArrowRight,
  Truck,
  Shield,
  Banknote,
  Smartphone,
} from "lucide-react"
import { useAuth } from "../contexts/AuthContext"
import SEO from "../components/common/SEO"
import Card from "../components/ui/Card"
import Button from "../components/ui/Button"

interface CheckoutFormData {
  // Shipping Information
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  postalCode: string

  // Payment Information
  paymentMethod: "card" | "cod" | "esewa"
  cardNumber: string
  expiryDate: string
  cvv: string
  cardName: string
  esewaId: string

  // Options
  saveInfo: boolean
  sameAsBilling: boolean
}

const Checkout: React.FC = () => {
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth()
  const [currentStep, setCurrentStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    if (!isAuthenticated || !user) {
      const shouldLogin = window.confirm("You need to login to proceed with checkout. Would you like to login now?")
      if (shouldLogin) {
        localStorage.setItem("redirectAfterLogin", "/checkout")
        navigate("/login")
        return
      } else {
        navigate("/cart")
        return
      }
    }
  }, [isAuthenticated, user, navigate])

  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: "",
    lastName: "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: "",
    city: "",
    postalCode: "",
    paymentMethod: "card",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
    esewaId: "",
    saveInfo: false,
    sameAsBilling: true,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handlePaymentMethodChange = (method: "card" | "cod" | "esewa") => {
    setFormData((prev) => ({
      ...prev,
      paymentMethod: method,
    }))
  }

  const handleSubmitOrder = async () => {
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)

      const orderData = {
        orderNumber: "ORD-" + Date.now(),
        total: orderSummary.total,
        items: orderSummary.items,
        status: "processing",
      }

      window.dispatchEvent(new CustomEvent("orderCompleted", { detail: orderData }))

      navigate("/order-confirmation", {
        state: {
          orderNumber: orderData.orderNumber,
          orderData: orderSummary,
        },
      })
    }, 3000)
  }

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3))
  }

  const steps = [
    { id: 1, name: "Shipping", icon: Truck },
    { id: 2, name: "Payment", icon: CreditCard },
    { id: 3, name: "Review", icon: Shield },
  ]

  const orderSummary = {
    items: [
      { name: "Premium Wireless Headphones", quantity: 1, price: 2500 },
      { name: "Smart Fitness Watch", quantity: 2, price: 4500 },
    ],
    subtotal: 11500,
    shipping: 0,
    tax: 1495,
    total: 12995,
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO title="Checkout" description="Complete your purchase securely" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
            <button
              onClick={() => navigate("/cart")}
              className="flex items-center text-green-600 hover:text-green-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Cart
            </button>
          </div>
        </motion.div>

        {/* Progress Steps */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center justify-center">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep >= step.id ? "bg-green-600 border-green-600 text-white" : "border-gray-300 text-gray-400"
                  }`}
                >
                  <step.icon className="w-5 h-5" />
                </div>
                <span
                  className={`ml-2 text-sm font-medium ${currentStep >= step.id ? "text-green-600" : "text-gray-400"}`}
                >
                  {step.name}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${currentStep > step.id ? "bg-green-600" : "bg-gray-300"}`} />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                {/* Step 1: Shipping Information */}
                {currentStep === 1 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Shipping Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                        <div className="relative">
                          <User className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                            placeholder="Enter first name"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                          placeholder="Enter last name"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <div className="relative">
                          <Mail className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                            placeholder="Enter email"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                        <div className="relative">
                          <Phone className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                            placeholder="+977-98XXXXXXXX"
                            required
                          />
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                        <div className="relative">
                          <MapPin className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                          <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                            placeholder="Enter full address"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                          placeholder="Enter city"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
                        <input
                          type="text"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                          placeholder="Enter postal code"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Payment Information */}
                {currentStep === 2 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Payment Information</h3>

                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-4">Select Payment Method</label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Card Payment */}
                        <div
                          onClick={() => handlePaymentMethodChange("card")}
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            formData.paymentMethod === "card"
                              ? "border-green-500 bg-green-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className="flex items-center justify-center mb-2">
                            <CreditCard className="w-8 h-8 text-green-600" />
                          </div>
                          <h4 className="text-center font-medium text-gray-900">Card Payment</h4>
                          <p className="text-center text-sm text-gray-600 mt-1">Pay with credit/debit card</p>
                        </div>

                        {/* Cash on Delivery */}
                        <div
                          onClick={() => handlePaymentMethodChange("cod")}
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            formData.paymentMethod === "cod"
                              ? "border-green-500 bg-green-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className="flex items-center justify-center mb-2">
                            <Banknote className="w-8 h-8 text-green-600" />
                          </div>
                          <h4 className="text-center font-medium text-gray-900">Cash on Delivery</h4>
                          <p className="text-center text-sm text-gray-600 mt-1">Pay when you receive</p>
                        </div>

                        {/* eSewa */}
                        <div
                          onClick={() => handlePaymentMethodChange("esewa")}
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            formData.paymentMethod === "esewa"
                              ? "border-purple-500 bg-purple-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className="flex items-center justify-center mb-2">
                            <Smartphone className="w-8 h-8 text-purple-600" />
                          </div>
                          <h4 className="text-center font-medium text-gray-900">eSewa</h4>
                          <p className="text-center text-sm text-gray-600 mt-1">Digital wallet payment</p>
                        </div>
                      </div>
                    </div>

                    {formData.paymentMethod === "card" && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                          <div className="relative">
                            <CreditCard className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                            <input
                              type="text"
                              name="cardNumber"
                              value={formData.cardNumber}
                              onChange={handleInputChange}
                              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                              placeholder="1234 5678 9012 3456"
                              required
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                            <input
                              type="text"
                              name="expiryDate"
                              value={formData.expiryDate}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                              placeholder="MM/YY"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                            <div className="relative">
                              <Lock className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                              <input
                                type="text"
                                name="cvv"
                                value={formData.cvv}
                                onChange={handleInputChange}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                                placeholder="123"
                                required
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                          <input
                            type="text"
                            name="cardName"
                            value={formData.cardName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                            placeholder="Name on card"
                            required
                          />
                        </div>

                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            name="saveInfo"
                            checked={formData.saveInfo}
                            onChange={handleInputChange}
                            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                          />
                          <label className="ml-2 block text-sm text-gray-700">
                            Save payment information for future purchases
                          </label>
                        </div>
                      </div>
                    )}

                    {formData.paymentMethod === "cod" && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-center">
                          <Banknote className="w-5 h-5 text-green-600 mr-2" />
                          <h4 className="font-medium text-green-800">Cash on Delivery</h4>
                        </div>
                        <p className="text-sm text-green-700 mt-2">
                          You will pay in cash when your order is delivered to your address. Please keep the exact
                          amount ready.
                        </p>
                        <div className="mt-3 text-sm text-green-600">
                          <p>• No advance payment required</p>
                          <p>• Pay only when you receive your order</p>
                          <p>• Cash payment accepted</p>
                        </div>
                      </div>
                    )}

                    {formData.paymentMethod === "esewa" && (
                      <div className="space-y-4">
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                          <div className="flex items-center">
                            <Smartphone className="w-5 h-5 text-purple-600 mr-2" />
                            <h4 className="font-medium text-purple-800">eSewa Digital Payment</h4>
                          </div>
                          <p className="text-sm text-purple-700 mt-2">
                            Pay securely using your eSewa digital wallet. You will be redirected to eSewa for payment
                            confirmation.
                          </p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">eSewa ID</label>
                          <div className="relative">
                            <Smartphone className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                            <input
                              type="text"
                              name="esewaId"
                              value={formData.esewaId}
                              onChange={handleInputChange}
                              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                              placeholder="Enter your eSewa ID"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 3: Review Order */}
                {currentStep === 3 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Review Your Order</h3>

                    {/* Shipping Details */}
                    <div className="mb-6">
                      <h4 className="font-medium text-gray-900 mb-2">Shipping Address</h4>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">
                          {formData.firstName} {formData.lastName}
                          <br />
                          {formData.address}
                          <br />
                          {formData.city}, {formData.postalCode}
                          <br />
                          {formData.phone}
                        </p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-medium text-gray-900 mb-2">Payment Method</h4>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        {formData.paymentMethod === "card" && (
                          <p className="text-sm text-gray-600">
                            <span className="flex items-center">
                              <CreditCard className="w-4 h-4 mr-2" />
                              Credit/Debit Card
                            </span>
                            **** **** **** {formData.cardNumber.slice(-4)}
                            <br />
                            {formData.cardName}
                          </p>
                        )}
                        {formData.paymentMethod === "cod" && (
                          <p className="text-sm text-gray-600">
                            <span className="flex items-center">
                              <Banknote className="w-4 h-4 mr-2" />
                              Cash on Delivery
                            </span>
                            Pay when you receive your order
                          </p>
                        )}
                        {formData.paymentMethod === "esewa" && (
                          <p className="text-sm text-gray-600">
                            <span className="flex items-center">
                              <Smartphone className="w-4 h-4 mr-2" />
                              eSewa Digital Wallet
                            </span>
                            eSewa ID: {formData.esewaId}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Order Items */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Order Items</h4>
                      <div className="space-y-2">
                        {orderSummary.items.map((item, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span>
                              {item.name} × {item.quantity}
                            </span>
                            <span>NPR {(item.price * item.quantity).toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                  <Button variant="outline" onClick={handlePrevStep} disabled={currentStep === 1} icon={ArrowLeft}>
                    Previous
                  </Button>

                  {currentStep < 3 ? (
                    <Button onClick={handleNextStep} icon={ArrowRight} iconPosition="right">
                      Next
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSubmitOrder}
                      disabled={isProcessing}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      {isProcessing ? "Processing..." : "Place Order"}
                    </Button>
                  )}
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="sticky top-4">
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>

                <div className="space-y-2 mb-4">
                  {orderSummary.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>
                        {item.name} × {item.quantity}
                      </span>
                      <span>NPR {(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 mb-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>NPR {orderSummary.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>
                      {orderSummary.shipping === 0 ? "Free" : `NPR ${orderSummary.shipping.toLocaleString()}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>NPR {orderSummary.tax.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex justify-between font-semibold text-lg pt-4 border-t border-gray-200">
                  <span>Total</span>
                  <span className="text-green-600">NPR {orderSummary.total.toLocaleString()}</span>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
