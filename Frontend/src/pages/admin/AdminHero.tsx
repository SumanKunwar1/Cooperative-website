"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Save, Upload, Trash2, Eye, EyeOff, ImageIcon, Video, Plus } from "lucide-react"
import { heroAPI, type HeroContent } from "../../lib/heroApi"

const AdminHeroSection: React.FC = () => {
  const [heroContent, setHeroContent] = useState<HeroContent | null>(null)
  const [heroVersions, setHeroVersions] = useState<HeroContent[]>([])
  const [selectedVersionId, setSelectedVersionId] = useState<string>("")
  const [activeTab, setActiveTab] = useState<"content" | "media" | "stats" | "cta">("content")
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [previewMode, setPreviewMode] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<number | null>(null)

  useEffect(() => {
    fetchHeroVersions()
  }, [])

  const fetchHeroVersions = async () => {
    try {
      setIsFetching(true)
      const versions = await heroAPI.getAllHeroContent()
      setHeroVersions(versions)

      const activeVersion = versions.find((v) => v.isActive) || versions[0]
      if (activeVersion) {
        setHeroContent(activeVersion)
        setSelectedVersionId(activeVersion._id || "")
      }
    } catch (error) {
      console.error("Failed to fetch hero versions:", error)
      alert("Failed to load hero content")
    } finally {
      setIsFetching(false)
    }
  }

  const saveHeroContent = async () => {
    if (!heroContent) return

    setIsLoading(true)
    try {
      if (heroContent._id) {
        await heroAPI.updateHeroContent(heroContent._id, heroContent)
        alert("Hero content updated successfully!")
      } else {
        const newContent = await heroAPI.createHeroContent(heroContent)
        setHeroContent(newContent)
        setSelectedVersionId(newContent._id || "")
        alert("Hero content created successfully!")
      }
      await fetchHeroVersions()
    } catch (error) {
      console.error("Failed to save hero content:", error)
      alert("Failed to save hero content")
    } finally {
      setIsLoading(false)
    }
  }

  const handleMediaUpload = async (files: FileList | null) => {
    if (!files || !heroContent?._id) return

    setUploadProgress(0)

    try {
      // Explicitly type the uploadedMedia array
      const uploadedMedia: any[] = []
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const mediaItem = await heroAPI.uploadHeroMedia(heroContent._id, file)
        uploadedMedia.push(mediaItem)

        setHeroContent((prev) =>
          prev
            ? {
                ...prev,
                backgroundMedia: [...prev.backgroundMedia, mediaItem],
              }
            : null,
        )

        setUploadProgress(((i + 1) / files.length) * 100)
      }

      alert("Media uploaded successfully!")
      await fetchHeroVersions()
    } catch (error) {
      console.error("Failed to upload media:", error)
      alert("Failed to upload media")
    } finally {
      setUploadProgress(null)
    }
  }

  const removeMedia = async (index: number) => {
    if (!heroContent?._id) return

    try {
      await heroAPI.deleteHeroMedia(heroContent._id, index)

      setHeroContent((prev) =>
        prev
          ? {
              ...prev,
              backgroundMedia: prev.backgroundMedia.filter((_, i) => i !== index),
              currentMediaIndex:
                prev.currentMediaIndex >= index ? Math.max(0, prev.currentMediaIndex - 1) : prev.currentMediaIndex,
            }
          : null,
      )

      alert("Media removed successfully!")
      await fetchHeroVersions()
    } catch (error) {
      console.error("Failed to remove media:", error)
      alert("Failed to remove media")
    }
  }

  const createNewVersion = async () => {
    try {
      const newContent = await heroAPI.createHeroContent({
        title: {
          line1: "Your journey to",
          line2: "financial prosperity",
          line3: "starts here",
        },
        description:
          "Connect with local businesses, discover financial services, and join a community that supports your economic growth and prosperity.",
        searchPlaceholder: "Search businesses, services, opportunities...",
        statistics: {
          businesses: { count: "500+", label: "Businesses" },
          members: { count: "10K+", label: "Members" },
          services: { count: "50+", label: "Services" },
          loans: { count: "$2M+", label: "Loans Funded" },
        },
        ctaButtons: {
          primary: { text: "Join Our Community", action: "/join" },
          secondary: { text: "Explore Services", action: "/services" },
        },
        isActive: false,
      })

      setHeroContent(newContent)
      setSelectedVersionId(newContent._id || "")
      await fetchHeroVersions()
      alert("New hero version created!")
    } catch (error) {
      console.error("Failed to create new version:", error)
      alert("Failed to create new version")
    }
  }

  const switchVersion = async (versionId: string) => {
    const version = heroVersions.find((v) => v._id === versionId)
    if (version) {
      setHeroContent(version)
      setSelectedVersionId(versionId)
    }
  }

  const setAsActive = async () => {
    if (!heroContent?._id) return

    try {
      await heroAPI.updateHeroContent(heroContent._id, { ...heroContent, isActive: true })
      alert("Version set as active!")
      await fetchHeroVersions()
    } catch (error) {
      console.error("Failed to set as active:", error)
      alert("Failed to set as active")
    }
  }

  const updateContent = (field: string, value: any) => {
    setHeroContent((prev) =>
      prev
        ? {
            ...prev,
            [field]: value,
          }
        : null,
    )
  }

  const updateNestedContent = (parent: string, field: string, value: any) => {
    setHeroContent((prev) => {
      if (!prev) return null
      const parentObj = prev[parent as keyof HeroContent] as Record<string, any>
      return {
        ...prev,
        [parent]: {
          ...parentObj,
          [field]: value,
        },
      }
    })
  }

  if (isFetching) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading hero content...</p>
        </div>
      </div>
    )
  }

  if (!heroContent) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No hero content found</p>
          <button onClick={createNewVersion} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Create New Hero Content
          </button>
        </div>
      </div>
    )
  }

  if (previewMode) {
    return (
      <div className="relative">
        <div className="fixed top-4 right-4 z-50 flex gap-2">
          <button
            onClick={() => setPreviewMode(false)}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 flex items-center gap-2"
          >
            <EyeOff className="w-4 h-4" />
            Exit Preview
          </button>
        </div>
        <HeroPreview content={heroContent} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Hero Section Management</h1>
              <p className="text-gray-600 mt-1">Manage your homepage hero section content and media</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={createNewVersion}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                New Version
              </button>
              <button
                onClick={() => setPreviewMode(true)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                Preview
              </button>
              <button
                onClick={saveHeroContent}
                disabled={isLoading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>

          {/* Version Selector and Active Status */}
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Version</label>
              <select
                value={selectedVersionId}
                onChange={(e) => switchVersion(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {heroVersions.map((version) => (
                  <option key={version._id} value={version._id}>
                    {version.title.line1} {version.title.line2} {version.isActive ? "(Active)" : ""}
                  </option>
                ))}
              </select>
            </div>
            {!heroContent.isActive && (
              <button onClick={setAsActive} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                Set as Active
              </button>
            )}
            {heroContent.isActive && (
              <span className="px-4 py-2 bg-green-100 text-green-800 rounded-lg">Currently Active</span>
            )}
          </div>
        </div>

        {/* Sidebar Navigation */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <nav className="space-y-2">
                {[
                  { id: "content", label: "Content & Text", icon: "📝" },
                  { id: "media", label: "Background Media", icon: "🎬" },
                  { id: "stats", label: "Statistics", icon: "📊" },
                  { id: "cta", label: "Call-to-Action", icon: "🔗" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? "bg-blue-50 text-blue-700 border border-blue-200"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <span className="mr-3">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {/* Content Tab */}
              {activeTab === "content" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900">Content & Text</h2>

                  {/* Title Lines */}
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700">Title Lines</label>
                    {["line1", "line2", "line3"].map((line, index) => (
                      <input
                        key={line}
                        type="text"
                        value={heroContent.title[line as keyof typeof heroContent.title]}
                        onChange={(e) => updateNestedContent("title", line, e.target.value)}
                        placeholder={`Title Line ${index + 1}`}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ))}
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      value={heroContent.description}
                      onChange={(e) => updateContent("description", e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter hero section description..."
                    />
                  </div>

                  {/* Search Placeholder */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Search Placeholder Text</label>
                    <input
                      type="text"
                      value={heroContent.searchPlaceholder}
                      onChange={(e) => updateContent("searchPlaceholder", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Search placeholder text..."
                    />
                  </div>
                </div>
              )}

              {/* Media Tab */}
              {activeTab === "media" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-900">Background Media</h2>
                    <label className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer flex items-center gap-2">
                      <Upload className="w-4 h-4" />
                      Upload Media
                      <input
                        type="file"
                        multiple
                        accept="image/*,video/*"
                        onChange={(e) => handleMediaUpload(e.target.files)}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {uploadProgress !== null && (
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  )}

                  {/* Media Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {heroContent.backgroundMedia.map((media, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                          {media.type === "image" ? (
                            <img
                              src={media.url || "/placeholder.svg"}
                              alt={media.alt}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <video src={media.url} className="w-full h-full object-cover" muted />
                          )}
                        </div>

                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                          <button
                            onClick={() => updateContent("currentMediaIndex", index)}
                            className={`px-3 py-1 rounded text-sm ${
                              heroContent.currentMediaIndex === index
                                ? "bg-blue-600 text-white"
                                : "bg-white text-gray-700"
                            }`}
                          >
                            {heroContent.currentMediaIndex === index ? "Active" : "Set Active"}
                          </button>
                          <button
                            onClick={() => removeMedia(index)}
                            className="p-2 bg-red-600 text-white rounded hover:bg-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="absolute top-2 left-2">
                          <span className="px-2 py-1 bg-black bg-opacity-70 text-white text-xs rounded">
                            {media.type === "image" ? <ImageIcon className="w-3 h-3" /> : <Video className="w-3 h-3" />}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {heroContent.backgroundMedia.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                      <Upload className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No media uploaded yet. Upload images or videos to get started.</p>
                    </div>
                  )}
                </div>
              )}

              {/* Statistics Tab */}
              {activeTab === "stats" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900">Statistics</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(heroContent.statistics).map(([key, stat]) => (
                      <div key={key} className="space-y-3">
                        <label className="block text-sm font-medium text-gray-700 capitalize">{key}</label>
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={stat.count}
                            onChange={(e) => updateNestedContent("statistics", key, { ...stat, count: e.target.value })}
                            placeholder="Count (e.g., 500+)"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                          <input
                            type="text"
                            value={stat.label}
                            onChange={(e) => updateNestedContent("statistics", key, { ...stat, label: e.target.value })}
                            placeholder="Label (e.g., Businesses)"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA Tab */}
              {activeTab === "cta" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900">Call-to-Action Buttons</h2>

                  <div className="space-y-6">
                    {/* Primary CTA */}
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Primary Button</h3>
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={heroContent.ctaButtons.primary.text}
                          onChange={(e) =>
                            updateNestedContent("ctaButtons", "primary", {
                              ...heroContent.ctaButtons.primary,
                              text: e.target.value,
                            })
                          }
                          placeholder="Button text"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <input
                          type="text"
                          value={heroContent.ctaButtons.primary.action}
                          onChange={(e) =>
                            updateNestedContent("ctaButtons", "primary", {
                              ...heroContent.ctaButtons.primary,
                              action: e.target.value,
                            })
                          }
                          placeholder="Button action/link"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    {/* Secondary CTA */}
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Secondary Button</h3>
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={heroContent.ctaButtons.secondary.text}
                          onChange={(e) =>
                            updateNestedContent("ctaButtons", "secondary", {
                              ...heroContent.ctaButtons.secondary,
                              text: e.target.value,
                            })
                          }
                          placeholder="Button text"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <input
                          type="text"
                          value={heroContent.ctaButtons.secondary.action}
                          onChange={(e) =>
                            updateNestedContent("ctaButtons", "secondary", {
                              ...heroContent.ctaButtons.secondary,
                              action: e.target.value,
                            })
                          }
                          placeholder="Button action/link"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const HeroPreview: React.FC<{ content: HeroContent }> = ({ content }) => {
  const currentMedia = content.backgroundMedia[content.currentMediaIndex]

  return (
    <section className="relative bg-white overflow-hidden min-h-screen">
      {currentMedia && (
        <div className="absolute inset-0 z-0">
          <div className="h-full w-full object-cover">
            {currentMedia.type === "video" ? (
              <video className="w-full h-full object-cover opacity-80" autoPlay loop muted src={currentMedia.url} />
            ) : (
              <img
                className="w-full h-full object-cover opacity-80"
                src={currentMedia.url || "/placeholder.svg"}
                alt={currentMedia.alt}
              />
            )}
          </div>
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
      )}

      <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
        <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
          <div className="sm:text-center lg:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl tracking-tight font-bold text-white sm:text-5xl md:text-6xl"
            >
              <span className="block">{content.title.line1}</span>
              <span className="block text-blue-500">{content.title.line2}</span>
              <span className="block">{content.title.line3}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-3 text-base text-white sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
            >
              {content.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto lg:mx-0"
            >
              {Object.entries(content.statistics).map(([key, stat]) => (
                <div key={key} className="text-center">
                  <div className="text-2xl font-semibold text-white">{stat.count}</div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-8 flex flex-col sm:flex-row gap-4 max-w-xl mx-auto lg:mx-0"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300"
              >
                {content.ctaButtons.primary.text}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black transition-all duration-300"
              >
                {content.ctaButtons.secondary.text}
              </motion.button>
            </motion.div>
          </div>
        </main>
      </div>
    </section>
  )
}

export default AdminHeroSection