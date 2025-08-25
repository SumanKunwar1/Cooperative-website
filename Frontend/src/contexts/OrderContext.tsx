"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useAuth } from "./AuthContext"

export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled"

export interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

export interface Order {
  id: string
  userId: string
  items: OrderItem[]
  total: number
  status: OrderStatus
  createdAt: string
  updatedAt: string
  shippingAddress: {
    name: string
    address: string
    city: string
    phone: string
  }
  paymentMethod: string
  trackingNumber?: string
}

export interface ProductReview {
  id: string
  userId: string
  userName: string
  productId: string
  orderId: string
  rating: number
  comment: string
  date: string
  helpful: number
  verified: boolean
}

interface OrderContextType {
  orders: Order[]
  reviews: ProductReview[]
  createOrder: (orderData: Omit<Order, "id" | "createdAt" | "updatedAt">) => string
  updateOrderStatus: (orderId: string, status: OrderStatus) => void
  canWriteReview: (userId: string, productId: string) => boolean
  addReview: (review: Omit<ProductReview, "id" | "date" | "helpful" | "verified">) => void
  getOrderById: (orderId: string) => Order | undefined
  getUserOrders: (userId: string) => Order[]
  getProductReviews: (productId: string) => ProductReview[]
}

const OrderContext = createContext<OrderContextType | undefined>(undefined)

export const useOrders = () => {
  const context = useContext(OrderContext)
  if (context === undefined) {
    throw new Error("useOrders must be used within an OrderProvider")
  }
  return context
}

interface OrderProviderProps {
  children: ReactNode
}

export const OrderProvider: React.FC<OrderProviderProps> = ({ children }) => {
  const { user } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [reviews, setReviews] = useState<ProductReview[]>([])

  // Load data from localStorage on mount
  useEffect(() => {
    const savedOrders = localStorage.getItem("orders")
    const savedReviews = localStorage.getItem("reviews")

    if (savedOrders) {
      setOrders(JSON.parse(savedOrders))
    } else {
      // Initialize with mock data
      const mockOrders: Order[] = [
        {
          id: "ORD-001",
          userId: "2",
          items: [{ id: "1", name: "Premium Laptop Stand", price: 3500, quantity: 1, image: "/laptop-stand.png" }],
          total: 3500,
          status: "delivered",
          createdAt: "2024-01-20T10:00:00Z",
          updatedAt: "2024-01-25T14:30:00Z",
          shippingAddress: {
            name: "John Doe",
            address: "123 Main St",
            city: "Kathmandu",
            phone: "+977-9812345678",
          },
          paymentMethod: "card",
          trackingNumber: "TRK123456789",
        },
        {
          id: "ORD-002",
          userId: "2",
          items: [
            { id: "2", name: "Wireless Headphones", price: 4500, quantity: 1, image: "/wireless-headphones.png" },
          ],
          total: 4500,
          status: "processing",
          createdAt: "2024-01-18T15:30:00Z",
          updatedAt: "2024-01-19T09:15:00Z",
          shippingAddress: {
            name: "John Doe",
            address: "123 Main St",
            city: "Kathmandu",
            phone: "+977-9812345678",
          },
          paymentMethod: "esewa",
        },
      ]
      setOrders(mockOrders)
      localStorage.setItem("orders", JSON.stringify(mockOrders))
    }

    if (savedReviews) {
      setReviews(JSON.parse(savedReviews))
    }
  }, [])

  // Save to localStorage whenever orders or reviews change
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders))
  }, [orders])

  useEffect(() => {
    localStorage.setItem("reviews", JSON.stringify(reviews))
  }, [reviews])

  const createOrder = (orderData: Omit<Order, "id" | "createdAt" | "updatedAt">): string => {
    const newOrder: Order = {
      ...orderData,
      id: `ORD-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    setOrders((prev) => [...prev, newOrder])
    return newOrder.id
  }

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, status, updatedAt: new Date().toISOString() } : order)),
    )
  }

  const canWriteReview = (userId: string, productId: string): boolean => {
    // User can write a review if they have a delivered order containing this product
    // and haven't already reviewed it
    const hasDeliveredOrder = orders.some(
      (order) =>
        order.userId === userId && order.status === "delivered" && order.items.some((item) => item.id === productId),
    )

    const hasExistingReview = reviews.some((review) => review.userId === userId && review.productId === productId)

    return hasDeliveredOrder && !hasExistingReview
  }

  const addReview = (reviewData: Omit<ProductReview, "id" | "date" | "helpful" | "verified">) => {
    if (!canWriteReview(reviewData.userId, reviewData.productId)) {
      throw new Error("Cannot write review for this product")
    }

    const newReview: ProductReview = {
      ...reviewData,
      id: `REV-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      helpful: 0,
      verified: true, // Since we verified they purchased it
    }

    setReviews((prev) => [...prev, newReview])
  }

  const getOrderById = (orderId: string): Order | undefined => {
    return orders.find((order) => order.id === orderId)
  }

  const getUserOrders = (userId: string): Order[] => {
    return orders
      .filter((order) => order.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }

  const getProductReviews = (productId: string): ProductReview[] => {
    return reviews
      .filter((review) => review.productId === productId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }

  const value: OrderContextType = {
    orders,
    reviews,
    createOrder,
    updateOrderStatus,
    canWriteReview,
    addReview,
    getOrderById,
    getUserOrders,
    getProductReviews,
  }

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
}
