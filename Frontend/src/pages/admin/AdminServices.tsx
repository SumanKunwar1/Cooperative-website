// FILE: frontend/src/pages/admin/AdminServices.tsx

"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Plus,
  Edit,
  Trash2,
  Search,
  PiggyBank,
  CreditCard,
  Star,
  Users,
  Building2,
  Smartphone,
  Shield,
  Calculator,
  Briefcase,
  GraduationCap,
  Home,
  Zap,
  Clock,
  Award,
  Loader,
  Check,
  X,
  SmartphoneNfc,
} from "lucide-react"
import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"
import { servicesAPI } from "../../services/api"
import { useAdmin } from "../../contexts/AdminContext"
import { useNavigate } from "react-router-dom"

interface SavingScheme {
  _id?: string
  title: string
  icon: string
  minDeposit: string
  minBalance: string
  interestRate: string
  maxWithdrawal: string
  targetGroup: string
  features: string[]
  color: string
  isActive: boolean
}

interface LoanScheme {
  _id?: string
  type: string
  icon: string
  rates: { [key: string]: string }
  description: string
  features: string[]
  isActive: boolean
}

interface AdditionalFacility {
  _id?: string
  title: string
  description: string
  icon: string
  features: string[]
  playStoreLink?: string
  isActive: boolean
}

