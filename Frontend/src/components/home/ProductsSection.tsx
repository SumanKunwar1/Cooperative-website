"use client"

import type React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useCart } from "../../contexts/CartContext"
import ProductCard from "../ecommerce/ProductCard"
import Button from "../ui/Button"
import { mockProducts } from "../../data/mockData"

const ProductsSection: React.FC = () => {
  const { addToCart } = useCart()
  const [, setWishlist] = useState<string[]>([])

  const products = mockProducts
    .filter((product) => product.featured) // Only show featured products
    .slice(0, 4) // Limit to 4 products for home page

  const handleAddToCart = (productId: string) => {
    const product = mockProducts.find((p) => p.id === productId)
    if (product) {
      addToCart(product)
    }
  }

  const handleToggleWishlist = (productId: string) => {
    setWishlist((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

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
              <ProductCard product={product} onAddToCart={handleAddToCart} onToggleWishlist={handleToggleWishlist} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductsSection
