"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Edit, Trash2, Search, Filter, Mail, Phone, User, Upload, Eye } from "lucide-react"
import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"

interface Shareholder {
  id: number
  name: string
  picture: string
  position: string
  companyName: string
  email: string
  phoneNumber: string
}

const AdminShareholders: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingShareholder, setEditingShareholder] = useState<Shareholder | null>(null)
  const [viewingShareholder, setViewingShareholder] = useState<Shareholder | null>(null)

  const [shareholders, setShareholders] = useState<Shareholder[]>([
    {
      id: 1,
      name: "Ram Bahadur Shrestha",
      picture: "/placeholder.svg?height=200&width=200",
      position: "Chairman",
      companyName: "Constellation Saving & Credit Cooperative Ltd.",
      email: "ram.shrestha@constellation.com",
      phoneNumber: "+977-01-4254939",
    },
    {
      id: 2,
      name: "Sita Devi Maharjan",
      picture: "/placeholder.svg?height=200&width=200",
      position: "Vice Chairman",
      companyName: "Constellation Saving & Credit Cooperative Ltd.",
      email: "sita.maharjan@constellation.com",
      phoneNumber: "+977-01-4254940",
    },
    {
      id: 3,
      name: "Krishna Kumar Tamang",
      picture: "/placeholder.svg?height=200&width=200",
      position: "Secretary",
      companyName: "Constellation Saving & Credit Cooperative Ltd.",
      email: "krishna.tamang@constellation.com",
      phoneNumber: "+977-01-4254941",
    },
    {
      id: 4,
      name: "Maya Gurung",
      picture: "/placeholder.svg?height=200&width=200",
      position: "Treasurer",
      companyName: "Constellation Saving & Credit Cooperative Ltd.",
      email: "maya.gurung@constellation.com",
      phoneNumber: "+977-01-4254942",
    },
  ])

  const filteredShareholders = shareholders.filter(
    (shareholder) =>
      shareholder.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shareholder.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shareholder.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this shareholder?")) {
      setShareholders((prev) => prev.filter((shareholder) => shareholder.id !== id))
    }
  }

  const handleEdit = (shareholder: Shareholder) => {
    setEditingShareholder(shareholder)
    setShowAddModal(true)
  }

  const handleSave = (formData: Omit<Shareholder, "id">) => {
    if (editingShareholder) {
      // Update existing shareholder
      setShareholders((prev) =>
        prev.map((shareholder) =>
          shareholder.id === editingShareholder.id ? { ...formData, id: editingShareholder.id } : shareholder,
        ),
      )
    } else {
      // Add new shareholder
      const newId = Math.max(...shareholders.map((s) => s.id), 0) + 1
      setShareholders((prev) => [...prev, { ...formData, id: newId }])
    }
    setShowAddModal(false)
    setEditingShareholder(null)
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Shareholders Management</h1>
          <p className="text-gray-600 mt-2">Manage board members and shareholders information</p>
        </div>
        <Button onClick={() => setShowAddModal(true)} icon={Plus} className="bg-blue-600 hover:bg-blue-700">
          Add New Shareholder
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search shareholders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <Button variant="outline" icon={Filter}>
          Filter
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Shareholders</p>
              <p className="text-2xl font-bold text-gray-900">{shareholders.length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
              <User className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Board Members</p>
              <p className="text-2xl font-bold text-gray-900">
                {shareholders.filter((s) => s.position !== "Board Member").length}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
              <Mail className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">With Email</p>
              <p className="text-2xl font-bold text-gray-900">{shareholders.filter((s) => s.email).length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
              <Phone className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">With Phone</p>
              <p className="text-2xl font-bold text-gray-900">{shareholders.filter((s) => s.phoneNumber).length}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Shareholders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredShareholders.map((shareholder) => (
          <motion.div
            key={shareholder.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
              {/* Profile Image */}
              <div className="relative">
                <img
                  src={shareholder.picture || "/placeholder.svg?height=200&width=200"}
                  alt={shareholder.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 flex space-x-1">
                  <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setViewingShareholder(shareholder)}
                                icon={Eye}
                                className="bg-white/90 hover:bg-white" children={undefined}                  />
                </div>
              </div>

              {/* Card Content */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{shareholder.name}</h3>
                <p className="text-blue-600 font-semibold text-sm mb-2">{shareholder.position}</p>
                <p className="text-gray-600 text-xs mb-3 font-medium">{shareholder.companyName}</p>

                {/* Contact Information */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-xs text-gray-600">
                    <Mail className="w-3 h-3 mr-2 text-blue-500" />
                    <span className="truncate">{shareholder.email}</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <Phone className="w-3 h-3 mr-2 text-blue-500" />
                    <span>{shareholder.phoneNumber}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(shareholder)}
                    icon={Edit}
                    className="flex-1"
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(shareholder.id)}
                    icon={Trash2}
                    className="text-red-600 hover:text-red-700 hover:border-red-300"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">
              {editingShareholder ? "Edit Shareholder" : "Add New Shareholder"}
            </h2>
            <ShareholderForm
              initialData={editingShareholder}
              onSave={handleSave}
              onCancel={() => {
                setShowAddModal(false)
                setEditingShareholder(null)
              }}
            />
          </div>
        </div>
      )}

      {/* View Modal */}
      {viewingShareholder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <div className="text-center">
              <img
                src={viewingShareholder.picture || "/placeholder.svg?height=200&width=200"}
                alt={viewingShareholder.name}
                className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
              />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{viewingShareholder.name}</h2>
              <p className="text-blue-600 font-semibold mb-2">{viewingShareholder.position}</p>
              <p className="text-gray-600 text-sm mb-4">{viewingShareholder.companyName}</p>
              <div className="space-y-3 text-left">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-3 text-blue-500" />
                  <span className="text-gray-700">{viewingShareholder.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-3 text-blue-500" />
                  <span className="text-gray-700">{viewingShareholder.phoneNumber}</span>
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <Button onClick={() => setViewingShareholder(null)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Shareholder Form Component
const ShareholderForm: React.FC<{
  initialData?: Shareholder | null
  onSave: (data: Omit<Shareholder, "id">) => void
  onCancel: () => void
}> = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    picture: initialData?.picture || "",
    position: initialData?.position || "",
    companyName: initialData?.companyName || "Constellation Saving & Credit Cooperative Ltd.",
    email: initialData?.email || "",
    phoneNumber: initialData?.phoneNumber || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setFormData({ ...formData, picture: e.target?.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Image Upload */}
      <div className="text-center">
        <div className="w-24 h-24 mx-auto mb-4 relative">
          <img
            src={formData.picture || "/placeholder.svg?height=200&width=200"}
            alt="Profile"
            className="w-full h-full object-cover rounded-full border-4 border-gray-200"
          />
          <label className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-1 cursor-pointer hover:bg-blue-700">
            <Upload className="w-4 h-4" />
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
          <select
            value={formData.position}
            onChange={(e) => setFormData({ ...formData, position: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Position</option>
            <option value="Chairman">Chairman</option>
            <option value="Vice Chairman">Vice Chairman</option>
            <option value="Secretary">Secretary</option>
            <option value="Treasurer">Treasurer</option>
            <option value="Board Member">Board Member</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
        <input
          type="text"
          value={formData.companyName}
          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input
            type="tel"
            value={formData.phoneNumber}
            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
          {initialData ? "Update" : "Create"}
        </Button>
      </div>
    </form>
  )
}

export default AdminShareholders
