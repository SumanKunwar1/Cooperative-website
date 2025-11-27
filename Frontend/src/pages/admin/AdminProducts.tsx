"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  MagnifyingGlassIcon, 
  ShoppingBagIcon,
  XMarkIcon,
  PhotoIcon,
  EyeIcon
} from "@heroicons/react/24/outline"
import AdminDashboard from "./AdminDashboard"

interface Product {
  id: string
  name: string
  category: string
  subcategory?: string
  price: number
  originalPrice?: number
  stock: number
  status: "active" | "inactive" | "out_of_stock"
  seller: string
  sellerEmail?: string
  sellerPhone?: string
  image: string
  images: string[]
  description: string
  fullDescription?: string
  brand?: string
  material?: string
  dimensions?: string
  weight?: string
  color?: string
  warranty?: string
  createdAt: string
  updatedAt: string
  featured: boolean
  rating: number
  reviews: number
}

interface ProductFormData {
  name: string
  category: string
  subcategory: string
  price: string
  originalPrice: string
  stock: string
  status: "active" | "inactive" | "out_of_stock"
  seller: string
  sellerEmail: string
  sellerPhone: string
  image: string
  images: string[]
  description: string
  fullDescription: string
  brand: string
  material: string
  dimensions: string
  weight: string
  color: string
  warranty: string
  featured: boolean
}

