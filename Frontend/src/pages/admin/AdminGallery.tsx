"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { PlusIcon, VideoCameraIcon, TrashIcon, EyeIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { galleryAPI, type Event } from "../../lib/api"
import { useToast } from "../../hooks/use-toast"
import AdminDashboard from "./AdminDashboard"

const AdminGallery: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [showEventModal, setShowEventModal] = useState(false)
  const [newEventData, setNewEventData] = useState({ name: "", description: "", date: "" })
  const [uploadingMedia, setUploadingMedia] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    loadEvents()
  }, [])

  const loadEvents = async () => {
    try {
      setLoading(true)
      const eventsData = await galleryAPI.getAllEvents()
      setEvents(eventsData)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load events",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCreateEvent = async () => {
    if (newEventData.name && newEventData.description && newEventData.date) {
      try {
        const newEvent = await galleryAPI.createEvent(newEventData)
        setEvents([newEvent, ...events])
        setNewEventData({ name: "", description: "", date: "" })
        setShowEventModal(false)
        toast({
          title: "Success",
          description: "Event created successfully",
        })
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to create event",
          variant: "destructive",
        })
      }
    }
  }

  const handleDeleteEvent = async (eventId: string) => {
    try {
      await galleryAPI.deleteEvent(eventId)
      setEvents(events.filter((event) => event._id !== eventId))
      toast({
        title: "Success",
        description: "Event deleted successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete event",
        variant: "destructive",
      })
    }
  }

  const handleFileUpload = async (eventId: string, files: FileList | null) => {
    if (!files) return

    setUploadingMedia(eventId)

    try {
      const uploadPromises = Array.from(files).map((file) => galleryAPI.uploadMedia(eventId, file))

      const uploadedMedia = await Promise.all(uploadPromises)

      // Update the event with new media
      setEvents(
        events.map((event) =>
          event._id === eventId ? { ...event, media: [...event.media, ...uploadedMedia] } : event,
        ),
      )

      toast({
        title: "Success",
        description: `${uploadedMedia.length} file(s) uploaded successfully`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload media",
        variant: "destructive",
      })
    } finally {
      setUploadingMedia(null)
    }
  }

  const handleDeleteMedia = async (eventId: string, mediaId: string) => {
    try {
      await galleryAPI.deleteMedia(eventId, mediaId)
      setEvents(
        events.map((event) =>
          event._id === eventId ? { ...event, media: event.media.filter((media) => media._id !== mediaId) } : event,
        ),
      )
      toast({
        title: "Success",
        description: "Media deleted successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete media",
        variant: "destructive",
      })
    }
  }

  const handleTogglePublished = async (eventId: string, isPublished: boolean) => {
    try {
      const updatedEvent = await galleryAPI.updateEvent(eventId, { isPublished })
      setEvents(events.map((event) => (event._id === eventId ? updatedEvent : event)))
      toast({
        title: "Success",
        description: `Event ${isPublished ? "published" : "unpublished"} successfully`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update event",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading events...</p>
        </div>
      </div>
    )
  }

  return (
    <AdminDashboard currentSection="gallery">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Event Gallery Admin</h1>
            <p className="text-gray-600 mt-1">Manage events and their media content</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowEventModal(true)}
            className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Create Event
          </motion.button>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {events.map((event) => (
            <motion.div
              key={event._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            >
              {/* Event Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{event.name}</h3>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          event.isPublished ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {event.isPublished ? "Published" : "Draft"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{event.description}</p>
                    <p className="text-xs text-gray-500">Date: {new Date(event.date).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleTogglePublished(event._id, !event.isPublished)}
                      className={`p-2 rounded-full ${
                        event.isPublished ? "text-green-600 hover:bg-green-50" : "text-gray-400 hover:bg-gray-50"
                      }`}
                    >
                      <EyeIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setSelectedEvent(event)}
                      className="p-2 text-gray-400 hover:text-purple-600 rounded-full hover:bg-purple-50"
                    >
                      <EyeIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteEvent(event._id)}
                      className="p-2 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-50"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Media Preview */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-700">Media ({event.media.length})</span>
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      multiple
                      accept="image/*,video/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(event._id, e.target.files)}
                      disabled={uploadingMedia === event._id}
                    />
                    <div
                      className={`flex items-center px-3 py-1 text-xs rounded-full transition-colors ${
                        uploadingMedia === event._id
                          ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                          : "bg-purple-100 text-purple-700 hover:bg-purple-200"
                      }`}
                    >
                      <PlusIcon className="h-3 w-3 mr-1" />
                      {uploadingMedia === event._id ? "Uploading..." : "Upload"}
                    </div>
                  </label>
                </div>

                {/* Media Grid */}
                <div className="grid grid-cols-3 gap-2">
                  {event.media.slice(0, 6).map((media) => (
                    <div key={media._id} className="relative group">
                      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={media.url || "/placeholder.svg"}
                          alt={media.name}
                          className="w-full h-full object-cover"
                        />
                        {media.type === "video" && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                            <div className="bg-white bg-opacity-90 rounded-full p-2">
                              <VideoCameraIcon className="h-5 w-5 text-purple-600" />
                            </div>
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => handleDeleteMedia(event._id, media._id!)}
                        className="absolute -top-1 -right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <XMarkIcon className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                  {event.media.length > 6 && (
                    <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-sm text-gray-500">+{event.media.length - 6}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Create Event Modal */}
        {showEventModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg p-6 w-full max-w-md mx-4"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Event</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Event Name</label>
                  <input
                    type="text"
                    value={newEventData.name}
                    onChange={(e) => setNewEventData({ ...newEventData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter event name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={newEventData.description}
                    onChange={(e) => setNewEventData({ ...newEventData, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    rows={3}
                    placeholder="Enter event description"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={newEventData.date}
                    onChange={(e) => setNewEventData({ ...newEventData, date: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex items-center justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowEventModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateEvent}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Create Event
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Event Detail Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{selectedEvent.name}</h3>
                  <p className="text-gray-600 mt-1">{selectedEvent.description}</p>
                </div>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {selectedEvent.media.map((media) => (
                    <div key={media._id} className="relative group">
                      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={media.url || "/placeholder.svg"}
                          alt={media.name}
                          className="w-full h-full object-cover"
                        />
                        {media.type === "video" && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                            <div className="bg-white bg-opacity-90 rounded-full p-3">
                              <VideoCameraIcon className="h-7 w-7 text-purple-600" />
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-xs truncate">{media.name}</p>
                        <p className="text-xs text-gray-300">{media.size}</p>
                        {media.type === "video" && (
                          <p className="text-xs text-purple-300 mt-1">Video</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </AdminDashboard>
  )
}

export default AdminGallery