"use client"

import type React from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowRight, Star, ShoppingCart } from "lucide-react"
import Card from "../ui/Card"
import Button from "../ui/Button"

const ProductsSection: React.FC = () => {
  // Mock product data
  const products = [
    {
      id: 1,
      name: "Premium Organic Tea",
      price: 299,
      originalPrice: 399,
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.8,
      reviews: 124,
      category: "Food & Beverage",
    },
    {
      id: 2,
      name: "Handcrafted Jewelry Set",
      price: 1299,
      originalPrice: 1599,
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.9,
      reviews: 89,
      category: "Fashion",
    },
    {
      id: 3,
      name: "Smart Fitness Tracker",
      price: 2499,
      originalPrice: 2999,
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.7,
      reviews: 256,
      category: "Electronics",
    },
    {
      id: 4,
      name: "Eco-Friendly Backpack",
      price: 899,
      originalPrice: 1199,
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.6,
      reviews: 178,
      category: "Fashion",
    },
    {
      id: 5,
      name: "Artisan Coffee Beans",
      price: 599,
      originalPrice: 799,
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.9,
      reviews: 342,
      category: "Food & Beverage",
    },
    {
      id: 6,
      name: "Wireless Earbuds Pro",
      price: 3999,
      originalPrice: 4999,
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.8,
      reviews: 567,
      category: "Electronics",
    },
    {
      id: 7,
      name: "Natural Skincare Set",
      price: 1599,
      originalPrice: 1999,
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.7,
      reviews: 234,
      category: "Health & Beauty",
    },
    {
      id: 8,
      name: "Bamboo Kitchen Set",
      price: 799,
      originalPrice: 999,
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.5,
      reviews: 156,
      category: "Home & Living",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Products</h2>
            <p className="text-gray-600">Discover quality products from our member businesses</p>
          </div>
          <Link to="/shop">
            <Button icon={ArrowRight} iconPosition="right">
              View More Products
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card hover className="h-full group">
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2">
                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </span>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{product.category}</span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm font-medium">{product.rating}</span>
                      <span className="ml-1 text-xs text-gray-500">({product.reviews})</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold mb-2 line-clamp-2">{product.name}</h3>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-primary-600">₹{product.price}</span>
                      <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                    </div>
                  </div>

                  <Button size="sm" className="w-full" icon={ShoppingCart}>
                    Add to Cart
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductsSection
