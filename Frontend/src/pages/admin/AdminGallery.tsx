"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { PlusIcon, VideoCameraIcon, TrashIcon, EyeIcon, XMarkIcon } from "@heroicons/react/24/outline"
import AdminDashboard from "./AdminDashboard"

interface MediaItem {
  id: string
  type: "image" | "video"
  url: string
  name: string
  size: string
}

interface Event {
  id: string
  name: string
  description: string
  date: string
  media: MediaItem[]
}

const AdminGallery: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      name: "Annual Conference 2024",
      description: "Our biggest event of the year with industry leaders",
      date: "2024-03-15",
      media: [
        { id: "1", type: "image", url: "/conference-hall.png", name: "conference-1.jpg", size: "2.3 MB" },
        { id: "2", type: "video", url: "/video-thumbnail.png", name: "keynote-speech.mp4", size: "45.2 MB" },
      ],
    },
    {
      id: "2",
      name: "Product Launch Event",
      description: "Launching our new product line with exclusive previews",
      date: "2024-02-20",
      media: [{ id: "3", type: "image", url: "/product-launch.png", name: "product-1.jpg", size: "1.8 MB" }],
    },
  ])

  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [showEventModal, setShowEventModal] = useState(false)
  const [showMediaModal, setShowMediaModal] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [newEventData, setNewEventData] = useState({ name: "", description: "", date: "" })

  const handleCreateEvent = () => {
    if (newEventData.name && newEventData.description && newEventData.date) {
      const newEvent: Event = {
        id: Date.now().toString(),
        name: newEventData.name,
        description: newEventData.description,
        date: newEventData.date,
        media: [],
      }
      setEvents([...events, newEvent])
      setNewEventData({ name: "", description: "", date: "" })
      setShowEventModal(false)
    }
  }

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter((event) => event.id !== eventId))
  }

  const handleFileUpload = (eventId: string, files: FileList | null) => {
    if (!files) return

    Array.from(files).forEach((file) => {
      const mediaItem: MediaItem = {
        id: Date.now().toString() + Math.random(),
        type: file.type.startsWith("video/") ? "video" : "image",
        url: URL.createObjectURL(file),
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(1) + " MB",
      }

      setEvents(
        events.map((event) => (event.id === eventId ? { ...event, media: [...event.media, mediaItem] } : event)),
      )
    })
  }

  const handleDeleteMedia = (eventId: string, mediaId: string) => {
    setEvents(
      events.map((event) =>
        event.id === eventId ? { ...event, media: event.media.filter((media) => media.id !== mediaId) } : event,
      ),
    )
  }

  return (
    <AdminDashboard currentSection="gallery">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Event Gallery</h1>
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
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            >
              {/* Event Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{event.description}</p>
                    <p className="text-xs text-gray-500">Date: {new Date(event.date).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setSelectedEvent(event)}
                      className="p-2 text-gray-400 hover:text-purple-600 rounded-full hover:bg-purple-50"
                    >
                      <EyeIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteEvent(event.id)}
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
                      onChange={(e) => handleFileUpload(event.id, e.target.files)}
                    />
                    <div className="flex items-center px-3 py-1 text-xs bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 transition-colors">
                      <PlusIcon className="h-3 w-3 mr-1" />
                      Upload
                    </div>
                  </label>
                </div>

                {/* Media Grid */}
                <div className="grid grid-cols-3 gap-2">
                  {event.media.slice(0, 6).map((media) => (
                    <div key={media.id} className="relative group">
                      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={media.url || "/placeholder.svg"}
                          alt={media.name}
                          className="w-full h-full object-cover"
                        />
                        {media.type === "video" && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                            <VideoCameraIcon className="h-6 w-6 text-white" />
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => handleDeleteMedia(event.id, media.id)}
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
                    <div key={media.id} className="relative group">
                      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={media.url || "/placeholder.svg"}
                          alt={media.name}
                          className="w-full h-full object-cover"
                        />
                        {media.type === "video" && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                            <VideoCameraIcon className="h-8 w-8 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-xs truncate">{media.name}</p>
                        <p className="text-xs text-gray-300">{media.size}</p>
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
