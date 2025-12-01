"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { VideoCameraIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { galleryAPI, type Event, type MediaItem } from "../../lib/api"

const Gallery: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null)

  useEffect(() => {
    loadPublishedEvents()
  }, [])

  const loadPublishedEvents = async () => {
    try {
      setLoading(true)
      setError(null)
      const eventsData = await galleryAPI.getPublishedEvents()
      setEvents(eventsData)
    } catch (error) {
      setError("Failed to load events. Please try again later.")
      console.error("Error loading events:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading gallery...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={loadPublishedEvents}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Event Gallery</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse through our collection of events and memories
          </p>
        </div>

        {events.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No events are currently published.</p>
            <p className="text-gray-400 text-sm mt-2">Check back later for updates!</p>
          </div>
        ) : (
          <>
            {/* Events Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <motion.div
                  key={event._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition-all duration-300"
                  onClick={() => setSelectedEvent(event)}
                >
                  {/* Event Thumbnail */}
                  <div className="h-48 overflow-hidden">
                    {event.media.length > 0 ? (
                      <img
                        src={event.media[0].url || "/placeholder.svg"}
                        alt={event.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">No media</span>
                      </div>
                    )}
                  </div>

                  {/* Event Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.name}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">{new Date(event.date).toLocaleDateString()}</span>
                      <span className="text-sm text-gray-500">{event.media.length} media items</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {/* Event Detail Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl w-full max-w-6xl max-h-[90vh] overflow-hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{selectedEvent.name}</h3>
                  <p className="text-gray-600 mt-1">{selectedEvent.description}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {new Date(selectedEvent.date).toLocaleDateString()} • {selectedEvent.media.length} media items
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSelectedEvent(null)
                    setSelectedMedia(null)
                  }}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                {selectedEvent.media.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {selectedEvent.media.map((media) => (
                      <motion.div
                        key={media._id}
                        whileHover={{ scale: 1.02 }}
                        className="relative group cursor-pointer"
                        onClick={() => setSelectedMedia(media)}
                      >
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
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No media available for this event</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}

        {/* Media Detail Modal */}
        {selectedMedia && selectedEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
            <div className="relative max-w-5xl max-h-full">
              <button
                onClick={() => setSelectedMedia(null)}
                className="absolute -top-12 right-0 p-2 text-white hover:text-gray-300 z-10"
              >
                <XMarkIcon className="h-8 w-8" />
              </button>
              
              {/* Previous Button */}
              {selectedEvent.media.findIndex(m => m._id === selectedMedia._id) > 0 && (
                <button
                  onClick={() => {
                    const currentIndex = selectedEvent.media.findIndex(m => m._id === selectedMedia._id)
                    setSelectedMedia(selectedEvent.media[currentIndex - 1])
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full transition-all z-10"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}
              
              {/* Next Button */}
              {selectedEvent.media.findIndex(m => m._id === selectedMedia._id) < selectedEvent.media.length - 1 && (
                <button
                  onClick={() => {
                    const currentIndex = selectedEvent.media.findIndex(m => m._id === selectedMedia._id)
                    setSelectedMedia(selectedEvent.media[currentIndex + 1])
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full transition-all z-10"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
              
              <div className="bg-black rounded-lg overflow-hidden">
                {selectedMedia.type === "image" ? (
                  <img
                    src={selectedMedia.url || "/placeholder.svg"}
                    alt={selectedMedia.name}
                    className="max-w-full max-h-[80vh] object-contain"
                  />
                ) : (
                  <div className="w-full h-96 md:h-[80vh] flex items-center justify-center">
                    <div className="text-white text-center">
                      <VideoCameraIcon className="h-16 w-16 mx-auto mb-4" />
                      <p>Video playback would be implemented here</p>
                      <p className="text-sm text-gray-400 mt-2">{selectedMedia.name}</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-2 text-white text-center">
                <p className="font-medium">{selectedMedia.name}</p>
                <p className="text-sm text-gray-300">{selectedMedia.size}</p>
                <p className="text-sm text-gray-400 mt-1">
                  {selectedEvent.media.findIndex(m => m._id === selectedMedia._id) + 1} / {selectedEvent.media.length}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Gallery