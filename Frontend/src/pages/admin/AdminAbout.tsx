"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  PencilIcon,
  PlusIcon,
  CheckIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  MapPinIcon,
  BookOpenIcon,
  HeartIcon,
  GlobeAltIcon,
  ClockIcon,
} from "@heroicons/react/24/outline"
import AdminDashboard from "./AdminDashboard"
import Button from "../../components/ui/Button"
import Card from "../../components/ui/Card"
import { aboutApi, AboutData } from "../../services/aboutApi"

const AdminAbout: React.FC = () => {
  const [aboutData, setAboutData] = useState<AboutData | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editingCompany, setEditingCompany] = useState(false)
  const [editingStory, setEditingStory] = useState(false)
  const [editingValue, setEditingValue] = useState<string | null>(null)
  const [editingMilestone, setEditingMilestone] = useState<string | null>(null)
  const [editingImpact, setEditingImpact] = useState<string | null>(null)
  const [showAddValue, setShowAddValue] = useState(false)
  const [showAddMilestone, setShowAddMilestone] = useState(false)
  const [showAddImpact, setShowAddImpact] = useState(false)

  const [newValue, setNewValue] = useState({
    title: "",
    description: "",
    icon: "🤝",
    images: []
  })

  const [newMilestone, setNewMilestone] = useState({
    year: "",
    event: "",
    icon: "calendar",
    images: []
  })

  const [newImpact, setNewImpact] = useState({
    title: "",
    description: "",
    metrics: "",
    images: []
  })

  useEffect(() => {
    loadAboutData()
  }, [])

  const loadAboutData = async () => {
    try {
      setLoading(true)
      const result = await aboutApi.getAbout()
      console.log("Admin About API result:", result)
      
      if (result.success && result.data) {
        console.log("Admin About data loaded:", result.data)
        setAboutData(result.data)
      } else {
        console.warn("Failed to load about data, using empty state")
        setAboutData(null)
      }
    } catch (error) {
      console.error("Failed to load about data:", error)
      setAboutData(null)
    } finally {
      setLoading(false)
    }
  }

  const saveCompanyInfo = async () => {
    if (!aboutData) return
    
    try {
      setSaving(true)
      const result = await aboutApi.updateSection("companyInfo", aboutData.companyInfo)
      if (result.success) {
        console.log("Company info saved successfully")
        setEditingCompany(false)
        loadAboutData() // Reload to get fresh data
      }
    } catch (error) {
      console.error("Error saving company info:", error)
      alert("Failed to save company info")
    } finally {
      setSaving(false)
    }
  }

  const saveStory = async () => {
    if (!aboutData) return
    
    try {
      setSaving(true)
      const result = await aboutApi.updateSection("story", aboutData.story)
      if (result.success) {
        console.log("Story saved successfully")
        setEditingStory(false)
        loadAboutData() // Reload to get fresh data
      }
    } catch (error) {
      console.error("Error saving story:", error)
      alert("Failed to save story")
    } finally {
      setSaving(false)
    }
  }

  const handleAddValue = async () => {
    try {
      setSaving(true)
      const result = await aboutApi.addValue(newValue)
      if (result.success) {
        console.log("Value added successfully")
        setNewValue({ title: "", description: "", icon: "🤝", images: [] })
        setShowAddValue(false)
        loadAboutData() // Reload data
      }
    } catch (error) {
      console.error("Error adding value:", error)
      alert("Failed to add value")
    } finally {
      setSaving(false)
    }
  }

  const handleUpdateValue = async (id: string, data: any) => {
    try {
      setSaving(true)
      const result = await aboutApi.updateValue(id, data)
      if (result.success) {
        console.log("Value updated successfully")
        setEditingValue(null)
        loadAboutData() // Reload data
      }
    } catch (error) {
      console.error("Error updating value:", error)
      alert("Failed to update value")
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteValue = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this value?")) return
    
    try {
      setSaving(true)
      const result = await aboutApi.deleteValue(id)
      if (result.success) {
        console.log("Value deleted successfully")
        loadAboutData() // Reload data
      }
    } catch (error) {
      console.error("Error deleting value:", error)
      alert("Failed to delete value")
    } finally {
      setSaving(false)
    }
  }

  const handleAddMilestone = async () => {
    try {
      setSaving(true)
      const result = await aboutApi.addMilestone(newMilestone)
      if (result.success) {
        console.log("Milestone added successfully")
        setNewMilestone({ year: "", event: "", icon: "calendar", images: [] })
        setShowAddMilestone(false)
        loadAboutData() // Reload data
      }
    } catch (error) {
      console.error("Error adding milestone:", error)
      alert("Failed to add milestone")
    } finally {
      setSaving(false)
    }
  }

  const handleAddImpact = async () => {
    try {
      setSaving(true)
      const result = await aboutApi.addImpact(newImpact)
      if (result.success) {
        console.log("Impact added successfully")
        setNewImpact({ title: "", description: "", metrics: "", images: [] })
        setShowAddImpact(false)
        loadAboutData() // Reload data
      }
    } catch (error) {
      console.error("Error adding impact:", error)
      alert("Failed to add impact")
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteMilestone = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this milestone?")) return
    
    try {
      setSaving(true)
      const result = await aboutApi.deleteMilestone(id)
      if (result.success) {
        console.log("Milestone deleted successfully")
        loadAboutData() // Reload data
      }
    } catch (error) {
      console.error("Error deleting milestone:", error)
      alert("Failed to delete milestone")
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteImpact = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this impact?")) return
    
    try {
      setSaving(true)
      const result = await aboutApi.deleteImpact(id)
      if (result.success) {
        console.log("Impact deleted successfully")
        loadAboutData() // Reload data
      }
    } catch (error) {
      console.error("Error deleting impact:", error)
      alert("Failed to delete impact")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <AdminDashboard currentSection="about">
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      </AdminDashboard>
    )
  }

  if (!aboutData) {
    return (
      <AdminDashboard currentSection="about">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No About Data Found</h2>
          <p className="text-gray-600">Please check if the backend server is running.</p>
          <button 
            onClick={loadAboutData} 
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Retry
          </button>
        </div>
      </AdminDashboard>
    )
  }

  // Create a custom Button component that supports loading state
  const LoadingButton = ({ children, onClick, variant = "primary", icon: Icon, loading = false, ...props }: any) => (
    <button
      onClick={onClick}
      disabled={loading}
      className={`
        flex items-center px-4 py-2 rounded-lg transition-colors duration-200
        ${variant === "primary" ? "bg-green-600 text-white hover:bg-green-700" : ""}
        ${variant === "secondary" ? "bg-gray-200 text-gray-700 hover:bg-gray-300" : ""}
        ${variant === "ghost" ? "bg-transparent text-gray-600 hover:bg-gray-100" : ""}
        ${loading ? "opacity-50 cursor-not-allowed" : ""}
        ${props.className || ""}
      `}
      {...props}
    >
      {loading ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
          Saving...
        </>
      ) : (
        <>
          {Icon && <Icon className="h-4 w-4 mr-2" />}
          {children}
        </>
      )}
    </button>
  )

  return (
    <AdminDashboard currentSection="about">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">About Us Management</h1>
            <p className="text-gray-600 mt-2">Manage all sections of the About Us page</p>
          </div>
        </div>

        {/* Story Section */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <BookOpenIcon className="h-6 w-6 mr-2 text-green-600" />
              Our Story Since 2010
            </h2>
            <button
              onClick={() => setEditingStory(!editingStory)}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-200 ${
                editingStory ? "bg-gray-200 text-gray-700 hover:bg-gray-300" : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              <PencilIcon className="h-4 w-4 mr-2" />
              {editingStory ? "Cancel" : "Edit"}
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              {editingStory ? (
                <input
                  type="text"
                  value={aboutData.story.title}
                  onChange={(e) => setAboutData(prev => prev ? {
                    ...prev,
                    story: { ...prev.story, title: e.target.value }
                  } : prev)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{aboutData.story.title}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
              {editingStory ? (
                <textarea
                  value={aboutData.story.paragraphs.join('\n\n')}
                  onChange={(e) => setAboutData(prev => prev ? {
                    ...prev,
                    story: { ...prev.story, paragraphs: e.target.value.split('\n\n') }
                  } : prev)}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              ) : (
                <div className="space-y-3">
                  {aboutData.story.paragraphs.map((paragraph, index) => (
                    <p key={index} className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}
            </div>

            {editingStory && (
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setEditingStory(false)}
                  className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                >
                  Cancel
                </button>
                <LoadingButton onClick={saveStory} variant="primary" icon={CheckIcon} loading={saving}>
                  Save Changes
                </LoadingButton>
              </div>
            )}
          </div>
        </Card>

        {/* Company Information */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <BuildingOfficeIcon className="h-6 w-6 mr-2 text-purple-600" />
              Company Information
            </h2>
            <button
              onClick={() => setEditingCompany(!editingCompany)}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-200 ${
                editingCompany ? "bg-gray-200 text-gray-700 hover:bg-gray-300" : "bg-purple-600 text-white hover:bg-purple-700"
              }`}
            >
              <PencilIcon className="h-4 w-4 mr-2" />
              {editingCompany ? "Cancel" : "Edit"}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <CalendarIcon className="h-4 w-4 inline mr-1" />
                Established Date
              </label>
              {editingCompany ? (
                <input
                  type="text"
                  value={aboutData.companyInfo.establishedDate}
                  onChange={(e) => setAboutData(prev => prev ? {
                    ...prev,
                    companyInfo: { ...prev.companyInfo, establishedDate: e.target.value }
                  } : prev)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{aboutData.companyInfo.establishedDate}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPinIcon className="h-4 w-4 inline mr-1" />
                Office Location
              </label>
              {editingCompany ? (
                <textarea
                  value={aboutData.companyInfo.officeAddress}
                  onChange={(e) => setAboutData(prev => prev ? {
                    ...prev,
                    companyInfo: { ...prev.companyInfo, officeAddress: e.target.value }
                  } : prev)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{aboutData.companyInfo.officeAddress}</p>
              )}
            </div>

            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Registration Number</label>
              {editingCompany ? (
                <input
                  type="text"
                  value={aboutData.companyInfo.registrationNumber}
                  onChange={(e) => setAboutData(prev => prev ? {
                    ...prev,
                    companyInfo: { ...prev.companyInfo, registrationNumber: e.target.value }
                  } : prev)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{aboutData.companyInfo.registrationNumber}</p>
              )}
            </div>

            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Mission</label>
              {editingCompany ? (
                <textarea
                  value={aboutData.companyInfo.mission}
                  onChange={(e) => setAboutData(prev => prev ? {
                    ...prev,
                    companyInfo: { ...prev.companyInfo, mission: e.target.value }
                  } : prev)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{aboutData.companyInfo.mission}</p>
              )}
            </div>

            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Vision</label>
              {editingCompany ? (
                <textarea
                  value={aboutData.companyInfo.vision}
                  onChange={(e) => setAboutData(prev => prev ? {
                    ...prev,
                    companyInfo: { ...prev.companyInfo, vision: e.target.value }
                  } : prev)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{aboutData.companyInfo.vision}</p>
              )}
            </div>
          </div>

          {editingCompany && (
            <div className="flex justify-end mt-6 space-x-3">
              <button
                onClick={() => setEditingCompany(false)}
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
              >
                Cancel
              </button>
              <LoadingButton onClick={saveCompanyInfo} variant="primary" icon={CheckIcon} loading={saving}>
                Save Changes
              </LoadingButton>
            </div>
          )}
        </Card>

        {/* Values Section */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <HeartIcon className="h-6 w-6 mr-2 text-red-600" />
              Our Values
            </h2>
            <button
              onClick={() => setShowAddValue(!showAddValue)}
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Value
            </button>
          </div>

          {/* Add New Value Form */}
          {showAddValue && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="bg-red-50 p-4 rounded-lg mb-6"
            >
              <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Value</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Value Title"
                  value={newValue.title}
                  onChange={(e) => setNewValue(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Icon (emoji)"
                  value={newValue.icon}
                  onChange={(e) => setNewValue(prev => ({ ...prev, icon: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <textarea
                  placeholder="Description"
                  value={newValue.description}
                  onChange={(e) => setNewValue(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <div className="flex justify-end mt-4 space-x-3">
                <button
                  onClick={() => setShowAddValue(false)}
                  className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                >
                  Cancel
                </button>
                <LoadingButton onClick={handleAddValue} variant="primary" icon={CheckIcon} loading={saving}>
                  Add Value
                </LoadingButton>
              </div>
            </motion.div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aboutData.values.map((value) => (
              <Card key={value._id} className="p-4" hover={false}>
                <div className="text-center">
                  {editingValue === value._id ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={value.title}
                        onChange={(e) => {
                          const updatedValues = aboutData.values.map(v => 
                            v._id === value._id ? { ...v, title: e.target.value } : v
                          )
                          setAboutData(prev => prev ? { ...prev, values: updatedValues } : prev)
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                      <textarea
                        value={value.description}
                        onChange={(e) => {
                          const updatedValues = aboutData.values.map(v => 
                            v._id === value._id ? { ...v, description: e.target.value } : v
                          )
                          setAboutData(prev => prev ? { ...prev, values: updatedValues } : prev)
                        }}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                  ) : (
                    <div>
                      <div className="text-4xl mb-3">{value.icon}</div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
                      <p className="text-gray-600 text-sm">{value.description}</p>
                    </div>
                  )}

                  <div className="flex justify-center space-x-2 mt-4">
                    {editingValue === value._id ? (
                      <>
                        <LoadingButton 
                          onClick={() => value._id && handleUpdateValue(value._id, {
                            title: value.title,
                            description: value.description
                          })} 
                          variant="primary" 
                          size="sm"
                          loading={saving}
                        >
                          Save
                        </LoadingButton>
                        <button
                          onClick={() => setEditingValue(null)}
                          className="px-3 py-1 text-gray-600 bg-gray-100 rounded hover:bg-gray-200 text-sm"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => setEditingValue(value._id || null)}
                          className="px-3 py-1 text-gray-600 bg-gray-100 rounded hover:bg-gray-200 text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => value._id && handleDeleteValue(value._id)}
                          className="px-3 py-1 text-red-600 bg-red-100 rounded hover:bg-red-200 text-sm"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Card>

        {/* Milestones Section */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <ClockIcon className="h-6 w-6 mr-2 text-indigo-600" />
              Our Journey
            </h2>
            <button
              onClick={() => setShowAddMilestone(!showAddMilestone)}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Milestone
            </button>
          </div>

          {/* Add New Milestone Form */}
          {showAddMilestone && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="bg-indigo-50 p-4 rounded-lg mb-6"
            >
              <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Milestone</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Year"
                  value={newMilestone.year}
                  onChange={(e) => setNewMilestone(prev => ({ ...prev, year: e.target.value }))}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Event"
                  value={newMilestone.event}
                  onChange={(e) => setNewMilestone(prev => ({ ...prev, event: e.target.value }))}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Icon"
                  value={newMilestone.icon}
                  onChange={(e) => setNewMilestone(prev => ({ ...prev, icon: e.target.value }))}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div className="flex justify-end mt-4 space-x-3">
                <button
                  onClick={() => setShowAddMilestone(false)}
                  className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                >
                  Cancel
                </button>
                <LoadingButton onClick={handleAddMilestone} variant="primary" icon={CheckIcon} loading={saving}>
                  Add Milestone
                </LoadingButton>
              </div>
            </motion.div>
          )}

          <div className="space-y-6">
            {aboutData.milestones.map((milestone, index) => (
              <div key={milestone._id} className="flex">
                <div className="flex flex-col items-center mr-6">
                  <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                    {milestone.year}
                  </div>
                  {index < aboutData.milestones.length - 1 && <div className="w-0.5 h-16 bg-indigo-200 mt-4"></div>}
                </div>
                <Card className="flex-1 p-4" background="gray">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{milestone.event}</h3>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => milestone._id && handleDeleteMilestone(milestone._id)}
                        className="px-3 py-1 text-red-600 bg-red-100 rounded hover:bg-red-200 text-sm"
                        disabled={saving}
                      >
                        {saving ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </Card>

        {/* Community Impact Section */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <GlobeAltIcon className="h-6 w-6 mr-2 text-teal-600" />
              Community Impact
            </h2>
            <button
              onClick={() => setShowAddImpact(!showAddImpact)}
              className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-200"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Impact
            </button>
          </div>

          {/* Add New Impact Form */}
          {showAddImpact && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="bg-teal-50 p-4 rounded-lg mb-6"
            >
              <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Impact</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Impact Title"
                  value={newImpact.title}
                  onChange={(e) => setNewImpact(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
                <textarea
                  placeholder="Description"
                  value={newImpact.description}
                  onChange={(e) => setNewImpact(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Metrics"
                  value={newImpact.metrics}
                  onChange={(e) => setNewImpact(prev => ({ ...prev, metrics: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div className="flex justify-end mt-4 space-x-3">
                <button
                  onClick={() => setShowAddImpact(false)}
                  className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                >
                  Cancel
                </button>
                <LoadingButton onClick={handleAddImpact} variant="primary" icon={CheckIcon} loading={saving}>
                  Add Impact
                </LoadingButton>
              </div>
            </motion.div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aboutData.communityImpacts.map((impact) => (
              <Card key={impact._id} className="p-4" background="gradient">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{impact.title}</h3>
                    <p className="text-gray-700 mb-3">{impact.description}</p>
                    <div className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-medium inline-block">
                      {impact.metrics}
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2 ml-4">
                    <button
                      onClick={() => impact._id && handleDeleteImpact(impact._id)}
                      className="px-3 py-1 text-red-600 bg-red-100 rounded hover:bg-red-200 text-sm"
                      disabled={saving}
                    >
                      {saving ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </motion.div>
    </AdminDashboard>
  )
}

export default AdminAbout