const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "iPhone 15 Pro",
      category: "Electronics",
      subcategory: "Smartphones",
      price: 129900,
      originalPrice: 139900,
      stock: 25,
      status: "active",
      seller: "ABC Electronics",
      sellerEmail: "abc@electronics.com",
      sellerPhone: "+977-9841234567",
      image: "/modern-smartphone.png",
      images: ["/modern-smartphone.png", "/modern-smartphone.png"],
      description: "Latest iPhone with advanced features",
      fullDescription: "The iPhone 15 Pro features the latest A17 Pro chip, advanced camera system, and premium titanium design.",
      brand: "Apple",
      material: "Titanium",
      dimensions: "146.6 × 70.6 × 8.25 mm",
      weight: "187g",
      color: "Natural Titanium",
      warranty: "1 Year",
      createdAt: "2024-01-15",
      updatedAt: "2024-01-15",
      featured: true,
      rating: 4.8,
      reviews: 156
    },
    {
      id: "2",
      name: "Nike Air Max",
      category: "Fashion",
      subcategory: "Shoes",
      price: 15000,
      stock: 0,
      status: "out_of_stock",
      seller: "Fashion Hub",
      sellerEmail: "fashion@hub.com",
      sellerPhone: "+977-9812345678",
      image: "/athletic-shoes.png",
      images: ["/athletic-shoes.png", "/athletic-shoes.png"],
      description: "Comfortable running shoes with air cushioning",
      fullDescription: "Nike Air Max shoes with advanced air cushioning technology for maximum comfort during workouts.",
      brand: "Nike",
      material: "Synthetic Leather",
      dimensions: "US 8-12",
      weight: "350g",
      color: "Black/White",
      warranty: "6 Months",
      createdAt: "2024-01-18",
      updatedAt: "2024-01-20",
      featured: false,
      rating: 4.5,
      reviews: 89
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive" | "out_of_stock">("all")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<"create" | "edit" | "view">("create")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  const categories = ["Electronics", "Fashion", "Home & Garden", "Sports", "Books", "Health & Beauty"]
  const subcategories: Record<string, string[]> = {
    Electronics: ["Smartphones", "Laptops", "Headphones", "Cameras", "Gaming"],
    Fashion: ["Shoes", "Clothing", "Accessories", "Bags", "Jewelry"],
    "Home & Garden": ["Furniture", "Decor", "Kitchen", "Garden", "Lighting"],
    Sports: ["Equipment", "Apparel", "Footwear", "Supplements", "Accessories"],
    Books: ["Fiction", "Non-fiction", "Educational", "Children", "Comics"],
    "Health & Beauty": ["Skincare", "Makeup", "Health", "Personal Care", "Fitness"]
  }

  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    category: "",
    subcategory: "",
    price: "",
    originalPrice: "",
    stock: "",
    status: "active",
    seller: "",
    sellerEmail: "",
    sellerPhone: "",
    image: "",
    images: [],
    description: "",
    fullDescription: "",
    brand: "",
    material: "",
    dimensions: "",
    weight: "",
    color: "",
    warranty: "",
    featured: false
  })

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      subcategory: "",
      price: "",
      originalPrice: "",
      stock: "",
      status: "active",
      seller: "",
      sellerEmail: "",
      sellerPhone: "",
      image: "",
      images: [],
      description: "",
      fullDescription: "",
      brand: "",
      material: "",
      dimensions: "",
      weight: "",
      color: "",
      warranty: "",
      featured: false
    })
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || product.category === filterCategory
    const matchesStatus = filterStatus === "all" || product.status === filterStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleCreateProduct = () => {
    setModalMode("create")
    setSelectedProduct(null)
    resetForm()
    setIsModalOpen(true)
  }

  const handleEditProduct = (product: Product) => {
    setModalMode("edit")
    setSelectedProduct(product)
    setFormData({
      name: product.name,
      category: product.category,
      subcategory: product.subcategory || "",
      price: product.price.toString(),
      originalPrice: product.originalPrice?.toString() || "",
      stock: product.stock.toString(),
      status: product.status,
      seller: product.seller,
      sellerEmail: product.sellerEmail || "",
      sellerPhone: product.sellerPhone || "",
      image: product.image,
      images: product.images,
      description: product.description,
      fullDescription: product.fullDescription || "",
      brand: product.brand || "",
      material: product.material || "",
      dimensions: product.dimensions || "",
      weight: product.weight || "",
      color: product.color || "",
      warranty: product.warranty || "",
      featured: product.featured
    })
    setIsModalOpen(true)
  }

  const handleViewProduct = (product: Product) => {
    setModalMode("view")
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((product) => product.id !== productId))
    }
  }

  const handleStatusChange = (productId: string, newStatus: "active" | "inactive" | "out_of_stock") => {
    setProducts(products.map((product) => 
      product.id === productId 
        ? { ...product, status: newStatus, updatedAt: new Date().toISOString().split('T')[0] }
        : product
    ))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newProduct: Product = {
      id: selectedProduct?.id || Date.now().toString(),
      name: formData.name,
      category: formData.category,
      subcategory: formData.subcategory || undefined,
      price: parseFloat(formData.price),
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
      stock: parseInt(formData.stock),
      status: formData.status,
      seller: formData.seller,
      sellerEmail: formData.sellerEmail,
      sellerPhone: formData.sellerPhone,
      image: formData.image,
      images: formData.images.length > 0 ? formData.images : [formData.image],
      description: formData.description,
      fullDescription: formData.fullDescription,
      brand: formData.brand,
      material: formData.material,
      dimensions: formData.dimensions,
      weight: formData.weight,
      color: formData.color,
      warranty: formData.warranty,
      createdAt: selectedProduct?.createdAt || new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      featured: formData.featured,
      rating: selectedProduct?.rating || 0,
      reviews: selectedProduct?.reviews || 0
    }

    if (modalMode === "create") {
      setProducts([...products, newProduct])
    } else if (modalMode === "edit" && selectedProduct) {
      setProducts(products.map((product) =>
        product.id === selectedProduct.id ? newProduct : product
      ))
    }

    setIsModalOpen(false)
    resetForm()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleImageAdd = () => {
    const imageUrl = prompt("Enter image URL:")
    if (imageUrl) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, imageUrl],
        image: prev.image || imageUrl
      }))
    }
  }

  const handleImageRemove = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      case "out_of_stock":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <AdminDashboard currentSection="products">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Management</h2>
            <p className="text-gray-600">Manage your cooperative's product catalog</p>
          </div>
          <button 
            onClick={handleCreateProduct}
            className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors duration-200"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Product
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">{products.length}</p>
              </div>
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <ShoppingBagIcon className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Products</p>
                <p className="text-2xl font-bold text-green-600">
                  {products.filter(p => p.status === "active").length}
                </p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Out of Stock</p>
                <p className="text-2xl font-bold text-red-600">
                  {products.filter(p => p.status === "out_of_stock").length}
                </p>
              </div>
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-red-600 rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-2xl font-bold text-green-600">
                  NPR {products.reduce((sum, p) => sum + (p.price * p.stock), 0).toLocaleString()}
                </p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 font-bold">₹</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products, sellers, brands..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as "all" | "active" | "inactive" | "out_of_stock")}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Seller
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedProducts.map((product) => (
                  <motion.tr
                    key={product.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12">
                          <img
                            className="h-12 w-12 rounded-lg object-cover"
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-500">ID: {product.id}</div>
                          {product.featured && (
                            <span className="inline-flex px-2 py-0.5 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                              Featured
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        {product.category}
                      </span>
                      {product.subcategory && (
                        <div className="text-xs text-gray-500 mt-1">{product.subcategory}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">NPR {product.price.toLocaleString()}</div>
                      {product.originalPrice && (
                        <div className="text-xs text-gray-500 line-through">
                          NPR {product.originalPrice.toLocaleString()}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.stock}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={product.status}
                        onChange={(e) =>
                          handleStatusChange(product.id, e.target.value as "active" | "inactive" | "out_of_stock")
                        }
                        className={`text-xs font-semibold rounded-full px-2 py-1 border-0 ${getStatusColor(product.status)} focus:ring-2 focus:ring-purple-500`}
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="out_of_stock">Out of Stock</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{product.seller}</div>
                      {product.sellerEmail && (
                        <div className="text-xs text-gray-500">{product.sellerEmail}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button 
                          onClick={() => handleViewProduct(product)}
                          className="text-green-600 hover:text-green-900 p-1 rounded-md hover:bg-green-50"
                          title="View Product"
                        >
                          <EyeIcon className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleEditProduct(product)}
                          className="text-purple-600 hover:text-purple-900 p-1 rounded-md hover:bg-purple-50"
                          title="Edit Product"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-red-50"
                          title="Delete Product"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-700">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of {filteredProducts.length} results
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 text-sm font-medium rounded-md ${
                    page === currentPage
                      ? "text-white bg-purple-600 border-purple-600"
                      : "text-gray-700 bg-white border-gray-300 hover:bg-gray-50"
                  } border`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <ShoppingBagIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No products found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm ? "Try adjusting your search criteria." : "Get started by adding a new product."}
            </p>
          </div>
        )}
      </motion.div>

      {/* Product Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  {modalMode === "create" && "Add New Product"}
                  {modalMode === "edit" && "Edit Product"}
                  {modalMode === "view" && "Product Details"}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <div className="p-6">
                {modalMode === "view" && selectedProduct ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <img
                          src={selectedProduct.image || "/placeholder.svg"}
                          alt={selectedProduct.name}
                          className="w-full h-64 object-cover rounded-lg"
                        />
                        {selectedProduct.images.length > 1 && (
                          <div className="grid grid-cols-4 gap-2 mt-2">
                            {selectedProduct.images.slice(0, 4).map((img, index) => (
                              <img
                                key={index}
                                src={img || "/placeholder.svg"}
                                alt=""
                                className="w-full h-16 object-cover rounded"
                              />
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-xl font-bold text-gray-900">{selectedProduct.name}</h4>
                          <p className="text-gray-600">{selectedProduct.description}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-gray-700">Price:</span>
                            <p className="text-lg font-bold text-purple-600">NPR {selectedProduct.price.toLocaleString()}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Stock:</span>
                            <p>{selectedProduct.stock}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Category:</span>
                            <p>{selectedProduct.category}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Status:</span>
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedProduct.status)}`}>
                              {selectedProduct.status.replace('_', ' ')}
                            </span>
                          </div>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Seller:</span>
                          <p>{selectedProduct.seller}</p>
                          {selectedProduct.sellerEmail && (
                            <p className="text-sm text-gray-600">{selectedProduct.sellerEmail}</p>
                          )}
                          {selectedProduct.sellerPhone && (
                            <p className="text-sm text-gray-600">{selectedProduct.sellerPhone}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {selectedProduct.fullDescription && (
                      <div>
                        <h5 className="font-medium text-gray-700 mb-2">Full Description:</h5>
                        <p className="text-gray-600">{selectedProduct.fullDescription}</p>
                      </div>
                    )}

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                      {selectedProduct.brand && (
                        <div>
                          <span className="font-medium text-gray-700">Brand:</span>
                          <p>{selectedProduct.brand}</p>
                        </div>
                      )}
                      {selectedProduct.material && (
                        <div>
                          <span className="font-medium text-gray-700">Material:</span>
                          <p>{selectedProduct.material}</p>
                        </div>
                      )}
                      {selectedProduct.dimensions && (
                        <div>
                          <span className="font-medium text-gray-700">Dimensions:</span>
                          <p>{selectedProduct.dimensions}</p>
                        </div>
                      )}
                      {selectedProduct.weight && (
                        <div>
                          <span className="font-medium text-gray-700">Weight:</span>
                          <p>{selectedProduct.weight}</p>
                        </div>
                      )}
                      {selectedProduct.color && (
                        <div>
                          <span className="font-medium text-gray-700">Color:</span>
                          <p>{selectedProduct.color}</p>
                        </div>
                      )}
                      {selectedProduct.warranty && (
                        <div>
                          <span className="font-medium text-gray-700">Warranty:</span>
                          <p>{selectedProduct.warranty}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex space-x-4">
                      <button
                        onClick={() => handleEditProduct(selectedProduct)}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                      >
                        Edit Product
                      </button>
                      <button
                        onClick={() => setIsModalOpen(false)}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Basic Information */}
                      <div className="space-y-4">
                        <h4 className="font-medium text-gray-900">Basic Information</h4>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Product Name *
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Category *
                            </label>
                            <select
                              name="category"
                              value={formData.category}
                              onChange={handleInputChange}
                              required
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            >
                              <option value="">Select Category</option>
                              {categories.map((category) => (
                                <option key={category} value={category}>
                                  {category}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Subcategory
                            </label>
                            <select
                              name="subcategory"
                              value={formData.subcategory}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              disabled={!formData.category}
                            >
                              <option value="">Select Subcategory</option>
                              {formData.category && subcategories[formData.category]?.map((sub) => (
                                <option key={sub} value={sub}>
                                  {sub}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description *
                          </label>
                          <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Description
                          </label>
                          <textarea
                            name="fullDescription"
                            value={formData.fullDescription}
                            onChange={handleInputChange}
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                      </div>

                      {/* Pricing and Inventory */}
                      <div className="space-y-4">
                        <h4 className="font-medium text-gray-900">Pricing & Inventory</h4>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Price (NPR) *
                            </label>
                            <input
                              type="number"
                              name="price"
                              value={formData.price}
                              onChange={handleInputChange}
                              required
                              min="0"
                              step="0.01"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Original Price (NPR)
                            </label>
                            <input
                              type="number"
                              name="originalPrice"
                              value={formData.originalPrice}
                              onChange={handleInputChange}
                              min="0"
                              step="0.01"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Stock Quantity *
                            </label>
                            <input
                              type="number"
                              name="stock"
                              value={formData.stock}
                              onChange={handleInputChange}
                              required
                              min="0"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Status *
                            </label>
                            <select
                              name="status"
                              value={formData.status}
                              onChange={handleInputChange}
                              required
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            >
                              <option value="active">Active</option>
                              <option value="inactive">Inactive</option>
                              <option value="out_of_stock">Out of Stock</option>
                            </select>
                          </div>
                        </div>

                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            name="featured"
                            checked={formData.featured}
                            onChange={handleInputChange}
                            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                          />
                          <label className="ml-2 text-sm font-medium text-gray-700">
                            Featured Product
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Seller Information */}
                    <div className="border-t pt-6">
                      <h4 className="font-medium text-gray-900 mb-4">Seller Information</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Seller Name *
                          </label>
                          <input
                            type="text"
                            name="seller"
                            value={formData.seller}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Seller Email
                          </label>
                          <input
                            type="email"
                            name="sellerEmail"
                            value={formData.sellerEmail}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Seller Phone
                          </label>
                          <input
                            type="tel"
                            name="sellerPhone"
                            value={formData.sellerPhone}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Product Images */}
                    <div className="border-t pt-6">
                      <h4 className="font-medium text-gray-900 mb-4">Product Images</h4>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Main Image URL *
                        </label>
                        <input
                          type="url"
                          name="image"
                          value={formData.image}
                          onChange={handleInputChange}
                          required
                          placeholder="https://example.com/image.jpg"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div className="mt-4">
                        <div className="flex items-center justify-between mb-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Additional Images
                          </label>
                          <button
                            type="button"
                            onClick={handleImageAdd}
                            className="inline-flex items-center px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                          >
                            <PhotoIcon className="h-4 w-4 mr-1" />
                            Add Image
                          </button>
                        </div>
                        {formData.images.length > 0 && (
                          <div className="grid grid-cols-4 gap-2">
                            {formData.images.map((image, index) => (
                              <div key={index} className="relative">
                                <img
                                  src={image || "/placeholder.svg"}
                                  alt=""
                                  className="w-full h-20 object-cover rounded border"
                                />
                                <button
                                  type="button"
                                  onClick={() => handleImageRemove(index)}
                                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Product Specifications */}
                    <div className="border-t pt-6">
                      <h4 className="font-medium text-gray-900 mb-4">Product Specifications</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                          <input
                            type="text"
                            name="brand"
                            value={formData.brand}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Material</label>
                          <input
                            type="text"
                            name="material"
                            value={formData.material}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                          <input
                            type="text"
                            name="color"
                            value={formData.color}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Dimensions</label>
                          <input
                            type="text"
                            name="dimensions"
                            value={formData.dimensions}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Weight</label>
                          <input
                            type="text"
                            name="weight"
                            value={formData.weight}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Warranty</label>
                          <input
                            type="text"
                            name="warranty"
                            value={formData.warranty}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-4 pt-6 border-t">
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700"
                      >
                        {modalMode === "create" ? "Create Product" : "Update Product"}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AdminDashboard>
  )
}

export default AdminProducts