const AdminServices: React.FC = () => {
  const [activeTab, setActiveTab] = useState("savings")
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [savingLoading, setSavingLoading] = useState(false)

  const [savingSchemes, setSavingSchemes] = useState<SavingScheme[]>([])
  const [loanSchemes, setLoanSchemes] = useState<LoanScheme[]>([])
  const [additionalFacilities, setAdditionalFacilities] = useState<AdditionalFacility[]>([])

  const { admin } = useAdmin()
  const navigate = useNavigate()

  // Check if admin is logged in
  useEffect(() => {
    if (!admin) {
      navigate("/admin/login")
    }
  }, [admin, navigate])

  // Fetch all services
  useEffect(() => {
    fetchAllServices()
  }, [])

  const fetchAllServices = async () => {
    try {
      setLoading(true)
      // Remove the (false) parameter to get ALL services including both active and inactive
      const response = await servicesAPI.getAllServices()

      if (response.success) {
        setSavingSchemes(response.data.savingSchemes || [])
        setLoanSchemes(response.data.loanSchemes || [])
        setAdditionalFacilities(response.data.additionalFacilities || [])
      }
    } catch (error: any) {
      console.error("Error fetching services:", error)
      alert("Failed to load services")
    } finally {
      setLoading(false)
    }
  }

  const iconOptions = [
    "PiggyBank",
    "Star",
    "Users",
    "Building2",
    "CreditCard",
    "Smartphone",
    "SmartphoneNfc",
    "Shield",
    "Calculator",
    "Briefcase",
    "GraduationCap",
    "Home",
    "Zap",
    "Clock",
    "Award",
  ]

  const colorOptions = ["green", "purple", "orange", "red", "indigo", "blue", "yellow"]

  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: any } = {
      PiggyBank,
      Star,
      Users,
      Building2,
      CreditCard,
      Smartphone,
      SmartphoneNfc,
      Shield,
      Calculator,
      Briefcase,
      GraduationCap,
      Home,
      Zap,
      Clock,
      Award,
    }
    return icons[iconName] || PiggyBank
  }

  const handleDelete = async (id: string, type: string) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return

    try {
      setSavingLoading(true)

      if (type === "savings") {
        await servicesAPI.deleteSavingScheme(id)
        setSavingSchemes((prev) => prev.filter((item) => item._id !== id))
      } else if (type === "loans") {
        await servicesAPI.deleteLoanScheme(id)
        setLoanSchemes((prev) => prev.filter((item) => item._id !== id))
      } else if (type === "facilities") {
        await servicesAPI.deleteAdditionalFacility(id)
        setAdditionalFacilities((prev) => prev.filter((item) => item._id !== id))
      }

      alert("Item deleted successfully")
    } catch (error: any) {
      console.error("Delete error:", error)
      alert(error.response?.data?.message || "Failed to delete item")
    } finally {
      setSavingLoading(false)
    }
  }

  const handleEdit = (item: any, type: string) => {
    setEditingItem({ ...item, type })
    setShowAddModal(true)
  }

  const handleToggleActive = async (id: string, type: string, currentStatus: boolean) => {
    try {
      setSavingLoading(true)

      if (type === "savings") {
        await servicesAPI.updateSavingScheme(id, { isActive: !currentStatus })
        setSavingSchemes((prev) =>
          prev.map((item) => (item._id === id ? { ...item, isActive: !currentStatus } : item)),
        )
      } else if (type === "loans") {
        await servicesAPI.updateLoanScheme(id, { isActive: !currentStatus })
        setLoanSchemes((prev) =>
          prev.map((item) => (item._id === id ? { ...item, isActive: !currentStatus } : item)),
        )
      } else if (type === "facilities") {
        await servicesAPI.updateAdditionalFacility(id, { isActive: !currentStatus })
        setAdditionalFacilities((prev) =>
          prev.map((item) => (item._id === id ? { ...item, isActive: !currentStatus } : item)),
        )
      }
    } catch (error: any) {
      console.error("Toggle active error:", error)
      alert(error.response?.data?.message || "Failed to update status")
    } finally {
      setSavingLoading(false)
    }
  }

  const handleSave = async (formData: any) => {
    try {
      setSavingLoading(true)

      if (editingItem) {
        // Update existing item
        if (editingItem.type === "savings") {
          const response = await servicesAPI.updateSavingScheme(editingItem._id, formData)
          const updatedItem = response.data || response
          setSavingSchemes((prev) =>
            prev.map((item) => (item._id === editingItem._id ? { ...updatedItem } : item)),
          )
        } else if (editingItem.type === "loans") {
          const response = await servicesAPI.updateLoanScheme(editingItem._id, formData)
          const updatedItem = response.data || response
          setLoanSchemes((prev) =>
            prev.map((item) => (item._id === editingItem._id ? { ...updatedItem } : item)),
          )
        } else if (editingItem.type === "facilities") {
          const response = await servicesAPI.updateAdditionalFacility(editingItem._id, formData)
          const updatedItem = response.data || response
          setAdditionalFacilities((prev) =>
            prev.map((item) => (item._id === editingItem._id ? { ...updatedItem } : item)),
          )
        }
        alert("Item updated successfully")
      } else {
        // Add new item - CREATE and then FETCH ALL
        if (activeTab === "savings") {
          await servicesAPI.createSavingScheme(formData)
        } else if (activeTab === "loans") {
          await servicesAPI.createLoanScheme(formData)
        } else if (activeTab === "facilities") {
          await servicesAPI.createAdditionalFacility(formData)
        }
        
        // Fetch all services to get the newly created item with _id
        await fetchAllServices()
        alert("Item created successfully")
      }

      setShowAddModal(false)
      setEditingItem(null)
    } catch (error: any) {
      console.error("Save error:", error)
      alert(error.response?.data?.message || "Failed to save item")
    } finally {
      setSavingLoading(false)
    }
  }

  // Filter function
  const filterItems = (items: any[]) => {
    if (!searchTerm) return items
    return items.filter(
      (item) =>
        item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.type?.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader className="w-12 h-12 text-green-600 animate-spin" />
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Services Management</h1>
          <p className="text-gray-600 mt-2">Manage saving schemes, loan services, and additional facilities</p>
        </div>
        <Button
          onClick={() => {
            setEditingItem(null)
            setShowAddModal(true)
          }}
          icon={Plus}
          className="bg-green-600 hover:bg-green-700"
          disabled={savingLoading}
        >
          Add New Service
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("savings")}
          className={`px-6 py-3 rounded-lg font-semibold transition-all ${
            activeTab === "savings"
              ? "bg-green-600 text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          Saving Schemes ({savingSchemes.length})
        </button>
        <button
          onClick={() => setActiveTab("loans")}
          className={`px-6 py-3 rounded-lg font-semibold transition-all ${
            activeTab === "loans" ? "bg-green-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          Loan Services ({loanSchemes.length})
        </button>
        <button
          onClick={() => setActiveTab("facilities")}
          className={`px-6 py-3 rounded-lg font-semibold transition-all ${
            activeTab === "facilities"
              ? "bg-green-600 text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          Additional Facilities ({additionalFacilities.length})
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      {/* Content based on active tab */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeTab === "savings" &&
          filterItems(savingSchemes).map((scheme) => {
            const Icon = getIconComponent(scheme.icon)
            return (
              <Card key={scheme._id} className="relative">
                {!scheme.isActive && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                    Inactive
                  </div>
                )}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Icon className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{scheme.title}</h3>
                      <p className="text-sm text-gray-500">{scheme.interestRate} Interest</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Min Deposit:</span>
                    <span className="font-semibold">{scheme.minDeposit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Target Group:</span>
                    <span className="font-semibold text-xs">{scheme.targetGroup}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(scheme, "savings")}
                    icon={Edit}
                    fullWidth
                    disabled={savingLoading}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleToggleActive(scheme._id!, "savings", scheme.isActive)}
                    icon={scheme.isActive ? X : Check}
                    fullWidth
                    disabled={savingLoading}
                  >
                    {scheme.isActive ? "Deactivate" : "Activate"}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(scheme._id!, "savings")}
                    icon={Trash2}
                    className="text-red-600 hover:text-red-700"
                    disabled={savingLoading}
                  >
                    Delete
                  </Button>
                </div>
              </Card>
            )
          })}

        {activeTab === "loans" &&
          filterItems(loanSchemes).map((loan) => {
            const Icon = getIconComponent(loan.icon)
            return (
              <Card key={loan._id} className="relative">
                {!loan.isActive && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                    Inactive
                  </div>
                )}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Icon className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{loan.type}</h3>
                      <p className="text-sm text-gray-500">{loan.description}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-4 text-sm">
                  <p className="text-gray-600 mb-1">Interest Rates:</p>
                  <div className="grid grid-cols-2 gap-1">
                    {Object.entries(loan.rates || {}).map(([term, rate]) => (
                      <div key={term} className="text-xs">
                        <span className="text-gray-600">{term}:</span>{" "}
                        <span className="font-semibold">{String(rate)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(loan, "loans")}
                    icon={Edit}
                    fullWidth
                    disabled={savingLoading}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleToggleActive(loan._id!, "loans", loan.isActive)}
                    icon={loan.isActive ? X : Check}
                    fullWidth
                    disabled={savingLoading}
                  >
                    {loan.isActive ? "Deactivate" : "Activate"}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(loan._id!, "loans")}
                    icon={Trash2}
                    className="text-red-600 hover:text-red-700"
                    disabled={savingLoading}
                  >
                    Delete
                  </Button>
                </div>
              </Card>
            )
          })}

        {activeTab === "facilities" &&
          filterItems(additionalFacilities).map((facility) => {
            const Icon = getIconComponent(facility.icon)
            return (
              <Card key={facility._id} className="relative">
                {!facility.isActive && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                    Inactive
                  </div>
                )}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Icon className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{facility.title}</h3>
                      <p className="text-sm text-gray-500">{facility.description}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600">{facility.features.length} features</p>
                  {facility.playStoreLink && <p className="text-xs text-blue-600 mt-1">Has Play Store Link</p>}
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(facility, "facilities")}
                    icon={Edit}
                    fullWidth
                    disabled={savingLoading}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleToggleActive(facility._id!, "facilities", facility.isActive)}
                    icon={facility.isActive ? X : Check}
                    fullWidth
                    disabled={savingLoading}
                  >
                    {facility.isActive ? "Deactivate" : "Activate"}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(facility._id!, "facilities")}
                    icon={Trash2}
                    className="text-red-600 hover:text-red-700"
                    disabled={savingLoading}
                  >
                    Delete
                  </Button>
                </div>
              </Card>
            )
          })}
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showAddModal && (
          <ServiceFormModal
            type={editingItem?.type || activeTab}
            initialData={editingItem}
            onSave={handleSave}
            onCancel={() => {
              setShowAddModal(false)
              setEditingItem(null)
            }}
            iconOptions={iconOptions}
            colorOptions={colorOptions}
            loading={savingLoading}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

// Service Form Modal Component
interface ServiceFormModalProps {
  type: string
  initialData?: any
  onSave: (data: any) => void
  onCancel: () => void
  iconOptions: string[]
  colorOptions: string[]
  loading: boolean
}

const ServiceFormModal: React.FC<ServiceFormModalProps> = ({
  type,
  initialData,
  onSave,
  onCancel,
  iconOptions,
  colorOptions,
  loading,
}) => {
  const [formData, setFormData] = useState<any>(() => {
    if (initialData) {
      // Don't include the 'type' field (used for routing) in formData
      const { type: _type, _id, ...cleanData } = initialData
      return { ...cleanData }
    }

    // Default values based on type
    if (type === "savings") {
      return {
        title: "",
        icon: "PiggyBank",
        minDeposit: "",
        minBalance: "",
        interestRate: "",
        maxWithdrawal: "",
        targetGroup: "",
        features: [""],
        color: "green",
        isActive: true,
      }
    } else if (type === "loans") {
      return {
        type: "",
        icon: "Users",
        rates: { "1 Month": "", "3 Months": "", "6 Months": "", "1 Year": "" },
        description: "",
        features: [""],
        isActive: true,
      }
    } else {
      return {
        title: "",
        description: "",
        icon: "Building2",
        features: [""],
        playStoreLink: "",
        isActive: true,
      }
    }
  })

  const [newFeature, setNewFeature] = useState("")
  const [newRateType, setNewRateType] = useState("")
  const [newRateValue, setNewRateValue] = useState("")

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData({ ...formData, features: [...formData.features, newFeature.trim()] })
      setNewFeature("")
    }
  }

  const removeFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_: any, i: number) => i !== index),
    })
  }

  const addRate = () => {
    if (newRateType.trim() && newRateValue.trim()) {
      setFormData({
        ...formData,
        rates: { ...formData.rates, [newRateType.trim()]: newRateValue.trim() },
      })
      setNewRateType("")
      setNewRateValue("")
    }
  }

  const removeRate = (term: string) => {
    const newRates = { ...formData.rates }
    delete newRates[term]
    setFormData({ ...formData, rates: newRates })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Remove empty features
    const cleanedData = {
      ...formData,
      features: formData.features.filter((f: string) => f.trim() !== ""),
    }

    onSave(cleanedData)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onCancel}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            {initialData ? "Edit" : "Add"}{" "}
            {type === "savings" ? "Saving Scheme" : type === "loans" ? "Loan Service" : "Additional Facility"}
          </h2>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {type === "loans" ? "Loan Type" : "Title"}
            </label>
            <input
              type="text"
              value={type === "loans" ? formData.type : formData.title}
              onChange={(e) =>
                setFormData({ ...formData, [type === "loans" ? "type" : "title"]: e.target.value })
              }
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
              placeholder={`Enter ${type === "loans" ? "loan type" : "title"}...`}
            />
          </div>

          {(type === "loans" || type === "facilities") && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={formData.description || ""}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                rows={3}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
            <select
              value={formData.icon || ""}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select Icon</option>
              {iconOptions.map((icon) => (
                <option key={icon} value={icon}>
                  {icon}
                </option>
              ))}
            </select>
          </div>

          {type === "savings" && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Interest Rate</label>
                  <input
                    type="text"
                    value={formData.interestRate || ""}
                    onChange={(e) => setFormData({ ...formData, interestRate: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                    placeholder="e.g., 5%"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Min. Deposit</label>
                  <input
                    type="text"
                    value={formData.minDeposit || ""}
                    onChange={(e) => setFormData({ ...formData, minDeposit: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                    placeholder="e.g., Rs. 200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Min. Balance</label>
                  <input
                    type="text"
                    value={formData.minBalance || ""}
                    onChange={(e) => setFormData({ ...formData, minBalance: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                    placeholder="e.g., Rs. 500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max. Withdrawal</label>
                  <input
                    type="text"
                    value={formData.maxWithdrawal || ""}
                    onChange={(e) => setFormData({ ...formData, maxWithdrawal: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                    placeholder="e.g., Rs. 200,000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Target Group</label>
                  <input
                    type="text"
                    value={formData.targetGroup || ""}
                    onChange={(e) => setFormData({ ...formData, targetGroup: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                    placeholder="e.g., Housewives, Businesspersons"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Color Theme</label>
                  <select
                    value={formData.color || ""}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Select Color</option>
                    {colorOptions.map((color) => (
                      <option key={color} value={color}>
                        {color.charAt(0).toUpperCase() + color.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </>
          )}

          {type === "loans" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Interest Rates</label>
              <div className="space-y-3">
                {formData.rates &&
                  Object.entries(formData.rates).map(([term, rate]) => (
                    <div key={term} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={term}
                        onChange={(e) => {
                          const newRates = { ...formData.rates }
                          delete newRates[term]
                          newRates[e.target.value] = rate as string
                          setFormData({ ...formData, rates: newRates })
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                        placeholder="Term (e.g., 1 Month)"
                      />
                      <input
                        type="text"
                        value={rate as string}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            rates: { ...formData.rates, [term]: e.target.value },
                          })
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                        placeholder="Rate (e.g., 14%)"
                      />
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => removeRate(term)}
                        className="text-red-600 hover:text-red-700"
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={newRateType}
                    onChange={(e) => setNewRateType(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                    placeholder="New term (e.g., 2 Years)"
                  />
                  <input
                    type="text"
                    value={newRateValue}
                    onChange={(e) => setNewRateValue(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                    placeholder="Rate (e.g., 18%)"
                  />
                  <Button type="button" size="sm" onClick={addRate}>
                    Add Rate
                  </Button>
                </div>
              </div>
            </div>
          )}

          {type === "facilities" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Play Store Link (Optional)
              </label>
              <input
                type="url"
                value={formData.playStoreLink || ""}
                onChange={(e) => setFormData({ ...formData, playStoreLink: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                placeholder="https://play.google.com/store/apps/details?id=..."
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Key Features</label>
            <div className="space-y-2">
              {formData.features &&
                formData.features.map((feature: string, index: number) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => {
                        const updatedFeatures = [...formData.features]
                        updatedFeatures[index] = e.target.value
                        setFormData({ ...formData, features: updatedFeatures })
                      }}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                    />
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => removeFeature(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                  placeholder="Add new feature..."
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
                />
                <Button type="button" size="sm" onClick={addFeature}>
                  Add Feature
                </Button>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
            <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
              Active (visible to users)
            </label>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-700"
              disabled={loading}
              icon={loading ? Loader : undefined}
            >
              {loading ? "Saving..." : initialData ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

export default AdminServices