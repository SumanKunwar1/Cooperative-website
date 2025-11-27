"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  PiggyBank,
  CreditCard,
  Star,
  Users,
  Building2,
  Smartphone,
  Shield,
  Calculator,
  Heart,
  Briefcase,
  GraduationCap,
  Home,
  Zap,
  Clock,
  Award,
} from "lucide-react"
import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"

interface SavingScheme {
  id: string
  title: string
  icon: string
  minDeposit: string
  minBalance: string
  interestRate: string
  maxWithdrawal: string
  targetGroup: string
  features: string[]
  color: string
}

interface LoanScheme {
  id: string
  type: string
  icon: string
  rates: { [key: string]: string }
  description: string
  features: string[]
}

interface AdditionalFacility {
  id: string
  title: string
  description: string
  icon: string
  features: string[]
}

const AdminServices: React.FC = () => {
  const [activeTab, setActiveTab] = useState("savings")
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)

  // Sample data - in real app, this would come from API
  const [savingSchemes, setSavingSchemes] = useState<SavingScheme[]>([
    {
      id: "general",
      title: "Constellation General Saving Scheme",
      icon: "PiggyBank",
      minDeposit: "Rs. 200",
      minBalance: "Rs. 500",
      interestRate: "5%",
      maxWithdrawal: "Rs. 200,000",
      targetGroup: "Housewives, Businesspersons, Employees",
      features: [
        "Flexible saving: Daily, Weekly, or Monthly",
        "Interest calculated on daily balance",
        "Interest merged with principal every 6 months",
        "Flexible withdrawal as per need",
      ],
      color: "green",
    },
    {
      id: "special",
      title: "Constellation Special Saving Scheme",
      icon: "Star",
      minDeposit: "Rs. 500",
      minBalance: "Rs. 1,000",
      interestRate: "6%",
      maxWithdrawal: "Rs. 300,000",
      targetGroup: "All Members",
      features: [
        "Higher interest rate than general scheme",
        "Daily, Weekly, or Monthly deposits",
        'Slogan: "Increased income and employment"',
        "Better withdrawal limits",
      ],
      color: "green",
    },
  ])

  const [loanSchemes, setLoanSchemes] = useState<LoanScheme[]>([
    {
      id: "personal",
      type: "Personal Loan",
      icon: "Users",
      rates: { "1 Month": "14%", "3 Months": "15%", "6 Months": "16%", "1 Year": "17%" },
      description: "For personal financial needs and emergencies",
      features: ["Quick approval", "Minimal documentation", "Flexible repayment"],
    },
    {
      id: "business",
      type: "Business Loan",
      icon: "Building2",
      rates: { "1 Month": "14%", "3 Months": "15%", "6 Months": "16%", "1 Year": "17%" },
      description: "Support your business growth and expansion",
      features: ["Business development", "Working capital", "Equipment purchase"],
    },
  ])

  const [additionalFacilities, setAdditionalFacilities] = useState<AdditionalFacility[]>([
    {
      id: "atm",
      title: "ATM Services",
      description: "Convenient 24/7 access to your funds",
      icon: "CreditCard",
      features: ["24/7 cash withdrawal", "Balance inquiry", "Mini statements", "PIN change facility"],
    },
    {
      id: "digital",
      title: "Digital Banking",
      description: "Online and mobile banking services (planned expansion)",
      icon: "Smartphone",
      features: ["Account management", "Fund transfers", "Bill payments", "Transaction history"],
    },
  ])

  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: any } = {
      PiggyBank,
      Star,
      Users,
      Building2,
      CreditCard,
      Smartphone,
      Shield,
      Calculator,
      Heart,
      Briefcase,
      GraduationCap,
      Home,
      Zap,
      Clock,
      Award,
    }
    return icons[iconName] || PiggyBank
  }

  const handleDelete = (id: string, type: string) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      if (type === "savings") {
        setSavingSchemes((prev) => prev.filter((item) => item.id !== id))
      } else if (type === "loans") {
        setLoanSchemes((prev) => prev.filter((item) => item.id !== id))
      } else if (type === "facilities") {
        setAdditionalFacilities((prev) => prev.filter((item) => item.id !== id))
      }
    }
  }

  const handleEdit = (item: any, type: string) => {
    setEditingItem({ ...item, type })
    setShowAddModal(true)
  }

  const handleSave = (formData: any) => {
    if (editingItem) {
      // Update existing item
      if (editingItem.type === "savings") {
        setSavingSchemes((prev) =>
          prev.map((item) => (item.id === editingItem.id ? { ...formData, id: editingItem.id } : item)),
        )
      } else if (editingItem.type === "loans") {
        setLoanSchemes((prev) =>
          prev.map((item) => (item.id === editingItem.id ? { ...formData, id: editingItem.id } : item)),
        )
      } else if (editingItem.type === "facilities") {
        setAdditionalFacilities((prev) =>
          prev.map((item) => (item.id === editingItem.id ? { ...formData, id: editingItem.id } : item)),
        )
      }
    } else {
      // Add new item
      const newId = Date.now().toString()
      if (activeTab === "savings") {
        setSavingSchemes((prev) => [...prev, { ...formData, id: newId }])
      } else if (activeTab === "loans") {
        setLoanSchemes((prev) => [...prev, { ...formData, id: newId }])
      } else if (activeTab === "facilities") {
        setAdditionalFacilities((prev) => [...prev, { ...formData, id: newId }])
      }
    }
    setShowAddModal(false)
    setEditingItem(null)
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Services Management</h1>
          <p className="text-gray-600 mt-2">Manage saving schemes, loan services, and additional facilities</p>
        </div>
        <Button onClick={() => setShowAddModal(true)} icon={Plus} className="bg-green-600 hover:bg-green-700">
          Add New Service
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-6">
        {[
          { id: "savings", label: "Saving Schemes", icon: PiggyBank },
          { id: "loans", label: "Loan Services", icon: CreditCard },
          { id: "facilities", label: "Additional Facilities", icon: Star },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center px-4 py-2 rounded-md font-medium transition-all duration-200 ${
              activeTab === tab.id ? "bg-white text-green-600 shadow-sm" : "text-gray-600 hover:text-green-600"
            }`}
          >
            <tab.icon className="w-4 h-4 mr-2" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <Button variant="outline" icon={Filter}>
          Filter
        </Button>
      </div>

      {/* Content based on active tab */}
      <AnimatePresence mode="wait">
        {activeTab === "savings" && (
          <motion.div
            key="savings"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {savingSchemes
              .filter((scheme) => scheme.title.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((scheme) => {
                const IconComponent = getIconComponent(scheme.icon)
                return (
                  <Card key={scheme.id} className="hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                          <IconComponent className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{scheme.title}</h3>
                          <p className="text-sm text-gray-600">{scheme.targetGroup}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" onClick={() => handleEdit(scheme, "savings")} icon={Edit} children={undefined} />
                        <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleDelete(scheme.id, "savings")}
                                    icon={Trash2}
                                    className="text-red-600 hover:text-red-700" children={undefined}                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-sm text-gray-600">Interest Rate</div>
                        <div className="font-semibold text-green-600">{scheme.interestRate}</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-sm text-gray-600">Min. Deposit</div>
                        <div className="font-semibold text-gray-900">{scheme.minDeposit}</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {scheme.features.slice(0, 2).map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-600">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </Card>
                )
              })}
          </motion.div>
        )}

        {activeTab === "loans" && (
          <motion.div
            key="loans"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {loanSchemes
              .filter((loan) => loan.type.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((loan) => {
                const IconComponent = getIconComponent(loan.icon)
                return (
                  <Card key={loan.id} className="hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                          <IconComponent className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{loan.type}</h3>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" onClick={() => handleEdit(loan, "loans")} icon={Edit} children={undefined} />
                        <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleDelete(loan.id, "loans")}
                                    icon={Trash2}
                                    className="text-red-600 hover:text-red-700" children={undefined}                        />
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-4">{loan.description}</p>

                    <div className="bg-gray-50 rounded-lg p-3 mb-4">
                      <div className="text-sm text-gray-600 mb-2">Interest Rates:</div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {Object.entries(loan.rates).map(([term, rate]) => (
                          <div key={term} className="flex justify-between">
                            <span>{term}:</span>
                            <span className="font-semibold text-green-600">{rate}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      {loan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-600">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </Card>
                )
              })}
          </motion.div>
        )}

        {activeTab === "facilities" && (
          <motion.div
            key="facilities"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {additionalFacilities
              .filter((facility) => facility.title.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((facility) => {
                const IconComponent = getIconComponent(facility.icon)
                return (
                  <Card key={facility.id} className="hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                          <IconComponent className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{facility.title}</h3>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleEdit(facility, "facilities")}
                                    icon={Edit} children={undefined}                        />
                        <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleDelete(facility.id, "facilities")}
                                    icon={Trash2}
                                    className="text-red-600 hover:text-red-700" children={undefined}                        />
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-4">{facility.description}</p>

                    <div className="space-y-2">
                      {facility.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-600">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </Card>
                )
              })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">{editingItem ? "Edit Service" : "Add New Service"}</h2>
            <ServiceForm
              initialData={editingItem}
              onSave={handleSave}
              onCancel={() => {
                setShowAddModal(false)
                setEditingItem(null)
              }}
              type={editingItem?.type || activeTab}
            />
          </div>
        </div>
      )}
    </div>
  )
}

// Service Form Component
const ServiceForm: React.FC<{
  initialData?: any
  onSave: (data: any) => void
  onCancel: () => void
  type: string
}> = ({ initialData, onSave, onCancel, type }) => {
  const [formData, setFormData] = useState(
    initialData || {
      features: [],
      rates: type === "loans" ? { "1 Month": "", "3 Months": "", "6 Months": "", "1 Year": "" } : undefined,
    },
  )

  const [newFeature, setNewFeature] = useState("")
  const [newRateType, setNewRateType] = useState("")
  const [newRateValue, setNewRateValue] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData({
        ...formData,
        features: [...(formData.features || []), newFeature.trim()],
      })
      setNewFeature("")
    }
  }

  const removeFeature = (index: number) => {
    const updatedFeatures = formData.features.filter((_: any, i: number) => i !== index)
    setFormData({ ...formData, features: updatedFeatures })
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

  const removeRate = (rateType: string) => {
    const updatedRates = { ...formData.rates }
    delete updatedRates[rateType]
    setFormData({ ...formData, rates: updatedRates })
  }

  const iconOptions = [
    "PiggyBank",
    "Star",
    "Users",
    "Building2",
    "CreditCard",
    "Smartphone",
    "Shield",
    "Calculator",
    "Heart",
    "Briefcase",
    "GraduationCap",
    "Home",
    "Zap",
    "Clock",
    "Award",
  ]

  const colorOptions = ["green", "green", "purple", "red", "yellow", "indigo", "pink", "gray"]

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title/Name</label>
        <input
          type="text"
          value={formData.title || formData.type || ""}
          onChange={(e) => setFormData({ ...formData, [type === "loans" ? "type" : "title"]: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          value={formData.description || ""}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
          rows={3}
        />
      </div>

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

      <div className="flex justify-end space-x-3 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-green-600 hover:bg-green-700">
          {initialData ? "Update" : "Create"}
        </Button>
      </div>
    </form>
  )
}

export default AdminServices
