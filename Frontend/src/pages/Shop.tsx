"use client"

import type React from "react"
import { useState, useMemo, useEffect, useRef } from "react"
import { useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { Search, Filter, ShoppingCart } from "lucide-react"
import { useCart } from "../contexts/CartContext"
import SEO from "../components/common/SEO"
import Card from "../components/ui/Card"
import Button from "../components/ui/Button"
import ProductCard from "../components/ecommerce/ProductCard"
import { mockProducts } from "../data/mockData"
import { shopCategories, getCategoryBySlug, getSubcategoryBySlug } from "../data/shop"

const Shop: React.FC = () => {
  const location = useLocation()
  const { addToCart } = useCart()

  const searchParams = new URLSearchParams(location.search)
  const categoryParam = searchParams.get("category")
  const subcategoryParam = searchParams.get("subcategory")

  const isFirstLoad = useRef(true)
  const [frozenUrl, setFrozenUrl] = useState({ category: "", subcategory: "" })

  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState(categoryParam || "")
  const [activeSubcategory, setActiveSubcategory] = useState(subcategoryParam || "")
  const [priceRange, setPriceRange] = useState({ min: 0, max: 50000 })
  const [sortBy, setSortBy] = useState("featured")
  const [viewMode] = useState<"grid" | "list">("grid")
  const [, setWishlist] = useState<string[]>([])

  useEffect(() => {
    if (isFirstLoad.current) {
      setFrozenUrl({
        category: categoryParam || "",
        subcategory: subcategoryParam || "",
      })

      setActiveCategory(categoryParam || "")
      setActiveSubcategory(subcategoryParam || "")

      isFirstLoad.current = false
    }
  }, [categoryParam, subcategoryParam])

  useEffect(() => {
    return () => {
      isFirstLoad.current = true
    }
  }, [])

  useEffect(() => {
    if (location.pathname !== "/shop") {
      isFirstLoad.current = true
    }
  }, [location.pathname])

  useEffect(() => {
    const handleFilterChange = (event: CustomEvent) => {
      const { category, subcategory } = event.detail
      setActiveCategory(category)
      setActiveSubcategory(subcategory)
    }

    window.addEventListener("shopFilterChange", handleFilterChange as EventListener)

    return () => {
      window.removeEventListener("shopFilterChange", handleFilterChange as EventListener)
    }
  }, [])

  const frozenCategory = frozenUrl.category ? getCategoryBySlug(frozenUrl.category) : null
  const frozenSubcategory =
    frozenUrl.subcategory && frozenUrl.category ? getSubcategoryBySlug(frozenUrl.category, frozenUrl.subcategory) : null

  const currentActiveCategory = activeCategory ? getCategoryBySlug(activeCategory) : null
  const currentActiveSubcategory =
    activeSubcategory && activeCategory ? getSubcategoryBySlug(activeCategory, activeSubcategory) : null

  const filteredProducts = useMemo(() => {
    const filtered = mockProducts.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory =
        !activeCategory || product.category.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "") === activeCategory
      const matchesSubcategory =
        !activeSubcategory ||
        product.subcategory?.toLowerCase().replace(/\s+/g, "-").replace(/'/g, "").replace(/&/g, "") ===
          activeSubcategory
      const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max

      return matchesSearch && matchesCategory && matchesSubcategory && matchesPrice
    })

    switch (sortBy) {
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "name-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name))
        break
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        filtered.sort((a, b) => Number.parseInt(b.id) - Number.parseInt(a.id))
        break
      case "oldest":
        filtered.sort((a, b) => Number.parseInt(a.id) - Number.parseInt(b.id))
        break
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }

    return filtered
  }, [searchTerm, activeCategory, activeSubcategory, priceRange, sortBy])

  const handleAddToCart = (productId: string) => {
    const product = mockProducts.find((p) => p.id === productId)
    if (product) {
      addToCart(product)
    }
  }

  const handleToggleWishlist = (productId: string) => {
    setWishlist((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  const handleCategoryChange = (categorySlug: string) => {
    setActiveCategory(categorySlug)
    setActiveSubcategory("")
  }

  const handleSubcategoryChange = (subcategorySlug: string) => {
    setActiveSubcategory(subcategorySlug)
  }

  const handleClearFilters = () => {
    setSearchTerm("")
    setActiveCategory("")
    setActiveSubcategory("")
    setPriceRange({ min: 0, max: 50000 })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Shop - Constellation Saving and Credit Cooperative Ltd."
        description="Shop from our member businesses. Discover quality products from local entrepreneurs in fashion, electronics, lifestyle, and more."
      />

      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Member Business Shop</h1>
            <p className="text-xl max-w-3xl mx-auto">
              {frozenCategory && frozenSubcategory
                ? `Discover ${frozenSubcategory.name} in ${frozenCategory.name}`
                : frozenCategory
                  ? `Explore ${frozenCategory.name} Products`
                  : "Support local businesses and discover quality products from our cooperative members"}
            </p>
            {(activeCategory !== frozenUrl.category || activeSubcategory !== frozenUrl.subcategory) && (
              <div className="mt-2 text-green-200 text-sm">
                Currently viewing:{" "}
                {currentActiveCategory && currentActiveSubcategory
                  ? `${currentActiveSubcategory.name} in ${currentActiveCategory.name}`
                  : currentActiveCategory
                    ? currentActiveCategory.name
                    : "All Products"}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <Card className="sticky top-4">
              <div className="flex items-center mb-6">
                <Filter className="w-5 h-5 mr-2" />
                <h3 className="text-lg font-semibold">Filters</h3>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search products..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={activeCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">All Categories</option>
                  {shopCategories.map((category) => (
                    <option key={category.id} value={category.slug}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {activeCategory && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subcategory</label>
                  <select
                    value={activeSubcategory}
                    onChange={(e) => handleSubcategoryChange(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">All Subcategories</option>
                    {currentActiveCategory?.subcategories.map((sub) => (
                      <option key={sub.id} value={sub.slug}>
                        {sub.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="50000"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange((prev) => ({ ...prev, max: Number.parseInt(e.target.value) }))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>NPR 0</span>
                    <span>NPR {priceRange.max.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <Button fullWidth variant="outline" onClick={handleClearFilters}>
                Clear All Filters
              </Button>
            </Card>
          </div>

          <div className="lg:w-3/4">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">
                  {filteredProducts.length} products found
                  {currentActiveCategory && (
                    <span className="text-green-600 ml-2">
                      in{" "}
                      {currentActiveSubcategory
                        ? `${currentActiveSubcategory.name} - ${currentActiveCategory.name}`
                        : currentActiveCategory.name}
                    </span>
                  )}
                </span>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-700">Sort by:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 text-sm"
                  >
                    <option value="featured">Featured</option>
                    <option value="name-asc">Name: A to Z</option>
                    <option value="name-desc">Name: Z to A</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                  </select>
                </div>
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div
                className={`grid gap-6 ${
                  viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
                }`}
              >
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ProductCard
                      product={product}
                      onAddToCart={handleAddToCart}
                      onToggleWishlist={handleToggleWishlist}
                    />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <ShoppingCart className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600">
                  {currentActiveCategory || currentActiveSubcategory
                    ? `No products available in ${currentActiveSubcategory?.name || currentActiveCategory?.name}. Try browsing other categories.`
                    : "Try adjusting your filters or search terms"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Shop
