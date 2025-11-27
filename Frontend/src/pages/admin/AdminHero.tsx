"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Save, Upload, Trash2, Eye, EyeOff, ImageIcon, Video, Plus } from "lucide-react"
import { heroAPI, type HeroContent } from "../../lib/heroApi"

const AdminHeroSection: React.FC = () => {
  const [heroContent, setHeroContent] = useState<HeroContent | null>(null)
  const [heroVersions, setHeroVersions] = useState<HeroContent[]>([])
  const [selectedVersionId, setSelectedVersionId] = useState<string>("")
  const [activeTab, setActiveTab] = useState<"media">("media")
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
        backgroundMedia: [],
        currentMediaIndex: 0,
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

  if (isFetching) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
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
          <button onClick={createNewVersion} className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
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
              <p className="text-gray-600 mt-1">Manage your homepage hero section media</p>
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
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center gap-2"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                {heroVersions.map((version) => (
                  <option key={version._id} value={version._id}>
                    Hero Version {version._id?.slice(-6)} {version.isActive ? "(Active)" : ""}
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

        {/* Main Content Area */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* Media Tab */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Background Media</h2>
              <label className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer flex items-center gap-2">
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
                  className="bg-green-600 h-2 rounded-full transition-all duration-300"
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
                          ? "bg-green-600 text-white"
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
        </div>
      </div>
    </div>
  )
}

const HeroPreview: React.FC<{ content: HeroContent }> = ({ content }) => {
  const [currentIndex, setCurrentIndex] = useState(content.currentMediaIndex)
  const slides = content.backgroundMedia

  useEffect(() => {
    if (slides.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [slides.length])

  return (
    <section className="relative overflow-hidden w-full h-screen">
      {/* Slides */}
      <div className="absolute inset-0 w-full h-full">
        {slides.map((media, idx) => {
          const isActive = idx === currentIndex
          return (
            <div
              key={idx}
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
              aria-hidden={!isActive}
            >
              {media.type === "video" ? (
                <video
                  className="w-full h-full object-cover"
                  src={media.url}
                  autoPlay={isActive}
                  loop
                  muted
                  playsInline
                />
              ) : (
                <img className="w-full h-full object-cover" src={media.url} alt={media.alt} />
              )}
            </div>
          )
        })}
      </div>

      {/* Pager dots */}
      {slides.length > 1 && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-4 z-20 flex gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-3 h-3 rounded-full transition-[transform,background-color] duration-200 ${
                idx === currentIndex ? "scale-125 bg-white/90" : "bg-white/40"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default AdminHeroSection