"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Star,
  Heart,
  ShoppingCart,
  CreditCard,
  Truck,
  Shield,
  RotateCcw,
  Plus,
  Minus,
  Share2,
  MessageCircle,
  Store,
  MapPin,
} from "lucide-react"
import { useCart } from "../contexts/CartContext"
import { useAuth } from "../contexts/AuthContext"
import SEO from "../components/common/SEO"
import Card from "../components/ui/Card"
import Button from "../components/ui/Button"
import { mockProducts } from "../data/mockData"

interface Review {
  id: string
  userId: string
  userName: string
  rating: number
  comment: string
  date: string
  helpful: number
}

interface ProductSpecifications {
  Brand: string
  Material: string
  Dimensions: string
  Weight: string
  Color: string
  Warranty: string
}

interface ShippingInfo {
  freeShipping: boolean
  estimatedDelivery: string
  returnPolicy: string
}

interface SellerInfo {
  id: string
  name: string
  rating: number
  totalReviews: number
  memberSince: string
  location: string
  phone?: string
  email?: string
  description: string
  responseRate: number
  responseTime: string
}

interface DetailedProduct {
  id: string
  name: string
  price: number
  originalPrice?: number
  description: string
  image: string
  category: string
  images: string[]
  fullDescription: string
  specifications: ProductSpecifications
  inStock: boolean
  stockCount: number
  shippingInfo: ShippingInfo
  seller: SellerInfo
}

type TabType = "description" | "reviews" | "shipping"

const ShopDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { user } = useAuth()

  const [product, setProduct] = useState<DetailedProduct | null>(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [activeTab, setActiveTab] = useState<TabType>("description")
  const [showFullDescription, setShowFullDescription] = useState(false)

  const [reviews] = useState<Review[]>([
    {
      id: "1",
      userId: "1",
      userName: "Sarah Johnson",
      rating: 5,
      comment: "Excellent quality product! Exactly as described and arrived quickly. Highly recommend!",
      date: "2024-01-15",
      helpful: 12,
    },
    {
      id: "2",
      userId: "2",
      userName: "Mike Chen",
      rating: 4,
      comment: "Good value for money. The product works well, though the packaging could be better.",
      date: "2024-01-10",
      helpful: 8,
    },
    {
      id: "3",
      userId: "3",
      userName: "Emily Davis",
      rating: 5,
      comment: "Love this product! Great customer service too. Will definitely buy again.",
      date: "2024-01-05",
      helpful: 15,
    },
  ])

  useEffect(() => {
    if (id) {
      const foundProduct = mockProducts.find((p) => p.id === id)
      if (foundProduct) {
        const detailedProduct: DetailedProduct = {
          ...foundProduct,
          images: [foundProduct.image, foundProduct.image, foundProduct.image, foundProduct.image],
          fullDescription: `${foundProduct.description} This premium product is crafted with the finest materials and attention to detail. Our commitment to quality ensures that you receive a product that not only meets but exceeds your expectations. 

Features:
• Premium quality materials
• Durable construction
• Modern design
• Easy to use
• Excellent customer support
• 30-day money-back guarantee

Whether you're looking for functionality, style, or both, this product delivers on all fronts. Join thousands of satisfied customers who have made this their go-to choice.`,
          specifications: {
            Brand: "Premium Brand",
            Material: "High-quality materials",
            Dimensions: "25cm x 15cm x 10cm",
            Weight: "500g",
            Color: "Multiple options available",
            Warranty: "1 Year",
          },
          inStock: true,
          stockCount: 25,
          shippingInfo: {
            freeShipping: foundProduct.price > 1000,
            estimatedDelivery: "3-5 business days",
            returnPolicy: "30-day return policy",
          },
          seller: {
            id: "seller_1",
            name: "Premium Seller",
            rating: 4.8,
            totalReviews: 247,
            memberSince: "2022-03-15",
            location: "Kathmandu, Nepal",
            phone: "+977-9841234567",
            email: "contact@premiumseller.com",
            description:
              "We are a trusted member of the Constellation Cooperative, specializing in high-quality products with excellent customer service. Our commitment to quality and customer satisfaction has made us one of the top-rated sellers in our category.",
            responseRate: 98,
            responseTime: "within 2 hours",
          },
        }
        setProduct(detailedProduct)
      }
    }
  }, [id])

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Product not found</h2>
          <p className="text-gray-600 mb-4">The product you're looking for doesn't exist.</p>
          <Button onClick={() => navigate("/shop")}>Back to Shop</Button>
        </div>
      </div>
    )
  }

  const handleAddToCart = (): void => {
    if (product) {
      addToCart(product, quantity)
    }
  }

  const handleBuyNow = (): void => {
    if (product) {
      if (!user) {
        const shouldLogin = window.confirm("You need to login to make a purchase. Would you like to login now?")
        if (shouldLogin) {
          localStorage.setItem("redirectAfterLogin", "/checkout")
          localStorage.setItem("pendingCartItem", JSON.stringify({ product, quantity }))
          navigate("/login")
          return
        }
        return
      }
      addToCart(product, quantity)
      navigate("/checkout")
    }
  }

  const handleQuantityChange = (change: number): void => {
    const newQuantity = quantity + change
    if (newQuantity >= 1 && newQuantity <= product.stockCount) {
      setQuantity(newQuantity)
    }
  }

  const renderStars = (rating: number, size: "sm" | "md" | "lg" = "md"): React.ReactElement => {
    const sizeClasses = {
      sm: "w-3 h-3",
      md: "w-4 h-4",
      lg: "w-5 h-5",
    }

    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClasses[size]} ${star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
          />
        ))}
      </div>
    )
  }

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO title={`${product?.name || "Product"} - Shop`} description={product?.description || ""} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate("/shop")}
          className="flex items-center text-green-600 hover:text-green-700 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Shop
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <div className="aspect-square bg-white rounded-lg overflow-hidden shadow-lg">
              <img
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-white rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? "border-green-500" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-2">
                  {renderStars(averageRating, "lg")}
                  <span className="text-lg font-medium text-gray-900">{averageRating.toFixed(1)}</span>
                  <span className="text-gray-600">({reviews.length} reviews)</span>
                </div>
              </div>

              {/* Seller Info Card */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <Store className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-semibold text-gray-900">{product.seller.name}</span>
                      <div className="flex items-center space-x-1">
                        {renderStars(product.seller.rating, "sm")}
                        <span className="text-sm text-gray-600">({product.seller.totalReviews})</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{product.seller.location}</span>
                      </div>
                      <span>Member since {new Date(product.seller.memberSince).getFullYear()}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-4">
                <span className="text-3xl font-bold text-green-600">NPR {product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    NPR {product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-500"}`} />
              <span className={`font-medium ${product.inStock ? "text-green-600" : "text-red-600"}`}>
                {product.inStock ? `In Stock (${product.stockCount} available)` : "Out of Stock"}
              </span>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4">
              <span className="font-medium text-gray-900">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 font-medium">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.stockCount}
                  className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <div className="flex space-x-3">
                <Button
                  onClick={handleBuyNow}
                  disabled={!product.inStock}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-semibold"
                >
                  <CreditCard className="w-5 h-5 mr-2" />
                  Buy Now
                </Button>
                <Button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  variant="outline"
                  className="flex-1 border-green-600 text-green-600 hover:bg-green-50 py-3 text-lg font-semibold bg-transparent"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
              </div>
              <div className="flex space-x-3">
                <Button onClick={() => setIsWishlisted(!isWishlisted)} variant="outline" className="flex-1">
                  <Heart className={`w-4 h-4 mr-2 ${isWishlisted ? "fill-current text-red-500" : ""}`} />
                  {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                </Button>
                <Button variant="outline" className="px-4 bg-transparent">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="text-center">
                <Truck className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <p className="text-sm font-medium text-gray-900">Free Shipping</p>
                <p className="text-xs text-gray-600">On orders over NPR 1000</p>
              </div>
              <div className="text-center">
                <Shield className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <p className="text-sm font-medium text-gray-900">Secure Payment</p>
                <p className="text-xs text-gray-600">100% secure checkout</p>
              </div>
              <div className="text-center">
                <RotateCcw className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <p className="text-sm font-medium text-gray-900">Easy Returns</p>
                <p className="text-xs text-gray-600">30-day return policy</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product Details Tabs */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card>
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8">
                {[
                  { id: "description" as TabType, label: "Description" },
                  { id: "reviews" as TabType, label: `Reviews (${reviews.length})` },
                  { id: "shipping" as TabType, label: "Shipping & Returns" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? "border-green-500 text-green-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="py-6">
              {activeTab === "description" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Description</h3>
                    <div className="prose max-w-none">
                      <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                        {showFullDescription
                          ? product.fullDescription
                          : product.fullDescription.substring(0, 300) + "..."}
                      </p>
                      <button
                        onClick={() => setShowFullDescription(!showFullDescription)}
                        className="text-green-600 hover:text-green-700 font-medium mt-2"
                      >
                        {showFullDescription ? "Show Less" : "Read More"}
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Specifications</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                          <span className="font-medium text-gray-900">{key}:</span>
                          <span className="text-gray-600">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Customer Reviews</h3>
                    <Button variant="outline" size="sm">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Write a Review
                    </Button>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-gray-900">{averageRating.toFixed(1)}</div>
                        <div className="flex justify-center mb-1">{renderStars(averageRating)}</div>
                        <div className="text-sm text-gray-600">{reviews.length} reviews</div>
                      </div>
                      <div className="flex-1">
                        {[5, 4, 3, 2, 1].map((rating) => {
                          const count = reviews.filter((r) => r.rating === rating).length
                          const percentage = (count / reviews.length) * 100
                          return (
                            <div key={rating} className="flex items-center space-x-2 mb-1">
                              <span className="text-sm text-gray-600 w-8">{rating}★</span>
                              <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${percentage}%` }} />
                              </div>
                              <span className="text-sm text-gray-600 w-8">{count}</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-200 pb-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                              {review.userName.charAt(0)}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{review.userName}</div>
                              <div className="flex items-center space-x-2">
                                {renderStars(review.rating, "sm")}
                                <span className="text-sm text-gray-600">{review.date}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-600 mb-2">{review.comment}</p>
                        <button className="text-sm text-gray-500 hover:text-gray-700">
                          Helpful ({review.helpful})
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "shipping" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Information</h3>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <Truck className="w-5 h-5 text-green-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-gray-900">Standard Delivery</h4>
                          <p className="text-gray-600">
                            {product.shippingInfo.estimatedDelivery} -
                            {product.shippingInfo.freeShipping ? " Free shipping" : " NPR 150 shipping fee"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <RotateCcw className="w-5 h-5 text-green-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-gray-900">Returns</h4>
                          <p className="text-gray-600">{product.shippingInfo.returnPolicy}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Shield className="w-5 h-5 text-green-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-gray-900">Warranty</h4>
                          <p className="text-gray-600">1 year manufacturer warranty included</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default ShopDetails
