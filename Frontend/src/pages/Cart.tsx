"use client"

import type React from "react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { ShoppingCart, Plus, Minus, Trash2, ArrowRight, ArrowLeft, Heart, Tag } from "lucide-react"
import SEO from "../components/common/SEO"
import Card from "../components/ui/Card"
import Button from "../components/ui/Button"

interface CartItem {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  quantity: number
  inStock: boolean
}

const Cart: React.FC = () => {
  const navigate = useNavigate()
  const user = null // Mock user data - in real app this would come from context/state management

  // Mock cart data - in real app this would come from context/state management
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Premium Wireless Headphones",
      price: 2500,
      originalPrice: 3000,
      image: "/wireless-headphones.png",
      quantity: 1,
      inStock: true,
    },
    {
      id: "2",
      name: "Smart Fitness Watch",
      price: 4500,
      image: "/fitness-watch.png",
      quantity: 2,
      inStock: true,
    },
    {
      id: "3",
      name: "Organic Coffee Beans",
      price: 800,
      image: "/pile-of-coffee-beans.png",
      quantity: 1,
      inStock: false,
    },
  ])

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id)
      return
    }
    setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 1000 ? 0 : 150
  const tax = subtotal * 0.13 // 13% VAT
  const total = subtotal + shipping + tax

  const handleCheckout = () => {
    if (!user) {
      const shouldLogin = window.confirm("You need to login to proceed to checkout. Would you like to login now?")
      if (shouldLogin) {
        localStorage.setItem("redirectAfterLogin", "/checkout")
        navigate("/login")
        return
      }
      return
    }
    navigate("/checkout")
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <SEO title="Shopping Cart - Empty" description="Your shopping cart is empty" />
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <ShoppingCart className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some products to get started</p>
          <Link to="/shop">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO title="Shopping Cart" description="Review your selected items and proceed to checkout" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
            <Link to="/shop" className="flex items-center text-blue-600 hover:text-blue-700 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Link>
          </div>
          <p className="text-gray-600 mt-2">{cartItems.length} items in your cart</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              {cartItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`${!item.inStock ? "opacity-75" : ""}`}>
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">{item.name}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xl font-bold text-blue-600">NPR {item.price.toLocaleString()}</span>
                          {item.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">
                              NPR {item.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                        {!item.inStock && <p className="text-red-600 text-sm mt-1">Out of stock</p>}
                      </div>

                      <div className="flex items-center space-x-3">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 hover:bg-gray-100 transition-colors"
                            disabled={!item.inStock}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-4 py-2 font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-gray-100 transition-colors"
                            disabled={!item.inStock}
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-2">
                          <button
                            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                            <Heart className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="sticky top-4">
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">NPR {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">{shipping === 0 ? "Free" : `NPR ${shipping.toLocaleString()}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (13%)</span>
                    <span className="font-medium">NPR {tax.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold text-gray-900">Total</span>
                      <span className="text-lg font-bold text-blue-600">NPR {total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {shipping === 0 && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                    <div className="flex items-center">
                      <Tag className="w-4 h-4 text-green-600 mr-2" />
                      <span className="text-sm text-green-800">You qualify for free shipping!</span>
                    </div>
                  </div>
                )}

                <Button
                  fullWidth
                  onClick={handleCheckout}
                  disabled={cartItems.some((item) => !item.inStock)}
                  icon={ArrowRight}
                  iconPosition="right"
                  className="mb-4"
                >
                  Proceed to Checkout
                </Button>

                <div className="text-center">
                  <Link to="/shop" className="text-blue-600 hover:text-blue-700 text-sm transition-colors">
                    Continue Shopping
                  </Link>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
