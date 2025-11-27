"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import {
  PencilIcon,
  TrashIcon,
  PlusIcon,
  CheckIcon,
  XMarkIcon,
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

interface StorySection {
  id: string
  title: string
  content: string
  images: string[]
}

interface PrincipleItem {
  id: string
  type: "mission" | "vision" | "purpose"
  title: string
  content: string
  images: string[]
}

interface ValueItem {
  id: string
  title: string
  description: string
  icon: string
  images: string[]
}

interface JourneyMilestone {
  id: string
  year: string
  title: string
  description: string
  images: string[]
}

interface CommunityImpact {
  id: string
  title: string
  description: string
  metrics: string
  images: string[]
}

interface CompanyInfo {
  id: string
  establishedDate: string
  registrationDetails: string
  officeLocation: string
  mission: string
  vision: string
}

interface CommitteeMember {
  id: string
  name: string
  position: string
  term: string
}

const AdminAbout: React.FC = () => {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    id: "1",
    establishedDate: "12th May 2010",
    registrationDetails: "Registered under the Department of Cooperatives, Government of Nepal",
    officeLocation: "6th Floor, Civil Trade Centre (CTC Mall), Sundhara, Kathmandu Metropolitan City Ward No. 22",
    mission:
      "To create a vibrant business community where together, everyone can achieve more through cooperative principles and mutual support.",
    vision: "To be the leading cooperative institution fostering economic growth and social development in Nepal.",
  })

  const [] = useState<CommitteeMember[]>([
    { id: "1", name: "Mr. Prakash Shrestha", position: "Chairman", term: "2081 Bhadra 30 to 2086 Bhadra 29" },
    { id: "2", name: "Mr. Rajesh Kumar Maharjan", position: "Vice Chairman", term: "2081 Bhadra 30 to 2086 Bhadra 29" },
    { id: "3", name: "Mrs. Sunita Devi Shrestha", position: "Secretary", term: "2081 Bhadra 30 to 2086 Bhadra 29" },
    { id: "4", name: "Mr. Ramesh Bahadur Thapa", position: "Treasurer", term: "2081 Bhadra 30 to 2086 Bhadra 29" },
    { id: "5", name: "Mrs. Kamala Devi Pradhan", position: "Member", term: "2081 Bhadra 30 to 2086 Bhadra 29" },
    { id: "6", name: "Mr. Bishnu Prasad Ghimire", position: "Member", term: "2081 Bhadra 30 to 2086 Bhadra 29" },
    { id: "7", name: "Mr. Saroj Prasad Raya", position: "Member", term: "2081 Bhadra 30 to 2086 Bhadra 29" },
  ])

  const [storySection, setStorySection] = useState<StorySection>({
    id: "1",
    title: "Our Story Since 2010",
    content:
      "Constellation Saving and Credit Cooperative Limited was established on 12th May 2010 with a vision to create a vibrant business community. Over the years, we have grown from a small cooperative to a trusted financial institution serving our community with dedication and integrity.",
    images: [],
  })

  const [principles, setPrinciples] = useState<PrincipleItem[]>([
    {
      id: "1",
      type: "mission",
      title: "Our Mission",
      content:
        "To create a vibrant business community where together, everyone can achieve more through cooperative principles and mutual support.",
      images: [],
    },
    {
      id: "2",
      type: "vision",
      title: "Our Vision",
      content: "To be the leading cooperative institution fostering economic growth and social development in Nepal.",
      images: [],
    },
    {
      id: "3",
      type: "purpose",
      title: "Our Purpose",
      content:
        "To provide accessible financial services and promote economic empowerment through cooperative values of self-help, self-responsibility, democracy, equality, equity, and solidarity.",
      images: [],
    },
  ])

  const [values, setValues] = useState<ValueItem[]>([
    {
      id: "1",
      title: "Integrity",
      description: "We conduct our business with honesty, transparency, and ethical practices.",
      icon: "🤝",
      images: [],
    },
    {
      id: "2",
      title: "Community Focus",
      description: "We prioritize the needs and development of our community members.",
      icon: "🏘️",
      images: [],
    },
    {
      id: "3",
      title: "Innovation",
      description: "We embrace new technologies and methods to better serve our members.",
      icon: "💡",
      images: [],
    },
  ])

  const [journeyMilestones, setJourneyMilestones] = useState<JourneyMilestone[]>([
    {
      id: "1",
      year: "2010",
      title: "Foundation",
      description: "Constellation Saving and Credit Cooperative Limited was established.",
      images: [],
    },
    {
      id: "2",
      year: "2015",
      title: "Expansion",
      description: "Expanded services and increased membership significantly.",
      images: [],
    },
    {
      id: "3",
      year: "2020",
      title: "Digital Transformation",
      description: "Implemented digital banking services and online platforms.",
      images: [],
    },
  ])

  const [communityImpacts, setCommunityImpacts] = useState<CommunityImpact[]>([
    {
      id: "1",
      title: "Financial Inclusion",
      description: "Providing banking services to underserved communities.",
      metrics: "5000+ members served",
      images: [],
    },
    {
      id: "2",
      title: "Economic Development",
      description: "Supporting local businesses through microfinance and loans.",
      metrics: "NPR 50M+ in loans disbursed",
      images: [],
    },
  ])

  const [editingCompany, setEditingCompany] = useState(false)
  const [] = useState<string | null>(null)

  const [editingStory, setEditingStory] = useState(false)
  const [editingPrinciple, setEditingPrinciple] = useState<string | null>(null)
  const [editingValue, setEditingValue] = useState<string | null>(null)
  const [editingJourney, setEditingJourney] = useState<string | null>(null)
  const [editingImpact, setEditingImpact] = useState<string | null>(null)
  const [showAddPrinciple, setShowAddPrinciple] = useState(false)
  const [showAddValue, setShowAddValue] = useState(false)
  const [showAddJourney, setShowAddJourney] = useState(false)
  const [showAddImpact, setShowAddImpact] = useState(false)

  const [] = useState<Omit<CommitteeMember, "id">>({
    name: "",
    position: "",
    term: "",
  })

  const [newPrinciple, setNewPrinciple] = useState<Omit<PrincipleItem, "id">>({
    type: "purpose",
    title: "",
    content: "",
    images: [],
  })
  const [newValue, setNewValue] = useState<Omit<ValueItem, "id">>({
    title: "",
    description: "",
    icon: "",
    images: [],
  })
  const [newJourney, setNewJourney] = useState<Omit<JourneyMilestone, "id">>({
    year: "",
    title: "",
    description: "",
    images: [],
  })
  const [newImpact, setNewImpact] = useState<Omit<CommunityImpact, "id">>({
    title: "",
    description: "",
    metrics: "",
    images: [],
  })

  const [] = useState(false)

  // Company Info CRUD Operations
  const handleUpdateCompanyInfo = (field: keyof CompanyInfo, value: string) => {
    setCompanyInfo((prev) => ({ ...prev, [field]: value }))
  }

  const saveCompanyInfo = () => {
    // Here you would typically save to backend
    console.log("[v0] Saving company info:", companyInfo)
    setEditingCompany(false)
    // Show success message
  }

  // Committee Members CRUD Operations




  const handleImageUpload = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        resolve(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    })
  }

  const addImageToSection = async (sectionType: string, sectionId: string, file: File) => {
    const imageUrl = await handleImageUpload(file)

    switch (sectionType) {
      case "story":
        setStorySection((prev) => ({
          ...prev,
          images: [...prev.images, imageUrl],
        }))
        break
      case "principle":
        setPrinciples((prev) =>
          prev.map((item) => (item.id === sectionId ? { ...item, images: [...item.images, imageUrl] } : item)),
        )
        break
      case "value":
        setValues((prev) =>
          prev.map((item) => (item.id === sectionId ? { ...item, images: [...item.images, imageUrl] } : item)),
        )
        break
      case "journey":
        setJourneyMilestones((prev) =>
          prev.map((item) => (item.id === sectionId ? { ...item, images: [...item.images, imageUrl] } : item)),
        )
        break
      case "impact":
        setCommunityImpacts((prev) =>
          prev.map((item) => (item.id === sectionId ? { ...item, images: [...item.images, imageUrl] } : item)),
        )
        break
    }
  }

  const removeImage = (sectionType: string, sectionId: string, imageIndex: number) => {
    switch (sectionType) {
      case "story":
        setStorySection((prev) => ({
          ...prev,
          images: prev.images.filter((_, index) => index !== imageIndex),
        }))
        break
      case "principle":
        setPrinciples((prev) =>
          prev.map((item) =>
            item.id === sectionId ? { ...item, images: item.images.filter((_, index) => index !== imageIndex) } : item,
          ),
        )
        break
      case "value":
        setValues((prev) =>
          prev.map((item) =>
            item.id === sectionId ? { ...item, images: item.images.filter((_, index) => index !== imageIndex) } : item,
          ),
        )
        break
      case "journey":
        setJourneyMilestones((prev) =>
          prev.map((item) =>
            item.id === sectionId ? { ...item, images: item.images.filter((_, index) => index !== imageIndex) } : item,
          ),
        )
        break
      case "impact":
        setCommunityImpacts((prev) =>
          prev.map((item) =>
            item.id === sectionId ? { ...item, images: item.images.filter((_, index) => index !== imageIndex) } : item,
          ),
        )
        break
    }
  }

  const handleAddPrinciple = () => {
    if (newPrinciple.title && newPrinciple.content) {
      const principle: PrincipleItem = {
        id: Date.now().toString(),
        ...newPrinciple,
      }
      setPrinciples((prev) => [...prev, principle])
      setNewPrinciple({ type: "purpose", title: "", content: "", images: [] })
      setShowAddPrinciple(false)
    }
  }

  const handleAddValue = () => {
    if (newValue.title && newValue.description) {
      const value: ValueItem = {
        id: Date.now().toString(),
        ...newValue,
      }
      setValues((prev) => [...prev, value])
      setNewValue({ title: "", description: "", icon: "", images: [] })
      setShowAddValue(false)
    }
  }

  const handleAddJourney = () => {
    if (newJourney.year && newJourney.title && newJourney.description) {
      const journey: JourneyMilestone = {
        id: Date.now().toString(),
        ...newJourney,
      }
      setJourneyMilestones((prev) => [...prev, journey])
      setNewJourney({ year: "", title: "", description: "", images: [] })
      setShowAddJourney(false)
    }
  }

  const handleAddImpact = () => {
    if (newImpact.title && newImpact.description) {
      const impact: CommunityImpact = {
        id: Date.now().toString(),
        ...newImpact,
      }
      setCommunityImpacts((prev) => [...prev, impact])
      setNewImpact({ title: "", description: "", metrics: "", images: [] })
      setShowAddImpact(false)
    }
  }

  const handleDeletePrinciple = (id: string) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setPrinciples((prev) => prev.filter((item) => item.id !== id))
    }
  }

  const handleDeleteValue = (id: string) => {
    if (window.confirm("Are you sure you want to delete this value?")) {
      setValues((prev) => prev.filter((item) => item.id !== id))
    }
  }

  const handleDeleteJourney = (id: string) => {
    if (window.confirm("Are you sure you want to delete this milestone?")) {
      setJourneyMilestones((prev) => prev.filter((item) => item.id !== id))
    }
  }

  const handleDeleteImpact = (id: string) => {
    if (window.confirm("Are you sure you want to delete this impact?")) {
      setCommunityImpacts((prev) => prev.filter((item) => item.id !== id))
    }
  }

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

        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <BookOpenIcon className="h-6 w-6 mr-2 text-green-600" />
              Our Story Since 2010
            </h2>
            <Button
              onClick={() => setEditingStory(!editingStory)}
              variant={editingStory ? "secondary" : "primary"}
              icon={PencilIcon}
            >
              {editingStory ? "Cancel" : "Edit"}
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              {editingStory ? (
                <input
                  type="text"
                  value={storySection.title}
                  onChange={(e) => setStorySection((prev) => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{storySection.title}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
              {editingStory ? (
                <textarea
                  value={storySection.content}
                  onChange={(e) => setStorySection((prev) => ({ ...prev, content: e.target.value }))}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{storySection.content}</p>
              )}
            </div>

            {/* Image Management */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Images</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {storySection.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Story ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    {editingStory && (
                      <button
                        onClick={() => removeImage("story", storySection.id, index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <XMarkIcon className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {editingStory && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) addImageToSection("story", storySection.id, file)
                  }}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                />
              )}
            </div>

            {editingStory && (
              <div className="flex justify-end space-x-3">
                <Button onClick={() => setEditingStory(false)} variant="secondary">
                  Cancel
                </Button>
                <Button onClick={() => setEditingStory(false)} variant="primary" icon={CheckIcon}>
                  Save Changes
                </Button>
              </div>
            )}
          </div>
        </Card>

        {/* Company Information Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <BuildingOfficeIcon className="h-6 w-6 mr-2 text-purple-600" />
              Company Information
            </h2>
            <button
              onClick={() => setEditingCompany(!editingCompany)}
              className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
            >
              <PencilIcon className="h-4 w-4 mr-2" />
              {editingCompany ? "Cancel" : "Edit"}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Established Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <CalendarIcon className="h-4 w-4 inline mr-1" />
                Established Date
              </label>
              {editingCompany ? (
                <input
                  type="text"
                  value={companyInfo.establishedDate}
                  onChange={(e) => handleUpdateCompanyInfo("establishedDate", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{companyInfo.establishedDate}</p>
              )}
            </div>

            {/* Office Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPinIcon className="h-4 w-4 inline mr-1" />
                Office Location
              </label>
              {editingCompany ? (
                <textarea
                  value={companyInfo.officeLocation}
                  onChange={(e) => handleUpdateCompanyInfo("officeLocation", e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{companyInfo.officeLocation}</p>
              )}
            </div>

            {/* Registration Details */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Registration Details</label>
              {editingCompany ? (
                <textarea
                  value={companyInfo.registrationDetails}
                  onChange={(e) => handleUpdateCompanyInfo("registrationDetails", e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{companyInfo.registrationDetails}</p>
              )}
            </div>

            {/* Mission */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Mission</label>
              {editingCompany ? (
                <textarea
                  value={companyInfo.mission}
                  onChange={(e) => handleUpdateCompanyInfo("mission", e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{companyInfo.mission}</p>
              )}
            </div>

            {/* Vision */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Vision</label>
              {editingCompany ? (
                <textarea
                  value={companyInfo.vision}
                  onChange={(e) => handleUpdateCompanyInfo("vision", e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{companyInfo.vision}</p>
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
              <button
                onClick={saveCompanyInfo}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                <CheckIcon className="h-4 w-4 mr-2" />
                Save Changes
              </button>
            </div>
          )}
        </div>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <GlobeAltIcon className="h-6 w-6 mr-2 text-green-600" />
              Mission, Vision & Purpose
            </h2>
            <Button onClick={() => setShowAddPrinciple(!showAddPrinciple)} variant="primary" icon={PlusIcon}>
              Add Item
            </Button>
          </div>

          {/* Add New Principle Form */}
          {showAddPrinciple && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="bg-green-50 p-4 rounded-lg mb-6"
            >
              <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Item</h3>
              <div className="space-y-4">
                <select
                  value={newPrinciple.type}
                  onChange={(e) =>
                    setNewPrinciple((prev) => ({ ...prev, type: e.target.value as "mission" | "vision" | "purpose" }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="purpose">Purpose</option>
                  <option value="mission">Mission</option>
                  <option value="vision">Vision</option>
                </select>
                <input
                  type="text"
                  placeholder="Title"
                  value={newPrinciple.title}
                  onChange={(e) => setNewPrinciple((prev) => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <textarea
                  placeholder="Content"
                  value={newPrinciple.content}
                  onChange={(e) => setNewPrinciple((prev) => ({ ...prev, content: e.target.value }))}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div className="flex justify-end mt-4 space-x-3">
                <Button onClick={() => setShowAddPrinciple(false)} variant="secondary">
                  Cancel
                </Button>
                <Button onClick={handleAddPrinciple} variant="primary" icon={CheckIcon}>
                  Add Item
                </Button>
              </div>
            </motion.div>
          )}

          <div className="space-y-4">
            {principles.map((principle) => (
              <Card key={principle.id} className="p-4" background="gray">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          principle.type === "mission"
                            ? "bg-green-100 text-green-800"
                            : principle.type === "vision"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-green-100 text-green-800"
                        }`}
                      >
                        {principle.type.toUpperCase()}
                      </span>
                    </div>
                    {editingPrinciple === principle.id ? (
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={principle.title}
                          onChange={(e) =>
                            setPrinciples((prev) =>
                              prev.map((item) =>
                                item.id === principle.id ? { ...item, title: e.target.value } : item,
                              ),
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                        <textarea
                          value={principle.content}
                          onChange={(e) =>
                            setPrinciples((prev) =>
                              prev.map((item) =>
                                item.id === principle.id ? { ...item, content: e.target.value } : item,
                              ),
                            )
                          }
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                    ) : (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{principle.title}</h3>
                        <p className="text-gray-700">{principle.content}</p>
                      </div>
                    )}

                    {/* Images for this principle */}
                    {principle.images.length > 0 && (
                      <div className="grid grid-cols-3 gap-2 mt-4">
                        {principle.images.map((image, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={image || "/placeholder.svg"}
                              alt={`${principle.title} ${index + 1}`}
                              className="w-full h-16 object-cover rounded"
                            />
                            {editingPrinciple === principle.id && (
                              <button
                                onClick={() => removeImage("principle", principle.id, index)}
                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <XMarkIcon className="h-3 w-3" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {editingPrinciple === principle.id && (
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) addImageToSection("principle", principle.id, file)
                        }}
                        className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                      />
                    )}
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    {editingPrinciple === principle.id ? (
                      <>
                        <Button onClick={() => setEditingPrinciple(null)} variant="primary" size="sm" icon={CheckIcon}>
                          Save
                        </Button>
                        <Button
                          onClick={() => setEditingPrinciple(null)}
                          variant="secondary"
                          size="sm"
                          icon={XMarkIcon}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          onClick={() => setEditingPrinciple(principle.id)}
                          variant="ghost"
                          size="sm"
                          icon={PencilIcon}
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDeletePrinciple(principle.id)}
                          variant="ghost"
                          size="sm"
                          icon={TrashIcon}
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <HeartIcon className="h-6 w-6 mr-2 text-red-600" />
              Our Values
            </h2>
            <Button onClick={() => setShowAddValue(!showAddValue)} variant="primary" icon={PlusIcon}>
              Add Value
            </Button>
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
                  onChange={(e) => setNewValue((prev) => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Icon (emoji or text)"
                  value={newValue.icon}
                  onChange={(e) => setNewValue((prev) => ({ ...prev, icon: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <textarea
                  placeholder="Description"
                  value={newValue.description}
                  onChange={(e) => setNewValue((prev) => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <div className="flex justify-end mt-4 space-x-3">
                <Button onClick={() => setShowAddValue(false)} variant="secondary">
                  Cancel
                </Button>
                <Button onClick={handleAddValue} variant="primary" icon={CheckIcon}>
                  Add Value
                </Button>
              </div>
            </motion.div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value) => (
              <Card key={value.id} className="p-4" hover={false}>
                <div className="text-center">
                  {editingValue === value.id ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={value.icon}
                        onChange={(e) =>
                          setValues((prev) =>
                            prev.map((item) => (item.id === value.id ? { ...item, icon: e.target.value } : item)),
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-center"
                        placeholder="Icon"
                      />
                      <input
                        type="text"
                        value={value.title}
                        onChange={(e) =>
                          setValues((prev) =>
                            prev.map((item) => (item.id === value.id ? { ...item, title: e.target.value } : item)),
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                      <textarea
                        value={value.description}
                        onChange={(e) =>
                          setValues((prev) =>
                            prev.map((item) =>
                              item.id === value.id ? { ...item, description: e.target.value } : item,
                            ),
                          )
                        }
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

                  {/* Images for this value */}
                  {value.images.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      {value.images.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`${value.title} ${index + 1}`}
                            className="w-full h-16 object-cover rounded"
                          />
                          {editingValue === value.id && (
                            <button
                              onClick={() => removeImage("value", value.id, index)}
                              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <XMarkIcon className="h-3 w-3" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {editingValue === value.id && (
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) addImageToSection("value", value.id, file)
                      }}
                      className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                    />
                  )}

                  <div className="flex justify-center space-x-2 mt-4">
                    {editingValue === value.id ? (
                      <>
                        <Button onClick={() => setEditingValue(null)} variant="primary" size="sm" icon={CheckIcon}>
                          Save
                        </Button>
                        <Button onClick={() => setEditingValue(null)} variant="secondary" size="sm" icon={XMarkIcon}>
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button onClick={() => setEditingValue(value.id)} variant="ghost" size="sm" icon={PencilIcon}>
                          Edit
                        </Button>
                        <Button onClick={() => handleDeleteValue(value.id)} variant="ghost" size="sm" icon={TrashIcon}>
                          Delete
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <ClockIcon className="h-6 w-6 mr-2 text-indigo-600" />
              Our Journey
            </h2>
            <Button onClick={() => setShowAddJourney(!showAddJourney)} variant="primary" icon={PlusIcon}>
              Add Milestone
            </Button>
          </div>

          {/* Add New Journey Form */}
          {showAddJourney && (
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
                  value={newJourney.year}
                  onChange={(e) => setNewJourney((prev) => ({ ...prev, year: e.target.value }))}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Title"
                  value={newJourney.title}
                  onChange={(e) => setNewJourney((prev) => ({ ...prev, title: e.target.value }))}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <textarea
                  placeholder="Description"
                  value={newJourney.description}
                  onChange={(e) => setNewJourney((prev) => ({ ...prev, description: e.target.value }))}
                  rows={1}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div className="flex justify-end mt-4 space-x-3">
                <Button onClick={() => setShowAddJourney(false)} variant="secondary">
                  Cancel
                </Button>
                <Button onClick={handleAddJourney} variant="primary" icon={CheckIcon}>
                  Add Milestone
                </Button>
              </div>
            </motion.div>
          )}

          <div className="space-y-6">
            {journeyMilestones.map((milestone, index) => (
              <div key={milestone.id} className="flex">
                <div className="flex flex-col items-center mr-6">
                  <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                    {milestone.year}
                  </div>
                  {index < journeyMilestones.length - 1 && <div className="w-0.5 h-16 bg-indigo-200 mt-4"></div>}
                </div>
                <Card className="flex-1 p-4" background="gray">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      {editingJourney === milestone.id ? (
                        <div className="space-y-3">
                          <input
                            type="text"
                            value={milestone.year}
                            onChange={(e) =>
                              setJourneyMilestones((prev) =>
                                prev.map((item) =>
                                  item.id === milestone.id ? { ...item, year: e.target.value } : item,
                                ),
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          />
                          <input
                            type="text"
                            value={milestone.title}
                            onChange={(e) =>
                              setJourneyMilestones((prev) =>
                                prev.map((item) =>
                                  item.id === milestone.id ? { ...item, title: e.target.value } : item,
                                ),
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          />
                          <textarea
                            value={milestone.description}
                            onChange={(e) =>
                              setJourneyMilestones((prev) =>
                                prev.map((item) =>
                                  item.id === milestone.id ? { ...item, description: e.target.value } : item,
                                ),
                              )
                            }
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          />
                        </div>
                      ) : (
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                          <p className="text-gray-700">{milestone.description}</p>
                        </div>
                      )}

                      {/* Images for this milestone */}
                      {milestone.images.length > 0 && (
                        <div className="grid grid-cols-3 gap-2 mt-4">
                          {milestone.images.map((image, imgIndex) => (
                            <div key={imgIndex} className="relative group">
                              <img
                                src={image || "/placeholder.svg"}
                                alt={`${milestone.title} ${imgIndex + 1}`}
                                className="w-full h-16 object-cover rounded"
                              />
                              {editingJourney === milestone.id && (
                                <button
                                  onClick={() => removeImage("journey", milestone.id, imgIndex)}
                                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <XMarkIcon className="h-3 w-3" />
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {editingJourney === milestone.id && (
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) addImageToSection("journey", milestone.id, file)
                          }}
                          className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                        />
                      )}
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      {editingJourney === milestone.id ? (
                        <>
                          <Button onClick={() => setEditingJourney(null)} variant="primary" size="sm" icon={CheckIcon}>
                            Save
                          </Button>
                          <Button
                            onClick={() => setEditingJourney(null)}
                            variant="secondary"
                            size="sm"
                            icon={XMarkIcon}
                          >
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            onClick={() => setEditingJourney(milestone.id)}
                            variant="ghost"
                            size="sm"
                            icon={PencilIcon}
                          >
                            Edit
                          </Button>
                          <Button
                            onClick={() => handleDeleteJourney(milestone.id)}
                            variant="ghost"
                            size="sm"
                            icon={TrashIcon}
                          >
                            Delete
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <GlobeAltIcon className="h-6 w-6 mr-2 text-teal-600" />
              Community Impact
            </h2>
            <Button onClick={() => setShowAddImpact(!showAddImpact)} variant="primary" icon={PlusIcon}>
              Add Impact
            </Button>
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
                  onChange={(e) => setNewImpact((prev) => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
                <textarea
                  placeholder="Description"
                  value={newImpact.description}
                  onChange={(e) => setNewImpact((prev) => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Metrics (e.g., 5000+ members served)"
                  value={newImpact.metrics}
                  onChange={(e) => setNewImpact((prev) => ({ ...prev, metrics: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div className="flex justify-end mt-4 space-x-3">
                <Button onClick={() => setShowAddImpact(false)} variant="secondary">
                  Cancel
                </Button>
                <Button onClick={handleAddImpact} variant="primary" icon={CheckIcon}>
                  Add Impact
                </Button>
              </div>
            </motion.div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {communityImpacts.map((impact) => (
              <Card key={impact.id} className="p-4" background="gradient">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {editingImpact === impact.id ? (
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={impact.title}
                          onChange={(e) =>
                            setCommunityImpacts((prev) =>
                              prev.map((item) => (item.id === impact.id ? { ...item, title: e.target.value } : item)),
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        />
                        <textarea
                          value={impact.description}
                          onChange={(e) =>
                            setCommunityImpacts((prev) =>
                              prev.map((item) =>
                                item.id === impact.id ? { ...item, description: e.target.value } : item,
                              ),
                            )
                          }
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        />
                        <input
                          type="text"
                          value={impact.metrics}
                          onChange={(e) =>
                            setCommunityImpacts((prev) =>
                              prev.map((item) => (item.id === impact.id ? { ...item, metrics: e.target.value } : item)),
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        />
                      </div>
                    ) : (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{impact.title}</h3>
                        <p className="text-gray-700 mb-3">{impact.description}</p>
                        <div className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-medium inline-block">
                          {impact.metrics}
                        </div>
                      </div>
                    )}

                    {/* Images for this impact */}
                    {impact.images.length > 0 && (
                      <div className="grid grid-cols-2 gap-2 mt-4">
                        {impact.images.map((image, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={image || "/placeholder.svg"}
                              alt={`${impact.title} ${index + 1}`}
                              className="w-full h-16 object-cover rounded"
                            />
                            {editingImpact === impact.id && (
                              <button
                                onClick={() => removeImage("impact", impact.id, index)}
                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <XMarkIcon className="h-3 w-3" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {editingImpact === impact.id && (
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) addImageToSection("impact", impact.id, file)
                        }}
                        className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                      />
                    )}
                  </div>
                  <div className="flex flex-col space-y-2 ml-4">
                    {editingImpact === impact.id ? (
                      <>
                        <Button onClick={() => setEditingImpact(null)} variant="primary" size="sm" icon={CheckIcon}>
                          Save
                        </Button>
                        <Button onClick={() => setEditingImpact(null)} variant="secondary" size="sm" icon={XMarkIcon}>
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button onClick={() => setEditingImpact(impact.id)} variant="ghost" size="sm" icon={PencilIcon}>
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDeleteImpact(impact.id)}
                          variant="ghost"
                          size="sm"
                          icon={TrashIcon}
                        >
                          Delete
                        </Button>
                      </>
                    )}
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
