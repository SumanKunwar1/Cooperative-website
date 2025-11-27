"use client"

import type React from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Star, Heart, ShoppingCart, Eye } from "lucide-react"
import Button from "../ui/Button"

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  description: string
  category: string
  subcategory?: string
  featured?: boolean
}

interface ProductCardProps {
  product: Product
  onAddToCart: (productId: string) => void
  onToggleWishlist: (productId: string) => void
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onToggleWishlist }) => {
  const navigate = useNavigate()

  const handleViewDetails = () => {
    navigate(`/shop/product/${product.id}`)
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star key={star} className={`w-4 h-4 ${star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
        ))}
      </div>
    )
  }

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 group"
    >
      <div className="relative">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col space-y-1">
          {product.featured && <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">Featured</span>}
          {discountPercentage > 0 && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">-{discountPercentage}%</span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-2 right-2 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onToggleWishlist(product.id)
            }}
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
          >
            <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleViewDetails()
            }}
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
          >
            <Eye className="w-4 h-4 text-gray-600 hover:text-green-500" />
          </button>
        </div>

        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <Button
            onClick={handleViewDetails}
            className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
          >
            View Details
          </Button>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          {renderStars(product.rating)}
          <span className="text-sm text-gray-600">({product.reviews})</span>
        </div>

        <h3
          className="font-semibold text-gray-900 mb-2 line-clamp-2 cursor-pointer hover:text-green-600 transition-colors"
          onClick={handleViewDetails}
        >
          {product.name}
        </h3>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-green-600">NPR {product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">NPR {product.originalPrice.toLocaleString()}</span>
            )}
          </div>
        </div>

        <div className="flex space-x-2">
          <Button onClick={() => onAddToCart(product.id)} variant="outline" size="sm" className="flex-1">
            <ShoppingCart className="w-4 h-4 mr-1" />
            Add to Cart
          </Button>
          <Button onClick={handleViewDetails} size="sm" className="flex-1">
            Buy Now
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

export default ProductCard
